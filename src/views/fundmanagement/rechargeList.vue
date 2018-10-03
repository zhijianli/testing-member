<style>
    .msgRemindWrap {
        display: flex;
    }
    .minWidthC {
        min-width: 1200px;
        display: flex;
        justify-content: space-between;

    }
    .span-title-4 {
        display: inline-block;
        width: 5em;
    }
    .my-span-btn {
        height: 50px;
        line-height: 50px;
        width: 80px;
        padding: 0 10px;
        cursor: pointer;
        text-align: center;
        vertical-align: top;
        color: #fff;
        background-color: #28b578;
        border-radius: 5px;
        margin-right: 30px;
    }

    .my-span-channel {
        display: inline-block;
        margin-left: 50px;
    }


</style>
<template>
	<div class="container-fluid">
        <div id="search" class="title minWidthC">
            <div>
                <span class="span-title-4">充值时间：</span>
                <input class="input" size="50" type="text" @input="inputChangeFn" @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">
                 -
                <input class="input" size="50" type="text" @input="inputChangeFn2" @click.stop="open($event,'picker2')" v-model="calendar.items.picker2.value" placeholder="结束时间" id="end" name="end">

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
                <span class="my-span-channel">渠道：</span>
                <select v-model="channel1"  @change="channelChangeFn">
                    <option :value="0">全部</option>
                    <option :value="1">IOS</option>
                    <option :value="2">Android</option>
                    <option :value="3">后台</option>
                </select>

                <select v-model="channel2">
                    <option value="">全部</option>
                    <option :value="item.memberChannalName" v-text="item.memberChannalName" v-for="item in channel2List" :key="item.memberChannalId"></option>

                </select>


                <br>
                <span class="span-title-4">手机号：</span>
                <input type="text" name="mobilePhone" id="mobilePhone" class="searchVal" v-model='mobilePhone'  placeholder="手机号" />

            </div>



            <div class="msgRemindWrap">
                <div class="my-span-btn"  @click='searchFn'>搜索</div>
                <span @click="downloadExcel" class="my-span-btn" v-if="!isExportingExcel">导出Excel</span>
                <span class="my-span-btn" style="cursor:wait;" v-else>导出中...</span>
                <a href="javascript:;" v-el:a></a>
            </div>

        </div>

        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
            <tr>
                <th style="width:100px;">ID</th>

                <th>昵称</th>
                <th>手机号</th>
                <th>充值金额</th>
                <th>赠送金额</th>
                <th>充值时间</th>
                <th>注册时间</th>
                <th>充值类型</th>
                <th>充值总金额</th>
                <th>消费总金额</th>
                <th>渠道</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item of list">
                <td>{{ item.mid }}</td>
                <td>{{ item.nickname }}</td>
                <td>{{ item.mobilePhone }}</td>

                <td>{{ item.amount}}</td>
                <td>{{ item.presentAmount}}</td>
                <td>{{ item.createTime }}</td>
                <td>{{ item.regTime }}</td>
                <td>{{ item.remark }}</td>
                <td>{{ item.payAmount }}</td>
                <td>{{ item.expenseAmount }}</td>
                <td>{{ item.memberChannalName }}</td>
            </tr>
            </tbody>
        </table>

        <div class="page" style="justify-content: flex-start">
            <div id="test">
                <zpagenav  :page="page" :page-size="pageSize" :total="total" :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl" ></zpagenav>
            </div>
            <span style="line-height: 34px;
    margin-left: 50px;">充值人数总计：{{personTotal}}</span>
            <span style="line-height: 34px;
    margin-left: 50px;">充值金额总计：{{rechargeTotal}}</span>
        </div>

    </div>
</template>
<script>

    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import calendar from "../../calendar.vue"
    import moment from "moment"

    import $ from "jquery"
    import {serialize} from "../../utils"

    import {
        getResponse,
        getResponses,
        getResponsesExcel

    } from "../../api"


    Vue.use(zpagenav)

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

        watch:{
            'calendar.value': function(value) {
                console.log(value)
                if (value) {
                    this.calendar.items[this.calendar.picker].value = value
                    this.calendar.picker == 'picker1' ? this.start = value + ' 00:00:00' : this.end = value + ' 23:59:59'
                }

            },

            page() {
                this.getRechargeListFn()
            }
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
                pageSize: 10,
                total: 0, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                start: '',
                end: '',
                channel1: 0,
                channel2: '',
                channel2List: [],
                mobilePhone: '',
                list: [],
                recodeObj: {
                    pageIndex: 1,
                    pageSize: 10,
                    begin: '',
                    end: '',
                    channalType: 0,
                    memberChannalName: '',
                    mobilePhone: '',
                    items: 0,
                },
                isExportingExcel: false,
                personTotal:'',
                rechargeTotal:'',
            }
        },

        methods: {
            inputChangeFn(e) {
                const target = e.target
                const value = target.value

                console.log(value)

                if (!value) {
                    this.start = ""
                }
            },

            inputChangeFn2(e) {
                const target = e.target
                const value = target.value

                console.log(value)

                if (!value) {
                    this.end = ""
                }
            },


            pageHandler(page) {
                //here you can do custom state update
                this.page = page
            },
            createUrl(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },

            open(e,type) {
                // 设置类型
                this.calendar.picker=type
                this.calendar.type=this.calendar.items[type].type
                this.calendar.range=this.calendar.items[type].range
                this.calendar.begin=this.calendar.items[type].begin
                this.calendar.end=this.calendar.items[type].end
                this.calendar.value=this.calendar.items[type].value
                // 可不用写
                this.calendar.sep=this.calendar.items[type].sep
                this.calendar.weeks=this.calendar.items[type].weeks
                this.calendar.months=this.calendar.items[type].months

                this.calendar.show=true
                this.calendar.x=e.target.offsetLeft
                this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8
            },


            async downloadExcel() {


                this.isExportingExcel = true

                let p = serialize(this.recodeObj),
                    data = await getResponsesExcel("Income/exportRechargeRecord.json", p)
                let blob = new Blob([data], {
                        'type': 'application/msexcel'
                    }),
                    a = this.$els.a

                a.href = window.URL.createObjectURL(blob)


                a.download = `充值记录列表.xls`


                a.click()

                this.isExportingExcel = false

            },
            searchFn() {
                this.page = 1
                this.getRechargeListFn()
            },

            async channelChangeFn() {
                //      当一级渠道改变时获取并修改二级渠道列表
                const data = await getResponses('depression/member/getAllChannalName.json', `channalType=${this.channel1}`)
                console.log(data)
                if (data.code === 0){
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

            async getRechargeListFn() {

                this.recodeObj = {
                    begin: this.start,
                    end: this.end,
                    channalType: this.channel1,
                    memberChannalName: this.channel2,
                    mobilePhone: this.mobilePhone.trim(),
                    pageIndex: this.page,
                    pageSize: this.pageSize,
                }

                console.log(this.recodeObj)

                const data = await getResponses('Income/selectReChargeByQuery.json', serialize(this.recodeObj))

                if (data.code === 0) {
                    this.list = data.list
                    this.list.forEach(v=>{
                        if(v.presentAmount===null){
                            v.presentAmount=0;
                        }
                    })
                    this.personTotal=data.personTotal
                    this.rechargeTotal=data.rechargeTotal

                    this.total = data.count
                } else {
                    alert(data.msg)
                }


            }


        },

        ready() {
            document.title = "充值记录列表"
            this.getRechargeListFn()
            this.channelChangeFn()
        }
    }


</script>