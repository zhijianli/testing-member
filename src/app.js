import "./css/normalize.css"
import "./css/common.css"
import "./css/common2.css"
import "./css/nav.css"
import "./css/header.css"
import "./css/font-awesome.css"
import "./css/table.css"
import "./css/popup.css"
import "./css/but.css"
import "./css/page.css"
import "./css/order.css"
import "./css/expert.css"

// 用户管理
import "./css/userManage/userlist.css"
import "./css/userManage/userlog.css"

// 求助者资金管理
import "./css/fundmanagement/useraccount.css"

//精选问答与咨询
import "./css/answermanage/chat.css"


import "./css/login.css"

//菜单样式
import "./css/menu.css"



import router from "./router"
import APP from "./app.vue"

import Vue from 'vue'

import zpagenav from "vue-pagenav"
Vue.use(zpagenav)

import Toast from "components/toast"

Vue.use(Toast)

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)



import { imgUrl } from './directive'
Vue.directive('bdimgurl', imgUrl) // 自定义指令


router.start(APP, "#app")
