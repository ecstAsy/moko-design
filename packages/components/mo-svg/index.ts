/*
 * @Author: ecstAsy
 * @Date: 2022-10-02 14:01:37
 * @LastEditTime: 2022-10-10 14:35:00
 * @LastEditors: ecstAsy
 */

import { App } from "vue";
import MoSvg from "./src/index.vue";

MoSvg.install = function (app: App) {
  app.component(MoSvg.name, MoSvg);
  return app;
};

export default MoSvg;
