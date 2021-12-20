import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/components/lazy_use'
import '@/auth'
import '@/enhancement'
import VueCompositionApi from '@vue/composition-api'
import { originalHostname } from './config/index.js'

import './override.less'

Vue.use(VueCompositionApi)

Vue.config.productionTip = false

if ([originalHostname].includes(window.location.hostname)) {
  alert('此网址已废弃')
  // window.location.href = `https://${originalHostname}/91`
} else {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
