<script setup lang="ts">
import { onMounted,defineProps, onUnmounted } from 'vue';
import { useCategoryStore } from '@/stores/useCategoryStore';
const CategoryStore = useCategoryStore()
defineProps(['disabled'])
onMounted(() => {
    CategoryStore.getC1()
})
const getCategory2 = () => {
    CategoryStore.C2arr = [];
    CategoryStore.C2Id = "";
    CategoryStore.C3arr = [];
    CategoryStore.C3Id = "";
    CategoryStore.getC2()
}
const getCategory3 = () => {
    CategoryStore.C3arr = [];
    CategoryStore.C3Id = "";
    CategoryStore.getC3()
}

</script>

<template>
    <el-form :inline="true" :disabled="disabled">
        <el-form-item label="一级菜单">
            <el-select v-model="CategoryStore.C1Id" @change="getCategory2">
                <el-option v-for="(item, index) in CategoryStore.C1arr" :key="item.id" :label="item.name"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级菜单">
            <el-select v-model="CategoryStore.C2Id" @change="getCategory3">
                <el-option v-for="(item, index) in CategoryStore.C2arr" :key="item.id" :label="item.name"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级菜单">
            <el-select v-model="CategoryStore.C3Id">
                <el-option v-for="(item, index) in CategoryStore.C3arr" :key="item.id" :label="item.name"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="scss">
.el-form {
    .el-form-item {
        width: 25%;
    }
}
</style>