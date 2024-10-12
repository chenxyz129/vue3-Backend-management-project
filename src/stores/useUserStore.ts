import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import router from "@/router";
import { routes } from "@/router/routes";
import { reqUserInfo } from "@/api/user/index";
import { reqLogout } from "../api/user";
//@ts-ignore
import cloneDeep from "lodash/cloneDeep";
import type {
  loginFormData,
  loginResponData,
  InfoResponData,
} from "@/api/user/types";

function fillRoutes(asyncRoutes: any, userRoutes: any) {
  return asyncRoutes.filter((item: any) => {
    if (userRoutes.includes(item.name)) {
      if (Object.hasOwn(item, "children")) {
        item.children = fillRoutes(item.children, userRoutes);
      }
      return true;
    }
  });
}
const useUserStore = defineStore("User", {
  state: () => ({
    token: localStorage.getItem("TOKEN") || "",
    menuRoutes: routes,
    username: "",
    avatar: "",
  }),
  actions: {
    async UserLogin(data: loginFormData) {
      const result: loginResponData = await reqLogin(data);
      if (result.code == 200) {
        this.token = result.data;
        localStorage.setItem("TOKEN", this.token);
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    restRoutes() {
      // this.menuRoutes=this.constRoutes
    },
    async getUserInfo() {
      const result: InfoResponData = await reqUserInfo();
      console.log(result);
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
