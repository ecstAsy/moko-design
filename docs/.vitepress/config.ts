/*
 * @Author: ecstAsy
 * @Date: 2022-10-08 16:28:34
 * @LastEditTime: 2022-10-08 16:46:42
 * @LastEditors: ecstAsy
 */

import type { UserConfig } from 'vitepress';
import * as process from 'process';

const env = process.env.NODE_ENV;

export const config: UserConfig = {
  lang: 'zh-CN',
  base: env === 'production' ? '/web-vue/' : '/',
  title: 'Web Vue',
  description: 'A Vue 3 UI Framework',
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'Wei Design',
    lastUpdated: 'Last Updated',
    logo: '/logo.svg',
    logoSmall: '/logo.svg',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present forguo'
    }
  }
}
export default config