<template>

    <div class="container-fluid">
      <div class="row-fluid" >
        <div class="widget-box">
            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                <h5>{{documentTitle}}</h5>
            </div>
            <div class="widget-content nopadding">
              <div class="form-horizontal">

                <div class="control-group">
                  <label class="control-label"> 标题 :</label>
                  <div class="controls">
                    <input type="text" style="width:750px;" placeholder="请输入标题 此项必填" v-model="info.pageTitle">
                  </div>
                </div>


                <!-- <div class="control-group">
                  <label class="control-label">上传图片 :</label>
                  <div class="controls">
                    请上传尺寸为：750*1334的jpg、png、jpeg格式的图片
                    <form>
                      <img :src="preView.photoAvatar" style="width:250px;height:444px;" />
                      <input type="file"  class="span11 dn"  id="photoAvatar" @change="photoAvatarFun">
                      <a class="btn btn-info" onclick="photoAvatar.click()" >{{uploadState}}</a>
                    </form>
                  </div>
                </div>   -->

                <div class="control-group">
                    <label class="control-label">图片大小800*480px:</label>
                    <div class="controls">
                        <qiniu event-name="photoAvatar" :defaultimg="photoAvatar"></qiniu>
                    </div>
                </div>





                <div class="control-group">
                  <label class="control-label">推送链接 :</label>
                  <div class="controls">
                    <input type="text" style="width:750px;" placeholder="请输入链接地址" v-model="info.link">
                  </div>
                </div>


                <div class="control-group">
                  <label class="control-label">推送时间 :</label>
                  <div class="controls">

                        <input class="input" size="30" type="text" @click.stop="open($event,'picker3')" v-model="calendar.items.picker3.value" placeholder="开始时间 精确到秒 此项必填">
                             至
                        <input class="input" size="30" type="text" @click.stop="open($event,'picker4')" v-model="calendar.items.picker4.value" placeholder="结束时间 精确到秒 此项必填">
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
                  <label class="control-label">操作 :</label>
                  <div class="controls">
                      <div type="submit" class="btn btn-success" @click="btnUpload">保存</div>
                      <div type="submit" class="btn btn-warning" @click="btnChancel">取消</div>
                  </div>
                </div>



              </div>
            </div>
          </div>
      </div>
    </div>

</template>



<script>

import {
    adStartupPageview,  // 修改 详情
    adStartupPageupdate, // 修改 保存
    adStartupPagesave   // 新增 保存
} from "../../api"

import { serialize } from "../../utils"
import calendar from "../../calendar.vue"
import qiniu from "../../qiniu.vue"

export default {
    components:{
        calendar,
        qiniu
    },
    events:{
        'imgParameter':function(obj,eventName){
            this[eventName] = obj[eventName].imgPath
        }
    },
    events:{
        'imgParameter':function(obj,eventName){
            this[eventName] = obj[eventName].imgPath
        }
    },
    data(){
        return {

            ID:"",
            documentTitle:"新增消息",

            info:{
                createTime:"",  //  创建时间    string
                endTime:"",     //推送结束时间  string
                filePath:"",    //  预览图 string
                link:"",        //  链接  string
                modifyTime:"",  //修改时间    string
                pageTitle:"",   // 标题  string
                picPath:"",     // 图片  string
                sorting:"",     //排序  number
                stPageId:"",    //  记录id    number
                startTime:"",   // 推送开始时间  strin*/
            },

            photoAvatar:'',


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
        }
    },
    route: {

    },
    computeds:{

    },
    methods:{
        async getData(){
            this.ID = `${this.$route.params.id}`

            this.documentTitle = '修改消息'

            let data = await adStartupPageview(`stPageId=${this.ID}`)
            if(data.code == 0){

                this.info.createTime = data.obj.createTime           //  创建时间    string
                this.info.link       = data.obj.link                 //  链接  string
                this.info.modifyTime = data.obj.modifyTime           //修改时间    string
                this.info.pageTitle  = data.obj.pageTitle            // 标题  string
                this.info.picPath    = data.obj.picPath              // 图片  string
                this.info.sorting    = data.obj.sorting              //排序  number
                this.info.stPageId   = data.obj.stPageId             //  记录id    number

                this.photoAvatar = data.obj.picPath

                this.calendar.items.picker3.value = data.obj.startTime
                this.calendar.items.picker4.value = data.obj.endTime

            }else{
                alert(`errMsg:${data.msg}`)
            }
        },
        async btnUpload(){


            let paramsObj = {
                picPath:this.photoAvatar,
                pageTitle:this.info.pageTitle,
                link:this.info.link,
                startTime:this.calendar.items.picker3.value.replace(/\-/g, "/"),
                endTime:this.calendar.items.picker4.value.replace(/\-/g, "/")
            }

            if(this.ID != ''){  //修改传ID
                paramsObj.stPageId = this.ID
            }else{ // 新增传sorting
                paramsObj.sorting = '1'
            }

            if(paramsObj.pageTitle === "" || paramsObj.startTime === "" || paramsObj.endTime === "" ){
                alert('标题 开始时间 结束时间 为必填')
            }else{

                let params = serialize(paramsObj)

                let data = {}

                if(this.ID != ''){
                    data = await adStartupPageupdate(params)
                }else{
                    data = await adStartupPagesave(params)
                }

                if( data.code == 0 ){
                    this.$route.router.go("/advertisement")
                }else{
                    alert(`errMsg:${data.msg}`)
                }

            }

        },
        btnChancel(){
            this.$route.router.go("/advertisement")
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
        }
    },
    ready(){
        !!this.$route.params.id ? this.getData() : console.log('新增')
    }
}


</script>
