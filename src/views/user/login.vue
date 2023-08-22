<!--
 * @Descripttion: 登录页
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-03-07 10:22:35
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-22 11:52:45
-->
<template>
    <div class="login">
        <div class="container">
            <div class="top">
                <div class="top-header">
                    <a href="/">
                        <img src="@/assets/logo.jpg" class="logo" alt="logo" />
                        <span class="title">{{ title }}</span>
                    </a>
                </div>
                <div class="desc">{{ description }}</div>
            </div>
            <div class="main">
                <van-form @submit="submit">
                    <van-cell-group inset>
                        <van-field v-model="modelRef.username" name="用户名" label="用户名" placeholder="用户名" :rules="rulesRef.username" />
                        <van-field v-model="modelRef.password" type="password" name="密码" label="密码" placeholder="密码" :rules="rulesRef.password" />
                    </van-cell-group>
                    <div style="margin: 16px">
                        <van-button size="normal" round block type="primary" native-type="submit" class="login-button" :loading="state.loginBtn" :disabled="state.loginBtn">确定</van-button>
                    </div>
                </van-form>
            </div>
            <footer class="footer">
                <div class="links">
                    <a href="">帮助</a>
                    <a href="">隐私</a>
                    <a href="">条款</a>
                </div>
                <div class="copyright">Copyright © {{ copyright }}</div>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRaw, h } from "vue"
import config from "../../../config"
import useStore from "@/store"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()
const { user } = useStore()
const { curVersion, title, filingNo, copyright, description } = config

const modelRef = reactive({
    username: "",
    password: ""
})
const rulesRef = reactive({
    username: [
        {
            required: true,
            message: "请填写用户名"
        }
    ],
    password: [
        {
            required: true,
            message: "请填写密码"
        }
    ]
})
const state = reactive({
    loginBtn: false
})

function timeFix() {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9 ? "早上好" : hour <= 11 ? "上午好" : hour <= 13 ? "中午好" : hour < 20 ? "下午好" : "晚上好"
}
function submit(values) {
    console.log("submit", values)
    state.loginBtn = true
    // login,getUserInfo
    user.setupInfo(toRaw(modelRef))
    localStorage.setItem("token", "abkjklaji")

    router.replace({
        path: "/"
    })
}
// import { login, getUserInfo } from "@/api"
// onMounted(() => {
//     console.log("login")
//     login({
//         username: "",
//         password: ""
//     })
//         .then((res) => {
//             console.log(res)
//         })
//         .catch(() => {})

//     getUserInfo()
//         .then((res) => {
//             console.log("UserInfo", res)
//         })
//         .catch(() => {})
// })
</script>

<style lang="less" scoped>
.login {
    height: 100%;

    .container {
        position: relative;
        padding: 90px 0 144px;
        width: 100%;
        min-height: 100%;
        background: #f0f2f5 url("@/assets/icons/login-bg.svg") no-repeat 50%;
        background-size: 100%;
    }

    .top {
        text-align: center;

        .top-header {
            height: 44px;
            line-height: 44px;

            .badge {
                position: absolute;
                display: inline-block;
                margin-top: -10px;
                margin-left: -12px;
                opacity: 0.8;
                line-height: 1;
                vertical-align: middle;
            }

            .logo {
                margin-right: 16px;
                height: 44px;
                border-style: none;
                border-radius: 50%;
                vertical-align: top;
            }

            .title {
                position: relative;
                top: 2px;
                font-size: 33px;
                font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
                color: rgb(0 0 0 / 85%);
                font-weight: 600;
            }
        }

        .desc {
            margin-top: 12px;
            margin-bottom: 40px;
            font-size: 14px;
            color: rgb(0 0 0 / 45%);
        }
    }

    .main {
        margin: 0 auto;

        .login-button {
            width: 100%;
        }
    }

    .footer {
        position: absolute;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        width: 100%;
        text-align: center;

        .links {
            margin-bottom: 8px;
            font-size: 14px;

            a {
                margin-right: 40px;
            }
        }

        .copyright {
            font-size: 14px;
            color: rgb(0 0 0 / 45%);
        }
    }
}
</style>
