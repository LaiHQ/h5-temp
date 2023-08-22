<template>
    <router-view v-slot="{ Component }" class="base-page">
        <transition enter-active-class="animate__animated animate__fadeIn">
            <component :is="Component" :key="$route.path" />
        </transition>
    </router-view>
</template>

<script>

</script>

<style></style>
