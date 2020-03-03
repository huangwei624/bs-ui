import VueRouter from 'vue-router'

import login from './components/login.vue'
import register from './components/register.vue'
import index from './components/index.vue'
import student from './components/role/student.vue'
import interacte from './components/student/interacte.vue'
import comments from './components/student/comments.vue'
import readNotify from './components/student/readNotify.vue'
import teacher from './components/role/teacher.vue'
import notify from './components/teacher/notify.vue'
import commentMange from './components/teacher/commentMange.vue'
import studentMange from './components/teacher/studentMange.vue'
import materialMange from './components/teacher/materialManage.vue'
import material from './components/student/material.vue'

var router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['./components/login.vue'], resolve)
        },
        {
            path: '/register',
            component: resolve => require(['./components/register.vue'], resolve),
            name: 'register'
        },
        {
            path: '/index',
            component: resolve => require(['./components/index.vue'], resolve),
            name: 'index',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/role/student',
            component: student,
            redirect: '/role/student/comments',
            children: [{
                path: 'interacte',
                component: resolve => require(['./components/student/interacte.vue'], resolve),
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'comments',
                component: resolve => require(['./components/student/comments.vue'], resolve),
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'readNotify',
                component: resolve => require(['./components/student/readNotify.vue'], resolve),
                meta: {
                    requiresAuth: true
                }
            },{
                path: 'material',
                component: resolve => require(['./components/student/material.vue'], resolve),
                meta: {
                    requiresAuth: true
                }
            }]
        },
        {
            path: '/role/teacher',
            component: teacher,
            redirect: '/role/teacher/notify',
            children: [{
                path: 'notify',
                component: resolve => require(['./components/teacher/notify.vue'], resolve),
                meta: {
                    requiresAuth: true
                }
            },{
                path: 'interacte',
                component: resolve => require(['./components/student/interacte.vue'], resolve),
                meta: {
                    requiresAuth: true
                }
            },{
                path: 'commentMange',
                component: resolve => require(['./components/teacher/commentMange.vue'], resolve),
                meta: {
                    requiresAuth: true
                }
            },{
                path: 'studentMange',
                component: resolve => require(['./components/teacher/studentMange.vue'], resolve),
                meta: {
                    requiresAuth: true
                }
            },{
                path: 'material',
                component: resolve => require(['./components/teacher/materialManage.vue'], resolve),
                meta: {
                    requiresAuth: true
                }
            },{
                path: 'analyse',
                component: resolve => require(['./components/teacher/analyse.vue'], resolve),
                meta: {
                    requiresAuth: true
                }
            }]
        }
    ],
    linkActiveClass: 'mui-active' // 手动设置 被激活的 路由链接的高亮类名
});

export default router;