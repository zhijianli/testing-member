<template>
    <div class="container-fluid" style="width:30%; display:inline-block; vertical-align: top;">

        <div class="row-fluid">
            <div class="widget-box">


                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                    <h5  v-show="!myInfoShow">用户信息</h5>
                    <h5  v-show="!myInfoShow" class="pointer" @click="unvalidate">退出</h5>
                </div>

                <div class="widget-content nopadding" v-show="loginMsg.errorMsg != 'unlogin' ">
                    <div v-show="!myInfoShow" id="search" class="title">
                        <div class="myInfo">
                            <img class="userAvatar" :src="picPre + '/' + Object.avatar" alt="">
                            <div class="userInfo">
                                <div>{{Object.nick}}</div>
                                <div>{{Object.account}}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                    <h5 id="emoji">消息列表</h5>
                </div>


                <div class="widget-content nopadding">
                    <div class="container-fluid">
                         <ul class="chat" style="height:550px; overflow: scroll;">
                             <!-- v-show="item.lastMsg.sessionId&&&& (xmListType(item.lastMsg.content)) == 3"-->
                            <li class="chatList" :class="item.scene != 'p2p' ? 'chatHide' : ''"  
                                v-for="item of sessions" @click="beforeSendMsg(item)"
                                v-show="item.lastMsg.sessionId && xmListType(item.lastMsg)"
                            >
                                <!--<span>xmListType:{{xmListType(item.lastMsg)}}</span>-->
                                <!-- <img class="avatar" :src="item.path" alt=""> -->
                                <img class="avatar" :src="picPre + '/' + item.path" alt="">
                                <div class="msgBox" :class="item.lastMsg.sessionId == toWhichSessionId ? 'textGreen':''">
                                    <div class="msgTtile">
                                        <span class="fromNick">
                                            {{item.nick}},
                                            {{item.lastMsg.time | setTime}}
                                        </span>
                                    </div>
                                    <div class="msgCont">{{item.lastMsg.type}} 消息 </div>
                                    <span class="unread">{{item.unread}}</span>
                                </div>
                                <h1 class="del"  @click.stop="delChat(item.lastMsg.sessionId)">X</h1>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>


    </div>

    <div class="container-fluid" style="width:60%; display:inline-block; vertical-align: top;" >
        <div class="row-fluid" v-show="isChatWindowShow">
            <div class="widget-box">

                <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                    <h5>对话框</h5>
                    <h5 @click="chatHistory(0)" class="pointer">往前</h5>
                    <h5 @click="chatHistory(1)" class="pointer">往后</h5>

                    <!-- <h5 @click="chatHistory(2)" class="pointer">云端记录</h5> -->
                    <!-- <h5>User:{{toWhichUser}},</h5>
                    <h5>Scene:{{toWhichScene}},</h5> 
                    <h5>Id:{{toWhichSessionId}}</h5>-->
                </div>


                <div class="widget-content nopadding">

                    <div class="container-fluid">
                        <div class="chatBox" v-show="!chatImgShow">
                            <ul class="chat">

                                <li class="chatLeft"
                                    :class= "item.from == Object.account ? 'textGreen' : '' "
                                    v-for="item in sdkHistoryFilter"
                                >

                                    <img class="avatar" :src="item.from | chatAvatarFilter2">
                                    <span class="message" style="width:80%; margin-left:30px;"><span class="arrow"></span>
                                        <span class="from">昵称：{{item.fromNick}} {{item.time | setTime}}</span>

                                        <!--  all -->
                                        <!-- <span>{{item|jsonFilter}}</span> -->

                                        <span v-show= "xmMessageType(item) == 16 ">
                                            <!--  看了你主页 -->
                                            <h3>其他消息</h3>
                                            <!-- <span>{{item | jsonFilter}}</span> -->
                                        </span>

                                        <!-- 文本 || emoji -->
                                        <span class="text" v-html="item.text | emojiFilter"></span>

                                        <!--  自定义表情 -->
                                        <span v-show= "xmMessageType(item) == 3 ">
                                            <img class="emoji" v-bdimgurl="item.content">
                                        </span>

                                        <!-- 图片 -->
                                        <img class="chatImg pointer"
                                            @click="showImg(item.file.url)"
                                            v-if="item.type == 'image'"
                                            :src="item.file.url"
                                        >

                                        <!--  音频 -->
                                        <audio controls v-if="item.type == 'audio'">
                                            <source :src="item.file.mp3Url" type="audio/ogg">
                                        </audio>

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
                                    </span>

                                </li>

                            </ul>
                        </div>

                        <div v-show="chatImgShow">
                            <img :src="chatImgPath" alt=""
                                @click='chatImgShow = !chatImgShow'
                                class="chatImgShow"
                            >
                        </div>

                    </div>
                </div>


                <div class="widget-content nopadding">
                    <div class="container-fluid">

                        <div class="sendMsg">
                            <emoji v-show='emojiShow' class="emoji"> </emoji>
                            <input type="file"  class="hide" id="img" @change="sendFile" v-el='file' v-if="onchangeState">
                            <div class="myBtn" onclick="img.click()">图片</div>
                            <div class="myBtn" @click="sendEmoji" v-show="!emojiShow">选择表情</div>
                            <div class="myBtn" @click="emojiShow = !emojiShow" v-show="emojiShow">关闭表情</div>
                            <input type="text" class="sendMsgInput" v-model="sendInfo" placeholder="请输入要发送的信息">
                            <div class="myBtn" @click='sendMsg'>发送</div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>



