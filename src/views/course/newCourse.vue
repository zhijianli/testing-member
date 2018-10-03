<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">新建课程</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>课程标题</label>
                        <div class="controls">
                            <input type="text" style="width: 500px;" placeholder="最多30字" maxlength="30"
                                   name="curriculumTitle" id="curriculumTitle" v-model="curriculumTitle"
                                   value="{{ curriculumTitle }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>主讲人</label>
                        <div class="controls">
                            <input type="text" placeholder="最多10字" maxlength="10" name="speaker" id="speaker"
                                   v-model="speaker" value="{{ speaker }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>课程简述</label>
                        <div class="controls">
                            <input style="margin-right: 10px; width: 500px;" placeholder="最多60字" maxlength="60"
                                   type="text" name="curriculumSketch"
                                   id="curriculumSketch" v-model="curriculumSketch"
                                   value="{{ curriculumSketch }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>总课时</label>
                        <div class="controls">
                            <input type="text" placeholder="最多99999" name="totalHours" id="totalHours"
                                   v-model="totalHours" value="{{ totalHours }}">
                            节
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>更新时间</label>
                        <div class="controls">
                            <input type="text" placeholder="最多15字" maxlength="15" name="updateTime" id="updateTime"
                                   v-model="updateTime" value="{{ updateTime }}">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>价格</label>
                        <div class="controls">
                            <input type="text" placeholder="最多99999" name="price" id="price" v-model="price"
                                   value="{{ price }}">
                        </div>
                    </div>

                    <div class="control-group ">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>课程大纲</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="syllabus" :defaultimg="syllabus"></qiniu>
                            <p>请上传宽度750px的图片</p>

                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>详情</label>
                        <div class="controls">
                            <vue-html5-editor :content.sync="courseIntroduction"></vue-html5-editor>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>详情页顶部图</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="detailsPicture" :defaultimg="detailsPicture"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>
                    <div class="control-group ">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>列表页图</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="listPicture" :defaultimg="listPicture"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>

                    <div class="form-actions" style="overflow:hidden;">
                        <label class="control-label"></label>
                        <div class="clearfix controls" style="width:58%;">
                            <!--<button class="btn btn-danger" v-if="!!this.articleId" @click="deleteEditingArticle()">删除</button>-->
                            <input type="button" style="float:right;margin-right:120px;" value="保存" id="ajaxBut"
                                   class="btn btn-success" @click="configBtn()">
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- 删除 -->
    <!--<div class="modal-backdrop in" v-if="idelete"></div>-->
    <!--<div id="myAlert" class="modal" v-if="idelete">-->
    <!--<div class="modal-header">-->
    <!--<button data-dismiss="modal" class="close" type="button" @click="close()">×</button>-->
    <!--<h3>删除</h3>-->
    <!--</div>-->
    <!--<div class="modal-body" >-->
    <!--<p>确定删除此文章吗？</p>-->
    <!--</div>-->
    <!--<div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDelete()">确定</a> </div>-->
    <!--</div>-->

