<script setup lang="ts">
</script>

<template>
  <h1>Dashboard</h1>

  <div class="grid">
    <div class="md:col-6 lg:col-4">
      <Card>
        <template #title>Products</template>
        <template #content>
          <router-link to="/products" v-slot="{ navigate, route }">
            <Button :label="`Go to ${route.name}`" @click="navigate" class="p-button-secondary" />
          </router-link>
        </template>
      </Card>
    </div>

    <div class="md:col-6 lg:col-4">
      <Card>
        <template #title>Balance</template>
        <template #content>
          <router-link to="/balance" v-slot="{ navigate, route }">
            <Button :label="`Go to ${route.name}`" @click="navigate" class="p-button-secondary" />
          </router-link>
        </template>
      </Card>
    </div>

    <div class="md:col-6 lg:col-4">
      <Card>
        <template #title>Sales</template>
        <template #content>
          <router-link to="/sales" v-slot="{ navigate, route }">
            <Button :label="`Go to ${route.name}`" @click="navigate" class="p-button-secondary" />
          </router-link>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
</style>
