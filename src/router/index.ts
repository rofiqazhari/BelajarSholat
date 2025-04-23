// Composables
import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import "@/extension/string.extension";
import { ALLOWED_DIVISIONS } from "@/router/access";
import { useUserStore } from "@/stores/user.store";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/forbidden",
    name: "Forbidden",
    meta: {
      protected: false,
      title: "Akses Dilarang",
      hideDrawer: true,
    },
    component: () => import("@/views/ForbiddenView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      protected: false,
      title: "Halaman Tidak Ditemukan",
    },
    component: () => import("@/views/NotFoundView.vue"),
  },
  {
    path: "/",
    name: "Login",
    meta: {
      protected: false,
      title: "Klinik Muhammadiyah Mobile",
    },
    component: () => import("@/views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  const excludesForbiddenRouteNames = ["Forbidden", "Cetak.Antrian"];

  // Navigation guard to check user authentication
  const user = useUserStore();

  if (to.name == "Cetak.Antrian" && location.host != "107.108.0.7") {
    next({ name: "Forbidden" });
  } else if (!user.payload) {
    // If user is not logged in

    if (to.meta.protected) {
      // If trying to access a protected route, redirect to login page
      next({ name: "Login" });
    } else {
      // Otherwise, allow navigation
      next();
    }
  } else {
    // If user is already logged in
    // Check if user is allowed to access the page
    if (
      !excludesForbiddenRouteNames.includes(to.name as string) &&
      !ALLOWED_DIVISIONS.includes(user.divisionId)
    ) {
      next({ name: "Forbidden" });
      return;
    }

    if (to.name == "Login") {
      // If trying to access the login page, redirect to home page
      next({ path: "/" });
    } else {
      // If trying to access any other page, allow navigation
      next();
    }
  }
});

export default router;
