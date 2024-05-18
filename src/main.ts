import "@/styles/index.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "@/router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "virtual:svg-icons-register";
const app = createApp(App);

app.use(createPinia());
app.use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  //@ts-ignore
  app.component(key, component);
}
app.use(ElementPlus, {
  locale: zhCn,
});
import GlobleComponet from "@/components";
app.use(GlobleComponet);
app.mount("#app");
