<template>
<!-- ///////////////////////////////////////////////////////////////////// -->

<!-- ///////////////////////////////////////////////////////////////////// -->
<div class="container-fluid mid">
		<div id="search" class="title mySearchBox">
			<span class="searchTit">姓名</span>
			<input type="text" id="bbbb" value="" placeholder="姓名" v-model='nickname'/>
			<span class="searchMargin">账号</span>
			<input type="text" id="aaaa" value="" placeholder="账号" v-model='account'/>  <br/>
			<span class="searchTit">咨询师资质</span>
			<select name="" id="select" v-model='title' style="width: 180px;">
				<option value="0">国家二级心理师</option>
				<option value="1">国家三级心理师</option>
				<option value="2">心理精神科医师</option>
				<option value="other" selected="">咨询师资质（其他）</option> 
			</select>  <br/>
			<span class="searchTit">注册时间</span>
			<input class="input" size="20" type="text" @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="enrollStart">
		    
			<!-- <input type="text" name="" placeholder="开始时间"> -->
			<span class="searchMargin"></span>
			<input class="input" size="20" type="text" @click.stop="open($event,'picker2')" v-model="calendar.items.picker2.value" placeholder="结束时间" id="end" name="enrollEnd">
			<br/>
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
			    :months="calendar.months">
		    </calendar>
		    <span class="searchTit">咨询数</span>
			<input type="text" name="" id="" value="" v-model='startAnswerCount' placeholder="咨询数起始" />
			<span class="searchMargin"></span>
			<input type="text" name="" id="" value="" v-model='endAnswerCount'   placeholder="咨询数结束" /> <br/>
			<span class="searchTit">收入金额</span>
			<input type="text" name="" id="" value="" v-model='startServiceIncomeAmount' placeholder="收入金额起始" />
			<span class="searchMargin"></span>
			<input type="text" name="" id="" value="" v-model='endServiceIncomeAmount' placeholder="收入金额结束" /> <br/>
			<span class="searchTit">累计收入前</span>
			<input type="text" name="" id="rate" value="" v-model='topPercent' placeholder="前n%（只填一项）" />
			<span class="searchMargin"></span>
			<input type="text" name="" id="num" value="" v-model='topNum' placeholder="前n人（只填一项）" /> <br/>
			<!-- <input type="button" value="确定" class="searchBtn" @click='getSearchVal'/>   -->
			<div class="myBtn"  @click='getSearchVal'>搜索</div>

		</div>

