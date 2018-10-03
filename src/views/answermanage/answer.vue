<template>

	<div class="container-fluid">
		<div id="search" class="title">
			<input class="input" size="50" type="text" @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">
			-
			<input class="input" size="50" type="text" @click.stop="open($event,'picker2')" v-model="calendar.items.picker2.value" placeholder="结束时间" id="end" name="end">
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
			<select v-model="tagId" name="tagId">
				<option v-for="item of select" value="{{ item.tagId }}"> {{ item.phrase}} </option>
			</select>
			<input type="submit" value="确定搜索" class="btn btn-warning" @click="seach()">
			<a :href="url" download="咨询师入驻.xls" class="btn btn-success " style="float:right" @click="exportHandler">导出excel</a>
		</div>
		
		 <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
                <tr>
                    <th class="not-print">
                    	<div class="checkbox">
                    		<input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox"  :checked="checkState" @click="changeFn">
                        	<label for="title-table-th" class="checkboxLabel"></label>
                    	</div>
                    </th>
                    <th>问题</th>
                    <th>咨询师回答</th>
                    <th>标签</th>
                    <th>浏览量</th>
                    <th>点赞量</th>
                    <th>状态</th>
                    <th class="not-print">操作</th>
                </tr>
            </thead>
            <tbody>
            	<tr v-for="item in list">
				    <td class="not-print">
				    	<div class="checkbox">
                    		<input type="checkbox" id="title-table-td{{item.askId}}" class="checkboxInp" name="title-table-checkbox"  :checked="checkState"  data-typeid="{{ item.askId }}">
				        	<label for="title-table-td{{item.askId}}" class="checkboxLabel"></label>
                    	</div>
				    </td>
				    <td title="{{ item.askContent }}"> <span class="not-space">{{ item.askContent }}</span> </td>
                    <td title="{{ item.answerContent }}"><span class="not-space">{{ item.answerContent }} </span></td>
				    <td>{{ item.tagName }}</td>
				    <td>{{ item.viewNum}}</td>
				    <td>{{ item.praiseNum}}</td>
                    <td>{{item.isEnable | isEnableFliter}}</td>
				    <td class="not-print">
                        <!-- <a class="btn btn-info" href="/newanswer/{{item.askId}}">编辑</a> -->
				    	<a class="btn btn-info" href="javascript:;" @click="changeRoute(`/newanswer/${item.askId}`)">编辑</a>
                        <a href="javascript:;" class="btn btn-success" @click="ButEnableState(0, item.askId)" v-if=" item.isEnable != 0">启用 </a>
                        <a href="javascript:;" class="btn btn-danger" @click="ButDisableStage(1, item.askId)" v-else>禁用</a>
				    </td>
				</tr>
			</tbody>
		</table>
		<div class="page">
			<div id="test">
                <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl" ><zpagenav>
            </div>
            
            <a class="btn btn-warning" href="javascript:;" @click="changeRoute('newanswer')">新增</a>
		</div>
	</div>


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

