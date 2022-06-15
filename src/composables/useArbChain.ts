import { ref, watchEffect, Ref }  from "vue";
import Decimal from "decimal.js";

const blocks: Ref<any[]> = ref([]);
const blockNumber = ref(1);

export default () => {
    const addBlock = () => {
        blocks.value.push({ blockNumber: blockNumber.value })
        blockNumber.value++
    }

    const setBlockInputAmount = (blockNumber: number, amount: Decimal) => {
        blocks.value[blockNumber - 1].inputAmount = amount
    }

    const setBlockOutputAmount = (blockNumber: number, amount: Decimal) => {
        blocks.value[blockNumber - 1].outputAmount = amount
    }

    return {
        blocks,

        addBlock,
        setBlockInputAmount,
        setBlockOutputAmount
    }
}