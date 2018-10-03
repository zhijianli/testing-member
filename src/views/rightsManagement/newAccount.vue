<style scoped>
    .checkboxLabel.active:after {
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
                <h5 class="newTitle">新增账户</h5>
            </div>
            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <div style="font-size: 16px">基本信息</div>
                    <div class="control-group">
                        <label class="control-label">手机号</label>
                        <div class="controls">
                            <input type="text" name="mobilePhone" id="mobilePhone" v-model="mobilePhone" maxlength="11"
                                   value="{{ mobilePhone }}" v-if="roleId" disabled>
                            <input type="text" name="mobilePhone" id="mobilePhone" v-model="mobilePhone" maxlength="11"
                                   value="{{ mobilePhone }}" v-else="">
                        </div>
                    </div>
                    <div class="control-group" v-if="pTrue">
                        <label class="control-label">密码</label>
                        <div class="controls">
                            <input type="text" name="price" v-model="userPsw"
                                   value="{{ userPsw }}" :placeholder="roleId?'******':''">
                        </div>

                    </div>
                    <div class="control-group">
                        <label class="control-label">姓名</label>
                        <div class="controls">
                            <input type="text" name="showName" v-model="showName" maxlength="7"
                                   value="{{ showName }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">部门</label>
                        <div class="controls">
                            <input type="text" v-model="dptName" disabled v-if="roleId">
                            <select v-model="dptId" style="width: 186px" v-if="!roleId">
                                <option :value="item.dptId" v-text="item.depName"
                                        v-for="item in depertmentList"></option>
                            </select>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">状态</label>
                        <div class="controls">

                            <select v-model="isEnable" style="width: 186px">

                                <option value="0">启用</option>
                                <option value="1">禁用</option>
                            </select>
                        </div>
                    </div>

                    <div style="font-size: 16px">绑定角色</div>

                    <div style="margin-left: 80px">
                        <ul style="cursor: pointer;display: flex;">
                            <li v-for="item in roleJson" @click="toggle(item)" style="margin-bottom: 5px;margin-right: 10px">
                                <div class="checkboxLabel" :class="{active:item.selected}"
                                     @click.stop="checkbox(item)"></div>
                                <i style="width: 10px;height: 10px;background: #666;border-radius: 50%;display: inline-block" v-if="item.childRole.length>0"></i>

                                {{item.roleName}}
                                <ul style="margin-left: 40px" :style="{ display :  item.toggle? 'block' : 'none' }">
                                    <li v-for="i in item.childRole" @click.stop="toggle(i)" style="margin-bottom: 5px">
                                        <div class="checkboxLabel" :class="{active:i.selected}"
                                             @click.stop="checkbox(i)"></div>
                                        <i style="width: 10px;height: 10px;background: #666;border-radius: 50%;display: inline-block" v-if="i.childChildRole.length>0"></i>
                                        {{i.roleName}}
                                        <ul style="margin-left: 40px"
                                            :style="{ display :  i.toggle? 'block' : 'none' }">
                                            <li v-for="x in i.childChildRole" @click.stop="toggle(x)"
                                                style="margin-bottom: 5px">
                                                <div class="checkboxLabel" :class="{active:x.selected}"
                                                     @click.stop="checkbox(x)"></div>
                                                {{x.roleName}}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
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
                userId: sessionStorage.userId,
                depertmentList: [],
                dptId: '',
                isEnable: null,
                mobilePhone: '',
                showName:'',
                userPsw: '',
                roleJson: [],
                criteria: {},
                isTrue: false,
                dptName:'',

                userPsw2:'',
                pTrue:true,
                userInfo:{},

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
            checkbox(item) {
                if (item.selected) {
                    item.selected = false;
                } else {
                    item.selected = true;
                }
            },
            toggle(item) {
                if (item.toggle) {
                    item.toggle = false;
                } else {
                    item.toggle = true;
                }
            },
            configBtn() {
                console.log(1)
                var date = new Date();
                let object = {};
                this.roleJson.forEach((v, i) => {
                    if (v.selected) {
                        this.isTrue = true;
                    }
                    if(v.childRole){
                        v.childRole.forEach((v, i) => {
                            if (v.selected) {
                                this.isTrue = true;
                            }
                            if(v.childChildRole){
                                v.childChildRole.forEach((v, i) => {
                                    console.log(3333)
                                    if (v.selected) {
                                        console.log(2222222)
                                        this.isTrue = true;
                                    }
//                                    if(v.childChildChildRole){
//                                        v.childRole.forEach((v, i) => {
//                                            if (v.selected) {
//                                                this.isTrue = true;
//                                            }
//                                            if(v.childRole){
//                                                v.childRole.forEach((v, i) => {
//                                                    if (v.selected) {
//                                                        this.isTrue = true;
//                                                    }
//                                                })
//                                            }
//
//                                        })
//                                    }

                                })
                            }

                        })
                    }

                })
                if (!this.mobilePhone) {
                    alert("请您填写手机号！")
                } else if (!(this.userPsw||this.roleId)) {
                    alert("请您填写密码！")
                } else if (!this.showName) {
                    alert("请您填写姓名！")
                } else if (!this.dptId) {
                    alert("请您选择部门！")
                } else if (this.isEnable==null) {
                    alert("请您选择状态！")
                } else if (!this.isTrue) {
                    alert("请您绑定角色！")
                } else {

                    object.mobilePhone = this.mobilePhone;
                    object.userPsw = this.userPsw;
                    object.showName = this.showName;
                    object.dptId = this.dptId;
                    object.isEnable = this.isEnable;
                    object.roleJson = JSON.stringify(this.roleJson);
//                    object.userId = sessionStorage.userId;
                    if(this.roleId){
                        if(this.userPsw){

                        }else{
                            object.userPsw=this.userPsw2;
                        }
                        object.userId = this.roleId;
                        this.updateUserRole(this.serialize(object))
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
            async verificationPhone() {
                if (!/^1[3,4,5,7,8][0-9]{9}/.test(this.mobilePhone)) {
                    alert('手机号码填写错误')
                    return false
                }
            },
            async receive(params) {
                let data = await getCourse("crm/clue/pickUpClueFromInternationalWater", params);

                if (data.code === 0) {
                    this.$route.router.go(`/privateSea?17001004`)
                } else {
                    alert(`errMsg:${data.msg}`)
                }

                this.clearDisabled = false
            },
            async updateUserRole(e) {

                let data = await getCourse("depression/system/updateUserRole.json", e);
                console.log(data);
                if (data.code == 0) {
                    history.back();
                } else {
                    alert(data.error)
                }
            },
            async saveInfo(e) {

                let data = await getCourse("depression/system/addNewUser.json", e);
                console.log(data);
                if (data.code == 0) {
                    history.back();
                } else {
                    alert(data.error)
                }
            },

            async getUpdateUserRole(e) {
                this.userInfo=JSON.parse(sessionStorage.userInfo)
                if(e==sessionStorage.userId||this.userInfo.systemUserInfoDTO.userType=='99'){
                    this.pTrue=true;
                }else{
                    this.pTrue=false;
                }
                let data = await getCourse("depression/system/getUpdateUserRole.json",`userId=${e}&operatorId=${this.userId}`);

                if (data.code === 0) {
                    this.mobilePhone = data.DTO.mobilePhone;
                    this.showName = data.DTO.showName;
                    this.userPsw2 = data.DTO.userPsw;
                    this.dptId = data.DTO.dptId;
                    this.isEnable = data.DTO.isEnable;
                    this.roleJson = JSON.parse(data.roles);
                    this.dptName = data.DTO.dptName;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async listDepartment() {
                let data = await getCourse("depression/system/listDepartment.json");

                if (data.code === 0) {
                    this.depertmentList = data.list;

                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async roleListByUserId() {
                let data = await getCourse("systemRole/roleListByUserId.json", `userId=${sessionStorage.userId}`);

                if (data.code === 0) {
                    this.roleJson = JSON.parse(data.roles);

                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
        },
        ready() {
            document.title = "新增账户"
            this.listDepartment();
            !this.roleId&&this.roleListByUserId();
            !!this.roleId && this.getUpdateUserRole(`${this.roleId}`);
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
