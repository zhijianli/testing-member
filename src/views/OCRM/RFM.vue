<style>
.input{
    width: 186px;
}
</style>
<template>
    <div class="container-fliud">
        <div>最近一次下单时间：{{allInfo.currentOrderTime}}</div>
        <input class="input" size="50" type="text" @click.stop="open($event,'picker1')"
               v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">——<input class="input"
                                                                                                          size="50"
                                                                                                          type="text"
                                                                                                          @click.stop="open($event,'picker2')"
                                                                                                          v-model="calendar.items.picker2.value"
                                                                                                          placeholder="结束时间"
                                                                                                          id="end"
                                                                                                          name="end">
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

        </calendar> 时间内
        <div style="display: inline-block">
            <input type="submit" value="搜索" class="btn btn-success" @click="search()">
        </div>

        <div>客户共购买了{{allInfo.serviceNumber}}次咨询服务</div>
        
        <div>共消费金额 {{allInfo.consumptionAmount?allInfo.consumptionAmount:0}}元</div>
        <table class="table table-bordered table-striped" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>累计充值金额</th>
                <th>累计消费金额</th>
                <th>近30天内累计消费金额</th>
                <th>已完成订单数</th>
                <th>投诉/退款 订单数</th>
                <th>已取消订单数</th>
                <th>Ping++记录的最近的未支付时间</th>
                <th>最近看过的5个专家详情页的专家手机号</th>
                <!--<th>最近的私聊时间</th>-->
                <th>提问数</th>
                <!--<th>完成心理测试数</th>-->
                <th>发布心友圈类内容数</th>
                <th>心友圈类的评论+选择数</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in allInfo.memberList">
                <td>{{ item.accumulatedRechargeAmount }}</td>
                <td>{{ item.accumulativeAmountOfConsumption }}</td>
                <td>{{ item.accumulativeAmountOfConsumptionInThirtyDay }}</td>
                <td>{{ item.completedOrderNum }}</td>
                <td>{{ item.complaintsAndRefundOrderNum }}</td>
                <td>{{ item.cancelOrderNum }}</td>
                <td>{{ item.pingRecentUnpaidTime }}</td>
                <td style="word-wrap: break-word;max-width: 85px">{{ item.psychoMobilePhoneList }}</td>
                <!--<td>{{ item.userSex }}</td>-->
                <td>{{ item.numberOfQuestions }}</td>
                <!--<td>{{ item.numberOfQuestions }}</td>-->
                <td>{{ item.circleContentNum }}</td>
                <td>{{ item.circleCommentNum }}</td>
            </tr>
            </tbody>
        </table>
        <div class="more crActive" style="text-align: right" @click="this.$route.router.go(`/orderslist/${phone}`)">查看更多</div>
        
        <table class="table table-bordered table-striped with-check" style="min-width: 1500px;">
            <thead>
            <th>订单号</th>
            <th>咨询时间</th>
            <th>创建时间</th>

            <th>求助者账号</th>
            <th>昵称</th>
            <th>求助者手机号</th>
            <th>专家姓名</th>
            <th>专家手机号</th>
            <th>服务费用</th>
            <th>通话时长</th>
            <th>咨询形式</th>
            <th>使用咨询券的面额</th>
            <th>佣金比例</th>
            <th>平台收入</th>
            <th>咨询师实得</th>
            <th>求助者实付</th>
            <th>订单状态</th>
            <th>下单渠道</th>
            <th>是否预约</th>
            <th style="width: 120px;">预约服务时间</th>
            <th>订单标记</th>
            <th>是否为EAP</th>
            <th>咨询助理</th>
            </thead>
            <tbody>
            <tr v-for="item of allInfo.orderList">
                <td v-text="item.no"></td>
                <td v-text="item.serviceRealityBeginTime"></td>
                <td v-text="item.createTime"></td>
                <td v-text="item.consumersAccount"></td>
                <td v-text="item.nickname">昵称</td>
                <td v-text="item.consumersPhone"></td>
                <td v-text="item.specialistName"></td>
                <td v-text="item.specialistPhone"></td>
                <td v-text="item.cost + '元'"></td>
                <td v-text="item.practicalDuration | durationFormat"></td>
                <td v-text="item.consultType | format"></td>
                <td v-text="item.discountAmount + '元'"></td>
                <td v-text="item.commissionRate + '%'"></td>
                <td v-text="item.platformIncome.toFixed(2)"></td>
                <td v-text="item.serviceRealityAmount + '元'"></td>
                <td v-text="item.cashAmount + '元'"></td>

                <!--订单状态-->
                <td v-text="item.status | typeFormat"></td>

                <td v-text="item.platformChannel"></td>

                <!--是否预约-->
                <td>
                    <template v-if="item.orderType  === 3">
                        预约
                    </template>
                    <template v-else>
                        非预约
                    </template>
                </td>

                <!--预约服务时间-->
                <td style="width: 120px;"> {{ item.bespeakTime }} </td>

                <!--订单标记-->
                <td>{{ orderStatusList[item.orderStatus - 1] }}</td>

                <td>{{ item.eeId | isEapFilter }}</td>
                <td>{{item.assistantName}}</td>
            </tr>
            </tbody>

        </table>
    </div>
