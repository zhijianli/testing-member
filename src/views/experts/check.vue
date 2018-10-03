<style>
.check-wrapper .btn-info {
    display: none;
}
.previewPictureBox {
    width: 150px;
    height: 100px;
    cursor: pointer;
    /* border: 1px solid ; */
}
.easyYuyin {
  width: 45px;
  height: 30px;
  background-image: url(../../images/yuyin.png);
  background-repeat: no-repeat;
  border-radius: 8px;
  margin-left: 67px;
}
</style>
<template>
    <div class="container-fluid check-wrapper">
        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
                    <h5>专家信息</h5>
                </div>
                <div class="widget-content nopadding">
                   <h3>基本信息</h3>
                    <div class="form-horizontal">
                        <div class="control-group">
                            <label class="control-label">头像 :</label>
                            <div class="controls">
                                <!-- <qiniu event-name="photoCandid" :defaultimg="photoCandid"></qiniu> -->

                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ photoCandid " @click="btnViews(photoCandid)"/>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 姓名 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="name" name="name">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">性别 :</label>
                            <div class="controls">
                                <select v-model="sex" name="sex" disabled>
                                    <option value="0">未知</option>
                                    <option value="1">男</option>
                                    <option value="2">女</option>
                                </select>
                            </div>
                        </div>

                        <!-- 新增生日 -->
                        <div class="control-group">
                            <label class="control-label">生日 :</label>
                            <div class="controls" >
                                <input style="width:170px;" disabled class="input myInput" v-model="birthday" size="20" type="text"  placeholder="请输入出生年月日">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">手机号 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="mobilePhone">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">微信号 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="wxAccount" name="wxAccount">
                            </div>
                        </div>


                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label"> 城市 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="location">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 毕业学校 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="school">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label"> 专业 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="major">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 学历 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="degree">
                            </div>
                        </div>
                        <!-- <div class="control-group">
                            <label class="control-label"> 时间段 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="nstart">
                                -
                                <input type="text" disabled class="span11" placeholder="" v-model="nend">
                            </div>
                        </div> -->

                        <!-- end  1.1版本新增 -->


                        <div class="control-group">
                            <label class="control-label"> 从哪听说心猫 :</label>
                            <div class="controls">
                                <select value="{{infoChannel}}" v-model="infoChannel" name="infoChannel" class="span11" disabled>
                                    <option v-for="item of channelList" value="{{item.infoChannel}}">{{item.channelName}}</option>
                                </select>
                                <!--<input type="text" disabled class="span11" placeholder="" v-model="infoChannel" name="name">-->
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 推荐人 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="referrer" name="name">
                            </div>
                        </div>
                        <!-- <div class="control-group">
                            <label class="control-label"> 推荐人微信号 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="referrerWechat" name="name">
                            </div>
                        </div> -->
                        <h3>专业背景</h3>

                        <!-- <div class="control-group">
                            <label class="control-label">所在地:</label>
                            <div class="controls">
                                <input type="text" class="span11" v-model=" location" name="location">
                            </div>
                        </div> -->

                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label">职业背景 :</label>
                            <div class="controls">
                                <!-- <select v-model="sex" name="sex"> -->
                                <!-- <select name="" disabled>
                                    <option value="0">全职</option>
                                    <option value="1">兼职</option>
                                </select>
                                -->
                                <!-- <input type="radio" id="one" value="One" v-model="picked" disabled> <label style="display:inline-block;" for="one">全职</label>
                                <input type="radio" id="two" value="Two" v-model="picked" disabled> <label style="display:inline-block;" for="two">兼职</label> -->

                                <select v-model="proBackground" name="proBackground" disabled>
                                    <option :value="1">全职</option>
                                    <option :value="2">兼职</option>
                                </select>
                            </div>
                        </div>
                        <!-- end  1.1版本新增 -->

                        <div class="control-group">
                            <label class="control-label">资质 :</label>
                            <div class="controls">
                                <select value="{{ ltid }}" v-model="ltid" name="ltid" disabled>
                                    <option v-for="item of selectList" value="{{ item.ltid }}">{{ item.licenseName }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">擅长领域 :</label>
                            <div class="controls">
                               <ul>
                                    <li class="shan-item" v-for="item of shanList" v-text="item.tagName"></li>
                               </ul>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">个人优势 :</label>
                            <div class="controls">
                                <textarea v-model="advantage" disabled name="brief" cols="100" rows="2" placeholder="请输入不低于20个字的描述"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">受训背景 :</label>
                            <div class="controls">
                               <textarea v-model="shouxunbg" disabled  cols="100" rows="10"></textarea>

                            </div>
                        </div>
                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label">资格证编号 :</label>
                            <div class="controls">
                                <input type="text" style="width: 250px" disabled  class="span11" placeholder="" v-model="certificationNo" name="certificationNo">

                            </div>
                        </div>
                        <!-- end  1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label">资格证 :</label>
                            <div class="controls">
                                <!-- <qiniu event-name="photoCertificationRel" :defaultimg="photoCertificationRel"></qiniu> -->
                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ photoCertificationRel " @click="btnViews(photoCertificationRel)"/>
                                </div>


                            </div>
                        </div>
                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label">身份证编号 :</label>
                            <div class="controls">
                                <input type="text" style="width: 250px" disabled  class="span11" placeholder="" v-model="idCardNo" name="idCardNo">
                            </div>
                        </div>
                        <!-- end  1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label">身份证 :</label>
                            <div class="controls">
                                <!-- <qiniu event-name="photoIdentityCardRel" :defaultimg="photoIdentityCardRel"></qiniu> -->

                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ photoIdentityCardRel " @click="btnViews(photoIdentityCardRel)"/>
                                </div>

                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">权威资质证书 :</label>
                            <div class="controls">
                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ authorityPicture " @click="btnViews(authorityPicture)"/>

                                </div>
                                <div style="margin-left: -98px;margin-top: 17px;">
                                  应用展示标签：<input placeholder="最多三个字" v-model="authorityExplain" type="text" maxlength="3" disabled>
                                </div>
                            </div>
                        </div>



                        <!-- start 1.1版本新增 -->
                        <!-- <div class="control-group">
                            <label class="control-label">参加心猫培训次数 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="" name="xmTrainingTimes" v-model="xmTrainingTimes">
                                次
                            </div>
                        </div> -->
                        <!-- end  1.1版本新增 -->









                        <h3>职业描述</h3>

                        <div class="control-group">
                            <label class="control-label">从业年限 :</label>
                            <div class="controls">
                                <input type="number" disabled value=" {{ workYears }}" v-model="workYears"> 年
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">累计个案 :</label>
                            <div class="controls">
                                <input type="number" disabled value="{{ caseHours }}" v-model="caseHours"> 小时
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 受督导时间 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="time" name="name">
                                小时
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label">个人经历 :</label>
                            <div class="controls">
                                <textarea v-model="brief" disabled name="brief" cols="100" rows="10"></textarea>
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label">咨询方式 :</label>
                            <div class="controls">
                                <textarea v-model="workWay" disabled cols="100" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">咨询流派 :</label>
                            <div class="controls">
                                 <textarea v-model="consultGenre" disabled cols="100" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">擅长方向 :</label>
                            <div class="controls">
                                 <textarea v-model="goodAtDirection" disabled cols="100" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">咨询风格 :</label>
                            <div class="controls">
                                 <textarea v-model="consultStyle" disabled cols="100" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">咨询对象 :</label>
                            <div class="controls">
                               <ul>
                                    <li class="shan-item" v-for="item of consultObject" v-text="item.typeName"></li>
                               </ul>
                            </div>
                        </div>
                        <template v-if="this.voiceProfile !== null">
                          <div class="control-group" >
                            <audio @ended="audioEndPlay" v-el:audioEl></audio>
                            <div class="text" style="display: flex;flex-wrap:  nowrap;" >
        											<div @click="changeAudio(childrenIndex, this.voiceProfile)" class="easyYuyin"  class="{'audio_box_ani':childrenIndex === currentIndex }"></div>
        											<div class="audio_item_duration" style="line-height: 30px;margin-left: 5px;">{{  voiceProfileLenth  }}"</div>
        										</div>
                            <span style="margin-left: 65px;float: left;">{{yuyinbofang}}</span>
                          </div>
                        </template>



                        <!-- <div class="control-group">
                            <label class="control-label">服务类型</label>
                            <div class="controls">
                                <select name="pLevel" v-model="pLevel" value="{{ pLevel}}">
                                    <option value="0">心理专家</option>
                                    <option value="1">倾听师</option>
                                </select>
                            </div>
                        </div> -->
                        <!-- <div class="control-group">
                            <label class="control-label">头衔</label>
                            <div class="controls">
                                <input type="text" class="span11" v-model="title" name="title">
                            </div>
                        </div> -->

                       <!--  <div class="control-group">
                            <label class="control-label">头像 :</label>
                            <div class="controls">

                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ avatar " @click="btnViews(avatar)"/>
                                </div>
                            </div>
                        </div> -->



                         <div class="form-actions">
                           <!--  <button type="button" class="btn btn-success" @click="btnUpload">保存</button> -->
                            <!-- <span v-if="pLevel === 0">专业咨询师</span> -->
                            <button type="button" class="btn btn-success" @click="showDialog(0)">添加为专业咨询师</button>

                             <!-- <span v-if="pLevel === 1">轻咨询师</span> -->
                            <button type="button" class="btn btn-success" @click="showDialog(1)">添加为轻咨询师</button>

                            <button type="button" class="btn btn-warning" @click="showDialogNO">不通过</button>

                        </div>

                </div>
            </div>
        </div>

        <div class="dialog-wrapper" v-if="reverseStatus">
            <div class="dialog-container">
                <h4>确定{{name}}通过审核吗？</h4>
                <div class="btn-wrapper">
                    <div @click="cancelReverse">取消</div>
                    <div @click="confirmReverse">确定</div>
                </div>
            </div>
        </div>

        <div class="dialog-wrapper" v-if="reverseStatusNO">
            <div class="dialog-container">
                <h4>确定{{name}}不通过审核吗？</h4>
                <div class="btn-wrapper">
                    <div @click="cancelReverseNO">取消</div>
                    <div @click="confirmReverseNO">确定</div>
                </div>
            </div>
        </div>

        <div class="dialog-wrapper" v-if="previewPictureStatus">
            <div class="modal">
                <div class="modal-header">
                    <button data-dismiss="modal" class="close" type="button" @click="previewPictureStatus = false">×</button>
                    <h3>预览</h3>
                </div>
                <div class="modal-body">
                    <img :src="imgPre + '/' + viewsImg" width="513">
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {
        getLicenseTypeList,
        getPsychoInfoByKey,
        modifyPsychoInfo,
        auditPsychoInfo,

        getResponses
    } from '../../api'
    import {
  	    getAdvisoryDetail,
          clearDisableMessageDays,
          addDisableMessageDays,
          deleteMemberAdvisory,
          deleteMemberAdvisoryComment,
          deleteMemberAdvisoryImg
  	} from "../../api.js"
    import {serialize} from "../../utils"
    import qiniu from "../../qiniu.vue"
    import jinqi from "../../images/jinqi.png"
  	import dianzan from "../../images/dianzan.png"

    export default {
        data() {
            return {
                imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
                audioPre: `https://${process.env.NODE_ENV =='production' ? "file.120xinmao.com/" : "oml9gawrn.qnssl.com/" }`,
                piid: window.location.pathname.split('/')[2],
                name: '',
                sex: '',
                voiceProfile: "",
                voiceProfileLenth: "",
                audioComWidth: "",


                wxAccount: '',
                mobilePhone: '',
                location: '',
                nstart: "",
                nend: "",
                ltid: '',
                title: '',
                brief: '',
                pLevel: '',
                workYears: '',
                caseHours: '',
                currentIndex: '',
                childrenIndex: "",

                workWay: "",
                consultGenre: "",
                goodAtDirection: "",
                consultStyle: "",
                consultObject: [],
                yuyinbofang: "",

                avatar: '', //头像相对路径
                photoCandid: '', //生活处理照相对路径
                photoCertificationRel: '', //资格证照隐私处理相对路径
                photoIdentityCardRel: '', //身份证照隐私处理相对路径
                authorityPicture: '',

                infoChannel: '',
                channelList:[
                    {infoChannel:1,channelName:"微信朋友圈"},
                    {infoChannel:2,channelName:"朋友介绍"},
                    {infoChannel:3,channelName:"论坛、广告等"},
                    {infoChannel:4,channelName:"线下咨询机构"},
                    {infoChannel:5,channelName:"地面培训"},
                    {infoChannel:6,channelName:"其他"},
                ],
                referrer: '',
                //referrerWechat: '',

                pLevel: 0,
                advantage: "",
                shan: [],
                shouxunbg: "",
                time: "",


                selectList: [],
                shanList: [],
                shanTagList: [],
                files: '',

                isEdit: false,

                reverseStatus: false,
                reverseStatusNO: false,


                // 1.2新增字段
                birthday: '', // 生日
                certificationNo: '', // 资格证编号
                idCardNo: '', // 身份证编号
                proBackground: '', // 职业背景

                school: '', //学校
                major: '', //专业
                degree: '', //学位
                city: '', //城市
                xmTrainingTimes: 0, //参加心猫培训次数

                // 图片预览功能
                previewPictureStatus: false,
                viewsImg: "",


            }
        },

        filters: {
            format(value) {
                let array = ["未知", "男", "女"]

                return array[value]
            }
        },
        components: {
            qiniu
        },

        events: {
            'imgParameter': function(obj, eventName) {
                this[eventName] = obj[eventName].imgPath
            }
        },
        methods: {
            audioEndPlay() {
              console.log("完成播放")
              this.yuyinbofang = "语音播放完成"
              this.currentIndex = ''
            },
            changeAudio(id, src) {
              console.log(id);
              console.log(this.voiceProfile);
              let audio = this.$els.audioel
    			    if (this.currentIndex === '') {
                audio.src = this.audioPre + src
                audio.addEventListener("canplaythrough", function () {
                    audio.play();
                }, false);
                this.yuyinbofang = "语音播放中"
    					  this.currentIndex = 1
                console.log(111)
      				} else {
                  console.log(222)
                  audio.pause();
                  this.currentIndex = ''
        				}
            },
            serialize(obj) {

                let str = ""
                for (let key in obj) {
                    str += `${key}=${obj[key]}&`
                }
                str = str.slice(0, -1)
                return str

            },
            cancelReverse() {
                this.reverseStatus = false
            },
            confirmReverse() {
                //this.btnUpload(this.$value)
                if (this.$value) {
                    this.saveForQ()
                } else {
                    this.saveForP()
                }
            },
            showDialog(value) {
                this.reverseStatus = true
                this.$value = value
            },
            showDialogNO() {
                this.reverseStatusNO = true
            },
            cancelReverseNO() {
                this.reverseStatusNO = false
            },
            confirmReverseNO() {
                this.saveForB()
            },
           async btnUpload(value) {

                // 处理数据
                let registerData = JSON.parse(JSON.stringify(this.$data))

                delete registerData.selectList
                delete registerData.files

                // delete registerData.photoAvatar
                // delete registerData.photoCandidDealt
                // delete registerData.photoCertificationDealt
                // delete registerData.photoIdentityCardDealt

                delete registerData.shanList
                delete registerData.previewPictureStatus
                delete registerData.imgPre
                delete registerData.viewsImg


                registerData.mid = registerData.piid
                registerData.ids = JSON.stringify(registerData.shanTagList)

                // console.log(registerData)
                // if (value === 1) {
                //     registerData.pLevel = 1
                // } else {
                //     registerData.pLevel = 0
                // }

                //let params = this.serialize(registerData)

                let data = await getResponses("Psychor/updateMember.json", serialize(registerData))
                if (data.code == 0) {
                     location.href = "/expertsIn"
                    //this.$route.router.go("/expertsIn")
                }

            },
            selectTag(id, index) {
                if (this.shanTagList.indexOf(id) !== -1) {
                    this.shanTagList.forEach((item, i, arr) => {
                        if (id === item) {
                            arr.splice(i, 1)
                        }
                    })
                } else {
                    if (this.shanTagList.length === 3) {
                        alert("只能选择三个标签")

                        return
                    }

                    this.shanTagList.push(id)
                }
            },

            async getPsychoInfoByKey() {
                const params = {
                    piid: this.piid,
                    isEap: this.$route.query.eap
                }
                let data = await getResponses("PsychoInfo/getPsychoInfoByKey.json", serialize(params))


                if (data.code == 0) {

                    let list = data.psychoInfo

                    let obj = data.obj
                    // this.commentList = data.commentList

                    this.voiceProfile = list.voiceProfile
                    this.voiceProfileLenth = list.voiceProfileLenth
                    this.name = list.name
                    this.sex = list.sex
                    this.wxAccount = list.wxAccount
                    this.mobilePhone = list.mobilePhone
                    this.location = list.location
                    this.school = list.school
                    //this.nstart =
                    this.major = list.major
                    this.degree = list.degree

                    this.ltid = list.ltid
                    this.title = list.title
                    this.brief = list.brief
                    this.pLevel = list.pLevel
                    this.workYears = list.workYears
                    this.caseHours = list.caseHours
                    this.time  = list.supervisorTime
                    this.advantage  = list.advantage
                    this.shanList  = list.psychoTags

                    this.shouxunbg = list.trainBackground

                    this.workWay = list.workWay
                    this.consultGenre = list.consultGenre
                    this.goodAtDirection = list.goodDirection
                    this.consultStyle = list.consultStyle
                    this.consultObject = list.consultTargetList


                    this.voiceProfileLenth = list.voiceProfileLenth
                    this.voiceProfile = list.voiceProfile



                    this.avatar = list.avatar
                    this.photoCandid = list.photoCandid

                    this.photoCertificationRel = list.photoCertificationDealt
                    this.photoIdentityCardRel = list.photoIdentityCardDealt
                    this.authorityPicture = list.authorityPicture

                    this.idCardNo = list.idCardNo
                    this.certificationNo = list.certificationNo
                    this.proBackground = list.proBackground
                    this.birthday = list.birthday.trim().split(" ")[0]

                    // this.nstart = list.learnStartEnd.split("-")[0]
                    // this.nend = list.learnStartEnd.split("-")[1]



                    this.infoChannel = parseInt(list.infoChannel) ? parseInt(list.infoChannel) : ""
                    this.referrer = list.referrer ? list.referrer : ""
                    this.referrerWechat = list.referrerWechat ? list.referrerWechat : ""

                    this.list.forEach((item, index) => {
                    if (this.voiceProfile !== null) {
                      let vLength = ''
                      if (this.voiceProfileLenth < 20) {
                        vLength = 100
                      } else if (this.voiceProfileLenth > 60) {
                        vLength = 300
                      } else {
                        vLength = Math.round(this.voiceProfileLenth) / 60 * 300
                      }
                        Vue.set(item, 'audioComWidth', vLength + 'px')
                      }
                    })

                }

                    // 1.2新增-----------------------------------------------end




            },
            async getLicenseTypeList() {

                let data = await getLicenseTypeList()

                if (data.code == 0) {
                    this.selectList = data.licenseTypes
                }

            },

            async modifyPsychoInfo(params) {

                let data = await modifyPsychoInfo(params)
                if (data.code == 0) {
                    // location.href = "/expertsIn"
                    this.$route.router.go("/expertsIn")
                }
            },

            async saveForP() {
                const params = {
                    piid: this.$route.params.id,
                    pLevel: 0,
                    auditStatus: 1,
                    isEap: this.$route.query.eap
                 }

                 const data = await getResponses("PsychoInfo/V3/auditPsychoInfo.json", serialize(params))

                 location.href = "/expertsIn"
            },
            async saveForQ() {
                const params = {
                    piid: this.$route.params.id,
                    pLevel: 1,
                    auditStatus: 1,
                    isEap: this.$route.query.eap
                 }

                 const data = await getResponses("PsychoInfo/V3/auditPsychoInfo.json", serialize(params))


                 location.href = "/expertsIn"
            },
            async saveForB() {
                 const params = {
                    piid: this.$route.params.id,
                    auditStatus: 2,
                    isEap: this.$route.query.eap
                 }

                 const data = await getResponses("PsychoInfo/V3/auditPsychoInfo.json", serialize(params))

                 location.href = "/expertsIn"
            },
            saveFor() {
                //  let params = `auditStatus=1&piid=${this.$route.params.id}`

                // this.auditPsychoInfo(params)
                this.btnUpload()
            },

            async auditPsychoInfo(params) {

                let data = await getResponses("Psychor/updateMember.json", params)


                //this.through = false

                //this.NotThrough = false

                if (data.code == 0) {
                    //history.back()
                    location.href = "/expertsIn"
                } else {
                    alert(data.msg)
                }

            },
             // 预览
            btnViews(img) {

                this.viewsImg = ""

                this.viewsImg = img

                this.previewPictureStatus = true

            },
        },
        ready() {
            this.getLicenseTypeList()
            setTimeout(() => {
                this.getPsychoInfoByKey()
            })


            this.isEdit = location.search.slice(1).indexOf("edit") !== -1

        }

    }
</script>
