// js入口文件

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
//import { Radio,  Switch} from 'mint-ui'
import app from './app.vue'
import router from './router.js'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import moment from 'moment'
import Sockjs from '../lib/socket/sockjs.min.js'
import Stomp from 'stompjs'
import jquery from 'jquery'
import {configPath} from '../config.js'

import 'element-ui/lib/theme-chalk/index.css'
import '../lib/layui/css/layui.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex) // 创建 vuex , 为所有的组件提供公共的数据
Vue.use(VueCookies)
Vue.use(ElementUI)

//Vue.component(Radio.name, Radio); // 引入mint-ui的组件
//Vue.component(Switch.name, Switch); // 引入mint-ui的组件

Vue.http.options.root = configPath; // 全局配置根路径 



const store = new Vuex.Store({ // 配置状态仓库
    state: {
        stomp: null,
        ischange: false,
        chatInfo: null,
        message: null,
        nowConnectStudent: null,
        notify: null,
        unRead: false
    },
    mutations: {
        updatedIsChange(state) {
            state.ischange = !state.ischange;
        },
        showNotify(state) {
            layui.use('layer', function(){
                var layer = layui.layer;
                var obj = state.notify;
                layer.open({
                    type: 1,
                    title: ['来通知啦，注意查看哦！','text-align: center; padding-right: 20px; word-break: break-all'],
                    closeBtn: false,
                    area: '300px;',
                    shade: 0.8,
                    id: 'LAY_layuipro',
                    btn: ['我知道啦'],
                    btnAlign: 'c',
                    moveType: 0,
                    maxWidth: 400,
                    content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300; font-size:15px">收到来自&nbsp;&nbsp;<span style="color: rgb(255, 145, 0); word-break: break-all">'
                    +obj.teacherName+'</span>&nbsp;&nbsp;老师的通知！！<br><br>标题：<span style="color: rgb(255, 145, 0); word-break:break-all">'
                    +obj.title+'</span><br><br>内容：<span style="color: rgb(255, 145, 0); word-break: break-all">'
                    +obj.content+'</span><br></div>',
                    success: function () {
                    }
                });
            })
        }
    },
    actions: {
        connect(content) {
            content.state.stomp = Stomp.over(new Sockjs(Vue.http.options.root + "/hw-sat/webSocket"));
            content.state.stomp.connect({}, success => {
                console.log("连接成功"); // 订阅点对点聊天路径
                content.state.stomp.subscribe("/topic/chat/toOneStudent/" + $cookies.get("username"), message => {
                    content.commit("updatedIsChange");  // 聊天推送
                });
                content.state.stomp.subscribe("/topic/chat/notify/" + $cookies.get("cate"), message => {
                    content.state.notify = JSON.parse(message.body).message
                    content.commit("showNotify");   // 向学生端推送
                    content.state.unRead = true;
                }, error => {

                });
            })
        },
    },
    getters: {
        getIsChange(state) {
            return state.ischange;
        }
    }
});

Vue.http.interceptors.push(function (request, next) { // 支持跨域cookie 传递
    // 跨域携带cookie
    request.credentials = true;
    next()
})


router.beforeEach((to, from, next) => { // 配置导航守卫， 过滤 路由
    if (to.name == 'login') {
        if($cookies.get("username") == null){
            next();
        }else{
            $cookies.get("cate") == '0' ? router.push("/role/student") : router.push("/role/teacher");
            return;
        }
        next();
        return
    }

    if (to.meta.requiresAuth == true) { // 如果页面需要登录认证， 检查浏览器cookie 有没有这个用户名
        if ($cookies.get("username") == null) { // 如果没有这个用户， 跳转到 login 页面
            next("/login")  // 没有登录， 跳到登录界面

        } else {  // 登录后开启websocket
            store.state.stomp == null ? store.dispatch("connect") : console.log("websocket is connected!"); // 异步开启websocket
            next();

        }
    } else {
        next();
    }
})

// 格式化日期过滤器
Vue.filter("dateFormat", function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    if (dataStr === undefined || dataStr === '' || dataStr === null) {
        return moment(new Date()).format(pattern);
    }
    return moment(dataStr).format(pattern);
});

// 文本缩略过滤器
Vue.filter("miniContext", function (dataStr, size=40) {
    var length = dataStr.length;
    if(length <= size ) return dataStr;
    return dataStr.substring(0, size) + ".....";
});

// Vue.config.devtools = true

var vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    render: c => c(app),
    router, // 绑定路由
    store // 开启状态管理
});