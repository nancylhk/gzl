// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import http from './utils/http.js'
import api from './api/api.js'
import  ElementUI from  'element-ui'
import  'element-ui/lib/theme-chalk/index.css'
import './permission'

Vue.use(ElementUI);
Vue.prototype.$http = http;
Vue.prototype.api = api;
 

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
