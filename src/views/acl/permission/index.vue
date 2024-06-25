<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { reqAddOrUpdateMenu, reqGetMenu, reqDelMenu } from '@/api/acl/menu';
import { ElMessage } from 'element-plus';
const MenuData = ref()
const getMenu = async () => {
    const result: any = await reqGetMenu()
    if (result.code == 200) {
        MenuData.value = result.data
    }
}
const isShowDialog = ref(false)
const menuParams = reactive({
    id: '',
    pid: '',
    name: '',
    code: '',
    level: ''
})
const addMenu = (row: any) => {
    Object.assign(menuParams, {
        id: '',
        pid: '',
        name: '',
        code: '',
        level: ''
    })
    isShowDialog.value = true
    menuParams.pid = row.id
    menuParams.level = row.level + 1
}
const editMenu = (row: any) => {
    Object.assign(menuParams, {
        id: '',
        pid: '',
        name: '',
        code: '',
        level: ''
    })
    isShowDialog.value = true
    console.log(row);
    menuParams.id = row.id
    menuParams.pid = row.pid
    menuParams.level = row.level
    menuParams.name = row.name
    menuParams.code = row.code
}
const saveMenu = async () => {
    const result: any = await reqAddOrUpdateMenu(menuParams)
    if (result.code == 200) {
        isShowDialog.value = false
        getMenu()
        ElMessage.success('添加成功')
    } else {
        ElMessage.error("添加失败")
    }
}
const delMenu = async (row: any) => {
    const result: any = await reqDelMenu(row.id)
    if (result.code == 200) {
        getMenu()
        ElMessage.success('删除成功')
    } else {
        ElMessage.error('删除失败')
    }
}
onMounted(() => {
    getMenu()
})
</script>

<template>
    <el-table :data="MenuData" border style="width: 100%" row-key="id">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="code" label="权限值"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column label="操作">
            <template #="{ row, $index }">
                <el-button :disabled="row.level == 4" @click="addMenu(row)">添加菜单</el-button>
                <el-button type="primary" :disabled="row.level == 1" @click="editMenu(row)">编辑</el-button>
                <el-popconfirm title="确定删除吗？" @confirm="delMenu(row)">
                    <template #reference>
                        <el-button type="danger" :disabled="row.level == 1">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="isShowDialog" title="添加菜单">
        <el-form>
            <el-form-item label="名称"><el-input placeholder="请输入菜单名称"
                    v-model="menuParams.name"></el-input></el-form-item>
            <el-form-item label="权限"><el-input placeholder="请输入权限值" v-model="menuParams.code"></el-input></el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="saveMenu">确定</el-button>
            <el-button @click="isShowDialog = false">取消</el-button>
        </template>
    </el-dialog>
</template>

<style scoped></style>
