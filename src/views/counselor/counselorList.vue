<style type="text/css">
    .dialog-title {
        line-height: 50px;
    }
</style>
<template>

    <div class="container-fluid mid">
        <div id="search" class="title">

          <div style="display: inline-block;">
            <span style="font-weight: bold;float: left;margin-top:4px;">申请通过时间：</span>
            <input class="input myInput" size="20" type="date" v-model='searchVal.begin' placeholder="开始时间">
            <span style="font-weight: bold;margin-top:4px;margin-left: 10px;margin-right: 10px;">——</span>
            <input class="input myInput" size="20" type="date" v-model='searchVal.end' placeholder="结束时间">
          </div>
          <div style="display: inline-block;margin-left: 40px;">
            <span style="font-weight: bold;float: left;margin-top:3px;">列表排序：</span>
            <select class="mr20" id="regTimeDirection" v-model='searchVal.regTimeDirection'>
                <option value="">全部</option>
                <option value="0">申请通过时间正序</option>
                <option value="1">申请通过时间逆序</option>
                <option value="2">排序分数+权重</option>
                <option value="3">总咨询数从大到小</option>
                <option value="4">总倾诉数从大到小</option>
            </select>
          </div>
          <div style="width: 290px;display: inline-block;margin-left: 30px;">
            <span style="font-weight: bold;float: left;margin-top:3px;">启用状态：</span>
            <select class="mr20"  v-model="searchVal.isEnable" style="width: 201px;">
                <option :value="''">全部</option>
                <option :value="0">启用</option>
                <option :value="1">禁用</option>
            </select>
          </div>

            <!--新增启用禁用搜索条件-->
          <div>
            <div style="display: inline-block;float:left;">
              <span style="font-weight: bold;float: left;margin-top:3px;">对公服务状态：</span>
              <select class="mr20" v-model="searchVal.isAudited" style="width: 202px;">
                  <option value="">全部</option>
                  <option value="0">心猫专家库</option>
                  <option value="1">客户专家库</option>
                  <option value="2">申请对公服务</option>
              </select>
            </div>
            <div style="width: 250px;float:left;margin-left: 11px;">
              <span style="font-weight: bold;float: left;margin-top:3px;">权重：</span>
              <select class="mr20"  v-model="searchVal.weights" style="width:202px;">
                  <option value="">全部</option>
                  <option value="0">0</option>
                  <option value="1">非0</option>
              </select>
            </div>
          <div style="width: 250px;float:left;margin-left: 38px;">
            <span style="font-weight: bold;float: left;margin-top:3px;">服务等级：</span>
            <select class="mr20"  v-model="searchVal.serviceLevel">
                <option value="">全部</option>
                <option value="0">专业</option>
                <option value="1">倾诉</option>
            </select>
          </div>
          <div style="display: inline-block;">
            <input type="text" id="bbbb" value="" style="width: 176px;margin-left: 20px;" placeholder="请输入专家名/所在地/手机号" v-model='searchVal.words' />
          </div>




            <div class="myBtn" @click='getSearchVal' style="margin-left: 40px;">搜索</div>
          </div>
        </div>
        <!-- ///////////////////////////////////////////////////////////////////// -->
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0" style="width: 2300px;">
            <thead>
                <tr>
                    <th @click='selectAll' class="pointer span1">
                        <a href="javascript:;">全选</a>
                    </th>
                    <th class="span1" style="width: 180px;">申请通过时间</th>

                    <th class="span1" style="width: 80px;">专家姓名</th>

                    <th class="span1">性别</th>
                    <th class="span1">年龄</th>
                    <th class="span1" style="width: 180px;">所在地</th>

                    <th class="span1">手机号码</th>
                    <th class="span1" style="width: 150px;">职业类型</th>

                    <th class="span1">服务等级</th>
                    <!-- <th class="span1">服务等级</th> -->

                    <th class="span1">状态</th>
                    <!-- 10 -->

                    <th class="span1">总咨询数</th>
                    <th class="span1">总倾诉数</th>
                    <th class="span1" style="width: 150px;">即时咨询价格</th>
                    <th class="span1">即时咨询数</th>
                    <th class="span1" style="width: 150px;">预约咨询价格</th>
                    <th class="span1" style="width: 150px;">预约套餐价格</th>
                    <th class="span1" style="width: 150px;">预约咨询数</th>
                    <th class="span1" style="width: 150px;">倾诉价格</th>
                    <th class="span1">倾诉次数</th>
                    <th class="span1" style="width: 150px;">加倍倾诉价格</th>
                    <!-- 20 -->
                    <th class="span1">加倍倾诉次数</th>
                    <th class="span1" style="width: 150px;">图文咨询价格</th>
                    <th class="span1">图文咨询数</th>
                    <th class="span1">回答数</th>
                    <th class="span1">获得锦旗数</th>
                    <th class="span1">粉丝数</th>
                    <th class="span1">感谢点赞数</th>
                    <th class="span1">好评数</th>
                    <th class="span1">文章数</th>
                    <th class="span1">发心友圈数</th>
                    <!-- 30 -->
                    <th class="span1" style="width: 150px;">评论/回复数用户发布的心友圈数</th>
                    <th class="span1">有效举报数</th>
                    <!-- <th class="span1">有效被举报数</th> -->
                    <!-- <th class="span1">分享给好友数</th> -->
                    <th class="span1" style="width: 150px;">对公服务状态</th>
                    <th class="span1">申请入库操作</th>
                    <th class="span1">总积分</th>

                    <th class="span1">权重</th>
                    <th class="span1" style="width: 200px;" disabled="disabled">操作</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for='(index,item) in dataList'>
                    <td>
                        <div class="checkbox">
                            <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp" name="title-table-checkbox" @click='selectPerson(item.mid,item)' :checked=" item.checkState? 'checked':''">
                            <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                        </div>
                    </td>
                    <td>{{item.auditTime}}</td>

                    <td>{{item.nickname}}</td>

                    <td>{{item.sex | bianYiSex}}</td>
                    <td>{{item.age}}</td>
                    <td>{{item.location}}</td>

                    <td>{{item.mobilePhone}}</td>
                    <td>{{item.recommendWords}}</td>

                    <td>{{item.pLevel | severLevel}}</td>
                    <!-- 10 -->
                    <td>{{item.isEnable | statusFilter}}</td>
                    <td>{{item.phoneCountShow}}</td>


                    <td>{{item.serviceListenTotal}}</td>
                    <td>{{item.immediatePrice}}</td>
                    <!-- 即时咨询数 -->
                    <td>{{item.serviceVoid}}</td>
                    <td>{{item.immediatePrice}}</td>
                    <!-- //套餐预约价格 -->
                    <td>{{item.parentBespeak}}</td>
                    <td>{{item.servicebespeak}}</td>
                    <!-- 预约咨询数 -->
                    <td>{{item.aboutPrice}}</td>
                    <td>{{item.serviceListen}}</td>
                    <td>{{item.doubleTalkPrice}}</td>
                    <!-- 20 -->
                    <td>{{item.serviceDoubleListen}}</td>
                    <td>{{item.graphicConsultationPrice}}</td>
                    <td>{{item.graphicConsultationNumeber}}</td>

                    <td>{{item.answerNumber}}</td>
                    <td>{{item.flagNumber}}</td>
                    <td>{{item.fansNumber}}</td>
                    <td>{{item.thankYouNumber}}</td>
                    <td>{{item.highPraiseNumber}}</td>
                    <td>{{item.articleNumber}}</td>
                    <td>{{item.roundsNumber}}</td>
                    <!-- 30 -->
                    <td>{{item.commentsNumber}}</td>
                    <td>{{item.effectiveNumber}}</td>
                    <!-- <td>{{item.effectiveNumber}}</td> -->
                    <!-- <td>{{item.effectiveReportedNumber}}</td> -->
                    <!-- <td>{{item.shareFriendNumber}}</td> -->
                    <!-- <td>{{item.statePublicService}}</td>
                    <td>{{item.warehousingOperation}}</td> -->
                    <td>{{item.isAudited | isAuditedFliter}}</td>
                    <td>
                        <a href="javascript:;" v-show="item.isAudited != 2">无</a>
                        <a href="javascript:;" v-show="item.isAudited == 2" @click="enAudite(item,0)">通过</a>
                        <a href="javascript:;" v-show="item.isAudited == 2" @click="enAudite(item,1)">不通过</a>
                    </td>
                    <td>{{item.psychoPoint}}</td>
                    <!-- <td>{{item.orderFactor}}</td> -->
                    <!-- <td>{{item.pourOutListSortScores.}}</td> -->
                    <!-- <td>{{item.priceAndTime}}</td> -->
                    <!-- <td>{{item.phoneCount}}单</td>
                    <td>{{item.phoneCountShow}}单</td> -->
                    <!-- <td>{{item.pourOutListSortScores}}</td> -->
                    <td id="weights" contenteditable="true" @input="changeWeights(item.mid,item.weights,index)">{{item.weights}}</td>
                    <!-- 40 -->
                    <td>
                        <!-- <a href="javascript:;" @click='reset(item.mid)'>修改</a> -->
                        <!-- <a href="javascript:;" @click="changeServicePrice(item.mid, item.pLevel, item.price, item.duration)" style="color: #999999;">修改服务价格</a> -->
                        <span style="color: #999999;">修改服务价格</span>
                        <!-- whichWindow == 1 -->
                        <!-- <a href="javascript:;" @click='fakeOrder(item,$index)' style="color: #999999;">刷单</a> -->
                        <span style="color: #999999;">刷单</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div id="test" class="myPagenav">
            <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
                </zpagenav>
        </div>
        <!-- <a href="/addConsultant" class="myBtn myBtnRight btn-warning">新增</a> -->

        <!-- <a href="javascript:;" v-link="{path:'counselorMsg'}" class="myBtn myBtnRight btn-warning">新增</a> -->
        <!-- whichWindow == 0 -->

        <div style="display: inline-block;margin-left: 500px;">
            <span @click="downloadExcel" class="btn btn-success" style="margin: -10px 0 0 4px;" v-if="!isExportingExcel">导出Excel</span>
            <span class="btn btn-success" style="margin: -10px 0 0 4px;cursor: wait;" v-else>导出中....</span>

            <a href="javascript:;" v-el:a></a>
        </div>

        <div class="myBtn myBtnRight btn-info" @click='setAble(1)'>禁用</div>
        <div class="myBtn myBtnRight btn-inverse" @click='setAble(0)'>启用</div>
        <!-- <div class="myBtn myBtnRight btn-success" @click='addToPsychoRecommend'>添加到推荐</div> -->
    </div>
    <div id="myAlert" class="modal {{dropState}}">
        <div class="" v-if="whichWindow == 0 && addSuccess == 0">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click='closeDrop'>×</button>
                <h3>禁用</h3>
            </div>
            <div class="modal-body">
                <p>您确定要{{dropText}}吗</p>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click='closeDrop'>取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click='sendRequest'>确定</a>
            </div>
        </div>
        <div class="" v-if="whichWindow == 1">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click='closeDrop'>×</button>
                <h3>刷单:{{orderObj.nickname}}</h3>
            </div>
            <div class="modal-body">
                <div class="my-control-group">
                    <label class="my-control-label">真实咨询量 :</label>
                    <div class="controls form-horizontal inlineblock">
                        <!-- <input type="text" class="span11 typeName" placeholder="真实咨询量"  v-model=""> -->
                        {{orderObj.phoneCount}}单
                    </div>
                </div>
                <div class="my-control-group">
                    <label class="my-control-label">显示咨询量 :</label>
                    <div class="controls form-horizontal inlineblock">
                        <!-- <input type="text" class="span11 typeName" placeholder="显示咨询量" v-model=""> -->
                        {{orderObj.phoneCountShow}}单
                    </div>
                </div>
                <div class="my-control-group">
                    <label class="my-control-label">刷单 :</label>
                    <div class="controls form-horizontal inlineblock">
                        <input type="text" class="span11 typeName" placeholder="增加或减少N单" v-model="orderObj.increment">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click='closeDrop'>取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click='sendFake(orderObj)'>确定</a>
            </div>
        </div>
        <div class="" v-if="whichWindow == 2">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click='closeDrop'>×</button>
                <h3>填写不通过原因</h3>
            </div>
            <div class="modal-body">
                <textarea name="" id="" cols="30" rows="10" v-model="reason" style="width: 520px;height: 200px;"></textarea>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click='closeDrop'>取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click='sendauditEapPsycho'>确定</a>
            </div>
        </div>

        <div class="" v-if="addSuccess == 1">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click='closeDrop2'>×</button>
                <h3>添加成功提示</h3>
            </div>

            <div class="modal-body">
                <div style="font-size:25px;text-align:center;">已成功添加至推荐专家列表！</div>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn btn-success" href="#" @click='closeDrop2'>好的</a>
            </div>
        </div>


    </div>



    <div class="modal-backdrop {{dropState}}"></div>


   <!--  <div class="" v-if="editPriceWindow">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click='closeeditPriceWindow'>×</button>
            <h3>修改服务价格或时间</h3>
        </div>

        <div class="modal-body">
            <div style="font-size:25px;text-align:center;">已成功添加至推荐专家列表！</div>
        </div>
        <div class="modal-footer">
            <a data-dismiss="modal" class="btn btn-success" href="#" @click='closeeditPriceWindow'>好的</a>
        </div>
    </div>

 -->


