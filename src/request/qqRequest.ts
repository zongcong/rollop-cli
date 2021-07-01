import { debugInfo } from '@/utils/helpers'
import { openCenterApiUrl, setBasic } from '@/config'
import { stringify } from '@/utils'


let requestList = []

function refreshToken(data) {
  return request({
    url: openCenterApiUrl() + '/connect/token?api-version=' + version,
    method: 'post',
    data
  })
}

// 刷新 token
function refToken():void {
  // @ts-ignore
  const token: string = qq.getStorageSync('zsOpenCoreToken')
  const data = {
    grant_type: 'refresh_token',
    refresh_token: token,
    scope: '' // 后端提供
  }
  refreshToken(stringify(data))
    .then(res => {
      try {
        // @ts-ignore
        qq.setStorageSync('zsOpenCoreToken', res.token)
        requestList.map(cb => cb())
      } catch (e) {
      }
    })
}

const request = options => {
  return new Promise((resolve, reject) => {
    const { data, method } = options
    let token: string = null
    let header: object = { 'Content-Type': 'application/json' }
    try {
      // @ts-ignore
      token = qq.getStorageSync('zsOpenCoreToken')
    } catch (e) {
    }
    if (data && method !== 'get') {
      options.data = JSON.stringify(data)
    }
    if (token) {
      header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    // 刷新token接口
    if(options.url.indexOf('/connect/token') > -1) {
      header = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${setBasic()}`
      }
    }

    // @ts-ignore
    qq.request({
      header,
      ...options,
      success: function (res) {
        console.log(res)
        debugInfo('api 响应成功：', res)
        if (res.data.success) {
          resolve(res)
        } else {
          // TODO 是否需要过滤登录或者刷新 token 接口
          if (res.data.code === 401) {
            refToken()
            debugInfo('token过期，code为：', res.data.code)
            if(options.url.indexOf('/connect/token') === -1) {
              return new Promise((resolve) => {
                // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                requestList.push(() => {
                  resolve(request(options))
                })
              })
            }
          }
          debugInfo('接口返回失败：', res.data)
          reject(res)
        }
      },
      fail: function (err) {
        debugInfo('请求失败：', err)
        reject(err.data)
      }
    })
  })
}

export default request

export const version = 'v1.0.0'
