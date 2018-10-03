<template>
<div class="container-fluid" style="padding-left:40px;">
    <div class="tab-cont">
            <ul class="tagTit">
                <li :class="{ show: !TabState}" @click="switchFn(false)">文章类型</li>
                <li :class="{ show: TabState}" @click="switchFn(true)">原官网</li>
            </ul>
    </div>
    <!-- page1 -->
    <!-- 文章类型 -->
    <div v-if="!TabState" class="container-fluid" style="padding-left:0px;">
        <div class="widget-box w50">
            <div class="widget-title">
                <span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i>
                </span>
                <h5>文章类型管理</h5>
            </div>

            <div class="form-horizontal widget-content">
                <div class="control-group" v-for="item in articleData">
                    <div class="controls testClass">
                        <input type="text" :disabled="true" value="{{item.categoryName}}">
                        <!-- <button class="btn btn-info"  @click="editArticleTypeFn(item.type,$index)">编辑</button>
                        <button class="btn btn-success" @click="sureToChangeType(this,$index)">确定</button> -->
                        <button class="btn btn-info"  @click="changeTypeFn($event,$index,item.categoryId)">编辑</button>
                        
                        <button class="btn btn-danger" @click="delArticleType(item.categoryId)">删除</button>
                    </div>
                </div>
            </div>

            <div class="form-horizontal widget-content">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" v-model="addNewArticleType">
                        <button class="btn btn-success" @click="addNewArticleTypeFn()">添加</button>
                    </div>
                </div>
            </div>

            

        </div>

        <!-- start 编辑文章类型 -->
        <div class="modal-backdrop in" v-if="editArticleType" style="opacity:1">
            <div id="myAlert" class="modal">
                <div class="modal-header">
                    <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                    <h2>编辑</h2>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="control-group bn">
                        <label class="control-label">请修改文章类型</label>
                        <div class="controls">
                           <input type="text" v-model="newArticleType">
                        </div>
                   </div>
                    
                   <button type="button" class="btn btn-default" @click="close()">取消</button>

                   <button style="float:right" type="button" class="btn btn-success" @click="saveNewType()">保存</button> 
               </div>
           </div>
        </div>
        <!-- end 编辑文章类型 -->


    </div>

    <!-- page2 -->
    <!-- 原官网 -->
    <div v-if="TabState" class="container-fluid" style="padding-left:0px;"> 
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
                    <th>类型编号</th>
                    <th>类型名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of data">
                    <td>
                        <div class="checkbox">
                            <input type="checkbox" class="checkboxInp" name="title-table-checkbox" id="title-table-td{{item.typeId}}" :checked="checkState" data-typeId="{{item.typeId}}">
                            <label class="checkboxLabel" for="title-table-td{{item.typeId}}"></label>
                        </div>
                    </td>
                    <td>{{ item.typeId }}</td>
                    <td>{{ item.typeName }}</td>
                    <td>
                        <a href="#editClass"  class="operation editArticle" @click="editFn(item.typeName, item.typeId)">修改</a>
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
                        <label class="control-label">类型名称 :</label>
                        <div class="controls form-horizontal">
                            <input type="text" class="span11" placeholder="请输入类型名称" v-model="typeName" name="typeName">
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
                        <label class="control-label">类型名称 :</label>
                        <div class="controls form-horizontal">
                            <input type="text" class="span11" placeholder="请输入类型名称" value="{{ editTypeName }}" v-model="editTypeName" name="editTypeName">
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

    </div>
    

	
</div>



