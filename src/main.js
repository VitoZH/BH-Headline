import Vue from 'vue'
import App from './App.vue'
// 导入element-ui
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 默认索引支持
// 在使用vue-cli时，@作为前缀在路径中使用时，代表src目录
import router from './router'
// 注册组件
Vue.use(ELEMENT)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
