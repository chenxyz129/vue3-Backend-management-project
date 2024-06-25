import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
//@ts-ignore
import nprogress from "nprogress";
import useUserStore from "@/stores/useUserStore";
import "nprogress/nprogress.css";
import { createPinia } from "pinia";
const pinia = createPinia();
const UserStore = useUserStore(pinia);
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

router.beforeEach(async (to, from, next) => {
  nprogress.start();
  next()
});
router.afterEach((to, from, next) => {
  nprogress.done();
});
export default router;
