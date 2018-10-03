<template>
    <div class="container-fluid">
        <div class="tab-cont">
            <ul class="tagTit">
                <li :class="{'show': switchTab === 0 }" @click="switchFn(0)">促销活动</li>
                <li :class="{'show': switchTab === 1 }" @click="switchFn(1)">近期热门</li>
                <li :class="{'show': switchTab === 2 }" @click="switchFn(2)">推荐专家</li>
            </ul>
        </div>

        <div v-if="switchTab === 0">
            <div class="widget-box">
            	<keep-alive>
	            	<div :is="currentView"></div>
	            </keep-alive>
            </div>
        </div>

        <div v-if="switchTab === 1">
        	<!-- 近期热门页面（一） -->
            <div class="widget-box" v-if="addOrUpdateRecView === 0">
				<div id="search" class="title">
					<input type="text" name="searchVal" placeholder="请输入姓名或者手机号"  v-model="searchVal" >
					<input type="submit" value="搜索" class="btn btn-success" @click="search()" style="margin-right:50px;">

					<select v-model="searchIsEnable" name="searchIsEnable">
						<option value="">------请选择状态------</option>
						<option value="0">启用</option>
						<option value="1">停用</option>
					</select>

					<input class="input" size="50" type="text" @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="请选择日期" id="searchTime" name="searchTime">
					<calendar
					    :show.sync="calendar.show"
					    :type="calendar.type"
					    :value.sync="calendar.value"
					    :x="calendar.x"
					    :y="calendar.y"
					    :begin.sync="calendar.begin"
					    :end.sync="calendar.end"
					    :range.sync="calendar.range"
					    :weeks="calendar.weeks"
					    :months="calendar.months"
					    :sep="calendar.sep">
					</calendar>
					<button class="btn btn-success" style="float:right;margin-top:2px;cursor:pointer;" @click="switchViewFn(1)">{{addOrUpdateRecText}}</button>
				</div>
            	<!-- 表格展示 -->
            	<table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
		            <thead>
		                <tr>
		                    <th>
		                        <div class="checkbox">
		                            <!-- <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox" @click="">
		                            <label for="title-table-th" class="checkboxLabel"></label> -->
		                            选中
		                        </div>
		                    </th>
		                    <th>更新时间</th>
		                    <th>姓名</th>
		                    <th>手机号</th>
		                    <th>性别</th>
		                    <th>服务类型</th>
		                    <th>擅长领域</th>
		                    <th>推荐语</th>
		                    <th>所在地</th>
		                    <th>状态</th>
		                    <th>操作</th>
		                </tr>
		            </thead>
		            <tbody>
		                <tr v-for="item in data">
		                    <td>
		                        <div class="checkbox">
		                            <input type="checkbox"
		                            class="checkboxInp"
		                            name="title-table-checkbox"
		                            id="title-table-td{{item.mid}}"
		                            :checked=" item.checkState? 'checked':''"
		                            @click='selectPerson(item.mid,item)'
		                            data-typeId="{{item.mid}}">
		                            <label class="checkboxLabel" for="title-table-td{{item.mid}}"></label>
		                        </div>
		                    </td>
		                   	<td>{{item.addLivenessTime}}</td>
		                   	<td>{{item.nickname}}</td>
		                   	<td>{{item.mobilePhone}}</td>
		                   	<td>{{item.sex | sexType}}</td>
		                   	<td>{{item.pLevel===0?"专业咨询":"轻咨询"}}</td>
		                   	<td><span v-for="item in item.psychoTags">{{item.tagName + "&nbsp;&nbsp;&nbsp;"}} </span></td>
		                   	<td>{{item.recommendWords}}</td>
		                   	<td>{{item.location}}</td>
		                   	<td>{{item.isEnable === 0 ? "启用":"停用"}}</td>
		                    <td v-if="item.isEnable">
		                       	<span style="cursor:pointer;" @click="editEnableStateFn(item.mid,item.nickname)">启用</span>
		                    </td>
		                    <td v-else>
		                    	<span style="cursor:pointer;" @click="editRecFn(item.recommendWords,item.mid)">修改推荐语</span>
								<span style="cursor:pointer;" @click="editDisableStateFn(item.mid,item.nickname)">停用</span>

		                    </td>
		                </tr>
		            </tbody>
		        </table>
				<div class='bottom'>
					<!-- 分页 -->
		            <div class="page">
		                <div id="test">
		                    <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl" ><zpagenav>
		                </div>
		            </div>
		            <div>
		                <button class="btn-success" style="font-size:14px;" @click="downloadExcel">导出Excel</button>
		                <a href="javascript:;" v-el:a></a>
		            </div>
		        </div>
            </div>

            <!-- start 修改推荐语 -->
            <div class="modal-backdrop in"  v-if="editRecommendTextWindow" style="opacity:1">
                <div id="myAlert" class="modal">
                    <div class="modal-header">
                        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                        <h2>修改推荐语</h2>
                    </div>
                    <div class="modal-body form-horizontal">
                        <div class="control-group bn">
                            <label class="control-label" style="width: 160px;">请修改推荐语：</label>
                            <div class="controls">
                               <input type="text" v-model="editRecommendText">
                            </div>
                       </div>

                       <button type="button" class="btn btn-default" @click="close()">取消</button>

                       <button style="float:right" type="button" class="btn btn-success" @click="configEdit()">保存</button>
                   </div>
               </div>
            </div>
            <!-- end 修改推荐语 -->

			<!-- start 点击停用切换为启用 -->
            <div class="modal-backdrop in"  v-if="disableState" style="opacity:1">
                <div id="myAlert" class="modal">
                    <div class="modal-header">
                        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                        <h2>停用专家</h2>
                    </div>
                    <div class="modal-body form-horizontal">
                        <div class="control-group bn">
                        	<p v-if="isNumberLessThenThree" style="text-align:center;margin-bottom:30px;color:red;">注意，专家不足3位时，『近期热门』将从App上隐藏哦！</p>
                           	<p v-else style="text-align:center;margin-bottom:30px;">您确定停用专家{{"『" + editNickname  + "』"}}？</p>
                       </div>
                       <button type="button" class="btn btn-default" @click="close()">取消</button>
                       <button style="float:right" type="button" class="btn btn-success" @click="switchState(1, 0)">停用</button>
                   </div>
               </div>
            </div>
            <!-- end 点击停用切换为启用 -->

			<!-- start 点击启用切换为停用 -->
            <div class="modal-backdrop in"  v-if="enableState" style="opacity:1">
                <div id="myAlert" class="modal">
                    <div class="modal-header">
                        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                        <h2>启用专家</h2>
                    </div>
                    <div class="modal-body form-horizontal">
                        <div class="control-group bn">
                           	<p style="text-align:center;margin-bottom:30px;">您确定启用专家{{"『" +  editNickname + "』"}}？</p>
                       </div>
                       <button type="button" class="btn btn-default" @click="close()">取消</button>
                       <button style="float:right" type="button" class="btn btn-success" @click="switchState(0, 1)">启用</button>
                   </div>
               </div>
            </div>
            <!-- end 点击启用切换为启用 -->

            <!-- start 添加专家到热门推荐 -->
            <div class="modal-backdrop in"  v-if="addLivenessMemberWindow" style="opacity:1">
                <div id="myAlert" class="modal">
                    <div class="modal-header">
                        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                        <h2>添加专家到热门推荐</h2>
                    </div>
                    <div class="modal-body form-horizontal">
                       	<div class="control-group bn">
                            <p v-if="isAddAlone" style="text-align:center;margin-bottom:30px;">您确定将专家{{"『" + editNickname  + "』"}}添加到热门推荐吗？</p>
                            <p v-else style="text-align:center;margin-bottom:30px;">您确定将选中的专家添加到热门推荐吗？</p>

                       	</div>
                       	<button type="button" class="btn btn-default" @click="close()">取消</button>
                       	<button v-if="isAddAlone" style="float:right" type="button" class="btn btn-success" @click="confirmToAddLivenessMemberAloneFn()">确定</button>
                       	<button v-else style="float:right" type="button" class="btn btn-success" @click="confirmToAddLivenessMemberSelectedFn()">确定</button>
                   </div>
               </div>
            </div>
            <!-- end 添加专家到热门推荐 -->

			<!-- 近期热门页面（二） -->
            <div class="widget-box" v-if="addOrUpdateRecView === 1">
            	<div id="search" class="title">
            		<span style="display:inline-block;padding:10px;">以下专家为近期热门，点击『添加到推荐』即可展示在用户端APP。（最近一次更新：{{latestRefreshTime}}）</span>
            		<button class="btn btn-success" style="float:right;cursor:pointer;margin:5px;" @click="switchViewFn(0)">&lt;&lt;&nbsp;返回</button>

				</div>

				<!-- 专家列表 -->
            	<table class="table table-bordered table-striped with-check" id="DataTables_Table_1">
		            <thead>
		                <tr>
		                    <th>
		                        <div class="checkbox">
		                            <!-- <input type="checkbox" id="title-table-th-1" class="checkboxInp" name="title-table-checkbox" @click="">
		                            <label for="title-table-th" class="checkboxLabel"></label> -->
		                            选中
		                        </div>
		                    </th>
		                    <th>入驻时间</th>
		                    <th>姓名</th>
		                    <th>手机号</th>
		                    <th>性别</th>
		                    <th>服务类型</th>
		                    <th>擅长领域</th>
		                    <th>所在地</th>
		                    <th>推荐语</th>
		                    <th>热门指数</th>
		                    <th>操作</th>
		                </tr>
		            </thead>
		            <tbody>
		                <tr v-for="item in allLivenessLists">
		                    <td>
		                        <div class="checkbox">
		                            <input type="checkbox"
		                            class="checkboxInp"
		                            name="title-table-checkbox"
		                            id="title-table-td{{item.mid}}"
		                            :checked=" item.checkState? 'checked':''"
		                            @click='selectPerson2(item.mid,item)'
		                            data-typeId="{{item.mid}}">
		                            <label class="checkboxLabel" for="title-table-td{{item.mid}}"></label>
		                        </div>
		                    </td>
		                   	<td>{{item.regTime}}</td>
		                   	<td>{{item.nickname}}</td>
		                   	<td>{{item.mobilePhone}}</td>
		                   	<td>{{item.sex | sexType}}</td>
		                   	<td>{{item.pLevel===0?"专业咨询":"轻咨询"}}</td>
		                   	<td><span v-for="item in item.psychoTags">{{item.tagName + "&nbsp;&nbsp;&nbsp;"}} </span></td>
		                   	<td>{{item.location}}</td>
		                   	<td>{{item.recommendWords}}</td>
		                   	<td>{{item.livenessFactor}}</td>
		                    <td>
								<span style="cursor:pointer;" @click="addLivenessMemberAloneFn(item.mid)">添加到热门</span>
		                    </td>
		                </tr>
		            </tbody>
		        </table>

		        <div class='bottom'>
		            <div id="test" class="myPagenav">
		                <zpagenav   :page="search_page",
		                            :page-size="search_pageSize",
		                            :total="search_total",
		                            :max-link="maxLink"
		                            :page-handler="search_pageHandler"
		                            :create-url="search_createUrl"
		                        >
		                <zpagenav>
		            </div>
		            <div>
		            	<button class="btn btn-success"  @click="addLivenessMemberSelectedFn()">添加到热门</button>
		            </div>
		        </div>
            </div>

        </div>

		<div v-if="switchTab === 2">
			<div class="widget-box">
				<counselor-com></counselor-com>
			</div>
		</div>
    </div>   
