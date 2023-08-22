<!--
 * @Date: 2023-06-22 12:17:53
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-22 18:22:18
 * @FilePath: \apph5f:\code\yideCode\temp\h5-temp\src\views\info\index.vue
-->
<template>
    <div class="info">
        <van-nav-bar title="标题" left-text="返回" left-arrow fixed border placeholder @click-left="onClickLeft" />

        <van-button @click="go">又是个详情</van-button>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

function go() {
    router.push({
        path:"/page/info2"
    })
}
const onClickLeft = () => history.back()

</script>

<style lang="less" scoped>
    
</style>
