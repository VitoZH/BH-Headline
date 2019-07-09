import Vue from 'vue'
import App from './App.vue'
// 导入element-ui
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 注册组件
Vue.use(ELEMENT)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
