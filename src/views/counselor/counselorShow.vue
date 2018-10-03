<style type="text/css">
    .dialog-title {
        line-height: 50px;
    }
</style>
<template>

    <div class="container-fluid mid">
        <div id="search" class="title">
            <input type="text" id="bbbb" value="" placeholder="请输入搜索内容" v-model='searchVal.words' />
            <input class="input myInput" size="20" type="date" v-model='searchVal.begin' placeholder="开始时间">
            <input class="input myInput" size="20" type="date" v-model='searchVal.end' placeholder="结束时间">
            <select class="mr20" id="regTimeDirection" v-model='searchVal.regTimeDirection'>
                <option value="0">升序</option>
                <option value="1">降序</option>
            </select>
            <select class="mr20" id="" v-model="searchVal.isAudited">
                <option value="">全部</option>
                <option value="0">心猫专家库</option>
                <option value="1">客户专家库</option>
                <option value="2">申请对公服务</option>
            </select>
            <div class="myBtn" @click='getSearchVal'>搜索</div>
        </div>
        <table class="table table-bordered table-striped  mytable with-check" id="DataTables_Table_0">
            <thead>
            <tr>
                <th @click='selectAll' class="pointer span1">
                    <a href="javascript:;">全选</a>
                </th>
                <th class="span1">姓名</th>
                <th class="span1">手机号码</th>
                <th class="span1">职业类型</th>
                <th class="span1">服务价格</th>

                <th class="span1">真实咨询量</th>
                <th class="span1">显示咨询量</th>
                <th class="span1">状态</th>
                <th class="span2">对公服务状态</th>
                <th class="span1">申请入库操作</th>
                <th class="span1">操作</th>
                <th class="span1" style="width: 12em;">生成销售专属链接</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for='item in dataList'>
                <td>
                    <div class="checkbox">
                        <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp" name="title-table-checkbox" @click='selectPerson(item.mid,item)' :checked=" item.checkState? 'checked':''">
                        <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                    </div>
                </td>
                <td>{{item.nickname}}</td>
                <td>{{item.mobilePhone}}</td>
                <td>{{item.recommendWords}}</td>
                <td>{{item.priceAndTime}}</td>
                <td>{{item.phoneCount}}单</td>
                <td>{{item.phoneCountShow}}单</td>
                <td>{{item.isEnable | statusFilter}}</td>

                <td>{{item.isAudited | isAuditedFliter}}</td>
                <td>
                    <a href="javascript:;" v-show="item.isAudited != 2">无</a>
                    <a href="javascript:;" v-show="item.isAudited == 2" @click="enAudite(item,0)">通过</a>
                    <a href="javascript:;" v-show="item.isAudited == 2" @click="enAudite(item,1)">不通过</a>
                </td>

                <td>
                    <a href="javascript:;" style="color: rgb(43, 141, 249);" @click="route(item.mid, 'show')">查看</a>
                </td>
                <td>
                    <!--<button type="button"-->
                            <!--@click="copyHref(item.signature,item.nickname,item.mid,item.avatar,item.recommendWords)"-->
                            <!--v-clipboard:copy="message"-->
                            <!--v-clipboard:success="onCopy"-->
                            <!--v-clipboard:error="onError">复制</button>-->
                    <a href="javascript:;" style="color: rgb(43, 141, 249); width: 4em;display: inline-block;" @click="copyHref(item.advantage,item.nickname,item.mid,item.avatar,item.recommendWords,item.pLevel)">APP</a>
                    <template v-if="caid">
                        <a href="javascript:;" style="color: rgb(43, 141, 249); width: 4em;display: inline-block;" @click="copyHref2(item.mid, 2)">M站</a>
                        <a href="javascript:;" style="color: rgb(43, 141, 249); width: 4em;display: inline-block;" @click="copyHref2(item.mid, 3)">PC</a>
                    </template>


                </td>
            </tr>
            </tbody>
        </table>
        <div id="test" class="myPagenav">
            <zpagenav :page="page"  :page-size="pageSize"  :total="total"  :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
                <zpagenav>
        </div>
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




    </div>



    <div class="modal-backdrop {{dropState}}"></div>






    <!--隐藏input-->
    <textarea cols="20" rows="10" id="biao1" style="opacity: 0"></textarea>
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
    } from "../../api"


    import {
        serialize
    } from "../../utils"

    import Vue from "vue"
    import zpagenav from "vue-pagenav"

    import VueClipboard from 'vue-clipboard2'
    Vue.use(VueClipboard)

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
                    words: "  ",
                    isAudited: "" // 审核
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
                copyTxt:"",

                caid: '',
            }
        },
        methods: {
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


                this.effectVal.words = this.searchVal.words

                this.getData()
            },
            async getData() {
                this.effectVal.words = this.searchVal.words
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

            route(id, isShow) {
                this.$dispatch('child-msg', "查看专家详情")
                this.$route.router.go(`/expertsIn/${id}${isShow ? '?show=1' : ''}`)

            },

//            生成专属链接
            copyHref(advantage,nickname,mid,avatar,recommendWords,pLevel){
                var txt= {
                    xmMessageType: 102,
                    data: {
                        xmMessageType: 102,
                        conslt_motto: advantage,
                        conslt_name:nickname,
                        conslt_id:mid,
                        conslt_avator:avatar,
                        conslt_nickName:recommendWords,
                        conslt_pLevel:pLevel
                    }
                };
                this.copyTxt=JSON.stringify(txt);
                this.copyToClipboard();
            },
//            onCopy(){
//              alert(1)
//            },
//            onError(){
//              alert(2)
//            },
            copyToClipboard() {
                var Url2=document.getElementById("biao1");
                Url2.innerHTML=this.copyTxt;
//                console.log(Url2)
                Url2.select(); // 选择对象
//                console.log( this.copyTxt)
                document.execCommand("Copy"); // 执行浏览器复制命令
//                console.log(3)
                alert("APP销售专属链接已生成，已复制到剪切版");
            },

            copyHref2(mid, fromType) {
                // 生成M站或者PC链接
                // paraments[@"caid"] = caid;
                // paraments[@"psychoId"] = psychoId;
                // paraments[@"mid"] = MID;
                // paraments[@"type"] = @"2";
                // paraments[@"statusCode"] = statusCode;  时间戳  content.data.statusCode = new Date().getTime()

                // TODO 生成专属链接
                let preHref = ''

                fromType === 2 && (preHref = process.env.NODE_ENV =='production' ? 'https://m.120xinmao.com/experts/' : '192.168.0.88:8080/experts/');
                fromType === 3 && (preHref = process.env.NODE_ENV =='production' ? 'https://120xinmao.com/expert/detail/' : '192.168.0.47:8080/expert/detail/');


                let url = preHref + `${mid}?caid=${this.caid}&type=2&fromType=${fromType}&statusCode=${new Date().getTime()}`
                this.copyTxt = url
                this.copyToClipboard2(fromType); //1 app 2 m 3PC

            },

            copyToClipboard2(fromType) {
                var Url2=document.getElementById("biao1");
                Url2.innerHTML=this.copyTxt;
                Url2.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                fromType === 2 && alert('M站销售专属链接已生成，已复制到剪切版');
                fromType === 3 && alert('PC站销售专属链接已生成，已复制到剪切版');
            },
            async getUserDetailInfoFn() {
                let data =  await getResponses('assistantConsult/selectConsultAssistant.json', `userAccount=${sessionStorage.userphone}&pageIndex=1&pageSize=10`)
                if (data.code === 0) {

                    if (data.data.length) {
                        // isEnable	0 启用 1 禁用
                        // 助理账号
                        this.caid = data.data[0].caid



                    } else {

                        this.caid = ''
                    }


                } else {
                    alert(data.msg)
                }

            },
        },
        filters: {
            statusFilter(num) {
                let chargeWayArr = ['启用', '禁用']
                return chargeWayArr[num]
            },
            isAuditedFliter(num) {
                let chargeWayArr = ['心猫专家库', '客户专家库', '申请对公服务']
                return chargeWayArr[num]
            }
        },
        ready() {
            this.$dispatch('child-msg', "")
            this.getData()
            this.getUserDetailInfoFn()

        }
    }
</script>