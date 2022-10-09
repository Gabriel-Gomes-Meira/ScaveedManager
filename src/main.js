import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import Axios from 'axios'

Vue.config.productionTip = false
Axios.defaults.baseURL = 'http://localhost:3000';
Vue.prototype.$axios = Axios
new Vue({
  router,
  store,
  vuetify,  
  render: h => h(App)
}).$mount('#app')
