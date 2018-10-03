<template>


        <!-- ///////////////////////////////////////////////////////////////////// -->
    <div class="container-fluid mid">
        <div id="search" class="title">
            <input type="text" value="" placeholder="请输入标题"     v-model="searchVal.pageTitle"/>
<!--             <input type="date" value="" placeholder="请输入起始时间" v-model="searchVal.timeS"/>
            <input type="date" value="" placeholder="请输入终止时间" v-model="searchVal.timeE"/> -->
            <select class="selectPopup" name="eidtdptId"             v-model="searchVal.type" >
                <option :value=0 number>未发送</option>
                <option :value=1 number>进行中</option>
                <option :value=2 selected number>已结束</option>
                <option :value=3 selected number>其他</option>
            </select>
            <div class="myBtn"  @click='getSearchVal'>搜索</div>
        </div>
        <!-- ///////////////////////////////////////////////////////////////////// -->
        <div class="widget-box" style="margin-top:0px;">
            <table class="table table-bordered table-striped  with-check" id="DataTables_Table_0">
                <thead>
                    <tr>
                        <th @click='selectTheList' class="pointer span1">全选</th>
                        <th class="span1">广告id</th>
                        <th class="span3">标题</th>
                        <th class="span1">广告页图</th>
                        <th class="span3">链接</th>
                        <th class="span3">推送时间段</th>
                        <th class="span1">状态</th>
                        <th class="span1">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='item in dataList'>
                        <td class="span1">
                            <div class="checkbox">
                                <input
                                    type="checkbox" id="dataList-{{$index}}"
                                    class="checkboxInp" name="title-table-checkbox"
                                    :value='item.stPageId'
                                    :checked=" item.checkState? 'checked':''"
                                    v-model="selectList"
                                >
                                <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                            </div>
                        </td>
                        <td class="span1">{{item.stPageId}}</td>
                        <td class="span3" :title='item.pageTitle'>{{item.pageTitle | CstrFilter}}</td>
                        <td class="span1"><img :src="imgPre + '/' + item.filePath" class="listImg"></td>
                        <td class="span3" :title='item.link'>{{item.link | EstrFilter}}</td>
                        <td class="span3">{{item.startTime}} --- {{item.endTime}}</td>
                        <td class="span1">{{item.startPageStatus}}</td>
                        <td class="span1">
                            <a href="javascript:;" @click="upload(item.stPageId)">编辑</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="test" class="myPagenav">
            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
        </div>
        <div class="myBtn myBtnRight btn-warning"  @click='add'>新增</div>
        <div class="myBtn myBtnRight btn-info"  @click='del'>删除</div>
    </div>
</template>
<script>
import {
    adStartupPagelist,
    adStartupPagedelete
} from  "../../api"

import { serialize } from "../../utils"

import Vue from "vue"
import zpagenav from "vue-pagenav"

export default {
  components:{

  },
  // props:['imgPre'],
  data(){

    return {
        imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
        searchVal:{
            pageTitle:"",
            type:0
            // timeS:"",
            // timeE:"",
        },

        effectVal:{},

        dataList:[],

        selectList:[],//checkBox 选中的人 的 mid
        selectAll:false,

        pageSize:15,
        page: 1,        //pagepageSize: 10 //pageSize,  default is 10   左分页
        total: 10,  //total item count
        maxLink: 10,    //how many links to show, must not less than 5,  default is 5
    }
  },
  route:{

  },
  watch:{

  },
  methods:{
  	add(){
        this.$route.router.go("/advertisementAdd")
  	},
    upload(id){
        // this.$route.router.go("/upload_advertisement/"+id)
        // this.$route.router.go("/messageAdd/"+id)
        this.$route.router.go("/advertisementUpload/"+id)
    },
    async del(){

        if(this.selectList.length > 0){
            let paramsObj = {
                ids:this.selectList
            }

            let data = await adStartupPagedelete(serialize(paramsObj))

            if( data.code == 0 ){
                console.log('del success')
            }else{
                alert(`errMsg:${data.msg}`)
            }

            this.getData()
        }else{
            alert('请先选择')
        }

    },
    selectTheList(){
        this.selectAll = !this.selectAll
        this.selectList = []
        if(this.selectAll){
            this.dataList.forEach( (item,index,arr)=>{
                item.checkState = true
                this.selectList.push(item.stPageId)
            })
        }else{
            this.dataList.forEach( (item,index,arr)=>{
                item.checkState = false
            })
        }
        console.log(`selectPerson:${this.selectList}`)
    },
    getSearchVal(){

        this.effectVal = {}

        if (this.searchVal.pageTitle) {
            this.effectVal.pageTitle = this.searchVal.pageTitle
        }

        if (this.searchVal.type != 3) {

            this.effectVal.type = this.searchVal.type
        }

        // if (this.searchVal.timeS) {
        //     this.effectVal.timeS = this.searchVal.timeS
        // }

        // if (this.searchVal.timeE) {
        //     this.effectVal.timeE = this.searchVal.timeE
        // }


    	this.getData()
	},
    async getData(){

    	this.effectVal.pageIndex = this.page
		this.effectVal.pageSize = this.pageSize

		let params = serialize(this.effectVal)

		let data = await adStartupPagelist(params)
        if( data.code == 0 ){
    		this.dataList = data.list
    		this.total = data.count

            data.list.forEach((item) => {   //checkBox
                Vue.set(item, "checkState", false)
            })

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
    EstrFilter(str){
        if(str.length>80){
            return str.substr(0,80)+"..."
        }else{
            return str
        }
    },
    CstrFilter(str){
        if(str.length>20){
            return str.substr(0,20)+"..."
        }else{
            return str
        }
    }
  },
  ready(){
    this.getData()
  }
}
</script>












































