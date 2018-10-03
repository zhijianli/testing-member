<template>



    <div class="container-fluid mid">

        <ul class="tagTit">
            <li @click.stop="switchS(item.pgId,item.groupName)" :class="{'show':pgId == item.pgId}" v-for="item in psychoGroups">



                <div class="pull-right">
                    <a class="tip" href="#" data-original-title="Delete" @click.stop="deleteGroup(item.pgId,item.groupName)"><i class="icon-remove"></i></a>
                </div>

                {{ item.groupName }}

            </li>
            <li @click="addNewGroup">新增分组</li>
        </ul>



        <ul class="tagCont">
            <li>
                <div class="row-fluid">
                    <div class="widget-box">
                        <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                            <h5>{{groupName}}</h5>
                        </div>
                        <div class="widget-content nopadding">

                            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                                <thead>
                                    <tr>
                                        <th class="span2">姓名</th>
                                        <th class="span1">手机</th>
                                        <th class="span1">进组日期</th>
                                        <th class="span1">EAP时长(分钟)</th>
                                        <th class="span1">已接EAP单数</th>
                                        <th class="span1">全部时长(分钟)</th>
                                        <th class="span1">已接单数</th>
                                        <th class="span1">EAP打分</th>
                                        <th class="span1">普通打分</th>
                                        <th class="span1">状态</th>
                                        <th class="span1">操作</th>
                                        <th class="span1">业务流水</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for='item in dataList'>
                                        <td>{{ item.nickname }}</td>
                                        <td>{{ item.phoneNum}}</td>
                                        <td>{{ item.createTime}}</td>
                                        <td>{{ (item.eapAdvisoryDuration/60).toFixed(0) }}分钟</td>
                                        <td>{{ item.eapAdvisoryTimes }}</td>
                                        <td>{{ (item.totalAdvisoryDuration/60).toFixed(0) }}分钟</td>
                                        <td>{{ item.totalAdvisoryTimes }}</td>
                                        <td>{{ item.eapScore }}</td>
                                        <td>{{ item.commonScore }}</td>
                                        <td>{{ item.isEnable |isEnableFilter }}</td>
                                        <td>
                                            <a href="javascript:;" @click="upload(item.pgmId,0)">启用</a>
                                            <a href="javascript:;" @click="upload(item.pgmId,1)">禁用</a>
                                            <a href="javascript:;" @click="upload(item.pgmId,2)">删除</a>
                                        </td>
                                        <td>
                                            <a href="javascript:;" @click="getDetail(item.mid)">查看</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div id="test" class="myPagenav">
                                <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
                            </div>

                            <div class="myBtn"  @click='asyncExcel'>导出记录</div>
                            <a href="javascript:;" v-el:a></a><!-- 导出此公司流水 -->

                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="widget-box">

                        <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                            <h5>添加</h5>
                        </div>

                        <div class="widget-content nopadding">
                            <div class="form-horizontal">

                                <input type="text" id="bbbb" value="" placeholder="请输入搜索内容" v-model='searchVal.words'/>
                                <input  class="input myInput" size="20" type="date"  v-model='searchVal.begin' placeholder="开始时间">
                                <input  class="input myInput" size="20" type="date"  v-model='searchVal.end' placeholder="结束时间">
                                <select class="mr20" id="regTimeDirection"   v-model='searchVal.regTimeDirection'>
                                    <option value="0">升序</option>
                                    <option value="1">降序</option>
                                </select>
                                <div class="myBtn"  @click='getSearchVal'>搜索</div>

                                <div class="widget-box">
                                    <div class="widget-content nopadding">
                                        <div class="control-group expertList">
                                            <label v-for="item in searchList" class="pointer">

                                                <div class="checkbox" style="display: inline-block;vertical-align: baseline;">
                                                    <input  type="checkbox"
                                                            class="checkboxInp"
                                                            name="title-table-checkbox"
                                                            :value="item.mid"
                                                            :id="item.mid"
                                                            :data-typeid="item.mid"
                                                            v-model="expertList"
                                                            >
                                                    <label class="checkboxLabel" for="item.mid"></label>
                                                </div>
                                                {{item.nickname}}

                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="test" class="myPagenav">
                                <zpagenav   :page="search_page",
                                            :page-size="search_pageSize",
                                            :total="search_total",
                                            :max-link="maxLink"
                                            :page-handler="search_pageHandler"
                                            :create-url="search_createUrl"
                                        >
                                <zpagenav>
                            </div>

                            <div class="myBtn "  @click='addToGroup'>添加到分组</div>



                        </div>

                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>

