<template>
    <div class="container-fluid">

        <div id="search" class="title">
            <input type="text" name="searchVal" placeholder="请输入姓名或手机号" v-model="searchVal">
            <input type="submit" value="搜索" class="btn btn-success" @click="search()" style="margin-right:50px;">
        </div>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>
                    <div class="checkbox">
                        <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-th"
                               @click='selectAll' :checked="checkAllState">
                        <label for="title-table-th" class="checkboxLabel"></label>
                    </div>
                </th>
                <th>注册时间</th>
                <th>用户手机号</th>
                <th>用户姓名</th>
                <th>客户来源</th>
                <th>对接客服</th>
                <th>账户余额</th>
                <th>可用余额</th>
                <th>状态</th>
                <th class="userList_opeartion_title">操作</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="item of data">
                <!-- <tr> -->
                <td>
                    <div class="checkbox">
                        <input type="checkbox" class="checkboxInp" name="title-table-checkbox"
                               id="title-table-td{{item.mid}}" :checked=" item.checkState? 'checked':''"  @click='selectPerson(item.mid, item)' data-typeId="{{item.mid}}">
                        <label class="checkboxLabel" for="title-table-td{{item.mid}}"></label>
                    </div>
                </td>
                <td>{{ item.regTime }}</td>
                <td>{{ item.mobilePhone }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.platformStr }}</td>
                <td>{{ item.serviceName }}</td>
                <td>{{ item.cashBalance }}</td>
                <td>{{ item.cashBalanceAvailable }}</td>
                <td>{{ item.bespeaked | statusFilter}}</td>
                <td class="userList_opeartion">
                    <span v-if="item.cashBalanceAvailable > 0" data-type="1"  class="normal-operate-state"
                          @click="clickToValetFn(item.mobilePhone, item.username, item.platformStr, item.mid)">预约服务</span>
                    <span class="normal-operate-state" @click="changeFn2(item.mobilePhone)">查看咨询记录</span>

                </td>
            </tr>

            </tbody>
        </table>
        <div class='bottom'>
            <div id="test">
                <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"
                          :page-handler="pageHandler" :create-url="createUrl">
                </zpagenav>
            </div>
            <div>
                <button class="btn-success" style="font-size:14px;" @click="downloadExcel" v-if="! isExportingExcel">导出Excel</button>
                <button class="btn-success" style="font-size:14px;" v-else>导出Excel</button>

                <a href="javascript:;" v-el:a></a>
            </div>
        </div>
    </div>

    <div class="modal_userList_cover" v-if="clickToValet">
        <div class="modal_userList_Wrap">
            <div class="modal_userList_Wrap_title">
                预约服务
            </div>
            <ul>
                <li>
                    <span class="modal_userList_box_left_span">用户手机号</span>
                    <span class="modal_userList_box_right_span">{{ userInformation.consumerMobilePhone }}</span>
                </li>
                <li>
                    <span class="modal_userList_box_left_span">用户姓名</span>
                    <span class="modal_userList_box_right_span">{{ userInformation.userName }}</span>
                </li>
                <li>
                    <span class="modal_userList_box_left_span">客户来源</span>
                    <span class="modal_userList_box_right_span">{{ userInformation.platformStr }}</span>

                </li>

                <!-- 服务专家 -->
                <li class="modal_userList_Wrap_slecte_expert">
                    <span class="modal_userList_box_left_span">服务专家</span>
                    <div style="display:inline-block;position:relative;">

                        <input type="text" name="" class="telInp" placeholder="请输入专家姓名或手机号"
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


                <li style="border-top: 1px solid green;">
                    <span class="modal_userList_box_left_span">服务时间</span>
                </li>
                <template v-if="chooseExpertTel">
                    <li style="border-bottom: 1px solid green;">
                        <div class="model_bes_box">
                            <input type="radio" id="one" :value="1" v-model="bespeakType"> <label for="one">选择专家已设置时间</label>
                            <input type="radio" id="two" :value="0" v-model="bespeakType"> <label for="two">选择期望的时间，提醒专家设置</label>
                            <!--专家已设置预约时间段展示-->

                            <ul class="model_bes_tl">
                                <template v-for="(index, item) in arrangeDateList">
                                    <li v-if="arrangeDateList.length && item.dataValue.length" :key="index">
                                        <div>
                                            {{ item.arrangeDate.split(' ')[0].split('-')[1] }}-{{ item.arrangeDate.split(' ')[0].split('-')[2] }}
                                            {{ item.weekDay | weekDayStateListFilter }}
                                        </div>
                                        <div class="model_bes_tl_b">
                                            <template v-for="(indexInside, v) in item.dataValue" :key="indexInside" >

                                                <template v-if="item.pickDateValue.indexOf(v) !== -1">
                                                    <div class="model_bes_tl_sb model_bes_tl_n">
                                                        <p>{{ v + ":00" }}</p>
                                                        <p class="model_bes_p">已约</p>
                                                    </div>
                                                </template>


                                                <template v-else>
                                                    <template v-if="chooseList.arrangeDate === item.arrangeDate && chooseList.v === v">
                                                        <div class="model_bes_tl_sb model_bes_tl_y model_bes_tl_choose" @click="toChooseBespeakTimeFn(item.arrangeDate, v, 1)">
                                                            <p>{{ v + ":00" }}</p>
                                                            <p class="model_bes_p">可约</p>
                                                        </div>
                                                    </template>

                                                    <template v-else>
                                                        <div class="model_bes_tl_sb model_bes_tl_y" @click="toChooseBespeakTimeFn(item.arrangeDate, v, 2)">
                                                            <p>{{ v + ":00" }}</p>
                                                            <p class="model_bes_p">可约</p>
                                                        </div>
                                                    </template>

                                                </template>

                                            </template>



                                        </div>
                                    </li>
                                </template>
                            </ul>

                            <template v-if="bespeakType === 0">

                                <div class="mode_bes_send">
                                    <input type="button" value="发送申请" id="ajaxBut" class="btn btn-success" @click="expectationByUser">
                                </div>
                            </template>


                            <div class="model_em_box" v-if="bespeakType === 1">
                                <ul>
                                    <li class="model_em_box_li">
                                        <span>性别：</span>
                                        <select v-model="customerSex">
                                            <option :value="1">男</option>
                                            <option :value="2">女</option>
                                        </select>
                                    </li>

                                    <li class="model_em_box_li">
                                        <span>年龄：</span>
                                        <input type="text" v-model="customerAge" @keyup="inputChange">
                                    </li>

                                    <li class="model_em_box_li">
                                        <span>问题描述：</span>
                                        <textarea v-model="consultContent"></textarea>
                                    </li>
                                </ul>
                            </div>



                        </div>
                    </li>
                </template>
                <template v-else>
                    <li style="color: red;line-height: 40px; justify-content: center; border: 1px dotted; width: 80%;margin-left: 10%;margin-bottom: 20px;">选择专家后展示具体可约时间</li>
                </template>



                <template v-if="bespeakType === 1">
                    <li>
                        <span class="modal_userList_box_left_span">服务时长</span>
                        <input type="text" name="" class="duration" placeholder="请填写分钟数" v-model="duration">
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">服务价格</span>
                        <input type="text" name="" class="price" placeholder="请填写价格" v-model="price">
                    </li>

                </template>

                <li>
                    <span class="modal_userList_box_left_span">预约客服</span>
                    <span class="modal_userList_box_right_span">{{ serviceName }}</span>
                </li>
            </ul>

            <div class="modal_userList_Wrap_bottom">
                <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancelValetFn">取消</span>
                <span class="modal_userList_Wrap_bottom_rightBtn" @click="sureToVletFn" v-if="bespeakType === 1">确认预约</span>
            </div>
        </div>
    </div>


