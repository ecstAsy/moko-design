/*
 * @Author: ecstAsy
 * @Date: 2022-10-11 15:34:57
 * @LastEditTime: 2022-10-11 15:36:00
 * @LastEditors: ecstAsy
 */

import { App } from "vue";
import MoDialog from "./src/index.vue";

MoDialog.install = function (app: App) {
  app.component(MoDialog.name, MoDialog);
  return app;
};

export default MoDialog;
