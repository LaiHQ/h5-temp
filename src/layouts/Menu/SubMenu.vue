<!--
 * @Date: 2021-12-24 22:57:48
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-15 12:08:05
 * @FilePath: \apph5f:\code\yideCode\temp\admin-temp\src\layouts\Menu\SubMenu.vue
-->

<template>
    <a-sub-menu v-if="item.children && item.children.length" :key="item.path">
        <template #title>
            <component :is="item.meta && item.meta.icon"></component>
            <span
                :class="{
                    menu_circular: !item.meta?.icon,
                    menu_circular__activation: $route.path == item.path
                }"
            >
                {{ item.meta?.title }}</span
            >
        </template>
        <SubMenu :item="citem" v-for="citem in item.children" :key="citem.path" />
    </a-sub-menu>
    <a-menu-item v-else :key="item.path">
        <component :is="item.meta && item.meta.icon"></component>
        <span>{{ item.meta && item.meta.title }}</span>
    </a-menu-item>
</template>

<script>
export default {
    name: "SubMenu",
    props: {
        item: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="less" scoped></style>
