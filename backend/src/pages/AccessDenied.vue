<template>
  <div class="access-denied">
    <h1>
      <i class="pi pi-ban"></i>
      Access Denied
    </h1>
    <p>You don't have the required permissions to view this page.</p>
    <p v-if="!loggedIn">Perhaps you need to <a href="#" @click.stop.prevent="login">login</a>?</p>
    <p>After the login you'll be redirected to {{ redirectUrl }}.</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { authStore } from '../store/auth-store';
import { loginModalStore } from '../store/login-modal-store';
import { useRouter } from 'vue-router';
import { redirectTarget } from '../router/helper';

export default defineComponent({
  setup () {

    const loggedIn = computed(() => authStore.authenticated);
    const router = useRouter();
    const redirectUrl = computed(redirectTarget(router));

    const login = () => {
      loginModalStore.show();
    }

    return {
      login,
      loggedIn,
      redirectUrl,
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