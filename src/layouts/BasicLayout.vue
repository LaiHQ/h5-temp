<!--
 * @Date: 2023-06-21 19:27:34
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-22 18:35:18
 * @FilePath: \apph5f:\code\yideCode\temp\h5-temp\src\layouts\BasicLayout.vue
-->
<template>
    <div  class="base-page">
        <router-view v-slot="{ Component }">
            <transition enter-active-class="animate__animated animate__fadeIn">
                <component :is="Component" :key="$route.path" />
            </transition>
        </router-view>

        <van-tabbar v-model="active" active-color="#ee0a24" @change="onChange">
            <van-tabbar-item name="dashboard" icon="home-o">标签</van-tabbar-item>
            <van-tabbar-item name="find" icon="search">标签</van-tabbar-item>
            <van-tabbar-item name="shopping" icon="friends-o" badge="5">标签</van-tabbar-item>
            <van-tabbar-item name="my" icon="setting-o" dot>标签</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue"
import { showToast } from "vant"
import { useRouter,useRoute } from "vue-router"
import "vant/es/toast/style"

const router = useRouter()
const route = useRoute()
const active = ref("dashboard")

const onChange = (name) => {
    showToast(`标签 ${name}`)
    router.replace({
        path: `/${name}`
    })    
}
onMounted(() => {
    active.value = route.name
})
</script>

<style lang="less" scoped>
.base-page {
    height: calc(100vh - 50px);
}
</style>
