import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/global.css';
console.log('GitHub Username:', process.env.VUE_APP_GITHUB_USERNAME)
createApp(App).use(router).mount('#app');
