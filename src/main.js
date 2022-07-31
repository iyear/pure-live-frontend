// import third-party modules
import axios from 'axios';
import ElementUI from 'element-ui';
import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
// import local modules
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