<!-- ///////////////////////////////////////////////////////////////////// -->

	<div class="right">
		<table class="table table-bordered table-striped  mytable" id="DataTables_Table_0">
		    <thead>
		        <tr>
		            <th>总收入</th>
		            <th>支出</th>
		            <th>提现</th>
		            <th>余额</th>
		        </tr>
		    </thead>
		    <tbody>
		    	<tr>
				    <td>{{accountAmount.serviceIncomeAmount}}</td>
				    <td>{{accountAmount.expenseAmount}}</td>
				    <td>{{accountAmount.withdrawAmount}}</td>
				    <td>{{accountAmount.cashBalance}}</td>
				</tr>
			</tbody>
		</table>
		<div class="tag">
			<ul class="tagTit">
				<li  @click='changeTagContState(true)'   v-bind:class="{ 'show': tagCont.isA}">收支记录</li>
				<li  @click='changeTagContState(false)'  v-bind:class="{ 'show': tagCont.isB}">提现记录</li>
			</ul>
			<ul class="tagCont">
				<!-- <li class="show"> -->
				<li v-show="tagCont.tagContState">
					<table class="table table-bordered table-striped  mytable" id="tableIncomeRecordList">
			            <thead>
			                <tr>
			                    <th @click='selectAll("incomeRecordList")' class="check">全选</th>
			                    <!-- <th>序号</th> -->
			                    <th>订单号</th>
			                    <th>订单时间</th>
			                    <th>订单收入</th>
			                </tr>
			            </thead>
			            <tbody>
			            	<tr v-for='item in incomeRecordList'>
    	                    <td>
		                        <div class="checkbox">
		                            <input type="checkbox" id="incomeRecordList-{{$index}}" class="checkboxInp" name="title-table-checkbox" :checked=" checkState.incomeRecordList? 'checked':''">
		                            <label for="incomeRecordList-{{$index}}" class="checkboxLabel"></label>
		                        </div>
		                    </td>
							  <!-- <td>{{item.ieid}}</td> -->
							  <td>{{item.orderNo}}</td>
							  <td>{{item.createTime}}</td>
							  <td>{{item.amount}}</td>
							</tr>
						</tbody>
					</table>
					<div id="testIncome" class="myPagenav">
			            <zpagenav  :page="pageIncome", :page-size="pageSizeIncome", :total="totalIncome", :max-link="maxLinkIncome" :page-handler="pageHandlerIncome" :create-url="createUrlIncome"><zpagenav>
			        </div>
			        <div class="record">
						<a :href="url" download="咨询师资金账户收支记录.xls" @click="exportHandler('#tableIncomeRecordList')" class="myBtn">导出excel</a>
					</div>
				</li>
				<li v-else>
					<table class="table table-bordered table-striped  mytable" id="tableExpenseRecordList">
			            <thead>
			                <tr>
		                		<th @click='selectAll("expenseRecordList")' class="check">全选</th>
			                    <!-- <th>序号</th> -->
			                    <th>提现单号</th>
			                    <th>提现时间</th>
			                    <th>提现金额</th>
			                </tr>
			            </thead>
			            <tbody>
			            	<tr v-for='item in expenseRecordList'>
	    	                    <td>
			                        <div class="checkbox">
			                            <input type="checkbox" id="expenseRecordList-{{$index}}" class="checkboxInp" name="title-table-checkbox" :checked=" checkState.expenseRecordList? 'checked':''" >
			                            <label for="expenseRecordList-{{$index}}" class="checkboxLabel"></label>
			                        </div>
			                    </td>
							   <!-- <td>{{item.ieid}}</td> -->
							   <td>{{item.no}}</td>
							   <td>{{item.createTime}}</td>
							   <td>{{item.amount}}</td>
							</tr>
						</tbody>
					</table>
					<div id="testExpense" class="myPagenav">
			            <zpagenav  :page="pageExpense", :page-size="pageSizeExpense", :total="totalExpense", :max-link="maxLinkExpense" :page-handler="pageHandlerExpense" :create-url="createUrlExpense"><zpagenav>
			        </div>
	        		<div class="record">
						<a :href="url" download="咨询师资金账户提现记录.xls" @click="exportHandler('#tableExpenseRecordList')" class="myBtn">导出excel</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div class="left">
	<!-- ///////////////////////////////////////////////////////////////////// -->
        <table class="table table-bordered table-striped  mytable" id="tableDataList" >
            <thead>
                <tr>
                    <th @click='selectAll("dataList")' class="check">全选</th>
                    <th>账号</th>
                    <th>姓名</th>
                    <th>注册时间</th>
                    <th>资质</th>
                    <th>咨询数（电话）</th>
                    <th>账户余额</th>
                    <th>累计纯收入</th>
                    <th>订单详情</th>
                </tr>
            </thead>
            <tbody>
            	<tr v-for='item in dataList'>   
                    <td>
                        <div class="checkbox">
                            <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp" name="title-table-checkbox" :checked=" checkState.dataList? 'checked':''" @click.stop='count(dataList)'>
                            <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                        </div>
                    </td>
                    <td>{{item.mobilePhone}}</td>
                    <td>{{item.nickname}}</td>
                    <td>{{item.regTime}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.answerCount}}</td>
                    <td>{{item.cashBalance}}</td>
                    <td>{{item.serviceIncomeAmount}}</td>
                    <!-- <td class="check textGreen" @click='getExpense(item.mid)'>订单详情</td> -->
                    <td @click='getExpense(item.mid)'  :class=" this.RecordMid == item.mid ? 'check textGreen':'check'">订单详情</td>
				</tr>
			</tbody>
		</table>
		<div id="test" class="myPagenav">
            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
        </div>
		<div class="record">
			<a :href="url" download="咨询师资金账户列表.xls" @click="exportHandler('#tableDataList')" class="myBtn">导出excel</a>
		</div>
	</div>
</div>
</template>
<script>
import calendar from "../../calendar.vue"
import moment from "moment"
import {getAccount ,getAccountThenIncomeAndExpense } from "../../api"    
import {serialize} from "../../utils"
import $ from "jquery"

import Vue from "vue"
import zpagenav from "vue-pagenav"
Vue.use(zpagenav)

