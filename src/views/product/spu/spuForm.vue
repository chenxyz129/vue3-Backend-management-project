<script setup lang="ts">
import { reqGetSpuInfoById, reqSaveSpuInfo } from "@/api/product/spu/index"
import { reqTrademarkList } from "@/api/product/trademark/index"

import { computed, nextTick, ref } from "vue";
import { ElMessage, type UploadRawFile } from "element-plus"

const emit = defineEmits(['changeScene','getSPUList'])
const selectedAddAttr = ref()
const saveSpuInfo = ref()
const AttrInput = ref()
const spuInfo = ref<any>({
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
})
const allSpuSaleAttr = ref([{ id: 1, name: '颜色' }, { id: 2, name: "版本" }, { id: 3, name: "尺码" }])
const unSelectSpuAttr = computed(() => {
    return allSpuSaleAttr.value.filter((item) =>
        spuInfo.value.spuSaleAttrList.every((item1:any) => item1.saleAttrName != item.name)
    )
})
const spuTradeMarklList = ref()
const imgFileList = ref()
const addAttr = () => {
    spuInfo.value.spuSaleAttrList.push(selectedAddAttr.value)
    selectedAddAttr.value = ''
}
const cancel = () => {
    emit('changeScene', 0)
}
const getTradeMarkList = async (c3id: number | string) => {
    const result = await reqTrademarkList(c3id)
    spuTradeMarklList.value = result.data

}


const addSaleAttrValue = (row: any) => {
    row.isEditing = true
    console.log(row);
    
    nextTick(() => AttrInput.value.focus())
}
const BlurAddSaleAttrValue = (row: any) => {
    if (row.editingValue == '' || row.editingValue == undefined) {
        row.isEditing = false
        row.editingValue = ''
        return
    } else {
        if (row.spuSaleAttrValueList.find((item: any) => item.saleAttrValueName == row.editingValue)) {
            ElMessage.error('属性值不能重复')
            return
        } else {
            row.spuSaleAttrValueList.push({ saleAttrName: row.saleAttrName, saleAttrValueName: row.editingValue, spuId: spuInfo.value.id,baseSaleAttrId:row.baseSaleAttrId })
            row.isEditing = false
            row.editingValue = ''
        }
    }
}
const getSPUInfo = async (spuid: number) => {
    const result = await reqGetSpuInfoById(spuid)
    console.log(result);

    Object.assign(spuInfo.value, result.data)

    imgFileList.value = spuInfo.value.spuImageList.map((item:any) => { return { name: item.imgName, url: item.imgUrl } })
}
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const handlePictureCardPreview = (uploadFile: any) => {
    dialogVisible.value = true
    dialogImageUrl.value = uploadFile.url
}
const imgBefreUpload = (rawFile: UploadRawFile) => {
    if (rawFile.size / 1024 / 1024 < 3) {
        if (rawFile.type == 'image/jepg' || rawFile.type == 'image/gif' || rawFile.type == 'image/png') {
            return true
        }
    } else {
        ElMessage.error('图片大小不能大于3M,且格式需为jepg、gif、png')
        return false
    }

}
const save = async () => {
    saveSpuInfo.value = JSON.parse(JSON.stringify(spuInfo.value))
    saveSpuInfo.value.spuImageList = imgFileList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: item.hasOwnProperty('response') ? item.response.data : item.url
        }
    })
    const result = await reqSaveSpuInfo(saveSpuInfo.value) 
    if (result.code == 200) {
        ElMessage.success('保存成功')
        emit('changeScene', 0)
        emit('getSPUList')
    } else {
        ElMessage.error('保存失败')
    }

}
defineExpose({ getSPUInfo, getTradeMarkList ,spuInfo,imgFileList})
</script>

<template>
    <el-card style="width: 100%;">
        <el-form label-width="100px">
            <el-form-item label="SPU名称" style="width: 500px;">
                <el-input placeholder="请输入SPU名称" v-model="spuInfo.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select style="width: 200px;" v-model="spuInfo.tmId">
                    <el-option v-for="(item, index) in spuTradeMarklList" :key="item.id" :label="item.tmName"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述" style="width: 500px;">
                <el-input v-model="spuInfo.description" </el-input>
            </el-form-item>
            <el-form-item label="SPU图标">
                <el-upload v-model:file-list="imgFileList" action="/api/admin/product/fileUpload"
                    list-type="picture-card" :on-preview="handlePictureCardPreview" 
                    :before-upload="imgBefreUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;height: 100%;" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select style="width: 300px;" v-model="selectedAddAttr"
                    :placeholder="`还剩${unSelectSpuAttr.length}个未选择`">
                    <el-option v-for="(item, index) in unSelectSpuAttr" :label="item.name" :key="index"
                        :value="{ baseSaleAttrId: item.id, saleAttrName: item.name, spuSaleAttrValueList: [] }"></el-option>
                </el-select>
                <el-button :disabled="!selectedAddAttr" @click="addAttr" style="margin-left: 10px;" icon="Plus"
                    type="primary">添加属性</el-button>
                <el-table border style="margin: 10px 0;" :data="spuInfo.spuSaleAttrList">
                    <el-table-column label="序号" align="center" width="100px" type="index"></el-table-column>
                    <el-table-column label="销售属性名字" prop="saleAttrName"></el-table-column>
                    <el-table-column label="销售属性值">
                        <template #="{ row, column, $index }">
                            <el-tag @close="row.spuSaleAttrValueList.splice(index, 1)"
                                v-for="(item, index) in row.spuSaleAttrValueList" :key="row.id" closable
                                style="margin: 0 2px;">{{ item.saleAttrValueName }}
                            </el-tag>
                            <el-input ref="AttrInput" style="width: 100px;" size='small'
                                @blur="BlurAddSaleAttrValue(row)" v-if="row.isEditing"
                                v-model="row.editingValue"></el-input>
                            <el-button icon="Plus" size="small" v-else @click="addSaleAttrValue(row)"
                                type="primary"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #="{ row, $index }">
                            <el-button type="danger" size="small" @click="spuInfo.spuSaleAttrList.splice($index, 1)"
                                icon="Delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="save">确定</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style scoped></style>