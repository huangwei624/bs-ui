<template>
    <div class="notify-container">
        <div>

            <div class="row">
                <div class="col-md-11">
                    <div class="panel panel-primary">
                        <div class="panel-heading text-center">
                            <h3 class="panel-title">评论管理</h3>
                        </div>
                        <div class="panel-body form-inline text-center row">
                            <div class="col-md-6">
                                <label for="">
                                    按评论人查询：
                                    <input type="text" class="form-control" v-model="name">
                                </label>
                            </div>
                            <div class="col-md-6">
                                <label for="">
                                    按评论内容查询：
                                    <input type="text" class="form-control" v-model="content">
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="row h-table">
                <div class="col-md-11 table-responsive">
                    <table class="table table-bordered table-striped table-hover table-condensed" style="background-color:rgb(255, 255, 255, 0.7)">
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>评论人</th>
                                <th>评论内容</th>
                                <th>评论时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in commentList" :key="item.id">
                                <td>{{index+1}}</td>
                                <td class="table-title">{{item.student.name}}</td>
                                <td class="table-center">{{item.title | miniContext}}</td><!-- 评论内容 -->
                                <td>{{item.commentTime | dateFormat}}</td>
                                <td>
                                    <button class="btn btn-info btn-sm" @click="showDetail(item.id)">详细信息</button>
                                    <button class="btn btn-danger btn-sm" @click="del(item.id)">删除</button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot style="background-color:white;">
                            <tr>
                                <td colspan="5">
                                    <div class="col-md-12 page">
                                        <div id="page"></div>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
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
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import moment from 'moment'
    export default {
        data() {
            return {
                commentList: [],
                size: 0,
                name: '', // 评论人
                content: '', // 评论内容
                def_pageIndex: 1, // 默认需要查询的页码
                def_limit: 8, // 默认每页可以显示数据的数目
            }
        },
        created() {
            this.getCommentByForm(this.def_pageIndex, this.def_limit, this.renderLayui);
        },
        methods: {
            // 显示留言详细信息
            showDetail(id){
                this.$http.get("comment/getById/"+id).then(result => {
                    var status = result.body.status;
                    var res = result.body.message;
                    if(status==1){
                        $("#comment_name").val(res.username);
                        var commentTime = moment(res.commentTime).format("YYYY-MM-DD HH:mm:ss");
                        $("#comment_date").val(commentTime);
                        $("#comment_content").val(res.content);
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
                            this.getCommentByForm(obj.curr, obj.limit)
                        }
                    });
                })
            },
            del(id) {
                this.$confirm('此操作将永久删除该条评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get("comment/del/" + id).then(result => {
                        this.getCommentByForm(1, 8, this.renderLayui);
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
            getCommentByForm(pageIndex, limit, callback) {
                this.$http.get("comment/getAll/" + pageIndex + "/" + limit + "?name=" + this.name + "&content=" + this
                    .content).then(result => {
                    this.commentList = result.body.message.comments;
                    this.size = result.body.message.totalItem;
                    callback ? callback() : console.log();

                });
            }
        },
        watch: {
            s_name_content(newVal) {
                this.getCommentByForm(this.def_pageIndex, this.def_limit, this.renderLayui);

            },
        },
        computed: {
            s_name_content() {
                return this.name + this.content;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .notify-container {
        .h-table {
            min-height: 350px;
        }
        thead tr th{
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 15px;
        }
        tbody tr td{
            white-space: pre-wrap !important;
        }
    }
</style>