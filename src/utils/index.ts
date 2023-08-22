/*
 * @Descripttion: 工具函数
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-03-14 09:42:23
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-22 22:49:57
 */
export const log = (options?: unknown) => {
    if (typeof options !== "object") {
        // eslint-disable-next-line no-undef
        console.log(options)
        return
    }
    const defaultOptions = {
        label: "",
        value: "",
        color: "#FFF",
        labelColor: "#606060",
        valueColor: "#1475b2",
        url: "",
        ...options
    }
    const { label, value, color, labelColor, valueColor, url } = defaultOptions
    const labelStyle = `padding: 3px; border-radius: 3px 0 0 3px;color: ${color}; background:${labelColor}`
    const valueStyle = `padding: 3px 6px 3px 0; border-radius: 0 3px 3px 0;color:${color}; background:${valueColor}`
    console.log(`%c ${label} %c  ${value}`, labelStyle, valueStyle, url)
}

export function printItemInfo() {
    const clientVersion = document.querySelector("meta[name*='version']")

    if (clientVersion) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const [version, time] = clientVersion?.content.split("-")
        log({
            label: "Version",
            value: `v${version}`
        })
        log({
            label: "Build Date",
            value: new Date(+time).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
        })
    }
    log({
        label: "Environment",
        value: `${import.meta.env.VITE_USER_NODE_ENV}`,
        valueColor: "#42c02e"
    })
}

export const isRunThirdPartyApp = ()=> {
    const userAgent = navigator.userAgent.toLowerCase();
    return {
      isWechat: /MicroMessenger/i.test(userAgent),
      isQQ: /QQ/i.test(userAgent) && !userAgent.toLowerCase().includes('mqqbrowser'),
      isWebo: /WeiBo/i.test(userAgent),
      isDing: /DingTalk/i.test(userAgent),
      isMail: /Mail/i.test(userAgent),
    }
  }
/**
 * @description: 是否浏览器
 */
export const isPc = () => {
    const userAgentInfo = navigator.userAgent;
    const Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

/**
 * @description: 上报错误日志
 */
export function reportErrorLog(info: object) {
    console.error("上报错误日志：", info)
}

/**
 * @description: 函数防抖
 * @param {function} function 执行函数
 * @param {delay} delay 时间
 */
export function debounce(fn: Function, delay: number) {
    let timer = 0
    return function (this: any, ...args: any[]) {
        const context = this
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}

/**
 * @description: 控制全局Loading开关
 * @param {string} display "show" | "hide" 显示或者隐藏
 * @param {string} tip 提示文字
 */
export function globalLogin(display: "show" | "hide", tip?: string) {
    const loginDom = document.getElementsByTagName("loading-card")[0]
    if (loginDom) {
        loginDom.setAttribute("tip", tip || "loading...")
        loginDom.setAttribute("spinning", display)
    }
}
