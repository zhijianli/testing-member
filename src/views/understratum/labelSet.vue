<template>
    <div class="container-fluid">
        <button class="btn btn-success" style="margin: 10px 0"><a href="javascript:;" style="color:white;" @click="changeRouter('newLabelSet')">新增标签</a></button>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0" style="width: 800px">
            <thead>
            <tr>
                <th>名称</th>
                <th>配图</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in targetList">
                <td style="width: 200px;line-height: 100px">{{item.tagName}}</td>
                <td><img :src="EnvUrl + item.picture" alt="" style="width: 100px;height: 100px"></td>
                <td style="line-height: 100px">
                    <a href="javascript:;" class="operation editArticle btn btn-info" @click="rewrite(item.tagId)">修改</a>
                    <a class="btn btn-danger allDelte" href="javascript:;" @click="deleteScale(item.tagName,item.tagId)">删除</a>
                </td>
            </tr>
            </tbody>
        </table>

        <div class="modal-backdrop in" v-if="deleteState"></div>
        <div id="delete" class="modal" v-if="deleteState">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click=" deleteState = false ">×</button>
                <h3></h3>
            </div>
            <div class="modal-body">
                <p>你确定删除{{deletename}}吗？</p>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="javascript:;" @click=" deleteState = false ">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configDeleteScaleType(deleteid)">确定</a>
            </div>
        </div>
    </div>

