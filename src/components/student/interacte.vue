<template>
    <div class="interacte">
        <!-- 移动端 -->
        <div class="row visible-xs" style="padding-top: 5px;">
            <div class="col-xs-12">
                <div class="student-list" style="max-height:none;">
                    <!-- 移动端学生列表 -->
                    <h3 style="padding:10px 0;">师生列表
                        <span style="position:absolute; right: 40px; top: 12px;" class="glyphicon glyphicon-menu-down"
                            data-toggle="collapse" data-target="#demo"></span>
                    </h3>
                    <ul id="demo" class="collapse in phone" style="">
                        <li v-for="item in studentList" :key="item.id" ref="li" @click="connect(item.name)"
                            style="padding: 11px 45px 10px 40px;" v-show="item.name != $cookies.get('username')">
                            <div class="student-item">
                                <img :src="item.headIcon" alt="">
                                <span>{{item.name}}&nbsp;&nbsp;<small
                                        style="color:rgb(187, 255, 0);">(学生)</small></span>
                            </div>
                            <span class="point" v-show="item.noReadChatInfo != 0">{{item.noReadChatInfo}}</span>
                            <span class="glyphicon glyphicon-menu-right"></span>
                        </li>
                        <li v-for="item in teacherList" :key="item.id+100" ref="li" @click="connect(item.name)"
                            style="padding: 11px 45px 10px 40px;" v-show="item.name != $cookies.get('username')">
                            <div class="student-item">
                                <img :src="item.headIcon" alt="">
                                <span>{{item.name}}&nbsp;&nbsp;<small
                                        style="color: rgb(255, 145, 0);">(教师)</small></span>
                            </div>
                            <span class="point" v-show="item.noReadChatInfo != 0">{{item.noReadChatInfo}}</span>
                            <span class="glyphicon glyphicon-menu-right"></span>
                        </li>

                    </ul>

                </div>
            </div>
            <div class="col-xs-12">
                <div class="dialog-frame" style="height: 565px;">
                    <!-- 移动端 -->
                    <span>与<strong>{{nowConnectStudent}}</strong>开始聊天</span>
                    <ul ref="chatList1">
                        <li v-for="item in chatInfo" :key="item.id"
                            :style="{'flex-direction' : item.mfrom === nowConnectStudent ? 'row': 'row-reverse'}">
                            <img :src="item.mfromHeadIcon" alt=""><!--  -->
                            <span>{{item.mfrom}}</span>
                            <p>{{item.content}}</p>
                        </li>
                    </ul>
                </div>
                <div class="send form-inline">
                    <input type="text" class="form-control" v-model="info" @keyup.enter="sendMsg">
                    <button class="btn btn-primary" @click="sendMsg">发送</button>
                </div>
            </div>
        </div>

        <!-- pc端 -->
        <div class="row hidden-xs" style="width:90%; height: 100%">
            <div class="col-md-4" style="height: 100%; padding-right: 1%;">
                <div class="student-list" style="height: 100%">
                    <h3>师生列表</h3>
                    <ul class="pc">
                        <li v-for="item in studentList" :key="item.id" ref="li" @click="connect(item.name)"
                            v-show="item.name != $cookies.get('username')">
                            <div class="student-item">
                                <img :src="item.headIcon" alt="">
                                <span>{{item.name}}&nbsp;&nbsp;<small
                                        style="color: rgb(7, 78, 17);">(学生)</small></span>
                            </div>
                            <span class="point" v-show="item.noReadChatInfo != 0">{{item.noReadChatInfo}}</span>
                            <span class="glyphicon glyphicon-menu-right"></span>
                        </li>
                        <li v-for="item in teacherList" :key="item.id+100" ref="li" @click="connect(item.name)"
                            v-show="item.name != $cookies.get('username')">
                            <div class="student-item">
                                <img :src="item.headIcon" alt="">
                                <span>{{item.name}}&nbsp;&nbsp;<small
                                        style="color: rgb(255, 145, 0);">(教师)</small></span>
                            </div>
                            <span class="point" v-show="item.noReadChatInfo != 0">{{item.noReadChatInfo}}</span>
                            <span class="glyphicon glyphicon-menu-right"></span>
                        </li>

                    </ul>

                </div>
            </div>
            <div class="col-md-8" style="padding-bottom: 45px; height: 100%;">
                <div class="dialog-frame" style="height:100%">
                    <span>与<strong>{{nowConnectStudent}}</strong>开始聊天</span>
                    <ul ref="chatList2">
                        <li v-for="item in chatInfo" :key="item.id"
                            :style="{'flex-direction' : item.mfrom === nowConnectStudent ? 'row': 'row-reverse'}">
                            <img :src="item.mfromHeadIcon" alt=""><!--  -->
                            <span>{{item.mfrom}}</span>
                            <p>{{item.content}}</p>
                        </li>
                    </ul>
                </div>
                <div class="send form-inline">
                    <input type="text" class="form-control" v-model="info" @keyup.enter="sendMsg">
                    <button class="btn btn-primary" @click="sendMsg">发送</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../../lib/bootstrap/js/jquery.min.js'
    export default {
        data() {
            return {
                studentList: null,
                nowConnectStudent: null,
                chatInfo: [],
                info: '',
                teacherList: []
            }
        },
        methods: {
            showStudents(callback) {
                this.$http.get('student/getAll/'+this.$cookies.get("username")).then(result => {
                    this.studentList = result.body.message;
                    if(callback != undefined){
                        callback();
                    }
                });
            },
            init(){
                if (this.studentList != null) {
                    let s = this.studentList;
                    if (s[0].name != $cookies.get("username")) {
                        this.nowConnectStudent = s[0].name;
                    } else {
                        this.nowConnectStudent = s[1].name;
                    }
                }
            },
            showTeachers() {
                this.$http.get("teacher/getAll/"+this.$cookies.get("username")).then(result => {
                    this.teacherList = result.body.message;
                    console.log(result.body.message);
                });
            },
            connect(name) {
                this.nowConnectStudent = name;
                this.getInfo(name);
                this.$http.get('chatInfo/setStatus/'+name+"/"+this.$cookies.get("username")).then(result => {
                    this.showStudents();
                    this.showTeachers();
                });
            },
            sendMsg() {
                if (this.info == '') {
                    this.$message({
                        type: 'error',
                        message: '你好没有输入任何东西呢！！',
                    });
                    return;
                }
                this.$store.state.stomp.send("/chat/toOneStudent", {}, this.$cookies.get("username") + ";" + this
                    .nowConnectStudent + ";" + this.info);
                this.chatInfo.push({
                    id: this.chatInfo.length + 1,
                    mfrom: this.$cookies.get("username"),
                    mfromHeadIcon: this.$cookies.get("headIcon"),
                    mto: {
                        name: this.nowConnectStudent
                    },
                    content: this.info
                });
                this.info = '';
            },
            getInfo(nowFrient = this.nowConnectStudent) {
                this.$http.get("chatInfo/getInfo/" + nowFrient + "/" + this.$cookies.get("username")).then(result => {
                    this.chatInfo = result.body.message;
                });
            }
        },
        created() {
            this.showStudents(this.init);
            this.showTeachers();
        },
        mounted() {

        },
        watch: {
            isChange(val) {
                this.getInfo(this.nowConnectStudent);
                this.showTeachers();
                this.showStudents();
            }
        },
        computed: {
            isChange(val) {
                return this.$store.getters.getIsChange
            }
        },
        updated() {
            this.$nextTick(function () {
                this.$refs.chatList1.scrollTop = this.$refs.chatList1.scrollHeight;
                this.$refs.chatList2.scrollTop = this.$refs.chatList2.scrollHeight;
            })
        }
    }
