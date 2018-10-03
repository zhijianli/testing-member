<template>

	<div class="container-fluid">
		<div id="search" class="title">
			<span>提问时间：</span>
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
					:sep.sync="calendar.sep">
			</calendar>
			<span>类别标签：</span>
			<select v-model="tagId" name="tagId">
				<option value="">全部</option>
				<option v-for="item of select" value="{{ item.tagId }}"> {{ item.phrase}} </option>
			</select>

			<!-- TODO 新增搜索字段 3 个 -->
			<div class="normal-div-ib">
				<span class="normal-span-mr">手机号：</span>
				<input type="text" name="" v-model="advPhone"/>
			</div>

			<div class="normal-div-ib">
				<span class="normal-span-mr">标题：</span>
				<input type="text" name="" v-model="title"/>
			</div>
			<div style="display: inline-block">
				<span>排序方式：</span>
				<select v-model="sortType">
					<!--默认为时间逆序-->
					<option :value="0">时间逆序</option>
					<option :value="1">回答数</option>
					<option :value="2">阅读数</option>
					<option :value="3">锦旗数</option>
				</select>
			</div>


			<input type="submit" value="确定搜索" class="btn btn-warning" @click="search()">
			<a download="咨询师入驻.xls" class="btn btn-success " style="float:right" @click="exportHandler">导出excel</a>
			<a href="javascript:;" v-el:a></a>
		</div>

		<table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
			<thead>
			<tr>
				<th class="not-print">
					<div class="checkbox">
						<input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-th"
							   @click='selectAll' :checked="checkAllState">
						<label for="title-table-th" class="checkboxLabel"></label>
					</div>
				</th>
				<th>提问时间</th>
				<th>手机号</th>
				<th>昵称</th>
				<!--<th>提问用户账号</th>-->
				<th>类别标签</th>
				<th style="width: 11em;">标题</th>
				<th style="width: 21em;">问题正文</th>
				<th>锦旗数</th>
				<th>回答数</th>
				<th>用户回复数</th>
				<th>阅读数</th>
				<th>虚假阅读数</th>
				<th>权重(小时)</th>
				<th class="not-print">查看详情</th>

			</tr>
			</thead>
			<tbody>
			<tr v-for="(index,item) in list">
				<td class="not-print">
					<div class="checkbox">
						<input type="checkbox" id="title-table-td{{item.advisoryId}}" class="checkboxInp" name="title-table-checkbox"
							   :checked=" item.checkState? 'checked':''"  data-typeid="{{ item.advisoryId }}" @click='selectPerson(item.advisoryId, item)'>
						<label for="title-table-td{{item.advisoryId}}" class="checkboxLabel"></label>
					</div>
				</td>
				<!-- <td class="not-print"><a href="/consulting/{{ item.advisoryId }}">查看详细</a></td> -->
				<td>{{ item.createTime }}</td>
				<!--手机号-->
				<!-- TODO 新增展示字段该取什么值 -->
				<td>{{ item.mobilePhone }}</td>
				<td>{{ item.advNickname }}</td>
				<!--<td>{{ item.advNickname }}</td>-->
				<td>{{ item.tagName }}</td>
				<!-- TODO 标题取什么字段 -->
				<!--标题-->
				<td style="word-wrap:break-word;word-break:break-all; overflow:hidden; text-overflow:ellipsis;">
					<template v-if="item.title && item.title.length > 20">
						{{ item.title.slice(0, 19) + '...'}}
					</template>
					<template v-else>
						{{ item.title }}
					</template>
				</td>

				<!--正文-->
				<td :title="item.content" style="word-wrap:break-word;word-break:break-all; overflow:hidden; text-overflow:ellipsis;">
					<template v-if="item.content && item.content.length > 40">
						{{ item.content.slice(0, 39) + '...'}}
					</template>
					<template v-else>
						{{ item.content }}
					</template>
				</td>
				<!-- TODO 新增锦旗数字段 -->
				<td> {{ item.pennantNum }} </td>

				<!--<td :title=" item.content"><span class="not-space">{{ item.content }}</span></td>-->
				<td>{{ item.answerNum }}</td>
				<td>{{ item.commentReply }}</td>

				<td>{{item.readCount}}</td>
				<td id="unrealHits" contenteditable="true" @input="changeUnrealHits(item.advisoryId,item.unrealHits,index)">{{item.unrealHits}}</td>
				<td id="weights" contenteditable="true" @input="changeWeights(item.advisoryId,item.weights,index)">{{item.weights}}</td>

				<td class="not-print"><a href="javascript:;" class="normal-operate-state" @click="changeRoute(`/consulting/${item.advisoryId}`)">查看详细</a></td>

			</tr>
			</tbody>
		</table>
		<div class="page">
			<div id="test">
				<zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl" ></zpagenav>

			</div>

			<span>回答数总计：<span>{{ totalCommentCoont }}</span>个</span>
			<span>用户回复数总计：<span>{{ totalCommentReply }}</span>个</span>
			<span>共送出锦旗 <span>{{ totalPennantNum }}</span>个</span>
			<span>共{{ totalPersonNum }}人送出锦旗</span>
		</div>
	</div>
