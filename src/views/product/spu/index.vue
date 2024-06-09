<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCategoryStore } from "@/stores/useCategoryStore"
import { reqGetProduct } from "@/api/product/spu/index"
import type { resData } from "@/api/product/spu/type"
import spuForm from './spuForm.vue';
import skuForm from './skuForm.vue';
const scene = ref(2)
const CategoryStore = useCategoryStore()
const currentPage = ref(1)
const pageSize = ref(3)
const total = ref(0)
const SPUFormList = ref()
const spuformRef = ref()
watch(() => CategoryStore.C3Id, () => {
    if (CategoryStore.C3Id) {
        getSPUList()
    }
})
watch([currentPage, pageSize], () => {
    console.log(11);

    if (CategoryStore.C3Id) {
        getSPUList()
    }
})
const getSPUList = async () => {
    const result: resData = await reqGetProduct(currentPage.value, pageSize.value, CategoryStore.C3Id)
    if (result.code == 200) {
        // console.log(result);
        SPUFormList.value = result.data.records
        total.value = result.data.total
    }
}
const Scene = (sceneNum: number) => {
    scene.value = sceneNum
}
const addSPU = () => {
    Scene(1)
    spuformRef.value.spuInfo = {
        // id: '',
        createTime: "",
        updateTime: "",
        spuName: '',
        description: '',
        category3Id: '',
        tmId: '',
        spuSaleAttrList: [

        ],
        spuImageList: [],
        spuPosterList: []
    }
    spuformRef.value.imgFileList=[]
    spuformRef.value.spuInfo.category3Id = CategoryStore.C3Id

    spuformRef.value.getTradeMarkList(CategoryStore.C3Id)
}
const sddSku=()=>{
    Scene(2)
}
const updateSPU = (row: any) => {
    Scene(1)
    spuformRef.value.getSPUInfo(row.id)
    spuformRef.value.getTradeMarkList(CategoryStore.C3Id)
    console.log(row.id);
}

</script>

<template>
    <el-card style="width: 100%;margin: 10px 0">
        <Category :disabled="false"></Category>
    </el-card>

    <el-card style="width: 100%; " v-show="scene == 0">
        <el-button type="primary" icon="Plus" :disabled="!CategoryStore.C3Id" @click="addSPU">添加SPU</el-button>
        <el-table border style="margin: 10px 0;" :data="SPUFormList">
            <el-table-column label="序号" type="index" width="120px" align="center"></el-table-column>
            <el-table-column label="SPU名称" prop="spuName"></el-table-column>
            <el-table-column label="SPU描述" prop="description"></el-table-column>
            <el-table-column label="SPU操作">
                <template #="{ row, column, $index }">
                    <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="sddSku"></el-button>
                    <el-button type="primary" size="small" icon="Edit" title="修改SPU"
                        @click="updateSPU(row)"></el-button>
                    <el-button type="primary" size="small" icon="View" title="查看SPU列表"></el-button>
                    <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
            background layout=" prev, pager, next, jumper,->,sizes,total " :total="total" />
    </el-card>
    <spuForm v-show="scene == 1" @changeScene="Scene" @getSPUList="getSPUList" ref="spuformRef"></spuForm>
    <skuForm v-show="scene == 2"></skuForm>
</template>

<style scoped></style>