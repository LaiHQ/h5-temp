/*
 * @Descripttion: 构建配置文件
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-02-20 19:52:42
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-24 16:56:46
 */
import { defineConfig } from "vite"
import path from "path"
import vue from "@vitejs/plugin-vue"
import eslintPlugin from "vite-plugin-eslint"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { visualizer } from "rollup-plugin-visualizer"
import { createHtmlPlugin } from "vite-plugin-html"
import { createStyleImportPlugin, VantResolve as VantStyleResolver } from "vite-plugin-style-import"
import autoComopnents from "unplugin-vue-components/vite"
import { VantResolver } from "unplugin-vue-components/resolvers"
import autoImport from "unplugin-auto-import/vite"
import svgr from "vite-plugin-svgr"
import viteImagemin from "vite-plugin-imagemin"
import stylelintPlugin from "vite-plugin-stylelint"
import viteCompression from "vite-plugin-compression"
import autoprefixer from "autoprefixer"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { version } from "./package.json"
import siteConfig from "./config"

import legacyPlugin from "@vitejs/plugin-legacy"
import importToCDN from "vite-plugin-cdn-import"
import externalGlobals from "rollup-plugin-external-globals"
import commonjs from "rollup-plugin-commonjs"
import mkcert from "vite-plugin-mkcert"
import inspect from "vite-plugin-inspect"
import optimizationPersist from "vite-plugin-optimize-persist"
import pkgConfig from "vite-plugin-package-config"
import picocolors from "picocolors"
import postCssPxToRem from "postcss-pxtorem"
import { VitePWA } from 'vite-plugin-pwa';

const { title, preloadScript, description, keywords, originURL, icon } = siteConfig

const versionTime = new Date().getTime()

function updatePluginVersion() {
    return {
        name: "update-plugin-version",
        closeBundle() {
            const fs = require("fs")
            // const Timestamp = new Date().getTime()

            // eslint-disable-next-line quotes
            fs.writeFile("dist/version.json", JSON.stringify({ version: `${version}-${versionTime}` }), (err) => {
                if (err) {
                    return console.log(err)
                }
            })
        }
    }
}


// 虚拟模块名称
const virtualDevIpModuleId = 'virtual:devip';
// Vite 中约定对于虚拟模块，解析后的路径需要加上`\0`前缀
const resolvedDevIpVirtualModuleId = '\0' + virtualDevIpModuleId;

let host = 'http://localhost:8080/'

