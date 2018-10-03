<template>

    <div class="container-fluid" style="width:60%; display:inline-block;margin-right:20px;">
        <div class="row-fluid" >
          <div class="widget-box">

            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                <h5>新增医生信息</h5>
            </div>

            <div class="widget-content nopadding">
                <div class="form-horizontal">

                    <div class="control-group">
                        <label class="control-label"> 姓名 :</label>
                        <div class="controls">
                            <input type="text" class="span11" placeholder="必填" v-model.trim="info.nickname">
                        </div>
                    </div>
                    <!-- ··································新增内容分割线start····································· -->
                    <div class="control-group">
                        <label class="control-label"> 性别 :</label>
                        <div class="controls">
                            <input type="text" class="span11" placeholder="性别" v-model.trim="info.sex" >
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"> 微信号 :</label>
                        <div class="controls">
                            <input type="text" class="span11" placeholder="微信号" v-model.trim="info.wxAccount">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"> 服务类型 :</label>
                        <div class="controls">
                            <select v-model="info.pLevel">
                                <option value="0">心理专家</option>
                                <option value="1">倾听师</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"> 执业类型 :</label>
                        <div class="controls">
                            <select v-model="info.ltid">
                                <option v-for="item of licenseTypes" value="{{ item.ltid }}" >{{ item.licenseName }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"> 头衔 :</label>
                        <div class="controls">
                            <input type="text" class="span11" placeholder="头衔" v-model.trim="info.title">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"> 累计个案(H) :</label>
                        <div class="controls">
                            <input type="number" class="span11" placeholder="累计个案" v-model.trim="info.caseHours">
                        </div>
                    </div>
                    <!-- ··································新增内容分割线end···································· -->

                    <div class="control-group">
                        <label class="control-label"> 手机号码 :</label>
                        <div class="controls">
                            <input type="text" class="span11" placeholder="必填" v-model.trim="info.mobilePhone">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label"> 密码  :</label>
                        <div class="controls">
                            <input type="text" class="span11" placeholder="必填" v-model.trim="info.userPassword">
                        </div>
                    </div>


                    <!--<div class="control-group">
                        <label class="control-label"> 职称  :</label>
                        <div class="controls">
                            <input type="text" class="span11" placeholder="必填" v-model.trim="info.title">
                        </div>
                    </div>-->

                    <div class="control-group">
                        <label class="control-label"> 所在地  :</label>
                        <div class="controls">
                            <input type="text" class="span11" placeholder="必填" v-model.trim="info.location">
                        </div>
                    </div>

                    <!-- ··································新增内容分割线start····································· -->
                    <div class="control-group">
                        <label class="control-label">从业年限:</label>
                        <div class="controls">
                            <input type="number" class="span11" placeholder="必填" v-model.trim="info.workYears">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">擅长领域:</label>
                        <div class="tab-babel controls" v-if="skilledList.length">
                            <span class="date badge badge-warning" style="margin-right:10px" v-for="(index, item) of skilledList">{{ item }}<i class="icon-remove" style="margin-left:10px;cursor: pointer;" @click="deleteTab(index)"></i></span>
                        </div>
                        <div class="controls ">
                            <textarea type="text" class="span11"  name="skilledCont" style="width:300px;padding:6px;" placeholder="每条，分割 最多六条。例如：读书，看报" v-model.trim="skilledCont"></textarea>
                            <button class="btn btn-info" @click="skilledTab()">确定</button>
                        </div>
                    </div>

                    <!-- ··································新增内容分割线end···································· -->

                    <div class="control-group">
                        <label class="control-label"> 标签  :</label>
                        <div class="controls" >
                            <label v-for='item in tagList'>
                                <input type="checkbox" name="9" value="9" data-text="新标签"
                                       style="visibility: visible;display: inline-block;"
                                       :value="item.tagId" v-model="infoTag"
                                >
                                {{item.phrase}}
                            </label>
                        </div>
                    </div>


                    <div class="control-group">
                        <label class="control-label">头像</label>
                        <div class="controls">
                            <qiniu event-Name="avatar" :defaultimg="avatar.imgpath"></qiniu>
                        </div>
                    </div>



                    <div class="control-group">
                        <label class="control-label">上传半身照</label>
                        <div class="controls">
                            <qiniu event-Name="candidPhoto" :defaultimg="candidPhoto.imgpath"></qiniu>
                        </div>
                    </div>


                    <div class="control-group">
                        <label class="control-label">隐私处理资格照</label>
                        <div class="controls">
                            <qiniu event-Name="photoCertificationDealtRel" :defaultimg="photoCertificationDealtRel.imgpath"></qiniu>
                        </div>
                    </div>


                    <div class="control-group">
                        <label class="control-label">隐私处理身份证</label>
                        <div class="controls">
                            <qiniu event-Name="photoIdentityCardDealtAbs" :defaultimg="photoIdentityCardDealtAbs.imgpath"></qiniu>
                        </div>
                    </div>



                    <div class="control-group">
                        <label class="control-label">文章编辑</label>
                            <div class="controls">
                            <textarea  v-model="info.profile" name="profile" style="margin: 0px; width: 750px; height: 150px;"> </textarea>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-success" @click="saveMsg">保存</button>
                    </div>

                </div>
            </div>
          </div>
        </div>
    </div>


    <div class="container-fluid" style="width:30%; display:inline-block; vertical-align: top;">
        <div class="row-fluid" >
            <div class="widget-box">
                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                  <h5>预览</h5>
                </div>

                <div class="widget-content nopadding">
                    <div class="viewCont">

                        <h2>{{info.name}}</h2>

                        <div class="img">
                            <img :src="candidPhoto.http">
                            <span class="icon"></span>
                            <label class="label">{{info.title}}</label>
                            <span class="logo"><img :src="avatar.http"></span>
                        </div>

                        <div class="title">
                            <div class="label-font">{{infoTag}}</div>
                            <!-- <div class="label-font" >
                                <span v-for='item in info.tags'>{{item.phrase}}</span>
                            </div> -->
                            <div class="positioning"><i></i>{{info.location}}</div>
                        </div>

                        <div class="content-view">
                            <h3 class="nametitle">关于 {{info.name}}</h3>
                            <div>
                              {{info.profile}}
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
    obtainPsychoTagList,   // 标签
    myaddMember,           // 新增
    PsychorgetMember,      // 详情
    PsychorupdateMember,   // 更新
    getLicenseTypeList    //资格证类型
}from "../../api"

