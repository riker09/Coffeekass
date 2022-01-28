<script setup lang="ts">
</script>

<template>
  <h1>Dashboard</h1>
  <p>Welcome to the dashboard</p>

  <div class="grid">
    <div class="md:col-6 lg:col-4" v-for="idx of [0,1,2,3,4,5]">
      <Card>
        <template #title>
          Header #{{ idx }}
        </template>
        <template #content>
          Content
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
</style>
