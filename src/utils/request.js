import axios from 'axios'
import store from '@/store/index.js'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起会首先经过这里
  const { user } = store.state
  if (user && user.token) {
    // 对config重新赋值并return出去
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 如果请求还没发出去就发生错会经过这里
  return Promise.reject(error)
})

// 响应拦截器

export default request
