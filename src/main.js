import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VueFloatLabel from "vue-float-label";
import VueConfirmDialog from 'vue-confirm-dialog'
import VueFormulate from '@braid/vue-formulate'

Vue.use(BootstrapVue)
Vue.use(VueFloatLabel);
Vue.use(VueConfirmDialog);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);
Vue.use(VueFormulate)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// Agregamos la URL base de nuestra API
/*
  localhost = 'http://localhost:3000/api';
  hosting   =  ''
*/
axios.defaults.baseURL = 'http://localhost:3000/api';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
