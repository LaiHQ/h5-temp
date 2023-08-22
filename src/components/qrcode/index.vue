<!--
 * @Date: 2023-06-24 17:17:55
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-24 18:06:58
 * @FilePath: \apph5f:\code\yideCode\temp\h5-temp\src\components\qrcode\index.vue
-->
<template>
    <div class="pc-qr-code">
        <canvas ref="qrcode" />
    </div>
</template>

<script setup>
import { onMounted } from "vue"
import QRCode from "qrcode"

const props = defineProps({
    url: String,
    logoUrl: {
        type: String,
        default: ""
    },
    width: {
        type: Number,
        default: 200
    },
    height: {
        type: Number,
        default: 200
    }
})

const qrcode = ref(null)
const init = () => {
    const options = {
        errorCorrectionLevel: "H", //容错级别,指二维码被遮挡可以扫出结果的区域比例
        type: "image/png", //生成的二维码类型
        quality: 0.3, //二维码质量
        margin: 5, //二维码留白边距
        width: props.width, //宽
        height: props.height, //高
        text: "1111", //二维码内容
        color: {
            light: "#eaeaea" //背景色
        }
    }
    QRCode.toCanvas(qrcode.value, props.url, options, (error) => {
        if (error) {
            console.log("qr code 加载失败！")
        }
    })
}

const saveCode = () => {
    //下载二维码
    let base64Img = qrcode.value.toDataURL("image/jpg")
    //创建下载标签，然后设置链接和图片名称
    let a = document.createElement("a")
    a.href = base64Img
    a.download = "二维码" + Date.now()
    a.click()
    //销毁元素
    a.remove()
}

watch(
    () => props.url,
    () => {
        init()
    }
)

onMounted(() => {
    nextTick(() => {
        if (props.logoUrl != "") {
            let myCanvas = qrcode.value
            let ctx = myCanvas.getContext("2d")
            // 在Canvas画布 添加图片
            let img = new Image()
            img.crossOrigin = "Anonymous" //解决Canvas.toDataURL 图片跨域问题
            img.src = props.logoUrl
            img.onload = () => {
                //第一个设置的元素，第二三是位置，后面两个是宽和高
                //居中的位置计算为 （二维码宽度-img宽度）/2
                let codeWidth = (props.width * 0.75) / 2
                let codeHeight = (props.height * 0.75) / 2
                ctx.drawImage(img, codeWidth, codeHeight, props.width * 0.25, props.height * 0.25)
            }
        }
    })
})
</script>

<style>
.pc-qr-code {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
}
</style>
