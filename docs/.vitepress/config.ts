/*
 * @Author: ecstAsy
 * @Date: 2022-10-09 14:10:01
 * @LastEditTime: 2022-10-09 15:27:17
 * @LastEditors: ecstAsy
 */

import type { UserConfig } from 'vitepress';
import { head, nav, sidebar } from "./config/index";
export const config: UserConfig = {
  head,
  lang: 'zh-CN',
  base: '/',
  title: "",
  description: 'A Vue3 Components!',
  themeConfig: {
    siteTitle: 'Moko',
    logo: '/logo.svg',
    nav,
    sidebar,
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present ecstAsy'
  }
  }
}

export default config