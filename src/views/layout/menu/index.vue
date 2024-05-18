<script setup lang="ts">
import { useRouter } from 'vue-router';
const  router=useRouter()
defineProps(['menuList'])
const goRoute = (vc: any) => {
    console.log(vc);
    router.push(vc.index)
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <template v-if="!item.meta.isHidden">
            <el-menu-item v-if="!item.children" :index="item.path" @click="goRoute">
                <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                <template #title>                  
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            <el-menu-item v-if="item.children && item.children.length == 1" :index="item.children[0].path" @click="goRoute">
                <el-icon>
                        <component :is="item.children[0].meta.icon"></component>
                    </el-icon>
                <template #title> 
                    <span>{{ item.children[0].meta.title }}</span></template>
            </el-menu-item>
            <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span></template>
                <Menu :menuList="item.children" />
            </el-sub-menu>
        </template>
    </template>
</template>

<style scoped></style>