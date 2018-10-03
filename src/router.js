import Vue from "vue"
import VueRouter from "vue-router"

//用户管理
import userList from "./views/usermanage/userlist.vue"
import userlog from "./views/usermanage/userlog.vue"
import usermanage from "./views/usermanage/usermanage.vue"
import dataAnalysis from "./views/vipComments/dataAnalysis.vue"


//订单管理
import orderslist from "./views/ordersmanage/orderslist.vue"

// 官网预约单管理
import reserlist from "./views/ordersmanage/reservationlist.vue"

//咨询管理
import CtasAccount from "./views/fundmanagement/ctasaccount.vue"

import UserAccount from "./views/fundmanagement/useraccount.vue"
import IncomeStatistics from "./views/fundmanagement/incomestatistics.vue" //基金管理
import settlement from "./views/fundmanagement/settlement.vue"

// 充值记录列表

import rechargeList from "./views/fundmanagement/rechargeList"


//底层操作
import labelSet from "./views/understratum/labelSet.vue"
import newLabelSet from "./views/understratum/newLabelSet.vue"
import expertServiceSettings from "./views/understratum/expertServiceSettings.vue"
import BkgeSet from "./views/understratum/bkgeset.vue"
import servicePrice from "./views/understratum/servicePrice.vue"

// 新增系统配置 -> 预约参数设置
import reservationSet from "./views/understratum/reservationSet.vue"
// 专家列表筛选设置
import expertSearchSet from "./views/understratum/expertSearchSet"


//登陆页
import logo from "./views/home.vue"
import welcome from "./views/welcome.vue"
//专家入驻
import expertsIn from "./views/experts/expertsIn.vue"
import addExpertsIn from "./views/experts/addExpertsIn.vue"
import check from "./views/experts/check.vue"
import editExpertsIn from "./views/experts/editExpertsIn.vue"
import editNOExpertsIn from "./views/experts/editNO.vue"
import checkImg from "./views/experts/checkImg.vue"


//咨询师 ------------------↓
import counselorList from "./views/counselor/counselorList.vue" //咨询师列表
import counselorShow from "./views/counselor/counselorShow.vue" //咨询师列表

import counselorTag from "./views/counselor/counselorTag.vue" //标签
import counselorMsg from "./views/counselor/counselorMsg.vue" //整合 新咨询师
//------------------------------新增咨询师推荐信息
import counselorRec from "./views/counselor/counselorRec.vue" //咨询师推荐

//反馈信息 ------------------↓
import guestBook from "./views/feedback/guestBook.vue"

//科普管理
import popularScience from "./views/popularScience/popularScience.vue"
import Articlecategory from "./views/popularScience/category.vue"
//---------------------------------------------------------修改文章管理
import articleManage from "./views/popularScience/articleManage.vue"//文章管理
import articleTypeManage from "./views/popularScience/articleTypeManage.vue"//文章类型管理

import article from "./views/popularScience/article.vue"
import newArticle from "./views/popularScience/newArticle.vue"

//会员管理
import vipManage from "./views/vipComments/vipManage.vue"

//banner图片管理
import banner from "./views/addImage/list.vue"
import addimage from "./views/addImage/addimage.vue"

//-------------------------------------------------------------------------新增专家活动模块
import expertsActivity from "./views/counselor/expertsActivity.vue"//专家活动

//问卷测试 ------------------↓
import mycategory from "./views/questionnaire/mycategory.vue" //问卷管理
import manage from "./views/questionnaire/manage.vue" //问卷类别
import newSkipPsq from "./views/questionnaire/newSkipPsq.vue" //新增跳转
import uploadjump from "./views/questionnaire/uploadjump.vue" //修改跳转
import newPsq from "./views/questionnaire/newPsq.vue" //新增计分
import SkipPsq from "./views/questionnaire/SkipPsq.vue" //修改计分
import ContentAudit from "./views/questionnaire/contentAudit.vue"
import ContentAuditDetails from "./views/questionnaire/contentAuditDetails.vue"


// 课程管理
import courseManage from "./views/course/courseManage.vue"
import newCourse from "./views/course/newCourse.vue"
import chapterManage from "./views/course/chapterManage.vue"
import newChapter from "./views/course/newChapter.vue"
import courseOrderManage from "./views/course/courseOrderManage.vue"
//加减币操作
import accountOperation from "./views/fundmanagement/accountOperation.vue"
//优惠券管理
import coupon from "./views/fundmanagement/coupon.vue"
//财务对账
import financial from "./views/fundmanagement/financial.vue"
//新增优惠券
import newPreferential from "./views/fundmanagement/newPreferential.vue"

