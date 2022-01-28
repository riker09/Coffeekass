<template>
  <Card>
    <template #header>
      <h1>Login</h1>
    </template>

    <template #content>
      <div class="field">
        <span class="p-float-label">
          <InputText id="username" type="text" v-model="username" />
          <label for="username">Username</label>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <Password id="password" type="text" v-model="password" :feedback="false" />
          <label for="password">Password</label>
        </span>
      </div>

      <div class="actions">
        <Button @click="login" :loading="loading" label="Login" />
      </div>
    </template>

  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../service/Firebase';
import { useToast } from 'primevue/usetoast';

const username = ref('');
const password = ref('');
const loading = ref(false);

const toast = useToast();

const login = async () => {
  loading.value = true;
  try {
    const result = await signInWithEmailAndPassword(auth, username.value, password.value);
    console.debug(result);
    toast.add({
      severity: 'success',
      summary: 'Login successful',
      life: 3000,
    });
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error during Login',
      detail: (err as Error).message,
      life: 5000,
    });
  } finally {
    loading.value = false;
  }
}

</script>