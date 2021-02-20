<template>
    <div class="container">
        <div class="form-box">
            <el-form ref="form" 
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
                                <el-option key="woman" label="女" :value="1"></el-option>
                                <el-option key="man" label="男" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item 
                    label="身份证号"
                    prop="identityCard"
                    clearable
                >
                    <el-input v-model="form.identityCard"></el-input>
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
                    prop="familyName"
                    label="家长姓名"
                    clearable
                >
                    <el-input v-model="form.familyName"></el-input>
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
                name: '',
                birthday:'',
                identityCard:'',
                address:'',
                gender:'',
                familyName:'',
                tel:'',
                comment:'',//备注，如过敏史
            })
        }
    },
    data() {
        return {
            form:clone(this.formData)
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        }
    },
    created(){
        this.rules = {
          name: { required: true, message: '请输入姓名', trigger: 'blur' },
          birthday: { required: true, message: '请输入出生日期', trigger: 'blur' },
          identityCard: { required: true, message: '请输入身份证号', trigger: 'blur' },
          address: { required: true, message: '请输入家庭住址', trigger: 'blur' },
          gender: { required: true, message: '请输入性别', trigger: 'blur' },
          tel: { required: true, message: '请输入联系电话', trigger: 'blur' },
          familyName: { required: true, message: '请输入家长姓名', trigger: 'blur' },
        }
    },
};
</script>