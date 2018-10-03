<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">新增/修改维度</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>维度名</label>
                        <div class="controls">
                            <input type="text" name="name" placeholder="维度名（十个汉字以内）" v-model="name">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">描述</label>
                        <div class="controls">
                            <input type="text" name="name" placeholder="描述（十二个汉字以内）" v-model="description">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">对应题目</label>
                        <div class="controls">
                            <input type="text" name="name"  placeholder="题目序号,以英文逗号隔开"
                                   v-model="titleNumberStr">
                        </div>
                    </div>
                    <form action="" method="get" style="margin-left: 42px;border-bottom: 1px solid #eeeeee;">
                        前端展现方式<br/><br/>
                        <label style="display: inline-block" v-show="displayMode==1">T分（标准50)</label>
                        <label style="display: inline-block" v-show="displayMode==2">Z分 （标准正态） </label>
                        <label style="display: inline-block" v-show="displayMode==0">原始分 </label>
                    </form>
                    <div class="control-group">
                        <div class="title" style="margin:10px 0 20px 20px;">人群范围与常模设置</div>
                        <ul class="form-horizontal" name="basic_validate">
                            <!-- 修改位置 -->
                            <li style="margin-bottom: 10px;margin-left: 32px;" v-show="tsprList==''">亲，需要先设置人群范围，才能添加该维度下的常模。</li>
                            <li style="margin-bottom: 10px" v-for="item in tsprList">
                                <span style="display: inline-block;margin-left: 20px"><span style="margin-right: 20px">性别:{{item.sex=='man'?'男':'女'}}</span>年龄范围:({{item.lowerAgeLimit}},{{item.upperAgeLimit}}]</span>
                                <span style="color: red;margin-right: 10px;margin-left: 10px;"></span>
                                <span class="modal_userList_box_left_span">常模平均分</span>
                                <input type="text" v-model="item.normMessage.averageValue">
                                <span style="color: red;margin-right: 10px;margin-left: 10px;"></span>
                                <span class="modal_userList_box_left_span">常模标准差</span>
                                <input type="text" v-model="item.normMessage.standardDeviation">
                                <span style="color: red;margin-right: 10px;margin-left: 10px;"></span>
                                <span>常模标准分范围</span>
                                <input type="text" v-model="item.normMessage.lowScore">
                                <input type="text" v-model="item.normMessage.highScore">
                            </li>
                        </ul>
                    </div>
                    <p style="margin-top: 50px">维度分（x）：此维度下题目总分</p>
                    <p>常模均分（Mean）：此维度样本平均分</p>
                    <p>常模标准差（SD）：此维度样本标准差</p>
                    <p>维度满分（f）：该维度下所有题目最高分之和</p>
                    <p>标准分（h）：展示在前端页面的分数</p>
                    <p>维度分（x）与标准分（h）有三种计算公式：</p>
                    <p>T分（标准50）：h=50+（（x-Mean）/SD）*10</p>
                    <p>Z分（标准正态）：h=(x-Mean)/SD</p>
                    <p>原始分：h=x/f*10</p>


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
    import editor from "vue-html5-editor"
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
                id: 0,
                dimensionId: parseInt(this.$route.query.id),
                relateTestScaleId: window.location.pathname.split('/')[3],
                displayMode: '',
                description: '',
                name: '',
                titleNumberStr: '',
                tsprList: [],
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

            configBtn() {
                if(this.name==""){
                    alert("请您填写维度名！")
                }else{
                    let object = this.$data;

                    object.titleNumberStr=object.titleNumberStr.replace(/，/g,',')
                    if (!!this.dimensionId) {
                        delete object.relateTestScaleId;
                        delete object.dimensionId;
                        console.log("此时是修改", object)
                        let n = JSON.stringify(object)
                        this.update(n)
                    } else {
                        delete object.dimensionId;
                        delete object.displayMode;
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

//            async getAllCrowdRange(id) {
//                let data = await getSources("/testCenter/testScaleClass/getAllTestScaleClass",`id=${id}`);
//                console.log(data);
//                if (data.code == 0) {
//                    this.tscList = data.testScaleClassList;
//                } else {
//                    alert(`errMsg:${data.msg}`)
//                }
//            },

            async getAllCrowd(id) {
                let data = await getSources("/testCenter/testScalePopulationRange/getAllMessage", `relateTestScaleId=${id}`);
//                console.log(data);
                if (data.code == 0) {
                    this.tsprList = data.contentList;
                    this.displayMode = data.displayMode;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async getDimension(id) {
                let data = await getSources("/testCenter/testScaleDimension/getMessageById", `dimensionId=${id}`);
                if (data.code == 0) {
                    let aa = data.testScaleDimensionMessage;
                    let that = this;
                    this.id = aa.id;
                    this.displayMode = aa.displayMode;
                    this.description = aa.description;
                    this.name = aa.name
                    this.titleNumberStr = aa.titleNumberStr
                    this.tsprList = aa.tsprList

//                    aa.tsprList.forEach((v,i)=>{
//                       that.tsprList.push({
//                           id:v.id,
//                           normMessage:v.normMessage,
//                       })
//                    });
                    console.log(this.tsprList)
                    this.getList = aa.tsprList;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async add(object) {
                let data = await getJson("/testCenter/testScaleDimension/add", object);
                if (data.code == 0) {
                    this.$route.router.go(`/dimensionManagement/${this.relateTestScaleId}`)
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async update(object) {
                let data = await getJson("/testCenter/testScaleDimension/update", object);
                if (data.code == 0) {
                    this.$route.router.go(`/dimensionManagement/${parseInt(this.$route.query.dimensionId)}`)
                } else {
                    this.dimensionId=parseInt(this.$route.query.id)
                    alert(`errMsg:${data.msg}`)
                }
            },


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
            !!this.relateTestScaleId && this.getAllCrowd(this.relateTestScaleId);
            !!this.dimensionId && this.getDimension(this.dimensionId);

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
