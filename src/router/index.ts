import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home.vue";
import LoginView from "@/views/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomeView,
      redirect: "/index",
      children: [
        {
          path: "index",
          component: () => import("@/views/index/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: LoginView,
    },
  ],
});

export default router;
