<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">题目新增/修改</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->

                    <form action="" method="get" style="margin-left: 74px;border-bottom: 1px solid #eeeeee;">
                        所属维度<br/><br/>
                        <label style="display: inline-block" v-for="item in dimension">
                            <template v-if="item.isBelongTo">
                                <input style="display: inline-block;visibility: inherit;margin-left: 50px;" name="Fruit"
                                       type="checkbox" :value="item.id" v-model="tsdList" checked/>

                            </template>
                            <template v-else>
                                <input style="display: inline-block;visibility: inherit;margin-left: 50px;" name="Fruit"
                                       type="checkbox" :value="item.id" v-model="tsdList"/>
                            </template>
                            {{item.name}}
                        </label>
                    </form>

                    <div class="control-group">
                        <label class="control-label">题目：</label>
                        <div class="controls">
                            <input type="text" name="author" id="author" placeholder="请输入题目文字" v-model="problemWord" style="width: 250px">
                        </div>
                    </div>
                    <div class="control-group ">
                        <label class="control-label">题目图片（没有就不传）</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="problemPicSrc" :defaultimg="problemPicSrc"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>


                    </div>

                    <div class="control-group" style="margin-bottom: 20px;padding: 10px 0">
                        <span class="modal_userList_box_left_span"
                              style="margin-left: 48px;margin-right: 15px;">选项排列方式</span>
                        <select class="modal_userList_box_left_span_sel2" style="width: 100px" v-model="optionType">
                            <option value="0">选项式</option>
                            <option value="1">下拉式</option>
                        </select>
                    </div>

                    <div class="control-group">
                        <label class="control-label">选项</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" placeholder="选项文字"
                                   v-model="tsoList[0].optionWord">
                            <span style="margin-left: 150px">分数</span>
                            <input type="text" name="title" value="1" style="width: 50px"
                                   v-model="tsoList[0].optionScore">
                        </div>
                        <label class="control-label">选项图片（没有就不传）</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="a0" :defaultimg="a0"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                        <!--<button @click="removeList(0)" style="margin-left: 700px;margin-bottom: 20px">删除</button>-->
                    </div>
                    <div class="control-group">
                        <label class="control-label">选项</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" placeholder="选项文字"
                                   v-model="tsoList[1].optionWord">
                            <span style="margin-left: 150px">分数</span>
                            <input type="text" name="title" value="1" style="width: 50px"
                                   v-model="tsoList[1].optionScore">
                        </div>
                        <label class="control-label">选项图片（没有就不传）</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="a1" :defaultimg="a1"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">选项</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" placeholder="选项文字"
                                   v-model="tsoList[2].optionWord">
                            <span style="margin-left: 150px">分数</span>
                            <input type="text" name="title" value="1" style="width: 50px"
                                   v-model="tsoList[2].optionScore">
                        </div>
                        <label class="control-label">选项图片（没有就不传）</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="a2" :defaultimg="a2"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">选项</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" placeholder="选项文字"
                                   v-model="tsoList[3].optionWord">
                            <span style="margin-left: 150px">分数</span>
                            <input type="text" name="title" value="1" style="width: 50px"
                                   v-model="tsoList[3].optionScore">
                        </div>
                        <label class="control-label">选项图片（没有就不传）</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="a3" :defaultimg="a3"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">选项</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" placeholder="选项文字"
                                   v-model="tsoList[4].optionWord">
                            <span style="margin-left: 150px">分数</span>
                            <input type="text" name="title" value="1" style="width: 50px"
                                   v-model="tsoList[4].optionScore">
                        </div>
                        <label class="control-label">选项图片（没有就不传）</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="a4" :defaultimg="a4"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">选项</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" placeholder="选项文字"
                                   v-model="tsoList[5].optionWord">
                            <span style="margin-left: 150px">分数</span>
                            <input type="text" name="title" value="1" style="width: 50px"
                                   v-model="tsoList[5].optionScore">
                        </div>
                        <label class="control-label">选项图片（没有就不传）</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="a5" :defaultimg="a5"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">选项</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" placeholder="选项文字"
                                   v-model="tsoList[6].optionWord">
                            <span style="margin-left: 150px">分数</span>
                            <input type="text" name="title" value="1" style="width: 50px"
                                   v-model="tsoList[6].optionScore">
                        </div>
                        <label class="control-label">选项图片（没有就不传）</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="a6" :defaultimg="a6"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">选项</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" placeholder="选项文字"
                                   v-model="tsoList[7].optionWord">
                            <span style="margin-left: 150px">分数</span>
                            <input type="text" name="title" value="1" style="width: 50px"
                                   v-model="tsoList[7].optionScore">
                        </div>
                        <label class="control-label">选项图片（没有就不传）</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="a7" :defaultimg="a7"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">选项</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" placeholder="选项文字"
                                   v-model="tsoList[8].optionWord">
                            <span style="margin-left: 150px">分数</span>
                            <input type="text" name="title" value="1" style="width: 50px"
                                   v-model="tsoList[8].optionScore">
                        </div>
                        <label class="control-label">选项图片（没有就不传）</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="a8" :defaultimg="a8"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">选项</label>
                        <div class="controls">
                            <input type="text" name="title" id="title" placeholder="选项文字"
                                   v-model="tsoList[9].optionWord">
                            <span style="margin-left: 150px">分数</span>
                            <input type="text" name="title" value="1" style="width: 50px"
                                   v-model="tsoList[9].optionScore">
                        </div>
                        <label class="control-label">选项图片（没有就不传）</label>
                        <div class="clearfix controls ">
                            <qiniu event-Name="a9" :defaultimg="a9"></qiniu>
                            <p>请上传宽高比例为16:9的图片</p>
                        </div>
                    </div>
                    <!--<div class="form-actions" style="overflow:hidden;">-->
                    <!--<label class="control-label"></label>-->
                    <!--<div class="clearfix controls" style="width:60%;">-->
                    <!--<input type="button" style="float:right;margin-right:120px;" value="新增选项"-->
                    <!--class="btn btn-success" @click="addList()">-->
                    <!--</div>-->
                    <!--</div>-->

                    <div class="form-actions" style="overflow:hidden;">
                        <label class="control-label"></label>
                        <div class="clearfix controls" style="width:50%;">
                            <!--<button class="btn btn-danger" v-if="!!this.articleId" @click="deleteEditingArticle()">删除</button>-->
                            <input type="button" style="
                            float:right;margin-right:120px;" value="保存" id="ajaxBut"
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
                a0: '',
                a1: '',
                a2: '',
                a3: '',
                a4: '',
                a5: '',
                a6: '',
                a7: '',
                a8: '',
                a9: '',
                id: parseInt(this.$route.query.id),
                relateTestScaleId: window.location.pathname.split('/')[3],
                topicId: parseInt(this.$route.query.topicId),
                tsdList: [],
                dimension: [],
                problemWord: '',
                problemPicSrc: '',
                optionType: 0,
                tsoList: [
                    {
                        optionPic: '',
                        optionWord: '',
                        optionScore: '',
                    },
                    {
                        optionPic: '',
                        optionWord: '',
                        optionScore: '',
                    },
                    {
                        optionPic: '',
                        optionWord: '',
                        optionScore: '',
                    },
                    {
                        optionPic: '',
                        optionWord: '',
                        optionScore: '',
                    },
                    {
                        optionPic: '',
                        optionWord: '',
                        optionScore: '',
                    },
                    {
                        optionPic: '',
                        optionWord: '',
                        optionScore: '',
                    },
                    {
                        optionPic: '',
                        optionWord: '',
                        optionScore: '',
                    },
                    {
                        optionPic: '',
                        optionWord: '',
                        optionScore: '',
                    },
                    {
                        optionPic: '',
                        optionWord: '',
                        optionScore: '',
                    },
                    {
                        optionPic: '',
                        optionWord: '',
                        optionScore: '',
                    },
                ],
