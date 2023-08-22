/*
 * @Descripttion: 网络请求

	1.取消重复请求
	2.路由跳转会取消全部还在pending的请求
	3.错误重试
	4.缓存请求数据 （实时性要求不高情况下使用）
	5.开启loading
	6.请求成功失败提示
	7.token更新
	8.错误上报

 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-03-15 18:15:13
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-03-28 18:11:11
 */
import axios, { AxiosRequestConfig, AxiosResponse, Canceler, AxiosAdapter } from "axios"
import router from "@/router"
import { message } from "ant-design-vue"
import Qs from "qs"
import { globalLogin, debounce, reportErrorLog } from "@/utils/index"

console.log(import.meta.env)

// 增强配置
// interface CustomAxiosRequestConfig {
//     // 开启loading
//     loading: boolean
//     // loading 文字
//     loadingText: string
//     // 请求成功提示
//     successMessage: boolean
//     // 重试次数
//     retryTimes: number
//     // 重试延迟时间
//     retryDelay: number
//     // 缓存的最大时间
//     maxAge: number
//     // 是否开启缓存
//     enabledByDefault: boolean
//     // 配置请求 config 对象上的缓存属性
//     cacheFlag: string
//     // 缓存对象
//     defaultCache: object
// }
/**
 * @description: message提示
 * @param {string} msg 提示文字
 * @param {string} type 提示类型
 */
const tipMsg = debounce((msg: string, type: "success" | "info" | "warning" | "error" | "loading" = "error") => {
    message[type] && message[type](msg)
}, 1000)

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL as string,
    timeout: 5000,
    adapter: adapterEnhancer({
        // 默认禁用缓存
        enabledByDefault: true,
        // 缓存时间为5s
        maxAge: 5000,
        // 重试时间
        delay: 1000
    }),
    withCredentials: true
    // headers: { 'Content-Type': 'application/json' },
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
// 设置post请求头
request.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"

// 所有正在请求的接口
const pendingRequest: Map<string, Canceler> = new Map()
// 取消过滤请求的白名单url
const whiteRequest: string[] = []
// 根据当前请求信息生产key
function generateReqKey(config: AxiosRequestConfig) {
    const { method, url, params, data } = config
    return [method, url, Qs.stringify(params), Qs.stringify(data)].join("&")
}

// 把当前请求加到pendingRequest中；
function addPendingRequest(config: AxiosRequestConfig) {
    const requestKey = generateReqKey(config)
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel) => {
            if (!pendingRequest.has(requestKey)) {
                pendingRequest.set(requestKey, cancel)
            }
        })
}

// 检查是否存在重复请求，若存在则取消已发的请求。
function removePendingRequest(config: AxiosRequestConfig) {
    const requestKey = generateReqKey(config)
    if (whiteRequest.includes(config.url as string)) {
        return false
    }
    if (pendingRequest.has(requestKey)) {
        const cancelToken = pendingRequest.get(requestKey)
        cancelToken && cancelToken(requestKey)
        pendingRequest.delete(requestKey)
    }
}

/**
 * @description: 取消全部还在pending请求
 */
export function removeAllPendingRequest() {
    for (const [key, cancelToken] of pendingRequest) {
        cancelToken(key)
    }
    pendingRequest.clear()
}

// 缓存对象
const MemoryCache = {
    data: {},
    // 设置缓存，以及缓存时间
    set(key: string, value: any, maxAge: number) {
        // 保存数据
        this.data[key] = {
            maxAge: maxAge || 0,
            value,
            now: Date.now()
        }
    },
    // 通过key或者对应的缓存
    get(key: string) {
        // 从缓存中获取指定 key 对应的值。
        const cachedItem = this.data[key]
        if (!cachedItem) return null
        const isExpired = Date.now() - cachedItem.now > cachedItem.maxAge
        isExpired && this.delete(key)
        return isExpired ? null : cachedItem.value
    },
    // 通过key删除对应的缓存
    delete(key: string) {
        // 从缓存中删除指定 key 对应的值。
        return delete this.data[key]
    },
    // 清空已缓存的数据。
    clear() {
        this.data = {}
    }
}

// 判断传入的cache 参数是否实现了MemoryCache功能
function isCacheLike(cache: any) {
    return !!(cache.set && cache.get && cache.delete && cache.clear && typeof cache.get === "function" && typeof cache.set === "function" && typeof cache.delete === "function" && typeof cache.clear === "function")
}

// 适配器，用于请求重试,数据缓存
function adapterEnhancer(options: any): AxiosAdapter {
    // maxAge = 3000,
    const { times = 0, delay = 1000, enabledByDefault = true, cacheFlag = "cache" } = options
    return (config) => {
        const { retryTimes = times, retryDelay = delay, defaultCache = MemoryCache, method, forceUpdate, maxAge } = config

        // 请求是否携带缓存标志
        const useCache = config[cacheFlag] !== undefined && config[cacheFlag] !== null ? config[cacheFlag] : enabledByDefault

        let __retryCount = 0
        // 请求重试
        const servers: any = async () => {
            // debugger
            try {
                delete config.adapter
                return await axios(config)
            } catch (err) {
                // 判断是否进行重试
                if (!retryTimes || __retryCount >= retryTimes) {
                    return Promise.reject(err)
                }
                console.log(`%c【ERROR】请求: ${config.baseURL + config.url} 失败, ${retryDelay / 1000} 秒后重试...`, "color:red")
                __retryCount++ // 增加重试次数
                // 延时处理
                const delay = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("延时处理")
                    }, retryDelay)
                })
                // 重新发起请求
                return delay.then(() => {
                    return servers()
                })
            }
        }

        // 如果是get请求,判断是否使用缓存
        if (method === "get" && useCache) {
            const cache = isCacheLike(useCache) ? useCache : defaultCache
            const requestKey = generateReqKey(config)
            // 查询缓存
            let responsePromise = cache.get(requestKey)

            // 缓存未命中/失效或强制更新时，则重新请求数据
            if (!responsePromise || forceUpdate) {
                responsePromise = (async () => {
                    try {
                        delete config.adapter
                        return await axios(config)
                    } catch (reason) {
                        cache.delete(requestKey)
                        // 是否要重试
                        if (!retryTimes || __retryCount >= retryTimes) {
                            return Promise.reject(reason)
                        } else {
                            return servers()
                        }
                    }
                })()

                cache.set(requestKey, responsePromise, maxAge)
                // console.log("_________数据更新存入缓存", cache.data, maxAge)
                return responsePromise
            } else {
                console.log(`%c【TIP】: ${config.baseURL + config.url} 数据, 命中缓存。`, "color:#4caf50")
                return responsePromise
            }
        }

        return servers()
    }
}

