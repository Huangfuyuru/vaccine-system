<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>新建</el-breadcrumb-item>
            </el-breadcrumb>
            <common-form></common-form>
        </div>
    </div>
</template>

<script>
import CommonForm from "./Form"
export default {
    name: 'creation',
    components:{
        CommonForm
    },
};
</script>