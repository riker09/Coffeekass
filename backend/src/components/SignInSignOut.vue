<template>
  <p v-if="loggedIn">
    Welcome back, {{ username }}!
    <router-link to="/logout">Logout</router-link>
  </p>
  <Button v-if="!loggedIn" label="Login" icon="pi pi-sign-in" @click="openLoginModal" />

  <Dialog
    header="Login"
    :visible="visible"
    :style="{width: '30vw'}"
    :modal="true"
    :draggable="false"
    @update:visible="closeDialog"
  >

    <LoginForm ref="loginForm" />

    <template #footer>
      <Button label="Login" icon="pi pi-check" @click="performLogin" autofocus />
    </template>
  </Dialog>

</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { authStore } from '../store/auth-store';
import { loginModalStore } from '../store/login-modal-store';
import LoginForm from './LoginForm.vue';

export default defineComponent({
  components: {
    LoginForm,
  },

  setup () {

    const loginForm = ref<InstanceType<typeof LoginForm>>();
    const visible = computed(() => {
      return loginModalStore.getState().visible;
    });
    const username = computed(() => authStore.user?.displayName);
    const loggedIn = computed(() => authStore.authenticated);

    const openLoginModal = () => {
      loginModalStore.show();
    }

    const performLogin = async () => {
      await loginForm.value?.performLogin();
    }

    const closeDialog = (visible: boolean) => {
      if (!visible) loginModalStore.close();
    }

    return {
      closeDialog,
      loggedIn,
      loginForm,
      username,
      visible,
      openLoginModal,
      performLogin,
    }
  }
});

</script>
