<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useCategoryStore } from "@/stores/useCategoryStore"
import { reqGetProduct, reqDeleteSpu } from "@/api/product/spu/index"
import { reqGetSpuInfoById } from "@/api/product/sku/index"
import type { resData } from "@/api/product/spu/type"
import spuForm from './spuForm.vue';
import skuForm from './skuForm.vue';
import { ElMessage } from 'element-plus';
const scene = ref(0)
const CategoryStore = useCategoryStore()
const currentPage = ref(1)
const pageSize = ref(3)
const total = ref(0)
const SPUFormList = ref()
const spuformRef = ref()
const skuFormRef = ref()
const isShowDialog = ref(false)
const skuInfoList = ref()
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
    spuformRef.value.imgFileList = []
    spuformRef.value.spuInfo.category3Id = CategoryStore.C3Id

    spuformRef.value.getTradeMarkList(CategoryStore.C3Id)
}
const addSku = (row: any) => {
    Scene(2)
    console.log(row);
    skuFormRef.value.getSku(row.id)

}
const showSkuInfo = async (row: any) => {
    const result = await reqGetSpuInfoById(row.id)
    skuInfoList.value = result.data
    console.log(result);
    isShowDialog.value = true

}
const deleteSpu = async (row: any) => {
    const result: any = await reqDeleteSpu(row.id)
    if (result.code == 200) {
        getSPUList()
        ElMessage.success('删除成功！')
    } else {
        ElMessage.error('删除失败！')
    }
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
                    <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="addSku(row)"></el-button>
                    <el-button type="primary" size="small" icon="Edit" title="修改SPU"
                        @click="updateSPU(row)"></el-button>
                    <el-button type="primary" size="small" icon="View" title="查看SPU列表"
                        @click="showSkuInfo(row)"></el-button>
                    <el-popconfirm title="确认删除吗？" @confirm="deleteSpu(row)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
            background layout=" prev, pager, next, jumper,->,sizes,total " :total="total" />
    </el-card>
    <spuForm v-show="scene == 1" @changeScene="Scene" @getSPUList="getSPUList" ref="spuformRef"></spuForm>
    <skuForm v-show="scene == 2" ref="skuFormRef" @changeSence="Scene(0)"></skuForm>
    <el-dialog v-model="isShowDialog" title="SKU列表">
        <el-table border :data="skuInfoList">
            <el-table-column label="SKU名称" prop="skuName"></el-table-column>
            <el-table-column label="价格" prop="price"></el-table-column>
            <el-table-column label="重量" prop="weight"></el-table-column>
            <el-table-column label="图片">
                <template #="{ row, $index }"><img :src="row.skuDefaultImg" style="width: 100px;"></template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<style scoped></style>