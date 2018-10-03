<style scoped>
    .power{
        display: flex;
    }
    .power li{
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
        <div id="search" class="title">
            客户来源：
            <select v-model="customerSourceId">
                <option :value="item.id" v-text="item.name" v-for="item in criteria.crmClueCustomerSourceList"></option>
            </select>



            分配团队：
            <!--<select v-model="consultAssistantTeamId" @change="channelChangeFn">-->
            <select v-model="consultAssistantTeamId">
                <option :value="item.id" v-text="item.name" v-for="item in criteria.crmConsultAssistantTeamList"></option>
            </select>

            跟进助理：
            <select v-model="consultAssistantId">
                <option :value="item.caid" v-text="item.nickname" v-for="item in criteria.crmConsultAssistantList"></option>
            </select>
            <lable>
                用户姓名：
                <input type="text" name="speaker" v-model="customerName">
            </lable>
            <lable>
                用户手机号：
                <input type="text" name="curriculumTitle" v-model="customerMobilePhone">
            </lable>
            <br>
            线索位置：
            <select v-model="position">
                <option :value="item" v-text="item" v-for="item in criteria.positionList"></option>
            </select>

            线索状态：
            <select v-model="status">
                <option :value="item.status" v-text="item.statusName" v-for="item in criteria.statusList"></option>
            </select>
            咨询类型：
            <select v-model="consultingTypeId">
                <option :value="item.id" v-text="item.name" v-for="item in criteria.crmClueConsultingTypeList"></option>
            </select>
            分配到助理时间：
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

            </calendar>
            <div style="display: inline-block">
                <input type="submit" value="搜索" v-if="n10" class="btn btn-success" @click="searchFn()">
            </div>

            <br>
            <!--<span @click="downloadExcel" class="btn btn-success" style="margin-bottom: 15px"-->
                  <!--v-if="!isExportingExcel">分配已选择的线索</span>-->

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
                <th>序号</th>
                <th>客户来源</th>
                <th v-show="showPhone">用户手机号</th>
                <th>用户姓名</th>
                <th>性别</th>
                <th>咨询类型</th>
                <th>线索状态</th>
                <th>线索位置</th>
                <th>分配团队</th>
                <th>线索分配到团队时间</th>
                <th>分配到助理时间</th>
                <th>最近跟进时间</th>
                <th>跟进助理</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
                <td>
                    <div class="checkbox">
                        <input type="checkbox" class="checkboxInp" name="title-table-checkbox"
                               id="title-table-td{{item.id}}" :checked=" item.checkState? 'checked':''"
                               @click='selectPerson(item.id, item)' data-typeId="{{item.id}}">
                        <label class="checkboxLabel" for="title-table-td{{item.id}}"></label>
                    </div>
                </td>
                <td>{{ item.id }}</td>
                <td>{{ item.customerSourceName }}</td>

                <td v-show="showPhone">{{ item.customerMobilePhone }}</td>
                <td>{{ item.customerName }}</td>
                <td>{{ item.customerSex|isSex }}</td>
                <td>{{ item.consultingTypeName }}</td>
                <td>{{ item.statusName }}</td>
                <td>{{ item.position }}</td>
                <td>{{ item.consultAssistantTeamName }}</td>
                <td>{{ item.assignedToTeamTime }}</td>
                <td>{{ item.assignedToAssistantTime }}</td>
                <td>{{ item.updateTime }}</td>
                <td>{{ item.consultAssistantName }}</td>
                <td class="userList_opeartion">
                    <span class="crActive" v-if="n5" @click="jump(item.id)">客户信息</span>
                    <!--<span class="crActive" @click="crowd(item.id)">分配</span>-->
                </td>

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
        <div class="modal-backdrop in" v-if="editRemark3"></div>
        <div id="edtCount3" class="modal" v-if="editRemark3"
             style="width: 1000px;top:20px;margin-left: 0;transform: translateX(-50%)">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                <h3>编辑</h3>
            </div>
            <div class="widget-box">
                <div class="widget-content nopadding">
                    <div class="control-group expertList">
                        <label v-for="item in assistantList" class="pointer">

                            <div class="checkbox" style="display: inline-block;vertical-align: baseline;">
                                <input  type="radio"
                                        class="checkboxInp"
                                        name="title-table-checkbox"
                                        :value="item.caid"
                                        :id="item.caid"
                                        :data-typeid="item.caid"
                                        v-model="expertList"
                                >
                                <!--<label class="checkboxLabel" for="item.caid"></label>-->
                            </div>
                            {{item.nickname}}

                        </label>
                    </div>
                </div>
            </div>
            <div class="branch" style="margin-left: 15px">
                分成比例（我：他）<input type="text" style="width: 30px">:<input type="text" style="width: 30px">

            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
                <template v-if="isUserCanEdit">
                    <a data-dismiss="modal" class="btn btn-danger" href="#" v-if="! isSendingRemarkData"
                       @click="saveEditRemarkFn()">保存</a>
                    <a data-dismiss="modal" class="btn btn-danger" href="#" v-else>发送中。。。</a>
                </template>
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
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                pageSize:10,
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                list: [],
                userInfo:{},
                showPhone:false,
                start: '',
                end: '',


                criteria:{},
                consultAssistantId:null,
                position:'全部',
                status:null,
                consultAssistantTeamId:null,

                consultingTypeId:null,
                customerMobilePhone:'',
                customerName:'',
                customerSourceId:null,
                editRemark3:false,

                n10:false,//搜索
                n5:false,//客户信息



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
                shanID:''

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
                paramsObj.pageIndex=this.page;
                paramsObj.pageSize=this.maxLink;
                paramsObj.userId=sessionStorage.userId;
                if(this.consultAssistantId){
                    paramsObj.consultAssistantId=this.consultAssistantId;
                }if(this.consultAssistantTeamId){
                    paramsObj.consultAssistantTeamId=this.consultAssistantTeamId;
                }if(this.consultingTypeId){
                    paramsObj.consultingTypeId=this.consultingTypeId;
                }if(this.customerMobilePhone){
                    paramsObj.customerMobilePhone=this.customerMobilePhone;
                }if(this.customerName){
                    paramsObj.customerName=this.customerName;
                }if(this.customerSourceId){
                    paramsObj.customerSourceId=this.customerSourceId;
                }if(this.position){
                    paramsObj.position=this.position;
                }if(this.status!==null){
                    paramsObj.status=this.status;
                }if(this.start){
                    paramsObj.assignedToAssistantTimeStart=this.start.replace(/-/g, '/');
                }if(this.end){
                    paramsObj.assignedToAssistantTimeEnd=this.end.replace(/-/g, '/');
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
//            channelChangeFn(){
//                this.channel2List=[];
//                this.criteria.crmConsultAssistantTeamList.forEach(v=>{
//                    if(this.consultAssistantTeamId==v.id){
//                        this.channel2List=v.caList
//                    }
//                })
//            },
            close(){
                this.editRemark = false;
                this.editRemark3=false;
            },
            crowd(){
                this.editRemark3=true;
            },
            jump(id) {
                this.$dispatch('child-msg', "客户信息")
                this.$route.router.go(`/customerInfo?id=${id}&from=1`)
            },

            changeFn(e) {
                this.checkState = e.target.checked
            },
            searchFn() {
                this.page = 1
                this.selectPersonList = []
                this.search()
            },
            search() {
                let paramsObj = {}
                paramsObj.pageIndex=this.page;
                paramsObj.pageSize=this.maxLink;
                paramsObj.userId=sessionStorage.userId;
                if(this.consultAssistantId){
                    paramsObj.consultAssistantId=this.consultAssistantId;
                }if(this.consultAssistantTeamId){
                    paramsObj.consultAssistantTeamId=this.consultAssistantTeamId;
                }if(this.consultingTypeId){
                    paramsObj.consultingTypeId=this.consultingTypeId;
                }if(this.customerMobilePhone){
                    paramsObj.customerMobilePhone=this.customerMobilePhone;
                }if(this.customerName){
                    paramsObj.customerName=this.customerName;
                }if(this.customerSourceId){
                    paramsObj.customerSourceId=this.customerSourceId;
                }if(this.position){
                    paramsObj.position=this.position;
                }if(this.status!==null){
                    paramsObj.status=this.status;
                }if(this.start){
                    paramsObj.assignedToAssistantTimeStart=this.start.replace(/-/g, '/');
                }if(this.end){
                    paramsObj.assignedToAssistantTimeEnd=this.end.replace(/-/g, '/');
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
                let data = await getCourse("crm/clue/getAllClues", params);


                if (data.code === 0) {
                    this.list = data.crmClueList;
                    this.total = data.count
                } else {
                    alert(`errMsg:${data.msg}`)
                }
//                let data = await MemberList(params)
//                this.list = data.members
//                this.total = data.count

//                修改
                this.list.forEach((item) => {   //checkBox
                    Vue.set(item, "checkState", false);
                    if(item.userSex===1){
                        item.userSex='男'
                    }else if(item.userSex===2){
                        item.userSex='女'
                    }else{
                        item.userSex='未知'
                    }
                })

//                修改选中状态
                this.list.forEach((item) => {
                    //当列表中有此id时修改选中状态为选中
                    this.selectPersonList.forEach((v) => {
                        if (item.id === v) {
                            Vue.set(item, "checkState", true);
                        }
                    })
                })


            },


            async getQueryCriteria() {
                let data = await getCourse("crm/clue/getQueryCriteria");

                if (data.code === 0) {
                    this.criteria=data
                }

                this.clearDisabled = false
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

            async downloadExcel() {
                let paramsObj = {}
                paramsObj.pageIndex=this.page;
                paramsObj.pageSize=this.maxLink;
                if(this.start){
                    paramsObj.begin=this.start;
                }if(this.end){
                    paramsObj.end=this.end;
                }if(this.curriculumTitle){
                    paramsObj.curriculumTitle=this.curriculumTitle;
                }if(this.speaker){
                    paramsObj.speaker=this.speaker;
                }if(this.userName){
                    paramsObj.userName=this.userName;
                }if(this.userPhone){
                    paramsObj.userPhone=this.userPhone;
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

                if (this.selectPersonList.length) {
                    paramsObj.ids = JSON.stringify(this.selectPersonList)
                }

                this.isExportingExcel = true
                let p = this.serialize(paramsObj),
                    data = await getResponsesExcel("curriculumOrder/exportOrder.json", p)
                console.log("test:", data)
                let blob = new Blob([data], {
                        'type': 'application/msexcel'
                    }),
                    a = this.$els.a

                a.href = window.URL.createObjectURL(blob)


                a.download = `课程订单列表.xls`
                a.click()

                this.isExportingExcel = false

                this.selectPersonList = []

                //修改
                this.list.forEach((item) => {   //checkBox
                    Vue.set(item, "checkState", false);
                })

            },

            selectAll() {
                console.log(this.checkAllState)
                // this.checkAllState = !this.checkAllState

                if (!this.checkAllState) {
                    this.list.forEach((item) => {
                        if (!item.checkState) {
                            this.selectPersonList.push(item.id)
                            item.checkState = true
                        }
                    })

                } else {
                    this.list.forEach((item) => {
                        if (item.checkState) {
                            for (let i = 0; i < this.selectPersonList.length; i++) {
                                if (this.selectPersonList[i] == item.id) {
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

                console.log(this.selectPersonList)
            },
            async getPower(params) {
                this.userInfo=JSON.parse(sessionStorage.userInfo)
                console.log(this.userInfo)

                if(this.userInfo.systemUserInfoDTO.userType=='99'){
                    this.showPhone=true
                }else{
                    this.showPhone=false
                }
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("systemPermission/getOperationPermission.json", `menuId=${this.$route.path.split('?')[1]}&userId=${sessionStorage.userId}`);
                if (data.code === 0) {
                    data.permissionIdList.forEach(v=>{
                        if(v==5){
                            this.n5=true;
                        }else if(v==10){
                            this.n10=true;
                        }
                    })
                    this.search();
                    this.getQueryCriteria();
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
                let arr = ['未知','男', '女'];
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
            document.title = "线索管理-总表"
//            this.search();
//            this.getQueryCriteria();
            this.getPower();
        }
    }
</script>