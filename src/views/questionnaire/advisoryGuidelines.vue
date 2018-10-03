<template>
<div class="container-fluid">
	<ul class="tagCont">
		<li v-else>
			<div class="past">
				<ul class="tagTit">
	        <li :class="{'show':guideType == 0}"><div class="" @click="ff(0)">服务指南</div></li>
	        <li :class="{'show':guideType == 1}"><div class="" @click="ff(1)">咨询指南</div></li>
	        <li :class="{'show':guideType == 2}"><div class="" @click="ff(2)">编辑倾诉指南</div></li>
				</ul>

					<a href="javascript:;"  @click="reset(path)" style="color: white;">
						<div class="xinzeng">
          	新增
						</div>
					</a>

		<ul class="tagCont" id="expertsInCont" v-if="thisMonList" style="margin-top: 45px;">
			<li :class="{'show':guideType == 0}">
				<table class="table table-bordered table-striped  mytable" id="NewtablePpastMonList" style="width:1150px;">
					<thead>
						<tr >
              <th>序号</th>
              <th styel="width: 80px;">标题</th>
              <th styel="width: 80px;">正文</th>
              <th>排序权重</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for='(index,item) in thisMonList'>
              <td>{{$index + 1}}</td>
              <td style="word-wrap: break-word;max-width: 85px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.title}}</td>
              <td style="word-wrap: break-word;max-width: 85px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.content}}</td>
              <td id="weights" contenteditable="true" @input="changeWeights(item.guideId,item.weights,index)">{{item.weights}}</td>
              <td>
									<span @click="changeRoute(item.guideId,item.weights,item.guideType)" class="operation editArticle btn btn-info">编辑</span>
                  <a class="btn btn-danger allDelte" href="javascript:;"
									@click="newClearing(item.guideId,item.guideType)">删除</a>
              </td>
						</tr>
					</tbody>
				</table>
			</li>
		  <li :class="{'show':guideType == 1}">
				<table class="table table-bordered table-striped  mytable" id="NewtablePpastMonList" style="width:1150px;">
					<thead>
						<tr >
              <th>序号</th>
              <th styel="width: 80px;">标题</th>
              <th styel="width: 80px;">正文</th>
              <th>排序权重</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for='(index,item) in thisMonList'>
              <td>{{$index + 1}}</td>

							<td style="word-wrap: break-word;max-width: 85px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.title}}</td>
              <td style="word-wrap: break-word;max-width: 85px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.content}}</td>

              <td id="weightsOne" contenteditable="true" @input="changeWeightsOne(item.guideId,item.weights,index)">{{item.weights}}</td>
              <td>
									<span @click="changeRoute(item.guideId,item.weights,item.guideType)" class="operation editArticle btn btn-info">编辑</span>
                  <a class="btn btn-danger allDelte" href="javascript:;"
									@click="newClearing(item.guideId,item.guideType)">删除</a>
              </td>
						</tr>
					</tbody>
				</table>
			</li>
			 <li :class="{'show':guideType == 2}">
				<table class="table table-bordered table-striped  mytable" id="NewtablePpastMonList" style="width:1150px;">
					<thead>
						<tr >
              <th>序号</th>
              <th styel="width: 80px;">标题</th>
              <th styel="width: 80px;">正文</th>
              <th>排序权重</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for='(index,item) in thisMonList'>
              <td>{{$index + 1}}</td>

							<td style="word-wrap: break-word;max-width: 85px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.title}}</td>
              <td style="word-wrap: break-word;max-width: 85px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.content}}</td>

              <td id="weightsTwo" contenteditable="true" @input="changeWeightsTwo(item.guideId,item.weights,index)">{{item.weights}}</td>
              <td>
									<span @click="changeRoute(item.guideId,item.weights,item.guideType)" class="operation editArticle btn btn-info">编辑</span>
                  <a class="btn btn-danger allDelte" href="javascript:;"
									@click="newClearing(item.guideId,item.guideType)">删除</a>
              </td>
						</tr>
					</tbody>
				</table>
			</li>
		</ul>

		</li>
	</ul>
	<div class="modal {{newDropState}}" style="width: 250px;margin-left: 30px;margin-top: 150px;">
		<h3><p style="margin-left: 10px;">确认删除?</p></h3>
		<div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click='newTwoCloseDrop'>取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click='sendRequest()'>确认</a> </div>
	</div>
