<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import { logout } from "@/services/auth";
import "@/utils/localstorage";

import { routes } from "@/router";
import { useAlertsStore, useAppStore, useSettingStore, useUserStore } from "@/stores";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const appStore = useAppStore();
const alert = useAlertsStore();
const setting = useSettingStore();

const showDrawer = computed(() => {
  return !!userStore.payload && !route.meta.hideDrawer;
});

const title = computed(() => {
  return route.meta?.title;
});

const drawer = ref(false);
const showSetting = ref(false);

const menus = routes
  .filter((x) => x.meta?.menu)
  .map((route) => ({
    title: route.meta?.title,
    icon: route.meta?.icon,
    to: route.path,
  }));

function showPengaturan() {
  showSetting.value = true;
}

async function doLogout() {
  await logout();
  localStorage.clearExcludes("settings", "antrian");

  userStore.initUser();

  router.replace("/login");
}

function getUserImageUrl(badge: string) {
  return `https://api.rsmlamongan.com/kepegawaian/api/profile/picture/${badge}.jpg`;
}

function formatUserFullname(fullname: string | null) {
  if (!fullname) return "";

  const words = fullname.split(/[ ,]+/);
  const result = words.reduce((acc, word) => {
    if (acc.length + word.length > 20) return acc;
    return acc + " " + word;
  }, "");

  return result.trim();
}

const isLogin = ref(false);
const showCallAntrian = ref(true);

watchEffect(() => {
  const excludeIsLogin = ["Login", "Forbidden", "NotFound", "Cetak.Antrian"];
  if (excludeIsLogin.includes(route.name as string)) {
    isLogin.value = false;
  } else {
    isLogin.value = true;
  }
});

watch(title, () => {
  appStore.subtitle = null;
});
</script>

<template>
  <v-app>
    <v-app-bar :elevation="1" color="primary">
      <template v-if="showDrawer" #prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        {{ title }}
      </v-app-bar-title>

      <template #append>
        <v-list-item>
          <v-list-item-title class="text-right">{{ userStore.username ?? "" }}</v-list-item-title>

          <v-list-item-subtitle class="text-right">
            {{ formatUserFullname(userStore.fullname) }}
          </v-list-item-subtitle>

          <template #append>
            <v-menu location="bottom">
              <template #activator="{ props }">
                <v-avatar v-if="userStore.badge" size="40" v-bind="props">
                  <v-img :src="getUserImageUrl(userStore.badge)" class="tw-cursor-pointer" />
                </v-avatar>
              </template>

              <!-- User Menu -->
              <v-list tile width="200">
                <v-list-item
                  :disabled="route.meta.hideDrawer"
                  title="Pengaturan"
                  @click="showPengaturan"
                />
                <v-list-item title="Antrian">
                  <template #append>
                    <v-checkbox v-model="showCallAntrian" hide-details></v-checkbox>
                  </template>
                </v-list-item>
                <v-list-item title="Logout" @click="doLogout" />
              </v-list>
            </v-menu>
          </template>
        </v-list-item>
      </template>
      <template v-if="route.name == 'Cetak.Antrian' && route.query.printer == '1'">
        <v-btn @click="showSetting = true">{{ setting.printer?.label ?? "Pilih Printer" }}</v-btn>
      </template>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-if="showDrawer" v-model="drawer" temporary>
      <v-list density="compact" nav>
        <v-list-item
          v-for="menu in menus"
          :key="menu.to"
          :prepend-icon="menu.icon"
          :title="menu.title"
          :to="menu.to"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main View -->
    <v-main>
      <router-view :key="route.fullPath"></router-view>
    </v-main>

    <!-- Bottom navigation -->
    <v-bottom-navigation>
      <v-btn value="recent" href="/">
        <v-icon>mdi-home</v-icon>
        <span>Home</span>
      </v-btn>

      <v-btn value="favorites" href="dashboard">
        <v-icon>mdi-chart-pie</v-icon>
        <span>Dashboard</span>
      </v-btn>

      <v-btn value="nearby" href="profil">
        <v-icon>mdi-account</v-icon>
        <span>Profil</span>
      </v-btn>

      <v-btn value="favorites" href="login">
        <v-icon>mdi-login</v-icon>
        <span>Login</span>
      </v-btn>
    </v-bottom-navigation>

    <!-- Progress -->
    <v-overlay :value="alert.progress">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>

    <!-- Snackbar -->
    <v-snackbar
      v-model="alert.snackbar.visible"
      :color="alert.snackbar.type"
      :timeout="alert.snackbar.timeout"
      bottom
    >
      {{ alert.snackbar.content }}
      <template #actions>
        <v-btn variant="text" @click="alert.hideSnackbar()">{{ alert.snackbar.button }}</v-btn>
      </template>
    </v-snackbar>

    <!-- Alert Dialog -->
    <v-dialog v-model="alert.message.visible" max-width="400">
      <v-card>
        <v-card-title class="title">
          {{ alert.message.title }}
        </v-card-title>

        <v-card-text>{{ alert.message.content }}</v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn variant="text" color="primary" @click="alert.hideMessage()">
            {{ alert.message.button }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
  <SettingDialog :show="showSetting" @close="showSetting = false" />
</template>
