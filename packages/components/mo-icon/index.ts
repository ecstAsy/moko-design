/*
 * @Author: ecstAsy
 * @Date: 2022-10-08 17:47:06
 * @LastEditTime: 2022-10-10 13:20:21
 * @LastEditors: ecstAsy
 */

import { App } from "vue";
import MoIcon from "./src/index.vue";

MoIcon.install = function (app: App) {
  app.component(MoIcon.name, MoIcon);
  return app;
};

export default MoIcon;
