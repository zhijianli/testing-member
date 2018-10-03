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
    <div class="container-fluid" style="padding-top: 30px">
        普通团队
        <table class="table table-bordered table-striped" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>序号</th>
                <th>团队名称</th>
                <th>负责人</th>
                <th>人数</th>
                <th>本月目标（万元）</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,item) in list">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.chargePersonName }}</td>
                <td>{{ item.numOfPeople }}</td>
                <td id="weights" contenteditable="true" @input="changeWeights(item.id,item.targetData,index)">{{ item.targetData }}</td>
                <!--<td>{{ item.paymentMethod}}</td>-->
            </tr>
            </tbody>
        </table>

        自主下单团队
        <table class="table table-bordered table-striped" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>序号</th>
                <th>团队名称</th>
                <th>负责人</th>
                <th>人数</th>
                <th>本月目标（万元）</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,item) in iaoCcatList">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.chargePersonName }}</td>
                <td>{{ item.numOfPeople }}</td>
                <td id="weights2" contenteditable="true" @input="changeWeights2(item.id,item.targetData,index)">{{ item.targetData }}</td>
                <!--<td>{{ item.paymentMethod}}</td>-->
            </tr>
            </tbody>
        </table>
        <!--<div class="page">-->
        <!--<div id="test">-->
        <!--<zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"-->
        <!--:page-handler="pageHandler" :create-url="createUrl">-->
        <!--</zpagenav>-->
        <!--</div>-->
        <!--</div>-->
        
    </div>

</template>
<script type="text/javascript">
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import calendar from "../../calendar.vue"
    import moment from "moment"
    import {
        getCourse,

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
                iaoCcatList: [],

                start: '',
                end: '',

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
                if (this.start) {
                    paramsObj.begin = this.start;
                }
                if (this.end) {
                    paramsObj.end = this.end;
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

            changeWeights(id,aa,index){

                let v=document.querySelectorAll('#weights')[index].innerHTML;
                console.log(aa)
                console.log(v)
                if(v==aa){

                }else{
//                    alert(`修改成功`)
//                    this.dataList[index].weights=v;


                    let object={};
                    object.relateId=id;
                    object.targetData=v;
                    object.type=0;
                    this.updateUnrealHits(this.serialize(object));
                }
            },
            changeWeights2(id,aa,index){

                let v=document.querySelectorAll('#weights2')[index].innerHTML;
                console.log(aa)
                console.log(v)
                if(v==aa){

                }else{
//                    alert(`修改成功`)
//                    this.dataList[index].weights=v;


                    let object={};
                    object.relateId=id;
                    object.targetData=v;
                    object.type=0;
                    this.updateUnrealHits(this.serialize(object));
                }
            },
            async updateUnrealHits(object) {
                let data = await getCourse("crm/consultAssistantAndTeamTarget/updateAchievements", object);
                if (data.code === 0) {
//                    this.getData()
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            searchFn() {
                this.page = 1
                this.selectPersonList = []
                this.search()
            },
            search() {
                let paramsObj = {}
                paramsObj.userId=sessionStorage.userId;

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


            serialize(obj) {

                let str = ""
                for (let key in obj) {
                    str += `${key}=${obj[key]}&`
                }
                str = str.slice(0, -1)
                return str

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
                let data = await getCourse("crm/consultAssistantAndTeamTarget/getAchievementsMessage", params);
                if (data.code === 0) {
                    this.list = data.ccatList
                    this.iaoCcatList = data.iaoCcatList
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },

            async getPower(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("systemPermission/getOperationPermission.json", `menuId=${this.$route.path.split('?')[1]}&userId=${sessionStorage.userId}`);
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
            document.title = "业绩指标管理";
//            this.getPower();
            this.search();
        }
    }
</script>