<style>
    .normal-span-mr{
        margin: 0;
    }
</style>
<template>
    <div>
        <div class="container-fluid">
            <div id="search" class="title" style="width: 1550px">
                创建时间：
                <time-range @ddd="ddd">
                </time-range>

                <span class="normal-span-mr" style="margin-left: 50px">渠道：</span>
                <select v-model="searchChannel">
                    <option value="">全部</option>
                    <option v-for="(index, item) in platformChannelList" :key="index" :value="item.pcId">{{item.platformChannel}}
                    </option>
                </select>
                <span class="normal-span-mr" style="margin-left: 50px">审核状态：</span>
                <select v-model="searchAudit">
                    <option value="-1">全部</option>
                    <option value="0">待审核</option>
                    <option value="1">审核通过</option>
                    <option value="2">审核不通过</option>
                    <!--<option v-for="(index, item) in platformChannelList" :key="index" :value="item.pcId">{{item.platformChannel}}-->
                    <!--</option>-->
                </select>
                <div class="normal-div-ib" style="margin-left: 50px">
                    <span class="normal-span-mr">用户手机号：</span>
                    <input type="text" name="searchUserTel" v-model="searchUserTel"/>
                </div>
                <div class="normal-div-ib">
                    <span class="normal-span-mr">专家手机号：</span>
                    <input type="text" name="searchExpertTel" v-model="searchExpertTel"/>
                </div>
                <div class="normal-div-ib" style="margin-left: 214px">
                    <span class="normal-span-mr">专家姓名：</span>
                    <input type="text" name="searchExpertName" v-model="searchExpertName"/>
                </div>
                <div class="normal-div-ib" style="margin-left: 34px">
                    <span class="normal-span-mr">对接客服：</span>
                    <input type="text" name="" v-model="searchServiceName"/>
                </div>

                <div class="normal-div-ib" style="margin-left: 50px;margin-right: 20px">
                    <span class="normal-span-mr">用户姓名：</span>
                    <input type="text" name="" v-model="cutomerName"/>
                </div>

                <input type="submit" value="搜索" class="btn btn-success" @click="search()" style="margin-right:50px;">

                <button class="btn btn-success" style="cursor:pointer;"
                        @click="toCreateIndentFn">创建订单
                </button>
            </div>
            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0"
                   style="min-width: 2500px; overflow: scroll;margin-top: 20px"
            >
                <thead>
                <tr>
                    <th>
                        <div class="checkbox">
                            <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-th"
                                   @click='selectAll' :checked="checkAllState">
                            <label for="title-table-th" class="checkboxLabel"></label>
                        </div>
                    </th>
                    <th width="84">创建时间</th>
                    <th>渠道</th>
                    <th>用户姓名</th>
                    <th>手机号</th>
                    <th>对接客服</th>

                    <th>服务专家</th>
                    <th>专家手机号</th>


                    <th>订单时长</th>



                    <th>收款金额</th>
                    <th>支付渠道</th>
                    <th>账号</th>
                    <th>入账时间</th>
                    <th>退款状态</th>
                    <th>剩余分钟数</th>
                    <th style="width: 120px;">预约服务时间</th>

                    <th style="width: 40px;">
                        操作1
                    </th>
                    <th>支付截图</th>
                    <th>审核状态</th>
                    <th>审核操作</th>
                    <th style="width: 80px;">订单状态</th>

                    <th>母订单号</th>
                    <th style="width:130px;">订单号</th>
                    <th style="width: 120px;">操作2</th>
                    <th style="width: 120px;">非常规操作</th>

                </tr>
                </thead>
                <tbody>
                <template v-for="item of data">
                    <tr>
                        <td>
                            <div class="checkbox">
                                <input type="checkbox" class="checkboxInp" name="title-table-checkbox"
                                       id="title-table-td{{item.noid}}" :checked=" item.checkState? 'checked':''"  @click='selectPerson(item.noid, item)' data-typeId="{{item.noid}}">
                                <label class="checkboxLabel" for="title-table-td{{item.noid}}"></label>
                            </div>
                        </td>
                        <td>{{item.createTime}}</td>
                        <td>{{item.platformStr}}</td>

                        <td>{{item.userName}}</td>
                        <td>{{item.consumerMobilePhone}}</td>
                        <td>{{item.serviceName}}</td>


                        <td>{{item.psychoName}}</td>
                        <td>{{item.psychoMobilePhone}}</td>



                        <td>{{ item.duration }}</td>

                        <td>{{item.gatheringAmount}}</td>
                        <td>{{item.gatheringAccount}}</td>
                        <td>{{ item.paymentAccount }}</td>
                        <td>{{ item.paymentTime }}</td>
                        <td>{{ item.isRefund | isRefundFormat }}</td>

                        <td>{{item.surplusDuration | durationFormat }}</td>
                        <td>{{ item.bespeakTime }}</td>
                        <td><span class="normal-operate-state" @click="editOrderFn(item.noid)">编辑</span></td>

                        <td>
                        <span class="normal-operate-state" @click="popUpUploadFn(item.noid, item.paymentPicture)">
                            <template v-if="!item.paymentPicture">
                                上传
                            </template>
                            <template v-else>
                                编辑
                            </template>
                        </span>
                        </td>
                        <td>
                            <!-- 0 待审核  1 审核通过   2  审核未通过-->
                            {{ item.isAudit | isAuditFormat }}
                        </td>
                        <!--审核操作-->
                        <td>
                             <span class="normal-operate-state" v-if="item.isAudit === 0"
                                   @click="auditSure(item.noid)">审核</span>
                            <span class="normal-operate-state" v-if="item.isAudit === 2"
                                  @click="auditSure(item.noid)">再次审核</span>
                        </td>
                        <td>
                            <!--0：未付款 1：已付款 2：已完结 5：进行中 20：待接单 21：待服务 22：已取消  30：已处理 31：待处理 32：已退款-->
                            {{ item.orderStatus | typeFormat }}
                        </td>

                        <td>
                            <template v-if="item.serviceOrderType === 10">
                                {{ item.no }}
                            </template>
                            <template v-else>

                            </template>
                        </td>
                        <td>
                            <template v-if="item.serviceOrderType === 10">

                                <div  @click="changeFoldState(item.noid, item.orderStatus, item.foldState)" style="cursor: pointer;font-size: 24px;color:rgb(43, 141, 249);line-height: 30px;">
                                    <i class="icon" :class="{ 'icon-chevron-down' : !item.foldState , 'icon-chevron-up' : item.foldState }"></i>
                                </div>
                            </template>
                            <template v-else>
                                {{ item.no }}
                            </template>
                        </td>

                        <td>
                            <!--操作2-->

                            <template v-if="item.serviceOrderType === 10">
                                <!-- 母订单 待接单 状态下有操作 取消订单  -->
                                <template v-if="item.orderStatus === 20">
                                    <span class="normal-operate-state" style="min-width: 8em"
                                          @click="cancelOrderFn(item.soid)">
                                        取消订单
                                    </span>
                                </template>
                            </template>
                            <template v-else>
                                <span class="normal-operate-state" v-if="item.operationStatus === 1"
                                      @click="immediatelyCallByUserFn(item.noid, item.duration, item.psychoId)">即时咨询</span>

                                <span class="normal-operate-state" v-if="item.operationStatus === 1"
                                      @click="clickToValetFn(item.consumerMobilePhone, item.userName, item.platformStr, item.noid, item.price, item.time, item.duration, item.psychoName,item.psychoId, item.consumerMid)"
                                >预约咨询</span>

                                <span class="normal-operate-state" v-if="item.operationStatus === 1"
                                      @click="thirdPartyConsultationFn(item.noid)">第三方咨询</span>



                                <span class="normal-operate-state" v-if="item.operationStatus === 5" @click="toCloseCallOrderFn(item.no)">结束咨询</span>

                                <span class="normal-operate-state" style="min-width: 8em"  v-if="item.operationStatus === 3 || item.operationStatus === 4"
                                      @click="cancelOrderFn(item.soid)">
                            取消订单
                                </span>
                            </template>



                        </td>

                        <td>
                            <template v-if="item.serviceOrderType === 10">

                            </template>
                            <template v-else>
                                <span class="normal-operate-state" v-if="item.operationStatus === 4 || item.operationStatus === 5" @click="startCallByPsychoFn(item.soid, item.operationStatus - 4)">
                                <template v-if="item.operationStatus === 4">
                                    立即拨打
                                </template>
                                <template v-if="item.operationStatus === 5">
                                    继续拨打
                                </template>
                            </span>

                                <template v-if="item.bespeakTime && item.bespeakTime.length === 19">
                            <span class="normal-operate-state"
                                  v-if="item.orderStatus === 20 || item.orderStatus === 21"

                                  @click="modifyOrDelDateOrderFn(item.noid, item.serviceName, item.psychoName, item.bespeakTime, item.psychoMobilePhone, item.price, item.duration, item.psychoId)"
                            >修改预约</span>
                                </template>

                                <template v-if="item.orderStatus === 1">
                                    <!--已付款的服务单状态，非常规操作，添加一个取消服务单的功能。-->
                                    <span class="normal-operate-state"
                                          @click="cancellationOfServiceSheet(item.noid)" >取消服务单</span>
                                </template>

                            </template>

                        </td>




                    </tr>
                    <template v-if="item.foldState">
                        <tr v-for="n in item.childOrder">
                            <td>
                                <div class="checkbox">

                                </div>
                            </td>
                            <td>{{n.createTime}}</td>
                            <td>{{n.platformStr}}</td>

                            <td>{{n.userName}}</td>
                            <td>{{n.consumerMobilePhone}}</td>
                            <td>{{n.serviceName}}</td>


                            <td>{{n.psychoName}}</td>
                            <td>{{n.psychoMobilePhone}}</td>



                            <td>{{ n.duration }}</td>

                            <td>{{n.gatheringAmount}}</td>
                            <td>{{n.gatheringAccount}}</td>
                            <td>{{ n.paymentAccount }}</td>
                            <td>{{ n.paymentTime }}</td>
                            <td>{{ n.isRefund | isRefundFormat }}</td>

                            <td>{{n.surplusDuration | durationFormat }}</td>
                            <td>{{ n.bespeakTime }}</td>
                            <td></td>

                            <td>

                            </td>
                            <td>

                            </td>
                            <td>

                            </td>

                            <td>
                                <!--0：未付款 1：已付款 2：已完结 5：进行中 20：待接单 21：待服务 22：已取消  30：已处理 31：待处理 32：已退款-->
                                <!-- 41：已选时间 42：未选时间 -->
                                {{ n.orderStatus | typeFormat }}
                            </td>
                            <td>
                                <!--{{ n.no }}-->
                            </td>
                            <td>
                                {{ n.no }}
                            </td>

                            <td>
                                <!--操作2-->

                                <!--根据订单标记来算  41已选时间对应操作2取消订单-->

                                <!--<span class="normal-operate-state" v-if="n.operationStatus === 1"-->
                                      <!--@click="immediatelyCallByUserFn(n.noid, n.duration, n.psychoId)">即时咨询</span>-->

                                <span class="normal-operate-state" v-if="n.orderStatus === 42"
                                      @click="clickToValetFn(n.consumerMobilePhone, n.userName, n.platformStr, n.noid, n.price, n.time, n.duration, n.psychoName,n.psychoId, n.consumerMid, 2, item.soid)"
                                >选择时间</span>

                                <!--<span class="normal-operate-state" v-if="n.operationStatus === 1"-->
                                      <!--@click="thirdPartyConsultationFn(n.noid)">第三方咨询</span>-->



                                <span class="normal-operate-state" v-if="n.orderStatus === 5" @click="toCloseCallOrderFn(n.no)">结束咨询</span>

                                <span class="normal-operate-state" style="min-width: 8em"  v-if="n.orderStatus === 41"
                                      @click="cancelOrderFn(n.soid, 2, n.psychoId)">
                                        取消订单


                                </span>

                            </td>

                            <td>



                                <span class="normal-operate-state" v-if="n.orderStatus === 41" @click="startCallByPsychoFn(n.soid, 0)">
                                        立即拨打
                                </span>

                                <span class="normal-operate-state" v-if=" n.orderStatus === 5" @click="startCallByPsychoFn(n.soid, 1)">
                                        继续拨打
                                </span>


                                <template v-if="n.bespeakTime && n.bespeakTime.length === 19">
                                    <span class="normal-operate-state"
                                          v-if="n.orderStatus === 41"

                                          @click="modifyOrDelDateOrderFn(n.soid, n.serviceName, n.psychoName, n.bespeakTime, n.psychoMobilePhone, n.price, n.duration, n.psychoId, 2)"
                                    >修改时间</span>
                                </template>

                                <!--<template v-if="n.orderStatus === 1">-->
                                    <!--&lt;!&ndash;已付款的服务单状态，非常规操作，添加一个取消服务单的功能。&ndash;&gt;-->
                                    <!--<span class="normal-operate-state"-->
                                          <!--@click="cancellationOfServiceSheet(n.noid)" >取消服务单</span>-->
                                <!--</template>-->

                            </td>




                        </tr>
                    </template>
                </template>



                </tbody>
            </table>
            <div class='bottom'>
                <div id="test">
                    <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"
                              :page-handler="pageHandler" :create-url="createUrl">
                        </zpagenav>
                </div>
                <div>
                    <button class="btn-success" style="font-size:14px;" @click="downloadExcel" v-if="! isExportingExcel">导出Excel</button>
                    <button class="btn-success" style="font-size:14px;" v-else>导出中。。。</button>

                    <a href="javascript:;" v-el:a></a>
                </div>
            </div>
        </div>
        <!-- 已拨号 -->
        <div class="modal_userList_cover" style="background-color:transparent;" v-if="windowAlert">
            <div class="modal_userList_Wrap_2">
                <div class="modal_userList_Wrap_2_text">
                    已拨号
                </div>
            </div>
        </div>
        <!------------------------------------------------------------------- 预约服务 --------------------------------------->
        <div class="modal_userList_cover" v-if="clickToValet">
            <div class="modal_userList_Wrap">
                <div class="modal_userList_Wrap_title">
                    预约服务
                </div>
                <ul>
                    <li>
                        <span class="modal_userList_box_left_span">用户手机号</span>
                        <span class="modal_userList_box_right_span">{{ userInformation.consumerMobilePhone }}</span>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">用户姓名</span>
                        <span class="modal_userList_box_right_span">{{ userInformation.userName }}</span>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">客户来源</span>
                        <span class="modal_userList_box_right_span">{{ userInformation.platformStr }}</span>

                    </li>
                    <li class="modal_userList_Wrap_slecte_expert">
                        <span class="modal_userList_box_left_span">服务专家</span>
                        <span class="modal_userList_box_right_span">{{ userInformation.psychoName }}</span>
                    </li>

                    <li v-if="wrongTel.status || expertsName.status">
                        <span class="modal_userList_box_left_span"></span>
                        <span class="modal_userList_box_left_span_text2"
                              v-text="'您选择的专家为：' + userInformation.psychoName"></span>

                    </li>

                    <li style="border-top: 1px solid green;">
                        <span class="modal_userList_box_left_span">服务时间</span>
                    </li>

                    <li style="border-bottom: 1px solid green;">
                        <div class="model_bes_box">
                            <input type="radio" id="one" :value="1" v-model="bespeakType"> <label for="one">选择专家已设置时间</label>
                            <!--<input type="radio" id="two" :value="0" v-model="bespeakType"> <label for="two">选择期望的时间，提醒专家设置</label>-->
                            <!--专家已设置预约时间段展示-->

                            <ul class="model_bes_tl">
                                <template v-if="arrangeDateList.length">
                                    <template v-for="(index, item) in arrangeDateList">
                                        <li v-if="arrangeDateList.length && item.dataValue.length" :key="index">
                                            <div>
                                                {{ item.arrangeDate.split(' ')[0].split('-')[1] }}-{{ item.arrangeDate.split(' ')[0].split('-')[2] }}
                                                {{ item.weekDay | weekDayStateListFilter }}
                                            </div>
                                            <div class="model_bes_tl_b">
                                                <template v-for="(indexInside, v) in item.dataValue" :key="indexInside" >

                                                    <template v-if="item.pickDateValue.indexOf(v) !== -1">
                                                        <div class="model_bes_tl_sb model_bes_tl_n">
                                                            <p>{{ v + ":00" }}</p>
                                                            <p class="model_bes_p">已约</p>
                                                        </div>
                                                    </template>


                                                    <template v-else>
                                                        <template v-if="chooseList.arrangeDate === item.arrangeDate && chooseList.v === v">
                                                            <div class="model_bes_tl_sb model_bes_tl_y model_bes_tl_choose" @click="toChooseBespeakTimeFn(item.arrangeDate, v, 1)">
                                                                <p>{{ v + ":00" }}</p>
                                                                <p class="model_bes_p">可约</p>
                                                            </div>
                                                        </template>

                                                        <template v-else>
                                                            <div class="model_bes_tl_sb model_bes_tl_y" @click="toChooseBespeakTimeFn(item.arrangeDate, v, 2)">
                                                                <p>{{ v + ":00" }}</p>
                                                                <p class="model_bes_p">可约</p>
                                                            </div>
                                                        </template>

                                                    </template>

                                                </template>



                                            </div>
                                        </li>

                                    </template>
                                </template>
                                <template v-else>
                                    <li>
                                        <div style="color: red;">
                                            该专家未设置任何预约时间，请与专家沟通，让他/她设置可预约的时间。
                                        </div>
                                    </li>
                                </template>


                            </ul>

                            <template v-if="bespeakType === 0">

                                <div class="mode_bes_send">
                                    <input type="button" value="发送申请" id="ajaxBut" class="btn btn-success" @click="expectationByUser">
                                </div>
                            </template>


                            <div class="model_em_box" v-if="bespeakType === 1">
                                <ul>
                                    <li class="model_em_box_li">
                                        <span>性别：</span>
                                        <select v-model="customerSex">
                                            <option :value="1">男</option>
                                            <option :value="2">女</option>
                                        </select>
                                    </li>

                                    <li class="model_em_box_li">
                                        <span>年龄：</span>
                                        <input type="text" data-key="customerAge" v-model="customerAge" @keyup="inputChange">
                                    </li>

                                    <li class="model_em_box_li">
                                        <span>问题描述：</span>
                                        <textarea v-model="consultContent"></textarea>
                                    </li>
                                </ul>
                            </div>



                        </div>
                    </li>

                    <li>
                        <span class="modal_userList_box_left_span">服务价格</span>
                        <span class="modal_userList_box_right_span">{{ userInformation.price}}元/{{ userInformation.duration}}分钟</span>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">预约客服</span>
                        <span class="modal_userList_box_right_span">{{ serviceName }}</span>
                    </li>
                </ul>

                <div class="modal_userList_Wrap_bottom">
                    <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancelValetFn">取消</span>
                    <span class="modal_userList_Wrap_bottom_rightBtn" v-if="bespeakType === 1"
                          @click="sureToValetFn">确认预约</span>
                </div>
            </div>
        </div>

        <!-----------------------------------------------------------------------新预约弹窗----------------------------------------->
        <div class="modal_userList_cover" v-if="clickToValet2">
            <div class="modal_userList_Wrap">
                <div class="modal_userList_Wrap_title">
                    预约服务
                </div>
                <ul>
                    <li>
                        <span class="modal_userList_box_left_span">用户手机号</span>
                        <span class="modal_userList_box_right_span">{{ form2.consumerMobilePhone }}</span>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">用户姓名</span>
                        <span class="modal_userList_box_right_span">
                            <template v-if="isTelExists">
                                {{ telExistsUsername }}
                            </template>
                            <template v-else>
                                {{ form2.userName }}
                            </template>

                        </span>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">客户来源</span>
                        <span class="modal_userList_box_right_span">{{ platformChannelStr }}</span>

                    </li>
                    <li class="modal_userList_Wrap_slecte_expert">
                        <span class="modal_userList_box_left_span">服务专家</span>
                        <span class="modal_userList_box_right_span">{{ chooseExpertName }}</span>
                    </li>

                    <li v-if="wrongTel.status || expertsName.status">
                        <span class="modal_userList_box_left_span"></span>
                        <span class="modal_userList_box_left_span_text2"
                              v-text="'您选择的专家为：' + chooseExpertName"></span>

                    </li>

                    <li style="border-top: 1px solid green;">
                        <span class="modal_userList_box_left_span">服务时间</span>
                    </li>

                    <li style="border-bottom: 1px solid green;">
                        <div class="model_bes_box">
                            <input type="radio" id="one" :value="1" v-model="bespeakType"> <label for="one">选择专家已设置时间</label>
                            <!--<input type="radio" id="two" :value="0" v-model="bespeakType"> <label for="two">选择期望的时间，提醒专家设置</label>-->
                            <!--专家已设置预约时间段展示-->

                            <ul class="model_bes_tl">
                                <template v-if="arrangeDateList.length">
                                    <template v-for="(index, item) in arrangeDateList">
                                        <li v-if="arrangeDateList.length && item.dataValue.length" :key="index">
                                            <div>
                                                {{ item.arrangeDate.split(' ')[0].split('-')[1] }}-{{ item.arrangeDate.split(' ')[0].split('-')[2] }}
                                                {{ item.weekDay | weekDayStateListFilter }}
                                            </div>
                                            <div class="model_bes_tl_b">
                                                <template v-for="(indexInside, v) in item.dataValue" :key="indexInside" >

                                                    <template v-if="item.pickDateValue.indexOf(v) !== -1">
                                                        <div class="model_bes_tl_sb model_bes_tl_n">
                                                            <p>{{ v + ":00" }}</p>
                                                            <p class="model_bes_p">已约</p>
                                                        </div>
                                                    </template>


                                                    <template v-else>
                                                        <template v-if="chooseList.arrangeDate === item.arrangeDate && chooseList.v === v">
                                                            <div class="model_bes_tl_sb model_bes_tl_y model_bes_tl_choose" @click="toChooseBespeakTimeFn(item.arrangeDate, v, 1)">
                                                                <p>{{ v + ":00" }}</p>
                                                                <p class="model_bes_p">可约</p>
                                                            </div>
                                                        </template>

                                                        <template v-else>
                                                            <div class="model_bes_tl_sb model_bes_tl_y" @click="toChooseBespeakTimeFn(item.arrangeDate, v, 2)">
                                                                <p>{{ v + ":00" }}</p>
                                                                <p class="model_bes_p">可约</p>
                                                            </div>
                                                        </template>

                                                    </template>

                                                </template>



                                            </div>
                                        </li>

                                    </template>
                                </template>
                                <template v-else>
                                    <li>
                                        <div style="color: red;">
                                            该专家未设置任何预约时间，请与专家沟通，让他/她设置可预约的时间。
                                        </div>
                                    </li>
                                </template>


                            </ul>




                            <div class="model_em_box" v-if="bespeakType === 1">
                                <ul>
                                    <li class="model_em_box_li">
                                        <span>性别：</span>
                                        <select v-model="customerSex">
                                            <option :value="1">男</option>
                                            <option :value="2">女</option>
                                        </select>
                                    </li>

                                    <li class="model_em_box_li">
                                        <span>年龄：</span>
                                        <input type="text" data-key="customerAge" v-model="customerAge" @keyup="inputChange">
                                    </li>

                                    <li class="model_em_box_li">
                                        <span>问题描述：</span>
                                        <textarea v-model="consultContent"></textarea>
                                    </li>
                                </ul>
                            </div>



                        </div>
                    </li>

                    <li>
                        <span class="modal_userList_box_left_span">服务价格</span>
                        <span class="modal_userList_box_right_span">{{ form2.price}}元/{{ form2.duration}}分钟</span>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">预约客服</span>
                        <span class="modal_userList_box_right_span">{{ serviceName }}</span>
                    </li>
                </ul>

                <div class="modal_userList_Wrap_bottom">
                    <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancelValetFn">取消</span>
                    <template v-if="bespeakType === 1">
                        <span class="modal_userList_Wrap_bottom_rightBtn"
                              v-if="!sending"
                              @click="sureToValetFn2">确认预约</span>

                        <span style="width:auto;" class="modal_userList_Wrap_bottom_rightBtn"
                              v-else
                        >预约中....</span>
                    </template>

                </div>
            </div>
        </div>

        <!------------------------------------------------------------------- 创建订单 ---------------------------------------->
        <div class="modal_userList_cover" v-if="toCreateIndent">
            <div class="modal_userList_Wrap">
                <div class="modal_userList_Wrap_title">
                    创建订单
                </div>
                <ul>
                    <li>
                        <span class="modal_userList_box_left_span">客户来源</span>
                        <select class="modal_userList_box_left_span_sel2" v-model="form2.platformChannel">
                            <option v-for="item in platformChannelList" value="{{item.pcId}}">{{item.platformChannel}}
                            </option>
                        </select>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">用户手机号</span>
                        <input type="number" name="" class="telInp" placeholder="请输入手机号" v-model="form2.consumerMobilePhone"
                               @keyUp="checkTelFn3">
                    </li>

                    <!-- 此处用来提示用户手机号是否正确 -->
                    <li>
                        <span class="modal_userList_box_left_span"></span>
                        <span class="modal_userList_box_left_span_text" v-if="wrongTel3.status"
                              v-text="wrongTel3.text"></span>
                    </li>

                    <li>
                        <span class="modal_userList_box_left_span">用户姓名</span>

                        <span class="modal_userList_box_right_span" v-if="isTelExists" v-text="telExistsUsername"></span>

                        <input type="text" name="" class="telInp" placeholder="请输入姓名" v-else v-model="form2.userName">
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">登录密码</span>

                        <input type="text" name="" readonly="readonly" v-if="isTelExists" v-model="telExistsUserPsd">

                        <input type="text" name="" class="telInp" placeholder="请输入密码" v-else v-model="form2.password">


                    </li>

                    <li v-if="isTelExists">
                        <span class="modal_userList_box_left_span">账户余额</span>
                        <span>{{ telExistsCashbalance }}元</span>
                    </li>


                    <li class="modal_userList_Wrap_slecte_expert">
                        <span class="modal_userList_box_left_span">服务专家</span>
                        <div style="display:inline-block;position:relative;">

                            <input type="text" name="" class="telInp" placeholder="请输入专家姓名或手机号"
                                   @keyUp="inputExpertsInformationFn"
                                   v-model="expertInfo"
                            >
                            <div class="select2-drop" v-if="searchExpertsListsWrap">
                                <ul class="select2-results">
                                    <li class="select2-results-dept-0 select2-result select2-result-selectable select2-highlighted"
                                        v-for="item in searchExpertsLists"
                                        @click="chooseExpertFn($index, item.nickname, item.mobilePhone, item.psychoId)"
                                    >
                                        <div class="select2-result-label">
                                            <div class="user-result">
                                                <div class="user-name" v-text="item.nickname"></div>
                                                <div class="user-telphone" v-text="item.mobilePhone"></div>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </li>
                    <!-- 此处li标签为显示专家手机号的信息 -->
                    <li>
                        <span class="modal_userList_box_left_span"></span>
                        <span class="modal_userList_box_left_span_text" v-if="wrongTel2.status"
                              v-text="wrongTel2.text"></span>
                        <span class="modal_userList_box_left_span_text2" v-if="expertsName2.status">已选专家：{{ chooseExpertName
                        }}（手机号：{{ chooseExpertTel }}）</span>

                    </li>

                    <li>
                        <span class="modal_userList_box_left_span">服务时长</span>
                        <input type="text" name="" class="telInp" placeholder="请填写分钟数" v-model="form2.duration">
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">服务价格</span>
                        <input type="text" name="" class="telInp" placeholder="请填写价格" v-model="form2.price">
                    </li>

                    <li>
                        <span class="modal_userList_box_left_span">订单数量</span>
                        <div style="display: flex">
                            <span class="s-br" @click="changeOrderNumberFn(-1)" v-if="allowReduce">-</span>
                            <span class="s-br" style="cursor: not-allowed;" v-else>-</span>

                            <input type="text" class="telInp" v-model.number="form2.orderNum" data-key="orderNum" @keyup="inputChange2" style="width: 50px;margin: 0 5px;">
                            <span class="s-br" @click="changeOrderNumberFn(1)" v-if="allowAdd">+</span>
                            <span class="s-br" style="cursor: not-allowed;"  v-else>+</span>

                        </div>
                    </li>

                    <!--<li style="opacity: 0;">-->
                        <!--<span class="modal_userList_box_left_span">是否已支付</span>-->
                        <!--<select class="modal_userList_box_left_span_sel2" v-model="form2.isPayment">-->
                            <!--<option :value="1">是</option>-->
                            <!--<option :value="0">否</option>-->
                        <!--</select>-->

                    <!--</li>-->

                    <li>
                        <span class="modal_userList_box_left_span">收款金额</span>
                        <input type="number" name="" class="telInp" placeholder="请输入金额（< 10000）"
                               v-model="gatheringAmountNumber">

                    </li>
                    <!-- 此处li标签判断收款金额是否大于一万 -->
                    <li style="text-align: center; line-height: 12px;">
                    <span v-if="wrongMsg3.status" v-text="wrongMsg3.text"
                          style="font-size:12px; text-align: center;color:red;line-height: 12px;"></span>
                    </li>


                    <li>
                        <span class="modal_userList_box_left_span">收款账户</span>
                        <select class="modal_userList_box_left_span_sel2" v-model="form2.gatheringAccount">
                            <option v-for="item in gatheringAccountList" :value="item.gaId">{{item.gatheringAcc}}
                            </option>
                        </select>

                    </li>




                    <li>
                        <span class="modal_userList_box_left_span">对接客服</span>
                        <span class="modal_userList_box_right_span">{{serviceName}}</span>
                    </li>

                    <li>
                        <span class="modal_userList_box_left_span">咨询方式</span>
                        <select class="modal_userList_box_left_span_sel2" v-model="consultType">
                            <option v-for="(index, item) in consultList" :value="index+1">{{item}}
                            </option>
                        </select>

                    </li>



                </ul>

                <div class="modal_userList_Wrap_bottom">
                    <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancelIndentFn">取消</span>
                    <span class="modal_userList_Wrap_bottom_rightBtn" @click="sureToCreateIndent">确认订单</span>
                    <!--<span class="modal_userList_Wrap_bottom_rightBtn" v-if="! sending" @click="sureToCreateIndent">确认订单</span>-->
                    <!--<span class="modal_userList_Wrap_bottom_rightBtn disabled" v-else>确认中</span>-->
                </div>
            </div>
        </div>

        <div class="modal_userList_cover" v-if="errMsgAlertWindow">
            <div class="modal_userList_Wrap" style="width:600px">
                <div class="modal_userList_Wrap_title">
                    立即拨通失败提示
                </div>
                <div class="modal_userList_Wrap_title_cancel_valet" v-text="errMsgAlertWindowMsg">

                </div>

                <div class="modal_userList_Wrap_bottom">
                    <span class="modal_userList_Wrap_bottom_rightBtn" @click="iKnowAboutIt">知道了</span>
                </div>
            </div>
        </div>

        <div class="modal_userList_cover" v-if="uploadState">
            <div class="modal_userList_Wrap">
                <div class="modal_userList_Wrap_title">
                    上传支付截图
                </div>
                <div id="pop-up-box">
                    <qiniu-img event-Name="imgPath" :defaultimg="imgPath"></qiniu-img>
                </div>

                <div class="modal_userList_Wrap_bottom">
                     <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancelToUploadImgFn">取消</span>
                    <span class="modal_userList_Wrap_bottom_rightBtn" @click="saveUploadImgFn">保存</span>
                </div>
            </div>
        </div>



        <!--结束咨询弹窗确认-->
        <div class="modal_userList_cover" v-if="closeCallOrderState">
            <div class="modal_userList_Wrap">
                <div class="modal_userList_Wrap_title">
                    结束咨询
                </div>
                <div class="modal_userList_Wrap_title_cancel_valet">
                    <p>确定结束咨询吗？</p>
                </div>

                <div class="modal_userList_Wrap_bottom">
                    <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancel">取消</span>
                    <span class="modal_userList_Wrap_bottom_rightBtn" @click="saveCloseCallFn">确定</span>
                </div>
            </div>
        </div>

        <!--即时咨询-->
        <div class="modal_userList_cover" v-if="immediatelyCallByUserState">
            <div class="modal_userList_Wrap">
                <div class="modal_userList_Wrap_title">
                    即时咨询
                </div>
                <div class="normal-window-content">
                    <div>{{ imCallMsg }}</div>
                    <div v-if="imCallState === 2">是否继续选择该老师进行咨询？</div>
                </div>

                <div class="modal_userList_Wrap_bottom">
                    <span  class="modal_userList_Wrap_bottom_rightBtn" v-if="imCallState === 1" @click="cancel">确认</span>
                    <template v-if="imCallState === 2">
                        <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancel">取消</span>
                        <span class="modal_userList_Wrap_bottom_rightBtn" @click="saveImmediatelyCallByUserFn">确定选择</span>
                    </template>


                </div>
            </div>
        </div>

        <!--即时咨询2-->
        <div class="modal_userList_cover" v-if="immediatelyCallByUserState2">
            <div class="modal_userList_Wrap">
                <div class="modal_userList_Wrap_title">
                    即时咨询
                </div>
                <div class="normal-window-content">
                    <div>{{ imCallMsg2 }}</div>
                    <!--<div v-if="imCallState2 === 2">是否继续选择该老师进行咨询？</div>-->
                </div>

                <div class="modal_userList_Wrap_bottom">
                    <span  class="modal_userList_Wrap_bottom_rightBtn" v-if="imCallState2 === 1" @click="cancel">确认</span>
                    <template v-if="imCallState2 === 2">
                        <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancel">取消</span>
                        <!--<span class="modal_userList_Wrap_bottom_rightBtn" @click="saveImmediatelyCallByUserFn2">确定选择</span>-->
                    </template>


                </div>
            </div>
        </div>

        <!--取消订单-->
        <div class="modal_userList_cover" v-if="cancelOrderState">
            <div class="modal_userList_Wrap">
                <div class="modal_userList_Wrap_title">
                    填写取消理由
                </div>
                <div class="modal_userList_Wrap_title_cancel_valet">
                    <textarea v-model="refuseReason" maxlength="50" placeholder="50字以内" style="height: 176px; width: 209px;margin-top: 50px;">

                    </textarea>
                </div>

                <div class="modal_userList_Wrap_bottom">
                    <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancel">返回</span>
                    <span class="modal_userList_Wrap_bottom_rightBtn" @click="saveCancelOrderOpearteFn">确认</span>
                </div>
            </div>
        </div>

        <!--立即拨打或继续拨打-->
        <div class="modal_userList_cover" v-if="startCallByPsychoState">
            <div class="modal_userList_Wrap">
                <div class="modal_userList_Wrap_title">
                    {{ callTypeList[callTypeNumber] }}
                </div>
                <div class="modal_userList_Wrap_title_cancel_valet">
                    <p>确定要{{ callTypeList[callTypeNumber] }}吗？</p>
                </div>

                <div class="modal_userList_Wrap_bottom">
                    <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancel">取消</span>
                    <span class="modal_userList_Wrap_bottom_rightBtn" @click="saveOpStartCallByPsychoFn">确定</span>
                </div>
            </div>
        </div>

        <!--修改预约-->
        <div class="modal_userList_cover" v-if="clickToValetChange">
            <div class="modal_userList_Wrap" style="width:500px">
                <div class="modal_userList_Wrap_title">
                    修改预约
                </div>
                <ul>
                    <li>
                        <span class="modal_userList_box_left_span">用户手机号</span>
                        <span class="modal_userList_box_right_span">{{ userInformationList.mobilePhone }}</span>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">用户姓名</span>
                        <span class="modal_userList_box_right_span">{{ userInformationList.username }}</span>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">客户来源</span>
                        <span class="modal_userList_box_right_span">{{ userInformationList.platformStr }}</span>

                    </li>

                    <!-- 服务专家 -->
                    <li class="modal_userList_Wrap_slecte_expert">
                        <span class="modal_userList_box_left_span">服务专家</span>
                        <div style="display:inline-block;position:relative;">

                            <input type="text" name="" class="telInp" placeholder="请输入专家姓名或手机号" disabled
                                   @keyUp="inputExpertsInformationFn"
                                   v-model="expertInfo"
                            >
                        </div>
                    </li>
                    <!-- 此处li标签为显示专家手机号的信息 -->
                    <li>
                        <span class="modal_userList_box_left_span"></span>
                        <span class="modal_userList_box_left_span_text" v-if="wrongTel.status"
                              v-text="wrongTel.text"></span>
                        <span class="modal_userList_box_left_span_text2" v-if="expertsName2ForChange.status">已选专家：{{ chooseExpertNameForChange
                        }}（手机号：{{ chooseExpertTelForChange }}）</span>


                    </li>


                    <li>
                        <span class="modal_userList_box_left_span">服务时间</span>
                        <span class="modal_userList_box_right_span">
                        <input class="calendarInputClass" size="50" type="text" @click.stop="open($event,'picker2')"
                               v-model="calendar.items.picker2.value" placeholder="请选择日期" id="end" name="end">
                        <calendar
                                :show.sync="calendar.show"
                                :type="calendar.type"
                                :value.sync="calendar.value"
                                :x="calendar.x"
                                :y="calendar.y"
                                :begin.sync="calendar.begin"
                                :end.sync="calendar.end"
                                :range.sync="calendar.range"
                                :weeks="calendar.weeks"
                                :months="calendar.months"
                                :sep.sync="calendar.sep">

                        </calendar>
                        -
                        <select class="modal_userList_box_left_span_sel1" v-model="selectData1Value" @change="selFnOne">
                            <option v-for="item in selectData1" :value="item">{{item | format}}</option>

                        </select>
                        时
                        <select class="modal_userList_box_left_span_sel1" v-model="selectData2Value">
                            <option v-for="item in selectData2" :value="item">{{item | format}}</option>

                        </select>
                        分
                    </span>

                    </li>




                    <li>
                        <span class="modal_userList_box_left_span">服务价格</span>
                        <span class="modal_userList_box_right_span"
                              style="color:green;">{{userInformationList.price}}元/{{userInformationList.duration}}分钟</span>

                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">预约客服</span>
                        <span class="modal_userList_box_right_span">{{ serviceNameForChange }}</span>
                    </li>
                </ul>

                <div class="modal_userList_Wrap_bottom">
                    <span class="modal_userList_Wrap_bottom_leftBtn" @click="clickToValetChange = false">取消</span>
                    <span class="modal_userList_Wrap_bottom_rightBtn" @click="sureToChangeValet">确认修改</span>
                </div>
            </div>
        </div>

        <!--修改预约成功提示-->
        <div class="dialog-wrapper" v-if="changeSuccessWindow">
            <div class="dialog-container2">
                <h4>修改成功！</h4>
                <div class="btn-wrapper" style="justify-content: flex-end;">
                    <div @click="changeSuccessWindow = false">好的</div>
                </div>
            </div>
        </div>

        <!--第三方咨询-->
        <div class="dialog-wrapper" v-if="thirdConsultationState">
            <div class="dialog-container2">
                <h4>确定进行第三方咨询吗？</h4>
                <div class="btn-wrapper">
                    <div @click="thirdConsultationState = false">取消</div>
                    <div @click="sureToCreateThiedCFn" v-if=" !isSendingThirdC">确定</div>
                    <div v-else>发送中</div>

                </div>
            </div>
        </div>

        <!--第三方咨询成功提示-->
        <div class="dialog-wrapper" v-if="thirdConsultationSuccessState">
            <div class="dialog-container2">
                <h4>创建成功！</h4>
                <div class="btn-wrapper" style="justify-content: flex-end;">
                    <div @click="thirdConsultationSuccessState = false">好的</div>
                </div>
            </div>
        </div>



        <!-- 删除 -->
        <div class="dialog-wrapper" v-if="deleteStatus">
            <div class="dialog-container">
                <h4>审核确认</h4>
                <p style="line-height: 30px; margin-bottom: 15px;">是否通过审核？</p>
                <div class="btn-wrapper">
                    <div @click="auditComm(1)">通过</div>
                    <div @click="auditComm(2)">不通过</div>
                    <div @click="deleteStatus=false">取消</div>
                </div>
            </div>
        </div>

    </div>




