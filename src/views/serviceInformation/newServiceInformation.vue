<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"> <span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">服务指南</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <div class="control-group">
                        <label class="control-label" style="width: 50px">标题</label>
                        <div class="controls" style="margin-left: 80px">
                            <input type="text" name="title" id="title" v-model="guideTitle" value="{{ guideTitle }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" style="width: 50px">正文</label>
                        <div class="controls" style="margin-left: 80px">
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
                serviceId: window.location.pathname.split('/')[2],
                guideTitle: "",
                content: "",
            }
        },
        methods: {
            configBtn() {
                this.content = this.content.replace(/\&/g, "%26")
                let object = {
                    guideTitle:this.guideTitle,
                    content:this.content
                }
                if (!!this.serviceId) {
                    object.id=this.serviceId;
                    this.updateService(serialize(object))
                } else {
                    this.addService(serialize(object))
                }
            },
            async getServiceDetail(params) {
                let data = await getResponses("ServiceInfomation/selectById.json",params)
                if(data.code===0){
                    this.guideTitle = data.serviceInformationWeb.guideTitle;
                    this.content = data.serviceInformationWeb.content;
                    this.content=this.content.replace(/\%26nbsp;/g," ")
//                    this.content = this.content.replace(/\{%26}/g, "&");
//                    this.content = this.content.replace(/\{&nbsp;}/g, " ");
                }
            },
            async addService(params) {
                let data = await getResponses("ServiceInfomation/createInfomation.json",params)
                if (data.code == 0) {
                    this.$route.router.go('/serviceInformation')
                } else {
                    alert(data.error)
                }
            },
            async updateService(params) {
                let data = await getResponses("ServiceInfomation/updateInfomation.json",params)
                if (data.code == 0) {
                    this.$route.router.go('/serviceInformation')
                } else {
                    alert(data.error)
                }
            },
        },
        ready() {
            !!this.serviceId && this.getServiceDetail(`id=${this.serviceId}`)
        }
    }
</script>
<style scope>
    .controls .vue-html5-editor * {
        box-sizing: inherit
    }
    .vue-html5-editor .content {
        height:1000px;
    }
</style>
