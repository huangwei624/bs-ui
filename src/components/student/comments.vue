<template>
    <div class="comments-container">
        <div class="row comments hidden-xs hidden-sm"><!-- pc端 -->
            <div class="col-md-8 col-xs-12 cm">
                <div class="comments-panel" ref="panel">
                    <ul>
                        <li v-for="item in commentList" :key="item.id">
                            <div class="author">
                                <div>
                                    <img :src="item.student.headIcon" alt="">
                                    <span>{{item.student.name}}</span>
                                </div>
                                <span>{{item.commentTime | dateFormat}} </span>
                            </div>
                            <div class="content">
                                <p>{{item.title}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-md-8 col-xs-12 comment-send">
                <textarea class="form-control" v-model="content" placeholder="大胆说出你的想法......"
                    @keyup.enter="commentSend"></textarea>
                <button class="btn btn-primary" @click="commentSend">发表评论</button>
            </div>
        </div>
        <div class="row comments visible-xs visible-sm"><!-- 移动端 -->
            <div class="col-xs-12 cm" style="padding-top:10px;">
                <div class="comments-panel" ref="panel">
                    <ul>
                        <li v-for="item in commentList" :key="item.id">
                            <div class="author">
                                <div>
                                    <img :src="item.student.headIcon" alt="">
                                    <span>{{item.student.name}}</span>
                                </div>
                                <span>{{item.commentTime | dateFormat}} </span>
                            </div>
                            <div class="content">
                                <p>{{item.title}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-xs-12 comment-send">
                <textarea class="form-control" v-model="content" placeholder="大胆说出你的想法......"
                    @keyup.enter="commentSend"></textarea>
                <button class="btn btn-primary" @click="commentSend">发表评论</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        IsPC
    } from '../../util/utils.js'
    import jquery from 'jquery'
    export default {
        data() {
            return {
                content: '',
                commentList: null
            }
        },
        methods: {
            commentSend() {
                if (this.content == '') {
                    this.$message({
                        type: 'error',
                        message: '你好没有输入任何东西呢！！',
                    });
                    return;
                }
                this.$http.post('comment/saveComment', {
                    content: this.content,
                    username: this.$cookies.get("username")
                }).then(result => {
                    this.content = '';
                    $(this.$refs.panel).scrollTop(0);
                    this.showComments();
                });
            },
            showComments() {
                this.$http.get('comment/getAll').then(result => {
                    this.commentList = result.body.message;
                });
            },
            phoneAdapt() {
                if (!IsPC()) {
                    // this.$refs.panel.style.height = "515px";
                    $(".comments-panel").css({
                        "width": "99.5%"
                    });
                } else {
                    // this.$refs.panel.style.height = "500px";
                    $(".comments-panel").css({
                        "width": "102%"
                    });
                }
            }
        },
        created() {
            this.showComments();
        },
        mounted() {
            this.phoneAdapt();
        }
    }
</script>

<style lang="scss" scoped>
    .comments-container {
        // padding: 0 0 0 10px;
        padding-left: 2px;
        padding-right: 2px;
        width: 100%;
        height: 95%;
        display: flex;
        justify-content: center;
        align-items: center;

        .comments {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;

            .cm {
                overflow: hidden;
                height: 89%;
            }

            .comments-panel {
                height: 100%;
                /* 500, 580 */
                border-radius: 5px;
                background-color: rgba(255, 251, 0, 0);
                overflow-y: auto;
                width: 99.5%;
                /* 102.5 */

                ul {
                    li {
                        border-radius: 5px;
                        padding: 10px 25px 10px 10px;
                        background-color: rgba(230, 165, 43, 0.664);
                        border: 1px solid white;
                        margin-bottom: 5px;


                        .author {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            div{
                                display: flex;
                                align-items: center;
                            }

                            img {
                                width: 25px;
                                height: 25px;
                                border-radius: 50%;
                                margin-right: 10px;
                            }

                        }

                        .content {
                            padding-top: 15px;
                            padding-bottom: 5px;
                            color: white;
                            color: rgb(7, 78, 17);
                            font-size: 16px;
                            word-break: break-all;
                            padding-left: 20px;
                        }
                    }
                }

            }

            .comment-send {
                margin-top: 10px;
                display: flex;
                height: 13%;

                textarea {
                    max-height: 100%;
                    min-height: 100%;
                    max-width: 100%;
                    margin-right: 10px;
                    border: 1px solid rgb(255, 187, 0);
                }
            }
        }

    }

    [class*='col-'] {
        padding: 0;
    }

    .row {
        margin: 0 !important;
        padding: 0 !important;
    }
</style>