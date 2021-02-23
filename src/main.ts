import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/components/lazy_use'
import '@/auth'
import '@/enhancement'
import VueCompositionApi from '@vue/composition-api'

import './override.less'

Vue.use(VueCompositionApi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
