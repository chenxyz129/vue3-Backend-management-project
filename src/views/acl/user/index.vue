<script setup lang="ts">
import { reqGetUserList, reqAddOrUpdateUser, reqGetRoleInfoByUserId, reqSaveRoleOfUser, reqDelUser, reqbatchDelUser } from "@/api/acl/user/index"
import { ElMessage } from "element-plus";
import { computed, nextTick, onMounted, reactive, ref } from "vue";
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref()
const UserListData = ref()
const isShowAddUser = ref(false)
const isSowEditRole = ref(false)
const formRef = ref()
const userData = reactive({
    id: '',
    name: '',
    username: '',
    password: ''
})
const rules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 18, message: '用户名长度需在5-18位', trigger: 'blur' }],
    name: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        { min: 5, max: 18, message: '用户昵称长度需在5-18位', trigger: 'blur' }],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 18, message: '密码长度需在8-18位', trigger: 'blur' }],
})
const addUser = () => {
    isShowAddUser.value = true
    nextTick(() => {
        formRef.value.clearValidate("name")
        formRef.value.clearValidate("username")
        formRef.value.clearValidate("password")
    })
    Object.assign(userData, {
        id: '',
        name: '',
        username: '',
        password: ''
    })


}
const editUser = (row: any) => {
    isShowAddUser.value = true
    nextTick(() => {
        formRef.value.clearValidate("name")
        formRef.value.clearValidate("username")
        formRef.value.clearValidate("password")
    })
    Object.assign(userData, {
        id: '',
        name: '',
        username: '',
        password: ''
    })
    let id = row.id
    userData.id = row.id
    userData.name = row.name
    userData.username = row.username

}
const isCheckAll = computed(() => assignRole.value.length == allRolesList.value.length)
const allRolesList = ref([{
    "id": 1,
    "createTime": "2021-05-31 18:09:18",
    "updateTime": "2023-04-28 11:03:38",
    "roleName": "超级管理员",
    "remark": null
}])
const userId = ref()
const assignRole = ref<any>([])
const isIndeterminate = computed(() => assignRole.value.length > 0 && assignRole.value.length < allRolesList.value.length)
const editRole = async (row: any) => {
    // isIndeterminate.value=false
    const result: any = await reqGetRoleInfoByUserId(row.id)
    userId.value = row.id
    console.log(result);
    allRolesList.value = result.data.allRolesList
    assignRole.value = result.data.assignRoles.map((item: any) => item.id)
    isSowEditRole.value = true
    Object.assign(userData, {
        id: '',
        name: '',
        username: '',
        password: ''
    })
    userData.username = row.username
}
const handleCheckAllChange = (isCheckAll: boolean) => {
    assignRole.value = isCheckAll ? allRolesList.value.map((item: any) => item.id) : []
}

const saveRole = async () => {
    const result: any = await reqSaveRoleOfUser({
        userId: userId.value,
        roleIdList: assignRole.value
    })
    if (result.code == 200) {
        GetUserList()
        isSowEditRole.value = false
        ElMessage.success('保存成功')
    } else {
        ElMessage.error('保存失败')
    }
    console.log(result);

}
const saveUser = async () => {
    await formRef.value.validate()
    const result: any = await reqAddOrUpdateUser(userData)
    if (result.code == 200) {
        GetUserList()
        isShowAddUser.value = false
        userData.id ? ElMessage.success('更新成功') : ElMessage.success('添加成功')
    } else {
        userData.id ? ElMessage.success('更新失败') : ElMessage.success('添加失败')
    }

}
const delUser = async (row: any) => {
    const result: any = await reqDelUser(row.id)
    console.log(result);

    if (result.code == 200) {
        GetUserList()
        ElMessage.success('删除成功')
    } else {
        ElMessage.error('删除失败')
    }
}
const selectionChange = (CheckedIdArr: any) => {
    selectedIdArr.value = CheckedIdArr.map((item: any) => item.id)

}
const selectedIdArr = ref([])
const batchDelUser = async () => {
    const result: any = await reqbatchDelUser({
        data: selectedIdArr.value
    })
    if (result.code == 200) {
        GetUserList()
        ElMessage.success('批量删除成功')
    } else {
        ElMessage.error('批量删除失败')
    }
}
const username = ref('')
const search = async () => {
    const result: any = await GetUserList()
    if (result.code == 200) {
        ElMessage.success('搜索成功')
    } else {
        ElMessage.error('搜索失败')
    }
}
const rest = () => {
    username.value = ''
    GetUserList()
}
const GetUserList = async () => {
    const result: any = await reqGetUserList(currentPage.value, pageSize.value, username.value)
    UserListData.value = result.data.records
    total.value = result.data.total
    currentPage.value = result.data.current
    pageSize.value = result.data.size
    if (result.code != 200) {
        ElMessage.error('获取用户数据失败！')
    }
}
onMounted(() => {
    GetUserList()
})
</script>

