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
        <div id="search" class="title" style="margin-top: 30px">
            <lable>
                用户名：
                <input type="text" name="userName" v-model="userName">
            </lable>
            <lable>
                绑定角色：
                <input type="text" name="roleName" v-model="roleName">
            </lable>
            状态：
            <select v-model="isEnable">
                <option value="2">全部</option>
                <option value="0">启用</option>
                <option value="1">禁用</option>
            </select>

            <div style="display: inline-block">
                <input type="submit" value="查询" class="btn btn-success" @click="searchFn()">
            </div>
            <div style="display: inline-block">
                <input type="submit" value="清空查询" class="btn btn-success" @click="clearSearch()">
            </div>


            <br>
            <!--<span @click="downloadExcel" class="btn btn-success" style="margin-bottom: 15px"-->
            <!--v-if="!isExportingExcel">分配已选择的线索</span>-->

        </div>
        <button class="btn btn-success" style="margin-right:30px;margin-bottom: 20px;color:white;" @click="changeRoute('newAccount')">新建</button>

        <table class="table table-bordered table-striped" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>账户ID</th>
                <th>手机号</th>
                <th>姓名</th>
                <th>部门</th>
                <th>绑定角色</th>
                <th>创建时间</th>
                <th>创建人</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
                <td>{{ item.userId }}</td>
                <td>{{ item.mobilePhone }}</td>
                <td>{{ item.showName }}</td>
                <td>{{ item.dptName }}</td>
                <td>{{ item.roles}}</td>
                <td>{{ item.createTime }}</td>
                <td>{{ item.createUser }}</td>
                <td>{{ item.isEnable==0?'启用':'禁用' }}</td>
                <td class="userList_opeartion">
                    <span class="crActive" @click="jump(item.userId)">修改</span>
                    <span class="crActive" @click="delete(item.userId)">删除</span>


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
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                pageSize:10,
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                list: [],

                criteria:{},
                isEnable:'',
                roleName:'',
                userName:'',

                n10:false,//搜索
                n5:false,//客户信息


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
            clearSearch(){
                this.isEnable='';
                this.roleName='';
                this.userName='';
                this.page = 1;
                this.search();
            },
            channelChangeFn(){
                this.channel2List=[];
                this.criteria.crmConsultAssistantTeamList.forEach(v=>{
                    if(this.consultAssistantTeamId==v.id){
                        this.channel2List=v.caList
                    }
                })
            },
            changeRoute(url) {

                if (url == "newAccount") {
                    this.$dispatch('child-msg', "新建/修改账户")
                }
                this.$route.router.go(url)
            },
            close(){
                this.editRemark = false;
                this.editRemark3=false;
            },
            crowd(){
                this.editRemark3=true;
            },
            jump(id) {
                this.$dispatch('child-msg', "修改账户")
                this.$route.router.go(`/newAccount?id=${id}`)
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
                if(this.userName){
                    paramsObj.userName=this.userName;
                }if(this.roleName){
                    paramsObj.roleName=this.roleName;
                }if(this.isEnable){
                    paramsObj.isEnable=this.isEnable;
                }

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
                let data = await getCourse("depression/system/userRoleList.json", params);


                if (data.code === 0) {
                    this.list = data.DTOList;
                    this.total = data.content.count
                } else {
                    alert(`errMsg:${data.msg}`)
                }


            },


            async getQueryCriteria() {
                let data = await getCourse("crm/clue/getQueryCriteria");

                if (data.code === 0) {
                    this.criteria=data
                }

                this.clearDisabled = false
            },
            async delete(e) {
                let that = this;
                let a = confirm("确定要删除吗？")
                if (a === true) {
                    let data = await getCourse("depression/system/deleteUserRole.json",`userId=${e}`);


                    if (data.code === 0) {
                        that.search();
                    }
                } else {

                }

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
//                    this.getQueryCriteria();
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
            this.search();
//            this.getQueryCriteria();
//            this.getPower();
        }
    }
</script>