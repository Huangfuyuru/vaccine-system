<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">疫苗接种管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="account">
                    <el-input v-model="param.account" placeholder="账号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.pass"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { postLoginUser } from '../../api/index';
export default {
    data: function() {
        return {
            param: {
                account:'',
                pass: '',
            },
            rules: {
                account: [{ required: true, message: '请输入账户', trigger: 'blur' }],
                pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
            resData:{}
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.postAsyncLoginUser(this.param)
                } else {
                    this.$message.error('请输入账号和密码');
                    return false;
                }
            });
        },
        async postAsyncLoginUser(param){
            let { code,data } = await postLoginUser(param);
            if(code === 0){
                let ndata = JSON.stringify(data);
                localStorage.setItem('ms_type',data.type);
                localStorage.setItem('ms_users',ndata);
                this.$router.push('/');
            }
        }
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(40, 51, 200);
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>