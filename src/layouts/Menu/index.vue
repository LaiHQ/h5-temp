<template>
    <a-menu mode="inline" :style="{ height: '100%' }" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" @click="handleMenuClick" :inline-collapsed="collapsed" @select="onSelect">
        <!--  -->
        <SubMenu :item="item" v-for="item in menuData" :key="item.path" />
        <!--  -->
    </a-menu>
</template>

<script>
import { reactive, toRefs, watch, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import SubMenu from "./SubMenu.vue"
import useStore from "@/store"

export default {
    name: "MyMenu",
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    components: {
        SubMenu
    },
    setup(props) {
        const router = useRouter()
        const route = useRoute()
        const selectedKeysMap = {}
        const openKeysMap = {}
        const state = reactive({
            selectedKeys: [],
            openKeys: []
        })
        // 根据路由生成过滤数据
        const getMenuData = (routes = [], parentKeys = [], selectedKeys) => {
            const menuData = []
            routes.forEach((item) => {
                // 如果路由有name 并且需要显示在菜单里
                if (item.name && !item.hideInMenu) {
                    openKeysMap[item.path] = parentKeys
                    selectedKeysMap[item.path] = [item.path || selectedKeys]
                    const newItem = { ...item }
                    delete newItem.children
                    // 如果有child 并且还需要隐藏
                    if (item.children && item.hideChildrenInMenu) {
                        item.children.forEach(() => {
                            item.meta = Object.assign(item.meta, { hidden: true })
                        })
                    }

                    // 如果有下级并且下级需要在菜单显示则继续递归
                    if (item.children && !item.hideChildrenInMenu) {
                        newItem.children = getMenuData(item.children, [...parentKeys, item.path])
                    } else {
                        // 再次生成map方便获取
                        getMenuData(item.children, selectedKeys ? parentKeys : [...parentKeys, item.path], selectedKeys || item.path)
                    }
                    menuData.push(newItem)
                } else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
                    menuData.push(...getMenuData(item.children))
                }
            })
            return menuData
        }
        const handleMenuClick = ({ key }) => {
            router.push({ path: `${key}` })
        }
        // 路由切换，页面初始化设置选中状态
        const setMenuKeys = (v) => {
            state.selectedKeys = selectedKeysMap[v] || []
            state.openKeys = props.collapsed ? [] : openKeysMap[v]
            // console.log(v,selectedKeysMap,openKeysMap)
        }
        const onSelect = ({ selectedKeys }) => {
            state.selectedKeys = selectedKeys
        }

        const updateMenu = () => {
            const routes = route.matched.concat()
            const { hidden } = route.meta

            if (routes.length >= 3 && hidden) {
                routes.pop()
                state.selectedKeys = [routes[routes.length - 1].path]
            } else {
                state.selectedKeys = [routes.pop().path]
            }
            const openKeys = []
            if (state.mode === "inline") {
                routes.forEach((item) => {
                    openKeys.push(item.path)
                })
            }
            // state.collapsed
            //     ? (state.cachedOpenKeys = openKeys)
            //     : (state.openKeys = openKeys);
        }
        watch(
            () => {
                return router.currentRoute.value.path
            },
            () => {
                // setMenuKeys(v)
                updateMenu()
            }
        )

        onMounted(() => {
            const len = route.path.lastIndexOf("/")
            const ppath = route.path.substring(0, len)
            const proute = router.getRoutes().find((item) => item.path === ppath)
            if (proute && proute.meta.hidden) {
                setMenuKeys(proute.path)
            } else {
                setMenuKeys(route.path)
            }
        })
        // 此处本地调试获取路由表渲染，后期需从vuex获取服务器数据生成
        // const menuData = getMenuData(router.options.routes[0].children)
        const { user } = useStore()
        const menuData = getMenuData(user.getPermission[0].children)
        return {
            ...toRefs(state),
            menuData,
            onSelect,
            handleMenuClick
        }
    }
}
</script>

<style></style>
