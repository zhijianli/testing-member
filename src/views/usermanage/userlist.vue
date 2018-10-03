<template>

	<div class="container-fluid">
		<div id="search">
            <input type="text" name="conditions" placeholder="请输入模糊查询字段" v-model="conditions" >
            <button type="submit" class="tip-bottom" data-original-title="搜索" @click="seach()"><i class="icon-search icon-white"></i></button>
        </div>

        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
                <tr>
                    <th>
                    	<div class="checkbox">
                    		<input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox">
                        	<label for="title-table-th" class="checkboxLabel"></label>
                    	</div>
                    </th>
                    <th>序号</th>
                    <th>账号</th>
                    <th>部门</th>
                    <th>实名</th>
                    <th>创建时间</th>
                    <th>权限</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
            	<tr v-for="item in data">
				    <td>
				    	<div class="checkbox">
                    		<input type="checkbox" id="title-table-td{{item.userId}}" class="checkboxInp" name="title-table-checkbox">
				        	<label for="title-table-td{{item.userId}}" class="checkboxLabel"></label>
                    	</div>

				    </td>
				    <td>{{ item.userId }}</td>
				    <td>{{ item.mobilePhone}}</td>
				    <td>{{ item.dptName }}</td>
				    <td>{{ item.showName }}</td>
				    <td>{{ item.createTime }}</td>
				    <td>{{ item.privilegesMenuList }}</td>

                    <th v-if="item.isEnable">禁用</th>
                    <th v-else>启用</th>
				    <td>
				    	<a href="javascript:;" class="btn btn-info" @click="butReset(item.userId)">重置</a>
				        <a href="javascript:;" class="btn btn-success" @click="butEdit(item.dptId, item.mobilePhone, item.showName, item.userId)">修改</a>
				        <a href="javascript:;" class="btn btn-primary" @click="ButEnableState(0, item.userId)" v-if="item.isEnable">启用</a>
                        <a href="javascript:;" class="btn btn-danger" @click="ButDisableStage(1, item.userId)" v-else>禁用</a>
				        <a href="javascript:;" @click="route(item.userId)" class="btn btn-warning">设置权限</a>
                        <a href="javascript:;" class="btn btn-danger" @click="deleteUserFn(item.userId)">删除</a>
                    </td>
				</tr>
			</tbody>
		</table>
        <div class='bottom' style="display:fix">
            <div id="test">
                <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl" v-if="total>10"><zpagenav>
            </div>
            <a class="btn btn-warning" href="javascript:;" @click="butAdd()">新增</a>
        </div>

	</div>


<!--
弹窗样式隐藏为 hide
遮罩 in为显示
 -->

<!-- start 重置密码 -->
<div class="modal-backdrop in" v-if="reset"></div>
<div id="myAlert" class="modal" v-if="reset">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>重置</h3>
    </div>
    <div class="modal-body">
        <p>您确定重置{{ user }}用户密码,重置后新密码为123456？</p>
    </div>
    <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a> <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="butConfigReset()">确定</a> </div>
</div>
<!-- end 重置密码 -->

<!-- start 状态启用 -->
<div class="modal-backdrop in" v-if="enableState"></div>
<div id="myAlert" class="modal" v-if="enableState">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3></h3>
    </div>
    <div class="modal-body">
        <p>您确定启用{{ user }}用户状态？</p>
    </div>
    <div class="modal-footer">
        <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="btnSwitchState(0)">确定</a> </div>
</div>
<!-- end 状态启用 -->


<!-- start 状态禁用 -->
<div class="modal-backdrop in" v-if="disableStage"></div>
<div id="myAlert" class="modal" v-if="disableStage">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3></h3>
    </div>
    <div class="modal-body">
        <p>您确定禁用{{ user }}用户状态？</p>
    </div>
    <div class="modal-footer">
        <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="btnSwitchState(1)">确定</a> </div>
</div>
<!-- end 状态禁用 -->

<!-- start 删除用户 -->
<div class="modal-backdrop in" v-if="isDeleteState"></div>
<div id="myAlert" class="modal" v-if="isDeleteState">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3></h3>
    </div>
    <div class="modal-body">
        <p>确定删除吗？</p>
    </div>
    <div class="modal-footer">
        <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="sureToDeleteFn">确定</a>
    </div>
</div>
<!-- end 删除用户 -->

<!-- start 修改信息 -->
<div class="modal-backdrop in" v-if="edit"></div>
<div id="myAlert" class="modal" v-if="edit">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>修改</h3>
    </div>
    <div class="modal-body form-horizontal">
        <div class="control-group bn">
            <label class="control-label">账号 :</label>
            <div class="controls">
               <input type="text" name="editUser" value="{{ editUser }}" v-model="editUser" >
            </div>
        </div>
        <div class="control-group bn">
            <label class="control-label">部门 :</label>
            <div class="controls">
                <select class="selectPopup" name="eidtdptId" value="{{ eidtdptId }}" v-model="eidtdptId" >
                    <option v-for="item of select" value="{{ item.dptId }}">
                        {{ item.depName }}
                    </option>
                </select>
            </div>
        </div>
        <div class="control-group bn">
            <label class="control-label">实名 :</label>
            <div class="controls">
                <input type="text" name="editname" v-model="editname">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="butConfigEdit()">确定</a> </div>
</div>
<!-- end 修改信息 -->



