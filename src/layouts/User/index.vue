<template>
    <div class="user-wrapper">
        <div class="content-wrapper">
            <a-tooltip placement="bottom">
                <template #title>
                    <span>开发文档</span>
                </template>
                <a-button type="text" href="http://localhost:8090/" target="_blank">
                    <template #icon><question-circle-outlined /></template>
                </a-button>
            </a-tooltip>
            <a-dropdown @visibleChange="userVisibleChange">
                <span class="action">
                    <a-avatar class="avatar" size="small" :src="avatar" />
                    <span class="nickname"
                        >{{ nickname }}
                        <caret-down-outlined :class="`caretup-${userVisible}`" />
                    </span>
                </span>
                <template #overlay>
                    <a-menu class="user-dropdown-menu-wrapper">
                        <a-menu-item key="0">
                            <router-link to="/account/center">
                                <user-outlined />
                                个人中心
                            </router-link>
                        </a-menu-item>
                        <a-menu-item key="1">
                            <key-outlined />
                            修改密码
                        </a-menu-item>
                        <a-menu-item key="2" disabled>
                            <setting-outlined />
                            测试
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3">
                            <a href="javascript:;" @click="handleLogout">
                                <poweroff-outlined />
                                退出登录
                            </a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { ExclamationCircleOutlined, QuestionCircleOutlined, CaretDownOutlined, UserOutlined, KeyOutlined, SettingOutlined, PoweroffOutlined } from "@ant-design/icons-vue"
import { reactive, createVNode, defineComponent, toRefs } from "vue"
import { Modal, message } from "ant-design-vue"
import { useRouter } from "vue-router"
export default defineComponent({
    name: "User",
    components: {
        CaretDownOutlined,
        UserOutlined,
        KeyOutlined,
        SettingOutlined,
        PoweroffOutlined,
        QuestionCircleOutlined
    },
    setup() {
        const state = reactive({
            avatar: "",
            nickname: "张三",
            userVisible: false
        })
        const userVisibleChange = (v: boolean) => {
            state.userVisible = v
        }
        const router = useRouter()
        const handleLogout = () => {
            Modal.confirm({
                title: "提示",
                icon: createVNode(ExclamationCircleOutlined),
                content: "真的要注销登录吗 ?",
                okText: "确定",
                cancelText: "取消",
                onOk() {
                    localStorage.removeItem("token")
                    message.success("安全退出")
                    setTimeout(() => {
                        router.replace("/user/login")
                    }, 500)
                },
                onCancel() {
                    console.log("Cancel")
                },
                class: "test"
            })
        }
        return {
            ...toRefs(state),
            handleLogout,
            userVisibleChange
        }
    }
})
</script>

<style scoped lang="less">
.user-wrapper {
    height: 100%;
}

.content-wrapper {
    display: flex;
    align-items: center;
    height: 100%;

    .action {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
        height: 100%;
        transition: all 0.3s;
        cursor: pointer;
    }

    .avatar {
        margin-right: 8px;
    }

    .nickname {
        font-size: 14px;
        // color: #fff;
    }

    .caretup-false {
        transition: all 0.25s;
        transform: rotate(0);
    }

    .caretup-true {
        transition: all 0.25s;
        transform: rotate(180deg);
    }
}
</style>
