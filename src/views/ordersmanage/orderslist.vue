<style>
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
        min-width: 400px;
        /* height: 420px; */
        background-color: white;
        position: absolute;
        top: 200px;
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

    .modal_userList_Wrap>ul {
        padding:0px  20px;
    }

    .modal_userList_Wrap>ul>li {
        display: flex;

    }
    .modal_userList_Wrap>ul>li>span {
        line-height: 40px;
        display: flex;
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

    .modal_userList_box_left_span_sel1 {
        /* width: 60px; */
        padding: 5px 6px;
        width: 55px;
        cursor: pointer;
        margin-bottom: 0;
        height: 31px;
    }

    .telInp {
        /* display: inline-block;
        height: 30px;
        line-height: 20px;
        padding: 0;
        margin: 0;
        outline: none;
        border: 1px solid gray;
        width: 175px; */
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

    .modal_userList_box_left_span_sel2 {
        padding: 4px 6px;
        width: 184px;
        cursor: pointer;
    }

    /* .modal_userList_box_right_span {
        text-indent: 6px;
    } */

    .modal_userList_Wrap_title_cancel_valet {
        line-height: 200px;
        text-align: center;
        font-size: 20px;
    }

    .modal_userList_Wrap_bottom_rightBtn.disabled {
        color: #666666;
        pointer-events: none;
    }
</style>
<template>
    <div>
        <div class="container-fluid">
            <div id="search" class="title">
              <span>下单渠道：</span>
              <select v-model="orderSource">
                  <option value="">全部</option>
                  <option :value="0">APP下单</option>
                  <option :value="1">代客下单</option>
              </select>
              <span>订单标记：</span>
              <select v-model="orderStatus">
                  <!--orderStatusList: ['超时失效','用户取消','专家取消', '专家拒单', '已写手记', '未写手记', '进行中', '异常处理'],-->
                  <!--9 未选时间  10 已选时间-->
                  <option value="">全部</option>
                  <option :value="1">超时失效</option>
                  <option :value="2">用户取消</option>
                  <option :value="3">专家取消</option>
                  <option :value="4">专家拒单</option>
                  <option :value="6">未写手记</option>
                  <option :value="5">已写手记</option>
                  <!--<option :value="7">进行中</option>-->
                  <!--<option :value="8">异常处理</option>-->

              </select>
              <span style="margin-left: 11px;">咨询助理：</span>
              <select name="" id="" v-model="caid">
                  <option value="">全部</option>
                  <template  v-for="item in assistantList">
                      <option v-if="item.nickname" :value="item.caid">{{ item.nickname }}</option>
                  </template>

              </select>
              <time-range @ddd="ddd">

              </time-range>
                <select v-model="type" style="width: 54px;">
                    <!--7 退款处理中 8 退款已处理 9：待接单 10：待服务 13：进行中 14：待评价 15：已评价 17：已取消-->
                    <!--6：已处理 7：待处理 8：已退款-->
                    <option value="-1">全部</option>

                    <option :value="9">待接单</option>
                    <option :value="10">待咨询</option>
                    <option :value="13">进行中</option>
                    <option :value="14">待评价</option>
                    <option :value="15">已评价</option>
                    <option :value="17">已取消</option>

                    <option :value="7">待处理</option>
                    <option :value="6">已处理</option>
                    <option :value="8">已退款</option>

                    <!--<option :value="7">退款处理中</option>-->
                    <!--<option :value="8">退款已处理</option>-->
                </select>





                <!--TODO 订单列表增加咨询助理搜索条件-->


                <br>

                <span>是否预约：</span>
                <select v-model="orderType">
                    <option value="">全部</option>
                    <option :value="1">预约</option>
                    <option :value="0">非预约</option>
                </select>
                <!--consultType :1 全部 2：电话咨询 3：第三方咨询-->
                <span>咨询形式：</span>
                <select v-model="consultType">
                    <option :value="1">全部</option>
                    <option :value="2">电话咨询</option>
                    <option :value="3">第三方咨询</option>
                    <option :value="4">图文咨询</option>
                </select>
                <span>是否为EAP：</span>
                <select v-model="isEap">
                    <option value="">全部</option>
                    <option :value="1">EAP</option>
                    <option :value="0">非EAP</option>

                </select>
                <input type="text" placeholder="订单号" v-model="no">
                <input type="text" placeholder="关键词" v-model="keyword" style="margin-left: 9px;">
                <input type="submit" value="搜索" class="btn btn-success" @click="searchFn()" style="margin-left:11px;">


                <!--<span>咨询助理：</span>-->
                <!--<select v-model="">-->
                    <!--<option :value="1">全部</option>-->
                    <!--<option :value="2">电话咨询</option>-->
                    <!--<option :value="3">第三方咨询</option>-->
                <!--</select>-->

            </div>
        </div>


        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0" style="min-width: 2500px;">
            <thead>
                <th>
                    <div class="checkbox">
                        <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-th"
                               @click='selectAll' :checked="checkAllState">
                        <label for="title-table-th" class="checkboxLabel"></label>
                    </div>
                </th>
                <th>母订单号</th>
                <th>订单号</th>
                <th>咨询时间</th>
                <th>创建时间</th>

                <th>求助者账号</th>
                <th>昵称</th>
                <th>求助者手机号</th>
                <th>专家姓名</th>
                <th>专家手机号</th>
                <th>服务费用</th>
                <th>通话时长</th>
                <th>咨询形式</th>
                <!--新增咨询次数-->
                <th>咨询次数</th>
                <th>使用咨询券的面额</th>
                <th>佣金比例</th>
                <th>平台收入</th>
                <th>咨询师实得</th>
                <th>求助者实付</th>
                <th>订单状态</th>
                <th>订单标记</th>
                <th>下单渠道</th>
                <th>是否预约</th>
                <th style="width: 120px;">预约服务时间（套餐母订单显示最近未咨询的预约时间）</th>

                <th>是否为EAP</th>
                <th>咨询助理</th>
                <!--跟进凭证-->
                <th>跟进凭证</th>
                <th>操作</th>
            </thead>
            <tbody v-el:tt>
                <template v-for="item of list">
                    <tr>
                        <td>
                            <div class="checkbox">
                                <input type="checkbox" class="checkboxInp" name="title-table-checkbox"
                                       id="title-table-td{{item.no}}" :checked=" item.checkState? 'checked':''"  @click='selectPerson(item.no, item)' data-typeId="{{item.no}}">
                                <label class="checkboxLabel" for="title-table-td{{item.no}}"></label>
                            </div>
                        </td>
                        <td>
                            <template v-if="item.orderType === 10">
                                {{ item.no }}
                            </template>
                            <template v-else>

                            </template>
                        </td>
                        <td>

                            <template v-if="item.orderType === 10">

                                <div  @click="changeFoldState(item.no, item.status)" style="cursor: pointer;font-size: 24px;color:rgb(43, 141, 249);line-height: 30px;">
                                    <i class="icon" :class="{ 'icon-chevron-down' : !item.foldState , 'icon-chevron-up' : item.foldState }"></i>
                                </div>
                            </template>
                            <template v-else>
                                {{ item.no }}
                            </template>
                        </td>
                        <td v-text="item.serviceRealityBeginTime"></td>
                        <td v-text="item.createTime"></td>
                        <td v-text="item.consumersAccount"></td>
                        <td v-text="item.nickname">昵称</td>
                        <td v-text="item.consumersPhone"></td>
                        <td v-text="item.specialistName"></td>
                        <td v-text="item.specialistPhone"></td>
                        <td v-text="item.price + '元'"></td>
                        <td v-text="item.practicalDuration | durationFormat"></td>
                        <td v-text="item.consultType | format"></td>
                        <td v-text="item.consultTimes"></td>
                        <td v-text="item.discountAmount + '元'"></td>
                        <td v-text="item.commissionRate + '%'"></td>
                        <td v-text="item.platformIncome.toFixed(2)"></td>
                        <td v-text="item.serviceRealityAmount + '元'"></td>
                        <td v-text="item.cashAmount + '元'"></td>

                        <!--订单状态-->
                        <td v-text="item.status | typeFormat"></td>
                        <!--订单标记-->
                        <td>{{ orderStatusList[item.orderStatus - 1] }}</td>
                        <!--<td v-text="item.orderStatus | typeFormat1"></td>-->


                        <td v-text="item.platformChannel"></td>

                        <!--是否预约-->
                        <td>
                            <template v-if="item.orderType  === 3||item.orderType===10">
                                预约
                            </template>
                            <template v-else>
                                非预约
                            </template>
                        </td>

                        <!--预约服务时间-->
                        <td style="width: 120px;"> {{ item.bespeakTime }} </td>


                        <td>{{ item.eeId | isEapFilter }}</td>
                        <td>{{item.assistantName}}</td>
                        <!--跟进凭证-->
                        <td>
                            <span class="normal-operate-state" @click="toSeeMore(item.no)">查看</span>
                        </td>
                        <td>

                            <!--6：已处理 7：待处理 8：已退款-->
                            <span class="normal-operate-state" v-if="item.status === 17" style="min-width: 6em;" @click="toCheckCancelReasonFn(item.refuseReason)">查看取消原因</span>

                            <span class="normal-operate-state" v-if="item.status === 5&&item.orderType!=10" @click="overNo(item)">结束订单</span>

                            <span class="normal-operate-state" style="min-width: 7em;" v-if="(item.status === 14&&item.orderType!=10) || (item.status === 15&&item.orderType!=10)" @click="pingjia(item.no)">投诉/退款申请</span>

                            <!--<span class="normal-operate-state" v-if="item.status === 7" @click="tui(item, 7)">退款</span>-->

                            <span class="normal-operate-state" style="min-width: 7em;" v-if="item.status === 7&&item.orderType!=10" @click="pendingFn(item.no, item.remarks)">投诉/退款处理</span>
                            <!--  View processing records  -->
                            <span class="normal-operate-state" style="min-width: 8em;" v-if="item.status === 6 || item.status === 8&&item.orderType!=10" @click="viewProcessingRecords(item.soid)">点击查看处理记录</span>
                            <span class="normal-operate-state" @click="seeNodes(item.soid)" v-if="item.orderStatus===5&&item.orderType!=10">查看脱敏手记</span>

                            <span class="normal-operate-state" @click="toCancelOrderFn(item.soid)" v-if="(item.orderType!=10&&item.status===10)||(item.orderType===10&&item.status===9)">取消订单</span>

                        </td>
                    </tr>
                    <template v-if="item.foldState">
                        <tr v-for="n in item.childOrder" >
                            <td>
                                <div class="checkbox">

                                </div>
                            </td>
                            <td v-text="item.no"></td>
                            <td v-text="n.no"></td>
                            <td v-text="n.serviceRealityBeginTime"></td>
                            <td v-text="n.createTime"></td>
                            <td v-text="n.consumersAccount"></td>
                            <td v-text="n.nickname">昵称</td>
                            <td v-text="n.consumersPhone"></td>
                            <td v-text="n.specialistName"></td>
                            <td v-text="n.specialistPhone"></td>
                            <td v-text="n.price + '元'"></td>
                            <td v-text="n.practicalDuration | durationFormat"></td>
                            <td v-text="n.consultType | format"></td>
                            <td v-text=""></td>
                            <td v-text="n.discountAmount + '元'"></td>
                            <td v-text="n.commissionRate + '%'"></td>
                            <td v-text="n.platformIncome.toFixed(2)"></td>
                            <td v-text="n.serviceRealityAmount + '元'"></td>
                            <td v-text="n.cashAmount + '元'"></td>

                            <!--订单状态-->
                            <td v-text="n.status  | typeFormat"></td>
                            <!--订单标记-->
                            <td>{{ orderStatusList[n.orderStatus - 1] }}</td>
                            <!--<td v-text="n.orderStatus | typeFormat1"></td>-->

                            <td v-text="n.platformChannel"></td>

                            <!--是否预约-->
                            <td>
                                <template v-if="n.orderType  === 3||n.orderType===11">
                                    预约
                                </template>
                                <template v-else>
                                    非预约
                                </template>
                            </td>

                            <!--预约服务时间-->
                            <td style="width: 120px;"> {{ n.bespeakTime }} </td>



                            <td>{{ n.eeId | isEapFilter }}</td>
                            <td>{{n.assistantName}}</td>
                            <!--跟进凭证-->
                            <td>
                                <!--<span class="normal-operate-state" @click="toSeeMore">查看</span>-->
                            </td>
                            <td>


                                <!--6：已处理 7：待处理 8：已退款-->
                                <span class="normal-operate-state" v-if="n.status === 17" style="min-width: 6em;" @click="toCheckCancelReasonFn(n.refuseReason)">查看取消原因</span>

                                <span class="normal-operate-state" v-if="n.status === 5" @click="overNo(n)">结束订单</span>

                                <span class="normal-operate-state" style="min-width: 7em;" v-if="n.status === 14 || n.status === 15" @click="pingjia(n.no)">投诉/退款申请</span>

                                <!--<span class="normal-operate-state" v-if="n.status === 7" @click="tui(n, 7)">退款</span>-->

                                <span class="normal-operate-state" style="min-width: 7em;" v-if="n.status === 7" @click="pendingFn(n.no, n.remarks)">投诉/退款处理</span>
                                <!--  View processing records  -->
                                <span class="normal-operate-state" style="min-width: 8em;" v-if="n.status === 6 || n.status === 8" @click="viewProcessingRecords(n.soid)">点击查看处理记录</span>
                                <span class="normal-operate-state" @click="seeNodes(n.soid)" v-if="n.orderStatus===5">查看脱敏手记</span>

                                <span class="normal-operate-state" @click="toCancelOrderFn(n.soid, 2, n.serviceProviderId)" v-if="item.status===10&&n.orderStatus === 10">取消订单</span>

                            </td>
                        </tr>
                    </template>

                </template>

            </tbody>
        </table>
        <div class="order-modal" v-if="status" @click="status = false" transition="order-modal">
            <div class="order-modal-content" @click.stop>
                <h2>确定要取消此订单？</h2>
                <textarea placeholder="取消原因" v-model="reason"></textarea>
                <button @click="sureCancel">确定</button>
            </div>
        </div>
        <div class="order-modal" v-if="wei" @click="wei = false" transition="order-modal">
            <div class="order-modal-content" @click.stop>
                <h2>确定要已处理此订单？</h2>
                <textarea placeholder="输入备注" v-model="reasonWei"></textarea>
                <button @click="sureCancelWei">确定</button>
            </div>
        </div>
        <div class="order-modal" v-if="tuiStatus" @click="tuiStatus = false" transition="order-modal">
            <div class="order-modal-content" @click.stop style="width: 450px">
                <h2>退款到用户帐户</h2>
                <p>（备注：金额和比例任意不为空时，优惠券不退换。金额和比例都为空时，平台收入和优惠券退还给用户）</p>
                <label>
                    <input type="radio" :value="0" v-model="tuiType"> 按金额
                </label>
                <label>
                    <input type="radio" :value="1" v-model="tuiType"> 按比例
                </label>
                <input type="text" placeholder="按金额" v-model="tui1" v-if="tuiType === 0" @keyup="clearNoNum(tui1)">
                <input type="text" placeholder="按比例" v-model="tui2" v-else @keyup="clearNoNum1(tui2)">
                <label>
                    <input type="checkbox" v-model="tui3"> 扣除咨询师收入部分
                </label>
                <!--<button @click="sureTui">确定</button>-->

                <div style="display: flex; justify-content: space-between;">
                    <button @click="tuiStatus = false">取消</button>
                    <button @click="sureTui(0)">退款到余额</button>
                    <button @click="sureTui(1)">退款到支付源</button>
                </div>

            </div>
        </div>
        <div class="order-modal" v-if="yiT" @click="yiT = false" transition="order-modal">
            <div class="order-modal-content" @click.stop>
                <h2>退款到用户帐户</h2>
                <p>（备注：金额和比例任意不为空时，优惠券不退换。金额和比例都为空时，平台收入和优惠券退还给用户）</p>
                <input type="text" placeholder="按金额" v-model="yiT1">
                <input type="text" placeholder="按比例" v-model="yiT2">
                <label>
                    <input type="checkbox" v-model="yiTCheck"> 扣除咨询师收入部分
                </label>
                <button @click="sureCancelYiT">确定</button>
            </div>
        </div>
        <div class="order-modal" v-if="tousuStatus" @click="tousuStatus = false" transition="order-modal">
            <div class="order-modal-content" @click.stop>
                <h2>确定投诉此订单？</h2>
                <textarea placeholder="输入备注" v-model="reasonTousu"></textarea>
                <button @click="sureTousu">确定</button>
            </div>
        </div>
        <div class="order-modal" v-if="tousuStatusW" @click="tousuStatusW = false" transition="order-modal">
            <div class="order-modal-content" @click.stop>
                <h2>确定投诉此订单？</h2>
                <textarea placeholder="输入备注" v-model="reasonTousuW"></textarea>
                <button @click="sureTousuW">确定</button>
            </div>
        </div>


        <!--待评价/已评价   投诉/退款申请  点击弹窗填写申请原因-->
        <div class="order-modal" v-if="pingjiaStatusW" @click="pingjiaStatusW = false" transition="order-modal">
            <div class="order-modal-content" @click.stop style="height: auto;">
                <textarea placeholder="请输入投诉/退款申请原因" v-model="reasonpingjiaW"></textarea>
                <div style="display: flex; justify-content: space-between;">
                    <button @click="cancelPingjiaFn">取消</button>
                    <button @click="surepingjiaW">确定</button>
                </div>
            </div>
        </div>


        <!-- 待处理      投诉/退款处理  点击弹窗，查看申请原因&&填写处理记录及结果&&选择是否退款 -->
        <div class="order-modal" v-if="pendingStatus" @click="pendingStatus = false" transition="order-modal">
            <div class="order-modal-content" @click.stop style="height: auto; width: 500px;">
                <div style="margin-bottom: 50px;">
                    <p>投诉/退款申请原因:</p>
                    <p v-text="pendingReason"></p>
                </div>
                <textarea placeholder="请输入投诉/退款处理记录" v-model="operationLog"></textarea>
                <div style="display: flex; justify-content: space-between;">
                    <button @click="pendingStatus = false">取消</button>
                    <button @click="overHandleFn">处理结束</button>
                    <button @click="sureHandlePendingFn">退款</button>
                </div>
            </div>
        </div>

        <!--查看处理记录-->
        <div class="order-modal" v-if="viewProcessingRecordsState" @click="viewProcessingRecordsState = false" transition="order-modal">
            <div class="order-modal-content" @click.stop style="height: auto; width: 550px;">
                <div style="margin-bottom: 30px;">
                    <p>投诉/退款申请原因:</p>
                    <p v-text="pendingReason"></p>
                </div>
                <div style="margin-bottom: 30px;">
                    <p>投诉/退款申请记录:</p>
                    <p v-text="operationLog"></p>
                </div>

                <div style="margin-bottom: 50px;display: flex">
                    <div style="margin-right: 10px"><span>心猫退款:</span><span v-text="refundAcountByPlat+'元'"></span></div>
                    <div style="margin-right: 10px"><span>专家退款:</span><span v-text="refundAcountByService+'元'"></span></div>
                    <div style="margin-right: 10px"><span>用户余额增加:</span><span v-text="usermoney+'元'"></span></div>
                    <div style="margin-right: 10px"><span>订单状态:</span><span v-text="notestatus==0?'专家未收到钱':'已写手记'"></span></div>
                </div>
                <div style="display: flex; justify-content: center;">
                    <button @click="viewProcessingRecordsState = false">返回</button>
                </div>
            </div>
        </div>


        <!--结束订单-->
        <div class="order-modal" v-if="overState" @click="overState = false" transition="order-modal">
            <div class="order-modal-content" style="height:60px" @click.stop>
                <h2>确定结束此订单？</h2>
                <button @click="overCanel">确定</button>
            </div>
        </div>


        <!--查看取消原因-->
        <div class="order-modal" v-if="cancenReasonConState" @click=" cancenReasonConState = false" transition="order-modal">
            <div class="order-modal-content musicList" style="padding: 20px;height: 400px;" @click.stop>
                <div style="display: flex; height: 300px; justify-content: center; align-items: center;">
                    <div>
                        {{ refuseReason }}
                    </div>
                </div>
                <button @click=" cancenReasonConState = false">确认</button>
            </div>
        </div>


        <div class="order-page" v-if="total" style="display: flex;">
            <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
            </zpagenav>

            <span class="w-s-l-m">下单人数总计： <span v-text="consultNum"></span>人</span>
            <span class="w-s-l-m">求助者实付总计：<span v-text="allAmount"></span>元</span>
            <!-- <div class="operator-area"> -->
                <!-- <span>{{count}}条订单</span> -->
                <span class="btn btn-success" @click="downloadExcel" v-if="!isWaitingForExcel" style="margin-left: 206px;margin-top: 2px;height: 22px;" >导出Excel</span>
                <span class="btn btn-success" style="cursor:wait;margin-left: 206px;margin-top: 2px;height: 22px;" v-else>请求中。。。</span>

                <!-- <a href="javascript:;" v-el:a></a> -->
            <!-- </div> -->
        </div>

        <!--脱敏手记查看-->
        <div class="modal_userList_cover" v-if="seeNodeState">
            <div class="modal_userList_Wrap">
                <div class="modal_userList_Wrap_title">
                    咨询者信息
                </div>
                <div style="padding: 0 20px">
                    <div>姓名：<span>{{NodeDetail.customerName}}</span></div>
                    <div>咨询时间：<span>{{NodeDetail.consultTime}}</span></div>
                    <div>性别：<span>{{NodeDetail.customerSex|sex}}</span></div>
                    <div>年龄：<span>{{NodeDetail.customerAge}}</span></div>
                    <div>职业：<span>{{NodeDetail.customerProfession}}</span></div>
                    <div>咨询类型：<span>{{NodeDetail.consultTag}}</span></div>
                    <div>后续安排（建议下一次咨询时间）：<span>{{NodeDetail.nextConsultTime|nextConsultTime }}</span></div>
                    <div>对助理的留言：<span>{{NodeDetail.assistantRemark}}</span></div>
                </div>
                <div class="modal_userList_Wrap_bottom">
                    <span class="modal_userList_Wrap_bottom_rightBtn" @click="seeNodeState=false" style="color: #333">确认</span>
                </div>
            </div>
        </div>


        <!--待咨询订单，操作，添加取消订单功能 点击弹窗写理由，确认订单变为已取消-->
        <div class="order-modal" v-if="cancelOrderState" @click="cancelOrderState = false" transition="order-modal">
            <div class="order-modal-content" @click.stop style="height: auto;">
                <textarea placeholder="50字以内" v-model="cancelOrderReason" maxlength="50"></textarea>
                <div style="display: flex; justify-content: space-between;">
                    <button @click="cancelOrderState = false">返回</button>
                    <button @click="sureToCancelOrderFn">确定</button>
                </div>
            </div>
        </div>

        <!--点击，弹窗，只读查看，crm跟进页面，转化为下单用户时的弹窗-->
        <!-- 编辑跟进人和备注 -->
        <div class="modal-backdrop in" v-if="remarkStu"></div>
        <div id="edtCount2" class="modal" v-if="remarkStu" style="width: 1000px;top:20px;margin-left: 0;transform: translateX(-50%)">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="remarkStu=false">×</button>
                <h3>查看</h3>
            </div>
            <div class="modal-body row-fluid" style="max-height: 800px;">
                <div class="form-horizontal">
                    <label class="control-label">订单号 :</label>
                    <div class="controls form-horizontal">
                        <input type="text" class="span11 username" v-model="remarkNo" name="editRemRes"/>
                    </div>
                </div>
                <div class="form-horizontal">
                    <label class="control-label">服务期限：</label>
                    <div class="controls form-horizontal">
                        <input type="text" class="span11 username" v-model="remarkYear" name="editRemRes"/>
                    </div>
                </div>
                <div class="form-horizontal">
                    <label class="control-label">充值/聊天截图：</label>
                    <div class="controls form-horizontal">
                        <div class="wrap">
                            <div class="box" style="margin-bottom: 50px">
                                <div v-for="item of imgarr" style="margin-bottom: 30px">
                                    <div>
                                        <a :href="" target="_blank" rel="noopener noreferrer nofollow">
                                            <img alt="" width="300" height="200" :src="url + item">
                                        </a>
                                    </div>
                                    <div class="box-bottom">

                                    </div>
                                </div>

                                <!--<div>-->
                                    <!--<div>-->
                                        <!--<a :href="url + id2" target="_blank" rel="noopener noreferrer nofollow">-->
                                            <!--<img alt="" width="300" height="200" :src="url + id2">-->
                                        <!--</a>-->
                                    <!--</div>-->
                                    <!--<div class="box-bottom">-->

                                    <!--</div>-->
                                <!--</div>-->
                            </div>

                            <!--<div class="box">-->
                                <!--<div>-->
                                    <!--<div>-->
                                        <!--<a :href="url + id3" target="_blank" rel="noopener noreferrer nofollow">-->
                                            <!--<img alt="" width="300" height="200" :src="url + id3">-->
                                        <!--</a>-->
                                    <!--</div>-->
                                    <!--<div class="box-bottom">-->
                                    <!--</div>-->
                                <!--</div>-->

                                <!--<div>-->
                                    <!--<div>-->
                                        <!--<a :href="url + id4" target="_blank" rel="noopener noreferrer nofollow">-->
                                            <!--<img alt="" width="300" height="200" :src="url + id4">-->
                                        <!--</a>-->
                                    <!--</div>-->
                                    <!--<div class="box-bottom">-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->


                        </div>
                    </div>

                </div>

            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click="remarkStu=false">取消</a>
            </div>
        </div>

    </div>

</template>
<script>
    import calendar from "../../calendar.vue"
    import moment from "moment"
    import Vue from "vue"

    import timeRange from "components/timeRange"
    // import zpagenav from "vue-pagenav"

    import {
        qiniuMp3
    } from '../../envConfig.js'

    import {
        getOrder,
        cancelOrder,
        handleOrder,
        handleTousu,
        handleTousuW,
        handleTui,
        exportServiceOrder,
        closeServiceOrder,
        getRecordName, // 下载音乐
        getResponses,
    } from "../../api"
    import pages from "vue-pagenav"




    export default {
        // 	# Options
        // * :show    是否显示
        // * :type    date|datetime
        // * :value	默认值
        // * :begin  可选开始时间
        // * :end    可选结束时间
        // * :x      显示x坐标
        // * :y      显示y坐标
        // * :range  是否多选
        // * :weeks	星期标题
        // * :months	月份标题
        // * :sep		分隔符

        data() {
            return {
                // 数据绑定
                calendar: {
                    show: false,
                    x: 0,
                    y: 0,
                    picker: "",
                    type: "date",
                    value: "",
                    begin: "",
                    end: "",
                    value: "",
                    weeks: [],
                    months: [],
                    sep: "-",
                    range: false,
                    items: {
                        // 单选模式
                        picker1: {
                            type: "date",
                            end: moment().format().split('T')[0],
                            value: "",
                            sep: "-",
                            weeks: ['日', '一', '二', '三', '四', '五', '六'],
                            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        },
                        picker2: {
                            value: this.start,
                            sep: "-",
                            begin: this.start
                        }
                    }
                },
                qiniuMp3: qiniuMp3,
                ff: [],
                no: "",
                keyword: "",
                type: -1,
                typeb: -1,
                startTime: "",
                endTime: "",
                show: false,

                orderSource: "",
                orderType: "",
                orderStatus: "",
                caid: '',

                orderStatusList: ['超时失效','用户取消','专家取消', '专家拒单', '已写手记', '未写手记', '', '', '未选时间', '已选时间'],
                isEap: "",


                wei: false,
                reasonWei: "",

                weiT: false,
                weiT1: "",
                weiT2: "",
                weiTCheck: false,

                yiT: false,
                yiT1: "",
                yiT2: "",
                yiTCheck: false,


                list: [],
                status: false,
                reason: "",
                count: 0,

                pageCount: 10,
                page: 1,
                pageSize: 10,
                total: 0,
                maxLink: 0,


                tousuStatus: false,
                reasonTousu: "",
                tousuStatusW: false,
                reasonTousuW: "",

                pingjiaStatusW: false, // 评价窗口
                reasonpingjiaW: "", // 评价内容

                overState: false,

                musicState: false, // 音乐内容弹窗
                musicList: [],

                tuiStatus: false,
                tui1: "",
                tui2: "",
                tui3: "",
                tuiType: 0,
                isWaitingForExcel: false,
                cancenReasonConState: false,

//                notestatusList: ['待写手记', '已写手记', '超时失效', '用户取消', '专家取消', '专家拒单'],
                recentPageCheckedNumber: '',

                selectPersonList: [],
                selectPersonAll: false,
                isExportingExcel: false,

                sStatus: '',
                refuseReason: '',

                sTime: '',
                eTime: '',

                consultType: 1,

            //    待处理    投诉/退款处理   点击弹窗，查看申请原因&&填写处理记录及结果&&选择是否退款
                pendingStatus: false,
                pendingReason: '',
                operationLog: '',
//                心猫退款
                refundAcountByPlat:"",
//                咨询师退款
                refundAcountByService:"",
//                用户余额增加
                usermoney:"",
                notestatus:"",
                // 查看处理记录
                viewProcessingRecordsState: false,

                orderNo: '',

            //    总金额
                allAmount: '',
                consultNum: '',

//                脱敏手记
                seeNodeState:false,
                NodeDetail:[],

                cancelOrderState: false,
                cancelOrderReason: '',
                cancelSoid: '',

                assistantList: [],

                // 查看跟进凭证

                childList: [1, 3, 5],

                //   已取消和待接单状态合集
                flagList: [9, 11, 12, 16, 17],
                url: `http://${process.env.NODE_ENV == 'production' ? "picture.120xinmao.com/" : "oml9ntix5.qnssl.com/" }`,

                // 展开状态数组集合

                // 套餐中子订单取消订单标识
                childCancelOrder: false,
                childPsychoId: '',

//                跟进凭证标识
                remarkStu:false,
                remarkNo:"",
                remarkYear:"",
                imgarr:[],
            }
        },
        components: {
            pages,
            calendar,
            timeRange
        },
        watch: {
            show(value) {
                if (value) {
                    this.$els.input.disabled = true
                } else {
                    this.$els.input.disabled = false
                }
            },
            type(value) {

                this.page = 1
            },
            weiT1(value) {

                this.weiT2 = ""
            },
            weiT2(value) {

                this.weiT1 = ""
            },


        },
        filters: {
            format(value) {
                // consultType :1 全部 2：电话咨询 3：第三方咨询
                console.log(value);
                  // let types = ["电话咨询", "第三方咨询", "图文咨询"]
                // return types[value - 2]
                let types = {
                    2:  '电话咨询',
                    3:  '第三方咨询',
                    4:  '图文咨询'
                };
                return types[value]
            },
            typeFormat(value) {
                // <!--7 退款处理中 8 退款已处理 9：待接单 10：待服务 13：进行中 14：待评价 15：已评价 17：已取消-->
                //  <!--6：已处理 7：待处理 8：已退款-->
                // 已取消和待接单状态合集 [9, 11, 12, 16, 17]
                let types = {
                    6:  '已处理',
                    7:  '待处理',
                    8:  '已退款',
                    9:  '待接单',
                    10: '待咨询',
                    13: '进行中',
                    14: '待评价',
                    15: '已评价',
                    17: '已取消',
                    11: '已取消',
                    12: '已取消',
                    16: '已取消',
                    null:"待咨询"
                };

                return types[value]
            },
            typeFormat1(value) {
                let types = {
                    0: '未付款',
                    1: '已付款',
                    2: '未评价',
                    3: '已评价',
                    5: '进行中',
                    20:'待接单',
                    21:'待服务',
                    22:'已取消',
                    30:'已处理',
                    31:'待处理',
                    32:'已退款',
                    41:'已选时间',
                    42:'未选时间',
                };

                return types[value]
            },
            durationFormat(value) {
                // return `${~~ (value / 60)}'${value % 60}"`
                return parseInt(value / 60)
            },
            isEapFilter(value) {
               if (value === 0) {
                   return '非EAP'
               } else {
                   return 'EAP'
               }
            },
            sex(value){
                if(value===0){
                    return "未知";
                }else if(value===1){
                    return "男";
                }else if(value===2){
                    return "女";
                }
            },
            nextConsultTime(value){
                if(value){
                    return value.split(" ")[0];
                }else{
                    return value
                }

            }
        },
        methods: {
            clearNoNum(val){
                val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
                val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
                val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
                if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    val= parseFloat(val);
                }
                this.tui1=val;
            },
            clearNoNum1(val){
                val = val.replace(/[^\d]/g,"");  //清除“数字”和“.”以外的字符
//                val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
//                val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
//                val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
//                if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
//                    val= parseFloat(val);
//                }
                this.tui2=val;

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

            async getMusic(id) {

                let data = await getRecordName(`soid=${id}`)
                if (data.code == 0) {
                    this.musicState = true
                    this.musicList = data.recordName

                } else {
                    alert('errMsg:' + data.msg)
                }


            },
            serialize(hash) {
                let result = []

                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })

                return result.join("&")
            },
            searchFn() {
                this.page = 1
                this.search()
            },

            paramsFn() {
                this.typeb = this.type

                let params = {}

                if (this.typeb) {
                    if (this.typeb != -1) {
                        params.status = this.typeb
                    }
                }

                this.startTime && (params.createTime = this.startTime)
                this.endTime && (params.endTime = this.endTime)
                params.pageIndex = this.page
                this.no && (params.no = this.no.trim())
                this.pageSize && (params.pageSize = this.pageSize)
                this.keyword.trim() && (params.words = this.keyword.trim())

                // createTimeDirection	排序方式	number	0：按时间升序 1：按时间降序
                params.createTimeDirection = 1;

                (this.orderSource === 0 || this.orderSource === 1) && (params.orderSource = this.orderSource);


                (this.orderType === 0 || this.orderType === 1) && (params.orderType = this.orderType);

                this.orderStatus && (params.orderStatus = this.orderStatus);
                (this.caid || this.caid === 0) && (params.caid = this.caid);

                (this.isEap === 0 || this.isEap === 1) && (params.isEap = this.isEap);
                params.consultType = this.consultType;

                return params
            },
            async search() {
                this.list = []


                let data = await getResponses('ServiceOrder/getNewServiceOrderByPage.json',this.serialize(this.paramsFn()))
                if (data.code === 0) {
                    this.list = data.list

                    //修改
                    this.list.forEach((item) => {   //checkBox
                        Vue.set(item, "checkState", false);
                        Vue.set(item, "foldState", false);
                    })

                    //修改选中状态
                    this.list.forEach((item) => {
                        //当列表中有此id时修改选中状态为选中
                        this.selectPersonList.forEach((v) => {
                            if (item.no === v) {
                                Vue.set(item, "checkState", true);
                            }
                        })
                    })

                    this.count = data.count
                    this.total = data.count
                    this.allAmount = data.allAmount
                    this.consultNum = data.consultNum
                    // this.total = data.count % 10 === 0 ? parseInt(data.count / 10) : parseInt(data.count / 10) + 1
                } else {
                    alert(data.msg)
                }


            },
            changeFoldState (id, status) {
                console.log(id)

                // <!--已取消状态，无法展开子订单，子订单状态为已取消-->
                // <!--待接单状态，无法展开子订单，子订单状态为待接单-->

                if (this.flagList.includes(status)) {
                    console.log("无法展开子订单")
                    return
                }



                //修改展开状态
                this.list.forEach((item) => {
                    if (item.no === id) {
                        Vue.set(item, "foldState", !item.foldState);
                    }
                })

            },
            cancelOrder(item) {
                window.item = item

                this.status = true
            },
            async sureCancel() {
                if (!this.reason) {
                    return
                }

                this.status = false

                let params = {
                    no: item.no,
                    reason: this.reason
                }

                let data = await cancelOrder(this.serialize(params))

                this.reason = ""

                location.reload()
            },
            sureHandleOrder(item) {
                window.item = item

                this.wei = true
            },
            async sureCancelWei() {
                if (!this.reasonWei) {
                    return
                }

                this.wei = false

                let params = {
                    no: item.no,
                    reason: this.reasonWei
                }

                //let reason = this.reasonWei
                let data = await handleOrder(this.serialize(params))

                this.reasonWei = ""

                location.reload()
            },
            pingjia(no) {
                // window.item = item
                this.orderNo = no
                this.pingjiaStatusW = true /////////////////////////////////
                this.reasonpingjiaW = ''
            },
            tousu(item) {
                window.item = item

                this.tousuStatus = true
            },
            async sureTousu() {
                if (!this.reasonTousu) {
                    return
                }

                this.tousuStatus = false

                let params = {
                    no: item.no,
                    reason: this.reasonTousu
                }

                //let reason = this.reasonWei
                let data = await handleTousu(this.serialize(params))

                this.reasonTousu = ""

                location.reload()
            },
            tousuW(item) {
                window.item = item

                this.tousuStatusW = true
            },
            async sureTousuW() {
                if (!this.reasonTousuW) {
                    return
                }

                this.tousuStatusW = false

                let params = {
                    no: item.no,
                    reason: this.reasonTousuW
                }

                //let reason = this.reasonWei
                let data = await handleTousuW(this.serialize(params))

                this.reasonTousuW = ""

                item.status = 8
                item.refundStatus = 1
                    //location.reload()
            },


            async surepingjiaW() {
                if (!this.reasonpingjiaW) {
                    alert("请输入申请原因！")
                    return
                }

                this.pingjiaStatusW = false

                let params = {
                    no: this.orderNo,
                    reason: this.reasonpingjiaW
                }

                // let data = await handleTousu(this.serialize(params))

                let data = await getResponses('ServiceOrder/handleOrder.json', this.serialize(params))

                if (data.code === 0) {
                    this.search()
                } else {
                    alert(data.msg)
                }


            },

            overNo(item) {

                this.overState = true
                window.item = item
            },

            async overCanel() {

                if (!this.overState) {
                    return
                }

                let data = await getResponses('callcore/closeCallOrder.json', `orderNo=${item.no}`, '/depression-api/')
                if (data.code === 0) {
                    this.overState = false
                    this.search()
                } else {
                    alert(data.msg)
                }

            },


            async sureCancelWeiT() {
                if (!this.reasonWeiT) {
                    return
                }

                this.weiT = false

                let reason = this.reasonWeiT
                    //let data = await getOrder()
            },
            async sureCancelYiT() {
                if (!this.reasonYiT) {
                    return
                }

                this.yiT = false

                let reason = this.reasonYiT
                    //let data = await getOrder()
            },
            pageHandler: function(page) {
                this.page = page


                this.search()
            },
            createUrl: function(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },



            tui(item, index) {
                this.tuiStatus = true
                window.item = item

            },
            async sureTui(item) {

//                this.tuiStatus = false
                let params = {
                    no: this.orderNo,
                }

                if (this.tui1) {
                    params.amount = this.tui1
                }

                if (this.tuiType == 1&&this.tui2) {
                    if(this.tui2<0||this.tui2>100){
                        alert("比例不能大于100,不能小于0")
                    }else{
                        params.rate = this.tui2
                    }
                }else if(this.tuiType == 1){
                    alert("请填写比例！")
                    return
                }
                if (this.tui3) {
                    params.reclaimServer = 1
                } else {
                    params.reclaimServer = 0
                }
                params.operationLog = this.operationLog
                params.type = 8
                params.item=item;

                //let reason = this.reasonWei
//                let data = await getResponses('ServiceOrder/refundServiceOrder.json', this.serialize(params))
                let data = await getResponses('ServiceOrder/refundNewServiceOrder.json', this.serialize(params))

                if (data.code === 0) {

                    this.tuiStatus = false
                    this.search()
                } else {
                    alert(data.msg)
                }
            },


            async downloadExcel() {
                this.isWaitingForExcel = true

                let p = this.serialize(this.paramsFn())



                let data

                try {
                    data = await exportServiceOrder(p)

                } catch (e) {
                    alert("抱歉，服务器错误！")

                    this.isWaitingForExcel = false

                    return

                }


                let blob = new Blob([data], {
                    'type': 'application/msexcel'
                }),
                a = this.$els.a

                a.href = window.URL.createObjectURL(blob)


                let select = document.querySelector('select'), //
                    name = select.selectedOptions[0].innerHTML


                a.download = `${name}.xls`
                a.click()

                this.isWaitingForExcel = false

            },
            toCheckCancelReasonFn(reason) {
                this.refuseReason = reason
                this.cancenReasonConState = true
            },

            // 打开显示选择器
            open(e, type) {
                // 设置类型
                this.calendar.picker = type
                this.calendar.type = this.calendar.items[type].type
                this.calendar.range = this.calendar.items[type].range
                this.calendar.begin = this.calendar.items[type].begin
                this.calendar.end = this.calendar.items[type].end
                this.calendar.value = this.calendar.items[type].value
                // 可不用写
                this.calendar.sep = this.calendar.items[type].sep
                this.calendar.weeks = this.calendar.items[type].weeks
                this.calendar.months = this.calendar.items[type].months

                this.calendar.show = true
                this.calendar.x = e.target.offsetLeft
                this.calendar.y = e.target.offsetTop + e.target.offsetHeight + 8
            },

            selectAll() {
                console.log(this.checkAllState)
                // this.checkAllState = !this.checkAllState

                if (!this.checkAllState) {
                    this.list.forEach((item) => {
                        if (!item.checkState) {
                            this.selectPersonList.push(item.no)
                            item.checkState = true
                        }
                    })

                } else {
                    this.list.forEach((item) => {
                        if (item.checkState) {
                            for (let i = 0; i < this.selectPersonList.length; i++) {
                                if (this.selectPersonList[i] == item.no) {
                                    this.selectPersonList.splice(i, 1)
                                    item.checkState = false
                                }
                            }

                        }
                    })

                }

            },

            selectPerson(no, item) {
                console.log(item.checkState);
                item.checkState = !item.checkState

                if (item.checkState) {
                    this.selectPersonList.push(no)
                } else {
                    for (let i = 0; i < this.selectPersonList.length; i++) {
                        if (this.selectPersonList[i] == no) {
                            this.selectPersonList.splice(i, 1)
                        }
                    }

                }

                console.log(this.selectPersonList)
            },

            cancelPingjiaFn() {
                this.pingjiaStatusW = false
                this.reasonpingjiaW = ''
            },

        //    待处理   投诉/退款处理

            pendingFn(no, remarks) {
                this.orderNo = no
                this.pendingStatus = true
                this.operationLog = ''
                this.pendingReason = remarks
            },
            sureHandlePendingFn() {

                if (!this.operationLog) {
                    alert("请输入处理记录！")
                    return
                }

                this.pendingStatus = false
                this.tuiStatus = true

                this.tui1 = ""
                this.tui2 = ""
                this.tui3 = false
            },

            // overHandleFn  点击处理结束按钮
            async overHandleFn() {
                if (!this.operationLog) {
                    alert("请输入处理记录！")
                    return
                }
                // type	6:处理 8：退款	number
                let params = {
                    no: this.orderNo,
                    operationLog: this.operationLog,
                    type: 6,
                }

                let data = await getResponses('ServiceOrder/refundServiceOrder.json', this.serialize(params))

                if (data.code === 0) {
                    this.pendingStatus = false
                    this.search()
                } else {
                    alert(data.msg)
                }
            },

            // 已退款、已处理 查看处理记录
            async viewProcessingRecords(soid) {
                let data = await getResponses('ServiceOrder/getOrderRefundInfo.json',`soid=${soid}`);
                if(data.code===0){
                    this.pendingReason = data.result.refundReason;
                    this.operationLog = data.result.refundLog;
                    this.refundAcountByPlat = data.result.refundAcountByPlat;
                    this.refundAcountByService = data.result.refundAcountByService;
                    this.usermoney = data.result.money;
                    this.notestatus = data.result.notestatus;

                    this.viewProcessingRecordsState = true
                }
            },
//            脱敏手记
            async seeNodes(soid){
                this.seeNodeState=true;
                let data = await getResponses('ServiceOrder/getOrderNote.json',`soid=${soid}`);
                if(data.code===0){
                    this.NodeDetail=data.serviceOrderNote
                }
            },


            // 取消订单
            toCancelOrderFn(soid,number,pId) {
                this.childCancelOrder = number === 2 ? true : false
                this.childPsychoId =  number === 2 ? pId : ''


                this.cancelOrderReason = ''
                this.cancelOrderState = true
                this.cancelSoid = soid
            },
            async sureToCancelOrderFn() {
                console.log(this.cancelOrderReason)
                if (!this.cancelOrderReason) {
                    alert("请填写取消原因！")
                    return
                }

                if (this.childCancelOrder) {
                    // 套餐中子订单取消订单走此路径
                    console.log('子订单取消订单')

                    //Long soid, String reason, Long psychoId, Byte type
                    // 0:用户取消
                    let data = await getResponses('ServiceOrder/deleteNewChildOrder.json', `soid=${this.cancelSoid}&reason=${this.cancelOrderReason}&type=0&psychoId=${this.childPsychoId}`)
                    this.cancelOrderState = false
                    if (data.code === 0) {
                        alert("取消成功")
                        this.search()
                    } else {
                        alert(data.msg)
                    }
                    return
                }


                let data = await getResponses('callcore/V3/agreeOrderByPsycho.json',`soid=${this.cancelSoid}&refuseReason=${this.cancelOrderReason}&type=3`, '/depression-api/')
                this.cancelOrderState = false

                if (data.code === 0) {
                    alert("取消成功")
                } else {
                    alert(data.msg)
                }
                this.search()




            },
            pageHandler: function(page) {
                this.page = page
                this.search()
            },
            createUrl: function(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },

            //            获取咨询助理列表
            async getAssistant(num){
                let params={
                    pageIndex: 1,
                    pageSize: num,
                }

                let data= await getResponses("assistantConsult/selectConsultAssistant.json",this.serialize(params));
                if (data.code === 0){
                    this.assistantList = data.data;

                    if (data.count > num) {
                        this.getAssistant(data.count)
                    }
                } else{
                    alert(`err${data.msg}`)
                }
            },
            async toSeeMore(no) {
                var arr=[];
                let data = await getResponses('crm/clueFollowHistory/getRelateOrderByOrderId', `orderId=${no}`)
                if (data.code === 0) {
                    this.remarkNo=data.crmClueRelateOrder.orderId;
                    this.remarkYear=data.crmClueRelateOrder.servicePeriod;
                    if(data.crmClueRelateOrder.screenshot){

                        arr=data.crmClueRelateOrder.screenshot.split("||")
                        this.imgarr=arr.slice(0,arr.length-1)
                    }else{
                        arr=[];
                        this.imgarr=[]
                    }

                    this.remarkStu=true;
                } else {
                    alert(data.msg);
                }
            },
//            panduan(status,orderType){
//                if(orderType==10){
//                    if(status==10){
//                        return false
//                    }else {
//
//                    }
//                }
//            }
        },

        computed: {
            checkAllState: function() {
                this.recentPageCheckedNumber = 0
                for (let i = 0; i < this.list.length; i++) {
                    for (let j = 0; j < this.selectPersonList.length; j++) {
                        if (this.list[i].no === this.selectPersonList[j]) {
                            this.recentPageCheckedNumber++;
                            break;
                        }
                    }
                }
                return !!this.list.length && this.recentPageCheckedNumber === this.list.length

            }

        },
        ready() {
            document.title = "订单管理"

            console.log(window.location.pathname.split('/')[2])

            if ( window.location.pathname.split('/')[2] ) {
                console.log(window.location.pathname.split('/')[2])
                this.keyword = window.location.pathname.split('/')[2]
                this.search()

            } else {
                this.search()

            }

            this.getAssistant(100);
        }
}
</script>
<style scoped>
.musicList {
    display: flex;
    flex-direction: column;
}

.musicCont {
    flex: 1;
}

.musicItem {
    padding: 20px 0 0;
    border-bottom: 2px solid #eee;
}
</style>