</template>
<script type="text/javascript">
    import {getResponse,getResponses,obtainTags} from "../../api"
    export default {
        data(){
            return{
                targetList:[],
                deleteState:false,
                deletename:"",
                deleteid:0,
                EnvUrl:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com/" : "oml9ntix5.qnssl.com/" }`,
            }
        },
        methods:{
            changeRouter(url){
                this.$dispatch('child-msg', "新增标签")
                this.$route.router.go(url)
            },
            deleteScale(name,id){
                this.deletename=name;
                this.deleteid=id;
                this.deleteState=true;
            },
            async getTarget(){
                let data = await obtainTags()
                if (data.code === 0) {
                    this.targetList = data.tags
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async configDeleteScaleType(id){
                let data=await getResponses("Tag/deleteTagById.json",`tagId=${id}`);
                if(data.code==0){
                    this.deleteState=false;
                    this.getTarget();
                }else{
                    alert(`errMsg:${data.msg}`);
                }
            },
            rewrite(id){
                this.$dispatch('child-msg', "修改标签")
                this.$route.router.go(`/newLabelSet/${id}`)
            }
        },
        ready(){
            this.getTarget();
        }
    }
</script>
<style scoped>
    .rec{
        visibility: visible;
        display:inline-block;
    }
</style>

<!--<template>-->
<!--<div class="container-fluid" style="padding-left:40px;">-->
    <!--<div class="tab-cont">-->
            <!--<ul class="tagTit">-->
                <!--<li :class="{ show: true}">标签设置</li>-->
            <!--</ul>-->
    <!--</div>-->
    <!--&lt;!&ndash; 标签设置 &ndash;&gt;-->
    <!--<div  class="container-fluid" style="padding-left:0px;">-->
        <!--<div class="widget-box w50">-->
            <!--<div class="widget-title">-->
                <!--<span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i>-->
                <!--</span>-->
                <!--<h5>平台标签（领域、文章、提问...）</h5>-->
            <!--</div>-->
            <!---->
            <!--<div class="form-horizontal widget-content">-->
                <!--<div class="control-group" v-for="item in tegsData">-->
                    <!--<div class="controls testClass">-->
                        <!--<input type="text" :disabled="true" value="{{item.tagName}}">-->
                        <!--&lt;!&ndash; <button class="btn btn-info"  @click="editTagFn(item.type,$index)">编辑</button>-->
                        <!--<button class="btn btn-success" @click="sureToChangeType(this,$index)">确定</button> &ndash;&gt;-->
                        <!--<button class="btn btn-info"  @click="changeTagFn($event,$index,item.tagId)">编辑</button>-->
                        <!---->
                        <!--<button class="btn btn-danger" @click="delTagFn(item.tagId)">删除</button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!---->
            <!--<div class="form-horizontal widget-content">-->
                <!--<div class="control-group">-->
                    <!--<div class="controls">-->
                        <!--<input type="text" v-model="addNewTag">-->
                        <!--<button class="btn btn-success" @click="addNewTagFn()">添加</button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->

            <!---->
        <!--</div>-->
    <!--</div>-->

<!--</div>-->



<!--</template>-->
<!--<script type="text/javascript">-->
	<!--import $  from "jquery"-->
	<!--import Vue from "vue"-->
    <!--import {obtainTags,insertTag,deleteTagById,updateTag} from "../../api"-->
    <!--export default {-->
    	<!--data(){-->
    		<!--return {-->
                <!--data:[],-->
                <!--checkState:false,-->
                <!--default:'',-->
                <!--searchVal:'',-->
                <!--add:'',-->
                <!--edit:'',-->
                <!--idelete:'',-->
                <!--typeName:'',-->
                <!--editTypeName:'',-->
                <!--typeId:'',-->
               	<!--arrayTypeId:[],-->
                <!--articleData:[],-->
                <!--addNewTag:"",-->
                <!--editTag:false,-->
                <!--newArticleType:"",-->
                <!--tegsData:[],// start-->
                <!--tagId:"",-->
                <!--tagName:''-->
    		<!--}-->
    	<!--},-->
    	<!--methods:{-->
            <!--async obtainTags() {-->
                <!--let data = await obtainTags()-->
                <!--if (data.code === 0) {-->
                    <!--this.tegsData = data.tags-->
                <!--} else {-->
                    <!--alert(`errMsg:${data.msg}`)-->
                <!--}-->
            <!--},-->
            <!--// async getArticleData(){-->
                <!---->
            <!--// },-->
            <!--async addNewTagFn(){-->
                <!--console.log(this.addNewTag)-->
                <!--if (this.addNewTag == "") {-->
                    <!--alert('标签内容不能为空');-->
                    <!--return-->
                <!--}-->
                <!--//添加新类型到数据库-->
                <!--let data = await insertTag(`tagName=${this.addNewTag}`)-->
                <!--if (data.code == 0) {-->
                    <!--this.obtainTags()-->
                    <!--this.addNewTag = ""-->
                <!--} else {-->
                    <!--alert(`errMsg:${data.msg}`)-->
                <!--}-->
            <!--},-->
            <!--async delTagFn(id){-->
                <!--this.tagId = id-->
                <!--console.log("将要删除的id为：",id)-->
                <!--//删除此项-->
                <!--let data = await deleteTagById(`tagId=${this.tagId}`)-->
                <!--if (data.code == 0) {-->
                    <!--this.obtainTags()-->

                <!--} else {-->
                    <!--alert(`errMsg:${data.msg}`)-->
                <!--}-->
            <!--},-->
            <!--// editTagFn(type,index){-->
            <!--//     // this.editTag = true-->
            <!--//     this.newArticleType = type-->
            <!--//     console.log(this.newArticleType)-->
            <!--//     console.log("test:",$($(".testClass")[index]).find("input")[0])-->
            <!--//     $($(".testClass")[index]).find("input").attr("disabled",false)-->
            <!--// },-->
            <!---->
            <!---->

            <!--async changeTagFn(e,index,tagId) {-->
                <!--console.log(e.target.innerHTML)-->
                <!--if(e.target.innerHTML == "编辑"){-->
                    <!--e.target.innerHTML = "保存"-->
                    <!--$(e.target).removeClass("btn-info")-->
                    <!--$(e.target).addClass("btn-success")-->
                    <!--$($(".testClass")[index]).find("input").attr("disabled",false)-->
                    <!--this.tagName = $($(".testClass")[index]).find("input")[0].value-->
                <!--} else {-->
                    <!--//点击保存-->
                    <!--this.tagName = $($(".testClass")[index]).find("input")[0].value-->
                    <!--//调用后台接口添加数据-->
                    <!--this.tagId = tagId-->
                    <!--let data = await updateTag(`tagId=${this.tagId}&tagName=${this.tagName}`)-->
                    <!--if (data.code == 0) {-->
                        <!--this.obtainTags()-->

                    <!--} else {-->
                        <!--alert(`errMsg:${data.msg}`)-->
                    <!--}-->
                    <!--e.target.innerHTML = "编辑"-->
                    <!--$(e.target).removeClass("btn-success")-->
                    <!--$(e.target).addClass("btn-info")-->
                    <!--$($(".testClass")[index]).find("input").attr("disabled",true)-->
                <!--}-->
            <!--}-->
            <!---->
    	<!--},-->
    	<!--watch:{-->
            <!---->
        <!--},-->
    	<!--ready(){-->
            <!--this.obtainTags()-->
    	<!--}-->
    <!--}-->
<!--</script>-->