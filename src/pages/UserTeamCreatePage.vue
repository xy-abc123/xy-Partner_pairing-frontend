<template>
    <div id="teamPage">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
        <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>
        <team-card-list :teamList="teamList" />
        <van-empty v-if="!teamList | teamList?.length < 1" description="数据为空" />

    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import TeamCardList from '../components/TeamCardList.vue'
import { onMounted, ref } from 'vue'
import myAxios from '../plugins/myAxios';
import { showToast } from 'vant'
const router = useRouter();




//跳转到加入队伍页
const doJoinTeam = () => {
    router.push({
        path: "/team/add"
    })
}

const teamList = ref([])
const searchText = ref('')
const listTeam = async (val = '') => {
    const res = await myAxios.get("/team/list/my/create", {
        params: {
            searchText: val,
            pageNum: 1,
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