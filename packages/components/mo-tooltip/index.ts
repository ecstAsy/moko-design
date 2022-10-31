/*
 * @Author: ecstAsy
 * @Date: 2022-10-31 15:35:42
 * @LastEditTime: 2022-10-31 15:50:23
 * @LastEditors: ecstAsy
 */

import { App } from 'vue';
import MoTooltip from './src/index.vue';

MoTooltip.install = function (app: App) {
  app.component(MoTooltip.name, MoTooltip);
  return app;
};

export default MoTooltip;
