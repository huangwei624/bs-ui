<template>
    <div class="student-container">
        <nav class="navbar navbar-default visible-xs" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#example-navbar-collapse">
                    <span class="sr-only">切换导航</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">
                    <div>
                        <img :src="$cookies.get('headIcon')" class="layui-nav-img">
                        {{$cookies.get('username')}}
                    </div>
                    <div style="margin-left:20px">
                        <li class="layui-nav-item" style="position: absolute; right: 70px;"><a href=""
                                @click="loginOut">注销</a></li>
                    </div>
                    
                </a>
            </div>
            <div class="collapse navbar-collapse" id="example-navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="">
                        <router-link to="/role/student/comments" tag="a">学生评论</router-link>
                    </li>
                    <li class="">
                        <router-link to="/role/student/interacte" tag="a">学生互动</router-link>
                    </li>
                    <li class="">
                        <router-link to="/role/student/material" tag="a">资料下载</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="layui-layout-body" v-show="!isTeacher">
            <div class="layui-layout layui-layout-admin ">
                <div class="layui-header hidden-xs">
                    <div class="layui-logo" style=" padding-left: 20px;">
                        <img src="../../images/logo.png" alt="花间新韵" style="width: 55px; heiht: 55px;  margin-right: 10px; cursor: pointer;"  @click="redirect" >
                        学生端
                        <span style="color: #ff9900; padding-left: 20px; cursor: pointer;"  @click="redirect" >返回主界面</span>
                    </div>
                    <ul class="layui-nav layui-layout-right">
                        <li class="layui-nav-item">
                            <router-link to="/role/student/readNotify" class="notify" tag="a">
                                <img src="../../images/notify.png" alt="">
                                <span :style="{'display': unRead == true ? '' : 'none'}"></span>
                            </router-link>
                        </li>
                        <li class="layui-nav-item">
                            <a href="javascript:;">
                                <img :src="$cookies.get('headIcon')" class="layui-nav-img">
                                {{$cookies.get('username')}}
                            </a>
                        </li>
                        <li class="layui-nav-item" style=""><a href=""  data-toggle="modal" data-target="#myModal">修改密码</a></li>
                        <!-- 修改密码模态框 -->
                        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog" style="color: black;">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 class="modal-title" id="myModalLabel">修改密码</h4>
                                    </div>
                                    <div class="modal-body">
                                        <form class="form-horizontal">
                                            <div class="form-group">
                                                <label for="inputEmail3" class="col-sm-3 control-label">新密码</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-model="newPwd" class="form-control" 
                                                    id="name" name="name" placeholder="请输入新密码">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="inputPassword3" class="col-sm-3 control-label">确定新密码</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" v-model="confirmNewPwd" 
                                                    id="score" name="score" placeholder="请再次确定新密码">
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                        <button type="button" class="btn btn-primary" @click="updatePwd">提交更改</button>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal -->
                        </div>
                        <li class="layui-nav-item"><a href="" @click="loginOut">注销</a></li>
                    </ul>
                </div>

                <div class="layui-side layui-bg-black hidden-xs">
                    <div class="layui-side-scroll">
                        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="black"
                            text-color="#fff" active-text-color="#ffd04b">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>在线学习</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="1-1" @click="$router.push('/role/student/comments')">学生留言
                                    </el-menu-item>
                                    <el-menu-item index="1-2" @click="$router.push('/role/student/interacte')">师生互动
                                    </el-menu-item>
                                    <el-menu-item index="1-3" @click="$router.push('/role/student/material')">资料下载
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </div>
                </div>
                <div class="layui-body" ref="a">
                    <router-view></router-view>
                </div>

                <div class="layui-footer hidden-xs">
                    <div class="footer row">
                        <div class="col-md-12">
                            <!-- <span>制作人: &nbsp;&nbsp;&nbsp;孙研&nbsp;&nbsp;&nbsp;&nbsp;黄伟</span> -->
                            <span>制作人: &nbsp;&nbsp;孙研&nbsp;&nbsp;&nbsp;黄伟</span>
                            <!-- <span>指导老师：&nbsp;&nbsp;朱楠 &nbsp;&nbsp;胡鹏飞</span>
                            <span>Copyright &copy; 2019 &nbsp;新乡学院</span> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 详情模态 -->
        <div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">详细信息</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-2 control-label">姓名</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" disabled id="comment_name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPassword3" class="col-sm-2 control-label">日期</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" disabled id="comment_date">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPassword3" class="col-sm-2 control-label">内容</label>
                                <div class="col-sm-8">
                                    <textarea rows="10" cols="30" class="form-control" disabled id="comment_content"></textarea> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
    </div>

