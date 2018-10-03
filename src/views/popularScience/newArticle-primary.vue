<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"> <span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">文章信息</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <div class="control-group">
                        <label class="control-label">类型名称</label>
                        <div class="controls">
                            <div style="width:245px">
                                <select name="typeId" id="select" value="{{ typeId }} " v-model="typeId">
                                    <option v-for="item of select" value="{{ item.typeId }}">{{ item.typeName}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group" id="secondChild" style="display: block;">
                        <label class="control-label">类别名称</label>
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
                    <div class="control-group">
                        <label class="control-label">文章标题</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" v-model="title" value="{{ title }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">作者</label>
                        <div class="controls">
                            <input type="text" name="author" id="author" v-model="author" value="{{ author }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">文章来源</label>
                        <div class="controls">
                            <input type="text" name="source" id="source" v-model="source" value="{{ source }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">文章摘要</label>
                        <div class="controls">
                            <textarea type="text" name="digest" id="digest" value={{ digest }} maxlength="400" style="border-radius: 4px;width: 600px;height: 60px;" v-model="digest">{{ digest }}</textarea>
                        </div>
                    </div>
                    <div class="control-group ">
                        <label class="control-label">上传文章缩略图</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="thumbnail" :defaultimg="thumbnail"></qiniu>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">简介</label>
                        <div class="controls">
                            <vue-html5-editor :content.sync="content"></vue-html5-editor>
                        </div>
                    </div>
                    <div class="form-actions">
                        <label class="control-label"></label>
                        <div class="clearfix controls ">
                            <input type="button" value="保存" id="ajaxBut" class="btn btn-success" @click="configBtn()">
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    updateArticle
} from '../../api'

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
            articleId: window.location.pathname.split('/')[2],
            author: "",
            content: "",
            detailId: "",
            digest: "",
            filePath: "",
            source: "",
            thumbnail: "",
            title: "",
            typeId: "", //类型
            categoryId: "", //类别
            subCategoryId: "", //二级类别
            select: [],
            Level1Select: [],
            Level2Select: [],
            oneLevelCategoryId: "" //一级
        }
    },
    methods: {

        configBtn() {

            this.oneLevelCategoryId = this.categoryId
            this.categoryId = this.subCategoryId
            this.content = this.content.replace(/\&/g, "%26")

            let object = this.$data

            delete object.subCategoryId
            delete object.filePath
            delete object.select
            delete object.Level1Select
            delete object.Level2Select

            if (!!this.articleId) {

                this.updateArticle(this.serialize(object))

            } else {

                delete object.articleId

                this.addArticle(this.serialize(object))
            }
        },


        serialize(obj) {

            let str = ""
            for (let key in obj) {
                str += `${key}=${obj[key]}&`
            }
            str = str.slice(0, -1)
            return str
        },
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
                // let object = data.Articles[0]
            this.author = data.author
            this.content = data.content
            this.detailId = data.detailId
            this.digest = data.digest
            this.filePath = data.filePath
            this.source = data.source
            this.thumbnail = data.thumbnail
            this.title = data.title
            this.typeId = data.typeId
            this.categoryId = data.categoryId
            this.subCategoryId = data.subCategoryId

            console.log(data)

        },
        async addArticle(params) {
            let data = await addArticle(params)

            if (data.code == 0) {
                this.$route.router.go('/article')
            } else {
                alert(data.error)
            }
        },
        async updateArticle(params) {

            let data = await updateArticle(params)
            if (data.code == 0) {
                this.$route.router.go('/article')
            } else {
                alert(data.error)
            }
        }
    },
    watch: {
        typeId() {
            this.getCategoryLevel1ByType(`typeId=${this.typeId}`)
        },
        categoryId() {
            this.getSubCategory(`typeId=${this.typeId}&parentCategoryId=${this.categoryId}`)
        }
    },
    ready() {
        !!this.articleId && this.getArticleDetail(`articleId=${this.articleId}`)
        this.getAllType()
    }

}
</script>
<style scope>
.controls .vue-html5-editor * {
    box-sizing: inherit
}
</style>
