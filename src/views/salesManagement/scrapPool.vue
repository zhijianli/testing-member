<style scoped>
    .power {
        display: flex;
    }

    .power li {
        width: 140px;
        height: 40px;
        border-radius: 4px;
        background: #169BD5;
        color: #fff;
        font-size: 14px;
        margin-right: 20px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

    }
</style>
<template>
    <div class="container-fluid">
        <div id="search" class="title" style="margin:20px 0 10px 0">
            客户来源：
            <select v-model="customerSourceId">
                <option :value="item.id" v-text="item.name" v-for="item in criteria.crmClueCustomerSourceList"></option>
            </select>


            <lable>
                用户手机号：
                <input type="text" name="curriculumTitle" v-model="customerMobilePhone">
            </lable>
            <lable>
                用户姓名：
                <input type="text" name="speaker" v-model="customerName">
            </lable>

            咨询类型：
            <select v-model="consultingTypeId">
                <option :value="item.id" v-text="item.name" v-for="item in criteria.crmClueConsultingTypeList"></option>
            </select>

            放弃类型：
            <select v-model="followType">
                <option value="0">系统放弃</option>
                <option value="1">助理放弃</option>
            </select>


            <div style="display: inline-block">
                <input type="submit" value="搜索" v-if="n10" class="btn btn-success" @click="searchFn()">
            </div>

        </div>

        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>序号</th>
                <th>客户来源</th>
                <th>用户手机号</th>
                <th>用户姓名</th>
                <th>性别</th>
                <th>咨询类型</th>
                <th>跟进助理</th>
                <th>放弃类型</th>
                <th>放弃时间</th>
                <th>放弃原因</th>
                <th>未联系天数</th>
                <th>在库时长</th>
                <th>最近联系时间</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
                <td>{{ item.id }}</td>
                <td>{{ item.customerSourceName }}</td>
                <td>{{ item.customerMobilePhone }}</td>
                <td>{{ item.customerName }}</td>
                <td>{{ item.customerSex | isSex }}</td>
                <td>{{ item.consultingTypeName }}</td>
                <td>{{ item.consultAssistantName }}</td>
                <td>{{ item.abandonmentType }}</td>
                <td>{{ item.abandonmentTime }}</td>
                <td>{{ item.abandonmentReason }}</td>
                <td>{{ item.unrelatedDates }}</td>
                <td>{{ item.timeOfLibrary }}</td>
                <td>{{ item.recentContactTime }}</td>
                <td class="userList_opeartion">
                    <span class="crActive" @click="jump(item.id)" v-if="n5">客户信息</span>
                    <span class="crActive" @click="crowd(item.id)" v-if="n22">放入公海</span>
                </td>
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
        getCourse,
        MemberList,
        updateMember,
        addMember,
        addDisableMessageDays,
        clearDisableMessageDays,
        getResponse,
        getResponses,
        getResponsesExcel

    } from '../../api'

    Vue.use(zpagenav)

    Vue.filter("reverse", function (value) {
        return value == '1' ? '普通会员' : '咨询师'
    })

    export default {

        // 	# Options
        // * :show    是否显示
        // * :type    date|datetime
        // * :value	默认值
        // * :begin  可选开始时间
        // * :end    可选结束时间
        // * :x      显示x坐标
        // * :y      显示y坐标
        // * :range  是否多选
        // * :weeks	星期标题
        // * :months	月份标题
        // * :sep		分隔符

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
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                pageSize: 10,
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                list: [],
                criteria: {},
                consultingTypeId: '',
                customerMobilePhone: '',
                customerName: '',
                customerSourceId: '',

                n10:false,//搜索
                n5:false,//客户信息
                n22:false,//放入公海

//                n10:true,//搜索
//                n5:true,//客户信息
//                n22:true,//放入公海

                start: '',
                end: '',
                curriculumTitle: '',
                speaker: '',
                userName: '',
                userPhone: '',
                params: "",
                mid: "",
                uploadPassword: '123456',
                reset: false,
                add: false,
                edit: false,
                addnickname: '',
                addpassw: '',
                addtel: "",
                editnickname: "",
                edittel: '',
                eidtpassword: '',
                infoChannel: '',


                BannedPopup: false,
                clearDisabled: false,
                days: "",
                selectPersonList: [],
                selectPersonAll: false,
                recentPageCheckedNumber: '',
                channel1: 0,
                channel2: '',
                channel2List: [],
                isExportingExcel: false,


                //start
                followType: ''

            }
        },
        // 处理值的传递
        watch: {
            'calendar.value': function (value) {
                this.calendar.items[this.calendar.picker].value = value
                this.calendar.picker == 'picker1' ? this.start = value + ' 00:00:00' : this.end = value + ' 23:59:59'
            },
            page() {
                let paramsObj = {}
                paramsObj.pageIndex = this.page;
                paramsObj.pageSize = this.maxLink;
                paramsObj.userId=sessionStorage.userId;
                if (this.consultingTypeId) {
                    paramsObj.consultingTypeId = this.consultingTypeId;
                }
                if (this.customerMobilePhone) {
                    paramsObj.customerMobilePhone = this.customerMobilePhone;
                }
                if (this.customerName) {
                    paramsObj.customerName = this.customerName;
                }
                if (this.customerSourceId) {
                    paramsObj.customerSourceId = this.customerSourceId;
                }
                if (this.followType) {
                    paramsObj.followType = this.followType;
                }
                this.MemberList(this.serialize(paramsObj))
            }
        },

        methods: {
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
            jump(id) {
                this.$dispatch('child-msg', "客户信息")
                this.$route.router.go(`/customerInfo?id=${id}`)
            },
            searchFn() {
                this.page = 1;
                this.search()
            },
            search() {
                let paramsObj = {}
                paramsObj.pageIndex = this.page;
                paramsObj.pageSize = this.maxLink;
                paramsObj.userId=sessionStorage.userId;
                if (this.consultingTypeId) {
                    paramsObj.consultingTypeId = this.consultingTypeId;
                }
                if (this.customerMobilePhone) {
                    paramsObj.customerMobilePhone = this.customerMobilePhone;
                }
                if (this.customerName) {
                    paramsObj.customerName = this.customerName;
                }
                if (this.customerSourceId) {
                    paramsObj.customerSourceId = this.customerSourceId;
                }
                if (this.followType) {
                    paramsObj.followType = this.followType;
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


                this.MemberList(this.serialize(paramsObj))
            },
            changeRoute(url) {

                if (url == "receiveConfirm") {
                    this.$dispatch('child-msg', "线索管理-私海-接收待确认")
                } else if (url == "newCued") {
                    this.$dispatch('child-msg', "新增线索")
                } else if (url == "receivePublicCued") {
                    this.$dispatch('child-msg', "领取公海线索")
                }
                this.$route.router.go(url)
            },


            addFn() {
                this.add = true
            },
            editFn(nickname, tel, mid) {

                this.editnickname = nickname
                this.edittel = tel
                this.edit = true
                this.mid = mid

            },
            configEdit() {
                let params = `mid=${this.mid}&userPassword=${this.eidtpassword}&nickname=${this.editnickname}&mobilePhone=${this.edittel}`
                this.updateMember(params)
            },
            uploadPass(mid) {

                this.mid = mid
                this.reset = true
            },

            configAdd() {
                if (this.addtel == '' || !/^1[3,5,7,8][0-9]{9}/.test(this.addtel)) {
                    alert('手机号码填写错误')
                    return false
                }
                let params = `nickname=${this.addnickname}&userPassword=${this.addpassw}&mobilePhone=${this.addtel}`
                this.addMember(params)
            },

            configReset() {

                let params = `mid=${this.mid}&userPassword=${this.uploadPassword}`
                this.updateMember(params)
            },
            serialize(obj) {

                let str = ""
                for (let key in obj) {
                    str += `${key}=${obj[key]}&`
                }
                str = str.slice(0, -1)
                return str

            },
            close() {

                this.reset = false
                this.add = false
                this.edit = false

                this.BannedPopup = false
                this.clearDisabled = false
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

            async MemberList(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("crm/clue/getAbandonedPoolClues", params);
                if (data.code === 0) {
                    this.list = data.crmClueList;
                    this.total = data.count
                } else {
                    alert(`errMsg:${data.msg}`)
                }
//                let data = await MemberList(params)
//                this.list = data.members
//                this.total = data.count


            },

            DisableFn(id) {
                this.mid = id
                this.BannedPopup = true
            },

            configClearFn(id) {
                this.mid = id
                this.clearDisabled = true
            },

            configBanned() {
                if (this.days <= 0) {
                    alert('禁言天数不能小于等于0')
                    return false
                }
                this.addDisableMessageDays()
            },

            configClearDisabled() {
                this.clearDisableMessageDays()
            },


            async getPower(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("systemPermission/getOperationPermission.json", `menuId=${this.$route.path.split('?')[1]}&userId=${sessionStorage.userId}`);

                if (data.code === 0) {
                    data.permissionIdList.forEach(v=>{
                        if(v==5){
                            this.n5=true;
                        }else if(v==10){
                            this.n10=true;
                        }else if(v==22){
                            this.n22=true;
                        }
                    })

                    this.search();
                    this.getQueryCriteria();
                } else {
                    alert(`${data.error}`)
                }

            },

            async getQueryCriteria() {
                let data = await getCourse("crm/clue/getQueryCriteria");

                if (data.code === 0) {
                    this.criteria = data
                }

            },
            crowd(id) {
                let that = this;
                let a = confirm("确定放入公海？")
                if (a === true) {
                    that.pullCrowd(id)
                } else {

                }
            },

            async pullCrowd(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("crm/clue/fromAbandonedPoolToInternationalWater", `crmClueId=${params}`);

                if (data.code === 0) {
                    this.search();
                } else {
                    alert(`${data.error}`)
                }

            },

        },
        filters: {
            isEnableFilter(tag) {
                let arr = ['启用', '禁用']
                return arr[tag]
            },
            isSex(tag) {
                let arr = ['未知', '男', '女'];
                return arr[tag]
            },

        },


        computed: {
            checkAllState: function () {
                this.recentPageCheckedNumber = 0
                for (let i = 0; i < this.list.length; i++) {
                    for (let j = 0; j < this.selectPersonList.length; j++) {
                        if (this.list[i].id === this.selectPersonList[j]) {
                            this.recentPageCheckedNumber++;
                            break;
                        }
                    }
                }
                return !!this.list.length && this.recentPageCheckedNumber === this.list.length

            }
        },
        ready() {
            document.title = "私海"
            this.getPower();
//            this.search();
//            this.getQueryCriteria();
        }
    }
</script>