//医学信息
import doctor from "./views/medicine/doctor.vue"
import newDoctor from "./views/medicine/newDoctor.vue"

//精选问答
import answer from "./views/answermanage/answer.vue"
import newanswer from "./views/answermanage/newanswer.vue"
import consulting from "./views/answermanage/consulting.vue"
import consultingInfo from "./views/answermanage/consultingInfo.vue"


//消息管理
import messageList from "./views/feedback/messageList.vue"
import messageAdd from "./views/feedback/messageAdd.vue"

//app的banner
import app_banner from "./views/app_banner/banner.vue"
import advertisement from "./views/app_banner/advertisement.vue"
import new_app_banner from "./views/app_banner/new_app_banner.vue"
import new_app_banner2 from "./views/app_banner/new_app_banner2.vue"


// import new_advertisement from "./views/app_banner/new_advertisement.vue"
// import add_advertisement from "./views/app_banner/add_advertisement.vue"

import adMsg from "./views/app_banner/adMsg.vue"


// EAP 客户管理 列表
import customerList from "./views/EAP/customerList.vue"
import EapTestPush from "./views/EAP/pushTest.vue"

// import customerAdd from "./views/EAP/customerAdd.vue"
// import customerUpload from "./views/EAP/customerUpload.vue"

import customerMsg from "./views/EAP/customerMsg.vue"

import customerManage from "./views/EAP/customerManage.vue"
import expertGroupManagement from "./views/EAP/expertGroupManagement.vue"
import EAPorders from "./views/EAP/EAPorders.vue"

//音乐管理
import musicList from "./views/musicManage/musicList.vue"
import musicCategory from "./views/musicManage/musicCategory.vue"


// im
import imList from "./views/imMessage/imList.vue"
import imCont from "./views/imMessage/imCont.vue"

// im 聊天
import chatBox from "./views/imMessage/chatBox.vue"

// 代客下单
import userListForOrder from "./views/valetOrder/userList.vue"
import orderListForOrder from "./views/valetOrder/orderList.vue"
import searchRecord from "./views/valetOrder/searchRecord.vue"
import valetorderSetting from "./views/valetOrder/valetorderSetting.vue"

// 心理测试
import scaleManagement from "./views/psychologicalTest/scaleManagement.vue"
import scaleTypeManagement from "./views/psychologicalTest/scaleTypeManagement.vue"
import scaleFlowManagement from "./views/psychologicalTest/scaleFlowManagement.vue"
import topicManagement from "./views/psychologicalTest/topicManagement.vue"
import dimensionManagement from "./views/psychologicalTest/dimensionManagement.vue"
import qualitativeManagement from "./views/psychologicalTest/qualitativeManagement.vue"
import newScaleType from "./views/psychologicalTest/newScaleType.vue"

import newScale from "./views/psychologicalTest/newScale.vue"
import newCrowd from "./views/psychologicalTest/newCrowd.vue"
import newTopics from "./views/psychologicalTest/newTopics.vue"
import newDimension from "./views/psychologicalTest/newDimension.vue"
import newQualitative from "./views/psychologicalTest/newQualitative.vue"

import scaleFlowDetail from "./views/psychologicalTest/scaleFlowDetail.vue"


// 新增督导功能
import supervisorManage from "./views/ordersmanage/supervisorManage"

// 代客下单新增编辑下单功能
import editOrder from "./views/valetOrder/editOrderMsg"
//服务指南
import serviceInformation from "./views/serviceInformation/serviceInformation"
import newServiceInformation from "./views/serviceInformation/newServiceInformation"

// 充值金额设置
import rechargeSetting from "./views/rechargeSetting/rechargeSetting.vue";
//咨询助理管理
import consultingAssistant from "./views/consultingAssistant/consultingAssistant.vue"
import lookScore from "./views/consultingAssistant/lookScore.vue"

// 新增咨询助理
import imChat from "./views/imMessage/imAssistant/index"

import reportMa from "./views/questionnaire/reportManagement"

