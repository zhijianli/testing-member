<template>
    <div class="row-fluid">
        <div class="widget-box">

            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                <h5>推荐测试表库</h5>
                <div class="myBtn btn-warning" style="line-height: 36px;margin-left: 50px" @click="pushTest()">推送测试</div>
            </div>

            <div class="widget-content nopadding">
                <div class="form-horizontal">
                    <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                        <thead>
                        <tr>
                            <th>
                                <!--<div class="checkbox">-->
                                    <!--<input type="checkbox" id="uniform-title-table-checkbox" class="checkboxInp" name="title-table-checkbox">-->
                                    <!--<label for="uniform-title-table-checkbox" class="checkboxLabel"></label>-->
                                <!--</div>-->
                            </th>
                            <th>问卷id</th>
                            <th>问卷类别</th>
                            <th>问卷名称</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for='item in dataList' :class=" this.operateId == item.id ? 'check textGreen':'check'">
                            <td>
                                <div class="checkbox">
                                    <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp" name="title-table-checkbox"
                                           :value="item.id" v-model="checkboxList"
                                    >
                                    <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                                </div>
                            </td>
                            <td>{{item.id}}</td>
                            <td>
                                <span v-for="v in item.tscList">{{v.name}}</span>
                            </td>
                            <td>{{item.name}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div id="test" class="myPagenav">
                    <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
                </div>
            </div>

        </div>
    </div>
</template>
<script type="text/javascript">
    import {getSources,getResponses} from  "../../api"
    import { serialize } from "../../utils"

    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    export default{
        data(){
            return{
                operateId:"", //修改传的typeId
                eeId:window.location.pathname.split('/')[2],
                pageSize:10,
                dataList:[],
                pushtestId:[],

                page: 1,        //pagepageSize: 10 //pageSize,  default is 10   左分页
                total:0,  //total item count
                maxLink: 10,    //how many links to show, must not less than 5,  default is 5
                checkboxList:[],
            }
        },
        methods:{
//            获取测试列表
            async getTestList(){
                let data=await getSources("/testCenter/testScaleInfo/getAllMessage",`pageIndex=${this.page}&pageSize=${this.pageSize}&isEnable=1`);
                if(data.code===0){
                    this.dataList=data.contentList;
                    this.total=data.testScaleNum;

                    this.getTestPush();
                }
            },
//            获取高校推送的测试
            async getTestPush(){
                let that=this;
                let data=await getResponses("EnterpriseTestscaleinfo/getEnterpriseTestscaleinfo.json",`eeId=${this.eeId}`);
                if(data.code===0){
                    data.list.forEach(function (v,i) {
                        that.dataList.forEach(function (value,index) {
                            if(value.id===v.testinfoId){
                                that.checkboxList.push(v.testinfoId)
                            }
                        })

                    })
                }
            },
//            推送测试
            async pushTest(){
                if(this.checkboxList.length===0){
                    alert("请选择要推送的测试量表！")
                }else{
                    var testinfoId=[];
                    this.checkboxList.forEach(function (v,i) {
                        testinfoId.push(v)
                    })
                    let data =await getResponses("EnterpriseTestscaleinfo/save.json",`eeId=${this.eeId}&testinfoId=${testinfoId.join(',')}`);
                    if(data.code===0){
                        this.checkboxList=[];
                        alert("推送成功");
                        this.getTestPush();
                    }else{
                        alert(`errMsg:${data.msg}`);
                    }
                }
            },
            pageHandler: function(page) {
                this.page = page;
                this.getTestList();
            },
            createUrl: function(unit) {
                return unit.page > 1?'#page=' + unit.page:'#'
            },
        },
        ready(){
            this.getTestList();
        }
    }
</script>