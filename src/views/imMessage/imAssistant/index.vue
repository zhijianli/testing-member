<template>
    <div id="imWrap">
        <div class="wrapper box-sizing">
            <div class="im-no-account"  v-if="! isUserHasImAccount">
                您没有助理账号
            </div>

            <div class="content" v-else>
                <div>

                    <!--用户信息-->
                    <div class="im-user-wrap radius5px">
                        <div class="im-user-av">
                            <img alt="头像" :src="url + '/' + assistantInfo.avatar">
                        </div>
                        <div class="im-user-con">
                            <div class="im-user-con-t">
                                <div class="im-u-c-t-s">
                                    <span>{{ assistantInfo.nickname }}</span>
                                    <span class="im-u-c-t-switch" @click="switchIMState">{{ imUserStatusList[imUserStatus] }}</span>
                                    <!--切换在线不在线弹窗-->
                                    <div class="im-u-c-t-switch-box" v-if="clickToSwitchState">
                                        <div @click="toChangeUserStatus(1)" style="min-width: 3em; text-align: center;">在线</div>
                                        <div @click="toChangeUserStatus(0)">不在线</div>
                                    </div>
                                    <span>{{ assistantInfo.mobilePhone }}</span>
                                </div>
                                <div class="im-u-c-t-s-edit" @click="toEditMyInfo">
                                    <i class="icon icon-edit"></i>
                                </div>

                            </div>

                            <div style="line-height: 20px; margin: 5px 0;">
                                <p v-if='assistantInfo.profile'>{{assistantInfo.profile }}</p>
                                <p v-else>&nbsp;</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!--聊天面板主体-->
                <div v-if="isAccountEnable" class="im-con-box">
                    <div class="left-panel radius5px" id="left-panel">
                        <div class="panel" id="switchPanel">
                            <a class="box-sizing tc m-unread panel_tab" :class="{'cur': switchTab === 1}" data-type="sessions" @click="switchTab = 1" style="cursor: pointer">
                                <i class="icon icon-comment"></i>
                            </a>
                            <a class="box-sizing tc panel_tab" :class="{'cur': switchTab === 2}" data-type="friends"  @click="switchTab = 2" style="cursor: pointer">
                                <i class="icon icon-comments"></i>
                            </a>
                        </div>
                        <div class="item" id="sessionsWrap" data-type="sessions" v-if="switchTab === 1">
                            <!-- 最近联系人 -->
                            <div class="list">

                                <div id="sessions">
                                    <!--<p>正在获取最近联系人...</p>-->
                                    <!-- 最近联系人列表 -->
                                    <!--<p class="empty">暂无最近联系人哦</p>-->
                                    <ul class="m-panel j-session">
                                        <template v-if="!sessions.length">
                                            <li>
                                                <p class="im-empty">暂无最近联系人哦</p>
                                            </li>
                                        </template>
                                        <template v-else>
                                            <li class="panel_item" data-scene="p2p" data-account="555"

                                                v-for="item of sessions" @click="beforeSendMsg(item)"
                                                v-show="item.lastMsg.sessionId  && xmListType(item.lastMsg)"
                                                :class="{ 'active': item.lastMsg.sessionId === toWhichSessionId }"
                                            >
                                                <div class="panel_avatar">
                                                    <img class="panel_image"
                                                         :src="picPre + '/' + item.path"
                                                    >
                                                </div>
                                                <div class="panel_text">
                                                    <p class="panel_multi-row">
                                                        <span class="panel_nick">{{item.nick}}</span>
                                                        <b class="panel_time">{{item.lastMsg.time | setTime}}</b>
                                                    </p>
                                                    <p class="panel_multi-row">
                                                        <span class="panel_lastMsg">[{{item.lastMsg.type | distinguishType}}]消息</span>
                                                        <!--未读数-->
                                                        <span class="panel_count" v-if="item.unread">
                                                            {{ item.unread }}
                                                        </span>
                                                    </p>
                                                </div>
                                            </li>
                                        </template>


                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="item" id="friendsWrap" data-type="friends" v-if="switchTab === 2">
                            <!-- 好友列表 -->
                            <div class="list">
                                <div id="friends">
                                    <ul class="m-panel j-friend">
                                        <template v-if="!friends.length">
                                            <li>
                                                <p class="im-empty">暂无好友哦</p>
                                            </li>
                                        </template>
                                        <template v-else>
                                            <li class="panel_item" data-scene="p2p" :data-account="item.account"
                                                v-for="item of friendsInfoList"
                                                @click="beforeSendMsgF(item)"
                                                :class="{ 'active': item.account === toWhichUser }"
                                            >
                                                <div class="panel_avatar">
                                                    <img class="panel_image" :src="picPre + '/' + item.avatar">
                                                </div>
                                                <div class="panel_text">
                                                    <p class="panel_single-row">{{ item.nick }}</p>
                                                </div>
                                            </li>
                                        </template>

                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                    <template v-if="isChatWindowShow">
                        <!-- 中间聊天面板 -->
                        <div class="right-panel radius5px" :class="{'hide': !isShowChatVernier}" id="rightPanel">
                            <!-- 聊天面板 -->
                            <div class="im-chat-box radius5px">
                                <div class="im-chat-panel">
                                    <p> {{chatNowInfo.nick }}【{{ chatNowInfo.custom_to_json.channel }}】 {{ chatNowInfoTel }}</p>
                                </div>


                                <div class="chat-content box-sizing" id="chatContent" >


                                    <!--聊天内容主体 -->
                                    <div class="im-chat-wrap" v-el:chat id="chatCon">

                                        <div class="no-msg tc" v-if="!sdkData.getLocalHistory.length">
                                            <span class="radius5px">暂无消息</span>
                                        </div>


                                        <div class="chat-content box-sizing" v-else >
                                            <ul class="chat">

                                                <li class="item"
                                                    :class="item.from == Object.account ? 'item-me' : 'item-you' "
                                                    v-for="item in sdkData.getLocalHistory"

                                                >
                                                    <p class="u-msgTime">- - - - -&nbsp;{{ item.time | setTime }}&nbsp;- -- - -</p>

                                                    <img class="img j-img" :src="item.from | chatAvatarFilter2">

                                                    <template v-if="xmMessageType(item) == 103 || xmMessageType(item) == 102">
                                                        <!--发送打分请求 -->
                                                        <div class="im-chat-custom-scoring-request" v-if="xmMessageType(item) == 103" >
                                                            已发送打分请求
                                                        </div>

                                                        <!--101：推荐助理  102：推荐咨询师-->


                                                        <!-- 咨询助理向用户推荐专家  在  用户与助理聊天页面 UI视图 -->
                                                        <div class="im-chat-custom-recommendation-assistant msg-text msg" v-if="item.from == Object.account && xmMessageType(item) == 102">

                                                            <div class="im-chat-custom-ra-img">
                                                                <img :src="picPre + '/' + item.content_json.data.conslt_avator" alt="">
                                                            </div>

                                                            <div class="im-chat-custom-ra-msg">
                                                                <div>
                                                                    <span>{{ item.content_json.data.conslt_name }}</span> <span>{{ item.content_json.data.conslt_nickName }}</span>
                                                                </div>
                                                                <div class="im-chat-custom-ra-msg-brief-introduction">
                                                                    <p v-if="item.content_json.data.conslt_motto">{{ item.content_json.data.conslt_motto }}</p>
                                                                    <p v-else>&nbsp;</p>

                                                                </div>

                                                            </div>
                                                        </div>



                                                    </template>




                                                    <div class="msg msg-text j-msg" v-else>
                                                        <div class="box">
                                                            <div class="cnt">

                                                                <div class="f-maxWid" v-if="xmMessageType(item) == 104">
                                                                    {{ item.content_json.innerContent }}
                                                                </div>

                                                            <span v-show="xmMessageType(item) == 16 ">
                                                                <!--  看了你主页 -->
                                                                <h3>其他消息</h3>
                                                                <!-- <span>{{item | jsonFilter}}</span> -->
                                                            </span>

                                                                <!--图片消息-->
                                                                <template v-if="item.type == 'image'">
                                                                    <a :href="item.file.url" target="_blank">
                                                                        <img :src="item.file.url" alt="">
                                                                    </a>

                                                                </template>

                                                                <template v-if="item.type == 'audio'">
                                                                    <audio controls>
                                                                        <source :src="item.file.mp3Url" type="audio/ogg">
                                                                    </audio>
                                                                </template>

                                                                <div class="f-maxWid" v-html="item.text | emojiFilter">

                                                                </div>

                                                                <!--  自定义表情 -->
                                                                <span v-show="xmMessageType(item) == 3 ">
                                                                <img class="chartlet" v-bdimgurl="item.content">
                                                            </span>


                                                                <!--  自定义推送 -->
                                                                <span v-show= "xmMessageType(item) == 18 ">
                                                                <div class="xmMessageType">
                                                                    <img class="img" :src="item | imgFilter" alt="">
                                                                    <div class="content">
                                                                       <!-- <a class="textGreen link" :href="item | pushLinkFilter"> -->
                                                                        <a class="textGreen link" href="javascript:;">
                                                                            <h3 class="wordBreak">{{item | linkTextFilter}}</h3>
                                                                            <span class="wordBreak">{{item | innerContentFilter}}</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </span>

                                                            </div>
                                                        </div>
                                                    </div>


                                                    <!-- 专家向用户推荐咨询助理  在  用户与助理聊天页面 UI视图 -->
                                                    <!--<div class="im-chat-custom-recommendation-userSide msg-text msg"  v-if="item.from != Object.account">-->
                                                    <!--<div class="im-chat-custom-ru-msg">-->
                                                    <!--<div>-->
                                                    <!--专家 <span>于忠跃</span> 向我推荐了你，-->
                                                    <!--</div>-->
                                                    <!--<div>-->
                                                    <!--<p>我需要你协助解决咨询相关的问题</p>-->
                                                    <!--</div>-->

                                                    <!--</div>-->

                                                    <!--<div class="im-chat-custom-ru-img">-->
                                                    <!--<img :src="picPre + '/'" alt="">-->
                                                    <!--</div>-->
                                                    <!--</div>-->




                                                </li>

                                            </ul>
                                        </div>


                                    </div>
                                </div>

                                <!-- 操作按钮 -->
                                <div class="im-chat-btn-box">
                                    <emoji v-show='emojiShow' class="emoji"></emoji>
                                    <input type="file" class="hide" id="img" @change="sendFile" v-el='file'
                                           v-if="onchangeState">
                                    <div class="myBtn" onclick="img.click()">图片</div>
                                    <div class="myBtn" @click="sendEmoji" v-show="!emojiShow">选择表情</div>
                                    <div class="myBtn" @click="emojiShow = !emojiShow" v-show="emojiShow">关闭表情</div>


                                    <div class="myBtn" style="width: 100px;" @click="sendAppraise">发送打分请求</div>


                                    <div class="myBtn" style="float: right;width: 100px;" v-if="!isShowCloudMsg" @click="toSeeCloudMsg">查看历史记录</div>
                                    <div class="myBtn" style="float: right;width: 100px;" v-else @click="toCloseCloudMsg">关闭历史记录</div>




                                </div>

                                <!-- 聊天输入框 -->
                                <div class="im-chat-msg-inp">
                                    <textarea v-model="sendInfo" @paste="userPasterFn"></textarea>
                                </div>

                                <div class="im-chat-btn-send-box">
                                    <span class="im-chat-btn-send" @click='sendMsg'>发送</span>
                                </div>

                            </div>
                        </div>

                        <!-- 常用语面板 -->
                        <div class="quickTerm radius5px" :class="{'hide': !isShowQTMsg}">
                            <div class="qt-con">
                                <ul class="qt-con-list">
                                    <li v-for="item in qtList">
                                        <div class="qt-con-list-con" @click="useQT(item.content)">{{item.content}}</div>
                                        <div class="qt-con-list-edit" @click="toAddOrEditQTListFn(item.id, item.content)">
                                            <i class="icon icon-edit"></i>
                                        </div>
                                        <div class="qt-con-list-del" @click="toDeleteQTListFn(item.id)">
                                            <i class="icon icon-trash"></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <span class="qt-add" @click="toAddOrEditQTListFn">新增</span>
                            </div>
                        </div>

                        <!-- 云记录面板 -->
                        <div class="im-cloud-msg-container radius5px" :class="{'hide': !isShowCloudMsg}">
                            <div class="im-chat-panel">
                                <!--<span class="im-chat-btn-send">返回</span>-->
                            </div>

                            <div class="chat-content box-sizing" id="chatContent2">


                                <!--聊天内容主体 -->
                                <div class="im-chat-wrap"  id="chatCon2" style="height: 605px;">

                                    <div class="no-msg tc" v-if="!getAllLocalHistoryList.length">
                                        <span class="radius5px">暂无历史消息</span>
                                    </div>


                                    <div class="chat-content box-sizing" v-else>
                                        <ul class="chat">
                                            <li class="item"
                                                :class="item.from == Object.account ? 'item-me' : 'item-you' "
                                                v-for="item in getAllLocalHistoryList"

                                            >
                                                <p class="u-msgTime">- - - - -&nbsp;{{ item.time | setTime }}&nbsp;- -- - -</p>

                                                <img class="img j-img" :src="item.from | chatAvatarFilter2">

                                                <template v-if="xmMessageType(item) == 103 || xmMessageType(item) == 102">
                                                    <!--发送打分请求 -->
                                                    <div class="im-chat-custom-scoring-request" v-if="xmMessageType(item) == 103" >
                                                        已发送打分请求
                                                    </div>

                                                    <!--101：推荐助理  102：推荐咨询师-->


                                                    <!-- 咨询助理向用户推荐专家  在  用户与助理聊天页面 UI视图 -->
                                                    <div class="im-chat-custom-recommendation-assistant msg-text msg" v-if="item.from == Object.account && xmMessageType(item) == 102">

                                                        <div class="im-chat-custom-ra-img">
                                                            <img :src="picPre + '/' + item.content_json.data.conslt_avator" alt="">
                                                        </div>

                                                        <div class="im-chat-custom-ra-msg">
                                                            <div>
                                                                <span>{{ item.content_json.data.conslt_name }}</span> <span>{{ item.content_json.data.conslt_nickName }}</span>
                                                            </div>
                                                            <div class="im-chat-custom-ra-msg-brief-introduction">
                                                                <p v-if="item.content_json.data.conslt_motto">{{ item.content_json.data.conslt_motto }}</p>
                                                                <p v-else>暂无专家格言</p>

                                                            </div>

                                                        </div>
                                                    </div>



                                                </template>


                                                <div class="msg msg-text j-msg" v-else>
                                                    <div class="box">
                                                        <div class="cnt">

                                                            <div class="f-maxWid" v-if="xmMessageType(item) == 104">
                                                                {{ item.content_json.innerContent }}
                                                            </div>

                                                            <span v-show="xmMessageType(item) == 16 ">
                                                                <!--  看了你主页 -->
                                                                <h3>其他消息</h3>
                                                                <!-- <span>{{item | jsonFilter}}</span> -->
                                                            </span>

                                                            <!--图片消息-->
                                                            <template v-if="item.type == 'image'">
                                                                <a :href="item.file.url" target="_blank">
                                                                    <img :src="item.file.url" alt="">
                                                                </a>

                                                            </template>

                                                            <template v-if="item.type == 'audio'">
                                                                <audio controls>
                                                                    <source :src="item.file.mp3Url" type="audio/ogg">
                                                                </audio>
                                                            </template>

                                                            <div class="f-maxWid" v-html="item.text | emojiFilter">

                                                            </div>

                                                            <!--  自定义表情 -->
                                                            <span v-show="xmMessageType(item) == 3 ">
                                                                <img class="chartlet" v-bdimgurl="item.content">
                                                            </span>


                                                            <!--  自定义推送 -->
                                                            <span v-show= "xmMessageType(item) == 18 ">
                                                                <div class="xmMessageType">
                                                                    <img class="img" :src="item | imgFilter" alt="">
                                                                    <div class="content">
                                                                       <!-- <a class="textGreen link" :href="item | pushLinkFilter"> -->
                                                                        <a class="textGreen link" href="javascript:;">
                                                                            <h3 class="wordBreak">{{item | linkTextFilter}}</h3>
                                                                            <span class="wordBreak">{{item | innerContentFilter}}</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>


                                            </li>

                                        </ul>
                                    </div>



                                </div>




                            </div>

                            <!--分页-->
                            <div class='bottom'>
                                <div id="test">
                                    <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"
                                              :page-handler="pageHandler" :create-url="createUrl">
                                    </zpagenav>
                                </div>
                            </div>
                        </div>
                    </template>





                </div>

                <div v-else class="im-chat-box" style="line-height: 100px;color: red;text-align: center;">
                    您的账号还未启用，您可以修改您的个人资料
                </div>

            </div>





        </div>

        <!-- 添加或编辑常用语弹框 -->
        <div class="im-m-card" :class="{'hide': !isShowQTCard}" style="left: 600px;">
            <p class="im-m-card-title">常用语内容</p>
            <textarea v-model="qtEditContent"></textarea>

            <div class="im-m-card-btn-box">
                <span class="" @click="qtSaveFn">保存</span>
                <span class="" @click="closeWindowFn">取消</span>
            </div>
        </div>

        <!-- 发送评价弹窗 -->
        <div class="im-m-card" :class="{'hide': !isShowAppraise}" style="margin-top: -200px; width: 300px;">
            <p class="im-m-card-title">确认发送评价请求吗？</p>


            <div class="im-m-card-btn-box im-m-card-btn-box-2">
                <span class="" @click="sureToSendA" v-if="!isSendingPJ">确定</span>
                <span class=""  style="width: 3em;" v-else>发送中</span>

                <span class="" @click="closeWindowFn">取消</span>
            </div>
        </div>


        <!-- 即将发送咨询师推荐咨询师代码 -->
        <div class="im-m-card" :class="{'hide': !isShowRecommendAConsultant}" style="margin-top: -200px; width: 400px;">
            <p class="im-m-card-title">检测到您粘贴的内容为发送咨询师的链接，请确认是否发送</p>


            <div class="im-m-card-btn-box im-m-card-btn-box-2">

                <span class="" @click="sureToSendRecommend" v-if="! isSendingRecomentAC" style="min-width: 5em;">确定发送</span>

                <span class="" style="min-width: 5em;" v-else>发送中...</span>

                <span class="" @click="closeWindowFn" style="min-width: 5em;">取消发送</span>

            </div>
        </div>


        <!-- 退出确认框 -->
        <div class="dialog radius5px" :class="{'hide': !isShowLogoutDialog}" id="logoutDialog">
            <span class="icon icon-close j-close"></span>
            <div class="content tc">确定要退出云信网页版吗？</div>
            <div class="buttons tc">
                <button class="btn radius4px btn-cancel j-close">取消</button>
                <button class="btn radius4px btn-ok j-ok">确定</button>
            </div>
        </div>


        <!--个人信息-->
        <div class="m-card-self m-card-1" :class="{'hide': !isShowMyInfo}" id="myInfo">
            <div class="modal-body row-fluid" style="max-height: 800px;">

                <div class="form-horizontal">
                    <label class="control-label">昵称 :</label>
                    <div class="controls form-horizontal">
                        <input type="text" class="span11 username" v-model="assistantInfoChange.nickname" name=""
                               placeholder="请输入昵称" style="width: 286px;">
                    </div>
                </div>
                <div class="form-horizontal">
                    <label class="control-label">头像 :</label>
                    <div class="controls form-horizontal">
                        <div class="wrap">
                            <div class="box-img" style="margin-bottom: 20px">
                                <div>
                                    <img alt="请上传图片" width="300" height="200" :src="url + id1">
                                </div>
                                <div class="box-bottom">
                                    <span class="item_title_btn" onclick="file0.click()" v-if="! sending0">上传</span>
                                    <span class="item_title_btn_sending" v-else>上传中...</span>


                                    <input type="file" accept="image/*" @change="readFile" data-type="0" id="file0"
                                           class="hide">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="form-horizontal">
                    <label class="control-label">手机号 :</label>
                    <div class="controls form-horizontal">
                        <input type="text" class="span11 username" v-model="assistantInfoChange.mobilePhone" name="" maxlength="11"
                               @keyup="inputChange"
                               data-key="tel"
                               placeholder="请输入手机号" style="width: 286px;">
                    </div>
                </div>

                <div class="form-horizontal">
                    <label class="control-label">简介 :</label>
                    <div class="controls form-horizontal">
                        <textarea style="margin: 0px; width: 296px; height: 100px;" v-model="assistantInfoChange.profile"></textarea>
                    </div>
                </div>


                <div class="im-m-card-btn-box im-m-card-btn-box-2">
                    <span class="" @click="closeWindowFn">取消</span>
                    <span class="" @click="toSaveAssistantFn">保存</span>
                </div>





            </div>
        </div>

        <div id="mask" class="mask" :class="{'hide': !isNeedMask}"></div>
    </div>
