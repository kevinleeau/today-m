import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//  #1 login routes: src -> views -> login
//  #2 parent/ routes: src -> views -> layout
//    #2.1 child home routes: src -> views -> home
//    #2.2 child qa routes: src -> views -> qa
//    #2.3 child video routes: src -> views -> video
//    #2.4 child setting routes: src -> views -> setting

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      // home path set to default routes
      { path: '', name: 'home', component: () => import('@/views/home') },
      { path: '/qa', name: 'qa', component: () => import('@/views/qa') },
      { path: '/video', name: 'video', component: () => import('@/views/video') },
      { path: '/setting', name: 'setting', component: () => import('@/views/setting') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
