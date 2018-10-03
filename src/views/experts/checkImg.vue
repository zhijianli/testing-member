<style scoped>
.check-wrapper .btn-info {
    display: none;
}
.form-horizontal .control-group .controls form {
    display: inline-block;
}

.checkImgWrap {
    /* vertical-align: bottom; */
    display: flex;
    align-items: flex-end;


}
.checkImgContent {
    width: 150px;
    height: 100px;
    background-color: green;
    cursor: pointer;
}

.checkImgBox {
    width: 150px;
    height: 100px;
    position: relative;
    margin-left: 20px;

}

.checkImgBoxMasking {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 20px;
    background-color: gray;
    text-align: center;
    line-height: 20px;
    opacity: 0.8;
    color: white;
}

.previewPictureBox {
    display: inline-block;
    width: 150px;
    height: 100px;
    cursor: pointer;
    /* border: 1px solid ; */
}

.check-ok-wrapper {
    display: inline-flex;
}
.check-ok-item {
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;

    margin-right: 30px;
    cursor: pointer;
    color: #169BD5;
    background-color:  white;
    margin: 0 10px;
}
.check-ok-item:hover {
    color: white;
    background-color:  rgb(79, 84, 103);
}
.headReview {
    background-image: url("../../images/u16.png");
    background-repeat: no-repeat;
    width: 50px;
    height: 30px;
    position: relative;
    top: -31px;
    left: 7px;
}
.headReviewOne {
    background-image: url("../../images/u16.png");
    background-repeat: no-repeat;
    width: 50px;
    height: 30px;
    float: left;
    display: inline-block;
    margin-top: 3px;
}
.headReviewTwo {
    background-image: url("../../images/u12.png");
    background-repeat: no-repeat;
    width: 50px;
    height: 30px;
    margin-top: 3px;
}
.yearReview {
    background-image: url("../../images/u16.png");
    background-repeat: no-repeat;
    width: 50px;
    height: 30px;
    display: inline-block;
    float: left;
    margin-left: 13px;
    margin-top: 3px;
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
                            <div class="controls checkImgWrap">
                                <!-- <qiniu event-name="candidPhoto" :defaultimg="candidPhoto"></qiniu> -->
                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ avatar " @click="btnViews(avatar)"/>
                                </div>
                                <div v-if="+ user.avatarAudit === 1" class="check-ok-wrapper">
                                <div class="headReview" style="margin-left: 10px;margin-top: 71px;"></div>
                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ newAvatar " @click="btnViews(newAvatar)"/>
                                </div>
                                <span class="check-ok-item" @click="checkFor('头像', 'avatar', 2)" style="margin-top: 70px;">合格</span>
                                <span class="check-ok-item" @click="checkFor('头像', 'avatar', 4)" style="margin-top: 70px;">不合格</span>
                                </div>

                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 姓名 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="nickname" name="name">
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
                                <input style="width:170px;float: left;" disabled v-model="birthday"  class="input myInput" size="20" type="date"  placeholder="请输入出生年月日">
                                <div v-if="user.birthdayAudit === 1" class="check-ok-wrapper">
                                <div class="headReviewOne" style="margin-left: 10px;"></div>
                                <input style="width:170px;" disabled v-model="newBirthday"  class="input myInput" size="20" type="date"  placeholder="请输入出生年月日">

                                    <span class="check-ok-item" @click="checkFor('生日', 'birthday', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('生日', 'birthday', 4)">不合格</span>
                                </div>
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
                        <div class="control-group">
                            <label class="control-label"> 城市 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="location" style="float: left;">
                                <div v-if="user.locationAudit === 1" class="check-ok-wrapper">
                                <div class="headReviewOne" style="margin-left: 10px;"></div>
                                <input type="text" disabled class="span11" placeholder="" v-model="newLocation" style="float: left;">
                                    <span class="check-ok-item" @click="checkFor('城市', 'location', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('城市', 'location', 4)">不合格</span>
                                </div>
                            </div>
                        </div>


                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label"> 毕业学校 :</label>
                            <div class="controls">
                              <input type="text" disabled class="span11" placeholder="" v-model="school" style="float: left;">
                              <div v-if="user.schoolAudit === 1" class="check-ok-wrapper">
                              <div class="headReviewOne" style="margin-left: 10px;"></div>
                              <input type="text" disabled class="span11" placeholder="" v-model="newSchool">

                                    <span class="check-ok-item" @click="checkFor('毕业院校', 'school', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('毕业院校', 'school', 4)">不合格</span>
                                </div>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label"> 专业 :</label>
                            <div class="controls">
                              <input type="text" disabled class="span11" placeholder="" v-model="major" style="float: left;">
                              <div v-if="user.majorAudit === 1" class="check-ok-wrapper">
                              <div class="headReviewOne" style="margin-left: 10px;"></div>
                              <input type="text" disabled class="span11" placeholder="" v-model="newMajor">

                                    <span class="check-ok-item" @click="checkFor('专业', 'major', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('专业', 'major', 4)">不合格</span>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 学历 :</label>
                            <div class="controls">
                              <input type="text" disabled class="span11" placeholder="" v-model="degree" style="float: left;">
                              <div v-if="user.degreeAudit === 1" class="check-ok-wrapper">
                              <div class="headReviewOne" style="margin-left: 10px;"></div>
                              <input type="text" disabled class="span11" placeholder="" v-model="newDegree">

                                    <span class="check-ok-item" @click="checkFor('学历', 'degree', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('学历', 'degree', 4)">不合格</span>
                                </div>
                            </div>
                        </div>
                       <!--  <div class="control-group">
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
                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label">职业背景 :</label>
                            <div class="controls">
                                <select v-model="proBackground" name="proBackground" disabled>
                                    <option :value="1">全职</option>
                                    <option :value="2">兼职</option>
                                </select>

                                <div v-if="user.proBackgroundAudit === 1" class="check-ok-wrapper">
                                    <span class="check-ok-item" @click="checkFor('职业背景', 'proBackground', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('职业背景', 'proBackground', 4)">不合格</span>
                                </div>
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
                                <select value="{{ ltid }}" v-model="ltid" name="ltid" disabled>
                                    <option v-for="item of selectList" value="{{ item.ltid }}">{{ item.licenseName }}</option>
                                </select>

                               <!--  <div v-if="isAvatarAudit === 1" class="check-ok-wrapper">
                                    <span class="check-ok-item" @click="checkFor('资质', 0, 1)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('资质', 0, 2)">不合格</span>
                                </div> -->
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
                                <div v-if="user.advantageAudit === 1" class="check-ok-wrapper" style="display:inherit;">
                                <div class="headReviewTwo" style="margin-left: 10px;"></div>
                                <textarea v-model="newAdvantage" disabled name="brief" cols="100" rows="2" placeholder="请输入不低于20个字的描述"></textarea>


                                    <span class="check-ok-item" @click="checkFor('个人优势', 'advantage', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('个人优势', 'advantage', 4)">不合格</span>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">受训背景 :</label>
                            <div class="controls">
                                <textarea v-model="trainBackground" disabled name="brief" cols="100" rows="10" placeholder="请输入不低于20个字的描述"></textarea>
                                <div v-if="user.trainBackgroundAudit === 1" class="check-ok-wrapper" style="display:inherit;">
                                <div class="headReviewTwo" style="margin-left: 10px;"></div>
                                <textarea v-model="newTrainBackground" disabled name="brief" cols="100" rows="10" placeholder="请输入不低于20个字的描述"></textarea>


                                    <span class="check-ok-item" @click="checkFor('受训背景', 'trainBackground', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('受训背景', 'trainBackground', 4)">不合格</span>
                                </div>

                            </div>
                        </div>


                        <!-- start 1.1版本新增 -->
                        <!-- <div class="control-group">
                            <label class="control-label">参加心猫培训次数 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" name="xmTrainingTimes" v-model="xmTrainingTimes">
                                次
                            </div>
                        </div> -->
                        <!-- end  1.1版本新增 -->

                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label">资格证编号 :</label>
                            <div class="controls">
                                <input type="text" style="width: 250px;float: left;" disabled  class="span11" placeholder="" v-model="certificationNo" name="certificationNo">
                                <div v-if="user.certificationNoAudit === 1" class="check-ok-wrapper">
                                <div class="headReviewOne" style="margin-left: 10px;"></div>
                                <input type="text" style="width: 250px" disabled  class="span11" placeholder="" v-model="newCertificationNo" name="newCertificationNo" >

                                    <span class="check-ok-item" @click="checkFor('资格证编号', 'certificationNo', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('资格证编号', 'certificationNo', 4)">不合格</span>
                                </div>

                            </div>
                        </div>
                        <!-- end  1.1版本新增 -->


                        <div class="control-group">
                            <label class="control-label">资格证 :</label>
                            <div class="controls">
                                <!-- <qiniu event-name="photoCertificationDealtRel" :defaultimg="photoCertificationDealtRel"></qiniu> -->
                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ photoCertificationDealtRel " @click="btnViews(photoCertificationDealtRel)"/>
                                </div>
                                <div v-if="user.photoCertificationDealtRelAudit === 1" class="check-ok-wrapper" style="display: inline-block;">

                                <div class="yearReview" style="margin-top: 40px;"></div>
                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ newPhotoCertificationDealtRel " @click="btnViews(newPhotoCertificationDealtRel)"/>
                                </div>

                                    <span class="check-ok-item" @click="checkFor('资格证', 'photoCertificationDealtRel', 2)" style="margin-top: 69px;">合格</span>
                                    <span class="check-ok-item" @click="checkFor('资格证', 'photoCertificationDealtRel', 4)" style="margin-top: 69px;">不合格</span>
                                </div>
                            </div>
                        </div>

                        <!-- start 1.1版本新增 -->
                        <div class="control-group">
                            <label class="control-label">身份证编号 :</label>
                            <div class="controls">
                                <input type="text" style="width: 250px;float: left;" disabled  class="span11" placeholder="" v-model="idCardNo" name="idCardNo">
                                <div v-if="user.idCardNoAudit === 1" class="check-ok-wrapper">
                                <div class="headReviewOne" style="margin-left: 10px;"></div>
                                <input type="text" style="width: 250px" disabled  class="span11" placeholder="" v-model="newIdCardNo" name="newIdCardNo">

                                    <span class="check-ok-item" @click="checkFor('身份证编号', 'idCardNo', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('身份证编号', 'idCardNo', 4)">不合格</span>
                                </div>
                            </div>
                        </div>
                        <!-- end  1.1版本新增 -->

                        <div class="control-group">
                            <label class="control-label">身份证 :</label>
                            <div class="controls">
                                <!-- <qiniu event-name="photoIdentityCardDealtRel" :defaultimg="photoIdentityCardDealtRel"></qiniu> -->
                                <div class="previewPictureBox" >
                                    <img :src="imgPre +'/'+ photoIdentityCardDealtRel " @click="btnViews(photoIdentityCardDealtRel)"/>
                                </div>
                                <div v-if="user.photoIdentityCardDealtRelAudit === 1" class="check-ok-wrapper" style="display: inline-block;">
                                <div class="yearReview" style="margin-top: 40px;"></div>

                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ newPhotoIdentityCardDealtRel " @click="btnViews(newPhotoIdentityCardDealtRel)"/>
                                </div>

                                    <span class="check-ok-item" @click="checkFor('身份证', 'photoIdentityCardDealtRel', 2)" style="margin-top: 69px;">合格</span>
                                    <span class="check-ok-item" @click="checkFor('身份证', 'photoIdentityCardDealtRel', 4)" style="margin-top: 69px;">不合格</span>
                                </div>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">权威资质证书 :</label>
                            <div class="controls">
                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ authorityPicture " @click="btnViews(authorityPicture)"/>
                                </div>
                                <div v-if="user.authorityPictureAudit === 1" class="check-ok-wrapper;" style="display: inline-block;">
                                  <div class="yearReview" style="margin-top: 40px;"></div>
                                  <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ newAuthorityPicture " @click="btnViews(newAuthorityPicture)"/>
                                  </div>
                                    <span class="check-ok-item" @click="checkFor('权威资质证书', 'authorityPicture', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('权威资质证书', 'authorityPicture', 4)">不合格</span>
                                </div>
                                <div style="margin-left: -98px;margin-top: 17px;">
                                  应用展示标签：<input placeholder="最多三个字" v-model="authorityExplain" type="text" maxlength="3" disabled>
                                </div>
                            </div>
                        </div>

                        <h3>咨询经验</h3>

                        <div class="control-group">
                            <label class="control-label">从业年限 :</label>
                            <div class="controls">
                              <input type="number" disabled value=" {{ workYears }}" v-model="workYears" style="float:left;"> <span style="float:left;">年</span>
                                <div v-if="user.workYearsAudit === 1" class="check-ok-wrapper">
                                  <div class="yearReview"></div>
                                  <input type="number" disabled v-model="newWorkYears"> 年
                                  <span class="check-ok-item" @click="checkFor('从业年限', 'workYears', 2)">合格</span>
                                  <span class="check-ok-item" @click="checkFor('从业年限', 'workYears', 4)">不合格</span>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">累计个案 :</label>
                            <div class="controls">
                                <input type="number" disabled value="{{ caseHours }}" v-model="caseHours" style="float: left;"><span style="float: left;"> 小时</span>
                                <div v-if="user.caseHoursAudit === 1" class="check-ok-wrapper">
                                <div class="headReviewOne" style="margin-left: 10px;"></div>
                                <input type="number" disabled value="{{ newCaseHours }}" v-model="newCaseHours"> 小时

                                    <span class="check-ok-item" @click="checkFor('累计个案', 'caseHours', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('累计个案', 'caseHours', 4)">不合格</span>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"> 受督导时间 :</label>
                            <div class="controls">
                                <input type="text" disabled class="span11" placeholder="" v-model="supervisorTime" name="name" style="float: left;"><span style="float: left;"> 小时</span>
                                <div v-if="user.supervisorTimeAudit === 1" class="check-ok-wrapper">
                                <div class="headReviewOne" style="margin-left: 10px;"></div>
                                <input type="text" disabled class="span11" placeholder="" v-model="newSupervisorTime" name="name"> 小时

                                    <span class="check-ok-item" @click="checkFor('受督导时间', 'supervisorTime', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('受督导时间', 'supervisorTime', 4)">不合格</span>
                                </div>
                            </div>
                        </div>


                        <div class="control-group">
                            <label class="control-label">个人经历 :</label>
                            <div class="controls">
                                <textarea v-model="brief" disabled cols="100" rows="10"></textarea>
                                <div v-if="user.briefAudit === 1" class="check-ok-wrapper" style="display:inherit;">
                                  <div class="headReviewTwo" style="margin-left: 10px;"></div>
                                  <textarea v-model="newBrief" disabled cols="100" rows="10"></textarea>
                                  <span class="check-ok-item" @click="checkFor('个人经历', 'brief', 2)">合格</span>
                                  <span class="check-ok-item" @click="checkFor('个人经历', 'brief', 4)">不合格</span>
                                </div>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">咨询方式 :</label>
                            <div class="controls">
                                <textarea v-model="workWay" disabled cols="100" rows="5"></textarea>
                                <div v-if="user.workWayAudit === 1" class="check-ok-wrapper" style="display:inherit;">
                                <div class="headReviewTwo" style="margin-left: 10px;"></div>
                                <textarea v-model="newWorkWay" disabled cols="100" rows="5"></textarea>

                                    <span class="check-ok-item" @click="checkFor('咨询方式', 'workWay', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('咨询方式', 'workWay', 4)">不合格</span>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">咨询流派 :</label>
                            <div class="controls">
                                <textarea v-model="consultGenre" disabled cols="100" rows="2"></textarea>
                                <div v-if="user.consultGenreAudit === 1" class="check-ok-wrapper" style="display:inherit;">
                                <div class="headReviewTwo" style="margin-left: 10px;"></div>
                                <textarea v-model="newConsultGenre" disabled cols="100" rows="2"></textarea>

                                    <span class="check-ok-item" @click="checkFor('咨询流派', 'consultGenre', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('咨询流派', 'consultGenre', 4)">不合格</span>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">擅长方向 :</label>
                            <div class="controls">
                                <textarea v-model="goodAtDirection" disabled cols="100" rows="5"></textarea>
                                <div v-if="user.goodDirectionAudit === 1" class="check-ok-wrapper" style="display:inherit;">
                                <div class="headReviewTwo" style="margin-left: 10px;"></div>
                                <textarea v-model="newGoodDirection" disabled cols="100" rows="5"></textarea>


                                    <span class="check-ok-item" @click="checkFor('擅长方向', 'goodDirection', 2)">合格</span>
                                    <span class="check-ok-item" @click="checkFor('擅长方向', 'goodDirection', 4)">不合格</span>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">咨询风格 :</label>
                            <div class="controls">
                                <textarea v-model="consultStyle" disabled cols="100" rows="2"></textarea>
                                <div v-if="user.consultStyleAudit === 1" class="check-ok-wrapper" style="display:inherit;">
                                <div class="headReviewTwo" style="margin-left: 10px;"></div>
                                <textarea v-model="newConsultStyle" disabled cols="100" rows="2"></textarea>
                                <span class="check-ok-item" @click="checkFor('咨询风格', 'consultStyle', 2)">合格</span>
                                <span class="check-ok-item" @click="checkFor('咨询风格', 'consultStyle', 4)">不合格</span>
                                </div>
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

                        <!-- <div class="control-group">
                            <label class="control-label">头像 :</label>
                            <div class="controls checkImgWrap">
                                <div class="previewPictureBox">
                                    <img :src="imgPre +'/'+ avatar " @click="btnViews(avatar)"/>
                                </div>

                                <div v-if="isAvatarAudit === 0" class="checkImgWrap">
                                    <div class="checkImgBox">
                                        <img :src="imgPre +'/'+ avatarAudit " @click="btnViews(avatarAudit)"  class="checkImgContent"/>
                                        <div class="checkImgBoxMasking">待审核</div>
                                    </div>


                                    <span class="checkImg-item" @click="avatarCheckPassFn">合格</span>
                                    <span class="checkImg-item" @click="avatarCheckRejectFn">不合格</span>

                                </div>

                            </div>
                        </div> -->



                        <div class="form-actions">
                            <button type="button" class="btn btn-success" @click="returnFn">返回</button>
                        </div>
                </div>
            </div>
        </div>


        <!-- 通用通过审核 -->
        <div class="dialog-wrapper" v-if="checkModalStatus">
            <div class="dialog-container">
                <h4>确定此{{checkName}}<span style="color:red;">{{checkNot === 4 ? "不" : ""}}</span>通过审核吗？</h4>
                <div class="btn-wrapper">
                    <div @click="checkModalStatus = false">取消</div>
                    <div @click="auditMemberPic(checkField, checkNot)">确定</div>
                </div>
            </div>
        </div>



        <!-- 头像未通过审核 -->
        <div class="dialog-wrapper" v-if="isCheckAvatarReject">
            <div class="dialog-container">
                <h4>确定此头像<span style="color:red;">不</span>通过审核吗？</h4>
                <div class="btn-wrapper">
                    <div @click="cancelToRejectAvatar">取消</div>
                    <div @click="auditMemberPic(1, 2)">确定</div>
                </div>
            </div>
        </div>


        <!-- 职业照通过审核 -->
        <div class="dialog-wrapper" v-if="isCheckLifePhotoPass">
            <div class="dialog-container">
                <h4>确定此职业照通过审核吗？</h4>
                <div class="btn-wrapper">
                    <div @click="cancelToPassLifePhoto">取消</div>
                    <div @click="auditMemberPic(2, 1)">确定</div>
                </div>
            </div>
        </div>

        <!-- 职业照未通过审核 -->
        <div class="dialog-wrapper" v-if="isCheckLifePhotoReject">
            <div class="dialog-container">
                <h4>确定此职业照<span style="color:red;">不</span>通过审核吗？</h4>
                <div class="btn-wrapper">
                    <div @click="cancelToRejectLifePhoto">取消</div>
                    <div @click="auditMemberPic(2, 2)">确定</div>
                </div>
            </div>
        </div>

        <!-- <div class="modal-backdrop in" v-if="views"></div>
        <div id="myAlert" class="modal" v-if="views">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                <h3>预览</h3>
            </div>
            <div class="modal-body">
                <img :src="imgPre + '/' + viewsImg" width="513">
            </div>
        </div>
         -->

        <!-- start 预览 -->
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
        <!-- end 预览 -->



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
                //imgPre:"http://oml9ntix5.qnssl.com",
                audioPre: `https://${process.env.NODE_ENV =='production' ? "file.120xinmao.com/" : "oml9gawrn.qnssl.com/" }`,
                piid: window.location.pathname.split('/')[2],
                nickname: '',
                sex: '',
                // 语音处理
                voiceProfile: "",
                voiceProfileLenth: "",
                childrenIndex: "",
                currentIndex: "",
                yuyinbofang: "",

                wxAccount: '',
                mobilePhone: '',
                location: '',
                newLocation: '',
                ltid: '',
                title: '',
                brief: '',
                newBrief: '',
                pLevel: '',
                workYears: '',
                newWorkYears: '',
                caseHours: '',
                newCaseHours: '',
                authorityExplain: '',
                // 语音
                voiceProfile: "",
                voiceProfileLenth: "",
                audioComWidth: "",
                yuyinbofang: "",
                currentIndex: "",
                childrenIndex: "",

                avatar: '', //头像相对路径
                newAvatar: '', //头像相对路径
                candidPhoto: '', //生活处理照相对路径
                photoCertificationDealtRel: '', //资格证照隐私处理相对路径
                newPhotoCertificationDealtRel: '',
                photoIdentityCardDealtRel: '', //身份证照隐私处理相对路径
                newPhotoIdentityCardDealtRel: '', //身份证照隐私处理相对路径
                authorityPicture: '',
                newAuthorityPicture: '',

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
                referrerWechat: '',

                pLevel: 0,
                advantage: "",
                newAdvantage: "",
                shan: [],
                supervisorTime: "",
                newSupervisorTime: "",


                selectList: [],
                shanList: [],
                shanTagList: [],
                files: '',

                isEdit: false,

                reverseStatus: false,
                reverseStatusNO: false,

                avatarAudit: "",
                candidPhotoAudit: "",

                // 头像审核
                // ----通过
                isCheckAvatarPass: false,
                avatarCheckPass: '',

                // ----不通过
                isCheckAvatarReject: false,
                avatarCheckReject: '',



                // 职业照审核
                // ----通过
                isCheckLifePhotoPass: false,
                lifePhotoCheckPass: '',

                // ----不通过
                isCheckLifePhotoReject: false,
                lifePhotoCheckReject: '',




                // 图片预览功能
                previewPictureStatus: false,
                viewsImg: "",

                // 判断是否有审核的头像或职业照(0:待审核 1:已通过 2:未通过)
                isAvatarAudit: -1,
                isCandidPhotoAudit: -1,

                // 1.2新增字段
                birthday: '', // 生日.
                newBirthday: '',
                certificationNo: '', // 资格证编号
                newCertificationNo: '',
                idCardNo: '', // 身份证编号
                newIdCardNo: '',
                proBackground: '', // 职业背景

                school: '', //学校
                newSchool: '',
                major: '', //专业
                newMajor: '',
                degree: '', //学位
                newDegree: '',
                city: '', //城市
                xmTrainingTimes: 0, //参加心猫培训次数

                nstart: "",
                nend: "",
                trainBackground: "",
                newTrainBackground: "",


                workWay: "",
                newWorkWay: "",
                consultGenre: "",
                newConsultGenre: "",
                goodAtDirection: "",
                newGoodDirection: "",
                consultStyle: "",
                newConsultStyle: "",
                consultObject: [],

                checkModalStatus: false,
                checkName: "",
                checkField: -1,
                checkNot: 1,
                brief: "",
                newBrief: "",

                user: {}

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




            async getPsychoInfoByKey() {
                const params = {
                    id: this.piid,
                }
                let data = await getResponses("Psychor/getMember.json", serialize(params))


                if (data.code == 0) {

                    let list = data.psychoDTO

                    this.nickname = list.nickname
                    this.sex = list.sex
                    this.wxAccount = list.wxAccount
                    this.mobilePhone = list.mobilePhone
                    this.location = list.location
                    this.newLocation = list.newLocation
                    this.ltid = list.ltid
                    this.title = list.title
                    this.brief = list.brief
                    this.newBrief = list.newBrief
                    this.pLevel = list.pLevel
                    this.workYears = list.workYears
                    this.newWorkYears = list.newWorkYears
                    console.log(this.newWorkYears);
                    // this.newWorkYears = parseInt(list.newWorkYears)
                    this.authorityExplain = list.authorityExplain
                    this.caseHours = list.caseHours
                    this.newCaseHours = list.newCaseHours
                    this.supervisorTime  = list.supervisorTime
                    this.newSupervisorTime  = list.newSupervisorTime
                    this.advantage  = list.advantage
                    this.newAdvantage  = list.newAdvantage
                    this.shanList  = list.psychoTags
                    // 语音
                    this.voiceProfile = list.voiceProfile
                    this.voiceProfileLenth = list.voiceProfileLenth


                    this.avatar = list.avatar
                    this.newAvatar = list.newAvatar
                    this.candidPhoto = list.candidPhoto
                    this.photoCertificationDealtRel = list.photoCertificationDealtRel
                    this.newPhotoCertificationDealtRel = list.newPhotoCertificationDealtRel
                    this.photoIdentityCardDealtRel = list.photoIdentityCardDealtRel
                    this.newPhotoIdentityCardDealtRel = list.newPhotoIdentityCardDealtRel
                    this.authorityPicture = list.authorityPicture
                    this.newAuthorityPicture = list.newAuthorityPicture




                    this.infoChannel = parseInt(list.infoChannel) ? parseInt(list.infoChannel) : ""
                    this.referrer = list.referrer
                    this.referrerWechat = list.referrerWechat
                    this.voiceProfile = list.voiceProfile
                    this.voiceProfileLenth = list.voiceProfileLenth

                    // 待审核头像和职业照
                    this.avatarAudit = list.avatarAudit
                    this.candidPhotoAudit = list.candidPhotoAudit

                    this.isAvatarAudit = list.isAvatarAudit
                    this.isCandidPhotoAudit = list.isCandidPhotoAudit

                    console.log(list.isAvatarAudit, list.isCandidPhotoAudit)



                    // 1.2新增-------------------------------------------start
                    if (list.birthday || list.birthday == 0) {
                        this.birthday = list.birthday.trim().split(" ")[0]
                    }

                    if (list.newBirthday || list.newBirthday == 0) {
                        this.newBirthday = list.newBirthday.trim().split(" ")[0]
                    }

                    if (list.certificationNo || list.certificationNo == 0) {
                        this.certificationNo = list.certificationNo
                    }

                    if (list.newCertificationNo || list.newCertificationNo == 0) {
                        this.newCertificationNo = list.newCertificationNo
                    }

                    if (list.idCardNo || list.idCardNo == 0) {
                        this.idCardNo = list.idCardNo
                    }

                    if (list.newIdCardNo || list.newIdCardNo == 0) {
                        this.newIdCardNo = list.newIdCardNo
                    }

                    if (list.proBackground || list.proBackground == 0) {
                        this.proBackground = list.proBackground
                    }


                    if (list.school || list.school == 0) {
                        this.school = list.school
                    }

                    if (list.newSchool || list.newSchool == 0) {
                        this.newSchool = list.newSchool
                    }

                    if (list.major || list.major == 0) {
                        this.major = list.major
                    }

                    if (list.newMajor || list.newMajor == 0) {
                        this.newMajor = list.newMajor
                    }

                    if (list.degree || list.degree == 0) {
                         this.degree = list.degree
                    }

                    if (list.newDegree || list.newDegree == 0) {
                         this.newDegree = list.newDegree
                    }

                    if (list.city || list.city == 0) {
                        this.city = list.city
                    }

                    if (list.xmTrainingTimes || list.xmTrainingTimes == 0) {
                        this.xmTrainingTimes = list.xmTrainingTimes
                    }


                    // 1.2新增-----------------------------------------------end


                    this.trainBackground = list.trainBackground
                    this.newTrainBackground = list.newTrainBackground
                    // this.nstart = list.learnStartEnd.split("-")[0]
                    // this.nend = list.learnStartEnd.split("-")[1]

                    this.workWay = list.workWay
                    this.newWorkWay = list.newWorkWay

                    this.consultGenre = list.consultGenre
                    this.newConsultGenre = list.newConsultGenre

                    this.goodAtDirection = list.goodDirection
                    this.newGoodDirection = list.newGoodDirection
                    this.consultStyle = list.consultStyle
                    this.newConsultStyle = list.newConsultStyle

                    this.consultObject = list.consultTargetList
                    this.brief  =list.brief
                    this.newBrief  =list.newBrief


                    this.user = data.psychoDTO
                    //console.log(user)
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


            // 头像
            avatarCheckPassFn() {
                this.isCheckAvatarPass = true
            },

            cancelToPassAvatar() {
                this.isCheckAvatarPass = false
            },

            avatarCheckRejectFn() {
                this.isCheckAvatarReject = true
            },

            cancelToRejectAvatar() {
                this.isCheckAvatarReject = false
            },


            // 职业照
            candidPhotoCheckPassFn() {
                this.isCheckLifePhotoPass = true
            },

            cancelToPassLifePhoto() {
                this.isCheckLifePhotoPass = false
            },

            candidPhotoCheckRejectFn() {
                this.isCheckLifePhotoReject = true
            },

            cancelToRejectLifePhoto() {
                this.isCheckLifePhotoReject = false
            },




            // 预览
            btnViews(img) {

                this.viewsImg = ""

                this.viewsImg = img

                this.previewPictureStatus = true

            },

            async auditMemberPic(field, audit) {

                const params = {
                    field,
                    audit,
                    id: this.piid,
                }
                console.log(audit);
                let data = await getResponses("Psychor/auditMemberField.json", serialize(params))

                if (data.code === 0) {

                    this.isCheckAvatarPass = false
                    this.isCheckLifePhotoPass = false
                    this.isCheckAvatarReject = false
                    this.isCheckLifePhotoReject = false

                    this.getPsychoInfoByKey()

                    this.checkModalStatus = false

                } else {
                    alert(data.msg)
                }
            },

            returnFn() {
                this.$route.router.go(`/expertsIn`)
                // location.href = "/expertsIn"
            },
            checkFor(name, field, not) {
                this.checkModalStatus = true

                this.checkName = name
                this.checkField = field
                this.checkNot = not
                console.log(not);
            }
        },
        ready() {
            this.getLicenseTypeList()
            setTimeout(() => {
                this.getPsychoInfoByKey()
            })


            // this.isEdit = location.search.slice(1).indexOf("edit") !== -1

        }

    }
</script>
