<template>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>

    <div id="content">
        <router-view />
    </div>

    <router-link to="/"></router-link>
    <router-link to="/team"></router-link>
    <router-link to="/user"></router-link>
    <van-tabbar route @change="onChange">
        <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
        <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
        <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
    </van-tabbar>
</template>
<script setup lang="ts">
import Index from '../pages/IndexPage.vue'
import Team from '../pages/TeamPage.vue'
import { useRouter, useRoute } from 'vue-router'

import { ref } from 'vue';
import { showToast } from 'vant';
import 'vant/es/toast/style';
import routes from '../config/route';
const router = useRouter()
const title = ref(DEFAULT_TITLE)
const DEFAULT_TITLE = "伙伴匹配"

const route = useRoute()
// const route = useRoute()

router.beforeEach((to, from) => {
    const toPath = to.path
    const route = routes.find((route) => {
        return toPath == route.path
    })
    title.value = route?.title ?? DEFAULT_TITLE
})
const onClickLeft = () => {
    router.back()
};
const onClickRight = () => {
    router.push('/search')
};
const active = ref("index");


</script>
<style scoped>
#content {
    padding-bottom: 50px;
}
</style>
