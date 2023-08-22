<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-02-23 16:05:15
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-24 17:56:25
-->
<template>
    <router-view v-slot="{ Component }">
        <transition :name="$router?.customRouterData?.transitionName">
            <component :is="Component" />
        </transition>
    </router-view>
    <div class="pc-container" v-if="isPc()">
        <div class="pc-content">
            <div class="pc-phone-container">
                <div class="pc-phone"></div>
            </div>
            <div class="pc-qrcode">
                <div class="pc-qrcode-container">
                    <qrcode :url="qrcodeUrl" :width="170" :height="170"/>
                </div>
                <div class="pc-qrcode-title">H5移动端</div>
                <div class="pc-qrcode-desc">这是一个H5页面，基于vue3 + vant搭建</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { showNotify } from "vant"
import "vant/es/notify/style"
import Vconsole from "vconsole"
import { printItemInfo, isRunThirdPartyApp, isPc } from "@/utils"
import usePerformance from "@/hooks/usePerformance"
import useVersion from "@/hooks/useVersion"
import getDevIp from "virtual:devip"

const qrcodeUrl = ref('')

const watchNetwork = () => {
    const handle = (event) => {
        const text = {
            offline: "网络已断开，请检查网络连接。",
            online: "网络已连接"
        }

        showNotify({
            message: text[event.type],
            color: "#ad0000",
            background: "#ffe1e1",
            duration: event.type === "offline" ? 0 : 1500
        })
    }
    window.addEventListener("offline", handle)
    window.addEventListener("online", handle)
}
console.log("正在运行第三方应用程序", isRunThirdPartyApp())

onMounted(() => {
    printItemInfo()
    watchNetwork()
    usePerformance()
    useVersion()

    if (import.meta.env.MODE !== "production" && !isPc()) {
        const vConsole = new Vconsole()
        console.log(vConsole)
    }

    setTimeout(() => {
        if (isPc()) {
            qrcodeUrl.value = getDevIp()

            if (window.isPCinit) {
                return false
            }
            const content = document.querySelector("html")
            const iframe = document.createElement("iframe")
            iframe.setAttribute("class", "pc-iframe")
            const f = document.querySelector(".pc-phone").appendChild(iframe)
            const doc = f.contentDocument || f.contentWindow.document
            const w = f.contentWindow || f.contentDocument
            doc.open()
            doc.write(content.outerHTML)
            doc.close()
            iframe.onload = function () {
                w.isPCinit = true
                document.querySelector(".pc-iframe").style.opacity = 1
                w.document.querySelector("#app").removeChild(w.document.querySelector(".pc-container"))
            }
        }
    })
    window.onload = function () {
        // 禁用双指放大
        document.documentElement.addEventListener(
            "touchstart",
            function (event) {
                if (event.touches.length > 1) {
                    event.preventDefault()
                }
            },
            {
                passive: false
            }
        )

        // 禁用双击放大
        var lastTouchEnd = 0
        document.documentElement.addEventListener(
            "touchend",
            function (event) {
                var now = Date.now()
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault()
                }
                lastTouchEnd = now
            },
            {
                passive: false
            }
        )
    }
})
</script>

<style lang="less">
.pc-container {
    position: relative;
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: #fff;
    inset: 0;

    &::before {
        position: absolute;
        display: block;
        background-color: rgb(0 0 0 / 50%);
        inset: 0;
        content: "";
    }

    .pc-content {
        position: relative;
        margin: 0 auto;
        width: 900px;
        height: 100%;

        .pc-phone-container {
            position: absolute;
            top: 50%;
            left: 10px;
            margin-top: -375px;
            width: 520px;
            height: 750px;
            box-sizing: content-box;

            .pc-phone {
                position: absolute;
                left: 40px;
                display: inline-block;
                width: 400px;
                height: 650px;
                background: #fff;
                border-radius: 20px;
                box-sizing: content-box;
                border-top: 40px solid #fff;
                border-left: 10px solid #fff;
                border-right: 10px solid #fff;
                border-bottom: 60px solid #fff;
                transform-origin: 100% 0;
                transform: scale(1);

                .pc-iframe {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #888;
                    border-radius: 2px;
                    opacity: 0;
                }

                &::after {
                    position: absolute;
                    bottom: -49px;
                    left: 50%;
                    display: block;
                    width: 40px;
                    height: 40px;
                    background: #e8f3ff;
                    content: "";
                    border-radius: 50%;
                    transform: translateX(-50%);
                }
            }
        }
    }

    .pc-qrcode {
        position: absolute;
        top: 50%;
        left: 570px;
        margin-top: -325px;
        width: 300px;
        height: 650px;
        font-size: 14px;
        text-align: center;
        color: #fff;

        .pc-qrcode-container {
            margin: 70px auto 10px;
            width: 170px;
            height: 170px;
        }

        .pc-qrcode-title {
            margin-top: 40px;
            font-size: 19px;
        }

        .pc-qrcode-desc {
            margin-top: 8px;
            text-align: left;
            line-height: 18px;
        }
    }
}

body,
html {
    overflow: hidden;
    width: 100%;
    height: 100%;
}

body {
    box-sizing: border-box;
    position: relative;
}

#app {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    font-size: 16px;
}

#nprogress .bar {
    background: green;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    position: absolute !important;
    z-index: 1;
    min-width: 100%;
    min-height: 100vh;
    background-color: white;
    transition: all 0.25s;
    inset: 0;
}

.slide-left-enter-from,
.slide-right-leave-to {
    opacity: 1;
    transform: translateX(100%);
}

.slide-right-enter-from,
.slide-left-leave-to {
    opacity: 1;
    transform: translateX(-100%);
}

.slide-left-leave-to,
.slide-right-leave-to {
    opacity: 0.25;
}
</style>
