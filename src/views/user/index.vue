<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-03-07 11:16:45
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-14 16:15:44
-->
<template>
    <router-view v-slot="{ Component, route }">
        <transition :enter-active-class="route.meta?.transition || 'animate__animated animate__fadeIn'">
            <component :is="Component" :key="route.path" />
        </transition>
    </router-view>
</template>

<script setup>
console.log(import.meta.env)
</script>

<style lang="less" scoped>
.footer {
    position: absolute;
    color: red;
}
</style>
