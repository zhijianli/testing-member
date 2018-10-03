<template>
    <div class="container-fluid">
        <div id="search" class="title">
            账号：
            <input type="text" name="words" placeholder="请输入搜索内容" v-model="words">
            状态：
            <select v-model="selectState" name="infoChannel">
                <option value="2">全部</option>
                <option value="0">已启用</option>
                <option value="1">已禁用</option>
            </select>
            <input type="submit" value="查询" class="btn btn-success" @click="searchFn()">
         </div>
        <button class="btn btn-success" style="margin: 10px 0"><a href="javascript:;" style="color:white;" @click="addPhone=true">新增</a></button>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0" style="width: 1500px">
            <thead>
            <tr>
                <th>账号</th>
                <th>昵称</th>
                <th>在线状态</th>
                <th>联系电话</th>
                <th style="width: 500px">简介</th>
                <th>已帮助人数</th>
                <th>用户打分</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in assistantList">
                <td>{{item.userAccount}}</td>
                <td>{{item.nickname}}</td>
                <td>{{item.status|status}}</td>
                <td>{{item.mobilePhone}}</td>
                <td>{{item.profile}}</td>
                <td>{{item.serviceNum}}</td>
                <td>{{item.score}}</td>
                <td>{{item.isEnable|isEnable}}</td>
                <td>
                    <span class="normal-operate-state" @click="openorclose(item.caid,item.isEnable,item.nickname,item.mobilePhone,item.profile)">{{item.isEnable|isEnable2}}</span>
                    <span class="normal-operate-state" @click="changeRouter(item.caid)">查看打分情况</span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
<!--分页-->
    <div class="order-page" v-if="total" style="display: flex;">
        <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
        </zpagenav>
    </div>
    <!--增加手机号-->
    <div class="modal_userList_cover" v-if="addPhone">
        <div class="modal_userList_Wrap">
            <div class="modal_userList_Wrap_title">
                添加咨询助理
            </div>
            <div style="margin: 20px 10px">
                账号（手机号）    <input type="text" v-model="assAcount">
            </div>
            <div class="modal_userList_Wrap_bottom">
                <span class="modal_userList_Wrap_bottom_rightBtn" @click="addPhone=false" style="color: #333">取消</span>
                <span class="modal_userList_Wrap_bottom_rightBtn" @click="addAssistant()" style="color: #333">确认</span>
            </div>
        </div>
    </div>

</template>
<script type="text/javascript">
    import {getResponse,getResponses} from "../../api"
    import pages from "vue-pagenav"
    import { serialize } from "../../utils"
    export default {
        data(){
            return{
                pageCount: 10,
                page: 1,
                pageSize: 10,
                total: 0,
                maxLink: 0,

                selectState:2,//启用禁用状态
                addPhone:false,
                assAcount:"",//增加的手机号
                words:"",//搜索字段
                assistantList:[], //咨询助理列表
            }
        },
        components: {
            pages,
        },
        filters: {
            status(value) {
                if (value === 0) {
                    return '不在线'
                } else {
                    return '在线'
                }
            },
            isEnable(value){
                if(value===0){
                    return "已启用"
                }else{
                    return "已禁用"
                }
            },
            isEnable2(value){
                if(value===1){
                    return "启用"
                }else{
                    return "禁用"
                }
            }
        },
        methods:{
            changeRouter(id){
                this.$dispatch('child-msg',"查看打分详情");
                this.$route.router.go(`/consultingAssistant/${id}`);
            },
//            获取咨询助理列表
            async getAssistant(){
                let params={
                    pageIndex:this.page,
                    pageSize:this.pageCount,
                }
                if(this.words){
                    params.userAccount=this.words
                }
                if(this.selectState!=2){
                    params.isEnable=this.selectState
                }

                let data= await getResponses("assistantConsult/selectConsultAssistant.json",serialize(params));
                if(data.code===0){
                    this.assistantList=data.data;
                    this.total=data.count;
                }else{
                    alert(`err${data.msg}`)
                }
            },
//            增加咨询师助理
            async addAssistant(){
                let data= await getResponses("assistantConsult/createConsultAssistant.json",`userAccount=${this.assAcount}`);
                if(data.code===0){
                    this.addPhone=false;
                    this.getAssistant();
                }else if(data.code===101){
                    alert(data.msg)
                }else{
                    alert(`err${data.msg}`)
                }
            },
//            搜索
            searchFn(){
                this.page=1;
                this.getAssistant();
            },
//            启用或者禁用
            async openorclose(id,state,nickname,mobilePhone,profile){
                if(nickname===null||mobilePhone===null||profile===null){
                    alert("请先补全资料，才可以启用")
                }else{
                    let params={
                        caid:id,
                    }
                    if(state==0){
                        params.isEnable=1
                    }else if(state==1){
                        params.isEnable=0;
                    }
                    let data= await getResponses("assistantConsult/updateIsEnable.json",serialize(params));
                    if(data.code===0){
                        this.getAssistant();
                        if(state==0){
                            alert(`已禁用成功`)
                        }else if(state==1){
                            alert(`已启用成功`)
                        }
                    }else{
                        alert(`err${data.msg}`)
                    }
                }

            },
            pageHandler: function(page) {
                this.page = page
                this.getAssistant()
            },
            createUrl: function(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },

        },
        ready(){
            this.getAssistant()
        }
    }
</script>
<style scoped>
    .rec{
        visibility: visible;
        display:inline-block;
    }
</style>