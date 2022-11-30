/*
 * @Author: ecstAsy
 * @Date: 2022-10-08 09:47:34
 * @LastEditTime: 2022-11-30 11:08:32
 * @LastEditors: ecstAsy
 */

import { App } from 'vue';
import components from './component';

export * from './component';

const install = function (app: App) {
  components.forEach((component) => {
    app.use(component as unknown as { install: () => any });
  });
};

export default {
  install,
};
