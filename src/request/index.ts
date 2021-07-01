import h5Request from './h5Request'
import wxRequest from './wxRequest'
import qqRequest from './qqRequest'

let request: any = ''

if (process.env.NODE_ENV === 'h5' || process.env.NODE_ENV === 'dev') {
  request = h5Request
}

if (process.env.NODE_ENV === 'wx') {
  request = wxRequest
}

if (process.env.NODE_ENV === 'qq') {
  request = qqRequest
}

export default request

export const version = 'v1.0.0'
