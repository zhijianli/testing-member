<template>

<div class="container-fluid">
  <div class="container-fluid" style="padding-top: 20px;">
    <span class="theTitle">券名称：</span>
    <input type="text" style="width: 300px;margin-left: 64px;" maxlength = "50" v-model="name" placeholder="券名称"></input>
  </div>
  <div class="container-fluid">
    <span class="theTitle">发放方式：</span>
    <select v-model="giveType" style="width: 316px;margin-left: 48px;">
      <option :value="0">积分兑换</option>
      <option :value="1">注册赠送</option>
      <option :value="2">手动发放</option>
    </select>
  </div>
  <div class="container-fluid">
    <span class="theTitle">抵扣金额（元）：</span>
    <input type="text" style="width: 300px;" v-model="discount" placeholder="抵扣金额（元）必须为数字"></input>
  </div>
  <div class="container-fluid">
    <span class="theTitle">满多少元可用：</span>
    <input type="text" style="width: 300px;margin-left: 16px;" v-model="useCondition" placeholder="满多少元可用必须为数字"></input>
  </div>
  <div class="container-fluid">
    <span class="theTitle">有效期（天）：</span>
    <input type="text" style="width: 300px;margin-left: 16px;" v-model="validity" placeholder="有效期（天）必须为数字"></input>
  </div>
  <div class="container-fluid">
    <span class="theTitle">总数：</span>
    <input type="text" style="width: 300px;margin-left: 80px;" v-model="total" placeholder="总数必须为数字"></input>
  </div>


  <button class="sevButton" style="margin-left: 211px;" @click="reset">保存</button>

	<div class="modal-backdrop {{newDropStateThree}}"></div>
</template>
<script>
import calendar from "../../calendar.vue"
import moment from "moment"
import { getResponses } from "../../api"
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
      discount:"",
    	giveType:"0",
    	name:"",
    	total:"",
    	useCondition:"",
    	validity:"",
    }
  },

  methods:{
    reset(path) {
      if (this.name === '') {
  				alert('券名称不能为空')
  				return
  		}
      if (this.discount === '' || !/^([1-9]\d*|[0]{1,1})$/.test(this.discount)) {
  				alert('抵扣金额不能为空且必须为正整数')
  				return
  		}
      if (this.useCondition === '' || !/^([1-9]\d*|[0]{1,1})$/.test(this.useCondition)) {
  				alert('满多少元可用不能为空且必须为正整数')
  				return
  		}
      if (this.validity === '' || !/^([1-9]\d*|[0]{1,1})$/.test(this.validity)) {
  				alert('有效期不能为空且必须为正整数')
  				return
  		}
      if (this.total === '' || !/^([1-9]\d*|[0]{1,1})$/.test(this.total)) {
  				alert('总数不能为空且必须为正整数')
  				return
  		}

      this.getTheRecord()
      setTimeout(() => {
        this.$route.router.go(`/coupon`)
      }, 500);
    },

    async getTheRecord(){
		let paramsObj = {
      discount : this.discount,
    	giveType : this.giveType,
    	name : this.name,
    	total : this.total,
    	useCondition : this.useCondition,
    	validity : this.validity,
		}
		let data = await getResponses('CapitalCoupon/addCapitalCoupon.json',serialize(paramsObj))
    },
  },
}
</script>
<!-- /* <style media="screen">
.newTheTitle {
  font-size: 16px;
  color: black;
  font-weight: 400;
  line-height: 50px;
  /* margin-top: 40px; */
  float: left;
}
</style> */ -->
