/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { _RouteRecordBase } from 'vue-router'

declare module 'vue-router' {
    // eslint-disable-next-line no-shadow
    interface _RouteRecordBase {
        hideInMenu?: boolean // 控制是否显示在菜单里
        hideChildrenInMenu?: boolean // 控制是否显示子集路由
        noPermission?: boolean // 是否受权限控制
    }
}
