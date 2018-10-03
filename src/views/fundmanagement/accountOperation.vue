<template>
<!-- ///////////////////////////////////////////////////////////////////// -->

<!-- ///////////////////////////////////////////////////////////////////// -->
<div class="container-fluid">
	<ul class="tagCont">
		<li v-else>
			<div class="past">
		        <div id="search" class="title">

					<input type="text" id="aaaa" value="" placeholder="用户手机号/昵称" v-model='searchVal.word'/>

					<div class="myBtn settlementBtn"  @click='getListOperator'>搜索</div>
				</div>
				<table class="table table-bordered table-striped  mytable" id="tablePpastMonList" style="margin-top: 20px;">
		            <thead>
		                <tr>
												<th>
		                        <div class="checkbox">
		                            <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-th"
		                                   @click='selectAll' :checked="checkAllState">
		                            <label for="title-table-th" class="checkboxLabel"></label>
		                        </div>
		                    </th>
												<th>用户昵称</th>
				                <th>用户账号</th>
				                <th>注册时间</th>
				                <th>咨询单数</th>
				                <th>加减币</th>
				                <th>加减币情况说明</th>
		                </tr>
		            </thead>
		            <tbody>
									<tr v-for='item in pastMonList'>
										    <td>

													<div class="checkbox">
															<input type="checkbox" class="checkboxInp" name="title-table-checkbox"
																		 id="title-table-td{{item.mid}}" :checked=" item.checkState? 'checked':''"  @click='selectPerson(item.mid, item)' data-typeId="{{item.mid}}">
															<label class="checkboxLabel" for="title-table-td{{item.mid}}"></label>
													</div>

										    </td>
		                    <td>{{item.nickName}}</td>
		                    <td>{{item.account}}</td>
		                    <td>{{item.creatTime}}</td>
		                    <td>{{item.advisoryNum}}</td>
												<td>
													<span class="check textGreen" @click='newClearing(item.mid,item.cashBalance)'>操作</span>
												</td>
												<td>
													<span class="check textGreen" @click='clearing(item.mid)'>查看</span>
												</td>
						</tr>
					</tbody>
				</table>

			</div>
			<div id="testPastMon" class="myPagenav">
		        <zpagenav  :page="pagePastMon", :page-size="pageSize", :total="totalPastMon", :max-link="maxLinkPastMon" :page-handler="pageHandlerPastMon" :create-url="createUrlPastMon"><zpagenav>
		  </div>

    	<div class="record" style="line-height: 33px;margin-left: 15px;">
			<span @click="downloadExcel" class="btn btn-success" style="margin: -10px 0 0 4px;">导出Excel</span>
			<a href="javascript:;" v-el:a></a>
			</div>
			<table class="table table-bordered table-striped  mytable" id="NewtablePpastMonList" style="margin-top: 20px;">
							<thead>
								<tr >

									<th>加减币日志</th>

								</tr>
							</thead>
							<tbody>
								<tr v-for='item in thisMonList'>

											<td>{{item.creatTime}}，{{item.userName}}为用户{{item.account}}增加{{item.amount}}元，当时余额{{item.cashBalance}}元</td>

								</tr>
				</tbody>
			</table>
			<div id="testPastMon" class="myPagenav">
		        <zpagenav  :page="newPagePastMon", :page-size="newPageSize", :total="newTotalPastMon", :max-link="newMaxLinkPastMon" :page-handler="newPageHandlerPastMon" :create-url="newCreateUrlPastMon"><zpagenav>
		  </div>

    	<div class="record" style="line-height: 33px;margin-left: 15px;">
			<span @click="newDownloadExcel" class="btn btn-success" style="margin: -10px 0 0 4px;">导出Excel</span>

			</div>
		</li>
	</ul>
