<script setup lang="ts">

</script>

<template>
    <el-card style="width: 100%;">
        <el-form label-width="100px">
            <el-form-item label='SKU名称'>
                <el-input placeholder="SKU名称"></el-input>
            </el-form-item>
            <el-form-item label='价格(元)'>
                <el-input placeholder="价格(元)"></el-input>
            </el-form-item>
            <el-form-item label='重量(g)'>
                <el-input placeholder="重量(g)"></el-input>
            </el-form-item>
            <el-form-item label='SKU描述'>
                <el-input placeholder="SKU描述"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form inline>
                    <el-form-item label="颜色" >
                        <el-select><el-option></el-option></el-select>
                    </el-form-item>
                    <el-form-item label="品牌">
                        <el-select><el-option></el-option></el-select>
                    </el-form-item>
                    <el-form-item label="内存">
                        <el-select><el-option></el-option></el-select>
                    </el-form-item>
                    <el-form-item label="去">
                        <el-select><el-option></el-option></el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form  inline>
                    <el-form-item label="颜色">
                        <el-select><el-option></el-option></el-select>
                    </el-form-item>
                    <el-form-item label="版本">
                        <el-select><el-option></el-option></el-select>
                    </el-form-item>
                    <el-form-item label="尺码">
                        <el-select><el-option></el-option></el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item>
                <el-table border style="margin-bottom:10px">
                    <el-table-column type="selection" width="50px" align="center"></el-table-column>
                    <el-table-column label="图片"></el-table-column>
                    <el-table-column label="名称"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                </el-table>
                <el-button type="primary">保存</el-button>
                <el-button type="primary">取消</el-button>
            </el-form-item>
            
        </el-form>
    </el-card>
</template>

<style scoped lang="scss">
.el-select{
    width: 200px;
}
</style>