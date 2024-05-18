<script setup lang="ts">
import Menu from './menu/index.vue';
import topBar from './topBar/index.vue'
import useUserStore from '@/stores/useUserStore';
const menuRoutes = useUserStore().menuRoutes
import { useRoute } from 'vue-router';
const route =useRoute()
console.log(route.path);

</script>

<template>
    <el-row>
        <el-col :span="4" class="left">
            <el-row class="top">
                <img src="../../../public/logo.png" alt="">
                <p>后台管理项目</p>
            </el-row>
            <el-row class="sideBar">
                <el-scrollbar>
                    <el-menu class="menu"  :default-active="route.path">
                        <Menu :menuList="menuRoutes"></Menu>
                    </el-menu>
                </el-scrollbar>
            </el-row>
        </el-col>
        <el-col :span="20" class="right">
            <el-row class="top"><topBar></topBar></el-row>
            <el-row class="detail"><RouterView></RouterView></el-row>
        </el-col>
    </el-row>
</template>

<style scoped lang="scss">
.left {
    .top {
        display: flex;
        align-items: center;
        height: 50px;

        img {
            height: 100%;
            margin: 2px 5px
        }

        p {
            font-size: 20px;
        }
    }
}

.right {
    .top {
        height: 50px;
    }

    .detail {
        padding: 20px;
    }
}

.menu {
    width: 300px;
}
</style>