<template>


    <!-- ///////////////////////////////////////////////////////////////////// -->
    <div class="container-fluid mid">
        <div id="search" class="title">
            <input type="text" id="bbbb" value="" placeholder="请输入问卷类别" v-model='searchVal.words'/>
            <div class="myBtn" @click='getSearchVal'>搜索</div>
        </div>
        <!-- ///////////////////////////////////////////////////////////////////// -->
        <div class="widget-box" style="margin-top:0px;">
            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                <thead>
                <tr>
                    <th>
                        <div class="checkbox">
                            <input type="checkbox" id="uniform-title-table-checkbox" class="checkboxInp"
                                   name="title-table-checkbox">
                            <label for="uniform-title-table-checkbox" class="checkboxLabel"></label>
                        </div>
                    </th>
                    <th class="span1">序号</th>
                    <th>问卷名称</th>
                    <th>问卷类别</th>
                    <th class="span2">是否禁用</th>
                    <th class="span1">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for='item in dataList' :class=" this.operateId == item.typeId ? 'check textGreen':'check'">
                    <td>
                        <div class="checkbox">
                            <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp"
                                   name="title-table-checkbox"
                                   :value="item.typeId" v-model="checkboxList"
                            >
                            <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                        </div>
                    </td>
                    <td>{{$index + 1}}</td>
                    <td>{{item.testingName}}</td>
                    <td>{{item.tsType | tsTypeFilter}}</td>
                    <td>{{item.isEnable | statusFilter}}</td>
                    <!--<td>{{item.isDelete | statusFilter}}</td>-->
                    <td class="pointer" @click='clearing(item.typeId,item.testingName,item.tsType)'>修改</td>
                    <!-- <td class="pointer" @click='clearing(item.typeId)'>修改</td> -->
                </tr>
                </tbody>
            </table>
        </div>
        <div id="test" class="myPagenav">
            <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"
                      :page-handler="pageHandler" :create-url="createUrl">
                <zpagenav>
        </div>
        <div class="myBtn myBtnRight btn-warning" @click='clearingBtn(0)'>新增</div>
        <div class="myBtn myBtnRight btn-info" @click='clearingBtn(1)'>禁用</div>
        <div class="myBtn myBtnRight btn-inverse" @click='clearingBtn(2)'>启用</div>
    </div>


    <div id="myAlert" class="modal {{drop.dropState}}">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click='closeDrop(1)'>×</button>
            <h3>反馈内容</h3>
        </div>

        <div class="modal-body" v-if='drop.whichWindow'>
            <div class="my-control-group">
                <label class="my-control-label">问卷类别名称 :</label>
                <div class="controls form-horizontal inlineblock">
                    <input type="text" class="span11 typeName" placeholder="请输入问卷类别名称" v-model="drop.name">
                </div>
            </div>
            <div class="my-control-group">
                <label class="my-control-label">问卷类别 :</label>
                <div class="controls form-horizontal inlineblock">
                    <!-- <select class="my-selectPopup" name="eidtdptId" value="{{ drop.option }}" v-model="drop.option" > -->
                    <select class="my-selectPopup" name="eidtdptId" v-model="drop.option">
                        <option value="0">专业测试</option>
                        <option value="1">趣味测试</option>
                        <option value="2">学生测试</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="modal-body" v-else>
            <div class="my-control-group">
                <label class="my-control-label">你确定要{{drop.windowTest}}？</label>
            </div>
        </div>


        <div class="modal-footer">
            <a data-dismiss="modal" class="btn btn-danger" href="#" @click='closeDrop(0)'>确定</a>
            <a data-dismiss="modal" class="btn btn-danger" href="#" @click='closeDrop(1)'>取消</a>
        </div>
    </div>
    <div class="modal-backdrop {{drop.dropState}}"></div>
