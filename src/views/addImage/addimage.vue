<template>

	<div class="container-fluid">
		<div class="widget-box" style="width:70%;">
	        <div class="widget-title"> <span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i> </span>
	            <h5>新增banner图片</h5>
	        </div>
	        <div class="form-horizontal row-fluid widget-content" id="newPsq">
	            <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>问卷id :</label>
	                <div class="controls">
	                    <input type="text" value="{{ testingId }}" class="span11 span4" name="testingId" v-model="testingId" id="id" placeholder="请输入问卷id">
	                </div>
	            </div>
	            <div class="control-group">
	                <label class="control-label"><span class="validateError">*</span>简介 :</label>
	                <div class="controls">
	                    <input type="text" value="{{ descp }}" v-model="descp"class="span11 span4" name="descp" id="descp" placeholder="请输入图片简介">
	                </div>
	            </div>

	            <div class="control-group">
					<label class="control-label">图片</label>
					<div class="controls">
						<qiniu event-Name="imgPath" :defaultimg="imgPath"></qiniu>
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

	import {bannerUpdate, bannerSave, bannerView} from "../../api.js"
	import qiniu from "../../qiniu.vue"

	export default {
		// props:['imgPre'],
	    data(){
	        return {
	            imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
    			cpid:window.location.pathname.split('/')[2],
    			imgPath:'',
    			descp:'',
    			testingId:'',
    			filePath:'',
				btnState:true
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
				this.$log()

    			!!this.cpid ?
    				this.bannerUpdate(`cpid=${this.cpid}&imgPath=${this.imgPath}&descp=${this.descp}&testingId=${this.testingId}`)
    				:
    				this.bannerSave(`imgPath=${this.imgPath}&descp=${this.descp}&testingId=${this.testingId}`)

    		},

    		async bannerUpdate(params){

    			let data =  await bannerUpdate(params)
    			if(data.code==0){
    				// location = "/banner"
    				this.$route.router.go("/banner")
    			}else{
    				alert(data.msg)
    			}
    		},

    		async bannerSave(params){

    			let data =  await bannerSave(params)
    			if(data.code==0){
    				// location = "/banner"
    				this.$route.router.go("/banner")
    			}else{
    				alert(data.msg)
    			}

    		},

    		async bannerView(params){

    			let data =  await bannerView(params)

    			let object = data.obj

    			this.imgPath = object.imgPath
    			this.descp = object.descp
    			this.testingId = object.testingId

    		}
    	},


    	ready(){
    		!!this.cpid && this.bannerView(`cpid=${this.cpid}`)

    	}
	}
</script>