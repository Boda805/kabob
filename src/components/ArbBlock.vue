<script setup lang="ts">
import { ref, watchEffect }  from "vue";
import useOrcaQuote from '../composables/useOrcaQuote';
import useArbChain from '../composables/useArbChain';

const props = defineProps({
  blockNumber: { type: Number, default: () => 0 },
});

const { inputToken, inputAmount, outputToken, outputAmount, tokenPair, swap } = useOrcaQuote();
const { blocks, setBlockInputAmount, setBlockOutputAmount } = useArbChain();

watchEffect(() => {
    if (props.blockNumber == 1 && blocks.value.length > 0) {
        inputAmount.value = blocks.value[0].inputAmount;
        blocks.value[0].outputAmount = outputAmount.value;
    } else {
        inputAmount.value = blocks.value[props.blockNumber - 2].outputAmount;
        setBlockInputAmount(props.blockNumber, inputAmount.value);
        setBlockOutputAmount(props.blockNumber, outputAmount.value);
    }
});

</script>


<template>
    <div>{{ inputAmount?.toString() }} {{ inputToken.tag }} for {{ outputAmount?.toNumber() }} {{ outputToken.tag }}</div><button @click="swap"></button>
</template>