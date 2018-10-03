<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">新增/修改人群范围</h5>
            </div>
            <div class="widget-content nopadding">
                <ul class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <li style="margin-bottom: 10px">注：如若要覆盖所有年龄段，年龄段填0-200即可。</li>
                    <li v-for="(index,item) in data" style="margin-bottom: 10px">
                        <span class="modal_userList_box_left_span">性别</span>

                        <select class="modal_userList_box_left_span_sel2" style="width: 100px" v-model="item.sex">
                            <option value="woman">女</option>
                            <option value="man" :selected="item.sex=='man'">男</option>
                        </select>
                        <span>年龄段</span>
                        <input v-model="item.lowerAgeLimit" type="text">
                        --
                        <input v-model="item.upperAgeLimit" type="text" @change="aa">
                        <button @click="removeList(index)">删除</button>
                    </li>
                </ul>
                <div class="form-actions" style="overflow:hidden;">
                    <label class="control-label"></label>
                    <div class="clearfix controls" style="width:50%;">
                        <!--<button class="btn btn-danger" v-if="!!this.articleId" @click="deleteEditingArticle()">删除</button>-->
                        <input type="button" style="float:right;margin-right:120px;" value="新增人群范围" id="addBtn"
                               class="btn btn-success" @click="addList()">
                    </div>

                </div>
                <div class="form-actions" style="overflow:hidden;">
                    <label class="control-label"></label>
                    <div class="clearfix controls" style="width:50%;">
                        <!--<button class="btn btn-danger" v-if="!!this.articleId" @click="deleteEditingArticle()">删除</button>-->
                        <input type="button" style="float:right;margin-right:120px;" value="保存" id="ajaxBut"
                               class="btn btn-success" @click="configBtn()">
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
    import {
        getSource,
        getSources,
        getJson,

    } from '../../api'

    export default {

        events: {
            'imgParameter': function (obj, eventName) {
                this[eventName] = obj[eventName].imgPath
            }
        },

        data() {
            return {
                i: 2,
                crowdId: window.location.pathname.split('/')[2],
                data:[],
                object:{},

            }
        },
        methods: {
            aa(){
              console.log(this.data)
            },
            addList() {
                this.data.push({
                    "sex": "",
                    "lowerAgeLimit": "",
                    "upperAgeLimit": ""
                });
                console.log(this.data);
            },
            removeList(index) {
                this.data.splice(index, 1)
            },

            configBtn() {
                this.object={
                    id:this.crowdId,
                    tsprList:this.data
                };

                let n=JSON.stringify(this.object);
                console.log(n);
                this.getJsons(n)
            },

            serialize(obj) {

                let str = ""
                for (let key in obj) {
                    str += `${key}=${obj[key]}&`
                }
                str = str.slice(0, -1)
                return str
            },


            async getJsons(object) {
                let data = await getJson("/testCenter/testScalePopulationRange/update", object);
                console.log(data)
                if(data.code==0){
                    this.$route.router.go('/scaleManagement')
                }else{
                    alert(`errMsg:${data.msg}`)
                }
            },

            async getCrowd() {
                let data = await getSources("/testCenter/testScalePopulationRange/getAllMessage", `relateTestScaleId=${this.crowdId}`);
                console.log(data);
                if (data.code == 0) {
                    this.data = data.contentList;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
                this.total = data.count;
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
            !!this.articleId && this.getArticleDetail(`articleId=${this.articleId}`)
            this.getCrowd();
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
