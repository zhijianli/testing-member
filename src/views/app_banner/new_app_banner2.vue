<template>
     <div class="container-fluid" style="width:60%; display:inline-block;margin-right:20px;">
        <div class="row-fluid" >
            <div class="widget-box">
            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                <h5>banner信息</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal">

                <div class="control-group">
                    <label class="control-label"> 标题 :</label>
                    <div class="controls">
                        <input type="text" class="span11" name="bannerTitle" v-model="bannerTitle" placeholder="标题信息">
                    </div>
                </div> 
                <div class="control-group">
                    <label class="control-label"> 类型选择 :</label>
                    <div class="controls">
                        <select v-model="showLocation">
                           <!--  <option value="0">首页</option>
                            <option value="1">找专家</option> -->
                            <!-- <option value="2">心友圈</option> -->
                            <option value="4">广场</option>

                        </select>
                    </div>
                </div> 
                <div class="control-group">
                    <label class="control-label">上传图片</label>
                    <div class="controls">
                        <span>请上传尺寸为750*412px的jpg、png、jpeg格式的图片</span>
                        
                        <qiniu event-Name="picPath" :defaultimg="picPath"></qiniu>
                    </div>
                </div>   

                    <div class="control-group">
                    <label class="control-label"> 序号  :</label>
                        <div class="controls">
                        <input type="number" class="span11" name="sorting" v-model="sorting" placeholder="请输入序号，图片将在前端按序号展示" >
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">链接地址：</label>
                    <div class="controls">
                        <input type="text" class="span11" v-model="outsideLink" name="outsideLink" placeholder="自定义外链地址">
                       <!--  <input type="text" class="span11" readonly placeholder="模块类型" v-if="linkType == 0" value="{{ insideLinkId }}">
                        <button type="submit" class="btn btn-info" @click="openSwitch()">内链接</button>
                        <button type="submit" class="btn btn-info" @click="changeState()">切换链接类型</button> -->
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-success" @click="configInfo()">保存</button>
                </div>

                </div>
            </div>
            </div>
        </div>
    </div>

</template>
<script>

    import {getPsychoByName, getArticleByTitle, getTestingByTitle, addAppBanner, addAppDetails, addAppUpdate} from "../../api"
    import qiniu from "../../qiniu.vue"

    export default {
        data() {
            return {
                bannerId: window.location.pathname.split('/').pop(),
                popupSwitch: false,
                bannerTitle: "",
                linkType: 1, //链接类型: 0 内链，1外链
                insideLinkType:"0", //內链模块类型: 0 砖家，1文章，2测试
                outsideLink: "", //外链链接
                picPath: "",
                filePath: "",
                sorting: "",
                content:"",
                listTesting: [],
                listTitle: [],
                listName: [],
                insideLinkId: [],//內链id
                showLocation:""
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
        methods: {
            openSwitch() {
                this.insideLinkType = "0"
                this.linkType = 0
                this.popupSwitch = true 
                this.insideLinkId = []
            },

 

            popupSearch(){

               this.insideLinkId = [];

               ['getPsychoByName', 'getArticleByTitle', 'getTestingByTitle'].forEach((v,i,array)=>{
                   (i == this.insideLinkType) &&  this[v]()
               })
            },

            changeTab(type) {
                this.insideLinkType = type
            },

            changeLink() {
                if(this.insideLinkId == ""){
                    alert('请选择内链内容')
                    return false
                }

                this.popupSwitch = false
            },

            changeState() {

                if( this.linkType == "0" ) {
                    this.linkType = '1'
                }else if(this.linkType == "1") {
                    this.linkType = '0'
                }
                
            },

            close() {
                this.popupSwitch = false
                this.linkType = 1
            },

            configInfo() {
                if(this.linkType == 1){
                    if(!(/^(http|https):\/\/(.+)/.test(this.outsideLink))) {
                        alert('外链地址不符合规则')
                        return false
                    }
                }
                 
                this.bannerId =  Number(this.bannerId) ? this.bannerId : "" 

                let str = ""

                let params = {
                    bannerId : this.bannerId,
                    bannerTitle : this.bannerTitle,
                    insideLinkId : this.insideLinkId.join(""),
                    insideLinkType:this.insideLinkType,
                    linkType: this.linkType,
                    outsideLink: this.outsideLink,
                    picPath: this.picPath,
                    sorting: this.sorting,
                    showLocation : this.showLocation
                }

                if(!Number(this.bannerId)){
                    delete params.bannerId
                }

                for (let key in params) {
                    str += `${key}=${params[key]}&`
                }

                str = str.slice(0, -1)
                
                console.log(1)
                Number(this.bannerId) ? this.addAppUpdate(str) : this.addAppBanner(str)
            },

            async addAppBanner(params) { 
                let data = await addAppBanner(params)

                data.code === 0 && this.$route.router.go("/app_banner")
                data.code === -1 && (alert(data.msg))
            },

            async addAppUpdate(params) {
                let data = await addAppUpdate(params)

                data.code === 0 && this.$route.router.go("/app_banner")
                data.code === -1 && (alert(data.msg))
            }, 

            async getPsychoByName() {
                let data = await getPsychoByName(`name=${this.content.trim()}`)

                if( (data.code === 0) && (data.list.length > 0 )) {
                    this.listName = data.list
                }else{
                    this.listName = []
                    alert('出错或未查到数据')
                }
                
            },

            async getArticleByTitle() {
                let data = await getArticleByTitle(`title=${this.content.trim()}`)

                if( (data.code === 0) && (data.list.length > 0 )) {
                    this.listTitle = data.list
                }else{
                    this.listTitle = []
                    alert('出错或未查到数据')
                }
            },

            async getTestingByTitle() {
                let data = await getTestingByTitle(`title=${this.content.trim()}`)

                if( (data.code === 0) && (data.list.length > 0 )) {
                    this.listTesting = data.list
                }else{
                    this.listTesting = []
                    alert('出错或未查到数据')
                }
            },

            async addAppDetails() {
                let data = await addAppDetails(`bannerId=${this.bannerId}`)

                if(data.code === 0) {
                    let obj = data.obj

                    this.bannerTitle = obj.bannerTitle
                    this.filePath = obj.filePath
                    this.picPath = obj.picPath
                    this.insideLinkId = [obj.insideLinkId]
                    this.insideLinkType = obj.insideLinkType
                    this.linkType = obj.linkType
                    this.outsideLink = obj.outsideLink
                    this.sorting = obj.sorting
                    this.showLocation = obj.showLocation

                }
            }

        },
        ready(){
            if(Number(this.bannerId)){
                this.addAppDetails()
            }
        }
    }
    
</script>