export default {
  components:{
	calendar
   },
  data(){
    return {
    	selectedList:[],//全选列表 全选
    	checkState:{
    		dataList:false,
    		expenseRecordList:false,
    		incomeRecordList:false,
    	},
    	table:'',/**/
    	effectVal:{},
    	dataList:[],
		account:"",	//账户	string	可填   								------------------------------------
		endAnswerCount:"",	//回答数范围结束	number	可填
		endServiceIncomeAmount:"",	//收入金额范围结束	number	可填
		endTime:"",	//结束时间	number	可填
		nickname:"",	//姓名	string	可填
		pageSize:10,	//当前页显示的条数	number	必填 10
		sortName:"",	//排序的字段名称	string	可填
		sortType:"",	//排序的类型：asc，desc	string	可填
		startAnswerCount:"",	//回答数范围开始	number	可填
		startServiceIncomeAmount:"",	//收入金额范围开始	number	可填
		startTime:"",	//开始时间	number	可填
		title:"other",	//资质	string	可填
		topNum:"",	//前多少条记录	number	可填
		topPercent:"",	//前多少条记录的百分比	number	可填
		userType:2,	//用户类型：1 普通用户，2 咨询师	number	必填   ------------------------------------
		incomeRecordList:[],//-------------右侧收支记录-----------------------
		incomeRecordCount:"",//-------------右侧收支记录-----------------------
		RecordMid:"",//-------------右侧收支记录-----------------------
	    expenseRecordList:[],//-------------右侧收支记录-----------------------
		expenseRecordCount:"",//-------------右侧收支记录-----------------------
		tagCont:{			//-------------右侧收支记录-----------------------
			tagContState:true,
			isA:true,
			isB:false,
		},
		accountAmount:{  //右侧 用户详情 总收入 支出 等
			serviceIncomeAmount:0, //总收入
			withdrawAmount:0,//总提现
			expenseAmount:0,//总支出
			cashBalance:0,//总余额
		},
		excel:{ /*导出到excel*/
			list:0,
			testIncome:0,
			testExpense:0,
		},
    	page: 1, 		      //跳转的页面 
        total: 10, 	          //页面总共数量
        maxLink: 10,	      //显示的页面
        pageIncome: 1, 		   
        totalIncome: 10, 	  
        maxLinkIncome: 10,	  
        pageExpense: 1, 	 
        totalExpense: 10, 	
        maxLinkExpense: 10,
        calendar:{  //
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
  watch:{
        'calendar.value': function (value) {
            this.calendar.items[this.calendar.picker].value=value
            console.log(`calendar: ${this.calendar.items.picker1.value}`)
    }
  }, 
  route: {
	data() {
		document.title = '求助者资金管理'
	}
  },
  methods:{
  	count(){
  		this.excel.list++
  		console.log(`count`)
  	},
  	selectAll(whichBox){  //selectedList
		switch (whichBox){  
			case "dataList":
				this.checkState.dataList = !this.checkState.dataList
				break;
			case "expenseRecordList":
				this.checkState.expenseRecordList = !this.checkState.expenseRecordList
				break;
			case "incomeRecordList":
				this.checkState.incomeRecordList = !this.checkState.incomeRecordList
			default:
				console.log(`errMsg:${whichBox}`)
				break;
		}
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
    	}
  
    },
    getSearchVal(){   //处理空值

    	this.effectVal = {}
		if (this.account) {
			//this.effectVal.account = this.account  
			this.effectVal.mobilePhone = this.account  //
		}	

		if (this.endAnswerCount) {
			this.effectVal.endAnswerCount = this.endAnswerCount
		}	

		if (this.endServiceIncomeAmount) {
			this.effectVal.endServiceIncomeAmount = this.endServiceIncomeAmount
		}	

		if (this.calendar.items.picker1.value) {
			this.effectVal.startTime = this.calendar.items.picker1.value.replace(/\//g, "-") + " 00:00:00"
		}		
		if (this.calendar.items.picker2.value) {
			this.effectVal.endTime = this.calendar.items.picker2.value.replace(/\//g, "-") + " 00:00:00"
		}	

		if (this.nickname) {
			this.effectVal.nickname = this.nickname
		}
		if (this.sortName) {
			this.effectVal.sortName = this.sortName
		}	

		if (this.sortType) {
			this.effectVal.sortType = this.sortType
		}	

		if (this.startAnswerCount) {
			this.effectVal.startAnswerCount = this.startAnswerCount
		}	

		if (this.startServiceIncomeAmount) {
			this.effectVal.startServiceIncomeAmount = this.startServiceIncomeAmount
		}	


		if (this.title) {    // 资质 改格式
			if(this.title == 'other'){
				delete this.effectVal.title
			}else{
				this.effectVal.title = this.title
			}
		}	

		if (this.topNum) {
			this.effectVal.topNum = this.topNum
		}	

		if (this.topPercent) {
			this.effectVal.topPercent = this.topPercent
		}

		if( this.effectVal.topPercent&&this.effectVal.topNum ){
			alert('百分比或人数只填一项')
		}else{
			//处理完
			this.getData() 
		}

	},
    async getData(){

    	this.effectVal.pageIndex = this.page
		this.effectVal.pageSize = this.pageSize
		this.effectVal.userType = this.userType

		let params = serialize(this.effectVal)
		let data = await getAccount(params)
		if( data.code == 0){
			this.dataList = data.list
			this.total = data.count
		}else{
			alert(`errMsg:${data.code}`)
		}
    },
    // setPageNav(  dataCount , pageSize ,dataList){   //左分页    右分页？ 
    // 	if(dataList.length < pageSize){
    // 		console.log('<<<<<< hide ')  //隐藏分页
    // 	}else{
    // 		console.log('>>>>>> show')
    // 	}
    // 	console.log( Math.ceil(dataCount/pageSize) )
    // 	return  Math.ceil(dataCount/pageSize)
    // },
    //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓查看订单详情↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    getExpense( mid ){   // 左侧点击查看详情   同时请求两次
    	this.RecordMid = mid 
    	console.log(`mid:${mid}`)
    	this.getInomeNavPageData()
    	this.getExpenseNavPageData()
    },
   	getInomeNavPageData(){
   		let incomeObj = {  
    		items:1,   // 0 充值，1服务收入，2消费、3提现
    		mid:this.RecordMid,
    		pageSize:this.pageSize,
    		pageIndex:this.pageIncome
    	}
    	let incomeParams = serialize( incomeObj )
    	this.getIcomeData( incomeParams )
   	},
   	getExpenseNavPageData(){
   		let expenseObj = {
    		items:3,  // 0 充值，1服务收入，2消费、3提现
    		mid:this.RecordMid,
    		pageSize:this.pageSize,
    		pageIndex:this.pageExpense
    	}

    	let expenseParams = serialize(expenseObj)
    	this.getExpenseData ( expenseParams )
   	},
    async getIcomeData( postMsg ){
    	let data = await getAccountThenIncomeAndExpense( postMsg )
    	if( data.code == 0 ){
	    	this.incomeRecordList = data.list
	    	this.incomeRecordCount = data.count

	    	this.accountAmount.serviceIncomeAmount = data.cpa.serviceIncomeAmount  //总收入
	    	this.accountAmount.withdrawAmount = data.cpa.withdrawAmount            //总提现
	    	this.accountAmount.expenseAmount = data.cpa.expenseAmount			   //总支出
	    	this.accountAmount.cashBalance = data.cpa.cashBalance				   //余额


	    	this.totalIncome =  this.incomeRecordCount // this.setPageNav( this.incomeRecordCount , this.pageSize , this.incomeRecordList)  
    	}else{

    		alert(`errMsg:${data.msg}`)
    	}
    },
    async getExpenseData( postMsg ){
    	let data = await getAccountThenIncomeAndExpense( postMsg )
    	if( data.code == 0 ){
	    	this.expenseRecordList = data.list
	    	this.expenseRecordCount = data.count
	    	this.totalExpense =  this.expenseRecordCount //this.setPageNav( this.expenseRecordCount , this.pageSize , this.expenseRecordList)  
    	}else{
    		alert(`errMsg:${data.msg}`)
    	}
    },
   //↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑查看订单详情↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
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
    pageHandler: function(page) {
      //here you can do custom state update
      	console.log('pageNavLeft')
    	this.page = page
    	this.getData() 
    },
    createUrl: function(unit) {
    	return unit.page > 1?'#page=' + unit.page:'#'
    },
    pageHandlerIncome: function(page) {
      //here you can do custom state update
      	console.log('pageHandlerIncome')
    	this.pageIncome = page
    	this.getInomeNavPageData()
    },
    createUrlIncome: function(unit) {
    	return unit.pageIncome > 1?'#pagRight=' + unit.pageIncome:'#'
    },

    pageHandlerExpense: function(page) {
      //here you can do custom state update
      	console.log('pageHandlerExpense')
    	this.pageExpense = page
    	this.getExpenseNavPageData()
    },
    createUrlExpense: function(unit) {
    	console.log('createUrlExpense')
    	return unit.pageExpense > 1?'#pagRight=' + unit.pageExpense:'#'
    },
  },
  ready(){
    this.getData()
  }
}
</script>




	







































