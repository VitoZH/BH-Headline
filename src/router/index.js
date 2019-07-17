// 引入vue模块
import Vue from 'vue'
// 引入vue-router模块
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
// 注册
Vue.use(VueRouter)
// 初始化
const router = new VueRouter({
  // 配置路由规则
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [{
      name: 'welcome',
      path: '/',
      component: Welcome
    },
    {
      name: 'article',
      path: '/article',
      component: Article
    },
    {
      name: 'image',
      path: '/image',
      component: Image
    }]
  },
  {
    name: '404',
    path: '*',
    component: NotFound
  }
  ]
})
// 设置前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('bhheadline')
  if (user) return next()
  next('/login')
})
// 导出
export default router
