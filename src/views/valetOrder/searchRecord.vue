<template>
    <div class="container-fluid">
        <div class="widget-box w50">
            <div class="widget-title">
				<span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i>
				</span>
                <h5>用户信息</h5>
            </div>
            <div class="form-horizontal widget-content">
                <div class="control-group">
                    <label class="control-label w150">姓名</label>
                    <div class="controls" v-text="userInformationList.username"></div>
                </div>

                <div class="control-group">
                    <label class="control-label w150">手机号</label>
                    <div class="controls" v-text="userInformationList.mobilePhone"></div>
                </div>

                <div class="control-group">
                    <label class="control-label w150">客户来源</label>
                    <div class="controls" v-text="userInformationList.platformStr"></div>
                </div>

                <div class="control-group recordTabWrap">
                    <ul class="tagTit">
                        <li :class="{'show': switchTab == 1 }" @click="switchFn(1)">付款记录</li>
                        <li :class="{'show': switchTab == 2 }" @click="switchFn(2)">咨询记录</li>
                    </ul>
                </div>

                <!-- 付款记录 -->
                <div v-if="switchTab == 1">
                    <div class="control-group recordTypeOne" v-for="item in paymentLists">
                        <div class="recordTypeOneTime" v-text="item.createTime"></div>
                        <ul class="recordTypeOneMsg">
                            <li>
                                <span class="recordTypeOneSpanLeft">付款账户</span>
                                <span class="recordTypeOneSpanRight" v-text="item.gatheringAccount"></span>
                            </li>
                            <li>
                                <span class="recordTypeOneSpanLeft">充值金额</span>
                                <span class="recordTypeOneSpanRight" v-text="item.gatheringAmount"></span>
                            </li>
                            <li>
                                <span class="recordTypeOneSpanLeft">服务专家</span>
                                <span class="recordTypeOneSpanRight" v-text="item.psychoName"></span>
                            </li>
                            <li>
                                <span class="recordTypeOneSpanLeft">对接客服</span>
                                <span class="recordTypeOneSpanRight" v-text="item.serviceName"></span>
                            </li>

                        </ul>
                    </div>
                </div>

                <!-- 咨询记录 -->
                <div v-if="switchTab == 2">
                    <div v-for="item in consultLists">

                        <div class="control-group recordTypeOne"
                             :class="{isShowRecord: item.orderStatus === 1 && !item.deleteUserName}">

                            <div class="recordTypeOneTime recordTypeOneTime2">
                                <template v-if="item.bespeakTime">
                                    <div v-text="item.bespeakTime" style="padding-top: 10px;"></div>
                                </template>
                                <template v-else>
                                    <div v-text="item.createTime" style="padding-top: 10px;"></div>
                                </template>


                                <!--<div v-if="item.deleteUserName && item.orderStatus === 1" style="padding-top: 10px;">-->
                                    <!--客服-->
                                    <!--<span v-text="'『' + item.deleteUserName + '』'"></span>-->
                                    <!--已取消-->
                                <!--</div>-->
                                <!--<div v-else>-->
                                    <!--<ul class="tagTit tigTit2" v-if="item.orderStatus === 3 || item.orderStatus === 4">-->
                                        <!--<li @click="modifyOrDelDateOrderFn(item.noid, 1, item.serviceName, item.psychoName, item.bespeakTime, item.psychoMobilePhone, item.price, item.duration)">-->
                                            <!--修改预约-->
                                        <!--</li>-->
                                        <!--<li @click="modifyOrDelDateOrderFn(item.noid, 2)">取消预约</li>-->
                                    <!--</ul>-->
                                <!--</div>-->

                            </div>
                            <ul class="recordTypeOneMsg">
                                <li>
                                    <span class="recordTypeOneSpanLeft">服务专家</span>
                                    <span class="recordTypeOneSpanRight" v-text="item.psychoName"></span>
                                </li>
                                <li>
                                    <span class="recordTypeOneSpanLeft">服务价格</span>
                                    <span class="recordTypeOneSpanRight"
                                          v-text="item.price + '元/' + item.duration + '分钟'"></span>
                                </li>
                                <li>
                                    <span class="recordTypeOneSpanLeft">服务时间</span>
                                    <template v-if="item.bespeakTime">
                                        <span class="recordTypeOneSpanRight" v-text="item.bespeakTime"></span>
                                    </template>
                                    <template v-else>
                                        <span class="recordTypeOneSpanRight" v-text="item.createTime"></span>
                                    </template>

                                </li>
                                <li>
                                    <span class="recordTypeOneSpanLeft">预约客服</span>
                                    <span class="recordTypeOneSpanRight" v-text="item.serviceName"></span>
                                </li>

                                <!--<td class="userList_opeartion" v-if="item.orderStatus === 1">-->
                                    <!--<span @click="immediatelyCallFn(item.noid)">立即拨通</span>-->
                                    <!--<span @click="clickToValetFn(item.consumerMobilePhone, item.userName, item.platformStr, item.noid, item.price, item.time, item.duration, item.psychoName,item.psychoId)">预约服务</span>-->
                                <!--</td>-->
                                <!--<td class="userList_opeartion" v-if="item.orderStatus === 5">-->
                                    <!--<span style="cursor:auto;">通话中</span>-->
                                    <!--<span @click="clickToValetFn(item.consumerMobilePhone, item.userName, item.platformStr, item.noid, item.price, item.time, item.duration, item.psychoName,item.psychoId)">预约服务</span>-->

                                <!--</td>-->

                                <!--<td class="userList_opeartion2"-->
                                    <!--v-if="item.orderStatus != 1 && item.orderStatus != 5">-->
                                    <!--<span v-if="item.orderStatus===2">已拨打</span>-->
                                    <!--<span v-if="item.orderStatus===3">已预约</span>-->
                                    <!--<span v-if="item.orderStatus===4">短信已发送</span>-->
                                    <!--<span v-if="item.orderStatus===13" @click="reCallFn(item.noid)" style="color: red;cursor: pointer;">重新拨打</span>-->
                                <!--</td>-->
                                <!--<li  v-if="item.orderStatus === 5 || item.orderStatus === 13">-->
                                    <!--<span class="recordTypeOneSpanLeft">操作</span>-->
                                    <!--<span  v-if="item.orderStatus === 13"-->
                                            <!--class="recordTypeOneSpanRight" @click="reCallFn(item.noid)"-->
                                          <!--style="cursor: pointer;color: red">重新拨打</span>-->
                                    <!--<span  v-if="item.orderStatus === 5" class="recordTypeOneSpanRight">通话中</span>-->
                                <!--</li>-->

                            </ul>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    </div>


    <div class="modal_userList_cover" v-if="clickToValet">
        <div class="modal_userList_Wrap" style="width:500px">
            <div class="modal_userList_Wrap_title">
                修改预约
            </div>
            <ul>
                <li>
                    <span class="modal_userList_box_left_span">用户手机号</span>
                    <span class="modal_userList_box_right_span">{{ userInformationList.mobilePhone }}</span>
                </li>
                <li>
                    <span class="modal_userList_box_left_span">用户姓名</span>
                    <span class="modal_userList_box_right_span">{{ userInformationList.username }}</span>
                </li>
                <li>
                    <span class="modal_userList_box_left_span">客户来源</span>
                    <span class="modal_userList_box_right_span">{{ userInformationList.platformStr }}</span>

                </li>

                <!-- 服务专家 -->
                <li class="modal_userList_Wrap_slecte_expert">
                    <span class="modal_userList_box_left_span">服务专家</span>
                    <div style="display:inline-block;position:relative;">

                        <input type="text" name="" class="telInp" placeholder="请输入专家姓名或手机号" disabled
                               @keyUp="inputExpertsInformationFn"
                               v-model="expertInfo"
                        >
                        <div class="select2-drop" v-if="searchExpertsListsWrap">
                            <ul class="select2-results">
                                <li class="select2-results-dept-0 select2-result select2-result-selectable select2-highlighted"
                                    v-for="item in searchExpertsLists"
                                    @click="chooseExpertFn($index, item.nickname, item.mobilePhone)"
                                >
                                    <div class="select2-result-label">
                                        <div class="user-result">
                                            <div class="user-name" v-text="item.nickname"></div>
                                            <div class="user-telphone" v-text="item.mobilePhone"></div>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </li>
                <!-- 此处li标签为显示专家手机号的信息 -->
                <li>
                    <span class="modal_userList_box_left_span"></span>
                    <span class="modal_userList_box_left_span_text" v-if="wrongTel.status"
                          v-text="wrongTel.text"></span>
                    <span class="modal_userList_box_left_span_text2" v-if="expertsName2.status">已选专家：{{ chooseExpertName
                        }}（手机号：{{ chooseExpertTel }}）</span>


                </li>


                <li>
                    <span class="modal_userList_box_left_span">服务时间</span>
                    <span class="modal_userList_box_right_span">
                        <input class="calendarInputClass" size="50" type="text" @click.stop="open($event,'picker2')"
                               v-model="calendar.items.picker2.value" placeholder="请选择日期" id="end" name="end">
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
                                :sep.sync="calendar.sep">

                        </calendar>
                        -
                        <select class="modal_userList_box_left_span_sel1" v-model="selectData1Value" @change="selFnOne">
                            <option v-for="item in selectData1" :value="item">{{item | format}}</option>

                        </select>
                        时
                        <select class="modal_userList_box_left_span_sel1" v-model="selectData2Value">
                            <option v-for="item in selectData2" :value="item">{{item | format}}</option>

                        </select>
                        分
                    </span>

                </li>

                <li v-if="isShowTimeQuantumCount === -1">
                    <span class="modal_userList_box_left_span"></span>
                    <div class="modal_userList_box_exist_appointment_list" style="display:inline-block;color:red;"
                         v-if="timeQuantumList.length">
                        <div class="modal_userList_box_exist_appointment_list_title">此专家在您所选日期下，已存在预约时间段：</div>
                        <div v-for="item in timeQuantumList" v-text="item"></div>
                    </div>
                    <div class="modal_userList_box_exist_appointment_list" style="display:inline-block;color:red;"
                         v-else>

                        <div class="modal_userList_box_exist_appointment_list_title" v-if="!calendar.value"></div>

                        <div class="modal_userList_box_exist_appointment_list_title" v-else>此专家在您所选日期下，无预约</div>

                    </div>
                </li>


                <li>
                    <span class="modal_userList_box_left_span">服务价格</span>
                    <span class="modal_userList_box_right_span" v-if="expertsName.status"
                          style="color:green;">{{userInformationList.price}}元/{{userInformationList.time}}分钟</span>
                    <span class="modal_userList_box_right_span" v-else style="color:green;">选择专家后呈现</span>

                </li>
                <li>
                    <span class="modal_userList_box_left_span">预约客服</span>
                    <span class="modal_userList_box_right_span">{{ serviceName }}</span>
                </li>
            </ul>

            <div class="modal_userList_Wrap_bottom">
                <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancelValetFn">取消</span>
                <span class="modal_userList_Wrap_bottom_rightBtn" @click="sureToVletFn">确认修改</span>
            </div>
        </div>
    </div>

    <div class="modal_userList_cover" v-if="cancelToValet">
        <div class="modal_userList_Wrap" style="width:600px">
            <div class="modal_userList_Wrap_title">
                取消预约
            </div>
            <div class="modal_userList_Wrap_title_cancel_valet">
                『确定要取消（<span v-text="userInformationList.username"></span>）的预约服务吗？』
            </div>

            <div class="modal_userList_Wrap_bottom">
                <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancelCancelFn">返回</span>
                <span class="modal_userList_Wrap_bottom_rightBtn" @click="sureToCancelValetFn">确定</span>
            </div>
        </div>
    </div>

    <div class="modal_userList_cover" v-if="errMsgAlertWindow">
        <div class="modal_userList_Wrap" style="width:600px">
            <div class="modal_userList_Wrap_title">
                立即拨通失败提示
            </div>
            <div class="modal_userList_Wrap_title_cancel_valet" v-text="errMsgAlertWindowMsg">

            </div>

            <div class="modal_userList_Wrap_bottom">
                <!-- <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancelCancelFn">返回</span> -->
                <span class="modal_userList_Wrap_bottom_rightBtn" @click="iKnowAboutIt">知道了</span>
            </div>
        </div>
    </div>

