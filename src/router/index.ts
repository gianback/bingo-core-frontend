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
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: HomeView,
        },
        {
          path: "/play-game",
          name: "play-game",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/PlayGameView.vue"),
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

router.beforeEach((to, _from, next) => {
  const { isAuth } = userStore();
  console.log({ isAuth });
  if (to.name === "login" || to.name === "register") {
    if (isAuth) {
      next("/");
    } else {
      next();
    }
  } else {
    if (isAuth) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
