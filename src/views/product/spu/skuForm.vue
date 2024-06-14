<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['cancal','changeSence'])
import { reqAttrInfoList } from '@/api/product/attr/index'
import { reqGetSpuInfoById } from "@/api/product/spu/index"
import { reqsaveSkuInfo } from "@/api/product/sku/index"
import { useCategoryStore } from "@/stores/useCategoryStore";
import { ElMessage } from 'element-plus';
const CategoryStore = useCategoryStore()
const AttrInfoList = ref()
const imgTableRef = ref()

const skuInfo = ref<any>({
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: "",
    price: '',
    weight: "",
    skuDesc: "",
    skuAttrValueList: [
        {
            attrId: '',
            valueId: '',
        }
    ],
    skuSaleAttrValueList: [
        {
            saleAttrId: '',
            saleAttrValueId: '',
        }
    ],
    skuDefaultImg: "",
})
const selectedAttrList = ref([])
const selectedSaleAttrList = ref([])
const SPUInfo = ref<any>()
const getSku = (spuid: number) => {
    getAttrInfoList()
    getSPUInfo(spuid)
}
const getAttrInfoList = async () => {
    const result = await reqAttrInfoList(CategoryStore.C1Id, CategoryStore.C2Id, CategoryStore.C3Id)
    AttrInfoList.value = result.data
}
const spuSaleAttrList = ref()
const spuImageList = ref()
const getSPUInfo = async (spuId: number) => {
    const result = await reqGetSpuInfoById(spuId)
    // console.log(result);
    SPUInfo.value = result.data
    spuSaleAttrList.value = result.data.spuSaleAttrList
    spuImageList.value = result.data.spuImageList
}
const saveSkuInfo = async () => {
    skuInfo.value.category3Id = CategoryStore.C3Id
    skuInfo.value.spuId = SPUInfo.value.id
    skuInfo.value.tmId = SPUInfo.value.tmId
    skuInfo.value.skuAttrValueList = selectedAttrList.value
    skuInfo.value.skuSaleAttrValueList = selectedSaleAttrList.value
    const result: any = await reqsaveSkuInfo(skuInfo)
    console.log(result);

    if (result.code == 200) {
        emit('changeSence')
        ElMessage.success('保存成功')
    } else {
        ElMessage.error('保存失败')
    }
}
const cancal = () => {
    emit('changeSence')
}
const setDefalut = (row: any) => {
    imgTableRef.value.clearSelection()
    imgTableRef.value.toggleRowSelection(row, true)
    skuInfo.value.skuDefaultImg = row.imgUrl
}
defineExpose({ getSku, getAttrInfoList, getSPUInfo })
</script>

<template>
    <el-card style="width: 100%;">
        <el-form label-width="100px">
            <el-form-item label='SKU名称'>
                <el-input placeholder="SKU名称" v-model="skuInfo.skuName" </el-input>
            </el-form-item>
            <el-form-item label='价格(元)'>
                <el-input placeholder="价格(元)" v-model="skuInfo.price"></el-input>
            </el-form-item>
            <el-form-item label='重量(g)'>
                <el-input placeholder="重量(g)" v-model="skuInfo.weight"></el-input>
            </el-form-item>
            <el-form-item label='SKU描述'>
                <el-input placeholder="SKU描述" v-model="skuInfo.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form inline>
                    <el-form-item :label="item.attrName" v-for="(item, index) in AttrInfoList" :key="item.id">
                        <el-select v-model="selectedAttrList[index]" value-key="attrId">
                            <el-option v-for="(item1, index) in item.attrValueList" :key="item1.id"
                                :label="item1.valueName" :value="{ attrId: item1.attrId, valueId: item1.id }">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form inline>
                    <el-form-item :label="item.saleAttrName" v-for="(item, index) in spuSaleAttrList" :key="item.id">
                        <el-select v-model="selectedSaleAttrList[index]" value-key="saleAttrValueId">
                            <el-option v-for="(item1, index) in item.spuSaleAttrValueList" :key="item1.id"
                                :label="item1.saleAttrValueName" :value="{ saleAttrId: item1.spuId, saleAttrValueId: item1.id }"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
            </el-form-item>
            <el-form-item>
                <el-table border style="margin-bottom:10px" :data="spuImageList" ref="imgTableRef">
                    <el-table-column type="selection" width="50px" align="center"></el-table-column>
                    <el-table-column label="图片">
                        <template #="{ row, $index }">
                            <img :src="row.imgUrl" style="width: 100px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="imgName"></el-table-column>
                    <el-table-column label="操作">
                        <template #="{ row, $index }">
                            <el-button type="primary" @click="setDefalut(row)">设置默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="saveSkuInfo">保存</el-button>
                <el-button type="primary" @click="cancal">取消</el-button>
            </el-form-item>

        </el-form>
    </el-card>
</template>

<style scoped lang="scss">
.el-select {
    width: 200px;
}
</style>