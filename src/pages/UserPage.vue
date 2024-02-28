<template>
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="个人信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue';

import { getCurrentUser } from '../services/user';
const router = useRouter()
// const user = {
//     id: 1,
//     username: "哈哈",
//     userAccount: "abc123",
//     avatarUrl: "111.png",
//     gender: "男",
//     phone: "112233",
//     email: "112233@qq.com",
//     planetCode: "1234",
//     createTime: new Date(),
// }
const user = ref()

onMounted(async () => {

    user.value = await getCurrentUser()

})

const toEdit = (editKey: string, editName: string, currentValue: string) => {
    router.push({
        path: '/user/edit',
        params: {
            a: 1,
        },
        query: {
            editKey,
            editName,
            currentValue
        }
    })
}

</script>
<style scoped></style>