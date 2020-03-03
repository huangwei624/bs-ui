<template >
    <div class="notify-container">
        <div class="row">
            <div class="col-md-11" style="">
                <div class="panel panel-primary">
                    <div class="panel-heading text-center">
                        <h3 class="panel-title">系统通知</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-11 table-responsive">
                <table class="table table-bordered table-striped table-hover table-condensed" style="background-color:rgb(255, 255, 255, 0.7)">
                    <thead style="background-color: white;">
                        <tr>
                            <th>编号</th>
                            <th>通知标题</th>
                            <th>通知内容</th>
                            <th>创建人</th>
                            <th>通知时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in notifyList" :key="item.id">
                            <td>{{index+1}}</td>
                            <td>{{item.title}}</td>
                            <td>{{item.content | miniContext}}</td>
                            <td>{{item.teacher.name}}</td>
                            <td>{{item.time | dateFormat}}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" @click="showDetail(item.id)">查看详情</button>
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
    import '../../../lib/bootstrap/css/bootstrap.min.css'
    import moment from 'moment'
    export default {
        data() {
            return {
                notifyList: [],
                size: 0,
                def_pageIndex: 1, // 默认需要查询的页码
                def_limit: 13, // 默认每页可以显示数据的数目
            }
        },
        created() {
            this.getNotifyByForm(this.def_pageIndex, this.def_limit, this.renderLayui);
            this.readNotify();
            // this.renderLayui();
        },
        methods: {
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
                        limit: 13,
                        limits: [13, 14, 15],
                        last: '尾页',
                        jump: (obj, first) => {
                            this.getNotifyByForm(obj.curr, obj.limit, this.readNotify)
                        }
                    });
                })
            },
            getNotifyByForm(pageIndex, limit, callback) {
                this.$http.get("notify/getByTitleOrTeacher?&pageIndex=" + pageIndex + "&limit=" + limit).then(
                    result => {
                        this.notifyList = result.body.message.notifies;
                        this.size = result.body.message.totalItem;
                        callback ? callback() : console.log();
                        console.log(result.body.message);

                    });
            },
            readNotify() {
                this.$http.get("notify/updateState").then(result => {
                    this.$store.state.unRead = false;
                    console.log("已阅读！");
                });
            }
        },
        watch: {
            unRead() {

            }
        },
    }
</script>

<style lang="scss" scoped>
    .notify-container {
        width: 100%;
        .panel-heading {
            background-color: #ff9100;
            border: 1px solid #ff9100;
        }

        .panel {
            border: 1px solid #ff9100;
        }

        .page a{
            background-color: white !important;
        }

        thead tr th{
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 15px;
        }
    }
</style>