function docsPlugin(options = {}) {
    const { silent = false } = options
    let docsProcess = null
    return {
        name: "docs-plugin",
        apply: "serve",
        resolveId(id) {
            if (id === virtualDevIpModuleId) { 
              return resolvedDevIpVirtualModuleId;
            }
        },
        load(id) {
            if (id === resolvedDevIpVirtualModuleId) {
                const code = `export default function getDevIp() { return "${host}" }`;
                return  code
            }
        },
        configureServer(server) {
            const _print = server.printUrls
            server.printUrls = async () => {
                _print()
                if (!silent) {
                    // const { spawn } = require("child_process")
                    // docsProcess = await spawn("cmd", ["/c", "npm run docs:dev"], {
                    //     stdio: "inherit"
                    // })
                    host = server.resolvedUrls?.network[0];
                    if (host) {
                        const qrcode = require('qrcode-terminal')
                        const colorUrl = (url2) => picocolors.green(url2.replace(/:(\d+)\//, (_, port) => `:${picocolors.bold(port)}/`))
                        console.log(`  ${picocolors.green("\u279C")}  ${colorUrl(`扫描二维码快速打开: ⤦"`)}`)
                        qrcode.generate(`   ${host}`, { small: true });
                    }
                }
            }
            // process.on("exit", (code) => {
            //     docsProcess?.kill()
            // })
        }
    }
}

const isProduction = process.env.NODE_ENV === "production"
const CDN_URL = "/"

// 图片使用cdn
// .env定义全局变量 VITE_IMG_BASE_URL=https://my-image-cdn.com
// src/vite-env.d.ts增加类型声明
// /// <reference types="vite/client" />

// interface ImportMetaEnv {
//     readonly VITE_APP_TITLE: string;
//     // 自定义的环境变量
//     readonly VITE_IMG_BASE_URL: string;
//   }
//   interface ImportMeta {
//     readonly env: ImportMetaEnv;
//   }

// 使用；<img src={new URL('./logo.png', import.meta.env.VITE_IMG_BASE_URL).href} />

// https://vitejs.dev/config/
export default defineConfig({
    base: isProduction ? CDN_URL : "/",
    envDir: "./config",
    // 将 JSON 的内容解析为export default JSON.parse("xxx"),会失去按名导出的能力
    // 在 JSON 数据量比较大的时候,可以优化解析性能
    // json: {
    // 	stringify: true
    // },
    // 预构建相关的配置
    // optimizeDeps: {
    //     // entries: ["./src/main.vue"],
    //     include: ["vue", "pinia", "axios", "vue-router"],
    //     esbuildOptions: {
    //         plugins: [
    //             // 加入 Esbuild 插件
    //         ]
    //     }
    // },
    server: {
        // https: true, // 通过vite-plugin-mkcert在本地 Dev Server 上开启 HTTP2
        open: true,
        port: 8080,
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://localhost:3000/api",
                ws: true,
                changeOrigin: true
            }
        }
    },
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".less", ".mjs"],
        // 别名配置,在css中同样生效
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    css: {
        postcss: {
            plugins: [
                postCssPxToRem({
                    rootValue: 37.5, // 1rem的大小
                    propList: ["*", ], // 需要转换的属性，这里选择全部都进行转换
                    selectorBlackList:[/^.pc/,]
                }),
                // 为不同的目标浏览器添加样式前缀，解决的是浏览器兼容性的问题。
                autoprefixer({
                    overrideBrowserslist: ["safari >= 6", "ff >= 10"]
                })
            ]
        }
        // modules: {
        //     localsConvention: "camelCase",
        //     // Vite 会对后缀带有.module的样式文件自动应用 CSS Modules
        //     generateScopedName: "[name]__[local]___[hash:base64:5]"
        // },
    },

    plugins: [
        vue(),
        vueJsx(),
        // eslintPlugin(),
        pkgConfig(),
        optimizationPersist(),
        svgr(),
        // inspect(),
        docsPlugin(),
        // mkcert(), // 开启https
        stylelintPlugin({ fix: true }),
        // 自动开启分析页面
        visualizer({ open: false }),
        autoImport({
            // // 匹配的文件，也就是哪些后缀的文件需要自动引入
            // include: [/\.[tj]sx?$/,  /\.vue$/, ],
            imports: ["vue", "vue-router"],
            dts: "types/auto-import.d.ts",
            eslintrc: {
                enabled: true
            }
        }),
        createSvgIconsPlugin({
            iconDirs: [path.join(__dirname, "src/assets/icons")],
            symbolId: "icon-[dir]-[name]"
        }),
        autoComopnents({
            dirs: ["src/components"],
            deep: true, // 搜索子目录//组件名称包含目录，防止同名组件冲突
            extensions: ["vue", "jsx", "tsx", "ts", "js"],
            directoryAsNamespace: true,
            dts: "types/components.d.ts",
            resolvers: [VantResolver()]
        }),

        // createStyleImportPlugin({
        //     resolves: [VantStyleResolver()],
        //     libs: [
        //         {
        //             libraryName: "vant",
        //             esModule: true,
        //             resolveStyle: (name) => {
        //                 return `vant/es/${name}/style/index`
        //             }
        //         }
        //     ]
        // }),

        createHtmlPlugin({
            minify: true,
            inject: {
                data: {
                    title,
                    // eslint-disable-next-line quotes
                    icon: `<link rel="icon" type="image/svg+xml" href="${icon}" />`,
                    // eslint-disable-next-line quotes
                    injectScript: preloadScript && `<script src="${preloadScript}"></script>`,
                    // eslint-disable-next-line quotes
                    version: `<meta name="version" content="${version}-${versionTime}">`,
                    // eslint-disable-next-line quotes
                    description: `<meta name="description" content="${description}">`,
                    // eslint-disable-next-line quotes
                    keywords: `<meta name="keywords" content="${keywords}">`,
                    // eslint-disable-next-line quotes
                    // DNS 预解析 前者用来解析 DNS 后者用来会建立与服务器的连接，建立 TCP 通道及进行 TLS 握手，进一步降低请求延迟
                    dnsPrefetch:
                        originURL &&
                        `<link rel="preconnect" href="${originURL}" crossorigin>
								<link rel="dns-prefetch" href="${originURL}">`
                }
            }
        }),
        // 低版本兼容
        legacyPlugin({
            targets: ["chrome < 60", "edge < 15", "ie >= 11"], // 需要兼容的目标列表，可以设置多个
            additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // 面向IE11时需要此插件
            renderLegacyChunks: true,
            polyfills: ["es.global-this", "es.symbol", "es.array.filter", "es.promise", "es.promise.finally", "es/map", "es/set", "es.array.for-each", "es.object.define-properties", "es.object.define-property", "es.object.get-own-property-descriptor", "es.object.get-own-property-descriptors", "es.object.keys", "es.object.to-string", "web.dom-collections.for-each", "esnext.global-this", "esnext.string.match-all"]
        }),

        viteCompression({
            verbose: true, // 是否在控制台输出压缩结果
            disable: false, // 是否禁用压缩
            threshold: 10240, // 启用压缩的文件大小限制，单位是字节
            algorithm: "gzip", // 采用的压缩算法
            ext: ".gz" // 生成的压缩包后缀
        }),

        // TODO: CDN问题 autoImport 插件 编译后存在兼容问题，暂时没有好的办法
        // importToCDN({
        //     modules: [
        //         {
        //             name: "vue",
        //             var: "Vue",
        //             path: "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.global.prod.min.js"
        //         },
        //         {
        //             name: "vue-demi",
        //             var: "VueDemi",
        //             path: "//cdn.jsdelivr.net/npm/vue-demi@0.13.7"
        //         }

        //         // {
        //         //     name: "vue-router",
        //         //     var: "VueRouter",
        //         //     path: ""
        //         // },

        //         // {
        //         //     name: "axios",
        //         //     var: "axios",
        //         //     path: ""
        //         // }
        //     ]
        // })
        // 图片压缩
        viteImagemin({
            // 无损压缩配置，无损压缩下图片质量不会变差
            optipng: {
                optimizationLevel: 7
            },
            // 有损压缩配置，有损压缩下图片质量可能会变差
            pngquant: {
                quality: [0.8, 0.9]
            },
            // svg 优化
            svgo: {
                plugins: [
                    {
                        name: "removeViewBox"
                    },
                    {
                        name: "removeEmptyAttrs",
                        active: false
                    }
                ]
            }
        })
    ],
    build: {
        // assetsInlineLimit: 8 * 1024,
        modulePreload: {
            polyfill: true
        },
        rollupOptions: {
            // external: ["vue", "vue-demi"],
            plugins: [
                // commonjs(),
                // externalGlobals({
                //     vue: "Vue",
                //     "vue-demi": "VueDemi"
                //     // "ant-design-vue": "antd"
                //     // 'vue-router': 'VueRouter',
                //     // 'pinia': 'pinia',
                //     // 'axios':'axios'
                // })

                updatePluginVersion()
            ],
            // 静态资源的打包
            output: {
                // globals: {
                //     vue: "Vue",
                //     "vue-demi": "VueDemi"
                //     //   'vue-router': 'VueRouter',
                // },
                chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
                entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
                assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等

                // 将需要分离 的包 单独的打包出来
                manualChunks(id) {
                    // 独立拆时
                    if (id.includes("vue")) {
                        return "vue"
                    }
                    if (id.includes("node_modules")) {
                        return id.toString().split("node_modules/")[1].split("/")[0].toString()
                    }
                }
            }
        },
        targets: "es2015",
        minify: "terser",
        terserOptions: {
            compress: {
                // 生产环境时移除console
                // drop_console: true,
                drop_debugger: true
            }
        },
        // 需要兼容安卓端微信的 webview 时以防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式
        cssTarget: "chrome61",
        //关闭文件计算
        reportCompressedSize: false,
        //   关闭生成map文件 可以达到缩小打包体积
        sourcemap: false // 这个生产环境一定要关闭，不然打包的产物会很大
    },
    preview: {
        host: "0.0.0.0",
        port: "4173", // 指定开发服务器端口
        strictPort: true, // 如果端口已被使用，则直接退出
        https: false, // 是否开启 https
        open: true, // 开发服务器启动时，自动在浏览器中打开应用程序
        // proxy 代理
        cors: true // 允许跨域
        // headers 指明服务器返回的响应头。
    }
})
