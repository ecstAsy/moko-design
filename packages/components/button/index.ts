/*
 * @Author: ecstAsy
 * @Date: 2022-10-02 14:01:37
 * @LastEditTime: 2022-10-08 18:10:01
 * @LastEditors: ecstAsy
 */

import { App } from 'vue';
import MButton from './src/index.vue';
console.log(MButton.name);

MButton.install = function (app: App) {
  app.component('MokoButton', MButton)
  return app
}

export default MButton