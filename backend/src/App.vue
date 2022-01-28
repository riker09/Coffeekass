<script setup lang="ts">
import Products from './components/Products.vue';
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <Toast/>
  <!-- <HelloWorld msg="Hello, children!"/> -->
  <Products />
</template>

<style>
html {
  font-size: 16px;
}

body {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-b);
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
}
</style>
