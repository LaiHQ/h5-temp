<!--
 * @Date: 2023-06-15 00:32:50
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-15 10:42:02
 * @FilePath: \apph5f:\code\yideCode\temp\admin-temp\src\layouts\Logo\index.vue
-->
<template>
    <div class="logo-warp">
        <a href="/" class="tohome" title="首页">
            <a-avatar class="icon" :src="logo" :size="38" />
            <span class="name">{{ title }}</span>
        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import config from "../../../config"

const { title, logo } = config

export default defineComponent({
    name: "Logo",
    props: {},
    components: {},
    setup() {
        return {
            title,
            logo
        }
    }
})
</script>

<style scoped lang="less">
.logo-warp {
    .tohome {
        display: flex;
        align-items: center;
        color: #333;
    }

    .icon {
        margin-right: 16px;
    }

    .name {
        // color: #fff;
    }
}
</style>