</template>
<script type="text/javascript">
	import $  from "jquery"
	import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import {getTypeByPage, addType, reTypeName, deleteArticleType,getCategoryList,insertCategory,deleteCategoryById,updateCategory} from "../../api"

    Vue.use(zpagenav)

    export default {
    	data(){
    		return {
                show:false,
                TabState:false,
    			page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 10, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                data:[],
                checkState:false,
                default:'',
                searchVal:'',
                add:'',
                edit:'',
                idelete:'',
                typeName:'',
                editTypeName:'',
                typeId:'',
               	arrayTypeId:[],
               	deleteCont:"请勾选要删除的数据!",
                articleData:[],
                addNewArticleType:"",
                editArticleType:false,
                newArticleType:"",
                categoryId:""
                

    		}
    	},
    	methods:{
            switchFn(state) {
                this.TabState = state
            },
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
            	let params = `pageIndex=${this.page}&pageSize=${this.maxLink}&typeName=${this.searchVal}` 

            	this.getTypeByPage(params)
            },
            addFn(){
            	this.add = true
            },
            editFn(editTypeName,typeId){
            	this.editTypeName = editTypeName
            	this.typeId = typeId
            	this.edit = true

                // this.$route.router.go(editClass)
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
            configAdd(){

            	let params = `typeName=${this.typeName}`

            	this.addType(params)
            },
            configEdit(){
            	let params = `typeId=${this.typeId}&typeNewName=${this.editTypeName}`
            	this.reTypeName(params)
            },
            configDelete(){

            	let params = `typeId=${this.arrayTypeId}`

            	this.deleteArticleType(params)
            },
            close(){
                this.add = false
                this.edit = false
                this.idelete = false
                this.editArticleType = false
            },
            async getTypeByPage(params){
            	let data = await getTypeByPage(params)
            	this.data = data.Alltype
            	this.total = data.totalCount
            },
            async addType(params){

            	let data = await addType(params)

            	if(data.code == 0){
            		this.getTypeByPage(this.default)
            		this.add = false
            	}else{
            		alert(data.error)
            	}
            },
            async reTypeName(params){
            	let data = await reTypeName(params)

            	if(data.code == 0){
            		this.getTypeByPage(this.default)
            		this.edit = false
            	}else{
            		alert(data.error)
            	}	
            },
            async deleteArticleType(params){
            	let data = await deleteArticleType(params)

            	if(data.code == 0){
            		this.getTypeByPage(this.default)
            		this.idelete = false
            	}else{
            		alert(data.error)
            	}
            },
            async getArticleData(){
               
                let data = await getCategoryList()
                if (data.code === 0) {
                    this.articleData = data.Category
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async addNewArticleTypeFn(){
                console.log(this.addNewArticleType)
                //添加新类型到数据库
                if(this.addNewArticleType !== "") {
                    let data = await insertCategory(`categoryName=${this.addNewArticleType}`)
                    if (data.code == 0) {
                        this.getArticleData()
                        this.addNewArticleType = ""

                    } else {
                        alert(`errMsg:${data.msg}`)
                    }
                } else {
                    console.log("请输入内容后再保存！")
                }
                
                // this.articleData.push({type:this.addNewArticleType})
            },
            async delArticleType(id){
                console.log("将要删除的id为：",id)
                //删除此项
                this.categoryId = id
                let data = await deleteCategoryById(`categoryId=${this.categoryId}`)
                if (data.code == 0) {
                    this.getArticleData()

                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            editArticleTypeFn(type,index){
                // this.editArticleType = true
                this.newArticleType = type
                console.log(this.newArticleType)
                console.log("test:",$($(".testClass")[index]).find("input")[0])
                $($(".testClass")[index]).find("input").attr("disabled",false)
            },
            saveNewType(){
                //保存修改
                this.editArticleType = false
                //再次调用数据
            },

            sureToChangeType(_self, index) {
                this.newArticleType = $($(".testClass")[index]).find("input")[0].value
                console.log("确认修改：",this.newArticleType)
                //调用数据库数据添加修改
                $($(".testClass")[index]).find("input").attr("disabled",true)
            },

            async changeTypeFn(e,index,id) {
                console.log(e.target.innerHTML)
                if(e.target.innerHTML == "编辑"){
                    e.target.innerHTML = "保存"
                    $(e.target).removeClass("btn-info")
                    $(e.target).addClass("btn-success")
                    $($(".testClass")[index]).find("input").attr("disabled",false)
                    this.newArticleType = $($(".testClass")[index]).find("input")[0].value
                } else {
                    //点击保存
                    this.newArticleType = $($(".testClass")[index]).find("input")[0].value
                    //调用后台接口更新文章标签
                    this.categoryId = id
                    let data = await updateCategory(`categoryId=${this.categoryId}&categoryName=${this.newArticleType}`)
                    if (data.code == 0) {
                        this.getArticleData()

                    } else {
                        alert(`errMsg:${data.msg}`)
                    }
                    e.target.innerHTML = "编辑"
                    $(e.target).removeClass("btn-success")
                    $(e.target).addClass("btn-info")
                    $($(".testClass")[index]).find("input").attr("disabled",true)
                }
            }
            
    	},
    	watch:{
            page(){
                this.default = `pageIndex=${this.page}&pageSize=${this.maxLink}`
                this.getTypeByPage(this.default)
            }
        },
    	ready(){
    		this.default = `pageIndex=${this.page}&pageSize=${this.maxLink}`
    		this.getTypeByPage(this.default)
            this.getArticleData()
    	}
    }
</script>