<template>
    <div id="breadcrumb">
        <a href="javascript:;" class="tip-bottom">
            <i class="icon-home"></i>
                运营管理 > 消息管理
        </a>
    </div>

        <!-- ///////////////////////////////////////////////////////////////////// -->
    <div class="container-fluid mid">
        <div id="search" class="title">
            <input type="text" value="" placeholder="请输入标题"     v-model="searchVal.title"/>
            <input type="date" value="" placeholder="请输入起始时间" v-model="searchVal.timeS"/>
            <input type="date" value="" placeholder="请输入终止时间" v-model="searchVal.timeE"/>
            <select class="selectPopup" name="eidtdptId"             v-model="searchVal.state" >
                <option value="0" selected>已发送</option>
                <option value="1">未发送</option>
            </select>
            <div class="myBtn"  @click='getSearchVal'>搜索</div>
        </div>
        <!-- ///////////////////////////////////////////////////////////////////// -->
        <div class="widget-box" style="margin-top:0px;">
            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                <thead>
                    <tr>       
                        <th class="span1">序号</th>
                        <th class="span2">标题</th>
                        <th class="span1">图片</th>
                        <th class="span2">内容</th>
                        <th class="span2">链接文字</th>                        
                        <th class="span2">链接</th>
                        <th class="span1">推送时间</th>
                        <th class="span1">送达用户</th>
                        <th class="span1">点击用户</th>
                        <th class="span1">点击率</th>
                        <th class="span1">状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='item in dataList'>
                        <td>序号</td>
                        <td>标题</td>
                        <td><img src="" alt="" class="listImg"></td>
                        <td>内容</td>
                        <td>链接文字</td>                        
                        <td>链接</td>
                        <td>推送时间</td>
                        <td>送达用户</td>
                        <td>点击用户</td>
                        <td>点击率</td>
                        <td>状态</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="test" class="myPagenav">
            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
        </div>
        <div class="myBtn myBtnRight"  @click='getSearchVal'>新增</div>
    </div>
</template>
<script>
import { feedback } from  "../../api"  
import { serialize } from "../../utils"

import Vue from "vue"
import zpagenav from "vue-pagenav"

export default {
  components:{

  },
  data(){
    return {

        searchVal:{
            title:"",
            timeS:"",
            timeE:"",
            state:""
        },

        effectVal:{},   
        pageSize:15,
    	dataList:[],	
    	page: 1, 		//pagepageSize: 10 //pageSize,  default is 10   左分页
        total: 10, 	//total item count
        maxLink: 10,	//how many links to show, must not less than 5,  default is 5
    }
  },
  watch:{

  },  
  methods:{

    getSearchVal(){

        this.effectVal = {}

        if (this.searchVal.title) {
            this.effectVal.fContent = this.searchVal.title
        }

        if (this.searchVal.timeS) {
            this.effectVal.fContent = this.searchVal.timeS
        }

        if (this.searchVal.timeE) {
            this.effectVal.fContent = this.searchVal.timeE
        }

        if (this.searchVal.state) {
            this.effectVal.fContent = this.searchVal.state
        }

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
        let chargeWayArr = ['未发送','已发送']
        return chargeWayArr[num]
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




	







































