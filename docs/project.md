# 概述

::: warning 为了能更高效的开发，更好的维护需注意：
请先阅读代码规范，项目提交规范等，了解项目已有的业务处理方案，优先采用。

当前方案不足以满足业务时，在寻求其他解决方案并整理成文档，或者说现有方案本身存在问题，需要改进，提出改进方案后团队探讨，达成一致则可使用。
:::

- 目录结构 （架构，目录规范，配置等）
- 全局变量 （css变量，业务相关等）
- 静态资源处理（svg使用，图片等）
- 文件上传处理（oss上传，切片等）
- 网络请求处理（重试，缓存等）
- 大数据渲染处理（虚拟列表显示）
- 缓存处理（本地缓存，强缓存，加密）
- 通信处理（页面，组件，全局等）
- 异常处理（错误处理，上报等）
- 耗时任务处理（密集型计算多线程等）
- 国际化处理（多语言）
- util工具使用（时间格式处理，等）

## 目录结构

``` txt
├── index.html						模板文件
├── mock							mockjs
├── public							公共资源
├── src
│   ├── App.vue
│   ├── api							api接口定义
│   ├── components					公共组件
│   ├── 
│   ├── directive					指令
│   ├── 						
│   ├── layouts						布局模板
│   ├── main.ts						入口文件
│   ├── plugins						插件
│   ├── router						路由
│   │   ├── guard.ts			守卫
│   │   ├── index.ts			入口文件
│   │   ├── module				路由模块定义
│   │   └── routes.ts			基础路由
│   ├── store					pinia状态
│   ├── styles
│   │   └── global.scss			全局样式
│   └── views					页面
├── 			
├── tsconfig.json
├── types						TS类型声明
├── vite
│   ├── alias.ts						别名定义
│   ├── optimizeDeps.ts			vite优化选项
│   ├── plugins
│   │   ├── autoImport.ts 		按需加载定义
│   │   ├── index.ts
│   │   └── mock.ts					mockjs
│   └── util.ts
└── vite.config.js
```

## 静态资源处理

## 文件上传处理