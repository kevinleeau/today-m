import axios from 'axios'
import store from '@/store/index.js'
import jsonBig from 'json-bigint'
// jsonBig.parse() json to js Object, then .tostring()
// jsonBig.stringify() js Object to json
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 自定义后台返回的数据格式，后台数据格式可能多样，所以使用try & catch
  transformResponse: [function (data) {
    try {
      jsonBig.parse(data)
    } catch (err) {
      return data
    }
  }]
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
