<template>
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
                    <h5>专家信息</h5>
                </div>
                <div class="widget-content nopadding">
                    <div class="form-horizontal">
                        <div class="control-group">
                            <label class="control-label"> 姓名 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="name" name="name">
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
                            <label class="control-label">所在地:</label>
                            <div class="controls">
                                <input type="text" class="span11" v-model=" location" name="location">
                            </div>
                        </div>
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
                            <label class="control-label">服务类型</label>
                            <div class="controls">
                                <select name="pLevel" v-model="pLevel" value="{{ pLevel}}">
                                    <option value="0">心理专家</option>
                                    <option value="1">倾听师</option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">头衔</label>
                            <div class="controls">
                                <input type="text" class="span11" v-model="title" name="title">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">头像</label>
                            <div class="controls">
                                <qiniu event-name="photoAvatarRel" :defaultimg="photoAvatarRel"></qiniu>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">职业照处理</label>
                            <div class="controls">
                                <qiniu event-name="photoCandidDealtRel" :defaultimg="photoCandidDealtRel"></qiniu>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">资格证隐私处理</label>
                            <div class="controls">
                                <qiniu event-name="photoCertificationDealtRel" :defaultimg="photoCertificationDealtRel"></qiniu>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">身份证隐私处理</label>
                            <div class="controls">
                                <qiniu event-name="photoIdentityCardDealtRel" :defaultimg="photoIdentityCardDealtRel"></qiniu>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">简介</label>
                            <div class="controls">
                                <textarea v-model="brief" name="brief" cols="100" rows="5">{{ brief }}</textarea>
                            </div>
                        </div>
                        <div class="form-actions">
                           <!--  <button type="button" class="btn btn-success" @click="btnUpload">保存</button> -->
                            <span v-if="type === 0">专业咨询师</span>
                            <button type="button" class="btn btn-success" @click="saveForP" v-if="type === 1">修改为专业咨询师</button>

                             <span v-if="type === 1">轻咨询师</span>
                            <button type="button" class="btn btn-success" @click="saveForQ" v-if="type === 0">修改为轻咨询师</button>

                            <button type="button" class="btn btn-warning" @click="saveForB">不通过</button>
                        </div>
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
        auditPsychoInfo
    } from '../../api'
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

                photoAvatarRel: '', //头像相对路径
                photoCandidDealtRel: '', //生活处理照相对路径
                photoCertificationDealtRel: '', //资格证照隐私处理相对路径
                photoIdentityCardDealtRel: '', //身份证照隐私处理相对路径

                infoChannel: '',
                referrer: '',
                referrerWechat: '',

                type: 0,


                selectList: [],
                files: '',

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
            btnUpload() {

                // 处理数据
                let registerData = JSON.parse(JSON.stringify(this.$data))

                delete registerData.selectList
                delete registerData.files

                delete registerData.photoAvatar
                delete registerData.photoCandidDealt
                delete registerData.photoCertificationDealt
                delete registerData.photoIdentityCardDealt
                let params = this.serialize(registerData)

                this.modifyPsychoInfo(params)

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

            saveForP() {
                let params = `auditStatus=1&piid=${this.$route.params.id}&type=0`

                this.auditPsychoInfo(params)
            },
            saveForQ() {
                let params = `auditStatus=1&piid=${this.$route.params.id}&type=1`

                this.auditPsychoInfo(params)
            },
            saveForB() {
                 let params = `auditStatus=2&piid=${this.$route.params.id}`

                this.auditPsychoInfo(params)
            },

            async auditPsychoInfo(params) {

                let data = await auditPsychoInfo(params)


                //this.through = false

                //this.NotThrough = false

                if (data.code == 0) {
                    history.back()
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

        }

    }
</script>