<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useWallet } from 'solana-wallets-vue';
import Decimal from "decimal.js";

import ArbBlock from './ArbBlock.vue';
import useArbChain from '../composables/useArbChain';

const { blocks, addBlock } = useArbChain();
const firstBlockInput = ref(1);

watchEffect(() => {
    if (blocks.value.length > 0 && firstBlockInput.value) {
        blocks.value[0].inputAmount = new Decimal(firstBlockInput.value);
        console.log(blocks.value);
    }
    
})

</script>

<template>
    <button @click="addBlock">
        +
    </button>
    <input v-model="firstBlockInput" />
    <div v-for="block in blocks" >
        <ArbBlock :blockNumber="block.blockNumber"  />
    </div>
</template>