import {
    obtainPsychoGroupMemberList,    // 获取组内心理医师列表
    EAPobtainPsychoGroupListPGID,   // 获取专家分组
    enablePsychoGroupMembers,       // 启用/禁用组内成员
    removePsychosFromGroup,         // 从分组中移除咨询师
    addPsychoToGroup,               // 咨询师添加到分组
    getCounselorList,               // 搜索咨询师
    EAPaddPsychoGroup,              // 新增分组
    EAPremovePsychoGroup,           // 删除分组
    exportPsychoGroupMemberList,    // 导出组内心理医师
} from  "../../api"

import { serialize } from "../../utils"

import Vue from "vue"
import zpagenav from "vue-pagenav"

export default {
    components:{

    },
    data(){
        return {
            excelPath:"xxx",

            dataList:[],
            groupList:[], //企业列表 请求次数

            selectAll:false,
            expertList:[],
            // checkedList:[],
            psychoGroups:[], // 专家分组 (EAP&PGID)

            ids:"",         //专家ID
            pgId:"",        //分组ID
            groupName:"",    //分组名称


            searchVal:{
                begin:"",
                end:"",
                regTimeDirection:"0",
                words:"",
            },

            effectVal:{},

            searchList:[], //搜索得到的专家列表

            pageSize:10,
            page: 1,
            total: 10,

            maxLink: 10, //公用


            search_pageSize:36,
            search_page: 1,
            search_total: 10,
        }
    },
    watch:{
        // expertList(data){
        //    console.log(data)
        // },
        page(){
            this.obtainPsychoGroupMemberList()
        },
        pgId(){
            this.page = 1 //切换专家组时 => 分页
            this.obtainPsychoGroupMemberList()
        },
        search_page(){
            this.getCounselorList()
        }
    },
    methods:{
        deleteGroup(id,name){
            let conf = confirm(`您将删除：${name}`)
            if(conf){
                this.removePsychoGroup(id)
            }else{
                console.log('取消')
            }
        },
        addNewGroup(){
            let conf = prompt('请输入分组名','新增分组')

            if (conf!=null && conf!=""){
                this.addPsychoGroup(conf)

            }else{
                console.log('取消')
            }
        },
        switchS(pgId,groupName){

            this.pgId = pgId
            this.groupName = groupName
            // do thing
        },
        getSearchVal(){

            this.effectVal = {}

            if (this.searchVal.begin) {
                this.effectVal.begin = this.searchVal.begin.replace(/\//g, "-") + " 00:00:00"
            }

            if (this.searchVal.end) {
                this.effectVal.end = this.searchVal.end.replace(/\//g, "-") + " 00:00:00"
            }

            if (this.searchVal.regTimeDirection) {
                this.effectVal.regTimeDirection = this.searchVal.regTimeDirection
            }

            this.effectVal.words = this.searchVal.words  // 必填
            this.effectVal.isEnable = 0
            this.getCounselorList()



        },
        async getCounselorList(){

            this.effectVal.pageIndex = this.search_page
            this.effectVal.pageSize = this.search_pageSize

            let params = serialize(this.effectVal)
            console.log("-----params",params)
            let data = await getCounselorList(params)

            if( data.code == 0 ){

                this.searchList = data.psychoDTOs
                this.search_total = data.count
                data.psychoDTOs.forEach((item) => {   //checkBox
                    Vue.set(item, "checkState", false)
                })

            }else{
                alert(`errMsg:${data.msg}`)
            }
        },
        async addToGroup(){

            if( this.expertList.length > 0){

                let params = {
                    ids:this.expertList,
                    pgId:this.pgId
                }

                let data = await addPsychoToGroup(serialize(params))

                if(data.code === 0){
                    alert('添加成功')
                    this.expertList = []
                    this.obtainPsychoGroupMemberList()
                }else{
                    alert(`errMsg:${data.msg}`)
                }
            }else{
                alert('您未选中任何专家')
            }

        },
        // checkAll(){

        //     this.selectAll = !this.selectAll
        //     this.checkedList = []

        //     if(this.selectAll){  //  改 expertList

        //         this.dataList.forEach( (item,index,arr)=>{
        //             item.checkState = true
        //             this.checkedList.push(item.fid)
        //         })

        //     }else{

        //         this.dataList.forEach( (item,index,arr)=>{
        //             item.checkState = false
        //         })

        //     }
        //     console.log(`checkedList:${this.checkedList}`)
        // },
        getDetail(id){  //查看
            this.$route.router.go(`/EAPorders/${id}`)
        },
        async obtainPsychoGroupList(){ //默认第一个组   标题

            let data = await EAPobtainPsychoGroupListPGID()

            if(data.code === 0){
                this.psychoGroups = data.psychoGroups

                this.groupName    = data.psychoGroups[0].groupName
                this.pgId         = data.psychoGroups[0].pgId

            }else{
                alert(`errMsg:${data.msg}`)
            }
        },

        async obtainPsychoGroupMemberList(params = `pageSize=${this.pageSize}&pageIndex=${this.page}&pgId=${this.pgId}`){  //默认第一个组 内容

            let data = await obtainPsychoGroupMemberList(params)
            if( data.code == 0 ){
                this.dataList = data.pgmDTOs
                this.total    = data.count
            }else{
                this.dataList = []
                alert(`errMsg:${data.msg}`)
            }
        },

        async upload(id,tagNum){

            let data = ''

            if(tagNum == 0 || tagNum == 1){  // 0启用 1禁用
                data = await enablePsychoGroupMembers(`ids=${id}&isEnable=${tagNum}`)
            }else{  // 2 删除
                data = await removePsychosFromGroup(`ids=${id}`)
            }

            data.code == 0 ? this.obtainPsychoGroupMemberList():alert(`errMsg:${data.code}`)
        },



        async addPsychoGroup(name){  // 新增分组
            let data = await EAPaddPsychoGroup(`groupName=${name}`)
            if(data.code === 0){
                this.obtainPsychoGroupList()
            }else{
                alert(`errMsg:${data.msg}`)
            }
        },

        async removePsychoGroup(id){  // 删除分组
            let data = await EAPremovePsychoGroup(`pgId=${id}`)
            if(data.code === 0){
                this.obtainPsychoGroupList()
            }else{
                alert(`errMsg:${data.msg}`)
            }
        },
        async asyncExcel(){

            console.log("getFile")

            let a = this.$els.a
            let data = await exportPsychoGroupMemberList(`pgId=${this.pgId}`)
            let blob = new Blob([data],{'type': 'application/msexcel'})
            a.href = window.URL.createObjectURL(blob)
            this.groupName ? a.download = `${this.groupName}.xls` : 'excel.xls' ////////////////////
            a.click()

        },
        pageHandler: function(page) {
            this.page = page

        },
        createUrl: function(unit) {
            return unit.page > 1?'#page=' + unit.page:'#'
        },

        search_pageHandler: function(page) {
            this.search_page = page
        },
        search_createUrl: function(unit) {
            return unit.search_page > 1?'#search_page=' + unit.search_page:'#'
        },
    },
    filters:{
       isEnableFilter(num){
            let arr = ['启用','禁用']
            return arr[num]
       }
    },
    ready(){
        this.obtainPsychoGroupList()
        this.getSearchVal()
    }
}
</script>
