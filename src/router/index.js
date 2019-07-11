// 引入vue模块
import Vue from 'vue'
// 引入vue-router模块
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
// 注册
Vue.use(VueRouter)
// 初始化
const router = new VueRouter({
  // 配置路由规则
  routes: [
    { name: 'login', path: '/login', component: Login },
    { name: 'home', path: '/', component: Home }
  ]
})
// 导出
export default router
