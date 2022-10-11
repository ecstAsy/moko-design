/*
 * @Author: ecstAsy
 * @Date: 2022-10-10 14:46:02
 * @LastEditTime: 2022-10-11 15:12:09
 * @LastEditors: ecstAsy
 */

import { App } from "vue";
import MoTable from "./src/index.vue";

MoTable.install = function (app: App) {
  app.component(MoTable.name, MoTable);
  return app;
};

export default MoTable;
