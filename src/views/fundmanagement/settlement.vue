<template>
<!-- ///////////////////////////////////////////////////////////////////// -->

<!-- ///////////////////////////////////////////////////////////////////// -->
<div class="container-fluid">
	<ul class="tagTit">
		<li  @click='changeTagContState(true)'   v-bind:class="{ 'show': tagCont.isA}">本月待结算</li>
		<li  @click='changeTagContState(false)'  v-bind:class="{ 'show': tagCont.isB}">往期结算记录</li>
	</ul>
	<ul class="tagCont">
		<li v-show="tagCont.tagContState">
			<table class="table table-bordered table-striped  mytable" id="tableThisMonList">
		        <thead>
		            <tr>
		                <th @click='selectAll("thisMonList")' class="check">全选</th>
		                <th>序号</th>
		                <th>申请号</th>
		                <th>申请时间</th>
		                <th>咨询师</th>
		                <th>提现方式</th>
		                <th>提现账号</th>
		                <th>咨询师电话</th>
		                <th>账户余额</th>
		                <th>申请金额</th>
		                <th>状态</th>
		                <th>操作</th>
		            </tr>
		        </thead>
		        <tbody>
		        	<tr v-for='item in thisMonList'>
					    <td>
					    	<div class="checkbox">
			        			<input type="checkbox" id="thisMonList-{{$index}}" class="checkboxInp" name="title-table-checkbox" :checked=" checkState.thisMonList? 'checked':''">
				        		<label for="thisMonList-{{$index}}" class="checkboxLabel"></label>
		                	</div>
					    </td>
						<td>{{$index+1}}</td>
						<td>{{item.no}}</td>
						<td>{{item.requestTime}}</td>
						<td>{{item.psychologicalName}}</td>
						<td>{{item.channel | channelFilter}}</td>
						<td>{{item.account}}</td>
						<td>{{item.psycholoPhone}}</td>
						<td>{{item.cashBalance}}</td>
						<td>{{item.amount}}</td>
						<td>{{item.status | stateFilter}}</td>
						<td class="check textGreen" @click='clearing(item.psychologicalName , item.account ,item.amount ,item.no )'>结算</td>
					</tr>
				</tbody>
			</table>
			<div id="testThisMon" class="myPagenav">
	            <zpagenav  :page="pageThisMon", :page-size="pageSize", :total="totalThisMon", :max-link="maxLinkThisMon" :page-handler="pageHandlerThisMon" :create-url="createUrlThisMon"><zpagenav>
	        </div>
    		<div class="record">
				<a :href="url" download="本月待结算.xls" @click="exportHandler('#tableThisMonList')" class="myBtn">导出excel</a>
			</div>
		</li>
		<li v-else>
			<div class="past">
		        <div id="search" class="title">
<!-- 					<span class="searchTit">注册时间</span>
					<input class="input searchVal" size="20" type="text" @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">
					<span class="searchTit"></span>
					<input class="input searchVal" size="20" type="text" @click.stop="open($event,'picker2')" v-model="calendar.items.picker2.value" placeholder="结束时间" id="end" name="end"> -->
<!-- 					<calendar
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
				    </calendar> -->
					<span class="searchTit">账户</span> <input type="text" id="aaaa" value="" placeholder="账户" v-model='searchVal.account'/>
					<span class="searchTit">姓名</span> <input type="text" id="bbbb" value="" placeholder="姓名" v-model='searchVal.nickname'/>
					<span class="searchTit">申请编号</span> <input type="text" id="bbbb" value="" placeholder="申请编号" v-model='searchVal.no'/>
				    <span class="searchTit">下拉结算人</span>
