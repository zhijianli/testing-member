<style scoped>
	.msgRemindWrap {
		display: flex;
	    margin-top: 10px;
	    margin-bottom: 8px;
	    align-items: center;
	}
	.minWidthC {
		min-width: 1200px;
		display: flex;
		justify-content: space-between;

	}

	.dialog-container-wp {
		width: 300px;
	    padding: 20px;
	    margin: auto;
	    box-shadow: 0 0 15px rgba(0, 0, 0, .4);
	    background-color: #FFF;
	    text-align: left;
	    position: relative;
	}
	.closeIconC {
		position: absolute;
		top: 0px;
		right: 10px;
		color: red;
		cursor: pointer;
		font-size: 26px;
	}

	.operateBox {
		cursor: pointer;
		color: rgb(43, 141, 249);
	}
</style>

<template>
	<div class="container-fluid">
		<div id="search" class="title minWidthC">
			<div>
				<input type="text" name="searchVal" placeholder="请输入关键词" v-model="searchVal">
				<span class="searchMargin"></span>

				<select v-model="status" v-el:type @change="searchStatusChangeFn()">
					<option value="">请选择</option>
					<option :value="1">未联系</option>
					<option :value="2">已联系</option>
					<option :value="3">已流失</option>
					<option :value="4">重点跟踪</option>

				</select>
				<span class="searchMargin"></span>

				<input class="input" size="50" type="text" @input="inputChangeFn" @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">

				<!-- <input type="text" name="" placeholder="开始时间"> -->
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

		    	<!-- <div class="myBtn castaccountBtn"  @click='search' >搜索</div> -->
	        	<input type="submit" value="确定搜索" class="btn btn-warning" @click="search()">
				<span class="searchMargin"></span>

			</div>



			<div class="msgRemindWrap">
				<span>短信提醒：<span style="color: #F14382; margin-right: 10px;";>{{ remindTel }}</span></span>
        		<input type="submit" value="设置" class="btn btn-warning" @click="setRemindTel()">
			</div>

		</div>

		<table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
	        <thead>
	            <tr>
	            	<th style="width:100px;">编号</th>

	            	<th>订单提交时间</th>
	            	<th>预约的专家</th>
	            	<th>预约人</th>

	            	<th>性别</th>
	            	<th>年龄</th>
	            	<th>咨询历史</th>

	            	<th>联系方式</th>
	            	<th>期望咨询时间</th>

	            	<th>详情</th>
	            	<th style="width:100px;">状态</th>
	            	<th>操作</th>
	            </tr>
	        </thead>
	        <tbody>
				<tr v-for="item of list">
					<td> {{ item.hpbId }}</td>

					<td> {{ item.createTime }}</td>
					<td> {{ item.psychoName }}</td>
					<td> {{ item.nickname }}</td>

					<td> {{ item.sex | format }}</td>
					<td> {{ item.customerAge }}岁</td>
					<td> {{ item.consultingHistory | historyListFormat}}</td>

					<td> {{ item.contactInformation }}</td>
					<td> {{ item.expectStartTime }} - {{ item.expectEndTime }}</td>

					<td @click="toShowDetailsFn(item.hpbId)" class="operateBox">查看</td>
					<td>
						<select v-model="item.status" @change="statusChangeFn(item.hpbId, item.status)">
							<option :value="1">未联系</option>
							<option :value="2">已联系</option>
							<option :value="3">已流失</option>
							<option :value="4">重点跟踪</option>
						</select>
					</td>
					<td class="operateBox" @click="toDeleteFn(item.hpbId, item.nickname)">删除</td>
				</tr>
			</tbody>
	    </table>

	    <div class="page">
	    	<div id="test">
	            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl" ><zpagenav>
	        </div>
	    </div>

	    <!-- 设置短信提醒 -->
	    <div class="dialog-wrapper" v-if="remindTelStatus">
            <div class="dialog-container">
                <h4>设置短信提醒</h4>
                <p style="line-height: 30px; margin-bottom: 15px;">请设置有新订单时通知的电话号码</p>
                <input type="text" v-model="newRemindTel" maxlength="11" @input="inputChange">
                <div class="btn-wrapper">
                    <div @click="cancelToSetTel">取消</div>
                    <div @click="sureToSetTel" v-if="! isSending">保存</div>
                    <div v-else>保存中...</div>
                </div>
            </div>
        </div>

        <!-- 查看 -->
        <div class="dialog-wrapper" v-if="showDetailsStatus">
            <div class="dialog-container-wp">
            	<div class="show-details-content-wrap" v-el:details>
            		{{ showDetailsObj.nickname }} <br>
	                {{ showDetailsObj.customerAge }} 岁 &nbsp;&nbsp;{{ showDetailsObj.sex | format }} <br>
	                {{ showDetailsObj.consultingHistory | historyListFormat }} <br>
	                期望咨询时间：{{ showDetailsObj.expectStartTime }} -  {{ showDetailsObj.expectEndTime}}<br>
	                {{ showDetailsObj.description }}
            	</div>
            	<div class="closeIconC" @click="closeShowDetailsWindow">x</div>

                <div class="btn-wrapper">
                	<div style="text-align:center;" @click="toCopyAllText">复制全文</div>
                </div>
            </div>
        </div>

        <!-- 删除 -->
        <div class="dialog-wrapper" v-if="deleteStatus">
            <div class="dialog-container">
                <h4>删除信息确认</h4>
                <p style="line-height: 30px; margin-bottom: 15px;">确定删除<span v-text="'『' + deleteName + '』的记录吗？'"></span></p>
                <div class="btn-wrapper">
                    <div @click="cancelToDel">取消</div>
                    <div @click="sureToDel" v-if="! isDeleting">删除</div>
                    <div v-else>提交中...</div>
                </div>
            </div>
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
        getResponses

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
                	this.calendar.picker == 'picker1' ? this.start = value + ' 00:00:00' : this.end = value + ' 00:00:00'
		    	}

            },

            page() {
            	this.getReservationList()
            }
		},

		filters: {
            format(value) {
                let array = ["未知", "男", "女"]

                return array[value]
            },

            historyListFormat(value) {
            	let array = ["从未做过心理咨询", "有"]

                return array[value]
            }
        },

		data () {
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

                // list: [{status: 0}, {status: 1}, {status: 2}, {status: 0}, {status: 1}, {status: 2}, {status: 0}],
                list: [],
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                pageSize: 10,
                total: 0, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                start: '',
                end: '',
                searchVal: '',
                status: "",

                remindTel: 11166666666,

                remindTelStatus: false,
                newRemindTel: '',
                isSending: false,

                showDetailsStatus: false,
                // showDetailsObj: {
                // 	name: "王女士",
                // 	age: "23",
                // 	sex: "女",
                // 	consulationHistory: "从未做过心理咨询",
                // 	expectedConsultationTime: "2019-09-09 21:30-22:30",
                // 	letterOfPresentation: "情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明情况说明"
                // },

                showDetailsObj: {},

                deleteStatus: false,
                deleteId: '',
                deleteName: "",
                isDeleting: false,
                sexList: ['', '男', '女'],
                consultingHistoryList: ["从未做过心理咨询", "有"]


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

			async toShowDetailsFn(id) {
				this.showDetailsObj = {}

				const data = await getResponses("HomePageBespeak/selectHomePageBespeakById.json", `id=${id}`)

                console.log(data)

                if (data.code === 0) {
                	this.showDetailsObj = data.homePageBespeak

                	this.showDetailsStatus = true
                	// this.getReservationList()
                } else {
                	alert(data.msg)
                }

			},

			inputChange(e) {
				const target = e.target
				const value = target.value

				this.newRemindTel = target.value = value.replace(/\D/g, "")
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

		    search() {
		    	console.log(this.start, this.end, this.searchVal, this.status)
		    	this.page = 1
		    	this.getReservationList()
		    },

		    setRemindTel() {
		    	this.newRemindTel = ""
		    	this.remindTelStatus = true
		    },

		    cancelToSetTel() {
		    	this.remindTelStatus = false
		    	this.newRemindTel = ""
		    	this.isSending = false
		    },

		    async sureToSetTel() {
		    	// 验证手机号是否正确
		    	if (!/^1[0-9]{10}/.test(this.newRemindTel)) {

		    		alert("手机号码格式不对！")

                    return

                }

		    	this.isSending = true

		    	const data = await getResponses("HomePageBespeak/updateMobilePhone.json", `mobile=${this.newRemindTel}`)

		    	if (data.code === 0) {

		    		this.remindTelStatus = false

                	this.getReservationList()

                } else {
                	alert(data.msg)
                }

                this.isSending = false


		    },

		    async statusChangeFn(id, status) {

		    	const params = {
                	ID: id,
                	status: status
                }

		    	const data = await getResponses("HomePageBespeak/updateHomePageBespeakStatus.json", serialize(params))


                if (data.code === 0) {
                	this.getReservationList()
                } else {
                	alert(data.msg)
                }
		    },

		    toCopyAllText() {
		    	let range = document.createRange()
		    	// range.selectNode(document.querySelector(".show-details-content-wrap"))
		    	range.selectNode(this.$els.details)
		    	console.log(range)


		    	let selection = window.getSelection()
		    	selection.removeAllRanges()
		    	selection.addRange(range)

		    	document.execCommand("copy")

		    	selection.removeAllRanges()
		    	range.detach()
		    	range = null


		    },

		    closeShowDetailsWindow() {
		    	this.showDetailsStatus = false
		    },

		    cancelToDel() {
		    	this.deleteStatus = false
		    	this.isDeleting = false

		    },

		    toDeleteFn(id, name) {

		    	this.deleteId = id
		    	this.deleteName = name

		    	this.deleteStatus = true
		    	this.isDeleting = false
		    },

		    async sureToDel() {
		    	this.isDeleting = true

		    	// 请求接口
		    	const data = await getResponses("HomePageBespeak/deleteHomePageBespeakById.json", `id=${this.deleteId}`)

		    	if (data.code === 0) {

		    		this.deleteStatus = false

                	this.getReservationList()

                } else {
                	alert(data.msg)
                }

		    	this.isDeleting = false
		    },

		    async getReservationList() {

              	let params = {
                	pageIndex: this.page,
                	pageSize: this.pageSize,
                	words: this.searchVal.trim()
                }

                if (this.status) {
                	params.status = this.status
                }


                if (this.start) {
                	params.expectStartTime = this.start
                }

                if (this.end) {
                	params.expectEndTime = this.end
                }

                const data = await getResponses("HomePageBespeak/selectHomePageBespeakByPageCondition.json", serialize(params))

                console.log(data)
                if (data.code === 0) {
                	this.list = data.list
                	this.total = data.count
                	this.remindTel = data.SmsAccount.mobilePhone
                } else {
                	alert(data.msg)
                }

            },

            searchStatusChangeFn() {
            	this.page = 1
		    	this.getReservationList()
            },





		},

		ready() {
			this.getReservationList()
		},




	}
</script>