</template>
<script type="text/javascript">
    import $ from "jquery"
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import moment from "moment"
    import calendar from "../../calendar.vue"

    import {
        searchUsersForOrder,
        checkPsychoByMobilePhone,
        addBespeakServiceForUser,
        getUserInfoByMobilePhone,
        getResponse,
        getResponses,
        getResponsesExcel

    } from "../../api"

    Vue.use(zpagenav)

    export default {

        data() {
            return {

                todayDate: moment().format().split('T')[0],
                isToday: true,
                serviceName: sessionStorage.username,
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                pageSize: 10,
                total: 10, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                data: [],
                // checkState: false,
                default: '',
                searchVal: '',
                idelete: false,
                selectPersonList2: [],
                selectData1: [],
                //selectData2:[40,50],
                selectData1Value: 0,
                selectData2Value: 0,
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
                // 用户信息
                userInformation: {
                    consumerMobilePhone: '',
                    userName: '',
                    platformStr: '',
                    price: '',
//                    time: '',
                    duration: '',
                    psychoName: '',
                    psychoId: ''

                },
                mid: '',
                hourToNum: 0,
                minuteToNum: 0,
                pid: '',
                userId: sessionStorage.userId,

                // 输入专家姓名后出现下拉框
                searchExpertsListsWrap: false,
                // 输入的专家信息
                expertInfo: '',
                searchExpertsLists: [],

                duration: "",
                price: "",

                chooseExpertName: '',
                chooseExpertTel: '',

                noid: '',

                // 创建订单时选择的预约时间类型
                bespeakType: 1,

                arrangeDateList: [],


                // 选中的状态展示
                chooseList: {
                    arrangeDate: '',
                    v: '',
                },

                //    选择期望时间后去预约
                consumerMid: '',

                consultContent: '',  // 问题描述

                customerAge: '',
                customerSex: '',

                selectPersonList: [],
                selectPersonAll: false,
                isExportingExcel: false,
                recentPageCheckedNumber: '',

            }
        },
        watch: {
            page() {
                this.searchUsersForOrderFn()

            },
            pid() {
                console.log("换人了")
                if (this.pid && this.calendarValue) {
                    this.checkPsychoBespeakTimeFn(this.calendarValue)
                }
            },

            bespeakType(value) {

                this.getPsychoArrangeDateFn(value)
            },



        },
        filters: {
            format(value) {
                // 将0修改为00
                const valueToStr = value + ""
                return valueToStr.replace(/^(\d)$/, "0$1")
            },
            statusFilter(value) {
                return ["无", "已预约"][value]
            },

            weekDayStateListFilter(value) {
                return ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][value - 1]
            },

            typeFormat(value) {
                let types = {
                    0: '未付款',
                    1: '已付款',
                    2: '已完结',
                    5: '进行中',
                    20:'待接单',
                    21:'待服务',
                    22:'已取消'
                }

                return types[value]
            },

            isRefundFormat(value) {
                return ["否", "是"][value]
            },
        },
        computed: {

            selectData2: function () {
                if (this.selectData1Value) {
                    if (this.isToday) {
                        if (this.selectData1Value == this.permissionH) {
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


            },

            checkAllState: function() {
                this.recentPageCheckedNumber = 0
                for (let i = 0; i < this.data.length; i++) {
                    for (let j = 0; j < this.selectPersonList.length; j++) {
                        if (this.data[i].mid === this.selectPersonList[j]) {
                            this.recentPageCheckedNumber++;
                            break;
                        }
                    }
                }
                return !!this.data.length && this.recentPageCheckedNumber === this.data.length

            }
        },
        methods: {

            // 点击选中
            selectPerson2(id, item) {

                console.log("selectPerson2:", item.checkState);
                item.checkState = !item.checkState
                if (item.checkState) {
                    this.selectPersonList2.push(id)
                } else {
                    for (let i = 0; i < this.selectPersonList2.length; i++) {
                        if (this.selectPersonList2[i] == id) {
                            this.selectPersonList2.splice(i, 1)
                        }
                    }

                }
                console.log(`selectPerson2:${this.selectPersonList2}`)
            },

            checkTelFn() {
                // 判断手机号是否正确
                console.log(this.telInpVulue)

                if (!this.telInpVulue.match(/^1(\d){10}$/)) {
                    this.wrongTel.status = true
                    return
                } else {
                    this.wrongTel.status = false

                    // 查询数据库中是否有此专家
                    this.checkPsychoByMobilePhoneFn(this.telInpVulue)
                }


            },
            async checkPsychoByMobilePhoneFn(value){
                let data = await checkPsychoByMobilePhone(`mobilePhone=${value}`)

                if (data.code === 0) {
                    this.expertsName.status = true
                    // 预约服务
                    this.wrongTel.status = false
                    this.expertsName.status = true
                    this.expertsName.text = data.psycho.nickname
                    this.expertsName.price.price = data.serviceGoods.price
                    this.expertsName.price.time = data.serviceGoods.duration
                    this.userInformation.psychoId = data.psycho.mid
                    // 调用专家预约服务列表
                    this.getPsychoArrangeDateFn(this.bespeakType)



                    this.pid = data.psycho.mid
                } else {
                    this.wrongTel.status = true
                    this.expertsName.status = false


                }
            },

            // 点击查看用户咨询记录
            changeFn2(phone) {
                console.log(phone)
                this.$dispatch('child-msg', "查看咨询记录")
                this.$route.router.go(`/searchRecord/${phone}`)

            },


            valetToZero() {
                this.telInpVulue = ""
                this.wrongTel.status = false
                this.expertsName.status = false
                this.expertsName.text = ""
                this.expertsName.price.price = ""
                this.expertsName.price.time = ""

                this.mid = ""
                this.pid = ""



                this.searchExpertsListsWrap = false
                this.expertInfo = ""
                this.searchExpertsLists = []
                this.chooseExpertName = ""
                this.chooseExpertTel = ""

                this.bespeakType = 1
                // 清空添加的信息
                this.consultContent = ""
                this.customerAge = ''
                this.customerSex = ''



            },

            clickToValetFn(phone, name, platformStr, mid) {
                this.valetToZero()
                this.userInformation = {}
                this.userInformation.consumerMobilePhone = phone
                this.userInformation.userName = name
                this.userInformation.platformStr = platformStr
                this.userInformation.psychoId = ''


                this.mid = mid
                this.clickToValet = true
            },
            cancelValetFn() {
                this.clickToValet = false
            },



            pageHandler(page) {
                //here you can do custom state update
                this.page = page
            },
            createUrl(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },
            changeFn(e) {
                this.checkState = e.target.checked
            },

            // 输入专家姓名或者电话号码后keyUp事件
            async inputExpertsInformationFn(){
                if (this.expertInfo) {

                    let data = await getResponses('netsalesOrder/serchMemberByMobilePhoneOrName.json', `userType=2&words=${this.expertInfo.trim()}`)
                    console.log(data)
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
                    console.log("empty")
                }


            },
            // 选中专家事件
            chooseExpertFn(index, name, telphone) {
                this.searchExpertsListsWrap = false
                console.log(index)
                this.chooseExpertName = name
                this.chooseExpertTel = telphone
                this.expertsName2.status = true
                // 查询数据库中是否有此专家
                this.checkPsychoByMobilePhoneFn(this.chooseExpertTel)
            },

            search() {
                this.page = 1
                this.selectPersonList = []
                this.searchUsersForOrderFn()

            },

            async searchUsersForOrderFn() {
                let params = {}

                params.pageSize = this.pageSize
                params.pageIndex = this.page

                this.searchVal && (params.words = this.searchVal.trim())

                let data = await searchUsersForOrder(this.serialize(params))
                this.data = data.userDTOs
                this.total = data.count
                //修改
                this.data.forEach((item) => {   //checkBox
                    Vue.set(item, "checkState", false);
                })
                //修改选中状态
                this.data.forEach((item) => {
                    //当列表中有此id时修改选中状态为选中
                    this.selectPersonList2.forEach((v) => {
                        if (item.mid == v) {
                            Vue.set(item, "checkState", true);
                        }
                    })
                })


            },


            serialize(hash) {
                let result = []

                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })

                return result.join("&")
            },

            //导出到excel
            async downloadExcel() {
                let params = {}
                params.pageSize = this.pageSize
                params.pageIndex = this.page

                this.searchVal && (params.words = this.searchVal.trim())

                if (this.selectPersonList.length) {
                    params.ids = JSON.stringify(this.selectPersonList)
                }

                this.isExportingExcel = true
                const p = this.serialize(params)
                console.log("p:", p)
                const data = await getResponsesExcel("netsalesOrder/exportNetsalesUser.json", p)
                console.log(data)
                let blob = new Blob([data], {
                        'type': 'application/msexcel'
                    }),
                    a = this.$els.a

                a.href = window.URL.createObjectURL(blob)
                a.download = `用户列表.xls`
                a.click()
            },

            //    接口名称 期望时间提醒
            async expectationByUser() {
                let params = {}
                // 判断用户有没有选中期望时间
                if (!this.chooseList.arrangeDate && !this.chooseList.v) {
                    alert("请先选中期望预约的时间，再发送申请! ")
                    return
                } else {
                    //    期望时间拼接
                    params.bespeakTime = this.chooseList.arrangeDate.split(" ")[0] + " " + this.chooseList.v + ":00:00"
                }

                params.mid = this.mid
                params.psychoId = this.userInformation.psychoId

                console.log(params)

                let data = await getResponses('appOrderBespeak/V3/expectationByUser.json', this.serialize(params), '/depression-api/')

                if (data.code === 0) {
                    this.clickToValet = false
                    this.searchUsersForOrderFn()
                } else {
                    alert(data.msg)
                }
            },

            // 已选专家的已设置预约时间接口  (获取专家排班时间)
            async getPsychoArrangeDateFn(type) {
                this.chooseList.arrangeDate = ''
                this.chooseList.v = ''
                let params = {}
                params.bespeakType = type
                params.mid = this.userInformation.psychoId
                const data = await getResponses("appOrderBespeak/V3/getPsychoArrangeDateByUser.json", this.serialize(params), '/depression-api/')

                if (data.code === 0) {
                    this.arrangeDateList = data.content.arrangeDate

                    this.arrangeDateList.forEach((item) => {
                        Vue.set(item, 'dataValue', JSON.parse(item.dataValue))
                        Vue.set(item, 'pickDateValue', JSON.parse(item.pickDateValue))

                    })
                } else {
                    alert(data.msg)
                }
            },

            toChooseBespeakTimeFn(date, v, type) {

                if (type === 2) {
                    //    说明可约但未选中 -> 选中
                    this.chooseList.arrangeDate = date
                    this.chooseList.v = v
                } else {
                    // 可约但已选中  -> 取消选中
                    this.chooseList.arrangeDate = ''
                    this.chooseList.v = ''
                }


            },

            inputChange(e) {

                const target = e.target
                const value = target.value
                const key = target.dataset.key

                this[key] = target.value = value.replace(/\D/g, "")


            },


            async sureToVletFn(){
                let params = {}
                // 提醒用户先选中专家
                if (! this.userInformation.psychoId ) {
                    alert("请先选择专家！")
                    return
                }

                if (!this.price) {
                    alert("请先填写价格！")
                    return
                }

                if (! this.duration) {
                    alert("请先填写分钟数！")
                    return
                }
                // 判断用户有没有选中期望时间
                if (!this.chooseList.arrangeDate && !this.chooseList.v) {
                    alert("请先选中想要预约的日期 ")
                    return
                } else {
                    //    期望时间拼接
                    params.bespeakTime = this.chooseList.arrangeDate.split(" ")[0] + " " + this.chooseList.v + ":00:00"
                }



                params.mid = this.mid
                params.psychoId = this.userInformation.psychoId
                params.bespeakType = this.bespeakType
                params.eeId = 0

                // 增加参数表示是代客下单
                params.orderSource = 2

                params.price = this.price  // 价格
                params.duration = this.duration  // 分钟数
                // params.noid = this.noid
                this.userInformation.userName && (params.customerName = this.userInformation.userName)

                this.consultContent && (params.consultContent = this.consultContent)
                this.customerSex && (params.customerSex = this.customerSex)
                this.customerAge && (params.customerAge = parseInt(this.customerAge))
                console.log(params)


                let data = await getResponses('appOrderBespeak/V3/addNewAppOrderBespeak.json', this.serialize(params), '/depression-api/')
                if (data.code === 0) {

                    this.clickToValet = false
                    this.valetToZero()
                    this.searchUsersForOrderFn()
                } else {
                    alert(data.msg)
                }
            },

            selectAll() {
                console.log(this.checkAllState)
                // this.checkAllState = !this.checkAllState

                if (!this.checkAllState) {
                    this.data.forEach((item) => {
                        if (!item.checkState) {
                            this.selectPersonList.push(item.mid)
                            item.checkState = true
                        }
                    })

                } else {
                    this.data.forEach((item) => {
                        if (item.checkState) {
                            for (let i = 0; i < this.selectPersonList.length; i++) {
                                if (this.selectPersonList[i] == item.mid) {
                                    this.selectPersonList.splice(i, 1)
                                    item.checkState = false
                                }
                            }

                        }
                    })

                }

            },

            selectPerson(mid, item) {
                console.log(item.checkState);
                item.checkState = !item.checkState

                if (item.checkState) {
                    this.selectPersonList.push(mid)
                } else {
                    for (let i = 0; i < this.selectPersonList.length; i++) {
                        if (this.selectPersonList[i] == mid) {
                            this.selectPersonList.splice(i, 1)
                        }
                    }

                }
                //

                console.log(this.selectPersonList)
            },




        },

        ready() {
            this.searchUsersForOrderFn()
        }
    }
</script>
<style src="../../css/valetOrderForOrderList.css"  scoped>


    .select2-drop-active .select2-results .select2-highlighted {
        background: #446e9b;
    }


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
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, 0);
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


</style>
