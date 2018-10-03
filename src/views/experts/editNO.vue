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
                                <input type="text" class="span11" placeholder="" v-model="name" name="name">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">性别 :</label>
                            <div class="controls">
                                <select v-model="sex" name="sex">
                                    <option value="0">未知</option>
                                    <option value="1">男</option>
                                    <option value="2">女</option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">手机号</label>
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
                                <input type="text" class="span11" placeholder="" v-model="infoChannel" name="name">
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
                            <label class="control-label">执照类型</label>
                            <div class="controls">
                                <select value="{{ ltid }}" v-model="ltid" name="ltid">
                                    <option v-for="item of selectList" value="{{ item.ltid }}">{{ item.licenseName }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">从业年限</label>
                            <div class="controls">
                                <input type="number" value=" {{ workYears }}" v-model="workYears">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">累计个案</label>
                            <div class="controls">
                                <input type="number" value="{{ caseHours }}" v-model="caseHours">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 受督导时间 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="time" name="name">
                                小时
                            </div>
                        </div>
                         <div class="control-group">
                            <label class="control-label">资格证</label>
                            <div class="controls">
                                <qiniu event-name="photoCertificationRel" :defaultimg="photoCertificationRel"></qiniu>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">身份证</label>
                            <div class="controls">
                                <qiniu event-name="photoIdentityCardRel" :defaultimg="photoIdentityCardRel"></qiniu>
                            </div>
                        </div>
                        <h3>职业描述</h3>
                        <div class="control-group">
                            <label class="control-label">个人经历</label>
                            <div class="controls">
                                <textarea v-model="brief" name="brief" cols="100" rows="5"></textarea>
                            </div>
                        </div>
                         <div class="control-group">
                            <label class="control-label">擅长领域</label>
                            <div class="controls">
                               <ul>
                                    <li class="shan-item" v-for="item of shanList" v-text="item.tagName"></li>
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
                            <label class="control-label">头像</label>
                            <div class="controls">
                                <qiniu event-name="avatar" :defaultimg="avatar"></qiniu>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">职业照</label>
                            <div class="controls">
                                <qiniu event-name="photoCandid" :defaultimg="photoCandid"></qiniu>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">个人优势</label>
                            <div class="controls">
                                <textarea v-model="advantage" name="brief" cols="100" rows="5"></textarea>
                            </div>
                        </div>
                         <div class="form-actions">
                           <!--  <button type="button" class="btn btn-success" @click="btnUpload">保存</button> -->
                            <!-- <span v-if="pLevel === 0">专业咨询师</span> -->
                            <button type="button" class="btn btn-success" @click="saveForP">添加为专业咨询师</button>

                             <!-- <span v-if="pLevel === 1">轻咨询师</span> -->
                            <button type="button" class="btn btn-success" @click="saveForQ">添加为轻咨询师</button>

                            <button type="button" class="btn btn-warning" @click="saveForB">不通过</button>

                        </div>
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
    import {serialize} from "../../utils"
    import qiniu from "../../qiniu.vue"

    export default {
        data() {
            return {
                piid: window.location.pathname.split('/')[2],
                name: '',
                sex: '',
                wxAccount: '',
                mobilePhone: '',
                location: '',
                ltid: '',
                title: '',
                brief: '',
                pLevel: '',
                workYears: '',
                caseHours: '',

                avatar: '', //头像相对路径
                photoCandid: '', //生活处理照相对路径
                photoCertificationRel: '', //资格证照隐私处理相对路径
                photoIdentityCardRel: '', //身份证照隐私处理相对路径

                infoChannel: '',
                referrer: '',
                referrerWechat: '',

                pLevel: 0,
                advantage: "",
                shan: [],
                time: "",


                selectList: [],
                shanList: [],
                shanTagList: [],
                files: '',

                isEdit: false

            }
        },

        filters: {
            format(value) {
                let array = ["男", "女"]

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
            serialize(obj) {

                let str = ""
                for (let key in obj) {
                    str += `${key}=${obj[key]}&`
                }
                str = str.slice(0, -1)
                return str

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
                    piid: this.piid
                }
                let data = await getResponses("PsychoInfo/getPsychoInfoByKey.json", serialize(params))


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
                    this.time  = list.supervisorTime
                    this.advantage  = list.advantage
                    this.shanList  = list.psychoTags



                    this.avatar = list.avatar
                    this.photoCandid = list.photoCandid
                    this.photoCertificationRel = list.photoCertificationRel
                    this.photoIdentityCardRel = list.photoIdentityCardRel


                    this.infoChannel = list.infoChannel
                    this.referrer = list.referrer
                    this.referrerWechat = list.referrerWechat


                }

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
                    auditStatus: 1
                 }

                 const data = await getResponses("PsychoInfo/V3/auditPsychoInfo.json", serialize(params))

                 location.href = "/expertsIn"
            },
            async saveForQ() {
                const params = {
                    piid: this.$route.params.id,
                    pLevel: 1,
                    auditStatus: 1
                 }

                 const data = await getResponses("PsychoInfo/V3/auditPsychoInfo.json", serialize(params))

                 location.href = "/expertsIn"
            },
            async saveForB() {
                 const params = {
                    piid: this.$route.params.id,
                    auditStatus: 2
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

            }
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