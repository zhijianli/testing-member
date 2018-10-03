<template>
    <div>
        <div class="container-fluid">
            <div id="search" class="title">
                <select v-model="infoChannel" name="infoChannel">
                    <option value="">全部</option>
                    <option :value="item" v-text="item" v-for="item in channelList"></option>
                </select>
                <input type="text" name="words" placeholder="请输入搜索内容" v-model="words">
                <time-range @ddd="ddd">

                </time-range>

                <select v-model="regTimeDirection" name="regTimeDirection">
                    <option value="0">升序</option>
                    <option value="1">降序</option>
                </select>
                <select v-model="hasMobile" name="hasMobile" style="margin-right: 50px;">
                    <option value="">全部</option>
                    <option value="0">无手机号</option>
                    <option value="1">有手机号</option>
                </select>


                <div style="display: inline-block">
                    <span>禁言/禁用：</span>
                    <!--isEnable 0正常，1禁用，2禁言-->
                    <select v-model="isEnable">
                        <option value="">全部</option>
                        <option :value="0">正常</option>
                        <option :value="2">禁言</option>
                        <option :value="1">禁用</option>
                    </select>
                </div>

                <div style="display: inline-block">
                    <span>注册渠道：</span>
                    <select v-model="channel1"  @change="channelChangeFn">
                        <option :value="0">全部</option>
                        <option :value="1">IOS</option>
                        <option :value="2">Android</option>
                        <option :value="3">后台</option>
                    </select>

                    <select v-model="channel2">
                        <option value="">全部</option>
                        <option :value="item.memberChannalName" v-text="item.memberChannalName" v-for="item in channel2List" :key="item.memberChannalId"></option>

                    </select>

                    <input type="submit" value="确定搜索" class="btn btn-warning" @click="searchFn()">

                    <span @click="downloadExcel" class="btn btn-success" style="margin: -10px 0 0 4px;" v-if="!isExportingExcel">导出Excel</span>
                    <span class="btn btn-success" style="margin: -10px 0 0 4px;cursor: wait;" v-else>导出中....</span>

                    <a href="javascript:;" v-el:a></a>
                </div>

            </div>

            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                <thead>
                <tr>
                    <th>
                        <div class="checkbox">
                            <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-th"
                                   @click='selectAll' :checked="checkAllState">
                            <label for="title-table-th" class="checkboxLabel"></label>
                        </div>
                    </th>
                    <th>用户姓名</th>
                    <th>用户手机号</th>
                    <th>用户类型</th>
                    <th>渠道</th>
                    <th>注册渠道</th>
                    <th>状态</th>
                    <th>密码</th>
                    <th>禁言</th>
                    <th>禁言状态</th>
                    <th>注册时间</th>
                    <th>跟进人</th>
                    <th style="width: 300px;">备注</th>
                    <th style="width: 200px;">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item of list">
                    <td>
                        <div class="checkbox">
                            <input type="checkbox" class="checkboxInp" name="title-table-checkbox"
                                   id="title-table-td{{item.mid}}" :checked=" item.checkState? 'checked':''"  @click='selectPerson(item.mid, item)' data-typeId="{{item.mid}}">
                            <label class="checkboxLabel" for="title-table-td{{item.mid}}"></label>
                        </div>
                    </td>
                    <td>{{ item.nickname }}</td>
                    <td>{{ item.mobilePhone }}</td>
                    <td v-text=" item.userType | reverse">

                    </td>
                    <td v-if="item.infoChannel">{{item.infoChannel}}</td>
                    <td v-else>自然</td>

                    <td>{{ item.memberChannalName }}</td>

                    <td v-text=" item.isEnable | isEnableFilter"></td>
                    <td><a href="#" class="operation" @click="uploadPass(item.mid)">重置密码</a></td>

                    <td>
                        <button class="btn  btn-danger" v-if=" item.disableMessageDays == 0 " @click="DisableFn(item.mid)">
                            禁言
                        </button>
                        <button class="btn btn-info " v-else @click="configClearFn(item.mid)">解禁</button>
                    </td>
                    <td>
                        <span v-if=" item.disableMessageDays == 0 ">未禁言</span>
                        <span v-else>禁言天数为：{{ item.disableMessageDays }}</span>
                    </td>
                    <td>{{ item.regTime }}</td>
                    <td>{{ item.responsible }}</td>


                    <td style="word-wrap:break-word;word-break:break-all; overflow:hidden; text-overflow:ellipsis; text-align: left;">
                        <template v-if="item.remarks && item.remarks.length > 95">
                            {{ item.remarks.slice(0, 95) + '...'}}
                        </template>
                        <template v-else>
                            {{ item.remarks }}
                        </template>

                    </td>
                    <td>
                        <span class="normal-operate-state" @click="editRemarkFn(item.mid)">编辑</span>
                        <a href="#" class="operation editArticle normal-operate-state" @click="editFn(item.nickname,item.mobilePhone,item.mid)">修改</a>
                        <span class="normal-operate-state" @click="editIsEnableState(item.mid)">{{ item.isEnable | editIsEnableFilter }}</span>
                    </td>

                </tr>
                </tbody>
            </table>
            <div class="page">
                <div id="test">
                    <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"
                              :page-handler="pageHandler" :create-url="createUrl">10">
                        <zpagenav>
                </div>
                <p>
                    <a class="btn btn-warning" id="addVip" href="#addCount" data-toggle="modal" @click="addFn()">新增</a>
                    <!-- 	            <a class="btn btn-danger" href="#">禁用</a>
                                    <a class="btn btn-success" href="#">启用</a> -->
                </p>
            </div>

        </div>

        <!-- 重置密码 -->
        <div class="modal-backdrop in" v-if="reset"></div>
        <div id="reset" class="modal" v-if="reset">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                <h3>密码重置</h3>
            </div>
            <div class="modal-body">
                <p>确认后，您的密码修改为123456!</p>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configReset()">确定</a>
            </div>
        </div>

        <!-- 新增 -->
        <div class="modal-backdrop in" v-if="add"></div>
        <div id="addCount" class="modal" v-if="add">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                <h3>新增</h3>
            </div>
            <div class="modal-body row-fluid">
                <div class="form-horizontal">
                    <label class="control-label"><span class="validateError">*</span>用户姓名 :</label>
                    <div class="controls form-horizontal">
                        <input type="text" class="span11 username" name="addnickname" autocomplete="off" value=""
                               checked="checked" v-model="addnickname" placeholder="请输入用户姓名">
                    </div>
                </div>
                <div class="form-horizontal">
                    <label class="control-label"><span class="validateError">*</span>用户密码 :</label>
                    <div class="controls form-horizontal">
                        <input type="password" class="span11 passw" name="addpassw" autocomplete="new-password" value=""
                               checked="checked" v-model="addpassw" placeholder="请输入用户密码">
                    </div>
                </div>
                <div class="form-horizontal">
                    <label class="control-label"><span class="validateError">*</span>手机号码 :</label>
                    <div class="controls form-horizontal">
                        <input type="text" class="span11 tel" name='addtel' autocomplete="off" value="" v-model="addtel"
                               placeholder="请输入手机号码">
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
                <a class="btn btn-danger" href="#" @click="configAdd()">确定</a>
            </div>
        </div>

        <!-- 编辑 -->
        <div class="modal-backdrop in" v-if="edit"></div>
        <div id="edtCount" class="modal" v-if="edit">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                <h3>编辑</h3>
            </div>
            <div class="modal-body row-fluid">
                <div class="form-horizontal">
                    <label class="control-label"><span class="validateError">*</span>用户姓名 :</label>
                    <div class="controls form-horizontal">
                        <input type="text" class="span11 username" v-model="editnickname" name="editnickname"
                               placeholder="请输入用户姓名">
                    </div>
                </div>
                <div class="form-horizontal">
                    <label class="control-label"><span class="validateError">*</span>用户密码 :</label>
                    <div class="controls form-horizontal">
                        <input type="password" class="span11 password" v-model="eidtpassword" name="eidtpassword"
                               placeholder="请输入用户密码">
                    </div>
                </div>
                <div class="form-horizontal">
                    <label class="control-label"><span class="validateError">*</span>手机号码 :</label>
                    <div class="controls form-horizontal">
                        <input type="text" class="span11 tel" name='edittel' v-model="edittel" placeholder="请输入手机号码">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configEdit">确定</a>
            </div>
        </div>


        <div class="modal-backdrop in" v-if="clearDisabled"></div>
        <div id="reset3" class="modal" v-if="clearDisabled">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                <h3>解禁</h3>
            </div>
            <div class="modal-body">
                <p>确定解禁当前用户？</p>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configClearDisabled()">确定</a>
            </div>
        </div>


        <div class="modal-backdrop in" v-if="BannedPopup"></div>
        <div id="reset2" class="modal" v-if="BannedPopup">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                <h3>禁言</h3>
            </div>
            <div class="modal-body form-horizontal">
                <div class="control-group">
                    <label class="control-label">禁言 :</label>
                    <div class="controls">
                        <input type="number" v-model="days" placeholder="禁言天数"> 天
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configBanned()">确定</a>
            </div>
        </div>


        <!-- 编辑跟进人和备注 -->
        <div class="modal-backdrop in" v-if="editRemark"></div>
        <div id="edtCount2" class="modal" v-if="editRemark" style="width: 1000px;top:20px;margin-left: 0;transform: translateX(-50%)">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                <h3>编辑跟进入和备注</h3>
            </div>
            <div class="modal-body row-fluid" style="max-height: 800px;">
                <div class="form-horizontal">
                    <label class="control-label">跟进人 :</label>
                    <div class="controls form-horizontal">

                        <div class="clearfix">
                            <select class="normal-sw" style="cursor: pointer;" name="" id="" v-model="editRemRes" :disabled="!isUserCanEdit">
                                <option value="">空</option>
                                <option v-for="item in tiringRoomUserList" :value="item.showName">{{ item.showName }}</option>

                            </select>
                        </div>

                        <!--<input type="text" class="span11 username" v-model="editRemRes" name="editRemRes"-->
                               <!--placeholder="请输入跟进人姓名">-->
                    </div>
                </div>
                <div class="form-horizontal">
                    <label class="control-label">备注 :</label>
                    <div class="controls form-horizontal">
                        <textarea style="margin: 0px; width: 500px; height: 100px;" v-model="editRemRem" :disabled="!isUserCanEdit"></textarea>
                    </div>
                </div>
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
                                            <span class="item_title_btn" onclick="file0.click()" v-if="! sending0">上传</span>
                                            <span class="item_title_btn_sending" v-else>上传中...</span>


                                            <input type="file" accept="image/*" @change="readFile" data-type="0" id="file0"
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
                                            <span class="item_title_btn" onclick="file1.click()" v-if="! sending1">上传</span>
                                            <span class="item_title_btn_sending" v-else>上传中...</span>


                                            <input type="file" accept="image/*" @change="readFile" data-type="1" id="file1"
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
                                        <span> {{ screenshotThreeTime  }} </span>

                                        <template v-if="isUserCanEdit">
                                            <span class="item_title_btn" onclick="file2.click()" v-if="! sending2">上传</span>
                                            <span class="item_title_btn_sending" v-else>上传中...</span>

                                            <input type="file" accept="image/*" @change="readFile" data-type="2" id="file2"
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
                                            <span class="item_title_btn" onclick="file3.click()" v-if="! sending3">上传</span>
                                            <span class="item_title_btn_sending" v-else>上传中...</span>

                                            <input type="file" accept="image/*" @change="readFile" data-type="3" id="file3"
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
                    <a data-dismiss="modal" class="btn btn-danger" href="#" v-if="! isSendingRemarkData" @click="saveEditRemarkFn()">保存</a>
                    <a data-dismiss="modal" class="btn btn-danger" href="#" v-else>发送中。。。</a>
                </template>

            </div>
        </div>
        <!--End弹窗内容-->


        <!--新增禁用启用弹窗-->
        <div class="dialog-wrapper" v-if="isEditIsEnableState">
            <div class="dialog-container2">
                <h4>确定要{{ originIsEnableState | editIsEnableFilter }}该用户吗？</h4>
                <div class="btn-wrapper">
                    <div @click="close()">取消</div>
                    <div @click="saveEditIsEnableStateFn" v-if="! isSendingIsEnableData">确定</div>
                    <div @click="saveEditIsEnableStateFn" v-else>发送中</div>


                </div>
            </div>
        </div>






    </div>





