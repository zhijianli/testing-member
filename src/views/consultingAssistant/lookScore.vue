<template>
    <div class="container-fluid">
        <div id="search" class="title" style="margin-bottom: 20px">
            <div class="normal-div-ib">
                <span class="normal-span-mr">昵称/手机号：</span>
                <input type="text" name="searchUserTel" v-model="searchWord"/>
            </div>
            <div class="normal-div-ib">
                <span class="normal-span-mr">评分时间：</span>
                <time-range @ddd="ddd">
                </time-range>
            </div>
            <input type="submit" value="查询" class="btn btn-success" @click="search()" style="margin-right:50px;">
        </div>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0" style="width: 800px">
            <thead>
            <tr>
                <th style="width: 200px">昵称</th>
                <th>手机号</th>
                <th>用户评分</th>
                <th>评分时间</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in data">
                <td>{{item.nickname}}</td>
                <td>{{item.mobilePhone}}</td>
                <td>{{item.score}}</td>
                <td>{{item.createTime}}</td>
            </tr>

            </tbody>
        </table>
    </div>
    <!--分页-->
    <div class="order-page" v-if="total" style="display: flex;">
        <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
        </zpagenav>
    </div>
</template>
<script type="text/javascript">
    import timeRange from "components/timeRange"
    import moment from "moment"
    import {
        getResponse,
        getResponses,
    } from "../../api"
    import { serialize } from "../../utils"
    export default {

        data() {
            return {
                caid:window.location.pathname.split('/')[2],

                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                pageSize: 10,
                total: 0, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5


                data: [],
                searchWord:"",
                startTime: "",
                endTime: "",


            }
        },
        components:{
            timeRange
        },
        filters: {

        },
        methods: {
            async getScoreList(){
                let params={
                    pageIndex:this.page,
                    pageSize:this.pageSize,
                    caid:this.caid
                }
                if(this.searchWord){
                    params.words=this.searchWord.trim();
                }
                if(this.startTime){
                    params.begin=this.startTime
                }
                if(this.endTime){
                    params.end=this.endTime
                }
                let data= await getResponses("assistantConsult/selectScoreByCaid.json",serialize(params));
                if(data.code===0){
                    this.data=data.data;
                    this.total=data.count;
                }else{
                    alert(`err${data.msg}`)
                }
            },
//            搜索
            search(){
                this.getScoreList()
            },
            ddd(start, end) {
                if (start && start.length === 19) {
                    this.startTime = start
                } else {
                    this.startTime = ''
                }

                if (end && end.length === 19) {
                    this.endTime = end
                } else {
                    this.endTime = ''
                }
            },
            pageHandler: function(page) {
                this.page = page
                this.getScoreList()
            },
            createUrl: function(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },
        },

        ready() {
            this.getScoreList()
        }
    }
</script>
<style src="../../css/valetOrderForOrderList.css"  scoped>


    .select2-drop-active .select2-results .select2-highlighted {
        background: #446e9b;
    }


    .select2-drop {
        position: absolute;
        z-index: 9999;
        top: 100%;
        background: #fff;
        color: #000;
        border: 1px solid #aaa;
        border-top: 0;
        border-radius: 0 0 4px 4px;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
        box-sizing: border-box;
        /* min-width: 225px !important; */
        width: 184px;
        min-height: 50px;
    }

    .select2-results {
        max-height: 200px;
        padding: 0 0 0 4px;
        margin: 4px 4px 4px 0;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .select2-results li {
        list-style: none;
        display: list-item;
        background-image: none;
    }

    .select2-results li:hover {
        background-color: #446e9b;
        color: #fff;

    }

    .select2-results .select2-result-label {
        padding: 3px 7px 4px;
        margin: 0;
        cursor: pointer;
        min-height: 1em;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .select2-results .user-telphone {
        color: #999;
    }

    .userList_opeartion span {
        margin: 10px;
        cursor: pointer;
    }

    .modal_userList_cover {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 6;
    }

    .modal_userList_Wrap {
        width: 300px;
        /* height: 420px; */
        background-color: white;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, 0);
        border: 1px solid black;
    }

    .modal_userList_Wrap_title {
        height: 60px;
        background-color: rgb(240, 240, 240);
        line-height: 60px;
        text-indent: 2em;
    }

    .modal_userList_Wrap ul {
        /* padding:0 10px 0 20px; */
    }

    .modal_userList_Wrap ul li span {
        display: inline-block;
        line-height: 40px;
    }

    .modal_userList_box_left_span {
        width: 100px;
        text-indent: 2em;
    }

    .modal_userList_Wrap_bottom {
        height: 60px;
        background-color: rgb(240, 240, 240);
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .modal_userList_Wrap_bottom span {
        cursor: pointer;
        display: inline-block;
        height: 30px;
        width: 70px;
        background-color: white;
        line-height: 30px;
        margin: 10px;
        text-align: center;
    }

    .modal_userList_Wrap_bottom_rightBtn {
        color: red;
    }


    .telInp {
        border: 1px solid rgb(169, 169, 169);
        margin-bottom: 0;
    }

    .modal_userList_Wrap ul li .modal_userList_box_left_span_text {
        line-height: 20px;
        color: red;
    }

    .modal_userList_Wrap ul li .modal_userList_box_left_span_text2 {
        line-height: 20px;
        color: green;
    }


</style>
