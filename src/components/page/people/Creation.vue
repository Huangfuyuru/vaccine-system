<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 接种人
                </el-breadcrumb-item>
                <el-breadcrumb-item>新建</el-breadcrumb-item>
            </el-breadcrumb>
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
                <el-row>
                    <el-col :span="12">
                        <el-form-item 
                            label="性别"
                            prop="gender"
                            clearable
                        >
                            <el-select v-model="form.gender" placeholder="请选择">
                                <el-option key="woman" label="女" value="1"></el-option>
                                <el-option key="man" label="男" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item 
                    label="身份证号"
                    prop="identitycard"
                    clearable
                >
                    <el-input v-model="form.identitycard"></el-input>
                </el-form-item>
                <el-form-item 
                    label="出生日期"
                    prop="birthday"
                    clearable
                >
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.birthday"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item 
                    label="家庭住址"
                    prop="address"
                    clearable
                >
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item 
                    prop="familyname"
                    label="家长姓名"
                    clearable
                >
                    <el-input v-model="form.familyname"></el-input>
                </el-form-item>
                <el-form-item 
                    label="联系电话"
                    prop="tel"
                    clearable
                >
                    <el-input 
                        v-model="form.tel"
                        type="tel">
                    </el-input>
                </el-form-item>
                
                <el-form-item label="备注">
                    <el-input 
                        type="textarea" 
                        rows="5" 
                        v-model="form.desc"
                        placeholder="如过敏史"
                    ></el-input>
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
import { postPeopleData,postMPeopleData } from '../../../api/index';
export default {
    name: 'people-creation',
    data:function(){
        return {
            form:{
                id:'',
                name: '',
                birthday:'',
                identitycard:'',
                address:'',
                gender:'',
                familyname:'',
                tel:'',
                comment:'',//备注，如过敏史
            }
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
            await postPeopleData(this.form);
            //this.$ref.form.resetFields();
            this.$router.push('/people/children');
        }
    },
    created(){
        this.rules = {
          name: { required: true, message: '请输入姓名', trigger: 'blur' },
          birthday: { required: true, message: '请输入出生日期', trigger: 'blur' },
          identitycard: { required: true, message: '请输入身份证号', trigger: 'blur' },
          address: { required: true, message: '请输入家庭住址', trigger: 'blur' },
          gender: { required: true, message: '请输入性别', trigger: 'blur' },
          tel: { required: true, message: '请输入联系电话', trigger: 'blur' },
          familyname: { required: true, message: '请输入家长姓名', trigger: 'blur' },
        }
    },
    watch:{
        '$route':{
            immediate:true,
            handler(value){
                if(value.path === '/people/create'){
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
