<!--
 * @Date: 2023-06-13 20:24:06
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-14 11:48:13
 * @FilePath: \apph5f:\code\yideCode\3421\docs\index.md
-->
# 概述

线上版本：[1.0.0]()

数据统计：[https://www.baidu.com](https://www.baidu.com)

异常监控：[https://www.baidu.com](https://www.baidu.com)

## 环境要求

Node版本:>16.0.0

npm 版本:>8.0.0

## 开发文档

- 业务需求：[https://www.baidu.com](https://www.baidu.com)

- 设计需求：[https://www.baidu.com](https://www.baidu.com)

- 业务接口：[https://www.baidu.com](https://www.baidu.com)

- 缺陷管理：[https://www.baidu.com](https://www.baidu.com)

- 代码规范与Git提交规范：[https://www.baidu.com](https://www.baidu.com)

## 兼容性

## 安装

``` sh
npm i pnpm@7.14.0  -g

pnpm i
```

## 启动

``` sh
pnpm run dev
```

## 部署

``` sh
# 测试环境
pnpm run build:uat
# 预发布环境
pnpm run build:staging
# 生产环境
pnpm run build:prod
```

> dist 目录就是打包产物

### docker部署

``` sh
# 上传自定义镜像
docker build -t web-xx .
# 运行镜像
docker run -d -p 3000:3000  web-xx
```

