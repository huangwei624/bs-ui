<template>
    <div class="notify-container">
        <div class="row">
            <div class="col-md-11">
                <div class="panel panel-primary">
                    <div class="panel-heading text-center">
                        <h3 class="panel-title">学生管理</h3>
                    </div>
                    <div class="panel-body form-inline text-center row">
                        <div class="col-md-6">
                            <label for="">
                                按学生姓名查询：
                                <input type="text" class="form-control" v-model="name">
                            </label>
                        </div>
                        <div class="col-md-6">
                            <label for="">
                                按学生学号查询：
                                <input type="text" class="form-control" v-model="number">
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-md-11 table-responsive">
                <table class="table table-bordered table-striped table-hover table-condensed"
                    style="background-color:rgb(255, 255, 255, 0.7)">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>姓名</th>
                            <th>密码</th>
                            <th>学号</th>
                            <th>班级</th>
                            <th>用户状态</th>
                            <th>头像链接</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in studentList" :key="item.id">
                            <td>{{index+1}}</td>
                            <td>{{item.name}}</td>
                            <td><img src="../../images/lock.png" width='20px' height='20px'/></td>
                            <td>{{item.studentId}}</td>
                            <td>{{item.className}}</td>
                            <td>
                                <div v-show="item.status=='1'" style="margin-bottom:-20px">
                                    <img src="../../images/right.png" width="20px" height="20px"/>
                                    <span>激活</span>
                                </div>
                                <div v-show="item.status=='0'" style="margin-top:-20px">
                                    <img src="../../images/error.png" width="20px" height="20px"/>
                                    <span>锁定</span>
                                </div>
                            </td>
                            <td style="word-break:break-all">{{item.headIcon}}</td>
                            <td>
                                <button class="btn btn-success btn-sm" @click="activeUser(item.id)">激活用户</button>
                                <button class="btn btn-primary btn-sm" @click="lockUser(item.id)">锁定用户</button>
                                <button class="btn btn-info btn-sm" @click="resetPwd(item.id)">重置密码</button>
                                <button class="btn btn-danger btn-sm" @click="del(item.id)">删除</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot style="background-color:white;">
                        <tr>
                            <td colspan="8">
                                <div class="col-md-12 page">
                                    <div id="page"></div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-md-11 page">
                <div id="page"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.min.css'
    export default {
        data() {
            return {
                studentList: [],
                size: 0,
                name: '',
                number: '',
                def_pageIndex: 1, // 默认需要查询的页码
                def_limit: 8, // 默认每页可以显示数据的数目
            }
        },
        created() {
            this.getStudentByForm(this.def_pageIndex, this.def_limit, this.renderLayui);
            // this.renderLayui();
        },
        methods: {
            // 激活用户
            activeUser(id){
                this.$http.get("student/activeUser/"+id).then(result => {
                    if(result.body.status ==1){
                        this.getStudentByForm(this.def_pageIndex, this.def_limit, this.renderLayui);
                    }
                    alert(result.body.message)
                })
            },
            // 锁定用户
            lockUser(id){
                this.$http.get("student/lockUser/"+id).then(result => {
                    if(result.body.status ==1){
                        this.getStudentByForm(this.def_pageIndex, this.def_limit, this.renderLayui);
                    }
                    alert(result.body.message)
                })
            },
            // 重置密码
            resetPwd(id){
                this.$http.get("student/resetPwd/"+id).then(result => {
                    alert(result.body.message)
                })
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
                            this.getStudentByForm(obj.curr, obj.limit)
                        }
                    });
                })
            },
            del(id) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get("student/del/" + id).then(result => {
                        this.getStudentByForm(1, 8, this.renderLayui);
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
            getStudentByForm(pageIndex, limit, callback) {
                this.$http.get("student/getAll/" + pageIndex + "/" + limit + "?name=" + this.name + "&studentId=" + this
                    .number).then(result => {
                    this.studentList = result.body.message.students;
                    this.size = result.body.message.totalItem;
                    callback ? callback() : console.log();
                });
            }
        },
        watch: {
            s_number_name(newVal) {
                this.getStudentByForm(this.def_pageIndex, this.def_limit, this.renderLayui);
            },
        },
        computed: {
            s_number_name() {
                return this.number + this.name;
            }
        }
    }
</script>

<style lang="scss">
    .notify-container{
        thead tr th{
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 15px;
        }
    }
</style>