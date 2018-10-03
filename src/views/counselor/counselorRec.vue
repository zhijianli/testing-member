<template>
    <div class="container-fluid">
        <div class="tab-cont">
            <ul class="tagTit">
                <li :class="{ show: !TabState}" @click="switchFn(false)">推荐列表</li>
                <li :class="{ show: TabState}" @click="switchFn(true)">电话咨询流水</li>
            </ul>
        </div>

        <!-- page1 -->
        <!-- 主题推荐信息列表 -->
        <div v-if="!TabState">
            <div class="widget-box">
                <div id="search" class="title" style="margin-left:20px;">
                    <select v-model="isOpened" style="margin:-2;width:84;background:#eeeeee">
                        <option value="1">打开推荐</option>
                        <option value="0">关闭推荐</option>
                    </select>
                </div>

                <div class="widget-content nopadding">
                    <div class="form-horizontal">
                        <div class="control-group">
                            <label class="control-label" style="width: 150px;">主题：</label>
                            <div class="controls" style="margin-left:170px;">
                                <input type="text" v-model="form.title" maxlength="6" placeholder="请输入主题，6个字以内">
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label" style="width: 150px;">上传封面（选填）：</label>
                            <div class="controls" style="margin-left:170px;">
                                <qiniu event-Name="picPath" :defaultimg="picPath"></qiniu>
                                <a class="btn btn-warning" id="deleteCoverPic" href="javascript:;" @click="deleteCoverPic">删除</a>
                                <span>若点击删除，则点击下方保存按钮保存后客户端不再显示图片</span>
                                <span v-if="isDeletePic == 1" style="font-size:12px;color:red">已删除图片</span>
                            </div>

                        </div>

                        <div class="control-group">
                            <label class="control-label" style="width: 150px;">详情外链（选填）：</label>
                            <div class="controls" style="margin-left:170px;">
                                <input type="text" style="width: 570px;"  placeholder="此项为选填" v-model="form.detail_link">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" style="width: 150px;">是否开启价格明目：</label>
                            <div class="controls" style="margin-left:170px;">
                                <div class="checkbox">
                                    <input type="checkbox" style="visibility:visible;display:inline-block;" id="isPriceOpened" class="isPriceOpened" @click="ifOpenPrice" checked="checked">

                                        <input type="text" style="width: 350px;" placeholder="价格明目--eg：秒杀价、限时价、优惠价（六个字以内）" maxlength="6" v-model="form.price_name" id="ifInputPriceName">：
                                        <input type="number" placeholder="请输入名目价额" v-model="form.price" id="ifInputPrice">
                                        <span>元</span>


                                </div>


                            </div>

                        </div>

                        <div class="control-group">
                            <label class="control-label" style="width: 150px;"> 每位用户终身限额：</label>
                            <div class="controls" style="margin-left:170px;">
                                <input type="text" id="memerLimitInp"  v-model="form.memberLimit">
                                <span>单</span>
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label" style="width: 150px;">&nbsp;</label>
                            <div class="controls" style="margin-left:170px; width:300px">
                                <button type="submit" class="btn btn-block btn-success" @click="upload()">保&nbsp;存</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <!-- 推荐列表显示 -->
            <h3>推荐列表</h3>
            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                <thead>
                    <tr>
                        <th>
                            <div class="checkbox" >
                                <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox" @click='selectAll'>
                                <label for="title-table-th" class="checkboxLabel"></label>
                            </div>
                        </th>
                        <th>专家姓名</th>
                        <th>电话号码</th>
                        <th>服务类型</th>
                        <th>每日固定名额</th>
                        <th>今日剩余</th>
                        <th>累计接单量</th>
                        <th>用户评分</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='item in dataList'>
                        <td>
                            <div class="checkbox">
                                <input type="checkbox" class="checkboxInp"  id="dataList-{{$index}}"  name="title-table-checkbox"  @click="selectPerson(item.mid,item)" :checked=" item.checkState? 'checked':''">
                                <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                            </div>
                        </td>
                        <td>{{item.nickname}}</td>
                        <td>{{item.mobilePhone}}</td>
                        <td>{{item.pLevel===0?"专业咨询":"轻咨询"}}</td>

                        <td>
                            <span>{{item.dailyNumber}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <a class="btn btn-success" style="float:right" href="javascript:;" @click="btnEdit(item.dailyNumber,item.prId)">修改</a>
                        </td>
                        <td>{{item.remainNumber}}</td>
                        <td>{{item.orderCount}}</td>
                        <td>{{item.orderEvaluation}}</td>
                        <td><button  class="btn btn-warning" @click="removeFn(item.prId)">移除</button></td>
                    </tr>
                </tbody>
            </table>

            <!-- 分页 -->
            <div class="page">
                <div id="test">
                    <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl" ><zpagenav>
                </div>
            </div>

            <!-- start 修改每日固定名额 -->
            <div class="modal-backdrop in" v-if="edit" style="opacity:1">
                <div id="myAlert" class="modal">
                    <div class="modal-header">
                        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                        <h2>修改</h2>
                    </div>
                    <div class="modal-body form-horizontal">
                        <div class="control-group bn">
                            <label class="control-label">输入固定名额 :</label>
                            <div class="controls">
                               <input type="text" v-model="editDailyNumber">
                            </div>
                       </div>

                       <button type="button" class="btn btn-default" @click="close()">取消</button>

                       <button style="float:right" type="button" class="btn btn-success" @click="configEdit">保存</button>
                   </div>
               </div>
            </div>
            <!-- end 修改每日固定名额 -->

            <!-- start 移除功能 -->
            <div class="modal-backdrop in" v-if="remove" style="opacity:1">
                <div class="modal">
                    <div class="modal-header">
                        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                        <h2>移除</h2>
                    </div>;
                    <div class="modal-body form-horizontal">
                        <h2 style="text-align:center">确定移除？</h2>
                        <button type="button" class="btn btn-default" @click="close()">取消</button>

                        <button style="float:right" type="button" class="btn btn-success" @click="affirmRemoveFn">移除</button>
                    </div>
                </div>
            </div>
            <!-- end 移除功能 -->

            <!-- start 保存成功提示 -->
            <div class="modal-backdrop in" v-if="test" style="opacity:1;">
                <div class="modal" style="top:35%;">
                    <div class="modal-header">
                        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                        <h2>保存成功</h2>
                    </div>;
                    <div class="modal-body form-horizontal">
                        <h2 style="text-align:center;margin-bottom:20px;">信息已成功保存，推荐专家信息已更新！</h2>

                        <button type="button" style="margin-left:50%;translate:transformY(-50%);" class="btn btn-default" @click="close()">关闭</button>
                    </div>
                </div>
            </div>
            <!-- end   保存成功提示 -->
        </div>

    <!-- </div> -->


        <!-- page2  -->
        <!-- 电话咨询流水 -->
        <div v-if="TabState" class="container-fluid">

            <div class="search-box">
                <input type="text" placeholder="输入专家姓名" v-model="searchVal.words" >
                <input type="date" placeholder="开始时间" v-model="searchVal.begin"> -
                <input type="date" placeholder="结束时间" v-model="searchVal.end">
                <button @click="getSearchVal">搜索</button>
                <!-- <a :href="url" download="活动期间专家电话活动流水.xls" class="btn btn-success" style="float:right" @click="asyncExcel">导出全部到excel</a> -->
                <!-- <div class="btn btn-success" style="float:right"  @click='asyncExcel'>导出全部到excel</div>
                <a href="javascript:;" v-el:a></a> -->
                <!-- 修改导出全部到excel -->
                <div class="btn btn-success" style="float:right"  @click='exportHandler'>导出全部到excel</div>
                <a href="javascript:;" v-el:a></a>

            </div>
            <span style="color:red">注：若没有选中任何人员则导出搜索到的所有流水订单，若需导出部分订单，请先分别选中后再点击导出</span>
            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                <thead>
                    <tr>
                        <th class="not-print">
                            <div class="checkbox">
                                <!-- <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox"  @click='selectAll2'> -->
                                <!-- <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox"  >
                                <label for="title-table-th" class="checkboxLabel"></label> -->
                                <span>选中</span>
                            </div>
                        </th>
                        <th>订单时间</th>
                        <th>专家姓名</th>
                        <th>电话号码</th>
                        <th>服务类型</th>
                        <th>求助者电话</th>
                        <th>求助者实付</th>
                        <th>专家实得</th>
                        <th>拨打时长</th>
                        <th>咨询定价</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in searchList" >
                        <td class="not-print">
                            <div class="checkbox">
                                <input type="checkbox"
                                id="searchList-{{$index}}"
                                name="title-table-checkbox"
                                @click='selectPerson2(item.soid,item)'
                                :checked=" item.checkState? 'checked':''"
                                class="checkboxInp">
                                <label for="searchList-{{$index}}" class="checkboxLabel"></label>
                            </div>
                        </td>
                        <td>{{item.serviceRealityBeginTime}}</td>
                        <td>{{item.specialistName}}</td>
                        <td>{{item.specialistPhone}}</td>
                        <td>{{item.pLevel===0?"专业咨询":"轻咨询"}}</td>
                        <td>{{item.consumersPhone}}</td>
                        <td>{{item.cashAmount}}</td>
                        <td>{{item.serviceRealityAmount}}</td>
                        <td>{{item.practicalDuration}}</td>
                        <!-- <td>{{`${~~ (item.serviceRealityAmount / 60)}'${item.serviceRealityAmount % 60}"`}}</td> -->
                        <td>{{item.cost}}</td>

                    </tr>
                </tbody>
            </table>
            <!-- 分页 -->
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

        </div>

    </div>
</template>
<script type="text/javascript">
    import Vue from "vue"
    import qiniu from "../../qiniu.vue"
    import zpagenav from "vue-pagenav"
    import counselorpic from "./counselorPic.vue"
    import $ from "jquery"
    import {isOpenCounselorRecommend,
        obtainPsychoRecommendList,
        updatePsychoRecommend,
        removePsychoRecommend,
        getServiceOrderByPage,
        updateRecommend,
        obtainRecommend,
        exportServiceOrder2} from "../../api"
    import {
        serialize
    } from "../../utils"
    Vue.use(zpagenav)


    export default {
    components:{
        qiniu,
        counselorpic
    },

    data() {
        return {
            // 数据绑定
            recommendData:{},//初始推荐专家数据
            //是否打开推荐专家 0--关闭  1--打开
            isOpened:1,
            form:{
                title:"",
                detail_link:"",
                price_name:"",
                price:"",
                memberLimit:"",

            },
            //活动价格是否开启（0：关闭 1：开启）
            priceOpened:1,
            //是否删除图片 0：未删除  1：删除
            isDeletePic:0,
            show:false,
            TabState:false,

            //分页参数
            page: 1 ,//page
            pageSize: 10, //pageSize,  default is 10
            total: 0, //total item count
            maxLink: 5, //how many links to show, must not less than 5,  default is 5
            effectVal: {},
            //edit 修改固定名额弹出是否显示
            edit:false,
            //remove 是否移除此专家推荐
            remove:false,
            note:"",
            pageOne:true,
            pageTwo:false,
            picPath: "",
            dataList: [],
            selectPersonAll:false,
            selectPersonList:[],

            selectPersonList2:[],
            selectPersonAll2:false,
            editDailyNumber:"",
            prId:"",

            //搜索
            searchVal:{
                begin:"",
                end:"",
                words:"",
            },
            effectVal2:{},

            search_pageSize:15,
            search_page: 1,
            search_total: 2,

            searchList:[], //搜索得到的专家列表
            downloadName:"活动期间专家电话活动流水",
            test:false,
            //导出到excel
            table:"",

        }
    },

     events:{
            'imgParameter':function(obj,eventName){
                console.log(obj, eventName);
                this[eventName] = obj[eventName].imgPath;
            }
        },
    methods: {

        //-----------------------------------------初始化页面获取推荐专家信息
        async obtainRecommendData(){
            let data = await obtainRecommend();
            console.log("初始设置：",data);
            if( data.code == 0 ){
                this.recommendData = data.recommend;
                console.log(this.recommendData);
                //赋初始值
                this.isOpened = this.recommendData.isOpened;
                this.form.title = this.recommendData.title;
                this.picPath = this.recommendData.cover;
                if(this.recommendData.cover == "" || this.recommendData.cover == -1) {
                    this.isDeletePic = 1;
                } else {
                    this.isDeletePic = 0;
                }
                this.form.detail_link = this.recommendData.detailLink;
                this.priceOpened = this.recommendData.priceOpened;

                this.form.memberLimit = this.recommendData.memberLimit;

                console.log(this.form.memberLimit);
                $("#memerLimitInp").val(this.form.memberLimit);

                //修改复选框的选中状态
                if(this.priceOpened == 1) {
                    //选中
                    $("#isPriceOpened").attr("checked",true);
                    this.form.price = this.recommendData.price;
                    this.form.price_name = this.recommendData.priceName;
                } else {
                    $("#isPriceOpened").attr("checked",false);
                    $("#ifInputPriceName").attr("disabled",true);
                    $("#ifInputPrice").attr("disabled",true);
                    $("#ifInputPriceName").val("");
                    $("#ifInputPrice").val("");
                    this.form.price = "";
                    this.form.price_name = "";
                }
            }else{
                alert(`errMsg:${data.msg}`);
            }
        },
        ifOpenPrice(){
            if($('#isPriceOpened').is(':checked')) {
                console.log("选中");
                //选中则传输价格，不选中不传输价格
                this.priceOpened = 1;
                console.log(typeof this.priceOpened);

                $("#ifInputPriceName").attr("disabled",false);
                $("#ifInputPrice").attr("disabled",false);


            } else {
                console.log("未选中");
                this.priceOpened = 0;
                console.log(typeof this.priceOpened);
                $("#ifInputPriceName").attr("disabled",true);
                $("#ifInputPrice").attr("disabled",true);
                $("#ifInputPriceName").val("");
                $("#ifInputPrice").val("");
            }
        },
        //start----------------------------------点击保存推荐专家信息
        async upload(){
            console.log("限制名额：",this.form.memberLimit);
            if($('#isPriceOpened').is(':checked')) {
                //开启了价格明目则应价格明目和价格不能为空
                if(this.form.price == "" || this.form.price_name == ""){
                    alert("请完整填写价格明目和价格");
                    return;
                } else {
                    console.log("价格明目和价格都不为空");
                    this.form.price = parseFloat(this.form.price);
                }
            } else {
                this.form.price == "";

            }


            // this.form.price = parseInt(this.form.price);
            console.log("价格:",this.form.price);
            this.isOpened = parseInt(this.isOpened);
            this.form.memberLimit = parseInt(this.form.memberLimit);

            //判断是否点击了删除按钮  0：未删除  1：删除
            let data = `cover=${this.picPath}&detailLink=${this.form.detail_link}&isOpened=${this.isOpened}&memberLimit=${this.form.memberLimit}&price=${this.form.price}&priceName=${this.form.price_name}&priceOpened=${this.priceOpened}&title=${this.form.title}`;
            console.log(data);
            let result = await updateRecommend(data);
            console.log("保存编辑后的推荐专家信息",result);
            // alert("保存成功");
            this.test = true;
            console.log(this.test);
            /*
            if(this.isDeletePic == 0) {
                //需要传输图片
                //判断是否开启价格明目
                if($('#isPriceOpened').is(':checked')) {
                    console.log("选中");
                    //选中则传输价格，不选中不传输价格
                    let data = `cover=${this.picPath}&detailLink=${this.form.detail_link}&isOpened=${this.isOpened}&memberLimit=${this.form.memberLimit}&price=${this.form.price}&priceName=${this.form.price_name}&priceOpened=${this.priceOpened}&title=${this.form.title}`;
                    console.log(data);
                    let result = await updateRecommend(data);
                    console.log("需要传输图片且价格明目选中：",result);

                } else {
                    console.log("未选中");

                    $("#ifInputPriceName").attr("disabled",true);
                    $("#ifInputPrice").attr("disabled",true);
                    let data = `cover=${this.picPath}&detailLink=${this.form.detail_link}&isOpened=${this.isOpened}&memberLimit=${this.form.memberLimit}&priceOpened=${this.priceOpened}&title=${this.form.title}`;
                    console.log(data);
                    let result = await updateRecommend(data);
                    console.log("需要传输图片且价格明目未选中：",result);
                }
            } else if(this.isDeletePic == 1){
                //不需要传输图片
                //判断是否开启价格明目
                if($('#isPriceOpened').is(':checked')) {
                    console.log("选中");
                    //选中则传输价格，不选中不传输价格
                    let data = `detail_link=${this.form.detailLink}&isOpened=${this.isOpened}&memberLimit=${this.form.memberLimit}&price=${this.form.price}&priceName=${this.form.price_name}&priceOpened=${this.priceOpened}&title=${this.form.title}`;
                    console.log(data);
                    let result = await updateRecommend(data);
                    console.log("不需要传输图片且价格明目选中：",result);

                } else {
                    console.log("未选中");

                    $("#ifInputPriceName").attr("disabled",true);
                    $("#ifInputPrice").attr("disabled",true);
                    let data = `detail_link=${this.form.detailLink}&isOpened=${this.isOpened}&memberLimit=${this.form.memberLimit}&priceOpened=${this.priceOpened}&title=${this.form.title}`;
                    console.log(data);
                    let result = await updateRecommend(data);
                    console.log("不需要传输图片且价格明目未选中：",result);
                }


            }
            */

        },
        //end----------------------------------------------------点击保存推荐专家信息

        deleteCoverPic(){
            this.picPath = "";
        },



        //start-------------------------------------------------专家活动流水页面

        //导出到execl
        async asyncExcel(){

            console.log("getFile");

            let a = this.$els.a
            let data = await exportServiceOrder2();
            console.log(data);
            let blob = new Blob([data],{'type': 'application/msexcel'})
            a.href = window.URL.createObjectURL(blob)
            this.downloadName ? a.download = `${this.downloadName}.xls` : 'excel.xls' ////////////////////
            a.click()

        },

        search_pageHandler: function(page) {
            this.search_page = page
        },
        search_createUrl: function(unit) {
            return unit.search_page > 1?'#search_page=' + unit.search_page:'#'
        },
        getSearchVal(){
            //清空选择人物的数据
            this.selectPersonList2 = []
            this.effectVal2 = {}

            if (this.searchVal.begin) {
                this.effectVal2.createTime = this.searchVal.begin.replace(/\//g, "-") + " 00:00:00"
            }

            if (this.searchVal.end) {
                this.effectVal2.endTime = this.searchVal.end.replace(/\//g, "-") + " 00:00:00"
            }


            this.effectVal2.nickname = this.searchVal.words  // 必填
            console.log(this.effectVal2);
            this.getServiceOrder()



        },
        async getServiceOrder(){

            this.effectVal2.pageIndex = this.search_page
            this.effectVal2.pageSize = this.search_pageSize

            let params = serialize(this.effectVal2);
            // console.log(params);
            let data = await getServiceOrderByPage(params)
            console.log("搜索数据：", data);
            //整合data中的soid


            if( data.code == 0 ){
                console.log(data);
                this.searchList = data.list


                this.search_total = data.count
                //修改
                data.list.forEach((item) => {   //checkBox
                    Vue.set(item, "checkState", false);
                })


                //修改时间格式
                this.searchList.forEach((item) => {
                    item.practicalDuration = `${~~ (item.practicalDuration / 60)}'${item.practicalDuration % 60}"`
                    // console.log("test:",item.practicalDuration);
                })

                //修改选中状态
                this.searchList.forEach((item) => {
                    //当列表中有此id时修改选中状态为选中
                    this.selectPersonList2.forEach((v) => {
                        if (item.soid == v) {
                            Vue.set(item, "checkState", true);
                        }
                    })
                    //Vue.set(item, "checkState", false);
                })

                // `${~~ (item.practicalDuration / 60)}'${item.practicalDuration % 60}"`
            }else{
                alert(`errMsg:${data.msg}`)
            }
        },
        //end----------------------------------专家活动流水页面
        pageHandler: function(page) {
            this.page = page
            this.getData()
        },
        createUrl: function(unit) {
            return unit.page > 1 ? '#page=' + unit.page : '#'
        },

        switchFn(state) {
            this.TabState = state
            console.log(this.TabState)
        },
        close(){
            this.edit = false
            this.remove = false
            this.test = false
        },
        //点击修改固定名额
        btnEdit(dailyNumber, prId){
            this.edit = true;
            this.editDailyNumber = dailyNumber;
            this.prId = prId;
            console.log(this.edit,this.editDailyNumber,this.prId);

        },
        //修改每日固定名额后保存
        configEdit(){

            let params = `dailyNumber=${this.editDailyNumber}&prId=${this.prId}`;
            this.updatePsychoRecommend(params);
        },
        async updatePsychoRecommend(params) {
            let data = await updatePsychoRecommend(params)
            if (data.code == 0) {
                this.edit = false;
                this.getData();

            } else {
                alert(data.msg)
                this.edit = false
            }
        },
        //点击移除推荐专家
        removeFn(prId){
            this.remove = true
            this.prId = prId;
        },
        //二次确认移除推荐专家
        affirmRemoveFn(){
            let params = `prId=${this.prId}`;
            console.log(params, typeof params);
            this.removePsychoRecommend(params);
        },
        async removePsychoRecommend(params) {
            let data = await removePsychoRecommend(params)

            if (data.code == 0) {
                this.remove = false;
                this.getData();

            } else {
                alert(data.msg);
                this.remove = false;
            }
        },


        getFile(bool, url, id) {
            console.log('bool:' + bool)
            console.log('url:' + url)
            console.log('id:' + id)
            this.imageClipStatus = bool
            this.imageClipURL = url
            this.picPos = id
            document.body.classList.add("overflow")
        },
        getImg(key, id) {
            this.form[id] = key
            console.log('pic:' + this.form[id] + ',id:' + id)
        },


        tableFn() {

            let tables = $('table:visible')
            let self = this
            tables.each(function(i) {
                var t = $('<table><thead></thead><tbody></tobdy></table>');
                t.find('thead').html(this.tHead.innerHTML);
                t.find('tbody').append($(this.tBodies).children(':visible').clone());
                t.find('tbody tr').each(function() {
                    if (!$(this).find('input:checkbox').is(':checked')) {
                        $(this).addClass('not-print')
                    }
                })
                t.find('.not-print').remove(); // not-print 是@media print中不会打印的部分

                t.find('a').replaceWith(function(i) { // 表格中不再需要的超链接也移除了
                    return this.innerHTML;
                });
                self.table = self.table ? self.table.add(t) : t;

            });

        },
        base64(string){
            return window.btoa(unescape(encodeURIComponent(string)))
        },
        templateText(data) {
                let self = this
                return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">\
                <head>
                <xml>
                  <x:ExcelWorkbook>
                    <x:ExcelWorksheets>
                      <x:ExcelWorksheet>
                        <x:Name>{{worksheet}}</x:Name>
                        <x:WorksheetOptions>
                          <x:DisplayGridlines/>
                        </x:WorksheetOptions>
                      </x:ExcelWorksheet>
                    </x:ExcelWorksheets>
                  </x:ExcelWorkbook>
                </xml><![endif]-->
                </head>
                <body>
                    <table>
                        ${data}
                    </table>
                </body>
            </html>`
            },
        tableToExcel: function(tableList, name) {
            let tables = []
            let uri = 'data:application/vnd.ms-excel;base64,'

            for (var i = 0; i < tableList.length; i++) {
                tables.push(tableList[i].innerHTML);
            }
            var data = {
                worksheet: name || 'Worksheet',
                tables: tables
            };


            this.table = ''
            return uri + this.base64(this.templateText(data.tables));
        },
        exportHandler(event) {
            this.tableFn()
            console.log("this.table:",this.table);
            event.currentTarget.href = this.tableToExcel(this.table, '用户数据');
        },



        async isOpenCounselorRecommend(params) {
                let data = await isOpenCounselorRecommend(params)
                console.log(data);

                if( (data.code === 0) && (data.list.length > 0 )) {
                    console.log(data);
                }else{
                    console.log("出错或未查到数据:", data);
                }

            },

        async getData() {

            this.effectVal.pageIndex = this.page
            this.effectVal.pageSize = this.pageSize
            console.log(this.effectVal);
            let params = serialize(this.effectVal)
            console.log(params);
            let data = await obtainPsychoRecommendList(params)
            if (data.code == 0) {

                console.log(data);
                this.dataList = data.prDTOs;
                this.total = data.count;
                data.prDTOs.forEach((item) => { //checkBox
                    Vue.set(item, "checkState", false);
                })

            } else {
                alert(`errMsg:${data.msg}`)
            }
        },
        //全选
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
        //推荐专家活动流水全选
        selectAll2() {
            console.log(123);
            this.selectPersonAll2 = !this.selectPersonAll2
            this.selectPersonList2 = []
            console.log(this.selectPersonList2);
            if (this.selectPersonAll2) {
                this.searchList.forEach((item, index, arr) => {
                    item.checkState = true
                    this.selectPersonList2.push(item.soid)
                })
            } else {
                this.searchList.forEach((item, index, arr) => {
                    item.checkState = false
                })
            }
            console.log(`selectPerson2:${this.selectPersonList2}`)
        },

        //单击每个人物
        selectPerson(mid, item) {

            console.log(item.checkState);
            item.checkState = !item.checkState
            if (item.checkState) {
                this.selectPersonList.push(mid)
            } else {
                this.selectPersonList.shift(mid)
            }
            console.log(`selectPerson:${this.selectPersonList}`)
        },
        //活动订单流水选中其中一项
        selectPerson2(mid, item) {

            console.log("selectPerson2:",item.checkState);
            item.checkState = !item.checkState
            if (item.checkState) {
                this.selectPersonList2.push(mid)
            } else {
                this.selectPersonList2.shift(mid)
            }
            console.log(`selectPerson2:${this.selectPersonList2}`)
        },
        // ---------------------搜索
            exportHandler() {
                if (this.selectPersonList2.length == 0) {
                    //alert('请选择具体人员');
                    console.log("getFile");

                    this.exportPersonToExcel2();

                } else {
                    console.log(this.selectPersonList2);
                    this.exportPersonToExcel(this.selectPersonList2);
                }
            },

            async exportPersonToExcel(arr) { //添加推荐专家到数据库
                let arr1 = JSON.stringify(arr);
                let paramsObj = {
                    "ids": arr1
                }
                console.log(paramsObj, typeof paramsObj);
                let params = serialize(paramsObj)
                console.log(params, typeof params);

                console.log("getFile");

                let a = this.$els.a
                // let data = await exportServiceOrder2();
                let data = await exportServiceOrder2(params)
                console.log(data);
                let blob = new Blob([data],{'type': 'application/msexcel'})
                a.href = window.URL.createObjectURL(blob)
                this.downloadName ? a.download = `${this.downloadName}.xls` : 'excel.xls' ////////////////////
                a.click()

            },
            async exportPersonToExcel2() { //添加推荐专家到数据库
                let params = serialize(this.effectVal2);
                console.log(params);
                console.log("getFile");

                let a = this.$els.a
                // let data = await exportServiceOrder2();
                let data = await exportServiceOrder2(params)
                console.log(data);
                let blob = new Blob([data],{'type': 'application/msexcel'})
                a.href = window.URL.createObjectURL(blob)
                this.downloadName ? a.download = `${this.downloadName}.xls` : 'excel.xls' ////////////////////
                a.click()


            },

    },
    watch: {
        "picPath":function (val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal);
            if(val == "" || val == -1){
                $("#deleteCoverPic").attr({"disabled":"disabled"});//删除按钮不可用
                this.isDeletePic = 1;//已删除提示文字显示

            } else {
                $("#deleteCoverPic").removeAttr("disabled");//将按钮可用
                this.isDeletePic = 0;//已删除提示文字隐藏
            }
        },
        search_page(){
            this.getServiceOrder();
        },
        page(){
            this.getData();
        },

    },
    ready() {
        this.getData();
        this.getSearchVal();
        this.obtainRecommendData();
    }
}
</script>
