<template>
<!-- ///////////////////////////////////////////////////////////////////// -->

<!-- ///////////////////////////////////////////////////////////////////// -->
<div class="container-fluid mid">
	<div id="search" class="title mySearchBox">
		<span class="searchTit">注册时间</span>
		<input class="input searchVal" size="20" type="text" @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">

		<!-- <input type="text" name="" placeholder="开始时间"> -->
		<span class="searchMargin"></span>
		<input class="input searchVal" size="20" type="text" @click.stop="open($event,'picker2')" v-model="calendar.items.picker2.value" placeholder="结束时间" id="end" name="end">
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
		<br/>
		<span class="searchTit">咨询数</span>
		<input type="text" id="" value="" class="searchVal" v-model='startAnswerCount' placeholder="咨询数起始" />
        <span class="searchMargin"></span>
		<input type="text" id="" value="" class="searchVal" v-model='endAnswerCount'   placeholder="咨询数结束" /> <br/>
		<span class="searchTit">账号</span>
		<input type="text" name="" id="" value="" class="searchVal" v-model='account'  placeholder="账号" />
        <div class="myBtn castaccountBtn"  @click='getSearchVal' >搜索</div>
	</div>

<!-- ///////////////////////////////////////////////////////////////////// -->

	<div class="right">
		<table class="table table-bordered table-striped mytable" id="DataTables_Table_0">
		    <thead>
		        <tr>
		            <th>充值</th>
		            <th>支出</th>
		            <th>余额</th>
		        </tr>
		    </thead>
		    <tbody>
		    	<tr>
				    <td>{{accountAmount.payAmount}}</td>
				    <td>{{accountAmount.expenseAmount}}</td>
				    <td>{{accountAmount.cashBalance}}</td>
				</tr>
			</tbody>
		</table>
		<div class="tag">
			<ul class="tagTit">
				<li  @click='changeTagContState(true)'   v-bind:class="{ 'show': tagCont.isA}">消费记录</li>
				<li  @click='changeTagContState(false)'  v-bind:class="{ 'show': tagCont.isB}">充值记录</li>
			</ul>
			<ul class="tagCont">
				<li v-show="tagCont.tagContState">
					<table class="table table-bordered table-striped  mytable" id="tableShoppingRecordList">
			            <thead>
			                <tr>
                                <th @click='selectAll("shoppingRecordList")' class="check">全选</th>
			                    <!-- <th>序号</th> -->
													<th>类型</th>
			                    <th>订单号</th>
			                    <th>下单时间</th>
													<th>专家回复时间时间</th>
			                    <th>订单金额</th>
			                    <th>专家姓名</th>
			                    <th>通话时长</th>
			                </tr>
			            </thead>
			            <tbody>
			            	<tr v-for='item in shoppingRecordList'>
                                <td>
                                    <div class="checkbox">
                                        <input type="checkbox" id="shoppingRecordList-{{$index}}" class="checkboxInp" name="title-table-checkbox" :checked=" checkState.shoppingRecordList? 'checked':''">
                                        <label for="shoppingRecordList-{{$index}}" class="checkboxLabel"></label>
                                    </div>
                                </td>
							 	<!-- <td>{{item.ieid}}</td> -->
													<td>{{item.advisoryType}}</td>
			                    <td>{{item.orderNo}}</td>
													<td>{{item.createTime}}</td>
			                    <td>{{item.answerTime}}</td>
			                    <td>{{item.orderPrice}}</td>
			                    <td>{{item.nickname}}</td>
			                    <td>
                                    {{Math.floor(item.practicalDuration/60) }}'{{item.practicalDuration%60 }}"
                                </td>
							</tr>
						</tbody>
					</table>
					<div id="testIncome" class="myPagenav">
			            <zpagenav  :page="pageIncome", :page-size="pageSizeIncome", :total="totalIncome", :max-link="maxLinkIncome" :page-handler="pageHandlerIncome" :create-url="createUrlIncome"><zpagenav>
			        </div>
                    <div class="record">
                        <a :href="url" download="求助者资金账户消费记录.xls" @click="exportHandler('#tableShoppingRecordList')" class="myBtn">导出excel</a>
                    </div>
				</li>
				<li v-else>
					<table class="table table-bordered table-striped  mytable" id="tableChargeRecordList">
			            <thead>
			                <tr>
                                <th @click='selectAll("chargeRecordList")' class="check">全选</th>
			                    <!-- <th>序号</th> -->
			                    <th>充值单号</th>
			                    <th>充值时间</th>
			                    <th>充值金额</th>
			                    <th>充值方式</th>
			                    <th>赠送金额</th>
			                </tr>
			            </thead>
			            <tbody>
			            	<tr v-for='item in chargeRecordList'>
                                <td>
                                    <div class="checkbox">
                                        <input type="checkbox" id="chargeRecordList-{{$index}}" class="checkboxInp" name="title-table-checkbox" :checked=" checkState.chargeRecordList? 'checked':''">
                                        <label for="chargeRecordList-{{$index}}" class="checkboxLabel"></label>
                                    </div>
                                </td>
							    <!-- <td>{{item.ieid}}</td> -->
			                    <td>{{item.no}}</td>
			                    <td>{{item.createTime}}</td>
			                    <td>{{item.amount}}</td>
			                    <td>{{item.channel | channelTransform}}</td>
			                    <td>{{item.presentAmount}}</td>
							</tr>

						</tbody>
					</table>
				<div id="testExpense" class="myPagenav">
		            <zpagenav  :page="pageExpense", :page-size="pageSizeExpense", :total="totalExpense", :max-link="maxLinkExpense" :page-handler="pageHandlerExpense" :create-url="createUrlExpense"><zpagenav>
		        </div>
                <div class="record">
                    <a :href="url" download="求助者资金账户充值记录.xls" @click="exportHandler('#tableChargeRecordList')" class="myBtn">导出excel</a>
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
                    <th>序号</th>
                    <th>求助者账号</th>
                    <th>注册时间</th>
                    <th>咨询数（电话）</th>
                    <th>账户余额</th>
                    <th>他的账户</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='item in dataList'>
                    <td>
                        <div class="checkbox">
                            <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp" name="title-table-checkbox" :checked=" checkState.dataList? 'checked':''">
                            <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                        </div>
                    </td>
                    <td>{{$index+1}}</td>
                    <td>{{item.mobilePhone}}</td>
                    <td>{{item.regTime}}</td>
                    <td>{{item.answerCount}}</td>
                    <td>{{item.cashBalance}}</td>
                    <!-- <td class="check textGreen"  @click='getUserAccountDetail(item.mid)'>账户详情</td>   -->
                    <td @click='getUserAccountDetail(item.mid)'  :class=" this.RecordMid == item.mid ? 'check textGreen':'check'">订单详情</td>
                </tr>
            </tbody>
        </table>
        <div id="test" class="myPagenav">
            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
        </div>
        <div class="record">
            <a :href="url" download="求助者资金账户账户列表.xls" @click="exportHandler('#tableDataList')" class="myBtn">导出excel</a>
        </div>
    </div>
