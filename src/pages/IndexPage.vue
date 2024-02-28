<template>
    <van-cell center title="心动模式">
        <template #right-icon>
            <van-switch v-model="isMatchMode" />
        </template>
    </van-cell>
    <user-card-list :user-list="userList" :loading="loading"></user-card-list>

    <van-empty v-if="!userList | userList.length < 1" description="数据为空" />
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { showToast } from 'vant';
import { useRoute } from 'vue-router'
import myAxios from '../plugins/myAxios'
import UserCardList from '../components/UserCardList.vue'


const route = useRoute()
const isMatchMode = ref<boolean>(false)
const { tags } = route.query


const userList = ref([])
const loading = ref(true)
const loadData = async () => {
    let userListData
    loading.value = true
    if (isMatchMode.value) {
        const num = 5
        userListData = await myAxios.get('/user/match', {
            params: {
                num
            },
        })
            .then(function (response) {
                console.log('/user/match success', response)
                showToast('请求成功')
                return response.data

            }).catch(function (err) {
                console.error('/user/match error', err)
                showToast('请求失败')
            })
    } else {
        userListData = await myAxios.get('/user/recommend', {
            params: {
                pageSize: 8,
                pageNum: 1
            },
        })
            .then(function (response) {
                console.log('/user/recommend success', response)
                showToast('请求成功')
                return response.data?.records

            }).catch(function (err) {
                console.error('/user/recommend error', err)
                showToast('请求失败')
            })
    }
    if (userListData) {
        userListData.forEach(user => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags)
            }
        });
        userList.value = userListData
    }
    loading.value = false
}

watchEffect(() => {
    loadData()
})
</script>
<style scoped></style>