<template>
    <div class="container-fluid" style="padding:80px;">
        <div>
            <span>价格（元）：</span>
            <div style="display: flex;width: 500px;justify-content: space-between;margin-bottom: 80px;">
                <div>
                    1.
                    <input type="text" style="width: 50px;" @input="inputChange" v-model="price1" @blur="saveChange">
                    以下
                </div>
                <div>
                    2.
                    <input type="text" style="width: 50px;" @input="inputChange" v-model="price1" @blur="saveChange">
                    ——
                    <input type="text" style="width: 50px;" @input="inputChange" v-model="price2" @blur="saveChange">

                </div>
                <div>
                    3.
                    <input type="text" style="width: 50px;" @input="inputChange" v-model="price2" @blur="saveChange">
                    以上

                </div>



            </div>
            <div>
                咨询流派：

                <div class="widget-box" style="width: 500px;">

                    <div class="form-horizontal widget-content">
                        <div class="control-group" v-for="item in tegsData">
                            <div class="controls testClass">
                                <input type="text" :disabled="true" value="{{item.genreName}}" maxlength="6">
                                <button class="btn btn-info"  @click="changeTagFn($event,$index,item.genreId)">编辑</button>
                                <button class="btn btn-danger" @click="delTagFn(item.genreId)">删除</button>
                            </div>
                        </div>
                    </div>

                    <div class="form-horizontal widget-content">
                        <div class="control-group">
                            <div class="controls">
                                <input type="text" v-model="addNewTag" maxlength="6">
                                <button class="btn btn-success" @click="addNewTagFn()">添加</button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>

        <div class="modal-backdrop in" v-if="deleteState"></div>
        <div id="delete" class="modal" v-if="deleteState">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click=" deleteState = false ">×</button>
                <h3></h3>
            </div>
            <div class="modal-body">
                <p>你确认删除吗？</p>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="javascript:;" @click=" deleteState = false ">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configDelete()">确定</a>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue"
    import $  from "jquery"
    import {

        getResponse,
        getResponses,

    } from '../../api'
    export default {
//        name: "expert-search-set.vue",
        data() {
            return {
                price1: 0,
                price2: 0,
                sgpsId:"",
                tegsData:[],// start
                genreId:"",
                tagName:'',
                addNewTag: '',
                deleteState:false
            }
        },
        methods: {
            inputChange(e) {
                const target = e.target
                const value = target.value
                const key = target.dataset.key

                this[key] = target.value = value.replace(/\D/g, "")
            },
            async saveChange() {
                let data = await getResponses('serivceGoods/modifyPriceScopes',`ceiling=${this.price2}&floor=${this.price1}&sgpsId=${this.sgpsId}`)
                if (data.code == 0) {
                   this.getPrice()

                } else {
                    alert(`${data.msg}`)
                }
            },

            async obtainTags() {
                let data = await getResponse('genre/getGonsultingGenreList')
                if (data.code === 0) {
                    this.tegsData = data.data;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async addNewTagFn(){
                console.log(this.addNewTag)
                if (this.addNewTag == "") {
                    alert('内容不能为空');
                    return
                }
                //添加新类型到数据库
                let data = await getResponses('genre/saveGonsultingGenre', `genreName=${this.addNewTag}`)
                if (data.code == 0) {
                    this.obtainTags()
                    this.addNewTag = ""
                } else {
                    alert(`${data.msg}`)
                }
            },
            async delTagFn(id){
                this.deleteState=true;
                this.genreId = id
            },
            async configDelete(){
                //删除此项
                let data = await getResponses('genre/delGonsultingGenre', `genreId=${this.genreId}`)
                if (data.code == 0) {
                    this.deleteState=false;
                    this.obtainTags()

                } else {
                    alert(`${data.msg}`)
                }
            },
            async changeTagFn(e,index,genreId) {
                console.log(e.target.innerHTML)
                if(e.target.innerHTML == "编辑"){
                    e.target.innerHTML = "保存"
                    $(e.target).removeClass("btn-info")
                    $(e.target).addClass("btn-success")
                    $($(".testClass")[index]).find("input").attr("disabled",false)
                    this.tagName = $($(".testClass")[index]).find("input")[0].value
                } else {
                    //点击保存
                    this.tagName = $($(".testClass")[index]).find("input")[0].value
                    //调用后台接口添加数据
                    this.genreId = genreId
                    let data = await getResponses('genre/modifyGonsultingGenre', `genreId=${this.genreId}&genreName=${this.tagName}`)
                    if (data.code == 0) {
                        this.obtainTags()
                    } else {
                        alert(`errMsg:${data.msg}`)
                    }
                    e.target.innerHTML = "编辑"
                    $(e.target).removeClass("btn-success")
                    $(e.target).addClass("btn-info")
                    $($(".testClass")[index]).find("input").attr("disabled",true)
                }
            },
            async getPrice(){
                let data = await getResponses('serivceGoods/getPriceScopeList')
                if (data.code == 0) {
                    this.price2=data.data.ceiling;
                    this.price1=data.data.floor;
                    this.sgpsId=data.data.sgpsId;

                } else {
                    alert(`${data.msg}`)
                }
            }
        },
        ready() {
             this.obtainTags();
             this.getPrice();
        }
    }
</script>

<style scoped>
</style>