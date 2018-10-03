<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"> <span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">文章信息</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                <!-- 修改位置 -->
                    <div class="control-group">
                        <label class="control-label">文章标题</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" v-model="title" value="{{ title }}">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">文章类型</label>
                        <div class="controls">
                            <div style="width:245px">
                                <select name="newCategoryId" id="select3" v-model="newCategoryId" value="{{ newCategoryId }}">
                                    <option v-for="item of categoryLists" value="{{ item.categoryId }}">{{ item.categoryName }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">标签</label>
                        <div class="controls">
                            <div style="width:245px">
                                <select name="tagId" id="select4" v-model="tagId" value="{{ tagId }}">
                                    <option v-for="item of tagLists" value="{{ item.tagId }}">{{ item.tagName }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="control-group">
                        <label class="control-label">类型名称（原）</label>
                        <div class="controls">
                            <div style="width:245px">
                                <select name="typeId" id="select" value="{{ typeId }} " v-model="typeId">
                                    <option v-for="item of select" value="{{ item.typeId }}">{{ item.typeName}}</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div class="control-group" id="secondChild" style="display: block;">
                        <label class="control-label">类别名称（原）</label>
                        <div class="controls clearfix">
                            <div style="width:auto; float:left;display:block">
                                <select name="categoryId" id="select1" v-model="categoryId" value="{{ categoryId }}">
                                    <option v-for="item of Level1Select" value="{{ item.categoryId }}">{{ item.categoryName }}</option>
                                </select>
                            </div>
                            <div style="width:auto; float:left;" v-if=" !!subCategoryId || !!Level2Select.length">
                                <select name="subCategoryId" id="select2" v-model="subCategoryId" value="{{ subCategoryId }}">
                                    <option v-for="item of Level2Select" value="{{ item.categoryId }}">{{ item.categoryName }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                     -->
                    <div class="control-group">
                        <label class="control-label">作者</label>
                        <div class="controls authorBig">
                            <div class="authorBox">
                                <div class="inputbox"><input type="radio" v-model="authorType" value="1" name="author">普通作者</div>
                                <input type="text" v-model="author" :disabled="authorType!=1">
                            </div>
                            <div class="authorBox">
                                <div class="inputbox"><input type="radio" v-model="authorType" value="2" name="author">平台专家作者</div>
                                <div>
                                    <input type="text" disabled v-model="author2">
                                    <input type="button" value="添加" id="add" class="btn btn-success" @click="addPsycho()">
                                </div>
                            </div>
                            <!--<input type="text" name="author" id="author" v-model="author" value="{{ author }}">-->
                        </div>
                    </div>
                    <!-- <div class="control-group">
                        <label class="control-label">来源</label>
                        <div class="controls">
                            <input type="text" name="source" id="source" v-model="source" value="{{ source }}">
                        </div>
                    </div> -->
                    <div class="control-group">
                        <label class="control-label">文章摘要</label>
                        <div class="controls">
                            <textarea type="text" name="digest" id="digest" value={{ digest }} maxlength="400" style="border-radius: 4px;width: 600px;height: 260px;" v-model="digest">{{ digest }}</textarea>
                        </div>
                    </div>
                    <div class="control-group ">
                        <label class="control-label">上传封面图片</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="thumbnail" :defaultimg="thumbnail"></qiniu>
                            <p>建议上传宽高比例为375:220的图片</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">文章内容</label>
                        <div class="controls">
                            <vue-html5-editor :content.sync="content"></vue-html5-editor>
                        </div>
                    </div>
                    <div class="form-actions" style="overflow:hidden;">
                        <label class="control-label"></label>
                        <div class="clearfix controls" style="width:100%;">
                            <button class="btn btn-danger" v-if="!!this.articleId" @click="deleteEditingArticle()">删除</button>
                            <input type="button" style="float:right;margin-right:160px;" value="保存" id="ajaxBut" class="btn btn-success" @click="configBtn()">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 删除 -->
    <div class="modal-backdrop in" v-if="idelete"></div>
    <div id="myAlert" class="modal" v-if="idelete">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>删除</h3>
        </div>
        <div class="modal-body" >
            <p>确定删除此文章吗？</p>
        </div>
        <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDelete()">确定</a> </div>
    </div>
    <!--搜索专家-->
    <div class="modal-backdrop in" v-if="teachSeach"></div>
    <div id="myAlert2" class="modal" v-if="teachSeach">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="teachSeach=false">×</button>
            <h3>搜索</h3>
        </div>
        <div class="modal-body" >
            <div>
                <input type="text" name="searchVal" placeholder="专家姓名、手机号" v-model="searchVal" style="margin-bottom: 0">
                <input type="submit" value="搜索" class="btn btn-success" @click="searchPsycho()" style="margin-right:50px;">
            </div>
            <ul class="searchList">
                <li v-for="item in teacherList">
                    <img :src="imgPre+'/'+item.avatar" alt="">
                    <p><span>{{item.nickname}}</span><span>{{item.mobilePhone}}</span></p>
                    <input type="radio" name="choosePsycho" v-model="choosePeo" :value="item.nickname+'-'+item.mid">
                </li>
            </ul>
        </div>
        <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click="teachSeach=false">取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configChoose()">确定</a> </div>
    </div>

</template>
<script type="text/javascript">
import Vue from "vue"
import editor from "vue-html5-editor"
import qiniu from "../../qiniu.vue"

Vue.use(editor, {
    //global component name
    name: "vue-html5-editor",
    //custom icon class of built-in modules,default using font-awesome
    icons: {
        text: "icon-pencil",
        color: "icon-dashboard",
        font: "icon-font",
        align: "icon-align-center",
        list: "icon-list-ol",
        link: "icon-link",
        unlink: "icon-underline",
        image: "icon-picture"
    },

    //default en-us, en-us and zh-cn are built-in
    language: "zh-cn",
    i18n: {
        //specify your language here
        "zh-cn": {
            "align": "对齐方式",
            "image": "图片",
            "list": "列表",
            "link": "链接",
            "unlink": "去除链接",
            "table": "表格",
            "font": "文字",
            "full screen": "全屏",
            "text": "排版",
            "eraser": "格式清除",
            "info": "关于",
            "color": "颜色",
            "please enter a url": "请输入地址",
            "create link": "创建链接",
            "bold": "加粗",
            "italic": "倾斜",
            "underline": "下划线",
            "strike through": "删除线",
            "subscript": "上标",
            "superscript": "下标",
            "heading": "标题",
            "font name": "字体",
            "font size": "文字大小",
            "left justify": "左对齐",
            "center justify": "居中",
            "right justify": "右对齐",
            "ordered list": "有序列表",
            "unordered list": "无序列表",
            "fore color": "前景色",
            "background color": "背景色",
            "row count": "行数",
            "column count": "列数",
            "save": "确定",
            "upload": "上传",
            "progress": "进度",
            "unknown": "未知",
            "please wait": "请稍等",
            "error": "错误",
            "abort": "中断",
            "reset": "重置"
        }
    },
    //the modules you don't want
    hiddenModules: [],
    //keep only the modules you want and customize the order.
    //can be used with hiddenModules together
    visibleModules: [
        "text",
        "color",
        "font",
        "align",
        "list",
        "link",
        "unlink",
        "tabulation",
        "image"
    ],
    //extended modules
    modules: [{
        name: "image",
        icon: "icon-picture",
        i18n: "image",
        show: false,
        dashboard: {
            template: '<qiniu event-Name="editorUpload" :defaultimg="editorUpload"></qiniu>',
            data() {
                return {
                    img: ""
                }
            },
            components: {
                qiniu
            },
            events: {
                'imgParameter': function(obj, eventName) {
                    this.$parent.execCommand("insertImage", obj[eventName].filePath)
                }
            }
        }
    }]
})

import {
    getArticleDetail,
    getAllType,
    getCategoryLevel1ByType,
    getSubCategory,
    addArticle,
    updateArticle,
    getCategoryList,
    obtainTags,
    deleteArticle,
    getResponses

} from '../../api'

import { serialize } from "../../utils"

export default {
    components: {
        qiniu
    },

    events: {
        'imgParameter': function(obj, eventName) {
            this[eventName] = obj[eventName].imgPath
        }
    },

    data() {
        return {
            imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
            articleId: window.location.pathname.split('/')[2],
            author: "",
            author2: "",
            content: "",
            //detailId: "",
            digest: "",
            filePath: "",
            //source: "",
            thumbnail: "",
            title: "",
            //typeId: "", //类型
            //categoryId: "", //类别
            //subCategoryId: "", //二级类别
            //select: [],
            //Level1Select: [],
            //Level2Select: [],
            //oneLevelCategoryId: "", //一级
            categoryLists:[],
            tagLists:[],
            newCategoryId:"",
            tagId:"",
            idelete:false,
            teachSeach:false,
            searchVal:"",
            authorType:0,
            mid:"",
            teacherList:[],
            choosePeo:"",
        }
    },
    methods: {
        deleteEditingArticle() {
            this.idelete = true
        },
        close() {
            this.idelete = false
        },
        configDelete() {
            // this.idelete = false
            console.log(this.articleId)
            let params = `articleId=${this.articleId}`

            this.deleteArticle(params)
        },
        async deleteArticle(params) {

            let data = await deleteArticle(params)
            this.idelete = false
            // this.arrayTypeId = []
            if (data.code == 0) {
                this.$route.router.go('/articleManage')
            } else {
                alert("删除失败")
            }
        },
        configBtn() {

            //this.oneLevelCategoryId = this.categoryId
            //this.categoryId = this.subCategoryId
            this.content = this.content.replace(/\&/g, "%26")

            // 检测是否有两个ID

            if (!this.tagId) {
                alert("请选择标签")
                return
            }

            if (!this.newCategoryId) {
                alert("请选择文章类型")
                return
            }





            let object = {

            }
            object.typeId = this.tagId
            object.categoryId = this.newCategoryId
            object.content = this.content
            object.digest = this.digest
            object.thumbnail = this.thumbnail
            object.title = this.title

            if(this.authorType==1){
                object.author=this.author;
            }else if(this.authorType==2){
                object.author=this.author2;
                object.mid=this.mid;
            }

            object.authorType = this.authorType

            if (!!this.articleId) {
                console.log("存在文章ID，此时是编辑文章", object)
                object.articleId = this.articleId
                console.log(object.content)
                this.updateArticle(serialize(object))

            } else {

                // delete object.articleId
                console.log("此时是新增文章：",object)
                this.addArticle(serialize(object))
            }
        },


        // serialize(obj) {
        //
        //     let str = ""
        //     for (let key in obj) {
        //         str += `${key}=${obj[key]}&`
        //     }
        //     str = str.slice(0, -1)
        //     return str
        // },
        async getAllType() {
            let data = await getAllType()
            this.select = data.Alltype
        },

        async getCategoryLevel1ByType(params) {
            let data = await getCategoryLevel1ByType(params)
            this.Level1Select = data.Category
        },

        async getSubCategory(params) {

            let data = await getSubCategory(params)
            this.Level2Select = data.Category
        },
        async getArticleDetail(params) {
            let data = await getArticleDetail(params)
            console.log("data:",data)
                // let object = data.Articles[0]
            if(data.authorType==1){
                this.author = data.author
            }else if(data.authorType==2){
                this.author2 = data.author
            }
            this.authorType=data.authorType;
            this.content = data.content
            this.content = this.content.replace(/\{%26}/g, "&")
            this.content = this.content.replace(/\{&nbsp;}/g, " ")
            // this.detailId = data.detailId
            this.digest = data.digest
            this.filePath = data.filePath
            // this.source = data.source
            this.thumbnail = data.thumbnail
            this.title = data.title
            //this.typeId = data.typeId
            //this.categoryId = data.categoryId
            // this.subCategoryId = data.subCategoryId
            // this.newCategoryId = data.categoryId
            this.tagId = data.typeId
            this.newCategoryId = data.categoryId
            console.log(data)

        },
        async addArticle(params) {
            let data = await addArticle(params)

            if (data.code == 0) {
                // this.$route.router.go('/article')
                this.$route.router.go('/articleManage')

            } else {
                alert(data.error)
            }
        },
        async updateArticle(params) {
            console.log(params)
            let data = await updateArticle(params)

            if (data.code == 0) {
                // this.$dispatch('child-msg', "新增文章")
                // this.$route.router.go('/article')
                this.$route.router.go('/articleManage')

            } else {
                alert(data.error)
            }
        },
        async getArticleData(){
            let data = await getCategoryList()
            if (data.code === 0) {
                this.categoryLists = data.Category

            } else {
                alert(`errMsg:${data.msg}`)
            }
        },

        async getArticleTags(){
            let data = await obtainTags()
            if (data.code === 0) {
                this.tagLists = data.tags
            } else {
                alert(`errMsg:${data.msg}`)
            }
        },
        async searchPsycho(){
            let params=`words=${this.searchVal}&isAudited=0&pageIndex=1&pageSize=100`
            let data=await getResponses("Psychor/searchMember.json",params);
            if(data.code===0){
                this.teacherList=data.psychoDTOs;
            }
        },
        addPsycho(){
            if(this.authorType==2){
                this.teachSeach=true;
            }
        },
        configChoose(){
            this.teachSeach=false;
            this.choosePeo=this.choosePeo.split("-");
            this.author2=this.choosePeo[0];
            this.mid=this.choosePeo[1];
        }
    },
    watch: {
        // typeId() {
        //     this.getCategoryLevel1ByType(`typeId=${this.typeId}`)
        // },
        // categoryId() {
        //     this.getSubCategory(`typeId=${this.typeId}&parentCategoryId=${this.categoryId}`)
        // }
    },
    ready() {
        !!this.articleId && this.getArticleDetail(`articleId=${this.articleId}`)
        this.getAllType()
        this.getArticleData()
        this.getArticleTags()
        // this.$dispatch('child-msg', "新增文章")
    }

}
</script>
<style scoped>
.controls .vue-html5-editor * {
    box-sizing: inherit
}
.vue-html5-editor .content {
    height:1000px;
}
.authorBig{
    display: flex;
}
    .authorBox{
        margin-right: 50px;
    }
    .authorBox{
        display: flex;
        flex-direction: column;
    }
    .searchList li{
        display: flex;
        align-items: center;
        margin: 10px 0;
        /*justify-content: space-around;*/
    }
    .searchList li img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
.searchList li p{
    margin: 0 20px;
    display: flex;
}
.searchList li p span{
    margin-left: 5px;
    width: 60px;
}
.searchList li p span:nth-child(2){
    width: 115px;
}
.modal-backdrop.in {
    z-index: 1001 !important;
}
</style>
