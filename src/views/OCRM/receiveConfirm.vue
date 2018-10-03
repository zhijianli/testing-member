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

    <div class="container-fluid" style="padding-top: 40px">

        <table class="table table-bordered table-striped" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>序号</th>
                <th>客户来源</th>
                <th>用户手机号</th>
                <th>用户姓名</th>
                <th>性别</th>
                <th>咨询类型</th>
                <th>线索分配到助理时间</th>
                <th>跟进助理</th>
                <th>分成比例（他：我）</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
                <td>{{ item.clueId }}</td>
                <td>{{ item.crmClue.customerSourceName }}</td>
                <td>{{ item.crmClue.customerMobilePhone }}</td>
                <td>{{ item.crmClue.customerName }}</td>
                <td>{{ item.crmClue.customerSex}}</td>
                <td>{{ item.crmClue.consultingTypeName }}</td>
                <td>{{ item.crmClue.assignedToAssistantTime }}</td>
                <td>{{ item.crmClue.consultAssistantName }}</td>
                <td>{{ item.proportions}}</td>
                <td class="userList_opeartion">
                    <span class="crActive" @click="crowd(item.id)">处理</span>
                    <span class="crActive" @click="jump(item.clueId)">客户信息</span>
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
            crowd(id) {
//                let that = this;
                let b='';
                let a = confirm("是否接收这条线索？")
                if (a === true) {
                    b=1;
                } else {
                    b=-1;
                }
                this.isConfirm(id,b)
            },
            jump(id) {
                this.$dispatch('child-msg', "客户信息")
                this.$route.router.go(`/customerInfo?id=${id}`)
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


            async MemberList(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("crm/clueTransferProportions/getClueTransferProportionsByCaId", params);


                if (data.code === 0) {
                    this.list = data.cctpList;
                    this.total = data.count
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },
            async isConfirm(a,b) {
                let data = await getCourse("crm/clueTransferProportions/handleClueTransferProportions", `id=${a}&status=${b}`);
                if (data.code === 0) {
                    this.search();
                } else {
                    alert(`${data.msg}`)
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
            document.title = "接收待确认"
            this.search();
        }
    }
</script>