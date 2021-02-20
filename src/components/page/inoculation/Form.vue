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
                    <el-col :span="12">
                        <el-form-item 
                            label="类型"
                            prop="type"
                            clearable
                        >
                            <el-select v-model="form.type" placeholder="请选择">
                                <el-option key="children" label="儿童" :value="1"></el-option>
                                <el-option key="audit" label="成人" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item 
                    v-if="form.type"
                    label="家长姓名"
                    clearable
                >
                    <el-input v-model="form.familyName"></el-input>
                </el-form-item>
                <el-form-item 
                    label="身份证号"
                    prop="identityCard"
                    clearable
                >
                    <el-input v-model="form.identityCard"></el-input>
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
export default {
    name: 'form',
    props:{
        formData:{
            type:Object,
            default:()=>({
                peopleName:'',//接种人姓名
                identityCard:'',//接种人身份证号
                inoculationId:'',//疫苗id
                inoculateDate:'',//接种时间
                vaddinatorId:'',//接种员id
                comment:'',//备注，如第几针
            })
        }
    },
    computed:{
        form(){
            return this.formData
        }
    },
    data() {
        return {
            
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        }
    },
    created(){
        this.rules = {
          peopleName: { required: true, message: '请输入姓名', trigger: 'blur' },
          identityCard: { required: true, message: '请输入身份证号', trigger: 'blur' },
          inoculationId: { required: true, message: '请选择疫苗', trigger: 'blur' },
          inoculateDate: { required: true, message: '请输入接种日期', trigger: 'blur' },
          vaddinatorId: { required: true, message: '请输入接种员ID', trigger: 'blur' },
        }
    },
};
</script>