// 封装vue插件，完成当前目录下所有组件的全局注册
import MyBread from '@/components/bread.vue'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}
