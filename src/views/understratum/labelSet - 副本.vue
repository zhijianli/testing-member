<template>
<div class="container-fluid" style="padding-left:40px;">
    <div class="tab-cont">
            <ul class="tagTit">
                <li :class="{ show: true}">标题</li>
            </ul>
    </div>
    <!-- 标题 -->
    <div  class="container-fluid" style="padding-left:0px;">
        <div class="widget-box w50">
            <div class="widget-title">
                <span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i>
                </span>
                <h5>标题</h5>
            </div>

            <div class="form-horizontal widget-content">
                <div class="control-group" v-for="item in dataList">
                    <div class="controls testClass">
                        <input type="text" :disabled="true" value="{{item.}}">
                        <!-- <button class="btn btn-info"  @click="editTagFn(item.type,$index)">编辑</button>
                        <button class="btn btn-success" @click="sureToChangeType(this,$index)">确定</button> -->
                        <button class="btn btn-info"  @click="changeTagFn($event,$index,item.)">编辑</button>

                        <button class="btn btn-danger" @click="delTagFn(item.)">删除</button>
                    </div>
                </div>
            </div>

            <div class="form-horizontal widget-content">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" v-model="addNewTag">
                        <button class="btn btn-success" @click="addNewTagFn()">添加</button>
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
                addNewTag:"",
                editTag:false,
                newArticleType:"",
                dataList:[],// start
                tagId:"",
                tagName:''
    		}
    	},
    	methods:{
            async obtainTags() {
                let data = await getResponse(`接口名称`)
                if (data.code === 0) {
                    this.dataList = data.tags
                } else {
                    alert(`${data.msg}`)
                }
            },
            // async getArticleData(){

            // },
            async addNewTagFn(){
                console.log(this.addNewTag)
                if (this.addNewTag == "") {
                    alert('标签内容不能为空');
                    return
                }
                //添加新类型到数据库
                let data = await getResponses(`接口名称`, `tagName=${this.addNewTag}`)
                if (data.code == 0) {
                    this.obtainTags()
                    this.addNewTag = ""
                } else {
                    alert(`${data.msg}`)
                }
            },
            async delTagFn(id){
                this.tagId = id
                console.log("将要删除的id为：",id)
                //删除此项
                let data = await getResponses(`接口名称`, `tagId=${this.tagId}`)
                if (data.code == 0) {
                    this.obtainTags()

                } else {
                    alert(`${data.msg}`)
                }
            },


            async changeTagFn(e,index,tagId) {

                console.log(e.target.innerHTML)

                if(e.target.innerHTML == "编辑"){

                    e.target.innerHTML = "保存"
                    $(e.target).removeClass("btn-info")
                    $(e.target).addClass("btn-success")
                    $($(".testClass")[index]).find("input").attr("disabled",false)

                    this.tagName = $($(".testClass")[index]).find("input")[0].value

                } else {
                    //点击保存
                    this.tagName = $($(".testClass")[index]).find("input")[0].value

                    //调用后台接口添加数据
                    this.tagId = tagId

                    let data = await getResponses(`接口名称`, `tagId=${this.tagId}&tagName=${this.tagName}`)

                    if (data.code == 0) {

                        this.obtainTags()

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
            this.obtainTags()
    	}
    }
</script>