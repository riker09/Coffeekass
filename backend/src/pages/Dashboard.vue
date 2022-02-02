<script setup lang="ts">
</script>

<template>
  <h1>Dashboard</h1>

  <div class="grid">
    <div class="md:col-6 lg:col-4">
      <Card>
        <template #title>Products</template>
        <template #content>
          <router-link to="/products">Go to products</router-link>
        </template>
      </Card>
    </div>

    <div class="md:col-6 lg:col-4">
      <Card>
        <template #title>Balance</template>
        <template #content>
          <router-link to="/balance">Go to balance</router-link>
        </template>
      </Card>
    </div>

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
