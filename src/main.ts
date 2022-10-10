import { createApp } from "vue";
import * as Icons from "@element-plus/icons-vue";
import "./style.css";
import App from "./App.vue";
import MokoDesign from "../packages/index";

const app = createApp(App);
Object.keys(Icons).forEach((icon) => {
  app.component(icon, Icons[icon as keyof typeof Icons]);
});
app.use(MokoDesign).mount("#app");
