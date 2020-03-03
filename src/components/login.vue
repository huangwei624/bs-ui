<template>
    <div class="login-container">
        <div class="row title">
            <div class="col-md-12">
                <div>
                    <img src="../images/logo.png" alt="" @click="redirect"
                        style="width:100px; height:100px; padding:10px;margin-right:20px; cursor: pointer">
                    <h1>登录界面</h1>
                </div>
            </div>
        </div>
        <div class="row login-panel">
            <div class="col-md-4 col-xs-11 content">
                <h1>用户登录</h1>
                <div class="form">
                    <input type="text" class="form-control username" v-model="username" placeholder="用户名"   @keyup.enter="login">
                    <input type="password" class="form-control password" v-model="password" placeholder="密码" @keyup.enter="login">
                    <div class="remember">
                        <div class="row checkbox">
                            <div class="col-md-12">
                                <el-radio v-model="radio" label="0">学生</el-radio>
                                <el-radio v-model="radio" label="1">教师</el-radio>
                            </div>
                        </div>
                        <div class="row button">
                            <div class="col-md-12">
                                <button class="btn btn-primary" @click="register">立即注册</button>
                                <button class="btn btn-primary" @click="login">立即登陆</button>
                            </div>
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
    import { configPath } from '../../config.js'
    export default {
        data() {
            return {
                flag: false,
                username: '',
                password: '',
                radio: "0"  // 0,选中的学生， 1，选中的是教师
            };
        },
        methods: {
            login() {   // 登录事件
                if(!this.check()){
                    return;
                }
                this.$http.post('system/login/'+this.username+'/'+this.password+'/'+parseInt(this.radio)).then(result => {
                    if (result.body.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '登录成功！！',
                            duration: 3000
                        });
                        this.$cookies.set("username", result.body.message.name);
                        this.$cookies.set("headIcon", result.body.message.headIcon);
                        this.$cookies.set("cate", this.radio);
                        this.$cookies.get("cate") == 1 ? this.$router.push('/role/teacher') : this.$router.push('/role/student');
                    } else {
                        this.$message({
                            type: 'error',
                            message: result.body.message,
                            duration: 3000
                        });
                    }
                }, error => {
                    this.$message({
                        type: 'error',
                        message: '登录失败，请检查连接是否正常！！',
                        duration: 3000
                    });
                });
            },
            register(){    // 注册事件
                this.$router.push('/register');
            },
            showNotify(){
                this.$notify({
                    title: '提示',
                    message: '教师端登录：账号，admin，密码，123',
                    duration: '5000',
                    position: 'top-right',
                    type: 'info'
                });                
            },
            check(){
                if(this.username.trim() == '' || this.password.trim() == ''){
                    this.$message({
                        type: 'error',
                        message: '用户名或者密码不能为空！！',
                        duration: 3000
                    });
                    return false;
                }
                return true;
            },
            redirect(){
                window.location= configPath + '/zhujiemian';
            }
        },
        created(){
            this.showNotify();
        }
    }
</script>

<style lang="scss" scoped>
    .login-container {
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
                    color: white;
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
                        margin-bottom: 40px;
                    }

                    .username {
                        background: no-repeat url('../images/username.png') 10px 5px white;
                        background-size: 20px 20px;
                    }

                    .remember .checkbox div{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .remember .checkbox label{
                        padding: 0 15px;
                        color: white;
                    }
                    .remember .button div{
                        padding-top: 35px;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                    }
                    .remember .button div button{
                        margin: 0 10px;
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


</style>