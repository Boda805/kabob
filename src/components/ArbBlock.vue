<script setup lang="ts">
import { ref, watchEffect }  from "vue";
import useOrcaQuote from '../composables/useOrcaQuote';
import useArbChain from '../composables/useArbChain';
import useReact from '../composables/useReact';

const props = defineProps({
  blockNumber: { type: Number, default: () => 0 },
});

const { inputToken, inputAmount, outputToken, outputAmount, tokenPairs, swap, selectTokenPair } = useOrcaQuote();
const { blocks, setBlockInputAmount, setBlockOutputAmount } = useArbChain();

const selectedTokenPair = ref();

watchEffect(() => {
    if (props.blockNumber == 1) {
        inputAmount.value = blocks.value[0].inputAmount;
        blocks.value[0].outputAmount = outputAmount.value;
    } else {
        inputAmount.value = blocks.value[props.blockNumber - 2].outputAmount;
        setBlockInputAmount(props.blockNumber, inputAmount.value);
        setBlockOutputAmount(props.blockNumber, outputAmount.value);
    }
});

watchEffect(() => {
    if (selectedTokenPair.value) {
        selectTokenPair(selectedTokenPair.value)
    }
});

</script>


<template>
    <div>{{ inputAmount?.toString() }} {{ inputToken.tag }} for {{ outputAmount?.toString() }} {{ outputToken.tag }}</div>
    <select v-model="selectedTokenPair">
        <option v-for="[pairName, pairAddress] in tokenPairs" :value="pairAddress">{{ pairName }}</option>
    </select>
    <useReact />
    <button @click="swap">
        Swap
    </button>
</template>