<template>
    <div style="width:100%; height:100%; display:flex; justify-content: center;">
        <div class="material-container hidden-xs" style="padding-top:20px;">
            <div class="row">
                <div class="col-md-12 title">
                    <span>课程资料</span>
                    <div>
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="row form">
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="keyword" placeholder="请输入关键字"
                            aria-describedby="basic-addon2" @keyup="search">
                        <span class="input-group-addon" id="basic-addon2" style="cursor:pointer">&nbsp;&nbsp;<span
                                class="glyphicon glyphicon-search"></span>&nbsp;&nbsp;</span>
                    </div>
                </div>
                <div class="col-md-offset-4 col-md-2">
                    <button class="btn btn-success" style="width:100%" id="uploadFile">上传文件</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 body">
                    <div class="col-md-12" style="border-radius:10px">
                        <table class="table table-hover table-striped"
                            style="background-color:rgb(255, 255, 255); border-radius:8px;">
                            <thead>
                                <tr>
                                    <th style="">编号</th>
                                    <th style="">文件名称</th>
                                    <th style="min-width:90px;">上传者</th>
                                    <th style="min-width:90px;">大小</th>
                                    <th style="min-width:150px;">创建时间</th>
                                    <th style="min-width:30px;">下载量</th>
                                    <th style="min-width:150px;">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in searchFiles" :key="item.id">
                                    <td class="table-title">{{index+1}}</td>
                                    <td style="">
                                        <img src="../../images/rar.gif" alt="" width="20px" height="20px"
                                            style="margin-right:7px;">
                                        <span>{{item.fileName}}</span>
                                    </td>
                                    <td class="table-title">{{item.teacherName}}</td>
                                    <td class="table-center">{{item.size}}</td>
                                    <td>{{item.createTime | dateFormat}}</td>
                                    <td class="table-center">{{item.downloadNumber}}</td>
                                    <td>
                                        <button class="btn btn-danger btn-sm" @click="download(item.id)">下载</button>
                                        <button class="btn btn-danger btn-sm" @click="del(item.id)">删除</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="material-container visible-xs" style="width:100%; padding-left:17px">
            <div class="row">
                <div class="col-md-12 title">
                    <span>课程资料</span>
                    <div>
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="row form">
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="keyword" placeholder="请输入关键字"
                            aria-describedby="basic-addon2" @keyup="search">
                        <span class="input-group-addon" id="basic-addon2" style="cursor:pointer">&nbsp;&nbsp;<span
                                class="glyphicon glyphicon-search"></span>&nbsp;&nbsp;</span>
                    </div>
                </div>
                <div class="col-md-offset-4 col-md-2">
                    <button class="btn btn-success" style="width:100%" id="uploadFile">上传文件</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 body">
                    <div class="col-md-12  table-responsive" style="border-radius:10px">
                        <table class="table table-hover table-striped"
                            style="background-color:rgb(255, 255, 255); border-radius:8px;">
                            <thead>
                                <tr>
                                    <th style="">文件名称</th>
                                    <th style="min-width:90px;">上传者</th>
                                    <th style="min-width:90px;">大小</th>
                                    <th style="min-width:150px;">创建时间</th>
                                    <th style="min-width:150px;">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in searchFiles" :key="item.id">
                                    <td style="min-width: 150px;">
                                        <img src="../../images/rar.gif" alt="" width="20px" height="20px"
                                            style="margin-right:7px;">
                                        <span>{{item.fileName}}</span>
                                    </td>
                                    <td class="table-title">{{item.teacherName}}</td>
                                    <td class="table-center">{{item.size}}</td>
                                    <td>{{item.createTime | dateFormat}}</td>
                                    <td>
                                        <button class="btn btn-danger btn-sm" @click="download(item.id)">下载</button>
                                        <button class="btn btn-danger btn-sm" @click="del(item.id)">删除</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
    .material-container {
        width: 90%;
        height: 90%;

        .title {
            margin-bottom: 30px;

            span {
                font-size: 20px;
                padding-right: 10px;
                padding-left: 10px;
            }

            div {
                width: 100%;
                height: 3px;
                background-color: #ff9900;
                margin-top: 10px;

                span {
                    display: block;
                    width: 100px;
                    height: 100%;
                    background-color: #3c763d;
                }
            }
        }

        .form {
            margin-bottom: 20px;
        }
    }

    [class*='col-'] {
        padding: 0 !important;
    }

    th,
    td {
        text-align: center;
        // border: 1px solid rgba(255, 255, 255, 0) !important;
    }

    table {
        border: none !important;
    }

    .input-group-addon {
        padding: 2px 12px;
        font-size: 20px;
        font-weight: 400;
        line-height: 1;
        color: #ff9900;
        text-align: center;
        background-color: #3c763d;
        border: 1px solid #3c763d;
    }

    .table-striped>tbody>tr:nth-of-type(odd) {
        background-color: rgba(247, 207, 120, 0.8);
    }

    .table-striped>tbody>tr:nth-of-type(even) {
        background-color: rgba(228, 164, 81, 0.8);
    }

    .table-hover>tbody>tr:hover {
        background-color: #f8f5f5be;
    }

    .btn-success {
        background-color: #ff9100;
        border-color: yellow;
    }
</style>

<script>
    import {
        configPath
    } from '../../../config.js'
    export default {
        data() {
            return {
                files: [],
                keyword: '',
                searchFiles: []
            }
        },
        methods: {
            search() {
                let newFiles = [];
                this.files.forEach((item) => {
                    if (item.fileName.includes(this.keyword)) {
                        newFiles.push(item);
                    }
                });
                this.searchFiles = newFiles;
            },
            getFileInfo() {
                this.$http.get("fileInfo/getAllFiles").then(result => {
                    if (result.body.status == 1) {
                        this.files = result.body.message;
                        this.search();
                    }
                });
            },
            download(id) {
                window.location = configPath + '/download?id=' + id;
            },
            del(id) {
                this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get("fileInfo/delById?id=" + id).then(result => {
                        if (result.body.status == 1) {
                            this.getFileInfo();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        created() {
            this.searchFiles = this.files;
            layui.use('upload', () => {
                var upload = layui.upload;
                var uploadInst = upload.render({ //执行实例
                    elem: '#uploadFile', //绑定元素
                    url: Vue.http.options.root + '/upload?teacherName=' + $cookies.get(
                    "username"), //上传接口
                    accept: 'file',
                    done: () => {
                        this.getFileInfo();
                        this.$message({
                            type: 'success',
                            message: '上传成功！'
                        });
                    },
                    error: function () {
                        //请求异常回调
                    }
                });
            });
            this.getFileInfo();
        }
    }
</script>