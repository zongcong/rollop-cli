// axios 引入方式 https://juejin.cn/post/6854573211661631502
import axios from 'axios/dist/axios'
import { setBasic } from '@/config'
import { debugInfo } from '@/utils/helpers'

// TODO 打印封装一个函数，通过配置来控制是否显示打印
const service = axios.create({
  withCredentials: true, // 跨域请求时发送cookie
  timeout: 20000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (config.url.indexOf('/connect/token') > -1) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.headers.common['Authorization'] = 'Basic ' + setBasic()
      // console.log(config, 11111111111)
    }
    return config
  },
  error => {
    debugInfo('请求拦截错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    debugInfo('api 响应成功：', response)
    if (response.data.success) {
      return response.data
    } else {
      if (response.data.code === 401) {
        debugInfo('token过期，code为：', response.data.code)
      }
      debugInfo('接口返回失败：', response.data)
      return Promise.reject(response.data)
    }
  },
  error => {
    debugInfo('请求失败：', error)
    debugInfo('失败返回：', error.response)
    return Promise.reject(error)
  }
)

export default service

export const version = 'v1.0.0'

