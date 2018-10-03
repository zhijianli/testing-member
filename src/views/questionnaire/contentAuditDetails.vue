<template>
 <div class="container-fluid" v-if="isEmptyObject(advisoryDetailDTO)">
	<ul class="audit-details-list">
		<li class="titleTip" v-if="type === 'advisory'">
            <div >
                <img  class="avatar answer" alt="" :src=" advisoryDetailDTO.advThumbnail ">
                <button class="btn  btn-danger btn-mini"  v-if=" advisoryDetailDTO.disableMessageDays == 0 " @click="DisableFn(advisoryDetailDTO.mid)">禁言</button>
				<button class="btn btn-info  btn-mini" v-else @click="configClearFn(advisoryDetailDTO.mid)">解禁</button>
            </div>
			<span class="message"><span class="arrow"></span>
				<span class="from"></span>
				<span class="time"><i>{{ advisoryDetailDTO.advNickname}}</i> <i>{{ advisoryDetailDTO.tagName}}</i> <i>{{ advisoryDetailDTO.createTime}}</i></span>
				<span class="text">
					{{ advisoryDetailDTO.content}}
				</span>
                <i class="icon-trash delete" @click="deleteAdvisory(advisoryDetailDTO.advisoryId, 'title')"></i>
			</span>	                                  
		</li>

		<li class="titleTip" v-else >
            <div >
                <img  class="avatar answer" alt="" :src=" advisoryDetailDTO.thumbnail ">
                <button class="btn  btn-danger btn-mini"  v-if=" advisoryDetailDTO.disableMessageDays == 0 " @click="DisableFn(advisoryDetailDTO.mid)">禁言</button>
				<button class="btn btn-info  btn-mini" v-else @click="configClearFn(advisoryDetailDTO.mid)">解禁</button>
            </div>
			<span class="message"><span class="arrow"></span>
				<span class="from"></span>
				<span class="time"><i>{{ advisoryDetailDTO.nickname}}</i>  <i>{{ advisoryDetailDTO.createTime}}</i></span>
				<span class="text">
					{{ advisoryDetailDTO.detail}}
				</span>
                <i class="icon-trash delete" @click="deleteAdvisory(advisoryDetailDTO.updateId, 'title')"></i>
			</span>	                                  
		</li>
	</ul>

	<ul class="audit-details-list commentinfo" v-if="type === 'advisory'" >
		<div>评论</div>
		<li class="commentList" v-for="item of commentDTOs">
            <div >
                <img  class="avatar answer" alt="" :src=" item.thumbnail ">
                <button class="btn  btn-danger btn-mini"  v-if=" item.disableMessageDays == 0 " @click="DisableFn(item.mid)">禁言</button>
				<button class="btn btn-info  btn-mini" v-else @click="configClearFn(item.mid)">解禁</button>
            </div>
			<span class="message"><span class="arrow"></span>
				<span class="from"></span>
				<span class="time"><i>{{ item.nickname}}</i>  <i>{{ item.commentTime}}</i></span>
				<span class="text">
					{{ item.commentContent}}
				</span>
                <i class="icon-trash delete"  @click="deleteAdvisory(item.commentId, 'comment')"></i>
			</span>	                                  
		</li>
	</ul>

	<ul class="audit-details-list commentinfo" v-else>
		<div>评论</div>
		<li class="commentList" v-for="item of commentDTOs">
			<div >
				<img  class="avatar answer" alt="" :src=" item.thumbnail ">
				<button class="btn  btn-danger btn-mini"  v-if=" item.disableMessageDays == 0 " @click="DisableFn(item.mid)">禁言</button>
				<button class="btn btn-info  btn-mini" v-else @click="configClearFn(item.mid)">解禁</button>
			</div>
			<span class="message"><span class="arrow"></span>
				<span class="from"></span>
				<span class="time"><i>{{ item.nickname}}</i>  <i>{{ item.commentTime}}</i></span>
				<span class="text">
					{{ item.commentContent}}
				</span>
				<i class="icon-trash delete"  @click="deleteAdvisory(item.updateId, 'comment')"></i>
			</span>	                                  
		</li>
	</ul>


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
        <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDelete()">确定</a>
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
        <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configClearDisabled()">确定</a>
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
				<input type="number" v-model="days" placeholder="禁言天数">   天
			</div>
		</div>
    </div>
    <div class="modal-footer">
        <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configBanned()">确定</a>
    </div>
</div>



