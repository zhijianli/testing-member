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

    .mask {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, .8);
    }

    .newBox {
        width: 350px;
        border: 1px solid #999;
        display: flex;
        flex-direction: column;
        background: #fff;
        padding: 50px 40px;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 200px;
    }

    .newBox .span {
        margin-right: 13px;
    }

    .newBox select {
        width: 247px;
    }

    .bottom {
        display: flex;
        justify-content: space-around;
    }

    .bottom div:hover {
        background: #169BD5;
        color: #fff;
    }

    .bottom div {
        width: 140px;
        height: 40px;
        border-radius: 4px;
        border: 1px solid #666;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
</style>
<template>
    <div class="container-fluid">
        <div id="search" class="title" style="margin: 20px 0 15px 0;">

            <div style="display: inline-block">
                <input type="submit" v-if="n14" value="新增" class="btn btn-success" @click="searchFn()">
            </div>

        </div>

        <table class="table table-bordered table-striped" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>序号</th>
                <th>团队名称</th>
                <th>负责人</th>
                <th>人数</th>
                <th>是否是自主下单</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.chargePersonName }}</td>
                <td>{{ item.numOfPeople }}</td>
                <td>{{ item.isAutonomousOrderTeam?"是":"否"}}</td>

                <td class="userList_opeartion">
                    <span class="crActive" v-if="n19" @click="jump(item.id,item.name,item.chargePersonId,item.isAutonomousOrderTeam)">编辑</span>
                    <span class="crActive" v-if="n17" @click="del(item.id)">删除</span>
                </td>
                <!--<td>{{ item.paymentMethod}}</td>-->
            </tr>
            </tbody>
        </table>

        <!--新增-->
        <div class="mask" v-if="mask">
            <div class="newBox">
                <lable>
                    <span>团队名称：</span>

                    <input style="width: 230px" type="text" name="curriculumTitle" v-model="teamName">
                </lable>

                <div style="margin: 20px 0">
                    <span class="span">负责人：</span>
                    <select v-model="assistantId">
                        <option :value="item.caid" v-text="item.nickname"
                                v-for="item in assistantList"></option>
                    </select>
                </div>
                <div class="control-group" style="margin-bottom:20px">

                    <span class="span">是否是自主下单团队</span>

                    <label style="display: inline-block" v-for="item in displayList" @click="aa(item.num)">
                        <template v-if="item.num==isAutonomousOrderTeam">
                            <input checked
                                   style="display: inline-block;visibility: inherit;margin-left: 50px;" name="Fruit"
                                   type="radio" value=""/>
                        </template>
                        <template v-else>
                            <input
                                    style="display: inline-block;visibility: inherit;margin-left: 50px;"
                                    name="Fruit"
                                    type="radio" value=""/>
                        </template>
                        {{item.content}}</label>
                </div>
                <div class="bottom">
                    <div class="success" @click="sureAdd">确认</div>
                    <div class="cancel" @click="clearAll">取消</div>

                </div>
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
                mask: false,
                assistantList: [],
                assistantId: '',
                teamName: '',
                teamId: '',
                displayList: [{num: 0, content: "否"}, {num: 1, content: "是"}],
                isAutonomousOrderTeam: 0,

                n14:false,//新增
                n17:false,//删除
                n19:false,//编辑
//                n14:true,//新增
//                n17:true,//删除
//                n19:true,//编辑
            }
        },
        // 处理值的传递
        watch: {},

        methods: {
            aa(n) {
                this.isAutonomousOrderTeam = n;
            },
            searchFn() {
                this.mask = true;
                this.getNew();
            },
            del(id) {
                let that = this;
                let a = confirm("确定删除？")
                if (a === true) {
                    that.deleteTeam(id)
                } else {

                }
            },
            sureAdd() {
                if(this.teamId){
                    this.pull()
                }else{
                    this.add()
                }
            },
            jump(id, name, eid,isAutonomousOrderTeam) {
                this.mask = true;
                this.teamId = id;
                this.teamName = name;
                this.assistantId = eid;
                this.isAutonomousOrderTeam = isAutonomousOrderTeam;
                this.getInfo(id);
            },
            clearAll() {
                this.teamId = '';
                this.teamName = '';
                this.assistantId = '';
                this.isAutonomousOrderTeam=0;
                this.mask = false;
            },
            search() {
                let paramsObj = {}
                paramsObj.userId=sessionStorage.userId;
//                paramsObj.pageIndex=this.page;
//                paramsObj.pageSize=this.maxLink;
//                if(this.start){
//                    paramsObj.begin=this.start;
//                }if(this.end){
//                    paramsObj.end=this.end;
//                }if(this.curriculumTitle){
//                    paramsObj.curriculumTitle=this.curriculumTitle;
//                }if(this.speaker){
//                    paramsObj.speaker=this.speaker;
//                }if(this.userName){
//                    paramsObj.userName=this.userName;
//                }if(this.userPhone){
//                    paramsObj.userPhone=this.userPhone;
//                }


                this.MemberList(this.serialize(paramsObj))
            },


            serialize(obj) {

                let str = ""
                for (let key in obj) {
                    str += `${key}=${obj[key]}&`
                }
                str = str.slice(0, -1)
                return str

            },
            async add() {
                if(!this.teamName){
                    alert('请您填写团队名称')
                }else if(!this.assistantId){
                    alert('请您选择负责人')
                }else{
                    let data = await getCourse("crm/consultAssistantTeam/insertMessage", `chargePersonId=${this.assistantId}&name=${this.teamName}&isAutonomousOrderTeam=${this.isAutonomousOrderTeam}`);

                    if (data.code == 0) {
                        this.clearAll();
                        this.search();
                    } else {
                        alert(`errMsg:${data.msg}`)
                    }
                }

            },

            async pull() {
                let data = await getCourse("crm/consultAssistantTeam/updateMessage", `chargePersonId=${this.assistantId}&name=${this.teamName}&id=${this.teamId}&isAutonomousOrderTeam=${this.isAutonomousOrderTeam}`);
                console.log(data);
                if (data.code == 0) {
                    this.clearAll();
                    this.search();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async deleteTeam(e) {
                let data = await getCourse("crm/consultAssistantTeam/deleteMessage", `id=${e}`);
                console.log(data);
                if (data.code == 0) {
                    this.search();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },


            async getInfo(e) {
                let data = await getCourse("crm/consultAssistantTeam/getConsultAssistantListByTeamIdWhenEditTeam", `id=${e}&userId=${sessionStorage.userId}`);
                console.log(data);
                if (data.code == 0) {
                    this.assistantList = data.consultAssistantList
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async MemberList(params) {
                let data = await getCourse("crm/consultAssistantTeam/getAllMessage", params);
                if (data.code === 0) {
                    this.list = data.ccatList
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },
            async getNew(params) {
                let data = await getCourse("assistantConsult/selectConsultAssistantByIsAssignTeam", 'isAssignTeam=0');
                if (data.code === 0) {
                    console.log(2)
                    this.assistantList = data.caList
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },

            async getPower(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("systemPermission/getOperationPermission.json", `menuId=${this.$route.path.split('?')[1]}&userId=${sessionStorage.userId}`);
                if (data.code === 0) {
                    data.permissionIdList.forEach(v=>{
                        if(v==14){
                            this.n14=true;
                        }else if(v==17){
                            this.n17=true;
                        }else if(v==19){
                            this.n19=true;
                        }
                    })
                    this.search();
//                    this.getNew();
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

        },


        computed: {},
        ready() {
            document.title = "人员机构管理";
            this.getPower();
//            this.search();

        }
    }
</script>