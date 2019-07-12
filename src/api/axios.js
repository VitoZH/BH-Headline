// 配置axios
import axios from 'axios'
// 配置自定义实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  // headers: {
  // Authprization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('bhheadline')).token
  // }
})
// 请求拦截
instance.interceptors.request.use(config => {
  const user = window.sessionStorage.getItem('bhheadline')
  // 给头部加认证信息
  if (user) {
    config.headers = {
      Authprization: 'Bearer' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => response, error => {
  // 判断状态码并跳转
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