</template>
<script type="text/javascript">
    import $ from "jquery"
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import moment from "moment"
    import calendar from "../../calendar.vue"
    import qiniuImg from "./qiniuImg"
    import timeRange from "components/timeRange"
    import {getURLParams} from "../../utils"

    import {
        addNetsalesOrder,
        checkPsychoByMobilePhone,
        getNetsalesOrder,
        // 订单列表预约服务
        addBespeakService,
        // 立即拨通
        immediatelyCall,
        reCall,
        getResponse,
        getResponses,
        getResponsesExcel

    } from "../../api"


    Vue.use(zpagenav)

    export default {

        components: {
            calendar,
            timeRange,
            qiniuImg
        },

        events:{
            'imgParameter':function(obj,eventName){
                this[eventName] = obj[eventName].imgPath
            },
        },

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
                deleteStatus:false,
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
                    value: '',
                    weeks: [],
                    months: [],
                    sep: "-",
                    range: false,
                    items: {
                        // 单选模式
                        picker2: {
                            type: "date",
                            begin: moment().add(15, "minutes").format().split('T')[0],
                            // value:this.calendarValue,
                            value: '',
                            sep: "-",
                            weeks: ['日', '一', '二', '三', '四', '五', '六'],
                            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        }

                    }
                },
                calendarValue: '',
                isToday: true,

                searchStartTime: '',
                searchEndTime: '',
                searchChannel: '',
                searchAudit:"-1",
                searchUserTel: '',
                searchExpertName: '',
                searchExpertTel: '',
                searchServiceName: '',
                cutomerName: '',

                timeQuantumList: [],

                serviceName: sessionStorage.username,
                switchTab: 1,
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 10, //total item count
                maxLink: 15, //how many links to show, must not less than 5,  default is 5
                pageSize: 15,
                data: [],
                // checkState: false,
                default: '',
                searchVal: '',
                idelete: false,
                selectPersonList2: [],




                nowMinute: '',
                nowHour: '',
                // 预约服务
                duration: "",
                price: "",
                clickToValet: false,
                clickToValet2: false,
                telInpVulue: "",
                wrongTel: {
                    status: false,
                    text: "此手机号不存在对应的专家"
                },
                expertsName: {
                    status: false,
                    text: "",
                    price: {
                        price: "",
                        time: ""
                    }
                },
                // 用户信息
                userInformation: {
                    consumerMobilePhone: '',
                    userName: '',
                    platformStr: '',
                    price: '',
                    time: '',
                    duration: '',
                    psychoName: '',
                    psychoId: ''

                },
                noid: '',



                //创建订单
                toCreateIndent: false,
                // telInpVulue2:"",
                wrongTel2: {
                    status: false,
                    text: "此手机号不存在对应的专家"
                },
                wrongTel3: {
                    status: false,
                    text: "请输入正确的手机号"
                },
                wrongMsg3: {
                    status: false,
                    text: "请谨慎操作，您输入的金额已大于 10000 元！"
                },
                expertsName2: {
                    status: false,
                    text: ""
                },
                gatheringAmountNumber: '',

                form2: {
                    duration: "",
                    price: "",
                    platformChannel: 0,
                    consumerMobilePhone: "",
                    userName: "",
                    password: "",
                    psychoMobilePhone: "",
                    gatheringAmount: "", //收款金额
                    gatheringAccount: "", //收款账户
                    userId: sessionStorage.userId,
                    isPayment: 1,
                    orderNum: 1,
                },

                // 创建订单时根据手机号判断用户是否已经存在
                isTelExists: false,
                telExistsUsername: '哈哈哈',
                telExistsUserPsd: '******',
                telExistsCashbalance: '',

                // 输入专家姓名后出现下拉框
                searchExpertsListsWrap: false,
                // 输入的专家信息
                expertInfo: '',
                searchExpertsLists: [],

                chooseExpertName: '',
                chooseExpertTel: '',
                chooseExpertId: '',
                // 来源
                platformChannelList: [],
                // 收款账户
                gatheringAccountList: [],
                // 立即拨通
                windowAlert: false,

                errMsgAlertWindow: false,
                errMsgAlertWindowMsg: '',

                sending: false,
                channelOrderList: [],

                uploadState: false,
                imgPath: '',
                // 创建订单时选择的预约时间类型
                bespeakType: 1,

                arrangeDateList: [],


                // 选中的状态展示
                chooseList: {
                    arrangeDate: '',
                    v: '',
                },

            //    选择期望时间后去预约
                consumerMid: '',

                consultContent: '',  // 问题描述

                customerAge: '',
                customerSex: '',

                closeCallOrderState: false,

                immediatelyCallByUserState: false,
                immediatelyCallByUserState2: false,
                cancelOrderState: false,
                refuseReason: '',

                selectPersonList: [],
                selectPersonAll: false,
                startCallByPsychoState: false,
                callTypeList: ['立即拨打', '继续拨打'],
                callTypeNumber: '',

            //    即时咨询状态信息展示

                imCallState: '',
                imCallState2: '',
                imCallMsg: '',
                imCallMsg2: '',
                isExportingExcel: false,

                recentPageCheckedNumber: '',


            //    修改预约
                clickToValetChange: false,
                changeSuccessWindow: false,

                userInformationList: {
                    username: "",
                    mobilePhone: "",
                    platformStr: "",
                    price:"",
                    duration:""

                },
                serviceNameForChange: '',


                // 初次打开修改预约时不显示已预约时间段
                isShowTimeQuantumCount: 0,

                expertsName2ForChange: {
                    status: false,
                    text: ""
                },
                chooseExpertNameForChange: '',
                chooseExpertTelForChange: '',


                expertsNameForChange: {
                    status: false,
                    text: "",
                    price: {
                        price: "",
                        time: ""
                    }
                },
                pid: '',


                // 可预约时间向后推迟一个小时
                permissionTimeDate: '',
                permissionH: '',
                permissionM: '',


                hourToNum: 0,
                minuteToNum: 0,
                selectData1: [],
                selectData1Value: "",
                selectData2Value: "",

                psychoIdForChange: '',

            //    第三方咨询
                thirdConsultationState: false,
                thirdConsultationSuccessState: false,
                isSendingThirdC: false,


                // 是否允许减少
                allowReduce: false,
                // 是否允许增减
                allowAdd: true,
                // 限制套餐数量
                orderLimit: 50,

                //   已取消和待接单状态合集
                flagList: [20,  22],

                // 展开状态id数组
                foldList: [],

                // 咨询方式
                consultList: ['即时咨询', '预约咨询', '第三方咨询'],
                consultType: 2,

                platformChannelStr: '',
                gatheringAccountName: '',

                // 新的选择时间的标识
                newChooseTimeState: false,
                soid2: '',

                // 套餐中子订单取消订单标识
                childCancelOrder: false,
                childPsychoId: '',

                // 套餐中子订单修改时间标识
                childChangeTime: false,
