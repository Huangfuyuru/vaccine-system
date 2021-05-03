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
                <el-table-column prop="childsname" label="接种人"></el-table-column>
                <el-table-column prop="vaccinesname" label="接种疫苗"></el-table-column>
                <el-table-column prop="ordinal" label="针剂数"></el-table-column>
                <el-table-column prop="inoculatedate" label="接种日期">
                    <template slot-scope="{row}">
                        {{row.inoculatedate && row.inoculatedate.split('T')[0]}}
                    </template>
                </el-table-column>
                <el-table-column prop="reaction" label="反应"></el-table-column>
                <el-table-column label="疫苗详情">
                    <template slot-scope="{row}">
                        <el-button type="text" @click="handleVaccinesDetail(row.vaccinesid)">详情</el-button>
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
            <el-dialog title="疫苗详情" :visible.sync="vaccinesShow" width="50%">
                <el-card>
                    <div>名称:{{vaccinesDetail.name || '-'}}</div>
                    <div>数量:{{vaccinesDetail.count || '-'}}</div>
                    <div>批号:{{vaccinesDetail.batchnumber || '-'}}</div>
                    <div>厂家:{{vaccinesDetail.company || '-'}}</div>
                    <div>有效期:{{vaccinesDetail.deadline|| '-'}}</div>
                </el-card> 
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getInoculationData ,getVaccinesDetail} from '../../../api/index';
export default {
    name: 'inoculation-table',
    data() {
        return {
            query: {
                childsname: '',
                pageindex: 1,
                pagesize: 5
            },
            editVisible: false,
            pagetotal: 0,
            form: {},
            tableData:[],
            vaccinesShow:false,
            vaccinesDetail:{}
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
        },
        async handleVaccinesDetail(id){
            this.vaccinesShow = true;
            const {data} = await getVaccinesDetail({id});
            this.vaccinesDetail = data;
            console.log(id)
        }
    },
    watch:{
        '$route':{
            immediate:true,
            handler(value){
                if(value.path === '/inoculation/detail'){
                    this.query.childsname=value.query.childsname || '';
                    console.log(this.query)
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
