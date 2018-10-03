<template>


    <div class="container-fluid mid">

        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                    <h5>操作栏</h5>
                </div>
                <div class="widget-content nopadding">

                    <div id="search" class="title">
                        <input type="text" value="" placeholder="请输入关键词"  v-model="searchVal.words"/>
                        <div class="myBtn"  @click='getSearchVal'>搜索</div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                    <h5>公司列表</h5>
                </div>

                <div class="widget-content nopadding">
                    <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                        <thead>
                            <tr>
                                <th class="span2">ID</th>
                                <th class="span1">LOGO</th>
                                <th class="span3">名称</th>
                                <th class="span2">创建时间</th>
                                <th class="span1">企业联系人</th>
                                <th class="span2">企业联系人电话</th>
                                <th class="span1">服务状态</th>
                                <th class="span1">用户数量</th>
                                <th class="span1">状态</th>
                                <th class="span1" style="width: 140px">操作</th>
                                <th class="span1">内容封闭</th>
                                <th class="span1">允许使用平台文章</th>
                                <th class="span1">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='item in dataList'>
                                <td>{{item.eeId}}</td>
                                <td><img :src="imgPre + '/'+ item.logoPreviewRel" class="listImg"></td>
                                <td>{{item.name}}</td>
                                <td>{{item.createTime}}</td>
                                <td>{{item.contacts}}</td>
                                <td>{{item.contactsPhoneNum}}</td>
                                <td>{{item.serviceStatus | serviceStatusFilter}}</td>
                                <td>{{item.employeeAmount}}</td>
                                <td>{{item.isEnable |isEnableFilter }}</td>
                                <td>
                                    <a href="javascript:;" v-show="item.isEnable === 0" @click="upload(item.eeId,1)">终止</a>
                                    <a href="javascript:;" v-show="item.isEnable === 1" @click="upload(item.eeId,0)">启用</a>
                                    <a href="javascript:;" @click="upload(item.eeId,2)">编辑</a>
                                    <a href="javascript:;" @click="upload(item.eeId,3)">员工</a>
                                    <a href="javascript:;" @click="loginFn(item.eeId)">登录</a>
                                    <a href="javascript:;" @click="pushFn(item.eeId,item.name)">测试推送</a>
                                </td>
                                <td>
                                    <span style="color:rgb(153, 153, 153);margin-right: 8px;" v-if="item.isOpened === 0">已开放</span>
                                    <span style="color:rgb(153, 153, 153);margin-right: 8px;" v-if="item.isOpened === 1">已封闭</span>

                                    <a href="javascript:;" @click="changeOpenState(item.eeId, 1, item.name)" style="color:red;" v-if="item.isOpened === 0">封闭</a>
                                    <a href="javascript:;" @click="changeOpenState(item.eeId, 0, item.name)" style="color:red;" v-if="item.isOpened === 1">开放</a>

                                </td>
                                <td>
                                    <span style="color:rgb(153, 153, 153);margin-right: 8px;" v-if="item.xmArticle === 0">已开放</span>
                                    <span style="color:rgb(153, 153, 153);margin-right: 8px;" v-if="item.xmArticle === 1">已封闭</span>

                                    <a href="javascript:;" @click="changeXmArticle(item.eeId, 1, item.name)" style="color:red;" v-if="item.xmArticle === 0">封闭</a>
                                    <a href="javascript:;" @click="changeXmArticle(item.eeId, 0, item.name)" style="color:red;" v-if="item.xmArticle === 1">开放</a>

                                </td>
                                <td>
                                    <a href="javascript:;" @click="deleteCompent(item.eeId)" style="color:red;">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div id="test" class="myPagenav">
                        <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
                    </div>

                    <div class="myBtn myBtnRight"  @click='add'>新增</div>

                </div>

            </div>
        </div>
        <div class="modal-backdrop in" v-if="eapLogin"></div>
        <div id="reset" class="modal" v-if="eapLogin">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click=" eapLogin = false ">×</button>
                <h3>登录</h3>
            </div>
            <div class="modal-body">
                <p>你确定登录eap平台吗？</p>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click=" eapLogin = false ">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configLogin">确定</a>
            </div>
        </div>

        <div class="modal-backdrop in" v-if="changeState"></div>
        <div id="reset" class="modal" v-if="changeState">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click=" changeState = false ">×</button>
                <h3></h3>
            </div>
            <div class="modal-body">
                <p>你确定【{{ isCloseState[isCloseStateNum] }} 企业———— {{ eapBusinessName }}】吗？</p>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click=" changeState = false ">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configChangeOpenState">确定</a>
            </div>
        </div>

        <div class="modal-backdrop in" v-if="XmArticle"></div>
        <div id="reset" class="modal" v-if="XmArticle">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click=" XmArticle = false ">×</button>
                <h3></h3>
            </div>
            <div class="modal-body">
                <p>你确定【{{ isCloseState[isCloseStateNum] }} 企业———— {{ eapName }}】吗？</p>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click=" XmArticle = false ">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configChangeXmArticle">确定</a>
            </div>
        </div>
        <!--删除企业-->
        <div class="modal-backdrop in" v-if="deleteCom"></div>
        <div id="reset" class="modal" v-if="deleteCom">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click=" deleteCom = false ">×</button>
                <h3></h3>
            </div>
            <div class="modal-body">
                <p>你确定删除吗？</p>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click=" deleteCom = false ">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDeleteCom()">确定</a>
            </div>
        </div>



    </div>



