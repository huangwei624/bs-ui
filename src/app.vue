<template>
    <router-view></router-view>
 </template>

<script>
export default {
    
}
</script>

<style lang="scss">
    .layui-layer-title{
        padding: 0;
    }
    .layui-layer-btn .layui-layer-btn0{
        background-color: rgb(255, 145, 0) !important;
        border-color: yellow !important;
    }
    .btn-primary:active,
    .btn-primary.active,
    .open > .dropdown-toggle.btn-primary {
        color: #fff;
        background-color: rgb(255, 145, 0) !important;
        border-color: rgb(255, 145, 0) !important;
    }
    .btn-primary.focus, .btn-primary:focus{
        color: #fff;
        background-color: rgb(255, 123, 0) !important;
        border-color: rgb(255, 94, 0) !important;
    }

    .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
        vertical-align: middle !important;
        word-break: break-all;
        max-width: 550px;
    }

    .navbar {
        z-index: 1000;
        position: relative;
        min-height: 50px;
        margin-bottom: 20px;
        border: 1px solid transparent;
    }

    .layui-layout-admin .layui-side {
        background: no-repeat url(./images/side2.png) !important;
        background-size: 200px 500px  !important;
        background-position: left bottom 20px !important;
    }

    .layui-laypage {
        margin: 0 !important;
    }

    .layui-laypage a, .layui-laypage button, .layui-laypage input, .layui-laypage select{
        border: 1px solid rgba(255, 0, 0, 0.568) !important;
    }

    [class*='col-']{
        padding:0;
        margin: 0;
    }

    .layui-layout-admin .layui-logo {
        width: 300px !important;
    }
    
</style>