</template>
<script>
    import $ from "jquery"
    import Vue from "vue"
    import moment from "moment"
    import calendar from "../../calendar.vue"
    import {
        getUserInfoByMobilePhone,
        getOrderRecordByMobilePhone,
        checkPsychoByMobilePhone,
        getNetsalesOrder,
        reCall,
        getResponse,
        getResponses,
    } from "../../api"
    export default {
        //  # Options
        // * :show    是否显示
        // * :type    date|datetime
        // * :value 默认值
        // * :begin  可选开始时间
        // * :end    可选结束时间
        // * :x      显示x坐标
        // * :y      显示y坐标
        // * :range  是否多选
        // * :weeks 星期标题
        // * :months    月份标题
        // * :sep       分隔符
        components: {
            calendar
        },
        data() {
            return {
                // 数据绑定
                calendar: {
                    show: false,
                    x: 0,
                    y: 0,
                    picker: "",
                    type: "date",
                    value: "",
                    begin: "",
                    end: "",
                    value: '',
                    weeks: [],
                    months: [],
                    sep: "-",
                    range: false,
                    items: {
                        // 单选模式
                        picker2: {
                            type: "date",
                            begin: moment().add(5, "minutes").format().split('T')[0],
                            // value:this.calendarValue,
                            value: '',
                            sep: "-",
                            weeks: ['日', '一', '二', '三', '四', '五', '六'],
                            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        }

                    }
                },
                calendarValue: '',
                isToday: true,
                timeQuantumList: [],

                selectPersonList2: [],


                // 用户信息
                userInformation: {
                    consumerMobilePhone: '',
                    userName: '',
                    platformStr: '',
                    price: '',
                    duration: '',
                    psychoName: '',
                    psychoId: ''

                },

                // 可预约时间向后推迟一个小时
                permissionTimeDate: '',
                permissionH: '',
                permissionM: '',


                hourToNum: 0,
                minuteToNum: 0,
                pid: '',
                selectData1: [],
                selectData1Value: "",
                selectData2Value: "",
                nowMinute: '',
                nowHour: '',
                clickToValet: false,
                telInpVulue: "",
                wrongTel: {
                    status: false,
                    text: "此手机号不存在对应的专家"
                },
                expertsName: {
                    status: false,
                    text: "",
                    price: {
                        price: '',
                        time: ''
                    }
                },

                expertsName2: {
                    status: false,
                    text: ""
                },

                // 输入专家姓名后出现下拉框
                searchExpertsListsWrap: false,
                // 输入的专家信息
                expertInfo: '',
                searchExpertsLists: [],

                chooseExpertName: '',
                chooseExpertTel: '',

                userPhone: window.location.pathname.split('/')[2],
                switchTab: 1,

                paymentLists: [],
                consultLists: [],
                userInformationList: {
                    username: "",
                    mobilePhone: "",
                    platformStr: "",
                    price:"",
                    time:""

                },
                userId: sessionStorage.userId,
                noid: '',
                serviceName: '',

                // 取消预约
                cancelToValet: false,

                // 初次打开修改预约时不显示已预约时间段
                isShowTimeQuantumCount: 0,

                // 立即拨通
                windowAlert: false,

                errMsgAlertWindow: false,
                errMsgAlertWindowMsg: '',


            }
        },

        watch: {

            pid() {
                // console.log(value)
                if (this.pid && this.calendarValue) {
                    this.checkPsychoBespeakTimeFn(this.calendarValue)
                }
            },
            'calendar.value': function (value) {


                if (this.isShowTimeQuantumCount === 0) {
                    this.isShowTimeQuantumCount = 1
                } else {
                    this.isShowTimeQuantumCount = -1
                }


                this.calendar.items.picker2.value = value
                this.calendarValue = value
                // this.calendar.picker == 'picker1' ? this.start = value+' 00:00:00' : this.end = value+' 00:00:00'

                if (value && this.pid) {
                    this.checkPsychoBespeakTimeFn(value)
                }
            },
            selectData1Value() {

                if (this.isShowTimeQuantumCount === 0) {
                    this.isShowTimeQuantumCount = 1
                } else {
                    this.isShowTimeQuantumCount = -1
                }

                if (this.pid && this.calendarValue) {
                    this.checkPsychoBespeakTimeFn(this.calendarValue)
                }

            },
            selectData2Value() {


                if (this.isShowTimeQuantumCount === 1) {
                    this.isShowTimeQuantumCount = 2
                } else {
                    this.isShowTimeQuantumCount = -1
                }

                if (this.pid && this.calendarValue) {
                    this.checkPsychoBespeakTimeFn(this.calendarValue)
                }


            }


        },
        filters: {
            format(value) {
                // 将0修改为00
                const valueToStr = value + ""
                return valueToStr.replace(/^(\d)$/, "0$1")
            },

        },
        computed: {

            selectData2: function () {
                if (this.selectData1Value || this.selectData1Value === 0) {
                    if (this.isToday) {
                        if (parseInt(this.selectData1Value) == this.permissionH) {
                            let mList = []
                            for (let i = this.permissionM; i <= 59; i++) {
                                mList.push(i)
                            }
                            return mList
                        } else {
                            let mList = []
                            for (let i = 0; i <= 59; i++) {
                                mList.push(i)
                            }
                            return mList
                        }
                    } else {
                        let mList = []
                        for (let i = 0; i <= 59; i++) {
                            mList.push(i)
                        }
                        return mList
                    }

                }


            }
        },
        methods: {

            async reCallFn(noid) {
//                $('.recordTypeOneSpanRight').style(display="none")
                this.noid = noid
                let data = await reCall(`noid=${this.noid}`)
                if (data.code === 0) {
                    this.windowAlert = true
                    this.getOrderRecordByMobilePhone()
                    this.toCloseWindow()
                } else {

                    // alert(`${data.msg}`)
                    this.windowAlert = false
                    this.errMsgAlertWindow = true
                    this.errMsgAlertWindowMsg = data.msg
                }
            },

//            search() {
//                this.switchTab = parseFloat(this.switchTab)
//                let params = `pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&isPayment=${this.switchTab}`
//
//                this.getNetsalesOrderFn(params)
//                this.selectPersonList2 = []
//                this.page = 1
//                this.maxLink = 10
//
//            },

            async getNetsalesOrderFn(params) {
                let data = await getNetsalesOrder(params)
                this.data = data.netsalesOrders
                this.total = data.count
                //修改
                this.data.forEach((item) => {   //checkBox
                    Vue.set(item, "checkState", false);
                })
                //修改选中状态
                this.data.forEach((item) => {
                    //当列表中有此id时修改选中状态为选中
                    this.selectPersonList2.forEach((v) => {
                        if (item.noid == v) {
                            Vue.set(item, "checkState", true);
                        }
                    })
                })

            },

            toCloseWindow() {
                setTimeout(() => {
                    this.windowAlert = false
                    this.haveBeenCalledTextShow = false
                }, 3000)
            },

            iKnowAboutIt() {
                this.errMsgAlertWindow = false
                this.errMsgAlertWindowMsg = ''
                this.switchTab = parseFloat(this.switchTab)
                let params = `pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&isPayment=${this.switchTab}`
                this.getNetsalesOrderFn(params)
            },


            switchFn(id){
                this.switchTab = id
                this.getOrderRecordByMobilePhone()
            },

            async getUserInfoByMobilePhoneFn(){
                let data = await getUserInfoByMobilePhone(`mobilePhone=${this.userPhone}`)
                if (data.code === 0) {
                    this.userInformationList.username = data.userDTO.username
                    this.userInformationList.mobilePhone = data.userDTO.mobilePhone
                    this.userInformationList.platformStr = data.userDTO.platformStr

                } else {
                    alert(`${data.msg}`)
                }
            },

            async getOrderRecordByMobilePhone(){
                // 付款记录  orderType = 1  orderStatus不传
                // 咨询记录  orderType 不传  orderStatus 传 0
                let params = {}
                params.mobilePhone = this.userPhone
                // params.orderType = this.switchTab
                if (this.switchTab === 1) {
                    params.orderType = 1
                }
                if (this.switchTab === 2) {
                    params.orderStatus = 0
                }
                let data = await getOrderRecordByMobilePhone(this.serialize(params))
                if (data.code === 0) {
                    if (this.switchTab === 1) {
                        this.paymentLists = data.orders
                    }
                    if (this.switchTab === 2) {
                        this.consultLists = data.orders
                    }


                } else {
                    alert(`${data.msg}`)
                }
            },

            serialize(hash) {
                let result = []

                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })

                return result.join("&")
            },


            async modifyOrDelDateOrderFn(noid, type, serviceName, psychoName, bespeakTime, psychoMobilePhone, price, duration) {
                this.noid = noid
                // type	1、修改 2、删除
                if (type === 1) {
                    console.log("修改")

                    this.isShowTimeQuantum = false
                    this.isShowTimeQuantumCount = 0

                    this.clickToValet = true

                    this.serviceName = serviceName

                    // 处理专家和预约时间的默认值
                    // 专家
                    this.expertInfo = psychoName
                    this.expertsName2.status = true
                    this.chooseExpertName = psychoName
                    this.chooseExpertTel = psychoMobilePhone

                    this.expertsName.status = true
                    this.userInformationList.price = price
                    this.userInformationList.time = duration

                    this.checkPsychoByMobilePhoneFn(this.chooseExpertTel)


                    // 预约时间
                    this.calendarValue = bespeakTime.trim().split(" ")[0]
                    this.selFnOne()
                    this.calendar.items.picker2.value = bespeakTime.trim().split(" ")[0]
                    this.selectData1Value = bespeakTime.trim().split(" ")[1].split(":")[0]
                    console.log("-----------------------", this.selectData1Value)

                    this.selectData2Value = parseInt(bespeakTime.trim().split(" ")[1].split(":")[1])
                    console.log("-----------------------", this.selectData2Value)

                } else if (type === 2) {
                    console.log("删除")

                    // 取消预约
                    this.cancelToValet = true


                }
            },

            // 根据日期返回该专家已预约的时间段
            async checkPsychoBespeakTimeFn(value) {
                let data = await getResponses("netsalesOrder/checkPsychoBespeakTime.json", `psychoId=${this.pid}&selectedDate=${value}`)
                // if (data.code = )
                this.isToday = this.calendar.items.picker2.value === this.calendar.items.picker2.begin


                this.selFnOne()
                // this.timeQuantumList = []
                this.timeQuantumList = data.list
            },

            valetToZero() {
                this.telInpVulue = ""
                this.wrongTel.status = false
                this.expertsName.status = false
                this.expertsName.text = ""
                this.expertsName.price.price = ""
                this.expertsName.price.time = ""
                this.selectData1 = []
                this.selectData1Value = ""
                this.selectData2Value = ""


                this.nowMinute = ""
                this.nowHour = ""
                this.mid = ""
                this.pid = ""
                this.isToday = true


                this.permissionTimeDate = '',
                    this.permissionH = '',
                    this.permissionM = '',


                    // this.todayDate = moment().format().split('T')[0]
                    this.calendar.value = ''
                this.timeQuantumList = []

                this.searchExpertsListsWrap = false
                this.expertInfo = ""
                this.searchExpertsLists = []
                this.chooseExpertName = ""
                this.chooseExpertTel = ""
                this.calendarValue = ''
                this.noid = ''
                this.isShowTimeQuantum = false
                this.isShowTimeQuantumCount = 0
            },
            selFnOne() {
                // this.nowMinute = moment().minute()

                // this.nowHour = this.nowMinute >= 30 ? moment().hour() + 1 : moment().hour()

                // 当前时间推后一小时后日期
                let permissionT = moment().add(5, 'minutes')

                // 当前时间推后一小时后 格式化
                let permissionTime = permissionT.format("YYYY-MM-DD HH:mm:ss")

                // 当前时间推后一小时后 具体日期
                this.permissionTimeDate = permissionTime.split(" ")[0]

                this.permissionH = permissionT.hour()
                this.permissionM = permissionT.minute()
                // this.isToday = permissionTimeDate
                this.selectData1 = []
                if (this.isToday) {
                    for (let i = this.permissionH; i < 24; i++) {
                        this.selectData1.push(i)
                    }
                } else {
                    for (let i = 0; i < 24; i++) {
                        this.selectData1.push(i)
                    }
                }


            },


            // 输入专家姓名或者电话号码后keyUp事件
            async inputExpertsInformationFn(){
                if (this.expertInfo) {

                    let data = await getResponses('netsalesOrder/serchMemberByMobilePhoneOrName.json', `userType=2&words=${this.expertInfo.trim()}`)
                    if (data.code === 0) {
                        this.searchExpertsListsWrap = true
                        this.searchExpertsLists = data.list

                    } else {
                        this.searchExpertsListsWrap = false
                        this.searchExpertsLists = []
                        this.chooseExpertName = ""
                        this.chooseExpertTel = ""
                        this.expertsName2.status = false
                    }
                } else {
                    this.searchExpertsListsWrap = false
                    this.searchExpertsLists = []
                    this.chooseExpertName = ""
                    this.chooseExpertTel = ""
                    this.expertsName2.status = false
                }


            },
            // 选中专家事件
            chooseExpertFn(index, name, telphone) {
                this.searchExpertsListsWrap = false
                this.chooseExpertName = name
                this.chooseExpertTel = telphone
                this.expertsName2.status = true
                // 查询数据库中是否有此专家
                this.checkPsychoByMobilePhoneFn(this.chooseExpertTel)
            },

            async checkPsychoByMobilePhoneFn(value){
                let data = await checkPsychoByMobilePhone(`mobilePhone=${value}`)


                this.expertsName.price.price = data.serviceGoods.price
                this.expertsName.price.time = data.serviceGoods.duration
                this.pid = data.psycho.mid
                this.userInformation.psychoId = data.psycho.mid

                if (data.code === 0) {
                    this.expertsName.status = true
                    // 预约服务
                    this.wrongTel.status = false
                    this.expertsName.status = true
                    this.expertsName.text = data.psycho.nickname
                    this.expertsName.price.price = data.serviceGoods.price
                    this.expertsName.price.time = data.serviceGoods.duration
                    this.pid = data.psycho.mid
                    // this.expertsName.text = data.msg
                } else {
                    this.wrongTel.status = true
                    this.expertsName.status = false
                }
            },

            cancelValetFn() {

                this.clickToValet = false

                this.valetToZero()

            },
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

            async sureToVletFn() {
                this.hourToNum = parseFloat(this.selectData1Value)
                this.minuteToNum = parseFloat(this.selectData2Value)
                // this.
                // let d = moment().hours(this.hourToNum).minutes(this.minuteToNum).seconds(0).format("YYYY-MM-DD HH:mm:ss")

                // 判断是否正确选择专家
                if (!this.pid) {
                    alert("请选择预约专家！")
                    return
                }

                // 判断预约时间参数完整性
                if (!this.selectData2Value && this.selectData2Value !== 0) {
                    alert("预约时间不完整！")
                    return
                }

                if (!this.selectData1Value && this.selectData1Value !== 0) {
                    alert("预约时间不完整！")
                    return
                }
                if (!this.calendarValue) {
                    alert("预约时间不完整！")
                    return
                }
                const dd = moment(this.calendar.items.picker2.value).hours(this.hourToNum).minutes(this.minuteToNum).seconds(0)

                const valetD = dd.unix()

                const d = dd.format("YYYY-MM-DD HH:mm:ss")



                this.modifyOrDelDateFn(d)




            },


            async modifyOrDelDateFn(d){
                let params = {}
                params.bespeakTime = d
                params.noid = this.noid
                params.type = 1
                params.psychoMobilePhone = this.chooseExpertTel
                // params.pid = parseFloat(this.pid)
                params.userId = parseFloat(this.userId)

                let data = await getResponses("netsalesOrder/modifyOrDelDate.json", (this.serialize(params)))

                if (data.code === 0) {

                    this.clickToValet = false
                    this.valetToZero()
                    // this.search()
                    this.getOrderRecordByMobilePhone()
                } else {
                    alert(`${data.msg}`)
                }


            },

            async sureToCancelValetFn() {
                let params = {}
                params.noid = this.noid
                params.type = 2
                params.userId = parseFloat(this.userId)

                let data = await getResponses("netsalesOrder/modifyOrDelDate.json", (this.serialize(params)))

                if (data.code === 0) {

                    this.cancelToValet = false
                    this.noid = ''

                    this.getOrderRecordByMobilePhone()
                } else {
                    alert(`${data.msg}`)
                }

            },

            cancelCancelFn() {
                this.noid = ''
                this.cancelToValet = false
            }


        },
        ready() {

            !!this.userPhone && this.getUserInfoByMobilePhoneFn()
            !!this.userPhone && this.getOrderRecordByMobilePhone()

        },
    }
