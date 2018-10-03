<template>
    <div class="container-fluid mid">
        <div id="search" class="title">
            <!--
            <input type="text" value="" placeholder="请输入标题" />
            <div class="myBtn" >搜索</div>
            -->
        </div>

        <div class="widget-box" style="margin-top:0px;">
            <table class="table table-bordered table-striped  with-check" id="DataTables_Table_0">
                <thead>
                    <tr>
                        <th></th>
                        <th>序号</th>
                        <th>类别名称</th>
                        <th>音乐数量</th>
                        <th>历史播放</th>
                        <th>今日播放</th>
                        <th>背景图</th>
                        <th>类别描述</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of musicClassDTOs">
                        <td></td>
                        <td>{{ item.mcId }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.songCount }}</td>
                        <td>{{ item.historyPlayCount }}</td>
                        <td>{{ item.todayPlayCount }}</td>
                        <td><img :src="imgPre + '/'+ item.backgroundImageAbs" /></td>
                        <td :title="item.description">{{item.description.substr(0,10)}}</td>
                        <td>
                            <a href="javascript:;" @click="editFn(item.backgroundImage, item.backgroundImageAbs, item.description, item.mcId, item.name )">编辑</a>
                            <a href="javascript:;" @click="deleteClass(item.mcId)">删除</a>
                            <a href="javascript:;" v-if="item.isEnable" @click="enableFn(item.mcId)">启用</a>
                            <a href="javascript:;" v-else @click="disableFn(item.mcId)">禁用</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="test" class="myPagenav">
            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
        </div>
        <div class="myBtn myBtnRight btn-warning" @click="addFn()">新增类别</div>
    </div>



<div class="modal-backdrop in" v-if="add"></div>
<div id="forbid" class="modal" v-if="add">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>新增</h3>
    </div>
    <div class="modal-body form-horizontal">
        <div class="control-group">
            <label class="control-label">类别名称</label>
            <div class="controls">
                <input type="text" name="source" id="source" placeholder="请输入类别名称" v-model="name">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label">音乐类别</label>
            <div class="controls">
                <textarea type="text"  style="width:360px; height:90px;" placeholder="请输入该音乐类别的描述，50字以内" v-model="description" >{{ description }}</textarea>
            </div>
        </div>
        <div class="control-group ">
            <label class="control-label">图片上传</label>
            <div class="clearfix controls ">
                <qiniu event-Name="backgroundImage" :defaultimg="backgroundImage"></qiniu>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <a data-dismiss="modal" class="btn "  href="javascript:;" @click="close()" >取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configClass()">确定</a>
    </div>
</div>


<div class="modal-backdrop in" v-if="delete"></div>
<div id="forbid" class="modal" v-if="delete">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>删除</h3>
    </div>
    <div class="modal-body">
        你确定删除该音乐类别(<strong>删除类别前提保证该类别无音乐！</strong>)
    </div>
    <div class="modal-footer">
        <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDisable()">确定</a>
    </div>
</div>

<div class="modal-backdrop in" v-if="enableMusic"></div>
<div id="forbid" class="modal" v-if="enableMusic">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>启用</h3>
    </div>
    <div class="modal-body">
        你确定启用该类别音乐？
    </div>
    <div class="modal-footer">
        <a data-dismiss="modal" class="btn " href="#" @click="enableMusic = false ">取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="#" @click="setState(0)">确定</a>
    </div>
</div>


<div class="modal-backdrop in" v-if="disableMusic"></div>
<div id="forbid" class="modal" v-if="disableMusic">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>禁用</h3>
    </div>
    <div class="modal-body">
        你确定禁用该类别音乐？
    </div>
    <div class="modal-footer">
        <a data-dismiss="modal" class="btn " href="#" @click="disableMusic = false ">取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="#" @click="setState(1)">确定</a>
    </div>
</div>



</template>
<script>
    import { obtainMusicClasses, deleteMusicClass, createMusicClass, modifyMusicClass, enableMusicClass } from  "../../api"

    import { serialize } from "../../utils"

    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import qiniu from "../../qiniu.vue"

    export default {
        // props:['imgPre'],
        data(){
            return {
                imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
                backgroundImage:"",
                filePath:"",
                name:"",
                description:"",
                type:"",

                add:false,
                delete:false,

                mcId:"",
                musicClassDTOs:[],

                page: 1,        //pagepageSize: 10 //pageSize,  default is 10   左分页
                total: 10,  //total item count
                maxLink: 10,    //how many links to show, must not less than 5,  default is 5

                enableMusic:false,
                disableMusic:false
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
            pageHandler(page) {
                this.page = page
                this.getData()
            },
            createUrl(unit) {
                return unit.page > 1?'#page=' + unit.page:'#'
            },

            enableFn(mcId) {
                this.mcId = mcId
                this.enableMusic = true
            },

            disableFn(mcId) {
                this.mcId = mcId
                this.disableMusic = true
            },
            photoIdentityCardDealtFun(e){
                let self = this

                this.file = e.target.files[0]
                fileImage(this.file,(data)=>{
                    let dataImg = data.files[0]

                    this.filePath = dataImg.filePath
                    this.backgroundImage = dataImg.fileRelPath
                })
            },

            close(){
                this.delete = false
                this.add = false
            },

            addFn(){
                this.type = 'add'
                this.add = true

                this.filePath = ""
                this.description = ""
                this.name = ""

            },

            editFn(backgroundImage, filePath, description, mcId, name ){
                this.backgroundImage = backgroundImage
                this.filePath = filePath
                this.description = description
                this.mcId = mcId
                this.name = name

                this.type = 'edit'
                this.add = true
            },


            deleteClass(mcId){
                this.delete = true
                this.mcId = mcId
            },

            configDisable(){
                this.deleteMusicClass()
            },

            configClass(){
                this.type === 'add' ? this.createMusicClass() : this.modifyMusicClass()
            },

            async setState(state) {
                let data = await enableMusicClass(`mcId=${this.mcId}&isEnable=${state}`)
                data.code === 0 &&  this.obtainMusicClasses()

                state ? (this.disableMusic = false ) : ( this.enableMusic = false  )
            },


            async modifyMusicClass(params = `backgroundImage=${this.backgroundImage}&description=${this.description}&mcId=${this.mcId}&name=${this.name}`){
                let data = await modifyMusicClass(params)

                if(data.code === 0){
                    this.obtainMusicClasses()
                }
                this.add = false
            },

            async obtainMusicClasses(params = `pageIndex=${this.page}&pageSize=${this.maxLink}`){
                let data = await obtainMusicClasses(params)

                if(data.code === 0){
                    this.musicClassDTOs = data.musicClassDTOs
                    this.total = data.count
                }

            },

            async deleteMusicClass(){
                let data = await deleteMusicClass(`mcId=${this.mcId}`)

                if(data.code === 0 ) {
                    this.obtainMusicClasses()
                }else if(data.code === 1401) {
                    alert('当前类别下还有音乐，不可删除，请删除类别下的音乐！')
                }
                this.delete = false
            },

            async createMusicClass(){
                let data = await createMusicClass(`backgroundImage=${this.backgroundImage}&description=${this.description}&name=${this.name}`)

                if(data.code === 0){
                    this.obtainMusicClasses()
                }
                this.add = false
            }
        },
        ready(){
            this.obtainMusicClasses()
        }
    }
</script>












































