<template>
    <!--
    说明 open样式为打开
    active 为选中当前菜单
 -->
    <div class="wrap">
        <section id="section" v-if="loginState">
            <div id="logo">
                <h1><a href="dashboard.html">心理测试管理平台</a></h1>
            </div>
            <!-- <ul class="menu">
                <li v-for="item of menuJson" :style="{ 'display': iarray.lastIndexOf( item.menuId ) > -1 ? 'block' : 'none' }">
                    <a href=" javascript:;" :class="{ 'active' :  level1 == item.name } " @click="TableFn(item, item.level, item.name)">
                        <i class="icon {{ item.class }}"></i>
                        <span>{{ item.name }}</span>
                        <i class="icon" :class="{ 'icon-chevron-down' : item.state || level1 == item.name, 'icon-chevron-right' : !item.state }"></i>
                    </a>
                    <ul :style="{ display :  ( level1 == item.name ) ? 'block' : 'none' }" transition="expand">
                        <li v-for=" item of item.list" :style="{ 'display': iarray.lastIndexOf( item.menuId ) > -1 ? 'block' : 'none' }">
                            <a href="javascript:;" :class="{ 'active' : level2 == item.name } " @click="TableFn(item, item.level, item.name, item.link)">
                                <span>{{ item.name }}</span>
                                <i v-show="!item.link" class="icon" :class="{ 'icon-chevron-down' : item.state || level2 == item.name , 'icon-chevron-right' : !item.state }"></i>
                            </a>
                            <ul :style="{ display : ( level2 == item.name )  ? 'block' : 'none' }">
                                <li v-for=" item of item.list" :style="{ 'display': iarray.lastIndexOf( item.menuId ) > -1 ? 'block' : 'none' }">
                                    <a href="javascript:;" :class="{ 'active' : level3 == item.name } " @click="TableFn(item, item.level, item.name, item.link)"><span>{{ item.name }}</span></a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul> -->


            <!-- 写死的心理测试菜单 -->
            <ul class="menu">
               <li>
                <a href="http://localhost:8000/scaleManagement" class="active">
                    <i class="icon icon-heart"></i>
                    <span>量表管理</span>
                    <i class="icon icon-chevron-right"></i>
                </a>
               </li>
               <li>
                <a href="http://localhost:8000/scaleTypeManagement" class="active">
                    <i class="icon icon-heart"></i>
                    <span>量表类型管理</span>
                    <i class="icon icon-chevron-right"></i>
                </a>
               </li>
               <li>
                <a href="http://localhost:8000/scaleFlowManagement" class="active">
                    <i class="icon icon-heart"></i>
                    <span>量表流水管理</span>
                    <i class="icon icon-chevron-right"></i>
                </a>
               </li>
            </ul>




        </section>
        <main id="main">
            <header id="header" v-if="loginState">
                <ul class="nav">
                    <li class="dropdown submenu">
                        <a title="" href="#" class="dropdown-toggle">
                            <i class="icon icon-user"></i>
                            <span class="text adminUser" data-id="">欢迎{{ username }}</span>
                        </a>
                    </li>
                    <li class="">
                        <a title="" href="javascript:;" @click="Out()">
                            <i class="icon icon-share-alt"></i>
                            <span class="text">注销</span>
                        </a>
                    </li>
                    <li class="" id="im-unread-number-id-wrap">
                        <a title="" href="javascript:;" @click="routerChangeToChat">
                            <i class="icon icon-comments"></i>
                            <span class="text im-chat-w-unread-box">有 <span id="im-unread-number-id"></span> 条新消息</span>
                        </a>
                    </li>
                </ul>
            </header>
            <div id="content">
                <div id="breadcrumb" v-if="level1">
                    <a href="javascript:;" class="tip-bottom">
                        <i class="icon-home"></i>
                        <span>
                            {{ level1 }} <a href="javascript:;" @click="breadRoute(2)">  &gt; {{ level2 }}</a><a href="javascript:;" @click="breadRoute(3)" v-if="level3"> &gt; {{ level3 }}</a>
                        </span>
                    </a>
                </div>
                <!-- <router-view :img-Pre="url"></router-view> -->
                <!--<router-view keep-alive></router-view>-->
                <router-view></router-view>

            </div>
        </main>
    </div>
