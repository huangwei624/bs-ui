<template>
    <div class="notify-container">
        <div class="row">
            <div class="col-md-11">
                <div class="panel panel-primary">
                    <div class="panel-heading text-center">
                        <h3 class="panel-title">通知管理</h3>
                    </div>
                    <div class="panel-body form-inline text-center row">
                        <div class="col-md-4">
                            <label for="">
                                按标题查询：
                                <input type="text" class="form-control" v-model="s_title">
                            </label>
                        </div>
                        <div class="col-md-4">
                            <label for="">
                                按老师查询：
                                <input type="text" class="form-control" v-model="s_name">
                            </label>
                        </div>
                        <div class="col-md-2">
                            <button type="button" class="btn btn-primary btn-small" data-toggle="modal"
                                data-target="#myModal">新建通知</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-md-11 table-responsive">
                <table class="table table-bordered table-striped table-hover table-condensed" style="background-color:rgb(255, 255, 255, 0.7)">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>标题</th>
                            <th>内容</th>
                            <th>创建者</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in notifyList" :key="item.id">
                            <td>{{index+1}}</td>
                            <td class="table-title">{{item.title | miniContext(10)}}</td>
                            <td class="table-center">{{item.content | miniContext(30)}}</td>
                            <td>{{item.teacher.name}}</td>
                            <td>{{item.time | dateFormat}}</td>
                            <td>
                                <button class="btn btn-success btn-sm" @click="rePublishNotity(item.id)">重新发布</button>
                                <button class="btn btn-danger btn-sm" @click="del(item.id)">删除</button>
                                <button class="btn btn-info btn-sm" @click="showDetail(item.id)">详细信息</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot style="background-color:white;">
                            <tr>
                                <td colspan="6">
                                    <div class="col-md-12 page">
                                        <div id="page"></div>
                                    </div>
                                </td>
                            </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div class="modal-dialog visible-xs" style="width: 90%">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">× </button>
                        <h4 class="modal-title" id="myModalLabel"> 新建通知 </h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 form-inline">
                                <input type="text" class="form-control" v-model="title" placeholder="标题">
                            </div>
                            <div class="col-md-12 form-inline">
                                <input type="text" class="form-control" :value="$cookies.get('username')" disabled>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 form-inline">
                                <textarea type="text" class="form-control"
                                    style="width: 100%; height: 100px; margin-top: 20px;" placeholder="请输入通知内容"
                                    v-model="content"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消 </button>
                        <button type="button" class="btn btn-primary" @click="saveNotify">发布通知 </button>
                    </div>
                </div>
            </div>
            <div class="modal-dialog  hidden-xs" style="width: 40%;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">× </button>
                        <h4 class="modal-title" id="myModalLabel"> 新建通知 </h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 form-inline">
                                <label for="">
                                    标题：
                                    <input type="text" class="form-control" v-model="title" style="width: 200px;">
                                </label>
                            </div>
                            <div class="col-md-6 form-inline">
                                <label for="">
                                    创建人：
                                    <input type="text" class="form-control" :value="$cookies.get('username')" disabled
                                        style="width: 200px;">
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 form-inline">
                                <textarea type="text" class="form-control"
                                    style="width: 100%; height: 200px; margin-top: 20px;" placeholder="请输入通知内容"
                                    v-model="content"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消 </button>
                        <button type="button" class="btn btn-primary" @click="saveNotify">发布通知 </button>
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
                                <label for="inputPassword3" class="col-sm-2 control-label">标题</label>
                                <div class="col-sm-8">
                                    <textarea rows="3" cols="30" class="form-control" disabled id="notify_title"></textarea> 
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPassword3" class="col-sm-2 control-label">内容</label>
                                <div class="col-sm-8">
                                    <textarea rows="10" cols="30" class="form-control" disabled id="notify_content"></textarea> 
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
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap/dist/js/bootstrap.min.js'
    export default {
        data() {
            return {
                notifyList: [],
                size: 0,
                title: '',
                content: '',
                s_title: '', // 标题查询框
                s_name: '', // 创建者查询框
                def_pageIndex: 1, // 默认需要查询的页码
                def_limit: 8, // 默认每页可以显示数据的数目
            }
        },
        created() {
            this.getNotifyByForm(this.def_pageIndex, this.def_limit, this.renderLayui);
            // this.renderLayui();
        },
        methods: {
            rePublishNotity(id){
                this.$http.get("notify/getById/"+id).then(result => {
                    var status = result.body.status;
                    var res = result.body.message
                    console.log(res)
                    if(status == 1){
                        this.$http.post("notify/saveNotify", {
                            title: res.title,
                            username: this.$cookies.get("username"),
                            content: res.content
                        }).then(result => {
                            this.$store.state.stomp.send("/chat/toManyStudent", {}, result.body.message.id);
                            this.getNotifyByForm(this.def_pageIndex, this.def_limit, this.renderLayui);
                            this.$alert("通知发布成功！");
                        });
                    }else{
                        alert(res);
                    }
                });
            },
            // 显示留言详细信息
            showDetail(id){
                this.$http.get("notify/getById/"+id).then(result => {
                    var status = result.body.status;
                    var res = result.body.message;
                    console.log(res)
                    if(status==1){
                        $("#notify_title").val(res.title);
                        $("#notify_content").val(res.content);
                        $("#detailModal").modal("show");
                    }
                });
            },
            renderLayui() {
                layui.use(['laypage', 'layer'], () => {
                    var laypage = layui.laypage,
                        layer = layui.layer;
                    laypage.render({
                        elem: 'page',
                        count: this.size,
                        layout: ['prev', 'page', 'next', 'last', 'count', 'limit', 'skip'],
                        first: '首页',
                        limit: 8,
                        limits: [8, 10, 12, 15],
                        last: '尾页',
                        jump: (obj, first) => {
                            this.getNotifyByForm(obj.curr, obj.limit)
                        }
                    });
                })
            },
            getNotify(pageIndex, limit) {
                this.$http.get("notify/getAll/" + pageIndex + "/" + limit).then(result => {
                    this.size = result.body.message.totalItem;
                    this.notifyList = result.body.message.notifies;
                    this.getAll = true;
                });
            },
            saveNotify() {
                this.$http.post("notify/saveNotify", {
                    title: this.title,
                    username: this.$cookies.get("username"),
                    content: this.content
                }).then(result => {
                    this.$store.state.stomp.send("/chat/toManyStudent", {}, result.body.message.id);
                    $("#myModal").modal("hide");
                    this.getNotifyByForm(this.def_pageIndex, this.def_limit, this.renderLayui);
                    this.$alert("通知发布成功！");
                });
            },
            del(id) {
                this.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get("notify/delById/" + id).then(result => {
                        this.getNotifyByForm(1, 8);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            getNotifyByForm(pageIndex, limit, callback) {
                this.$http.get("notify/getByTitleOrTeacher?" + "title=" + this.s_title + "&name=" + this.s_name +
                    "&pageIndex=" + pageIndex + "&limit=" + limit).then(result => {
                    this.notifyList = result.body.message.notifies;
                    this.size = result.body.message.totalItem;
                    callback ? callback() : console.log();
                });
            }
        },
        watch: {
            s_title_name(newVal) {
                this.getNotifyByForm(this.def_pageIndex, this.def_limit, this.renderLayui);

            },
        },
        computed: {
            s_title_name() {
                return this.s_title + this.s_name;
            }
        }
    }
</script>

<style lang="scss">
    .notify-container {
        padding-top: 20px;
        color: white;
        width: 100%;
        height: 100%;

        .panel-body {
            color: black;
        }

        [class*='col-'] {
            // background-color: red;
            margin: 0 !important;
            padding: 0 2px 0 18px !important;
        }

        .row {
            display: flex;
            justify-content: center;
        }

        .table-title {
            max-width: 150px;

        }

        .table-center {
            max-width: 400px;
        }

        th,
        td {
            text-align: center;
            margin: auto 0;
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

        .page {
            display: flex;
            justify-content: space-around;
        }

        .layui-laypage a,
        .layui-laypage span {
            background-color: rgba(255, 0, 0, 0);
            color: rgb(45, 155, 182);
            font-weight: bold;
        }

        .modal {
            top: 40px;
            color: black;
        }

        .modal-dialog {
            // width: 40%;
        }

        .modal-body .row div {
            display: flex;
            justify-content: center;
        }

    }

    .modal-backdrop {
        position: relative;
    }

    .btn-primary {
        background-color: rgb(255, 145, 0);
        border-color: yellow;
    }

    .btn-primary:hover {
        background-color: rgba(255, 208, 0, 0.966);
        border-color: yellow;
    }

    .btn-danger {
        background-color: rgb(255, 51, 0);
        border-color: yellow;
    }

    table thead td{
        padding: 10px 0 !important;
    }

    table,
    th,
    td {
        border: 1px solid rgb(255, 145, 0) !important;
        color: black;
        white-space: pre-wrap !important;
    }

    .notify-container .layui-laypage a,
    .notify-container .layui-laypage span {
        color: rgb(255, 123, 0) !important;
    }

    .layui-laypage .layui-laypage-curr .layui-laypage-em {
        background-color: rgb(255, 51, 0) !important;
    }
    thead tr th{
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 15px;
    }
</style>