<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 儿童详情
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="接种人姓名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
            <common-form
                ref="form"
                :form-data="formData"
            ></common-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getPeopleData,postDeletePeople } from '../../../api/index';
import CommonForm from './Form'
export default {
    name: 'basetable',
    components:{
        CommonForm
    },
    data() {
        return {
            query: {
                name: '',
                pageindex: 1,
                pagesize: 5
            },
            tableData: [],
            editVisible: false,
            pagetotal: 0,
            form: {},
            formData:{},
            idx: -1,
            id: -1
        };
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        async getData() {
            let {data,pagetotal} = await getPeopleData(this.query);
            this.tableData = data;
            this.pagetotal = Number(pagetotal);
        },
        async deleteChildData(id){
            let data = await postDeletePeople(id);
            console.log(data.code)
            if(data.code === 0){
                this.getData();
                this.$message.success(`删除成功 `);
            }else{
                this.$message.error(`删除失败 `);
            }
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageindex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.deleteChildData({id:row.id})
                })
                .catch(() => {});
        },
        // 编辑操作
        handleEdit(row) {
            this.formData = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.$refs.form.onSubmit();
            this.editVisible = false;
            this.$message.success(`修改成功`);
            this.getData();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageindex', val);
            this.getData();
        },
        handleDetail(row){
            this.$router.push(`/inoculation/detail?peopleid=${row.id}`)
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
