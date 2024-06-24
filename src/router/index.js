import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },{
    path: '/user/setting',
    name: 'user-setting',    
    component: () => import( '../views/user/setting.vue')
  },{
    path: '/history/reports',
    name: 'history-reports',    
    component: () => import( '../views/history/reports.vue')
  },{
    path: '/history/tasks',
    name: 'history-tasks',    
    component: () => import( '../views/history/tasks.vue')
  },{
    path: '/history/logs',
    name: 'history-logs',    
    component: () => import( '../views/history/logs.vue')
  },{
    path: '/sites',
    name: 'sites',    
    component: () => import( '../views/sites/')
  },{
    path: '/sites/create',
    name: 'site-create',    
    component: () => import( '../views/sites/create.vue')
  },{
    path: '/listens',
    name: 'listens',    
    component: () => import( '../views/listens/')
  },{
    path: '/listens/create',
    name: 'listen-create',    
    component: () => import( '../views/listens/create')
  },{
    path: '/notification_models/',
    name: 'notification_model',    
    component: () => import( '../views/notification_models/')
  },{
    path: '/notification_models/create',
    name: 'notification_model-create',    
    component: () => import( '../views/notification_models/create.vue')
  },{
    path: '/model_tasks/',
    name: 'model-tasks',    
    component: () => import( '../views/model_tasks/')
  },{
    path: '/model_tasks/create',
    name: 'model-task-create',    
    component: () => import( '../views/model_tasks/create.vue')
  },{
    path: '/queued_tasks/',
    name: 'queued_tasks',    
    component: () => import( '../views/queued_tasks/')
  },{
    path: '/crons',
    name: 'crons',    
    component: () => import( '../views/crons/')
  },{
    path: '/crons/create',
    name: 'cron-create',    
    component: () => import( '../views/crons/create')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
