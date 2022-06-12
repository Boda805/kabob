<script setup lang="ts">
import { ref } from 'vue';
import { useWallet } from 'solana-wallets-vue';
import Decimal from "decimal.js";

import { push } from './ArbBlock.vue';
import ArbBlock from './ArbBlock.vue';

// const props = defineProps({
//   blocks: { type: Array, default: () => [] },
// });

// const state = reactive({ blocks: [] });

const blocks = ref([]);
const blockNumber = ref(1);

const addStrategry = () => {
    push(blocks.value, { blockNumber: blockNumber.value });
    blockNumber.value++;
}
</script>

<template>
    <button @click="addStrategry">
        +
    </button>
    <div v-for="block in blocks" >
        <ArbBlock :blockNumber="block.blockNumber" />
    </div>
</template>