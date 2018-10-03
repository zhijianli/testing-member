<template>
<div class="container-fluid">
	<div id="search">
        <input type="text" placeholder="请输入类型名称..." v-model="searchVal" name="searchVal">
        <button type="submit" class="tip-bottom" data-original-title="搜索" @click="search()"><i class="icon-search icon-white"></i></button>
    </div>
    <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
        <thead>
            <tr>
                <th>
                    <div class="checkbox">
                		<input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox" @click="changeFn" >
                    	<label for="title-table-th" class="checkboxLabel"></label>
                	</div>
                </th>
                <th>类型名称</th>
                <th>类别名称</th>
                <th>图标</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
			<tr v-for="item of data">
			    <td>
			        <div class="checkbox">
                		<input type="checkbox" class="checkboxInp" name="title-table-checkbox" id="title-table-td{{item.categoryId}}" :checked="checkState" data-typeId="{{item.categoryId}}">
			        	<label class="checkboxLabel" for="title-table-td{{item.categoryId}}"></label>
                	</div>
			    </td>
			    <td>{{ item.typeName }}</td>
			    <td>{{ item.categoryName }}</td>
                <td class="span1 pre">
                    <img :src="imgPre + '/'+item.filePath">
                </td>
			    <td>
                    <a href="#" class="operation editArticle" @click="editFn(item.categoryId,item.categoryName, item.parentCategoryId, item.thumbnail, item.filePath, item.typeId)">修改</a>
			    </td>
			</tr>
		</tbody>
    </table>

    <div class='bottom'>
        <div id="test">
            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
        </div>
        <div>
        	<a class="btn btn-warning" href="javascript:;" @click="addFn()">新增</a>
        	<a class="btn btn-danger allDelte" href="javascript:;" @click="deleteFn()">删除</a>
        </div>

    </div>
</div>

