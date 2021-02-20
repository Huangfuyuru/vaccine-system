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
                    label="名称" 
                    prop="name"
                    clearable
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                
                
                <el-form-item 
                    label="疫苗类型"
                    prop="type"
                    clearable
                >
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option key="one" label="一类疫苗" :value="1"></el-option>
                        <el-option key="two" label="二类疫苗" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="剂数" 
                    prop="count"
                    clearable
                >
                    <el-input type="number" v-model="form.count" @change="addCount"></el-input>
                </el-form-item>
                <div
                    v-for="(item,index) in form.times"
                >
                    <el-form-item 
                        :label="`第${index+1}次`"
                        clearable
                    >
                        <el-select v-model="item.value" placeholder="请选择">
                            <el-option
                                v-for="item in time"
                                :label="item.name"
                                :key="item.key"
                                :value="item.key"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item 
                    label="批号"
                    prop="batchNumber"
                    clearable
                >
                    <el-input v-model="form.batchNumber"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input 
                        type="textarea" 
                        rows="5" 
                        v-model="form.intro"
                        placeholder="如接种日期"
                    ></el-input>
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
import {time} from '../../common/time'
import {clone} from 'lodash'
export default {
    name: 'form',
    props:{
        formData:{
            type:Object,
            default:()=>({
                name:'',//疫苗名称
                type:'',//类型
                count:'',//接种次数
                times:[],
                batchNumber:'',//批号
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
            form:clone(this.formData)
        };
    },
    methods: {
        onSubmit() {
            if(!this.disabled){
                console.log(this.form)
                this.$message.success('提交成功！');
            }
        },
        addCount(val){
            if(val < 6){
                this.form.times = [];
                for(let i=0;i<val;i++){
                    this.form.times.push({
                        key:0,
                        value:''
                    })
                }
            }
        }
    },
    created(){
        this.rules = {
          name: { required: true, message: '请输入姓名', trigger: 'blur' },
          count:[
              { required: true, message: '请输入1-5', trigger: 'blur' },
              { required: true, message: '请输入1-5', trigger: 'change' },
          ],
          batchNumber:{ required: true, message: '请输入批号', trigger: 'blur' },
          type:{ required: true, message: '请选择类型', trigger: 'blur' },
        },
        this.time = time;
    },
};
</script>