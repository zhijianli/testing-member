<template>

<div class="container-fluid">
  <div class="container-fluid" style="padding-top: 20px;">
    <span class="theTitle">标题：</span>
    <input type="text" placeholder="最多可输入50字" class="maxSize" maxlength = "50" v-model="theTitleOne"></input>
  </div>
  <div class="container-fluid">
    <span class="newTheTitle" style="margin-top: 1px;">指南详情：</span>
    <!-- <textarea class="oneTextArea" v-model="guideDetails"></textarea> -->
    <vue-html5-editor :content.sync="guideDetails" style="height: 600px;"></vue-html5-editor>
  </div>
  <button class="sevButton" style="margin-left: 126px;" @click="reset">保存</button>

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
      theTitleOne:'',
      guideDetails:'',
      tTimeout:'',
    }
  },

  methods:{
    reset(path) {
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
      }, 500);
    },

    async getTheRecord(){
		let paramsObj = {
      content : this.guideDetails,
      title : this.theTitleOne,
      guideType : this.$route.query.guideType,
		}
		let data = await getResponses('/advisoryGuide/addAdvisoryGuide.json',serialize(paramsObj))
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
