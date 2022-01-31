<template>
  <p v-if="loggedIn">Welcome back, {{ username }}!</p>
  <Button v-if="!loggedIn" label="Login" icon="pi pi-sign-in" @click="openLoginModal" />
  <Button v-if="loggedIn" label="Logout" icon="pi pi-sign-out" @click="signOut" icon-pos="right" />

  <Dialog header="Login" :visible="visible" :style="{width: '30vw'}" :modal="true">

    <SignInForm ref="signInForm" />

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" @click="closeLoginModal" class="p-button-text"/>
      <Button label="Login" icon="pi pi-check" @click="performLogin" autofocus />
    </template>
  </Dialog>

</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { authStore } from '../store/auth-store';
import { loginModalStore } from '../store/login-modal-store';
import SignInForm from './SignInForm.vue';

export default defineComponent({
  components: {
    SignInForm,
  },

  setup () {

    const signInForm = ref<InstanceType<typeof SignInForm>>();
    const visible = computed(() => {
      return loginModalStore.getState().visible;
    });
    const username = computed(() => authStore.user?.displayName);
    const loggedIn = computed(() => authStore.authenticated);

    const closeLoginModal = () => {
      loginModalStore.hide();
    }

    const openLoginModal = () => {
      loginModalStore.show();
    }

    const signOut = async () => {
      await authStore.logout();
      window.location.reload();
    }

    const performLogin = async () => {
      await signInForm.value?.performLogin();
    }

    return {
      loggedIn,
      signInForm,
      username,
      visible,
      closeLoginModal,
      openLoginModal,
      performLogin,
      signOut,
    }
  }
});

</script>
