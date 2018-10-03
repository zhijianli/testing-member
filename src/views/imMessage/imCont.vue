<template>
    <div class="container-fluid" style="width:60%; display:inline-block;margin-right:20px;">
        <div class="row-fluid" >
          <div class="widget-box">

            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                <h5>新增消息</h5>
            </div>

            <div class="widget-content nopadding">
                <div class="form-horizontal">

                    <div class="control-group">
                        <label class="control-label"> 标题 :</label>
                        <div class="controls">
                            <input
                                    type="text" class="span11" placeholder="此项必填"
                                    v-model.trim="info.title"
                                    style="width: 80%;"
                                >
                        </div>
                    </div>


                    <div class="control-group">
                        <label class="control-label"> 选择用户 :</label>
                        <div class="controls">
                            <input type="file" class="dn" v-el:file v-if="fileState" @change="showName">
                            <ul class="tagTit" style="display: inline-block;vertical-align: top;">
                                <li @click.stop="switchS(1)" v-bind:class="{ 'show': info.isAll === 1}"> 全部用户</li>
                                <li @click.stop="switchS(0)" v-bind:class="{ 'show': info.isAll === 0}"> 部分用户</li>
                                <span>{{excelName}}</span>
                            </ul>
                        </div>
                    </div>


                    <div class="control-group">
                        <label class="control-label">文本 :</label>
                            <div class="controls">
                            <textarea  v-model="info.content" name="profile" style="margin: 0px; width: 80%; height: 150px;" placeholder="此项必填"> </textarea>
                        </div>
                    </div>


                    <!-- <div class="control-group">
                        <label class="control-label">图片 :</label>
                        <div class="controls">
                            图片大小800*480px
                            <form enctype="multipart/form-data"  name="head">
                                <img :src="img.http" style="width:200px;height:120px;" />
                                <input type="file"  class="span11 dn"  id="avatar" @change="avatarFun">
                                <a class="btn btn-info" onclick="avatar.click()" >上传</a>
                            </form>
                        </div>
                    </div> -->

                    <div class="control-group">
                        <label class="control-label">图片大小800*480px:</label>
                        <div class="controls">
                            <qiniu event-name="imgpath" :defaultimg="imgpath"></qiniu>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label"> 链接承载文字 :</label>
                        <div class="controls">
                            <input
                                type="text" class="span11" placeholder="链接承载文字"
                                v-model.trim="info.linkText"
                                style="width: 80%;"
                            >
                        </div>

                        <div class="controls">
                            <ul class="tagTit">
                                <li @click="setLink(0)" v-bind:class="{ 'show': whichLink === 0}">外链接</li>
                                <li @click="setLink(1)" v-bind:class="{ 'show': whichLink === 1}">内链接</li>
                            </ul>
                            <span> 外链使用如下格式 http 或 https （ https://www.baidu.com/ )</span>
                            <input
                                type="text" class="span11" placeholder="推送方式为PUSH时 此项必填"
                                v-model.trim="info.pushLink"
                                style="width: 80%;"
                                v-bddisabled = "whichLink"
                            >

                        </div>

                        <div class="control-group">
                            <label class="control-label"> 推送时间 :</label>
                            <div class="controls">

                                <input class="input" size="30" type="text" @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="此项必填">

                                    <calendar
                                        :show.sync="calendar.show"
                                        :type="calendar.type"
                                        :value.sync="calendar.value"
                                        :x="calendar.x"
                                        :y="calendar.y"
                                        :begin.sync="calendar.begin"
                                        :end.sync="calendar.end"
                                        :range.sync="calendar.range"
                                        :weeks="calendar.weeks"
                                        :months="calendar.months"
                                    >
                                    </calendar>
                                    <em>请超过当前五分钟</em>
                            </div>
                        </div>


                     <div class="control-group">
                        <label class="control-label"> 推送方式 :</label>
                        <div class="controls">
                            <select v-model="info.pushType">
                                <!--<option value="0">全部</option>-->
                                <option value="1">IM</option>
                                <option value="2">PUSH</option>
                            </select>
                        </div>
                    </div>


                    <div class="form-actions">
                        <button type="submit" class="btn btn-success" @click="sendFile">保存</button>
                    </div>

                </div>
            </div>
          </div>
        </div>
    </div>
  </div>


