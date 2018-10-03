<template>

	<div class="container-fluid">
		<div class="widget-box" style="width:70%;">
	        <div class="widget-title"> <span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i> </span>
	            <h5>新增问卷</h5>
	        </div>
	        <div class="form-horizontal row-fluid widget-content" id="newPsq">
	            <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>类型选择 :</label>
	                <div class="controls">
	                    <select v-model="tagId" name="tagId" value="{{ tagId }} "style="height:22px;">
							<option v-for="item of select" value="{{ item.tagId }}"> {{ item.phrase}} </option>
						</select>
	                </div>
	            </div>
	            <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>问题 :</label>
	                <div class="controls">
	                    <textarea type="text" value="{{ askContent }}" v-model="askContent"class="span11 span4" name="askContent" id="askContent" maxlength="400" style="width:600px" placeholder="请输入问题"></textarea>
	                </div>
	            </div>
	            <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>咨询时间 :</label>
	                <div class="controls">
	                	<input class="input" size="50" type="text"  @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="咨询时间" value="{{ askTime }}" >
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
						    :sep="calendar.sep">
						</calendar>
	                </div>
	            </div>

	            <div class="control-group">
					<label class="control-label"><span class="validateError">*</span>配图 :</label>
					<div class="controls">
						<qiniu event-Name="imgPath" :defaultimg="imgPath"></qiniu>
					</div>
				</div>
	                
	           <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>咨询师回答 :</label>
	                <div class="controls">
	                    <textarea type="text" name="answerContent" id="digest" v-model="answerContent" placeholder="问题内容" maxlength="400" style="width:600px" value="{{ answerContent }} "> </textarea>
	                </div>
	            </div>
				<div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>权重参数 :</label>
	                <div class="controls">
	                    <input type="number" name="sorting" v-model="sorting">
	                </div>
	            </div>

	            <div class="control-group">
	                <label class="control-label">&nbsp;</label>
	                <div class="controls">
	                    <div class="btn btn-info" id="btn-save" @click="upload()">保存信息</div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script type="text/javascript">
	import Vue from "vue"
	import calendar from "../../calendar.vue"
	import moment from "moment"
	import qiniu from "../../qiniu.vue"
	import {getTagList, getAdvisoryCurationDetail, updateAdvisoryCuration, addAdvisoryCuration } from "../../api.js"

	export default {
		components:{
	        calendar
	    },
		components: {
			qiniu
		},

		events:{
            'imgParameter':function(obj,eventName){
				this[eventName] = obj[eventName].imgPath
            }
        },
		data(){
    		return{
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
	                        value:"",
	                        sep:"-",
	                        weeks:['日', '一', '二', '三', '四', '五', '六'],
	                        months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	                    }
		            }
		        },

    			askId:window.location.pathname.split('/')[2],
    			select:[],
    			answerContent : "", 
    			askContent : "",
    			askTime : "",
    			tagName : "", 
    			tagId:"",
    			imgPath:"",
    			imgPreviewPath:"",
    			jsonForImgs:"",
				sorting:""
    		}
    	},
    	watch:{
    		'calendar.value': function (value) {

	           this.askTime =  this.calendar.items[this.calendar.picker].value = value

	        }
    	},
    	methods:{

    		photoAvatarFun(e){
	    		let self = this
	    		this.file = e.target.files[0]
	    		fileImage(this.file,(data) => {
	    			let dataImg = data.files[0]
	    				this.imgPath = dataImg.fileRelPath
	    				this.imgPreviewPath = dataImg.filePath
	    		})

	    	},

	    	serialize(obj){

				let str = ""
				for (let key in obj) {
					str += `${key}=${obj[key]}&`
				}
				str = str.slice(0, -1)
				return str

			},

    		upload(){

				if(this.imgPath == ''){
					alert('图片必须上传')
					return  false
				}
				
    			this.jsonForImgs = `[{imgPath:"${this.imgPath}"}]`


    			// 处理数据
				let registerData = JSON.parse(JSON.stringify(this.$data))


				delete registerData.select
				delete registerData.imgPath
    			delete registerData.imgPreviewPath
    			delete registerData.tagName

				let params = this.serialize(registerData)

				
    			!!this.askId ? 
    				this.updateAdvisoryCuration(params) 
    				: 
    				this.addAdvisoryCuration(params)

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



    		async updateAdvisoryCuration(params){

    			let data =  await updateAdvisoryCuration(params)

    			if(data.code==0){
    				this.$route.router.go('/answer')
    			}else{
    				alert(data.msg)
    				this.jsonForImgs = ""
    			}
    		},

    		async addAdvisoryCuration(params){

    			let data =  await addAdvisoryCuration(params)
    			if(data.code==0){
    				this.$route.router.go('/answer')
    			}else{
    				alert(data.msg)
    				this.jsonForImgs = ""
    			}

    		},

    		async getTagList(){
	            let data = await getTagList()
	            if(data.code == 0){
	                this.select = data.list
	            }else{
	                alert(data.msg)
	            }

	        },
    		async getAdvisoryCurationDetail(params){

    			let data =  await getAdvisoryCurationDetail(params)

    			let object = data.obj

    			this.answerContent = object.answerContent
    			this.askContent = object.askContent
    			this.askTime = object.askTime
    			this.tagName = object.tagName
    			this.tagId = object.tagId
				this.sorting = object.sorting
    			object['imgList'][0].imgPath && (this.imgPath = object['imgList'][0].imgPath)
	    		object['imgList'][0].imgPreviewPath  && (this.imgPreviewPath = object['imgList'][0].imgPreviewPath)
    		}
    	},


    	ready(){
    		!!this.askId && this.getAdvisoryCurationDetail(`askId=${this.askId}`)
    		this.getTagList()

    	}
	}
</script>