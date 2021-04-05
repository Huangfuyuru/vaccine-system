<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 接种详情
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="疫苗名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="count" label="数量"></el-table-column>
                <el-table-column prop="deadline" label="有效期"></el-table-column>
                <el-table-column prop="batchnumber" label="批次"></el-table-column>
                <el-table-column prop="company" label="生产厂家"></el-table-column>
                <el-table-column prop="setdate" label="入库时间">
                    <template slot-scope="{row}">
                        {{row.setdate.split('T')[0]}}
                    </template>
                </el-table-column>
                <el-table-column prop="outdate" label="出库时间">
                    <template slot-scope="{row}">
                        {{row.outdate ? row.outdate.split('T')[0] : '---'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="{row}">
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="[row.isexist?'highlight-ok':'highlight-no']"
                            :disabled="!row.isexist"
                            @click="handleEdit(row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="[row.isexist?'highlight-ok':'highlight-no']"
                            :disabled="!row.isexist"
                            @click="handleDelete(row)"
                        >下架</el-button>
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
        <el-dialog title="详情" :visible.sync="editVisible" width="50%">
            
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
import { getVaccineData,postDeleteVaccine,postMVaccineData } from '../../../api/index';
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
                pagesize: 10
            },
            tableData: [],
            editVisible: false,
            pagetotal: 0,
            form: {},
            formData:{},
            idx: -1,
            id: -1,
        };
    },
    methods: {
        async getData() {
            let {data,pagetotal} = await getVaccineData(this.query);
            this.tableData = data;
            this.pagetotal = Number(pagetotal);
        },
        async deleteVaccinesData(d){
            let data = await postDeleteVaccine(d);
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
            this.$confirm('确定要下架吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.deleteVaccinesData({id:row.id,outdate:new Date()})
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
            
            
        }
    },
    watch:{
        '$route':{
            immediate:true,
            handler(value){
                if(value.path === '/vaccine/detail'){
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
.highlight-ok {
    color: #ff0000;
}
.highlight-no{
    color:black
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
