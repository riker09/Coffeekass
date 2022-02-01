<script setup lang="ts">
import { computed } from 'vue';
import router from './router';

const layout = computed(() => router.currentRoute.value.meta.layout || 'DefaultLayout')
</script>

<template>
  <Toast/>

  <component :is="layout">
    <router-view></router-view>
  </component>
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