//                data:{}
            }
        },
        methods: {
//            addList(){
//                this.tsoList.push({
//                    optionPic:'',
//                    optionWord:'',
//                    optionScore:'',
//                })
//            },
            configDelete() {
                // this.idelete = false
                console.log(this.articleId)
                let params = `articleId=${this.articleId}`

                this.deleteArticle(params)
            },
            configBtn() {
                let bb = [];
                let cc = [];
                let object = this.$data;
                let that = this;
                console.log(that.tsoList);
                that.tsoList.forEach((v, i) => {
                    v.optionPic = eval(`that.a${i}`)
                });
                that.tsoList.forEach((v, i) => {
                    if (v.optionPic == '' && v.optionWord == '') {

                    } else {
                        bb.push({
                            optionPic: v.optionPic,
                            optionWord: v.optionWord,
                            optionScore: v.optionScore
                        })
                    }
                });
                that.tsoList.splice(0, that.tsoList.length);

                bb.forEach((v) => {
                    that.tsoList.push({
                        optionPic: v.optionPic,
                        optionWord: v.optionWord,
                        optionScore: v.optionScore
                    })
                });
                that.tsdList.forEach(v => {
                    cc.push({id: v})
                });
                that.tsdList.splice(0, that.tsdList.length);
                cc.forEach(v => {
                    that.tsdList.push({
                        id: v.id
                    })
                })
                delete object.dimension;
                delete object.a0;
                delete object.a1;
                delete object.a2;
                delete object.a3;
                delete object.a4;
                delete object.a5;
                delete object.a6;
                delete object.a7;
                delete object.a8;
                delete object.a9;
                delete object.topicId;

                if (!!this.id) {
                    console.log("此时是修改", object)
                    let n = JSON.stringify(object)
                    this.update(n)
                } else {
                    delete object.id;
                    console.log("此时是新增", object)
                    let n = JSON.stringify(object)
                    this.add(n)
                }
            },

            async getAllDimension(id) {
                let data = await getSources("/testCenter/testScaleDimension/getAllDimensionByTestId", `relateTestScaleId=${id}`);
                console.log(data);
                if (data.code == 0) {
                    this.dimension = data.contentList;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
                this.total = data.count;
            },
            async getTopic(id) {

                let data = await getSources("/testCenter/testScaleTitle/getMessageById", `id=${id}`);
                if (data.code == 0) {
                    let list = data.testScaleTitleMessage;
                    let that = this;
                    this.problemWord = list.problemWord;
                    this.problemPicSrc = list.problemPicSrc;
                    this.optionType = list.optionType;
                    this.dimension = list.tsdList;
                    if(list.tsoList){
                        this.tsoList = list.tsoList;
                    }
                    this.a0 = list.tsoList[0].optionPic;
                    this.a1 = list.tsoList[1].optionPic;
                    this.a2 = list.tsoList[2].optionPic;
                    this.a3 = list.tsoList[3].optionPic;
                    this.a4 = list.tsoList[4].optionPic;
                    this.a5 = list.tsoList[5].optionPic;
                    this.a6 = list.tsoList[6].optionPic;
                    this.a7 = list.tsoList[7].optionPic;
                    this.a8 = list.tsoList[8].optionPic;
                    this.a9 = list.tsoList[9].optionPic;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async add(object) {
                let data = await getJson("/testCenter/testScaleTitle/add", object);
                console.log(data);
                if (data.code == 0) {
                    this.$route.router.go(`/topicManagement/${this.relateTestScaleId}`)
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async update(object) {
                let data = await getJson("/testCenter/testScaleTitle/update", object);
                console.log(data);
                if (data.code == 0) {
                    this.$route.router.go(`/topicManagement/${parseInt(this.$route.query.topicId)}`)
                } else {
                    alert(`errMsg:${data.msg}`)
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
        },
        watch: {
            // typeId() {
            //     this.getCategoryLevel1ByType(`typeId=${this.typeId}`)
            // },
            // categoryId() {
            //     this.getSubCategory(`typeId=${this.typeId}&parentCategoryId=${this.categoryId}`)
            //
        },
        ready() {
            !!this.relateTestScaleId && this.getAllDimension(this.relateTestScaleId);
            !!this.id && this.getTopic(this.id);
//            !!this.id && this.getAllDimension(this.topicId);
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
