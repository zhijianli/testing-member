<template>
<div class="container-fluid" style="padding-left:40px;">
    <!-- <div class="tab-cont">
            <ul class="tagTit">
                <li :class="{ show: true}">收款设置</li>
            </ul>
    </div> -->
    <!-- 标签设置 -->
    <div  class="container-fluid" style="padding-left:0px;">
        <div class="widget-box w50">
            <div class="widget-title">
                <span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i>
                </span>
                <h5>收款账户</h5>
            </div>
            
            <div class="form-horizontal widget-content">
                <div class="control-group" v-for="item in gatheringAccData">
                    <div class="controls testClass">
                        <input type="text" :disabled="true" value="{{item.gatheringAcc}}">
                        <!-- <button class="btn btn-info"  @click="editTagFn(item.type,$index)">编辑</button>
                        <button class="btn btn-success" @click="sureToChangeType(this,$index)">确定</button> -->
                        <button class="btn btn-info"  @click="changeAgtheringAccFn($event,$index,item.gaId)">编辑</button>
                        
                        <button class="btn btn-danger" @click="delGatheringAccFn(item.gaId)">删除</button>
                    </div>
                </div>
            </div>
            
            <div class="form-horizontal widget-content">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" v-model="addNewGatheringAcc">
                        <button class="btn btn-success" @click="addNewGatheringAccFn()">添加</button>
                    </div>
                </div>
            </div>

            
        </div>
    </div>

</div>



</template>
<script type="text/javascript">
	import $  from "jquery"
	import Vue from "vue"
    import {
        getResponse,
        getResponses

    } from "../../api"
    export default {
    	data(){
    		return {
                data:[],
                checkState:false,
                default:'',
                searchVal:'',
                add:'',
                edit:'',
                idelete:'',
                typeName:'',
                editTypeName:'',
                typeId:'',
               	arrayTypeId:[],
                articleData:[],
                addNewGatheringAcc:"",
                editTag:false,
                newArticleType:"",
                gatheringAccData:[],// start
                gaId:"",
                gatheringAccName:''
    		}
    	},
    	methods:{
            async obtainGatheringAcc() {
                let data = await getResponse("netsalesConf/getGatheringAccList.json")
                if (data.code === 0) {
                    this.gatheringAccData = data.list
                } else {
                    alert(`${data.msg}`)
                }
            },
            // async getArticleData(){
                
            // },
            async addNewGatheringAccFn(){
                console.log(this.addNewGatheringAcc)
                //添加新类型到数据库
                let data = await getResponses('netsalesConf/addGatheringAcc.json', `gatheringAcc=${this.addNewGatheringAcc}`)
                if (data.code == 0) {
                    this.obtainGatheringAcc()
                    this.addNewGatheringAcc = ""
                } else {
                    alert(`${data.msg}`)
                }
            },
            async delGatheringAccFn(id){
                this.gaId = id
                console.log("将要删除的id为：",id)
                //删除此项
                // let data = await deleteTagById(`gaId=${this.gaId}`)
                let data = await getResponses('netsalesConf/deleteGatheringAcc.json',`gaId=${this.gaId}`)

                if (data.code == 0) {
                    this.obtainGatheringAcc()

                } else {
                    alert(`${data.msg}`)
                }
            },
            // editTagFn(type,index){
            //     // this.editTag = true
            //     this.newArticleType = type
            //     console.log(this.newArticleType)
            //     console.log("test:",$($(".testClass")[index]).find("input")[0])
            //     $($(".testClass")[index]).find("input").attr("disabled",false)
            // },
            
            

            async changeAgtheringAccFn(e,index,gaId) {
                console.log(e.target.innerHTML)
                if(e.target.innerHTML == "编辑"){
                    e.target.innerHTML = "保存"
                    $(e.target).removeClass("btn-info")
                    $(e.target).addClass("btn-success")
                    $($(".testClass")[index]).find("input").attr("disabled",false)
                    this.gatheringAccName = $($(".testClass")[index]).find("input")[0].value
                } else {
                    //点击保存
                    this.gatheringAccName = $($(".testClass")[index]).find("input")[0].value
                    //调用后台接口添加数据
                    this.gaId = gaId
                    // let data = await updateTag(`gaId=${this.gaId}&gatheringAccName=${this.gatheringAccName}`)
                    let data = await getResponses('netsalesConf/updateGatheringAcc.json', `gaId=${this.gaId}&gatheringAcc=${this.gatheringAccName}`)

                    if (data.code == 0) {
                        this.obtainGatheringAcc()

                    } else {
                        alert(`${data.msg}`)
                    }
                    e.target.innerHTML = "编辑"
                    $(e.target).removeClass("btn-success")
                    $(e.target).addClass("btn-info")
                    $($(".testClass")[index]).find("input").attr("disabled",true)
                }
            }
            
    	},
    	watch:{
            
        },
    	ready(){
            this.obtainGatheringAcc()
    	}
    }
</script>