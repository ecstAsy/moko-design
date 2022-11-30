/*
 * @Author: ecstAsy
 * @Date: 2022-11-30 10:41:29
 * @LastEditTime: 2022-11-30 10:43:41
 * @LastEditors: ecstAsy
 */
import { App } from 'vue';
import MoOrganizationStructure from './src/index.vue';

MoOrganizationStructure.install = function (app: App) {
  app.component(MoOrganizationStructure.name, MoOrganizationStructure);
  return app;
};

export default MoOrganizationStructure;
