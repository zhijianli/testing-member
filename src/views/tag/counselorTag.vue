<template>
    <div id="breadcrumb">
        <a href="javascript:;" class="tip-bottom">
            <i class="icon-home"></i>
            <src img="img/breadcrumb.png">咨询师  &gt;  咨询师列表 </src>
        </a>
    </div>
    <div class="container-fluid mid">
<!--         <div id="search" class="title">
            <input type="text" id="bbbb" value="" placeholder="请输入标签名" v-model='searchVal.tagId'/>
            <div class="myBtn"  @click='getSearchVal'>搜索</div>
        </div> -->
        <!-- ///////////////////////////////////////////////////////////////////// -->
        <div class="widget-box" style="margin-top:20px;">
            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                <thead>
                    <tr>
                        <th>
                            <div class="checkbox">
                                <input type="checkbox" id="uniform-title-table-checkbox" class="checkboxInp" name="title-table-checkbox">
                                <label for="uniform-title-table-checkbox" class="checkboxLabel"></label>
                            </div>
                        </th>
                        <th>标签名</th>
                        <th>序号</th>
                        <th>类型</th>
                        <th>点击数</th>
                        <th>引用数</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='item in dataList'>
                        <td>
                            <div class="checkbox">
                                <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp" name="title-table-checkbox" @click='getTagId(item.tagId)'>
                                <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                            </div>
                        </td>
                        <td>{{item.phrase}}</td>
                        <td>{{item.orderNo}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.hitCount}}</td>
                        <td>{{item.refCount}}</td>
                        <td  @click='clearing(item.tagId,"0")'><span class="pointer">修改</span></td>
                     </tr>
                </tbody>
            </table>
        </div>
        <div id="test" class="myPagenav">
            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
        </div>
        <div class="myBtn myBtnRight btn-info"  @click='doDelete'>禁用</div>
        <div class="myBtn myBtnRight btn-warning" @click='clearing("","2")'>新增</div>
    </div>
    <div id="myAlert" class="modal {{drop.dropState}}">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click='closeDrop'>×</button>
            <h3>确定</h3>
        </div>
        <div class="modal-body" v-if='delWindow'>
            <p>标签名称</p>
            <input type="text" v-model='resetMsg.phrase' placeholder="输入标签名">
            <input type="text" v-model='resetMsg.orderNo' placeholder="输入标签序号">
        </div>
        <div class="modal-body" v-else>
            <p>您确定要删除吗？</p>
        </div>
        <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click='closeDrop'>取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click='doReset'>确定</a> </div>
    </div>
    <div class="modal-backdrop {{drop.dropState}}"></div>
</template>
<script>
import { obtainPsychoTagList , updatePsychoTag , newPsychoTag ,deletePsychoTag} from  "../../api"
import { serialize } from "../../utils"

import Vue from "vue"
import zpagenav from "vue-pagenav"

export default {
  components:{

  },
  data(){
    return {
        drop:{  //弹窗
            dropState:'hide',  /*弹窗状态*/
            stateResoult:"",   /*结算结果*/
        },
        delWindow:false,/*弹窗 删除 还是 新增 修改*/
        whichWindow:"",
        resetMsg:{
            tagId:"",
            phrase:"",
            orderNo:"",
            isEnable:"", //0启用 1 禁用
        },
        searchVal:{
            tagId:"",
        },
    	effectVal:{},
        pageSize:10,
    	dataList:[],
    	page: 1, 		//pagepageSize: 10 //pageSize,  default is 10   左分页
        total: 10, 	//total item count
        maxLink: 10,	//how many links to show, must not less than 5,  default is 5
    }
  },
  watch:{

  },
  methods:{
    getTagId(tagId){
        this.resetMsg.tagId = tagId
        console.log(this.resetMsg.tagId)
    },
    doDelete(){
        this.drop.dropState = 'in'
        this.delWindow = false
        this.whichWindow = "1"
        this.resetMsg.isEnable = 0
    },
    getSearchVal(){

        this.effectVal = {}

        if (this.searchVal.tagId) {
            this.effectVal.tagId = this.searchVal.tagId
        }

    	this.getData()
	},
    async getData(){

    	this.effectVal.pageIndex = this.page
		this.effectVal.pageSize = this.pageSize
		let params = serialize(this.effectVal)
		let data = await obtainPsychoTagList(params)
        if( data.code == 0 ){
            this.dataList = data.advisoryTags
            this.total = data.count
        // data.psychoDTOs.forEach((item) => {
        //     Vue.set(item, "checkState", false)
        // })

        }else{
            alert(`errMsg:${data.msg}`)
        }

        this.resetMsg.tagId = ""
        this.resetMsg.phrase = ""
        this.resetMsg.orderNo = ""
        this.resetMsg.isEnable = ""  //0启用 1 禁用
    },
    clearing( tagId , whichWindow ){   //点击表单结算按钮
        this.drop.dropState = 'in'
        this.whichWindow = whichWindow  //哪个弹窗
        if( this.whichWindow == 0 || this.whichWindow == 2){
            this.delWindow = true
        }else{
            this.delWindow = false
        }
        this.resetMsg.phrase = ""
        this.resetMsg.tagId = tagId
    },
    closeDrop(){  //关弹框
        this.drop.dropState = "hide"
    },
    doReset(){
        console.log(this.whichWindow)
            this.closeDrop()
        let paramsObj = {}
        let params = ""
        switch (this.whichWindow){
            case "0":   //修改
                paramsObj.orderNo = this.resetMsg.orderNo
                paramsObj.phrase = this.resetMsg.phrase
                paramsObj.tagId = this.resetMsg.tagId
                console.log(paramsObj)
                params = serialize(paramsObj)

                this.getRest(params)
                break;
            case "1":   //删除
                console.log(`删除_tagId:${this.resetMsg.tagId}`)
                this.getDelete(`ids=${this.resetMsg.tagId}&isEnable=${this.resetMsg.isEnable}`)
                break;
            case "2":   //新增
                console.log('新增')
                paramsObj.phrase = this.resetMsg.phrase
                paramsObj.orderNo = this.resetMsg.orderNo

                console.log(this.resetMsg.phrase)
                params = serialize(paramsObj)

                this.getAdd(params)

                break;
            default:
                alert('err')
                break;
        }

        paramsObj = {}
        params = ""
    },
    async getAdd(params){
        let data = await newPsychoTag(params)
        if(data.code == 0){

            this.getData()
        }else{
            alert(`errMsg:${data.msg}`)
        }
    },
    async getRest(params){
        let data = await updatePsychoTag(params)
        if(data.code == 0){
            this.getData()
        }else{
            alert(`errMsg:${data.msg}`)
        }
    },
    async getDelete(params){
        let data = await deletePsychoTag(params)
        if(data.code == 0){
            this.getData()
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
    }
  },
  ready(){
    // alert('搜索接口404')
    this.getData()
  }
}
</script>