</script>

<style lang="scss" scoped>
    .interacte {
        width: 100%;
        height: 90%;
        display: flex;
        padding-left: 20px;
        padding-right: 2px;
        justify-content: center;

        .student-list {
            width: 100%;
            flex-direction: column;
            display: flex;
            align-items: center;
            text-align: center;
            border: 1px solid #206321;
            border-radius: 5px;
            overflow: hidden;
            background-color: rgba(250, 249, 249, 0.753);

            h3 {
                display: block;
                background-color: rgba(41, 38, 38, 0.644);
                width: 100%;
                color: rgb(252, 249, 249);
                font-size: 20px;
                padding: 9px 0px;
                border-radius: 5px 5px 0 0;

            }

            ul {
                overflow-y: auto;
                display: block;
                list-style: none;
                width: 113%;

                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 40px 10px 40px;
                    border-bottom: 1px solid rgba(158, 158, 158, 0.2);
                    position: relative;
                    transition: background-color .2s;
                    animation-fill-mode: forwards;

                    .student-item {

                        display: flex;
                        align-items: center;

                        img {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            margin-right: 20px;
                        }

                        span {
                            font-size: 18px;
                            color: rgb(5, 5, 5);
                        }

                    }

                    .point{
                        display: block;
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        color: white;
                        background-color: red;
                        position: absolute;
                        right: 70px;
                    }
                }

                li:hover {
                    background-color: rgba(170, 162, 162, 0.719);
                }

            }

        }

        .dialog-frame {
            // height: 515px;
            width: 100%;
            background-color: rgba(41, 43, 40, 0.151);
            border: 1px solid #206321;
            border-radius: 5px;
            text-align: center;
            overflow: hidden;
            background-color: rgba(255, 254, 254, 0.692);

            span {
                color: rgb(248, 245, 245);
                padding: 10px 0px;
                display: block;
                background-color: rgba(0, 0, 0, 0.404);

                strong {
                    color: rgb(252, 215, 6);
                    margin: 0 10px;
                }
            }

            ul {
                width: 101.7%;
                overflow-y: auto;
                height: 92.5%;
                border-radius: 5px;
                background-color: rgba(160, 150, 150, 0.075);

                li {
                    color: white;
                    display: flex;
                    align-items: center;
                    padding: 15px 10px 15px 7px;

                    img {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin: 0 10px;
                    }

                    p {
                        padding: 6px;
                        color: black;
                        display: block;
                        background-color: rgb(252, 250, 250);
                        border: 1px solid rgba(11, 85, 33, 0.301);
                        border-radius: 5px;
                        margin: 0 20px;
                    }

                    span {
                        background-color: rgba(255, 0, 0, 0);
                        color: black;
                    }
                }
            }
        }

        .send {
            display: flex;
            justify-content: space-between;
            padding-top: 10px;
            padding-bottom: 10px;
            input {
                width: 85%;
            }

            button {
                width: 14%;
                margin-left: 3px;
            }
        }

        .glyphicon {
            color: white;
        }

        .btn-primary {
            background-color: rgb(255, 145, 0);
            border-color: rgb(187, 255, 0);
        }

        .btn-primary:hover {
            background-color: rgba(255, 208, 0, 0.966);
            border-color: yellow;
        }

        [class*='col-'] {
            padding: 0;
        }

        .form-control{
            border: 1px solid #3c763d !important
        }
    }
</style>