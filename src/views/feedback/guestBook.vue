<template>


        <!-- ///////////////////////////////////////////////////////////////////// -->
    <div class="container-fluid mid">
        <div id="search" class="title">
          <span style="margin-left: 10px;margin-right: 5px;color: black;float: left;line-height: 32px;">反馈来源:</span>
          <select class="mr20" id="regTimeDirection" v-model='searchVal.userType' style="float: left;">
              <option value="0">全部</option>
              <option value="1">用户</option>
              <option value="2">专家</option>
          </select>
            <input type="text" style="float: left;" id="bbbb" value="" placeholder="请输入反馈内容" v-model='searchVal.text'/>

            <div class="myBtn"  @click='getSearchVal'>搜索</div>
        </div>
        <!-- ///////////////////////////////////////////////////////////////////// -->
        <div class="widget-box" style="margin-top:0px;">
            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                <thead>
                    <tr>
                        <th>
                            <div class="checkbox">
                                <input type="checkbox" id="uniform-title-table-checkbox" class="checkboxInp" name="title-table-checkbox">
                                <label for="uniform-title-table-checkbox" class="checkboxLabel"></label>
                            </div>
                        </th>
                        <th class="span3">会员昵称</th>
                        <th class="">反馈内容</th>
                        <th class="span2">反馈来源</th>
                        <th class="span2">反馈时间</th>
                        <th class="span1">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='item in dataList'>
                        <td>
                            <div class="checkbox">
                                <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp" name="title-table-checkbox">
                                <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                            </div>
                        </td>
                        <td>{{item.nickname}}</td>
                        <td>{{item.fContent | fContentFilter}}</td>
                        <td>{{item.userType | newFContentFilter}}</td>
                        <td>{{item.fTime}}</td>
                        <td @click='clearing(item.fid)'><span class="pointer">查看</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="test" class="myPagenav">
            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
        </div>
    </div>
    <div id="myAlert" class="modal {{drop.dropState}}">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click='closeDrop'>×</button>
            <h3>反馈内容</h3>
        </div>
        <div class="modal-body">
            <p>
                {{feedbackMsg.nickname}} - {{feedbackMsg.fContent}} - {{feedbackMsg.fTime}}
            </p>
        </div>
        <div class="modal-footer"><a data-dismiss="modal" class="btn btn-danger" href="#" @click='closeDrop'>确定</a> </div>
    </div>
    <div class="modal-backdrop {{drop.dropState}}"></div>
</template>
<script>
import { feedback , feedbackThenView } from  "../../api"
import { serialize } from "../../utils"

import Vue from "vue"
import zpagenav from "vue-pagenav"

export default {
  components:{

  },
  data(){
    return {
        feedbackMsg:{
            nickname:"",
            fContent:"",
            fffContent:"",
            fTime:"",
        },
        drop:{  //弹窗
            dropState:'hide',  /*弹窗状态*/
        },
        searchVal:{
            words:"",
        },
        effectVal:{},
        pageSize:10,
    	dataList:[],
    	page: 1, 		//pagepageSize: 10 //pageSize,  default is 10   左分页
        total: 10, 	//total item count
        maxLink: 10,	//how many links to show, must not less than 5,  default is 5
        userType: 0,
    }
  },
  watch:{

  },
  methods:{
    clearing( fid ){   //点击表单结算按钮
        this.drop.dropState = 'in'
        this.feedbackMsg.nickname = ""
        this.feedbackMsg.fContent = ""
        this.feedbackMsg.fTime = ""
        this.getDetail(fid)
    },
    closeDrop(){  //关弹框
        this.drop.dropState = "hide"
    },
    getSearchVal(){

        this.effectVal = {}

        if (this.searchVal.text) {
            this.effectVal.fContent = this.searchVal.text
        }
        if (this.searchVal.userType) {
            this.effectVal.userType = this.searchVal.userType
        }
      this.page = "1"
    	this.getData()
	},
    async getData(){

    	this.effectVal.pageIndex = this.page
		this.effectVal.pageSize = this.pageSize

		let params = serialize(this.effectVal)
		let data = await feedback(params)
        if( data.code == 0 ){
    		this.dataList = data.list
    		this.total = data.count
        }else{
            alert(`errMsg:${data.msg}`)
        }
    },
    async getDetail(fid){
        let paramsObj = {
            fid:fid
        }
        let params = serialize(paramsObj)
        let data = await feedbackThenView(params)
        if( data.code == 0 ){
            this.feedbackMsg.nickname = data.obj.nickname
            this.feedbackMsg.fContent = data.obj.fContent
            this.feedbackMsg.fTime = data.obj.fTime
        }else{
            alert(`errMsg:${data.msg}`)
        }
    },
    pageHandler: function(page) {
    	this.page = page
    	this.getData()
    },
    createUrl: function(unit) {
    	return unit.page > 1?'#page=' + unit.page:'#'
    },
  },
  filters:{
    statusFilter(num){
        let chargeWayArr = ['未启用','启用']
        return chargeWayArr[num]
    },
    newFContentFilter(num){
        let userType = ['未启用','用户','专家']
        return userType[num]
    },
    fContentFilter(str){
        if(str.length>90){
            return str.substr(0,90)+"..."
        }else{
            return str
        }
    },
  },
  ready(){
    this.getData()
  }
}
</script>
