/*
 * @Descripttion: 路由配置
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-03-07 09:40:26
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-22 18:42:06
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import systemConfig from "../../config/index"
import { globalLogin } from "@/utils/index"
import { removeAllPendingRequest } from "@/utils/request"
import BasicLayout from "@/layouts/BasicLayout.vue"
import PageView from "@/layouts/PageView.vue"
import RouteView from "@/layouts/RouteView.vue"
import useStore from "@/store"
const { title } = systemConfig
import transitionExtend from "./transition-extend"
NProgress.configure({
    // eslint-disable-next-line quotes
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
    showSpinner: false // 转轮
})

// 默认路由
const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: "/user",
        name: "user",
        component: () => import("@/views/user/index.vue"),
        redirect: "/user/login",
        children: [
            {
                path: "login",
                name: "login",
                component: () => import("@/views/user/login.vue"),
                meta: {
                    title: "登录"
                }
            },
            {
                path: "register",
                name: "register",
                component: () => import("@/views/user/register.vue"),
                meta: {
                    title: "注册"
                }
            },
            {
                path: "/error",
                name: "error",
                meta: {
                    title: "error"
                },
                component: () => import("@/views/error/index.vue"),
                redirect: "/error/404",
                children: [
                    {
                        path: "404",
                        name: "NotFound",
                        component: () => import("@/views/error/404.vue"),
                        meta: {
                            title: "资源不存在"
                        }
                    },
                    {
                        path: "401",
                        name: "unauthorized",
                        component: () => import("@/views/error/401.vue"),
                        meta: {
                            title: "没有访问权限"
                        }
                    }
                ]
            }
        ]
    }
]
// 异步路由
const asyncRouterMap: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "index",
        component: BasicLayout,
        redirect: "/dashboard",
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                meta: {
                    title: "Home",
                    icon: "home-outlined",
                },
                component: () => import("@/views/home/index.vue")
            },
            {
                path: "find",
                name: "find",
                meta: {
                    title: "发现",
                    icon: "home-outlined",
                },
                component: () => import("@/views/find/index.vue")
            },
            {
                path: "shopping",
                name: "shopping",
                meta: {
                    title: "购物",
                    icon: "home-outlined",
                },
                component: () => import("@/views/shopping/index.vue")
            },
            {
                path: "my",
                name: "my",
                meta: {
                    title: "我的",
                    icon: "setting-outlined",
                },
                component: () => import("@/views/my/index.vue")
            },
            // 捕获所有路由或 404 Not found 路由
            {
                path: "/:path(.*)*",
                name: "any",
                redirect: "/error/404"
            }
        ]
    },
    {
        path: "/page",
        component: PageView,
        children: [
            {
                path: "info",
                name: "info",
                meta: {
                    title: "详情页",
                    icon: "home-outlined"
                },
                component: () => import("@/views/info/index.vue")
            },
            {
                path: "info2",
                name: "info2",
                meta: {
                    title: "详情页2",
                    icon: "home-outlined"
                },
                component: () => import("@/views/info/info2.vue")
            }
        ]
    }
]

const router = transitionExtend(
    createRouter({
        history: createWebHashHistory(),
        routes: constantRoutes,
        scrollBehavior() {
            return { top: 0 }
        }
    })
)

const whiteList: string[] = ["user", "login", "register", "NotFound"]

async function initRouters(user) {
    const permission = asyncRouterMap[0]
    user.setPermission(asyncRouterMap)

    const page = asyncRouterMap[1]
    router.addRoute(page)

    router.addRoute(permission)
}

router.beforeEach(async (to, from, next) => {
    if (to.meta.title) window.document.title = `${title} - ${to.meta.title}`
    // NProgress.start()
    // 跳转页面取消上一个页面所有的请求
    removeAllPendingRequest()
    if (localStorage.getItem("token")) {
        if (to.path === "/user/login") {
            next({ path: "/" })
            NProgress.done()
        } else {
            const { user } = useStore()
            if (user.getPermission.length) {
                next()
            } else {
                try {
                    await initRouters(user)
                    next({ ...to })
                } catch (error) {
                    next({ name: "login" })
                    NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.includes(to.name)) {
            next()
        } else {
            next({ path: "user/login", query: { redirect: to.fullPath } })
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
    globalLogin("hide")
})

export default router
