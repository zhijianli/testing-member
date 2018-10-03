<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">新建量表</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>量表名</label>
                        <div class="controls">
                            <input type="text" name="name" id="name" v-model="name" placeholder="限制16字" maxlength="16" value="{{ name }}">
                        </div>

                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>创建人</label>
                        <div class="controls">
                            <input type="text" name="founder" id="founder" v-model="founder" value="{{ founder }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>建议间隔</label>
                        <div class="controls">
                            <input style="margin-right: 10px" type="text" name="recommendedTestInterval"
                                   id="recommendedTestInterval" v-model="recommendedTestInterval"
                                   value="{{ recommendedTestInterval }}">天
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>量表价格</label>
                        <div class="controls">
                            <input type="text" name="price" id="price" v-model="price" value="{{ price }}">
                        </div>
                    </div>
                    <div class="control-group" style="margin-left: 52px;">
                        <span style="color: red;margin-right: 20px"> </span>
                        所属类型<br/><br/>
                        <label style="display: inline-block" v-for="item in tscList">

                            <template v-if="item.isBelongTo">
                                <input checked style="display: inline-block;visibility: inherit;margin-left: 50px;"
                                       name="Fruit" type="checkbox" :value="item.id" v-model="checkedNames"/>
                            </template>
                            <template v-else>
                                <input style="display: inline-block;visibility: inherit;margin-left: 50px;" name="Fruit"
                                       type="checkbox" :value="item.id" v-model="checkedNames"/>
                            </template>
                            {{item.name}}
                        </label>
                    </div>

                    <div class="control-group" style="margin-left: 52px;">
                        <span style="color: red;margin-right: 10px">*</span>
                        前端展现方式<br/><br/>
                        <label style="display: inline-block" v-for="item in displayList" @click="aa(item.num)">
                            <template v-if="item.num==displayMode">
                                <input checked
                                       style="display: inline-block;visibility: inherit;margin-left: 50px;" name="Fruit"
                                       type="radio" value=""/>
                            </template>
                            <template v-else>
                                <input
                                        style="display: inline-block;visibility: inherit;margin-left: 50px;"
                                        name="Fruit"
                                        type="radio" value=""/>
                            </template>
                            {{item.content}}</label>
                    </div>

                    <div class="">
                    <!-- <div class="control-group "> -->
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>上传封面图片</label>
                        <div class="clearfix controls ">
                            <!-- <qiniu event-Name="relatePicSrc" :defaultimg="relatePicSrc"></qiniu> -->
                              <alioss   :defaultimg="relatePicSrc"></alioss>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>摘要</label>
                        <div class="controls">
                            <textarea type="text" maxlength="30" style="border-radius: 4px;width: 600px;height: 60px;"
                                      placeholder="显示在列表，限制30字" v-model="abstractStr"></textarea>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>详情描述</label>
                        <div class="controls">

                            <vue-html5-editor :content.sync="description" maxlength="30"></vue-html5-editor>
                            <!--<textarea name="" id="" maxlength="500"-->
                                      <!--style="border-radius: 4px;width: 600px;height: 260px;"-->
                                      <!--placeholder="从这里开始写正文，限制500字" v-model="description"></textarea>-->
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
    import alioss from "../../alioss.vue"
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

    import {getSource, getSources, getJson} from "../../api"

    export default {
        components: {
            qiniu,alioss
        },

        events: {
            'imgParameter': function (obj, eventName) {
                this[eventName] = obj[eventName].imgPath
            },
            'changeRelatePicSrc': function (obj) {
                 this.relatePicSrc = obj;
                 console.log(obj+"!!!!!!!!!!!!");
            }
        },

        data() {
            return {
                scaleId: window.location.pathname.split('/')[2],
                checkedNames: [],
                price: "",
                name: "",
                abstractStr: "",
                displayList: [{num: 0, content: "原始分"}, {num: 1, content: "T分 （标准50）"}, {num: 2, content: "Z分 （标准正态）"}],
                recommendedTestInterval: "",
                founder: "",
                relatePicSrc: "",
                description: "",
                tscList: [],
                list: [],
                displayMode: -1,

            }
        },
        methods: {
            aa(n) {
                this.displayMode = n;
            },
            updateRelatePicSrc(relatePicSrc){
               this.relatePicSrc = relatePicSrc;
                 console.log(this.relatePicSrc+"~~~~~~~~~~~~~~~~~~~");
            },
            configBtn() {

                let that = this;
                that.checkedNames.forEach((v) => {
                    that.list.push({"id": v, "isBelongTo": 1})
                })
                //this.oneLevelCategoryId = this.categoryId
                //this.categoryId = this.subCategoryId
//                delete object.tscList;
                if (this.name === "") {
                    alert("请您填写量表名！")
                } else if (this.founder === "") {
                    alert("请您填写创建人！")
                } else if (this.recommendedTestInterval === "") {
                    alert("请您填写间隔天数！")
                } else if (this.price === "") {
                    alert("请您填写量表价格！")
                } else if (this.displayMode ===-1 ) {
                    alert("请您选择前端展现方式！")
                } else if (this.relatePicSrc === "") {
                    alert("请您上传封面图片！")
                } else if (this.abstractStr === "") {
                    alert("请您填写摘要！")
                } else if (this.description === "") {
                    alert("请您填写详情描述！")
                } else {
                    let object = that.$data;
                    delete object.displayList;

                    delete object.tscList;
                    object.id = that.scaleId;
                    object.tscList = that.list;
                    delete object.list;
                    delete object.checkedNames;
                    console.log(that.displayMode);
                    if (that.scaleId) {
                        delete object.scaleId;
                        console.log("存在量表ID，此时是编辑量表", object);
                        let n = JSON.stringify(object)
                        this.updateScale(n)

                    } else {
                        delete object.scaleId;
                        delete object.id;
                        console.log("此时是新增量表：", object);
                        let n = JSON.stringify(object)
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
                let data = await getSources("/testCenter/testScaleInfo/getMessageById", `id=${id}`);
                console.log(data);
                if (data.code == 0) {
                    let source = data.testScaleInfoMessage;
                    this.name = source.name;
                    this.founder = source.founder;
                    this.recommendedTestInterval = source.recommendedTestInterval;
                    this.price = source.price;
                    this.abstractStr = source.abstractStr;
                    this.description = source.description;
                    this.tscList = source.tscList;
                    this.displayMode = source.displayMode;
                    this.relatePicSrc = source.relatePicSrc;
                } else {
                    alert(`errMsg:${data.content.msg}`)
                }
            },
            async updateScale(object) {
                let data = await getJson("/testCenter/testScaleInfo/update", object);
                if (data.code === 0) {
                    this.$route.router.go('/scaleManagement')
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },
            async addScale(object) {
                let data = await getJson("/testCenter/testScaleInfo/add", object);
                if (data.code === 0) {
                    this.$route.router.go('/scaleManagement')
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async getClassify() {
                let data = await getSource("/testCenter/testScaleClass/getAllTestScaleClass");
                console.log(data);
                if (data.code == 0) {
                    this.tscList = data.testScaleClassList;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
        },
        ready() {
            !!this.scaleId && this.getScaleDetail(`${this.scaleId}`);
            this.getClassify();
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