</template>
<script>
    import {testingTypeList, testingTypeChangeStatus, testingTypeAdd, testingTypeUpdate} from  "../../api"
    import {serialize} from "../../utils"

    import Vue from "vue"
    import zpagenav from "vue-pagenav"

    export default {
        components: {},
        data(){
            return {
                eeId: 0,

                checkboxList: [], //选中的checkBox

                operateId: "", //修改传的typeId

                drop: {  //弹窗
                    dropState: 'hide', /*弹窗状态*/
                    name: "",   //弹窗输入框
                    option: "", //弹窗下拉选择
                    windowTest: "",  //禁用or启用
                    whichWindow: "", //哪个弹窗
                    requst: "",//点击确定后请求哪个链接  0新增   1  2 启用禁用 3修改
                },

                searchVal: {
                    words: "",
                },
                effectVal: {},


                pageSize: 10,
                dataList: [],


                page: 1, 		//pagepageSize: 10 //pageSize,  default is 10   左分页
                total: 10, 	//total item count
                maxLink: 10,	//how many links to show, must not less than 5,  default is 5
            }
        },
        watch: {},
        methods: {
            clearing(operateId, name, type){  //弹窗
                this.drop.whichWindow = true
                this.operateId = operateId
                this.drop.dropState = 'in'
                this.drop.name = name
                this.drop.requst = 3  //修改接口
                this.drop.option = type
            },
            clearingBtn(num){
                if (num == 1 || num == 2) {
                    //66666666666666666
                    if (this.checkboxList.length == 0) {
                        alert('前先选择')
                    } else {
                        this.drop.whichWindow = false
                        if (num == 1) {
                            this.drop.windowTest = "禁用"
                        } else {
                            this.drop.windowTest = "启用"
                        }
                        this.drop.requst = 1  //启用禁用接口
                        this.drop.dropState = 'in'
                    }
                } else {
                    this.drop.whichWindow = true
                    this.drop.requst = 0  //新增接口
                    this.drop.dropState = 'in'
                }
                // this.drop.dropState = 'in'
            },
            closeDrop(then){  //关弹框  0确定  1取消
                this.drop.dropState = "hide"
                if (then == 0) {
                    //请求
                    if (this.drop.requst == 3) {  //修改

                        let paramsObj = {
                            tsType: this.drop.option,                //问卷类别：0专业测试，1趣味测试    number  选填
                            typeId: this.operateId,         //类别id    number  必填
                            typeName: this.drop.name,             //类别名称    string  选填
                        }

                        let params = serialize(paramsObj)
                        this.typeUpdate(params)
                    }

                    if (this.drop.requst == 0) {  //新增
                        let paramsObj = {
                            tsType: this.drop.option,                //问卷类别：0专业测试，1趣味测试    number  选填
                            typeName: this.drop.name,              //类别名称    string  选填
                        }

                        let params = serialize(paramsObj)
                        this.typeAdd(params)
                    }

                    if (this.drop.requst == 1) {  //启用禁用

                        let paramsObj = {
                            isDel: this.drop.windowTest == "启用" ? 0 : 1,   //   0启用，1禁用 string  必填
                            typeId: this.checkboxList   //  类别id    string  必填，数组格式，[1,2,3,...,5,...]
                        }

                        let params = serialize(paramsObj)
                        this.typeChange(params)
                    }


                } else {
                    //无 点击取消
                }
                this.clearDropRecord()
            },
            clearDropRecord(){
                this.drop.dropState = 'hide'
                /*弹窗状态*/
                this.drop.name = ""    //弹窗输入框
                this.drop.option = "0"  //弹窗下拉选择
                this.drop.windowTest = ""   //禁用or启用
                this.drop.whichWindow = ""  //哪个弹窗
                this.drop.requst = "" //点击确定后请求哪个链接  0新增   1  2 启用禁用 3修改
            },
            getSearchVal(){

                this.effectVal = {}

                if (this.searchVal.words) {
                    this.effectVal.typeName = this.searchVal.words
                }

                this.getData()
            },
            async typeUpdate(params){  //修改
                console.log(`修改`)
                let data = await testingTypeUpdate(params)
                if (data.code == 0) {
                    console.log(`success`)
                    this.getData()
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },
            async typeAdd(params){  //新增
                console.log(`新增`)
                let data = await testingTypeAdd(params)
                if (data.code == 0) {
                    console.log(`success`)
                    this.getData()
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async typeChange(params){  //启用 禁用
                console.log(`启用 禁用`)
                let data = await testingTypeChangeStatus(params)
                if (data.code == 0) {
                    console.log(`success`)
                    this.checkboxList = []
                    this.getData()
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async getData(){

                this.effectVal.pageIndex = this.page
                this.effectVal.pageSize = this.pageSize
                this.effectVal.eeId = this.eeId

                let params = serialize(this.effectVal)
                let data = await testingTypeList(params)
                if (data.code == 0) {
                    this.dataList = data.list
                    this.total = data.count
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            pageHandler: function (page) {
                this.page = page
                this.getData()
            },
            createUrl: function (unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },
        },
        filters: {
            statusFilter(num){
                let chargeWayArr = ['启用', '禁用']
                return chargeWayArr[num]
            },
            tsTypeFilter(num){
                let chargeTypeArr = ['专业测试', '趣味测试', '学生测试']
                return chargeTypeArr[num]
            }
        },
        ready(){
            this.getData()
        }
    }
</script>














