</template>
<script>
    var nim;
    import emoji from '../emoji.vue'
    import uploadinfo from '../uploadInfo.vue'

    import Vue from "vue"
    import zpagenav from "vue-pagenav"

    import { serialize } from "../../../utils"

    import {
        getResponse,
        getResponses,
        getResponsesExcel

    } from "../../../api"

    Vue.use(zpagenav)

    export default {
        components: { //声明组件
            emoji,
            uploadinfo
        },
        data() {
            return {
                isUserHasImAccount: false, // 是否是咨询助理

                isNeedMask: false,
                isShowMyInfo: false,
                isShowLogoutDialog: false,
                isShowChatVernier: true,
                isShowQTCard: false,
                isShowQTMsg: true,
                isShowCloudMsg: false,

                isShowCloud: false, // 云记录面板展开与否





                picPre: `http://${process.env.NODE_ENV == 'production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
                // picPre: 'http://picture.120xinmao.com',
                // loginMsg: {
                //     account: 'netease3791369466953728',
                //     pwd: '123456',  //  => MD5  => token
                //     token: 'c95a9873885b4a558c1136ed412f1fb2',
                //     appKey: 'bef34cabae59b15e9238a4cf0b33461a',
                //     errorMsg: 'unlogin' //判断登入状态
                // },


                loginMsg: {
                    account: '',
                    pwd: '123456',  //  => MD5  => token
                    token: '',
                    appKey: 'bef34cabae59b15e9238a4cf0b33461a',
                    errorMsg: 'unlogin' //判断登入状态
                },


                Object: { // 用户
                    account: '',
                    avatar: '',
                    createTime: '',
                    gender: '',
                    nick: '',
                    updateTime: '',
                    tel: '',
                },


                chatImgShow: false, //点击查看大图
                chatImgPath: '',

                myInfoShow: false, // 修改我的信息

                emojiShow: false,
                emojiObj: {  // 大表情

                },

                sdkHistoryFilterNum: 0, // 聊天记录
                sdkHistoryFilterTemp: 0, // 发送保持

                sendInfo: '', // 发送的信息
                onchangeState: true, // 重新生成input节点

                sdkData: { // sdk data
                    sessions: [], //新消息列表  左边列表  新消息
                    getLocalHistory: [], // 右边 本地 对话消息记录
                    users: [], // 用户信息
                    getAllLocalHistory: [], // 总历史记录
                },

                sessions: [],//左边列表 新消息列表
                sessionsAvater: {},//左边列表 新消息列表

                friends: [], // 左边列表  好友列表
                friendsIdsList: [], // 好友ID数组
                friendsInfoList: [], // 好友个人信息列表

                toWhichUser: '', //向哪个账号发送
                toWhichScene: '', //向哪个场景发送
                toWhichSessionId: '', //正在向哪个对话ID聊天
                toWhichUserAvatar: '', //对方头像
                isChatWindowShow: false,

                // 常用语消息列表
                qtList: [],
                qtEditContent: '',
                qtId: '',

                clickToSwitchState: false,
                isShowAppraise: false,

                // 发送推荐咨询师弹窗
                isShowRecommendAConsultant: false,
                isSendingRecomentAC: false,





                // 上传头像相关
                url: `http://${process.env.NODE_ENV == 'production' ? "picture.120xinmao.com/" : "oml9ntix5.qnssl.com/" }`,
                token: '',
                id: '',
                id1: '',

                tList: ['', '', '', ''],
                sending0: false,

                // 左侧面板联系人和好友切换
                switchTab: 1,

                // 当前聊天对象个人信息
                chatNowInfo: {},
                chatNowInfoTel: '',

                // 分页
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 100, //total item count
                maxLink: 20, //how many links to show, must not less than 5,  default is 5
                pageSize: 20,

                getAllLocalHistoryList: [],

                // 助理主动找用户聊天
                // drivingUserID: window.location.pathname.split("/")[2],

                drivingUserID: '',
                loginNeedPhone: sessionStorage.userphone,

                // 账号是否启用
                isAccountEnable: false,


                // 助理账号ID
                assistantCaid: '',
                assistantInfo: {
                    avatar: '',
                    caid: '',
                    mobilePhone: '',
                    nickname: '',
                    profile: '',
                    imAccount: '',
                },

                assistantInfoChange: {
                    avatar: '',
                    caid: '',
                    mobilePhone: '',
                    nickname: '',
                    profile: ''
                },

                // 在线不在线状态  status	1 在线 0 不在线
                imUserStatus: '',
                imUserStatusList: ['不在线', '在线'],

                // 粘贴事件匹配成功后，将此时粘贴板的消息保存下来
                soonSendRecomentText: '',

                // 私信状态跳转过来 private letter
                isPrivateLetterState: false,
                // privateLetterImAccount: window.location.pathname.split('/')[2],
                privateLetterImAccount: this.$route.query.id,

                isSendingPJ: '',

                //好友列表 超过限制后需要循环处理的数组个数
                cycleNumber: 0,
                limitNumber: 150,
                cycleNumberCheck: 0,
                cycleNumberArr: [],

                //会话列表 超过限制后需要循环处理的数组个数
                cycleNumber2: 0,
                limitNumber2: 150,
                cycleNumberCheck2: 0,
                cycleNumberArr2: [],






            }
        },
        watch: {
            'toWhichSessionId':function(now){
                console.log(this.isShowCloudMsg)
                this.isShowCloudMsg = false
                this.isShowQTMsg = true
                this.getLocalHistory()
                this.getToWhichUserAvatar()
            },
            'sessions':function(now,old){

            },
            page() {

                console.log(this.page)
                this.allHistoryChangePage()
            }
        },

        computed: {
            sdkHistoryFilter: function() {
                let res = this.sdkData.getLocalHistory.slice(this.sdkHistoryFilterNum, this.sdkHistoryFilterNum+5).reverse()
                console.log("res:",res)

                return  res
            }
        },



        methods: {


            xmMessageType(json) {
                let content = json.content,
                    type = json.type,
                    xmMessageType = ''
                if (type == 'custom') {
                    try {
                        let contentObj = JSON.parse(content),
                        type = contentObj.xmMessageType
                        xmMessageType = type
                    } catch (e) {
                        console.log(e)
                    }

                } else {

                }
                return xmMessageType
            },
            xmListType(lastMsg) {
                let bool = true
                let type = lastMsg.type
                if (type == 'custom') {
                    try {
                        let xmType = JSON.parse(lastMsg.content).xmMessageType
                        if (xmType != 3 && xmType != 102 && xmType != 103 && xmType != 104 && xmType != 105) {
                            bool = false
                        }
                    } catch(e) {
                        console.log(e)

                    }

                }
                return bool
            },
            validate() { // 登录验证
                setCookie('uid', this.loginMsg.account.toLocaleLowerCase())
                setCookie('sdktoken', this.loginMsg.token)
                this.sdk()
            },
            unvalidate() {
                // 断开 IM
                nim.disconnect();

                delCookie('uid');
                delCookie('sdktoken');

                this.$route.router.go("/welcome")
                window.location.reload()

            },
            getSearchVal() { // 某个聊天成员
                console.log(`搜索聊天成员：${searchVal.words}`);
            },
            chatWith() { // 全部聊天成员
                console.log(`全部聊天成员：${searchVal.words}`);
            },
            sdk() {
                let _this = this
                window._chatImThis = this

                var data = {}
                // 注意这里, 引入的 SDK 文件不一样的话, 你可能需要使用 SDK.NIM.getInstance 来调用接口
                nim = NIM.getInstance({
                    // debug: true,
                    db: true,
                    // appKey: 'bef34cabae59b15e9238a4cf0b33461a',  // 心猫
                    appKey: _this.loginMsg.appKey,  // 心猫
                    account: readCookie('uid'), //
                    token: readCookie('sdktoken'), //
                    onconnect: onConnect,
                    onwillreconnect: onWillReconnect,
                    ondisconnect: onDisconnect,
                    onerror: onError,
                    onmyinfo: onMyInfo,
                    onroamingmsgs: onRoamingMsgs,
                    onofflinemsgs: onOfflineMsgs,
                    onsessions: onSessions,
                    onupdatesession: onUpdateSession,
                    onusers: onUsers,
                    onfriends: onFriends,
                    onsyncfriendaction: onSyncFriendAction

                })

                console.log(nim)

                console.log('db:' + NIM.support.db) // 支持数据库



                function onFriends(friends) {
                    // console.log('收到好友列表', JSON.stringify(friends)); // JSON.stringify(friends)
                    data.friends = nim.mergeFriends(data.friends, friends);
                    data.friends = nim.cutFriends(data.friends, friends.invalid);
                    _this.friends = data.friends

                    if (_this.friends.length) {
                        // 获取好友列表账号
                        _this.friends.forEach((item) => {
                            _this.friendsIdsList.push(item.account)
                        });

                        console.log("---------------------个数", _this.friendsIdsList.length)


                        if (_this.friendsIdsList.length > _this.limitNumber) {
                            console.log('----------------------')
                            let diffeN = _this.friendsIdsList.length / _this.limitNumber
                            _this.cycleNumber = parseInt(diffeN) < diffeN ? parseInt(diffeN) + 1 : parseInt(diffeN)
                            _this.cycleNumberCheck = 1
                            _this.cycleNumberArr = []
                            for (let i = 1; i <= _this.cycleNumber; i++) {

                                let limitArr = _this.friendsIdsList.slice((i - 1) * _this.limitNumber, i * _this.limitNumber)
                                // console.log('----------------------', limitArr)
                                nim.getUsers({
                                    accounts:  limitArr,
                                    done: getUsersDone2
                                });
                            }

                        } else {
                            //根据账号获取用户组信息
                            nim.getUsers({
                                accounts:  _this.friendsIdsList,
                                done: getUsersDone
                            });
                        }


                    }



                    // refreshFriendsUI();
                }


                function getUsersDone2(error, users) {

                    _this.cycleNumberCheck++;
                    _this.cycleNumberArr += users;

                    // console.log( _this.cycleNumberCheck )





                    // console.log('获取用户资料数组' + (!error?'成功':'失败'));
                    if (!error && _this.cycleNumberCheck === _this.cycleNumber) {
                        console.log(_this.cycleNumberCheck, _this.cycleNumberArr)
                        onUsersFriends(_this.cycleNumberArr);
                    }
                }

                function getUsersDone(error, users) {
                    console.log(error);
                    console.log(users);



                    // console.log('获取用户资料数组' + (!error?'成功':'失败'));
                    if (!error) {
                        onUsersFriends(users);
                    }
                }

                function onUsersFriends(users) {
                    data.users = nim.mergeUsers(data.users, users);
                    _this.friendsInfoList = data.users
                    //
                    // 好友列表排序
                    _this.friendsInfoList.sort((a, b) => {
                        return (a.createTime - b.createTime)
                    }).reverse()

                    // console.log('------------好友列表重新排序后------------------------', _this.friendsInfoList)

                    // console.log('收到haoyou用户名片列表', JSON.stringify(users));



                }

                function onSyncFriendAction(obj) {
                    console.log(obj);
                    switch (obj.type) {
                        case 'addFriend':
                            console.log('你在其它端直接加了一个好友' + obj.account + ', 附言' + obj.ps);
                            onAddFriend(obj.friend);
                            break;
                        case 'applyFriend':
                            console.log('你在其它端申请加了一个好友' + obj.account + ', 附言' + obj.ps);
                            break;
                        case 'passFriendApply':
                            console.log('你在其它端通过了一个好友申请' + obj.account + ', 附言' + obj.ps);
                            onAddFriend(obj.friend);
                            break;
                        case 'rejectFriendApply':
                            console.log('你在其它端拒绝了一个好友申请' + obj.account + ', 附言' + obj.ps);
                            break;
                        case 'deleteFriend':
                            console.log('你在其它端删了一个好友' + obj.account);
                            onDeleteFriend(obj.account);
                            break;
                        case 'updateFriend':
                            console.log('你在其它端更新了一个好友', obj.friend);
                            onUpdateFriend(obj.friend);
                            break;
                    }
                }

                function onAddFriend(friend) {
                    data.friends = nim.mergeFriends(data.friends, friend);
                }

                function onDeleteFriend(account) {
                    data.friends = nim.cutFriendsByAccounts(data.friends, account);
                }

                function onUpdateFriend(friend) {
                    data.friends = nim.mergeFriends(data.friends, friend);
                }



                function onUsers(users) {
                    data.users = nim.mergeUsers(data.users, users);
                    _this.sdkData.users = data.users
                    // console.log('收到用户名片列表', JSON.stringify(users));
                }





                function onRoamingMsgs(obj) {
                    console.log('漫游消息', obj);

                }

                function onOfflineMsgs(obj) {
                    console.log('收到离线消息', obj);

                }

                function onMyInfo(data) {
                    console.log('onMyInfo');
                    console.log(data.account)

                    _this.Object.account = data.account
                    _this.Object.avatar = data.avatar
                    _this.Object.createTime = data.createTime
                    _this.Object.gender = data.gender
                    _this.Object.nick = data.nick
                    _this.Object.updateTime = data.updateTime
                    console.log(_this.Object.updateTime)
                }

                function onConnect(data) {
                    console.log(data)
                    _this.loginMsg = '连接成功'
                    console.log("连接成功----------------", _this.loginMsg)
                }

                function onWillReconnect(obj) {
                    // 此时说明 SDK 已经断开连接 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
                    console.log('即将重连');
                    console.log(obj.retryCount);
                    console.log(obj.duration);
                }

                function onDisconnect(error) {
                    // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
                    alert(`丢失连接:${error.message}`)
                    if (error) {
                        switch (error.code) {
                            // 账号或者密码错误, 请跳转到登录页面并提示错误
                            case 302:
                                break;
                            // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误

                            case 417:
                                break;
                            // 被踢, 请提示错误后跳转到登录页面
                            case 'kicked':
                                break;
                            default:
                                break;
                        }
                    }
                }

                function onError(error) {
                    console.log(error);
                }

                function onSessions(sessions) {



                    data.sessions = nim.mergeSessions(data.sessions, sessions)
                    console.log(data.sessions)
                    _this.sdkData.sessions = data.sessions
                    // getAvatar(data.sessions)
                    getAvatarFilter(data.sessions)
                    _this.getLocalHistory() // 刷新界面

                }

                function onUpdateSession(session) {
                    console.log('会话更新了')

                    // 标签页title闪烁
                    if (isShine) {
                        console.log(imIsShineT)
                        !imIsShineT && (imIsShineT = setInterval(imShineIndexFn, 500));
                    } else {
                        console.log(imIsShineT)

                        clearInterval(imIsShineT);
                        console.log(imIsShineT)

                    }


                    // 向上层发送消息
                    if (window.location.pathname.split("?")[0].split("/")[1] !== "imChat"  && session.unread > 0) {
                        document.querySelector('#im-unread-number-id-wrap').style.display = "list-item"
                        document.querySelector("#im-unread-number-id").innerHTML = session.unread






                    } else {
                        document.querySelector('#im-unread-number-id-wrap').style.display = "none"
                    }




                    data.sessions = nim.mergeSessions(data.sessions, session)
                    _this.sdkData.sessions = data.sessions
                     // getAvatar(data.sessions)
                    getAvatarFilter(data.sessions)
                    _this.getLocalHistory(); // 刷新界面

                    nim.getFriends({
                        done: getFriendsDone
                    });

                    function getFriendsDone(error, friends) {
                        console.log('获取好友列表' + (!error?'成功':'失败'), error, friends);
                        if (!error) {
                            onFriends(friends);
                        }
                    }

                }




                function getAvatarFilter(sessions) {   //   对话不过滤 只过滤需要显示头像的账号
                    let arr = [], avatarArr = []
                    sessions.forEach((item) => {
                        if (accountFliter(item.lastMsg)) {
                            let account = item.id.split('-')[1]  //// 111111111111111111111
                            arr.push(account)
                        }
                    })

                    // console.log(arr.length)

                    if (arr.length > _this.limitNumber2) {
                        console.log('----------------------')
                        let diffeN = arr.length / _this.limitNumber2
                        _this.cycleNumber2 = parseInt(diffeN) < diffeN ? parseInt(diffeN) + 1 : parseInt(diffeN)
                        _this.cycleNumberCheck2 = 1
                        _this.cycleNumberArr2 = []
                        for (let i = 1; i <= _this.cycleNumber2; i++) {

                            let limitArr = arr.slice((i - 1) * _this.limitNumber2, i * _this.limitNumber2)
                            console.log('----------------------', limitArr)
                            nim.getUsers({
                                accounts: limitArr,
                                done: setChatList2
                            })

                        }

                    } else {
                        //根据账号获取用户组信息
                        nim.getUsers({
                            accounts: arr,
                            done: setChatList
                        })

                    }


                }


                function setChatList2(error, users) {

                    _this.cycleNumberCheck2++;
                    _this.cycleNumberArr2 += users;

                    console.log('hahhahahahah-----------', _this.cycleNumberCheck2 )
                    if (!error) {
                        users.forEach((item, index) => {
                            console.log(item)
                            _this.sdkData.sessions.forEach((chat) => {
                                if (chat.id.split('-')[1] == item.account) {
                                    chat.path = item.avatar
                                    chat.nick = item.nick
                                }
                            })
                        })
                    }

                    if (_this.cycleNumberCheck2 === _this.cycleNumber2) {



                        _this.sessions = _this.sdkData.sessions

                        console.log('-----------分割线------------------------------------------------------------------')

                        if (_this.isPrivateLetterState) {

                            console.log(_this.isPrivateLetterState)

                            _this.sessions.forEach((item) => {

                                console.log(item.to)
                                if (item.to === _this.privateLetterImAccount) {
                                    _this.beforeSendMsg(item)

                                    _this.isPrivateLetterState = false
                                }
                            })
                        }
                    }





                }

                function accountFliter(lastMsg) {
                    let bool = true
                    let type = lastMsg.type
                    if (type == 'custom') {
                        try {
                            let xmType = JSON.parse(lastMsg.content).xmMessageType
                            if (xmType != 3 && xmType != 102 && xmType != 103 && xmType != 104 && xmType != 105) {
                                bool = false
                            }
                        } catch(e) {
                            console.log(e)
                        }


                    }
                    return bool
                }


                function setChatList(error, users) {
                    if (!error) {
                        users.forEach((item, index) => {
                            _this.sdkData.sessions.forEach((chat) => {
                                if (chat.id.split('-')[1] == item.account) {
                                    chat.path = item.avatar
                                    chat.nick = item.nick
                                }
                            })
                        })
                    }
                    _this.sessions = _this.sdkData.sessions

                    console.log('-----------分割线------------------------------------------------------------------')

                    if (_this.isPrivateLetterState) {

                        console.log(_this.isPrivateLetterState)

                        _this.sessions.forEach((item) => {

                            console.log(item.to)
                            if (item.to === _this.privateLetterImAccount) {
                                _this.beforeSendMsg(item)

                                _this.isPrivateLetterState = false
                            }
                        })
                    }



                }





            },

            bb() {
                var title = document.title;
                if (/新/.test(title) == false) {
                    document.title = '【你有新消息】';
                } else {
                    document.title = '【　　　　　】';

                }
            },

            beforeSendMsg(obj) { //点击左边消息栏 确定发送对象
                console.log('发送')
                this.isChatWindowShow = true

                var _this = this

                this.toWhichUser = obj.lastMsg.sessionId.split('-')[1]
                this.toWhichScene = obj.scene
                this.toWhichSessionId = obj.lastMsg.sessionId
                nim.resetSessionUnread(obj.lastMsg.sessionId) // 设置已读

            //    当前聊天对象个人信息

                nim.getUser({
                    account: obj.to,
                    done: getUserDoneNew
                });

                function getUserDoneNew(error, user) {
                    console.log(error);
                    console.log('获取用户资料---------------------------',user);
                    _this.chatNowInfo = user


                    try {
                        _this.chatNowInfo.custom_to_json = JSON.parse(user.custom)
                        console.log('---------------------------------',_this.chatNowInfo)
                        // _this.chatNowInfo.forEach((index, item) => {
                        //     _this.chatNowInfo[index].custom_to_json = JSON.parse(item.custom)
                        //     // try {
                        //     //     _this.chatNowInfo[index].custom_to_json = JSON.parse(item.custom)
                        //     //     console.log('---------------------------------',_this.chatNowInfo)
                        //     //
                        //     // } catch(e) {
                        //     //     console.log(e)
                        //     // }
                        // })
                        console.log('获取用户资料' + (!error?'成功':'失败'));

                        // 根据用户mid获取用户手机号
                        _this.obtainUserTelByMidFn(_this.chatNowInfo.custom_to_json.mid)

                    } catch(e) {
                        console.log("用户资料JSON转化出错", e)
                    }




                }



            },

            async obtainUserTelByMidFn(mid) {

                // 调用用户信息接口
                const data = await getResponses('depression/member/selectById.json', `id=${mid}`)
                if (data.code === 0) {
                    console.log('用户信息--------------------------------------', data)

                    if (data.member) {
                        this.chatNowInfoTel = data.member.mobilePhone
                    } else {
                        this.chatNowInfoTel = '暂无用户手机号信息'
                    }




                } else {
                    alert(data.msg)
                }


            },

            // 点击好友列表，确定发送对象
            beforeSendMsgF(obj) { //点击好友列表，确定发送对象
                console.log('好友列表发送消息', obj)
                this.isChatWindowShow = true


                var _this = this

                this.toWhichUser = obj.account
                this.toWhichScene = 'p2p'
                this.toWhichSessionId = 'p2p-' + obj.account
                nim.resetSessionUnread(obj.account) // 设置已读

                //    当前聊天对象个人信息

                //    当前聊天对象个人信息

                nim.getUser({
                    account: obj.account,
                    done: getUserDoneNew
                });

                function getUserDoneNew(error, user) {
                    console.log(error);
                    console.log('获取好友个人资料---------------------------',user);
                    _this.chatNowInfo = user


                    try {
                        _this.chatNowInfo.custom_to_json = JSON.parse(user.custom)
                        console.log('---------------------------------',_this.chatNowInfo)
                        // _this.chatNowInfo.forEach((index, item) => {
                        //     _this.chatNowInfo[index].custom_to_json = JSON.parse(item.custom)
                        //     // try {
                        //     //     _this.chatNowInfo[index].custom_to_json = JSON.parse(item.custom)
                        //     //     console.log('---------------------------------',_this.chatNowInfo)
                        //     //
                        //     // } catch(e) {
                        //     //     console.log(e)
                        //     // }
                        // })
                        console.log('获取用户资料' + (!error?'成功':'失败'));

                        // 根据用户mid获取用户手机号
                        _this.obtainUserTelByMidFn(_this.chatNowInfo.custom_to_json.mid)

                    } catch(e) {
                        console.log("用户资料JSON转化出错", e)
                    }




                }


                // this.chatNowInfo = obj

            },



            sendMsg() {


                // this.sdkHistoryFilterNum = 0

                if (this.sendInfo.length == 0) {
                    alert('请输入要发送的信息')
                    return
                }



                // if (this.sendInfo.trim().indexOf("xmMessageType") !== -1 &&  this.sendInfo.trim().indexOf('102') !== -1 && this.sendInfo.trim().indexOf('conslt_motto') !== -1 && this.sendInfo.trim().indexOf('conslt_name') !== -1 && this.sendInfo.trim().indexOf('conslt_id') !== -1 && this.sendInfo.trim().indexOf('conslt_avator') !== -1 && this.sendInfo.trim().indexOf('conslt_nickName') !== -1  ) {
                //
                //     this.sendCustomRecommendToUser()
                //     return
                //
                // }


                var _this = this

                var msg = nim.sendText({
                    scene: _this.toWhichScene,
                    // scene: 'p2p',
                    to: _this.toWhichUser,
                    // to: 'netease3468247822123008',
                    text: _this.sendInfo,
                    done: sendMsgDone
                });

                console.log('正在发送p2p text消息, id=' + msg.idClient);

                function sendMsgDone(error, msg) {
                    console.log(error);
                    console.log(msg);
                    console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
                }

                function pushMsg(msgs) {
                    if (!Array.isArray(msgs)) {
                        msgs = [msgs];
                    }
                    var sessionId = msgs[0].sessionId;
                }

                pushMsg(msg);
                this.sendInfo = ''
            },
            sendCustomMsg(emojiObj) {  // 发送表情

                let resNum = (parseInt(emojiObj.emoji) + 1)

                if (resNum < 10) {
                    emojiObj.emoji = '00' + resNum
                }

                if (resNum >= 10 && resNum < 100) {
                    emojiObj.emoji = '0' + resNum
                }

                var content = {
                    xmMessageType: 3,
                    data: {
                        catalog: emojiObj.category,
                        chartlet: `${emojiObj.category}${emojiObj.emoji}`
                    }
                };

                var _this = this
                var msg = nim.sendCustomMsg({
                    scene: 'p2p',
                    to: _this.toWhichUser,
                    content: JSON.stringify(content),
                    done: sendMsgDone
                });

                pushMsg(msg);

                function pushMsg(msgs) {
                    if (!Array.isArray(msgs)) {
                        msgs = [msgs];
                    }
                    var sessionId = msgs[0].sessionId;
                }

                function sendMsgDone(error, msg) {
                    console.log('大表情：' + (!error ? '成功' : '失败'))
                }


            },

            // 发送评价请求
            sendPJCustomMsg(asid) {  // 发送评价请求
                let content = {
                    xmMessageType: 103,
                    data: {
                        xmMessageType: 103,
                        grade_content: '请对我的服务打分，祝您生活愉快！',
                        grade_id: this.assistantInfo.caid,
                        asid: asid
                    }
                };

                let _this = this
                let msg = nim.sendCustomMsg({
                    scene: 'p2p',
                    to: _this.toWhichUser,
                    // to: 'netease3546085578145792',
                    content: JSON.stringify(content),
                    done: sendMsgDone
                });

                pushMsg(msg);

                function pushMsg(msgs) {
                    if (!Array.isArray(msgs)) {
                        msgs = [msgs];
                    }
                    var sessionId = msgs[0].sessionId;
                }

                function sendMsgDone(error, msg) {
                    console.log('发送评价请求：' + (!error ? '成功' : '失败'))


                }


            },

            // 检测输入框粘贴事件
            userPasterFn(e) {
                console.log(e)
                console.log(this.sendInfo)
                let sendInfoBeforeValue = this.sendInfo
                let text = e.clipboardData.getData('Text')
                console.log(text)

                let _this = this

                try {
                    let a = JSON.parse(text)

                    if (a.xmMessageType === 102) {
                        // 发送推荐咨询师自定义消息
                        _this.isNeedMask = true
                        _this.isShowRecommendAConsultant = true
                        _this.soonSendRecomentText = text
                        e.preventDefault();

                    }
                } catch (error){
                    console.log(error)
                    // 不执行发送自定义消息，直接发送字符串信息
                }

                console.log('粘贴完成时---------------', sendInfoBeforeValue, this.sendInfo)

            },

            sureToSendRecommend() {
                console.log("成功了")

                this.isSendingRecomentAC = true


                this.sendCustomRecommendToUser()
            },

            // 发送自定义消息  助理给用户推荐专家
            sendCustomRecommendToUser() {  //

                // console.log(this.sendInfo.trim().split("\}\}")[0].trim() + "\}\}")
                //
                // let a = this.sendInfo.trim().split("\}\}")[0].trim() + "\}\}"
                // console.log(JSON.parse(a))

                // let content = JSON.parse(this.sendInfo.trim())


                // let content = {
                //     xmMessageType: 102,
                //     data: {
                //         xmMessageType: 102,
                //         conslt_motto: '测试格言', //专家格言
                //         conslt_name: '测试姓名', //专家姓名
                //         conslt_id: '1169600',  // 专家id
                //         conslt_avator: 'music_1515915139000.png', // 专家头像
                //         conslt_nickName: '测试头衔', // 专家头衔
                //     }
                // };




                let _this = this

                try {
                    let content = JSON.parse(this.soonSendRecomentText)
                    content.data.caid =  this.assistantInfo.caid
                    content.data.statusCode = new Date().getTime()

                    let msg = nim.sendCustomMsg({
                        scene: 'p2p',
                        to: _this.toWhichUser,
                        // to: 'netease3279954971394048',
                        content: JSON.stringify(content),
                        done: sendMsgDone
                    });

                    pushMsg(msg);

                    function pushMsg(msgs) {
                        if (!Array.isArray(msgs)) {
                            msgs = [msgs];
                        }
                        var sessionId = msgs[0].sessionId;
                    }

                    function sendMsgDone(error, msg) {
                        console.log('发送推荐专家消息：' + (!error ? '成功' : '失败'))

                        console.log('--------------', content)
                        _this.isSendingRecomentAC = false
                        _this.isNeedMask = false
                        _this.isShowRecommendAConsultant = false
                    }

                } catch(e) {
                    console.log(e)
                }




            },




            sendFile(e) {
                let _this = this
                nim.sendFile({
                    scene: 'p2p',
                    to: _this.toWhichUser,
                    type: 'image',
                    fileInput: e.target,
                    beginupload: function (upload) {
                        // - 如果开发者传入 fileInput, 在此回调之前不能修改 fileInput
                        // - 在此回调之后可以取消图片上传, 此回调会接收一个参数 `upload`, 调用 `upload.abort();` 来取消文件上传
                    },
                    uploadprogress: function (obj) {
                        console.log('文件总大小: ' + obj.total + 'bytes');
                        console.log('已经上传的大小: ' + obj.loaded + 'bytes');
                        console.log('上传进度: ' + obj.percentage);
                        console.log('上传进度文本: ' + obj.percentageText);
                    },
                    uploaddone: function (error, file) {
                        console.log(error);
                        console.log(file);
                        console.log('上传' + (!error ? '成功' : '失败'));
                    },
                    beforesend: function (msg) {
                        console.log('正在发送p2p image消息, id=' + msg.idClient);
                        pushMsg(msg);
                    },
                    done: sendMsgDone
                });

                function sendMsgDone(error, msg) {
                    console.log(error);
                    console.log(msg);
                    console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
                }

                this.onchangeState = false
                setTimeout(() => {
                    this.onchangeState = true
                }, 300)

            },


            getLocalHistory() { // 本地对话历史记录

                let _this = this

                console.log(nim)

                nim.getLocalMsgs({
                    sessionId: this.toWhichSessionId,
                    limit: 100,
                    done: getLocalMsgsDone
                })

                function getLocalMsgsDone(error, obj) {
                    // console.log('获取本地消息' + (!error ? '成功' : '失败'), error,obj)
                    !error ? _this.sdkData.getLocalHistory = obj.msgs.reverse() : ''
                    _this.sdkData.getLocalHistory.forEach((item, index) => {
                        if (_this.xmMessageType(item) === 102 || _this.xmMessageType(item) === 104) {
                            try {
                                _this.sdkData.getLocalHistory[index].content_json = JSON.parse(item.content)
                            } catch(error) {
                                alert("消息列表，自定义消息解析出错：",item, error)
                            }

                        }



                    })

                    if (document.getElementById("chatCon")) {
                        document.getElementById("chatCon").scrollTop = document.getElementById("chatCon").scrollHeight + 10000
                    }



                }


                this.$nextTick(() => {
                        if (document.getElementById("chatCon")) {
                            console.log('前',document.getElementById("chatCon").scrollTop, document.getElementById("chatCon").scrollHeight)
                            document.getElementById("chatCon").scrollTop = document.getElementById("chatCon").scrollHeight + 10000
                            console.log('后',document.getElementById("chatCon").scrollTop, document.getElementById("chatCon").scrollHeight)
                        }

                    }

                )

            },
            delChat(chatId) {

                this.isChatWindowShow = false

                nim.deleteLocalSession({
                    id: chatId,
                    done: deleteLocalSessionDone
                });
                let _this = this

                function deleteLocalSessionDone(error, obj) {
                    console.log(error);
                    console.log(obj);
                    console.log('删除本地会话' + (!error ? '成功' : '失败'));
                    if (!error) {
                        let delPos = ''
                        _this.sdkData.sessions.forEach((item, index) => {
                            if (item.lastMsg.sessionId == chatId) {
                                delPos = index
                                _this.sdkData.sessions.splice(delPos, 1)
                                _this.sessions.splice(delPos, 1)
                            }
                        })
                    }
                }

            },
            getToWhichUserAvatar() {
                let _this = this

                nim.getUser({
                    account: _this.toWhichUser,
                    done: getUserDone
                })

                function getUserDone(error, user) {
                    if (!error) {
                        _this.toWhichUserAvatar = user.avatar
                    }
                }
            },

            sendEmoji() {  // 表情
                this.emojiShow = !this.emojiShow
            },
            showImg(url) {
                this.chatImgShow = !this.chatImgShow
                this.chatImgPath = url
            },
            xmMessageTypeFilterInit(json, filter) {
                let content = json.content,
                    type = json.type
                if (type == 'custom') {
                    try {
                        let contentObj = JSON.parse(content),
                            type = contentObj.xmMessageType
                        if (type == 18) {
                            let res = JSON.stringify(contentObj[filter])
                            return res
                        }
                    } catch (error) {

                    }



                }
            },


            toEditMyInfo() {
                this.isNeedMask = true
                this.isShowMyInfo = true

                this.assistantInfoChange.avatar = this.assistantInfo.avatar
                this.id1 = this.assistantInfo.avatar
                this.assistantInfoChange.caid = this.assistantInfo.caid
                this.assistantInfoChange.mobilePhone = this.assistantInfo.mobilePhone
                this.assistantInfoChange.nickname = this.assistantInfo.nickname
                this.assistantInfoChange.profile = this.assistantInfo.profile
            },

            async toSaveAssistantFn() {
                // 检测手机号是否符合规范
                if (!this.assistantInfoChange.mobilePhone.match(/^1(\d){10}$/)) {
                    alert('请输入正确的手机号')
                    return
                }


                let params = {
                    caid: this.assistantInfo.caid,
                    imAccount: this.assistantInfo.imAccount
                }




                this.assistantInfoChange.mobilePhone && (params.mobilePhone = this.assistantInfoChange.mobilePhone);
                this.assistantInfoChange.nickname && (params.nickname = this.assistantInfoChange.nickname);
                this.assistantInfoChange.profile && (params.profile = this.assistantInfoChange.profile);
                this.id1 && (params.avatar = this.id1);

                let data = await getResponses('assistantConsult/updateIsEnable.json', serialize(params))

                if (data.code === 0) {
                    this.isNeedMask = false
                    this.isShowMyInfo = false

                    this.getOrUpdateUserInfoFn()
                    // 更新聊天消息用户信息




                }
            },
            toAddOrEditQTListFn(id, content) {
                this.isNeedMask = true
                this.isShowQTCard = true
                if (id && content) {
                    this.qtId = id
                    this.qtEditContent = content
                } else {
                    this.qtEditContent = ""
                    this.qtId = ''
                }
            },

            async toDeleteQTListFn(id) {
                let data = await getResponses('commonLanguage/deleteCommons.json', `id=${id}`)

                if (data.code === 0) {
                    this.getSelectCommonsList()
                } else {
                    alert(data.msg)
                }

            },

            closeWindowFn() {
                this.isNeedMask = false
                this.isShowQTCard = false
                this.isShowMyInfo = false
                this.isShowAppraise = false
                this.isShowRecommendAConsultant = false
            },
            async qtSaveFn() {
                //    保存常用语
                if (!this.qtEditContent) {
                    alert("内容不能为空")
                    return
                }

                let params = {
                    content: this.qtEditContent
                }
                let data

                if (this.qtId) {
                    params.id = this.qtId
                    data = await getResponses('commonLanguage/updateCommonLanguage.json', serialize(params))
                } else {
                    data = await getResponses('commonLanguage/createCommonLanguage.json', serialize(params))
                }

                if (data.code === 0) {
                    this.isNeedMask = false
                    this.isShowQTCard = false
                    this.getSelectCommonsList()
                } else {
                    alert(data.msg)
                }

            },

            async getToken() {
                let url = `/depression-web/Qiniu/obtainPictureUploadToken.json`

                let response = await fetch(url, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: ""
                }).catch((error) => {
                    console.log(error)
                })

                let data = await response.json().catch((error) => {
                    console.log(error)
                })

                if (data.code === 0) {
                    this.token = data.token
                }
            },

            readFile(e) {
                this.id = +e.target.dataset.type
                const file = e.target.files[0]

                if (!file) {
                    return
                }

                const {type: types, name} = file

                if (!types.includes("image")) {
                    alert("请选择图片文件")
                    return
                }



                this['sending' + this.id] = true

                this.upload(file, name).then((data) => {
                    this['id' + (this.id + 1)] = data.key

                    this['sending' + this.id] = false;

                })


            },

            async upload(blob, name) {
                name = name.split(" ").join("")
                const formdata = new FormData()
                const nameArray = name.split(".")
                const suffix = nameArray.pop()

                formdata.append("file", blob, "image")
                formdata.append("token", this.token)

                formdata.append('key', `web/${btoa(encodeURIComponent(nameArray.join(".")) + Date.now())}.${suffix}`)


                let response = await fetch("http://up.qiniu.com", {
                    method: "POST",
                    mode: "cors",
                    body: formdata
                }).catch((error) => {
                    console.log(error)
                })

                let data = await response.json().catch((error) => {
                    console.log(error)
                })
                return data
            },

            switchIMState() {
               this.clickToSwitchState = !this.clickToSwitchState

            },

            async toChangeUserStatus(number) {
                let data = await getResponses("assistantConsult/updateIsEnable.json", `status=${number}&caid=${this.assistantInfo.caid}`)
                if (data.code === 0) {
                    // 更新用户信息
                    this.clickToSwitchState = false
                    this.getOrUpdateUserInfoFn()


                } else {
                    alert(data.code)
                }
            },

            sendAppraise() {
                this.isNeedMask = true

                this.isShowAppraise = true
            },

            async sureToSendA() {

                this.isSendingPJ = true
                let data = await getResponses('assistantConsult//sendGradeByAssistant.json', `caid=${this.assistantInfo.caid}`)

                if (data.code === 0) {
                    console.log(data.asid)
                    this.sendPJCustomMsg(data.asid)

                } else {
                    alert(data.msg)
                }


                this.isSendingPJ = false


                this.isNeedMask = false

                this.isShowAppraise = false
            },

            inputChange(e) {

                const target = e.target
                const value = target.value
                const key = target.dataset.key
                this.assistantInfoChange.mobilePhone = target.value = value.replace(/\D/g, "")



            },

            useQT(item) {
                this.sendInfo += item
            },

            toSeeCloudMsg() {
                this.page = 1
                this.total = 0
                this.isShowQTMsg = !this.isShowQTMsg
                this.isShowCloudMsg = !this.isShowCloudMsg

                this.getAllLocalHistoryList = []
                this.sdkData.getAllLocalHistory = []

                // this.isShowCloud = true

                // 获取历史消息
                this.getAllLocalHistory()


            },


            getAllLocalHistory() { // 本地对话历史记录总记录

                let _this = this

                console.log(nim)

                nim.getLocalMsgs({
                    sessionId: this.toWhichSessionId,
                    desc: true,
                    limit: 10000,
                    done: getLocalMsgsDone
                })

                function getLocalMsgsDone(error, obj) {
                    console.log('获取本地消息（总消息）' + (!error ? '成功' : '失败'), error,obj)

                    // 对历史消息进行处理
                    _this.total = obj.msgs.length

                    _this.sdkData.getAllLocalHistory = ! error ? obj.msgs : []

                    _this.sdkData.getAllLocalHistory.forEach((item, index) => {
                        try {
                            if (_this.xmMessageType(item) === 102 || _this.xmMessageType(item) === 104) {
                                _this.sdkData.getAllLocalHistory[index].content_json = JSON.parse(item.content)

                            }
                        } catch (e) {
                            console.log(e)
                        }



                    })



                    _this.getAllLocalHistoryList = !error ? _this.sdkData.getAllLocalHistory.slice(0, _this.pageSize - 1).reverse() : []


                    document.getElementById("chatCon2").scrollTop = 100000

                }




            },
            allHistoryChangePage() {
                if (this.isShowCloudMsg) {
                    let firstIndex = this.page === 1 ? 0 : (this.page - 1) * this.pageSize - 1


                    this.getAllLocalHistoryList = this.sdkData.getAllLocalHistory.slice(firstIndex, this.page * this.pageSize - 1).reverse()

                    document.getElementById("chatCon2").scrollTop = 100000
                }




            },


            toCloseCloudMsg() {
                this.isShowQTMsg = !this.isShowQTMsg
                this.isShowCloudMsg = !this.isShowCloudMsg

                this.isShowCloud = false
                this.getAllLocalHistoryList = []
                this.sdkData.getAllLocalHistory = []
                this.page = 1
            },

            pageHandler(page) {
                this.page = page
            },
            createUrl(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },


            async getOrUpdateUserInfoFn() {
                let data =  await getResponses('assistantConsult/selectConsultAssistant.json', `userAccount=${this.loginNeedPhone}&pageIndex=1&pageSize=10`)
                if (data.code === 0) {

                    if (data.data.length) {
                        // isEnable 0 启用 1 禁用
                        let arr = data.data[0]

                        this.assistantInfo.avatar = arr.avatar
                        this.assistantInfo.caid = arr.caid


                        this.assistantInfo.mobilePhone = arr.mobilePhone
                        this.assistantInfo.nickname = arr.nickname
                        this.assistantInfo.profile = arr.profile
                        this.assistantInfo.imAccount = arr.imAccount
                        this.imUserStatus = arr.status


                        this.Object.avatar = arr.avatar


                        if (data.data[0].isEnable === 0) {
                            this.isAccountEnable = true


                        } else {
                            this.isAccountEnable = false

                        }

                    } else {
                        alert("您没有助理账号")
                    }


                } else {
                    alert(data.msg)


                }

            },


            async getUserDetailInfoFn() {
                let data =  await getResponses('assistantConsult/selectConsultAssistant.json', `userAccount=${this.loginNeedPhone}&pageIndex=1&pageSize=10`)
                if (data.code === 0) {

                    if (data.data.length) {
                        this.isUserHasImAccount = true
                        // isEnable	0 启用 1 禁用
                        let arr = data.data[0]

                        this.assistantInfo.avatar = arr.avatar
                        this.assistantInfo.caid = arr.caid
                        this.assistantInfo.mobilePhone = arr.mobilePhone
                        this.assistantInfo.nickname = arr.nickname
                        this.assistantInfo.profile = arr.profile
                        this.assistantInfo.imAccount = arr.imAccount

                        this.imUserStatus = arr.status


                        if (data.data[0].isEnable === 0) {
                            this.isAccountEnable = true

                            this.loginMsg.account = arr.imAccount
                            this.loginMsg.token = arr.imPwd

                            this.validate();
                        } else {
                            this.isAccountEnable = false

                        }

                    } else {
                        alert("您没有助理账号")
                        this.isUserHasImAccount = false
                    }


                } else {
                    alert(data.msg)
                }

            },

            // 接口名称 查询常用语

            async getSelectCommonsList () {
                const data = await getResponses('commonLanguage/selectCommons.json', `pageIndex=1&pageSize=100`)

                if (data.code === 0) {
                    console.log(data.data)
                    this.qtList = data.data
                } else {
                    alert(data.msg)
                }

            },


            deleteFn() {


            }


        },
        events: {
            'sendEmojiStr': function (msg) {
                this.sendInfo += msg
                this.emojiShow = ! this.emojiShow
            },
            'sendEmojiObj':function(msgObj){
                this.emojiObj = msgObj
                this.sendCustomMsg(this.emojiObj)
                this.emojiShow = ! this.emojiShow
            }
        },

        filters: {
            setTime(date) {
                return transTime(date)
            },
            chatMsgFilter(json) {
                let content = json.content,
                    type = json.type
                if (type == 'custom') {
                    try {
                        let contentObj = JSON.parse(content),
                            type = contentObj.xmMessageType
                        if (type == 18) {
                            let res = '心猫推送：'
                            res += JSON.stringify(contentObj)  // 推送内容  文字
                            return res
                        }
                    } catch(e) {
                        console.log(e)
                    }

                }
            },
            xmMessageTypeFilter(json, key) {
                let content = json.content,
                    type = json.type
                if (type == 'custom') {
                    try {
                        let contentObj = JSON.parse(content),
                            type = contentObj.xmMessageType
                        if (type == 18) {
                            let res = JSON.stringify(contentObj[key])
                            return res
                        }
                    } catch (e) {
                        console.log(e)
                    }

                }
            },
            linkTextFilter(json) {
                return this.xmMessageTypeFilterInit(json, 'linkText')
            },
            pushLinkFilter(json) {
                return this.xmMessageTypeFilterInit(json, 'pushLink')
            },
            innerContentFilter(json) {
                return this.xmMessageTypeFilterInit(json, 'innerContent')
            },
            imgFilter(json) {
                let content = json.content,
                    type = json.type
                if (type == 'custom') {
                    try {
                        let contentObj = JSON.parse(content),
                            type = contentObj.xmMessageType
                        if (type == 18) {
                            let res = JSON.stringify(contentObj.img),
                                len = res.length

                            res = res.substr(1, len - 2)
                            return res
                        }
                    } catch(e) {
                        console.log(e)
                    }

                }
            },
            imgFilter2(json) {
                let content = json.content,
                    type = json.type
                if (type == 'custom') {
                    try {
                        let contentObj = JSON.parse(content),
                            type = contentObj.xmMessageType
                        if (type == 18) {
                            let res = JSON.stringify(contentObj.img),
                                len = res.length

                            res = res.substr(1, len - 2)
                            res = this.picPre + "/" + res
                            return res
                        }
                    } catch(e) {
                        console.log(e)
                    }

                }
            },
            chatAvatarFilter(account) {

                let path = ''
                if (account == this.Object.account) {
                    path = this.Object.avatar
                } else {
                    path = this.toWhichUserAvatar
                }
                return path
            },
            chatAvatarFilter2(account) {

                let path = ''
                if (account == this.Object.account) {
                    path = this.Object.avatar
                } else {
                    path = this.toWhichUserAvatar
                }
                path = this.picPre + "/" + path
                return path
            },

            chatIDfilter(chatId) {  //

            },
            emojiFilter(msg) {
                return buildEmoji(msg)
            },
            jsonFilter(json) {
                return JSON.stringify(json)

            },

            distinguishType(text) {
                switch(text) {
                    case 'text':
                        return '文本';
                        break;
                    case 'image':
                        return '图片';
                        break;
                    case 'audio':
                        return '音频';
                        break;
                    case 'video':
                        return '视频';
                        break;
                    case 'file':
                        return '文件';
                        break;

                    case 'custom':
                        return '自定义';
                        break;
                    default:
                        return '未知';
                        break;

                }
            },

            chatNowInfoCustomToJson(json) {
                let a = "'" + json.substring(1,json.length - 1) + "'"
                return JSON.parse(a).channel
            }
        },

        route: {

            deactivate(transition) {
                window.sessionStorage.removeItem("imChatIsNeedReload")
                transition.next()
            }
        },

        ready() {

            if (!sessionStorage.getItem('imChatIsNeedReload')) {
                window.sessionStorage.imChatIsNeedReload = '11111111111'
                window.location.reload()
            }

            if (!!this.privateLetterImAccount) {
                this.isPrivateLetterState = true
            }

            document.querySelector('#im-unread-number-id-wrap').style.display = 'none'




            this.getUserDetailInfoFn();



            this.getSelectCommonsList();


            this.getToken();

            




        }
    }
</script>
<style scoped>
    @import "../../../css/im/base.css";
    @import "../../../css/im/main.css";
    @import "../../../css/im/extra.css";
    @import "../../../css/im/uiKit.css";

</style>
