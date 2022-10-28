/*
 * @Author: ecstAsy
 * @Date: 2022-10-24 13:29:58
 * @LastEditTime: 2022-10-28 10:48:28
 * @LastEditors: ecstAsy
 */

import { App } from 'vue';
import MoFileInfo from './src/index.vue';

MoFileInfo.install = function (app: App) {
  app.component(MoFileInfo.name, MoFileInfo);
  return app;
};

export default MoFileInfo;