//              审核ID
                auditId:"",
//                用户ID
                userId:sessionStorage.userId,




            }
        },
        watch: {
            page() {

                this.getNetsalesOrderFn()
            },

            // bespeakType(value) {
            //
            //     this.getPsychoArrangeDateFn(value)
            // },

            'calendar.value': function (value) {


                if (this.isShowTimeQuantumCount === 0) {
                    this.isShowTimeQuantumCount = 1
                } else {
                    this.isShowTimeQuantumCount = -1
                }


                this.calendar.items.picker2.value = value
                this.calendarValue = value
                // this.calendar.picker == 'picker1' ? this.start = value+' 00:00:00' : this.end = value+' 00:00:00'

                if (value && this.pid) {
                    this.checkPsychoBespeakTimeFn(value)
                }
            },


            pid() {
                // console.log(value)
                if (this.pid && this.calendarValue) {
                    // this.checkPsychoBespeakTimeFn(this.calendarValue)
                }
            },


            selectData1Value() {

                if (this.isShowTimeQuantumCount === 0) {
                    this.isShowTimeQuantumCount = 1
                } else {
                    this.isShowTimeQuantumCount = -1
                }

                if (this.pid && this.calendarValue) {
                    this.checkPsychoBespeakTimeFn(this.calendarValue)
                }

            },
            selectData2Value() {


                if (this.isShowTimeQuantumCount === 1) {
                    this.isShowTimeQuantumCount = 2
                } else {
                    this.isShowTimeQuantumCount = -1
                }

                if (this.pid && this.calendarValue) {
                    this.checkPsychoBespeakTimeFn(this.calendarValue)
                }


            }



        },
        filters: {
            format(value) {
                // 将0修改为00
                const valueToStr = value + ""
                return valueToStr.replace(/^(\d)$/, "0$1")
            },
            orderStatusFilter(value) {
                return ["已创建", "已拨打", "已预约", "短信已发送", "通话中"][value - 1]
            },

            isPaymentFilter(value) {
                return ["未付款", "已付款"][value]
            },

            durationFormat(value) {
                // return `${~~ (value / 60)}'${value % 60}"`
                return value ? parseInt(value / 60) : ''
            },

            weekDayStateListFilter(value) {
                return ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][value - 1]
            },
            isAuditFormat(value){
                return ["待审核","审核通过","审核不通过"][value]
            },
            typeFormat(value) {

                // 30：已处理 31：待处理 32：已退款

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
                    42:'未选时间'
                }

                return types[value]
            },

            isRefundFormat(value) {
               return ["否", "是"][value]
            },
        },

        methods: {
//            审核框显示
            auditSure(noid){
                this.auditId=noid;
                this.deleteStatus=true;
            },
//          审核操作
            async auditComm(audit){
                this.deleteStatus=false;
                let data = await getResponses('netsalesOrder/auditNewOrder.json', `isAudit=${audit}&noid=${this.auditId}&userId=${this.userId}`);
                if(data.code===0){
                    alert("操作成功！")
                    this.getNetsalesOrderFn()
                }else {
                    alert(data.msg)
                }
            },
            ddd(start, end) {
                if (start && start.length === 19) {
                    this.searchStartTime = start
                } else {
                    this.searchStartTime = ''
                }

                if (end && end.length === 19) {
                    this.searchEndTime = end
                } else {
                    this.searchEndTime = ''
                }
            },


            // 获取平台渠道
            async obtainChannels() {
                let data = await getResponse('netsalesConf/getPlatformChannelList.json')

                if (data.code === 0) {
                    this.platformChannelList = data.list
                } else {
                    alert(`${data.msg}`)
                }
            },
            // 获取收款账户类型
            async obtainGatheringAcc() {
                let data = await getResponse("netsalesConf/getGatheringAccList.json")
                if (data.code === 0) {
                    this.gatheringAccountList = data.list
                } else {
                    alert(`${data.msg}`)
                }
            },

            // 输入专家姓名或者电话号码后keyUp事件
            async inputExpertsInformationFn(){
                if (this.expertInfo) {
                    let data = await getResponses('netsalesOrder/serchMemberByMobilePhoneOrName.json', `userType=2&words=${this.expertInfo.trim()}`)
                    if (data.code === 0) {
                        this.searchExpertsListsWrap = true
                        this.searchExpertsLists = data.list

                    } else {
                        this.searchExpertsListsWrap = false
                        this.searchExpertsLists = []
                        this.chooseExpertName = ""
                        this.chooseExpertTel = ""
                        this.expertsName2.status = false
                    }
                } else {
                    this.searchExpertsListsWrap = false
                    this.searchExpertsLists = []
                    this.chooseExpertName = ""
                    this.chooseExpertTel = ""
                    this.expertsName2.status = false
                    console.log("empty")
                }


            },
            // 选中专家事件
            chooseExpertFn(index, name, telphone, psychoId) {
                this.searchExpertsListsWrap = false
                console.log(index)
                this.chooseExpertName = name
                this.chooseExpertTel = telphone
                this.expertsName2.status = true
                this.chooseExpertId = psychoId

            },

            // 立即拨通
            async immediatelyCallFn(noid) {
                this.noid = noid
                let data = await immediatelyCall(`noid=${this.noid}`)
                console.log(data)
                if (data.code === 0) {
                    this.windowAlert = true
                    this.getNetsalesOrderFn()
                    this.toCloseWindow()
                } else {

                    this.windowAlert = false
                    this.errMsgAlertWindow = true
                    this.errMsgAlertWindowMsg = data.msg
                }
            },
            async reCallFn(noid) {
                this.noid = noid
                let data = await reCall(`noid=${this.noid}`)
                console.log(data)
                if (data.code === 0) {
                    this.windowAlert = true
                    this.getNetsalesOrderFn()
                    this.toCloseWindow()
                } else {

                    this.windowAlert = false
                    this.errMsgAlertWindow = true
                    this.errMsgAlertWindowMsg = data.msg
                }
            },
            iKnowAboutIt() {
                this.errMsgAlertWindow = false
                this.errMsgAlertWindowMsg = ''
                this.switchTab = parseFloat(this.switchTab)
                let params = `pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&isPayment=${this.switchTab}`
                this.getNetsalesOrderFn(params)
            },
            toCloseWindow() {
                setTimeout(() => {
                    this.windowAlert = false
                    this.haveBeenCalledTextShow = false
                }, 3000)
            },

            // 创建订单时判断手机号是否正确
            async checkTelFn3() {
                if (!this.form2.consumerMobilePhone.match(/^1(\d){10}$/)) {
                    this.isTelExists = false
                    this.telExistsUsername = ""
                    this.wrongTel3.status = true

                    return
                } else {
                    this.wrongTel3.status = false
                    // 根据手机号判断用户是否已经存在
                    let data = await getResponses('netsalesOrder/serchMemberByMobilePhoneOrName.json', `userType=1&words=${this.form2.consumerMobilePhone}`)
                    console.log(data)
                    if (data.code == 0) {
                        // 此用户已注册
                        this.isTelExists = true
                        this.telExistsUsername = data.list[0].nickname
                        this.telExistsCashbalance = data.list[0].cashAmount

                    } else {
                        this.isTelExists = false
                        this.telExistsUsername = ""
                        // alert(`${data.msg}`)
                    }

                }
            },
            telFn3FocuseFn() {
                this.this.wrongTel3.status = false
            },
            switchFn(id){
                this.switchTab = id
            },
            checkTelFn2() {
                console.log(this.form2.psychoMobilePhone)
                if (!this.form2.psychoMobilePhone.match(/^1(\d){10}$/)) {
                    this.wrongTel2.status = true
                    this.expertsName2.status = false
                } else {
                    this.wrongTel2.status = false
                    this.checkPsychoByMobilePhoneFn(this.form2.psychoMobilePhone)
                }

            },
            checkTelFn() {
                // 判断手机号是否正确
                console.log(this.telInpVulue)

                if (!this.telInpVulue.match(/^1(\d){10}$/)) {
                    this.wrongTel.status = true
                    this.expertsName.status = false
                    return
                } else {
                    this.wrongTel.status = false
                    console.log(this.form2.consumerMobilePhone)

                    // 查询数据库中是否有此专家
                    this.checkPsychoByMobilePhoneFn(this.telInpVulue)
                }


            },

            async checkPsychoByMobilePhoneFn(telValue){
                let data = await checkPsychoByMobilePhone(`mobilePhone=${telValue}`)
                console.log(data)


                if (data.code === 0) {
                    if (this.toCreateIndent) {
                        // 创建订单
                        this.wrongTel2.status = false
                        this.expertsName2.status = true
                        this.expertsName2.text = data.psycho.nickname
                        this.getNetsalesOrderFn()


                    }
                    if (this.clickToValet) {
                        // 预约服务
                        this.wrongTel.status = false
                        this.expertsName.status = true
                        this.expertsName.text = data.psycho.nickname
                        this.expertsName.price.price = data.serviceGoods.price
                        this.expertsName.price.time = data.serviceGoods.duration
                    }

                    if (this.clickToValetChange){
                        // 修改预约

                        this.wrongTel.status = false
                        this.expertsNameForChange.status = true

                        this.expertsNameForChange.price.price = data.serviceGoods.price
                        this.expertsNameForChange.price.time = data.serviceGoods.duration
                        this.pid = data.psycho.mid
                        this.userInformation.psychoId = data.psycho.mid
                    }
                } else {
                    if (this.toCreateIndent) {
                        this.expertsName2.status = false
                        this.expertsName2.text = ""
                        this.wrongTel2.status = true
                    }
                    if (this.clickToValet) {
                        this.expertsName.status = false
                        this.expertsName.text = ""
                        this.expertsName.price.price = ""
                        this.expertsName.price.time = ""
                        this.wrongTel.status = true

                    }


                    if (this.clickToValetChange) {
                        this.wrongTel.status = true
                        this.expertsNameForChange.status = false

                        this.expertsNameForChange.price.price = ''
                        this.expertsNameForChange.price.time = ''
                        this.pid = ''
                        this.userInformation.psychoId = ''
                    }
                }

            },

            // 点击查看用户咨询记录
            changeFn2(id) {
                console.log(id)
                this.$dispatch('child-msg', "查看咨询记录")
                this.$route.router.go(`/searchRecord/${id}`)

            },

            toCreateIndentFn() {
                this.toCreateIndent = true
                this.expertInfo = ''
                this.form2.orderNum = 1
                this.returnToZero()
                this.obtainGatheringAcc()
            },
            cancelIndentFn() {

                this.toCreateIndent = false
            },

            clickToValetFn(phone, name, platformStr, noid, price, time, duration, psychoName, psychoId, consumerMid, id, soid2) {
                if (id === 2) {
                    this.newChooseTimeState = true
                    this.soid2 = soid2
                } else {
                    this.newChooseTimeState = false
                    this.soid2 = ""
                }
                this.userInformation = {}
                this.userInformation.consumerMobilePhone = phone
                this.userInformation.userName = name
                this.userInformation.platformStr = platformStr
                this.userInformation.time = time
                this.userInformation.price = price
                this.userInformation.duration = duration
                this.userInformation.psychoName = psychoName
                this.userInformation.psychoId = psychoId

                this.consumerMid = consumerMid


                this.bespeakType = 1
                // 清空添加的信息
                this.consultContent = ""
                this.customerAge = ''
                this.customerSex = ''




                this.getPsychoArrangeDateFn(this.bespeakType)

                this.noid = noid
                this.valetToZero()
                this.clickToValet = true

            },
            cancelValetFn() {
                this.clickToValet = false
                this.clickToValet2 = false
                this.valetToZero()
            },

            // 确认创建订单
            async sureToCreateIndent() {


                this.form2.gatheringAmount = this.gatheringAmountNumber
                if (!this.form2.platformChannel) {
                    alert("请选择客户来源！")
                    return
                }
                if (!this.form2.consumerMobilePhone) {
                    alert("请输入用户手机号码！")
                    return
                }

                if (!this.isTelExists && !this.form2.userName) {
                    alert("请输入用户姓名！")
                    return
                }

                if (!this.isTelExists && !this.form2.password) {
                    alert("请输入登录密码！")
                    return
                }
                if (!this.chooseExpertName || !this.chooseExpertTel) {
                    alert("请输入正确的预约专家信息！")
                    return
                }


                if (!this.form2.gatheringAmount) {
                    alert("请输入收款金额")
                    return
                }

                if (!this.form2.gatheringAccount) {
                    alert("请选择收款账户")
                    return
                }

                if (!this.form2.duration) {
                    alert("请输入服务时长")
                    return
                }
                if (!this.form2.price) {
                    alert("请输入服务价格")
                    return
                }

                //  即时咨询，订单数量若不为1，弹窗提示“套餐请选择预约咨询”
                if (this.consultType === 1 && this.form2.orderNum > 1 ) {
                    alert("套餐请选择预约咨询!")
                    return
                }


                this.form2.duration = parseFloat(this.form2.duration)
                this.form2.gatheringAmount = parseFloat(this.form2.gatheringAmount)
                this.form2.platformChannel = parseFloat(this.form2.platformChannel)
                this.form2.gatheringAccount = parseFloat(this.form2.gatheringAccount)


                // 根据收款账户ID查询收款账户名字
                this.gatheringAccountList.forEach((item) => {
                    if (item.gaId === this.form2.gatheringAccount) {
                        this.gatheringAccountName = item.gatheringAcc
                    }

                })

                // 根据客户来源ID查询客户来源名字
                this.platformChannelList.forEach((item) => {
                    if (item.pcId === this.form2.platformChannel) {
                        this.platformChannelStr = item.platformChannel
                    }

                })



                // 根据咨询方式，打开对应的弹窗
                this.toCreateIndent = false

                // 预约咨询
                if (this.consultType === 2) {
                    this.getPsychoArrangeDateFn2(1)
                    this.clickToValet2 = true
                }


                // 即时咨询
                if (this.consultType === 1) {
                    this.immediatelyCallByUserFn2(this.form2.duration, this.chooseExpertId)
                }

                // 第三方咨询
                if (this.consultType === 3) {
                    console.log(333)
                    this.consultOrderCreateSuccess()
                }





                return


                this.sending = true

                let data = await getResponses("netsalesOrder/addNetsalesOrder.json", this.serialize(params))
                console.log(data)
                if (data.code === 0) {
                    this.toCreateIndent = false
                    this.getNetsalesOrderFn()
                } else {
                    alert(data.msg)
                }
                this.sending = false
            },

            async immediatelyCallByUserFn2( duration, psychoId) {

                // 调用接口判断时间是否允许
                let data = await getResponses('netsalesOrder/checkAllowCall.json', `duration=${duration}&psychoId=${psychoId}`)

                if (data.code === 0) {
                    this.consultOrderCreateSuccess()
                } else {
                    if (data.code === 4001) {
                        //   4001：不允许拨打
                        this.imCallState2 = 1
                        this.immediatelyCallByUserState2 = true
                        this.imCallMsg2 = "该老师正在咨询中，请稍后再试或选择其他老师！"
                    } else if (data.code === 4002) {
                        // 谨慎操作  4002：该专家已有预约
                        this.imCallState2 = 2
                        this.immediatelyCallByUserState2 = true
//                        this.imCallMsg2 = "该老师在" + data.msg + "已有预约咨询，请谨慎操作。"
                        this.imCallMsg2 = "该老师正在咨询中，请稍后再试或选择其他老师"
                    } else {
                        alert(data.msg)
                    }


                }

            },

            // 即时咨询成功接口 || 第三方咨询订单创建成功
            async consultOrderCreateSuccess() {
                let data = await getResponses("netsalesOrder/addNetsalesOrder.json", this.serialize(this.valetParamsFn()))
                console.log(data)
                if (data.code === 0) {
                    this.clickToValet2 = false
                    alert(this.consultList[this.consultType - 1] + "订单创建成功！")
                    this.getNetsalesOrderFn()
                    this.returnToZero()
                } else {
                    alert(data.msg)
                }
            },


            valetParamsFn() {
                let params = {}
                params.consumerMobilePhone = this.form2.consumerMobilePhone
                params.gatheringAccount = this.gatheringAccountName
                params.gaId = this.form2.gatheringAccount
                params.gatheringAmount = this.form2.gatheringAmount
                params.password = this.form2.password
                params.pcId = this.form2.platformChannel
                params.platformChannelStr = this.platformChannelStr
                params.psychoMobilePhone = this.chooseExpertTel
                params.userId = this.form2.userId
                params.userName = this.form2.userName
                params.duration = this.form2.duration
                params.price = this.form2.price
                params.isPayment = this.form2.isPayment

                // 新增套餐数量
                params.orderNum = this.form2.orderNum

                // 咨询方式
                params.consultType = this.consultType

                return params
            },



            valetToZero() {
                this.form2.price = ""
                this.duration = ""
                this.telInpVulue = ""
                this.wrongTel.status = false
                this.expertsName.status = false
                this.wrongMsg3.status = false
                this.expertsName.text = ""
                this.expertsName.price.price = ""
                this.expertsName.price.time = ""

            },
            returnToZero() {
                this.form2.price = ""
                this.form2.duration = ""
                this.form2.platformChannel = 0
                this.form2.consumerMobilePhone = ""
                this.form2.userName = ""
                this.form2.password = ""
                this.form2.psychoMobilePhone = ""
                this.form2.gatheringAmount = ""
                this.form2.gatheringAccount = ""
                this.form2.isPayment = 1
                this.wrongTel2.status = false
                this.expertsName2.status = false
                this.gatheringAmountNumber = ""
                this.isTelExists = false
                this.telExistsUsername = ""
                this.searchExpertsListsWrap = false
                this.expertInfo = ""
                this.searchExpertsLists = []
                this.chooseExpertName = ""
                this.chooseExpertTel = ""
                this.chooseExpertId = ''
                this.gatheringAccountList = ""
                this.platformChannelStr = ""
                this.gatheringAccountName = ""
                this.consultType = 2
                this.newChooseTimeState = false
                this.soid2 = ""

            },



            pageHandler(page) {
                //here you can do custom state update
                this.page = page
            },
            createUrl(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },
            changeFn(e) {
                this.checkState = e.target.checked
            },


            //导出到excel
            async downloadExcel() {
                // let params = {}



                // if (this.selectPersonList.length) {
                //     params.ids = JSON.stringify(this.selectPersonList)
                // }


                this.isExportingExcel = true

                const p = this.serialize(this.paramsFn())
                console.log("p:", p)
                const data = await getResponsesExcel("netsalesOrder/exportOrder.json", p)
                console.log(data)

                let blob = new Blob([data], {
                        'type': 'application/msexcel'
                    }),
                    a = this.$els.a

                a.href = window.URL.createObjectURL(blob)
                a.download = `订单列表.xls`
                a.click()

                this.isExportingExcel = false

                this.selectPersonList = []

                //修改
                this.data.forEach((item) => {   //checkBox
                    Vue.set(item, "checkState", false);
                })

            },

            selectAll() {
                console.log(this.checkAllState)
                // this.checkAllState = !this.checkAllState

                if (!this.checkAllState) {
                    this.data.forEach((item) => {
                        if (!item.checkState) {
                            this.selectPersonList.push(item.noid)
                            item.checkState = true
                        }
                    })

                } else {
                    this.data.forEach((item) => {
                        if (item.checkState) {
                            for (let i = 0; i < this.selectPersonList.length; i++) {
                                if (this.selectPersonList[i] == item.noid) {
                                    this.selectPersonList.splice(i, 1)
                                    item.checkState = false
                                }
                            }

                        }
                    })

                }

            },

            selectPerson(noid, item) {
                console.log(item.checkState);
                item.checkState = !item.checkState

                if (item.checkState) {
                    this.selectPersonList.push(noid)
                } else {
                    for (let i = 0; i < this.selectPersonList.length; i++) {
                        if (this.selectPersonList[i] == noid) {
                            this.selectPersonList.splice(i, 1)
                        }
                    }

                }

                console.log(this.selectPersonList)
            },
            serialize(hash) {
                let result = []

                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })

                return result.join("&")
            },

            popUpUploadFn(noid, pic) {
                this.noid = noid
                if (pic) {
                    this.imgPath = pic
                } else {
                    this.imgPath = ''
                }

                this.uploadState = true
            },

            cancelToUploadImgFn() {
                this.uploadState = false
            },

            async saveUploadImgFn() {
                let data = await getResponses('netsalesOrder/updateNetsalesOrder.json', `noid=${this.noid}&paymentPicture=${this.imgPath}`)

                if (data.code === 0) {
                    this.uploadState = false
                    this.getNetsalesOrderFn()
                } else {
                    alert(data.msg)
                }
            },

            editOrderFn(id) {
                this.$dispatch('child-msg', "编辑下单")
                this.$route.router.go(`/editOrder/${id}`)
            },

            toChooseBespeakTimeFn(date, v, type) {

                if (type === 2) {
                //    说明可约但未选中 -> 选中
                    this.chooseList.arrangeDate = date
                    this.chooseList.v = v
                } else {
                    // 可约但已选中  -> 取消选中
                    this.chooseList.arrangeDate = ''
                    this.chooseList.v = ''
                }

            },

            // 已选专家的已设置预约时间接口  (获取专家排班时间)
            async getPsychoArrangeDateFn(type) {
                this.chooseList.arrangeDate = ''
                this.chooseList.v = ''
                let params = {}
                params.bespeakType = type
                params.mid = this.userInformation.psychoId
                const data = await getResponses("appOrderBespeak/V3/getPsychoArrangeDateByUser.json", this.serialize(params), '/depression-api/')

                if (data.code === 0) {
                    this.arrangeDateList = data.content.arrangeDate

                    this.arrangeDateList.forEach((item) => {
                        Vue.set(item, 'dataValue', JSON.parse(item.dataValue))
                        Vue.set(item, 'pickDateValue', JSON.parse(item.pickDateValue))

                    })
                } else {
                    alert(data.msg)
                }
            },

            // 已选专家的已设置预约时间接口  (获取专家排班时间)
            async getPsychoArrangeDateFn2(type) {
                this.chooseList.arrangeDate = ''
                this.chooseList.v = ''
                let params = {}
                params.bespeakType = type
                params.mid = this.chooseExpertId
                const data = await getResponses("appOrderBespeak/V3/getPsychoArrangeDateByUser.json", this.serialize(params), '/depression-api/')

                if (data.code === 0) {
                    this.arrangeDateList = data.content.arrangeDate

                    this.arrangeDateList.forEach((item) => {
                        Vue.set(item, 'dataValue', JSON.parse(item.dataValue))
                        Vue.set(item, 'pickDateValue', JSON.parse(item.pickDateValue))

                    })
                } else {
                    alert(data.msg)
                }
            },






            paramsFn() {
                let params = {}
                params.pageSize = this.pageSize
                params.pageIndex = this.page

                this.searchStartTime && (params.startDate = this.searchStartTime)
                this.searchEndTime && (params.endDate = this.searchEndTime)
                this.searchChannel && (params.channelType = this.searchChannel)
                if(this.searchAudit!="-1"){
                    params.isAudit = this.searchAudit
                }
                this.searchUserTel && (params.cutomerPhone = this.searchUserTel.trim())

                this.searchExpertName && (params.psychoName = this.searchExpertName.trim())
                this.searchExpertTel && (params.psychoPhone = this.searchExpertTel.trim())
                this.searchServiceName && (params.userName = this.searchServiceName.trim())
                this.cutomerName && (params.cutomerName = this.cutomerName.trim())


                return params
            },
            async getNetsalesOrderFn() {

                // 接口名称 获取订单列表

//                let params = {}
//                params.pageSize = this.pageSize
//                params.pageIndex = this.page
//
//                this.searchStartTime && (params.startDate = this.searchStartTime)
//                this.searchEndTime && (params.endDate = this.searchEndTime)
//                this.searchChannel && (params.channelType = this.searchChannel)
//                this.searchUserTel && (params.cutomerPhone = this.searchUserTel.trim())
//
//                this.searchExpertName && (params.psychoName = this.searchExpertName.trim())
//                this.searchExpertTel && (params.psychoPhone = this.searchExpertTel.trim())
//                this.searchServiceName && (params.userName = this.searchServiceName.trim())
//                this.cutomerName && (params.cutomerName = this.cutomerName.trim())


                let data = await getResponses('netsalesOrder/getNewNetsalesOrder.json', this.serialize(this.paramsFn()))

                if (data.code === 0) {
                    this.data = data.netsalesOrders
                    this.total = data.count


                    //修改
                    this.data.forEach((item) => {   //checkBox
                        Vue.set(item, "checkState", false);
                    })
                    //修改
                    this.data.forEach((item) => {   //foldState
                        Vue.set(item, "foldState", false);
                    })



                    //修改选中状态
                    this.data.forEach((item) => {
                        //当列表中有此id时修改选中状态为选中
                        this.selectPersonList.forEach((v) => {
                            if (item.noid === v) {
                                Vue.set(item, "checkState", true);
                            }
                        })

                        this.foldList.forEach((v) => {
                            if (item.noid === v) {
                                // 再次判断此订单能不能展开

                                if (this.flagList.includes(item.orderStatus)) {
                                    console.log("无法展开子订单")

                                    this.foldList.splice(this.foldList.indexOf(item.noid), 1)
                                    console.log(this.foldList)
                                    return
                                }



                                Vue.set(item, "foldState", true);

                                this.foldStateFn(item.noid)

                            }
                        })


                    })
                } else {
                    alert(data.msg)
                }

            },

            async foldStateFn(id) {
                // 根据母订单id获取子订单列表
                const list = await getResponses('netsalesOrder/getChildOrderList.json', `noid=${id}`)
                console.log(list)
                if (list.code === 0) {

                    this.data.forEach((item) => {
                        if (item.noid === id) {
                            Vue.set(item, "childOrder", list.ServiceOrder);
                        }
                    })

                } else {
                    alert(list.msg)
                }
            },

            search() {
                this.page = 1
                this.foldList = []
                this.getNetsalesOrderFn()
                this.selectPersonList2 = []
            },


        //    接口名称 期望时间提醒
            async expectationByUser() {
                let params = {}
                // 判断用户有没有选中期望时间
                if (!this.chooseList.arrangeDate && !this.chooseList.v) {
                    alert("请先选中期望预约的时间，再发送申请! ")
                    return
                } else {
                //    期望时间拼接
                    params.bespeakTime = this.chooseList.arrangeDate.split(" ")[0] + " " + this.chooseList.v + ":00:00"
                }

                params.mid = this.consumerMid
                params.psychoId = this.userInformation.psychoId

                console.log(params)

                let data = await getResponses('appOrderBespeak/V3/expectationByUser.json', this.serialize(params), '/depression-api/')

                if (data.code === 0) {
                    this.clickToValet = false
                    this.valetToZero()
                    this.getNetsalesOrderFn()
                } else {
                    alert(data.msg)
                }
            },



            inputChange(e) {

                const target = e.target
                const value = target.value
                const key = target.dataset.key

                this[key] = target.value = value.replace(/\D/g, "")


            },

            inputChange2(e) {

                const target = e.target
                const value = target.value

                let a = target.value = parseInt(value.replace(/\D/g, ""))

                if (a >= this.orderLimit) {
                    this.allowReduce = true
                    this.allowAdd = false
                    this.form2.orderNum = this.orderLimit - 1
                } else if ( a > 1) {
                    this.form2.orderNum = a
                    this.allowReduce = true
                    this.allowAdd = true


                } else {
                    this.form2.orderNum = 1
                    this.allowReduce = false
                    this.allowAdd = true
                }

            },

            async sureToValetFn2() {
                let params = this.valetParamsFn()
                // 判断用户有没有选中期望时间
                if (!this.chooseList.arrangeDate && !this.chooseList.v) {
                    alert("请先选中想要预约的日期 ")
                    return
                } else {
                    //    期望时间拼接
                    params.bespeakTime = this.chooseList.arrangeDate.split(" ")[0] + " " + this.chooseList.v + ":00:00"
                }



                // Date bespeakTime,  预约时间
                // String consultContent,  问题描述
                // Integer customerAge,  性别
                // Byte customerSex   性别

                this.consultContent && (params.consultContent = this.consultContent)
                if(this.customerSex){
                    params.customerSex = this.customerSex
                }else{
                    alert("请选择性别")
                    return
                }
                if(this.customerAge){
                    params.customerAge = parseInt(this.customerAge)
                }else{
                    alert("请选择年龄")
                    return
                }
//                this.customerSex && (params.customerSex = this.customerSex)
//                this.customerAge && (params.customerAge = parseInt(this.customerAge))

                console.log(params)


                this.sending = true

                console.log(params)
                let data = await getResponses("netsalesOrder/addNetsalesOrder.json", this.serialize(params))
                console.log(data)
                if (data.code === 0) {
                    this.clickToValet2 = false
                    this.getNetsalesOrderFn()
                    this.returnToZero()
                } else {
                    alert(data.msg)
                }
                this.sending = false

            },


            async sureToValetFn(){
                let params = {}
                // 判断用户有没有选中期望时间
                if (!this.chooseList.arrangeDate && !this.chooseList.v) {
                    alert("请先选中想要预约的日期 ")
                    return
                } else {
                    //    期望时间拼接
                    params.bespeakTime = this.chooseList.arrangeDate.split(" ")[0] + " " + this.chooseList.v + ":00:00"
                }


                if (this.newChooseTimeState) {
                    // 套餐中子订单的选择时间，调用新接口
                    console.log(this.soid2, this.consultContent)
                    params.soid = this.soid2
                    let res = await getResponses('netsalesOrder/addNewOrder.json', this.serialize(params))

                    if (res.code === 0) {
                        this.clickToValet = false
                        this.valetToZero()
                        this.getNetsalesOrderFn()
                    } else {
                        alert(res.msg)
                    }



                    return
                }

                params.mid = this.consumerMid
                params.psychoId = this.userInformation.psychoId
                params.bespeakType = this.bespeakType
                params.eeId = 0

                // 增加参数表示是代客下单
                params.orderSource = 2

                params.price = this.userInformation.price  // 价格
                params.duration = this.userInformation.duration  // 分钟数
                params.noid = this.noid
                this.userInformation.userName && (params.customerName = this.userInformation.userName)

                this.consultContent && (params.consultContent = this.consultContent)
                this.customerSex && (params.customerSex = this.customerSex)
                this.customerAge && (params.customerAge = parseInt(this.customerAge))
                console.log(params)





                let data = await getResponses('appOrderBespeak/V3/addNewAppOrderBespeak.json', this.serialize(params), '/depression-api/')
                if (data.code === 0) {

                    this.clickToValet = false
                    this.valetToZero()
                    this.getNetsalesOrderFn()
                } else {
                    alert(data.msg)
                }
            },

            toCloseCallOrderFn(id) {
                this.noid = id
                this.closeCallOrderState = true
            },
            cancel() {
                this.closeCallOrderState = false
                this.immediatelyCallByUserState = false
                this.cancelOrderState = false
                this.startCallByPsychoState = false
                this.immediatelyCallByUserState2 = false
            },

            async saveCloseCallFn() {

                let data = await getResponses('callcore/closeCallOrder.json', `orderNo=${this.noid}&type=3`, '/depression-api/')
                if (data.code === 0) {

                    this.closeCallOrderState = false
                    this.getNetsalesOrderFn()
                } else {
                    alert(data.msg)
                }
            },

            async immediatelyCallByUserFn(id, duration, psychoId) {
                this.noid = id
                // this.immediatelyCallByUserState = true
                // 调用接口判断时间是否允许
                let data = await getResponses('netsalesOrder/checkAllowCall.json', `duration=${duration}&psychoId=${psychoId}`)

                if (data.code === 0) {
                    this.saveImmediatelyCallByUserFn()
                } else {
                    if (data.code === 4001) {
                        //   4001：不允许拨打
                        this.imCallState = 1
                        this.immediatelyCallByUserState = true
                        this.imCallMsg = "该老师正在咨询中，请稍后再试或选择其他老师！"
                    } else if (data.code === 4002) {
                        // 谨慎操作  4002：该专家已有预约
                        this.imCallState = 2
                        this.immediatelyCallByUserState = true
                        this.imCallMsg = "该老师在" + data.msg + "已有预约咨询，请谨慎操作。"
                    } else {
                        alert(data.msg)
                    }


                }

            },


            async saveImmediatelyCallByUserFn() {
                let data = await getResponses('netsalesOrder/immediatelyCallByUser.json', `noid=${this.noid}`)
                if (data.code === 0) {
                    this.immediatelyCallByUserState = false
                    this.getNetsalesOrderFn()
                } else {
                    alert(data.msg)
                }
            },





            cancelOrderFn(id, number, pId) {
                this.childCancelOrder = number === 2 ? true : false
                this.childPsychoId =  number === 2 ? pId : ''


                this.noid = id
                this.refuseReason = ''
                this.cancelOrderState = true
            },


            async saveCancelOrderOpearteFn() {
                if (!this.refuseReason) {
                    alert("请填写取消原因！")
                    return
                }


                if (this.childCancelOrder) {
                    // 套餐中子订单取消订单走此路径
                    console.log('子订单取消订单')

                    //Long soid, String reason, Long psychoId, Byte type
                    // 0:用户取消
                    let res = await getResponses('netsalesOrder/deleteNewChildOrder.json', `soid=${this.noid}&reason=${this.refuseReason}&type=0&psychoId=${this.childPsychoId}`)

                    if (res.code === 0) {
                        this.cancelOrderState = false
                        this.getNetsalesOrderFn()
                    } else {
                        this.cancelOrderState = false
                        alert(res.msg)
                        this.getNetsalesOrderFn()
                    }


                    return
                }


                let data = await getResponses('callcore/V3/agreeOrderByPsycho.json', `soid=${this.noid}&refuseReason=${this.refuseReason}&type=3`, '/depression-api/')

                if (data.code === 0) {
                    this.cancelOrderState = false
                    this.getNetsalesOrderFn()
                } else {
                    this.cancelOrderState = false
                    alert(data.msg)
                    this.getNetsalesOrderFn()
                }
            },

            async startCallByPsychoFn(id, number) {
                this.noid = id
                this.callTypeNumber = number

                this.startCallByPsychoState = true

            },

            async saveOpStartCallByPsychoFn() {
                let data = await getResponses('callcore/V3/startCallByPsycho.json', `soid=${this.noid}`, '/depression-api/')
                if (data.code === 0) {
                    this.startCallByPsychoState = false
                    this.getNetsalesOrderFn()
                } else {

                    this.startCallByPsychoState = false
                    alert(data.msg)
                    this.getNetsalesOrderFn()

                }
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


            // 修改预约时间

            async modifyOrDelDateOrderFn(noid, serviceName, psychoName, bespeakTime, psychoMobilePhone, price, duration, psychoId, number) {
                this.childChangeTime = number === 2 ? true : false
                this.noid = noid

                this.isShowTimeQuantumCount = 0

                this.clickToValetChange = true

                this.serviceNameForChange = serviceName

                this.psychoIdForChange = psychoId
                this.pid = psychoId

                // 处理专家和预约时间的默认值
                // 专家
                this.expertInfo = psychoName
                this.expertsName2ForChange.status = true
                this.chooseExpertNameForChange = psychoName
                this.chooseExpertTelForChange = psychoMobilePhone

                this.expertsNameForChange.status = true
                this.userInformationList.price = price
                this.userInformationList.duration = duration

                // this.checkPsychoByMobilePhoneFn(this.chooseExpertTelForChange)


                // 预约时间
                this.calendarValue = bespeakTime.trim().split(" ")[0]

                this.calendar.items.picker2.value = bespeakTime.trim().split(" ")[0]

                this.isToday = this.calendar.items.picker2.value === this.calendar.items.picker2.begin

                this.selFnOne()

                this.selectData1Value = bespeakTime.trim().split(" ")[1].split(":")[0]
                console.log("-----------------------", this.selectData1Value)

                this.selectData2Value = parseInt(bespeakTime.trim().split(" ")[1].split(":")[1])
                console.log("-----------------------", this.selectData2Value)


            },


            selFnOne() {
                // this.nowMinute = moment().minute()

                // this.nowHour = this.nowMinute >= 30 ? moment().hour() + 1 : moment().hour()

                // 当前时间推后一小时后日期
                let permissionT = moment().add(15, 'minutes')

                // 当前时间推后一小时后 格式化
                let permissionTime = permissionT.format("YYYY-MM-DD HH:mm:ss")

                // 当前时间推后一小时后 具体日期
                this.permissionTimeDate = permissionTime.split(" ")[0]

                this.permissionH = permissionT.hour()
                this.permissionM = permissionT.minute()
                // this.isToday = permissionTimeDate
                this.selectData1 = []
                if (this.isToday) {
                    for (let i = this.permissionH; i < 24; i++) {
                        this.selectData1.push(i)
                    }
                } else {
                    for (let i = 0; i < 24; i++) {
                        this.selectData1.push(i)
                    }
                }




            },

            // 根据日期返回该专家已预约的时间段
            async checkPsychoBespeakTimeFn(value) {
                // let data = await getResponses("netsalesOrder/checkPsychoBespeakTime.json", `psychoId=${this.pid}&selectedDate=${value}`)
                // // if (data.code = )
                this.isToday = this.calendar.items.picker2.value === this.calendar.items.picker2.begin


                this.selFnOne()
                // this.timeQuantumList = []
                // this.timeQuantumList = data.list
            },


        //    确认修改预约时间
            async sureToChangeValet() {
                this.hourToNum = parseFloat(this.selectData1Value)
                this.minuteToNum = parseFloat(this.selectData2Value)


                // 判断预约时间参数完整性
                if (!this.selectData2Value && this.selectData2Value !== 0) {
                    alert("预约时间不完整！")
                    return
                }

                if (!this.selectData1Value && this.selectData1Value !== 0) {
                    alert("预约时间不完整！")
                    return
                }
                if (!this.calendarValue) {
                    alert("预约时间不完整！")
                    return
                }
                const dd = moment(this.calendar.items.picker2.value).hours(this.hourToNum).minutes(this.minuteToNum).seconds(0)

                const d = dd.format("YYYY-MM-DD HH:mm:ss")

                //先判断时间是否可约

                let params = {
                    duration: this.userInformationList.duration,
                    psychoId: this.psychoIdForChange,
                    // noid: this.noid,
                    bespeakTime: d,

                }

                if (this.childChangeTime) {
                    params.soid = this.noid
                    let res = await getResponses('netsalesOrder/checkAllowCallChild.json', this.serialize(params))
                    if (res.code === 0) {
                        this.modifyOrDelDateFn(d)
                    } else if(res.code === 4002) {
                        alert("该老师在" + res.msg + "已有预约咨询，请重新选择修改时间")
                    } else {
                        alert(res.msg)
                    }


                    return
                }


                params.noid = this.noid

                let data = await getResponses('netsalesOrder/checkAllowCall.json', this.serialize(params))

                if (data.code === 0) {
                    this.modifyOrDelDateFn(d)
                } else if(data.code === 4002) {
                    alert("该老师在" + data.msg + "已有预约咨询，请重新选择修改时间")
                } else {
                    alert(data.msg)
                }




            },


            async modifyOrDelDateFn(d){
                let params = {}
                params.bespeakTime = d
                // params.noid = this.noid
                params.userId = this.form2.userId

                if (this.childChangeTime) {
                    // 子订单修改订单
                    console.log("子订单  修改")
                    params.soid = this.noid
                    let res = await getResponses('netsalesOrder/modifyChildDate.json', this.serialize(params))
                    if (res.code === 0) {

                        this.clickToValetChange = false
                        // 弹窗提示修改成功
                        this.changeSuccessWindow = true

                        this.getNetsalesOrderFn()
                    } else {
                        alert(`${res.msg}`)
                    }


                    return
                }

                params.noid = this.noid


                let data = await getResponses("netsalesOrder/modifyDate.json", (this.serialize(params)))

                if (data.code === 0) {

                    this.clickToValetChange = false
                    // 弹窗提示修改成功
                    this.changeSuccessWindow = true

                    this.getNetsalesOrderFn()
                } else {
                    alert(`${data.msg}`)
                }


            },

            changeOrderNumberFn(number) {
                if (this.form2.orderNum === 1 && number === -1) {
                    this.allowReduce = false
                    this.allowAdd = true
                } else if (this.form2.orderNum >= this.orderLimit - 2 && number === 1 ) {
                    console.log(222)
                    this.allowAdd = false
                    this.allowReduce = true
                    this.form2.orderNum = this.orderLimit - 1
                } else{
                    this.allowReduce = true
                    this.allowAdd = true
                    this.form2.orderNum = parseInt(this.form2.orderNum)  + number
                }

            },


        //    第三方咨询

            thirdPartyConsultationFn(id) {
                this.noid = id
                this.thirdConsultationState = true

            },

            async sureToCreateThiedCFn() {
                // type	类型	number	第三方咨询是传1，否则不传
                this.isSendingThirdC = true
                let data = await getResponses('netsalesOrder/immediatelyCallByUser.json', `noid=${this.noid}&type=1`)
                if (data.code === 0) {
                    this.thirdConsultationState = false
                    this.thirdConsultationSuccessState = true
                    this.getNetsalesOrderFn()
                } else {
                    alert(data.msg)
                }

                this.isSendingThirdC = false
            },

            async cancellationOfServiceSheet(noid) {
                let data = await getResponses('netsalesOrder/deleteNetOrder.json', `noid=${noid}`)

                if (data.code === 0) {
                    alert("取消成功！")

                    this.getNetsalesOrderFn()
                } else {
                    // alert(data.msg)
                    alert('用户余额不足以扣除本单已充值的金额！')
                    this.getNetsalesOrderFn()
                }
            },

            async changeFoldState(id, status, foldState) {
                console.log(id)

                // <!--已取消状态，无法展开子订单，子订单状态为已取消-->
                // <!--待接单状态，无法展开子订单，子订单状态为待接单-->

                if (this.flagList.includes(status)) {
                    console.log("无法展开子订单")
                    return
                }

                if (foldState) {
                    this.data.forEach((item) => {
                        if (item.noid === id) {
                            Vue.set(item, "foldState", !item.foldState);

                            this.foldList.splice(this.foldList.indexOf(item.noid), 1)
                            console.log(this.foldList)
                        }


                    })



                    return
                }

                // 根据母订单id获取子订单列表
                const list = await getResponses('netsalesOrder/getChildOrderList.json', `noid=${id}`)
                console.log(list)
                if (list.code === 0) {

                    //修改展开状态
                    this.data.forEach((item) => {
                        if (item.noid === id) {
                            Vue.set(item, "foldState", !item.foldState);
                            Vue.set(item, "childOrder", list.ServiceOrder);

                            if (!this.foldList.includes(item.noid)) {
                                this.foldList.push(item.noid)
                                console.log(this.foldList)

                            }

                        }
                    })

                } else {
                    alert(list.msg)
                }

            },
        },

        computed: {
            checkAllState: function() {
                this.recentPageCheckedNumber = 0
                for (let i = 0; i < this.data.length; i++) {
                    for (let j = 0; j < this.selectPersonList.length; j++) {
                        if (this.data[i].noid === this.selectPersonList[j]) {
                            this.recentPageCheckedNumber++;
                            break;
                        }
                    }
                }
                return !!this.data.length && this.recentPageCheckedNumber === this.data.length

            },

            selectData2: function () {
                if (this.selectData1Value || this.selectData1Value === 0) {
                    if (this.isToday) {
                        if (parseInt(this.selectData1Value) == this.permissionH) {
                            let mList = []
                            for (let i = this.permissionM; i <= 59; i++) {
                                mList.push(i)
                            }
                            return mList
                        } else {
                            let mList = []
                            for (let i = 0; i <= 59; i++) {
                                mList.push(i)
                            }
                            return mList
                        }
                    } else {
                        let mList = []
                        for (let i = 0; i <= 59; i++) {
                            mList.push(i)
                        }
                        return mList
                    }

                }
            },

        },

        ready() {
            this.default = `pageIndex=${this.page}&pageSize=${this.maxLink}`


            if ( this.$route.query.id ) {
                console.log(this.$route.query.id)
                this.searchUserTel = this.$route.query.id
                this.getNetsalesOrderFn()

            } else {
                this.getNetsalesOrderFn()

            }

            this.obtainChannels()



        }
    }
</script>
<style src="../../css/valetOrderForOrderList.css" scoped>

</style>
