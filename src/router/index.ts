import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Layout from "../Layout.vue";
import { userStore } from "../store/userStore";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main-layout",
      component: Layout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
          meta: { requireIsAuth: true },
        },
        {
          path: "/play-game",
          name: "play-game",
          component: () => import("../views/PlayGameView.vue"),
          meta: { requireIsAuth: true },
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const { isAuth } = userStore();

  if (to.meta.requireIsAuth && !isAuth) {
    return "/login";
  } else if (!to.meta.requireIsAuth && isAuth) {
    return "/";
  }
});
export default router;
