<template>
<div class="container-fluid">
	<a href="javascript:;"  @click="reset(path)" style="color: white;">
		<div class="newAddedd">
		新增
		</div>
	</a>
	<ul class="tagCont">
		<ul style="margin-top: 45px;">
			<li>
				<table class="table table-bordered table-striped  mytable" id="NewtablePpastMonList" style="width:1150px; margin-top: 70px;">
					<thead>
						<tr>
              <th style="width: 31px;">序号</th>
              <th>券名称</th>
							<th style="width: 131px;">创建时间</th>
							<th style="width: 73px;">发放方式</th>
							<th style="width: 87px;">抵扣金额（元）</th>
							<th style="width: 90px;">使用条件</th>
							<th style="width: 72px;">有效期（天）</th>
							<th style="width: 60px;">总数</th>
							<th style="width: 60px;">已发放数</th>
							<th style="width: 60px;">已使用数</th>
							<th style="width: 60px;">状态</th>
							<th style="width: 120px;">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for='(index,item) in thisMonList'>
							<td>{{item.cid}}</td>
							<td>{{item.name}}</td>
							<td>{{item.createTime}}</td>
							<td>{{item.giveType | bianYiSex}}</td>
							<td>{{item.discount}}</td>
							<td>满{{item.useCondition}}元可用</td>
							<td>{{item.validity}}</td>
							<td>{{item.total}}</td>
							<td>{{item.isGived}}</td>
							<td>{{item.isUsed}}</td>
							<td>{{item.isEnable | statusFilter}}</td>
              <td>
								<span @click="removeThe(1,item.cid)" v-show="item.isEnable === 0" style="color: #169BD5;cursor: pointer;">停用</span>
								<span @click="removeTheTwo(0,item.cid,item.giveType,item.total,item.isGived)" v-show="item.isEnable === 1" style="color: #169BD5;cursor: pointer;">启用</span>
								<span @click="newClearing(item.cid,item.total,item.isGived,item.isEnable)" v-show="item.giveType === 2" style="color: #169BD5;cursor: pointer;margin-left: 10px;">发放到人</span>
              </td>
						</tr>
					</tbody>
				</table>
			</li>
		</ul>
	</ul>
	<div id="test" class="myPagenav">
			<zpagenav :page="page"  :page-size="pageSize"  :total="total2"  :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
			<zpagenav>
	</div>
	<div class="modal {{newDropState}}" style="width: 400px;height: 263px;margin-top: 150px;">
		<div class="container-fluid" style="padding-top: 40px;float: left;">
	    <span>用户手机号：</span>
	    <input type="text" style="width: 208px;height: 17px;" v-model="phone" placeholder="请输入11位手机号" maxlength="11" v-on:input="mobileSearch()"></input>
			<!-- <span style="margin-bottom: 14px;float: left;color: red;">{{tiShi}}</span> -->
	  </div>
		<div class="container-fluid" style="padding-top: 20px;">
	    <span>用户昵称：</span>
			<span style="margin-left: 14px;">{{nickname}}</span>
	  </div>
		<div class="container-fluid" style="padding-top: 20px;">
	    <span>券数量：</span>
	    <span style="margin-left: 27px;">1张</span>
	  </div>
		<div>
			 <a data-dismiss="modal" @click='sendRequestTwo(this.mid,this.cid,this.nickname)' class="newAddedd2">
				 发放
			 </a>
			 <a data-dismiss="modal" @click='quxiao()' class="newAddedd2">
				 取消
			 </a>
		</div>
	</div>
	<div class="modal {{newDropStateTwo}}" style="width: 400px;height: 136px;margin-top: 150px;">

		<div class="container-fluid" style="padding-top: 40px;">
	    <span>当前已有{{numeber}}个注册赠送券启用中</span>
	  </div>
		<div>
			 <a data-dismiss="modal" @click='sendRequest()' class="newAddedd2" style="margin-left: 148px;">
				 确定
			 </a>
		</div>

	</div>
	<div class="modal {{qynewDropState}}" style="width: 400px;height: 136px;margin-top: 150px;">

		<div class="container-fluid" style="padding-top: 40px;">
	    <span>确定启用优惠券</span>
	  </div>
		<div>
			 <a data-dismiss="modal" @click='qysendRequest()' class="newAddedd2" style="margin-left: 148px;">
				 确定
			 </a>
		</div>

	</div>
	<div class="modal {{tynewDropState}}" style="width: 400px;height: 136px;margin-top: 150px;">

		<div class="container-fluid" style="padding-top: 40px;">
	    <span>确定停用优惠券</span>
	  </div>
		<div>
			 <a data-dismiss="modal" @click='tysendRequest()' class="newAddedd2" style="margin-left: 148px;">
				 确定
			 </a>
		</div>

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
    	dropState:'hide',  /*弹窗状态*/
			newDropState:'hide',  /*弹窗状态*/
			qynewDropState:'hide',  /*弹窗状态*/
			tynewDropState:'hide',  /*弹窗状态*/
			newDropStateTwo:'hide',  /*弹窗状态*/
			newDropStateThree:'hide',  /*弹窗状态*/
			thisMonList:"",
			nickname:"",
			phone:"",
			tingyong:"",
			numeber:"",
			page: 1,
			pageSize: 10,
			total2: 10,
			maxLink: 10,
			// tiShi: '请输入正确的11位数字手机号码且不能输入空格',
    }
  },
  methods:{
		pageHandler: function(page) {
				this.page = page
				this.ff()

		},
		createUrl: function(unit) {
				return unit.page > 1 ? '#page=' + unit.page : '#'
		},
			newClearing(we,h,z,g){   //点击操作按钮
				this.phone = ''
				this.nickname = ''
				if (g == 1) {
					alert(`券已停用，请先启用`)
					return
				}
				if(h<=z){
					alert(`优惠券已发放完毕`)
					return
				}
				this.newDropState = 'in'
				this.cid = we
			},
			newClearingTwo(){   //点击操作按钮
				this.newDropStateTwo = 'in'
			},
			newTwoCloseDrop(){  //关弹框
				this.newDropState = "hide"
			},
			sendRequest(){ // 结算请求   点击 弹框的按钮
				this.newDropStateTwo = "hide"
				this.ff()
	 		},
			qysendRequest(){ // 结算请求   点击 弹框的按钮
				this.qynewDropState = "hide"
				this.ff()
	 		},
			tysendRequest(){ // 结算请求   点击 弹框的按钮
				this.tynewDropState = "hide"
				this.ff()
	 		},
			async sendRequestTwo(e,f,g){ // 结算请求   点击 弹框的按钮
				if (g == ""){
					alert(`请重新输入手机号`)
					return
				}else{
					this.newDropState = "hide"
					let paramsObj = {
						cid: f,
						mid: e,
					}
					let data = await getResponses('CapitalCoupon/giveCapitalCoupon2Person.json',serialize(paramsObj))
					if( data.code==0 ){
						alert(`发放成功`)
						this.nickname = ''
						this.phone = ''
					}else{
						alert(`errMsg:${data.msg}`)
						this.nickname = ''
						this.phone = ''
					}
					this.ff()
				}

	 		},
			//手机号码获取个人
			async mobileSearch(){
				if(this.phone.length === 11 && /^[0-9]*$/.test(this.phone)){
					let paramsObj = {
		        phone: this.phone,
		      }
					let data = await getResponses('CapitalCoupon/getMember.json',serialize(paramsObj))
		      if( data.code==0 ){
		        this.mid = data.mid
						this.nickname = data.nickname
						// this.tiShi = ''
		      }else{
		        alert(`errMsg:${data.msg}`)
						// this.newDropState = "hide"
		      }
				}
				if(this.phone.length !== 11 && /^[0-9]*$/.test(this.phone)){
					this.nickname = ''
				}
			},
			//优惠券列表
	    async ff(){
	      let paramsObj = {
					pageIndex : this.page,
					pageSize : this.pageSize,
	      }
	      let data = await getResponses('CapitalCoupon/capitalCouponList.json',serialize(paramsObj))

	      if( data.code==0 ){
	        this.thisMonList = data.list
					this.total2 = data.content.count
	      }else{
	        alert(`errMsg:${data.msg}`)
	      }
	    },

			async removeTheTwo(e,f,g,h,z){
				this.qynewDropState = 'in'
				if (g === 1) {
					this.newClearingTwo()
					let paramsObj = {
		        cid : f,
						status : e,
		      }
		      let data = await getResponses('CapitalCoupon/updateCapitalCouponStatus.json',serialize(paramsObj))
		      if( data.code==0 ){

		      }else{
		        alert(`券已停用，请先启用`)
		      }
				}else{
					let paramsObj = {
		        cid : f,
						status : e,
		      }
		      let data = await getResponses('CapitalCoupon/updateCapitalCouponStatus.json',serialize(paramsObj))
		      if( data.code==0 ){

		      }else{
		        alert(`errMsg:${data.msg}`)
		      }
				}

				let paramsObj = {
	        cid : f,
					status : e,
	      }
	      let data = await getResponses('CapitalCoupon/getCouponByCondition.json',serialize(paramsObj))
	      if( data.code==0 ){
					this.numeber = data.num
	      }else{
	        alert(`errMsg:${data.msg}`)
	      }

	    },

			async removeThe(e,f){
				this.tynewDropState = 'in'
	      let paramsObj = {
	        cid : f,
					status : e,
	      }
	      let data = await getResponses('CapitalCoupon/updateCapitalCouponStatus.json',serialize(paramsObj))
	      if( data.code==0 ){

	      }else{
	        alert(`errMsg:${data.msg}`)
	      }
	    },

			quxiao() {
				this.newDropState = "hide"
				this.phone = ''
				this.nickname = ''
			},

	    reset(path) {
	        this.$route.router.go(`/newPreferential`)
	    },
			newSendRequestTwo(){
				this.newCloseDropThree()
			},
  	},
		filters: {
			statusFilter(num) {
					let chargeWayArr = ['已启用', '已停用']
					return chargeWayArr[num]
			},
			// 发放方式    0 积分兑换 1 注册赠送 2 手动发放
			bianYiSex(num) {
					let chargeWayArr = ['积分兑换', '注册赠送', '手动发放']
					return chargeWayArr[num]
			}
		},
	  ready(){
			this.ff()
	  	}
		}
</script>
<style>
  .newAddedd {
		background-color: rgba(22, 155, 213, 1);
		color: white;
		border: none;
		width: 100px;
		height: 30px;
		border-radius: 5px;
		text-align: center;
		line-height: 30px;
		float: left;
		margin-top: 20px;
  }
	.newAddedd2 {
		background-color: rgba(22, 155, 213, 1);
		color: white;
		border: none;
		width: 100px;
		height: 30px;
		border-radius: 5px;
		text-align: center;
		line-height: 30px;
		margin-left: 66px;
		margin-top: 30px;
		float: left;
		cursor: pointer;
  }
  .container-fluid {
    padding-right: 20px;
    padding-left: 40px;
  }
</style>
