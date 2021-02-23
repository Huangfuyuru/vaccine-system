<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:670px;">
                    <div class="user-info">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{userData.name}}</div>
                            <div>职位:{{userData.type?'管理员':'接种员'}}</div>
                            <div>账号:{{userData.account}}</div>
                            <div>所属单位:{{userData.unit}}</div>
                            <div>联系电话:{{userData.tel}}</div>
                            <div>账号:{{userData.account}}</div>
                        </div>
                        
                    </div>
                    <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>接种详情</span>
                    </div>
                    甲肝疫苗
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>
                    乙肝疫苗
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                    卡介苗
                    <el-progress :percentage="13.7"></el-progress>
                    脊髓灰质炎三价混合疫苗
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{count.childs}}</div>
                                    <div>接种人数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-favor grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{count.vaccines}}</div>
                                    <div>接种疫苗数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-profile grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{count.users}}</div>
                                    <div>接种员数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card class="greetCard" shadow="hover" style="height:550px;">
                    <div class="greet">儿童疫苗接种管理系统</div>
                </el-card>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import {getCount} from '../../api/index'
export default {
    name: 'dashboard',
    data() {
        return {
            userData:null,
            count:{
                childs:100,
                vaccines:200,
                users:300
            },
        };
    },
    components: {
        Schart
    },
    created(){
        let data = localStorage.getItem('ms_users') || {};
        this.userData = JSON.parse(data);
        this.getCount();
    },
    methods: {
        async getCount(){
            let {data} = await getCount();
            this.count = data;
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-cont div {
    margin: 20px 0;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}

.greet {
    position: absolute;
    right: 30px;
    top: 150px;
    font-size: 45px;
}
.greetCard {
    background-image: url('../../assets/img/ox.jpg');
    background-repeat: no-repeat;
    position: relative;
}
</style>
