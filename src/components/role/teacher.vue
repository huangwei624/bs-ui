<template>
    <div class="teacher-container">
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
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            用户管理 <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link tag="a" to="/role/teacher/studentMange">学生管理</router-link></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            信息管理 <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link to="/role/teacher/commentMange" tag="a">留言管理</router-link></li>
                            <li><router-link to="/role/teacher/notify" tag="a">通知管理</router-link></li>
                            <li><router-link to="/role/teacher/material" tag="a">资料管理</router-link></li>
                            <li><router-link to="/role/teacher/analyse" tag="a">数据分析</router-link></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            师生互动 <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu"> 
                            <li><router-link to="/role/teacher/interacte" tag="a">师生互动</router-link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="layui-layout-body" v-show="isTeacher">
            <div class="layui-layout layui-layout-admin">
                <div class="layui-header hidden-xs">
                    <div class="layui-logo" style="">
                        <img src="../../images/logo.png" alt="花间新韵" style="width: 55px; heiht: 55px;  margin-right: 10px; cursor: pointer;"  @click="redirect" >
                        教师端
                        <span style="color: #ff9900; padding-left: 20px; cursor: pointer;"  @click="redirect" >返回主界面</span>
                    </div>
                    <ul class="layui-nav layui-layout-right">
                        <li class="layui-nav-item">
                            <a href="javascript:;">
                                <img :src="$cookies.get('headIcon')" class="layui-nav-img">
                                {{$cookies.get("username")}}
                            </a>
                        </li>
                        <li class="layui-nav-item"><a href="" @click="loginOut">注销</a></li>
                    </ul>
                </div>

                <div class="layui-side layui-bg-black hidden-xs">
                    <div class="layui-side-scroll">
                        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="black"
                            text-color="#fff" active-text-color="#ffd04b">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>用户管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="1-1" @click="$router.push('/role/teacher/studentMange')">学生管理
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-document"></i>
                                    <span>信息管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="2-1" @click="$router.push('/role/teacher/commentMange')">留言管理</el-menu-item>
                                    <el-menu-item index="2-2" @click="$router.push('/role/teacher/notify')">通知管理</el-menu-item>
                                    <el-menu-item index="2-3" @click="$router.push('/role/teacher/material')">资料管理</el-menu-item>
                                    <el-menu-item index="2-4" @click="$router.push('/role/teacher/analyse')">数据分析</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title">
                                    <i class="el-icon-mobile-phone"></i>
                                    <span>师生互动</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="3-1" @click="$router.push('/role/teacher/interacte')">师生互动
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
    </div>

</template>

<script>
    import {  IsPC  } from '../../util/utils.js'
    import { configPath } from '../../../config.js'
    export default {
        data() {
            return {
                isTeacher: this.$cookies.get("cate") == '1',
            }
        },
        methods: {
            loginOut() {
                this.$cookies.remove("username");
                this.$router.push('/login');
            },
            phoneAdapt() {  // 移动端动态适配
                if (!IsPC()) {
                    this.$refs.a.style.position = "absolute";
                    this.$refs.a.style.left = "0px";
                    this.$refs.a.style.top = "55px";
                    this.$refs.a.style.paddingRight = "17px";
                } else {
                    console.log("pc端");
                    this.$refs.a.style.bottom = "60px";
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
        mounted() {
            this.phoneAdapt();
        }
    }
</script>

<style lang="scss">
    .teacher-container {

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

        .panel-primary>.panel-heading {
            background-color: rgb(255, 145, 0);
            border-color: yellow;
        }

        .panel-primary {
            border-color: rgb(255, 145, 0);
        }

        .layui-body {
            background-image: url('../../images/bg.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }

        .layui-layout-admin .layui-footer{
            height: 60px;
        }

        .layui-layout-admin .layui-body {
            // bottom: 60px !important;
        }

        .footer{
            div{
                justify-content: center;
                align-items: center;
                text-align: center;
                padding-top: 6px;
                span{
                    font-size: 17px;
                    padding: 0 20px;
                }

            }
        }

        .layui-layout-admin .layui-body {
            bottom: 0;
        }

        .row {
            // padding-right: 18px !important;
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
</style>