</template>
<script>
	import Vue from "vue"
	import calendar from "../../calendar.vue"
	import moment from "moment"

    import { 
		obtainAdvisoryDetail, 
		obtainAdvisoryComments, 
		deleteMemberAdvisory, 
		deleteMemberAdvisoryComment, 
		addDisableMessageDays, 
		clearDisableMessageDays,
		obtainUpdateDetail,
		obtainUpdateComments,
		deleteMemberUpdate,
		deleteMemberUpdateComment
	 } from "../../api"


	export default {

// 	# Options
// * :show    是否显示
// * :type    date|datetime
// * :value	默认值
// * :begin  可选开始时间
// * :end    可选结束时间
// * :x      显示x坐标
// * :y      显示y坐标
// * :range  是否多选
// * :weeks	星期标题
// * :months	月份标题
// * :sep		分隔符

    components:{
        calendar
    },
    data() {
        return {
            // 数据绑定
            calendar:{
                show:false,
                x:0,
                y:0,
                picker:"",
                type:"date",
                value:"",
                begin:"",
                end:"",
                value:"",
                weeks:[],
                months:[],
                sep:"-",
                range:false,
                items:{
                    // 单选模式
                    picker1:{
                        type:"datetime",
                        end:moment().format().split('T')[0],
                        value:"",
                        sep:"-",
                        weeks:['日', '一', '二', '三', '四', '五', '六'],
                        months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    }
                }
            },
			pageIndex:1,
			pageSize:10,

			advisoryId : location.pathname.split('/').pop().split('-').pop(),
			type: location.pathname.split('/').pop().split('-')[0],

			advisoryDetailDTO:{}, //提问题目信息
			commentDTOs:[],    //提问评论列表信息

			advisoryDeleteId:"",
			mid:"",
			days:"",
			typeCommit:"",

			delete:false,
			BannedPopup:false,
			clearDisabled:false
        }
    },
     // 处理值的传递
    watch:{
        'calendar.value': function (value) {

            this.setTime = this.calendar.items[this.calendar.picker].value = value
           
        }
    },  
    methods:{
		isEmptyObject(e) {
			return !! Object.keys(e).length
		},

        changeRoute(url){
            this.$route.router.go(url)
        },

        // 打开显示选择器
        open(e,type) {
            // 设置类型
            this.calendar.picker=type
            this.calendar.type=this.calendar.items[type].type
            this.calendar.range=this.calendar.items[type].range
            this.calendar.begin=this.calendar.items[type].begin
            this.calendar.end=this.calendar.items[type].end
            this.calendar.value=this.calendar.items[type].value
            // 可不用写
            this.calendar.sep=this.calendar.items[type].sep
            this.calendar.weeks=this.calendar.items[type].weeks
            this.calendar.months=this.calendar.items[type].months

            this.calendar.show=true
            this.calendar.x=e.target.offsetLeft
            this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8
        },
		//获取提问标题信息
		async obtainAdvisoryDetail(){
			let data = await obtainAdvisoryDetail(`advisoryId=${this.advisoryId}`)

			data.code === 0 && ( this.advisoryDetailDTO = data.advisoryDetailDTO )
		},
		//获取提问评论列表
		async obtainAdvisoryComments(){
			let data = await obtainAdvisoryComments(`advisoryId=${this.advisoryId}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)

			data.code === 0 && ( this.commentDTOs = data.commentDTOs)
		},
		//获取心友圈标题信息
		async obtainUpdateDetail(){
			let data = await obtainUpdateDetail(`updateId=${this.advisoryId}`)

			data.code === 0 && ( this.advisoryDetailDTO = data.updateDetailDTO )
		},
		//获取心友圈评论列表
		async obtainUpdateComments(){
			let data = await obtainUpdateComments(`updateId=${this.advisoryId}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)

			data.code === 0 && ( this.commentDTOs = data.commentDTOs)
		},

		//删除提问标题
		async deleteMemberAdvisory(){
			let data = await deleteMemberAdvisory(`advisoryId=${this.advisoryDeleteId}`)

			data.code === 0 && ( this.changeRoute('/ContentAudit'))
		},
		//删除提问评论
		async deleteMemberAdvisoryComment(){
			let data = await deleteMemberAdvisoryComment(`commentId=${this.advisoryDeleteId}`)

			data.code === 0 && this.obtainAdvisoryComments()

			this.delete = false
		},
		//删除心友圈标题
		async deleteMemberUpdate(){
			let data = await deleteMemberUpdate(`updateId=${this.advisoryDeleteId}`)

			data.code === 0 && ( this.changeRoute('/ContentAudit'))
		},
		//删除心友圈评论
		async deleteMemberUpdateComment(){
			let data = await deleteMemberUpdateComment(`updateId=${this.advisoryDeleteId}`)

			data.code === 0 && this.obtainUpdateComments()

			this.delete = false
		},

		async addDisableMessageDays(){
			let data = await addDisableMessageDays(`days=${this.days}&mid=${this.mid}`)

			if( data.code === 0 ){
				this.obtainAdvisoryDetail()
				this.obtainAdvisoryComments()
			}

			this.BannedPopup = false
		},

		async clearDisableMessageDays(){
			let data = await clearDisableMessageDays(`mid=${this.mid}`)

			if( data.code === 0 ){
				this.obtainAdvisoryDetail()
				this.obtainAdvisoryComments()
			}

			this.clearDisabled = false
		},

		close(){
			this.delete = false
			this.clearDisabled = false
			this.BannedPopup = false
		},

		configDelete(){
			if(this.type === 'advisory'){
				this.typeCommit == 'title'  ? this.deleteMemberAdvisory() : this.deleteMemberAdvisoryComment()
			}else{
				this.typeCommit == 'title'  ? this.deleteMemberUpdate() : this.deleteMemberUpdateComment()
			}
			 
		},

		configBanned(){
			if(this.days <= 0 ){
				alert('禁言天数不能小于等于0')
				return false
			}
			this.addDisableMessageDays()
		},

		configClearDisabled(){
			this.clearDisableMessageDays()
		},


		deleteAdvisory(advisoryId,type){
			this.advisoryDeleteId = advisoryId
			this.typeCommit = type
			this.delete = true
		},

		DisableFn(id){
			this.mid = id
			this.BannedPopup = true
		},

		configClearFn(id){
			this.mid = id
			this.clearDisabled = true
		}		

    },

    ready(){

		if(this.type === 'advisory'){
			this.obtainAdvisoryDetail()
			this.obtainAdvisoryComments()
		}else{
			this.obtainUpdateDetail()
			this.obtainUpdateComments()
		}
		
    }
}
</script>