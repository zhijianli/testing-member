<style>
    .block {
        width: 30px;
        height: 30px;
        box-sizing: border-box;
        border: 1px solid #eee;
        text-align: center;
        line-height: 30px;
        display: inline-block;
    }

    .block:hover {
        background: #666;
        color: #fff;
    }

    .block.active {
        background: #666;
        color: #fff;
    }

    .list:first-child .delect {
        display: none;
    }

</style>
<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">新增/修改定性</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>定性名称</label>
                        <div class="controls">
                            <input type="text" v-model="name" ref="name" placeholder="限制10字">
                        </div>
                    </div>
                    <div class="control-group ">
                        <label class="control-label">定性配图（可选）</label>
                        <div class="clearfix controls ">

                            <qiniu event-Name="qualitativeImage" :defaultimg="qualitativeImage"></qiniu>
                            <p>请上传16：9配图，支持jpeg、png，大小限制2m</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">简介</label>
                        <div class="controls">
                            <textarea v-model="briefIntroduction" type="text" name="name" maxlength="200"
                                      placeholder="限制200字"
                                      onpropertychange="if(this.value.length>10){this.value=this.value.slice(0,10)}"
                                      style="width: 800px"></textarea>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">概念解释</label>

                        <div class="controls">
                            <textarea type="text" name="name" maxlength="1500" placeholder="限制1500字"
                                      style="width: 1000px;height: 400px;" v-model="concept"></textarea>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">优势</label>
                        <div class="controls">
                            <textarea type="text" name="name" maxlength="1500" placeholder="限制1500字"
                                      style="width: 1000px;height: 400px;" v-model="advantage"></textarea>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">劣势</label>
                        <div class="controls">
                            <textarea type="text" name="name" maxlength="1500" placeholder="限制1500字"
                                      style="width: 1000px;height: 400px;" v-model="inferiority"></textarea>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">分析与建议</label>
                        <div class="controls">
                            <vue-html5-editor :content.sync="proposal"></vue-html5-editor>
                            <!--<textarea type="text" name="name" maxlength="1000" placeholder="限制1000字"-->
                                      <!--style="width: 800px;height: 100px;" v-model="proposal"></textarea>-->
                        </div>
                    </div>


                    <form action="" method="get" style="margin-left: 52px;border-bottom: 1px solid #eeeeee;">
                        定性类型<br/><br/>
                        <label style="display: inline-block" v-for="item in type">
                            <input style="display: inline-block;visibility: inherit;margin-left: 50px;" name="Fruit"
                                   type="radio" :value="item.id" v-model="qualitativeType"/>
                            {{item.name}}
                        </label>
                        <span style="margin-left: 50px;">注意：每份量表前提定性只能创建1个；每份量表其他定性只能创建1个</span>
                        <!--<label style="display: inline-block"><input style="display: inline-block;visibility: inherit"-->
                        <!--name="Fruit" type="radio"-->
                        <!--value="0"/>普通定性 </label>-->
                        <!--<label style="display: inline-block"><input style="display: inline-block;visibility: inherit"-->
                        <!--name="Fruit" type="radio" value="2"/>其他定性 </label>-->
                    </form>
                    <div class="control-group">
                        <div class="title" style="margin:10px 0 20px 20px;">定性成立条件<span style="color: red;margin-left: 20px;">（以下统一采用转化分进行条件设定）</span></div>
                        <ul class="form-horizontal" name="basic_validate">
                            <!-- 修改位置 -->

                            <li v-for="(index,item) in coqList" style="margin-bottom: 10px" class="list">

                                <select class="modal_userList_box_left_span_sel2"
                                        style="width: 140px;margin-left: 50px;" v-model="item.leftDimensionId">
                                    <option :value="i.id" v-for="i in dimension">{{i.name}}分数</option>
                                </select>
                                <ul style="display: inline-block;width: 150px;height: 30px;margin-left: 50px;">
                                    <li class="block" v-for="(i,item) in compare"
                                        :class="{active:i === this.coqList[index].leftRightRelation-1}"
                                        @click="judge(i,index)">{{item.content}}
                                    </li>
                                </ul>
                                <select class="modal_userList_box_left_span_sel2"
                                        style="width: 140px;margin-left: 50px;" v-model="item.rightDimensionId"
                                        @change="rightChange(item.rightDimensionId,index)">
                                    <option value=''>分数</option>
                                    <option :value="i.id" v-for="i in dimension">{{i.name}}分数</option>
                                </select>
                                <input type="text" style="width:40px;" v-model="item.rightScore"
                                       v-show="item.rightDimensionId==''">
                                <button @click="removeList(index)" style="margin-left: 30px;" class="delect">删除</button>
                            </li>
                        </ul>
                        <div class="form-actions" style="overflow:hidden;">
                            <label class="control-label"></label>
                            <div class="clearfix controls" style="width:96%;">
                                <input type="button" style="float:right;margin-right:120px;" value="新增定性成立条件"
                                       class="btn btn-success" @click="addList()">
                            </div>
                        </div>
                    </div>
                    <div class="form-actions" style="overflow:hidden;">
                        <label class="control-label"></label>
                        <div class="clearfix controls" style="width:98%;">
                            <!--<button class="btn btn-danger" v-if="!!this.articleId" @click="deleteEditingArticle()">删除</button>-->
                            <input type="button" style="float:right;margin-right:120px;" value="保存" id="ajaxBut"
                                   class="btn btn-success" @click="configBtn()">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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

    import {getSource, getSources, getJson} from "../../api"

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
                id: 0,
                type: [{id: 1, name: '前提定性'}, {id: 0, name: '普通定性'}, {id: 2, name: '其他定性'}],
                dimension: [],
                qualitativeId: parseInt(this.$route.query.id),
                relateTestScaleId: parseInt(window.location.pathname.split('/')[3]),
                coqList: [
                    {
                        leftRightRelation: 1,
                        leftDimensionId: "",
                        rightDimensionId: "",
                        rightScore: "",
                    }
                ],
                compare: [{content: '>',}, {content: '>='}, {content: '='}, {content: '<='}, {content: '<'}],
                advantage: "",
                briefIntroduction: '',
                concept: '',
                inferiority: '',
                name: '',
                proposal: '',
                qualitativeType: 0,
                qualitativeImage:'',
            }
        },
        methods: {
            judge(a, b) {
                this.coqList[b].leftRightRelation = a + 1;
            },

            rightChange(a, b) {
                if (a == "") {
                    this.coqList[b].rightDimensionId = '';
                } else {
                    this.coqList[b].rightScore = '';
                }
            },
            addList() {
                this.coqList.push(
                    {
                        leftRightRelation: 1,
                        leftDimensionId: "",
                        rightDimensionId: "",
                        rightScore: "",
                    }
                )
            },
            removeList(index) {
                this.coqList.splice(index, 1)
            },
            configBtn() {

                if (this.name == "") {
                    alert("请您填写定性名称")
                } else {
                    let object = this.$data;
                    delete object.type;
                    delete object.dimension;
                    delete object.compare;
                    if (!!this.qualitativeId) {
                        delete object.relateTestScaleId;
                        delete object.qualitativeId;
                        console.log("此时是修改", object)
                        let n = JSON.stringify(object)
                        this.update(n)
                    } else {

                        delete object.qualitativeId;
                        delete object.id;
                        console.log("此时是新增", object)
                        let n = JSON.stringify(object)
                        this.add(n)
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
            async getQualitative(id) {
//                let that = this;
                let data = await getSources("/testCenter/testScaleQualitative/getMessageById", `qualitativeId=${id}`);
                if (data.code == 0) {
                    let a = data.tsqMessage;
                    this.id = a.id;
                    this.coqList = a.coqList;
                    this.coqList.forEach(v => {
                        if (v.rightDimensionId == null) {
                            v.rightDimensionId = ''
                        }
                    })
//                    console.log(this.coqList.rightDimensionId);

                    this.advantage = a.advantage;
                    this.briefIntroduction = a.briefIntroduction;
                    this.concept = a.concept;
                    this.inferiority = a.inferiority;
                    this.name = a.name;
                    this.proposal = a.proposal;
                    this.qualitativeType = a.qualitativeType;
                    this.qualitativeImage = a.qualitativeImage;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async getAll(id) {
                let data = await getSources("/testCenter/testScaleDimension/getAllDimensionByTestId", `relateTestScaleId=${id}`);
                if (data.code == 0) {
                    this.dimension = data.contentList;

                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async add(object) {
                let data = await getJson("/testCenter/testScaleQualitative/add", object);
                if (data.code == 0) {
                    this.$route.router.go(`/qualitativeManagement/${this.relateTestScaleId}`)
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async update(object) {
                let data = await getJson("/testCenter/testScaleQualitative/update", object);
                if (data.code == 0) {
                    this.$route.router.go(`/qualitativeManagement/${parseInt(this.$route.query.qualitativeId)}`)
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
        },
        watch: {
            items: {
                handler: function () {
                    var _this = this;
                    var _sum = 10; //字体限制为100个
                    _this.$refs.name.setAttribute("maxlength", _sum);
                    _this.number = _sum - _this.$refs.count.value.length;
                },
                deep: true
            }
            // typeId() {
            //     this.getCategoryLevel1ByType(`typeId=${this.typeId}`)
            // },
            // categoryId() {
            //     this.getSubCategory(`typeId=${this.typeId}&parentCategoryId
        },
        ready() {
            !!this.relateTestScaleId && this.getAll(`${this.relateTestScaleId}`);
            !!this.qualitativeId && this.getQualitative(this.qualitativeId);
            !!this.qualitativeId && this.getAll(this.$route.query.qualitativeId);

        }
    }
</script>
<style scope>
    .controls .vue-html5-editor * {
        box-sizing: inherit
    }

    .vue-html5-editor .content {
        height: 1000px;
    }
</style>
