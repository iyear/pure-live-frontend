// import third-party modules
import Vue from 'vue'
import axios from "axios";
// import { Button, Col, Row, Select } from 'element-ui';
import 'normalize.css/normalize.css';
// import local modules
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
