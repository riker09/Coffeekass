<template>

  <div class="field grid">
    <label for="username" class="col-fixed">Username</label>
    <div class="col">
      <InputText id="username" type="text" v-model="username" autofocus />
    </div>
  </div>

  <div class="field grid">
    <label for="password" class="col-fixed">Password</label>
    <div class="col">
      <Password id="password" v-model="password" :feedback="false" />
    </div>
  </div>

  <Button v-if="showLoginButton" @click="performLogin()" :loading="loading" label="Login" />

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from 'primevue/usetoast';
import { loginModalStore } from '../store/login-modal-store';
import { auth } from '../service/Firebase';
import router from '../router';
import { redirectTarget } from '../router/helper';

export default defineComponent({
  props: {
    showLoginButton: Boolean,
  },

  setup (props) {
    const username = ref('');
    const password = ref('');
    const loading = ref(false);
    const toast = useToast();

    const performLogin = async () => {
      try {
        loading.value = true;
        await signInWithEmailAndPassword(auth, username.value, password.value);

        toast.add({
          severity: 'success',
          summary: 'Login successful',
          life: 3000,
        });

        const target = redirectTarget(router)();

        router.push(target);

      } catch (err) {
        toast.add({
          severity: 'error',
          summary: 'Error during Login',
          detail: (err as Error).message,
          life: 5000,
        });
      } finally {
        loading.value = false;
        loginModalStore.close();
      }
    }

    return {
      username,
      password,
      loading,
      performLogin,
    }
  },
});

</script>

<style scoped lang="scss">
.grid label {
  width: 100px;
}
</style>