<!-- 新增 -->
<div class="modal-backdrop in" v-if="add"></div>
<div id="addClass" class="modal" v-if="add">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>新增</h3>
    </div>
    <div class="modal-body row-fluid">
        <form action="#" method="get" class="form-horizontal">
            <div class="control-group">
                <label class="control-label">类型选择:</label>
                <div class="controls form-horizontal clearfix">
                    <div style="float:left; margin-right:20px">
                        <select name="addTypeId" id="select"  v-model="addTypeId" value="{{ addTypeId }}">
                            <option v-for="item of select" value="{{ item.typeId }}">{{ item.typeName}}</option>
                        </select>
                    </div>
                    <div style="float:left;">
                        <select name="addLevel1TypeId" v-model="addLevel1TypeId" value="{{ addLevel1TypeId }}" >
                            <option v-for="item of Level1Select" value="{{ item.categoryId }} ">{{ item.categoryName }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">类别名称 :</label>
                <div class="controls form-horizontal">
                    <input type="addCategoryName" class="model-input" value="" placeholder="请输入类别名称" v-model="addCategoryName">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">图片上传 :</label>
                <div class="controls form-horizontal">

                    <qiniu event-Name="addFileRelPath" :defaultimg="addFileRelPath"></qiniu>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
    	<a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
    	<a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configAdd()">确定</a>
    </div>
</div>
<!-- 修改 -->
<div class="modal-backdrop in" v-if="edit"></div>
<div id="editClass" class="modal" v-if="edit">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>修改</h3>
    </div>
    <div class="modal-body row-fluid">
        <form action="#" method="get" class="form-horizontal">
            <div class="control-group">
                <label class="control-label">类型选择:</label>
                <div class="controls form-horizontal clearfix">
                    <div style="float:left; margin-right:20px">
                        <select disabled="disabled" name="editTypeId" id="select"  v-model="editTypeId" value="{{ editTypeId }}">
                            <option v-for="item of select" value="{{ item.typeId }}">{{ item.typeName}}</option>
                        </select>
                    </div>
                    <div style="float:left;">
                        <select disabled="disabled" name="editParentCategoryId" v-model="editParentCategoryId" value="{{ editParentCategoryId }}"  v-if=" editParentCategoryId != 0">
                            <option v-for="item of Level1Select" value="{{ item.categoryId }} ">{{ item.categoryName }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">类别名称 :</label>
                <div class="controls form-horizontal">
                    <input type="text" class="span11" id="editCategoryName" placeholder="请输入类别名称" v-model="editCategoryName" value="{{ editCategoryName }}">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">上传图片 :</label>
                <div class="controls  form-horizontal">
                    <qiniu event-Name="editThumbnail" :defaultimg="editThumbnail"></qiniu>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
    	<a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
    	<a data-dismiss="modal" class="btn btn-danger" href="#" @click="configEdit()">确定</a>
    </div>
</div>
<!-- 删除 -->
<div class="modal-backdrop in" v-if="idelete"></div>
<div id="myAlert" class="modal" v-if="idelete">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>删除</h3>
    </div>
    <div class="modal-body">
        <p>{{ deleteCont }}</p>
    </div>
    <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#"  @click="close()">取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDelete()">确定</a> </div>
</div>

</template>
<script type="text/javascript">
	import $  from "jquery"
	import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import {getCategoryByPage, getAllType, getCategoryLevel1ByType, addSubCategory, deleteSubCategory, updateSubCategory} from "../../api"
    import qiniu from "../../qiniu.vue"

    Vue.use(zpagenav)

    export default {
        // props:['imgPre'],
    	data(){
    		return {
                imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
    			page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 10, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                data:[],
                checkState:false,
                searchVal:'',
                add:'',
                idelete:'',
                select:[],
                addTypeId:'',
                addLevel1TypeId:'',
                addCategoryName:'',
                Level1Select:[],
                addFilePath:'',
                addFileRelPath:'',
                deleteCont:"请勾选要删除的数据!",
                arrayTypeId:[],
                edit:'',
                editCategoryId:'',
                editCategoryName:'',
                editParentCategoryId:0,
                editThumbnail:'',
                editFilePath:'',
                editTypeId:"",


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
              //here you can do custom state update
              this.page = page
            },

            createUrl(unit) {
              return unit.page > 1?'#page=' + unit.page:'#'
            },

            changeFn(e){
            	this.checkState = e.target.checked
            },

            search(){
            	let params = `pageIndex=${this.page}&pageSize=${this.maxLink}&categoryName=${this.searchVal}`

            	this.getCategoryByPage(params)
            },

            addFn(){
            	this.add = true
                this.addFilePath = ""
            },
            editFn(categoryId, categoryName, parentCategoryId, thumbnail, filePath,editTypeId){

                this.editCategoryId = categoryId
                this.editCategoryName = categoryName
                this.editParentCategoryId = parentCategoryId
                this.editThumbnail = thumbnail
                this.editFilePath = filePath
                this.editTypeId = editTypeId
                this.edit = true
            },

            deleteFn(){
                let self = this
                this.idelete  = true
                $('table tbody input:checked').each( function(){
                    self.arrayTypeId.push($(this).attr('data-typeid'))
                })


                if(self.arrayTypeId.length > 0){
                    this.deleteCont = "您确定删除吗?"
                }
            },
            configDelete(){

                let params = `categoryId=${this.arrayTypeId}`

                this.deleteSubCategory(params)
            },

            configAdd(){
                let paramsObj = {
                    'categoryName' : this.addCategoryName,
                    'typeId':this.addTypeId,
                    'parentCategoryId': ( this.addLevel1TypeId ? this.addLevel1TypeId : 0 ) ,
                    'thumbnail':this.addFileRelPath
                }

                let params = this.serialize(paramsObj)

                this.addSubCategory(params)
            },

            configEdit(){
                let paramsObj = {
                    categoryName: this.editCategoryName,
                    parentCategoryId: ( this.editParentCategoryId ? this.editParentCategoryId : 0 ),
                    typeId: this.editTypeId,
                    thumbnail: this.editThumbnail,
                    categoryId:this.editCategoryId
                }

                let params = this.serialize(paramsObj)

                this.updateSubCategory(params)
            },
            close(){
                this.add = false
                this.idelete = false
                this.edit = false

            },

            serialize(obj){

                let str = ""
                for (let key in obj) {
                    str += `${key}=${obj[key]}&`
                }
                str = str.slice(0, -1)
                return str

            },
            EditUploadFn(e){
                let self = this
                this.file = e.target.files[0]
                fileImage(this.file,(data)=>{
                    let dataImg = data.files[0]
                        this.editFilePath = dataImg.filePath
                        this.editThumbnail = dataImg.fileRelPath
                })
            },
            addUploadFn(e){
                let self = this
                this.file = e.target.files[0]
                fileImage(this.file,(data)=>{
                    let dataImg = data.files[0]
                        this.addFilePath = dataImg.filePath
                        this.addFileRelPath = dataImg.fileRelPath
                })
            },

            async getAllType(){
                let data = await getAllType()
                this.select  = data.Alltype
            },

            async getCategoryByPage(params = `pageIndex=${this.page}&pageSize=${this.maxLink}`){
                let data = await getCategoryByPage(params)
                this.data = data.Category
                this.total = data.totalCount
            },

            async getCategoryLevel1ByType(params){
                let data = await getCategoryLevel1ByType(params)
                this.Level1Select = data.Category
            },
            async addSubCategory(params){
                let data = await addSubCategory(params)
                if(data.code == 0){
                    this.getCategoryByPage()
                    this.add = false
                }else{
                    alert(data.error)
                }
            },
            async deleteSubCategory(params){
                let data = await deleteSubCategory(params)
                if(data.code == 0){
                    this.page = 1
                    this.getCategoryByPage()
                    this.idelete = false
                    this.arrayTypeId = []
                }else{
                    alert(data.error)
                }
            },
            async updateSubCategory(params){
                let data = await updateSubCategory(params)
                if(data.code == 0){
                    this.page = 1
                    this.getCategoryByPage()
                    this.edit = false
                }else{
                    alert(data.error)
                }
            }

    	},
    	watch:{
            page(){
                this.getCategoryByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}`)
            },
            addTypeId(){
                this.getCategoryLevel1ByType(`typeId=${this.addTypeId}`)
            },
            editTypeId(){
                this.getCategoryLevel1ByType(`typeId=${this.editTypeId}`)
            }
        },
    	ready(){
    		this.default = `pageIndex=${this.page}&pageSize=${this.maxLink}`
    		this.getCategoryByPage(this.default)
            this.getAllType()

    	}
    }
</script>