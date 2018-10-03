<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">新建章节</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>节标题</label>
                        <div class="controls">
                            <input type="text" style="width: 500px;" placeholder="最多30字" maxlength="30"
                                   name="chapterTitle" id="chapterTitle" v-model="chapterTitle"
                                   value="{{ chapterTitle }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>音频内容</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="audioPath" :defaultimg="audioPath" type="music"></qiniu>
                        </div>
                    </div>
                    <template v-if="audioPath">
                    </template>

                    <div class="control-group ">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>播放背景图(480*480px)</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="backPic" :defaultimg="backPic"></qiniu>
                            <p>请上传宽高比例为1:1的图片</p>

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
    <audio id="audio" :src=" mp3Pre + '/' + audioPath"></audio>

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
                    'imgParameter': function (obj, eventName) {
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
                id: window.location.pathname.split('/')[3],

                audioPath: "",
                backPic: "",
                chapterTitle: "",
                curriclumId: window.location.pathname.split('/')[2],
                hourLong: "",
                mp3Pre: `http://${process.env.NODE_ENV == 'production' ? "file.120xinmao.com" : "oml9jrsxm.bkt.clouddn.com" }`,
            }
        },

        methods: {
            configBtn() {
                let aa = document.querySelector('#audio');
                console.log(aa.duration);
                if(aa.duration>=3600){
                    this.hourLong = this.converter(aa.duration);
                }else{
                    this.hourLong = this.minute(aa.duration);
                }


                let that = this;
                if (this.chapterTitle === "") {
                    alert("请您填写节标题！")
                } else if (this.audioPath === "") {
                    alert("请您上传音频内容！")
                } else if (this.backPic === "") {
                    alert("请您上传播放背景图！")
                } else {
                    let object = that.$data;
                    delete object.mp3Pre;
                    if (that.id) {
                        console.log("存在ID，此时是编辑", object);
                        let n = this.serialize(object)
                        this.updateScale(n)
                    } else {
                        delete object.id;
                        console.log("此时是新增：", object);
                        let n = this.serialize(object)
                        this.addScale(n)
                    }
                }
            },


//////秒转化为时分秒
            converter(num) {
                let str = `${Math.floor(num / 60 / 60) > 10 ? Math.floor(num / 60 / 60) : '0' + Math.floor(num / 60 / 60)}:${Math.floor(num % 3600 / 60) > 10 ? Math.floor(num % 3600 / 60) : '0' + Math.floor(num % 3600 / 60)}:${Math.floor(num % 60) > 10 ? Math.floor(num % 60) : '0' + Math.floor(num % 60)}`
                return str;
            },
            minute(num) {
                let str = `${Math.floor(num / 60) > 10 ? Math.floor(num / 60) : '0' + Math.floor(num / 60)}:${Math.floor(num % 60) > 10 ? Math.floor(num % 60) : '0' + Math.floor(num % 60)}`
                return str;
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
                let data = await getCourse("curriculumChapter/selectChapterById.json", `id=${id}`);
                if (data.code === 0) {
                    let source = data.chapter;
                    this.audioPath = source.audioPath;
                    this.backPic = source.backPic;
                    this.chapterTitle = source.chapterTitle;
                    this.hourLong = source.hourLong;
                } else {
                    alert(`errMsg:${data.content.msg}`)
                }
            },

            async updateScale(object) {
                let data = await getCourse("curriculumChapter/updateChapter.json", object);
                if (data.code === 0) {
                    this.$route.router.go(`/chapterManage/${this.curriclumId}`)
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },


            async addScale(object) {
                let data = await getCourse("curriculumChapter/createChapter.json", object);
                if (data.code === 0) {
                    this.$route.router.go(`/chapterManage/${this.curriclumId}`)
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
        },

        ready() {
            !!this.id && this.getScaleDetail(`${this.id}`);
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