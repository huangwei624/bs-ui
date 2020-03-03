<template>
    <div class="index">
        <box-teacher></box-teacher>
        <box-student></box-student>
    </div>
</template>
<script>
    import teacher from '../components/role/teacher.vue'
    import student from '../components/role/student.vue'

    export default {
        mounted() {
            layui.use("element", () => {
                var element = layui.element;
            });

            // this.$store.dispatch("connect");    // 异步建立websocket连接
        },
        components: {
            'box-teacher': teacher,
            'box-student': student 
        }
    };
</script>

<style lang="scss">

</style>