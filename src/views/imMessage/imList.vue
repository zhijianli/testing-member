<template>


    <div class="container-fluid mid">

        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                    <h5>操作栏</h5>
                </div>
                <div class="widget-content nopadding">
                    <div id="search" class="title">
                        <input type="text" value="" placeholder="请输入关键词"  v-model="searchVal.title"/>
                        <select v-model="searchVal.pushStatus" @change="getSearchVal">
                            <option  value="">全部</option>
                            <option  value="0">未推送</option>
                            <option  value="1">正在推送</option>
                            <option  value="2">已推送</option>
                        </select>
                        <div class="myBtn"  @click='getSearchVal'>搜索</div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                    <h5>消息列表</h5>
                </div>
                <div class="widget-content nopadding">
                    <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                        <thead>
                            <tr>
                                <th class="span1">消息ID</th>
                                <th class="span3">标题</th>
                                <th class="span1">发布时间</th>
                                <th class="span1">目前状态</th>
                                <th class="span1">渠道</th>
                                <th class="span1">发送后一周内点击数</th>
                                <th class="span1">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='item in dataList'>
                                <td class="span1">{{item.mpId}}</td>
                                <td class="span3" :title="item.title">{{item.title |titleFliter}}</td>
                                <td class="span1">{{item.pushTime}}</td>
                                <td class="span1">{{item.pushStatus | pushStatusFilter}}</td>
                                <td class="span1">{{item.pushType | pushTypeFilter}}</td>
                                <td class="span1">{{item.clickCount}}</td>


                                <!-- 推送状态( '':全部 0:未推送 1:正在推送 2:已推送 )  -->

                               <!-- <td class="span1" v-show="searchVal.pushStatus === ''">
                                    <a href="javascript:;" @click="editPush(item.mpId)">编辑</a>
                                    <a href="javascript:;" @click="cancelPush(item)">取消发送</a>
                                    <a href="javascript:;" @click="makePush(item)">启动发送</a>
                                </td> -->

                                <td class="span1" v-show="searchVal.pushStatus === '' && item.pushStatus == 0">
                                    <a href="javascript:;" @click="editPush(item.mpId)">编辑</a>
                                    <a href="javascript:;" @click="makePush(item)">启动发送</a>
                                </td>

                                <td class="span1" v-show="searchVal.pushStatus === '' && item.pushStatus == 1">
                                    <a href="javascript:;" @click="editPush(item.mpId)">编辑</a>
                                    <a href="javascript:;" @click="cancelPush(item)">取消发送</a>
                                </td>

                                <td class="span1" v-show="searchVal.pushStatus === '' && item.pushStatus == 2">
                                    <span class="textDisable">编辑</span>
                                    <span class="textDisable">取消发送</span>
                                    <span class="textDisable">启动发送</span>
                                </td>


                                <!-- -->

                                <td class="span1" v-show="searchVal.pushStatus === '0' ">
                                    <a href="javascript:;" @click="editPush(item.mpId)">编辑</a>
                                    <a href="javascript:;" @click="makePush(item)">启动发送</a>
                                </td>

                                <td class="span1" v-show="searchVal.pushStatus === '1' " class="textDisable">
                                    <a href="javascript:;" @click="editPush(item.mpId)">编辑</a>
                                    <a href="javascript:;" @click="cancelPush(item)">取消发送</a>
                                </td>

                                <td class="span1" v-show="searchVal.pushStatus === '2' " class="textDisable">
                                    <span class="textDisable">编辑</span>
                                    <span class="textDisable">取消发送</span>
                                    <span class="textDisable">启动发送</span>
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

    </div>
</template>
<script>
    import {
        messagePushobtainMsgPushList, //列表
        messagePushcancelMsgPush, //取消发送
        messagePushstartMsgPush, // 确定发送
    } from "../../api"

    import {
        serialize
    } from "../../utils"

    import Vue from "vue"
    import zpagenav from "vue-pagenav"

    export default {
        components: {

        },
        data() {
            return {

                searchVal: {
                    title: '', //标题关键字
                    pushStatus: '', // 推送状态( '':全部 0:未推送 1:正在推送 2:已推送 )
                },


                dataList: [],

                pageSize: 10,

                page: 1,
                total: 10,
                maxLink: 10
            }
        },
        watch: {
            'searchVal.pushStatus':function() {
                this.page = 1
            }
        },
        methods: {

            getSearchVal() {
                this.getData()
            },
            async getData() {

                this.searchVal.pageIndex = this.page
                this.searchVal.pageSize = this.pageSize

                !!this.searchVal.title ? '' : delete this.searchVal.title

                let params = serialize(this.searchVal)

                let data = await messagePushobtainMsgPushList(params)
                if (data.code == 0) {
                    this.dataList = data.messagePushDTOs
                    this.total = data.count
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            editPush(mpId) {
                console.log(`/imCont/${mpId}`)
                this.$route.router.go(`/imCont/${mpId}`)
            },
            //  0:未推送 1:正在推送 2:已推送
            async cancelPush(obj) {
                if(obj.pushStatus == 0){
                    alert('该条未推送')
                }else{

                    if(this.timeJudge(obj.pushTime)){
                        console.log('取消')
                        let data = await messagePushcancelMsgPush(`mpId=${obj.mpId}`)
                        data.code == 0 ? this.getSearchVal() : alert(`errMsg:${data.msg}`)
                    }else{
                        console.log('取消')
                        alert('取消发送 操作已经过期')
                    }
                }
            },
            async makePush(obj) {
                if(obj.pushStatus ==0){

                    if(this.timeJudge(obj.pushTime)){
                        console.log('发送')
                        let data = await messagePushstartMsgPush(`mpId=${obj.mpId}`)
                        data.code == 0 ? this.getSearchVal() : alert(`errMsg:${data.msg}`)
                    }else{
                        console.log('发送')
                        alert('确定发送 操作已经过期')
                    }

                }else{
                    alert('该条已启动推送')
                }
            },
            timeJudge(pushTime){   // '2017-03-15 18:37:39'

                let bool = ''

                let now = new Date(),
                    // item = new Date(`${pushTime}`)
                    item = new Date(pushTime)

                if(now.getTime() < item.getTime()){
                    bool = true
                }else{
                    bool = false
                }
                return bool
            },
            pageHandler: function(page) {
                this.page = page
                this.getData()
            },
            createUrl: function(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },
            add() {
                this.$route.router.go("/imCont")
            }
        },
        filters: {
            pushStatusFilter(num) {
                let arr = ['未推送', '正在推送', '已推送']
                return arr[num]
            },
            pushTypeFilter(num) {
                let arr = ['全部', 'IM', 'PUSH']
                return arr[num]
            },
            titleFliter(title){
                let len = title.length
                if(len>40){
                    title = title.substr(0,40) + '...'
                }

                return title
            }
        },
        ready() {
            this.getData()
        }
    }
</script>

<style scope>
    .textDisable{
        color: #CDCDCD;
    }
</style>
