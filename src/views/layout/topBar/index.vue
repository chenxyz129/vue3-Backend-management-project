<script setup lang="ts">
import useMenuStore from '@/stores/useMenuStore';
import useUserStore from '@/stores/useUserStore';
import { useRoute } from 'vue-router';
import router from '@/router';
import { ref } from 'vue';
const route = useRoute()
const menuStore = useMenuStore()
const UserStore = useUserStore()

const isDark = ref(false)
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
    useUserStore().restRoutes()
    router.push({ path: '/login', query: { redirect: route.path } })
}
const setDark = () => {
    const html = document.documentElement
    isDark.value ? html.className = 'dark' : html.className = ''
}
const color = ref('bule')
const setColor = () => {
    // document.documentElement 是全局变量时
    const el = document.documentElement
    // const el = document.getElementById('xxx')
    // 获取 css 变量
    getComputedStyle(el).getPropertyValue(`--el-color-primary`)
    // 设置 css 变量
    el.style.setProperty('--el-color-primary', color.value)
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
                    <el-breadcrumb-item v-if="!item.meta.hideBreadcrumb" :to="item.path">
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
            <el-popover trigger="hover" title="主题设置" width="200px">
                <template #reference>
                    <el-button circle>
                        <el-icon size="small">
                            <Setting />
                        </el-icon>
                    </el-button>
                </template>
                <el-form>
                    <el-form-item label="主题颜色"><el-color-picker v-model="color" :teleported="false" @change="setColor"/></el-form-item>
                    <el-form-item label="暗黑主题"><el-switch v-model="isDark" @change="setDark" inline-prompt
                            active-icon="Moon" inactive-icon="Sunny" /></el-form-item>
                </el-form>
            </el-popover>
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