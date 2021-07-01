# rollop-cli
一个 rollop 打包配置脚手架，提供静默刷新 token 功能

<h2 align="center">支持运行各大主流浏览器，webview</h2>

### 目录说明
```
|-- ZSOpenCoreSDK
    |-- build 打包配置相关
    |-- lib 第三方库存放
    |-- src sdk 开发代码
```

### H5 请求使用 axios，其他渠道请求基于渠道请求的封装，如微信：wx.request({})

### Development Setup

```bash
# install deps
npm install dev

# build dist files
npm run build
> all -- 打包全渠道
> h5  -- 浏览器渠道
> wx  -- 微信渠道

```

