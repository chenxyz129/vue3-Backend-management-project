<script setup lang="ts">
import router from "@/router";
import useUserStore from "@/stores/useUserStore"
import { onMounted } from "vue";
const userStore = useUserStore()
const getTime = () => {
    let time = ''
    let hour = new Date().getHours()
    if ((hour >= 0 && hour < 6) || (hour >= 18 && hour < 0)) {
        time = '晚上'
    } else if (hour >= 6 && hour < 12) {
        time = '上午'
    } else if (hour >= 12 && hour < 14) {
        time = '中午'
    } else if (hour >= 14 && hour < 18) {
        time = '下午'
    } else if (hour >= 18) {
        time = '晚上'
    }
    return time
}
onMounted(()=>{
    if(!userStore.token){
        router.push({path:'/login'})
    }
})
</script>

<template>
    <el-card style="width: 100%;height: 150px;">
        <div style="display: flex;">
            <img :src="userStore.avatar" style="width: 100px;height: 100px;border-radius: 50%;margin-left: 30px">
            <div style="margin-left: 30px;">
                <p style="font-size: 30px;margin: 20px">{{ getTime() }}好！</p>
                <p>硅谷甄选后台管理项目</p>
            </div>
        </div>
    </el-card>
    <div style="display: flex;justify-content: center;width: 100%;">
        <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
    </div>
</template>

<style scoped></style>