</template>
<script>

import {
    EAPobtainEnterpriseList, //列表
    EAPenableEnterprise,     //启用 禁用

    getResponse,
    getResponses,
} from  "../../api"

import { serialize } from "../../utils"

import Vue from "vue"
import zpagenav from "vue-pagenav"
import qiniu from "../../qiniu.vue"

export default {

    // props:['imgPre'],
    data(){
        return {
            imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
            searchVal:{
                words:""
            },

            effectVal:{},

        	dataList:[],

            pageSize:15,

        	page: 1,
            total: 10,
            maxLink: 10,
            eapLogin:false,
            eeId:"",
            isCloseState: ['开放', '封闭'],
            changeState: false,
            isCloseStateNum: '',
            eapBusinessName: '',
            XmArticle:false,
            eapName:"",
            deleteeeId:"",
//            删除弹框
            deleteCom:false

        }
    },
    watch:{

    },
    events:{
        'imgParameter':function(obj,eventName){
            this[eventName] = obj[eventName].imgPath
        }
    },
    methods:{
        deleteCompent(eeId){
          this.deleteeeId=eeId;
          this.deleteCom=true;
        },
//        删除企业
        async configDeleteCom(){
            let data = await getResponses(`EapEnterprise/deleteEnterprise.json`, `eeId=${this.deleteeeId}`);
            if(data.code===0){
                this.deleteCom=false;
                this.getData();
            }
        },
        pushFn(eeId,name){
            this.$dispatch('child-msg', name)
            this.$route.router.go(`/EapTestPush/${eeId}`)
        },
        loginFn(eeId){
            this.eapLogin = true
            this.eeId = eeId
        },

        configLogin() {
            // window.location.href="http://eap.120xinmao.com?eeId="+ this.eeId ;
            window.open("http://eap.120xinmao.com?eeId="+ this.eeId,'_blank')
            this.eapLogin = false
        },


        getSearchVal(){

            this.effectVal = {}

            if (this.searchVal.words) {
                this.effectVal.words = this.searchVal.words
                this.getData()
            }else{
                alert('请输入关键词')
            }

        },
        async getData(){

        	this.effectVal.pageIndex = this.page
            this.effectVal.pageSize = this.pageSize

        	let params = serialize(this.effectVal)

        	let data = await EAPobtainEnterpriseList(params)
            if( data.code == 0 ){

                // data.eeDTOs.forEach((item) => {   //checkBox
                //     Vue.set(item, "checkState", false);
                // })

        		this.dataList = data.eeDTOs

                // this.dataList.
        		this.total = data.count
            }else{
                alert(`errMsg:${data.msg}`)
            }
        },
        async upload(id,tag){
            if(tag == 0 || tag == 1){
                // ids 企业id（eeId）  number
                // isEnable    0启用 1禁用 number
                console.log(`操作 tag:${tag}`)

                let data = await EAPenableEnterprise(`ids=${id}&isEnable=${tag}`)

                if(data.code == 0){
                    this.getData()
                }else{
                    alert(`errMsg:${data.msg}`)
                }
            }
            if(tag == 2){
                // 编辑 无接口
                this.$route.router.go(`/customerUpload/${id}`)
            }
            if(tag == 3){
                this.$route.router.go(`/customerManage/${id}`)
            }
        },
        pageHandler: function(page) {
        	this.page = page
        	this.getData()
        },
        createUrl: function(unit) {
        	return unit.page > 1?'#page=' + unit.page:'#'
        },
        add(){
            this.$route.router.go("/customerAdd")
        },

        changeOpenState(eeId, state, name) {
            this.eeId = eeId
            this.isCloseStateNum = state
            this.eapBusinessName = name
            this.changeState = true
        },
        changeXmArticle(eeId, state, name) {
            this.eeId = eeId
            this.isCloseStateNum = state
            this.eapName = name
            this.XmArticle = true
        },

        async configChangeOpenState() {


            let data = await getResponses(`EapEnterprise/closeEnterprise.json`, `ids=${this.eeId}&isClose=${this.isCloseStateNum}`)

            if (data.code === 0) {

//                this.$toast("已成功" + isCloseState[this.isCloseStateNum])

                this.changeState = false

                this.getData()
            } else {
                alert(data.msg)
            }

        },
        async configChangeXmArticle(){
            let data = await getResponses(`Article/openXmArticle.json`, `eeId=${this.eeId}&xmArticle=${this.isCloseStateNum}`)

            if (data.code === 0) {

//                this.$toast("已成功" + isCloseState[this.isCloseStateNum])

                this.XmArticle = false

                this.getData()
            } else {
                alert(data.msg)
            }
        }
    },
    filters:{
        serviceStatusFilter(num){
            let chargeWayArr = ['被禁止','未开始','服务中','已结束']
            return chargeWayArr[num]
        },
        isEnableFilter(num){
            let chargeWayArr = ['启用','终止']
            return chargeWayArr[num]
        }
    },
    ready(){
        // alert(this.imgPre)
        this.getData()
    }
}
</script>












































