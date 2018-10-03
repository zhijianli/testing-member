## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

### 详情页 新增 & 修改

    pageNameMsg.vue  => 使用

    pageNameAdd.vue =>  作废
    pageNameUpdate.vue => 作废

### 七牛图片

    app.vue qiniu.vue  改url

    测试环境  url: `http://oml9ntix5.qnssl.com`
    正式环境  url: `http://picture.120xinmao.com`

### 导出Excel

    server.js 导出相关接口线上环境接口需要独立设置

#### 网易云信IM聊天
    
    聊天添加全部变量  isShine 和 imIsShineT  注意不要重名  添加函数imShineIndexFn

    