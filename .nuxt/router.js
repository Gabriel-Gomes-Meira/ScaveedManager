import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _05315df1 = () => interopDefault(import('../pages/destroyer.vue' /* webpackChunkName: "pages/destroyer" */))
const _026a6b59 = () => interopDefault(import('../pages/listens/index.vue' /* webpackChunkName: "pages/listens/index" */))
const _35b75276 = () => interopDefault(import('../pages/model_tasks/index.vue' /* webpackChunkName: "pages/model_tasks/index" */))
const _76c51e8b = () => interopDefault(import('../pages/notification_models/index.vue' /* webpackChunkName: "pages/notification_models/index" */))
const _b3b5ec2a = () => interopDefault(import('../pages/queued_tasks/index.vue' /* webpackChunkName: "pages/queued_tasks/index" */))
const _2329ee59 = () => interopDefault(import('../pages/sites/index.vue' /* webpackChunkName: "pages/sites/index" */))
const _40495a42 = () => interopDefault(import('../pages/table_model.vue' /* webpackChunkName: "pages/table_model" */))
const _72974a85 = () => interopDefault(import('../pages/listens/create.vue' /* webpackChunkName: "pages/listens/create" */))
const _31ca66ce = () => interopDefault(import('../pages/model_tasks/create.vue' /* webpackChunkName: "pages/model_tasks/create" */))
const _ecda04da = () => interopDefault(import('../pages/notification_models/create.vue' /* webpackChunkName: "pages/notification_models/create" */))
const _22b6b758 = () => interopDefault(import('../pages/notification_models/telegram.vue' /* webpackChunkName: "pages/notification_models/telegram" */))
const _fc0cd5ac = () => interopDefault(import('../pages/notification_models/vuecardmodel.vue' /* webpackChunkName: "pages/notification_models/vuecardmodel" */))
const _69c82785 = () => interopDefault(import('../pages/sites/create.vue' /* webpackChunkName: "pages/sites/create" */))
const _53d71a9c = () => interopDefault(import('../pages/user/setting.vue' /* webpackChunkName: "pages/user/setting" */))
const _ea7c67c8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/destroyer",
    component: _05315df1,
    name: "destroyer"
  }, {
    path: "/listens",
    component: _026a6b59,
    name: "listens"
  }, {
    path: "/model_tasks",
    component: _35b75276,
    name: "model_tasks"
  }, {
    path: "/notification_models",
    component: _76c51e8b,
    name: "notification_models"
  }, {
    path: "/queued_tasks",
    component: _b3b5ec2a,
    name: "queued_tasks"
  }, {
    path: "/sites",
    component: _2329ee59,
    name: "sites"
  }, {
    path: "/table_model",
    component: _40495a42,
    name: "table_model"
  }, {
    path: "/listens/create",
    component: _72974a85,
    name: "listens-create"
  }, {
    path: "/model_tasks/create",
    component: _31ca66ce,
    name: "model_tasks-create"
  }, {
    path: "/notification_models/create",
    component: _ecda04da,
    name: "notification_models-create"
  }, {
    path: "/notification_models/telegram",
    component: _22b6b758,
    name: "notification_models-telegram"
  }, {
    path: "/notification_models/vuecardmodel",
    component: _fc0cd5ac,
    name: "notification_models-vuecardmodel"
  }, {
    path: "/sites/create",
    component: _69c82785,
    name: "sites-create"
  }, {
    path: "/user/setting",
    component: _53d71a9c,
    name: "user-setting"
  }, {
    path: "/",
    component: _ea7c67c8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
