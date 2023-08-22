<!--
 * @Date: 2023-06-23 11:26:31
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-23 11:30:32
 * @FilePath: \apph5f:\code\yideCode\temp\h5-temp\src\layouts\PageView.vue
-->
<template>
    <div class="page-view">
        <router-view v-slot="{ Component, route }">
            <transition :name="$router?.customRouterData.transitionName">
                <component :is="Component" :key="route.path" />
            </transition>
        </router-view>
    </div>
</template>

<style lang="less">
.page-view {
    overflow-y: auto;
    height: 100%;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }

    -webkit-overflow-scrolling: touch;
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
