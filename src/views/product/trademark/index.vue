<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { reqTrademarkList } from '@/api/product/trademark'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
const pageSize = ref(3)
const currentPage = ref(1)
const total = ref(0)
const tableData = ref()
const dialogFormVisible = ref(false)
const trademarkParams = reactive({ name: "", imgUrl: "" })
const TrademarkList = async () => {
    const result = await reqTrademarkList("2")
    console.log(result);
    if (result.code == 200) {
        tableData.value = result.data
        total.value = result.data.length
    }
}

const updateTrademark = () => {
    dialogFormVisible.value = true
}
const delTrademark = () => {
    dialogFormVisible.value = true
}
const addTrademark = () => {
    dialogFormVisible.value = true
    trademarkParams.imgUrl = ''
    trademarkParams.name = ''
}
const cancel = () => {
    dialogFormVisible.value = false
}
const confirm = () => {
    dialogFormVisible.value = false
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/npg' || rawFile.type == 'image/gif') {
        return true
    } else {
        ElMessage({
            type: 'error',
            message: '必须上传jepg/npg/gif格式的图片!'
        })
        if (rawFile.size / 1024 / 1024 > 4) {
            ElMessage.error('需要上传小于4M的图片!')
            return false
        }
        return false
    }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    trademarkParams.imgUrl = URL.createObjectURL(uploadFile.raw!)
    console.log(response);
    console.log(uploadFile);

}

onMounted(() => {
    TrademarkList()

})
</script>

<template>
    <el-card style="width: 100%;">
        <el-button type="primary" icon="Plus" @click="addTrademark">添加</el-button>
        <el-table style="width: 100%" border class="table" :data="tableData">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" prop="tmName"></el-table-column>
            <el-table-column label="品牌LOGO">
                <template #default="{ row, column, $index: number }">
                    <img :src="row.logoUrl" alt="未加载" style="width: 50px;height: 50px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <el-button type="primary" icon="Edit" @click="updateTrademark"></el-button>
                <el-button type="primary" icon="Delete" @click="delTrademark"></el-button>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
            :background="true" layout="prev,pager,next,sizes,jumper,->,total " :total="total" />

    </el-card>
    <el-dialog v-model="dialogFormVisible" title="添加品牌" width="500">
        <el-form>
            <el-form-item label="名称"><el-input placeholder="请输入品牌名称"></el-input></el-form-item>
            <el-form-item label="上传">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="trademarkParams.imgUrl" :src="trademarkParams.imgUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm">添加</el-button>

        </template>
    </el-dialog>
</template>

<style scoped>
.table {
    margin: 10px auto
}

.avatar-uploader .el-upload {
    border: 2px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>