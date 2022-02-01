<template>

  <Toolbar>
    <template #start>
      <h2>Coffeekass</h2>
    </template>

    <template #end>
      <SignInSignOut />
    </template>
  </Toolbar>

  <slot></slot>

</template>

<script setup lang="ts">
import SignInSignOut from '../components/SignInSignOut.vue';
</script>