</template>
<script type="text/javascript">
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import calendar from "../../calendar.vue"
    import moment from "moment"
    import $ from "jquery"
    import utils from "../../utils"

    import {
        getTagList,
        listAdvisoryCuration,
        advisorychangeStatusSingle
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
            calendar
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
                            type: "datetime",
                            end: moment().format().split('T')[0],
                            value: "",
                            sep: "-",
                            weeks: ['日', '一', '二', '三', '四', '五', '六'],
                            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        },
                        picker2: {
                            type: "datetime",
                            sep: "-",
                            value: this.start,
                            begin: this.start
                        }
                    }
                },
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                list: [],
                select: [],
                start: '',
                end: '',
                tagId: '',
                disable: '',
                disableStage: '',
                enableState: '',
                checkState: '',
                askId: "",
                state: '',
                table: ''

            }
        },
        // 处理值的传递
        watch: {
            'calendar.value': function(value) {

                this.calendar.items[this.calendar.picker].value = value

                this.calendar.picker == 'picker1' ? this.start = value : this.end = value
            },
            page() {

                let params = `tagId=${this.tagId}&pageIndex=${this.page}&pageSize=${this.maxLink}&begin=${this.start}&end=${this.end}`
                this.listAdvisoryCuration(params)
                this.checkState = false
                    //this.tableFn()
            }
        },
        filters: {
            format(value) {
                let array = ["男", "女"]

                return array[value]
            }
        },

        methods: {

            changeRoute(url) {
                this.$route.router.go(url)
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
            templateText(data) {
                let self = this
                return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">\
				<head>
				<xml>
				  <x:ExcelWorkbook>
				    <x:ExcelWorksheets>
				      <x:ExcelWorksheet>
				        <x:Name>{{worksheet}}</x:Name>
				        <x:WorksheetOptions>
				          <x:DisplayGridlines/>
				        </x:WorksheetOptions>
				      </x:ExcelWorksheet>
				    </x:ExcelWorksheets>
				  </x:ExcelWorkbook>
				</xml><![endif]-->
				</head>
				<body>
					<table>
						${data}
					</table>
				</body>
			</html>`
            },
            base64(string) {
                return window.btoa(unescape(encodeURIComponent(string)))
            },

            tableToExcel: function(tableList, name) {
                let tables = []
                let uri = 'data:application/vnd.ms-excel;base64,'

                for (var i = 0; i < tableList.length; i++) {
                    tables.push(tableList[i].innerHTML);
                }
                var data = {
                    worksheet: name || 'Worksheet',
                    tables: tables
                };


                this.table = ''
                return uri + this.base64(this.templateText(data.tables));
            },

            exportHandler(event) {
                this.tableFn()
                event.currentTarget.href = this.tableToExcel(this.table, '用户数据');
            },


            tableFn() {

                let tables = $('table:visible')
                let self = this
                tables.each(function(i) {
                    var t = $('<table><thead></thead><tbody></tobdy></table>');
                    t.find('thead').html(this.tHead.innerHTML);
                    t.find('tbody').append($(this.tBodies).children(':visible').clone());
                    t.find('tbody tr').each(function() {
                        if (!$(this).find('input:checkbox').is(':checked')) {
                            $(this).addClass('not-print')
                        }
                    })
                    t.find('.not-print').remove(); // not-print 是@media print中不会打印的部分

                    t.find('a').replaceWith(function(i) { // 表格中不再需要的超链接也移除了
                        return this.innerHTML;
                    });
                    self.table = self.table ? self.table.add(t) : t;

                });

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

            seach() {

                let params = `tagId=${this.tagId}&pageIndex=${this.page}&pageSize=${this.maxLink}&begin=${this.start}&end=${this.end}`

                this.listAdvisoryCuration(params)
            },

            ButDisableStage(state, askId) {

                this.disableStage = true //禁用

                this.askId = askId

            },


            ButEnableState(state, askId) {
                this.enableState = true //启用
                this.askId = askId
            },

            btnSwitchState(state) {

                this.state = state
                let params = `id=${this.askId}&isDel=${this.state}`
                this.advisorychangeStatusSingle(params)

            },
            close() {
                this.enableState = false
                this.disableStage = false
            },

            async advisorychangeStatusSingle(params) {

                let data = await advisorychangeStatusSingle(params)

                this.enableState = false
                this.disableStage = false

                if (data.code == 0) {
                    this.listAdvisoryCuration()
                } else {
                    alert(data.msg)
                }
            },


            async getTagList() {
                let data = await getTagList()
                if (data.code == 0) {
                    this.select = data.list
                } else {
                    alert(data.msg)
                }

            },
            async listAdvisoryCuration(params = `pageIndex=${this.page}&pageSize=${this.maxLink}`) {
                let data = await listAdvisoryCuration(params)

                if (data.code == 0) {
                    this.list = data.list
                    this.total = data.count
                } else {
                    alert(data.msg)
                }
            }
        },
        filters: {
            isEnableFliter(tag) {
                let arr = ['启用', '禁用']
                return arr[tag]
            }
        },
        ready() {
            this.listAdvisoryCuration()
            this.getTagList()
        }
    }
</script>