</template>
<script type="text/javascript">

    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import calendar from "../../calendar.vue"
    import moment from "moment"
    import {getSource,getSources,getSourcesExcel} from "../../api"
    import $ from "jquery"
    import {
        utils,
        serialize
    } from "../../utils"

    import {listAdvisory , getTagList , getJson , getCourse } from "../../api.js"

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

        components:{
            calendar
        },
        data() {
            return {
                // 数据绑定
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
                    items:{
                        // 单选模式
                        picker1:{
                            type:"datetime",
                            end:moment().format().split('T')[0],
                            value:"",
                            sep:"-",
                            weeks:['日', '一', '二', '三', '四', '五', '六'],
                            months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        },
                        picker2:{
                            type:"datetime",
                            value:this.start,
                            sep:"-",
                            begin:this.start
                        }
                    }
                },
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                psychoInfos:[],
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                table:'',
                list:[],
                select:[],
                tagId:"",
                checkState:'',
                table:"",
                start:"",
                end:"",
                selectPersonList: [],

                // TODO 新增搜索条件初始定义
                sortType: 0,
                advPhone: '',
                title: '',
                totalPennantNum: '',
                totalPersonNum: '',
								totalCommentCoont: '',
								totalCommentReply: '',


            }
        },
        // 处理值的传递
        watch:{
            'calendar.value': function (value) {

                this.calendar.items[this.calendar.picker].value = value

                this.calendar.picker == 'picker1' ? this.start = value  : this.end = value
            },
            page(){
                // this.listAdvisory()
                this.pageChangeFn()
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

        methods:{
            selectAll(e) {
                this.checkAllState = e.target.checkState
                console.log(this.checkAllState)

                if (!this.checkAllState) {
                    this.list.forEach((item) => {
                        if (!item.checkState) {
                            this.selectPersonList.push(item.advisoryId)
                            item.checkState = true
                        }
                    })

                } else {
                    this.list.forEach((item) => {
                        if (item.checkState) {
                            for (let i = 0; i < this.selectPersonList.length; i++) {
                                if (this.selectPersonList[i] == item.advisoryId) {
                                    this.selectPersonList.splice(i, 1)
                                    item.checkState = false
                                }
                            }

                        }
                    })

                }

            },
            selectPerson(advisoryId, item) {
                console.log(item.checkState);
                item.checkState = !item.checkState

                if (item.checkState) {
                    this.selectPersonList.push(advisoryId)
                } else {
                    for (let i = 0; i < this.selectPersonList.length; i++) {
                        if (this.selectPersonList[i] == advisoryId) {
                            this.selectPersonList.splice(i, 1)
                        }
                    }

                }

                console.log(this.selectPersonList)
            },
            changeUnrealHits(id,aa,index){
                let v=document.querySelectorAll('#unrealHits')[index].innerHTML;
                if(v==aa){
                }else{
//                alert(`修改成功`)
//                this.list[index].unrealHits=v;
                    let object={};
                    object.advisoryId=id;
                    object.unrealHits=v;
                    let n = JSON.stringify([object]);
                    this.updateUnrealHits(n);
                    this.excelInterface(n);
                }
            },
            serialize(obj){
                return Object.keys(obj).map((item) => `${encodeURIComponent(item)}=${encodeURIComponent(obj[item])}`).join("&")
            },
            changeWeights(id,aa,index){
                let v=document.querySelectorAll('#weights')[index].innerHTML;
                if(v==aa){

                }else{
                    let object={};
                    object.advisoryId=id;
                    object.weights=v;
                    let n = JSON.stringify([object]);
                    this.updateUnrealHits(n);
                    this.excelInterface(n);

                }
            },


            async updateUnrealHits(object) {
                let data = await getJson("/depression-web/advisoryCuration/motifyAdsoryByWeightsOrUnrealHits.json", object);
                if (data.code === 0) {

//                this.listAdvisory()
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },

            async excelInterface(object) {
                let data = await getCourse("/depression-web/advisoryCuration/exportAdvisory.json", object);
                if (data.code === 0) {
                    //修改选中状态
                    this.list.forEach((item) => {
                        //当列表中有此id时修改选中状态为选中
                        this.selectPersonList.forEach((v) => {
                            if (item.advisoryId === v) {
                                Vue.set(item, "checkState", true);
                            }
                        })
                    })
                } else {
                    alert(`errMsg:${data.msg}`)
                    console.log(object)
                }

            },

            changeRoute(url){
                this.$route.router.go(url)
            },

            pageHandler(page) {
                //here you can do custom state update
                this.page = page

            },
            createUrl(unit) {
                return unit.page > 1?'#page=' + unit.page:'#'
            },
            templateText(data){
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
            base64(string){
                return window.btoa(unescape(encodeURIComponent(string)))
            },

            tableToExcel: function (tableList, name) {
                let tables = []
                let	uri = 'data:application/vnd.ms-excel;base64,'
                for(var i = 0; i < tableList.length; i++) {
                    tables.push(tableList[i].innerHTML);
                }
                var data = {
                    worksheet: name || 'Worksheet',
                    tables: tables
                };

                this.table = ''
                return uri + this.base64(this.templateText(data.tables));
            },

            // exportHandler(event) {
            // 	this.tableFn()
            //   	event.currentTarget.href = this.tableToExcel(this.table, '用户数据');
            //
            // },

            async exportHandler(){
                let parmasObj={};
                if(this.ordernum){
                    parmasObj.id=parseInt(this.ordernum);
                }
                if(this.userpone){
                    parmasObj.telephone=this.userpone;
                }
                if(this.calendar.items.picker1.value){
                    parmasObj.startTime=this.calendar.items.picker1.value;
                }
                if(this.calendar.items.picker2.value){
                    parmasObj.endTime=this.calendar.items.picker2.value;
                }

                if (this.selectPersonList.length) {
                    parmasObj.ids = JSON.stringify(this.selectPersonList)
                }
                parmasObj.sortType = this.sortType
                let parmas=this.serialize(parmasObj);
                let data = await getSourcesExcel("/depression-web/advisoryCuration/exportAdvisory.json",parmas);
                let blob = new Blob([data], {
                        'type': 'application/msexcel'
                    }),
                    a = this.$els.a

                a.href = window.URL.createObjectURL(blob)
                a.download = `问答管理.xls`
                a.click()
            },
            tableFn(){
                let tables = $('table:visible')
                let self = this
                tables.each(function (i) {
                    var t = $('<table><thead></thead><tbody></tobdy></table>');
                    t.find('thead').html(this.tHead.innerHTML);
                    t.find('tbody').append($(this.tBodies).children(':visible').clone());
                    t.find('tbody tr').each(function(){
                        if(!$(this).find('input:checkbox').is(':checked')){
                            $(this).addClass('not-print')
                        }
                    })
                    t.find('.not-print').remove(); // not-print 是@media print中不会打印的部分

                    t.find('a').replaceWith(function (i) { // 表格中不再需要的超链接也移除了
                        return this.innerHTML;
                    });
                    self.table = self.table ? self.table.add(t) : t;
                    console.log(self.table)

                });

            },

            // 打开显示选择器
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

            paramsFn() {
                // TODO 增加搜索条件
                let params = {
                    pageIndex: this.page,
                    pageSize: this.maxLink,
                    sortType: this.sortType
                }

                this.tagId && (params.tagId = this.tagId);
                this.start && (params.begin = this.start);
                this.end && (params.end = this.end);
                this.advPhone && (params.advPhone = this.advPhone.trim());
                this.title && (params.title = this.title.trim());
                // let params = `tagId=${this.tagId}&pageIndex=${this.page}&pageSize=${this.maxLink}&begin=${this.start}&end=${this.end}&sortType=${this.sortType}&advPhone=${this.advPhone.trim()}&title=${this.title.trim()}`
                return serialize(params)

            },

            search(){
                this.page = 1

                this.listAdvisory(this.paramsFn())
            },
            pageChangeFn(){

                this.listAdvisory(this.paramsFn())
            },

            async listAdvisory(params = `pageIndex=${this.page}&pageSize=${this.maxLink}&sortType=${this.sortType}`){
                let data =  await listAdvisory(params)

                if(data.code == 0){

                    this.list = data.list
                    this.total = data.count
                    this.totalPennantNum  = data.totalPennantNum
										this.totalPersonNum = data.totalPersonNum
										this.totalCommentReply = data.totalCommentReply
                    this.totalCommentCoont = data.totalCommentCoont
                    this.list.forEach((item) => {   //checkBox
                        Vue.set(item, "checkState", false);
                    })

                    //修改选中状态
                    this.list.forEach((item) => {
                        //当列表中有此id时修改选中状态为选中
                        this.selectPersonList.forEach((v) => {
                            if (item.advisoryId === v) {
                                Vue.set(item, "checkState", true);
                            }
                        })
                    })
                    console.log(data)

                }else{
                    alert(data.msg)
                }
            },

            async getTagList(){
                let data = await getTagList()
                if(data.code == 0){
                    this.select = data.list
                }else{
                    alert(data.msg)
                }

            }

        },
        computed: {
            checkAllState: function() {
                this.recentPageCheckedNumber = 0
                for (let i = 0; i < this.list.length; i++) {
                    for (let j = 0; j < this.selectPersonList.length; j++) {
                        if (this.list[i].advisoryId === this.selectPersonList[j]) {
                            this.recentPageCheckedNumber++;
                            break;
                        }
                    }
                }
                return !!this.list.length && this.recentPageCheckedNumber === this.list.length
            }
        },
        ready(){

            this.listAdvisory()
            this.getTagList()
        }
    }
</script>