<!-- 					<select name="" id="select" v-model='title'>
						<option value="1111">1111</option>
						<option value="2222">2222</option>
						<option value="3333">3333</option>
						<option value="other">其他</option>
					</select>
 -->
	                <select class="selectPopup" name="eidtdptId" value="{{ eidtdptId }}" v-model="auditor" >
	                    <option v-for="item of operatorList" value="{{ item.showName }}">
	                        {{ item.showName }}
	                    </option>
	                    <option value="other">其他</option>
	                </select>
					<!-- <span class="searchTit">金额</span> <input type="text" id="bbbb" value="" placeholder="申请提现金额" v-model='searchVal.amount'/> -->
					<!-- <span class="searchTit">结算时间</span> <input type="text" id="aaaa" value="" placeholder="结算时间" v-model='searchVal.auditTime'/>  -->
					<!-- <span class="searchTit">操作人</span> <input type="text" id="bbbb" value="" placeholder="操作人" v-model='searchVal.auditor'/>				 -->

					<!-- <span class="searchTit">提现方式</span> <input type="text" id="aaaa" value="" placeholder="提现（渠道）方式" v-model='searchVal.channel'/>  -->
					<!-- <span class="searchTit">申请人ID</span> <input type="text" id="aaaa" value="" placeholder="申请人ID" v-model='searchVal.mid'/>  -->

					<!-- <span class="searchTit">状态</span> <input type="text" id="aaaa" value="" placeholder="状态" v-model='searchVal.status'/>  -->
					<!-- <span class="searchTit">结算ID</span> <input type="text" id="bbbb" value="" placeholder="结算ID" v-model='searchVal.wrid'/> -->
					<div class="myBtn settlementBtn"  @click='getSearchVal'>搜索</div>
				</div>
				<table class="table table-bordered table-striped  mytable" id="tablePpastMonList">
		            <thead>
		                <tr>
		                    <th  @click='selectAll("pastMonList")' class="check">全选</th>
		                    <th>序号</th>
		                    <th>申请单号</th>
		                    <th>申请时间</th>
		                    <th>结算时间</th>
		                    <th>提现方式</th>
		                    <th>提现账号</th>
		                    <th>提现金额</th>
		                    <th>账户余额</th>
		                    <th>咨询师姓名</th>
		                    <th>咨询师电话</th>
		                    <th>结算人姓名</th>
		                </tr>
		            </thead>
		            <tbody>
		            	<tr v-for='item in pastMonList'>
						    <td>
						    	<div class="checkbox">
				        			<input type="checkbox" id="pastMonList-{{$index}}" class="checkboxInp" name="title-table-checkbox" :checked=" checkState.pastMonList? 'checked':''">
					        		<label for="pastMonList-{{$index}}" class="checkboxLabel"></label>
		                    	</div>
						    </td>
		                    <td>{{$index+1}}</td>
		                    <td>{{item.no}}</td>
		                    <td>{{item.requestTime}}</td>
		                    <td>{{item.auditTime}}</td>
		                    <td>{{item.channel | channelFilter}}</td>
		                    <td>{{item.account}}</td>
		                    <td>{{item.amount}}</td>
		                    <td>{{item.cashBalance}}</td>
		                    <td>{{item.psychologicalName}}</td>
		                    <td>{{item.psycholoPhone}}</td>
		                    <td>{{item.auditor}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div id="testPastMon" class="myPagenav">
		        <zpagenav  :page="pagePastMon", :page-size="pageSize", :total="totalPastMon", :max-link="maxLinkPastMon" :page-handler="pageHandlerPastMon" :create-url="createUrlPastMon"><zpagenav>
		    </div>
    		<div class="record">
				<a :href="url" download="往期结算记录.xls" @click="exportHandler('#tablePpastMonList')" class="myBtn">导出excel</a>
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
	        <h3>结算</h3>
	    </div>
	    <div class="modal-body">
	        <p>结算给{{settleMsg.name}}（账号{{settleMsg.account}}）金额{{settleMsg.amount}}</p>
	    </div>
	    <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click='closeDrop'>取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click='sendRequest'>确定</a> </div>
	</div>
	<div class="modal-backdrop {{dropState}}"></div>
</template>
<script>
import calendar from "../../calendar.vue"
import moment from "moment"
import { doSettleForThisMon,getSettlementForThisMonAndRecord,listOperator, getResponses } from "../../api"
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
    	},
    	table:'',/**/
    	dropState:'hide',  /*弹窗状态*/
    	stateResoult:"",   /*结算结果*/
    	auditor:"other",
    	searchVal:{ // /*搜索内容*/
			account:"",            //	账户	string	选填
			amount:"",             //	申请提现金额	number	选填
			auditTime:"",          //	结算时间	object	选填
			auditor:"",            //	操作人	number	选填
			channel:"",            //	提现（渠道）方式	number	选填(0 微信，1银联)
			mid:"",                //	申请人ID	number	选填
			no:"",                 //	申请编号	string	选填
			status:"",             //	状态	number	选填(0 未审核，1已审核) 比如在获取未结算需要传入0，往期传入1
			wrid:"",               //	结算ID	number	选填
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
    	thisMonList:"", /*本月dataList*/
    	pastMonList:"", /*往期dataList*/
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
		pageSize:10,  //公用 显示条数
    	pageThisMon: 1,      /*跳转的页面*/
        totalThisMon: 10,    /*页面总共数量*/
        maxLinkThisMon: 10,	 /*显示的页面 >= 5*/   //--------
        pagePastMon: 1, 	 /*跳转的页面*/
        totalPastMon: 10, 	 /*页面总共数量*/
        maxLinkPastMon: 10,	 /*显示的页面 >= 5*/
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
	  	selectAll(whichBox){  //selectedList
		switch (whichBox){
			case "thisMonList":
				this.checkState.thisMonList = !this.checkState.thisMonList
				break;
			case "pastMonList":
				this.checkState.pastMonList = !this.checkState.pastMonList
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
    		if( this.tagFirstClick ){  // 首次切换时请求
    			this.getTheRecord()
    			this.tagFirstClick = false
    		}
    	}
    },
    async getThisMon(){
    	let paramsObj = {  //分页
				pageIndex:this.pageThisMon,
				pageSize:this.pageSize,
				status:0,
			}
		let params = serialize(paramsObj)
		let data = await getSettlementForThisMonAndRecord(params)
		if( data.code==0 ){
			this.thisMonList = data.list
			this.totalThisMon =  data.count //this.setPageNav( this.thisMonCount , this.pageSize ,this.thisMonList )

		}else{
			alert(`errMsg:${data.msg}`)
		}
    },
    async getTheRecord(){  //往期

    	this.effectVal.pageIndex = this.pagePastMon
		this.effectVal.pageSize = this.pageSize
		this.effectVal.status = 1

		let params = serialize(this.effectVal)
		let data = await getSettlementForThisMonAndRecord(params)
		if( data.code==0 ){
			this.pastMonList = data.list
			this.totalPastMon = data.count //this.setPageNav( this.pastMonCount , this.pageSize ,this.pastMonList )
		}else{
			alert(`errMsg:${data.msg}`)
		}
    },
    async doSettle(){
    	let name = sessionStorage.username
    	let paramsObj = {
    		no:this.settleMsg.no,
    		operationName:name,
    	}
    	// let params = serialize(paramsObj)
        let data = await getResponses('CapitalWithdrawRequest/capitalWithdrawOperationByNoAlipay.json', serialize(paramsObj))
		if (data.code === 0) {
    	    alert("结算成功")
            this.getThisMon()
		} else {
    	    alert(data.error)
		}

        // let data = await doSettleForThisMon(serialize(paramsObj))
        // console.log(`data.code:${data.code}`)
        // if( data.code != 0) {
    		// alert(data)
    		// // alert(`结算失败:错误信息为${data.error}`)
        // }
        //
        // else if( data.code == 0 ){
    		//  //再次请求新数据
    		//
        // }
    },  //listOperator
    async getListOperator(){
    	let data = await listOperator()
    	if( data.code == 0) {
    		this.operatorList = data.list
    	}
    	else{
    		alert(`errMsg:${data.msg}`)
    	}
    },  //listOperator
    // setPageNav(  dataCount , pageSize ,dataList){
    // 	if(dataList.length < pageSize){
    // 		console.log('<<<<<< hide ')  //隐藏分页
    // 	}else{
    // 		console.log('>>>>>> show')
    // 	}
    // 	return  Math.ceil(dataCount/pageSize)
    // },
    getSearchVal(){
    	console.log(`calendar.items.picker1.value:${this.calendar.items.picker1.value.replace(/\//g, "-")+ " 00:00:00"}`)
/*
    	searchVal:{ 			   //
			account:"",            //	账户	string	选填
			amount:"",             //	申请提现金额	number	选填
			auditTime:"",          //	结算时间	object	选填
			auditor:"",            //	操作人	number	选填
			channel:"",            //	提现（渠道）方式	number	选填(0 微信，1银联)
			mid:"",                //	申请人ID	number	选填
			no:"",                 //	申请编号	string	选填
			status:"",             //	状态	number	选填(0 未审核，1已审核) 比如在获取未结算需要传入0，往期传入1
			wrid:"",               //	结算ID	number	选填
    	},
*/
		this.effectVal = {} //搜索前先清空原有搜索条件

    	if (this.searchVal.account) {
			this.effectVal.account = this.searchVal.account
		}

    	if (this.searchVal.amount) {
			this.effectVal.amount = this.searchVal.amount
		}

    	if (this.searchVal.auditTime) {
			this.effectVal.auditTime = this.searchVal.auditTime
		}

    	if (this.searchVal.auditor) {
			this.effectVal.auditor = this.searchVal.auditor
		}

    	if (this.searchVal.channel) {
			this.effectVal.channel = this.searchVal.channel
		}

    	if (this.searchVal.mid) {
			this.effectVal.mid = this.searchVal.mid
		}

    	if (this.searchVal.no) {
			this.effectVal.no = this.searchVal.no
		}

    	if (this.searchVal.status) {
			this.effectVal.status = this.searchVal.status
		}

    	if (this.searchVal.wrid) {
			this.effectVal.wrid = this.searchVal.wrid
		}

		if (this.auditor) {    // 资质 改格式
			if(this.auditor == 'other'){
				delete this.effectVal.auditor
			}else{
				this.effectVal.auditor = this.auditor
			}
		}




    	this.getTheRecord()
	},
	sendRequest(){ // 结算请求   点击 弹框的确定按钮
		console.log(`发送结算请求`)
		this.closeDrop()
		this.doSettle()
	},
	clearing( name , account ,amount ,no ){   //点击表单结算按钮
		this.dropState = 'in'
		this.settleMsg.name = name
		this.settleMsg.account = account
		this.settleMsg.amount = amount
		this.settleMsg.no = no

	},
	closeDrop(){  //关弹框
		this.dropState = "hide"
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
    	console.log(`pageThisMon: ${this.pageThisMon}`)
    	this.getThisMon()
    },
    createUrlThisMon: function(unit) {
		// return unit.pageThisMon > 1?'#page=' + unit.pageThisMon:'#'
		return unit.pageThisMon > 1?'#pageThisMon=' + unit.pageThisMon:'#'
    },
    pageHandlerPastMon: function(page) {
      //here you can do custom state update
    	this.pagePastMon = page
    	console.log(`pagePastMon: ${this.pagePastMon}`)
    	this.getTheRecord()
    },
    createUrlPastMon: function(unit) {
    	// return unit.pagePastMon > 1?'#page=' + unit.pagePastMon:'#'
    	console.log('createUrlPastMon')
    	return unit.pagePastMon > 1?'#pagePastMon=' + unit.pagePastMon:'#'
    },
  },
  filters: {
	channelFilter( num ) {
	    if (num == 11) {
	        return "支付宝"
		} else {
            let  arr = ['银联','微信']
            return arr[num]
		}

	},
	stateFilter( num ){
		let arr = ['未结算','已结算']
		return arr[num]
	}

  },
  ready(){
  	this.getThisMon()
  	this.getListOperator()
  	console.log(sessionStorage.username)
  }
}
</script>
