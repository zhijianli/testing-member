<template>



    <div class="container-fluid mid">

            <div class="row-fluid">
                <div class="widget-box">
                    <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                        <h5>操作栏</h5>
                    </div>
                    <div class="widget-content nopadding">

                        <input type="file" style="display: none;" @change="sendFile" v-el:file v-if="fileState">

                        <ul class="tagTit" style="display: inline-block;vertical-align: top;">
                            <li @click.stop="switchS(0)" :class="{'show':whichTag == 0}" >重新导入</li>
                            <li @click.stop="switchS(1)" :class="{'show':whichTag == 1}" >部分导入</li>
                            <li @click.stop="asyncExcel">导出此公司流水</li>
                        </ul>
                        <a href="javascript:;" v-el:a></a><!-- 导出此公司流水 -->

                        <div id="search" class="title" style="display: inline-block;vertical-align: top;">
                            <input type="text" value="" placeholder="请输入关键词"  v-model="searchVal.words"/>
                            <div class="myBtn"  @click='getSearchVal'>搜索</div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row-fluid">
                <div class="widget-box">
                    <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                        <h5>员工列表</h5>
                    </div>
                    <div class="widget-content nopadding">

                        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                            <thead>
                                <tr>
                                    <th class="span1">姓名</th>
                                    <th class="span1">手机号码</th>
                                    <th class="span1">已咨询时长（分钟）</th>
                                    <th class="span1">已咨询单数</th>
                                    <th class="span1">状态</th>
                                    <th class="span1">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for='item in dataList'>
                                    <td>{{item.name}}</td>
                                    <td>{{item.phoneNum}}</td>
                                    <td>{{ (item.eapAdvisoryDuration/60).toFixed(0)}}分钟</td>
                                    <td>{{item.eapAdvisoryTimes}}</td>
                                    <td>{{item.isEnable |ableFilter}}</td>
                                    <td>
                                        <a href="javascript:;" @click="upload(item.eemId,0)">启用</a>
                                        <a href="javascript:;" @click="upload(item.eemId,1)">禁用</a>
                                        <a href="javascript:;" @click="upload(item.eemId,2)">删除</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div id="test" class="myPagenav">
                            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
                        </div>

                    </div>
                </div>
            </div>


    </div>
</template>
<script>

import {
    EAPobtainEmployeeList,
    EAPdeleteEmployee,
    EAPenableEmployee,
    EAPexportEmployee, //导出
}from  "../../api"

import { serialize } from "../../utils"

import Vue from "vue"
import zpagenav from "vue-pagenav"

export default {
    components:{

    },
    data(){
        return {

            ID:'', // 无ID
            wh:0, // 全部 0 部分 1
            effectVal:{},
            searchVal:{
                words:''
            },

            whichTag:0,

        	dataList:[],

            fileState:true,

            pageSize:15,

        	page: 1,
            total: 10,
            maxLink: 10,


        }
    },
    watch:{

    },
    route:{
        data(){
            if(this.$route.params.id){
                this.ID = this.$route.params.id
                console.log(`修改:${this.ID}`)
            }else{
                console.log(`新增`)
            }
        }
    },
    methods:{
        switchS(tagNum){

            this.whichTag  = tagNum
            this.whichFile(tagNum)

        },
        whichFile(type){

            this.wh = type
            if (type == 0) {
                let sendAll = confirm("重新导入会覆盖之前的列表")
                if(sendAll){
                    this.$els.file.click() //选择文件

                }else{
                    alert("未导入")
                }
            }else{
                this.$els.file.click()
            }
        },
        async sendFile(){
            console.log("sendFile")

            let excel =  this.$els.file,
            file      = excel.files[0]

            this.fileState = false



            this.fileExcel(file,this.ID,this.wh,(data) => {
                data.code == 0 ? alert('导入成功') : alert(`导入失败errMsg:${data.msg}`)
                this.getData()
                this.fileState = true
            })


        },
        fileExcel(files,id,wh,callback){  // 传excel  wh => 0全部  1部分
            let xhr = new XMLHttpRequest()
            let data = new FormData()

            data.append("excel", files)
            data.append("eeId", id)

            xhr.onload = function () {
                if (xhr.status === 200 && xhr.status < 300 || xhr.status === 304) {
                    try {
                        const data = JSON.parse(xhr.responseText)
                        callback(data)
                    } catch(e) {
                        console.log("数据失败")
                    }
                }
            }

            wh == 0 ? xhr.open("post", "/depression-web/EapEmployee/entireImportEmployee.json", true) : xhr.open("post", "/depression-web/EapEmployee/partialImportEmployee.json", true)
            xhr.send(data)
        },
        async upload(id,tagNum){
            console.log(id,tagNum)
            if(tagNum == 0 || tagNum == 1){
                console.log(`启用禁用${tagNum}`)
                let data = await EAPenableEmployee(`ids=${id}&isEnable=${tagNum}`)
                if(data.code == 0){
                    this.getData()
                }else{
                    alert(`errMsg:${data.msg}`)
                }

            }else{
                console.log(`删除${tagNum}`)
                let data = await EAPdeleteEmployee(`ids=${id}`)
                if(data.code == 0){
                    this.getData()
                }else{
                    alert(`errMsg:${data.msg}`)
                }
            }
        },
        getSearchVal(){

            this.effectVal = {}

            if (this.searchVal.words) {
                this.effectVal.words = this.searchVal.words
                this.getData()
            }else{
                alert('请输入关键词')
            }

            this.searchVal = {}

        },
        async getData(){

            this.effectVal.pageIndex = this.page
            this.effectVal.pageSize = this.pageSize
            this.effectVal.eeId = this.ID

            let params = serialize(this.effectVal)

            let data = await EAPobtainEmployeeList(params)
            if( data.code == 0 ){
                this.dataList = data.eemDTOs
                this.total = data.count
            }else{
                alert(`errMsg:${data.msg}`)
            }
        },
        async asyncExcel(){

            console.log("getFile")

            let a = this.$els.a
            let data = await EAPexportEmployee(`eeId=${this.ID}`)
            let blob = new Blob([data],{'type': 'application/msexcel'})
            a.href = window.URL.createObjectURL(blob)
            a.download = "excel.xls"
            a.click()

        },
        btnChancel(){
            this.$route.router.go("/customerList")
        },
        pageHandler: function(page) {
        	this.page = page
        	this.getData()
        },
        createUrl: function(unit) {
        	return unit.page > 1?'#page=' + unit.page:'#'
        },
    },
    filters:{
        ableFilter(state){
            let arr = ['启用','禁用']
            return arr[state]
        },
    },
    ready(){
        this.getData()
    }
}
</script>
