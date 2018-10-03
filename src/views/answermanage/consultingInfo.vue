<template>
	<div class="container-fluid">
		<div class="audit-details-list">
			<div class="titleTip">
				<div>
					<div class="titleImg">
						<img class="avatar answer" alt="" :src=" imgPre +'/'+ advThumbnail ">
						<button class="btn  btn-danger btn-mini" v-if=" !objList.disableMessageDays " @click="DisableFn(objList.mid)">禁言</button>
						<button class="btn btn-info  btn-mini" v-else @click="configClearFn(objList.mid)">解禁</button>
					</div>
					<span class="message"><span class="arrow"></span>
                    <span class="from"></span>
                    <span class="time">
                        <span>{{ advNickname}}
                            <span class="date badge badge-warning" v-if="tagName">{{ tagName}}</span>
                            <span>{{ objList.mobilePhone }}</span>
							<!-- TODO 为什么两个页面的锦旗数显示不一致？   购买锦旗记录相关问题-->
							<span> <img :src="jinqi" alt="" class="img-jinqi">：{{ objList.pennantNum }} </span>
                        </span>
                        <i>{{ createTime}}</i>
                    </span>
                    <span class="text">
                            {{ content}}
                        </span>
                    <ul class="thumbnails row-fluid">
                        <li class="span1" v-for="items of imgsDTOs">
                            <img :src="imgPre +'/'+items.imgPreviewPathAbs" alt="" @click="viewImg(items.imgPathAbs)">
                            <i class="icon-remove" @click="configDeleteImg(advisoryImgId)"></i>
                        </li>
                    </ul>
                    <i class="icon-trash delete" @click="deleteAdvisory(advisoryId, 'title')"></i>
                    </span>
				</div>
				<div>评论({{commentCount}})</div>
				<div class="comments">

					<audio @ended="audioEndPlay" v-el:audioEl></audio>

					<ul class="audit-details-list commentinfo" v-if="commentList.length">
						<!--<div>评论({{item.page}})</div>-->
						<li class="commentList" v-for="(childrenIndex,items) of commentList">
							<p>
								<img class="avatar answer" alt="" :src=" imgPre + '/'+ items.thumbnail ">
								<button class="btn  btn-danger btn-mini" v-if=" !items.disableMessageDays " @click="DisableFn(items.mid)">禁言</button>
								<button class="btn btn-info  btn-mini" v-else @click="configClearFn(items.mid)">解禁</button>
							</p>
							<span class="message">
								<span class="arrow"></span>
                            	<span class="from"></span>
                            	<span class="time">
									<span><i>{{ items.nickname}}</i> <span style="margin:0 20px;" v-if="items.commentPennantNum"><img :src="jinqi" alt="" class="img-jinqi">：{{ items.commentPennantNum }}</span><span v-if="items.praiseNum"><img :src="dianzan" alt="" class="img-jinqi">：{{ items.praiseNum }}</span></span>

									<i>{{ items.commentTime}}</i></span>
									<!--commentType 0 文本  1 语音-->
									<template v-if="items.commentType === 1">
										<div class="text" style="display: flex;flex-wrap:  nowrap;">
											<div @click="changeAudio(childrenIndex, items.commentContent)" class="audio_box" :style="{width: items.audioComWidth}" :class="{'audio_box_ani':childrenIndex === currentIndex }"></div>
											<div class="audio_item_duration">{{  items.voiceTimeLength  }}"</div>
										</div>
									</template>

									<span class="text" v-else>
										{{ items.commentContent}}
									</span>
                            	<i class="icon-trash delete" @click="deleteAdvisory(items.commentId, 'comment', index, childrenIndex)"></i>
                            </span>

														<!-- 回复 -->
														<div class="comments">

															<audio @ended="audioEndPlay" v-el:audioEl></audio>

															<ul class="audit-details-list commentinfo" v-if="commentList.length">
																<!--<div>评论({{item.page}})</div>-->
																<li class="commentList" v-for="(childrenIndex,item) of items.childList" style="background-color: #f7f7f7;margin-left: 60px;">
																	<p>
																		<img class="avatar answer" alt="" :src=" imgPre + '/'+ item.thumbnail ">
																		<button class="btn  btn-danger btn-mini" v-if=" !item.disableMessageDays " @click="DisableFn(item.mid)">禁言</button>
																		<button class="btn btn-info  btn-mini" v-else @click="configClearFn(item.mid)">解禁</button>
																	</p>
																	<span class="message" style="width: 543px;">
																		<span class="arrow"></span>
										                            	<span class="from"></span>
										                            	<span class="time">
																			<span><i>{{ item.nickname}}</i> <span style="margin:0 20px;" v-if="item.commentPennantNum"><img :src="jinqi" alt="" class="img-jinqi">：{{ item.commentPennantNum }}</span><span v-if="item.praiseNum"><img :src="dianzan" alt="" class="img-jinqi">：{{ item.praiseNum }}</span></span>

																			<i>{{ item.commentTime}}</i></span>
																			<!--commentType 0 文本  1 语音-->
																			<template v-if="item.commentType === 1">
																				<div class="text" style="display: flex;flex-wrap:  nowrap;">
																					<div @click="changeAudio(childrenIndex, item.commentContent)" class="audio_box" :style="{width: items.audioComWidth}" :class="{'audio_box_ani':childrenIndex === currentIndex }"></div>
																					<div class="audio_item_duration">{{  item.voiceTimeLength  }}"</div>
																				</div>
																			</template>

																			<span class="text" v-else>
																				{{ item.commentContent}}
																			</span>
										                            	<i class="icon-trash delete" @click="deleteAdvisory(item.commentId, 'comment', index, childrenIndex)"></i>
										                            </span>
																</li>
															</ul>
														</div>
						</li>

					</ul>

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

		<!--<ul class="chat">-->
			<!--<li class="left">-->
				<!--<img class="avatar answer" alt="" :src="advThumbnail">-->
				<!--<span class="message"><span class="arrow"></span>-->
					<!--<span class="from"></span>-->
					<!--<span class="time"><i>{{ advNickname }}</i> <i>{{ tagName }}</i> <i>{{ createTime }}</i></span>-->
					<!--<span class="text">-->
						<!--{{ content }}-->
					<!--</span>-->
				<!--</span>-->
			<!--</li>-->
			<!--<li class="left" v-for="item of commentList">-->
				<!--<img class="avatar consultant" alt="" :src="item.thumbnail">-->
				<!--<span class="message"><span class="arrow"></span>-->
					<!--<span class="from"></span>-->
					<!--<span class="time"><i>{{ item.nickname }} {{ item.title }}</i> <i>{{ item.commentTime }}</i> </span>-->
					<!--<span class="text">-->
						 <!--{{ item.commentContent }}-->
					<!--</span>-->
				<!--</span>-->
			<!--</li>-->

			<!---->
			<!---->
		<!--</ul>-->
	</div>
