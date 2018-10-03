<template>


    <div class="container-fluid">
        <div class="row-fluid" >
            <div class="widget-box">

                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                    <h5>新增客户</h5>
                </div>

                <div class="widget-content nopadding">
                    <div class="form-horizontal">

                        <div class="control-group">
                            <label class="control-label"> 名称 :</label>
                            <div class="controls">
                                <input type="text" placeholder="请输入企业名称" v-model="info.name">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label"> 企业联系人 :</label>
                            <div class="controls">
                                <input type="text" placeholder="请输入企业联系人姓名" v-model="info.contacts">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label"> 联系人电话 :</label>
                            <div class="controls">
                                <input type="text" placeholder="请输入联系人电话号码" v-model="info.contactsPhoneNum">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label"> 组织类型 :</label>
                            <div class="controls">
                                <select name="" id="select" v-model='info.type' style="width: 180px;">
                                    <option value="0">学校组织</option>
                                    <option value="1">商业组织</option>
                                </select>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">请上传高度为96px格式的图片 :</label>
                            <div class="controls">
                                <qiniu event-name="photoAvatar" :defaultimg="photoAvatar"></qiniu>
                            </div>
                        </div>

                        <!-- <div class="control-group">
                            <label class="control-label">上传图片 :</label>
                            <div class="controls">
                                请上传高度为96px格式的图片
                                <form enctype="multipart/form-data"  name="head">
                                    <img :src="preView.photoAvatar" style="width:280;height:60px;" />
                                    <img :src="preView.photoAvatar"  v-el="imgUpload" class="dn" v-el="imgUpload">
                                    <input type="file"  class="span11 dn"  id="photoAvatar" @change="photoAvatarFun">
                                    <a class="btn btn-info" onclick="photoAvatar.click()" >{{uploadState}}</a>
                                </form>
                            </div>
                        </div> -->


                        <div class="control-group">
                            <label class="control-label"> 购买金额 :</label>
                            <div class="controls">
                                <input type="text" placeholder="请输入购买金额（元）" v-model="info.purchasedCashAmount"> 元
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label"> 购买订单总量 :</label>
                            <div class="controls">
                                <input type="text" placeholder="请输入购买订单总量" v-model="info.purchasedOrderAmount"> 单
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label"> 每人限制单数 :</label>
                            <div class="controls">
                                <input type="text" placeholder="请输入每人限制单数" v-model="info.orderSingleLimit"> 单
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label"> 已累计单数 :</label>
                            <div class="controls">
                                <input type="text" v-model="info.order" disabled="disabled"> 单
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label"> 已累计时常 :</label>
                            <div class="controls">
                                <input type="text" v-model="info.time" disabled="disabled"> 分钟
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label">购买时段 :</label>
                            <div class="controls">

                                <input class="input" size="30" type="text" @click.stop="open($event,'picker3')" v-model="calendar.items.picker3.value" placeholder="开始时间 此项必填">
                                     至
                                <input class="input" size="30" type="text" @click.stop="open($event,'picker4')" v-model="calendar.items.picker4.value" placeholder="结束时间 此项必填">
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
                                    >

                                    </calendar>
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label"> 服务剩余天数 :</label>
                            <div class="controls">
                                <input type="text" v-model="info.remainingDay" disabled="disabled"> 天
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label"> 分配专家组 :</label>
                            <div class="controls">
                                <select name="" id="select" v-model='info.pgId' style="width: 180px;">
                                    <option :value="item.pgId" v-for="item in pgIdList">{{item.groupName}}</option>
                                </select>
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label"> 备注 :</label>
                            <div class="controls">
                                <textarea name="" id="" cols="100" rows="5" v-model="info.remarks"></textarea>
                            </div>
                        </div>


                        <div class="control-group">

                          <label class="control-label">操作 :</label>
                          <div class="controls">
                               <div class="btn btn-success" @click="btnUpload">保存</div>
                               <div class="btn btn-warning" @click="btnChancel">取消并返回上一级</div>
                          </div>

                        </div>



                    </div>
                </div>
            </div>
        </div>
    </div>

</template>



<script>

import{
    EAPnewEnterprise,
    EAPobtainPsychoGroupListPGID, //PGID
}from "../../api"

import { serialize } from "../../utils"

import Vue from "vue"
import calendar from "../../calendar.vue"
import qiniu from "../../qiniu.vue"

