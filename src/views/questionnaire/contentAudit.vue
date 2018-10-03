<template>
    <div class="container-fluid">
        <div class="tab-cont">
            <ul class="tagTit">
                <li :class="{ show: !TabState}" @click="switchFn(false)">提问</li>
                <li :class="{ show: TabState}" @click="switchFn(true)">心友圈</li>
            </ul>
        </div>
        <div id="search" class="title">
            <input class="input" size="50" type="text" @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start"> -
            <input class="input" size="50" type="text" @click.stop="open($event,'picker2')" v-model="calendar.items.picker2.value" placeholder="结束时间" id="end" name="end">
            <calendar :show.sync="calendar.show" :type="calendar.type" :value.sync="calendar.value" :x="calendar.x" :y="calendar.y" :begin.sync="calendar.begin" :end.sync="calendar.end" :range.sync="calendar.range" :weeks="calendar.weeks" :months="calendar.months" :sep="calendar.sep">
            </calendar>
            <input type="text" v-model="words" placeholder="请输入搜索内容">
            <input type="text" v-model="name" placeholder="请输入姓名">
            <input type="text" v-model="phone" placeholder="请输入手机号">
            <input type="submit" value="确定搜索" class="btn btn-warning" @click="seach()">
        </div>
        <div class="audit-details-list" v-if="!TabState">
            <audio @ended="audioEndPlay" v-el:audioEl></audio>
            <div class="titleTip" v-for="(index,item)  of Advisory">


                <div>
                    <div class="titleImg">
                        <img class="avatar answer" alt="" :src=" imgPre +'/'+item.advThumbnail ">
                        <button class="btn  btn-danger btn-mini" v-if=" item.disableMessageDays == 0 " @click="DisableFn(item.mid)">禁言</button>
                        <button class="btn btn-info  btn-mini" v-else @click="configClearFn(item.mid)">解禁</button>
                    </div>
                    <span class="message"><span class="arrow"></span>
                    <span class="from"></span>
                    <span class="time">
                        <span>{{ item.advNickname}}
                            <span class="date badge badge-warning" v-if="item.tagName">{{ item.tagName}}</span>
                            <!--TODO 用户手机号-->
                            <span>{{ item.mobilePhone }}</span>
                            <!-- TODO 共赠送锦旗数 -->
							<!--<span> <img :src="jinqi" alt="" class="img-jinqi">：{{ item.pennantNum }} </span>-->
                        </span>
                        <i>{{ item.createTime}}</i>
                    </span>
                    <span class="text">
                            {{ item.content}}
                        </span>
                    <ul class="thumbnails row-fluid">
                        <li class="span1" v-for="items of item.imgsDTOs">
                            <img :src="imgPre +'/'+items.imgPreviewPathAbs" alt="" @click="viewImg(items.imgPathAbs)">
                            <i class="icon-remove" @click="configDeleteImg(items.advisoryImgId)"></i>
                        </li>
                    </ul>
                    <i class="icon-trash delete" @click="deleteAdvisory(item.advisoryId, 'title')"></i>
                    </span>
                </div>
                <div>评论({{item.commentCount}})</div>
                <div class="comments">
                    <ul class="audit-details-list commentinfo" v-if=" item.state && item.commentDTOs">
                        <!--<div>评论({{item.page}})</div>-->
                        <li class="commentList" v-for="(childrenIndex,items) of item.commentDTOs">
                            <p>
                                <img class="avatar answer" alt="" :src=" imgPre + '/'+ items.thumbnail ">
                                <button class="btn  btn-danger btn-mini" v-if=" items.disableMessageDays == 0 " @click="DisableFn(items.mid)">禁言</button>
                                <button class="btn btn-info  btn-mini" v-else @click="configClearFn(items.mid)">解禁</button>
                            </p>
                            <span class="message">
                                <span class="arrow"></span>
                                <span class="from"></span>
                                <span class="time">
                                    <i>{{ items.nickname}}</i>  <i>{{ items.commentTime}}</i></span>
                                    <!--<span><i>{{ items.nickname}}</i> <span style="margin:0 20px;">锦旗数：{{ items.commentPennantNum }}</span><spam>点赞数：{{ items.praiseNum }}</spam></span>-->
                                    <!--<span><i>{{ items.nickname}}</i> <span style="margin:0 20px;" v-if="items.commentPennantNum"><img :src="jinqi" alt="" class="img-jinqi">：{{ items.commentPennantNum }}</span><span v-if="items.praiseNum"><img :src="dianzan" alt="" class="img-jinqi">：{{ items.praiseNum }}</span></span>-->

                                    <!--<i>{{ items.commentTime}}</i></span>-->
                                <!--commentType 0 文本  1 语音-->
									<template v-if="items.commentType === 1">
										<div class="text" style="display: flex;flex-wrap:  nowrap;">
											<div @click="changeAudio(items.commentId, items.commentContent)" class="audio_box" :style="{width: items.audioComWidth}" :class="{'audio_box_ani':items.commentId === currentIndex }"></div>
											<div class="audio_item_duration">{{  items.voiceTimeLength  }}"</div>
										</div>
									</template>

									<span class="text" v-else>
										{{ items.commentContent}}
									</span>

                                <!--<div class="text" style="display: flex;flex-wrap:  nowrap;">-->

									<!--<div @click="changeAudio(items.commentId, items.audioSrc)" class="audio_box" :style="{width: items.audioComWidth}" :class="{'audio_box_ani':items.commentId === currentIndex }"></div>-->
									<!--<div class="audio_item_duration">{{  items.audioDuration  }}"</div>-->
								<!--</div>-->

                                <!--<span class="text">-->
                                    <!--{{ items.commentContent}}-->
                                <!--</span>-->
                                <i class="icon-trash delete" @click="deleteAdvisory(items.commentId, 'comment', index, childrenIndex)"></i>
                            </span>
                        </li>
                    </ul>
                    <div class="comments-h2" v-if="item.state"><a href="javascript:;" @click="switchChange(item.advisoryId,index)">收起评论<i class="icon-chevron-up"></i></a></div>
                    <div class="comments-h2" v-else><a href="javascript:;" @click="switchChange(item.advisoryId,index)">展开评论<i class="icon-chevron-down"></i></a></div>
                </div>
            </div>
        </div>
        <div class="audit-details-list" v-else>
            <div class="titleTip" v-for="(index,item)  of comments">
                <div>
                    <div class="titleImg">
                        <img class="avatar answer" alt="" :src=" imgPre + '/'+item.thumbnail ">
                        <button class="btn  btn-danger btn-mini" v-if=" item.disableMessageDays == 0 " @click="DisableFn(item.mid)">禁言</button>
                        <button class="btn btn-info  btn-mini" v-else @click="configClearFn(item.mid)">解禁</button>
                    </div>
                    <span class="message"><span class="arrow"></span>
                    <span class="from"></span>
                    <span class="time"><span>{{ item.nickname}}</span> <i>{{ item.createTime}}</i></span>
                    <span class="text">
                            {{ item.content}}
                        </span>
                    <ul class="thumbnails row-fluid">
                        <li class="span1" v-for="items of item.imgsDTOs">
                            <img :src="imgPre+'/'+items.imgPreviewPathAbs" alt="" @click="viewImg(items.imgPathAbs)">
                            <i class="icon-remove" @click="configDeleteImg(items.updImgId)"></i>
                        </li>
                    </ul>
                    <i class="icon-trash delete" @click="deleteAdvisory(item.updateId, 'title')"></i>
                    </span>
                </div>
                <div>评论({{item.commentCount}})</div>
                <div class="comments">
                    <ul class="audit-details-list commentinfo" v-if=" item.state && item.commentDTOs">
                        <div>评论({{item.page}})</div>
                        <li class="commentList" v-for="(childrenIndex,items) of item.commentDTOs">
                            <p>
                                <img class="avatar answer" alt="" :src="imgPre+'/'+ items.thumbnail ">
                                <button class="btn  btn-danger btn-mini" v-if=" items.disableMessageDays == 0 " @click="DisableFn(items.mid)">禁言</button>
                                <button class="btn btn-info  btn-mini" v-else @click="configClearFn(items.mid)">解禁</button>
                            </p>
                            <span class="message"><span class="arrow"></span>
                            <span class="from"></span>
                            <span class="time"><i>{{ items.nickname}}</i>  <i>{{ items.commentTime}}</i></span>
                            <span class="text">
                                    {{ items.commentContent}}
                                </span>
                            <i class="icon-trash delete" @click="deleteAdvisory(items.commentId, 'comment', index, childrenIndex)"></i>
                            </span>
                        </li>
                    </ul>
                    <div class="comments-h2" v-if="item.state"><a href="javascript:;" @click="switchChange(item.updateId,index)">收起评论<i class="icon-chevron-up"></i></a></div>
                    <div class="comments-h2" v-else><a href="javascript:;" @click="switchChange(item.updateId,index)">展开评论<i class="icon-chevron-down"></i></a></div>
                </div>
            </div>
        </div>
        <div class="page">
            <div id="test">
                <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
                    <zpagenav>
            </div>
        </div>
    </div>
    <div class="modal-backdrop in" v-if="imgShow"></div>
    <div id="reset" class="modal" v-if="imgShow">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>预览</h3>
        </div>
        <div class="modal-body">
            <img :src="imgPre + '/'+ imgSrc" alt="" class="imgPopup">
        </div>
    </div>
    <div class="modal-backdrop in" v-if="deleteImg"></div>
    <div id="reset" class="modal" v-if="deleteImg">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>删除</h3>
        </div>
        <div class="modal-body">
            <p>确定删除此图片，删除后图片将不在App展示!</p>
        </div>
        <div class="modal-footer">
            <a data-dismiss="modal" href="javascript:;" class="btn " href="#" @click="close()">取消</a>
            <a data-dismiss="modal" href="javascript:;" class="btn btn-danger" href="#" @click="DeleteImg()">确定</a>
        </div>
    </div>
    <div class="modal-backdrop in" v-if="clearDisabled"></div>
    <div id="reset" class="modal" v-if="clearDisabled">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>解禁</h3>
        </div>
        <div class="modal-body">
            <p>确定解禁当前用户？</p>
        </div>
        <div class="modal-footer">
            <a data-dismiss="modal" href="javascript:;" class="btn " href="#" @click="close()">取消</a>
            <a data-dismiss="modal" href="javascript:;" class="btn btn-danger" href="#" @click="configClearDisabled()">确定</a>
        </div>
    </div>
    <div class="modal-backdrop in" v-if="BannedPopup"></div>
    <div id="reset" class="modal" v-if="BannedPopup">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>禁言</h3>
        </div>
        <div class="modal-body form-horizontal">
            <div class="control-group">
                <label class="control-label">禁言 :</label>
                <div class="controls">
                    <input type="number" v-model="days" placeholder="禁言天数"> 天
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a data-dismiss="modal" href="javascript:;" class="btn " @click="close()">取消</a>
            <a data-dismiss="modal" href="javascript:;" class="btn btn-danger" href="#" @click="configBanned()">确定</a>
        </div>
    </div>
    <div class="modal-backdrop in" v-if="delete"></div>
    <div id="reset" class="modal" v-if="delete">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>删除</h3>
        </div>
        <div class="modal-body">
            <p>确定删除此条信息，删除后信息将不在App展示!</p>
        </div>
        <div class="modal-footer">
            <a data-dismiss="modal" href="javascript:;" class="btn" @click="close()">取消</a>
            <a data-dismiss="modal" href="javascript:;" class="btn btn-danger" @click="configDelete()">确定</a>
        </div>
    </div>
