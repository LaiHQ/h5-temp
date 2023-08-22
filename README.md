<h1 align="center">
  <a href="" target="_blank">admin模板</a>
</h1>

## 介绍

这是一个移动端H5模板，基于 Vue3 、 Vite 、TypeScript、Vue Router、 pinia + Vant 、 Axios 、Less 等技术搭建。

## 特点

-   统一编码样式规范，统一 ide 配置。
-   自动化提交验证，检查 git 提交规范，代码 ESLint 检查及代码格式化。
-   版本管理，日志记录。
-   组件，api 自动加载。
-   网络请求封装（重试，缓存数据，取消请求...等）
-   数据持久化，数据加密等。
-   基于 token 身份验证
-   打包优化（分析页面，低版本兼容，文件压缩，图片压缩...等）
-   文档说明

## 安装

```sh
pnpm install
```

## 启动

```sh
pnpm run dev
```

## 打包

```sh
// 开发环境
pnpm run build:dev

// 测试环境
pnpm run build:uat

// 预发布
pnpm run build:staging

// 生产环境
pnpm run build:prod
```

## 文档

```sh
pnpm run docs:dev
```

## 一些方案

## 适配采用的方案

```js
// 安装
// pnpm i postcss-pxtorem amfe-flexible -D

// main.js
import "amfe-flexible"

//vite.config.js
import postCssPxToRem from "postcss-pxtorem"
export default defineConfig({
  css: {
    postcss: {
      plugins: [
         postCssPxToRem({
            rootValue: 37.5, // 1rem的大小
            propList: ["*", ], // 需要转换的属性，这里选择全部都进行转换
            selectorBlackList:[/^.pc/,] // 以pc开头的class不转换
          })
      ]
    }
  }
})
```

## 动画使用

- 页面切换模拟了原生页面体验
- css动画库使用了`animate.css`,dom元素使用class类：`animate__animated animate__fadeIn`
- 动画控制使用`hooks/useAnimate`,然后再页面元素设置相关属性
- 自定义css动画

## 点击延迟问题

```js
import FastClick from "fastclick"

FastClick(document.body)
````

## iso 滑动回弹问题

```css
body,
html {
    overflow: hidden;
    width: 100%;
    height: 100%;
}

body {
    box-sizing: border-box;
    position: relative;
}

#app {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    font-size: 16px;
}
```

## iso 滚动条滑动回弹复位问题

```css
-webkit-overflow-scrolling: touch;
```

## 手势放大页面问题

```js
window.onload = function () {
    // 禁用双指放大
    document.documentElement.addEventListener(
        "touchstart",
        function (event) {
            if (event.touches.length > 1) {
                event.preventDefault()
            }
        },
        {
            passive: false
        }
    )

    // 禁用双击放大
    var lastTouchEnd = 0
    document.documentElement.addEventListener(
        "touchend",
        function (event) {
            var now = Date.now()
            if (now - lastTouchEnd <= 300) {
                event.preventDefault()
            }
            lastTouchEnd = now
        },
        {
            passive: false
        }
    )
}
```

## 1px 采用的方案

## 扫一扫

## 二维码

``` js
// pnpm install --save qrcode

```

https://www.npmjs.com/package/qrcode#api

https://blog.csdn.net/yuansusu_/article/details/128799366

## H5 唤起客户端

https://lvan-zhang.blog.csdn.net/article/details/121210350

https://github.com/suanmei/callapp-lib

## 微信网页开发

https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/iOS_WKWebview.html

## 通信方案

DSBridge
https://github.com/wendux/DSBridge-Android
https://github.com/wendux/DSBridge-IOS

## 键盘兼容

https://juejin.cn/post/6844903780731846663

## 滑屏

https://swiperjs.com/vue

## PWA

配置 vite-plugin-pwa
打包成 app ： https://www.pwabuilder.com/