</template>

<script>
    import { IsPC } from '../../util/utils.js'
    import { configPath } from '../../../config.js'
    import jquery from 'jquery'
    export default {
        data() {
            return {
                isTeacher: this.$cookies.get("cate") == '1',
                newPwd: '',
                confirmNewPwd: '',
            }
        },
        created() {
            this.checkNotify();
        },
        mounted() {
            this.phoneAdapt();
        },
        methods: {
            updatePwd(){
                $('#myModal').modal('hide')
                var name = this.$cookies.get("username")
                if(this.newPwd != this.confirmNewPwd){alert("两次密码不一致"); return}

                this.$http.get("student/updatePwd/"+name+"/"+this.newPwd).then(result => {
                    // let message = result.body.message;
                    let status = result.body.status;
                    if(status==1){
                        alert("修改成功")
                    }
                })
            },
            loginOut() {
                this.$router.push('/login');
                this.$cookies.remove("username");
            },
            checkNotify() {
                this.$http.get("notify/getAllNotify").then(result => {
                    let arr = result.body.message;
                    console.log(result.body.message);
                    result.body.message.some(item => {
                        if (item.state == 0) {
                            this.unRead = true;
                            return;
                        }
                    });
                });
            },
            phoneAdapt() {
                if (!IsPC()) {
                    this.$refs.a.style.position = "absolute";
                    this.$refs.a.style.left = "0px";
                    this.$refs.a.style.top = "50px";
                    this.$refs.a.style.bottom = "0px";
                } else {
                    console.log("pc端");
                    $(".layui-body").css({'display': 'flex', 'align-items': 'center', 'justify-content': 'center'});
                }
            },
            redirect(){
                window.location= configPath + '/zhujiemian';
            },
            download(){
                window.location= configPath + '/download';
            }
        },
        watch: {
            unRead() {
                this.unRead = this.$store.state.unRead
            }
        },
        computed: {
            unRead() {
                return this.$store.state.unRead;
            }
        },
    }
</script>

<style lang="scss">
    .student-container {
        .row {
            padding-right: 18px !important;
        }

        .navbar-brand {
            display: flex;
            align-items: center;
        }

        .navbar-brand div {
            display: flex;
            align-items: center;
        }

        .layui-layout-admin .layui-header {
            background-color: rgba(207, 206, 188, 0.479);
        }

        .layui-header {
            color: black;
        }

        .layui-layout-admin .layui-logo {
            color: black;
        }

        .layui-nav .layui-nav-item a {
            color: black;
        }

        .el-submenu__title {
            background-color: rgb(255, 153, 0) !important;
        }

        .el-menu-item {
            background-color: rgb(163, 116, 45) !important;
        }

        .el-menu-item:hover {
            background-color: rgba(213, 214, 189, 0.74) !important;
        }

        .layui-bg-black {
            background-color: rgba(207, 206, 188, 0.479) !important;
        }

        .layui-body {
            background-image: url('../../images/bg.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }

        .layui-layout-admin .layui-body {
            bottom: 60px;
        }

        .layui-layout-admin .layui-footer{
            height: 60px;
        }

        .footer{
            div{
                justify-content: center;
                align-items: center;
                text-align: center;
                padding-top: 10px;
                span{
                    font-size: 17px;
                    padding: 0 20px;
                }

            }
        }

        .notify {
            position: relative;

            span {
                position: absolute;
                right: 12px;
                top: 16px;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: red;
            }
        }
    }

    a:hover {
        text-decoration: none !important;
    }

    a {
        text-decoration: none !important;

    }

    .el-submenu__icon-arrow {
        margin-right: 10px;
    }

    .el-menu-item-group__title {
        display: none;
    }

    [class*='col-'] {
        padding: 0;
    }
</style>