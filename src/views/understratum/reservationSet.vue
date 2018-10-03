<style>
    .control-group .controls.reservation-set-box {
        margin-left: 10px;

    }
    .reservation-set-item-title {
        display: inline-block;
        width: 500px;
    }
    .reservation-set-item-input {
        width: 50px;
        text-align: center;
    }
    .reservation-set-item-hourly-basis {
        display: inline-block;
        width: 2em;
        margin: 0 5px;
    }

    /* .reservation-set {
        counter-reset: sectioncounter;
    } */
    .reservation-set-wrap {
        min-width: 770px;
    }
    /* .reservation-set-wrap:before {
        content: counter(sectioncounter) "、";
        counter-increment: sectioncounter;
    } */

    .outlineClass {
        outline: none;
        box-shadow: none;
    }
</style>
<template>
<div class="container-fluid" style="padding-left:40px;">
    <div class="tab-cont">
            <ul class="tagTit">
                <li :class="{ show: true}">预约设置</li>
            </ul>
    </div>
    <!-- 预约服务参数设置 -->
    <div  class="container-fluid" style="padding-left:0px;">
        <div class="widget-box">
            <div class="widget-title">
                <span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i>
                </span>
                <h5>预约服务参数设置</h5>
            </div>

            <div class="form-horizontal widget-content reservation-set">
                <!-- <div class="control-group reservation-set-wrap" v-for="item in dataList">
                    <div class="controls reservation-set-box testClass">
                        <span class="reservation-set-item-title" v-text="$index + 1 + '、' + item.title"></span>
                        <input type="text" class="reservation-set-item-input" :disabled="true" :value="60">

                        <span class="reservation-set-item-hourly-basis" v-text="item.hourlyBasis"></span>
                        <button class="btn btn-info outlineClass"   @click="changeTagFn($event,$index)">编辑</button>

                    </div>
                </div>
                -->

                <div class="control-group reservation-set-wrap">
                    <div class="controls reservation-set-box testClass">
                        <span class="reservation-set-item-title" v-text="dataList[0].title"></span>
                        <!-- <input type="text" class="reservation-set-item-input" :disabled="true" v-model="data.orderInvaliNoAccept"> -->

                        <input type="text" class="reservation-set-item-input" :disabled="true" :value="data.orderInvaliNoAccept" v-model="data.orderInvaliNoAccept">


                        <span class="reservation-set-item-hourly-basis" v-text="dataList[0].hourlyBasis"></span>
                        <button class="btn btn-info outlineClass"  @click="changeTagFn($event, 0, 'orderInvaliNoAccept')">编辑</button>
                    </div>
                </div>


                <div class="control-group reservation-set-wrap">
                    <div class="controls reservation-set-box testClass">
                        <span class="reservation-set-item-title" v-text="dataList[1].title"></span>
                        <input type="text" class="reservation-set-item-input" :disabled="true" :value="data.orderInvaliNoPay" v-model="data.orderInvaliNoPay">
                        <span class="reservation-set-item-hourly-basis" v-text="dataList[1].hourlyBasis"></span>
                        <button class="btn btn-info outlineClass"  @click="changeTagFn($event, 1, 'orderInvaliNoPay')">编辑</button>
                    </div>
                </div>


                <div class="control-group reservation-set-wrap">
                    <div class="controls reservation-set-box testClass">
                        <span class="reservation-set-item-title" v-text="dataList[2].title"></span>
                        <input type="text" class="reservation-set-item-input" :disabled="true" :value="data.orderCancelInAdvance" v-model="data.orderCancelInAdvance">
                        <span class="reservation-set-item-hourly-basis" v-text="dataList[2].hourlyBasis"></span>
                        <button class="btn btn-info outlineClass"  @click="changeTagFn($event, 2, 'orderCancelInAdvance')">编辑</button>
                    </div>
                </div>


                <div class="control-group reservation-set-wrap">
                    <div class="controls reservation-set-box testClass">
                        <span class="reservation-set-item-title" v-text="dataList[3].title"></span>
                        <input type="text" class="reservation-set-item-input" :disabled="true" :value="data.orderChangeInAdvance" v-model="data.orderChangeInAdvance">
                        <span class="reservation-set-item-hourly-basis" v-text="dataList[3].hourlyBasis"></span>
                        <button class="btn btn-info outlineClass"  @click="changeTagFn($event, 3, 'orderChangeInAdvance')">编辑</button>
                    </div>
                </div>

                <div class="control-group reservation-set-wrap">
                    <div class="controls reservation-set-box testClass">
                        <span class="reservation-set-item-title" v-text="dataList[4].title"></span>
                        <input type="text" class="reservation-set-item-input" :disabled="true" :value="data.callingNotUseup" v-model="data.callingNotUseup">
                        <span class="reservation-set-item-hourly-basis" v-text="dataList[4].hourlyBasis"></span>
                        <button class="btn btn-info outlineClass"  @click="changeTagFn($event, 4, 'callingNotUseup')">编辑</button>
                    </div>
                </div>


                <div class="control-group reservation-set-wrap">
                    <div class="controls reservation-set-box testClass">
                        <span class="reservation-set-item-title" v-text="dataList[5].title"></span>
                        <input type="text" class="reservation-set-item-input" :disabled="true" :value="data.transferAfterNote" v-model="data.transferAfterNote">
                        <span class="reservation-set-item-hourly-basis" v-text="dataList[5].hourlyBasis"></span>
                        <button class="btn btn-info outlineClass"  @click="changeTagFn($event, 5, 'transferAfterNote')">编辑</button>
                    </div>
                </div>


            </div>




        </div>
    </div>

    <!--新增订单参数设置-->
    <div  class="container-fluid" style="padding-left:0px;">
        <div class="widget-box">
            <div class="widget-title">
                <span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i>
                </span>
                <h5>订单参数设置</h5>
            </div>

            <div class="form-horizontal widget-content reservation-set">

                <div class="control-group reservation-set-wrap">
                    <div class="controls reservation-set-box testClass2">
                        <span class="reservation-set-item-title" v-text="dataList[6].title"></span>
                        <input type="text" class="reservation-set-item-input" :disabled="true" :value="data.notAllowCalling" v-model="data.notAllowCalling">


                        <span class="reservation-set-item-hourly-basis" v-text="dataList[6].hourlyBasis"></span>
                        <button class="btn btn-info outlineClass"  @click="changeTagFn($event, 6, 'notAllowCalling', 2, 0)">编辑</button>
                    </div>
                </div>
                <div class="control-group reservation-set-wrap">
                    <div class="controls reservation-set-box testClass2">
                        <span class="reservation-set-item-title" v-text="dataList[7].title"></span>
                        <input type="text" class="reservation-set-item-input" :disabled="true" :value="data.assistantEffective" v-model="data.assistantEffective">


                        <span class="reservation-set-item-hourly-basis" v-text="dataList[7].hourlyBasis"></span>
                        <button class="btn btn-info outlineClass"  @click="changeTagFn($event, 7, 'assistantEffective', 2, 1)">编辑</button>
                    </div>
                </div>


            </div>




        </div>
    </div>

