<template>
    <div id="TeamAddPage">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="addTeamData.name" name="name" label="队伍名称" placeholder="请输入队伍名"
                    :rules="[{ required: true, message: '请填写队伍名' }]" />
                <van-field v-model="addTeamData.description" rows="4" autosize label="描述" type="textarea"
                    placeholder="请输入留言" />


                <van-field v-model="result" is-link readonly name="datePicker" label="时间选择" placeholder="点击选择时间"
                    @click="showPicker = true" />
                <van-popup v-model:show="showPicker" position="bottom">
                    <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
                </van-popup>
                <van-field name="stepper" label="最大人数">
                    <template #input>
                        <van-stepper v-model="addTeamData.maxNum" max="10" min="3" />
                    </template>
                </van-field>
                <van-field name="radio" label="队伍状态">
                    <template #input>
                        <van-radio-group v-model="addTeamData.status" direction="horizontal">
                            <van-radio name="0">公开</van-radio>
                            <van-radio name="1">私有</van-radio>
                            <van-radio name="2">加密</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-if="Number(addTeamData.status) === 2" v-model="addTeamData.password" type="password"
                    name="password" label="密码" placeholder="请输入队伍密码" :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>


            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import myAxios from '../plugins/myAxios'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()
const initFormData = {
    "name": "",
    "description": "",
    "expireTime": "",
    "maxNum": 3,
    "password": "",
    "status": 0,
}
//用户填写表单数据
const addTeamData = ref({ ...initFormData })

const result = ref('')
const showPicker = ref(false);
const onConfirm = ({ selectedValues }) => {
    result.value = selectedValues.join('-')
    // console.log(addTeamData.expireTime)
    showPicker.value = false;
}
const onSubmit = async () => {
    const postData = {
        ...addTeamData.value,
        status: Number(addTeamData.value.status),
        expireTime: result.value,
    }
    const res = await myAxios.post("/team/add", postData)
    if (res?.code === 0 && res.data) {
        showToast("添加成功")
        router.push({
            path: '/team',
            replace: true,
        })
    } else {
        showToast("添加失败")
    }
    console.log(postData)
}

</script>
<style scoped></style>