<!-- start 新增信息 -->
<div class="modal-backdrop in" v-if="add"></div>
<div id="myAlert" class="modal" v-if="add">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>新增用户</h3>
    </div>
    <div class="modal-body form-horizontal">
        <div class="control-group bn">
            <label class="control-label">账号 :</label>
            <div class="controls">
               <input type="text" name="addUser" value="" autocomplete="off" v-model="addUser" placeholder="请输入手机号码">
            </div>
        </div>
        <div class="control-group bn">
            <label class="control-label">密码 :</label>
            <div class="controls">
               <input type="password" name="addpass" value="" autocomplete="off" v-model="addpass" placeholder="请输入密码">
            </div>
        </div>
        <div class="control-group bn">
            <label class="control-label">实名 :</label>
            <div class="controls">
                <input type="text" name="addname" value="" autocomplete="off" v-model="addname" placeholder="请输入姓名">
            </div>
        </div>
        <div class="control-group bn">
            <label class="control-label">部门 :</label>
            <div class="controls">
                <select class="selectPopup" v-model="adddptId" name="adddptId">
                    <option v-for="item of select" value="{{ item.dptId }}">
                        {{ item.depName }}
                    </option>
                </select>
            </div>
        </div>

    </div>
    <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a> <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="ButaddUser()">新增</a> </div>
</div>
<!-- end 新增信息 -->



</template>
<script type="text/javascript">
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import {getlistUser, addListUser, editListUser, resetPass, switchState, listDepartment,getResponses} from "../../api"
    import serialize  from "../../utils"

    Vue.use(zpagenav)

    export default {
        data() {
            return {
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                reset:false, //重置弹窗切换
                edit :false, //修改弹窗切换
                enableState:false,
                disableStage:false,
                add:false,
                user:'',
                conditions:'',
                data:[],
                addUser:'',
                addpass:'',
                addname:'',
                adddptId:'',
                editUser:'',
                userId:'',
                editname:'',
                eidtdptId:'',
                state:'',
                select:[],
            //    新增删除功能
                isDeleteState: false,

                deleteUserId: '',
            }
        },
        methods: {
            pageHandler(page) {
              //here you can do custom state update
              this.page = page
            },
            createUrl(unit) {
              return unit.page > 1?'#page=' + unit.page:'#'
            },

            route(id){
                this.$route.router.go(`/usermanage/${id}`)
            },

            butReset(userId){

                this.reset = true
                this.userId = userId

            },
            butConfigReset(){

                let params = `userId=${this.userId}`


                this.resetPass(params)
            },

            ButDisableStage(state,userId){

                this.disableStage = true  //禁用

                this.userId = userId

            },


            ButEnableState(state,userId){
                this.enableState = true //启用
                this.userId = userId
            },


            btnSwitchState(state){

                this.state = state

                let params = `ids=${this.userId}&isDel=${this.state}`


                this.switchState(params)
            },

            butAdd(){
                this.add = true
            },
            butEdit(dptId, mobilePhone, showName, userId){
                this.edit = true
                this.eidtdptId = dptId
                this.editUser = mobilePhone
                this.editname = showName
                this.userId = userId
            },

            butConfigEdit(){

                let paramsObj = `mobilePhone=${this.editUser}&userId=${this.userId}&dptId=${this.eidtdptId}&showName=${this.editname}`

                this.editListUser(paramsObj)

            },

            close(){
                this.reset = false
                this.edit = false
                this.enableState = false
                this.disableStage = false
                this.add = false

            //    删除用户功能
                this.isDeleteState = false
            },
            ButaddUser(){

                let paramsObj = `mobilePhone=${this.addUser}&userPsw=${this.addpass}&dptId=${this.adddptId}&showName=${this.addname}`

                this.addListUser(paramsObj)

            },
            seach(){
                this.getlistUser()
            },
            async getlistUser(){

                let params = `pageIndex=${this.page}&pageSize=${this.maxLink}&searchKeyWords=${this.conditions}`

                let data = await getlistUser(params)
                this.data = data.list
                this.total = data.count
            },
            async addListUser(params){

                let data =  await addListUser(params)

                this.add = false

               if(data.code == 0){
                    this.getlistUser()
                }else{
                    alert(data.error)
                }
            },
            async resetPass(params){
                let data =  await resetPass(params)
                this.reset = false

                if(data.code == 0){
                    this.getlistUser()
                }else{
                    alert(data.error)
                }

            },
            async editListUser(params){
                let data =  await editListUser(params)
                this.edit = false

                if(data.code == 0){
                    this.getlistUser()
                }else{
                    alert(data.error)
                }
            },
            async switchState(params){

                let data =  await switchState(params)

                this.enableState = false
                this.disableStage = false


                if(data.code == 0){
                    this.getlistUser()
                }else{
                    alert(data.error)
                }
            },
            async listDepartment(){
                let data  = await listDepartment()
                this.select = data.list

            },

            async sureToDeleteFn() {
            //    调用删除命令
                console.log(this.deleteUserId)

                let data = await getResponses('depression/system/deleteUser.json', `userId=${this.deleteUserId}`)

                if (data.code === 0) {

                    this.isDeleteState = false

                    this.page = 1
                    this.getlistUser()
                } else {
                    alert(data.msg)
                }
            },
            deleteUserFn(id) {
                console.log(id)
                this.isDeleteState = true

                this.deleteUserId = id
            }
        },
        watch:{
            page(){
                this.getlistUser()
            }
        },
        ready(){
             this.getlistUser()
             this.listDepartment()
        }
    }

</script>
