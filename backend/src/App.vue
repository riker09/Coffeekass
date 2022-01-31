<script setup lang="ts">
import SignInOut from './components/SignInOut.vue';
</script>

<template>
  <Toolbar>
    <template #start>
      <h2>Coffeekass</h2>
    </template>
    <template #end>
      <SignInOut />
    </template>
  </Toolbar>

  <Toast/>

  <router-view></router-view>
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
