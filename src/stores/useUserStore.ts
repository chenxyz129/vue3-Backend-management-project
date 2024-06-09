import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import routes from "@/router/routes";
import { reqUserInfo } from "@/api/user/index";
import { reqLogout } from "../api/user";
import type {
  loginFormData,
  loginResponData,
  InfoResponData,
} from "@/api/user/types";
const useUserStore = defineStore("User", {
  state: () => ({
    token: localStorage.getItem("TOKEN") || "",
    menuRoutes: routes,
    username: "",
    avatar: "",
  }),
  actions: {
    async UserLogin(data: loginFormData) {
      let result: loginResponData = await reqLogin(data);

      if (result.code == 200) {
        this.token = result.data;
        localStorage.setItem("TOKEN", this.token);
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async getUserInfo() {
      const result: InfoResponData = await reqUserInfo();

      if (result.code == 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async userLogout() {
      let result = await reqLogout();
      if (result.code == 200) {
        this.username = "";
        this.avatar = "";
        localStorage.removeItem("TOKEN");
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },

  getters: {},
});
export default useUserStore;
