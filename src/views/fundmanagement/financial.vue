<template>
    <div class="search-box">
        <time-range @ddd="ddd">
        </time-range>
        <input type="submit" value="搜索" class="btn btn-success" @click="search()" style="margin-right:50px;">
    </div>

    <table class="table table-bordered table-striped  mytable">
        <thead>
            <th style="width: 200px">日期</th>
            <th>通过审核的总收款金额（元）</th>
            <th>通过审核的天猫账户收款金额</th>
            <th>通过审核的支付宝收款金额</th>
            <th>通过审核的微信收款金额</th>
            <th>通过审核的APP支付宝收款金额</th>
            <th>通过审核的APP微信收款金额</th>
            <th>通过审核的银行卡转账收款金额</th>
            <th>退款到支付源金额</th>
        </thead>
        <tbody v-el:tt>
        <tr v-for="item of dataList">
            <td>{{item.createTime.split(" ")[0]}}</td>
            <td>{{item.total}}</td>
            <td>{{item.tallAccount}}</td>
            <td>{{item.payAccount}}</td>
            <td>{{item.wxAccount}}</td>
            <td>{{item.appPayAccount}}</td>
            <td>{{item.appWxAccount}}</td>
            <td>{{item.unionPay}}</td>
            <td>{{item.refundAmount}}</td>
          </tr>
        <tr v-show="totalState">
            <td style="font-weight: bold">总计</td>
            <td>{{totalList.total}}</td>
            <td>{{totalList.tallAccount}}</td>
            <td>{{totalList.payAccount}}</td>
            <td>{{totalList.wxAccount}}</td>
            <td>{{totalList.appPayAccount}}</td>
            <td>{{totalList.appWxAccount}}</td>
            <td>{{totalList.unionPay}}</td>
            <td>{{totalList.refundAmount}}</td>
        </tr>
        </tbody>
    </table>
    <div class="order-page" v-if="total" style="display: flex;">
        <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
        </zpagenav>
    </div>


    <!--<table class="table table-bordered table-striped  mytable">-->
        <!--<tbody v-el:tt>-->
          <!--&lt;!&ndash; <tr v-for="item of list"> &ndash;&gt;-->
          <!--<tr>-->
              <!--<td>总计</td>-->
              <!--<td>{{totalList.total}}</td>-->
              <!--<td>{{totalList.tallAccount}}</td>-->
              <!--<td>{{totalList.payAccount}}</td>-->
              <!--<td>{{totalList.wxAccount}}</td>-->
              <!--<td>{{totalList.appPayAccount}}</td>-->
              <!--<td>{{totalList.appWxAccount}}</td>-->
              <!--<td>{{totalList.unionPay}}</td>-->
              <!--<td>{{totalList.refundAmount}}</td>-->
          <!--</tr>-->
        <!--</tbody>-->
    <!--</table>-->
</template>
<script>
    import pages from "vue-pagenav"
    import timeRange from "components/timeRange"
    import {
        getResponses,
    } from "../../api"
    export default {
        data() {
            return {
                searchStartTime:"",
                searchEndTime:"",
                dataList:[],
                totalList:{},
                totalState:false,
                page: 1,
                pageSize: 10,
                total: 0,
                maxLink: 0,
            }
        },
        route: {
            data() {

            }
        },
        components: {
            pages,
            timeRange,
        },
        methods: {
            serialize(hash) {
                let result = []

                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })

                return result.join("&")
            },
            ddd(start, end) {
                if (start && start.length === 19) {
                    this.searchStartTime = start
                } else {
                    this.searchStartTime = ''
                }

                if (end && end.length === 19) {
                    this.searchEndTime = end
                } else {
                    this.searchEndTime = ''
                }
            },
            async search(){
                let params={
                   pageIndex:this.page,
                    pageSize:this.pageSize,
                }
                if(this.searchStartTime){
                    params.startTime=this.searchStartTime
                }
                if(this.searchEndTime){
                    params.endTime=this.searchEndTime
                }
                let data = await getResponses('CapitalCheck/capitalCheckList.json',this.serialize(params));
                if(data.code===0){
                    this.dataList=data.list;
                    this.total=data.content.count;
                    if(data.content.count){
                        this.totalState=true;
                        this.totalList=data.capitalList;
                    }else{
                        this.totalState=false;
                        this.totalList={};
                    }
                }
            },
            pageHandler: function(page) {
                this.page = page
                this.search()
            },
            createUrl: function(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },
        },
        ready() {
            document.title = "财务对账"
            this.search()
        }
    }
</script>
<style scoped>

</style>
