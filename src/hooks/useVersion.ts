/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-03-15 15:56:22
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-13 18:36:29
 */
import { ExclamationCircleOutlined } from "@ant-design/icons-vue"
import { createVNode } from "vue"
import axios from "axios"
import { debounce } from "@/utils/index"
import { Modal } from "ant-design-vue"
import router from "@/router"

let isOpen = false

function verifyVersion() {
    return new Promise((relove, reject) => {
        axios
            .get("/version.json?v=" + new Date().getTime(), { headers: { "Cache-Control": "no-cache" }, baseURL: window.location.origin })
            .then((res) => {
                const clientVersion = document.querySelector("meta[name*='version']")

                if (clientVersion) {
                    const time = clientVersion?.content.split("-")[1]
                    const curTime = res.data.version?.split("-")[1]
                    const isEquation = curTime === time
                    relove(isEquation)
                } else {
                    // eslint-disable-next-line quotes
                    reject(new Error('"<mate>" label version content not obtained'))
                }
            })
            .catch(() => {
                reject(new Error("Failed to request version information"))
            })
    })
}

const checkVersion = debounce(async () => {
    const result = await verifyVersion()
    if (!result) {
        isOpen = true
        Modal.confirm({
            title: "温馨提示！",
            icon: createVNode(ExclamationCircleOutlined),
            content: "检测到系统更新，刷新后立即使用",
            okText: "立即刷新",
            closable: false,
            onOk() {
                window.location.reload()
                isOpen = false
            },
            onCancel() {
                isOpen = false
            }
        })
    }
}, 2000)

const useVersion = function () {
    if (import.meta.env.MODE === "development") {
        //
    } else {
        window.addEventListener("visibilitychange", () => {
            if (!document.hidden && !isOpen) {
                checkVersion()
            }
        })
        window.addEventListener(
            "error",
            (e) => {
                if (!isOpen && e) {
                    checkVersion()
                }
            },
            true
        )
        router.afterEach(() => {
            if (!isOpen) {
                checkVersion()
            }
        })
    }
}

export default useVersion
