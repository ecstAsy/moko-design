/*
 * @Author: ecstAsy
 * @Date: 2022-10-24 13:29:58
 * @LastEditTime: 2022-10-25 13:53:08
 * @LastEditors: ecstAsy
 */

import { App } from 'vue';
import MokoFileInfo from './src/index.vue';

MokoFileInfo.install = function (app: App) {
  app.component(MokoFileInfo.name, MokoFileInfo);
  return app;
};

export default MokoFileInfo;