<div id="myAlert" class="modal {{drop.dropState}}" style="width:600px;">

        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="closeDrop">×</button>
            <h3>选择链接</h3>
        </div>

        <div class="modal-body" >
            <div class="modal-body">
                <ul class="app-banner-tab">
                    <li :class="{ active:(insideLinkType == 0)}" @click="insideLinkType =0"><a href="javascript:;">专家</a></li>
                    <li :class="{ active:(insideLinkType == 1)}" @click="insideLinkType =1"><a href="javascript:;">文章</a></li>
                    <li :class="{ active:(insideLinkType == 2)}" @click="insideLinkType =2"><a href="javascript:;">测试</a></li>
                </ul>
                <div class="popup_search">
                    <input type="text" class="span11" placeholder="输入搜索内容" v-model="content" name="content">
                    <button type="submit"  class="btn btn-success" @click="searchLink">搜索</button>
                </div>

                <div v-if=" insideLinkType === 0 ">
                    <div class="info-list" v-for="item of listName">
                        <label for="userId{{ item.mid }}">
                            <input type="radio" id="userId{{ item.mid }}" value="{{ item.mid }}" name="insideLinkId" v-model="insideLinkId">
                            {{ item.nickname }}
                        </label>
                    </div>
                </div>

                <div v-if=" insideLinkType === 1">
                    <div class="info-list" v-for="item of listTitle">
                        <label for="userId{{ item.articleId }}">
                            <input type="radio" id="userId{{ item.articleId }}"   value="{{ item.articleId }}" v-model = "insideLinkId">
                            {{ item.title }}
                        </label>
                    </div>
                </div>

                <div v-if=" insideLinkType === 2">
                    <div class="info-list" v-for="item of listTesting" >
                        <label @click="postLink(item)" for="userId{{ item.testingId }}">
                            <input  type="radio" id="userId{{ item.testingId }}"  value="{{ item.testingId }}" name="insideLinkId" v-model="insideLinkId">
                            {{ item.title }}
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click='closeDrop'>确定</a>
            <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click='closeDrop'>取消</a>
        </div>

</div>
<div class="modal-backdrop {{drop.dropState}}"></div>

</template>



