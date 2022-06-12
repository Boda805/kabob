import { Keypair, Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getOrca, OrcaPoolConfig } from "@orca-so/sdk";
import Decimal from "decimal.js";
import { ref, watchEffect }  from "vue";


export default () => {
    const tokenPair = ref();
    const inputAmount = ref();
    const inputToken = ref();
    const outputAmount = ref();
    const outputToken = ref();

    const connection = new Connection("https://api.mainnet-beta.solana.com", "singleGossip");
    // const connection = new Connection(clusterApiUrl("mainnet-beta"));

    const orca = getOrca(connection);

    tokenPair.value = orca.getPool(OrcaPoolConfig.ORCA_SOL);
    inputToken.value = tokenPair.value.getTokenB();

    watchEffect(async () => {
        if (inputAmount.value) {
            try {
                const quote = await tokenPair.value?.getQuote(inputToken.value, new Decimal(inputAmount.value));
                outputAmount.value = quote?.getMinOutputAmount();
                console.log(`Swap ${inputAmount.value?.toString()} SOL for at least ${outputAmount.value?.toNumber()} ORCA`);
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