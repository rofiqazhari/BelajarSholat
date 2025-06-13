<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { login } from "@/services/auth";
import { useAlertsStore } from "@/stores/alerts.store";
import { useUserStore } from "@/stores/user.store";

const router = useRouter();
const alertStore = useAlertsStore();
const userStore = useUserStore();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const processing = ref(false);
const isFormValid = ref(false);

const usernameRules = ref([
  (value: string): boolean | string => {
    if (value) return true;
    return "Mohon masukan username";
  },
]);

const passwordRules = ref([
  (value: string): boolean | string => {
    if (value) return true;
    return "Mohon masukan password";
  },
]);

async function doLogin() {
  if (!isFormValid.value) return;

  processing.value = true;
  try {
    const data = await login(username.value, password.value);

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("name", data.name);
    localStorage.setItem("divisionId", data.divisionId.toString());
    localStorage.setItem("professionId", data.professionId.toString());
    localStorage.setItem("paviliunId", data.paviliunId.toString());
    localStorage.setItem("dokterId", data.dokterId.toString());

    userStore.initUser();

    router.replace("/");
  } catch (error) {
    if (error instanceof Error) alertStore.showMessage(error.message);
  } finally {
    processing.value = false;
  }
}
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="5" lg="4" xl="3">
        <v-row justify="center">
          <v-col cols="4" md="5">
            <v-img src="/logo.png" aspect-ratio="1">
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-form v-model="isFormValid" fast-fail @submit.prevent="doLogin">
              <div class="flex flex-col gap-2">
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  :disabled="processing"
                  label="Username"
                  variant="outlined"
                  required
                  color="primary"
                />

                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :value="password"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  :disabled="processing"
                  label="Password"
                  variant="outlined"
                  required
                  compact
                  color="primary"
                  @click:append-inner="showPassword = !showPassword"
                />

                <v-btn
                  type="submit"
                  block
                  color="primary"
                  :disabled="processing || (username == '' && password == '')"
                  large
                  variant="elevated"
                >
                  Login
                </v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
