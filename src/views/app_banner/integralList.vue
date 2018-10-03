<template>
    <div>
        <div class="container-fluid">
          <a href="javascript:;"  @click="newClearing()" style="color: white;">
            <div class="newAdded">
            新增
            </div>
          </a>
            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                <thead>
                <tr>
                    <th style="width:50px">序号</th>
                    <th>创建时间</th>
                    <th>名称</th>
                    <th>介绍</th>
                    <th>兑换积分</th>
                    <th>已兑换人数</th>
                    <th>当前状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in integralList">
                    <td>{{ item.pid }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.presentation }}</td>
                    <td>{{ item.conversionPoint }}</td>
                    <td>{{ item.conversionNum }}</td>
                    <td>{{ item.isEnable | bianYiSex}}</td>
                    <td>
                      <span class="normal-operate-state" @click="jifensj(0,item.pid,item.isEnable)" v-show="item.isEnable === 1">上架</span>
                      <span class="normal-operate-state" @click="jifen(1,item.pid)" v-show="item.isEnable === 0">下架</span>
                      <span class="normal-operate-state" @click="changeRoute(`/integralList/${item.pid}`)">查看详情</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div id="test" class="myPagenav">
                <zpagenav :page="page"  :page-size="pageSize"  :total="total"  :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
                <zpagenav>
            </div>
        </div>
        <div class="modal {{newDropState}}" style="width: 487px;height: 388px;margin-top: 150px;">
      		<div class="container-fluid" style="padding-top: 18px;">
      	    <span>名称：</span>
      	    <input type="text" style="width: 290px;height: 17px;margin-left: 42px;" v-model="name"></input>
      	  </div>
      		<div class="container-fluid" style="padding-top: 5px;">
      	    <span style="float: left;">介绍：</span>
      	    <textarea style="width: 300px;height: 103px;margin-left: 46px;" v-model="presentation"></textarea>
      	  </div>
      		<div class="container-fluid" style="padding-top: 12px;">
      	    <span>兑换积分：</span>
      	    <input type="text" style="width: 290px;height: 17px;margin-left: 14px;" v-model="conversionPoint"></input>
      	  </div>
          <div class="container-fluid" style="padding-top: 10px;">
      	    <span>关联优惠券：</span>
            <select v-model="cid" style="width: 306px;">
    					<option value="">不关联</option>
    					<option :value="item.cid" v-for="item in saList">{{item.content}}</option>
    				</select>
      	  </div>
      		<div>
            <a data-dismiss="modal" class="newAdded" @click='sendRequest()' style="margin-top: 40px;margin-left: 128px;cursor: pointer;">保存</a>
      			 <a data-dismiss="modal" class="newAdded" @click='qxsendRequest()' style="margin-top: 40px;margin-left: 42px;cursor: pointer;">取消</a>
      		</div>
      	</div>
        <div class="modal {{newDropStatesj}}" style="width: 364px;height: 105px;margin-top: 150px;">
      		<span style="font-size: 18px;margin-left: 142px;">确定上架？</span>
      		<div>
            <a data-dismiss="modal" class="newAdded" @click='qdsendRequest()' style="margin-top: 40px;margin-left: 130px;cursor: pointer;">确定</a>
      		</div>
      	</div>
        <div class="modal {{newDropStatexj}}" style="width: 364px;height: 105px;margin-top: 150px;">
      		<span style="font-size: 18px;margin-left: 142px;">确定下架？</span>
      		<div>
            <a data-dismiss="modal" class="newAdded" @click='qdsendRequest()' style="margin-top: 40px;margin-left: 130px;cursor: pointer;">确定</a>
      		</div>
      	</div>
    </div>
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
      data() {
        return {
          integralList: [],
          newDropState:'hide',
          newDropStatesj:'hide',
          newDropStatexj:'hide',
          name: "",
          cid: "",
          did: "",
        	conversionPoint: "",
        	presentation: "",
        	type: "",
          saList: [],
          page: 1,
          pageSize: 10,
          total: 10,
          maxLink: 10,
        }
      },
      methods: {
        pageHandler: function(page) {
            this.page = page
            this.ff()
        },
        createUrl: function(unit) {
            return unit.page > 1 ? '#page=' + unit.page : '#'
        },
        async newClearing(){   //点击新增按钮
    			this.newDropState = 'in'
          let paramsObj = {

  	      }
  	      let data = await getResponses('CapitalCoupon/validCapitalCouponList.json',serialize(paramsObj))

  	      if( data.code==0 ){
            this.saList = data.list
  	      }else{
  	        alert(`errMsg:${data.msg}`)
  	      }
    		},
        newTwoCloseDrop(){  //关弹框
    			this.newDropState = "hide"
    		},
        qxsendRequest(){
          this.newDropState = "hide"
          this.ff()
        },
        qdsendRequest(){
          this.newDropStatexj = "hide"
          this.newDropStatesj = "hide"
          this.ff()
        },
    		async sendRequest(){ //点击 弹框的按钮
          if (this.name === '') {
      				alert('名称不能为空')
      				return
      		}
          if (this.presentation === '') {
      				alert('介绍不能为空')
      				return
      		}
          if (this.conversionPoint === '' || !/^([1-9]\d*|[0]{1,1})$/.test(this.conversionPoint)) {
      				alert('兑换积分不能为空且必须为正整数')
      				return
      		}
    			this.newDropState = "hide"
          if(this.cid === ""){
            this.type = 0
            this.did = 1
          }else{
            this.type = 1
            this.did = ''
          }
          console.log(this.cid);
          let paramsObj = {
            name : this.name,
            cid : this.cid,
            did : this.did,
          	conversionPoint : this.conversionPoint,
          	presentation : this.presentation,
          	type : this.type,
  	      }
  	      let data = await getResponses('CapitalPoint/addCapitalPoint.json',serialize(paramsObj))

  	      if( data.code==0 ){

  	      }else{
  	        alert(`errMsg:${data.msg}`)
  	      }
          this.ff()
          this.name = ''
          this.conversionPoint = ''
          this.presentation = ''
     	},
          // 接口名称 获取积分接口
        async ff(){
  	      let paramsObj = {
            pageIndex : this.page,
            pageSize : this.pageSize,
  	      }
  	      let data = await getResponses('CapitalPoint/capitalPointList.json',serialize(paramsObj))

  	      if( data.code==0 ){
  	        this.integralList = data.list
            this.total = data.content.count
  	      }else{
  	        alert(`errMsg:${data.msg}`)
  	      }
  	    },

        async jifen(e,f){
          this.newDropStatexj = 'in'

  	      let paramsObj = {
            pid : f,
						status : e,
  	      }
  	      let data = await getResponses('CapitalPoint/updateCapitalPointStatus.json',serialize(paramsObj))

  	      if( data.code==0 ){

  	      }else{
  	        alert(`errMsg:${data.msg}`)
  	      }
  	    },

        async jifensj(e,f,h){

  	      let paramsObj = {
            pid : f,
						status : e,
  	      }
  	      let data = await getResponses('CapitalPoint/updateCapitalPointStatus.json',serialize(paramsObj))

  	      if( data.code==0 ){

  	      }else{
  	        alert(`券已停用，请先启用`)
            return
            this.ff()
  	      }
          this.newDropStatesj = 'in'
  	    },


        changeRoute(url){
            this.$route.router.go(url)
        },
      },
      filters: {
  			// 当前状态    0 展示中 1 已下架
  			bianYiSex(num) {
  					let chargeWayArr = ['展示中', '已下架']
  					return chargeWayArr[num]
  			}
  		},
      ready() {
          this.ff()
      }
    }
</script>
<style scoped>
.newAdded {
  background-color: rgba(22, 155, 213, 1);
  color: white;
  border: none;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  margin-top: 19px;
  float: left;
}
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  margin-top: 70px;
}
</style>
