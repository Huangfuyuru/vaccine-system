<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 用户
                </el-breadcrumb-item>
                <el-breadcrumb-item>新建</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-card>
                <el-form 
                    ref="form" 
                    :model="form" 
                    :rules="rules"
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
                        <el-input v-model="form.account" type="email"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item 
                                label="验证码" 
                                prop="confirmcode"
                                clearable
                            >
                                <el-input type="number" v-model="form.confirmcode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-button 
                                @click="sendCode"
                            >
                                {{codeText}}
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-form-item 
                        label="用户角色"
                        prop="type"
                        clearable
                    >
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option key="one" label="管理员" :value="1"></el-option>
                            <el-option key="two" label="接种员" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item 
                        label="密码" 
                        prop="pass"
                        clearable
                    >
                        <el-input v-model="form.pass"></el-input>
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
                    >
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
import { postRegisterCode } from '../../../api/index';
export default {
    name: 'creation',
    data:function(){
        return {
            form:{
                name:'',
                account:'',//邮箱
                confirmcode:'',//验证码
                pass:'',//密码
                repetition:'',//重复密码
                type:'',//用户角色
                tel:'',//电话
                unit:'',//接种单位
            },
            codeText:'发送验证码',
        }
    },
    methods: {
        async onSubmit() {
            if(!this.formData.name){
                const info = await postRegister({...this.form});
                if(!info.code){
                    this.$message.success('提交成功！');
                    this.$router.push('/user/detail');
                }else{
                    this.$message.success(info.msg);
                }
            }else{

            }
        },
        async sendCode(){
            let info = await postRegisterCode({account:this.form.account});
            if(info.code){
                this.$message.error(info.msg);
                return;
            }
        }
    },
    created(){
        this.rules = {
          name: { required: true, message: '请输入姓名', trigger: 'blur' },
          account: { required: true, message: '请输入邮箱', trigger: 'blur' },
          confirmcode: { required: true, message: '请输入验证码', trigger: 'blur' },
          pass: { required: true, message: '请输入密码', trigger: 'blur' },
          repetition: { required: true, message: '请再次输入密码', trigger: 'blur' },
          type: { required: true, message: '请输入角色', trigger: 'blur' },
          tel: { required: true, message: '请输入电话', trigger: 'blur' },
          unit: { required: true, message: '请输入所属单位', trigger: 'blur' },
        }
    },
};
</script>
<style>
.form-box{
    margin-top:5px;
}
</style>