</template>
<script type="text/javascript">
    import Vue from "vue"
    import qiniu from "../../qiniu.vue"
    import editor from "vue-html5-editor"

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

    import {getCourse} from "../../api"

    export default {
        components: {
            qiniu
        },

        events: {
            'imgParameter': function (obj, eventName) {
                this[eventName] = obj[eventName].imgPath
            }
        },

        data() {
            return {
                Id: window.location.pathname.split('/')[2],
                curriculumTitle: "",
                speaker: "",
                curriculumSketch: "",
                totalHours: '',
                price: "",
                detailsPicture: "",
                listPicture: "",
                syllabus: "",
                updateTime: '',
                courseIntroduction:"<div style=\"font-size: large;\"><span style=\"color: rgb(34, 34, 34); background-color: transparent;\"><span style=\"background-color: transparent; color: rgb(0, 0, 0); font-family: Verdana, Arial, Tahoma; font-size: 20px; letter-spacing: 5px;\">•</span><b>课程简介</b></span><span style=\"color: rgb(34, 34, 34); background-color: transparent;\"></span></div><div style=\"font-size: large;\"><br></div><div><div style=\"font-size: large;\"><span style=\"color: rgb(34, 34, 34); background-color: transparent;\"><span style=\"background-color: transparent; color: rgb(0, 0, 0); font-family: Verdana, Arial, Tahoma; font-size: 20px; letter-spacing: 5px;\">•</span><b>主讲人介绍</b></span><span style=\"color: rgb(34, 34, 34); background-color: transparent;\"></span></div><div><br></div><div style=\"font-size: large;\"><div><span style=\"color: rgb(34, 34, 34); background-color: transparent;\"><span style=\"background-color: transparent; color: rgb(0, 0, 0); font-family: Verdana, Arial, Tahoma; font-size: 20px; letter-spacing: 5px;\">•</span><b>适合什么人学</b></span></div></div></div>"


            }
        },
        methods: {
            configBtn() {
                let that = this;
                if (this.curriculumTitle === "") {
                    alert("请您填写课程标题！")
                } else if (this.speaker === "") {
                    alert("请您填写主讲人！")
                } else if (this.curriculumSketch === "") {
                    alert("请您填写课程简述！")
                } else if (this.totalHours === "") {
                    alert("请您填写总课时！")
                } else if (this.updateTime === "") {
                    alert("请您填写更新时间！")
                } else if (this.price === "") {
                    alert("请您填写价格！")
                } else if (this.syllabus === "") {
                    alert("请您上传课程大纲图片！")
                } else if (this.courseIntroduction === "") {
                    alert("请您填写详情！")
                } else if (this.detailsPicture === "") {
                    alert("请您上传详情页顶部图！")
                } else if (this.listPicture === "") {
                    alert("请您上传列表页图！")
                } else {
                    let object = that.$data;
                    object.courseIntroduction=object.courseIntroduction.replace(/http:/g,'https:');

                    console.log(object.courseIntroduction)
                    if (that.Id) {
                        console.log("存在量表ID，此时是编辑量表", object);
                        let n = this.serialize(object)
                        this.updateScale(n)
                    } else {
                        delete object.Id;
                        console.log("此时是新增量表：", object);
                        let n = this.serialize(object)
                        this.addScale(n)
                    }
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
            async getScaleDetail(id) {
                let data = await getCourse("curriculum/findCurriculumById.json", `id=${id}`);
                if (data.code == 0) {
                    let source = data.Curriculum;
                    this.curriculumTitle = source.curriculumTitle;
                    this.speaker = source.speaker;
                    this.curriculumSketch = source.curriculumSketch;
                    this.totalHours = source.totalHours;
                    this.price = source.price;
                    this.detailsPicture = source.detailsPicture;
                    this.listPicture = source.listPicture;
                    this.syllabus = source.syllabus;
                    this.updateTime = source.updateTime;
                    this.courseIntroduction = source.courseIntroduction;
                } else {
                    alert(`errMsg:${data.content.msg}`)
                }
            },
            async updateScale(object) {
                let data = await getCourse("curriculum/updateCurriculum.json", object);
                if (data.code === 0) {
//                    alert(`errMsg:${data.msg}`)
                    this.$route.router.go('/courseManage')
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async addScale(object) {
                let data = await getCourse("curriculum/createCurriculum.json", object);
                if (data.code === 0) {
//                    alert(`errMsg:${data.msg}`)
                    this.$route.router.go('/courseManage')
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
        },
        ready() {
            !!this.Id && this.getScaleDetail(`${this.Id}`);
        }

    }
</script>
<style scope>
    .controls .vue-html5-editor * {
        box-sizing: inherit;
    }

    .vue-html5-editor .content {
        height: 1000px;
    }
</style>