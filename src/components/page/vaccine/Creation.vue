<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 疫苗
                </el-breadcrumb-item>
                <el-breadcrumb-item>新建</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="form-box">
            <el-card>
            <el-form ref="form" 
                :model="form" 
                :rules="rules"
                label-width="80px"
            >
                <el-form-item 
                    label="疫苗名称"
                    prop="fixedvaccinesid"
                >
                    <el-select 
                        v-model="form.fixedvaccinesid"
                        placeholder="请选择"
                        clearable
                        filterable
                        @change="changeFixedVacciens"
                    >
                        <el-option
                            v-for="(item,index) in fixedvacciens"
                            :label="item.name"
                            :value="item.id"
                            :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="数量"
                    prop="count"
                    clearable
                >
                    <el-input type="number" v-model="form.count"></el-input>
                </el-form-item>
                <el-form-item 
                    label="有效期"
                    prop="deadline"
                    clearable
                >
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.deadline"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item 
                    label="批号"
                    prop="batchnumber"
                    clearable
                >
                    <el-input v-model="form.batchnumber"></el-input>
                </el-form-item>
                <el-form-item 
                    label="厂家"
                    prop="company"
                    clearable
                >
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item 
                    label="入库时间"
                    prop="setdate"
                    clearable
                >
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.setdate"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item 
                >
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
            </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import { postVaccineData,postMVaccineData,getFixedVaccines } from '../../../api/index';
export default {
    name: 'vaccine-creation',
    data:function(){
        return {
            form:{
                id:'',
                name:'',//疫苗名称
                fixedvaccinesid:'',//对应固定疫苗id 
                company:'',//生产企业
                deadline:'',//有效期
                count:'',//数量
                setdate:'',//入库时间，
                batchnumber:'',//批号
                isexist:true,
                outdate:''
            },
            fixedvacciens:[]
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.postData();
                } else {
                    return false;
                }
            });
        },
        async postData(){
            await postVaccineData(this.form);
            this.$router.push('/vaccine/detail');
        },
        async getSyncFixedVacciens(){
            let {data}  = await getFixedVaccines();
            this.fixedvacciens = data;
        },
        changeFixedVacciens(data){
            this.fixedvacciens.find(item=>{
                if(item.id === data){
                    this.form.name = item.name
                }
            })
        }
    },
    created(){
        this.rules = {
          fixedvaccinesid: { required: true, message: '请选择名称', trigger: 'blur' },
          count:{ required: true, message: '请输入数量', trigger: 'blur' },
          batchnumber:{ required: true, message: '请输入批号', trigger: 'blur' },
          company:{ required: true, message: '请输入公司', trigger: 'blur' },
          deadline:{ required: true, message: '请选择生产日期', trigger: 'blur' },
          setdate:{ required: true, message: '请选择生产日期', trigger: 'blur' },
          company:{ required: true, message: '请输入生产厂家', trigger: 'blur' },
        };
        this.getSyncFixedVacciens();
    },
    watch:{
        '$route':{
            immediate:true,
            handler(value){
                if(value.path === '/vaccine/create'){
                    this.$refs.form && this.$refs.form.resetFields();
                }
            }
        }
    }
};
</script>
<style>
.form-box{
    margin-top:5px
}
</style>