</template>
<script type="text/javascript">
import Vue from "vue"
import zpagenav from "vue-pagenav"
import calendar from "../../calendar.vue"
import moment from "moment"
import {
    searchUpdate,
    searchAdvisory,
    clearDisableMessageDays,
    addDisableMessageDays,
    deleteMemberAdvisory,
    obtainAdvisoryComments,
    deleteMemberUpdate,
    deleteMemberAdvisoryComment,
    deleteMemberUpdateComment,
    deleteMemberUpdateImg,
    obtainUpdateComments,
    deleteMemberAdvisoryImg
} from "../../api"

import jinqi from "../../images/jinqi.png"
import dianzan from "../../images/dianzan.png"
import {
    serialize
} from '../../utils.js'

Vue.use(zpagenav)

export default {

    //  # Options
    // * :show    是否显示
    // * :type    date|datetime
    // * :value 默认值
    // * :begin  可选开始时间
    // * :end    可选结束时间
    // * :x      显示x坐标
    // * :y      显示y坐标
    // * :range  是否多选
    // * :weeks 星期标题
    // * :months    月份标题
    // * :sep       分隔符

    components: {
        calendar
    },
    // props: ['imgPre'],
    data() {
        return {
            jinqi,
            dianzan,
            imgPre: `http://${process.env.NODE_ENV == 'production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
            // 数据绑定
            calendar: {
                show: false,
                x: 0,
                y: 0,
                picker: "",
                type: "date",
                value: "",
                begin: "",
                end: "",
                value: "",
                weeks: [],
                months: [],
                sep: "-",
                range: false,
                items: {
                    // 单选模式
                    picker1: {
                        type: "datetime",
                        end: moment().format().split('T')[0],
                        value: "",
                        sep: "-",
                        weeks: ['日', '一', '二', '三', '四', '五', '六'],
                        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    },
                    picker2: {
                        type: "datetime",
                        sep: "-",
                        value: this.start,
                        begin: this.start
                    }
                }
            },
            page: 1, //pagepageSize: 10 //pageSize,  default is 10
            total: 0, //total item count
            maxLink: 10, //how many links to show, must not less than 5,  default is 5
            TabState: false,
            start: "",
            end: "",
            words: "",
            name: "",
            phone: "",
            imgShow: false,
            deleteImg: false,
            imgId: "",
            imgSrc: "",

            advisoryDeleteId: "",
            mid: "",
            days: "",
            typeCommit: "",

            delete: false,
            BannedPopup: false,
            clearDisabled: false,

            parentIndex: "",
            childrenIndex: "",

            currentIndex: '',
            currentAudioSrc: '',
            audioSrcList: ['d7d117b8-645d-44ca-b73d-b576e7c32d8e20180323161203.aac', '21121m1521788474545-5s.aac', '21121m1521790388017-6s.aac', 'd7d117b8-645d-44ca-b73d-b576e7c32d8e20180323161203.aac', '21121m1521788474545-5s.aac', '21121m1521790388017-6s.aac', 'd7d117b8-645d-44ca-b73d-b576e7c32d8e20180323161203.aac', '21121m1521788474545-5s.aac', '21121m1521790388017-6s.aac', 'd7d117b8-645d-44ca-b73d-b576e7c32d8e20180323161203.aac', '21121m1521788474545-5s.aac', '21121m1521790388017-6s.aac', 'd7d117b8-645d-44ca-b73d-b576e7c32d8e20180323161203.aac', '21121m1521788474545-5s.aac', '21121m1521790388017-6s.aac'],
            audioPre: `https://${process.env.NODE_ENV =='production' ? "file.120xinmao.com/" : "oml9gawrn.qnssl.com/" }`,


            Advisory: [], //提问数据
            comments: [], //心有圈数据

        };
    },
    // 处理值的传递
    watch: {
        'calendar.value': function(value) {

            this.calendar.items[this.calendar.picker].value = value

            this.calendar.picker == 'picker1' ? this.start = value : this.end = value
        },

        TabState() {
            !this.TabState ? this.searchAdvisory() : this.searchUpdate()
            this.page = 1
            this.calendar.items.picker1.value = ""
            this.calendar.items.picker2.value = ""
            this.words = ""
            this.name = ""
            this.phone = ""
        },

        page() {
            // !this.TabState ? this.searchAdvisory() : this.searchUpdate()
            this.pageChangeFn()
        }
    },
    methods: {

        changeRoute(url) {
            this.$route.router.go(url)
        },

        pageHandler(page) {
            //here you can do custom state update
            this.page = page

        },
        createUrl(unit) {
            return unit.page > 1 ? '#page=' + unit.page : '#'
        },
        // 打开显示选择器
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

        close() {
            this.imgShow = false
            this.deleteImg = false
            this.delete = false
            this.clearDisabled = false
            this.BannedPopup = false
        },

        switchFn(state) {
            this.TabState = state

            this.end = this.start = ""
        },

        seach() {
            this.page = 1
            let params = {
              pageIndex:this.page,
              pageSize:this.maxLink,
            }
            if (this.start) {
              params.start = this.start
            }
            if (this.end) {
              params.end = this.end
            }
            if (this.words) {
              params.words = this.words
            }
            if (this.phone) {
              params.phone = this.phone
            }
            if (this.name) {
              params.name = this.name
            }
            // let params = `pageIndex=${this.page}&pageSize=${this.maxLink}&begin=${this.start}&end=${this.end}&words=${this.words}&phone=${this.phone}&name=${this.name}`

            !this.TabState ? this.searchAdvisory(serialize(params)) : this.searchUpdate(serialize(params))
        },

        pageChangeFn(){
            // let params = `pageIndex=${this.page}&pageSize=${this.maxLink}&begin=${this.start}&end=${this.end}&words=${this.words}&phone=${this.phone}&name=${this.name}`
            let params = {
              pageIndex:this.page,
              pageSize:this.maxLink,
            }
            if (this.start) {
              params.start = this.start
            }
            if (this.end) {
              params.end = this.end
            }
            if (this.words) {
              params.words = this.words
            }
            if (this.phone) {
              params.phone = this.phone
            }
            if (this.name) {
              params.name = this.name
            }

            !this.TabState ? this.searchAdvisory(params) : this.searchUpdate(params)
        },

        configDeleteImg(id) {
            this.deleteImg = true
            this.imgId = id
        },

        DeleteImg() {
            !this.TabState ? this.deleteMemberAdvisoryImg() : this.deleteMemberUpdateImg()
        },

        viewImg(src) {
            this.imgShow = true
            this.imgSrc = src
        },

        DisableFn(id) {
            this.mid = id
            this.BannedPopup = true
        },

        configClearFn(id) {
            this.mid = id
            this.clearDisabled = true
        },

        configClearDisabled() {
            this.clearDisableMessageDays()
        },

        configBanned() {
            if (this.days <= 0) {
                alert('禁言天数不能小于等于0')
                return false
            }
            this.addDisableMessageDays()
        },

        deleteAdvisory(advisoryId, type, parentIndex, childrenIndex) {
            this.advisoryDeleteId = advisoryId
            this.typeCommit = type
            this.delete = true

            this.parentIndex = parentIndex
            this.childrenIndex = childrenIndex
        },

        configDelete() {
            if (!this.TabState) {
                this.typeCommit == 'title' ? this.deleteMemberAdvisory() : this.deleteMemberAdvisoryComment()
            } else {
                this.typeCommit == 'title' ? this.deleteMemberUpdate() : this.deleteMemberUpdateComment()
            }

        },

        switchChange(id, index) {
            this.advisoryId = id

                !this.TabState ?
                Vue.set(this.Advisory[index], 'state', this.Advisory[index].state ? false : true) :
                Vue.set(this.comments[index], 'state', this.comments[index].state ? false : true)
            if (!this.TabState) {
                if (this.Advisory[index].commentDTOs) {
                    return false
                }
            } else {
                if (this.comments[index].commentDTOs) {
                    return false
                }
            }

            !this.TabState ? this.obtainAdvisoryComments(index) : this.obtainUpdateComments(index)
        },

        //获取心友圈评论列表
        async obtainUpdateComments(i) {
            let data = await obtainUpdateComments(`updateId=${this.advisoryId}&pageIndex=${1}&pageSize=${10}`)

            if (data.code === 0) {
                Vue.set(this.comments[i], 'commentDTOs', data.commentDTOs)
                Vue.set(this.comments[i], 'page', data.count)

            }
        },


        async addDisableMessageDays() {
            let data = await addDisableMessageDays(`days=${this.days}&mid=${this.mid}`)

            !this.TabState ? this.searchAdvisory() : this.searchUpdate()

            this.BannedPopup = false
        },

        async clearDisableMessageDays() {
            let data = await clearDisableMessageDays(`mid=${this.mid}`)

            !this.TabState ? this.searchAdvisory() : this.searchUpdate()

            this.clearDisabled = false
        },

        async deleteMemberAdvisoryImg() {
            let data = await deleteMemberAdvisoryImg(`advisoryImgId=${this.imgId}`)

            if (data.code === 0) {
                !this.TabState ? this.searchAdvisory() : this.searchUpdate()
                this.deleteImg = false
            }
        },
        //删除提问标题
        async deleteMemberAdvisory() {
            let data = await deleteMemberAdvisory(`advisoryId=${this.advisoryDeleteId}`)

            data.code === 0 && this.searchAdvisory()

            this.delete = false
        },

        //删除心友圈标题
        async deleteMemberUpdate() {
            let data = await deleteMemberUpdate(`updateId=${this.advisoryDeleteId}`)

            if (data.code === 0) {
                !this.TabState ? this.searchAdvisory() : this.searchUpdate()

            }
            this.delete = false
        },

        //删除心友圈评论
        async deleteMemberUpdateComment() {
            console.log(2)
            let data = await deleteMemberUpdateComment(`commentId=${this.advisoryDeleteId}`)

            if (data.code === 0) {
                !this.TabState ? this.searchAdvisory() : this.searchUpdate()
                this.deleteImg = false
            }

            this.delete = false
        },


        //提问列表
        async searchAdvisory(params = `pageIndex=${this.page}&pageSize=${this.maxLink}`) {
            let data = await searchAdvisory(params)

            if (data.code === 0) {
                this.Advisory = data.memberAdvisoryDTOs



                this.total = data.count



            }
        },

        //删除提问评论
        async deleteMemberAdvisoryComment() {
            let data = await deleteMemberAdvisoryComment(`commentId=${this.advisoryDeleteId}`)

            this.$log()
            console.log(this.parentIndex)
            console.log(this.childrenIndex)
            if (data.code === 0) {
                //Vue.delete(this.Advisory[this.parentIndex].commentDTOs[this.childrenIndex])
                this.Advisory[this.parentIndex].commentDTOs.splice(this.childrenIndex, 1)

            }
            //data.code === 0 && this.searchAdvisory()

            this.delete = false
        },

        //获取提问评论列表
        async obtainAdvisoryComments(i) {
            let data = await obtainAdvisoryComments(`advisoryId=${this.advisoryId}&pageIndex=${1}&pageSize=${10}`)

            if (data.code === 0) {
                Vue.set(this.Advisory[i], 'commentDTOs', data.commentDTOs)
                Vue.set(this.Advisory[i], 'page', data.count)


                // 对audio赋值

                this.Advisory[i].commentDTOs.forEach((item, index) => {
                    // let audio = document.createElement('audio')
                    // Vue.set(item, 'audioSrc', this.audioSrcList[index]);
                    // audio.src = this.audioPre + item.audioSrc
                    // audio.addEventListener("canplaythrough", function () {
                    //     console.log(audio.duration)
                    //     Vue.set(item, 'audioDuration', Math.round(audio.duration))
                    //     Vue.set(item, 'audioComWidth', Math.round(audio.duration) / 60 * 600 + 'px')
                    // }, false);

                    if (item.commentType === 1) {
                        let vLength = ''
                        if (item.voiceTimeLength < 20) {
                            vLength = 100
                        } else if (item.voiceTimeLength > 60) {
                            vLength = 300
                        } else {
                            vLength = Math.round(item.voiceTimeLength) / 60 * 300
                        }
                        Vue.set(item, 'audioComWidth', vLength + 'px')
                    }

                })

            }

        },

        //删除心友圈图片
        async deleteMemberUpdateImg(params = `updateImgId=${this.imgId}`) {
            let data = await deleteMemberUpdateImg(params)

            if (data.code === 0) {
                !this.TabState ? this.searchAdvisory() : this.searchUpdate()
                this.deleteImg = false
            }
        },

        //心有圈的列表
        async searchUpdate(params = `pageIndex=${this.page}&pageSize=${this.maxLink}`) {
            let data = await searchUpdate(params)

            if (data.code === 0) {
                this.comments = data.memberUpdateDTOs
                this.total = data.count
            }

        },

        changeAudio(id, src) {
            let audio = this.$els.audioel
            if (this.currentIndex === id) {
                audio.pause();
                this.currentIndex = ''
            } else {
                console.log(111)
                this.currentIndex = id
                audio.src = this.audioPre + src
                audio.addEventListener("canplaythrough", function () {
                    audio.play();
                }, false);

                // audio.load();
                // audio.play();

            }


        },

        audioEndPlay() {
            console.log("完成播放")
            this.currentIndex = ''
        },


    },
    ready() {
        !this.TabState && this.searchAdvisory()
    }
}
</script>