<template>
    <el-card style="height: 75px;">
        <el-form inline class="serchForm">
            <el-form-item label="用户名：">
                <el-input v-model="username" placeholder="请输入用户名关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button @click="rest">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin-top: 15px;">
        <el-button type="primary" @click="addUser">添加用户</el-button>
        <el-button type="danger" @click="batchDelUser" :disabled="!(selectedIdArr.length > 0)">批量删除</el-button>
        <el-table border style="margin: 15px 0;" :data="UserListData" @selection-change="selectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column align="center" type="index" label="#"></el-table-column>
            <el-table-column align="center" label="id" prop="id"></el-table-column>
            <el-table-column align="center" label="账号名称" prop="username"></el-table-column>
            <el-table-column align="center" label="用户昵称" prop="name"></el-table-column>
            <el-table-column align="center" label="用户角色" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="操作" width="300px">
                <template #="{ row, $index }">
                    <el-button size="small" icon="User" @click="editRole(row)">分配角色</el-button>
                    <el-button size="small" icon="Edit" type="primary" @click="editUser(row)">编辑</el-button>
                    <el-popconfirm title="是否确认删除" @confirm="delUser(row)">
                        <template #reference>
                            <el-button size="small" icon="Delete" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
            background layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="GetUserList"
            @current-change="GetUserList" />
    </el-card>
    <el-drawer v-model="isShowAddUser">
        <template #header>
            <h4>{{ userData.id ? '编辑用户' : '添加用户' }}</h4>
        </template>
        <template #default>
            <el-form :model="userData" :rules="rules" ref="formRef">
                <el-form-item label="账号名称" prop="username"><el-input placeholder="请输入账号名称"
                        v-model="userData.username"></el-input></el-form-item>
                <el-form-item label="用户昵称" prop="name"><el-input placeholder="请输入用户昵称"
                        v-model="userData.name"></el-input></el-form-item>
                <el-form-item label="用户密码" prop="password" v-if="!userData.id"><el-input placeholder="请输入用户密码"
                        v-model="userData.password"></el-input></el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button type="primary" @click="saveUser">确定</el-button>
            <el-button> 取消</el-button>
        </template>
    </el-drawer>

    <el-drawer v-model="isSowEditRole">
        <template #header>
            <h4>分配角色</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户姓名">
                    <el-input disabled v-model="userData.username"></el-input>
                </el-form-item>
                <el-form-item label="职位列表">
                    <el-checkbox v-model="isCheckAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                        Check all
                    </el-checkbox>
                    <el-checkbox-group v-model="assignRole">
                        <el-checkbox v-for="item in allRolesList" :key="item.id" :label="item.roleName"
                            :value="item.id">
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button type="primary" @click="saveRole">确定</el-button>
            <el-button @click="isSowEditRole = false">取消</el-button>
        </template>
    </el-drawer>
</template>

<style scoped>
.el-card {
    width: 100%;

    .serchForm {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>