import selfAssessment from "./views/questionnaire/selfAssessment"
import advisoryGuidelines from "./views/questionnaire/advisoryGuidelines"
import adviSory from "./views/questionnaire/adviSory"
import xiuGaiAdviSory from "./views/questionnaire/xiuGaiAdviSory"

import integralList from "./views/app_banner/integralList"
import integralDetail from "./views/app_banner/integralDetail"

//OCRM
import cueManagement from "./views/OCRM/cueManagement.vue"
import cuedPool from "./views/OCRM/cuedPool.vue"
import teamCuedPool from "./views/OCRM/teamCuedPool.vue"
import privateSea from "./views/OCRM/privateSea.vue"
import receiveConfirm from "./views/OCRM/receiveConfirm.vue"
import newCued from "./views/OCRM/newCued.vue"
import receivePublicCued from "./views/OCRM/receivePublicCued.vue"
import customerInfo from "./views/OCRM/customerInfo.vue"
import reportForms from "./views/OCRM/reportForms.vue"

import businessOpportunity from "./views/OCRM/businessOpportunity.vue"
import customerManagement from "./views/OCRM/customerManagement.vue"

//销售管理
import publicSea from "./views/salesManagement/publicSea.vue"
import scrapPool from "./views/salesManagement/scrapPool.vue"
import serveFinishPool from "./views/salesManagement/serveFinishPool.vue"
import staffManagement from "./views/salesManagement/staffManagement.vue"
import achievement from "./views/salesManagement/achievement.vue"
import teamEditor from "./views/salesManagement/teamEditor.vue"
import teamAchievement from "./views/salesManagement/teamAchievement.vue"

//权限管理
import rightsManagement from "./views/rightsManagement/rightsManagement.vue"
import newAccount from "./views/rightsManagement/newAccount.vue"


//角色管理
import roleManagement from "./views/roleManagement/roleManagement.vue"
import newRole from "./views/roleManagement/newRole.vue"

Vue.use(VueRouter)

const router = new VueRouter({
    history: true
})

