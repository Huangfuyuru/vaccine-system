<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户详情
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input clearable v-model="query.name" placeholder="名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="account" label="邮箱号"></el-table-column>
                <el-table-column prop="password" label="密码"></el-table-column>
                <el-table-column prop="role" label="用户角色"></el-table-column>
                <el-table-column prop="tel" label="联系电话"></el-table-column>
                <el-table-column prop="unit" label="所属单位"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
            <el-form 
                ref="form" 
                :model="form" 
                label-width="80px"
            >
                <el-form-item 
                    label="姓名" 
                    prop="name"
                    clearable
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item 
                    label="邮箱号码" 
                    prop="account"
                    clearable
                >
                    <el-input v-model="form.account" type="email" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item 
                    label="用户角色"
                    prop="type"
                    clearable
                >
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option key="one" label="管理员" :value="1"></el-option>
                        <el-option key="two" label="接种员" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="密码" 
                    prop="pass"
                    clearable
                >
                    <el-input v-model="form.pass"></el-input>
                </el-form-item>
                <el-form-item 
                    label="重复密码" 
                    prop="repetition"
                    clearable
                >
                    <el-input v-model="form.repetition"></el-input>
                </el-form-item>
                
                <el-form-item 
                    label="联系电话" 
                    prop="tel"
                    clearable
                >
                    <el-input type="number" v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item 
                    label="所属单位" 
                    prop="unit"
                    clearable
                >
                    <el-input v-model="form.unit"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancleEdit">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getUserData,postDUser,postMUser } from '../../../api/index';
import {cloneDeep} from 'lodash'
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            getUserData(this.query).then(res => {
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        handleDelete(index, row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(async () => {
                    const info = await postDUser({id:row.id});
                    this.$message.success(info.msg);
                    this.getData(this.query);
                })
                .catch(() => {});
        },
        handleEdit(index, row) {
            this.form = cloneDeep(row);
            this.editVisible = true;
        },
        saveEdit() {
            this.onSubmit();
            this.editVisible = false;
        },
        cancleEdit(){
            this.$refs.form.resetFields();
            this.editVisible = false;
        },
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        async onSubmit() {
            const info = await postMUser(this.form);
            if(!info.code){
                this.$message.success(info.msg);
                this.getData();
            }else{
                this.$message.success(info.msg);
            }
        },
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
