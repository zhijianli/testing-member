<template>


    <div class="container-fluid mid">

        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                    <h5>{{providerName}}</h5>
                </div>
                <div class="widget-content nopadding">
                    <div class="form-horizontal">
                        <div class="control-group">
                            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                                <thead>
                                    <tr>       
                                        <th class="span1">订单id</th>
                                        <th class="span1">求助者类型</th>
                                        <th class="span1">求助者电话</th>
                                        <th class="span1">专家电话</th>
                                        <th class="span1">拨打时间</th>
                                        <th class="span1">拨打时长</th>
                                        <th class="span1">EAP用户评分</th>
                                        <th class="span1">求助者实付</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for='item in dataList'>
                                        <td>{{item.soid}}</td>
                                        <td>{{item.orderType | orderTypeFilter}}</td>
                                        <td>{{item.customerPhone}}</td>
                                        <td>{{item.providerPhone}}</td>
                                        <td>{{item.serviceBeginTime}}</td>
                                        <td>{{ (item.practicalDuration /60).toFixed(0)}}分钟</td>
                                        <td>{{item.evaluationScore}}</td>
                                        <td>{{item.cashAmount}}</td>
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
            </div>
        </div>
    </div>
</template>
<script>
import { obtainPsychoOrderList,exportPsychoOrderList } from  "../../api"  
import { serialize } from "../../utils"

import Vue from "vue"
import zpagenav from "vue-pagenav"

export default {
    components:{

    },
    data(){
        return {

            ID:'',
            providerName:'',

            searchVal:{
                keyWord:''
            },

            effectVal:{},   

        	dataList:[],	

            pageSize:15,

        	page: 1, 	
            total: 10, 	
            maxLink: 10
        }
    },
    watch:{

    },
    route:{
        data(){
            this.ID = this.$route.params.id
            console.log(`this.ID：${this.ID}`)
        }
    },
    methods:{

        getSearchVal(){

            this.effectVal = {}

            if (this.searchVal.keyWord) {
                this.effectVal.keyWord = this.searchVal.keyWord
            }

        	this.getData()
        },
        async getData(){
        	let data = await obtainPsychoOrderList(`pageIndex=${this.page}&pageSize=${this.pageSize}&pid=${this.ID}`)
            if( data.code == 0 ){
        		this.dataList = data.soDTOs
        		this.total = data.count
                data.soDTOs.length > 1 ? this.providerName = data.soDTOs[0].providerName : ''
                
            }else{
                alert(`errMsg:${data.msg}`)
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
        async asyncExcel(){

            console.log("getFile")

            let a = this.$els.a
            let data = await exportPsychoOrderList(`pid=${this.ID}`)
            let blob = new Blob([data],{'type': 'application/msexcel'})
            a.href = window.URL.createObjectURL(blob)

            this.providerName ? a.download = `${this.providerName}.xls` : 'excel.xls'
            a.click()

        },
    },
    filters:{
        statusFilter(num){
            let chargeWayArr = ['已开始','未开始','已结束']
            return chargeWayArr[num]
        },
        orderTypeFilter(num){
            let arr = ['普通','EAP']
            return arr[num]
        }
    },
    ready(){
        this.getData()
    }
}
</script>




	







