</template>

<script type="text/javascript">
    import Vue from "vue"
    import $ from "jquery"
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

        data: function () {
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
                page: 1,//page
                pageSize: 10, //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 5, //how many links to show, must not less than 5,  default is 5
                effectVal: {},
                //edit 修改固定名额弹出是否显示
                edit: false,
                //remove 是否移除此专家推荐
                remove: false,
                note: "",
                pageOne: true,
                pageTwo: false,
                picPath: "",
                dataList: [],
                selectPersonAll: false,
                selectPersonList: [],

                selectPersonList2: [],
                selectPersonAll2: false,
                editorderNum: "",
                mid: "",
                userId: sessionStorage.userId,

                //搜索
                searchIsEnable: "",
                searchTime: "",

                effectVal2: {},

                search_pageSize: 15,
                search_page: 1,
                search_total: 2,

                searchList: [], //搜索得到的专家列表
                downloadName: "活动期间专家电话活动流水",
                test: false,

                userDefinedTagList: ['情感婚恋', '情绪疏导', '个人成长', '人际关系'],

                nowIndex: 0,
                editUserDefinedState: false,
                editUDPlaceHolder: '',
                editTagId: '',
                newTag: '',

                // 搜索专家
                expertSearch: false,
                searchVal: "",
                authorType: 0,
                expertsList: [],
                choosePeo: "",

//
                list: [],
                allInfo:{},
                start:'',
                end:'',
                phone:''


            }
        },
        watch: {
            'calendar.value': function (value) {
                this.calendar.items[this.calendar.picker].value = value
                this.calendar.picker == 'picker1' ? this.start = value + ' 00:00:00' : this.end = value + ' 23:59:59'
            },
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

            //---------------------------------------------------      初始化页面获取推荐专家信息
            async obtainRecommendData() {
                let data = await getResponses("PsychoInfo/V3/getRecommendPsycho.json", `pageIndex=${this.page}&pageSize=${this.pageSize}&words=${this.words}`);
                console.log("初始设置：", data);
                if (data.code == 0) {
                    this.data = data.list;
                    this.total = data.psychoCounts;
                    console.log(this.data);
                    //赋初始值
                    this.mid = this.data.mid;
                    this.auditTime = this.data.auditTime;
                    this.nickname = this.data.nickname;
                    this.mobilePhone = this.data.mobilePhone;
                    this.sex = this.data.sex;
                    this.location = this.data.location;
                    this.orderNum = this.data.orderNum;
                } else {
                    alert(`errMsg:${data.msg}`);
                }
            },

            pageHandler: function (page) {
                this.page = page
                this.getExpertsListByTagId()
            },
            createUrl: function (unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },

            search() {
                this.page = 1;
                let paramsObj = {};
                paramsObj.id=this.$route.query.id;

                if(this.start){

                    paramsObj.createTimeStart=this.start.replace(/-/g, '/')
                }

                if(this.end){
                    paramsObj.createTimeEnd=this.end.replace(/-/g, '/');
                }

//                let paramsObj = {
//                    "pageIndex": this.page,
//                    "pageSize": this.maxLink,
//                    "begin": this.start,
//                    "end": this.end,
//                    'curriculumTitle': this.curriculumTitle,
//                    'speaker': this.speaker,
//                    'userName': this.userName,
//                    'userPhone': this.userPhone,
//                }

                // this.recodeObj = {
                //     pageIndex: this.page,
                //     pageSize: this.maxLink,
                //     begin: tis.start,
                //     end: this.end,
                // }
                this.getRfmMessage(this.serialize(paramsObj));
            },

            serialize(hash) {
                let result = []
                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })
                return result.join("&")
            },

            //点击修改排序
            btnEdit(orderNum, mid) {
                this.edit = true;
                this.editorderNum = orderNum;
                this.mid = mid;
                console.log(this.edit, this.editorderNum, this.mid);

            },
            //修改排序后保存
            configEdit() {
                let params = `mid=${this.mid}&orderNum=${this.editorderNum}&userId=${this.userId}&psychoClassId=${this.nowIndex}`;
                this.updatePsychoRecommend(params);
            },

            async updatePsychoRecommend(params) {
                let data = await getResponses("PsychoInfo/V3/updateOrderNum.json", `mid=${this.mid}&orderNum=${this.editorderNum}&userId=${this.userId}&psychoClassId=${this.nowIndex}`);
                if (data.code == 0) {
                    this.edit = false;
                    this.getExpertsListByTagId();

                } else {
                    alert(data.msg)
                    this.edit = false
                }
            },

            //点击移除推荐专家
            removeFn(mid) {
                this.remove = true
                this.mid = mid;
            },
            //二次确认移除推荐专家
            affirmRemoveFn() {
                let params = `mid=${this.mid}&psychoClassId=${this.nowIndex}`;
                console.log(params, typeof params);
                this.removePsychoRecommend(params);
            },
            async removePsychoRecommend(params) {
                let data = await getResponses("PsychoInfo/V3/deleteWebRecommendPsycho.json", params);

                if (data.code == 0) {
                    this.remove = false;
                    this.getExpertsListByTagId();
                } else {
                    alert(data.msg);
                    this.remove = false;
                }
            },

            close() {
                this.edit = false
                this.remove = false
                this.test = false
                this.editUserDefinedState = false
            },

            switchFn(index) {
                this.nowIndex = index
                this.words = ''
                this.getExpertsListByTagId()

            },

            editUserDefinedTag(item) {
                this.editUDPlaceHolder = item.name
                this.editTagId = item.id
                this.editUserDefinedState = true
                this.newTag = ''
            },
            saveNewTag() {
                this.editExpertsTagName()
                this.editUserDefinedState = false
            },

            async searchPsycho() {
                let params = `words=${this.searchVal}&isAudited=0&pageIndex=1&pageSize=100`
                let data = await getResponses("Psychor/searchMember.json", params);
                if (data.code === 0) {
                    this.expertsList = data.psychoDTOs;
                }
            },

            addExpert() {
                // this.searchPsycho()
                this.expertsList = []
                this.searchVal = ''
                this.choosePeo = ''
                this.expertSearch = true

            },



            async getRfmMessage(params) {
                const data = await getCourse('crm/clue/getRfmMessage',params)
                if (data.code === 0) {
                    this.allInfo = data
                } else {
                    alert(data.msg)
                }
            },

            async getClassify() {
                let data = await getCourse("crm/clue/getSingleClueInfo", `id=${this.$route.query.id}`);
                console.log(data);
                if (data.code == 0) {
                    this.phone = data.crmClue.customerMobilePhone;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

        },

        filters: {
            sexType(tag) {
                let arr = ['未知', '男', '女']
                return arr[tag]
            },
            format(value) {
                // consultType :1 全部 2：电话咨询 3：第三方咨询
                console.log(value);
                // let types = ["电话咨询", "第三方咨询", "图文咨询"]
                // return types[value - 2]
                let types = {
                    2:  '电话咨询',
                    3:  '第三方咨询',
                    4:  '图文咨询'
                };
                return types[value]
            },
            typeFormat(value) {
                // <!--7 退款处理中 8 退款已处理 9：待接单 10：待服务 13：进行中 14：待评价 15：已评价 17：已取消-->
                //  <!--6：已处理 7：待处理 8：已退款-->
                // 已取消和待接单状态合集 [9, 11, 12, 16, 17]
                let types = {
                    6:  '已处理',
                    7:  '待处理',
                    8:  '已退款',
                    9:  '待接单',
                    10: '待咨询',
                    13: '进行中',
                    14: '待评价',
                    15: '已评价',
                    17: '已取消',
                    11: '已取消',
                    12: '已取消',
                    16: '已取消'
                };

                return types[value]
            },
            durationFormat(value) {
                // return `${~~ (value / 60)}'${value % 60}"`
                return parseInt(value / 60)
            },
            isEapFilter(value) {
                if (value === 0) {
                    return '非EAP'
                } else {
                    return 'EAP'
                }
            },
            sex(value){
                if(value===0){
                    return "未知";
                }else if(value===1){
                    return "男";
                }else if(value===2){
                    return "女";
                }
            },
            nextConsultTime(value){
                if(value){
                    return value.split(" ")[0];
                }else{
                    return value
                }

            }
        },

        ready() {
            // this.obtainRecommendData();
            this.search();
            this.getClassify();

        },

    }
</script>