<div class="dialog-wrapper" v-if="editPriceWindow">
    <div class="dialog-container" style="width:300px;">
        <h4 class="dialog-title">请修改</h4>

        <input type="number" v-model="newPrice" name="" placeholder="请输入价格">&nbsp;&nbsp;元<br>
        <input type="radio" id="one" :value="25" v-model="duration"> <label style="display:inline-block;" for="one">25分钟</label>
        <input type="radio" id="two" :value="50" v-model="duration"> <label style="display:inline-block;" for="two">50分钟</label>
        <p class="dialog-tip" style="color:red;">{{ typeArray[pLevel] }}&nbsp;的价格区间为&nbsp;{{ floor }} - {{ceiling}}（元）</p>

        <div class="btn-wrapper">
            <div @click="cancelChangePriceFn">取消</div>
            <div @click="sureToChangePriceFn">确定</div>
        </div>
    </div>
</div>


</template>

<script>
    import {
        addPsychoRecommend,//添加至推荐专家
        getCounselorList,
        disableMemberBulk,
        enableMemberBulk,
        addPhoneCountIncrement, // 刷单
        auditEapPsycho, // 审核

        getResponse,
        getResponses,
        getResponsesExcel,
        getJson
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
                reason: '', // 审核
                isPass: '',
                pid: '',

                whichWindow: "", // 启用 禁用 0    刷单 1
                dropState: "hide",
                /*弹窗状态  hide in => css */
                dropText: "",
                able: "",

                orderObj: {}, // 刷单 人



                searchVal: {
                    begin: "",
                    end: "",
                    regTimeDirection: "0",
                    words: "",
                    isAudited: "", // 审核
                    isEnable: '', // 启用/禁用
                    serviceLevel: '',
                    weights: '',
                },

                dataList: [],

                selectPersonList: [], //checkBox 选中的人 的 mid
                selectPersonAll: false,
                effectVal: {},

                pageSize: 15,

                page: 1, //pagepageSize: 10 //pageSize,  default is 10   左分页
                total: 10, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5

                //专家活动流水分页
                search_pageSize:36,
                search_page: 1,
                search_total: 10,
                addSuccess:0,

                // 编辑咨询价格
                editPriceWindow: false,
                pLevel: '', // 0 专业咨询  1 请咨询
                floor: '',
                ceiling: '',
                picked: 1,
                newPrice: '',
                typeArray: ["专业咨询", "轻咨询"],
                price: '',
                duration: '',
                mid: '',

                isExportingExcel: false, // 导出状态控制

            }
        },
        watch: {

        },
        methods: {
            changeWeights(id,aa,index){

                let v=document.querySelectorAll('#weights')[index].innerHTML;
                console.log(aa)
                console.log(v)
                if(v==aa){

                }else{
//                    alert(`修改成功`)
//                    this.dataList[index].weights=v;


                    let object={};
                    object.mid=id;
                    object.weights=v;
                    let n = JSON.stringify([object]);
                    this.updateUnrealHits(n);


                }
            },
            async updateUnrealHits(object) {
                let data = await getJson("/depression-web/Psychor/motifyPsychoByWeights.json", object);
                if (data.code === 0) {

//                    this.getData()
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },
            search_pageHandler: function(page) {
                this.search_page = page
            },
            search_createUrl: function(unit) {
                return unit.search_page > 1?'#search_page=' + unit.search_page:'#'
            },
            enAudite(item, tag) { // 咨询师审核  0过 1不过

                this.reason = '' // 清空原因

                this.isPass = tag
                this.pid = item.mid

                if (tag == 0) {
                    // 通过
                    this.sendauditEapPsycho()
                }
                if (tag == 1) {
                    this.whichWindow = '2'
                    this.dropState = 'in'
                }
            },
            async sendauditEapPsycho() {
                this.dropState = 'hide'

                let paramsObj = {
                    isPass: this.isPass, //   0 通过 1 不通过 number
                    pid: this.pid //咨询师id number
                }

                if (this.reason) {
                    paramsObj.reason = this.reason
                }

                let params = serialize(paramsObj)

                let data = await auditEapPsycho(params)

                if (data.code != 0) {
                    alert('操作失败！:' + data.msg)
                }

                if (data.code == 0) {
                    alert('操作成功！')
                    this.getData()
                }

            },
            sendRequest() { // 结算请求   点击 弹框的确定按钮
                console.log(`发送结算请求`)
                this.closeDrop()
                this.doAble(this.selectPersonList)
                this.selectPersonList = []
            },
            closeDrop() { //关弹框
                this.dropState = "hide"
            },

            closeDrop2() { //关弹框
                this.dropState = "hide"
                this.addSuccess = 0;
            },
            selectAll() {
                this.selectPersonAll = !this.selectPersonAll
                this.selectPersonList = []
                if (this.selectPersonAll) {
                    this.dataList.forEach((item, index, arr) => {
                        item.checkState = true
                        this.selectPersonList.push(item.mid)
                    })
                } else {
                    this.dataList.forEach((item, index, arr) => {
                        item.checkState = false
                    })
                }
                console.log(`selectPerson:${this.selectPersonList}`)
            },
            selectPerson(mid, item) {
                console.log(item.checkState)
                item.checkState = !item.checkState
                if (item.checkState) {
                    this.selectPersonList.push(mid)
                } else {
                    this.selectPersonList.shift(mid)
                }
                console.log(`selectPerson:${this.selectPersonList}`)
            },

            getSearchVal() {

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

                if (this.searchVal.isAudited) {
                    this.effectVal.isAudited = this.searchVal.isAudited
                }

                if (this.searchVal.serviceLevel) {
                    this.effectVal.serviceLevel = this.searchVal.serviceLevel
                }
                // console.log(this.effectVal.serviceLevel);

                if (this.searchVal.weights) {
                    this.effectVal.weights = this.searchVal.weights
                }


                if (this.searchVal.isEnable === 0 || this.searchVal.isEnable === 1 ) {
                    this.effectVal.isEnable = this.searchVal.isEnable
                }


                this.effectVal.words = this.searchVal.words

                this.getData()
            },
            async getData() {

                this.effectVal.pageIndex = this.page
                this.effectVal.pageSize = this.pageSize

                let params = serialize(this.effectVal)
                let data = await getCounselorList(params)
                if (data.code == 0) {
                    this.dataList = data.psychoDTOs
                    this.total = data.count
                    data.psychoDTOs.forEach((item) => { //checkBox
                        Vue.set(item, "checkState", false)
                    })

                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            reset(path) {
                console.log(path)
                    // this.$route.router.go("/counselorUpload/"+path)
                this.$route.router.go("/counselorMsg/" + path)
            },
            setAble(whichAble) { // 0 启用 1 禁用
                if (this.selectPersonList.length == 0) {
                    alert('请选择具体人员')
                } else {
                    this.whichWindow = 0
                    this.dropState = 'in'
                    this.able = whichAble
                    let arr = ['启用', '禁用']
                    this.dropText = arr[whichAble]
                }
            },
            // start--------------------------------------------添加到推荐位事件
            addToPsychoRecommend() { // 0 启用 1 禁用
                if (this.selectPersonList.length == 0) {
                    alert('请选择具体人员');
                } else {
                    console.log(this.selectPersonList);
                    this.addPsychoRecommend(this.selectPersonList);
                }
            },

            async addPsychoRecommend(arr) { //添加推荐专家到数据库
                let arr1 = JSON.stringify(arr);
                let paramsObj = {
                    "mids": arr1
                }
                console.log(paramsObj, typeof paramsObj);
                let params = serialize(paramsObj)
                console.log(params, typeof params);

                let data = await addPsychoRecommend(params)
                console.log(data);
                if (data.code == 0) {
                    console.log("成功添加至推荐专家");
                    this.addSuccess = 1;
                    this.dropState = 'in';

                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },
            // end----------------------------------------------添加到推荐位事件

            async doAble(arr) { // disableMemberBulk
                let paramsObj = {
                    "ids": arr
                }
                let params = serialize(paramsObj)
                if (this.able == 0) {
                    let data = await enableMemberBulk(params)
                    if (data.code == 0) {
                        //再次请求新数据
                        this.getData()
                    } else {
                        alert(`errMsg:${data.msg}`)
                    }
                } else if (this.able == 1) {
                    let data = await disableMemberBulk(params)
                    if (data.code == 0) {
                        //再次请求新数据
                        this.getData()
                    } else {
                        alert(`errMsg:${data.msg}`)
                    }
                }
            },

            fakeOrder(item, index) {

                this.whichWindow = 1
                this.dropState = 'in'

                this.orderObj = item
                this.orderObj.index = index
            },
            async sendFake(obj) {
                console.log('发送刷单');
                console.log(obj.increment);

                if (obj.increment) {

                    let data = await addPhoneCountIncrement(`increment=${obj.increment}&mid=${obj.mid}`)

                    data.code == 0 ? this.dataList[this.orderObj.index].phoneCountShow = parseInt(obj.phoneCountShow) + parseInt(obj.increment) : alert(`errMsg:${data.msg}`)
                    this.orderObj = {}
                    this.dropState = 'hide'
                } else {
                    console.log('单数未填');
                }

            },
            pageHandler: function(page) {
                this.page = page
                this.getData()
            },
            createUrl: function(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },
            search_pageHandler: function(page) {
                this.search_page = page
            },
            search_createUrl: function(unit) {
                return unit.search_page > 1?'#search_page=' + unit.search_page:'#'
            },

            //---------------------------------------------start   修改咨询师价格或时间
            changeServicePrice(mid, type, price, duration) {
                console.log(mid)
                this.newPrice = ''
                this.editPriceWindow = true
                this.mid = mid
                this.pLevel = type
                this.price = price
                console.log(this.price)
                this.duration = duration
                this.obtainPrice()
            },


            async obtainPrice() {
                this.floor = ""
                this.ceiling = ""
                let data = await getResponse("ServiceGoods/obtainPriceScope.json")

                console.log("测试数据", data)
                if (data.code === 0) {
                    if (this.pLevel === 0) {
                        // 专业咨询
                        this.floor = data.voiceAdvisoryPriceScopeDTO.floor
                        this.ceiling = data.voiceAdvisoryPriceScopeDTO.ceiling
                    } else if (this.pLevel === 1) {
                        // 轻咨询
                        this.floor = data.voiceListenPriceScopeDTO.floor
                        this.ceiling = data.voiceListenPriceScopeDTO.ceiling
                    }
                } else {
                    alert(data.msg)
                }
            },

            cancelChangePriceFn() {
                this.editPriceWindow = false
                this.getData()
            },
            async sureToChangePriceFn() {

                // 判断价格区间
                if (!this.newPrice) {
                    alert("请输入价格")
                    return
                }

                if ((this.newPrice || this.newPrice == 0) && (this.newPrice < this.floor || this.newPrice > this.ceiling)) {
                    alert("输入的价格不在价格区间内！")
                    return
                }

                let params = {}

                params.mid = this.mid
                params.duration = this.duration

                // params.price = (this.newPrice || this.newPrice == 0) ? this.newPrice : this.price


                if (this.newPrice || this.newPrice === "0") {
                    params.price = this.newPrice
                } else {

                    params.price = this.price + ""
                }
                console.log(this.price)
                console.log(params)

                let data = await getResponses("Psychor/savePriceAndDuration.json", serialize(params))

                console.log(data)

                if (data.code === 0) {
                    this.editPriceWindow = false
                    this.getData()
                } else {
                    alert(this.msg)
                }

            },

            //---------------------------------------------end     修改咨询师价格或时间

            async downloadExcel() {

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

                if (this.searchVal.isAudited) {
                    this.effectVal.isAudited = this.searchVal.isAudited
                }

                if (this.searchVal.serviceLevel) {
                    this.effectVal.serviceLevel = this.searchVal.serviceLevel
                }

                if (this.searchVal.weights) {
                    this.effectVal.weights = this.searchVal.weights
                }

                if (this.searchVal.isEnable === 0 || this.searchVal.isEnable === 1 ) {
                    this.effectVal.isEnable = this.searchVal.isEnable
                }

                this.effectVal.words = this.searchVal.words


                this.effectVal.ids = JSON.stringify(this.selectPersonList)


                // let paramsObj = this.paramsFn()

                // if (this.selectPersonList.length) {
                //     this.effectVal.ids = JSON.stringify(this.selectPersonList)
                // }

                this.isExportingExcel = true
                let p = serialize(this.effectVal),
                    data = await getResponsesExcel("Psychor/exportMemberData.json", p)
                console.log("导出信息------------------:",data)
                let blob = new Blob([data], {
                        'type': 'application/msexcel'
                    }),
                    a = this.$els.a

                a.href = window.URL.createObjectURL(blob)



                a.download = `专家数据统计.xls`
                a.click()

                this.isExportingExcel = false

                this.selectPersonList = []

                //修改
                this.dataList.forEach((item) => {   //checkBox
                    Vue.set(item, "checkState", false);
                })

            },

        },
        filters: {
            statusFilter(num) {
                let chargeWayArr = ['启用', '禁用']
                return chargeWayArr[num]
            },
            severLevel(num) {
                let chargeWayArr = ['专业', '倾诉']
                return chargeWayArr[num]
            },
            bianYiSex(num) {
                let chargeWayArr = ['未知', '男', '女']
                return chargeWayArr[num]
            },
            isAuditedFliter(num) {
                let chargeWayArr = ['心猫专家库', '客户专家库', '申请对公服务']
                return chargeWayArr[num]
            }
        },
        ready() {
            this.getSearchVal()
        }
    }
</script>
