<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"> <span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">*新建/修改类型</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <div class="control-group">
                        <label class="control-label">类型名称</label>
                        <div class="controls">
                            <input type="text" style="width: 210px;" name="title" maxlength="25" placeholder="不得超过25字" id="title" v-model="title" value="{{ title }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">上传封面图片</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="thumbnail" :defaultimg="thumbnail"></qiniu>
                            <p>图片比例为：80px:80px</p>
                        </div>

                    </div>
                </div>
                <div style="width: 500px;overflow: hidden">
                    <a href="javascript:history.back()" style="float: left"><input type="button" value="取消" id="exit" class="btn btn-success"></a>
                    <input type="button" value="保存" id="save" class="btn btn-success" style="float: right" @click="saveScaleType(scaleTypeId,title,thumbnail)">
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Vue from "vue"
    import qiniu from "../../qiniu.vue"
    import {getSource,getSources} from "../../api"
    export default{
        data(){
            return{
                scaleTypeId: window.location.pathname.split('/')[2],
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
            async getScaleTypeDetail(id){
                let data = await getSources("/testCenter/testScaleClass/getMessageById",`id=${id}`);
                if (data.code == 0) {
                    let source=data.testScaleClassMessage;
                    this.title=source.name;
                    this.thumbnail=source.relatePicSrc;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async updateScaleType(scaleTypeId,title,thumbnail){
                let data=await getSources("/testCenter/testScaleClass/update",`id=${scaleTypeId}&name=${title}&relatePicSrc=${thumbnail}`);
                if(data.code==0){
                    this.$route.router.go('/scaleTypeManagement')
                }else{
                    alert(`errMsg:${data.msg}`)
                }
            },
            async addScaleType(title,thumbnail){
                let data=await getSources("/testCenter/testScaleClass/add",`name=${title}&relatePicSrc=${thumbnail}`);
                if(data.code==0){
                    this.$route.router.go('/scaleTypeManagement')
                }else{
                    alert(`errMsg:${data.msg}`)
                }
            },
            saveScaleType(scaleTypeId,title,thumbnail){
                if(title==""||thumbnail==""){
                    alert("请您填写完毕！")
                }else{
                    if(scaleTypeId==undefined){
                        this.addScaleType(title,thumbnail)
                    }else{
                        this.updateScaleType(scaleTypeId,title,thumbnail)
                    }
                }
            },
        },
        ready(){
            !!this.scaleTypeId && this.getScaleTypeDetail(this.scaleTypeId);
        }
    }
</script>