</template>
<script type="text/javascript">
	import $ from "jquery"
	import Vue from "vue"
	import zpagenav from "vue-pagenav"
	import counselorRec from "./counselorRec.vue"
	import calendar from "../../calendar.vue"
	import moment from "moment"
	import counselorCom from "./counselorCom.vue"
	import {
		obtainLivenessMemberList,
		updateLivenessMember,
		getAllLivenessMemberList,
		addLivenessMember,
		countEnableLivenessPsycho,
		exportLivenessMemberList
	} from "../../api.js"
	Vue.use(zpagenav)

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
			counselorRec,
            counselorCom,
            calendar,
		},
		data() {
			return {
				calendar:{
	                show:false,
	                x:0,
	                y:0,
	                picker:"",
	                type:"date",
	                value:"",
	                begin:"",
	                end:"",
	                value:"",
	                weeks:[],
	                months:[],
	                sep:"-",
	                range:false,
                    editDailyNumber:"",
	                items:{
	                    // 单选模式
	                    picker1:{
	                        type:"date",
	                        end:moment().format().split('T')[0],
	                        value:"",
	                        sep:"-",
	                        weeks:['日', '一', '二', '三', '四', '五', '六'],
	                        months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	                    }
	                }
	            },
				switchTab: 0, //0 表示免费活动   1 表示近期热门  2 表示心猫大咖
				currentView: "counselor-rec",
				addOrUpdateRecText:"添加热门推荐",
				addOrUpdateRecView:0, //0 表示近期热门列表页面  1 表示添加热门推荐页面
				// 最近一次更新时间
				latestRefreshTime:"",
				searchVal:"",
				searchIsEnable:"",
				searchTime:"",
				data:[],
				page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                isEnable: 0,
                editRecommendText:"",
                editRecommendTextWindow:false,
                editId:"",
                editNickname:"",
                disableState:false,
                enableState:false,
                //用户状态
                state:0,
                // 获取启用热门推选专家数量
                enableLivenessPsychoNumber: 0,
                isNumberLessThenThree:false,
                // 在近期热门页面一中选中的选项
                selectPersonList:[],
                search_pageSize:10,
            	search_page: 1,
            	search_total: 2,
            	params:"",
            	updateParams:"",

            	// 近期热门专家列表
            	allLivenessLists:[],
            	params2:"",
            	selectPersonList2:[],
            	addLivenessMemberWindow:false,
            	addParams:"",
            	isAddAlone:true //true表示单独添加，false表示数组添加

			}
		},
		methods: {
			// 打开显示选择器（日历组件相关）
	        open(e,type) {
	            // 设置类型
	            this.calendar.picker=type
	            this.calendar.type=this.calendar.items[type].type
	            this.calendar.range=this.calendar.items[type].range
	            this.calendar.begin=this.calendar.items[type].begin
	            this.calendar.end=this.calendar.items[type].end
	            this.calendar.value=this.calendar.items[type].value
	            // 可不用写
	            this.calendar.sep=this.calendar.items[type].sep
	            this.calendar.weeks=this.calendar.items[type].weeks
	            this.calendar.months=this.calendar.items[type].months

	            this.calendar.show=true
	            this.calendar.x=e.target.offsetLeft
	            this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8
	        },
	        
			pageHandler(page) {
                //here you can do expertsActivity update
                this.page = page
            },
            createUrl(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },
            search_pageHandler: function(page) {
	            this.search_page = page
	        },
	        search_createUrl: function(unit) {
	            return unit.search_page > 1?'#search_page=' + unit.search_page:'#'
	        },
			switchFn(id) {
				this.switchTab = id
			},
			switchViewFn(id) {
				this.addOrUpdateRecView = id
				id === 0 && this.search()
				id === 1 && this.search2()
			},

			//初始化近期热门第一个页面数据
			search() {
				this.page = 1
				this.selectPersonList = []
				let paramsObj = {
                    "pageIndex": this.page,
                    "pageSize":  this.maxLink,
                    "words":     this.searchVal.trim(),
                    "time":      this.searchTime,
                    "isEnable":  this.searchIsEnable
                }
                this.params = this.serialize(paramsObj)
                this.obtainLivenessMemberListFn(this.params)

			},

			page1Change() {
				let paramsObj = {
                    "pageIndex": this.page,
                    "pageSize":  this.maxLink,
                    "words":     this.searchVal.trim(),
                    "time":      this.searchTime,
                    "isEnable":  this.searchIsEnable
                }
                this.params = this.serialize(paramsObj)
                this.obtainLivenessMemberListFn(this.params)

			},

			//初始化近期热门第二个页面数据
			search2 () {
				this.search_page = 1
				this.selectPersonList2 = []
				let paramsObj = {
                    "pageIndex": this.search_page,
                    "pageSize": this.maxLink
                }
                this.params2 = this.serialize(paramsObj)
                console.log("test:",this.params2)
                this.getAllLivenessMemberListFn(this.params2)

			},

			page2Change() {
				let paramsObj = {
                    "pageIndex": this.search_page,
                    "pageSize": this.maxLink
                }
                this.params2 = this.serialize(paramsObj)
                console.log("test:",this.params2)
                this.getAllLivenessMemberListFn(this.params2)
			},

			//获取近期热门第一个页面数据
			async obtainLivenessMemberListFn(params) {
				let dataLists = await obtainLivenessMemberList(params)
				if(dataLists && dataLists.code == 0) {
					this.data = dataLists.psychoDTOs
					this.total = dataLists.count
					this.countEnableLivenessPsychoFn()
					this.data.forEach((item) => {
						Vue.set(item,"addLivenessTime", moment(item.addLivenessTime).format("D/M"))
					})
					//修改
	                this.data.forEach((item) => {   //checkBox
	                    Vue.set(item, "checkState", false);
	                })
					//修改选中状态
	                this.data.forEach((item) => {
	                    //当列表中有此id时修改选中状态为选中
	                    this.selectPersonList.forEach((v) => {
	                        if (item.mid == v) {
	                            Vue.set(item, "checkState", true);
	                        }
	                    })
	                })
				} else {
					alert(dataLists.msg)
				}
				
			},
			
			// 获取近期热门第二个页面数据
			async getAllLivenessMemberListFn(params) {
				let dataLists = await getAllLivenessMemberList(params)
				if(dataLists && dataLists.code == 0) {
					this.countEnableLivenessPsychoFn()
					this.allLivenessLists = dataLists.psychoDTOs
					this.search_total = dataLists.count
					this.latestRefreshTime = dataLists.refreshTime
					// 修改最近更新时间格式
					this.latestRefreshTime = moment(dataLists.refreshTime).format("M月D日")

					//修改
	                this.allLivenessLists.forEach((item) => {   //checkBox
	                    Vue.set(item, "checkState", false);
	                })
					//修改选中状态
	                this.allLivenessLists.forEach((item) => {
	                    //当列表中有此id时修改选中状态为选中
	                    this.selectPersonList2.forEach((v) => {
	                        if (item.mid == v) {
	                            Vue.set(item, "checkState", true);
	                            console.log(item.checkState)
	                        }
	                    })
	                })
				} else {
					alert(dataLists.msg)
				}
				
			},
			selectPerson(id, item) {
                item.checkState = !item.checkState
                if (item.checkState) {
                    this.selectPersonList.push(id)
                } else {
                   	this.selectPersonList.$remove(id)
                }
            },
            selectPerson2(id, item) {
                item.checkState = !item.checkState
                if (item.checkState) {
                    this.selectPersonList2.push(id)
                } else {
                   	this.selectPersonList2.$remove(id)
                }
            },
			editRecFn(text, id) {
				this.editRecommendText = text
				this.editId = id
				this.editRecommendTextWindow = true
			},
			close() {
				this.editRecommendTextWindow = false
				this.disableState = false
				this.enableState = false
				this.addLivenessMemberWindow = false
			},
			async updateLivenessMemberFn(params) {
				let data = await updateLivenessMember(params)
				console.log(data)
				if (data.code == 0) {
	                //更新页面
	                console.log("更新页面")
	                this.editId = ""
	                this.editNickname = ""
	                this.editRecommendText = ""
	                this.page1Change()
	            } else {
	                alert(data.msg);
	            }
			},

			async countEnableLivenessPsychoFn() {
				let data = await countEnableLivenessPsycho()
				console.log("数量：",data)
				if (data.code == 0) {
	                //更新页面
	                this.enableLivenessPsychoNumber = data.count
	                this.addOrUpdateRecText = this.enableLivenessPsychoNumber > 0 ?  "更新热门推荐" : "添加热门推荐"
	                this.isNumberLessThenThree = this.enableLivenessPsychoNumber <= 3 ? true : false

	            } else {
	                alert(data.msg);
	               
	            }
			},

			configEdit() {
				this.editRecommendTextWindow = false
				//调用接口保存修改后的推荐语
				let paramsObj = {
                    "mid": this.editId,
                    "recommendWords": this.editRecommendText
                }
                this.updateParams = ""
                this.updateParams = this.serialize(paramsObj)
                this.updateLivenessMemberFn(this.updateParams)
			},
			editDisableStateFn(id, name) {
				this.editId = id
				this.editNickname = name
				this.disableState = true
			},
			editEnableStateFn(id, name) {
				this.editId = id
				this.editNickname = name
				this.enableState = true
			},
			switchState(oldState, newState) {
				this.state = oldState
				this.disableState = false
				this.enableState = false

				//调用更新接口
				let paramsObj = {
                    "mid": this.editId,
                    "isEnable": this.state
                }
                this.updateParams = ""
                this.updateParams = this.serialize(paramsObj)
                this.updateLivenessMemberFn(this.updateParams)
			},
			
			//导出到excel
            async downloadExcel() {
                let params = {}
                // 此处根据导出所需条件改变params的值
                if(this.selectPersonList.length > 0) {
                    let ids = JSON.stringify(this.selectPersonList);
                    params.ids = ids
                } else {
                	if(this.searchIsEnable !== "") {
	                	params.isEnable = this.searchIsEnable
	                }
	                if(this.searchVal.trim() !== "") {
	                	params.words = this.searchVal.trim()
	                }
	                if(this.searchTime !== "") {
	                	params.time = this.searchTime
	                }
                }
                console.log(params)
                let p = this.serialize(params)
                console.log("p:",p)
                let data = await exportLivenessMemberList(p) 
                console.log(data)
                let blob = new Blob([data], {
                        'type': 'application/msexcel'
                    }),
                    a = this.$els.a
                a.href = window.URL.createObjectURL(blob)
                a.download = `近期热门.xls`
                a.click()
            },
            serialize(hash) {
                let result = []
                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })
                return result.join("&")
            },

            //添加到热门
            addLivenessMemberAloneFn(id) {
            	this.isAddAlone = true
            	this.editId = id
            	this.addLivenessMemberWindow = true
            },
            confirmToAddLivenessMemberAloneFn() {
            	let arr = [this.editId]
            	let params = {}
            	params.ids = JSON.stringify(arr)
            	this.addParams = this.serialize(params)
            	this.addLivenessMemberFn(this.addParams)
            	this.addLivenessMemberWindow = false
            },

            async addLivenessMemberFn(params) {
            	let data = await addLivenessMember(params)
            	console.log("添加结果：",data)
            	if (data.code == 0) {
	                this.editId = ""
	                this.selectPersonList2 = []
	                this.search2()
	            } else {
	                alert(data.msg);
	            }
            },

            addLivenessMemberSelectedFn() {
            	if (this.selectPersonList2.length == 0) {
                    alert('请先选择将添加的专家！');
                } else {
                    console.log(this.selectPersonList2);
                    this.isAddAlone = false
            		this.addLivenessMemberWindow = true
                }
            },

            confirmToAddLivenessMemberSelectedFn() {
            	let arr = JSON.stringify(this.selectPersonList2);
                let paramsObj = {
                    "ids": arr
                }
                this.addParams = this.serialize(paramsObj)
            	this.addLivenessMemberFn(this.addParams)
            	this.addLivenessMemberWindow = false
            },
		},
		watch: {
			'calendar.value': function (value) {
	            this.calendar.items[this.calendar.picker].value = value
	            this.searchTime = value + ' 00:00:00'
	        },
			page () {
				this.page1Change()
			},
			search_page (){
	            this.page2Change()
	        },
			searchIsEnable() {
				this.search()
			},
			searchTime() {
				this.search()
			}
		},
		filters: {
            sexType(tag) {
                let arr = ['未知', '男', '女']
                return arr[tag]
            }
        },
		ready() {
			this.search()
			this.search2()
			this.countEnableLivenessPsychoFn()
		}
	}
</script>
<style type="text/css" scope>
	.bottom .btn {
		height:inherit;
		line-height: 20px;
		vertical-align: center;
		padding:5px;
		margin:5px;
	}
</style>
