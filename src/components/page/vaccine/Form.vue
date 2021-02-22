<template>
    <div class="container">
        <div class="form-box">
            <el-form ref="form" 
                :model="form" 
                :rules="rules"
                :disabled="disabled"
                label-width="80px"
            >
                <el-form-item 
                    label="疫苗名称"
                    prop="name"
                    clearable
                    filterable
                >
                    <el-select 
                        v-model="form.name"
                        placeholder="请选择"
                        @change="chooseVaccines"
                    >
                        <el-option
                            v-for="(item,index) in fixedvacciens"
                            :label="item.name"
                            :value="item"
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
                    prop="batchNumber"
                    clearable
                >
                    <el-input v-model="form.batchNumber"></el-input>
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
                    v-if="!formData.name.length"
                >
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {clone} from 'lodash'
import { postVaccineData,getFixedVaccines } from '../../../api/index';
export default {
    name: 'form',
    props:{
        formData:{
            type:Object,
            default:()=>({
                name:'',//疫苗名称
                fixedvaccines:'',//对应固定疫苗id 
                company:'',//生产企业
                deadline:'',//有效期
                count:'',//数量
                setdate:'',//入库时间，
                batchNumber:'',//批号
                isExist:true,
                outdate:''
            })
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            number:0,
            form:clone(this.formData),
            fixedvacciens:[]
        };
    },
    methods: {
        onSubmit() {
            console.log(this.form)
            // if(!this.disabled){
            //     postVaccineData(this.form).then(res => {
            //         this.$message.success('提交成功！');
            //     });
            // }
        },
        addCount(val){
            if(val < 6){
                this.form.times = [];
                for(let i=0;i<val;i++){
                    this.form.times.push({
                        value:''
                    })
                }
            }
        },
        async getSyncFixedVacciens(){
            // let { data } = await getFixedVaccines();
            // this.fixedvacciens = data;
            this.fixedvacciens = [
                {
                    id:'1',
                    name:'卡介苗',
                    count:3,
                    type:1,
                    setdate:'2020-20'
                }
            ]
        },
        chooseVaccines(val){
            const {id,name} = val;
            this.form.name = name;
            this.form.fixedvaccinesid = id;
        }
    },
    created(){
        this.rules = {
          name: { required: true, message: '请输入姓名', trigger: 'blur' },
          count:{ required: true, message: '请输入数量', trigger: 'blur' },
          batchNumber:{ required: true, message: '请输入批号', trigger: 'blur' },
          company:{ required: true, message: '请输入公司', trigger: 'blur' },
          deadline:{ required: true, message: '请选择生产日期', trigger: 'blur' },
          setdate:{ required: true, message: '请选择生产日期', trigger: 'blur' },
          company:{ required: true, message: '请输入生产厂家', trigger: 'blur' },
        };
        this.getSyncFixedVacciens();
    },
};
</script>