<script>
    // import {
    //     picPre
        
    // } from '../../envConfig.js'

    import emoji from './emoji.vue'
    import uploadinfo from './uploadInfo.vue'
    export default {
        data() {
            return {
                // picPre: picPre,
                picPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
                loginMsg: {
                    account: 'netease3486650290290688',
                    pwd: 'passWord',  //  => MD5  => token
                    token:'7b3c18559b994ff997aa07ecbfda6158',
                    appKey: 'bef34cabae59b15e9238a4cf0b33461a',
                    errorMsg: 'unlogin' //判断登入状态
                },


                Object: { // 用户
                    account: '',
                    avatar: '',
                    createTime: '',
                    gender: '',
                    nick: '',
                    updateTime: ''
                },



                chatImgShow:false, //点击查看大图
                chatImgPath:'',

                myInfoShow:false, // 修改我的信息

                emojiShow:false,
                emojiObj:{  // 大表情

                },

                sdkHistoryFilterNum:0, // 聊天记录
                sdkHistoryFilterTemp:0, // 发送保持

                sendInfo: '', // 发送的信息
                onchangeState: true, // 重新生成input节点

                sdkData: { // sdk data
                    sessions: [], //新消息列表  左边列表  新消息
                    getLocalHistory: [], // 右边 本地 对话消息记录
                    users: [], // 用户信息
                },

                sessions:[],//左边列表 新消息列表
                sessionsAvater:{},//左边列表 新消息列表

                toWhichUser: '', //向哪个账号发送
                toWhichScene: '', //向哪个场景发送
                toWhichSessionId: '', //正在向哪个对话ID聊天
                toWhichUserAvatar:'', //对方头像
                isChatWindowShow:false
            }
        },
        components: { //声明组件
            emoji,
            uploadinfo
        },
        watch: {
            'toWhichSessionId':function(now){
                this.getLocalHistory()
                this.getToWhichUserAvatar()
            },
            'sessions':function(now,old){
                
            }
        },
        created() {

        },
        computed: {
            sdkHistoryFilter: function() {
                let res = this.sdkData.getLocalHistory.slice(this.sdkHistoryFilterNum, this.sdkHistoryFilterNum+5).reverse()
                console.log("res:",res)

                return  res
            }
        },
        methods: {
            xmMessageType(json){
                let content = json.content,
                type = json.type,
                xmMessageType = ''
                if(type == 'custom'){
                    let contentObj = JSON.parse(content),
                    type = contentObj.xmMessageType
                    // if(type == 18){
                        xmMessageType = type
                    // }
                }else{

                }
                return xmMessageType
            },
            xmListType(lastMsg){
                let bool = true
                let type = lastMsg.type
                if(type == 'custom'){
                    let xmType = JSON.parse(lastMsg.content).xmMessageType
                    if(xmType != 3){
                        bool = false
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
                var data = {}
                // 注意这里, 引入的 SDK 文件不一样的话, 你可能需要使用 SDK.NIM.getInstance 来调用接口
                var nim = NIM.getInstance({
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
                    onsessions: onSessions,
                    onupdatesession: onUpdateSession,
                    onusers: onUsers,
                    onfriends: onFriends,
                    onsyncfriendaction: onSyncFriendAction

                })


                console.log('db:' + NIM.support.db) // 支持数据库

                function onFriends(friends) {
                    console.log('收到好友列表',JSON.stringify(friends) ); // JSON.stringify(friends)
                    data.friends = nim.mergeFriends(data.friends, friends);
                    data.friends = nim.cutFriends(data.friends, friends.invalid);
                    refreshFriendsUI();
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
                    refreshFriendsUI();
                }
                function onDeleteFriend(account) {
                    data.friends = nim.cutFriendsByAccounts(data.friends, account);
                    refreshFriendsUI();
                }
                function onUpdateFriend(friend) {
                    data.friends = nim.mergeFriends(data.friends, friend);
                    refreshFriendsUI();
                }
                function refreshFriendsUI() {
                    // 刷新界面
                }

                function onUsers(users) {
                    data.users = nim.mergeUsers(data.users, users);
                    _this.sdkData.users = data.users
                    console.log('收到用户名片列表',JSON.stringify(users));
                }

                function onDisconnect(error) {
                    // 此时说明 `SDK` 处于断开状态，开发者此时应该根据错误码提示相应的错误信息，并且跳转到登录页面
                    var that = this;
                    console.log('连接断开');
                    alert('连接断开')
                    if (error) {
                        switch (error.code) {
                            // 账号或者密码错误, 请跳转到登录页面并提示错误
                            case 302:
                                alert(error.message);
                                delCookie('uid');
                                delCookie('sdktoken');
                                window.location.href = './welcome';
                                break;
                                // 被踢, 请提示错误后跳转到登录页面
                            case 'kicked':
                                var map = {
                                    PC: "电脑版",
                                    Web: "网页版",
                                    Android: "手机版",
                                    iOS: "手机版",
                                    WindowsPhone: "手机版"
                                };
                                var str = error.from;
                                alert("你的帐号于" + dateFormat(+new Date(), "HH:mm") + "被" + (map[str] || "其他端") + "踢出下线，请确定帐号信息安全!");
                                delCookie('uid');
                                delCookie('sdktoken');
                                window.location.href = './welcome';
                                break;
                            default:
                                break;
                        }
                    }
                }

                function onRoamingMsgs(obj) {
                    console.log('漫游消息', obj);
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
                    console.log('收到会话列表:');
                    data.sessions = nim.mergeSessions(data.sessions,sessions)
                    console.log(data.sessions)
                    _this.sdkData.sessions = data.sessions
                    // getAvatar(data.sessions)
                    getAvatarFilter(data.sessions)
                    _this.getLocalHistory() // 刷新界面

                }

                function onUpdateSession(session) {
                    console.log('会话更新了')
                    data.sessions = nim.mergeSessions(data.sessions, session)
                     _this.sdkData.sessions = data.sessions
                    //  getAvatar(data.sessions)
                     getAvatarFilter(data.sessions)
                    _this.getLocalHistory() // 刷新界面
                }


                function getAvatar(sessions){   // 头像列表
                    let arr = [],avatarArr=[]
                    sessions.forEach((item)=>{
                        let account = item.id.split('-')[1]  //// 111111111111111111111
                        arr.push(account)
                    })
                    nim.getUsers({
                        accounts: arr,
                        done: setChatList
                    })
                }


                function getAvatarFilter(sessions){   //   对话不过滤 只过滤需要显示头像的账号
                    let arr = [],avatarArr=[]
                    sessions.forEach((item)=>{
                        if(accountFliter(item.lastMsg)){
                            let account = item.id.split('-')[1]  //// 111111111111111111111
                            arr.push(account)
                        }
                    })
                    nim.getUsers({
                        accounts: arr,
                        done: setChatList
                    })
                }

               function accountFliter(lastMsg){
                    let bool = true
                    let type = lastMsg.type
                    if(type == 'custom'){
                        let xmType = JSON.parse(lastMsg.content).xmMessageType
                        if(xmType != 3){
                            bool = false
                        }
                    }
                    return bool
                }


                function setChatList(error, users) {
                    if (!error) {
                        users.forEach((item,index)=>{
                            _this.sdkData.sessions.forEach((chat)=>{
                                if(chat.id.split('-')[1] == item.account){
                                    chat.path = item.avatar
                                    chat.nick = item.nick
                                }
                            })
                        })
                    }
                    _this.sessions = _this.sdkData.sessions
                }

            },
            beforeSendMsg(obj) { //点击左边消息栏 确定发送对象  // <!--item.lastMsg.from,item.scene item.lastMsg.sessionId-->
                console.log('发送')
                this.isChatWindowShow = true
                
                this.toWhichUser = obj.lastMsg.sessionId.split('-')[1]
                this.toWhichScene = obj.scene
                this.toWhichSessionId = obj.lastMsg.sessionId
                nim.resetSessionUnread(obj.lastMsg.sessionId) // 设置已读
            },
            sendMsg() {

                this.sdkHistoryFilterNum = 0

                if (this.sendInfo.length == 0) {
                    alert('请输入要发送的信息')
                    return
                }

                var _this = this

                var msg = nim.sendText({
                    scene: _this.toWhichScene,
                    to: _this.toWhichUser,
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
            sendCustomMsg(emojiObj){  // 发送表情

                let resNum = (parseInt(emojiObj.emoji) + 1)

                if(resNum < 10){
                    emojiObj.emoji = '00' + resNum
                }

                if(resNum >= 10 && resNum < 100 ){
                     emojiObj.emoji = '0' +  resNum
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
            sendFile(e) {

                let _this = this
                nim.sendFile({
                    scene: 'p2p',
                    to: _this.toWhichUser,
                    type: 'image',
                    fileInput: e.target,
                    beginupload: function(upload) {
                        // - 如果开发者传入 fileInput, 在此回调之前不能修改 fileInput
                        // - 在此回调之后可以取消图片上传, 此回调会接收一个参数 `upload`, 调用 `upload.abort();` 来取消文件上传
                    },
                    uploadprogress: function(obj) {
                        console.log('文件总大小: ' + obj.total + 'bytes');
                        console.log('已经上传的大小: ' + obj.loaded + 'bytes');
                        console.log('上传进度: ' + obj.percentage);
                        console.log('上传进度文本: ' + obj.percentageText);
                    },
                    uploaddone: function(error, file) {
                        console.log(error);
                        console.log(file);
                        console.log('上传' + (!error?'成功':'失败'));
                    },
                    beforesend: function(msg) {
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
                    console.log('获取本地消息' + (!error ? '成功' : '失败'), error,obj)
                    !error ? _this.sdkData.getLocalHistory = obj.msgs : ''
                }

            },
            delChat(chatId){

                this.isChatWindowShow = false  

                nim.deleteLocalSession({
                    id: chatId,
                    done: deleteLocalSessionDone
                });
                let _this = this
                function deleteLocalSessionDone(error, obj) {
                    console.log(error);
                    console.log(obj);
                    console.log('删除本地会话' + (!error?'成功':'失败'));
                    if(!error){
                        let delPos = ''
                        _this.sdkData.sessions.forEach((item,index)=>{
                            if(item.lastMsg.sessionId == chatId){
                                delPos = index
                                _this.sdkData.sessions.splice(delPos,1)
                                _this.sessions.splice(delPos,1)
                            }
                        })
                    }
                }

            },
            getToWhichUserAvatar(){
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
            chatHistory(num){

                if(num == 0){
                    console.log('前')
                    this.sdkHistoryFilterNum+3 <= this.sdkData.getLocalHistory.length ? this.sdkHistoryFilterNum += 3 : ''

                }
                if(num == 1){
                    console.log('后')
                    this.sdkHistoryFilterNum-3 >= 0 ? this.sdkHistoryFilterNum -= 3 : ''
                }
                if(num == 2) {
                    console.log('云端')
                }
            },
            sendEmoji(){  // 表情
                this.emojiShow = ! this.emojiShow
            },
            showImg(url){
                this.chatImgShow = ! this.chatImgShow
                this.chatImgPath = url
            },
            xmMessageTypeFilterInit(json,filter){
              let content = json.content,
                  type = json.type
              if(type == 'custom'){
                  let contentObj = JSON.parse(content),
                  type = contentObj.xmMessageType
                  if(type == 18){
                      let res = JSON.stringify(contentObj[filter])
                      return res
                  }
              }
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
            chatMsgFilter(json){
                let content = json.content,
                    type = json.type
                    if(type == 'custom'){
                        let contentObj = JSON.parse(content),
                        type = contentObj.xmMessageType
                        if(type == 18){
                            let res = '心猫推送：'
                            res += JSON.stringify(contentObj)  // 推送内容  文字
                            return res
                        }
                    }
            },
            xmMessageTypeFilter(json,key){
                let content = json.content,
                    type = json.type
                if(type == 'custom'){
                    let contentObj = JSON.parse(content),
                    type = contentObj.xmMessageType
                    if(type == 18){
                        let res = JSON.stringify(contentObj[key])
                        return res
                    }
                }
            },
            linkTextFilter(json){
              return this.xmMessageTypeFilterInit(json,'linkText')
            },
            pushLinkFilter(json){
              return this.xmMessageTypeFilterInit(json,'pushLink')
            },
            innerContentFilter(json){
              return this.xmMessageTypeFilterInit(json,'innerContent')
            },
            imgFilter(json){
              let content = json.content,
                  type = json.type
                  if(type == 'custom'){
                      let contentObj = JSON.parse(content),
                      type = contentObj.xmMessageType
                      if(type == 18){
                          let res = JSON.stringify(contentObj.img),
                          len = res.length
                          
                          res = res.substr(1,len-2)
                          return res
                      }
                  }
            },
            imgFilter2(json){
              let content = json.content,
                  type = json.type
                  if(type == 'custom'){
                      let contentObj = JSON.parse(content),
                      type = contentObj.xmMessageType
                      if(type == 18){
                          let res = JSON.stringify(contentObj.img),
                          len = res.length
                          
                          res = res.substr(1,len-2)
                          res = this.picPre + "/" + res
                          return res
                      }
                  }
            },
            chatAvatarFilter(account){

                let path = ''
                if(account == this.Object.account){
                    path = this.Object.avatar
                }else{
                    path = this.toWhichUserAvatar
                }
                return path
            },
            chatAvatarFilter2(account){

                let path = ''
                if(account == this.Object.account){
                    path = this.Object.avatar
                }else{
                    path = this.toWhichUserAvatar
                }
                path = this.picPre + "/" + path
                return path
            },

            chatIDfilter(chatId){  //

            },
            emojiFilter(msg){
                return buildEmoji(msg)
            },
            jsonFilter(json){
                return JSON.stringify(json)

            }
        },
        ready() {
            // window.location.reload()
            this.validate()
        }
    }
</script>
<style scope>
    @import "../../css/fundmanagement/imChatBox.css"



</style>
