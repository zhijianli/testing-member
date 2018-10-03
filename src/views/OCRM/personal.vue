<style scoped>
    .power {
        display: flex;
        margin-top: 20px;

    }
    .input{
        width: 186px;
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

    .item_title_btn {
        width: 80px;
        height: 28px;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        display: inline-block;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        user-select: none;
    }

    .item_title_btn_sending {
        width: 80px;
        height: 28px;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        display: inline-block;
        line-height: 26px;
        text-align: center;
        user-select: none;
        cursor: not-allowed;
    }

    .item_title_btn:hover {
        background-color: #006dcc;
        color: white;
    }

    .wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        padding-right: 50px;
    }

    .box {

        display: flex;
        justify-content: space-between;

    }

    .box > div {
        margin-right: 50px;
    }

    .box img {
        border: 1px solid;
    }

    .box-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
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
        <div class="widget-box row-fluid" style="padding: 20px" v-if="switchTab === 0">
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
                    <input type="submit" value="搜索" class="btn btn-success" @click=" search()">
                </div>
            </div>
            <div class="infoMain">
                助理姓名：{{singleCrmClueReportDetailDTO.assisTantrName}}
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
        </div>



    <!-- 删除 -->
    <!--<div class="modal-backdrop in" v-if="idelete"></div>-->
    <!--<div id="myAlert" class="modal" v-if="idelete">-->
    <!--<div class="modal-header">-->
    <!--<button data-dismiss="modal" class="close" type="button" @click="close()">×</button>-->
    <!--<h3>删除</h3>-->
    <!--</div>-->
    <!--<div class="modal-body" >-->
    <!--<p>确定删除此文章吗？</p>-->
    <!--</div>-->
    <!--<div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDelete()">确定</a> </div>-->
    <!--</div>-->

</template>
<script type="text/javascript">
    import Vue from "vue"
    import qiniu from "../../qiniu.vue"
    import rfm from "./RFM.vue"
    import followUpRecord from "./followUpRecord.vue"
    import calendar from "../../calendar.vue"
    import moment from "moment"
    import zpagenav from "vue-pagenav"

    import {getSource, getSources, getJson,getCourse} from "../../api"
    Vue.use(zpagenav)
    export default {
        components: {
            qiniu,
            rfm,
            followUpRecord,
            calendar,
        },

        events: {
            'imgParameter': function (obj, eventName) {
                this[eventName] = obj[eventName].imgPath
            }
        },

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
                scaleId: window.location.pathname.split('/')[2],
                checkedNames: [],
                price: "",
                name: "",
                abstractStr: "",
                displayList: [{num: 0, content: "原始分"}, {num: 1, content: "T分 （标准50）"}, {num: 2, content: "Z分 （标准正态）"}],
                recommendedTestInterval: "",
                founder: "",
                relatePicSrc: "",
                description: "",
                tscList: [],
                list: [],
                displayMode: -1,
                switchTab: 0,
                singleCrmClueReportDetailDTO:{},

            }
        },
        watch:{
            'calendar.value': function (value) {
                this.calendar.items[this.calendar.picker].value = value
                this.calendar.picker == 'picker1' ? this.start = value + ' 00:00:00' : this.end = value + ' 23:59:59'
            },
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
            switchFn(id) {
                this.switchTab = id
            },
            aa(n) {
                this.displayMode = n;
            },

            serialize(obj) {
                let str = ""
                for (let key in obj) {
                    str += `${key}=${obj[key]}&`
                }
                str = str.slice(0, -1)
                return str
            },
//            searchFn() {
//
//                this.search()
//            },
            search() {
                let paramsObj = {}
                paramsObj.userId=sessionStorage.userId;
                if(this.start){
                    paramsObj.start_time=this.start;
                }if(this.end){
                    paramsObj.end_time=this.end;
                }
                this.MemberList(this.serialize(paramsObj))
            },
            async MemberList(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("crm/clueReport/getSingleReportDetailInfo", params);


                if (data.code === 0) {
                    this.singleCrmClueReportDetailDTO=data.singleCrmClueReportDetailDTO;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
//                let data = await MemberList(params)
//                this.list = data.members
//                this.total = data.count

            },
        },
        ready() {
            document.title = "客户信息";
            this.search();
        }

    }
</script>