</div>



</template>
<script type="text/javascript">
	import $  from "jquery"
	import Vue from "vue"
    import {
        getResponse,
        getResponses
    } from "../../api"
    export default {
    	data(){
    		return {
                data:[],
                checkState:false,
                default:'',
                searchVal:'',
                add:'',
                edit:'',
                idelete:'',
                typeName:'',
                editTypeName:'',
                typeId:'',
               	arrayTypeId:[],
                articleData:[],
                addNewTag:"",
                editTag:false,
                newArticleType:"",
                dataList:[],// start
                tagId:"",
                tagName:'',

                dataList: [
                    {'title': '无排班预约，用户发送资料后，专家在多久未接单，则订单会失效', 'hourlyBasis': '分钟'},
                    {'title': '用户填写资料后（或专家接单后），用户多久没有支付则订单会失效', 'hourlyBasis': '分钟'},
                    {'title': '预约成功后，双方可提前多久取消预约', 'hourlyBasis': '小时'},
                    {'title': '预约成功后，双方可提前多久修改预约时间', 'hourlyBasis': '小时'},
                    {'title': '通话结束后，若时间未用完，则在多久时间内用户可继续拨打（预约除外）', 'hourlyBasis': '天'},
                    {'title': '服务完成后，专家填写手记后，多久能收到钱', 'hourlyBasis': '小时'},
                    {'title': '订单变为进行中后，超过多长时间后变为待评价状态', 'hourlyBasis': '分钟'},
                    {'title': '销售生成链接有效时间', 'hourlyBasis': '天'}
                ],

                form: {
                    orderInvaliNoAccept: 0, //分钟 ，专家未接单，订单失效
                    orderInvaliNoPay: 0, // 分钟 ，订单未支付，订单失效
                    orderCancelInAdvance: 0, // 小时 ，提前取消预约订单
                    orderChangeInAdvance: 0, // 小时 ，提前修改预约时间
                    callingNotUseup: 0, // 天 ，拨打电话后，时间未用完，多久可以重拨
                    transferAfterNote: 0, // 小时 ，专家填写手记后多久收到转款
                    notAllowCalling: 0, // 分钟，订单变为进行中后，超过多长时间后变为待评价状态
                    assistantEffective: 0, // 天，销售生成链接有效时间
                }


    		}
    	},
    	methods:{
            async obtainListBespeakParams() {
                let data = await getResponse(`depression/system/listBespeakParams.json`)

                if (data.code === 0) {
                    this.data = data.list[0]
                } else {
                    alert(`${data.msg}`)
                }
            },



            async changeTagFn(e, index, typeName, type, index2) {


                if(e.target.innerHTML == "编辑"){

                    e.target.innerHTML = "保存"
                    $(e.target).removeClass("btn-info")
                    $(e.target).addClass("btn-success")
                    if (type === 2) {
                        $($(".testClass2")[index2]).find("input").attr("disabled",false)

                        this.tagName = $($(".testClass2")[index2]).find("input")[0].value
                    } else {
                        $($(".testClass")[index]).find("input").attr("disabled",false)

                        this.tagName = $($(".testClass")[index]).find("input")[0].value
                    }


                } else {

                    //点击保存

                    if (type === 2) {
                        this.tagName = $($(".testClass2")[index2]).find("input")[0].value
                    } else {
                        this.tagName = $($(".testClass")[index]).find("input")[0].value
                    }
                    // console.log(typeof this.tagName)

                    //调用后台接口添加数据
                    // this.tagId = tagId
                    let a = parseInt(this.tagName)

                    if (this.tagName == a) {

                        let data = await getResponses(`depression/system/setBespeakParams.json`, `${typeName}=${a}`)

                        if (data.code == 0) {

                            this.obtainListBespeakParams()

                        } else {
                            alert(`${data.msg}`)
                        }


                        e.target.innerHTML = "编辑"
                        $(e.target).removeClass("btn-success")
                        $(e.target).addClass("btn-info")
                        if (type === 2) {
                            $($(".testClass2")[index2]).find("input").attr("disabled",true)

                        } else {
                            $($(".testClass")[index]).find("input").attr("disabled",true)

                        }
                    } else {
                        alert("只能输入正整数！")
                    }

                }
            }

    	},
    	watch:{

        },
    	ready(){
            this.obtainListBespeakParams()
    	}
    }
</script>