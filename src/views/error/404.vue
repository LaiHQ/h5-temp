<!--
 * @Descripttion: 404
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-03-07 11:40:08
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-15 14:29:16
-->
<template>
    <div class="error">
        <div class="error-flex">
            <div class="left">
                <div class="left-item">
                    <div class="left-item-animation left-item-num">404</div>
                    <div class="left-item-animation left-item-title">地址输入错误，请重新输入地址~</div>
                    <div class="left-item-animation left-item-msg">您可以先检查网址，然后重新输入或给我们反馈问题。</div>
                    <div class="left-item-animation left-item-btn">
                        <a-button type="primary" @click="onGoHome">返回首页</a-button>
                        <a-button style="margin-left: 12px" @click="onGologin">重新登录</a-button>
                    </div>
                </div>
            </div>
            <div class="right">
                <img src="../../assets/404.png" />
            </div>
        </div>
    </div>
</template>

<script setup>
const router = useRouter()
const onGoHome = () => {
    router.replace("/")
}
const onGologin = () => {
    localStorage.removeItem("token")
    router.replace("/user/login")
}
</script>

<style scoped lang="less">
@keyframes error-num {
    0% {
        transform: translateY(60px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
@keyframes error-img {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.error {
    display: flex;
    height: 100%;
    background-color: white;

    .error-flex {
        display: flex;
        margin: auto;
        width: 900px;
        height: 350px;

        .left {
            display: flex;
            align-items: center;
            height: 100%;
            flex: 1;

            .left-item {
                .left-item-animation {
                    opacity: 0;
                    animation-name: error-num;
                    animation-duration: 0.5s;
                    animation-fill-mode: forwards;
                }

                .left-item-num {
                    font-size: 55px;
                    color: #d6e0f6;
                }

                .left-item-title {
                    margin: 15px 0 5px;
                    font-size: 20px;
                    color: #333;
                    animation-delay: 0.1s;
                }

                .left-item-msg {
                    margin-bottom: 30px;
                    font-size: 12px;
                    color: #c0bebe;
                    animation-delay: 0.2s;
                }

                .left-item-btn {
                    animation-delay: 0.2s;
                }
            }
        }

        .right {
            flex: 1;
            opacity: 0;
            animation-name: error-img;
            animation-duration: 2s;
            animation-fill-mode: forwards;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
