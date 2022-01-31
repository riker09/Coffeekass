<template>
  <div class="access-denied">
    <h1>
      <i class="pi pi-ban"></i>
      Access Denied
    </h1>
    <p>You don't have the required permissions to view this page.</p>
    <p v-if="!loggedIn">Perhaps you need to <a href="#" @click.stop.prevent="login">login</a>?</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { authStore } from '../store/auth-store';
import { loginModalStore } from '../store/login-modal-store';

export default defineComponent({
  setup () {

    const loggedIn = computed(() => authStore.authenticated);

    const login = () => {
      loginModalStore.show();
    }

    return {
      login,
      loggedIn,
    }
  }
});
</script>

<style lang="scss">
.access-denied {
  text-align: center;

  i.pi {
    color: red;
    font-size: 2rem;
  }
}
</style>