import {serialize} from "../../utils"
import qiniu from "../../qiniu.vue"
import Vue from "vue"


export default {
    components:{

    },
    // props:['imgPre'],
    data(){
        return {
            imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
            ID:'',  // 更新有ID  新增无ID
            tagList:[],//checkBox
            info:{  // 原有传入字段
            },
            infoTag:[],  //checkBox check
            skilledCont:"",
            skilledList:[],
            licenseTypes:[],
            // 给后台传 imgpath

            avatar:{      //头像
                imgpath:''    //后台
            },

            candidPhoto:{  //半身
                imgpath:''
            },

            photoCertificationDealtRel:{  //隐私处理资格照
                imgpath:''
            },

            photoIdentityCardDealtAbs:{  //隐私处理身份证
                imgpath:''
            }
        }
    },
    watch:{
        infoTag:(newd,oldd)=>{

            newd.forEach( (element, index) =>{

            });
        }
    },
    components: {
        qiniu
    },

    events:{
        'imgParameter':function(obj,eventName){
            this[eventName].imgpath = obj[eventName].imgPath
        }
    },

    methods:{
        async getTagList(){
            let data = await obtainPsychoTagList(`pageSize=100&pageIndex=0`)
            if( data.code == 0 ){
                this.tagList = data.psychoTags
            }else{
                alert(`errMsg:${data.msg}`)
            }
        },
        async getPsychorgetMember(){

            this.ID = `${this.$route.params.id}`
            let data = await PsychorgetMember(`id=${this.ID}`)

            if( data.code == 0 ){
                this.info = data.psychoDTO
                this.info.userPassword = ""  // 密码后台不传

                try{

                    if(this.info.sex == 0) {
                        this.info.sex =  '未知'
                    } else if(this.info.sex == 1) {
                        this.info.sex =  "男"
                    } else if(this.info.sex == 2){
                        this.info.sex =  "女"
                    }
                    this.skilledList = JSON.parse(this.info.primaryDomain)
                    this.skilledCont = this.skilledList.join('，')
                }catch(error){
                    console.log(error)
                }


                this.avatar.imgpath = data.psychoDTO.avatar
                this.candidPhoto.imgpath = data.psychoDTO.candidPhoto
                this.photoCertificationDealtRel.imgpath = data.psychoDTO.photoCertificationDealtRel
                this.photoIdentityCardDealtAbs.imgpath = data.psychoDTO.photoIdentityCardDealtRel

                data.psychoDTO.tags.forEach( (item,index,arr) => {
                    this.infoTag.push(item.tagId)
                })

            }else{
                alert(`errMsg:${data.msg}`)
            }

            this.$log()
        },

        skilledTab(){

            if(this.skilledCont.replace(/\，/g,',').split(',').length > 6) {
                alert('最多六条');
                return
            }

            this.skilledList = []
            this.skilledList = [...new Set(this.skilledCont.replace(/\，/g,',').split(','))]
            this.skilledCont = this.skilledList.join('，')
        },

        deleteTab(index){
            this.skilledList.splice(index,1)
            this.skilledCont = this.skilledList.join('，')
        },

        async getLicenseTypeList(){
            let data = await getLicenseTypeList()

            data.code === 0 && ( this.licenseTypes = data.licenseTypes )
        },

        async addMsg(){
            var curLength = 0
            let paramsObj = {
                    caseHours: + this.info.caseHours,
                    location: this.info.location,
                    ltid: this.info.ltid,
                    mobilePhone: this.info.mobilePhone,
                    nickname: this.info.nickname,
                    pLevel: this.info.pLevel,
                    primaryDomain: JSON.stringify(this.skilledList),
                    profile: this.info.profile,
                    sex: this.info.sex,
                    title: this.info.title,
                    userPassword: this.info.userPassword,
                    workYears: this.info.workYears,
                    wxAccount: this.info.wxAccount,
                    avatar:this.avatar.imgpath,
                    candidPhoto:this.candidPhoto.imgpath,
                    photoCertificationDealtRel:this.photoCertificationDealtRel.imgpath,
                    photoIdentityCardDealtRel:this.photoIdentityCardDealtAbs.imgpath,
                    ids:this.infoTag,

                }

            if(paramsObj.sex === '未知') {
                paramsObj.sex = 0
            } else if(paramsObj.sex === "男") {
                paramsObj.sex  = 1
            } else {
                paramsObj.sex = 2
            }

            Object.values(paramsObj).map((value)=>{
               if(value=== undefined || value === "" ){
                   ++curLength
               }
           })
           if(curLength > 0){
               alert('所有参数必填，请填写完整')
               return
           }

            let params = serialize(paramsObj),
                data = await myaddMember(params)

            data.code == 0 ? this.$route.router.go("/consultant") : alert(`errMsg:${data.msg}`)
        },
        async uploadMsg(){
            var curLength = 0
            let paramsObj = {
                    caseHours: + this.info.caseHours,
                    location: this.info.location,
                    ltid: this.info.ltid,
                    mobilePhone: this.info.mobilePhone,
                    nickname: this.info.nickname,
                    pLevel: this.info.pLevel,
                    primaryDomain: JSON.stringify(this.skilledList),
                    profile: this.info.profile,
                    sex: this.info.sex,
                    title: this.info.title,
                    userPassword: this.info.userPassword,
                    workYears: this.info.workYears,
                    wxAccount: this.info.wxAccount,

                    avatar:this.avatar.imgpath,
                    candidPhoto:this.candidPhoto.imgpath,
                    photoCertificationDealtRel:this.photoCertificationDealtRel.imgpath,
                    photoIdentityCardDealtRel:this.photoIdentityCardDealtAbs.imgpath,

                    ids:this.infoTag,
                    mid:Number(this.ID),
                }


            paramsObj.userPassword == "" ?  delete paramsObj.userPassword :''

            if(paramsObj.sex === '未知') {
                paramsObj.sex = 0
            } else if(paramsObj.sex === "男") {
                paramsObj.sex  = 1
            } else {
                paramsObj.sex = 2
            }

            Object.values(paramsObj).map((value)=>{
               if(value=== undefined || value === "" ){
                   ++curLength
               }
           })

           if(curLength > 0){
               alert('所有参数必填，请填写完整')
               return
           }

            let params = serialize(paramsObj),
                data = await PsychorupdateMember(params)

            data.code == 0 ? this.$route.router.go("/consultant") : alert(`errMsg:${data.msg}`)

        },
        saveMsg(){
            this.ID ?  this.uploadMsg() : this.addMsg()

        }

    },
    ready(){

        this.getTagList()
        this.getLicenseTypeList()

        !!this.$route.params.id ?  this.getPsychorgetMember() : ''
    }
}

</script>
