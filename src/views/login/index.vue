<script setup lang="ts">
import { reactive, ref } from 'vue';
import useUserStore from '@/stores/useUserStore';
import type { loginForm } from '@/api/user/types';
import { ElNotification } from 'element-plus';
import router from '@/router';
let login_form = reactive({ username: "admin", password: "111111" })
let RefForm = ref()
let Is_show_password = ref(true)
let Is_btn_loading = ref(false)
let UserStore = useUserStore()
const login = async (login_form: loginForm) => {
    await RefForm.value.validate()

    Is_btn_loading.value = true
    UserStore.UserLogin(login_form).then(() => {
        ElNotification({
            title: 'Success',
            message: '登录成功，' + getTime() + '好！',
            type: 'success',
        })
        router.push({ path: '/' })
        Is_btn_loading.value = false
    }).catch(() => {
        ElNotification({
            title: 'Error',
            message: '登录失败，' + getTime() + '好！',
            type: 'error',
        })
        Is_btn_loading.value = false
    })
}
let getTime = () => {
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
const validatorPasswd = (rule: any, value: any, callback: any) => {
        // console.log(value);
        

    if (value.length >= 6 && value.length <= 18) {
        callback()
    } else {
        callback(new Error('密码长度为6-18位！'))
    }
}
let login_form_rules = {
    username: [
        { required: true, min: 3, max: 6, message: '用户名长度必须在3至6位之间！', trigger: 'change' },
    ],
    password: [{
        trigger: 'change', validator: validatorPasswd,message:'密码长度必须在6至18位之间！'
    },]
}
</script>

<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="loginForm" ref="RefForm" v-model="login_form" :model="login_form" name="login_Form"
                    :rules="login_form_rules">
                    <h1>HELLO</h1>
                    <h2>欢迎来到尚硅谷甄选</h2>
                    <el-form-item prop="username"><el-input prefix-icon="User"
                            v-model="login_form.username"></el-input></el-form-item>
                    <el-form-item prop="password"><el-input prefix-icon="Lock" type="passwrod"
                            v-model="login_form.password" :show-password="Is_show_password"></el-input></el-form-item>
                    <el-form-item><el-button type="primary" size="default" class="login_btn" @click="login(login_form)"
                            :loading="Is_btn_loading">登录</el-button></el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
.login_container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .loginForm {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url("@/assets/images/login_form.png") no-repeat;
        background-size: cover;
        padding: 15px;
        border-radius: 15px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            margin: 10px 0;
            color: white;
            font-size: 20px;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>