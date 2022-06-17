import { Keypair, Connection, PublicKey } from '@solana/web3.js';
import { getOrca, OrcaPoolConfig, OrcaU64 /*, Network, OrcaFarmConfig */ } from "@orca-so/sdk";
import { Ref, ref, watchEffect }  from "vue";

export default () => {
    const tokenPair = ref();
    const tokenPairs = ref(new Map());
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

    const initTokenPairs = () => {
        const keys = Object.keys(OrcaPoolConfig);
        const values = Object.values(OrcaPoolConfig);
        keys.map((k, i) => (tokenPairs.value.set(k, values[i])));
    }

    initTokenPairs();

    tokenPair.value = orca.getPool(OrcaPoolConfig.ORCA_SOL);
    inputToken.value = tokenPair.value.getTokenB();
    outputToken.value = tokenPair.value.getTokenA();

    watchEffect(async () => {
        if (inputAmount.value && inputToken.value && tokenPair.value) {
            try {
                await getQuote(inputToken.value, inputAmount.value);
            } catch (err) {
                console.warn(err);
            }
        }
    })

    const getQuote = async (inputToken, inputAmount) => {
        const quote = await tokenPair.value.getQuote(inputToken, inputAmount);
        const quoteOrca: OrcaU64 = quote.getMinOutputAmount()
        
        outputAmount.value = quoteOrca.toDecimal();
    }

    const swap = () => {
        inputToken.value = inputToken.value.tag == tokenPair.value.getTokenB().tag ? tokenPair.value.getTokenA() : tokenPair.value.getTokenB();
        outputToken.value = outputToken.value.tag == tokenPair.value.getTokenB().tag ? tokenPair.value.getTokenA() : tokenPair.value.getTokenB();
    }

    const selectTokenPair = (tokenPairing) => {
        tokenPair.value = orca.getPool(tokenPairing)
        inputToken.value = tokenPair.value.getTokenA();
        outputToken.value = tokenPair.value.getTokenB();
    }

    return {
        tokenPair,
        tokenPairs,
        inputAmount,
        inputToken,
        outputAmount,
        outputToken,

        getQuote,
        swap,
        selectTokenPair
    }
}