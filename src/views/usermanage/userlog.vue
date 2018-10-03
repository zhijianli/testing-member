<template>

	<div class="container-fluid">
		<div id="search" class="title">
			<select v-model="dptId"  name="dptId">
				<option value="0">全部</option>
                <option v-for="item of select" value="{{ item.dptId }}">
                    {{ item.depName }}
                </option>
			</select>
			<input class="input" size="50" type="text" @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">
		    
			<!-- <input type="text" name="" placeholder="开始时间"> -->
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
			<input type="text" name="mobilePhone" placeholder="账号" v-model="mobilePhone">
			<input type="text" name="showName" placeholder="实名"  v-model="showName" >
			<input type="submit" value="确定搜索" class="btn btn-warning" @click="search()">
	    </div>

	    <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
                <tr>
                    <th></th>
                    <th>账号</th>
                    <th>部门</th>
                    <th>实名</th>
                    <th>操作时间</th>
                    <th>操作项目</th>
                </tr>
            </thead>
            <tbody>
            	<tr v-for="item of list">
				    <td>{{ item.olid }}</td>
				    <td>{{ item.mobilePhone }}</td>
				    <td>{{ item.depName }}</td>
				    <td>{{ item.showName }}</td>
				    <td>{{ item.operationTime }}</td>
				    <td>{{ item.operationContent }}</td>
				</tr>
			</tbody>
		</table>

        <div id="test">
            <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl" >10"><zpagenav>
        </div>
	</div>
	
</template>
<script type="text/javascript">
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
	import calendar from "../../calendar.vue"
	import moment from "moment"
    import { listLogs, listDepartment } from '../../api'
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
                        type:"date",
                        end:moment().format().split('T')[0],
                        value:"",
                        sep:"-",
                        weeks:['日', '一', '二', '三', '四', '五', '六'],
                        months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    },
                    picker2:{
                        value:this.start,
                        sep:"-",
                        begin:this.start
                    }
                }
            },
            page: 1, //pagepageSize: 10 //pageSize,  default is 10
            total: 0, //total item count
            maxLink: 10, //how many links to show, must not less than 5,  default is 5
            list:[],
            start:'',
            end:'',
            mobilePhone:'',
            showName:'',
            select:[],
            dptId:'0'
        }
    },
     // 处理值的传递
    watch:{
        'calendar.value': function (value) {
            this.calendar.items[this.calendar.picker].value=value
            this.calendar.picker == 'picker1' ? this.start = value+' 00:00:00' : this.end = value+' 00:00:00'
        },
        page(){
            let params = `pageIndex=${this.page}&pageSize=${this.maxLink}`
            this.listLogs(params)
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

        search(){
            
            let paramsObj = {
                "pageIndex":this.page,
                "pageSize" : this.maxLink,
                "dptId"    : this.dptId,
                "begin"    : this.start,
                "end"      : this.end,
                "mobilePhone": this.mobilePhone,
                "showName" : this.showName
            }

            if( !this.dptId || this.dptId == '0'){
                delete paramsObj.dptId
            }
            let params = this.serialize(paramsObj)

            this.listLogs(params)
            //pageIndex=${this.page}&pageSize=${this.maxLink}
        },

        serialize(obj){

            let str = ""
            for (let key in obj) {
                str += `${key}=${obj[key]}&`
            }
            str = str.slice(0, -1)
            return str

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
        async listLogs(params){

            let data = await listLogs(params)
            this.list = data.list
        },

        async listDepartment(){
            let data  = await listDepartment()
            this.select = data.list

        }
    },
    ready(){

        let params = `pageIndex=${this.page}&pageSize=${this.maxLink}`
    	this.listLogs(params)
        this.listDepartment()
    }
}
</script>
