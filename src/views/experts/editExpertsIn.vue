<style>
    .form-horizontal .control-label {
        width: 130px;
    }

    .form-horizontal .controls {
        margin-left: 150px;
    }

</style>
<template>

    <div class="container-fluid">
        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-title"><span class="icon"> <i class="icon-align-justify"></i> </span>
                    <h5>专家信息</h5>
                </div>
                <div class="widget-content nopadding">
                    <h3>基本信息</h3>
                    <div class="form-horizontal">
                         <div class="control-group">
                            <label class="control-label">头像 :</label>
                            <div class="controls" @click="btnViews(avatar, $event)">
                                <qiniu event-name="avatar" :aa="2" :blob="candidPhotoBlob"
                                       :defaultimg="avatar" @change2="candidPhotoChange"></qiniu>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 姓名 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="nickname" name="name" :disabled="isForMarketCheck">

                                <span style="margin-left: 30px;">真实姓名：</span>
                                <input type="text" class="span11" placeholder="" v-model="realName" name="" :disabled="isForMarketCheck">

                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">性别 :</label>
                            <div class="controls">
                                <select v-model="sex" name="sex"  :disabled="isForMarketCheck">
                                    <option value="0">未知</option>
                                    <option value="1">男</option>
                                    <option value="2">女</option>
                                </select>
                            </div>
                        </div>

                        <!-- 新增生日 -->
                        <div class="control-group">
                            <label class="control-label">生日 :</label>
                            <div class="controls">
                                <input style="width:170px;" class="input myInput" size="20" type="date"
                                       placeholder="请输入出生年月日" v-model="birthday"  :disabled="isForMarketCheck">
                            </div>
                        </div>

                        <template v-if="!isForMarketCheck">
                            <div class="control-group">
                                <label class="control-label">手机号 :</label>
                                <div class="controls">
                                    <input type="text" disabled class="span11" placeholder="" v-model="mobilePhone">
                                    <button type="button" @click="changePhonenumberStatus = true">修改</button>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label">微信号 :</label>
                                <div class="controls">
                                    <input type="text" class="span11" placeholder="" v-model="wxAccount" name="wxAccount">
                                </div>
                            </div>
                        </template>

                         <div class="control-group">
                            <label class="control-label"> 城市 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="location" name="location" :disabled="isForMarketCheck">
                            </div>
                        </div>


                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label"> 毕业学校 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="school" name="school" :disabled="isForMarketCheck">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label"> 专业 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="major" name="major" :disabled="isForMarketCheck">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 学历 :</label>
                            <div class="controls">
                                <!-- <input type="text" class="span11" placeholder="" v-model="degree" name="degree"> -->
                                <select v-model="degree" :disabled="isForMarketCheck">
                                    <option value="博士">博士</option>
                                    <option value="硕士">硕士</option>
                                    <option value="本科">本科</option>
                                    <option value="大专及以下">大专及以下</option>
                                </select>
                            </div>
                        </div>
                        <!-- <div class="control-group">
                            <label class="control-label"> 时间段 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="nstart">
                                -
                                <input type="text" class="span11" placeholder="" v-model="nend">
                            </div>
                        </div> -->

                        <!-- end  1.1版本新增 -->


                        <div class="control-group">
                            <label class="control-label"> 从哪听说心猫 :</label>
                            <div class="controls">
                                <select v-model="infoChannel" name="infoChannel" class="span11" :disabled="isForMarketCheck">
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
                                <input type="text" class="span11" placeholder="" v-model="referrer" name="name" :disabled="isForMarketCheck">
                            </div>
                        </div>
                        <!-- <div class="control-group">
                            <label class="control-label"> 推荐人微信号 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="referrerWechat" name="name">
                            </div>
                        </div> -->
                        <h3>专业背景</h3>
                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label">职业背景 :</label>
                            <div class="controls">
                                <!-- <select v-model="sex" name="sex"> -->
                                <select v-model="proBackground" name="proBackground" :disabled="isForMarketCheck">
                                    <option :value="1">全职</option>
                                    <option :value="2">兼职</option>
                                </select>
                            </div>
                        </div>
                        <!-- end  1.1版本新增 -->
                        <!-- <div class="control-group">
                            <label class="control-label">所在地:</label>
                            <div class="controls">
                                <input type="text" class="span11" v-model=" location" name="location">
                            </div>
                        </div> -->
                        <div class="control-group">
                            <label class="control-label">资质 :</label>
                            <div class="controls">
                                <select value="{{ ltid }}" v-model="ltid" name="ltid" :disabled="isForMarketCheck">
                                    <option v-for="item of selectList" value="{{ item.ltid }}">{{ item.licenseName }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">擅长领域 :</label>
                            <div class="controls">
                                <ul>
                                    <template v-if="!isForMarketCheck">
                                        <li class="shan-item" :class="{selected: item.isPicked === 1}"
                                            v-for="item of shanList" v-text="item.tagName" @click="selectTag(item)"></li>
                                    </template>
                                    <template v-else>
                                        <li class="shan-item" :class="{selected: item.isPicked === 1}"
                                            v-for="item of shanList" v-text="item.tagName"></li>
                                    </template>

                                </ul>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">个人优势 :</label>
                            <div class="controls">
                                <textarea v-model="advantage" name="brief" cols="100" rows="5" placeholder="请输入不超过15个字的描述" :disabled="isForMarketCheck" maxlength="15"></textarea>
                            </div>
                        </div>


                        <!-- start 1.1版本新增 -->
                        <!-- <div class="control-group">
                            <label class="control-label">参加心猫培训次数 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="xmTrainingTimes"
                                       name="xmTrainingTimes">
                                次
                            </div>
                        </div> -->
                        <!-- end  1.1版本新增 -->

                        <div class="control-group">
                            <label class="control-label">受训背景 :</label>
                            <div class="controls">
                                 <textarea v-model="trainBackground" name="brief" cols="100" rows="10" :disabled="isForMarketCheck"></textarea>
                            </div>
                        </div>

                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label">资格证编号 :</label>
                            <div class="controls">
                                <input type="text" style="width: 250px" class="span11" placeholder="" v-model="certificationNo" :disabled="isForMarketCheck">

                            </div>
                        </div>
                        <!-- end  1.1版本新增 -->

                        <div class="control-group">
                            <label class="control-label">资格证 :</label>
                            <div class="controls" @click="btnViews(photoCertificationDealtRel, $event)">
                                <qiniu event-name="photoCertificationDealtRel"
                                       :defaultimg="photoCertificationDealtRel"></qiniu>
                            </div>
                        </div>

                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label">身份证编号 :</label>
                            <div class="controls">
                                <input type="text" style="width: 250px" class="span11" placeholder="" v-model="idCardNo" :disabled="isForMarketCheck">
                            </div>
                        </div>
                        <!-- end  1.1版本新增 -->


                        <div class="control-group">
                            <label class="control-label">身份证 :</label>
                            <div class="controls" @click="btnViews(photoIdentityCardDealtRel, $event)">
                                <qiniu event-name="photoIdentityCardDealtRel"
                                       :defaultimg="photoIdentityCardDealtRel"></qiniu>
                            </div>
                        </div>

                        <!-- 差个接口 -->
                        <div class="control-group">
                            <label class="control-label" style="margin-top: 20px;">权威资质证书 :</label>
                            <span style="position: relative;top: 52px;left: -66px;">（ 选填 ）</span>

                            <div class="controls" @click="btnViews(authorityPicture, $event)">
                                <qiniu event-name="authorityPicture"
                                       :defaultimg="authorityPicture"></qiniu>
                                 <div style="margin-left: -98px;margin-top: 17px;">
                                   应用展示标签：<input placeholder="最多三个字" v-model="authorityExplain" type="text" maxlength="3" value=" {{ authorityExplain }}">
                                 </div>
                            </div>
                        </div>


                        <h3>职业描述</h3>


                        <div class="control-group">
                            <label class="control-label">从业年限 :</label>
                            <div class="controls">
                                <input type="number" value=" {{ workYears }}" v-model="workYears" :disabled="isForMarketCheck"> 年
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">累计个案 :</label>
                            <div class="controls">
                                <input type="number" value="{{ caseHours }}" v-model="caseHours" :disabled="isForMarketCheck"> 小时
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">受督导时间 :</label>
                            <div class="controls">
                                <input type="text" class="span11" placeholder="" v-model="supervisorTime" name="name" :disabled="isForMarketCheck">
                                小时
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">个人经历 :</label>
                            <div class="controls">
                                <textarea v-model="brief" name="brief" cols="100" rows="10" :disabled="isForMarketCheck"></textarea>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">咨询方式 :</label>
                            <div class="controls">
                                <textarea v-model="workWay" cols="100" rows="5" :disabled="isForMarketCheck"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">咨询流派 :</label>
                            <div class="controls">
                                <textarea v-model="consultGenre" cols="100" rows="2" :disabled="isForMarketCheck"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">擅长方向 :</label>
                            <div class="controls">
                                <textarea v-model="goodDirection" cols="100" rows="5" :disabled="isForMarketCheck"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">咨询风格 :</label>
                            <div class="controls">
                                <textarea v-model="consultStyle" cols="100" rows="2" :disabled="isForMarketCheck"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">咨询对象 :</label>
                            <div class="controls">
                                <ul>
                                    <template v-if="!isForMarketCheck">
                                        <li class="shan-item" :class="{selected: consultObject.indexOf(item.tgid) !== -1}"
                                            v-for="item of consultObjectList" v-text="item.typeName" @click="selectTagObject(item)"></li>
                                    </template>
                                    <template v-else>
                                        <li class="shan-item" :class="{selected: consultObject.indexOf(item.tgid) !== -1}"
                                            v-for="item of consultObjectList" v-text="item.typeName"></li>
                                    </template>

                                </ul>
                            </div>
                        </div>

                         <h3>审核填写区</h3>

                        <div class="control-group">
                            <label class="control-label">评级 :</label>
                            <div class="controls">
                                <!-- <select v-model="sex" name="sex"> -->
                                <select v-model="grade" :disabled="isForMarketCheck">
                                    <option value="A+">A+</option>
                                    <option value="A">A</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B">B</option>
                                    <option value="B-">B-</option>
                                    <option value="C+">C+</option>
                                    <option value="C">C</option>
                                    <option value="C-">C-</option>
                                    <option value="D+">D+</option>
                                    <option value="D">D</option>
                                    <option value="D-">D-</option>
                                    <option value="E">E</option>
                                    <option value="NO">No</option>
                                    <option value="J">J</option>
                                    <option value="未评级">未评级</option>
                                </select>
                            </div>
                        </div>



                         <div class="control-group">
                            <label class="control-label">面试人 :</label>
                            <div class="controls">
                                <input type="text" value="{{ interviewer }}" v-model="interviewer" :disabled="isForMarketCheck">
                            </div>
                        </div>
                         <div class="control-group">
                            <label class="control-label">面试时间 :</label>
                            <div class="controls">
                                <input type="date" value="{{ interviewTime }}" v-model="interviewTime" :disabled="isForMarketCheck">
                            </div>
                        </div>
                         <!-- <div class="control-group">
                            <label class="control-label">工作经历 :</label>
                            <div class="controls">
                                <input type="text" value="{{ gongzuojingli }}" v-model="gongzuojingli">
                            </div>
                        </div> -->
                         <div class="control-group">
                            <label class="control-label">个人体验时数 :</label>
                            <div class="controls">
                                <input type="text" value="{{ experienceHours }}" v-model="experienceHours" :disabled="isForMarketCheck">
                            </div>
                        </div>
                         <div class="control-group">
                            <label class="control-label">可提供咨询时间 :</label>
                            <div class="controls">
                                <!-- <input type="text" value="{{ consultTime }}" v-model="consultTime"> -->
                                <input type="text" value="{{ timeConsulting }}" v-model="timeConsulting" :disabled="isForMarketCheck">
                            </div>
                        </div>
                         <div class="control-group">
                            <label class="control-label">参考价格 :</label>
                            <div class="controls">
                                <input type="text" value="{{ priceReference }}" v-model="priceReference" :disabled="isForMarketCheck">
                            </div>
                        </div>
                         <div class="control-group">
                            <label class="control-label">个案例子 :</label>
                            <div class="controls">
                                <!-- <input type="text" value="{{ geanExample }}" v-model="geanExample"> -->
                                <textarea v-model="individualCase" cols="100" rows="10" :disabled="isForMarketCheck"></textarea>
                            </div>
                        </div>
                         <div class="control-group">
                            <label class="control-label">评价 :</label>
                            <div class="controls">
                                <!-- <input type="text" value="{{ pingjia }}" v-model="pingjia"> -->
                                 <textarea v-model="evaluate" cols="100" rows="2" :disabled="isForMarketCheck"></textarea>
                            </div>
                        </div>
                         <div class="control-group">
                            <label class="control-label">备注 :</label>
                            <div class="controls">
                               <!--  <input type="text" value="{{ beizhu }}" v-model="beizhu"> -->
                               <textarea v-model="remarks" cols="100" rows="2" :disabled="isForMarketCheck"></textarea>
                            </div>
                        </div>
                         <div class="control-group">
                            <label class="control-label">特别注意 :</label>
                            <div class="controls">
                                <!-- <select v-model="sex" name="sex"> -->
                                <select v-model="mind" :disabled="isForMarketCheck">
                                    <option value="无">无</option>
                                    <option value="伦理有问题">伦理有问题</option>
                                    <option value="专业性需考察">专业性需考察</option>
                                    <option value="不了解情况">不了解情况</option>
                                    <option value="违反平台规则">违反平台规则</option>
                                </select>
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
                                <qiniu event-name="avatar" :aa="1" :blob="avatarBlob" :defaultimg="avatar"
                                       @change="avatarChange"></qiniu>
                            </div>
                        </div> -->


                        <div class="form-actions">
                            <template v-if="!isForMarketCheck">
                                <!--  <button type="button" class="btn btn-success" @click="btnUpload">保存</button> -->
                                <span v-if="pLevel === 0">专业咨询师</span>
                                <button type="button" class="btn btn-success" @click="saveForP" v-if="pLevel === 1"
                                        style="margin:0 10px;">修改为专业咨询师
                                </button>

                                <span v-if="pLevel === 1">轻咨询师</span>
                                <button type="button" class="btn btn-success" @click="saveForQ" v-if="pLevel === 0"
                                        style="margin:0 10px;">修改为轻咨询师
                                </button>

                                <!-- <button type="button" class="btn btn-warning" @click="saveForB">不通过</button> -->
                                <button type="button" class="btn btn-success" style="margin-left: 20px" @click="btnUpload"
                                        v-if="isEdit">保存
                                </button>
                            </template>
                            <template v-else>
                                <div style="width: 100%; display: flex;justify-content: center;">
                                    <button type="button" class="btn btn-success" style=" width: 200px;" @click="returnFn"
                                    >返回
                                    </button>
                                </div>

                            </template>

                        </div>
                    </div>
                </div>
            </div>

            <image-clip :url="imageClipURL" :rate="rate" @cancel="cancelImageClip" @cropComplete="cropComplete"
                        @ccc="ccc"></image-clip>
        </div>

        <!-- 点击编辑手机号 -->
        <!-- start 编辑手机号 -->
        <div class="dialog-wrapper" v-if="changePhonenumberStatus">
            <div class="dialog-container" style="width:500px;">
                <h4 style="margin-bottom: 20px;font-size: 30px; color:red;">编辑专家手机号</h4>
                <span>请输入新的专家手机号：</span>
                <input type="number" name="" oninput="if(value.length>5)value=value.slice(0,11)"
                       v-model="newMobilePhone">
                <div class="btn-wrapper">
                    <div @click="changePhonenumberStatus = false">取消</div>
                    <div @click="confirmReverse">确定</div>
                </div>
            </div>
        </div>
        <!-- end 编辑手机号 -->

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

    import imageClip from "components/image-clip"

    export default {
        data() {
            return {
                piid: window.location.pathname.split('/')[2],
                audioPre: `https://${process.env.NODE_ENV =='production' ? "file.120xinmao.com/" : "oml9gawrn.qnssl.com/" }`,

                nickname: '',
                realName: '',
                sex: '',
                wxAccount: '',
                mobilePhone: '',
                ltid: '',
                brief: '',
                pLevel: '',
                workYears: '',
                caseHours: '',
                // 语音处理
                voiceProfile: "",
                voiceProfileLenth: "",
                childrenIndex: "",
                currentIndex: "",
                yuyinbofang: "",

                avatar: '', //头像相对路径
                candidPhoto: '', //生活处理照相对路径
                photoCertificationDealtRel: '', //资格证照隐私处理相对路径
                photoIdentityCardDealtRel: '', //身份证照隐私处理相对路径
                authorityPicture: '',

                infoChannel: '',
                referrer: '',
                referrerWechat: '',

                pLevel: 0,
                advantage: "",
                shan: [],
                supervisorTime: "",

                childrenIndex: "",
                currentIndex: '',

                selectList: [],
                shanList: [],
                shanTagList: [],
                files: '',

                isEdit: false,

                rate: 1,
                imageClipURL: null,

                avatarBlob: null,
                candidPhotoBlob: null,
                changeId: null,


                // 修改手机号
                changePhonenumberStatus: false,
                newMobilePhone: '',

                // 1.2新增字段
                birthday: '', // 生日
                certificationNo: '', // 资格证编号
                idCardNo: '', // 身份证编号
                proBackground: '', // 职业背景
                authorityExplain: '', //  权威资质证书应用标签

                school: '', //学校
                major: '', //专业
                degree: '', //学位
                location: '', //城市
                xmTrainingTimes: 0, //参加心猫培训次数



                workWay: "",
                consultGenre: "",
                goodDirection: "",
                consultStyle: "",
                consultObject: [],
                consultObjectList: [],

                trainBackground: "",
                nstart: "",
                nend: "",

                grade: "",
                interviewer: "",
                interviewTime: "",
                experienceHours: "",
                timeConsulting: "",

                priceReference: "",
                individualCase: "",
                evaluate: "",
                remarks: "",
                mind: "",

                // 图片预览功能
                previewPictureStatus: false,
                viewsImg: "",
                imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,

                //gongzuojingli: "",

                // 新增需求专门为销售做查看功能，因为此页面改动比较频繁，新加的功能要求于此页面字段完全一样，所以不再新开页面，只在此页面做区分
                // 新增字段 isForMarketCheck
                isForMarketCheck: "",


            }
        },
        watch: {
            birthday(value) {
                console.log(value)
                if (value.trim().length != 10) {
                    alert("请输入正确的生日，格式为“2000/01/01” ")
                }
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
            'imgParameter': function (obj, eventName) {
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

                // 1.2辅助变量移除
                delete registerData.rate
                delete registerData.imageClipURL
                delete registerData.avatarBlob
                delete registerData.candidPhotoBlob
                delete registerData.changeId
                delete registerData.changePhonenumberStatus
                delete registerData.newMobilePhone


                registerData.mid = registerData.piid
                registerData.ids = JSON.stringify(registerData.shanTagList)
                registerData.consultTarget = JSON.stringify(registerData.consultObject)

                if (!registerData.nickname) {
                    alert("姓名" + "不能为空！")
                    return
                }


                // if (!registerData.sex) {
                //     alert("性别" + "不能为空！")
                //     return
                // }

                if (!registerData.birthday || registerData.birthday.trim().length != 10) {
                    alert("请输入正确的生日，格式为“2000/01/01”！")
                    return
                }

                if (!registerData.mobilePhone) {
                    alert("手机号" + "不能为空！")
                    return
                }

                if (!registerData.wxAccount) {
                    alert("微信号" + "不能为空！")
                    return
                }

                if (!registerData.location) {
                    alert("城市" + "不能为空！")
                    return
                }

                if (!registerData.school) {
                    alert("毕业学校" + "不能为空！")
                    return
                }

                if (!registerData.major) {
                    alert("专业" + "不能为空！")
                    return
                }

                if (!registerData.degree) {
                    alert("学历" + "不能为空！")
                    return
                }



                // if (!registerData.proBackground && registerData.proBackground !== 0) {
                //     alert("职业背景" + "不能为空！")
                //     return
                // }


                // if (!registerData.sex && registerData.sex !== 0) {
                //     alert("性别" + "不能为空！")
                //     return
                // }

                // if (!registerData.ltid && registerData.sex !== 0) {
                //     alert("执照类型" + "不能为空！")
                //     return
                // }

                if (!registerData.workYears && registerData.workYears !== 0) {
                    alert("从业年限" + "不能为空！")
                    return
                }


                if (!registerData.caseHours && registerData.caseHours !== 0) {
                    alert("累计个案" + "不能为空！")
                    return
                }


                if (!registerData.supervisorTime && registerData.supervisorTime !== 0) {
                    alert("受督导时间" + "不能为空！")
                    return
                }

                if (!registerData.certificationNo && registerData.certificationNo !== 0) {
                    alert("资格证编号" + "不能为空！")
                    return
                }

                if (!registerData.photoCertificationDealtRel && registerData.photoCertificationDealtRel !== 0) {
                    alert("请上传资格证图片")
                    return
                }

                if (!registerData.idCardNo && registerData.idCardNo !== 0) {
                    alert("身份证编号" + "不能为空！")
                    return
                }

                if (!registerData.photoIdentityCardDealtRel && photoIdentityCardDealtRel.idCardNo !== 0) {
                    alert("请上传身份证图片")
                    return
                }

                if (!registerData.brief && registerData.brief !== 0) {
                    alert("个人经历" + "不能为空！")
                    return
                }

                if (!registerData.avatar && registerData.avatar !== 0) {
                    alert("请上传头像图片！")
                    return
                }


                // if (!registerData.candidPhoto && registerData.candidPhoto !== 0) {
                //     alert("请上传职业照图片！")
                //     return
                // }

                if (!registerData.advantage && registerData.advantage !== 0) {
                    alert("个人优势" + "不能为空！")
                    return
                }

                // 检验日期格式是否正确

                registerData.birthday = registerData.birthday + " 00:00:00"


                // string与number转换
                if (registerData.xmTrainingTimes) {
                    registerData.xmTrainingTimes = parseFloat(registerData.xmTrainingTimes)
                } else {
                    registerData.xmTrainingTimes = 0
                }
                // registerData.xmTrainingTimes = parseFloat(registerData.xmTrainingTimes)


                // console.log(registerData)
                // if (value === 1) {
                //     registerData.pLevel = 1
                // } else {
                //     registerData.pLevel = 0
                // }
                console.log("registerData", registerData)

                let params = this.serialize(registerData)

                console.log("params:", params)

                let data = await getResponses("Psychor/updateMember.json", serialize(registerData))
                if (data.code == 0) {
                    this.shenhe()

                    return 'ok'
                    //location.reload()
                    //location.href = "/expertsIn"
                    //this.$route.router.go("/expertsIn")
                } else {
                    alert(data.msg)
                }

            },
            selectTag(item) {
                const id = item.tagId

                if (this.shanTagList.indexOf(id) !== -1) {
                    this.shanTagList.forEach((item, i, arr) => {
                        if (id === item) {
                            arr.splice(i, 1)
                        }
                    })

                    item.isPicked = 0
                } else {
                    if (this.shanTagList.length === 3) {
                        alert("只能选择三个标签")

                        return
                    }

                    this.shanTagList.push(id)

                    item.isPicked = 1
                }
            },

            selectTagObject(item) {
                const id = item.tgid

                if (this.consultObject.indexOf(id) !== -1) {
                    this.consultObject.forEach((item, i, arr) => {
                        if (id === item) {
                            arr.splice(i, 1)
                        }
                    })

                } else {
                    if (this.consultObject.length === 3) {
                        alert("只能选择三个标签")

                        return
                    }

                    this.consultObject.push(id)
                }
            },

            makeSureIsTrueFn(a, b) {
                console.log("one", typeof a, a, b)
                if (a || a == 0) {
                    b = a
                    console.log("two", typeof a, a, b)
                }
            },

            async getPsychoInfoByKey() {
                const params = {
                    id: this.piid
                }
                let data = await getResponses("Psychor/getMember.json", serialize(params))


                if (data.code == 0) {

                    let list = data.psychoDTO

                    // this.nickname = list.nickname
                    // this.sex = list.sex
                    // this.wxAccount = list.wxAccount
                    // this.mobilePhone = list.mobilePhone
                    // this.ltid = list.ltid
                    // this.brief = list.brief
                    // this.pLevel = list.pLevel
                    // this.workYears = list.workYears
                    // this.caseHours = list.caseHours
                    // this.time  = list.supervisorTime
                    // this.advantage  = list.advantage
                    // this.shanList  = list.psychoTags

                    if (list.nickname || list.nickname == 0) {
                        this.nickname = list.nickname
                    }

                    if (list.realName || list.realName == 0) {
                        this.realName = list.realName
                    }

                    if (list.sex || list.sex == 0) {
                        this.sex = list.sex
                    }

                    if (list.wxAccount || list.wxAccount == 0) {
                        this.wxAccount = list.wxAccount
                    }

                    if (list.mobilePhone || list.mobilePhone == 0) {
                        this.mobilePhone = list.mobilePhone
                    }

                    if (list.ltid || list.ltid == 0) {
                        this.ltid = list.ltid
                    }

                    if (list.brief || list.brief == 0) {
                        this.brief = list.brief
                    }

                    if (list.pLevel || list.pLevel == 0) {
                        this.pLevel = list.pLevel
                    }

                    if (list.workYears || list.workYears == 0) {
                        this.workYears = list.workYears
                    }

                    if (list.authorityExplain || list.authorityExplain == 0) {
                        this.authorityExplain = list.authorityExplain
                    }


                    if (list.caseHours || list.caseHours == 0) {
                        this.caseHours = list.caseHours
                    }

                    if (list.supervisorTime || list.supervisorTime == 0) {
                        this.supervisorTime = list.supervisorTime
                    }

                    if (list.advantage || list.advantage == 0) {
                        this.advantage = list.advantage
                    }

                    this.shanList = list.psychoTags
                    // 语音
                    this.voiceProfile = list.voiceProfile
                    this.voiceProfileLenth = list.voiceProfileLenth



                    this.shanList.forEach((item) => {
                        if (item.isPicked) {
                            this.shanTagList.push(item.tagId)
                        }
                    })

                    this.avatar = list.avatar

                    this.candidPhoto = list.candidPhoto

                    this.photoCertificationDealtRel = list.photoCertificationDealtRel

                    this.photoIdentityCardDealtRel = list.photoIdentityCardDealtRel
                    this.authorityPicture = list.authorityPicture


                    if (list.infoChannel || list.infoChannel == 0) {
                        this.infoChannel = list.infoChannel
                    }

                    if (list.referrer || list.referrer == 0) {
                        this.referrer = list.referrer
                    }

                    if (list.referrerWechat || list.referrerWechat == 0) {
                        this.referrerWechat = list.referrerWechat
                    }


                    // 1.2新增-------------------------------------------start


                    if (list.birthday || list.birthday == 0) {
                        this.birthday = list.birthday.trim().split(" ")[0]
                    }

                    if (list.certificationNo || list.certificationNo == 0) {
                        this.certificationNo = list.certificationNo
                    }

                    if (list.idCardNo || list.idCardNo == 0) {
                        this.idCardNo = list.idCardNo
                    }

                    if (list.proBackground || list.proBackground == 0) {
                        this.proBackground = list.proBackground
                    }


                    if (list.school || list.school == 0) {
                        this.school = list.school
                    }

                    if (list.major || list.major == 0) {
                        this.major = list.major
                    }

                    if (list.degree || list.degree == 0) {
                        // this.degree = list.degree
                        this.degree = list.degree
                    }

                    if (list.location || list.location == 0) {
                        this.location = list.location
                    }

                    if (list.xmTrainingTimes || list.xmTrainingTimes == 0) {
                        this.xmTrainingTimes = list.xmTrainingTimes
                    }


                    // 1.2新增-----------------------------------------------end


                    this.workWay = list.workWay
                    this.consultGenre = list.consultGenre
                    this.goodDirection = list.goodDirection
                    this.consultStyle = list.consultStyle
                    this.consultObject = list.consultTargetList.map((item) => item.tgid)
                    //this.consultObjectList = list.consultTargetList

                    this.trainBackground = list.trainBackground
                    // this.nstart = list.learnStartEnd.split("-")[0]
                    // this.nend = list.learnStartEnd.split("-")[1]



                    if (data.audit) {
                        this.grade = data.audit.grade
                        this.interviewer = data.audit.interviewer
                        if (data.audit.interviewTime) {
                            this.interviewTime = data.audit.interviewTime.split(' ')[0]
                        }
                        //this.gongzuojingli = list.mobilePhone
                        this.experienceHours = data.audit.experienceHours
                       if (data.audit.timeConsulting) {
                         this.timeConsulting = data.audit.timeConsulting.split(' ')[0]
                       }
                        this.priceReference = data.audit.priceReference
                        this.individualCase = data.audit.individualCase
                        this.evaluate = data.audit.evaluate
                        this.remarks = data.audit.remarks
                        this.mind = data.audit.mind
                    }

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
                let params = `mid=${this.$route.params.id}&pLevel=0`

                this.auditPsychoInfo(params)
            },
            saveForQ() {
                let params = `mid=${this.$route.params.id}&pLevel=1`

                this.auditPsychoInfo(params)
            },
            saveForB() {
                let params = `auditStatus=2&piid=${this.$route.params.id}`

                this.auditPsychoInfo(params)
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
                if (this.changeId === 1) {
                    this.avatarBlob = blob
                } else if (this.changeId === 2) {
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

            confirmReverse() {

                this.mobilePhone = this.newMobilePhone

                this.changePhonenumberStatus = false

                this.newMobilePhone = ""
            },

            async getConsultObjectList() {
                const data = await getResponses("Tag/obtainTargetTags.json", serialize({type: 1}), '/depression-api/')

                if (data.code === 0) {
                    this.consultObjectList = data.targetTags

                    return
                }

                this.$toast(data.msg)
            },
            async shenhe() {
                // if (! this.experienceHours) {
                //     alert('个人体验时数是必填')

                //     return
                // }

                const options = {
                    psychoId: this.piid,
                }

                if (this.evaluate) {
                    options.evaluate = this.evaluate
                }

                if (this.experienceHours) {
                    options.experienceHours = this.experienceHours
                }

                if (this.grade) {
                    options.grade = this.grade
                }

                if (this.individualCase) {
                    options.individualCase = this.individualCase
                }

                if (this.interviewTime) {
                    options.interviewTime = this.interviewTime
                }

                if (this.interviewer) {
                    options.interviewer = this.interviewer
                }

                if (this.mind) {
                    options.mind = this.mind
                }

                if (this.priceReference) {
                    options.priceReference = this.priceReference
                }

                if (this.remarks) {
                    options.remarks = this.remarks
                }

                if (this.timeConsulting) {
                    options.timeConsulting = this.timeConsulting
                }


                const params = new URLSearchParams(options)

                const data = await getResponses('audit/insertAudit.json', params)

                if (data.code === 0) {
                    location.href = "/expertsIn"

                    return 'ok'
                }

                alert(data.msg)
            },
            // async saveOK() {
            //     await this.btnUpload()
            //     await this.shenhe()

            //     location.href = "/expertsIn"

            // },
             // 预览
            btnViews(img, e) {
                if (e.target.tagName !== 'IMG') {
                    return
                }

                this.viewsImg = ""

                this.viewsImg = img

                this.previewPictureStatus = true

            },

            returnFn() {
                this.$dispatch('child-msg', "")
                this.$route.router.go("/counselorShow")
            }

        },
        ready() {
            this.getLicenseTypeList()
            setTimeout(() => {
                this.getPsychoInfoByKey()
            })


            this.getConsultObjectList()
            this.isEdit = location.search.slice(1).indexOf("edit") !== -1

            this.isForMarketCheck = location.search.slice(1).indexOf("show") !== -1

        }

    }
</script>
