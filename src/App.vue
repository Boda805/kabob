<script setup lang="ts">
import ArbChain from './components/ArbChain.vue'

import { WalletMultiButton } from 'solana-wallets-vue'

</script>

<template>
  <div style="justify-content: right">
  <wallet-multi-button></wallet-multi-button>
  </div>
  <img alt="Vue logo" src="./assets/logo.png" />
  <ArbChain />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
