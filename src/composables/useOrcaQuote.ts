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
        if (inputAmount.value) {
            try {
                const quote = await tokenPair.value?.getQuote(inputToken.value, new Decimal(inputAmount.value));
                const quoteOrca: OrcaU64 = quote?.getMinOutputAmount()
                outputAmount.value = quoteOrca.toDecimal();
            } catch (err) {
                console.warn(err);
            }
        }
    })

    return {
        tokenPair,
        inputAmount,
        inputToken,
        outputAmount,
        outputToken
    }
}