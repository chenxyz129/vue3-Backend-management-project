<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqGetSkuInfoByPage, reqSetSkuSaleOrUnsale } from "@/api/product/sku/index"
import { ElMessage } from 'element-plus';
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const skuData = ref()
const getSKUData = async () => {
    const result: any = await reqGetSkuInfoByPage(currentPage.value, pageSize.value)
    console.log(result);
    if (result.code == 200) {
        skuData.value = result.data.records
        pageSize.value = result.data.size
        total.value = result.data.total
    }
}
const saleOrUnSale = async (row: any) => {
    console.log(row);
    
    const result: any = await reqSetSkuSaleOrUnsale(row.id,row.isSale)
    if (row.isSale == 1) {
        if (result.code == 200) {
            ElMessage.success('下架成功！')
        } else {
            ElMessage.error('下架失败！')
        }
    } else if (row.isSale == 0) {
        if (result.code == 200) {
            ElMessage.success('上架成功！')
        } else {
            ElMessage.error('上架失败！')
        }
    }
    getSKUData()
}
onMounted(() => {
    getSKUData()
})
</script>

<template>
    <el-card style="width: 100%;">
        <el-table border :data="skuData">
            <el-table-column type="index" label="序号" width="100px" align="center"></el-table-column>
            <el-table-column label="名称" prop="skuName"></el-table-column>
            <el-table-column label="描述" prop="skuDesc"></el-table-column>
            <el-table-column label="图片">
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg" style="width: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="重量(g)" prop="weight"></el-table-column>
            <el-table-column label="价格(元)" prop="price"></el-table-column>
            <el-table-column label="操作" fixed="right">
                <template #="{ row, $index }">
                    <el-button type="primary" :icon="row.isSale ? 'Top' : 'Bottom'" size="small"
                        @click="saleOrUnSale(row)"></el-button>
                    <el-button type="primary" icon="Edit" size="small"></el-button>
                    <el-button type="info" icon="InfoFilled" size="small"></el-button>
                    <el-button type="danger" icon="Delete" size="small"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            background layout=" prev, pager, next,jumper,->, sizes, ,total" :total="total" @size-change="getSKUData"
            @current-change="getSKUData" style="margin-top: 10px;" />
    </el-card>
    <el-drawer v-model="isShowDrawer" direction="rtl"></el-drawer>
</template>

<style scoped></style>