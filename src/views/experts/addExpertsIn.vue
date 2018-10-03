<template>
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
                    <h5>专家信息</h5>
                </div>
                <div class="widget-content nopadding">
                    <h3>基本信息</h3>
                    <div class="form-horizontal">
                        <div class="control-group">
                            <label class="control-label"> 姓名 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="nickname" name="name">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">性别 :</label>
                            <div class="controls">
                                <select v-model="sex" name="sex">
                                    <option value="1">男</option>
                                    <option value="2">女</option>
                                </select>
                            </div>
                        </div>
                        <!-- 新增生日 -->
                        <div class="control-group">
                            <label class="control-label">生日 :</label>
                            <div class="controls" >
                                <input style="width:170px;" class="input myInput" size="20" type="date"  placeholder="请输入出生年月日" v-model="birthday">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">手机号 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="mobilePhone">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">微信号 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="wxAccount" name="wxAccount">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 从哪听说心猫 :</label>
                            <div class="controls">
                                <select v-model="infoChannel" name="infoChannel" class="span11">
                                    <option value="1">微信朋友圈</option>
                                    <option value="2">朋友介绍</option>
                                    <option value="3">论坛、广告等</option>
                                    <option value="4">线下咨询机构</option>
                                    <option value="5">地面培训</option>
                                    <option value="6">其他</option>
                                </select>
                                <!--<input type="text" class="span11" placeholder="" v-model="infoChannel" name="name">-->
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 推荐人 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="referrer" name="name">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 推荐人微信号 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="referrerWechat" name="name">
                            </div>
                        </div>
                        <h3>基本信息</h3>

                        <!-- <div class="control-group">
                            <label class="control-label">所在地:</label>
                            <div class="controls">
                                <input type="text" class="span11" v-model=" location" name="location">
                            </div>
                        </div> -->
                        <div class="control-group">
                            <label class="control-label">执照类型 :</label>
                            <div class="controls">
                                <select value="{{ ltid }}" v-model="ltid" name="ltid" v-el:license>
                                    <option v-for="item of selectList" value="{{ item.ltid }}">{{ item.licenseName }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">从业年限 :</label>
                            <div class="controls">
                                <input type="number" value=" {{ workYears }}" v-model="workYears">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">累计个案 :</label>
                            <div class="controls">
                                <input type="number" value="{{ caseHours }}" v-model="caseHours">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 受督导时间 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="supervisorTime" name="name">
                                小时
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">资格证编号 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="certificationNo">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">资格证 :</label>
                            <div class="controls">
                                <qiniu event-name="photoCertificationDealtRel" :defaultimg="photoCertificationDealtRel"></qiniu>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">身份证编号 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="idCardNo">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">身份证 :</label>
                            <div class="controls">
                                <qiniu event-name="photoIdentityCardDealtRel" :defaultimg="photoIdentityCardDealtRel"></qiniu>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" style="margin-top: 20px;">权威资质证书 :</label>
                            <span style="position: relative;top: 52px;left: -66px;">（ 选填 ）</span>
                            <div class="controls">
                                <qiniu event-name="authorityPicture" :defaultimg="authorityPicture"></qiniu>
                                <div style="margin-left: -98px;margin-top: 17px;">
                                  应用展示标签：<input placeholder="最多三个字" v-model="authorityExplain" type="text" maxlength="3">
                                </div>
                            </div>

                        </div>

                        <h3>职业描述</h3>

                        <!-- 新增职业背景 -->
                        <div class="control-group">
                            <label class="control-label">职业背景 :</label>
                            <div class="controls">
                                <!-- <select v-model="sex" name="sex"> -->
                                <select v-model="proBackground" name="proBackground">
                                    <option :value="1">全职</option>
                                    <option :value="2">兼职</option>
                                </select>
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label">个人经历 :</label>
                            <div class="controls">
                                <textarea v-model="brief" name="brief" cols="100" rows="5"></textarea>
                            </div>
                        </div>
                         <div class="control-group">
                            <label class="control-label">擅长领域 :</label>
                            <div class="controls">
                               <ul>
                                    <li class="shan-item" :class="{selected: shanTagList.indexOf(item.tagId) !== -1}" v-for="item of shanList" v-text="item.tagName" @click="selectTag(item.tagId, $index)"></li>
                                    <li class="shan-item">
                                        其他
                                        <input type="text" v-model="primaryDomain" placeholder="其他" :disabled="shanTagList.length === 3">
                                    </li>
                               </ul>
                            </div>
                        </div>
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
                        <div class="control-group">
                            <label class="control-label">头像 :</label>
                            <div class="controls">
                                <qiniu event-name="avatar" :aa="1" :blob="avatarBlob" :defaultimg="avatar" @change="avatarChange"></qiniu>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">职业照 :</label>
                            <div class="controls">
                                <qiniu event-name="candidPhoto" :aa="2" :blob="candidPhotoBlob" :defaultimg="candidPhoto" @change2="candidPhotoChange"></qiniu>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">个人优势 :</label>
                            <div class="controls">
                                <textarea v-model="advantage" name="brief" cols="100" rows="5" placeholder="请输入不超过15个字的描述" maxlength="15"></textarea>
                            </div>
                        </div>
                        <!-- <div class="control-group">
                            <audio @ended="audioEndPlay" v-el:audioEl></audio>

                            <div class="text" style="display: flex;flex-wrap:  nowrap;">
                              <div @click="changeAudio(childrenIndex, items.commentContent)" class="audio_box" :style="{width: items.audioComWidth}" :class="{'audio_box_ani':childrenIndex === currentIndex }"></div>
                              <div class="audio_item_duration">{{  items.voiceTimeLength  }}"</div>
                            </div>
                        </div> -->
                        <div class="form-actions">
                            <button type="button" class="btn btn-success" @click="showDialog(0)">添加为专业咨询师</button>
                            <button type="button" class="btn btn-success" @click="showDialog(1)">添加为轻咨询师</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <image-clip :url="imageClipURL" :rate="rate" @cancel="cancelImageClip" @cropComplete="cropComplete" @ccc="ccc"></image-clip>

        <div class="dialog-wrapper" v-if="reverseStatus">
            <div class="dialog-container">
                <h4>确定{{nickname}}通过审核吗？</h4>
                <div class="btn-wrapper">
                    <div @click="cancelReverse">取消</div>
                    <div @click="confirmReverse" v-if="! sending">确定</div>
                    <div v-else>提交中...</div>

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

        getResponse,
        getResponses
    } from '../../api'
    import qiniu from "../../qiniu.vue"

    import imageClip from "components/image-clip"

    import {serialize} from "../../utils"

    export default {
        data() {
            return {
                piid: window.location.pathname.split('/')[2],
                nickname: '',
                sex: '',
                mobilePhone: '',
                wxAccount: '',
                //location: '',
                ltid: '',
                supervisorTime: '',
                //title: '',
                brief: '',
                //pLevel: '',
                workYears: '',
                caseHours: '',

                //jingli: "",
                advantage: "",
                shanList: [],
                shanTagList: [],
                primaryDomain: "",

                avatar: '', //头像相对路径
                candidPhoto: '', //生活处理照相对路径
                photoCertificationDealtRel: '', //资格证照隐私处理相对路径
                photoIdentityCardDealtRel: '', //身份证照隐私处理相对路径
                authorityPicture : '', //权威资质证书隐私处理相对路径

                infoChannel: '',
                referrer: '',
                referrerWechat: '',

                // 1.2新增字段
                birthday: '', // 生日
                certificationNo: '', // 资格证编号
                idCardNo: '', // 身份证编号
                proBackground: '', // 职业背景
                authorityExplain: '',

                selectList: [],
                files: '',

                reverseStatus: false,
                //reverseName: "",

                rate: 1,
                imageClipURL: null,

                avatarBlob: null,
                candidPhotoBlob: null,
                changeId: null,

                sending: false,
            }
        },

        filters: {
            format(value) {
                let array = ["男", "女"]

                return array[value]
            }
        },
        components: {
            qiniu,
            imageClip
        },

        events: {
            'imgParameter': function(obj, eventName) {
                this[eventName] = obj[eventName].imgPath
            }
        },
        watch: {
            birthday(value) {
                console.log(value)
                // if (value.trim().length != 10) {
                //     alert("请输入正确的生日，格式为“2000/01/01” ")
                // }
            }
        },
        methods: {
            audioEndPlay() {
              console.log("完成播放")
              this.currentIndex = ''
            },
            changeAudio(id, src) {
              let audio = this.$els.audioel
    			    if (this.currentIndex === id) {
                audio.pause();
    					this.currentIndex = ''
    				} else {
              console.log(111)
              this.currentIndex = id
              audio.src = this.audioPre + src
              audio.addEventListener("canplaythrough", function () {
                audio.play();
                }, false);
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
                this.btnUpload(this.$value)
            },
            showDialog(value) {
                this.reverseStatus = true
                this.$value = value
            },
            selectTag(id, index) {
                if (this.shanTagList.indexOf(id) !== -1) {
                    this.shanTagList.forEach((item, i, arr) => {
                        if (id === item) {
                            arr.splice(i, 1)
                        }
                    })
                } else {
                    if (this.shanTagList.length === 3 || this.shanTagList.length === 2 && this.primaryDomain) {
                        alert("只能选择三个标签")

                        return
                    }

                    this.shanTagList.push(id)
                }
            },
            async getShanList() {
                const data = await getResponse("Tag/obtainTags.json")

                this.shanList = data.tags
            },
            btnUpload(value) {

                // 处理数据
                let registerData = JSON.parse(JSON.stringify(this.$data))

                if (!registerData.birthday || registerData.birthday.trim().length != 10) {
                    alert("请输入正确的生日，格式为“2000/01/01”！")
                    return
                }

                delete registerData.selectList
                delete registerData.files

                // delete registerData.photoAvatar
                // delete registerData.photoCandidDealt
                // delete registerData.photoCertificationDealt
                // delete registerData.photoIdentityCardDealt

                delete registerData.shanList

                // 必填检查
                delete registerData.reverseStatus

                // 上传相关字段
                delete registerData.rate
                delete registerData.imageClipURL
                delete registerData.avatarBlob
                delete registerData.candidPhotoBlob
                delete registerData.changeId
                delete registerData.sending




                let infoChannel = registerData.infoChannel
                let referrer = registerData.referrer
                let referrerWechat = registerData.referrerWechat

                delete registerData.infoChannel
                delete registerData.referrer
                delete registerData.referrerWechat

                // if (! this.shanTagList.length) {
                //     alert("请选择擅长领域")

                //     return
                // }

                let shan = registerData.primaryDomain
                if (this.shanTagList.length) {
                    delete registerData.primaryDomain
                }

                // for (let key of Object.keys(registerData)) {
                //     if (! registerData[key]) {
                //         console.log(registerData[key])
                //         alert("请写完整")
                //
                //         console.log(registerData)
                //
                //         this.reverseStatus = false
                //
                //         return
                //     }
                // }

                if (this.shanTagList.length) {
                    registerData.primaryDomain = shan
                }


                registerData.infoChannel = infoChannel
                registerData.referrer = referrer
                registerData.referrerWechat = referrerWechat

                registerData.ids = JSON.stringify(registerData.shanTagList)

                registerData.birthday = registerData.birthday + " 00:00:00"

                // console.log(registerData)
                if (value === 1) {
                    registerData.pLevel = 1
                } else {
                    registerData.pLevel = 0
                }

                //let params = this.serialize(registerData)
                // console.log("hahha", registerData)

                this.sending = true
                this.modifyPsychoInfo(registerData)

            },

            async getPsychoInfoByKey() {


                let data = await getPsychoInfoByKey(`piid=${this.piid}`)


                if (data.code == 0) {

                    let list = data.psychoInfo

                    this.name = list.name
                    this.sex = list.sex
                    this.wxAccount = list.wxAccount
                    this.mobilePhone = list.mobilePhone
                    this.location = list.location
                    this.ltid = list.ltid
                    this.title = list.title
                    this.brief = list.brief
                    this.pLevel = list.pLevel
                    this.workYears = list.workYears
                    this.caseHours = list.caseHours


                    this.photoAvatarRel = list.photoAvatarRel
                    this.photoCandidDealtRel = list.photoCandidDealtRel
                    this.photoCertificationDealtRel = list.photoCertificationDealtRel
                    this.photoIdentityCardDealtRel = list.photoIdentityCardDealtRel
                    this.authorityPicture = list.authorityPicture


                    this.infoChannel = list.infoChannel
                    this.referrer = list.referrer
                    this.referrerWechat = list.referrerWechat


                }

            },
            async getLicenseTypeList() {

                let data = await getLicenseTypeList()

                if (data.code == 0) {
                    this.selectList = data.licenseTypes
                    this.ltid = data.licenseTypes[0].ltid

                    this.$nextTick(() => this.$els.license.selectedIndex = 0)
                }

            },

            async modifyPsychoInfo(params) {

                let data = await getResponses("Psychor/addMember.json", serialize(params))
                if (data.code == 0) {
                    location.href = "/expertsIn"

                    //this.$route.router.go("/expertsIn")
                } else {
                    alert(data.msg)
                }

                this.sending = false

            },
            imageChange(e) {
                this.rate = 1
                this.imageClipStatus = true

                this.imageClipURL = window.URL.createObjectURL(e.target.files[0])

                document.body.classList.add("overflow")

            },
            cancelImageClip() {
                this.imageClipURL = null

                document.body.classList.remove("overflow")
                document.body.onmouseup = null
            },
            ccc(blob) {
                //alert(2)
                if(this.changeId === 1) {
                    this.avatarBlob = blob
                } else if(this.changeId === 2) {
                    this.candidPhotoBlob = blob
                }

            },
            cropComplete(blob) {
                // 上传
                console.log(333)
                // getToken('/depression-eap/Qiniu/obtainPictureUploadToken.json').then((data) => {
                //     const formdata = new FormData()

                //     formdata.append("token", data.token)
                //     formdata.append("file", blob, "美女")

                //     getResponsesFile("http://up.qiniu.com", formdata).then((data) => {
                //         console.log(data)

                //         this.form[this.picPos] = data.key
                //     }).catch((e) => {
                //         console.log(e)
                //     })
                // })

            },

            avatarChange(e) {
                this.changeId = 1
                this.imageClipURL = window.URL.createObjectURL(e.target.files[0])
            },
            candidPhotoChange(e) {
                this.changeId = 2

                this.imageClipURL = window.URL.createObjectURL(e.target.files[0])
            },
        },
        ready() {
            this.getShanList()
            this.getLicenseTypeList()
            // setTimeout(() => {
            //     this.getPsychoInfoByKey()
            // })

        }

    }
</script>
