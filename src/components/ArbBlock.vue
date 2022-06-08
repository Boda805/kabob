<script setup lang="ts">
import { useWallet } from 'solana-wallets-vue';

const { publicKey } = useWallet();

const addStrategry = () => {
    console.log(publicKey.value);
}
</script>


<template>

</template>