</script>
<style scoped>

    .form-horizontal .control-label {
        text-align: left;
    }

    .recordTypeOneTime {
        border-bottom: 1px solid rgb(227, 227, 227);
        line-height: 50px;

    }

    .recordTypeOne {
        border-bottom: none;
        margin-bottom: 20px;
        border-top: none;
    }

    .recordTypeOneMsg > li {
        border-top: 1px solid #ffffff;
        border-bottom: 1px solid #eeeeee;
        margin-bottom: 0;
    }

    .recordTypeOneMsg > li:first-child {
        border-top: 0;
    }

    .recordTypeOneMsg > li span {
        display: inline-block;
        line-height: 50px;

    }

    .recordTypeOneSpanLeft {
        width: 150px;
        margin-right: 20px;
    }

    .recordTypeOneMsg > li:last-child {
        border-bottom: 0;
    }

    .recordTypeOneMsg {
        /* margin-bottom: 20px; */
    }

    .recordTabWrap {
        padding: 20px 0;
    }

    .widget-box {
        width: 600px;
    }

    .recordTypeOneTime2 {
        display: flex;
        justify-content: space-between;
    }

    .tigTit2 li:hover {
        background-color: rgb(79, 84, 103);
        color: rgb(255, 255, 255);
    }

    .calendarInputClass {
        background-color: #fff;
        color: #000;
        border: none;
        padding: 4px 10px 5px;
        /* border: 1px solid ; */
        border: 1px solid rgb(169, 169, 169);
        width: 160px;
        margin-bottom: 0;

    }

    .select2-drop-active .select2-results .select2-highlighted {
        background: #446e9b;
    }

    /* .select2-results .select2-highlighted {
        background: #3875d7;
        color: #fff;
    }
     */
    .select2-drop {
        position: absolute;
        z-index: 9999;
        top: 100%;
        background: #fff;
        color: #000;
        border: 1px solid #aaa;
        border-top: 0;
        border-radius: 0 0 4px 4px;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
        box-sizing: border-box;
        /* min-width: 225px !important; */
        width: 184px;
        min-height: 50px;
    }

    .select2-results {
        max-height: 200px;
        padding: 0 0 0 4px;
        margin: 4px 4px 4px 0;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .select2-results li {
        list-style: none;
        display: list-item;
        background-image: none;
    }

    .select2-results li:hover {
        background-color: #446e9b;
        color: #fff;

    }

    .select2-results .select2-result-label {
        padding: 3px 7px 4px;
        margin: 0;
        cursor: pointer;
        min-height: 1em;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .select2-results .user-telphone {
        color: #999;
    }

    .userList_opeartion span {
        margin: 10px;
        cursor: pointer;
    }

    .modal_userList_cover {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 6;
    }

    .modal_userList_Wrap {
        width: 300px;
        /* height: 420px; */
        background-color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid black;
    }

    .modal_userList_Wrap_title {
        height: 60px;
        background-color: rgb(240, 240, 240);
        line-height: 60px;
        text-indent: 2em;
    }

    .modal_userList_Wrap ul {
        /* padding:0 10px 0 20px; */
    }

    .modal_userList_Wrap ul li span {
        display: inline-block;
        line-height: 40px;
    }

    .modal_userList_box_left_span {
        width: 100px;
        text-indent: 2em;
    }

    .modal_userList_Wrap_bottom {
        height: 60px;
        background-color: rgb(240, 240, 240);
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .modal_userList_Wrap_bottom span {
        cursor: pointer;
        display: inline-block;
        height: 30px;
        width: 70px;
        background-color: white;
        line-height: 30px;
        margin: 10px;
        text-align: center;
    }

    .modal_userList_Wrap_bottom_rightBtn {
        color: red;
    }

    .modal_userList_box_left_span_sel1 {
        padding: 5px 6px;
        width: 55px;
        cursor: pointer;
        margin-bottom: 0;
        height: 31px;
    }

    .modal_userList_box_left_span_sel2 {
        width: 60px;
    }

    .telInp {
        border: 1px solid rgb(169, 169, 169);
        margin-bottom: 0;
    }

    .modal_userList_Wrap ul li .modal_userList_box_left_span_text {
        line-height: 20px;
        color: red;
    }

    .modal_userList_Wrap ul li .modal_userList_box_left_span_text2 {
        line-height: 20px;
        color: green;
    }

    .modal_userList_box_left_span_sel2 {
        padding: 4px 6px;
        width: 184px;
        cursor: pointer;
    }

    .modal_userList_Wrap_title_cancel_valet {
        line-height: 200px;
        text-align: center;
        font-size: 20px;
    }

    .isShowRecord {
        display: none;
    }
</style>