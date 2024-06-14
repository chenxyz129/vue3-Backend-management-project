<script setup lang="ts">
import { reqAttrInfoList, reqSaveAttrInfo, reqdeleteAttr } from "@/api/product/attr";
import { useCategoryStore } from "@/stores/useCategoryStore"
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref, watch } from "vue";
const CategoryStore = useCategoryStore()
const isShowADDCard = ref(false)
const saveAttrInfo = reactive<any>({
    attrName: "",
    attrValueList: [
        {
            attrId: 0,
            // createTime: '',
            id: '',
            updateTime: '',
            // valueName: ""
        }
    ],
    categoryId: 0,
    categoryLevel: 3,
    // createTime: '',
    id: '',
    // updateTime: ''
})
const addattrLine = () => {
    saveAttrInfo.attrValueList.push({
        attrId: 0,
        createTime: '',
        id: 0,
        updateTime: '',
        valueName: ""
    })
}
const addAttr = () => {
    Object.assign(saveAttrInfo, {
        attrName: "",
        attrValueList: [
            {
                attrId: 0,
                // createTime: '',
                id: '',
                updateTime: '',
                // valueName: ""
            }
        ],
        categoryId: 0,
        categoryLevel: 3,
        // createTime: '',
        id: '',
        // updateTime: ''
    })
    saveAttrInfo.categoryId = CategoryStore.C3Id
    SwitchCard()
}
const save = async () => {
    const result = await reqSaveAttrInfo(saveAttrInfo)
    console.log(result);
    if (result.code == 200) {
        getAttrArr()
        SwitchCard()
        ElMessage.success('保存成功')
    } else {
        SwitchCard()
        ElMessage.error('保存失败')

    }

}
const SwitchCard = () => {
    isShowADDCard.value = !isShowADDCard.value
}
const getAttrArr = async () => {
    CategoryStore.attrArr = ''
    if (useCategoryStore().C3Id) {
        const result = await reqAttrInfoList(CategoryStore.C1Id, CategoryStore.C2Id, CategoryStore.C3Id)
        CategoryStore.attrArr = result.data


    }
}
const updateAttr = (row: any) => {
    console.log(row);
    Object.assign(saveAttrInfo, JSON.parse(JSON.stringify(row)))
    SwitchCard()
}
const delAttr = async (id: number) => {
    const result: any = await reqdeleteAttr(id)
    if (result.code == 200) {
        getAttrArr()
        ElMessage.success("删除成功！")
    } else {
        console.log(result);

        ElMessage.error("删除失败！")
    }
}
watch(() => CategoryStore.C3Id, () => {
    getAttrArr()
})
// onMounted(()=>{
//     CategoryStore.$reset()
// })
</script>

<template>
    <el-card style="width: 100%;">
        <Category :isShowADDCard="isShowADDCard"></Category>
    </el-card>
    <el-card style="margin: 10px 0;width: 100%;">
        <div v-if="!isShowADDCard">
            <el-button type="primary" icon="Plus" :disabled="!useCategoryStore().C3Id" @click="addAttr">添加属性</el-button>
            <el-table border style="margin-top: 20px;" :data="CategoryStore.attrArr">
                <el-table-column label="序号" align="center" width="100px" type="index"></el-table-column>
                <el-table-column label="属性名称" width="150px" prop="attrName"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #default="{ row, column, $index }">
                        <el-tag type="primary" v-for="(item, index) in row.attrValueList" :key="row.attrValueList.id"
                            style="margin: 5px;">{{ item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template #="{ row, $index }">
                        <el-button type="primary" icon="Edit" @click="updateAttr(row)"></el-button>
                        <el-popconfirm @confirm="delAttr(row.id)">
                            <template #reference>
                                <el-button type="primary" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="isShowADDCard">
            <el-form :inline="true">
                <el-form-item label="属性名称"><el-input placeholder="请输入属性名称"
                        v-model="saveAttrInfo.attrName"></el-input></el-form-item>
            </el-form>
            <el-button type="primary" icon="Plus" @click="addattrLine"
                :disabled="!saveAttrInfo.attrName.trim()">添加属性</el-button>
            <el-button type="primary" @click="SwitchCard">取消</el-button>

            <el-table border style="margin: 10px 0;" :data="saveAttrInfo.attrValueList">
                <el-table-column label="序号" type="index" align="center" width="120px"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #="{ row, index }">
                        <el-input v-model="row.valueName" </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作"></el-table-column>
            </el-table>

            <el-button type="primary" @click="save">确定</el-button>
            <el-button type="primary" @click="SwitchCard">取消</el-button>
        </div>
    </el-card>

</template>

<style scoped></style>