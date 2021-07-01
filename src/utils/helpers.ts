export function isObject(obj: object): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isArray(arr: string[] | number[]): boolean {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

export function isRequire (value: any) {
  return typeof value !== 'undefined'
}

export function debugInfo(title: string, info: any) {
  if(process.env.DEBUG) {
    console.log(title, info)
  }
}
