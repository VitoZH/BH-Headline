// 引入vue模块
import Vue from 'vue'
// 引入vue-router模块
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
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
    children: [
      {
        name: 'welcome',
        path: '/',
        component: Welcome
      }
    ]
  },
  { name: '404', path: '*', component: NotFound }
  ]
})
// 导出
export default router
