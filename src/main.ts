import { createApp } from 'vue';
import * as Icons from '@element-plus/icons-vue';
import './style.css';
import App from './App.vue';
import MokoDesign from '../packages/index';

const app = createApp(App);

Object.keys(Icons).forEach((icon) => {
  app.component(icon, Icons[icon as keyof typeof Icons]);
});

// 防抖
app.directive('debounce', {
  beforeMount(el, binding) {
    let timer: any = {};
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, 300);
    });
  },
});

app.use(MokoDesign).mount('#app');
