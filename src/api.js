// import promise from "es6-promise"
// import "whatwg-fetch"
import axios from 'axios'
//import {serialize} from 'utils'
//start--------------------------------------------------------------------------------------------------------------------新增代客下单代码

export let getOrderRecordByMobilePhone = async (params) => {//用户信息
    let response = await fetch("/depression-web/netsalesUser/getOrderRecordByMobilePhone.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getUserInfoByMobilePhone = async (params) => {//用户信息
    let response = await fetch("/depression-web/netsalesUser/getUserInfoByMobilePhone.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let addBespeakServiceForUser = async (params) => {//立即拨打
    let response = await fetch("/depression-web/netsalesUser/addBespeakService.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let immediatelyCall = async (params) => {//立即拨打
    let response = await fetch("/depression-web/netsalesOrder/immediatelyCall.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let reCall = async (params) => {//立即拨打
    let response = await fetch("/depression-web/netsalesOrder/reStartCallNetOrder.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let addBespeakService = async (params) => {//订单预约服务
    let response = await fetch("/depression-web/netsalesOrder/addBespeakService.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getNetsalesOrder = async (params) => {//获取及搜索订单列表
    let response = await fetch("/depression-web/netsalesOrder/getNetsalesOrder.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let addNetsalesOrder = async (params) => {//创建订单
    let response = await fetch("/depression-web/netsalesOrder/addNetsalesOrder.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let searchUsersForOrder = async (params) => {//用户列表
    let response = await fetch("/depression-web/netsalesUser/searchUsers.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let checkPsychoByMobilePhone = async (params) => {//根据手机号判断是否存在此专家
    let response = await fetch("/depression-web/Psychor/getMemberByMobilePhone.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//end --------------------------------------------------------------------------------------------------------------------------新增代客下单代码

//start-------------------------------------v3改版新加接口
//------------------------------专家活动
export let exportLivenessMemberList = async (params) => { // EAP 导出excel
    let response = await fetch("/depression-web/Psychor/exportLivenessMemberList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.blob().catch((error) => {
        console.error(error)
    })
}

export let countEnableLivenessPsycho = async (params) => {//接口名称 获取启用热门推选专家数量
    let response = await fetch("/depression-web/Psychor/countEnableLivenessPsycho.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}
export let obtainLivenessMemberList = async (params) => {//接口名称 获取热门推荐专家列表
    let response = await fetch("/depression-web/Psychor/obtainLivenessMemberList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}
export let updateLivenessMember = async (params) => {//接口名称 更新推选专家相关信息
    let response = await fetch("/depression-web/Psychor/updateLivenessMember.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getAllLivenessMemberList = async (params) => {//接口名称 获取热门推荐专家列表
    let response = await fetch("/depression-web/Psychor/getAllLivenessMemberList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let addLivenessMember = async (params) => {//接口名称 添加专家到热门推荐
    let response = await fetch("/depression-web/Psychor/addLivenessMember.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//--------------------------------标签管理
export let obtainTags = async (params) => {//获取标签列表
    let response = await fetch("/depression-web/Tag/obtainTags.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let insertTag = async (params) => {//添加标签
    let response = await fetch("/depression-web/Tag/insertTag.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let deleteTagById = async (params) => {//删除标签
    let response = await fetch("/depression-web/Tag/deleteTagById.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let updateTag = async (params) => {//更新标签
    let response = await fetch("/depression-web/Tag/updateTag.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//文章类型管理
export let getCategoryList = async (params) => {//接口名称 获取文章类别标签列表
    let response = await fetch("/depression-web/Tag/V3/getCategoryList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}
export let insertCategory = async (params) => {//接口名称 添加文章类别标签
    let response = await fetch("/depression-web/Tag/V3/category/insertCategory.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let updateCategory = async (params) => {//接口名称 更新文章类别标签
    let response = await fetch("/depression-web/Tag/V3/category/updateCategory.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let deleteCategoryById = async (params) => {//接口名称 删除文章类别标签
    let response = await fetch("/depression-web/Tag/deleteCategoryById.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//搜索文章
export let newGetArticleByPage = async (params) => {//接口名称 删除文章类别标签
    let response = await fetch("/depression-web/Article/V3/getArticleByPage.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}
//导出文章
export let exportArticle = async (params) => {//接口名称 删除文章类别标签
    let response = await fetch("/depression-web/Article/exportArticle.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.blob().catch((error) => {
        console.error(error)
    })
}


//end  -------------------------------------v3改版新加接口


//start-------------------------------------新增咨询师推荐代码
export let obtainRecommend = async (params) => {//获取初始的推荐专家设置信息
    let response = await fetch("/depression-web/PsychoRecommend/obtainRecommend.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let updateRecommend = async (params) => {//修改咨询师信息
    let response = await fetch("/depression-web/PsychoRecommend/updateRecommend.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let isOpenCounselorRecommend = async (params) => {//打开或者关闭咨询师推荐
    let response = await fetch("/depression-web/PsychoRecommend/updateRecommend.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let obtainPsychoRecommendList = async (params) => { //咨询师列表
    let response = await fetch("/depression-web/PsychoRecommend/obtainPsychoRecommendList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}
//修改每日固定名额
export let updatePsychoRecommend = async (params) => {//修改每日固定名额
    let response = await fetch("/depression-web/PsychoRecommend/updatePsychoRecommend.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}
//移除推荐专家
export let removePsychoRecommend = async (params) => {//移除推荐专家
    let response = await fetch("/depression-web/PsychoRecommend/removePsychoRecommend.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}
//添加专家
export let addPsychoRecommend = async (params) => {//添加专家
    let response = await fetch("/depression-web/PsychoRecommend/addPsychoRecommend.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//获取条件搜索活动订单/PsychoRecommend/getServiceOrderByPage.json
export let getServiceOrderByPage = async (params) => {//添加专家
    let response = await fetch("/depression-web/PsychoRecommend/getServiceOrderByPage.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//导出全部活动流水订单到execl

export let exportServiceOrder2 = async (params) => { // 推荐专家 导出excel 导出全部推荐专家订单
    let response = await fetch("/depression-web/PsychoRecommend/exportServiceOrder.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.blob().catch((error) => {
        console.error(error)
    })
}


//end-------------------------------------新增咨询师推荐代码


export let getBanner = async (params) => {
    let response = await fetch("/depression-web/testingCarouselPictures/pro/list.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let getAccount = async (params) => { // 资金管理   咨询师账户  +  求助者账户
    let response = await fetch("/depression-web/Assets/selectCounselorAccountsByCondition.json", {

        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getAccountThenIncomeAndExpense = async (params) => { // 资金管理   咨询师账户  +  求助者账户  => 右侧 收支记录
    let response = await fetch("/depression-web/Income/selectWithPageByMid.json", {

        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getAccountThenUserShoppingRecord = async (params) => { // 资金管理   咨询师账户  +  求助者账户  => 右侧 消费记录独立
    let response = await fetch("/depression-web/Income/selectWithPageExpenseRecordByMid.json", {

        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let getPlatform = async (params) => { // 折线图
    let response = await fetch("/depression-web/Statistics/selectPlatformIncomeAndExpensesStatistics.json", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let doSettleForThisMon = async (params) => { //资金管理   本月待结算   结算操作
    let response = await fetch("/depression-web/CapitalWithdrawRequest//capitalWithdrawOperationByNo.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })


    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getSettlementForThisMonAndRecord = async (params) => { //资金管理 结算  往期结算记录
    let response = await fetch("/depression-web/CapitalWithdrawRequest/getCapitalWithdrawRequestsByPage.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })


    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let getSearch = async (params) => { //查询通用接口     //  ？？？？？

    let response = await fetch("/depression-web/CapitalWithdrawRequest/getCapitalWithdrawRequestsByPage.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })


    return await response.json().catch((error) => {
        console.error(error)
    })
}

// 订单列表
export let getOrder = async (params) => {
    let response = await fetch("/depression-web/ServiceOrder/getServiceOrderByPage.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params ? params : ""
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let cancelOrder = async (params) => {
    let response = await fetch("/depression-web/ServiceOrder/cancelServiceOrder.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let handleOrder = async (params) => {
    let response = await fetch("/depression-web/ServiceOrder/handleExceptionServiceOrder.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let handleTousu = async (params) => {
    let response = await fetch("/depression-web/ServiceOrder/complaintServiceOrder.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}
export let handleTousuW = async (params) => {
    let response = await fetch("/depression-web/ServiceOrder/handleComplaintServiceOrder.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let handleTui = async (params) => {
    let response = await fetch("/depression-web/ServiceOrder/refundServiceOrder.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let listOperator = async (params) => {
    let response = await fetch("/depression-web/CapitalWithdrawRequest/listOperator.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//获取平台佣金比例
export let getCapitalCommissionRate = async (params) => {
    let response = await fetch("/depression-web/CapitalCommissionRate//getAllCapitalCommissionRate.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//更改佣金比例
export let editCapitalCommissionRate = async (params) => {
    let response = await fetch("/depression-web/CapitalCommissionRate/updateCapitalCommissionRate.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//获取提现申请时间

export let getWithdrawDate = async (params) => {
    let response = await fetch("/depression-web/CapitalWithdrawRequestDuration//getAllCapitalWithdrawRequestsDuration.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//更改提现申请时间

export let editWithdrawDate = async (params) => {
    let response = await fetch("/depression-web/CapitalWithdrawRequestDuration//updateCapitalWithdrawRequestsDuration.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//用户列表数据

export let getlistUser = async (params) => {
    let response = await fetch("/depression-web/depression/system/listUser.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//用户新增

export let addListUser = async (params) => {
    let response = await fetch("/depression-web/depression/system/addUser.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//用户修改

export let editListUser = async (params) => {
    let response = await fetch("/depression-web/depression/system/modifyUser.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//重置密码

export let resetPass = async (params) => {
    let response = await fetch("/depression-web/depression/system/resetPass.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//状态切换

export let switchState = async (params) => {
    let response = await fetch("/depression-web/depression/system/changeStatus.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//咨询师入驻列表

export let getPsychoInfoList = async (params) => {
    let response = await fetch("/depression-web/PsychoInfo/getPsychoInfoList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//搜索咨询师入驻列表

export let searchPsychoInfoList = async (params) => {
    let response = await fetch("/depression-web/PsychoInfo/V3/searchPsychoInfoList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//删除咨询师

export let deletePsychoInfoByKey = async (params) => {
    let response = await fetch("/depression-web/PsychoInfo/deletePsychoInfoByKey.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//审核咨询室

export let auditPsychoInfo = async (params) => {
    let response = await fetch("/depression-web/PsychoInfo/V3/auditPsychoInfo.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//获取咨询师信息

export let getPsychoInfoByKey = async (params) => {
    let response = await fetch("/depression-web/Psychor/getMember.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//获取执照类型列表

export let getLicenseTypeList = async (params) => {
    let response = await fetch("/depression-web/PsychoInfo/getLicenseTypeList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//修改专家号入驻信息

export let modifyPsychoInfo = async (params) => {
    let response = await fetch("/depression-web/PsychoInfo/modifyPsychoInfo.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//操作日志

export let listLogs = async (params) => {
    let response = await fetch("/depression-web/operationLog/listLogs.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//部门列表

export let listDepartment = async (params) => {
    let response = await fetch("/depression-web/depression/system/listDepartment.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//权限列表

export let permissionsList = async (params) => {
    //原接口
    // let response = await fetch("/depression-web/privileges/core/listMenu.json", {
    let response = await fetch("/depression-web/privileges/core/listNewMenu.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//更改用户权限
export let updMenuList = async (params) => {
    let response = await fetch("/depression-web/privileges/core/updMenuList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//获取验证码
export let getSmsAuthCode = async (params) => {
    let response = await fetch("/depression-web/depression/system/getSmsAuthCode.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//用户登录
export let Userlogin = async (params) => {
    let response = await fetch("/depression-web/depression/system/systemUserLogin.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)

        return {
            myErrorCode: 500,
            myErrorMsg:"抱歉，服务器错误！请稍后重试"
        }
    })
}

// 用户注销
//

export let UserOut = async (params) => {
    let response = await fetch("/depression-web/depression/system/systemUserLogout.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//图片上传
export let upload = async (params) => {
    let response = await fetch("/depression-web/file/image/upload.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//文章类型列表
export let getTypeByPage = async (params) => {
    let response = await fetch("/depression-web/Article/type/getTypeByPage.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//新增文章类型
export let addType = async (params) => {
    let response = await fetch("/depression-web/Article/type/addType.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}
//编辑文章类型
//

export let reTypeName = async (params) => {
    let response = await fetch("/depression-web/Article/type/reTypeName.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}
//删除文章类型
export let deleteArticleType = async (params) => {
    let response = await fetch("/depression-web/Article/type/deleteArticleType.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//类型获取
export let getAllType = async (params) => {
    let response = await fetch("/depression-web/Article/type/getAllType.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//一级类别获取
export let getCategoryLevel1ByType = async (params) => {
    let response = await fetch("/depression-web/Article/category/getCategoryLevel1ByType.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//二级类别获取
export let getSubCategory = async (params) => {
    let response = await fetch("/depression-web/Article/category/getSubCategory.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//查询类型
export let getCategoryByPage = async (params) => {
    let response = await fetch("/depression-web/Article/category/getCategoryByPage.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//新增文章类别
export let addSubCategory = async (params) => {
    let response = await fetch("/depression-web/Article/category/addSubCategory.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//删除类别
export let deleteSubCategory = async (params) => {
    let response = await fetch("/depression-web/Article/category/deleteSubCategory.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//修改类别信息
export let updateSubCategory = async (params) => {
    let response = await fetch("/depression-web/Article/category/updateSubCategory.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//文章列表
export let getArticleByPage = async (params) => {
    let response = await fetch("/depression-web/Article/getArticleByPage.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//会员管理列表
export let MemberList = async (params) => {
    let response = await fetch("/depression-web/depression/member/searchMember.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//重置会员密码
export let updateMember = async (params) => {
    let response = await fetch("/depression-web/depression/member/updateMember.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//新增会员
export let addMember = async (params) => {
    let response = await fetch("/depression-web/depression/member/addMember.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//banner列表
export let bannerList = async (params) => {
    let response = await fetch("/depression-web/testingCarouselPictures/pro/list.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//状态切换
export let bannerStatus = async (params) => {
    let response = await fetch("/depression-web/testingCarouselPictures/pro/changeStatus.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let testingChangeStatus = async (params) => { //问卷测试 问卷管理   启用 禁用
    let response = await fetch("/depression-web/testing/changeStatus.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//banner图更新
export let bannerUpdate = async (params) => {
    let response = await fetch("/depression-web/testingCarouselPictures/pro/update.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}
//banner图添加
export let bannerSave = async (params) => {
    let response = await fetch("/depression-web/testingCarouselPictures/pro/save.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//获取banner图信息

export let bannerView = async (params) => {
    let response = await fetch("/depression-web/testingCarouselPictures/pro/view.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//医生列表
export let doctorList = async (params) => {
    let response = await fetch("/depression-web/famousDoctors/list.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//医生状态切换
export let doctorStatus = async (params) => {
    let response = await fetch("/depression-web/famousDoctors/changeStatus.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//医生信息获取
export let doctorView = async (params) => {
    let response = await fetch("/depression-web/famousDoctors/view.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//医生信息更新
export let doctorUpdate = async (params) => {
    let response = await fetch("/depression-web/famousDoctors/update.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let testingUpdate = async (params) => { //问卷测试 问卷管理   修改
    let response = await fetch("/depression-web/testing/update.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//医生信息新增
export let doctorAdd = async (params) => {
    let response = await fetch("/depression-web/famousDoctors/add.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//-------------------------------------------------------↑

//文章信息
export let getArticleDetail = async (params) => {
    let response = await fetch("/depression-web/Article/getArticleDetail.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//新增文章
export let addArticle = async (params) => {
    let response = await fetch("/depression-web/Article/addArticle.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//更新文章
export let updateArticle = async (params) => {
    let response = await fetch("/depression-web/Article/updateArticle.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })

}
//删除文章
export let deleteArticle = async (params) => {
    let response = await fetch("/depression-web/Article/deleteArticle.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })

}


export let getCounselorList = async (params) => { //咨询师列表
    let response = await fetch("/depression-web/Psychor/searchNewMember.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let disableMemberBulk = async (params) => { //咨询师列表  点击禁用按钮   未完成
    let response = await fetch("/depression-web/Psychor/disableMemberBulk.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let enableMemberBulk = async (params) => { //咨询师列表  点击启用按钮   未完成
    let response = await fetch("/depression-web/Psychor/enableMemberBulk.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let obtainPsychoTagList = async (params) => { //咨询师列表  标签页面
    let response = await fetch("/depression-web/MemberTag/obtainPsychoTagList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let updatePsychoTag = async (params) => { //咨询师列表  标签页面  表格中 点击修改
    let response = await fetch("/depression-web/MemberTag/updatePsychoTag.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let newPsychoTag = async (params) => { //咨询师列表  标签页面  表格中 点击新增按钮
    let response = await fetch("/depression-web/MemberTag/newPsychoTag.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let deletePsychoTag = async (params) => { //咨询师列表  标签页面  表格中 点击删除按钮
    let response = await fetch("/depression-web/MemberTag/deletePsychoTag.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let myaddMember = async (params) => { //  点击新增咨询师  => 保存新咨询师
    let response = await fetch("/depression-web/Psychor/addMember.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let feedback = async (params) => { //反馈列表
    let response = await fetch("/depression-web/feedback/list.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let feedbackThenView = async (params) => { //反馈列表   列表中 点击 查看   /depression-web/testingType/list.json
    let response = await fetch("/depression-web/feedback/view.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingTypeList = async (params) => { //问卷测试  列表
    let response = await fetch("/depression-web/testingType/list.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let testingTypeChangeStatus = async (params) => { //问卷测试  启用 0     禁用 1
    let response = await fetch("/depression-web/testingType/changeStatus.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingTypeAdd = async (params) => { //问卷测试  新增
    let response = await fetch("/depression-web/testingType/save.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingTypeUpdate = async (params) => { //问卷测试  修改
    let response = await fetch("/depression-web/testingType/update.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testinglist = async (params) => { //问卷测试 问卷管理   列表
    let response = await fetch("/depression-web/testing/list.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getTestingType = async (params) => { //问卷测试 问卷管理   修改问卷 下拉问卷类别
    let response = await fetch("/depression-web/testingType/getTestingType.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingview = async (params) => { //问卷测试 问卷管理   修改问卷 原问卷
    let response = await fetch("/depression-web/testing/view.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let listByTestingIdTheQuestions = async (params) => { //问卷测试 问卷管理   修改问卷 点击保存 获得题目列表
    let response = await fetch("/depression-web/testingQuestions/listByTestingId.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let listByTestingIdTheSection = async (params) => { //问卷测试 问卷管理   修改问卷 点击保存 获得结论列表  // /depression-web/testingQuestions/changeStatus.json
    let response = await fetch("/depression-web/testingSection/listByTestingId.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingQuestionsChangeStatus = async (params) => { //问卷测试 问卷管理   修改问卷 点击保存 获得结论列表  点击修改
    let response = await fetch("/depression-web/testingQuestions/changeStatus.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingQuestionsUpdate = async (params) => { //问卷测试 问卷管理   修改问卷 点击保存
    let response = await fetch("/depression-web/testingQuestions/update.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let testingQuestionsSave = async (params) => { //问卷测试 问卷管理   修改问卷 点击保存 获得结论列表  点击新增 上
    let response = await fetch("/depression-web/testingQuestions/save.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingSectioncChangeStatus = async (params) => { //问卷测试 问卷管理   启用 禁用  下
    let response = await fetch("/depression-web/testingSection/changeStatus.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingSectionUpdate = async (params) => { //问卷测试 问卷管理  修改问卷答案
    let response = await fetch("/depression-web/testingSection/update.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingSectionSave = async (params) => { //问卷测试 问卷管理  新增问卷答案
    let response = await fetch("/depression-web/testingSection/save.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingSave = async (params) => { //问卷测试 新增问卷 点击 保存并新增问卷题目  公用
    let response = await fetch("/depression-web/testing/save.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let testingquestionsjumpsave = async (params) => { //跳转型 新增 题目
    let response = await fetch("/depression-web/testingQuestions/jump/save.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingQuestionsjumpchangeStatus = async (params) => { //跳转型  题目 启用禁用
    let response = await fetch("/depression-web/testingQuestions/jump/changeStatus.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingQuestionsjumpupdate = async (params) => { //跳转型  题目 修改
    let response = await fetch("/depression-web/testingQuestions/jump/update.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let TestingResultForJumpsave = async (params) => { //跳转型  答案 新增
    let response = await fetch("/depression-web/TestingResultForJump/save.json ", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let TestingResultForJumpupdate = async (params) => { //跳转型  答案 修改
    let response = await fetch("/depression-web/TestingResultForJump/update.json ", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let TestingResultForJumpchangeStatus = async (params) => { //跳转型  答案 修改
    let response = await fetch("/depression-web/TestingResultForJump/changeStatus.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let TestingResultForJumplistByTestingId = async (params) => { //跳转型  答案 列表
    let response = await fetch("/depression-web/TestingResultForJump/listByTestingId.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let testingQuestionsjumplistByTestingId = async (params) => { //跳转型  答案 列表
    let response = await fetch("/depression-web/testingQuestions/jump/listByTestingId.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getTagList = async (params) => { //精选问答列表
    let response = await fetch("/depression-web/advisoryCuration/getTagList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })

}

export let advisorychangeStatusSingle = async (params) => { //精选问答状态切换
    let response = await fetch("/depression-web/advisoryCuration/changeStatusSingle.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let PsychorgetMember = async (params) => { //咨询师列表 点击 修改咨询师  原内容
    let response = await fetch("/depression-web/Psychor/getMember.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let listAdvisory = async (params) => { //咨询列表
    let response = await fetch("/depression-web/advisoryCuration/listAdvisory.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let listAdvisoryCuration = async (params) => { //精选问答列表
    let response = await fetch("/depression-web/advisoryCuration/listAdvisoryCuration.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let PsychorupdateMember = async (params) => { //咨询师列表 点击 修改咨询师  修改内容
    let response = await fetch("/depression-web/Psychor/updateMember.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let getAdvisoryCurationDetail = async (params) => { //精选问答详情
    let response = await fetch("/depression-web/advisoryCuration/getAdvisoryCurationDetail.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let updateAdvisoryCuration = async (params) => { //更新精选问答
    let response = await fetch("/depression-web/advisoryCuration/updateAdvisoryCuration.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let addAdvisoryCuration = async (params) => { //更新精选问答
    let response = await fetch("/depression-web/advisoryCuration/addAdvisoryCuration.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getAdvisoryDetail = async (params) => { //更新精选问答
    let response = await fetch("/depression-web/advisoryCuration/getNewAdvisoryDetail.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let adStartupPagelist = async (params) => { //广告页列表
    let response = await fetch("/depression-web/adStartupPage/list.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let adStartupPagedelete = async (params) => { //广告页列表  删除
    let response = await fetch("/depression-web/adStartupPage/delete.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let adStartupPagesave = async (params) => { //广告页 新增
    let response = await fetch("/depression-web/adStartupPage/save.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let adStartupPageview = async (params) => { //广告页 修改 获得原始数据
    let response = await fetch("/depression-web/adStartupPage/view.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let adStartupPageupdate = async (params) => { //广告页 修改
    let response = await fetch("/depression-web/adStartupPage/update.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let addAppDetails = async (params) => { //编辑app-banner 链接信息
    let response = await fetch("/depression-web/adBanner/view.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let addAppUpdate = async (params) => { //编辑app-banner 链接信息
    let response = await fetch("/depression-web/adBanner/update.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let deleteAppBanner = async (params) => { //编辑app-banner 链接信息
    let response = await fetch("/depression-web/adBanner/delete.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let addAppBanner = async (params) => { //新增app-banner 链接信息
    let response = await fetch("/depression-web/adBanner/save.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let appBanner = async (params) => { //app-banner列表
    let response = await fetch("/depression-web/adBanner/list.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getPsychoByName = async (params) => { //app-banner 搜索咨询师列表
    let response = await fetch("/depression-web/adBanner/getPsychoByName.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getArticleByTitle = async (params) => { //app-banner 搜索文章
    let response = await fetch("/depression-web/adBanner/getArticleByTitle.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getTestingByTitle = async (params) => { //app-banner 搜索问卷
    let response = await fetch("/depression-web/adBanner/getTestingByTitle.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let getCurriculumByTitle = async (params) => { //app-banner 搜索课程
    let response = await fetch("/depression-web/adBanner/getCurriculumByTitle.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let EAPobtainEnterpriseList = async (params) => { // EAP 企业列表
    let response = await fetch("/depression-web/EapEnterprise/obtainEnterpriseList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let EAPenableEnterprise = async (params) => { // EAP 企业列表
    let response = await fetch("/depression-web/EapEnterprise/enableEnterprise.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let EAPnewEnterprise = async (params) => { // EAP 新建企业
    let response = await fetch("/depression-web/EapEnterprise/newEnterprise.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let EAPobtainEmployeeList = async (params) => { // EAP 获取员工列表 导入导出页面
    let response = await fetch("/depression-web/EapEmployee/obtainEmployeeList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let EAPdeleteEmployee = async (params) => { // EAP 获取员工列表 删除
    let response = await fetch("/depression-web/EapEmployee/deleteEmployee.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let EAPenableEmployee = async (params) => { // EAP 获取员工列表 启用禁用
    let response = await fetch("/depression-web/EapEmployee/enableEmployee.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let EAPobtainPsychoGroupListPGID = async (params) => { // EAP 新建企业 专家组pgid
    let response = await fetch("/depression-web/PsychoGroup/obtainPsychoGroupList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let EAPobtainEnterprise = async (params) => { // EAP 更新企业 企业详情
    let response = await fetch("/depression-web/EapEnterprise/obtainEnterprise.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let EAPupdateEnterprise = async (params) => { // EAP 更新企业 update
    let response = await fetch("/depression-web/EapEnterprise/updateEnterprise.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let EAPexportEmployee = async (params) => { // EAP 导出excel
    let response = await fetch("/depression-web/EapEmployee/exportEmployee.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.blob().catch((error) => {
        console.error(error)
    })
}


export let obtainPsychoGroupMemberList = async (params) => { // EAP 专家分组 list
    let response = await fetch("/depression-web/PsychoGroup/obtainPsychoGroupMemberList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let enablePsychoGroupMembers = async (params) => { // 禁用启用
    let response = await fetch("/depression-web/PsychoGroup/enablePsychoGroupMembers.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let removePsychosFromGroup = async (params) => { // 从分组中移除咨询师
    let response = await fetch("/depression-web/PsychoGroup/removePsychosFromGroup.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let obtainPsychoOrderList = async (params) => { // 查看流水
    let response = await fetch("/depression-web/PsychoGroup/obtainPsychoOrderList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let addPsychoToGroup = async (params) => { // 添加心理医师到分组
    let response = await fetch("/depression-web/PsychoGroup/addPsychosToGroup.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

//  搜索咨询师 (/Psychor/searchMember.json)  老接口  => getCounselorList


export let EAPaddPsychoGroup = async (params) => { // 新增专家分组
    let response = await fetch("/depression-web/PsychoGroup/addPsychoGroup.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let EAPremovePsychoGroup = async (params) => { // 删除专家分组
    let response = await fetch("/depression-web/PsychoGroup/removePsychoGroup.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let exportPsychoGroupMemberList = async (params) => { // EAP 导出excel 导出组内心理医师列表
    let response = await fetch("/depression-web/PsychoGroup/exportPsychoGroupMemberList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.blob().catch((error) => {
        console.error(error)
    })
}


export let exportPsychoOrderList = async (params) => { // EAP 导出excel 心理医师流水
    let response = await fetch("/depression-web/PsychoGroup/exportPsychoOrderList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.blob().catch((error) => {
        console.error(error)
    })
}


export let addPhoneCountIncrement = async (params) => { // 咨询师管理 刷单
    let response = await fetch("/depression-web/Psychor/addPhoneCountIncrement.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let obtainPriceScope = async (params) => { // 获取价格范围
    let response = await fetch("/depression-web/ServiceGoods/obtainPriceScope.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let modifyPriceScope = async (params) => { // 修改价格范围
    let response = await fetch("/depression-web/ServiceGoods/modifyPriceScope.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let searchAdvisory = async (params) => { // 搜索咨询列表
    let response = await fetch("/depression-web/MemberAdvisory/searchAdvisory.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let searchUpdate = async (params) => { // 心有圈列表
    let response = await fetch("/depression-web/MemberUpdate/searchUpdate.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let obtainAdvisoryDetail = async (params) => { // 获取提问题目信息
    let response = await fetch("/depression-web/MemberAdvisory/obtainAdvisoryDetail.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let obtainAdvisoryComments = async (params) => { // 获取提问评论列表
    let response = await fetch("/depression-web/MemberAdvisory/obtainAdvisoryComments.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let deleteMemberAdvisory = async (params) => { // 删除提问信息
    let response = await fetch("/depression-web/MemberAdvisory/deleteMemberAdvisory.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let deleteMemberAdvisoryComment = async (params) => { // 删除咨询评论
    let response = await fetch("/depression-web/MemberAdvisory/deleteMemberAdvisoryComment.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let addDisableMessageDays = async (params) => { // 删除咨询评论
    let response = await fetch("/depression-web/Punishment/addDisableMessageDays.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let clearDisableMessageDays = async (params) => { // 删除咨询评论
    let response = await fetch("/depression-web/Punishment/clearDisableMessageDays.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let obtainUpdateDetail = async (params) => { // 心友圈详细标题
    let response = await fetch("/depression-web/MemberUpdate/obtainUpdateDetail.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let obtainUpdateComments = async (params) => { // 心友圈评论列表
    let response = await fetch("/depression-web/MemberUpdate/obtainUpdateComments.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let deleteMemberUpdate = async (params) => { // 删除心友圈提问
    let response = await fetch("/depression-web/MemberUpdate/deleteMemberUpdate.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let deleteMemberUpdateComment = async (params) => { // 删除心友圈评论
    let response = await fetch("/depression-web/MemberUpdate/deleteMemberUpdateComment.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let deleteMemberAdvisoryImg = async (params) => { // 删除心友圈评论
    let response = await fetch("/depression-web/MemberAdvisory/deleteMemberAdvisoryImg.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let deleteMemberUpdateImg = async (params) => { // 删除心友圈评论
    let response = await fetch("/depression-web/MemberUpdate/deleteMemberUpdateImg.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


//  IM
export let messagePushobtainMsgPushList = async (params) => { // 自定义消息推送
    let response = await fetch("/depression-web/messagePush/obtainMsgPushList.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let messagePushcancelMsgPush = async (params) => { // 取消消息推送
    let response = await fetch("/depression-web/messagePush/cancelMsgPush.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let messagePushstartMsgPush = async (params) => { // 确定消息推送
    let response = await fetch("/depression-web/messagePush/startMsgPush.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


// IM消息推送详情 新增&&更新  在 页面内


export let messagePushobtainMsgPush = async (params) => { //  修改时 获取原有信息
    let response = await fetch("/depression-web/messagePush/obtainMsgPush.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let obtainMusicClasses = async (params) => { // 获取音乐类别列表
    let response = await fetch("/depression-web/Music/obtainMusicClasses.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let deleteMusicClass = async (params) => { // 删除音乐类别
    let response = await fetch("/depression-web/Music/deleteMusicClass.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let createMusicClass = async (params) => { // 创建音乐类别
    let response = await fetch("/depression-web/Music/createMusicClass.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let modifyMusicClass = async (params) => { // 创建音乐类别
    let response = await fetch("/depression-web/Music/modifyMusicClass.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let searchMusicSongs = async (params) => { // 音乐列表
    let response = await fetch("/depression-web/Music/searchMusicSongs.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let enableMusicSong = async (params) => { // 音乐启禁用
    let response = await fetch("/depression-web/Music/enableMusicSong.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}

export let deleteMusicSong = async (params) => { // 音乐删除
    let response = await fetch("/depression-web/Music/deleteMusicSong.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let createMusicSong = async (params) => { // 音乐创建
    let response = await fetch("/depression-web/Music/createMusicSong.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    return await response.json().catch((error) => {
        console.error(error)
    })
}


// export let exportServiceOrder = async (params) => { // orderlist  订单 导出excel
//     let response = await fetch("/depression-web/ServiceOrder/exportServiceOrder.json", {
//         method: "POST",
//         //mode: "cors",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: params
//     }).catch((error) => {
//         console.error(error)
//
//         return Promise.reject(error)
//     })
//
//     return await response.blob().catch((error) => {
//         console.error(error)
//     })
// }


export let closeServiceOrder = async (params) => { // orderlist  订单-订单列表，结束订单
    let response = await fetch("/depression-web/ServiceOrder/closeServiceOrder.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    console.log(response)

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let enableMusicClass = async (params) => { // orderlist  订单-订单列表，结束订单
    let response = await fetch("/depression-web/Music/enableMusicClass.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    console.log(response)

    return await response.json().catch((error) => {
        console.error(error)
    })
}


export let auditEapPsycho = async (params) => { //
    let response = await fetch("/depression-web/Psychor/V1/auditEapPsycho.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    console.log(response)

    return await response.json().catch((error) => {
        console.error(error)
    })
}


// 订单列表 下载文件
export let getRecordName = async (params) => { //
    let response = await fetch("/depression-web/ServiceOrder/getRecordName.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.error(error)
    })

    console.log(response)

    return await response.json().catch((error) => {
        console.error(error)
    })
}


const urlPrefix = "/depression-web/"

export async function getResponse(url) {
    const response = await fetch(urlPrefix + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).catch((error) => {
        console.log(error)
    })

    return await response.json().catch((error) => {
        console.log(error)
    })
}

export async function getResponses(url, params, otherURL) {
    const response = await fetch((otherURL ? otherURL : urlPrefix) + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.log(error)
    })

    return await response.json().catch((error) => {
        console.log(error)
    })
}

export async function getResponsesFile(url, params) {
    const response = await fetch(url, {
        method: "POST",
        body: params
    }).catch((error) => {
        console.log(error)
    })

    return await response.json().catch((error) => {
        console.log(error)
    })
}

export async function getResponsesExcel(url, params) {
    const response = await fetch(urlPrefix + url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.log(error)
    })

    return await response.blob().catch((error) => {
        console.error(error)
    })
}


///////////////////  心理测试

// const urlPublic = "/depression-api"

export async function getSource(url) {
    const response = await fetch( url, {
        method: "POST",
        //mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).catch((error) => {
        console.log(error)
    })

    return await response.json().catch((error) => {
        console.log(error)
    })
}


export async function getSources(url, params) {
    const response = await fetch( url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.log(error)
    })

    return await response.json().catch((error) => {
        console.log(error)
    })
}
export async function getSourcesExcel(url, params) {
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.log(error)
    })

    return await response.blob().catch((error) => {
        console.error(error)
    })
}

export async function getJson(url, params) {
    const response = await fetch( url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: params
    }).catch((error) => {
        console.log(error)
    })

    return await response.json().catch((error) => {
        console.log(error)
    })
}

export async function getJsonCRM(url, params) {
    const response = await fetch( urlPrefix+url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: params
    }).catch((error) => {
        console.log(error)
    })

    return await response.json().catch((error) => {
        console.log(error)
    })
}

////课程

export async function getCourse(url, params) {
    const response = await fetch(urlPrefix + url, {
        method: "POST",
        credentials: "include",
        // mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    }).catch((error) => {
        console.log(error)
    })
    return await response.json().catch((error) => {
        console.log(error)
    })
}


axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'



export function newGetResponseExcel(url, params = {}) {
    return axios.post(urlPrefix + url, serialize(params)).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            return {msg: '抱歉，服务器错误，请重试'}
        }
    }).catch((error) => {
        return Promise.reject({msg: error.message})
    })
}


export let exportServiceOrder = async (params) => { // orderlist  订单 导出excel
    const a = fetch("/depression-web/ServiceOrder/exportServiceOrder.json", {
        method: "POST",
        //mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    })
    const b = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(false)
        }, 50 * 1000)
    })


    return Promise.race([a, b]).then((response) => {
        if (response) {
            return response.blob().catch((error) => {
                console.error(error)
            })
        } else {
            return Promise.reject()
        }
    })


    // let response = await .catch((error) => {
    //     console.error(error)
    //
    //     return Promise.reject(error)
    // })
    //
    // return await response.blob().catch((error) => {
    //     console.error(error)
    // })
}