/**
 * @description: 跳转到登录页
 */
function toLogin() {
    try {
        window.localStorage.removeItem("token")
        router.replace({
            path: "/user/login",
            query: {
                redirect: router.currentRoute?.fullPath
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// 刷新token
async function handleRefreshToken(config: AxiosRequestConfig) {
    try {
        const beforRefreshToken = localStorage.getItem("refresh_token")
        const instance = axios.create({
            baseURL: import.meta.env.VITE_BASE_URL as string,
            timeout: 5000,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${beforRefreshToken}`
            }
        })
        const result = await instance.post("/user/refreshToken")
        if (result) {
            const { refreshToken, token } = result.data.data
            localStorage.setItem("token", token)
            localStorage.setItem("refresh_token", refreshToken)
            // 对之前错误的接口再次请求
            config.cancelToken = void 0
            // debugger
            request(config)
            return Promise.resolve("update token")
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

// http处理错误
async function handleHttpError(status: number, config: AxiosResponse) {
    let errMessage = "未知错误"
    /* eslint-disable */
    switch (status) {
        case 400:
            errMessage = "错误的请求"
            break
        case 401:
            errMessage = "未授权，请重新登录"
            try {
                await handleRefreshToken(config)
                return false
            } catch (error) {
                setTimeout(() => {
                    toLogin()
                }, 1000)
            }
            break
        case 403:
            errMessage = "拒绝访问"
            break
        case 404:
            errMessage = "请求错误,未找到该资源"
            break
        case 405:
            errMessage = "请求方法未允许"
            break
        case 408:
            errMessage = "请求超时"
            break
        case 500:
            errMessage = "服务器端出错"
            break
        case 501:
            errMessage = "网络未实现"
            break
        case 503:
            errMessage = "服务不可用"
            break
        case 505:
            errMessage = "http版本不支持该请求"
            break
        default:
            errMessage = `其他连接错误 --${status}`
            break
    }
    tipMsg(errMessage)

    reportErrorLog({
        type: "网络异常错误",
        info: generateReqKey(config),
        msg: errMessage
    })
}

// 业务错误处理
function handleAuthError(config: AxiosRequestConfig) {
    const errorNumber = config.data?.code
    const msg = config.data?.message
    const authErrMap: any = {
        "10031": "登录失效，需要重新登录", // token 失效
        "10032": "您太久没登录，请重新登录~", // token 过期
        "10033": "账户未绑定角色，请联系管理员绑定角色",
        "10034": "该用户未注册，请联系管理员注册用户",
        "10035": "code 无法获取对应第三方平台用户",
        "10036": "该账户未关联员工，请联系管理员做关联",
        "10037": "账号已无效",
        "10038": "账号未找到"
    }
    tipMsg(msg || authErrMap[errorNumber])
    reportErrorLog({
        type: "业务异常错误",
        info: generateReqKey(config),
        msg: msg
    })
}

// 添加请求拦截器
request.interceptors.request.use(
    (config) => {
        const { loading, loadingText } = config
        // debugger
        // 检查是否存在重复请求，若存在则取消已发的请求
        removePendingRequest(config)
        // 把当前请求信息添加到pendingRequest对象中
        addPendingRequest(config)
        if (loading) globalLogin("show", loadingText)
        const token = localStorage.getItem("token")
        if (token) config.headers["Authorization"] = `Bearer ${token}`
        return config
    },
    (error) => Promise.reject(error)
)

// 添加响应拦截器
request.interceptors.response.use(
    (response) => {
        const { loading, successMessage } = response.config
        // 从pendingRequest对象中移除请求
        removePendingRequest(response.config)
        if (loading) globalLogin("hide")
        if (response.status === 200) {
            // 二进制
            if (["arraybuffer", "blob"].includes(response.request.responseType)) {
                return Promise.resolve(response.data)
            }
            if (response.data?.code === 0) {
                // 是否需要提示
                if (successMessage) tipMsg(response.data?.message, "success")
            } else {
                handleAuthError(response.config)
                return Promise.reject(response || {})
            }
        }

        return Promise.resolve(response.data)
    },
    (error) => {
        const { config, response } = error
        const { loading } = config
        // 从pendingRequest对象中移除请求
        removePendingRequest(config || {})
        if (loading) globalLogin("hide")
        if (axios.isCancel(error)) {
            console.log(`%c【ERROR】已取消重复请求： ${error.message}`, "color:red")
            return Promise.reject({
                ...error,
                message: "已取消重复请求"
            })
        } else {
            // 添加异常处理
            if (response) {
                // 请求已发出，但是不在2xx的范围
                handleHttpError(response.status, config)
            } else {
                //  处理断网的情况
                // store.commit("changeNetwork", false);
                tipMsg(error.message || "网络超时")
            }
        }
        return Promise.reject(error || {})
    }
)
export default request