</div>

	<!--
	弹窗样式隐藏为 hide
	遮罩 in为显示
	 -->
	<div id="myAlert" class="modal {{dropState}}">
	    <div class="modal-header">
	        <button data-dismiss="modal" class="close" type="button" @click='closeDrop'>×</button>
	        <h3>情况说明</h3>
	    </div>
	    <div class="modal-body">
	      <p style="height: 100px;">{{textareaRecord}}</p>
	    </div>
	</div>
	<div class="modal-backdrop {{dropState}}"></div>


	<div id="myAlert" class="modal {{newDropState}}">
	    <div class="modal-header">
	        <button data-dismiss="modal" class="close" type="button" @click='newCloseDrop'>×</button>
					<h3>加减币</h3>
	    </div>
	    <div class="modal-body">
				<!-- <p>结算给{{settleMsg.name}}（账号{{settleMsg.account}}）金额{{settleMsg.amount}}</p> -->
				<p class="textboxInput">加上<input type="text" value="" placeholder="输入金额，可为负数" style="margin-left: 10px;margin-right: 10px;" v-model="aa"></input>元</p>
				<p>情况说明</p>
				<textarea class="textBox" v-model="bb" placeholder="请详细说明加减币的原因">

				</textarea>
				<div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click='newTwoCloseDrop'>取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click='sendRequest'>提交</a> </div>
	    </div>
	</div>
	<div class="modal-backdrop {{newDropState}}"></div>


	<div id="myAlert" class="modal {{newDropStateTwo}}">
	    <div class="modal-header">
	        <button data-dismiss="modal" class="close" type="button" @click='newCloseDropTwo'>×</button>
					<h3>加减币</h3>
	    </div>
	    <div class="modal-body">
				<p>确认加减币操作?</p>
				<div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click='newCloseDropTwo'>取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click='newSendRequest'>确认</a> </div>
	    </div>
	</div>
	<div class="modal-backdrop {{newDropStateTwo}}"></div>


	<div id="myAlert" class="modal {{newDropStateThree}}">
	    <div class="modal-header">
	        <button data-dismiss="modal" class="close" type="button" @click='newCloseDropThree'>×</button>
					<h3>加减币</h3>
	    </div>
	    <div class="modal-body">
				<p>操作成功：用户当前余额{{aaaaaa}}元</p>
				<div class="modal-footer"> <a data-dismiss="modal" class="btn btn-danger" href="#" @click='newSendRequestTwo'>确认</a> </div>
	    </div>
	</div>
	<div class="modal-backdrop {{newDropStateThree}}"></div>
</template>
<script>
import calendar from "../../calendar.vue"
import moment from "moment"
import { doSettleForThisMon,getSettlementForThisMonAndRecord,listOperator, getResponses, getResponsesExcel, MemberList } from "../../api"
import { serialize } from "../../utils"

import $ from "jquery"
import zpagenav from "vue-pagenav"
import Vue from "vue"
Vue.use(zpagenav)

