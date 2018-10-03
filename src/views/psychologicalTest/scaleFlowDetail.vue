<template>
    <div>
        <button class="btn-success" style="float: right;margin: 30px 0" @click="downloadExcel">导出Excel</button>
        <a href="javascript:;" v-el:a></a>
        <table class="order-table">
            <thead>
            <th>用户昵称</th>
            <th>所测量表</th>
            <th>题目</th>
            <th>选项</th>
            <th>测试时间</th>
            </thead>
            <tbody>
                <tr v-for="item in scaleFlowDetailList" class="trbox">
                    <td v-text="username"></td>
                    <td v-text="userTestName"></td>
                    <td>
                        <p>{{item.problemWord}}</p>
                        <img :src=" 'http://picture.120xinmao.com/' + item.problemPicSrc" alt="" style="width: 80px;height: 60px;display: inline">
                    </td>
                    <td>
                        <p>{{item.optionWord}}</p>
                        <img :src=" 'http://picture.120xinmao.com/' + item.optionPicSrc" alt="" style="width: 80px;height: 60px;display: inline">
                    </td>
                    <td>{{item.createTime|time}}</td>
                </tr>
            </tbody>
        </table>
        <div class="order-page">
            <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
            </zpagenav>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Vue from "vue"
    import {getSource,getSources,getSourcesExcel} from "../../api"
    import zpagenav from "vue-pagenav"
    Vue.use(zpagenav)
    Vue.filter('time',function (value) {
        var date = new Date(value);
        var Y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            H = date.getHours(),
            i = date.getMinutes(),
            s = date.getSeconds();

        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (i < 10) {
            i = '0' + i;
        }
        if (s < 10) {
            s = '0' + s;
        }
        var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
        return t;
    });
    export default {
        data(){
            return{
                imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
                pageCount: 10,
                page: 1,
                pageSize: 10,
                total: 1,
                maxLink: 0,

                id:window.location.pathname.split('/')[2],
                username:"",
                userTestName:"",
                scaleFlowDetailList:[],
            }
        },
        methods:{
            async getScaleFlowDetail(){
                let data = await getSources("/orderCenter/testScaleOrderTitle/getAllMessage",`pageIndex=${this.page}&pageSize=10&testScaleOrderId=${this.id}`);
                if(data.code===0){
                    this.scaleFlowDetailList=data.contentList;
                    this.username=data.userName;
                    this.userTestName=data.testScaleName;
                    this.total=data.count;
                }else{
                    alert(`errMsg:${data.msg}`)
                }
            },
            async downloadExcel(){
                let data = await getSourcesExcel("/orderCenter/testScaleOrderTitle/exportOrderTitleMessage",`testScaleOrderId=${this.id}`);

                let blob = new Blob([data], {
                        'type': 'application/msexcel'
                    }),
                    a = this.$els.a

                a.href = window.URL.createObjectURL(blob)
                a.download = `用户订单详情.xls`
                a.click()
            }
        },
        ready(){
            this.getScaleFlowDetail();
        }
    }
</script>
<style scoped>
    .trbox td{
        text-align: center;
    }
</style>