</template>


<script type="text/javascript">
	let {log} = console
	import Vue from "vue"
	import {
	    getAdvisoryDetail,
        clearDisableMessageDays,
        addDisableMessageDays,
        deleteMemberAdvisory,
        deleteMemberAdvisoryComment,
        deleteMemberAdvisoryImg
	} from "../../api.js"

	import jinqi from "../../images/jinqi.png"
	import dianzan from "../../images/dianzan.png"

	export default {
		data(){
			return {
			    jinqi,
				dianzan,
                imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
				audioPre: `https://${process.env.NODE_ENV =='production' ? "file.120xinmao.com/" : "oml9gawrn.qnssl.com/" }`,

                advisoryId:window.location.pathname.split('/')[2],
				commentList:[],
				childList:[],
				advNickname:"",
				content:"",
				createTime:"",
				tagName:"",
				advThumbnail:"",
                advisoryImgId:'',
				imgsDTOs: [],
                commentCount: '',
				objList: [],

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
				audioSrcList: ['d7d117b8-645d-44ca-b73d-b576e7c32d8e20180323161203.aac', '21121m1521788474545-5s.aac', '21121m1521790388017-6s.aac', 'd7d117b8-645d-44ca-b73d-b576e7c32d8e20180323161203.aac', '21121m1521788474545-5s.aac', '21121m1521790388017-6s.aac', 'd7d117b8-645d-44ca-b73d-b576e7c32d8e20180323161203.aac', '21121m1521788474545-5s.aac', '21121m1521790388017-6s.aac','d7d117b8-645d-44ca-b73d-b576e7c32d8e20180323161203.aac', '21121m1521788474545-5s.aac', '21121m1521790388017-6s.aac','d7d117b8-645d-44ca-b73d-b576e7c32d8e20180323161203.aac', '21121m1521788474545-5s.aac', '21121m1521790388017-6s.aac']
			}
		},
		methods:{


            close() {
                this.imgShow = false
                this.deleteImg = false
                this.delete = false
                this.clearDisabled = false
                this.BannedPopup = false
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
                this.typeCommit == 'title' ? this.deleteMemberAdvisory() : this.deleteMemberAdvisoryComment()

            },

            async addDisableMessageDays() {
                let data = await addDisableMessageDays(`days=${this.days}&mid=${this.mid}`)

                this.getAdvisoryDetail(`advisoryId=${this.advisoryId}`)

                this.BannedPopup = false
            },

            async clearDisableMessageDays() {
                let data = await clearDisableMessageDays(`mid=${this.mid}`)

                this.getAdvisoryDetail(`advisoryId=${this.advisoryId}`)

                this.clearDisabled = false
            },

            async deleteMemberAdvisoryImg() {
                let data = await deleteMemberAdvisoryImg(`advisoryImgId=${this.imgId}`)

                if (data.code === 0) {
                    this.getAdvisoryDetail(`advisoryId=${this.advisoryId}`)
                    this.deleteImg = false
                }
            },
            //删除提问标题
            async deleteMemberAdvisory() {
                let data = await deleteMemberAdvisory(`advisoryId=${this.advisoryDeleteId}`)

                data.code === 0 && this.getAdvisoryDetail(`advisoryId=${this.advisoryId}`)

                this.delete = false
            },

            //删除提问评论
            async deleteMemberAdvisoryComment() {
                let data = await deleteMemberAdvisoryComment(`commentId=${this.advisoryDeleteId}`)

                this.$log()
                console.log(this.parentIndex)
                console.log(this.childrenIndex)
                if (data.code === 0) {
                    this.getAdvisoryDetail(`advisoryId=${this.advisoryId}`)

                }

                this.delete = false
            },

            async getAdvisoryDetail(params){

                let data  = await getAdvisoryDetail(params)

                let obj = data.obj
                this.commentList = data.commentList
								console.log(this.items);

                // 对audio赋值
                this.commentList.forEach((item, index) => {
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


                this.advNickname = obj.advNickname
                this.content = obj.content
                this.createTime = obj.createTime
                this.tagName = obj.tagName
                this.advThumbnail = obj.advThumbnail
                this.advisoryImgId = obj.advisoryImgId
                this.imgsDTOs = obj.imgsDTOs
                this.commentCount = data.commentList.length

                this.objList = data.obj



            },


            changeAudio(id, src) {
                let audio = this.$els.audioel
								console.log(this.childrenIndex);
								console.log(this.currentIndex);

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
			}



        },
		ready(){
			this.getAdvisoryDetail(`advisoryId=${this.advisoryId}`)
		}
	}

</script>
