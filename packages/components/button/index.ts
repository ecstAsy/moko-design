/*
 * @Author: ecstAsy
 * @Date: 2022-10-02 14:01:37
 * @LastEditTime: 2022-10-10 13:20:26
 * @LastEditors: ecstAsy
 */

import { App } from "vue";
import MoButton from "./src/index.vue";

MoButton.install = function (app: App) {
  app.component(MoButton.name, MoButton);
  return app;
};

export default MoButton;