</div>
</template>
<script>
import calendar from "../../calendar.vue"
import moment from "moment"
import { getAccount, getAccountThenIncomeAndExpense , getAccountThenUserShoppingRecord} from  "../../api"
         /*左表格 */    /*充值记录 */                          /*消费记录*/
import { serialize } from "../../utils"

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
        checkState:{
            dataList:false,
            shoppingRecordList:false,
            chargeRecordList:false,
        },
        table:"",
        dataCount:"",/*导出到Excel的条数*/
        effectVal:{},
        dataList:[],
        shoppingRecordList:[],
        chargeRecordList:[],
        account:"",            /*搜索内容*/
        endTime:"",            /*搜索内容*/
        startTime:"",          /*搜索内容*/
        endAnswerCount:"",     /*搜索内容*/
        startAnswerCount:"",   /*搜索内容*/
        userType:1,            /*搜索内容*/ /*普通用户*/
        pageSize:10,           /*公用pageSize*/
        RecordMid:"",
        page: 1,        //pagepageSize: 10 //pageSize,  default is 10   左分页
        total: 10,  //total item count
        maxLink: 10,    //how many links to show, must not less than 5,  default is 5
        pageIncome: 1,      //pagepageSize: 10 //pageSize,  default is 10   右分页
        totalIncome: 10,    //total item count
        maxLinkIncome: 10,  //how many links to show, must not less than 5,  default is 5
        pageExpense: 1,         //pagepageSize: 10 //pageSize,  default is 10   右分页
        totalExpense: 10,   //total item count
        maxLinkExpense: 10, //how many links to show, must not less than 5,  default is 5
        tagCont:{           /*消费记录 充值记录 tag切换*/
            tagContState:true,
            isA:true,
            isB:false,
        },
        accountAmount:{  //右侧 用户详情 总收入 支出 等
            cashBalance:0,  // 余额  number
            expenseAmount:0,  //   总支出 number
            payAmount:0,  //   总充值
        },
        excel:{ /*导出到excel*/
            list:0,
            testIncome:0,
            testExpense:0,
        },
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
  watch:{
    'calendar.value': function (value) {
        this.calendar.items[this.calendar.picker].value=value
    }
  },
  methods:{
    selectAll(whichBox){  //selectedList
        switch (whichBox){
            case "dataList":
                this.checkState.dataList = !this.checkState.dataList
                break;
            case "shoppingRecordList":
                this.checkState.shoppingRecordList = !this.checkState.shoppingRecordList
                break;
            case "chargeRecordList":
                this.checkState.chargeRecordList = !this.checkState.chargeRecordList
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
        let uri = 'data:application/vnd.ms-excel;base64,'


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
    getSearchVal(){

        this.effectVal = {}
		if (this.account) {
            // this.effectVal.account = this.account
			this.effectVal.mobilePhone = this.account
		}

		if (this.calendar.items.picker2.value) {
			this.effectVal.endTime = this.calendar.items.picker2.value.replace(/\//g, "-") + " 00:00:00"
		}

		if (this.calendar.items.picker1.value) {
			this.effectVal.startTime = this.calendar.items.picker1.value.replace(/\//g, "-") + " 00:00:00"
		}

		if (this.endAnswerCount) {
			this.effectVal.endAnswerCount = this.endAnswerCount
		}

		if (this.startAnswerCount) {
			this.effectVal.startAnswerCount = this.startAnswerCount
		}

    	this.getData()
	},
    async getData(){

    	this.effectVal.pageIndex = this.page
		this.effectVal.pageSize = this.pageSize
		this.effectVal.userType = this.userType

		let params = serialize(this.effectVal)
		let data = await getAccount(params)
		this.dataList = data.list
		this.dataCount = data.count
		this.total = data.count//this.setPageNav( this.dataCount , this.pageSize , this.dataList)   //
    },
    // setPageNav(  dataCount , pageSize ,dataList){   //左分页    右分页？
    // 	if(dataList.length < pageSize){
    // 		console.log('<<<<<< hide ')  //隐藏分页
    // 	}else{
    // 		console.log('>>>>>> show')
    // 	}
    // 	return  Math.ceil(dataCount/pageSize) +1
    // },
    getUserAccountDetail( mid ){   // 左侧点击查看详情
    	this.RecordMid = mid
    	console.log(`mid:${mid}`)
        this.getShoppingNavPageData()
        this.getChargeNavPageData()
    },
    async getShoppingNavPageData( postMsg ){
        let ParamsObj = {     //消费记录  接口独立 不传item
            mid:this.RecordMid,
            pageSize:this.pageSize,
            pageIndex:this.pageIncome
        }

        let Params = serialize( ParamsObj )  //充值记录
    	let data = await getAccountThenUserShoppingRecord( Params )
        if( data.code == 0 ){
        	this.shoppingRecordList = data.list
        	this.incomeRecordCount = data.count
        	this.totalIncome = data.count// this.setPageNav( this.incomeRecordCount , this.pageSize , this.incomeRecordList)

            this.accountAmount.cashBalance = data.cpa.cashBalance
            this.accountAmount.expenseAmount = data.cpa.expenseAmount
            this.accountAmount.payAmount = data.cpa.payAmount
        }else {
            alert(`errMsg:${data.msg}`)
        }

    },
    async getChargeNavPageData( postMsg ){
        let ParamsObj = {
            items:0,//查找    0 充值，1服务收入，2消费、3提现
            mid:this.RecordMid,
            pageSize:this.pageSize,
            pageIndex:this.pageExpense
        }
        let Params = serialize(ParamsObj)
    	let data = await getAccountThenIncomeAndExpense( Params )

        if( data.code == 0 ){
        	this.chargeRecordList = data.list
			this.chargeRecordList.forEach(v=>{

			    if(v.presentAmount===null){
			        v.presentAmount=0;
				}
			})
        	this.expenseRecordCount = data.count
        	this.totalExpense = data.count// this.setPageNav( this.expenseRecordCount , this.pageSize , this.chargeRecordList)
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
    pageHandlerIncome: function(pageIncome) {
      //here you can do custom state update
      	console.log('pageIncome')
    	this.pageIncome = pageIncome
    	this.getShoppingNavPageData()
    },
    createUrlIncome: function(unit) {
    	return unit.pageIncome > 1?'#pagRight=' + unit.pageIncome:'#'
    },
    pageHandlerExpense: function(pageExpense) {
      //here you can do custom state update
      	console.log('pageExpense')
    	this.pageExpense = pageExpense
    	this.getChargeNavPageData()
    },
    createUrlExpense: function(unit) {
    	return unit.pageExpense > 1?'#pagRight=' + unit.pageExpense:'#'
    },
  },
  filters:{
    channelTransform(num){
        /*渠道 0 支付宝，1微信，2银联upacp，3心猫 4银联unionpay*/
        let chargeWayArr = ['支付宝','微信','银联upacp','心猫','银联unionpay']
        return chargeWayArr[num]
    }
  },
  ready(){
    this.getData()
  }
}
</script>
