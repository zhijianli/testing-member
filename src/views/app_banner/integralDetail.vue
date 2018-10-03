<template>
    <div>
        <div class="container-fluid">
            <div id="search" class="title" style="margin-bottom: 20px">
                <div class="normal-div-ib">
                    <span class="normal-span-mr">兑换时间：</span>
                    <time-range @ddd="ddd">
                    </time-range>
                </div>


                <input type="submit" value="查询" class="btn btn-success" @click="search()" style="margin-right:50px;">

            </div>

            <!--<audio id="audio" src="https://120xinmao.com/protocol/01.aac" controls="controls">-->
            <!--您的浏览器不支持 audio 标签。-->
            <!--</audio>-->

            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                <thead>
                <tr>
                    <th style="width: 50px">序号</th>
                    <th>兑换时间</th>
                    <th>昵称</th>
                    <th>手机号</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in data">
                    <td> {{ item.dbid }} </td>
                    <td> {{ item.createTime }} </td>
                    <td> {{ item.nickname }} </td>
                    <td> {{ item.mobilePhone }} </td>
                </tr>

                </tbody>
            </table>



        </div>

        <!--分页-->
        <div class="order-page" v-if="total" style="display: flex;">
            <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
            </zpagenav>
        </div>


    </div>
</template>

<script>
    import timeRange from "components/timeRange"
    import {
        getResponses,
    } from "../../api"
    import { serialize } from "../../utils"
    export default {
        data() {
            return {

                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                pageSize: 10,
                total: 10, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5


                data: [],
                searchWord:"",
                startTime: "",
                endTime: "",

                id: window.location.pathname.split('/')[2],



            }
        },
        components:{
            timeRange
        },
        filters: {

        },
        methods: {
            ddd(start, end) {
                if (start && start.length === 19) {
                    this.startTime = start
                } else {
                    this.startTime = ''
                }

                if (end && end.length === 19) {
                    this.endTime = end
                } else {
                    this.endTime = ''
                }
            },
            pageHandler: function(page) {
                this.page = page
                this.getExchangePointList()
            },
            createUrl: function(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },

            search() {
                this.page = 1
                this.getExchangePointList()
            },

            dealWith(reportId) {
                this.reportWindowState = true
                this.reportId = reportId
            },

            paramsFn() {
                let params = {}
                this.startTime && (params.startTime = this.startTime);
                this.endTime && (params.endTime = this.endTime);
                params.pageIndex = this.page
                params.pageSize = this.pageSize
                params.pid = this.id

                return params

            },

            serialize(obj) {

                let str = ""
                for (let key in obj) {
                    str += `${key}=${obj[key]}&`
                }
                str = str.slice(0, -1)
                return str

            },

            // 接口名称 获取举报列表
            async getExchangePointList() {
                const data = await getResponses('CapitalPoint/exchangePointList.json', this.serialize(this.paramsFn()))
                if (data.code == 0) {
                    this.data = data.content.list
                    this.total = data.content.count
                } else {
                    alert(data.msg)
                }
            },


        },
        ready() {
            this.getExchangePointList()
        }
    }
</script>

<style scoped>

</style>
