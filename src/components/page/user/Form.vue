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
                    label="姓名" 
                    prop="name"
                    clearable
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item 
                    label="邮箱号码" 
                    prop="account"
                    clearable
                >
                    <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item 
                            label="验证码" 
                            prop="verificationCode"
                            clearable
                        >
                            <el-input type="number" v-model="form.verificationCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-button 
                            :disabled="isSendCode"
                            @click="sendCode"
                        >
                            {{codeText}}
                        </el-button>
                    </el-col>
                </el-row>
                <el-form-item 
                    label="用户角色"
                    prop="role"
                    clearable
                >
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option key="one" label="管理员" :value="1"></el-option>
                        <el-option key="two" label="接种员" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="密码" 
                    prop="password"
                    clearable
                >
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item 
                    label="重复密码" 
                    prop="repetition"
                    clearable
                >
                    <el-input v-model="form.repetition"></el-input>
                </el-form-item>
                
                <el-form-item 
                    label="联系电话" 
                    prop="tel"
                    clearable
                >
                    <el-input type="number" v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item 
                    label="所属单位" 
                    prop="unit"
                    clearable
                >
                    <el-input v-model="form.unit"></el-input>
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
import { clone } from 'lodash'
export default {
    name: 'form',
    props:{
        formData:{
            type:Object,
            default:()=>({
                name:'',
                account:'',//邮箱
                verificationCode:'',//验证码
                password:'',//密码
                repetition:'',//重复密码
                role:'',//用户角色
                tel:'',//电话
                unit:'',//接种单位
            })
        },
        disabled:{
            type:Boolean,
            default:false,
           
        }
    },
    data() {
        return {
            isSendCode:false,
            form:clone(this.formData),
            codeText:'发送验证码'
        };
    },
    methods: {
        onSubmit() {
            if(!this.disabled){
                this.$message.success('提交成功！');
            }
        },
        sendCode(){
            let num = 6;
            this.isSendCode = true;
            let t = setInterval(()=>{
                if(num === 1){
                    this.codeText = "重新发送";
                    this.isSendCode = false;
                    clearInterval(t);
                }else{
                    this.codeText = num+'0秒';
                    num--;
                }
                
            },1000)
        }
    },
    created(){
        this.rules = {
          name: { required: true, message: '请输入姓名', trigger: 'blur' },
          account: { required: true, message: '请输入邮箱', trigger: 'blur' },
          verificationCode: { required: true, message: '请输入验证码', trigger: 'blur' },
          password: { required: true, message: '请输入密码', trigger: 'blur' },
          repetition: { required: true, message: '请再次输入密码', trigger: 'blur' },
          role: { required: true, message: '请输入角色', trigger: 'blur' },
          tel: { required: true, message: '请输入电话', trigger: 'blur' },
          unit: { required: true, message: '请输入所属单位', trigger: 'blur' },
        }
    },
};
</script>