import { wxLogin, wxPay } from './wx'

export function login(options: any): void {
  if (process.env.NODE_ENV === 'wx') {
    console.log('wx')
    wxLogin(options)
  }
}

export function pay(options: any): void {
  if (process.env.NODE_ENV === 'wx') {
    console.log('wx')
    wxPay(options)
  }
}
