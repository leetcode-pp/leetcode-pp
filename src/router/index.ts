import Vue from 'vue'
import VueRouter, { RouterOptions } from 'vue-router'
import { asyncRouterMap } from './router.config'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: asyncRouterMap
} as RouterOptions)
export default router