</template>
<script>
import Vue from 'vue'
import {
    permissionsList,
    UserOut,
    obtainYearLevels,
    getResponse,
    getResponses,
    getResponsesExcel
} from "./api"


import menuJson from "./menuJson.js"

import {
    qiniuPic,
    qiniuMp3
} from './envConfig.js'


// Vue.filter("isEnable", function(value) {
//     return value == '0' ? '启用' : '禁用'
// })


Vue.filter('sexFilter', function(value) {
    if (value === 0) {
        return '未知'
    } else if (value === 1) {
        return "男"
    } else if (value === 2) {
        return "女"
    }
})

export default {
    data() {
            return {
                cur: '',
                userId: '',
                loginState: true,
                username: '',
                iarray: [],
                level1: '',
                level2: '',
                level3: '',
                link: "",
                menuJson: menuJson,
                // url: `http://oml9ntix5.qnssl.com`
                // url: `http://picture.120xinmao.com`
                url:qiniuPic,

                unreadNumber: '',
                loginNeedPhone: sessionStorage.userphone,
                loginMsg: {
                    account: '',
                    pwd: '123456',  //  => MD5  => token
                    token: '',
                    appKey: 'bef34cabae59b15e9238a4cf0b33461a',
                    errorMsg: 'unlogin' //判断登入状态
                },


            }
        },

        events:{
            'child-msg': function (msg) {

              console.log("msg:",msg)
              this.level3 = msg
            },

            'im-updateSession-fn': function(session) {
                console.log(session)
                this.unreadNumber = session.unread
            }
        },

        watch: {


        },

        methods: {


            Out() {
                this.UserOut()
            },

            breadRoute(index) {
                if (index == 2 && this.level3 != "") {
                    this.$route.router.go(this.link)
                } else {
                    this.$route.router.go(this.link)
                }

            },

            TableFn(item, level, name, link) {
                if (level == 1) {
                    this.level1 = name
                }

                if (level == 2) {
                    this.level2 = name
                }

                if (level == 3) {
                    this.level3 = name
                } else {
                    this.level3 = ""
                }

                this.link = link
                this.$route.router.go(link)
            },

            async permissionsList(params) {
                let self = this
                let data = await permissionsList(params)

                if (data.code) {
                    location.href = "/"
                    return false
                }

                let idata = JSON.parse(data.jsonMenu)
                console.log(idata)

                for (let i = 0; i < idata.length; i++) {
                    self.iarray.push(idata[i].selected && idata[i].menuId)
                    if(idata[i].childMenus.length>0){
                        for(let j=0;j<idata[i].childMenus.length;j++){
                            self.iarray.push(idata[i].childMenus[j].selected && idata[i].childMenus[j].menuId)
                            if(idata[i].childMenus[j].childMenus.length>0){
                                for(let x=0;x<idata[i].childMenus[j].childMenus.length;x++){
                                    self.iarray.push(idata[i].childMenus[j].childMenus[x].selected && idata[i].childMenus[j].childMenus[x].menuId)

                                }
                            }
                        }
                    }



                }


            },


            async UserOut() {

                let data = await UserOut()
                if (data.code == 0) {
                    sessionStorage.clear()
                    location.href = "/"
                } else {
                    alert(data.error)
                }
            },

            routerChangeToChat() {
                this.$route.router.go("/imChat")
            },

            async getUserDetailInfoFn() {
                let data =  await getResponses('assistantConsult/selectConsultAssistant.json', `userAccount=${this.loginNeedPhone}&pageIndex=1&pageSize=10`)
                if (data.code === 0) {

                    if (data.data.length) {
                        // isEnable	0 启用 1 禁用
                        let arr = data.data[0]

                        // console.log('-------------------', arr)

                        if (arr.isEnable === 0) {


                            this.loginMsg.account = arr.imAccount
                            this.loginMsg.token = arr.imPwd

                            window.sessionStorage.imAssistantId = arr.caid

                            this.validate();
                        } else {


                        }

                    } else {
                        // alert("您没有助理账号")
                    }


                }
            },

            validate() { // 登录验证
                setCookie('uid', this.loginMsg.account.toLocaleLowerCase())
                setCookie('sdktoken', this.loginMsg.token)
                this.sdk()
            },

            sdk() {

                let _this = this
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
                    onsessions: onSessions,
                    onupdatesession: onUpdateSession,

                })

                console.log('db:' + NIM.support.db) // 支持数据库


                function onConnect(data) {
                    // console.log(data)
                    _this.loginMsg = '连接成功'
                    // console.log("连接成功----------------", _this.loginMsg)
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
                    // console.log("app.vue收到会话------------------------", sessions)

                    data.sessions = nim.mergeSessions(data.sessions, sessions)
                    let unreadN = 0
                    data.sessions.forEach((item) => {
                        unreadN += item.unread
                    })



                    if (window.location.pathname.split("?")[0].split("/")[1] !== "imChat" && unreadN > 0) {
                        document.querySelector('#im-unread-number-id-wrap').style.display = "list-item"
                        document.querySelector("#im-unread-number-id").innerHTML = unreadN

                    } else {
                        document.querySelector('#im-unread-number-id-wrap').style.display = "none"
                    }


                }


                function onUpdateSession(session) {

                    console.log('会话更新了------', session)

                    // 标签页title闪烁
                    if (isShine) {
                        // console.log(imIsShineT)
                        !imIsShineT && (imIsShineT = setInterval(imShineIndexFn, 500));
                    } else {
                        // console.log(imIsShineT)

                        clearInterval(imIsShineT);
                        // console.log(imIsShineT)

                    }

                    if (window.location.pathname.split("?")[0].split("/")[1] !== "imChat" && session.unread > 0) {
                        document.querySelector('#im-unread-number-id-wrap').style.display = "list-item"
                        document.querySelector("#im-unread-number-id").innerHTML = session.unread

                    } else {
                        document.querySelector('#im-unread-number-id-wrap').style.display = "none"
                    }



                }








            },

            beforeunloadHandler (e) {
                alert("刷新")
                //鼠标相对于用户屏幕的水平位置 - 窗口左上角相对于屏幕左上角的水平位置 = 鼠标在当前窗口上的水平位置
                let n = window.event.screenX - window.screenLeft;
//鼠标在当前窗口内时，n<m，b为false；鼠标在当前窗口外时，n>m，b为true。20这个值是指关闭按钮的宽度
                let b = n > document.documentElement.scrollWidth-20;
//鼠标在客户区内时，window.event.clientY>0；鼠标在客户区外时，window.event.clientY<0
                if(b && window.event.clientY < 0 || window.event.altKey || window.event.ctrlKey){
                    alert("关闭1")
                }else if(event.clientY > document.body.clientHeight || event.altKey){
                    alert("关闭2")
                }
            }



        },
        ready() {

        console.log(1);
            this.loginState = (window.location.pathname == '/' ? false : true)
            if ((!sessionStorage.userId || !sessionStorage.username) && window.location.pathname != '/') {
                //在这里判断session中是否有用户信息，如果没有，设置为根目录，就会跳转到登录页面
                //目前注释掉，就不会跳转到登录页面
                // location.href = "/"
            } else {
                this.userId = sessionStorage.userId
                this.username = sessionStorage.username
                if (!!this.userId) {
                    this.permissionsList(`userId=${this.userId}`)
                }

                // // 登录IM
                // if (!nim) {
                //     this.getUserDetailInfoFn()
                // }



            }

            // console.log("------------------path: ", window.location.pathname)

            document.querySelector('#im-unread-number-id-wrap').style.display = 'none'

            let pathChange = window.location.pathname.split("?")[0].split("/")[1]

            if (pathChange !== 'imChat') {
                this.getUserDetailInfoFn()
            }


            window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))





            // console.log('qiniuPic:'+qiniuPic)
            // console.log('qiniuMp3:'+qiniuMp3)

        },

        destroyed() {
            window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
        }
}
</script>
<style scoped>
    .im-chat-w-unread-box {
        background-color: white;
        color: red;
        border-radius: 5px;
        padding: 5px 10px;
        text-shadow: none;
    }
</style>
