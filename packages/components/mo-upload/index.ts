/*
 * @Author: ecstAsy
 * @Date: 2022-10-27 15:39:01
 * @LastEditTime: 2022-10-28 10:47:06
 * @LastEditors: ecstAsy
 */

import { App } from 'vue';
import MoUpload from './src/index.vue';

MoUpload.install = function (app: App) {
  app.component(MoUpload.name, MoUpload);
  return app;
};

export default MoUpload;
