<template>
    <div class="container-fliud">
        <!-- 推荐专家页面 -->
        <div class="widget-box">
            <div id="search" class="title">
                <input type="text" name="words" placeholder="请输入姓名或者手机号（只针对当前选中类别）" v-model="words" style="width: 300px;">
                <input type="submit" value="搜索" class="btn btn-success" @click="search()" style="margin-right:50px;">
            </div>

            <div class="tab-cont">
                <ul class="tagTit">
                    <template  v-for="item in userDefinedTagList">
                        <li :class="{'show': item.id === nowIndex }"
                            style="margin-right: 30px;margin-bottom: 20px;"

                        >
                            <span class="lh-span" @click.stop="switchFn(item.id)">{{ item.name }} （{{item.psychoNum}}） </span>

                            <span class="normal-operate-state" @click="editUserDefinedTag(item)">编辑</span></li>

                    </template>


                </ul>
            </div>

            <input type="submit" value="添加专家" class="btn btn-success" @click="addExpert()" style="margin-right:50px;">



            <!-- 表格展示 -->
            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                <thead>
                <tr>
                    <th>
                        <div class="checkbox">
                            <!-- <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox" @click="">
                            <label for="title-table-th" class="checkboxLabel"></label> -->
                            选中
                        </div>
                    </th>
                    <th>推荐时间</th>
                    <th>姓名</th>
                    <th>手机号</th>
                    <th>性别</th>
                    <th>专家类型</th>
                    <th>服务价格</th>
                    <th>擅长领域</th>
                    <!--<th>所在地</th>-->
                    <th>排序</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in data">
                    <td>
                        <div class="checkbox">
                            <input type="checkbox"
                                   class="checkboxInp"
                                   name="title-table-checkbox"
                                   id="title-table-td{{item.mid}}"
                                   :checked=" item.checkState? 'checked':''"
                                   @click='selectPerson(item.mid,item)'
                                   data-typeId="{{item.mid}}">
                            <label class="checkboxLabel" for="title-table-td{{item.mid}}"></label>
                        </div>
                    </td>
                    <td>{{item.auditTime}}</td>
                    <td>{{item.nickname}}</td>
                    <td>{{item.mobilePhone}}</td>
                    <td>{{item.sex | sexType}}</td>
                    <td>{{item.pLevel === 0 ? "专业咨询师" : "轻咨询师"}}</td>
                    <td>{{item.priceAndTime}}</td>
                    <td><span v-for="item in item.psychoTags">{{item.tagName + "&nbsp;&nbsp;&nbsp;"}} </span></td>
                    <!--<td>{{item.location}}</td>-->
                    <td>
                        <span>{{item.orderNum}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <a class="btn btn-success" style="float:right" href="javascript:;"
                           @click="btnEdit(item.orderNum,item.mid)">修改</a>
                    </td>
                    <td>
                        <button class="btn btn-warning" @click="removeFn(item.mid)">移除</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class='bottom'>
                <!-- 分页 -->
                <div class="page">
                    <div id="test">
                        <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"
                                  :page-handler="pageHandler" :create-url="createUrl">
                            <zpagenav>
                    </div>
                </div>
            </div>
        </div>

        <!-- start 移除功能 -->
        <div class="modal-backdrop in" v-if="remove" style="opacity:1">
            <div class="modal">
                <div class="modal-header">
                    <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                    <h2>移除</h2>
                </div>
                ;
                <div class="modal-body form-horizontal">
                    <h2 style="text-align:center">确定移除？</h2>
                    <button type="button" class="btn btn-default" @click="close()">取消</button>

                    <button style="float:right" type="button" class="btn btn-success" @click="affirmRemoveFn">移除
                    </button>
                </div>
            </div>
        </div>
        <!-- end 移除功能 -->

        <!-- start 修改排序 -->
        <div class="modal-backdrop in" v-if="edit" style="opacity:1">
            <div id="myAlert" class="modal">
                <div class="modal-header">
                    <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                    <h2>修改</h2>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="control-group bn">
                        <label class="control-label">输入序号 :</label>
                        <div class="controls">
                            <input type="text" v-model="editorderNum">
                        </div>
                    </div>

                    <button type="button" class="btn btn-default" @click="close()">取消</button>

                    <button style="float:right" type="button" class="btn btn-success" @click="configEdit">保存</button>
                </div>
            </div>
        </div>



        <!-- start 编辑自定义标签 -->
        <div class="modal-backdrop in" v-if="editUserDefinedState" style="opacity:1">
            <div id="myAlert2" class="modal">
                <div class="modal-header">
                    <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                    <h2>修改</h2>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="control-group bn">
                        <div class="controls">
                            <input type="text" v-model="newTag" placeHolder="输入类别，十个字以内" maxlength="10">
                        </div>
                    </div>

                    <button type="button" class="btn btn-default" @click="close()">取消</button>

                    <button style="float:right" type="button" class="btn btn-success" @click="editExpertsTagName">保存</button>
                </div>
            </div>
        </div>


        <!--搜索专家-->
        <div class="modal-backdrop in" v-if="expertSearch"></div>
        <div id="myAlert3" class="modal" v-if="expertSearch">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="expertSearch=false">×</button>
                <h3>搜索</h3>
            </div>
            <div class="modal-body" >
                <div>
                    <input type="text" name="searchVal" placeholder="专家姓名、手机号" v-model="searchVal" style="margin-bottom: 0">
                    <input type="submit" value="搜索" class="btn btn-success" @click="searchPsycho()" style="margin-right:50px;">
                </div>
                <ul class="searchList">
                    <li v-for="item in expertsList">
                        <input type="radio" name="choosePsycho" v-model="choosePeo" :value="item.mid">
                        <img :src="imgPre+'/'+item.avatar" alt="">
                        <div>
                            <p><span>{{item.nickname}}</span><span>{{ item.location }}</span></p>
                            <p><span>{{item.mobilePhone}}</span></p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click="expertSearch=false">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configChoose()">添加</a></div>
        </div>
        


    </div>
</template>

<script type="text/javascript">
    import Vue from "vue"
    import $ from "jquery"
    import zpagenav from "vue-pagenav"
    import {
        getResponse,
        getResponses,
    }from "../../api"
    import {
        serialize
    } from "../../utils"
    Vue.use(zpagenav)

    export default{
        components: {},
        data: function () {
            return {
                imgPre: `http://${process.env.NODE_ENV == 'production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
                words: "",
                data: [],
                //分页参数
                page: 1,//page
                pageSize: 10, //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 5, //how many links to show, must not less than 5,  default is 5
                effectVal: {},
                //edit 修改固定名额弹出是否显示
                edit: false,
                //remove 是否移除此专家推荐
                remove: false,
                note: "",
                pageOne: true,
                pageTwo: false,
                picPath: "",
                dataList: [],
                selectPersonAll: false,
                selectPersonList: [],

                selectPersonList2: [],
                selectPersonAll2: false,
                editorderNum: "",
                mid: "",
                userId: sessionStorage.userId,

                //搜索
                searchIsEnable: "",
                searchTime: "",

                effectVal2: {},

                search_pageSize: 15,
                search_page: 1,
                search_total: 2,

                searchList: [], //搜索得到的专家列表
                downloadName: "活动期间专家电话活动流水",
                test: false,

                userDefinedTagList: ['情感婚恋', '情绪疏导', '个人成长', '人际关系'],

                nowIndex: 0,
                editUserDefinedState: false,
                editUDPlaceHolder: '',
                editTagId: '',
                newTag: '',

                // 搜索专家
                expertSearch: false,
                searchVal: "",
                authorType: 0,
                mid: "",
                expertsList: [],
                choosePeo: "",

            }
        },
        methods: {

            //---------------------------------------------------      初始化页面获取推荐专家信息
            async obtainRecommendData(){
                let data = await getResponses("PsychoInfo/V3/getRecommendPsycho.json", `pageIndex=${this.page}&pageSize=${this.pageSize}&words=${this.words}`);
                console.log("初始设置：", data);
                if (data.code == 0) {
                    this.data = data.list;
                    this.total = data.psychoCounts;
                    console.log(this.data);
                    //赋初始值
                    this.mid = this.data.mid;
                    this.auditTime = this.data.auditTime;
                    this.nickname = this.data.nickname;
                    this.mobilePhone = this.data.mobilePhone;
                    this.sex = this.data.sex;
                    this.location = this.data.location;
                    this.orderNum = this.data.orderNum;
                } else {
                    alert(`errMsg:${data.msg}`);
                }
            },

            pageHandler: function (page) {
                this.page = page
                this.getExpertsListByTagId()
            },
            createUrl: function (unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },

            search() {
                this.page = 1
                this.getExpertsListByTagId()

            },

            serialize(hash) {
                let result = []
                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })
                return result.join("&")
            },

            //点击修改排序
            btnEdit(orderNum, mid){
                this.edit = true;
                this.editorderNum = orderNum;
                this.mid = mid;
                console.log(this.edit, this.editorderNum, this.mid);

            },
            //修改排序后保存
            configEdit(){
                let params = `mid=${this.mid}&orderNum=${this.editorderNum}&userId=${this.userId}&psychoClassId=${this.nowIndex}`;
                this.updatePsychoRecommend(params);
            },

            async updatePsychoRecommend(params){
                let data = await getResponses("PsychoInfo/V3/updateOrderNum.json", `mid=${this.mid}&orderNum=${this.editorderNum}&userId=${this.userId}&psychoClassId=${this.nowIndex}`);
                if (data.code == 0) {
                    this.edit = false;
                    this.getExpertsListByTagId();

                } else {
                    alert(data.msg)
                    this.edit = false
                }
            },

            //点击移除推荐专家
            removeFn(mid){
                this.remove = true
                this.mid = mid;
            },
            //二次确认移除推荐专家
            affirmRemoveFn(){
                let params = `mid=${this.mid}&psychoClassId=${this.nowIndex}`;
                console.log(params, typeof params);
                this.removePsychoRecommend(params);
            },
            async removePsychoRecommend(params) {
                let data = await getResponses("PsychoInfo/V3/deleteWebRecommendPsycho.json", params);

                if (data.code == 0) {
                    this.remove = false;
                    this.getExpertsListByTagId();
                } else {
                    alert(data.msg);
                    this.remove = false;
                }
            },

            close(){
                this.edit = false
                this.remove = false
                this.test = false
                this.editUserDefinedState = false
            },

            switchFn(index) {
                this.nowIndex = index
                this.words = ''
                this.getExpertsListByTagId()

            },

            editUserDefinedTag(item) {
                this.editUDPlaceHolder = item.name
                this.editTagId = item.id
                this.editUserDefinedState = true
                this.newTag = ''
            },
            saveNewTag() {
                this.editExpertsTagName()
                this.editUserDefinedState = false
            },

            async searchPsycho(){
                let params=`words=${this.searchVal}&isAudited=0&pageIndex=1&pageSize=100`
                let data=await getResponses("Psychor/searchMember.json",params);
                if(data.code===0){
                    this.expertsList=data.psychoDTOs;
                }
            },

            addExpert() {
                // this.searchPsycho()
                this.expertsList = []
                this.searchVal = ''
                this.choosePeo = ''
                this.expertSearch = true

            },

            // 接口名称 推荐专家到首页分类
            async configChoose() {
                if (!this.choosePeo) {
                    alert("请先选中专家")
                    return
                }
                const data = await getResponses('PsychoInfo/V3/addRecommendPsycho.json', `psychoClassId=${this.nowIndex}&psychoId=${this.choosePeo}&userId=${sessionStorage.userId}`)
                if (data.code === 0) {
                    this.expertSearch = false
                    this.getPsychoClassList2()
                } else {
                    alert(data.msg)
                }
            },



            // 接口名称 显示所有专家分类
            async getPsychoClassList(flag) {
                const data = await getResponse('depression/psychoClass/getPsychoClassList.json')
                if (data.code === 0) {
                    this.userDefinedTagList = data.psychoClassList
                    if (flag) {

                    }
                    this.nowIndex = data.psychoClassList[0].id
                    this.getExpertsListByTagId()
                } else {
                    alert(data.msg)
                }
            },

            async getPsychoClassList2() {
                const data = await getResponse('depression/psychoClass/getPsychoClassList.json')
                if (data.code === 0) {
                    this.userDefinedTagList = data.psychoClassList

                    this.getExpertsListByTagId()
                } else {
                    alert(data.msg)
                }
            },


            // 接口名称 修改专家分类
            async editExpertsTagName() {
                const data = await getResponses('depression/psychoClass/updatePsychoClass.json', `id=${this.editTagId}&name=${this.newTag}`)
                if (data.code === 0) {
                    this.editUserDefinedState = false
                    this.getPsychoClassList()

                } else {
                    alert(data.msg)
                }
            },


            // 接口名称 根据专家分类id获取该分类下的专家信息
            async getExpertsListByTagId() {
                const data = await getResponses('PsychoInfo/V3/getRecommendPsycho.json', `psychoClassId=${this.nowIndex}&pageIndex=${this.page}&pageSize=${this.pageSize}&words=${this.words.trim()}`)

                if (data.code === 0) {
                    this.data = data.list
                    this.total = data.psychoCounts
                } else {
                    alert(data.msg)
                }

            },

            async searchExpert() {
                const data = await getResponses('PsychoInfo/V3/getRecommendPsycho.json', `pageIndex=${this.page}&pageSize=${this.pageSize}&words=${this.words.trim()}`)

                if (data.code === 0) {
                    this.data = data.list
                    console.log(data.list)
                    this.total = data.psychoCounts
                } else {
                    alert(data.msg)
                }

            },

        },

        filters: {
            sexType(tag) {
                let arr = ['未知', '男', '女']
                return arr[tag]
            }
        },

        ready() {
            // this.obtainRecommendData();
            this.getPsychoClassList(1);
        },


        watch: {
            page(){
                // this.getExpertsListByTagId();
            },
        }

    }
</script>

<style type="text/css" scoped>
    .searchList li{
        display: flex;
        align-items: center;
        margin: 10px 0;
        /*justify-content: space-around;*/
    }
    .searchList li img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 20px;
    }
    .searchList li p{
        margin: 0 20px;
        display: flex;
    }
    .searchList li p span{
        margin-left: 5px;
        /*width: 60px;*/
    }
    .searchList li p span:nth-child(2){
        /*width: 115px;*/
    }
    .modal-backdrop.in {
        z-index: 1001 !important;
    }

    .lh-span {
        display: inline-block;
        line-height: 30px;
    }
</style>

