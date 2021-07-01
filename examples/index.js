const ZSOpenCore = require('../dist/zsOpenCore.min')
// import ZSOpenCore from '../dist/zsOpenCore.min.js'

console.log(ZSOpenCore)

ZSOpenCore.config({
  env: 'nc',
  appKey: '10061wq5D2r7Z1PcTJQ1CQqzMfwRYNo2',
  appSecret: 'QXD8uMnlCI12ULRlRMKBc3mtsmrKtYsW',
  packageNo: '10061000001',
  platformPublickey: 'nc',
  packageName: '121',
  terminalType: 1
})

ZSOpenCore.ready(function () {
  console.log('初始化成功了')
})
