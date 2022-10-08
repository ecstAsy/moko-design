/*
 * @Author: ecstAsy
 * @Date: 2022-10-02 14:01:37
 * @LastEditTime: 2022-10-08 09:58:47
 * @LastEditors: ecstAsy
 */

import { App } from 'vue';
import MButton from './src/index.vue';
console.log(MButton);

MButton.install = function (app: App) {
  app.component('MButton', MButton)
  return app
}

export default MButton