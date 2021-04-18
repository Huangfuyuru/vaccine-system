<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 接种人
                </el-breadcrumb-item>
                <el-breadcrumb-item>新建</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input clearable v-model="query.name" placeholder="接种人姓名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="birthday" label="出生日期">
                    <template slot-scope="{row}">
                        {{row.birthday.split('T')[0]}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="家庭地址"></el-table-column>
                <el-table-column prop="familyname" label="家长姓名"></el-table-column>
                <el-table-column prop="tel" label="联系电话"></el-table-column>

                <el-table-column label="接种详情" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="{row}">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageindex"
                    :page-size="query.pagesize"
                    :total="pagetotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
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
                <el-row>
                    <el-col :span="12">
                        <el-form-item 
                            label="性别"
                            prop="gender"
                            clearable
                        >
                            <el-select v-model="form.gender" placeholder="请选择">
                                <el-option key="woman" label="女" value="1"></el-option>
                                <el-option key="man" label="男" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item 
                    label="身份证号"
                    prop="identitycard"
                    clearable
                >
                    <el-input v-model="form.identitycard"></el-input>
                </el-form-item>
                <el-form-item 
                    label="出生日期"
                    prop="birthday"
                    clearable
                >
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.birthday"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item 
                    label="家庭住址"
                    prop="address"
                    clearable
                >
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item 
                    prop="familyname"
                    label="家长姓名"
                    clearable
                >
                    <el-input v-model="form.familyname"></el-input>
                </el-form-item>
                <el-form-item 
                    label="联系电话"
                    prop="tel"
                    clearable
                >
                    <el-input 
                        v-model="form.tel"
                        type="tel">
                    </el-input>
                </el-form-item>
                
                <el-form-item label="备注">
                    <el-input 
                        type="textarea" 
                        rows="5" 
                        v-model="form.desc"
                        placeholder="如过敏史"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getPeopleData,postDeletePeople,postMPeopleData } from '../../../api/index';
import {cloneDeep} from 'lodash'
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                name: '',
                pageindex: 1,
                pagesize: 5
            },
            editVisible: false,
            pagetotal: 0,
            form: {},
            tableData:[],
        };
    },
    methods: {
        async getData() {
            let {data,pagetotal} = await getPeopleData(this.query);
            this.tableData = data;
            this.pagetotal = Number(pagetotal);
        },
        async deleteChildData(id){
            let data = await postDeletePeople(id);
            if(data.code === 0){
                this.getData();
                this.$message.success(`删除成功 `);
            }else{
                this.$message.error(`删除失败 `);
            }
        },
        handleDelete(row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.deleteChildData({id:row.id})
                })
                .catch(() => {});
        },
        handleEdit(row) {
            this.form= cloneDeep(row);
            this.editVisible = true;
        },
        async saveEdit() {
            await postMPeopleData(this.form);
            this.editVisible = false;
            this.getData();
        },
        handlePageChange(val) {
            this.$set(this.query, 'pageindex', val);
            this.getData();
        },
        handleDetail(row){
            this.$router.push(`/inoculation/detail?childsname=${row.id}`)
        },
        cancel(){
            this.editVisible = false;
            this.$refs.form.resetFields();
        }
    },
    watch:{
        '$route':{
            immediate:true,
            handler(value){
                if(value.path === '/people/children'){
                    this.getData();
                }
            }
        }
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
