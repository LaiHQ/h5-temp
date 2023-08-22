/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-03-03 21:33:18
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-03-03 21:33:54
 */
import useUserInfoStore from "./user"

// 统一导出useStore方法
export default function useStore() {
    return {
        user: useUserInfoStore()
    }
}
