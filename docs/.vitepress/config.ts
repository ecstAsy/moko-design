/*
 * @Author: ecstAsy
 * @Date: 2022-10-09 14:10:01
 * @LastEditTime: 2022-10-09 18:17:02
 * @LastEditors: ecstAsy
 */

import type { UserConfig } from 'vitepress';
import { head, nav, sidebar } from "./config/index";
import { mdPlugin } from './config/plugins';

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
  },
  markdown: {
    lineNumbers: true,
    config: (md) => mdPlugin(md),
  },
}

export default config