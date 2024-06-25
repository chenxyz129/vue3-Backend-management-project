<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import { reqGetRoleList, addOrUpdateRole, reqGetAuthority, reqsaveAuthorityList, reqDelRole } from "@/api/acl/role/index"
import { ElMessage } from 'element-plus';
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const roleList = ref()
const roleName = ref('')
const getRoleList = async () => {
    const result: any = await reqGetRoleList(currentPage.value, pageSize.value, roleName.value)
    if (result.code == 200) {
        roleList.value = result.data.records
        total.value = result.data.total
    }

}
const search = () => {
    getRoleList()
}
const rest = () => {
    roleName.value = ''
    currentPage.value = 1
    getRoleList()
}

const RoleData = reactive({
    id: '',
    roleName: ""
})
const checkRoleName = (rule: any, value: any, callback: any) => {
    if (value.trim() !== '' && value.length > 1 && value.length < 18) {
        callback()
    } else {
        callback(new Error('职位名不能为空且需长度在1位-18位'))
    }

}
const addRole = () => {
    Object.assign(RoleData, {
        id: '',
        roleName: ""
    })
    nextTick(() => dialogFormRef.value.resetFields())
    isShowDialog.value = true
}
const editRole = (row: any) => {
    RoleData.id = row.id
    RoleData.roleName = row.roleName
    isShowDialog.value = true
}
const rules = { roleName: [{ validator: checkRoleName, trigger: 'change' }] }
const dialogFormRef = ref()
const isShowDialog = ref(false)
const saveRole = async () => {
    await dialogFormRef.value.validate()
    console.log(111);

    const result: any = await addOrUpdateRole(RoleData.roleName, RoleData.id)
    console.log(result);

    if (result.code == 200) {
        if (RoleData.id) {
            ElMessage.success('更新职位成功')
        } else {
            ElMessage.success('添加职位成功')
        }
        isShowDialog.value = false
        getRoleList()
    } else {
        ElMessage.error('添加职位失败')
    }
}
const delRole = async (row: any) => {
    const result: any = await reqDelRole(row.id)
    if (result.code == 200) {
        ElMessage.success("删除角色成功")
        getRoleList()
    } else {
        ElMessage.error("删除角色失败")
    }
}

const isShowDrawer = ref(false)
const tree = ref()
const currRoleId = ref()
let authorityData = ref()
const checkedIdArr = ref<any>([])
const editAuthority = async (row: any) => {
    currRoleId.value = row.id
    checkedIdArr.value = []
    const result: any = await reqGetAuthority(row.id)
    if (result.code == 200) {
        isShowDrawer.value = true
        authorityData.value = result.data
        checkedIdArr.value = setCheckedIdArr(authorityData.value, [])
    }
}
const saveAuthority = async () => {
    const selectedIdArr = tree.value.getCheckedKeys().concat(tree.value.getHalfCheckedKeys())
    const result: any = await reqsaveAuthorityList(currRoleId.value, selectedIdArr)
    if (result.code == 200) {
        ElMessage.success("保存权限成功")
        isShowDrawer.value = false
    } else {
        ElMessage.error("保存权限失败")
    }
}
const setCheckedIdArr = (arr: any, initArr: any) => {
    arr.forEach((item: any) => {
        if (item.children.length > 0) {
            setCheckedIdArr(item.children, initArr)
        }
        if (item.children.length == 0 && item.select) {
            initArr.push(item.id)
        }
    })
    return initArr
}

onMounted(() => {
    getRoleList()
})
</script>

<template>
    <el-card style="width: 100%;margin-bottom: 10px;height: 75px;">
        <el-form inline class="serchForm">
            <el-form-item label="职位搜索"><el-input placeholder="请输入职位关键字" v-model="roleName"></el-input></el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" :disabled="!(roleName.length > 0)">搜索</el-button>
                <el-button @click="rest">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="width: 100%;">
        <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
        <el-table border style="margin: 10px 0;" :data="roleList">
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column align="center" label="ID" prop="id"></el-table-column>
            <el-table-column align="center" label="职位名称" prop="roleName"></el-table-column>
            <el-table-column align="center" label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="操作" width="270px" prop="id" show-overflow-tooltip>
                <template #="{ row, $index }">
                    <el-button size="small" icon="User" @click="editAuthority(row)">分配权限</el-button>
                    <el-button size="small" icon="Edit" type="primary" @click="editRole(row)">编辑</el-button>

                    <el-popconfirm title="确定删除吗？" @confirm="delRole(row)">
                        <template #reference>
                            <el-button size="small" icon="Delete" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
            background layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="getRoleList()"
            @current-change="getRoleList()" />
    </el-card>
    <el-dialog v-model="isShowDialog">
        <template #header>
            <h5 style="font-size: 20px;">{{ RoleData.id ? '编辑职位' : '添加职位' }}</h5>
        </template>
        <el-form ref="dialogFormRef" :model="RoleData" :rules="rules">
            <el-form-item label="添加职位" prop="roleName">
                <el-input placeholder="请输入职位名称" v-model="RoleData.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="saveRole">确定</el-button>
            <el-button @click="isShowDialog = false">取消</el-button>
        </template>
    </el-dialog>
    <el-drawer v-model="isShowDrawer">
        <template #header>
            <h4>分类菜单与按钮的权限</h4>
        </template>
        <el-tree ref="tree" :data="authorityData" default-expand-all show-checkbox
            :props="{ label: 'name', children: 'children' }" node-key="id" :default-checked-keys="checkedIdArr" />
        <template #footer>
            <el-button type="primary" @click="saveAuthority">确定</el-button>
            <el-button @click="isShowDrawer = false">取消</el-button>
        </template>
    </el-drawer>
</template>

<style scoped>
.serchForm {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>