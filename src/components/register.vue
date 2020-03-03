<template>
    <div class="register-container">
        <div class="row title">
            <div class="col-md-12">
                <div>
                    <img src="../images/logo.png" alt="" @click="redirect"
                        style="width:100px; height:100px; padding:10px;margin-right:20px; cursor: pointer">
                    <h1>学生注册界面</h1>
                </div>
            </div>
        </div>
        <div class="row login-panel">
            <div class="col-md-4 col-xs-11 content">
                <h1>学生注册</h1>
                <div class="form">
                    <input type="text" class="form-control username" v-model="username" placeholder="请输入用户名">
                    <input type="password" class="form-control password" v-model="password" placeholder="请输入密码" @keyup="checkRePassword">
                    <input type="password" class="form-control password" v-model="re_password" ref='rePassword' @keyup="checkRePassword" placeholder="请确认密码">
                    <div class="row">
                        <div class="col-md-12 up">
                            <button type="button" class="btn btn-primary upload" id="test1">
                                <i class="layui-icon">&#xe67c;</i>上传图片
                            </button>
                            <img class="headIcon" :src="imgUrl == '' ? def_imgurl : imgUrl" alt="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 reg">
                            <button class="btn btn-primary" @click="register">立即注册</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer row hidden-xs">
            <div class="col-md-12">
                <!-- <span>制作人: &nbsp;&nbsp;&nbsp;孙研&nbsp;&nbsp;&nbsp;&nbsp;黄伟</span> -->
                <span>制作人: &nbsp;&nbsp;孙研&nbsp;&nbsp;&nbsp;黄伟</span>
                <!-- <span>指导老师：&nbsp;&nbsp;朱楠 &nbsp;&nbsp;胡鹏飞</span>
                <span>Copyright &copy; 2019 &nbsp;新乡学院</span> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { configPath } from '../../config.js'
    export default {
        data() {
            return {
                username: '',
                password: '',
                re_password: '',
                imgUrl: '',
                def_imgurl: configPath+'/images/upload/headIcon/upload.png'
             };
        },
        methods: {
            register() { // 注册事件
                if(!this.checkUserName()){
                    return;
                };
                if(!this.checkPassword()){
                    return;
                }
                this.$http.post('system/register', {
                    name: this.username,
                    password: this.password,
                    headIcon: this.imgUrl == '' ? this.def_imgurl : this.imgUrl
                }).then(result => {
                    if(result.body.status == 1){
                        this.$message({
                            type: 'success',
                            message: '注册成功！！',
                            duration: 3000
                        });
                        this.$router.push("/login");
                    }else{
                        this.$message({
                            type: 'error',
                            message: result.body.message,
                            duration: 3000
                        });
                    }
                });
            },
            checkRePassword(){
                if(this.password != this.re_password){
                    this.$refs.rePassword.style['background-color'] = 'rgba(255, 72, 0, 0.485)';
                }else{
                    this.$refs.rePassword.style['background-color'] = '';
                }
            },
            checkUserName(){
                if(this.username.trim() == ''){
                    this.$message({
                        type: 'error',
                        message: '用户名不能为空！！',
                        duration: 5000
                    });
                    return false;
                }
                return true;
            },
            checkPassword(){
                if(this.password.trim() == ''){
                    this.$message({
                        type: 'error',
                        message: '密码不能为空！！',
                        duration: 5000
                    });
                    return false;
                }else if(this.password != this.re_password){
                    this.$message({
                        type: 'error',
                        message: '两次密码不一致！！',
                        duration: 5000
                    });
                    return false;
                }
                return true;
            },
            redirect(){
                window.location= configPath + '/zhujiemian';
            }
        },
        created() {
            layui.use('upload', () => {
                var upload = layui.upload;
                var uploadInst = upload.render({
                    elem: '#test1',
                    size: 500,
                    url: Vue.http.options.root + '/system/upload',
                    done: (res) => { //上传完毕回调
                        this.$message({
                            type: 'success',
                            message: '头像上传成功！!'
                        });
                        this.imgUrl = Vue.http.options.root + res.message;
                    },
                    error: function () { //请求异常回调
                    }
                });
            });
        }
    }
</script>

<style lang="scss" scoped>
    .register-container {
        background-image: url('../images/bg.png');
        width: 100%;
        height: 100%;
        background-size: 100% 100%;

        .title {
            text-align: center;
            height: 15%;
            background-color: #96a69e;

            div {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;

                h1 {
                    font-family: 'Times New Roman', Times, serif;
                    color: white;
                    font-size: 28px;
                    margin: 0;
                }
            }
        }

        .login-panel {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 75%;
            .content {
                border-radius: 20px;
                border: 1px solid rgba(172, 177, 99, 0.404);
                background-color: rgba(96, 140, 96, 0.89);

                h1 {
                    text-align: center;
                    font-size: 28px;
                    padding: 10px 0 30px 0;
                    margin-top: 20px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.062);
                }

                .form {
                    padding: 20px 20px;

                    input {
                        margin: 10px 0;
                    }

                    .password {
                        background: no-repeat url('../images/password.png') 10px 5px white;
                        background-size: 20px 20px;
                        margin-top: 30px;
                    }

                    .username {
                        background: no-repeat url('../images/username.png') 10px 5px white;
                        background-size: 20px 20px;
                    }

                }

                .up {
                    display: flex;
                    justify-content: flex-start;
                    padding: 10px 0;

                    .headIcon {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        margin-left: 20px;
                    }
                }

                .reg {
                    display: flex;
                    justify-content: flex-end;

                    button {
                        width: 100px;
                    }
                }
            }
        }

        
        .footer{
            background-color: #96a69e;
            position: absolute;
            bottom: 0;
            height: 10%;
            width: 100%;
            div{
                justify-content: center;
                align-items: center;
                text-align: center;
                padding-top: 20px;
                span{
                    // background-color: red;
                    font-size: 17px;
                    color: white;
                    padding:0 10px;
                }

            }
        }
    }

    .row {
        margin: 0;
    }

    [class*='col-'] {
        padding: 0;
    }

    .form-control {
        border-radius: 30px;
        padding-left: 40px;
    }

    .btn {
        border-radius: 30px;
        // padding: 8px 45px;
    }

    .upload {
        background-color: rgb(255, 102, 0) !important;
        border-color: rgb(255, 145, 0) !important;
    }
</style>