import { Keypair, Connection, PublicKey } from '@solana/web3.js';
import { getOrca, OrcaPoolConfig } from "@orca-so/sdk";
import Decimal from "decimal.js";


export default () => {
    const connection = new Connection("https://api.mainnet-beta.solana.com", "singleGossip");
    
    const orca = getOrca(connection);
    console.log(orca)
    const orcaSolPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
    const solToken = orcaSolPool.getTokenB();
    const solAmount = new Decimal(1);
    const quote = await orcaSolPool.getQuote(solToken, solAmount);
    const orcaAmount = quote.getMinOutputAmount()
    console.log(`Swap ${solAmount.toString()} SOL for at least ${orcaAmount.toNumber()} ORCA`);

}