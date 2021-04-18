<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 接种信息
                </el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.childsname" placeholder="接种人姓名" class="handle-input mr10"></el-input>
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
                <el-table-column prop="childsname" label="接种人"></el-table-column>
                <el-table-column prop="vaccinesname" label="接种疫苗"></el-table-column>
                <el-table-column prop="ordinal" label="针剂数"></el-table-column>
                <el-table-column prop="inoculatedate" label="接种日期"></el-table-column>
                <el-table-column prop="reaction" label="反应"></el-table-column>
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
    </div>
</template>

<script>
import { getInoculationData } from '../../../api/index';
export default {
    name: 'inoculation-table',
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
            let {data,pagetotal} = await getInoculationData(this.query);
            this.tableData = data;
            this.pagetotal = Number(pagetotal);
        },
        handlePageChange(val) {
            this.$set(this.query, 'pageindex', val);
            this.getData();
        }
    },
    watch:{
        '$route':{
            immediate:true,
            handler(value){
                if(value.path === '/inoculation/detail'){
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
