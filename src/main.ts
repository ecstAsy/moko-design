import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import MokoDesign from '../packages/index';

const app = createApp(App);

app.use(MokoDesign).mount('#app')
