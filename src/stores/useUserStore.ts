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
    // //首页 数据大屏 404 any
    // constRoutes: [
    //   {
    //     path: "/",
    //     redirect: "/Home",
    //     meta: {
    //       isHidden: true,
    //     },
    //   },
    //   {
    //     path: "/Home",
    //     name: "Home",
    //     component: () => import("@/views/layout/index.vue"),
    //     meta: {
    //       title: "首页",
    //       icon: "House",
    //       hideBreadcrumb: false,
    //     },
    //     children: [
    //       {
    //         path: "/Home",
    //         name: "Home",
    //         component: () => import("@/views/home/index.vue"),
    //         meta: {
    //           title: "首页",
    //           icon: "House",
    //           hideBreadcrumb: true,
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     path: "/screen",
    //     name: "Screen",
    //     component: () => import("@/views/screen/index.vue"),
    //     meta: {
    //       title: "数据可视化",
    //       icon: "Platform",
    //     },
    //   },
    //   {
    //     path: "/404",
    //     name: "404",
    //     meta: {
    //       title: "404",
    //       isHidden: true,
    //       icon: "User",
    //     },
    //     component: () => import("@/views/404/index.vue"),
    //   },
    //   {
    //     path: "/:pathMatch(.*)*",
    //     name: "Any",
    //     redirect: "/404",
    //     meta: {
    //       title: "any",
    //       isHidden: true,
    //     },
    //   },
    //   {
    //     path: "/login",
    //     name: "Login",
    //     meta: {
    //       title: "login",
    //       isHidden: true,
    //       icon: "House",
    //     },
    //     component: () => import("@/views/login/index.vue"),
    //   },
    // ],
    // //用户相应的菜单，权限管理、商品管理
    // asyncRoutes: [
    //   {
    //     path: "/acl",
    //     name: "Acl",
    //     component: () => import("@/views/layout/index.vue"),
    //     meta: {
    //       title: "权限管理",
    //       icon: "Lock",
    //     },
    //     children: [
    //       {
    //         path: "/acl/permission",
    //         name: "Permission",
    //         component: () => import("@/views/acl/permission/index.vue"),
    //         meta: {
    //           title: "菜单管理",
    //           icon: "Grid",
    //         },
    //       },
    //       {
    //         path: "/acl/role",
    //         name: "Role",
    //         component: () => import("@/views/acl/role/index.vue"),
    //         meta: {
    //           title: "角色管理",
    //           icon: "User",
    //         },
    //       },
    //       {
    //         path: "/acl/user",
    //         name: "User",
    //         component: () => import("@/views/acl/user/index.vue"),
    //         meta: {
    //           title: "用户管理",
    //           icon: "UserFilled",
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     path: "/product",
    //     name: "Product",
    //     component: () => import("@/views/layout/index.vue"),
    //     meta: {
    //       title: "商品管理",
    //       icon: "GoodsFilled",
    //     },
    //     children: [
    //       {
    //         path: "/product/attr",
    //         name: "Attr",
    //         component: () => import("@/views/product/attr/index.vue"),
    //         meta: {
    //           title: "属性管理",
    //           icon: "Tickets",
    //         },
    //       },
    //       {
    //         path: "/product/sku",
    //         name: "Sku",
    //         component: () => import("@/views/product/sku/index.vue"),
    //         meta: {
    //           title: "sku管理",
    //           icon: "Orange",
    //         },
    //       },
    //       {
    //         path: "/product/spu",
    //         name: "Spu",
    //         component: () => import("@/views/product/spu/index.vue"),
    //         meta: {
    //           title: "spu管理",
    //           icon: "Calendar",
    //         },
    //       },
    //       {
    //         path: "/product/trademark",
    //         name: "Trademark",
    //         component: () => import("@/views/product/trademark/index.vue"),
    //         meta: {
    //           title: "品牌管理",
    //           icon: "GoldMedal",
    //         },
    //       },
    //     ],
    //   },
    // ],
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
