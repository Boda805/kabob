<script setup lang="ts">
import useOrcaQuote from '../composables/useOrcaQuote';
import Decimal from "decimal.js";

//const { publicKey } = useWallet();
const { inputAmount, outputAmount, tokenPair } = useOrcaQuote();

const props = defineProps({
  blockNumber: { type: Number, default: () => 0 },
});

inputAmount.value = new Decimal(3);

</script>
<script lang="ts">
export function push(array: Array<any>, data): void {
    array.push(data);
}
</script>

<template>
    <input v-model="inputAmount" v-if="props.blockNumber == 1"/>
    <div>{{ inputAmount.toString() }} SOL for {{ outputAmount?.toNumber() }} ORCA</div>
</template>