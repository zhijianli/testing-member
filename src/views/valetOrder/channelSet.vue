<template>
<div class="container-fluid" style="padding-left:40px;">
    <!-- <div class="tab-cont">
            <ul class="tagTit">
                <li :class="{ show: true}">渠道设置</li>
            </ul>
    </div> -->
    <!-- 标签设置 -->
    <div  class="container-fluid" style="padding-left:0px;">
        <div class="widget-box w50">
            <div class="widget-title">
                <span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i>
                </span>
                <h5>平台渠道（即客户来源）</h5>
            </div>
            
            <div class="form-horizontal widget-content">
                <div class="control-group" v-for="item in platformChannelData">
                    <div class="controls testClass">
                        <input type="text" :disabled="true" value="{{item.platformChannel}}">
                        <!-- <button class="btn btn-info"  @click="editTagFn(item.type,$index)">编辑</button>
                        <button class="btn btn-success" @click="sureToChangeType(this,$index)">确定</button> -->
                        <button class="btn btn-info"  @click="changeChannelFn($event,$index,item.pcId)">编辑</button>
                        
                        <button class="btn btn-danger" @click="delChannelFn(item.pcId)">删除</button>
                    </div>
                </div>
            </div>
            
            <div class="form-horizontal widget-content">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" v-model="addNewChannel">
                        <button class="btn btn-success" @click="addNewChannelFn()">添加</button>
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
    // import {obtainChannels,insertTag,deleteTagById,updateTag} from "../../api"
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
                addNewChannel:"",
                editTag:false,
                newArticleType:"",
                platformChannelData:[],// start
                pcId:"",
                channelsName:''
    		}
    	},
    	methods:{
            async obtainChannels() {
                let data = await getResponse('netsalesConf/getPlatformChannelList.json')
                console.log(data)

                if (data.code === 0) {
                    this.platformChannelData = data.list
                } else {
                    alert(`${data.msg}`)
                }
            },
            // async getArticleData(){
                
            // },
            async addNewChannelFn(){
                console.log(this.addNewChannel)
                //添加新类型到数据库
                let data = await getResponses('netsalesConf/addPlatformChannel.json', `platformChannel=${this.addNewChannel}`)
                if (data.code == 0) {
                    this.obtainChannels()
                    this.addNewChannel = ""
                } else {
                    alert(`${data.msg}`)
                }
            },
            async delChannelFn(id){
                this.pcId = id
                console.log("将要删除的id为：",id)
                //删除此项
                let data = await getResponses('netsalesConf/deletePlatformChannel.json', `pcId=${this.pcId}`)
                if (data.code == 0) {
                    this.obtainChannels()

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
            
            

            async changeChannelFn(e,index,pcId) {
                console.log(e.target.innerHTML)
                if(e.target.innerHTML == "编辑"){
                    e.target.innerHTML = "保存"
                    $(e.target).removeClass("btn-info")
                    $(e.target).addClass("btn-success")
                    $($(".testClass")[index]).find("input").attr("disabled",false)
                    this.channelsName = $($(".testClass")[index]).find("input")[0].value
                } else {
                    //点击保存
                    this.channelsName = $($(".testClass")[index]).find("input")[0].value
                    //调用后台接口添加数据
                    this.pcId = pcId
                    // let data = await updateTag(`pcId=${this.pcId}&channelsName=${this.channelsName}`)
                    let data = await getResponses('netsalesConf/updatePlatformChannel.json', `pcId=${this.pcId}&platformChannel=${this.channelsName}`)

                    if (data.code == 0) {
                        this.obtainChannels()

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
            this.obtainChannels()
    	}
    }
</script>