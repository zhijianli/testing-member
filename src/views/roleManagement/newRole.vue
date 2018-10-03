<style scoped>
    .checkboxLabel.active:after{
        background-color: #57ad68;
        content: " ";
        display: inline-block;
        height: 10px;
        margin: 2px;
        width: 10px;
    }
</style>
<template>
    <div class="container-fluid">
        <div class="widget-box row-fluid">
            <div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>
                <h5 class="newTitle">新增角色</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <div style="font-size: 16px">基本信息</div>

                    <div class="control-group">
                        <label class="control-label">上级角色</label>

                        <div class="controls">
                            <input type="text" v-model="parentRoleName" disabled v-if="roleId">
                            <select v-model="parentRoleId" style="width: 186px" @change="getMenu()" v-if="!roleId">
                                <option :value="item.roleId" v-text="item.roleName"
                                        v-for="item in roleList"></option>
                            </select>

                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">角色名称</label>
                        <div class="controls">
                            <input type="text" name="roleName" v-model="roleName" maxlength="25"
                                   value="{{ roleName }}">
                        </div>
                    </div>
                    <div style="font-size: 16px">绑定角色</div>

                    <ul class="power" style="margin-left: 80px">
                        <li :class="{'show': switchTab === 0 }" @click="switchFn(0)">操作权限</li>
                        <li :class="{'show': switchTab === 1 }" @click="switchFn(1)">数据权限</li>
                    </ul>

                    <div v-if="switchTab === 0" style="margin-left: 80px">
                        <ul style="cursor: pointer">
                            <li v-for="item in menusAndPermissions" @click="toggle(item)" style="margin-bottom: 5px" v-if="item.show">
                                <div class="checkboxLabel" :class="{active:item.selected}" @click.stop="checkbox(item)"></div>
                                <i style="width: 10px;height: 10px;background: #666;border-radius: 50%;display: inline-block" v-if="item.childMenus.length>0"></i>
                                {{item.menuName}}
                                <ul style="margin-left: 40px" :style="{ display :  item.toggle? 'block' : 'none' }">
                                    <li v-for="i in item.childMenus" @click.stop="toggle(i)" style="margin-bottom: 5px" v-if="i.show">
                                        <div class="checkboxLabel" :class="{active:i.selected}" @click.stop="checkbox(i)"></div>
                                        <i style="width: 10px;height: 10px;background: #666;border-radius: 50%;display: inline-block" v-if="i.childChildMenus.length>0||i.permission.length>0"></i>

                                        {{i.menuName}}
                                        <ul style="margin-left: 40px" :style="{ display :  i.toggle? 'block' : 'none' }">
                                            <li v-for="x in i.childChildMenus" @click.stop="toggle(x)" style="margin-bottom: 5px" v-if="x.show">
                                                <div class="checkboxLabel" :class="{active:x.selected}" @click.stop="checkbox(x)"></div>
                                                <i style="width: 10px;height: 10px;background: #666;border-radius: 50%;display: inline-block" v-if="x.permission.length>0"></i>
                                                {{x.menuName}}
                                                <ul style="margin-left: 40px" :style="{ display :  x.toggle? 'block' : 'none' }">
                                                    <li v-for="y in x.permission" @click.stop="toggle(y)" style="margin-bottom: 5px" v-if="y.show">
                                                        <div class="checkboxLabel" :class="{active:y.selected}" @click.stop="checkbox(y)"></div>
                                                        {{y.permissionName}}
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <ul style="margin-left: 40px" :style="{ display :  i.toggle? 'block' : 'none' }">
                                            <li v-for="x in i.permission" @click.stop="toggle(x)" style="margin-bottom: 5px" v-if="x.show">
                                                <div class="checkboxLabel" :class="{active:x.selected}" @click.stop="checkbox(x)"></div>
                                                {{x.permissionName}}
                                            </li>
                                        </ul>

                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div v-if="switchTab === 1" style="margin-left: 80px">
                        <ul style="cursor: pointer">
                            <li v-for="item in data" @click="toggle(item)" style="margin-bottom: 5px">
                                <div class="checkboxLabel" :class="{active:item.selected}" @click.stop="checkbox(item)"></div>
                                {{item.name}}
                            </li>
                            <li v-for="item in statement" @click="toggle(item)" style="margin-bottom: 5px">
                                <div class="checkboxLabel" :class="{active:item.selected}" @click.stop="checkbox(item)"></div>
                                {{item.name}}
                            </li>
                        </ul>
                    </div>

                    <div class="form-actions" style="overflow:hidden;">
                        <!--<label class="control-label"></label>-->

                        <div class="clearfix controls" style="width:58%;">
                            <!--<button class="btn btn-danger" v-if="!!this.articleId" @click="deleteEditingArticle()">删除</button>-->
                            <input type="button" style="float:left;margin-right:120px;" value="提交" id="ajaxBut"
                                   class="btn btn-success" @click="configBtn()">
                            <!--<input type="button" style="float:right;margin-right:120px;" value="转给同事" id="ajaxBut"-->
                            <!--class="btn btn-success" @click="configBtn()">-->
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 删除 -->
    <!--<div class="modal-backdrop in" v-if="idelete"></div>-->
    <!--<div id="myAlert" class="modal" v-if="idelete">-->
    <!--<div class="modal-header">-->
    <!--<button data-dismiss="modal" class="close" type="button" @click="close()">×</button>-->
    <!--<h3>删除</h3>-->
    <!--</div>-->
    <!--<div class="modal-body" >-->
    <!--<p>确定删除此文章吗？</p>-->
    <!--</div>-->
    <!--<div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDelete()">确定</a> </div>-->
    <!--</div>-->

