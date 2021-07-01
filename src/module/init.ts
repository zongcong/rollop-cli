import { setInitParams, InItParams } from '@/config'
import { isObject, isRequire } from '@/utils/helpers'

let readyCallback: () => void // 初始化完成回调
let errorCallBack: () => void // 初始化失败回调

/*  配置
 * @param  options object
 * @param env: 环境 nc：内测 wc：外测 bw：备用外测 xbw：新备用外测 ww 外网 默认 ww
 * @param appKey: appKey required
 * @param appSecret: appSecret required
 * @param channelNo 渠道号 required
 * @param packageNo: 分包号 required
 * @param ip 客户端IP
 * @param machineCode 机器码
 * @param osVersion 终端系统版本,如：Android.8.3.1
 * @param machineModel 机型，如：iPhone
 * @param platformPublickey: 开放平台公钥 required
 * @param packageName: 包名 required
 * @param terminalType: 终端类型 required
 * @param appVersion: app 版本 required
 * */
export function config(options: InItParams): void {
  if (!isObject(options)) throw new Error('"options" must be an object')
  if (typeof options.env === 'undefined') options.env = 'ww'
  if (!isRequire(options.appKey)) throw new Error('"appKey" is required') // appId
  if (!isRequire(options.appSecret)) throw new Error('"appSecret" is required') // appSecret
  if (typeof options.appVersion === 'undefined') options.appVersion = ''  //app版本
  setInitParams(options)
  // 具体配置或者打包全部
  // if(process.env.NODE_ENV === 'wx' || process.env.NODE_ENV === 'all') {
  //   console.log('wx')
  // }

  setTimeout(() => {
    readyCallback && readyCallback()
    errorCallBack && errorCallBack()
  }, 1000)
}

// 配置初始化完成之后执行
export function ready(fn): void {
  readyCallback = fn
}

// 配置初始化失败之后执行
export function error(fn): void {
  errorCallBack = fn
}
