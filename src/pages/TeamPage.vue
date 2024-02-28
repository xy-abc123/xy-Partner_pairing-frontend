<template>
    <div id="teamPage">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
        <van-tabs v-model:active="active" @change="onTabChange">
            <van-tab title="公开" name="public"></van-tab>
            <van-tab title="加密" name="private"></van-tab>
        </van-tabs>
        <van-empty v-if="!teamList | teamList?.length < 1" description="数据为空" />
        <!-- <div style="margin-bottom: 16px" /> -->

        <team-card-list :teamList="teamList" />
        <van-button icon="plus" type="primary" class="add-button" @click="toAddTeam" />
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import TeamCardList from '../components/TeamCardList.vue'
import { onMounted, ref } from 'vue'
import myAxios from '../plugins/myAxios';
import { showToast } from 'vant'
const router = useRouter();
const active = ref('public')



//跳转到加入队伍页
const toAddTeam = () => {
    router.push({
        path: "/team/add"
    })
}

const teamList = ref([])
const searchText = ref('')
const onTabChange = (name) => {
    if (name === 'public') {
        listTeam(searchText.value, 0)
    } else {
        listTeam(searchText.value, 2)
    }
}
const listTeam = async (val = '', status = 0) => {
    const res = await myAxios.get("/team/list", {
        params: {
            searchText: val,
            pageNum: 1,
            status,
        }
    })
    if (res?.code === 0) {
        teamList.value = res.data
        showToast("加载 成功")
    } else {
        showToast("加载失败，请重新加载")
    }
}
onMounted(async () => {
    listTeam()
})
const onSearch = (val) => {
    listTeam(val)
}

</script>
<style scoped></style>