export default {
    components: {
        qiniu,
        calendar
    },
    events:{
        'imgParameter':function(obj,eventName){
            this[eventName] = obj[eventName].imgPath
        }
    },
    data(){
        return {

            pgIdList:[],

            info:{
                contacts:"",              //    联系人 string
                contactsPhoneNum:"",              //    联系人手机号  string
                logoPreview:"",              // logo缩略图相对路径 string
                logoRel:"",              // logo 相对路径   string
                name:"",              //    企业名称    string
                orderSingleLimit:"",              //    个人限制单数  number
                pgId:"",              //    服务心理医师组id   number
                purchasedCashAmount:"",              // 购买现金总额  number
                purchasedOrderAmount:"",              //    购买总咨询单数 number
                serviceEndDate:"",              //  服务结束时间  string
                serviceStartDate:"",              //    服务开始时间  string

                time:0,                    // 已累计时常  => 无
                order:0,                    // 已累计单数
                remarks:"",                    // 备注
                remainingDay:0,            //剩余天数
            },

            photoAvatar:'',//  qiniu图片 改

            uploadState:'点击上传',

            calendar:{
                show:false,
                x:0,
                y:0,
                picker:"",
                type:"datetime",
                value:"",
                begin:"",
                end:"",
                value:"",
                weeks:[],
                months:[],
                range:true,
                items:{
                    picker3:{
                        type:"datetime",
                        value:"",
                        sep:"/",
                    },
                    picker4:{
                        type:"datetime",
                        value:"",
                        sep:"/",
                    },
                }
            }
        }
    },
    watch:{
        'calendar.value': function (value) {
            this.calendar.items[this.calendar.picker].value=value

            if(this.calendar.items.picker3.value && this.calendar.items.picker4.value){
                if(!this.timeJudge()){
                    this.calendar.items[this.calendar.picker].value=""
                }
            }
        },
    },
    route: {

    },
    computeds:{

    },
    methods:{
        async getPgid(){
            let data = await EAPobtainPsychoGroupListPGID()
            if(data.code === 0){
                this.pgIdList = data.psychoGroups
            }else{
                alert(`errMsg:${data.msg}`)
            }
        },
        async btnUpload(){

            let paramsObj = {

                contacts:this.info.contacts,              //    联系人 string
                contactsPhoneNum:this.info.contactsPhoneNum,              //    联系人手机号  string

                //改qiniu   老接口 缩略图 传 原图
                logoPreviewRel:this.photoAvatar,          // logo缩略图相对路径 string
                logoRel:this.photoAvatar,              // logo 相对路径   string

                name:this.info.name,              //    企业名称    string
                orderSingleLimit:this.info.orderSingleLimit,              //    个人限制单数  number
                pgId:this.info.pgId,              //    服务心理医师组id   number
                purchasedCashAmount:this.info.purchasedCashAmount,              // 购买现金总额  number
                purchasedOrderAmount:this.info.purchasedOrderAmount,              //    购买总咨询单数 number
                remarks:this.info.remarks,      //备注
                type:this.info.type,      //类型

                serviceStartDate:this.calendar.items.picker3.value.replace(/\//g, "-"),
                serviceEndDate:this.calendar.items.picker4.value.replace(/\//g, "-"),

            }


            let params = serialize(paramsObj)
            let data = await EAPnewEnterprise(params)

            if( data.code == 0 ){
                this.$route.router.go("/customerList")
            }else{
                alert(`errMsg:${data.msg}`)
            }



        },
        btnChancel(){
            this.$route.router.go("/customerList")
        },
        timeJudge(){

            console.log(this.info.startTime.split('T')[0] + " " + this.info.startTime.split('T')[1])
        },
        open(e,type) {
            // 设置类型
            this.calendar.picker=type
            this.calendar.type=this.calendar.items[type].type
            this.calendar.range=this.calendar.items[type].range
            this.calendar.begin=this.calendar.items[type].begin
            this.calendar.end=this.calendar.items[type].end
            this.calendar.value=this.calendar.items[type].value
            // 可不用写
            this.calendar.sep=this.calendar.items[type].sep
            this.calendar.weeks=this.calendar.items[type].weeks
            this.calendar.months=this.calendar.items[type].months

            this.calendar.show=true
            this.calendar.x=e.target.offsetLeft
            this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8
        },
        timeJudge(){
            let
                d        = new Date(),
                sub,

                startArr = this.calendar.items.picker3.value.split(' ')[0].split('/'),
                startY   = startArr[0],
                startM   = startArr[1],
                startD   = startArr[2],

                endArr   = this.calendar.items.picker4.value.split(' ')[0].split('/'),
                endY     = endArr[0],
                endM     = endArr[1],
                endD     = endArr[2]

            sub = d.setFullYear(endY,endM,endD) - d.setFullYear(startY,startM,startD)

            if(sub < 0){
                alert(`请将结束时间晚于开始时间 此时：${sub/86400000}天`)
                return false
            }else{
                return true
            }
        }
    },
    ready(){
        this.getPgid()
    }
}

</script>
