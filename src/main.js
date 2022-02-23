import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'
import has from './views/permission/permission.js'
import ElementUI from 'element-ui'
import VueParticles from 'vue-particles'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/reset.css'
import VCharts from 'v-charts'

Vue.use(ElementUI);
Vue.use(VueParticles);
Vue.use(VCharts)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

axios.defaults.withCredentials = true;