router.map({

    "/": {
        component: logo
    },
    "/welcome": {
        component: welcome
    },
    // start 用户管理
    "/userlist": {
        component: userList
    },

    "/userlog": {
        component: userlog
    },

    "/usermanage/:id": {
        component: usermanage
    },

    // 加减币操作
    "/accountOperation": {
        component: accountOperation
    },

    // 优惠券管理
    "/coupon": {
        component: coupon
    },

    // 财务对账
    "/financial": {
        component: financial
    },

    // 新增优惠券
    "/newPreferential": {
        component: newPreferential
    },

    //订单管理
    "/orderslist": {
        component: orderslist
    },
    "/orderslist/:id": {
        component: orderslist
    },


    //官网预约单管理
    "/reserlist": {
        component: reserlist
    },


    //咨询管理
    "/CtasAccount": { //求助者资金管理  //求助者账户
        component: CtasAccount


    },

    //充值记录列表
    "/rechargeList": {
        component: rechargeList
    },


    "/UserAccount": { //求助者资金管理  //咨询师账户
        component: UserAccount
    },

    "/IncomeStatistics": { //收入统计 // 折现图
        component: IncomeStatistics
    },

    "/settlement": { //结算
        component: settlement
    },

    //底层操作
    "/labelSet": {
        component: labelSet
    },
    "/newLabelSet":{
      component:newLabelSet
    },
    "/newLabelSet/:id":{
        component:newLabelSet
    },
    "/expertServiceSettings": {
        component: expertServiceSettings
    },
    "/BkgeSet": {
        component: BkgeSet
    },

    "/servicePrice": {
        component: servicePrice
    },


    "/reservationSet": { // 新增预约参数设置
        component: reservationSet
    },


    "/expertSearchSet": { // 专家列表筛选设置
        component: expertSearchSet
    },


    "/expertsIn": {
        component: expertsIn
    },
    "/expertsIn/:id": {
        component: editExpertsIn
    },
    "/expertsInNO/:id": {
        component: editNOExpertsIn
    },
    "/check/:id": {
        component: check
    },
    "/checkImg/:id": {
        component: checkImg
    },


    "/addExpertsIn": {
        component: addExpertsIn
    },
    //科普管理
    "/popularScience": {
        component: popularScience,
    },
    "/Articlecategory": {
        component: Articlecategory,
    },
    "/articleManage": {
        component: articleManage
    },
    "/article": {
        component: article
    },

    "/newArticle": {
        component: newArticle
    },
    "/newArticle/:id": {
        component: newArticle
    },

    "/articleTypeManage": { //新增  文章类型管理
        component: articleTypeManage
    },

    "/newSkipPsq": { //新增  跳转
        component: newSkipPsq
    },
    "/uploadjump/:id": { //修改 跳转 if(id)=>add else change
        component: uploadjump
    },
    "/newPsq": { //新增 计分
        component: newPsq
    },
    "/SkipPsq/:id": { //修改 计分 if(id)=>add else change
        component: SkipPsq
    },


    "/ContentAudit": { //内容审核
        component: ContentAudit
    },

    "/ContentAuditDetails/:id": { //内容审核详情页
        component: ContentAuditDetails
    },


    //课程管理
    "/courseManage": { //内容审核
        component: courseManage
    },
    "/newCourse": {
        component: newCourse
    },
    "/newCourse/:id": {
        component: newCourse
    },
    "/chapterManage/:id": {
        component: chapterManage
    },
    "/newChapter/:id": {
        component: newChapter
    },
    "/newChapter/:id/:cid": {
        component: newChapter
    },
    "/courseOrderManage": {
        component: courseOrderManage
    },

    //会员管理
    "/vipManage": {
        component: vipManage
    },
    "/dataAnalysis": {
        component: dataAnalysis
    },
    //图片管理
    "/banner": {
        component: banner
    },
    "/addimage": {
        component: addimage
    },
    "/addimage/:id": {
        component: addimage
    },
    //医学信息
    "/doctor": {
        component: doctor
    },
    "/newDoctor": {
        component: newDoctor
    },
    "/newDoctor/:id": {
        component: newDoctor
    },


    //整合 新咨询师ContentAudit
    "/counselorMsg": {
        component: counselorMsg
    },
    "/counselorMsg/:id": {
        component: counselorMsg
    },
    "/consultant": {
        component: counselorList
    },

    // 新增专家查看功能
    "/counselorShow": {
        component: counselorShow
    },


    //新增咨询师推荐
    "/counselorRec": {
        component: counselorRec
    },
    "/label": {
        component: counselorTag
    },
    "/guestBook": {
        component: guestBook
    },
    "/questionnaire": {
        component: mycategory
    },
    "/manage": {
        component: manage
    },
    //精选问答
    "/answer": {
        component: answer
    },
    "/newanswer": {
        component: newanswer
    },
    "/newanswer/:id": {
        component: newanswer
    },
    "/consulting": {
        component: consulting
    },
    "/consulting/:id": {
        component: consultingInfo
    },

    //-------------消息管理
    "/messageList": {
        component: messageList
    },
    "/messageAdd": {
        component: messageAdd
    },


    //app　banner区
    "/advertisement": { //列表
        component: advertisement
    },
    "/advertisementAdd": { //新增
        component: adMsg
    },
    "/advertisementUpload/:id": { //修改
        component: adMsg
    },
    // "/advertisementAdd": { //新增
    //     component: add_advertisement
    // },
    // "/advertisementUpload/:id": { //修改
    //     component: new_advertisement
    // },
    "/app_banner": {
        component: app_banner
    },
    "/app_banner/:id": {
        component: new_app_banner
    },

    "/app_banner/banner2/:id": {
        component: new_app_banner2
    },

    "/app_banner/new_app_banner": {
        component: new_app_banner
    },
    "/app_banner/new_app_banner2": {
        component: new_app_banner2
    },


    //专家活动
    "expertsActivity": {
        component: expertsActivity
    },


    //EAP
    "/customerList": {
        component: customerList
    },


    // "/customerAdd": { // 新增企业
    //     component: customerAdd
    // },
    // "/customerUpload/:id": { // 修改企业
    //     component: customerUpload
    // },
    "/customerAdd": { // 新增企业
        component: customerMsg
    },
    "/customerUpload/:id": { // 修改企业
        component: customerMsg
    },


    "/customerManage/:id": {
        component: customerManage // 修改
    },
    "/expertGroupManagement": {
        component: expertGroupManagement
    },
    "/EAPorders/:id": {
        component: EAPorders
    },
    "/EapTestPush/:id": {
        component: EapTestPush
    },


    // im
    "/imList": {
        component: imList
    },
    "/imCont": {
        component: imCont
    },
    "/imCont/:id": {
        component: imCont
    },
    // im 测试
    "/chatBox": {
        component: chatBox
    },

    //音乐
    "/musicList": {
        component: musicList
    },
    "/musicCategory": {
        component: musicCategory
    },

    // 代客下单
    "/userListForOrder": {
        component: userListForOrder
    },
    "/orderListForOrder": {
        component: orderListForOrder
    },
    "/searchRecord/:id": {
        component: searchRecord
    },
    "valetorderSetting": {
        component: valetorderSetting
    },

    // 心理测试
    "/scaleManagement": {
        component: scaleManagement
    },
    "/scaleTypeManagement": {
        component: scaleTypeManagement
    },
    "/scaleFlowManagement": {
        component: scaleFlowManagement
    },

    "/newScaleType": {
        component: newScaleType
    }
    ,
    "/newScale": {
        component: newScale
    },
    "/newScale/:id": {
        component: newScale
    },
    "/newCrowd/:id": {
        component: newCrowd
    },


    "/topicManagement/newTopics/:id": {
        component: newTopics
    },
    "/dimensionManagement/newDimension/:id": {
        component: newDimension
    },
    "/qualitativeManagement/newQualitative/:id": {
        component: newQualitative
    },


    "/topicManagement/newTopics": {
        component: newTopics
    },
    "/dimensionManagement/newDimension": {
        component: newDimension
    },
    "/qualitativeManagement/newQualitative": {
        component: newQualitative
    },


    "/topicManagement/:id": {
        component: topicManagement
    },
    "/dimensionManagement/:id": {
        component: dimensionManagement
    },
    "/qualitativeManagement/:id": {
        component: qualitativeManagement
    },
    "/newScaleType/:id": {
        component: newScaleType
    },
    "/scaleFlowDetail/:id": {
        component: scaleFlowDetail
    },
    "/supervisorManage": {
        component: supervisorManage
    },
    "/editOrder/:id": {
        component: editOrder
    },
    //服务指南
    "serviceInformation": {
        component: serviceInformation
    },
    "newServiceInformation": {
        component: newServiceInformation
    },
    "newServiceInformation/:id": {
        component: newServiceInformation
    },

    //充值金额设置
    "/rechargeSetting": {
        component: rechargeSetting
    },
    //咨询助理
    "/consultingAssistant": {
        component: consultingAssistant
    },
    "/consultingAssistant/:id": {
        component: lookScore
    },

    //咨询助理
    "/imChat": {
        component: imChat
    },

    "/imChat/:id": {
        component: imChat
    },

    "/reportMa": {
        component: reportMa
    },

    "/selfAssessment": {
        component: selfAssessment
    },

    "/advisoryGuidelines": {
        component: advisoryGuidelines
    },

    "/adviSory": {
        component: adviSory
    },

    "/xiuGaiAdviSory": {
        component: xiuGaiAdviSory
    },

    "/integralList": {
        component: integralList
    },

    "/integralList/:id": {
        component: integralDetail
    },

    //OCRM
    "/cueManagement": {
        component: cueManagement
    },
    "/cuedPool": {
        component: cuedPool
    },
    "/teamCuedPool": {
        component: teamCuedPool
    },
    "/privateSea": {
        component: privateSea
    },
    "/receiveConfirm": {
        component: receiveConfirm
    },
    "/newCued": {
        component: newCued
    },
    "/receivePublicCued": {
        component: receivePublicCued
    }
    ,
    "/customerInfo": {
        component: customerInfo
    },
    "/businessOpportunity": {
        component: businessOpportunity
    },
    "/customerManagement": {
        component: customerManagement
    },

    "/reportForms": {
        component: reportForms
    },


    //销售管理
    "/publicSea": {
        component: publicSea
    },
    "/scrapPool": {
        component: scrapPool
    },
    "/serveFinishPool": {
        component: serveFinishPool
    },

    "/staffManagement": {
        component: staffManagement
    },
    "/achievement": {
        component: achievement
    },
    "/teamAchievement": {
        component: teamAchievement
    },
    "/teamEditor": {
        component: teamEditor
    },

//    权限管理
    "/rightsManagement": {
        component: rightsManagement
    },
    "/newAccount": {
        component: newAccount
    },

    //角色管理
    "/roleManagement": {
        component: roleManagement
    },
    "/newRole": {
        component: newRole
    }






})

router.redirect({
    "*": "/"
})

export default router
