<template>
	<div class="container-fluid">
		<div class="widget-box" style="width:70%;">
	        <div class="widget-title"> <span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i> </span>
	            <h5>医生信息</h5>
	        </div>
	        <div class="form-horizontal widget-content row-fluid" id="newPsq"  name="basic_validate" novalidate="novalidate">
	            <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>姓名 :</label>
	                <div class="controls">
	                    <input type="text" value="{{ name }} " class="span11 span4" name="name" id="name" v-model="name" placeholder="请输入姓名">
	                </div>
	            </div>
	            <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>职务 :</label>
	                <div class="controls">
	                    <input type="text" value="{{ position }}" class="span11 span4" v-model="position" name="position" id="position" placeholder="请输入您的职务">
	                </div>
	            </div>
	            <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>科室 :</label>
	                <div class="controls">
	                    <input type="text" value="{{ department }}" class="span11 span4" name="department"  v-model="department" id="department" placeholder="请输入您的科室">
	                </div>
	            </div>
	            <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>医院 :</label>
	                <div class="controls">
	                    <input type="text" value="{{ hospital }} " class="span11 span4" name="hospital" v-model="hospital" id="hospital" placeholder="请输入您的所在医院">
	                </div>
	            </div>
	            
	            <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>专业特长:</label>
	                <div class="controls">
	                    <textarea class="span11 textarea-init" name="specializes" id="specializes" value="{{ specializes }}" v-model="specializes" placeholder="请输入您的专业技能"></textarea>
	                </div>
	            </div>
	            <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>简介和头衔:</label>
	                <div class="controls">
	                    <textarea class="span11 titleContent textarea-init" name="briefIntroduction" value="{{ briefIntroduction }}" id="briefIntroduction" v-model="briefIntroduction"></textarea>
	                </div>
	            </div>
	            
	            
	            <div class="control-group">
					<label class="control-label">图片:</label>
					<div class="controls">
						<qiniu event-Name="avatar" :defaultimg="avatar"></qiniu>
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
	
	import {doctorAdd, doctorUpdate, doctorView} from "../../api.js"
	import qiniu from "../../qiniu.vue"

	export default {
		data(){
    		return{
    			doctId:window.location.pathname.split('/')[2],
    			avatar:'',
    			name:'',
    			position:'',
    			department:'',
				hospital:'',
				specializes:'',   				
				briefIntroduction:''

    		}
    	},
		components: {
			qiniu
		},
		events:{
            'imgParameter':function(obj,eventName){
				this[eventName] = obj[eventName].imgPath
            }
        },
    	methods:{
    		upload(){
    			let object = this.$data

    			delete object.imgPreviewPath

    			if(!!this.doctId){

    				this.doctorUpdate(this.serialize(object)) 

    			}else{

    				delete object.doctId

    				this.doctorAdd(this.serialize(object))
    			}
    		},

    		serialize(obj){

				let str = ""
				for (let key in obj) {
					str += `${key}=${obj[key]}&`
				}
				str = str.slice(0, -1)
				return str

			},


    		async doctorUpdate(params){

    			let data =  await doctorUpdate(params)
    			if(data.code==0){
    				this.$route.router.go('/doctor')
    			}else{
    				alert(data.msg)
    			}
    		},

    		async doctorAdd(params){

    			let data =  await doctorAdd(params)
    			if(data.code==0){
    				// location = "/doctor"
    				this.$route.router.go('/doctor')
    			}else{
    				alert(data.msg)
    			}

    		},

    		async doctorView(params){

    			let data =  await doctorView(params)

    			let object = data.obj
    			this.name = object.name
    			this.position = object.position
    			this.department = object.department
    			this.hospital = object.hospital
    			this.specializes = object.specializes
    			this.briefIntroduction = object.briefIntroduction
    			this.avatar = object.avatar

    		}
    	},


    	ready(){
    		!!this.doctId && this.doctorView(`doctId=${this.doctId}`)
    	}
	}
</script>