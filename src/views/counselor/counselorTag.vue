<template>

    <div class="container-fluid mid">
        <div id="search" class="title">
            <input type="text" id="bbbb" value="" placeholder="请输入标签名" v-model='searchVal.tagId'/>
            <div class="myBtn"  @click='getSearchVal'>搜索</div>
        </div>
        <!-- ///////////////////////////////////////////////////////////////////// -->
        <div class="widget-box" style="margin-top:0px;">
            <table class="table table-bordered table-striped  mytable" id="DataTables_Table_0">
                <thead>
                    <tr>
                        <th @click='selectAll' class="pointer span1">全选</th>
                        <th>标签名</th>
                        <th class="span1">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='item in dataList'>
                        <td>
                            <div class="checkbox">
                             <input 
                                type="checkbox" id="dataList-{{$index}}" 
                                class="checkboxInp" name="title-table-checkbox" 
                                :value='item.tagId'
                                :checked=" item.checkState? 'checked':''"
                                v-model="selectPersonList"
                            >
                                <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                            </div>
                        </td>   
                        <td>{{item.phrase}}</td>
                        <td  @click='clearing(item.tagId,"0",item.phrase)'><span class="pointer">修改</span></td>
                     </tr>   
                </tbody>
            </table>
        </div>
        <div id="test" class="myPagenav">
            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
        </div>
        <div class="myBtn myBtnRight btn-info"  @click='doDelete'>删除</div>
        <!-- <div class="myBtn myBtnRight btn-warning" @click='clearing("","2")'>新增</div> -->
        <div class="myBtn myBtnRight btn-warning" @click='clearing("","2","")'>新增</div>       
    </div>
    <div id="myAlert" class="modal {{drop.dropState}}">
        <div v-if='delWindow'>
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click='closeDrop'>×</button>
                <h3>操作</h3>
            </div>
            <div class="modal-body" >
                <p class="inlineblock" >标签名称 :</p>
                <input  class="inlineblock" type="text" v-model='resetMsg.phrase'>
            </div>
        </div>
        <div v-else>
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click='closeDrop'>×</button>
                <h3>操作</h3>
            </div>
            <div class="modal-body" >
                <p>您确定要删除吗？</p>
            </div>
        </div>
        <div class="modal-footer"> 
            <a data-dismiss="modal" class="btn " href="#" @click='closeDrop'>取消</a> 
            <a data-dismiss="modal" class="btn btn-danger" href="#" @click='doReset'>确定</a> 
        </div>
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
        },
        searchVal:{
            tagId:"",
        },

        selectPersonList:[],//checkBox 选中的人 的 mid
        selectPersonAll:false,

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
        if(this.selectPersonList.length == 0){
            alert('请选择要删除的标签')
        }else{
            this.drop.dropState = 'in'
            this.delWindow = false
            this.whichWindow = "1"
        }
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
            this.dataList = data.psychoTags
            this.total = data.count
            data.psychoTags.forEach((item) => {   //checkBox 
                Vue.set(item, "checkState", false)
            })

        }else{
            alert(`errMsg:${data.msg}`)
        }
    },
    clearing( tagId , whichWindow ,phrase ){   //点击表单结算按钮
        this.drop.dropState = 'in'
        this.whichWindow = whichWindow  //哪个弹窗
        if( this.whichWindow == 0 || this.whichWindow == 2){
            this.delWindow = true
        }else{
            this.delWindow = false
        }
        if(phrase){
            this.resetMsg.phrase = phrase
            this.resetMsg.tagId = tagId
        }else{
            this.resetMsg.phrase = ""
            this.resetMsg.tagId = tagId
        }
    },
    closeDrop(){  //关弹框
        this.drop.dropState = "hide"
    },
    selectAll(){  
        this.selectPersonAll = !this.selectPersonAll
        this.selectPersonList = [] 
        if(this.selectPersonAll){
            this.dataList.forEach( (item,index,arr)=>{
                item.checkState = true
                this.selectPersonList.push(item.tagId)
            })
        }else{
            this.dataList.forEach( (item,index,arr)=>{
                item.checkState = false
            })
        }
        console.log(`selectPerson:${this.selectPersonList}`)
    },
    selectPerson(mid,item){
        console.log(item.checkState)
        item.checkState = !item.checkState
        if(item.checkState){
            this.selectPersonList.push(mid)
        }else{
            this.selectPersonList.shift(mid)
        }
        console.log(`selectPerson:${this.selectPersonList}`)
    },
    doReset(){ 
        console.log(this.whichWindow)
            this.closeDrop()
        let paramsObj = {}
        let params = ""
        switch (this.whichWindow){
            case "0":   //修改
                paramsObj.tagId = this.resetMsg.tagId
                paramsObj.phrase = this.resetMsg.phrase

                console.log(paramsObj)
                params = serialize(paramsObj)

                this.getRest(params)
                break;
            case "1":   //删除
                paramsObj.ids = this.selectPersonList
                this.getDelete(serialize(paramsObj))
                break;
            case "2":   //新增
                console.log('新增')
                paramsObj.phrase = this.resetMsg.phrase
                console.log(this.resetMsg.phrase)
                if(this.resetMsg.phrase.length==0){
                    alert('请输入标签名')
                }else{
                    this.getAdd(serialize(paramsObj))
                }
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
            this.selectPersonList = []
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
