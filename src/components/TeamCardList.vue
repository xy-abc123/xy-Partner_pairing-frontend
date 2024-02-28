<template>
    <van-card v-for="team in teamList" :thumb="ikun" :desc="team.description" :title="`${team.name}`">
        <template #tags>
            <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
                {{
                    teamStatusEnum[team.status]
                }}
            </van-tag>
        </template>
        <template #bottom>
            <div>
                {{ `队伍人数: ${team.hasJoinNum} /${team.maxNum} ` }}
            </div>
            <div v-if="team.expireTime">
                {{ '过期时间： ' + team.expireTime }}
            </div>
            <div>
                {{ '发布时间： ' + team.createTime }}
            </div>

        </template>
        <template #footer>
            <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="small" plain type="primary"
                @click="preJoinTeam(team)">加入队伍
            </van-button>
            <van-button v-if="team.userId === currentUser?.id" size="small" plain type="primary"
                @click="doUpdateTeam(team.id)">更新队伍
            </van-button>
            <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" plain
                @click="doQuitTeam(team.id)">退出队伍
            </van-button>
            <van-button v-if="team.userId === currentUser?.id" size="small" plain type="danger"
                @click="doDeleteTeam(team.id)">解散队伍
            </van-button>
        </template>
    </van-card>
    <van-empty v-if="!teamList | teamList.length < 1" description="数据为空" />
    <van-dialog v-model:show="showPasswordDialog" title="填写密码" show-cancel-button @confirm="doJoinTeam"
        @cancel="doJoinCancel">
        <van-field v-model="password" placeholder="请输入密码 " show-cancel-button />
    </van-dialog>
</template>
<script setup lang="ts">
import { TeamType } from "../models/team";
import { teamStatusEnum } from '../constants/team.ts'
import ikun from '../assets/ikun.jpg'
import myAxios from "../plugins/myAxios";
import { showToast } from "vant";
import { ref, onMounted } from 'vue'
import { getCurrentUser } from "../services/user";
import { useRouter } from "vue-router";
const router = useRouter()
interface TeamCardListProps {
    teamList: TeamType[]
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
    teamList: [] as TeamType[],
})
const currentUser = ref()
const showPasswordDialog = ref(false)
const joinTeamId = ref()
const password = ref()
onMounted(async () => {
    currentUser.value = await getCurrentUser()
})
const doJoinCancel = () => {
    joinTeamId.value = 0,
        password.value = ''
}
const preJoinTeam = (team: TeamType) => {
    joinTeamId.value = team.id
    if (team.status === 0) {
        doJoinTeam()
    } else {
        showPasswordDialog.value = true
    }
}
const doJoinTeam = async () => {
    if (!joinTeamId.value) {
        return
    }
    const res = await myAxios.post('/team/join', {
        teamId: joinTeamId.value,
        password: password.value
    })
    console.log(res)
    if (res?.code === 0) {
        showToast("加入成功")
    } else {
        showToast("加入失败")
    }
}


/**
 * 跳转到更新队伍界面
 * @param id 
 */
const doUpdateTeam = (id: number) => {
    router.push({
        path: "/team/update",
        query: {
            id
        }
    })

}
/**
 * 退出队伍
 * @param id 
 */
const doQuitTeam = async (id: number) => {
    const res = await myAxios.post('/team/quit', {
        teamId: id
    })
    console.log(res)
    if (res?.code === 0) {
        showToast("操作成功")
    } else {
        showToast("操作失败")
    }
}
/**
 * 解散队伍
 * @param id 
 */
const doDeleteTeam = async (id: number) => {
    const res = await myAxios.post('/team/delete', {
        id
    })
    console.log(res)
    if (res?.code === 0) {
        showToast("操作成功")
    } else {
        showToast("操作失败")
    }
}

</script>

<style scoped></style>