<script>
    import {
        getPsychoByName, //搜咨询师
        getArticleByTitle, //搜文章
        getTestingByTitle, // 搜索问卷
        messagePushobtainMsgPush, // 跟新时 获得详情
    } from "../../api"

    import {
        serialize,isNowBigger
    } from "../../utils"

    import Vue from "vue"

    import calendar from "../../calendar.vue"
    import qiniu from "../../qiniu.vue"

    export default {
        components: {
            qiniu,
            calendar
        },
        events:{
            'imgParameter':function(obj,eventName){
                this[eventName] = obj[eventName].imgPath
            }
        },
        data() {
            return {
                ID: '', // 更新有ID  新增无ID  mpId

                info: { //
                    content: "", // 内容 string
                    img: "", // 图片地址 string
                    isAll: 1, // 是否所有用户 number
                    linkText: "", // 链接承接文字 string
                    mpId: "", // 消息推送id number
                    pushLink: "", // 推送链接 string
                    pushTime: "", // 推送时间 string
                    pushType: "1", // 推送类型(0: 全部 1: IM 2: PUSH) number
                    title: "", // 标题 string
                },

                imgpath:'',

                excelName:'',

                fileState: true,

                whichLink: 0, // 内外

                insideLinkType: 0, // 文章 专家 测试
                insideLinkId: '', // 内链id
                content: '', // 搜索内容
                listTesting: [],
                listTitle: [],
                listName: [],

                img: {
                    http: '', //预览
                    imgpath: '', //后台
                    imgpathSmall: '' //后台缩略
                },

                drop: { //弹窗
                    dropState: 'hide', //弹窗状态  hide in
                },

                calendar: {
                    show: false,
                    x: 0,
                    y: 0,
                    picker: "",
                    type: "datetime",
                    value: "",
                    begin: "",
                    end: "",
                    value: "",
                    weeks: [],
                    months: [],
                    range: true,
                    items: {
                        picker1: {
                            type: "datetime",
                            value: "",
                            sep: "/", //  =>   / -
                        },
                    }
                }
            }
        },
        watch: {
            'insideLinkId':function(now, past){
                console.log(`now:${now},past:${past}`);

                let arr = ['psycho','article'],
                    arrId = ['mid','articleId']

                    // <li :class="{ active:(insideLinkType == 0)}" @click="insideLinkType =0"><a href="javascript:;">专家</a></li>
                    // <li :class="{ active:(insideLinkType == 1)}" @click="insideLinkType =1"><a href="javascript:;">文章</a></li>
                    // <li :class="{ active:(insideLinkType == 2)}" @click="insideLinkType =2"><a href="javascript:;">测试</a></li>

                if(this.insideLinkType != 2){
                    this.info.pushLink = `xinmao://${arr[this.insideLinkType]}?${arrId[this.insideLinkType]}=${now}`
                }

            },
            'calendar.value': function(value) {

                let time = value.replace(/\//g, "-")
                this.calendar.items[this.calendar.picker].value = time
                 if(isNowBigger(time)){
                    alert('请确定时间，当前：' + this.calendar.items[this.calendar.picker].value)
                 }
            }
        },
        methods: {
            postLink(item){
                this.info.pushLink = `xinmao://testing?testingId=${item.testingId}&tsType=${item.testingType.tsType}&calcMethod=${item.calcMethod}`
            },
            setLink(num){
                this.whichLink = num
                num == 1 ? this.drop.dropState = 'in' : 'hide'
            },
            closeDrop() { //关弹框  0确定  1取消
                this.drop.dropState = "hide"
            },
            update(){ // 更新
                console.log('更新')
                this.ID = `${this.$route.params.id}`
                this.updateInfo()
            },
            async updateInfo() {
                let data = await messagePushobtainMsgPush(`mpId=${this.ID}`)

                data.code == 0 ?  this.info = data.messagePushDTO : alert(`errMsg:${data.msg}`)

                this.imgpath = data.messagePushDTO.img
                // alert(`imgpath:${this.imgpath}`)

                this.calendar.items.picker1.value = data.messagePushDTO.pushTime

                this.whichLinkInit(this.info.pushLink)

            },
            whichLinkInit(link){
                this.whichLink = link.substr(0,6) == 'xinmao' ?  1 : 0
            },
            searchLink() {
                console.log('searchLink')
                this.insideLinkId = [];
                ['getPsychoByName', 'getArticleByTitle', 'getTestingByTitle'].forEach((v, i, array) => {
                    (i == this.insideLinkType) && this[v]()
                })
            },
            switchS(tagNum) {
                this.info.isAll = tagNum
                tagNum == 1 ? '' : this.$els.file.click()
            },
            showName(){
                this.excelName = this.$els.file.value
            },
            async sendFile() {
                console.log("sendFile")


                if(this.calendar.items.picker1.value == ''){
                    alert('时间未填')
                    return
                }

                if(this.info.title == ''){
                    alert('标题未填')
                    return
                }

                if(this.info.content == ''){
                    alert('内容未填')
                    return
                }

                if((this.info.pushType == 2) && (this.info.pushLink == '')){
                    alert('链接未填')
                    return
                }

                let link = this.info.pushLink,
                    text = this.info.linkText
                if(link == "" && text != ''){
                    alert('链接承载文字与链接必须同时存在')
                    return
                }

                if(link != "" && text == ''){
                    alert('链接承载文字与链接必须同时存在')
                    return
                }

                if(this.whichLink == 0){
                    let str = this.info.pushLink
                    if(this.info.pushType == 2){  // IM1 PUSH2  IM可以不检查
                        if(str.substr(0,4) != 'http'){
                            alert('链接格式错误! 以https 或 http开始 ! 当前：'+ this.info.pushLink)
                            return
                        }
                    }
                }


                // <li @click="setLink(0)" v-bind:class="{ 'show': whichLink === 0}">外链接</li>
                // <li @click="setLink(1)" v-bind:class="{ 'show': whichLink === 1}">内链接</li>


                let excel = this.$els.file,file
                this.info.isAll != 1 ?  file = excel.files[0] : ''

                console.dir(excel)

                this.fileExcel(file, this.ID, (data) => {
                    data.code == 0 ?  this.$route.router.go("/imList") : alert(`errMsg:${data.msg}`)
                })


                this.fileState = false

                let _this = this
                setTimeout(function() {
                    _this.fileState =  true
                },1000)

            },
            async fileExcel(files, id, callback) {
                let xhr = new XMLHttpRequest()
                let data = new FormData()

                data.append("content", this.info.content)

                data.append("img", this.imgpath)
                data.append("preImg", this.imgpath)// 原图 缩略图
                data.append("viewImg", this.imgpath)// 原图 缩略图
                // data.append("img", this.img.imgpath)
                // data.append("preImg", this.img.imgpathSmall)// 原图 缩略图
                // data.append("viewImg", this.img.http)// 原图 缩略图

                data.append("isAll",this.info.isAll) // 1 不发files
                data.append("linkText", this.info.linkText)
                data.append("pushLink", this.info.pushLink)  // insideLinkId  whichLink 1 内
                data.append("pushTime", this.calendar.items.picker1.value.replace(/\//g, "-"))
                data.append("pushType", this.info.pushType)
                data.append("title", this.info.title)

                this.info.isAll == 1 ? '' : data.append("file", files)
                this.ID ? data.append("mpId",  this.ID) : ''



                xhr.onload = function() {
                    if (xhr.status === 200 && xhr.status < 300 || xhr.status === 304) {
                        try {
                            const data = JSON.parse(xhr.responseText)
                            callback(data)
                        } catch (e) {
                            console.log("数据失败")
                        }
                         const data = JSON.parse(xhr.responseText)
                            callback(data)
                    }
                }
                this.ID ? xhr.open("post", "/depression-web/messagePush/updateMsgPush.json", true)  : xhr.open("post", "/depression-web/messagePush/saveMsgPush.json", true)

                xhr.send(data)


            },
            open(e, type) {
                // 设置类型
                this.calendar.picker = type
                this.calendar.type = this.calendar.items[type].type
                this.calendar.range = this.calendar.items[type].range
                this.calendar.begin = this.calendar.items[type].begin
                this.calendar.end = this.calendar.items[type].end
                this.calendar.value = this.calendar.items[type].value
                    // 可不用写
                this.calendar.sep = this.calendar.items[type].sep
                this.calendar.weeks = this.calendar.items[type].weeks
                this.calendar.months = this.calendar.items[type].months

                this.calendar.show = true
                this.calendar.x = e.target.offsetLeft
                this.calendar.y = e.target.offsetTop + e.target.offsetHeight + 8
            },

            async getPsychoByName() {
                let data = await getPsychoByName(`name=${this.content.trim()}`)

                if ((data.code === 0) && (data.list.length > 0)) {
                    this.listName = data.list
                } else {
                    this.listName = []
                    alert('出错或未查到数据')
                }

            },

            async getArticleByTitle() {
                let data = await getArticleByTitle(`title=${this.content.trim()}`)

                if ((data.code === 0) && (data.list.length > 0)) {
                    this.listTitle = data.list
                    console.log(this.listTitle[0].digest)
                } else {
                    this.listTitle = []
                    alert('出错或未查到数据')
                }
            },

            async getTestingByTitle() {
                let data = await getTestingByTitle(`title=${this.content.trim()}`)

                if ((data.code === 0) && (data.list.length > 0)) {
                    this.listTesting = data.list
                } else {
                    this.listTesting = []
                    alert('出错或未查到数据')
                }
            },
        },
        directives:{
            'bddisabled':{
                update(newValue, oldValue) {
                     this.el.disabled = newValue == 1 ? true : false
                }
            }
        },
        ready() {
            !!this.$route.params.id ? this.update() : console.log('新增')
        }
    }
</script>

<style scope>

</style>
