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

</template>
<script type="text/javascript">
	import $  from "jquery"
	import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import {getTypeByPage, addType, reTypeName, deleteArticleType} from "../../api"

    Vue.use(zpagenav)

    export default {
    	data(){
    		return {
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
               	deleteCont:"请勾选要删除的数据!"

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
            }
    	},
    	watch:{
            page(){
                this.getTypeByPage(this.default)
            }
        },
    	ready(){
    		this.default = `pageIndex=${this.page}&pageSize=${this.maxLink}`
    		this.getTypeByPage(this.default)
    	}
    }
</script>