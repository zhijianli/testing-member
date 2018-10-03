<style scoped>
    .power {
        display: flex;
        margin-top: 20px;

    }

    .power li {
        width: 140px;
        height: 40px;
        background: #fff;
        color: #000;
        font-size: 14px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #666;
        border-right: 0;
    }

    .power li:last-child {
        border-right: 1px solid #666;
    }

    .power li.show {
        background: #169BD5;
        color: #fff;
    }

    .item_title_btn {
        width: 80px;
        height: 28px;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        display: inline-block;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        user-select: none;
    }

    .item_title_btn_sending {
        width: 80px;
        height: 28px;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        display: inline-block;
        line-height: 26px;
        text-align: center;
        user-select: none;
        cursor: not-allowed;
    }

    .item_title_btn:hover {
        background-color: #006dcc;
        color: white;
    }

    .wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        padding-right: 50px;
    }

    .box {

        display: flex;
        justify-content: space-between;

    }

    .box > div {
        margin-right: 50px;
    }

    .box img {
        border: 1px solid;
    }

    .box-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
</style>
<template>
    <div class="container-fluid">
        <ul class="power">
            <li :class="{'show': switchTab === 0 }" @click="switchFn(0)">基本信息</li>
            <li :class="{'show': switchTab === 1 }" @click="switchFn(1)">RFM信息</li>
            <li :class="{'show': switchTab === 2 }" @click="switchFn(2)">跟进记录</li>
            <li :class="{'show': switchTab === 3 }" v-if="write" @click="switchFn(3)">填写跟进记录</li>
        </ul>
        <div class="widget-box row-fluid" v-if="switchTab === 0">
            <!--<div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>-->
            <!--<h5 class="newTitle">新增线索</h5>-->
            <!--</div>-->

            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate">
                    <!-- 修改位置 -->
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>客户来源</label>
                        <div class="controls">

                            <select v-model="tscList.customerSourceId" style="width: 186px">
                                <option :value="item.id" v-text="item.name"
                                        v-for="item in criteria.crmClueCustomerSourceList"></option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group" v-show="showPhone">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>手机号</label>
                        <div class="controls">
                            <input type="text" name="founder" id="founder" v-model="tscList.customerMobilePhone"
                                   value="{{ founder }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><span style="color: red;margin-right: 10px">*</span>咨询类型</label>
                        <div class="controls">
                            <select v-model="tscList.consultingTypeId" style="width: 186px">
                                <option :value="item.id" v-text="item.name"
                                        v-for="item in criteria.crmClueConsultingTypeList"></option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">用户姓名</label>
                        <div class="controls">
                            <input type="text" name="price" id="price" v-model="tscList.customerName"
                                   value="{{ price }}">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">微信号</label>
                        <div class="controls">
                            <input type="text" name="price" id="price" v-model="tscList.customerWxAccount"
                                   value="{{ price }}">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">性别</label>
                        <div class="controls">
                            <select v-model="tscList.customerSex" style="width: 186px">
                                <option value="1">男</option>
                                <option value="2">女</option>
                            </select>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">年龄</label>
                        <div class="controls">
                            <input type="text" name="price" id="price" v-model="tscList.customerBirthday"
                                   value="{{ price }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">所在地</label>
                        <div class="controls">
                            <input type="text" name="price" id="price" v-model="tscList.customerLocation"
                                   value="{{ price }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">职业</label>
                        <div class="controls">
                            <input type="text" name="price" id="price" v-model="tscList.customerOccupation"
                                   value="{{ price }}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">收入（元）</label>
                        <div class="controls">
                            <input type="text" name="price" id="price" v-model="tscList.customerAnnualIncome"
                                   value="{{ price }}">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">婚姻状态</label>
                        <div class="controls">
                            <select v-model="tscList.customerMaritalStatus" style="width: 186px">
                                <option value="1">已婚</option>
                                <option value="0">未婚</option>
                                <option value="2">离异</option>
                                <option value="3">丧偶</option>
                            </select>
                        </div>
                    </div>


                    <div class="form-actions" style="overflow:hidden;">
                        <!--<label class="control-label"></label>-->

                        <div class="clearfix controls" style="width:58%;">
                            <!--<button class="btn btn-danger" v-if="!!this.articleId" @click="deleteEditingArticle()">删除</button>-->
                            <input type="button" style="float:left;margin-right:120px;" value="保存"
                                   class="btn btn-success" @click="configBtn()">
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div v-if="switchTab === 1">
            <!--<div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>-->
            <!--<h5 class="newTitle">新增线索</h5>-->
            <!--</div>-->
            <rfm></rfm>
            <!--<rfm :phone="tscList.customerMobilePhone"></rfm>-->
        </div>
        <div v-if="switchTab === 2">
            <!--<div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>-->
            <!--<h5 class="newTitle">新增线索</h5>-->
            <!--</div>-->
            <follow-up-record></follow-up-record>
        </div>
        <div class="widget-box row-fluid" v-if="switchTab === 3">
            <!--<div class="widget-title"><span class="icon"> <i class="icon-info-sign"></i> </span>-->
            <!--<h5 class="newTitle">新增线索</h5>-->
            <!--</div>-->

            <div class="widget-content nopadding">
                <div class="form-horizontal" name="basic_validate" id="basic_validate">
                    <!-- 修改位置 -->
                    <div class="control-group">
                        <label class="control-label">跟进</label>

                        <div class="controls">
                            <textarea type="text" maxlength="3000" style="border-radius: 4px;width: 600px;height: 60px;"
                                      placeholder="跟进记录，此处省略300字" v-model="followRecord"></textarea>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">所处位置</label>

                        <div class="controls">
                            <input type="text" disabled v-model="postition">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">目前状态</label>

                        <div class="controls">
                            <input type="text" disabled v-model="oriStatusName">
                        </div>
                    </div>

                    <div class="control-group" v-if="nextStatusList[0]">
                        <label class="control-label">可选状态</label>
                        <div class="controls">
                            <select v-model="nextState" style="width: 186px">
                                <option :value="item.status" v-for="item in nextStatusList">{{item.statusName}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-actions" style="overflow:hidden;">
                        <!--<label class="control-label"></label>-->

                        <div class="clearfix controls" style="width:58%;">
                            <!--<button class="btn btn-danger" v-if="!!this.articleId" @click="deleteEditingArticle()">删除</button>-->
                            <input type="button" style="float:left;margin-right:120px;" v-if="nextStatusList[0]" value="提交"
                                   class="btn btn-success" @click="isTrue()">
                            <input type="button" style="float:right;margin-right:120px;" value="转给同事" id="ajaxBut" v-if="isTransfer"
                                   class="btn btn-success" @click="isTurn()">
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop in" v-if="editRemark"></div>
        <div id="edtCount2" class="modal" v-if="editRemark"
             style="width: 1000px;top:20px;margin-left: 0;transform: translateX(-50%)">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                <h3>编辑</h3>
            </div>
            <div class="modal-body row-fluid" style="max-height: 800px;">
                <div class="form-horizontal">
                    <label class="control-label">订单号 :</label>
                    <div class="controls form-horizontal">

                        <div class="clearfix">
                            <input type="text" style="width: 400px" v-model="orderId">
                        </div>
                        <!--<input type="text" class="span11 username" v-model="editRemRes" name="editRemRes"-->
                        <!--placeholder="请输入跟进人姓名">-->
                    </div>
                </div>
                <div class="form-horizontal">
                    <label class="control-label">服务期限 :</label>
                    <div class="controls form-horizontal">

                        <div class="clearfix">
                            <input type="text" style="width: 400px" placeholder="次数/月/整案" v-model="servicePeriod">
                        </div>

                        <!--<input type="text" class="span11 username" v-model="editRemRes" name="editRemRes"-->
                        <!--placeholder="请输入跟进人姓名">-->
                    </div>
                </div>
                <!--<div class="form-horizontal">-->
                <!--<label class="control-label">备注 :</label>-->
                <!--<div class="controls form-horizontal">-->
                <!--<textarea style="margin: 0px; width: 500px; height: 100px;" v-model="editRemRem"-->
                <!--:disabled="!isUserCanEdit"></textarea>-->
                <!--</div>-->
                <!--</div>-->
                <div class="form-horizontal">
                    <label class="control-label">截图 :</label>
                    <div class="controls form-horizontal">
                        <!--<pic-list>-->

                        <!--</pic-list>-->
                        <div class="wrap">
                            <div class="box" style="margin-bottom: 50px">
                                <div>
                                    <div>
                                        <a :href="url + id1" target="_blank" rel="noopener noreferrer nofollow">
                                            <img alt="请上传图片" width="300" height="200" :src="url + id1">
                                        </a>
                                    </div>
                                    <div class="box-bottom">
                                        <span>{{ screenshotOneTime }}</span>


                                        <template v-if="isUserCanEdit">
                                            <span class="item_title_btn" onclick="file0.click()"
                                                  v-if="! sending0">上传</span>
                                            <span class="item_title_btn_sending" v-else>上传中...</span>


                                            <input type="file" accept="image/*" @change="readFile" data-type="0"
                                                   id="file0"
                                                   style="display: none;">
                                        </template>

                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <a :href="url + id2" target="_blank" rel="noopener noreferrer nofollow">
                                            <img alt="请上传图片" width="300" height="200" :src="url + id2">
                                        </a>
                                    </div>
                                    <div class="box-bottom">
                                        <span>{{ screenshotTwoTime }}</span>
                                        <template v-if="isUserCanEdit">
                                            <span class="item_title_btn" onclick="file1.click()"
                                                  v-if="! sending1">上传</span>
                                            <span class="item_title_btn_sending" v-else>上传中...</span>


                                            <input type="file" accept="image/*" @change="readFile" data-type="1"
                                                   id="file1"
                                                   style="display: none;">
                                        </template>


                                    </div>
                                </div>
                            </div>

                            <div class="box">
                                <div>
                                    <div>
                                        <a :href="url + id3" target="_blank" rel="noopener noreferrer nofollow">
                                            <img alt="请上传图片" width="300" height="200" :src="url + id3">
                                        </a>
                                    </div>
                                    <div class="box-bottom">
                                        <span> {{ screenshotThreeTime }} </span>

                                        <template v-if="isUserCanEdit">
                                            <span class="item_title_btn" onclick="file2.click()"
                                                  v-if="! sending2">上传</span>
                                            <span class="item_title_btn_sending" v-else>上传中...</span>

                                            <input type="file" accept="image/*" @change="readFile" data-type="2"
                                                   id="file2"
                                                   style="display: none;">
                                        </template>

                                    </div>
                                </div>


                                <div>
                                    <div>
                                        <a :href="url + id4" target="_blank" rel="noopener noreferrer nofollow">
                                            <img alt="请上传图片" width="300" height="200" :src="url + id4">
                                        </a>
                                    </div>
                                    <div class="box-bottom">
                                        <span> {{ screenshotFourTime }} </span>
                                        <template v-if="isUserCanEdit">
                                            <span class="item_title_btn" onclick="file3.click()"
                                                  v-if="! sending3">上传</span>
                                            <span class="item_title_btn_sending" v-else>上传中...</span>

                                            <input type="file" accept="image/*" @change="readFile" data-type="3"
                                                   id="file3"
                                                   style="display: none;">
                                        </template>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
                <template v-if="isUserCanEdit">
                    <a data-dismiss="modal" class="btn btn-danger" href="#" v-if="! isSendingRemarkData"
                       @click="saveEditRemarkFn()">保存</a>
                    <a data-dismiss="modal" class="btn btn-danger" href="#" v-else>发送中。。。</a>
                </template>
            </div>
        </div>
        <div class="modal-backdrop in" v-if="editRemark3"></div>
        <div id="edtCount3" class="modal" v-if="editRemark3"
             style="width: 1000px;top:20px;margin-left: 0;transform: translateX(-50%)">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                <h3>编辑</h3>
            </div>
            <div class="widget-box">
                <div class="widget-content nopadding">
                    <div class="control-group expertList">
                        <label v-for="item in assistantList" class="pointer">

                            <div class="checkbox" style="display: inline-block;vertical-align: baseline;">
                                <input type="radio"
                                       class="checkboxInp"
                                       name="title-table-checkbox"
                                       :value="item.caid"
                                       :id="item.caid"
                                       :data-typeid="item.caid"
                                       v-model="recipientConsultAssistantId"

                                >
                                <!--<label class="checkboxLabel" for="item.caid"></label>-->
                            </div>
                            {{item.nickname}}

                        </label>
                    </div>
                </div>
            </div>
            <div class="branch" style="margin-left: 15px">
                分成比例（我：他）<input type="text" style="width: 30px" v-model="me">:<input type="text" style="width: 30px"
                                                                                     v-model="he">

            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
                <template v-if="isUserCanEdit">
                    <a data-dismiss="modal" class="btn btn-danger" href="#" v-if="! isSendingRemarkData"
                       @click="savePop()">保存</a>
                    <a data-dismiss="modal" class="btn btn-danger" href="#" v-else>发送中。。。</a>
                </template>
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
    import rfm from "./RFM.vue"
    import followUpRecord from "./followUpRecord.vue"
    import moment from "moment"


    import {getSource, getSources, getJson, getCourse, getlistUser} from "../../api"

    export default {
        components: {
            qiniu,
            rfm,
            followUpRecord
        },

        events: {
            'imgParameter': function (obj, eventName) {
                this[eventName] = obj[eventName].imgPath
            }
        },

        data() {
            return {
                scaleId: this.$route.query.id,

                pageIndex: 1,
                pageSize: 1000,

                url: `http://${process.env.NODE_ENV == 'production' ? "picture.120xinmao.com/" : "oml9ntix5.qnssl.com/" }`,
                isUserCanEdit: true,
                token: '',
                id: '',
                id1: '',
                id2: '',
                id3: '',
                id4: '',
                tList: ['', '', '', ''],
                sending0: false,
                sending1: false,
                sending2: false,
                sending3: false,
                isSendingRemarkData: false,

                screenshotOneTime: '',
                screenshotTwoTime: '',
                screenshotThreeTime: '',
                screenshotFourTime: '',

                tscList: {},
                criteria: {},
                list: [],
                switchTab: this.$route.query.type ? parseInt(this.$route.query.type) : 0,
                editRemark: false,
                editRemark3: false,
                followRecord: '',
                nextState: '',
                nextStatusList: [],
                assistantList: [],
                expertList: '',
                oriStatus: '',
                oriStatusName: '',
                postition: '',
                orderId: '',
                servicePeriod: '',

                me: '',
                he: '',
                recipientConsultAssistantId: '',

                userInfo:{},
                write:true,
                showPhone:true,
                isTransfer:false

            }
        },
        methods: {
            switchFn(id) {
                this.switchTab = id

                console.log(id);

                if (id == 0) {
                    this.getClassify();
                    this.getQueryCriteria();
                }
                if (id == 3) {
                    this.getNextStatusByOriStatus();
                }
            },
            aa(n) {
                this.displayMode = n;
            },
            isTrue() {
                if (!this.followRecord) {
                    alert('请您填写跟进记录')
                } else if (!this.nextState) {
                    alert('请您选择状态')
                } else {
                    if (this.nextState == 7) {
                        this.editRemark = true;
                    } else if (this.nextState == 9) {
                        let that = this;
                        let a = confirm("是否有新下订单？")
                        if (a === true) {
                            this.editRemark = true;
                        } else {
                            this.saveEditRemarkFn()
                        }
                    } else {
                        this.saveEditRemarkFn()
                    }
                }

            },
            isTurn() {
                this.getAssistantList();
                this.editRemark3 = true;
            },
            close() {
                this.editRemark = false;
                this.editRemark3 = false;
            },

            configBtn() {
                var date = new Date();
                let object = {};
                if (!this.tscList.customerSourceId) {
                    alert("请您选择客户来源！")
                } else if (!this.tscList.customerMobilePhone) {
                    alert("请您填写手机号！")
                } else if (!this.tscList.consultingTypeId) {
                    alert("请您选择咨询类型！")
                } else {
                    if (this.tscList.customerName) {
                        object.customerName = this.tscList.customerName;
                    }
                    if (this.tscList.customerWxAccount) {
                        object.customerWxAccount = this.tscList.customerWxAccount;
                    }
                    if (this.tscList.customerSex) {
                        object.customerSex = this.tscList.customerSex;
                    }
                    if (this.tscList.customerBirthday) {
                        object.customerBirthday = `${date.getFullYear() - this.tscList.customerBirthday}/01/01`;
                    }
                    if (this.tscList.customerLocation) {
                        object.customerLocation = this.tscList.customerLocation;
                    }
                    if (this.tscList.customerOccupation) {
                        object.customerOccupation = this.tscList.customerOccupation;
                    }
                    if (this.tscList.customerAnnualIncome) {
                        object.customerAnnualIncome = this.tscList.customerAnnualIncome;
                    }
                    if (this.tscList.customerMaritalStatus) {
                        object.customerMaritalStatus = this.tscList.customerMaritalStatus;
                    }
                    object.consultingTypeId = this.tscList.consultingTypeId;
                    object.customerSourceId = this.tscList.customerSourceId;
                    object.customerMobilePhone = this.tscList.customerMobilePhone;
                    object.userId = sessionStorage.userId;
                    object.id = this.$route.query.id;
                    this.saveInfo(this.serialize(object))
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
            async saveInfo(e) {
                let data = await getCourse("crm/clue/updateSingleClueInfo", e);
                console.log(data);
                if (data.code == 0) {
                    history.back();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async getClassify() {
                let data = await getCourse("crm/clue/getSingleClueInfo", `id=${this.$route.query.id}`);
                console.log(data);
                if (data.code == 0) {
                    var date = new Date();
                    this.tscList = data.crmClue;
                    if (this.tscList.customerBirthday) {
                        this.tscList.customerBirthday = date.getFullYear() - parseInt(this.tscList.customerBirthday)
                    }


                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async getQueryCriteria() {
                let data = await getCourse("crm/clue/getQueryCriteria");

                if (data.code === 0) {
                    data.crmClueCustomerSourceList.shift();
                    data.crmClueConsultingTypeList.shift();
                    this.criteria = data

                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async getNextStatusByOriStatus() {
                this.userInfo=JSON.parse(sessionStorage.userInfo)
                console.log(this.userInfo)

                if(this.userInfo.systemUserInfoDTO.userType=='99'||this.userInfo.systemUserInfoDTO.userType=='88'||this.userInfo.systemUserInfoDTO.userType=='33'){
                    this.write=false
                }else{
                    this.write=true
                }
                if(this.$route.query.from){
                    if(this.userInfo.systemUserInfoDTO.userType=='99'){
                        this.showPhone=true;
                    }else{
                        this.showPhone=false;
                    }
                }

                let data = await getCourse("crm/clue/getNextStatusByOriStatus", `clueId=${this.$route.query.id}`);
                if (data.code === 0) {
                    this.nextStatusList = data.nextStatusList;
                    this.oriStatus = data.oriStatus;
                    this.oriStatusName = data.oriStatusName;
                    this.postition = data.postition;
                    this.isTransfer = data.isTransfer;
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },
            async getAssistantList() {
                let data = await getCourse("assistantConsult/getTransferList.json", `pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&clueId=${this.$route.query.id}&userId=${sessionStorage.userId}`);
                if (data.code === 0) {
                    this.assistantList = data.data
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },
            readFile(e) {
                this.id = +e.target.dataset.type
                const file = e.target.files[0]

                // chrome bug 弹出文件选择框 点取消 依然触发 change 事件
                if (!file) {
                    return
                }

                const {type: types, name} = file

                if (!types.includes("image")) {
                    alert("请选择图片文件")
                    return
                }


                // this.pList[this.id] = window.URL.createObjectURL(file)
                // console.log(this.pList)

                this['sending' + this.id] = true

                this.upload(file, name).then((data) => {
                    // Vue.set(this.tList, this.id, moment().format('YYYY-MM-DD HH:mm:ss'))
                    this['id' + (this.id + 1)] = data.key

                    this['sending' + this.id] = false;
                    // this.tList[this.id] = moment().format('YYYY-MM-DD HH:mm:ss')

                    // 截图图片时间赋值
                    switch (this.id + 1) {
                        case 1:
                            this.screenshotOneTime = moment().format('YYYY-MM-DD HH:mm:ss');
                            break;
                        case 2:
                            this.screenshotTwoTime = moment().format('YYYY-MM-DD HH:mm:ss');
                            break;
                        case 3:
                            this.screenshotThreeTime = moment().format('YYYY-MM-DD HH:mm:ss');
                            break;
                        case 4:
                            this.screenshotFourTime = moment().format('YYYY-MM-DD HH:mm:ss');
                            break;

                        default:
                            alert("出问题了！");
                            break;

                    }
                    ;


                })


            },
            async upload(blob, name) {
                name = name.split(" ").join("")
                const formdata = new FormData()
                const nameArray = name.split(".")
                const suffix = nameArray.pop()

                formdata.append("file", blob, "image")
                formdata.append("token", this.token)

                formdata.append('key', `web/${btoa(encodeURIComponent(nameArray.join(".")) + Date.now())}.${suffix}`)

                // const data = await getResponsesFile("http://up.qiniu.com", formdata)
                // this.key = data.key
                // return data

                let response = await fetch("http://up.qiniu.com", {
                    method: "POST",
                    mode: "cors",
                    body: formdata
                }).catch((error) => {
                    console.log(error)
                })

                let data = await response.json().catch((error) => {
                    console.log(error)
                })
                return data
            },
            async saveEditRemarkFn() {

                let editRemRes = {
                    clueId: this.$route.query.id
                }

                editRemRes.originalState = this.oriStatus
                editRemRes.userId = sessionStorage.userId

                if(this.editRemark){
                    if(!this.orderId){
                        alert('请您填写订单号')
                    }else if(!this.servicePeriod){
                        alert('请您填写服务期限')
                    } else if (!this.id1&&!this.id2&&!this.id3&&!this.id4) {
                        alert("请您上传图片！")
                    }else{
                        if (this.followRecord) {
                            editRemRes.followRecord = this.followRecord
                        }

                        if (this.nextState) {
                            editRemRes.nextState = this.nextState
                        }

                        if (this.orderId) {
                            editRemRes.orderId = this.orderId
                        }

                        if (this.orderId) {
                            editRemRes.orderId = this.orderId
                        }

                        if (this.servicePeriod) {
                            editRemRes.servicePeriod = this.servicePeriod
                        }

                        // if (this.editRemRes || this.editRemRes === 0) {
                        //     editRemRes.responsible = this.editRemRes
                        // }

                        // 新增截图功能传参

                        this.id1 && (editRemRes.screenshotOne = this.id1);
                        this.id2 && (editRemRes.screenshotTwo = this.id2);
                        this.id3 && (editRemRes.screenshotThree = this.id3);
                        this.id4 && (editRemRes.screenshotFour = this.id4);


                        // 新增截图时间传参
//                this.screenshotOneTime  && (editRemRes.screenshotOneTime  = this.screenshotOneTime );
//                this.screenshotTwoTime  && (editRemRes.screenshotTwoTime  = this.screenshotTwoTime );
//                this.screenshotThreeTime  && (editRemRes.screenshotThreeTime  = this.screenshotThreeTime );
//                this.screenshotFourTime && (editRemRes.screenshotFourTime = this.screenshotFourTime);


                        this.isSendingRemarkData = true

                        const data = await getCourse('crm/clue/followUp', this.serialize(editRemRes))

                        if (data.code === 0) {
                            this.editRemark = false;
                            this.switchTab = 2;
                            this.followRecord = '';
                            this.nextState = '';
                            this.id1 = '';
                            this.id2 = '';
                            this.id3 = '';
                            this.id4 = '';
                            this.orderId = '';
                            this.servicePeriod = '';
                            this.screenshotOneTime = '';
                            this.screenshotTwoTime = '';
                            this.screenshotThreeTime = '';
                            this.screenshotFourTime = '';
//                    this.search()
                        } else {
                            alert(data.msg)
                        }

                        this.isSendingRemarkData = false
                    }

                }else{
                    if (this.followRecord) {
                        editRemRes.followRecord = this.followRecord
                    }

                    if (this.nextState) {
                        editRemRes.nextState = this.nextState
                    }

                    if (this.orderId) {
                        editRemRes.orderId = this.orderId
                    }

                    if (this.orderId) {
                        editRemRes.orderId = this.orderId
                    }

                    if (this.servicePeriod) {
                        editRemRes.servicePeriod = this.servicePeriod
                    }

                    // if (this.editRemRes || this.editRemRes === 0) {
                    //     editRemRes.responsible = this.editRemRes
                    // }

                    // 新增截图功能传参

                    this.id1 && (editRemRes.screenshotOne = this.id1);
                    this.id2 && (editRemRes.screenshotTwo = this.id2);
                    this.id3 && (editRemRes.screenshotThree = this.id3);
                    this.id4 && (editRemRes.screenshotFour = this.id4);


                    // 新增截图时间传参
//                this.screenshotOneTime  && (editRemRes.screenshotOneTime  = this.screenshotOneTime );
//                this.screenshotTwoTime  && (editRemRes.screenshotTwoTime  = this.screenshotTwoTime );
//                this.screenshotThreeTime  && (editRemRes.screenshotThreeTime  = this.screenshotThreeTime );
//                this.screenshotFourTime && (editRemRes.screenshotFourTime = this.screenshotFourTime);


                    this.isSendingRemarkData = true

                    const data = await getCourse('crm/clue/followUp', this.serialize(editRemRes))

                    if (data.code === 0) {
                        this.editRemark = false;
                        this.switchTab = 2;
                        this.followRecord = '';
                        this.nextState = '';
                        this.id1 = '';
                        this.id2 = '';
                        this.id3 = '';
                        this.id4 = '';
                        this.orderId = '';
                        this.servicePeriod = '';
                        this.screenshotOneTime = '';
                        this.screenshotTwoTime = '';
                        this.screenshotThreeTime = '';
                        this.screenshotFourTime = '';
//                    this.search()
                    } else {
                        alert(data.msg)
                    }

                    this.isSendingRemarkData = false
                }


            },
            async savePop() {
                let editRemRes = {
                    clueId: this.$route.query.id
                }
                if(!this.recipientConsultAssistantId){
                    alert('请您选择转交对象')
                }else if(this.me==''||this.he==''){
                    alert('请您填写完整分配比例')
                }else{
                    editRemRes.userId = sessionStorage.userId
                    editRemRes.proportions = `${this.me}:${this.he}`
                    editRemRes.recipientConsultAssistantId = this.recipientConsultAssistantId


                    this.isSendingRemarkData = true

                    const data = await getCourse('crm/clueTransferProportions/insertClueTransferProportions', this.serialize(editRemRes))

                    if (data.code === 0) {
                        this.editRemark3 = false;
//                    this.switchTab=2;
                        this.recipientConsultAssistantId='';
                        this.me='';
                        this.he='';

//                    this.search()
                    } else {
                        alert(data.msg)
                    }

                    this.isSendingRemarkData = false
                }

            },
            async getToken() {
                let url = `/depression-web/Qiniu/obtainPictureUploadToken.json`

                let response = await fetch(url, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: ""
                }).catch((error) => {
                    console.log(error)
                })

                let data = await response.json().catch((error) => {
                    console.log(error)
                })

                if (data.code === 0) {
                    this.token = data.token
                }
            },
        },
        ready() {
            document.title = "客户信息";
            this.getClassify();
            this.getQueryCriteria();
            this.getToken();
            this.getNextStatusByOriStatus();
        }
    }
</script>

