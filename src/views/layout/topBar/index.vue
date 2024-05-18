<script setup lang="ts">

</script>

<template>
    <div class="topbar">
        <div class="left">
            <el-icon><el-icon>
                    <Connection />
                </el-icon></el-icon>
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right">
            <el-button circle>
                <el-icon size="small">
                    <Refresh />
                </el-icon>
            </el-button>
            <el-button circle>
                <el-icon size="small">
                    <FullScreen />
                </el-icon>
            </el-button>
            <el-button circle>
                <el-icon size="small">
                    <Setting />
                </el-icon>
            </el-button>
            <img src="@/../public/logo.png" style="width: 32px; margin:0 5px">
            <el-dropdown>
                <span class="el-dropdown-link">
                    Admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu style="width: 150px">
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<style scoped lang="scss">
.topbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 25px;

    .left {
        display: flex;
        align-items: center;

        .el-breadcrumb {
            display: flex;
            align-items: center;
        }
    }

    .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    } 
}
</style>