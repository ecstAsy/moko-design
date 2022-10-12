/*
 * @Author: ecstAsy
 * @Date: 2022-10-08 09:47:34
 * @LastEditTime: 2022-10-12 13:58:09
 * @LastEditors: ecstAsy
 */

import { App } from 'vue';
import components from './component';

export * from './component';
console.log(components);

const install = function (app: App) {
  components.forEach((component) => {
    app.use(component as unknown as { install: () => any });
  });
};

export default {
  install,
};