export default {
  components:{
	calendar
  },
  data(){
    return {
    	checkState:{
	    	thisMonList:false, /*本月dataList*/
				pastMonList:false, /*往期dataList*/
	    	newPastMonList:false, /*往期dataList*/
    	},
			userId: sessionStorage.userId,
			aa:'',
			bb:'',
			gg:'',
			textareaRecord:'',
    	table:'',/**/
    	dropState:'hide',  /*弹窗状态*/
			newDropState:'hide',  /*弹窗状态*/
			newDropStateTwo:'hide',  /*弹窗状态*/
			newDropStateThree:'hide',  /*弹窗状态*/
    	stateResoult:"",   /*结算结果*/
    	auditor:"other",
    	searchVal:{ // /*搜索内容*/
			account:"",            //	账户	string	选填
			amount:"",             //	申请提现金额	number	选填
			auditTime:"",          //	结算时间	object	选填
			auditor:"",            //	操作人	number	选填
			channel:"",            //	提现（渠道）方式	number	选填(0 微信，1银联)
			mid:"",
			no:"",                 //	申请编号	string	选填
			status:"",             //	状态	number	选填(0 未审核，1已审核) 比如在获取未结算需要传入0，往期传入1
			wrid:"",               //	结算ID	number	选填
			words: '',
    	},
    	operatorList:[],
    	effectVal:{},/*有效 搜索内容*/
    	tagFirstClick:true,
    	dropName:"", /*弹窗内容*/
    	dropAccunt:"",/*弹窗内容*/
    	dropMoney:"",/*弹窗内容*/
    	settleMsg:{  /*结算内容*/
    		name:"",
	    	account:"",
	    	amount:"",
	    	no:"",
    	},
			aaaaaa:'',
			bbbbbb:'',
			selectPersonList: [],
    	thisMonList:"", /*本月dataList*/
    	pastMonList:"", /*往期dataList*/
			newPastMonList:"",
    	tagCont:{   //tag标签判断
			tagContState:true,
			isA:true,
			isB:false
		},
		excel:{ /*导出到excel*/
			list:0,
			testIncome:0,
			testExpense:0,
		},
		pageIndex: 1,
		pageSize:10,  //公用 显示条数
		newPageSize:10,
		pageThisMon: 1,      /*跳转的页面*/
    	newPageThisMon: 1,      /*跳转的页面*/
        totalThisMon: 10,    /*页面总共数量*/
        maxLinkThisMon: 10,	 /*显示的页面 >= 5*/   //--------
				pagePastMon: 1, 	 /*跳转的页面*/
        newPagePastMon: 1, 	 /*跳转的页面*/
        totalPastMon: 10, 	 /*页面总共数量*/
				newTotalPastMon: 10,
        maxLinkPastMon: 10,	 /*显示的页面 >= 5*/
				newMaxLinkPastMon: 10,	 /*显示的页面 >= 5*/
		calendar:{
		    show:false,
		    x:0,
		    y:0,
		    picker:"",
		    type:"date",
		    value:"",
		    begin:"",
		    end:"",
		    value:"",
		    weeks:[],
		    months:[],
		    range:false,
		    items:{
		        // 单选模式
		        picker1:{
		            type:"date",
		            end:moment().format().split('T')[0],
		            value:"",
		            weeks:['日', '一', '二', '三', '四', '五', '六'],
		            months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		        },
		        picker2:{
		            value:"",
		            begin:""
		        },
		    }
		}
    }
  },
  route:{

  },
  watch:{
    'calendar.value': function (value) {
        this.calendar.items[this.calendar.picker].value=value
    }
  },
  methods:{

		selectAll() {
				console.log(this.checkAllState)

				if (!this.checkAllState) {
						this.pastMonList.forEach((item) => {
								if (!item.checkState) {
										this.selectPersonList.push(item.mid)
										item.checkState = true
								}
						})

				} else {
						this.pastMonList.forEach((item) => {
								if (item.checkState) {
										for (let i = 0; i < this.selectPersonList.length; i++) {
												if (this.selectPersonList[i] == item.mid) {
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
  	//---------------------------------------------------------------------导出excel ↓
	templateText(data){
    	let self = this
    	return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">\
			<head>
			<xml>
			  <x:ExcelWorkbook>
			    <x:ExcelWorksheets>
			      <x:ExcelWorksheet>
			        <x:Name>{{worksheet}}</x:Name>
			        <x:WorksheetOptions>
			          <x:DisplayGridlines/>
			        </x:WorksheetOptions>
			      </x:ExcelWorksheet>
			    </x:ExcelWorksheets>
			  </x:ExcelWorkbook>
			</xml><![endif]-->
			</head>
			<body>
				<table>
					${data}
				</table>
			</body>
		</html>`
    },
    base64(string){
    	return window.btoa(unescape(encodeURIComponent(string)))
    },

    tableToExcel: function (tableList, name) {
		let tables = []
		let	uri = 'data:application/vnd.ms-excel;base64,'


		  for(var i = 0; i < tableList.length; i++) {
		    	tables.push(tableList[i].innerHTML);
		  }
		  var data = {
		    worksheet: name || 'Worksheet',
		    tables: tables
		  };

		 return uri + this.base64(this.templateText(data.tables));
	},

	exportHandler(tableID) {
		this.table = ""
		this.tableFn(tableID)
	  event.currentTarget.href = this.tableToExcel(this.table, '用户数据');
		this.getExportExcel()

	},

	configAdd() {

	},

	tableFn(tableID){

		let tables = $(tableID)
		let self = this
		tables.each(function (i) {
		    var t = $('<table><thead></thead><tbody></tobdy></table>');
		    t.find('thead').html(this.tHead.innerHTML);
		    t.find('tbody').append($(this.tBodies).children(':visible').clone());
		    t.find('tbody tr').each(function(){
		    	console.log(!$(this).find('input:checkbox').is(':checked'))
		    	if(!$(this).find('input:checkbox').is(':checked')){
		    		$(this).addClass('not-print')
		    	}
		    })
		    t.find('.not-print').remove(); // not-print 是@media print中不会打印的部分

		    t.find('a').replaceWith(function (i) { // 表格中不再需要的超链接也移除了
				return this.innerHTML;
		    });
		    self.table = self.table ? self.table.add(t) : t;

		});

	},
  	//-----------------------------------------------------------------导出excel ↑
    changeTagContState(state){
    	if(state){
    		this.tagCont.tagContState = true
    		this.tagCont.isA = true
    		this.tagCont.isB = false
    	}else {
    		this.tagCont.tagContState = false
    		this.tagCont.isA = false
    		this.tagCont.isB = true
    		if( this.tagFirstClick ){  // 首次切换时请求
    			this.getTheRecord()
    			this.tagFirstClick = false
    		}
    	}
    },

    async getTheRecord(){  //往期
		this.effectVal.status = 1
		let paramsObj = {

			pageIndex: this.pagePastMon,
			pageSize: this.pageSize,
			word:this.searchVal.word,
		}
		let data = await getResponses('capitalOperation/memberCapitalList.json',serialize(paramsObj))

		if( data.code==0 ){
			this.pastMonList = data.capitalOperationRecordDTO
			this.totalPastMon = data.count
			this.pastMonList.forEach((item) => {   //checkBox
					Vue.set(item, "checkState", false);
			})

			//修改选中状态
			this.pastMonList.forEach((item) => {
					//当列表中有此id时修改选中状态为选中
					this.selectPersonList.forEach((v) => {
							if (item.mid === v) {
									Vue.set(item, "checkState", true);
							}
					})
			})
		}else{
			alert(`errMsg:${data.msg}`)
		}
    },



		async getExportExcel(){  //往期

    this.effectVal.pageIndex = this.pagePastMon
		this.effectVal.pageSize = this.pageSize
		this.effectVal.status = 1
		let paramsObj = {

			word:this.searchVal.word,
		}
		let data = await getResponses('capitalOperation/export.json',serialize(paramsObj))

		if( data.code==0 ){
			this.pastMonList = data.capitalOperationRecordDTO
			this.totalPastMon = data.count
		}else{
			alert(`errMsg:${data.msg}`)
		}
    },


		async getShowHow(e){  //加减币情况说明
		console.log(this.mid);
		let paramsObj = {
			mid :e,
		}
		let data = await getResponses('capitalOperation/operationDetail.json',serialize(paramsObj))
		if( data.code==0 ){
			this.textareaRecord = data.record;
		}else{
			alert(`errMsg:${data.msg}`)
		}
    },


		async getCurrencylog(){  //往期

		let paramsObj = {
			pageIndex: this.newPagePastMon,
			pageSize: this.pageSize,
			word:this.searchVal.word,
		}
		let data = await getResponses('capitalOperation/operationLog.json',serialize(paramsObj))

		if( data.code==0 ){

			this.thisMonList = data.capitalOperationRecordDTO
			this.newTotalPastMon = data.count
			console.log(this.newTotalPastMon);
			this.thisMonList.forEach((item) => {   //checkBox
					Vue.set(item, "checkState", false);
			})
		}

		// if( data.code==0 ){
		// 	this.thisMonList = data.capitalOperationRecordDTO
		// 	this.newTotalPastMon = data.count
		// }
		else{
			alert(`errMsg:${data.msg}`)
		}
    },


    async doSettle(){
    	let name = sessionStorage.username
    	let paramsObj = {
    	record: this.bb,
      mid : this.mid,
			userId: this.userId,
			amount : this.aa,

    	}
        let data = await getResponses('capitalOperation/memberCapitalList.json', serialize(paramsObj))
		if (data.code === 0) {
		} else {
    	    alert(data.error)
		}

    },
    async getListOperator(){
    	let paramsObj = {
				cashBalance : this.gg,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				word:this.searchVal.word,
    	}
			let data = await getResponses('capitalOperation/memberCapitalList.json', serialize(paramsObj))
			if (data.code === 0) {
				this.getTheRecord()
				this.getCurrencylog()
							// this.getThisMon()
			} else {
						alert(data.error)
			}
		},

	 sendRequest(){ // 结算请求   点击 弹框的确定按钮
		 // if (this.aa == '' || !/^(-|\+)?\d+$/.test(this.aa)) {
		 // 		if (this.aa == '' || !/[-+]?\d+(\.\d+)?$/.test(this.aa)) {
		if (this.aa == '' || !/^(?:0|\-?(?:0\.\d*[1-9]|[1-9]\d*(?:\.\d*[1-9])?))$/.test(this.aa)) {
				alert('金额填写错误')
				return
		}
		if (this.bb == '') {
				alert('情况说明不能为空')
				return
		}

		console.log(this.gg)
		console.log(this.aa)
		// if ( this.gg + parseInt(this.aa) <= 0 && parseInt(this.aa) < 0 ) {
		if ( this.gg + parseInt(this.aa) < 0 ) {
				alert('余额不能为负')
				return
		}
		this.closeDrop()
		this.newCloseDrop()
		this.newClearingTwo()
	},

	async newSendRequest(){ //
		console.log(`发送结算请求`)
		this.newCloseDropTwo()
		this.newClearingThree()
		let paramsObj = {
			mid : this.mid,
			userId: this.userId,
			amount: this.aa,
			record: this.bb,
		}
		let data = await getResponses('capitalOperation/operateCapital.json',serialize(paramsObj))

		if( data.code==0 ){
			this.aaaaaa=data.capitalAmount;
		}else{
			alert(`errMsg:${data.msg}`)
		}
		this.aa = '';
		this.bb = '';
	},

	newSendRequestTwo(){ //
		this.newCloseDropThree()
		this.getCurrencylog()
		this.getTheRecord()
	},

	async clearing(e){   //点击表单查看按钮
		this.dropState = 'in'
		this.getShowHow(e)
	},
	closeDrop(){  //关弹框
		this.dropState = "hide"
	},
	async newClearing(newMid,e){   //点击操作按钮
		this.newDropState = 'in'
		this.mid = newMid
		this.gg = e
	},
	newCloseDrop(){  //关弹框
		this.newDropState = "hide"
		// this.aa = '';
		// this.bb = '';
		// this.getTheRecord()
	},
	newTwoCloseDrop(){  //关弹框
		this.newDropState = "hide"
		this.aa = '';
		this.bb = '';
		// this.getTheRecord()
	},
	newClearingTwo(){   //点击加减币按钮
		this.newDropStateTwo = 'in'
	},
	newCloseDropTwo(){  //关弹框
		this.newDropStateTwo = "hide"
	},
	newClearingThree(){   //点击加减币按钮
		this.newDropStateThree = 'in'
	},
	newCloseDropThree(){  //关弹框
		this.newDropStateThree = "hide"
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
    pageHandlerThisMon: function(page) {
      //here you can do custom state update
    	this.pageThisMon = page
    	this.getThisMon()
    },
    createUrlThisMon: function(unit) {
		return unit.pageThisMon > 1?'#pageThisMon=' + unit.pageThisMon:'#'
    },

    pageHandlerPastMon: function(page) {
    	this.pagePastMon = page
    	this.getTheRecord()
    },

		newPageHandlerPastMon: function(page) {
    	this.newPagePastMon = page
    	console.log(`pagePastMon: ${this.newPagePastMon}`)
    	this.getCurrencylog()
    },

    createUrlPastMon: function(unit) {

    	return unit.pagePastMon > 1?'#pagePastMon=' + unit.pagePastMon:'#'
    },
		newCreateUrlPastMon: function(unit) {
    	console.log('newCreateUrlPastMon')
    	return unit.newPagePastMon > 1?'#newPagePastMon=' + unit.newPagePastMon:'#'
    },

		paramsFn() {
			let params = {}
			params.word = this.searchVal.word


			this.searchVal.words.trim() && (params.word = this.searchVal.words.trim())

			return params
		},
		// 导出excel
		async newDownloadExcel() {
				let paramsObj = this.paramsFn()

				if (this.selectPersonList.length) {
						paramsObj.ids = JSON.stringify(this.selectPersonList)
						console.log(paramsObj.ids);
				}

				let p = this.serialize(paramsObj),
				data = await getResponsesExcel("capitalOperation/logExport.json ", p)

				let blob = new Blob([data], {
								'type': 'application/msexcel'
						}),
						a = this.$els.a

				a.href = window.URL.createObjectURL(blob)



				a.download = `加减币日志.xls`
				a.click()


		},

		async downloadExcel() {
				let paramsObj = this.paramsFn()

				if (this.selectPersonList.length) {
						paramsObj.ids = JSON.stringify(this.selectPersonList)
						console.log(paramsObj.ids);
				}

				let p = this.serialize(paramsObj),
						data = await getResponsesExcel("capitalOperation/export.json", p)
				console.log("test:",data)
				let blob = new Blob([data], {
								'type': 'application/msexcel'
						}),
						a = this.$els.a

				a.href = window.URL.createObjectURL(blob)



				a.download = `账户资金操作.xls`
				a.click()


		},
		serialize(obj) {

				let str = ""
				for (let key in obj) {
						str += `${key}=${obj[key]}&`
				}
				str = str.slice(0, -1)
				return str

		},

  },
	computed: {
			checkAllState: function() {
					this.recentPageCheckedNumber = 0
					for (let i = 0; i < this.pastMonList.length; i++) {
							for (let j = 0; j < this.selectPersonList.length; j++) {
									if (this.pastMonList[i].mid === this.selectPersonList[j]) {
											this.recentPageCheckedNumber++;
											break;
									}
							}
					}
					return !!this.pastMonList.length && this.recentPageCheckedNumber === this.pastMonList.length
			}
	},
  ready(){
		this.getTheRecord()
    this.getCurrencylog()
  }
}
</script>
<style scoped>
.settlementBtn {
    display: inline-block;
    vertical-align: top;
		margin-left: 15px;
}
.textBox {
	width: 523px;
	height: 138px;
	margin-bottom: 20px;
}
.textboxInput{
	height: 35px;
	line-height: 35px;
	margin-bottom: 20px;
}
</style>
