<template>
    <van-form @submit="onSubmit">
        <van-field v-model="editUser.currentValue" :name="editUser.editKey" :label="editUser.editName"
            :placeholder="`请输入${editUser.editName}`" />
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import myAxios from '../plugins/myAxios'
import { showToast } from 'vant';
import { getCurrentUser } from '../services/user'




const route = useRoute()
const router = useRouter()
const editUser = ref({
    editKey: route.query.editKey,
    currentValue: route.query.currentValue,
    editName: route.query.editName
})



const onSubmit = async () => {
    const currentUser = await getCurrentUser()
    console.log(currentUser)

    if (!currentUser) {
        showToast('用户未登录')
        return
    }
    const res = await myAxios.post('/user/update', {
        'id': currentUser.id,
        [editUser.value.editKey as string]: editUser.value.currentValue
    })
    console.log(res.code)
    console.log(res.data)
    if (res.code === 0 && res.data > 0) {
        showToast("修改成功")
        router.back()
    } else {
        showToast("修改失败")
    }
    //todo 提交到后台
    console.log(res)
};
</script>
<style scoped></style>