/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-03-04 16:13:30
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-03-04 16:25:59
 */
import WOW from "wow.js"
const useAnimate = (options = {}) => {
    const defaultOptions = {
        boxClass: "animate__animated",
        // animation.css 动画的前缀
        animateClass: "animated",
        // 距离可视区域多少开始执行动画
        offset: 0,
        // 是否在移动设备上执行动画
        mobile: true,
        // 异步加载的内容是否有效
        live: false
    }

    const wow = new WOW({ ...defaultOptions, options })
    wow.init()
}

export default useAnimate