</template>
<script type="text/javascript">
    import Vue from "vue"
    import qiniu from "../../qiniu.vue"


    import {getSource, getSources, getJson, getCourse} from "../../api"

    export default {
        components: {
            qiniu
        },

        events: {
            'imgParameter': function (obj, eventName) {
                this[eventName] = obj[eventName].imgPath
            }
        },

        data() {
            return {
                roleId: this.$route.query.id,

                tscList: {
                    consultingTypeIdconsultingTypeId: '',
                    customerName: '',

                },
                criteria: {},
                roleList: [],
                parentRoleId: null,
                roleName:'',
                switchTab: 0,
                menusAndPermissions: [],
                data:[],
                statement:[],
                parentRoleName:'',
            }
        },
        computed: {
            inpNum: {
                get: function () {
                    return this.tscList.customerBirthday;

                },
                set: function (newValue) {
                    this.tscList.customerBirthday = newValue.replace(/[^\d]/g, '');
                }
            }
        },
        methods: {
            aa(n) {
                this.displayMode = n;
            },
            switchFn(id) {
                this.switchTab = id
            },
            checkbox(item){
              if(item.selected){
                  item.selected=false;
              }else{
                  item.selected=true;
              }
            },
            toggle(item){
                if(item.toggle){
                    item.toggle=false;
                }else{
                    item.toggle=true;
                }
            },
            configBtn() {
                console.log(1)
                let object = {};
                if (this.parentRoleId===null) {
                    alert("请您选择上级角色！")
                } else if (!this.roleName) {
                    alert("请您填写角色名称！")
                } else {
                    object.dpIdJson = JSON.stringify(this.data);
                    object.jsonMenu = JSON.stringify(this.menusAndPermissions);
                    object.spIdJson = JSON.stringify(this.statement);
                    object.parentRoleId = this.parentRoleId;
                    object.roleName = this.roleName;
                    object.userId = sessionStorage.userId;
                    if(this.roleId){
                        object.roleId = this.roleId;
                        this.updateRole(this.serialize(object))
                    }else{
                        this.saveInfo(this.serialize(object))
                    }

                }
            },
            serialize(obj) {
                let str = ""
                for (let key in obj) {
                    str += `${key}=${obj[key]}&`
                }
                str = str.slice(0, -1)
                return str
            },
            getMenu(){
                this.getMenuAndPermissionByRoleId(this.parentRoleId)
            },
            async saveInfo(e) {
                let data = await getCourse("systemRole/addRole.json", e);
                if (data.code === 0) {
                    history.back();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async updateRole(e) {
                let data = await getCourse("systemRole/updateRole.json", e);
                if (data.code === 0) {
                    history.back();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async getMenuAndPermissionByRoleId(e) {
                let data = await getCourse("systemRole/getMenuAndPermissionByRoleId.json", `userId=${sessionStorage.userId}&roleId=${e}`);

                if (data.code === 0) {
                    console.log(data.DTO.menusAndPermissions)
                    console.log(JSON.parse(data.DTO.menusAndPermissions))

                    this.menusAndPermissions=JSON.parse(data.DTO.menusAndPermissions)
                    this.data=JSON.parse(data.DTO.data)
                    this.statement=JSON.parse(data.DTO.statement)
//                    this.parentRoleId=data.DTO.parentRoleId
//                    this.roleName=data.DTO.name

                } else {
                    alert(`errMsg:${data.msg}`)
                }

                this.clearDisabled = false
            },
            async getUpdateInfoByRoleId(e) {
                let data = await getCourse("systemRole/getUpdateInfoByRoleId.json", `userId=${sessionStorage.userId}&roleId=${e}`);

                if (data.code === 0) {
                    this.menusAndPermissions=JSON.parse(data.DTO.menusAndPermissions)
                    this.data=JSON.parse(data.DTO.data)
                    this.statement=JSON.parse(data.DTO.statement)
                    this.parentRoleId=data.DTO.parentRoleId
                    this.roleName=data.DTO.name
                    this.parentRoleName=data.DTO.parentRoleName

                } else {
                    alert(`errMsg:${data.msg}`)
                }

                this.clearDisabled = false
            },
            async getRoleIdsList() {
                let data = await getCourse("systemRole/roleIdsList.json", `userId=${sessionStorage.userId}`);

                if (data.code === 0) {
                    this.roleList = data.list
                }

                this.clearDisabled = false
            },

        },
        ready() {
            document.title = "新增角色"
            !!this.roleId && this.getUpdateInfoByRoleId(this.roleId);
//            console.log(this.roleId);
            this.getRoleIdsList();
        }

    }
</script>
<style scope>
    .controls .vue-html5-editor * {
        box-sizing: inherit;
    }

    .vue-html5-editor .content {
        height: 1000px;
    }
</style>
