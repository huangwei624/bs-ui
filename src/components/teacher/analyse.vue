<template>
    <div class="analyse-container">
        <div class="analyse">
            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <div id="container1" style="width: 100%; height: 400px; padding-left:10px;"></div>
                    <!-- <span class="total">参与人数：30人</span> -->
                </div>
                <div class="col-md-6  col-xs-12">
                    <div id="container2" style="width: 100%; height: 400px;"></div>
                    <span class="total">参与人数：{{poemTotal[0]}}人</span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6  col-xs-12">
                    <div id="container3" style="width: 100%; height: 400px;"></div>
                    <span class="total">参与人数：{{poemTotal[1]}}人</span>
                </div>
                <div class="col-md-6  col-xs-12">
                    <div id="container4" style="width: 100%; height: 400px;"></div>
                    <span class="total">参与人数：{{poemTotal[2]}}人</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bookData:{},
                investigationData: [],
                poemTotal: []
            }
        },
        created() {
            this.$http.get("book/getBookChart").then(result => {
                this.bookData = result.body.message;
                this.bookData.bookVos[1].color = "#f38507";
                this.a();
            })

            this.$http.get("poem/getPercent/1").then(result => { //  给c 添加数据
                this.investigationData.push(result.body.message);
                this.getPoemTotal(1);
                this.b(); 

                this.$http.get("poem/getPercent/2").then(result => { //  给d 添加数据
                    this.investigationData.push(result.body.message);
                    this.getPoemTotal(2);
                    this.c();

                    this.$http.get("poem/getPercent/3").then(result => { //  给e 添加数据
                        this.investigationData.push(result.body.message);
                        this.getPoemTotal(3);
                        this.d();
                    });

                });

            });
            
        },
        
        methods: {
 
            a() { // 柱状图
                var chart = {
                    type: 'column'
                };
                var title = {
                    text: '对《花间集》和《花间集序》两本书的了解程度柱状图'
                };
                var subtitle = {
                    // text: 'Source: runoob.com'
                };
                var xAxis = {
                    categories: this.bookData.xaxis,
                    crosshair: true
                };
                var yAxis = {
                    min: 0,
                    allowDecimals: false,
                    title: {
                        text: '人数（人）'
                    }
                };
                var tooltip = {
                    headerFormat: '<span style="font-size:10px; margin-bottom: 20px; color: red;">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} 人</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                };
                var plotOptions = {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            verticalAlign: 'top', // 竖直对齐方式，默认是 center
                            inside: true
                        }
                    }
                };
                var credits = {
                    enabled: false
                };

                var series = this.bookData.bookVos;

                var json = {};
                json.chart = chart;
                json.title = title;
                json.subtitle = subtitle;
                json.tooltip = tooltip;
                json.xAxis = xAxis;
                json.yAxis = yAxis;
                json.series = series;
                json.plotOptions = plotOptions;
                json.credits = credits;
                $('#container1').highcharts(json);

            },

            b() { // 饼图1
                var chart = {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                };
                var title = {
                    text: '对《菩萨蛮-温庭筠》的喜欢程度饼图分析'
                };
                var credits = {
                    enabled: false
                };
                var tooltip = {
                    headerFormat: '<p style="font-size:13px;color: red;">{point.key}</p>',
                    pointFormat: '<b>{series.name}: {point.percentage:.2f}%</b>',
                    shared: true,
                    useHTML: true
                };
                var plotOptions = {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                };
                // let data = this.investigationData
                var series = [{
                    type: 'pie',
                    name: '人数占例',
                    data: this.investigationData[0]
                }];

                console.log(series[0].data)

                var json = {};
                json.chart = chart;
                json.title = title;
                json.credits = credits;
                json.tooltip = tooltip;
                json.series = series;
                json.plotOptions = plotOptions;
                $('#container2').highcharts(json);
            },

            c() { // 饼图2
                var chart = {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                };
                var title = {
                    text: '对《菩萨蛮-韦庄》的喜欢程度饼图分析'
                };
                var credits = {
                    enabled: false
                };
                var tooltip = {
                    headerFormat: '<p style="font-size:13px;color: red;">{point.key}</p>',
                    pointFormat: '<b>{series.name}: {point.percentage:.2f}%</b>',
                    shared: true,
                    useHTML: true
                };
                var plotOptions = {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                };
                var series = [{
                    type: 'pie',
                    name: '人数占例',
                    data: this.investigationData[1]
                }];

                var json = {};
                json.chart = chart;
                json.title = title;
                json.credits = credits;
                json.tooltip = tooltip;
                json.series = series;
                json.plotOptions = plotOptions;
                $('#container3').highcharts(json);
            },

            d() { // 饼图2
                var chart = {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                };
                var title = {
                    text: '对《诉忠情-顾夐》的喜欢程度饼图分析'
                };
                var credits = {
                    enabled: false
                };
                var tooltip = {
                    headerFormat: '<p style="font-size:13px;color: red;">{point.key}</p>',
                    pointFormat: '<b>{series.name}: {point.percentage:.2f}%</b>',
                    shared: true,
                    useHTML: true
                };
                var plotOptions = {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                };
                var series = [{
                    type: 'pie',
                    name: '人数占例',
                    data: this.investigationData[2]
                }];

                var json = {};
                json.chart = chart;
                json.title = title;
                json.credits = credits;
                json.tooltip = tooltip;
                json.series = series;
                json.plotOptions = plotOptions;
                $('#container4').highcharts(json);
            },

            getPoemTotal(poemId){
                this.$http.get("poem/getTotal/"+poemId).then(result => {
                    this.poemTotal.push(result.body.message);
                });
            }
        }
    }
</script>

<style>
    .analyse-container {
        width: 100%;
        height: 100%;
        position: relative;

    }

    .analyse {
        background-color: white;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    .analyse [class*='col-'] {
        /* padding: 10px; */
        padding: 0;
        background-color: #ff990088;
        border: 1px solid rgba(158, 148, 148, 0.178);
        margin: 0;
        position: relative;
    }

    .analyse .total {
        position: absolute;
        right: 30px;
        bottom: 18px;
        color: #f38507;
        font-size: 13px;
        font-weight: bold;
    }

    .analyse table tr,
    .analyse table th,
    .analyse table td,
    .analyse table {
        border: 1px solid rgba(0, 0, 0, 0) !important;
        /* background-color: #f38507; */
    }

    .row{
        /* padding: 0 20px !important; */
    }
</style>