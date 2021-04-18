<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 接种信息
                </el-breadcrumb-item>
                <el-breadcrumb-item>新建</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>
            <el-steps :active="active" finish-status="success">
                <el-step title="选择接种人"></el-step>
                <el-step title="选择接种疫苗"></el-step>
                <el-step title="记录接种信息"></el-step>
            </el-steps>
            <el-button style="margin-top:12px" @click="next">下一步</el-button>
            <div class="content-container">
                <div v-if="active === 0">
                    <el-input 
                        v-model="identitycard" 
                        placeholder="请输入身份证号"
                        class="search-input"
                    >
                        <el-button slot="append" icon="el-icon-search" @click="searchPeople"></el-button>
                    </el-input>
                    <div class="people-detail">
                        <div>姓名:{{peopleDetail.name || '-'}}</div>
                        <div>身份证号:{{peopleDetail.identitycard || '-'}}</div>
                        <div>出生日期:{{peopleDetail.birthday || '-'}}</div>
                        <div>家庭住址:{{peopleDetail.address || '-'}}</div>
                        <div>家长姓名:{{peopleDetail.familyname|| '-'}}</div>
                        <div>联系电话:{{peopleDetail.tel || '-'}}</div>
                        <div>备注:{{peopleDetail.comment || '-'}}</div>
                        <div>创建时间:{{peopleDetail.setdate|| '-'}}</div>
                    </div>
                </div>
                <div v-else-if="active === 1">
                    <el-select 
                        v-model="fixedvaccinesid"
                        placeholder="请选择"
                        clearable
                        filterable
                        @change="changeFixedVacciens"
                    >
                        <el-option
                            v-for="(item,index) in fixedvacciens || []"
                            :label="item.name"
                            :value="item.id"
                            :key="index"
                        ></el-option>
                    </el-select>
                    <div class="people-detail">
                        <div
                            v-for="(item,index) in vaccinesArr || []"
                        >
                            <el-radio
                                v-model="vaccinesid"
                                :label="item.id"
                                :key="item.id"
                                @change="changeVaccindesId(item)"
                            >
                                批号{{item.batchnumber || '-'}}
                                有效期{{item.deadline || '-'}}
                                数量{{item.count || '-'}}
                            </el-radio>
                        </div>
                        
                    </div>
                </div>
                <div 
                    class="people-detail"
                    v-else="active === 2"
                >
                    <div>
                        <span class="detail">接种时间:</span> 
                        <el-date-picker
                            v-model="inoculatedate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div>
                        <span class="detail">针剂数:</span>
                        <el-input 
                            v-model="ordinal" 
                            placeholder="请输入"
                            type="number"
                            class="search-input"
                        >
                        </el-input>
                    </div>
                    <div>
                        <span class="detail">接种反应:</span>
                        <el-input 
                            v-model="reactionInoculation" 
                            placeholder="请输入"
                            class="search-input"
                            type="textarea"
                        >
                        </el-input>
                    </div>
                    <div>
                        <el-button @click="submit">提交</el-button>
                    </div>
                </div>
            </div>
            
        </el-card>
    </div>
</template>

<script>
import { getPeopleData,getFixedVaccines,getVaccineData,postInoculationData } from '../../../api/index';
export default {
    name: 'inoculation-creation',
    data:function(){
        return {
            active:0,
            identitycard:'',
            peopleDetail:{},
            fixedvacciens:[],
            fixedvaccinesid:'',
            fixedvacciensDetail:{},
            vaccinesArr:[],
            vaccinesid:'',
            vaccinesname:'',
            inoculatedate:'',
            ordinal:0,
            reactionInoculation:''
        }
    },
    created(){
        this.getSyncFixedVacciens();
    },
    methods:{
        next(){
           if(this.active++>2) this.active=0;
        },
        async searchPeople(){
            const {code,data} = await getPeopleData({identitycard:this.identitycard});
            if(code === 0){
                this.peopleDetail = data;
            }else{
                this.$message.error("不存在该接种人，需要建档");
            }
        },
        async getSyncFixedVacciens(){
            let {data}  = await getFixedVaccines();
            this.fixedvacciens = data;
        },
        async changeFixedVacciens(){
            this.fixedvacciensDetail=this.fixedvacciens.find(item=>item.id === this.fixedvaccinesid);
            const {data} = await getVaccineData({fixedvaccinesid:this.fixedvaccinesid});
            this.vaccinesArr = (data || []).filter(item=>item.isexist === true && item.count>0 );
        },
        changeVaccindesId(item){
            this.vaccinesname = item.name;
        },
        async submit(){
            const params = {
                childsid:this.peopleDetail.id,
                childsname:this.peopleDetail.name,
                vaccinesname:this.vaccinesname,
                vaccinesid:this.vaccinesid,
                ordinal:this.ordinal,
                inoculatedate:this.inoculatedate,
                reaction:this.reactionInoculation
            }
            await postInoculationData(params);
            Object.assign(this,{
            active:0,
            identitycard:'',
            peopleDetail:{},
            fixedvacciens:[],
            fixedvaccinesid:'',
            fixedvacciensDetail:{},
            vaccinesArr:[],
            vaccinesid:'',
            vaccinesname:'',
            inoculatedate:'',
            ordinal:0,
            reactionInoculation:''})
            this.$router.push('/inoculation/detail');
        }
    }
};
</script>
<style>
.content-container {
    margin-top: 20px;
}
.search-input {
    width: 230px;
}
.people-detail {
    margin-top: 20px;
}
.people-detail div {
    margin: 5px 0 5px 0;
}
.detail {
    width: 80px;
    display: inline-block;
}
</style>