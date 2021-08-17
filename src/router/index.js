import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//  #1 /login routes: src -> views -> login
//  #2 parent/ routes: src -> views -> layout
//     #2.1 child home routes: src -> views -> home
//     #2.2 child qa routes: src -> views -> qa
//     #2.3 child video routes: src -> views -> video
//     #2.4 child setting routes: src -> views -> setting
//  #3 /search routes: src -> views -> search
//  #4 /article routes: src -> views -> article

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
  },
  { path: '/search', name: 'search', component: () => import('@/views/search') },
  // 开启路由传参，把路由参数映射到组件中去
  { path: '/article/:articleId', name: 'article', component: () => import('@/views/article'), props: true },
  { path: '/user/:profile', name: 'user-profile', component: () => import('@/views/user'), props: true }
]

const router = new VueRouter({
  routes
})

export default router
