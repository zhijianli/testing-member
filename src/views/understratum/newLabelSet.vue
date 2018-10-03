<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"> <span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">*新建/修改标签</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <div class="control-group">
                        <label class="control-label">标签名称</label>
                        <div class="controls">
                            <input type="text" style="width: 210px;" name="title" maxlength="5" placeholder="不得超过5字" id="title" v-model="title" value="{{ title }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">上传图片</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="thumbnail" :defaultimg="thumbnail"></qiniu>
                            <p>图片为：108px:108px</p>
                        </div>

                    </div>
                </div>
                <div style="width: 500px;overflow: hidden">
                    <a href="javascript:history.back()" style="float: left"><input type="button" value="取消" id="exit" class="btn btn-success"></a>
                    <input type="button" value="保存" id="save" class="btn btn-success" style="float: right" @click="saveTarget(targetId,title,thumbnail)">
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Vue from "vue"
    import qiniu from "../../qiniu.vue"
    import {getResponse,getResponses} from "../../api"
    export default{
        data(){
            return{
                targetId: window.location.pathname.split('/')[2],
                title:"",
                thumbnail: "",
            }
        },
        components: {
            qiniu
        },
        events: {
            'imgParameter': function(obj, eventName) {
                this[eventName] = obj[eventName].imgPath
            }
        },
        methods:{
            async getTargetDetail(id){
                let data = await getResponses("Tag/getTagById.json",`tagId=${this.targetId}`);
                if (data.code == 0) {
                    let source=data.articleType;
                    this.title=source.typeName;
                    this.thumbnail=source.picture;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async updateTarget(targetId,title,thumbnail){
                let data=await getResponses("Tag/updateTag.json",`tagId=${targetId}&tagName=${title}&picture=${thumbnail}`);
                if(data.code==0){
                    this.$route.router.go('/labelSet')
                }else{
                    alert(`errMsg:${data.msg}`)
                }
            },
            async addTarget(title,thumbnail){
                let data=await getResponses("Tag/insertTag.json",`tagName=${title}&picture=${thumbnail}`);
                if(data.code==0){
                    this.$route.router.go('/labelSet')
                }else{
                    alert(`errMsg:${data.msg}`)
                }
            },
            saveTarget(targetId,title,thumbnail){
                if(title==""||thumbnail==""){
                    alert("请您填写完毕！")
                }else{
                    if(this.targetId==undefined){
                        this.addTarget(title,thumbnail)
                    }else{
                        this.updateTarget(targetId,title,thumbnail)
                    }
                }
            },
        },
        ready(){
            !!this.targetId && this.getTargetDetail(this.targetId);
        }
    }
</script>