import { defineStore } from "pinia";
import type { loginForm } from "@/api/user/types";
import { reqLogin } from "@/api/user";
import routes from "@/router/routes";

const useUserStore = defineStore("User", {
  state: () => ({
    token: localStorage.getItem("TOKEN") || "",
    menuRoutes : routes,
  }),
  actions: {
    async UserLogin(data: loginForm) {
      let result: any = await reqLogin(data);
      console.log(result);
      if (result.code == 200) {
        this.token = result.data.token;
        localStorage.setItem("TOKEN", this.token);
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
  },

  getters: {},
});
export default useUserStore;
