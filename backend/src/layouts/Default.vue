<template>

  <Toolbar>
    <template #start>
      <h2>Coffeekass</h2>
    </template>

    <template #end>
      <SignInOut />
    </template>
  </Toolbar>

  <slot></slot>

</template>

<script setup lang="ts">
import SignInOut from '../components/SignInOut.vue';
</script>
