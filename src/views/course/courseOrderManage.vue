<template>

    <div class="container-fluid">
        <div id="search" class="title">
            <lable>
                课程标题：
                <input type="text" name="curriculumTitle" v-model="curriculumTitle">
            </lable>
            <lable>
                主讲人：
                <input type="text" name="speaker" v-model="speaker">
            </lable>

            <lable>
                用户昵称：
                <input type="text" name="userName" v-model="userName">
            </lable>
            <lable>
                用户手机号：
                <input type="text" name="userPhone" v-model="userPhone">
            </lable>
            <br>

            创建时间：
            <input class="input" size="50" type="text" @click.stop="open($event,'picker1')"
                   v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">
            -
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
                    :sep.sync="calendar.sep">

            </calendar>


            <div style="display: inline-block">

                <input type="submit" value="查询" class="btn btn-warning" @click="searchFn()">

                <span @click="downloadExcel" class="btn btn-success" style="margin: -10px 0 0 4px;"
                      v-if="!isExportingExcel">导出Excel</span>
                <span class="btn btn-success" style="margin: -10px 0 0 4px;cursor: wait;" v-else>导出中....</span>

                <a href="javascript:;" v-el:a></a>
            </div>

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
                <th>订单号</th>
                <th>创建时间</th>
                <th>课程标题</th>
                <th>主讲人</th>
                <th>用户昵称</th>
                <th>用户性别</th>
                <th>用户年龄</th>
                <th>用户所在地</th>
                <th>手机号</th>
                <th>课程价格（元）</th>
                <th>实付金额</th>
                <th>支付方式</th>
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
                <td>{{ item.orderNo }}</td>
                <td>{{ item.createTime }}</td>
                <td>{{ item.curriculumTitle }}</td>
                <td>{{ item.speaker }}</td>
                <td>{{ item.userName }}</td>
                <td>{{ item.userSex }}</td>
                <td>{{ item.userAge }}</td>
                <td>{{ item.userAddress }}</td>
                <td>{{ item.userPhone }}</td>
                <td>{{ item.curricelumPrice }}</td>
                <td>{{ item.paidPrice }}</td>
                <td>{{ item.paymentMethod}}</td>
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
                pageSize:10,
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                list: [],

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
            searchFn() {
                this.page = 1
                this.selectPersonList = []
                this.search()
            },
            search() {
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
                let data = await getCourse("curriculumOrder/selectByCondition.json", params);


                if (data.code === 0) {
                    this.list = data.curriculumOrder;
                    this.total = data.count
                } else {
                    alert(`errMsg:${data.msg}`)
                }
//                let data = await MemberList(params)
//                this.list = data.members
//                this.total = data.count

                //修改
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

                //修改选中状态
                this.list.forEach((item) => {
                    //当列表中有此id时修改选中状态为选中
                    this.selectPersonList.forEach((v) => {
                        if (item.id === v) {
                            Vue.set(item, "checkState", true);
                        }
                    })
                })


            },
            async updateMember(params) {
                let data = await updateMember(params)
                if (data.code == 0) {
                    this.MemberList(this.params)
                    this.reset = false
                    this.edit = false
                } else {
                    alert(data.msg)
                    this.reset = false
                    this.edit = false
                }
            },
            async addMember(params) {
                let data = await addMember(params)
                if (data.code == 0) {
                    this.MemberList(this.params)
                    this.add = false
                } else {
                    alert(data.msg)
                    this.add = false
                }
            },

            async addDisableMessageDays() {
                let data = await addDisableMessageDays(`days=${this.days}&mid=${this.mid}`)

                if (data.code === 0) {
                    this.search()
                }

                this.BannedPopup = false
            },

            async clearDisableMessageDays() {
                let data = await clearDisableMessageDays(`mid=${this.mid}`)

                if (data.code === 0) {
                    this.search()
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

            async channelChangeFn() {
                //      当一级渠道改变时获取并修改二级渠道列表
                const data = await getResponses('depression/member/getAllChannalName.json', `channalType=${this.channel1}`)
                console.log(data)
                if (data.code === 0) {
                    this.channel2List = data.list

                    //    判断当前选中的二级渠道是否在新的二级渠道中
                    let flag = false
                    this.channel2List.forEach((item) => {
                        if (item.memberChannalName === this.channel2) {
                            flag = true
                            return
                        }
                    })

                    if (!flag) {
                        this.channel2 = ''
                    }
                } else {
                    alert(data.msg)
                }


            },

        },
        filters: {
            isEnableFilter(tag) {
                let arr = ['启用', '禁用']
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
            document.title = "课程订单列表"
            this.search();
        }
    }
</script>