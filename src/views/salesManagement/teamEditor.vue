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
        overflow-y: auto;
        background: rgba(0, 0, 0, .8);
    }

    .newBox {
        width: 350px;
        border: 1px solid #999;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #fff;
        padding: 50px 40px;
        margin: 100px auto;

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
    .btnTrue{
        width: 140px;
        height: 40px;
        font-size: 14px;
        border-radius: 4px;
        background: #169BD5;
        color: #fff;
        mask: 20px auto;
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
                <th>助理姓名</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
                <td>{{ item.caid }}</td>
                <td>{{ item.teamName }}</td>
                <td>{{ item.nickname }}</td>
                <td class="userList_opeartion">
                    <span class="crActive" v-if="n17" @click="del(item.caid)">删除</span>
                </td>

                <!--<td>{{ item.paymentMethod}}</td>-->
            </tr>
            </tbody>
        </table>


        <!--新增-->
        <div class="mask" v-if="mask">
            <div class="newBox">
                <table class="table table-bordered table-striped">

                    <thead>
                    <tr>
                        <th>状态</th>
                        <th>姓名</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(index,item) in assistantList">
                        <td v-text="item.isTrue?'已添加':'未添加'" style="color: #41BEDD;cursor: pointer"
                            @click="enable(item.caid,item.isTrue,index)"></td>
                        <td>{{ item.nickname }}</td>
                    </tr>

                    </tbody>
                </table>
                <div class="btnTrue" @click="btnTrue">确定</div>
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
                pageSize: 10,
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                list: [],
                mask: false,
                assistantList: [],

                n14:false,//新增
                n17:false,//删除

//                n14:true,//新增
//                n17:true,//删除
            }
        },
        // 处理值的传递
        watch: {},

        methods: {
            btnTrue(){
                this.mask=false;
                this.search();
            },
            del(id) {
                let that = this;
                let a = confirm("确定删除？")
                if (a === true) {
                    that.deleteAssistant(id)
                } else {

                }
            },
            async deleteAssistant(e) {
                let data = await getCourse("crm/consultAssistantTeam/deleteConsultAssistantToTeam", `caid=${e}&userId=${sessionStorage.userId}`);
                console.log(data);
                if (data.code == 0) {
                    this.search();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            enable(a, b,c) {
                if (b == 0) {
                    this.assistantList[c].isTrue=1;
                    b = 1;
                } else {
                    b = 0;
                    this.assistantList[c].isTrue=0;
                }
                this.isTrue(a, b);
            },

            async isTrue(id, num) {
                let data = await getCourse("crm/consultAssistantTeam/addConsultAssistantToTeam", `caid=${id}&userId=${sessionStorage.userId}`);
                console.log(data);
                if (data.code == 0) {

                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            searchFn() {
                this.getNew();
                this.mask = true;
            },
            search() {
                let paramsObj = {}
//                paramsObj.id = 1;
                paramsObj.userId=sessionStorage.userId;
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

            async MemberList(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("crm/consultAssistantTeam/getConsultAssistantList", params);

                if (data.code === 0) {
                    this.list = data.consultAssistantList;
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },


            async getNew(params) {
                let data = await getCourse("assistantConsult/selectConsultAssistantByIsAssignTeam", 'isAssignTeam=0');
                if (data.code === 0) {
                    this.assistantList = data.caList
                } else {
                    alert(`errMsg:${data.msg}`)
                }
                this.assistantList.forEach((item) => {
                    Vue.set(item, "isTrue", 0);

                })
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
                        }
                    })
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


        },


        computed: {},
        ready() {
            document.title = "团队编辑";
            this.getPower();
//            this.search();

        }
    }
</script>