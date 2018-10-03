<style>
    .input{
        width: 186px;
    }
    .power {
        display: flex;
        margin-top: 20px;

    }
    .power li {
        width: 140px;
        height: 40px;
        background: #fff;
        color: #000;
        font-size: 14px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #666;
        border-right: 0;
    }

    .power li:last-child {
        border-right: 1px solid #666;
    }

    .power li.show {
        background: #169BD5;
        color: #fff;
    }
    .timeTop {
        display: flex;
        margin-top: 20px;
    }
    .infoMain{

    }

    .infoMain ul{
        margin-top: 20px;
        margin-left: 30px;
    }
    .infoMain ul li{
        margin-bottom: 10px;
    }
</style>
<template>
    <div class="widget-box row-fluid" style="padding: 20px">
        
        <ul class="power">
            <li :class="{'show': switchTab === item.id }" @click="tab(item.id)" v-for="item in assistantTeam">{{item.name}}</li>
            <!--<li :class="{'show': switchTab === 1 }" @click="tab(1)">天猫团队</li>-->
            <!--<li :class="{'show': switchTab === 2 }" @click="tab(2)">团队</li>-->
        </ul>
        <div class="timeTop">
            <div style="margin-right: 25px;">时间：</div>
            <input class="input" size="50" type="text" @click.stop="open($event,'picker1')"
                   v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">
            ——
            <input class="input" size="50" type="text" @click.stop="open($event,'picker2')"
                   v-model="calendar.items.picker2.value" placeholder="结束时间" id="end" name="end">
            <calendar
                    :show.sync="calendar.show"
                    :type="calendar.type"
                    :value.sync="calendar.value"
                    :x="calendar.x"
                    :y="calendar.y"
                    :begin.sync="calendar.begin"
                    :end.sync="calendar.end"
                    :range.sync="calendar.range"
                    :weeks="calendar.weeks"
                    :months="calendar.months"
                    :sep="calendar.sep">

            </calendar>
            <div style="margin-left: 25px">
                <input type="submit" value="搜索" class="btn btn-success" @click=" searchFn()">
            </div>
        </div>
        <div class="infoMain">
            团队名称：{{singleCrmClueReportDetailDTO.assisTantrName}}
            <ul>
                <li>处理线索总数：{{singleCrmClueReportDetailDTO.crmClueCount}}条</li>
                <li>主动放弃线索：{{singleCrmClueReportDetailDTO.cancelCreCalCount}}条</li>
                <li>系统放弃线索：{{singleCrmClueReportDetailDTO.sysCancelCrmClueCount}}条</li>
                <li>新增商机：{{singleCrmClueReportDetailDTO.addOpportunitiesCount}}条</li>
                <li>新增客户：{{singleCrmClueReportDetailDTO.addCustomerCount}}人</li>
                <li>退单客户：{{singleCrmClueReportDetailDTO.cancelCustomerCount}}人</li>
                <li>下单数量：{{singleCrmClueReportDetailDTO.quantity}}人</li>
                <li>订单总金额：{{singleCrmClueReportDetailDTO.totalAmount}}元</li>
                <li>客单价：{{singleCrmClueReportDetailDTO.price}}元</li>
                <li>退单总金额：{{singleCrmClueReportDetailDTO.cancelTotalAmount}}元</li>
                <li>实收总金额：{{singleCrmClueReportDetailDTO.overTotalAmount}}元</li>
                <li>共跟进次数（写了跟进记录的无论是否放弃都算）：{{singleCrmClueReportDetailDTO.allCrmClueCount}}次</li>
            </ul>
        </div>
        <table class="table table-bordered table-striped" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>账号</th>
                <th>助理名称</th>
                <th>处理线索</th>
                <th>主动放弃线索</th>
                <th>系统放弃线索</th>
                <th>新增商机</th>
                <th>新增客户</th>
                <th>下单人数</th>
                <th>订单数</th>
                <th>订单总额</th>
                <th>客单价</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
                <td>{{ item.customer_mobile_phone }}</td>
                <td>{{ item.assisTantrName }}</td>
                <td>{{ item.crmClueCount }}</td>
                <td>{{ item.cancelCreCalCount }}</td>
                <td>{{ item.sysCancelCrmClueCount }}</td>
                <td>{{ item.addOpportunitiesCount }}</td>
                <td>{{ item.addCustomerCount }}</td>
                <td>{{ item.userAddress }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.totalAmount }}</td>
                <td>{{ item.price }}</td>

                <!--<td>{{ item.paymentMethod}}</td>-->
            </tr>
            </tbody>
        </table>
        <div class="page">
            <div id="test">
                <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"
                          :page-handler="pageHandler" :create-url="createUrl">
                </zpagenav>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import Vue from "vue"
    import zpagenav from "vue-pagenav"

    import calendar from "../../calendar.vue"
    import moment from "moment"

    import {
        getResponse,
        getResponses,
        getCourse
    } from "../../api"
    import {
        serialize
    } from "../../utils"

    Vue.use(zpagenav)

    export default {

        data() {
            return {
                calendar: {
                    show: false,
                    x: 0,
                    y: 0,
                    picker: "",
                    type: "date",
                    begin: "",
                    end: "",
                    value: "",
                    weeks: [],
                    months: [],
                    sep: "-",
                    range: false,
                    items: {
                        // 单选模式
                        picker1: {
                            type: "date",
                            end: moment().format().split('T')[0],
                            value: "",
                            sep: "-",
                            weeks: ['日', '一', '二', '三', '四', '五', '六'],
                            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        },
                        picker2: {
                            value: this.start,
                            sep: "-",
                            begin: this.start
                        }
                    }
                },
                imgPre: `http://${process.env.NODE_ENV == 'production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
                words: "",
                data: [],
                //分页参数
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                pageSize:10,
                maxLink: 10, //how many links to show, must not less than 5,  default is 5


//
                list: [],
                switchTab:'',
                assistantTeam:[],
                singleCrmClueReportDetailDTO:{},

            }
        },
        watch: {
            'calendar.value': function (value) {
                this.calendar.items[this.calendar.picker].value = value
                this.calendar.picker == 'picker1' ? this.start = value + ' 00:00:00' : this.end = value + ' 23:59:59'
            },
            page() {
                let paramsObj = {}
                paramsObj.pageNum=this.page;
                paramsObj.pageSize=this.maxLink;
                paramsObj.userId=sessionStorage.userId;
                if(this.start){
                    paramsObj.start_time=this.start;
                }if(this.end){
                    paramsObj.end_time=this.end;
                }
                this.MemberList(this.serialize(paramsObj))
            }
        },
        components: {

            calendar
        },
        methods: {
            // 打开显示选择器
            open(e, type) {
                // 设置类型
                this.calendar.picker = type
                this.calendar.type = this.calendar.items[type].type
                this.calendar.range = this.calendar.items[type].range
                this.calendar.begin = this.calendar.items[type].begin
                this.calendar.end = this.calendar.items[type].end
                this.calendar.value = this.calendar.items[type].value
                // 可不用写
                this.calendar.sep = this.calendar.items[type].sep
                this.calendar.weeks = this.calendar.items[type].weeks
                this.calendar.months = this.calendar.items[type].months

                this.calendar.show = true
                this.calendar.x = e.target.offsetLeft
                this.calendar.y = e.target.offsetTop + e.target.offsetHeight + 8
            },

            tab(id) {
                this.switchTab = id;
                let paramsObj = {}
                paramsObj.pageNum=this.page;
                paramsObj.pageSize=this.maxLink;
                paramsObj.userId=sessionStorage.userId;
                if(this.start){
                    paramsObj.start_time=this.start;
                }if(this.end){
                    paramsObj.end_time=this.end;
                }if(this.switchTab){
                    paramsObj.teamId=this.switchTab;
                }

                this.MemberList1(this.serialize(paramsObj))
            },


            pageHandler: function (page) {
                this.page = page
//                this.getExpertsListByTagId()
            },
//            createUrl: function (unit) {
//                return unit.page > 1 ? '#page=' + unit.page : '#'
//            },

            searchFn() {
                this.page = 1
                this.selectPersonList = []
                this.search()
            },
            search() {
                let paramsObj = {}
                paramsObj.pageNum=this.page;
                paramsObj.pageSize=this.maxLink;
                paramsObj.userId=sessionStorage.userId;
                if(this.start){
                    paramsObj.start_time=this.start;
                }if(this.end){
                    paramsObj.end_time=this.end;
                }if(this.switchTab){
                    paramsObj.teamId=this.switchTab;
                }

                this.MemberList(this.serialize(paramsObj))
            },
            async MemberList1(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("crm/clueReport/getTeamReportDetailInfo", params);


                if (data.code === 0) {
                    this.singleCrmClueReportDetailDTO=data.singleCrmClueReportDetailDTO;
                    this.list = data.listCrmClueReportDetailDTO;
                    this.assistantTeam = data.assistantTeam;
                    this.total = data.count
                } else {
                    alert(`errMsg:${data.msg}`)
                }
//                let data = await MemberList(params)
//                this.list = data.members
//                this.total = data.count

            },
            async MemberList(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("crm/clueReport/getTeamReportDetailInfo", params);


                if (data.code === 0) {
                    this.singleCrmClueReportDetailDTO=data.singleCrmClueReportDetailDTO;
                    this.list = data.listCrmClueReportDetailDTO;
                    this.assistantTeam = data.assistantTeam;
                    this.switchTab=data.assistantTeam[0].id;
                    this.total = data.count
                } else {
                    alert(`errMsg:${data.msg}`)
                }
//                let data = await MemberList(params)
//                this.list = data.members
//                this.total = data.count

            },

            serialize(hash) {
                let result = []
                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })
                return result.join("&")
            },



        },

        filters: {
            sexType(tag) {
                let arr = ['未知', '男', '女']
                return arr[tag]
            }
        },

        ready() {
                this.search();
//            this.getAllMessage();
        },

    }
</script>