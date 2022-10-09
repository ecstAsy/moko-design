/*
 * @Author: ecstAsy
 * @Date: 2022-10-09 15:11:39
 * @LastEditTime: 2022-10-09 17:45:36
 * @LastEditors: ecstAsy
 */

import { ensureLang, lang } from '../utils/lang';
import navLocale from '../i18n/pages/nav.json';

function getNav() {
  return Object.values(navLocale[lang]).map(item => ({
      ...item,
      // 添加语言前缀，最终为 /zh-CN/guide/design
      link: `${ensureLang(lang)}${item.link}`,
  }))
}

const dropDown = [{
  text: '更多',
  items: [
      { text: 'GitHub', link: 'https://github.com/ecstAsy/moko-design', icon: 'github'},
      { text: 'Gitee', link: 'https://gitee.com/ecst/moko-design', icon: 'gitee' },
  ]
}];


const nav = [...getNav(), ...dropDown];

export default nav