</template>
<script type="text/javascript">
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import calendar from "../../calendar.vue"
    import moment from "moment"
    import timeRange from "components/timeRange"
    import picList from "./picList"

    import {
        MemberList,
        updateMember,
        addMember,
        addDisableMessageDays,
        clearDisableMessageDays,
        getlistUser,

        getResponse,
        getResponses,
        getResponsesExcel

    } from '../../api'
    Vue.use(zpagenav)

    Vue.filter("reverse", function (value) {
        return value == '1' ? '普通会员' : '咨询师'
    })

    export default {

        // 	# Options
        // * :show    是否显示
        // * :type    date|datetime
        // * :value	默认值
        // * :begin  可选开始时间
        // * :end    可选结束时间
        // * :x      显示x坐标
        // * :y      显示y坐标
        // * :range  是否多选
        // * :weeks	星期标题
        // * :months	月份标题
        // * :sep		分隔符

        components: {

            calendar,
            timeRange,
            picList
        },
        data() {
            return {
                // 数据绑定
                calendar: {
                    show: false,
                    x: 0,
                    y: 0,
                    picker: "",
                    type: "date",
                    value: "",
                    begin: "",
                    end: "",
                    value: "",
                    weeks: [],
                    months: [],
                    sep: "-",
                    range: false,
                    items: {
                        // 单选模式
                        picker1: {
                            type: "date",
                            end: moment().format().split('T')[0],
                            value: "",
                            sep: "-",
                            weeks: ['日', '一', '二', '三', '四', '五', '六'],
                            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        },
                        picker2: {
                            value: this.start,
                            sep: "-",
                            begin: this.start
                        }
                    }
                },
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                list: [],
                start: '',
                end: '',
                regTimeDirection: '0',
                hasMobile: '', // 新增 有无手机号查询  是否有手机号（0:没有 1:有）
                words: '',
                params: "",
                mid: "",
                uploadPassword: '123456',
                reset: false,
                add: false,
                edit: false,
                addnickname: '',
                addpassw: '',
                addtel: "",
                editnickname: "",
                edittel: '',
                eidtpassword: '',
                infoChannel: '',
                channelList: [],

                BannedPopup: false,
                clearDisabled: false,
                days: "",
                selectPersonList: [],
                selectPersonAll: false,
                recentPageCheckedNumber: '',
                channel1: 0,
                channel2: '',
                channel2List: [],
                isExportingExcel: false,


                editRemark: false,

                editRemRes: '',
                editRemRem: '',
                editRemMid: '',

                isSendingRemarkData: false,

                isEditIsEnableState: false,
                originIsEnableState: '',
                isSendingIsEnableData: false,

                isEnable: '', // isEnable 0正常，1禁用，2禁言

            //    新增截图

                url: `http://${process.env.NODE_ENV == 'production' ? "picture.120xinmao.com/" : "oml9ntix5.qnssl.com/" }`,
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

                screenshotOneTime: '',
                screenshotTwoTime: '',
                screenshotThreeTime: '',
                screenshotFourTime: '',
                tiringRoomUserList: [],
                isUserCanEdit: false,


            }
        },
        // 处理值的传递
        watch: {
            'calendar.value': function (value) {
                this.calendar.items[this.calendar.picker].value = value
                this.calendar.picker == 'picker1' ? this.start = value + ' 00:00:00' : this.end = value + ' 23:59:59'
            },
            page() {

                this.MemberList(this.serialize(this.paramsFn()))
            }
        },
        methods: {
            ddd(start, end) {
                if (start && start.length === 19) {
                    this.start = start
                } else {
                    this.start = ''
                }

                if (end && end.length === 19) {
                    this.end = end
                } else {
                    this.end = ''
                }
            },

            pageHandler(page) {
                //here you can do custom state update
                this.page = page
            },
            createUrl(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },
            changeFn(e) {
                this.checkState = e.target.checked
            },
            searchFn() {
                this.page = 1
                this.selectPersonList = []
                this.search()
            },

            paramsFn() {
                let params = {}

                params.pageIndex = this.page
                params.pageSize = this.maxLink
                this.start && (params.begin = this.start);
                this.end && (params.end = this.end);
                params.regTimeDirection = this.regTimeDirection
                this.words.trim() && (params.words = this.words.trim())

                this.hasMobile && (params.hasMobile = this.hasMobile);
                this.infoChannel && (params.infoChannel = this.infoChannel);
                this.channel2 && (params.memberChannalName = this.channel2);
                (this.channel1 === 0 || this.channel1) && (params.channalType = this.channel1);
                (this.isEnable || this.isEnable ===0) && (params.isEnable = this.isEnable);

                return params


            },
            search() {


                this.MemberList(this.serialize(this.paramsFn()))
            },

            addFn() {
                this.add = true
            },
            editFn(nickname, tel, mid) {

                this.editnickname = nickname
                this.edittel = tel
                this.edit = true
                this.mid = mid

            },
            configEdit() {
                let params = `mid=${this.mid}&userPassword=${this.eidtpassword}&nickname=${this.editnickname}&mobilePhone=${this.edittel}`
                this.updateMember(params)
            },
            uploadPass(mid) {

                this.mid = mid
                this.reset = true
            },

            configAdd() {
                if (this.addtel == '' || !/^1[3,5,7,8][0-9]{9}/.test(this.addtel)) {
                    alert('手机号码填写错误')
                    return false
                }
                let params = `nickname=${this.addnickname}&userPassword=${this.addpassw}&mobilePhone=${this.addtel}`
                this.addMember(params)
            },

            configReset() {

                let params = `mid=${this.mid}&userPassword=${this.uploadPassword}`
                this.updateMember(params)
            },
            serialize(obj) {

                let str = ""
                for (let key in obj) {
                    str += `${key}=${obj[key]}&`
                }
                str = str.slice(0, -1)
                return str

            },
            close() {

                this.reset = false
                this.add = false
                this.edit = false

                this.BannedPopup = false
                this.clearDisabled = false

                this.editRemark = false

                this.isEditIsEnableState = false
            },
            // 打开显示选择器
            open(e, type) {
                // 设置类型
                this.calendar.picker = type
                this.calendar.type = this.calendar.items[type].type
                this.calendar.range = this.calendar.items[type].range
                this.calendar.begin = this.calendar.items[type].begin
                this.calendar.end = this.calendar.items[type].end
                this.calendar.value = this.calendar.items[type].value
                // 可不用写
                this.calendar.sep = this.calendar.items[type].sep
                this.calendar.weeks = this.calendar.items[type].weeks
                this.calendar.months = this.calendar.items[type].months

                this.calendar.show = true
                this.calendar.x = e.target.offsetLeft
                this.calendar.y = e.target.offsetTop + e.target.offsetHeight + 8
            },

            async MemberList(params) {

                let data = await MemberList(params)
                this.list = data.members
                this.total = data.count

                //修改
                this.list.forEach((item) => {   //checkBox
                    Vue.set(item, "checkState", false);
                })

                //修改选中状态
                this.list.forEach((item) => {
                    //当列表中有此id时修改选中状态为选中
                    this.selectPersonList.forEach((v) => {
                        if (item.mid === v) {
                            Vue.set(item, "checkState", true);
                        }
                    })
                })


            },
            async updateMember(params) {
                let data = await updateMember(params)
                if (data.code == 0) {
                    this.MemberList(this.params)
                    this.reset = false
                    this.edit = false
                } else {
                    alert(data.msg)
                    this.reset = false
                    this.edit = false
                }
            },
            async addMember(params) {
                let data = await addMember(params)
                if (data.code == 0) {
                    this.MemberList(this.params)
                    this.add = false
                } else {
                    alert(data.msg)
                    this.add = false
                }
            },

            async addDisableMessageDays() {
                let data = await addDisableMessageDays(`days=${this.days}&mid=${this.mid}`)

                if (data.code === 0) {
                    this.search()
                }

                this.BannedPopup = false
            },

            async clearDisableMessageDays() {
                let data = await clearDisableMessageDays(`mid=${this.mid}`)

                if (data.code === 0) {
                    this.search()
                }

                this.clearDisabled = false
            },

            async getChannel(){
                const data = await getResponse('depression/member/getAllEffectiveInfoChannel.json');

                this.channelList = data.list;
            },

            DisableFn(id) {
                this.mid = id
                this.days = ''
                this.BannedPopup = true
            },

            configClearFn(id) {
                this.mid = id
                this.clearDisabled = true
            },

            configBanned() {
                if (this.days <= 0) {
                    alert('禁言天数不能小于等于0')
                    return false
                }
                this.addDisableMessageDays()
            },

            configClearDisabled() {
                this.clearDisableMessageDays()
            },

            async downloadExcel() {
                let paramsObj = this.paramsFn()

                if (this.selectPersonList.length) {
                    paramsObj.ids = JSON.stringify(this.selectPersonList)
                }

                this.isExportingExcel = true
                let p = this.serialize(paramsObj),
                    data = await getResponsesExcel("depression/member/exportMember.json", p)
                console.log("test:",data)
                let blob = new Blob([data], {
                        'type': 'application/msexcel'
                    }),
                    a = this.$els.a

                a.href = window.URL.createObjectURL(blob)



                a.download = `用户列表.xls`
                a.click()

                this.isExportingExcel = false

                this.selectPersonList = []

                //修改
                this.list.forEach((item) => {   //checkBox
                    Vue.set(item, "checkState", false);
                })

            },

            selectAll() {
                console.log(this.checkAllState)
                // this.checkAllState = !this.checkAllState

                if (!this.checkAllState) {
                    this.list.forEach((item) => {
                        if (!item.checkState) {
                            this.selectPersonList.push(item.mid)
                            item.checkState = true
                        }
                    })

                } else {
                    this.list.forEach((item) => {
                        if (item.checkState) {
                            for (let i = 0; i < this.selectPersonList.length; i++) {
                                if (this.selectPersonList[i] == item.mid) {
                                    this.selectPersonList.splice(i, 1)
                                    item.checkState = false
                                }
                            }

                        }
                    })

                }

            },

            selectPerson(mid, item) {
                console.log(item.checkState);
                item.checkState = !item.checkState

                if (item.checkState) {
                    this.selectPersonList.push(mid)
                } else {
                    for (let i = 0; i < this.selectPersonList.length; i++) {
                        if (this.selectPersonList[i] == mid) {
                            this.selectPersonList.splice(i, 1)
                        }
                    }

                }

                console.log(this.selectPersonList)
            },

            async channelChangeFn() {
                //      当一级渠道改变时获取并修改二级渠道列表
                const data = await getResponses('depression/member/getAllChannalName.json', `channalType=${this.channel1}`)
                console.log(data)
                if (data.code === 0){
                    this.channel2List = data.list

                //    判断当前选中的二级渠道是否在新的二级渠道中
                    let flag = false
                    this.channel2List.forEach((item) => {
                        if (item.memberChannalName === this.channel2) {
                            flag = true
                            return
                        }
                    })

                    if (!flag) {
                        this.channel2 = ''
                    }
                } else {
                    alert(data.msg)
                }


            },

            async editRemarkFn(mid) {

                this.editRemMid = mid
                // 调用用户信息接口
                const data = await getResponses('depression/member/selectById.json', `id=${mid}`)
                if (data.code === 0) {
                    console.log(data)
                    if (data.member.remarks || data.member.remarks === 0) {
                        this.editRemRem =  data.member.remarks
                    } else {
                        this.editRemRem = ''
                    }


                    if (data.member.responsible || data.member.responsible === 0) {
                        this.editRemRes =  data.member.responsible
                    } else {
                        this.editRemRes = ''
                    }

                    // 新增截图功能字段赋值
                    this.id1 = data.member.screenshotOne
                    this.id2 = data.member.screenshotTwo
                    this.id3 = data.member.screenshotThree
                    this.id4 = data.member.screenshotFour

                    this.screenshotOneTime = data.member.screenshotOneTime
                    this.screenshotTwoTime = data.member.screenshotTwoTime
                    this.screenshotThreeTime  = data.member.screenshotThreeTime
                    this.screenshotFourTime = data.member.screenshotFourTime



                    this.editRemark = true

                    // 判断用户是否能编辑
                    if (this.editRemRes && this.editRemRes !== sessionStorage.username) {
                        this.isUserCanEdit = false
                    } else {
                        this.isUserCanEdit = true
                    }


                } else {
                    alert(data.msg)
                }


            },



            async saveEditRemarkFn() {
                let editRemRes = {
                    mid: this.editRemMid
                }

                if (this.editRemRem || this.editRemRem === 0) {
                    editRemRes.remarks = this.editRemRem
                }

                if (!this.editRemRes) {
                    editRemRes.responsible = ''
                } else {
                    editRemRes.responsible = this.editRemRes
                }

                // if (this.editRemRes || this.editRemRes === 0) {
                //     editRemRes.responsible = this.editRemRes
                // }

                // 新增截图功能传参

                this.id1 && (editRemRes.screenshotOne = this.id1);
                this.id2 && (editRemRes.screenshotTwo  = this.id2);
                this.id3 && (editRemRes.screenshotThree  = this.id3);
                this.id4 && (editRemRes.screenshotFour  = this.id4);

                // 新增截图时间传参
                this.screenshotOneTime  && (editRemRes.screenshotOneTime  = this.screenshotOneTime );
                this.screenshotTwoTime  && (editRemRes.screenshotTwoTime  = this.screenshotTwoTime );
                this.screenshotThreeTime  && (editRemRes.screenshotThreeTime  = this.screenshotThreeTime );
                this.screenshotFourTime && (editRemRes.screenshotFourTime = this.screenshotFourTime);



                this.isSendingRemarkData = true

                const data = await getResponses('depression/member/updateById.json', this.serialize(editRemRes))

                if (data.code === 0) {
                    this.editRemark = false
                    this.search()
                } else {
                    alert(data.msg)
                }

                this.isSendingRemarkData = false
            },


            async editIsEnableState(mid) {
                this.editRemMid = mid
                // 调用用户信息接口
                const data = await getResponses('depression/member/selectById.json', `id=${mid}`)
                if (data.code === 0) {
                    console.log(data)
                    if (data.member.isEnable === 0 || data.member.isEnable === 1) {
                        this.originIsEnableState = data.member.isEnable
                        this.isEditIsEnableState = true
                    } else {
                        alert(data.msg)
                    }

                } else {
                    alert(data.msg)
                }
            },

            async saveEditIsEnableStateFn() {
                let params = {
                    mid: this.editRemMid
                };

                params.isEnable = this.originIsEnableState === 0 ? 1 : 0;


                const data = await getResponses('depression/member/updateById.json', this.serialize(params))

                if (data.code === 0) {
                    this.isEditIsEnableState = false
                    this.search()
                } else {
                    alert(data.msg)
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
                            this.screenshotTwoTime  = moment().format('YYYY-MM-DD HH:mm:ss');
                            break;
                        case 3:
                            this.screenshotThreeTime  = moment().format('YYYY-MM-DD HH:mm:ss');
                            break;
                        case 4:
                            this.screenshotFourTime = moment().format('YYYY-MM-DD HH:mm:ss');
                            break;

                        default:
                            alert("出问题了！");
                            break;

                    };


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

            async getlistUser(){

                let params = `pageIndex=1&pageSize=10000`

                let data = await getlistUser(params)
                this.tiringRoomUserList = data.list
            },

        },
        filters: {
            isEnableFilter(tag) {
                let arr = ['正常', '已禁用']
                return arr[tag]
            },



            editIsEnableFilter(tag) {
                return ['禁用', '启用'][tag]
            }


        },

        computed: {
            checkAllState: function() {
                this.recentPageCheckedNumber = 0
                for (let i = 0; i < this.list.length; i++) {
                    for (let j = 0; j < this.selectPersonList.length; j++) {
                        if (this.list[i].mid === this.selectPersonList[j]) {
                            this.recentPageCheckedNumber++;
                            break;
                        }
                    }
                }
                return !!this.list.length && this.recentPageCheckedNumber === this.list.length
            }

        },
        ready() {
            document.title = "用户列表"
            this.search();
            this.getChannel();
            this.channelChangeFn();
            this.getToken();
            this.getlistUser()
        }
    }
</script>
<style scoped>
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