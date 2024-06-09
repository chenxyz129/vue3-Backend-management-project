import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import useUserStore from "@/stores/useUserStore";
import { createPinia } from "pinia";
const pinia = createPinia();
const UserStore = useUserStore(pinia);
const token = UserStore.token;
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  nprogress.start();
  next()
  // console.log(token);
  // if (token) {
  //   if (to.path == "/login") {
  //     //有token的情况下
  //     next("/home");
  //   } else {
  //     next();
  //   }
  // } else {
  //   //没token的情况下

  //   if (to.path == "/login") {
  //     next();
  //   } else {
  //     next("/login");
  //   }
  // }
});
router.afterEach((to, from, next) => {
  nprogress.done();
});
export default router;
