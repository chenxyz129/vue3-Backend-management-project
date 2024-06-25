<script setup lang="ts">
import Menu from './menu/index.vue';
import topBar from './topBar/index.vue'
import useUserStore from '@/stores/useUserStore';
import { useRoute } from 'vue-router';
import useMenuStore from '@/stores/useMenuStore';
import { nextTick, onBeforeMount, onMounted, ref, watch } from 'vue';
const menuStore = useMenuStore()
const menuRoutes = useUserStore().menuRoutes;
const route = useRoute()
const isShowDetail = ref(true)
watch(() => menuStore.isChange, () => {
    isShowDetail.value = false
    nextTick(() => isShowDetail.value = true)
})

onBeforeMount(()=>{
    useUserStore().getUserInfo()
})
onMounted(() => {
    
})
</script>
<script lang="ts">
export default {
    name: 'Layout'
}
</script>
<template>
    <el-row>
        <div class="left" :class="{ CollapseLeft: menuStore.isMenuCollapse ? true : false }">
            <el-row class="top">
                <img src="../../../public/logo.png">
                <p v-if="!menuStore.isMenuCollapse">后台管理项目</p>
            </el-row>
            <el-row class="sideBar">
                <!-- <el-scrollbar > -->
                <el-menu class="menu" :default-active="route.path" :collapse="menuStore.isMenuCollapse">
                    <Menu :menuList="menuRoutes"></Menu>
                </el-menu>
                <!-- </el-scrollbar> -->
            </el-row>
        </div>
        <div class="right" :class="{ CollapseRight: menuStore.isMenuCollapse ? true : false }">
            <el-row class="top">
                <topBar></topBar>
            </el-row>
            <el-row class="detail">
                <RouterView v-if="isShowDetail"></RouterView>
            </el-row>
        </div>
    </el-row>
</template>

<style scoped lang="scss">
.left {
    height: 100vh;
    width: $left_sider_max_width;
    transition: all .3s linear;

    &.CollapseLeft {
        width: $left_sider_min_width;

    }

    .top {
        display: flex;
        align-items: center;
        height: 50px;

        img {
            height: 100%;
            margin-left: 8px;
        }

        p {
            padding-left: 15px;
            font-size: 20px;
        }
    }

    .el-menu {
        width: 100%;
        transition: all .1s linear;

    }


}

.right {
    transition: all .3s linear;

    &.CollapseRight {
        width: calc(100% - $left_sider_min_width)
    }

    width: calc(100% - $left_sider_max_width);
    height: 100vh;

    .top {
        height: 50px;
    }

    .detail {
        padding: 20px;
    }
}
</style>