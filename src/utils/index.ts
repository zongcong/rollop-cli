import { getInitParams } from '@/config'
import hmacSHA256 from 'crypto-js/hmac-sha512'
// const hmacSHA256 = require('crypto-js/hmac-sha512')

export function getStorage(key: string): any {
  try {
    const data = JSON.parse(localStorage.getItem(key)) || {}
    return data
  }catch (e) {
    return {}
  }
}

export function setStorage(key: string, value: any): void {
  const setVal = JSON.stringify(value)
  localStorage.setItem(key, setVal)
}

export function stringify(data: object): object {
  const formData = new FormData()
  Object.keys(data).map(item => {
    formData.append(item, data[item])
  })
  return formData
}

// 根据 ASCII 码排序对象
export function paramSortAscii(obj: any):string {
  const newKey = Object.keys(obj).sort();
  // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  const newObj = {};// 创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newKey.length; i++) { // 遍历newKey数组
    newObj[newKey[i]] = obj[newKey[i]]; // 向新创建的对象中按照排好的顺序依次增加键值对
  }
  let asciiParams = '';
  for (let i in newObj) {
    asciiParams += i + '=' + newObj[i] + '&';
  }
  asciiParams = asciiParams.split('&').filter(item => item).join('&')
  return asciiParams;
}

// 生成 hmacSHA256 签名
export function encryptHmac(data: string): string {
  const { appSecret } = getInitParams()
  const hash = hmacSHA256(data, appSecret)
  return hash.toString()
}


