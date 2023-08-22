<template>
    <div class="home">
        home
        <van-button @click="go">模拟原生交互</van-button>

        <van-button color="#7232dd" plain url="intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end">扫一扫</van-button>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

function go() {
    router.push({
        path:"/page/info"
    })
}

</script>

<style lang="less" scoped></style>
