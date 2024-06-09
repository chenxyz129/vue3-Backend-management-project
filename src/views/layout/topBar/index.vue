<script setup lang="ts">
import useMenuStore from '@/stores/useMenuStore';
import useUserStore from '@/stores/useUserStore';
import { useRoute } from 'vue-router';
import router from '@/router';
const route = useRoute()
const menuStore = useMenuStore()
const UserStore = useUserStore()
const changeCollapse = () => {
    menuStore.isMenuCollapse = !menuStore.isMenuCollapse
}
const flash = () => {
    menuStore.isChange = !menuStore.isChange

}
const setScreenFull = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }

}
const logout = async () => {
    await useUserStore().userLogout()
    router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<template>
    <div class="topbar">
        <div class="left">
            <el-icon @click="changeCollapse">
                <component :is="menuStore.isMenuCollapse ? 'Fold' : 'Expand'"></component>
            </el-icon>
            <el-breadcrumb separator-icon="ArrowRight">
                <template v-for="(item, index) in route.matched" :key="index">
                    <el-breadcrumb-item v-show="!item.meta.hideBreadcrumb" :to="item.path">
                        <el-icon style="vertical-align: middle;">
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span>{{ item.meta.title }}</span>
                    </el-breadcrumb-item>
                </template>
            </el-breadcrumb>

        </div>
        <div class="right">
            <el-button circle>
                <el-icon size="small" @click="flash">
                    <Refresh />
                </el-icon>
            </el-button>
            <el-button circle @click="setScreenFull">
                <el-icon size="small">
                    <FullScreen />
                </el-icon>
            </el-button>
            <el-button circle>
                <el-icon size="small">
                    <Setting />
                </el-icon>
            </el-button>
            <img :src="UserStore.avatar" style="width: 30px;height: 30px; margin:0 5px;border-radius: 50%">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ UserStore.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu style="width: 150px">
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<style scoped lang="scss">
.topbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 25px;

    .left {
        display: flex;
        align-items: center;

        .el-breadcrumb {
            margin-left: 10px;
            display: flex;
            align-items: center;
            font-size: 15px;

            span {
                margin-left: 3px;
            }



        }
    }

    .right {
        display: flex;
        align-items: center;
    }
}
</style>