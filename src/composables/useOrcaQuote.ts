import { Keypair, Connection, PublicKey } from '@solana/web3.js';
import { getOrca, OrcaPoolConfig, OrcaU64 /*, Network, OrcaFarmConfig */ } from "@orca-so/sdk";
import Decimal from "decimal.js";
import { Ref, ref, watchEffect }  from "vue";



export default () => {
    const tokenPair = ref();
    const inputAmount = ref();
    const inputToken = ref();
    const outputAmount = ref();
    const outputToken = ref();

    // Devnet
    // const connection = new Connection("https://api.devnet.solana.com", "singleGossip");
    // const orca = getOrca(connection, Network.DEVNET);
    
    // Mainnet
    const connection = new Connection("https://api.mainnet-beta.solana.com", "singleGossip");
    const orca = getOrca(connection);

    tokenPair.value = orca.getPool(OrcaPoolConfig.ORCA_SOL);
    inputToken.value = tokenPair.value.getTokenB();
    outputToken.value = tokenPair.value.getTokenA();

    watchEffect(async () => {
        if (inputAmount.value && inputToken.value) {
            try {
                await getQuote(inputToken.value, inputAmount.value);
            } catch (err) {
                console.warn(err);
            }
        }
    })

    const getQuote = async (inputToken, inputAmount) => {
        const quote = await tokenPair.value?.getQuote(inputToken, inputAmount);
        const quoteOrca: OrcaU64 = quote?.getMinOutputAmount()
        
        outputAmount.value = quoteOrca.toDecimal();
    }

    const swap = () => {
        inputToken.value = inputToken.value.tag == tokenPair.value.getTokenB().tag ? tokenPair.value.getTokenA() : tokenPair.value.getTokenB();
        outputToken.value = outputToken.value.tag == tokenPair.value.getTokenB().tag ? tokenPair.value.getTokenA() : tokenPair.value.getTokenB();
    }

    return {
        tokenPair,
        inputAmount,
        inputToken,
        outputAmount,
        outputToken,

        getQuote,
        swap
    }
}