</div>
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
			guideId:'',
			guideType:0,
			shiyishi:'',
			shanchu:'',
			aa:'',
			bb:'',
    	table:'',/**/
    	dropState:'hide',  /*弹窗状态*/
			newDropState:'hide',  /*弹窗状态*/
			newDropStateTwo:'hide',  /*弹窗状态*/
			newDropStateThree:'hide',  /*弹窗状态*/
    	stateResoult:"",   /*结算结果*/
    	auditor:"other",
    	operatorList:[],
    	effectVal:{},/*有效 搜索内容*/
    	tagFirstClick:true,
    	dropName:"", /*弹窗内容*/
    	dropAccunt:"",/*弹窗内容*/
    	dropMoney:"",/*弹窗内容*/
    	thisMonList:"", /*本月dataList*/
    	pastMonList:"", /*往期dataList*/
			newPastMonList:"",
			calendar: {
				show: false,
			},
			pageSize:10,  //公用 显示条数
    	pageThisMon: 1,      /*跳转的页面*/
      totalThisMon: 10,    /*页面总共数量*/
      maxLinkThisMon: 10,	 /*显示的页面 >= 5*/   //--------
      pagePastMon: 1, 	 /*跳转的页面*/
      totalPastMon: 10, 	 /*页面总共数量*/
      maxLinkPastMon: 10,	 /*显示的页面 >= 5*/
    }
  },

  watch:{
    'calendar.value': function (value) {
        this.calendar.items[this.calendar.picker].value=value
    }
  },
  methods:{
		async newClearing(e,f){   //点击操作按钮
			this.newDropState = 'in'
			this.shiyishi = e
			this.shanchu = f
		},
		newTwoCloseDrop(){  //关弹框
			this.newDropState = "hide"
		},
		sendRequest(){ // 结算请求   点击 弹框的确定按钮
			this.newDropState = "hide"
			this.removeThe()
			console.log(this.shanchu);
 	},

		changeRoute(a,b,c) {
			// this.$route.router.go(`/xiuGaiAdviSory?lqbz=${a}&aaa=${b}&theTitleOne=${c}&guideDetails=${d}&guideType=${e}`)
			this.$route.router.go(`/xiuGaiAdviSory?lqbz=${a}&aaa=${b}&guideType=${c}`)

		},

    editFn(parentCategoryId, articleId) {
        !!parentCategoryId && (sessionStorage.parentCategoryId = parentCategoryId) //解决2级类别传不到编辑的方案
        this.$dispatch('child-msg', "编辑文章")
        this.$route.router.go(`/newArticle/${articleId}`)

    },
    async ff(e){
			this.guideType=e
      let paramsObj = {
        guideType: e,
        pageIndex: "0",
        pageSize: "10000",
      }
      let data = await getResponses('advisoryGuide/advisoryGuideList.json',serialize(paramsObj))

      if( data.code==0 ){
        this.thisMonList = data.memberAdvisoryGuide
      }else{
        alert(`errMsg:${data.msg}`)
      }
    },

		async removeThe(){
      let paramsObj = {
        guideId :this.shiyishi,
				guideType :this.shanchu,
      }
      let data = await getResponses('/advisoryGuide/deleteAdvisoryGuide.json',serialize(paramsObj))

      if( data.code==0 ){
        // this.thisMonList = data.memberAdvisoryGuide
				this.ff(this.shanchu)
      }else{
        alert(`errMsg:${data.msg}`)
      }
    },

    changeWeights(ll,aa,index){
        let v=document.querySelectorAll('#weights')[index].innerHTML;
        if(v==aa){
        }else{
            let object={};
						object.weights=v;
            object.guideId=ll;
            this.updateUnrealHits(object);
        }
    },

		changeWeightsOne(lll,bb,index){
        let vv=document.querySelectorAll('#weightsOne')[index].innerHTML;
        if(vv==bb){
        }else{
            let object={};
						object.weights=vv;
            object.guideId=lll;
            this.updateUnrealHitsOne(object);
        }
    },

		changeWeightsTwo(llll,cc,index){
        let vvv=document.querySelectorAll('#weightsTwo')[index].innerHTML;
        if(vvv==cc){
        }else{
            let object={};
						object.weights=vvv;
            object.guideId=llll;
            this.updateUnrealHitsTwo(object);
        }
    },

		async updateUnrealHits(object) {
				let data = await getResponses("advisoryGuide/updateAdvisoryGuide.json", serialize(object));
				if (data.code === 0) {
		//                    this.getData()
				} else {
						alert(`errMsg:${data.msg}`)
				}

		},

		async updateUnrealHitsOne(object) {
				let data = await getResponses("advisoryGuide/updateAdvisoryGuide.json", serialize(object));
				if (data.code === 0) {
		//                    this.getData()
				} else {
						alert(`errMsg:${data.msg}`)
				}

		},

		async updateUnrealHitsTwo(object) {
				let data = await getResponses("advisoryGuide/updateAdvisoryGuide.json", serialize(object));
				if (data.code === 0) {
		//                    this.getData()
				} else {
						alert(`errMsg:${data.msg}`)
				}

		},

    reset(path) {
        this.$route.router.go(`/adviSory/?guideType=${this.guideType}`)
				// location.reload();
			  // if (this.$route.query.guideType == 0) {
				// 	this.ff(0)
				// }else if (this.$route.query.guideType == 1){
				// 	this.ff(1)
				// }else if (this.$route.query.guideType == 2){
				// 	this.ff(2)
				// }else {
				// 	this.ff(0)
				// }
    },

    base64(string){
    	return window.btoa(unescape(encodeURIComponent(string)))
    },


	exportHandler(tableID) {
		this.table = ""
		this.tableFn(tableID)
	  event.currentTarget.href = this.tableToExcel(this.table, '用户数据');
		this.getExportExcel()

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

    getSearchVal(){

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
    this.getCurrencylog()
	},
	newSendRequestTwo(){ //
		this.newCloseDropThree()
	},

	clearing(){   //点击表单结算按钮
		this.dropState = 'in'
		this.getShowHow()

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
		// return unit.pageThisMon > 1?'#page=' + unit.pageThisMon:'#'
		return unit.pageThisMon > 1?'#pageThisMon=' + unit.pageThisMon:'#'
    },
    pageHandlerPastMon: function(page) {
      //here you can do custom state update
    	this.pagePastMon = page
    	this.getTheRecord()
    },
    createUrlPastMon: function(unit) {
    	// return unit.pagePastMon > 1?'#page=' + unit.pagePastMon:'#'
    	return unit.pagePastMon > 1?'#pagePastMon=' + unit.pagePastMon:'#'
    },
  },
  ready(){
		if (this.$route.query.guideType == 0) {
			this.ff(0)
		}else if (this.$route.query.guideType == 1){
			this.ff(1)
		}else if (this.$route.query.guideType == 2){
			this.ff(2)
		}else {
			this.ff(0)
		}
  }
}
</script>
<style scoped>
  .xinzeng {
		background-color: rgba(22, 155, 213, 1);
		color: white;
		border: none;
		width: 100px;
		height: 30px;
		border-radius: 5px;
		text-align: center;
		line-height: 30px;
		float: left;
		position: relative;
		top: 18px;
  }
  .container-fluid {
    padding-right: 20px;
    padding-left: 40px;
  }
	.tagTit {
    display: inherit;
    padding-top: 10px;
	}
</style>
