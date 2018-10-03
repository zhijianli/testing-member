<template>
    <div>
        <div class="container-fluid">
            <div id="search" class="title" style="margin-bottom: 20px">
                <div class="normal-div-ib">
                    <span class="normal-span-mr">举报时间：</span>
                    <time-range @ddd="ddd">
                    </time-range>
                </div>


                <span class="normal-span-mr">状态：</span>
                <select v-model="reportState">
                    <option value="">全部</option>
                    <option v-for="(index, item) in reportStateList" :key="index" :value="index">{{item}}
                    </option>
                </select>

                <input type="submit" value="查询" class="btn btn-success" @click="search()" style="margin-right:50px;">

            </div>

            <!--<audio id="audio" src="https://120xinmao.com/protocol/01.aac" controls="controls">-->
                <!--您的浏览器不支持 audio 标签。-->
            <!--</audio>-->

            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                <thead>
                    <tr>
                        <th style="width: 200px">举报时间</th>
                        <th>举报人</th>
                        <th>举报人手机号</th>
                        <th>类别</th>
                        <th>详情描述</th>
                        <th>来源路径</th>
                        <th>被举报人手机号</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data">
                        <td>{{ item.createTime }}</td>
                        <td>{{ item.reportName }}</td>
                        <td>{{ item.mobilePhone }}</td>
                        <td>{{ item.reportTypeStr }}</td>
                        <td>{{ item.remarks }}</td>
                        <td>{{ item.sourceStr }}</td>
                        <td>{{ item.rmobilePhone }}</td>
                        <td>{{ reportStateList[item.status] }}</td>
                        <td>
                            <span v-if="item.status === 0" class="normal-operate-state" @click="dealWith(item.reportId)">处理</span>
                            <span v-else>
                                已处理
                            </span>
                        </td>
                    </tr>

                </tbody>
            </table>



        </div>

        <!--分页-->
        <div class="order-page" v-if="total" style="display: flex;">
            <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
            </zpagenav>
        </div>

        <!--处理弹窗-->
        <div class="dialog-wrapper" v-if="reportWindowState">
            <div class="dialog-container2">
                <div style="display: flex; justify-content: flex-end;font-size: 24px;"><span @click="reportWindowState = false" style="cursor: pointer;margin-right: 10px;">X</span></div>
                <div class="btn-wrapper">
                    <div @click="handelReport(2)">举报有效</div>
                    <div @click="handelReport(1)">举报无效</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import timeRange from "components/timeRange"
    import {
        getResponse,
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
                reportState: '',
                reportStateList: ['待处理', '举报无效', '举报有效'],
                reportWindowState: false,

                reportId: '',


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
                this.getReportList()
            },
            createUrl: function(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },

            search() {
                this.page = 1
                this.getReportList()
            },

            dealWith(reportId) {
               this.reportWindowState = true
                this.reportId = reportId
            },

            paramsFn() {
                let params = {}
                this.startTime && (params.startDate = this.startTime);
                this.endTime && (params.endDate = this.endTime);
                params.pageIndex = this.page
                params.pageSize = this.pageSize
                // params.status = this.reportState
                if (this.reportState || this.reportState === 0) {
                    params.status = this.reportState
                }

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

            async getReportList() {
                const data = await getResponses('depression/member/getMemberReportRecord.json', this.serialize(this.paramsFn()))
                if (data.code == 0) {
                    this.data = data.lists
                    this.total = data.count
                } else {
                    alert(data.msg)
                }
            },

            // 接口名称 处理举报
            async handelReport(id) {
                const data = await getResponses('depression/member/aduitReport.json', `reportId=${this.reportId}&status=${id}`)
                if (data.code == 0) {
                    this.reportWindowState = false
                    this.getReportList()
                } else {
                    alert(data.msg)
                }
            }



        },
        ready() {
           this.getReportList()
        }
    }
</script>

<style scoped>

</style>
