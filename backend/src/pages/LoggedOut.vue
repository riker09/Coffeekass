<template>
  <div class="text-center">
    <h1>
      <i class="pi pi-star"></i>
      You are logged out
      <i class="pi pi-star"></i>
    </h1>

    <p>Have a pleasant day.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { authStore } from '../store/auth-store';

onMounted(async () => {
  if (authStore.authenticated) {
    await authStore.logout();
  }
});
</script>

<style scoped lang="scss">
.text-center {
  text-align: center;
}
.pi {
  font-size: xx-large;
  color: yellow;
}
</style>