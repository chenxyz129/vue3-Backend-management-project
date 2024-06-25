<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqGetSkuInfoByPage, reqSetSkuSaleOrUnsale, reqGetSkuInfoBySkuId ,reqDelSkuBySkuId} from "@/api/product/sku/index"
import { ElMessage } from 'element-plus';
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const skuData = ref()
const isShowDrawer = ref(false)
const SkuDetail = ref()
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
    const result: any = await reqSetSkuSaleOrUnsale(row.id, row.isSale)
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
const showSkuDetail = async (row: any) => {
    const result: any = await reqGetSkuInfoBySkuId(row.id)
    if (result.code == 200) {
        SkuDetail.value = result.data
        isShowDrawer.value = true
    }
    
}
const delSku=async (row:any)=>{
    const result:any=await reqDelSkuBySkuId(row.id)
    if(result.code == 200){
        getSKUData()
        ElMessage.success('删除成功！')
    }else{
        ElMessage.error('删除失败！')
    }
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
                    <el-button type="info" icon="InfoFilled" size="small" @click="showSkuDetail(row)"></el-button>
                    <el-button type="danger" icon="Delete" size="small" @click="delSku(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            background layout=" prev, pager, next,jumper,->, sizes, ,total" :total="total" @size-change="getSKUData"
            @current-change="getSKUData" style="margin-top: 10px;" />
    </el-card>
    <el-drawer v-model="isShowDrawer" direction="rtl">
        <el-row>
            <el-col :span="6">名称</el-col>
            <el-col :span="18">{{ SkuDetail.skuName }}</el-col>
        </el-row>
        <el-row>
            <el-col :span="6">描述</el-col>
            <el-col :span="18">{{ SkuDetail.skuDesc }}</el-col>
        </el-row>
        <el-row>
            <el-col :span="6">价格</el-col>
            <el-col :span="18">{{ SkuDetail.price }}</el-col>
        </el-row>
        <el-row>
            <el-col :span="6">平台属性</el-col>
            <el-col :span="18">
                <el-tag v-for="(item, index) in SkuDetail.skuAttrValueList " :key="index"
                    >{{ item.attrName }}</el-tag>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">销售属性</el-col>
            <el-col :span="18">
                <el-tag v-for="item in SkuDetail.skuSaleAttrValueList"> {{ item.saleAttrName }}</el-tag>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">商品属性</el-col>
            <el-col :span="18"></el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in SkuDetail.skuImageList" :key="item">
                        <img :src="item.imgUrl" style="width: 100%;">
                    </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
    </el-drawer>
</template>

<style scoped lang="scss">
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.el-drawer {
    .el-col {
        margin-bottom: 15px;
        .el-tag{
            margin: 2px 5px
        }
    }
}
</style>