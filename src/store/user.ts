/*
 * @Descripttion: 用户全局数据
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-03-03 17:43:51
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-15 13:43:56
 */
import { defineStore } from "pinia"
import SecureLS from "secure-ls"

const ls = new SecureLS({
    // 是否需要编码压缩
    isCompression: true,
    // base64 / aes / des / rabbit/rc4 /编码和数据压缩
    encodingType: "base64",
    // PBKDF2值
    encryptionSecret: "38c31684-d00d-30dc-82e0-fad9eec46d1d"
})

const storage = {
    setItem(key: string, value: string) {
        ls.set(key, value)
    },
    getItem(key: string): string | null {
        return ls.get(key)
    }
}

// 创建store,命名规则： useXxxxStore
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useUserInfoStore = defineStore("userInfo", {
    state: () => {
        return {
            user: {},
            permission: []
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getPermission(state) {
            return state.permission
        }
    },
    actions: {
        setupInfo(user = {}) {
            this.user = user
        },
        setPermission(arr: any) {
            this.permission = arr
        }
    },

    persist: {
        key: "userInfo",
        storage,
        paths: ["user"],
        debug: import.meta.env.VITE_USER_NODE_ENV === "production",
        beforeRestore: (ctx) => {
            console.log(`beforeRestore '${ctx.store.$id}'`)
        },

        afterRestore: (ctx) => {
            console.log(`afterRestore '${ctx.store.$id}'`)
        }
    }
})

export default useUserInfoStore
