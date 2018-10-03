<template>

<div class="container-fluid">
  <div class="container-fluid" style="padding-top: 20px;">
    <span class="theTitle">标题：</span>
    <input type="text" placeholder="最多可输入50字" class="maxSize" maxlength = "50" v-model="theTitleOne" value="{{ theTitleOne }}"></input>
  </div>
  <div class="container-fluid">
    <span class="newTheTitle">指南详情：</span>
    <!-- <textarea class="oneTextArea" v-model="guideDetails" value="{{ guideDetails }}"></textarea> -->
    <vue-html5-editor :content.sync="guideDetails" style="height: 600px;"></vue-html5-editor>
  </div>
  <button class="sevButton" style="margin-left: 126px;" @click="reset()">保存</button>

	<div class="modal-backdrop {{newDropStateThree}}"></div>
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
	    	newPastMonList:false, /*往期dataList*/
    	},
      theTitleOne:'',
      guideDetails:'',
			aa:'',
			bb:'',
      guideType:'',
      content : '',
      title : '',
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

  watch:{
    'calendar.value': function (value) {
        this.calendar.items[this.calendar.picker].value=value
    }
  },
  methods:{

    reset() {
      if (this.theTitleOne == '') {
  				alert('标题不能为空')
  				return
  		}
      if (this.guideDetails == '') {
  				alert('指南详情不能为空')
  				return
  		}
        this.getTheRecord()
        setTimeout(() => {
        this.$route.router.go(`/advisoryGuidelines/?guideType=${this.$route.query.guideType}`)
      }, 1000);
    },


    async ff(){
  		let paramsObj = {
        guideId : Number(this.$route.query.lqbz),
  		}
  		let data = await getResponses('/advisoryGuide/getAdvisoryGuide.json',serialize(paramsObj))
      if( data.code==0 ){
        // this.selectList = data.guide,
        this.guideDetails = data.guide.content
        this.theTitleOne = data.guide.title
        console.log(this.theTitleOne);
  		}else{
  			alert(`errMsg:${data.msg}`)
  		}
    },



    async getTheRecord(){  //往期
  		let paramsObj = {
        content : this.guideDetails,
        title : this.theTitleOne,
        guideId : Number(this.$route.query.lqbz),
        guideType : this.$route.query.guideType,
  		}
  		let data = await getResponses('/advisoryGuide/updateAdvisoryGuide.json',serialize(paramsObj))
      if( data.code==0 ){

  		}else{
  			alert(`errMsg:${data.msg}`)
  		}
    },

	newSendRequestTwo(){ //
		this.newCloseDropThree()
	},

	// newCloseDrop
	//
	clearing(){   //点击表单结算按钮
		this.dropState = 'in'
		this.getShowHow()
	},
  },
  ready(){
    // this.guideDetails = this.$route.query.guideDetails;
    // this.theTitleOne = this.$route.query.theTitleOne;
    this.ff()
  }
}
</script>

<style>
  .newlyAdded {
    background-color: rgba(22, 155, 213, 1);
    color: white;
    border: none;
    width: 80px;
    height: 30px;
    border-radius: 5px;
    margin-top: 60px;
    margin-bottom: 20px;
    text-align: center;
    line-height: 30px;
    float: left;
  }
  .newlyAddedTwo {
    background-color: rgba(22, 155, 213, 1);
    color: white;
    border: none;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    margin-bottom: 20px;
    margin-top: 60px;
    margin-left: 60px;
    text-align: center;
    line-height: 30px;
    float: left;
  }
  .container-fluid {
    padding-right: 20px;
    padding-left: 40px;
  }
  .theTitle {
    font-size: 16px;
    color: black;
    font-weight: 400;
    line-height: 50px;
    margin-top: 40px;
    margin-left: 31px;
  }
  .newTheTitle {
    font-size: 16px;
    color: black;
    font-weight: 400;
    line-height: 50px;
    margin-top: 40px;
    float: left;
  }
  .oneTextArea {
    width: 545px;
    height: 400px;
    margin-top: 58px;
  }
  .maxSize {
    width: 526px;
    height: 25px;
  }
  .sevButton {
    background-color: rgba(22, 155, 213, 1);
    width: 140px;
    height: 40px;
    border: 0;
    color: white;
    margin-top: 100px;
    margin-left: 300px;
    border-radius: 5px;
  }
</style>
