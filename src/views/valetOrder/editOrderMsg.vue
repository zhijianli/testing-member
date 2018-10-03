<template>
    <div>
        <div class="container-fluid">
            <div class="widget-box row-fluid">
                <div class="widget-title"> <span class="icon"> <i class="icon-info-sign"></i> </span>
                    <h5 class="newTitle">编辑下单信息</h5>
                </div>
                <div class="widget-content nopadding">
                    <div class="form-horizontal" name="basic_validate" id="basic_validate">
                        <div class="control-group">
                            <label class="control-label">创建时间：</label>
                            <div class="controls">
                                <input type="text" name="createTime" disabled id="createTime" :value="orderDetailList.createTime">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">渠道：</label>
                            <!--<div class="controls">-->
                                <!--<div class="clearfix">-->
                                    <!--<select disabled class="normal-sw" name="" id="" v-model="" :value="">-->
                                        <!--<option v-for="item in platformChannelList" :value="item.pcId">{{item.platformChannel}}-->
                                        <!--</option>-->
                                    <!--</select>-->
                                <!--</div>-->

                            <!--</div>-->

                            <div class="controls">
                                <input type="text" disabled :value="orderDetailList.platformStr">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">用户姓名：</label>
                            <div class="controls">
                                <input type="text" disabled :value="orderDetailList.userName">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">手机号：</label>
                            <div class="controls">
                                <input type="text" disabled :value="orderDetailList.consumerMobilePhone">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">地区：</label>
                            <div class="controls">
                                <input type="text" v-model="location">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">对接客服：</label>
                            <div class="controls">
                                <input type="text" v-model="customServiceName">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">服务专家：</label>
                            <div class="controls">
                                <input type="text" disabled :value="orderDetailList.psychoName">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">咨询师手机号：</label>
                            <div class="controls">
                                <input type="text" disabled :value="orderDetailList.psychoMobilePhone">
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label">订单时长：</label>
                            <div class="controls">
                                <input type="text" disabled :value="orderDetailList.duration">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">服务价格：</label>
                            <div class="controls">
                                <input type="text" disabled :value="orderDetailList.price">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">收款金额：</label>
                            <div class="controls">
                                <input type="text" disabled :value="orderDetailList.gatheringAmount">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">支付渠道：</label>

                            <!--<div class="controls">-->
                                <!--<div class="clearfix">-->
                                    <!--<select disabled class="normal-sw" name="" id="" v-model="" :value="">-->
                                        <!--<option v-for="item in gatheringAccountList" :value="item.gaId">{{item.gatheringAcc}}-->
                                        <!--</option>-->
                                    <!--</select>-->
                                <!--</div>-->
                            <!--</div>-->

                            <div class="controls">
                                <input type="text" disabled :value="orderDetailList.gatheringAccount">
                            </div>


                        </div>

                        <div class="control-group">
                            <label class="control-label">账号：</label>
                            <div class="controls">
                                <input type="text" v-model="paymentAccount">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">入账时间：</label>
                            <div class="controls">
                                <input type="text" v-model="paymentTime">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">剩余分钟数：</label>
                            <div class="controls">
                                <input type="text" disabled :value="orderDetailList.surplusDuration | durationFormat">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">退款：</label>

                            <div class="controls">
                                <div class="clearfix">
                                    <select class="normal-sw" style="cursor: pointer;" name="" id="isRefund" v-model="isRefund">
                                        <option :value="0">否</option>
                                        <option :value="1">是</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div class="control-group">
                            <label class="control-label">备注：</label>
                            <div class="controls">
                                <textarea class="tx" v-model="remark">

                                </textarea>
                            </div>
                        </div>

                        <div class="form-actions" style="overflow:hidden;">
                            <label class="control-label"></label>
                            <div class="clearfix controls" style="width:100%;">
                                <input type="button" value="返回" id="" class="btn btn-info" style="margin-right: 50px;" @click="returnFn">
                                <input type="button" value="保存" id="ajaxBut" class="btn btn-success" v-if="! isSending" @click="updateNetsalesOrder()">
                                <input type="button" value="保存中" id="ajaxBut2" class="btn btn-success" v-else>
                        </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import Vue from "vue"

    import {
        getResponse,
        getResponses,
        getResponsesExcel

    } from "../../api"

    export default {
        data() {
            return {
                createTime: '',
                platformChannelList: [],
                gatheringAccountList: [],
                isRefund: '', // 是否退款  0: 否  1: 是
                location: '',  // 地区

                noid: window.location.pathname.split('/')[2], // 网销订单ID
                paymentAccount: '', // 账号
                paymentTime: '', // 支付时间
                remark: '', // 备注
                customServiceName: '', // 客服
                orderDetailList: [],
                isSending: false,




            }
        },

        filters: {
            durationFormat(value) {
                // return `${~~ (value / 60)}'${value % 60}"`
                return parseInt(value / 60)
            },


        },
        methods: {

            // 获取平台渠道
            async obtainChannels() {
                let data = await getResponse('netsalesConf/getPlatformChannelList.json')

                if (data.code === 0) {
                    this.platformChannelList = data.list
                } else {
                    alert(data.msg)
                }
            },

            // 获取收款账户类型
            async obtainGatheringAcc() {
                let data = await getResponse("netsalesConf/getGatheringAccList.json")
                if (data.code === 0) {
                    this.gatheringAccountList = data.list
                } else {
                    alert(data.msg)
                }
            },

            // 接口名称 通过ID获取网销订单
            async getNetsalesOrderById() {
                let data = await getResponses('netsalesOrder/getNetsalesOrderById.json', `noid=${this.noid}`)

                if (data.code === 0) {
                    // 给页面赋值
                    this.orderDetailList = data.netsalesOrder[0]
                    const d = data.netsalesOrder[0]
                    if (d.isRefund == 0 || d.isRefund == 1) {
                        this.isRefund = d.isRefund
                    }

                    this.location = d.location ? d.location : ''
                    this.paymentAccount = d.paymentAccount ? d.paymentAccount : ''
                    this.paymentTime = d.paymentTime ? d.paymentTime : ''
                    this.remark = d.remark ? d.remark : ''

                    this.customServiceName = d.customServiceName ? d.customServiceName : ''





                }
            },

            // 接口名称 编辑网销订单

            async updateNetsalesOrder() {
                let params = {}

                // 判断数据是否为空，为空则不传
                if (this.isRefund == 0 || this.isRefund == 1) {
                    params.isRefund = this.isRefund
                }

                this.location && (params.location = this.location)
                this.paymentAccount && (params.paymentAccount = this.paymentAccount)

                this.paymentTime && (params.paymentTime = this.paymentTime)

                this.remark && (params.remark = this.remark)

                this.customServiceName && (params.customServiceName = this.customServiceName)

                params.noid = this.noid

                this.isSending = true

                let data = await getResponses('netsalesOrder/updateNetsalesOrder.json', this.serialize(params))

                if (data.code === 0) {
                    this.$dispatch('child-msg', "")
                    this.$route.router.go("/orderListForOrder")
                } else {
                    alert(data.msg)
                }

                this.isSending = false
            },

            serialize(hash) {
                let result = []

                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })

                return result.join("&")
            },


            returnFn() {
                this.$dispatch('child-msg', "")
                this.$route.router.go("/orderListForOrder")
            },

        },

        ready() {
            // this.obtainChannels()
            // this.obtainGatheringAcc()
            this.getNetsalesOrderById()

        }
    }
</script>
<style>
    .tx {
        width: 180px;
        height: 124px;
    }
    .normal-sw {
        width: 185px;
        line-height: 34px;
        height: 34px;
        cursor: not-allowed;
    }

</style>