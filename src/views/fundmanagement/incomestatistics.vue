<template>

	<div class="container-fluid">
		<ul class="tagTit">
			<li @click="searchDate(searchToday)" v-bind:class="{ 'show': searchTag.today}"> 今天</li>
			<li @click="searchDate(searchSeven)" v-bind:class="{ 'show': searchTag.seven}"> 最近七天</li>
			<li @click="searchDate(searchThismon)" v-bind:class="{ 'show': searchTag.thismon}"> 本月</li>
			<li @click="searchDate(searchMon)"   v-bind:class="{ 'show': searchTag.mon}"> 最近三十天</li>
			<li @click="searchDate(searchThree)" v-bind:class="{ 'show': searchTag.three}"> 最近三个月</li>
			<li @click="searchDate(searchHalf)"  v-bind:class="{ 'show': searchTag.half}"> 最近半年</li>
			<li @click="searchDate(searchAll)"   v-bind:class="{ 'show': searchTag.all}"> 全部</li>
		</ul>
		 <div id="search" class="title mySearchBox calendar">
			<input class="input searchVal" size="50" type="text" @click.stop="open($event,'picker1')" v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">

			<!-- <input type="text" name="" placeholder="开始时间"> -->
			-
			<input class="input searchVal" size="50" type="text" @click.stop="open($event,'picker2')" v-model="calendar.items.picker2.value" placeholder="结束时间" id="end" name="end">
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
			    :months="calendar.months">
		    </calendar>
			<!-- <div class="myBtn incomeBtn" id="btn" >搜索</div> -->
			<div class="myBtn incomeBtn" @click='getSearchVal'>搜索</div>
		</div>

		<ul class="rate">
			<li>
				<div class="rateName"><div>收入</div><div>{{parseInt(incomeAll)}}元</div></div>
				<div class="rateName"><div>支出</div><div>{{parseInt(expensesAll)}}元</div></div>
				<div class="rateName"><div>利润</div><div>{{parseInt(profit)}}元</div></div>
				<div class="rateName"><div>利润率</div><div>{{parseInt(profitRate)}}%</div></div>

        <!-- 切换视图 -->
				<div class="rateName">
                  <div class="pointer" @click="view = 0">折线图</div>
                  <div class="pointer" @click="view = 1">excel表格</div>
                </div>

			</li>
		</ul>

        <!--  -->
        <div v-show="view == 0">
            <div id="echarts" >

            </div>
        </div>

        <!--  -->
        <div v-show="view == 1">

            <div class="container-fluid mid">
                <div class="row-fluid">
                    <div class="widget-box">

                        <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                            <h5>平台收入</h5>
                        </div>

                        <!--日期 收入 支出 利润 利润率  -->
                        <div class="widget-content nopadding">
                            <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
                                <thead>
                                    <tr>
                                        <th class="span1">日期</th>
                                        <th class="span1">收入</th>
                                        <th class="span1">支出</th>
                                        <th class="span1">利润</th>
                                        <th class="span1">利润率</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- this.profit = this.incomeAll - this.expensesAll
                                    this.profitRate = (this.profit / this.incomeAll)*100 -->
                                    <tr v-for='item in excelList'>
                                    <!-- <tr v-for='item in dataList'> -->
                                        <td class="span1">{{item.statisticsDate.split(' ')[0]}}</td>
                                        <td class="span1">{{item.incomeAmount.toFixed(2)}}</td>
                                        <td class="span1">{{item.expensesAmount.toFixed(2)}}</td>
                                        <td class="span1">{{(item.incomeAmount - item.expensesAmount).toFixed(2)}}</td>

                                        <td class="span1" v-if="isFinite(((item.incomeAmount - item.expensesAmount)/(item.incomeAmount/100)).toFixed(2))">
                                        	{{((item.incomeAmount - item.expensesAmount)/(item.incomeAmount/100)).toFixed(2)}}%
                                        </td>
                                        <!-- 分母为零 -->
                                        <td class="span1" v-else>0</td>

                                    </tr>
                                </tbody>
                            </table>

                        </div>

                        <div class="widget-content nopadding">
                            <div class="myBtn" @click="excel.index > 0 ? excel.index--:'' ">前一页</div>
                            <div class="myBtn">当前第{{excel.index + 1}}页</div>
                            <div class="myBtn" @click="excel.index < excel.total-1 ? excel.index++ : '' ">后一页</div>
                            <div class="myBtn">共{{excel.total}}页</div>
                            <div class="myBtn"><a href="javascript:;" @click="csv">导出excel</a></div>
                        </div>


                    </div>
                </div>
            </div>





        </div>

	</div>
</template>

<script type="text/javascript">
	import calendar from "../../calendar.vue"
	import moment from "moment"
	import {serialize} from "../../utils"
	import echarts from "../../echarts.js"
	import {getPlatform} from "../../api"
	export default {
	    components:{
	        calendar
	    },
		data(){
			return {
                dataList:[],

                excel:{  // excel 分页显示
                    list:[],
                    index:0,
                    size:10,
                    total:"",
                },

                incomeAll:0,//查询时间段的总收入
                expensesAll:0,//查询时间段的总支出
                searchTime:{  //起止时间
                	start:"",
                	end:"",
                },
                profit:0,
                profitRate:0,
                searchToday:"1",
                searchSeven:"7",
                searchThismon:"030",
                searchMon:"30",
                searchThree:"90",
                searchHalf:"180",
                searchAll:"1000",
                searchTag:{
                	today:true,
                	seven:false,
                	thismon:false,
                	mon:false,
                	three:false,
                	half:false,
                	all:false,
                },
                expensesAmountList:[],  //统计图 支出 y
                incomeAmountList:[],    //统计图 收入 y
                xList:[],            //统计图 横坐标  x
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
                    range:false,
                    items:{
                        // 单选模式
                        picker1:{
                            type:"date",
                            end:moment().format().split('T')[0], //toISOString
                            value:"",
                            weeks:['日', '一', '二', '三', '四', '五', '六'],
                            months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        },
                        picker2:{
                            value:"",
                            begin:""
                        },
                    }
                },
                view:0, //  折线图 0  excel 1
			}
		},
        computed: {
            excelList: function () {
                return this.dataList.slice(this.excel.size*this.excel.index,this.excel.size*(this.excel.index+1))
            },
        },
		route:{

	    },
	    watch:{
	        'calendar.value': function (value) {
	            this.calendar.items[this.calendar.picker].value=value
	        },
            'searchTime.start':function(){
                this.excel.index = 0
            },
            'view':function(value) {
                value == 0 ? this.setEcharts() : ''
            }
	    },
		methods:{
			async setEcharts(){
				let myChart = echarts.init(document.getElementById('echarts'));
				// 指定图表的配置项和数据
				let option = {
				    title: {
				        text: '收入统计走向表'
				    },
				    tooltip: {trigger: 'axis'},
				    legend: {
				        data:['支出','收入']
				    },
				    xAxis: {
				        data: this.xList
				        // data: ["x1","x2","x3","x4","x5"]
				    },
				    yAxis: {},
					series: [{
						name: '支出',
						type: 'line',
						data:this.expensesAmountList
		          	},
		          	{
			            name:'收入',
			            type:'line',
			            data:this.incomeAmountList
		          	}]
				};
				myChart.setOption(option);
			},
			getSearchVal(){   //时间 2016/12/12 => yyyy-MM-dd HH:mm:ss
				this.searchTime.start = this.calendar.items.picker1.value.replace(/\//g, "-") + " 00:00:00"
				this.searchTime.end = this.calendar.items.picker2.value.replace(/\//g, "-") + " 00:00:00"

				this.getData()
			},
		    clearLsatData(){
		    	this.expensesAmountList = []  //先清空原数组
				this.incomeAmountList = []
				this.xList = []
				this.expensesAll = 0
				this.incomeAll = 0
				this.profit = 0
				this.profitRate = 0
		    },
		    async getData(){

		    	this.clearLsatData()  //清空旧数据

		    	let paramsObj = {
						endDate: this.searchTime.end,
						startDate: this.searchTime.start
					}
				let params = serialize(paramsObj)
				let data = await getPlatform(params)
				if( data.code ==0 ){
					this.dataList = data.list  ////////

                    this.excel.total = Math.ceil(data.list.length/10)

				    this.dataList.forEach( (item) => {
				        this.expensesAmountList.push(item.expensesAmount)
				        this.incomeAmountList.push(item.incomeAmount)
				    })
					this.expensesAmountList.forEach( (item,index,arr)=>{
						this.expensesAll += item
					})
					this.incomeAmountList.forEach( (item,index,arr)=>{
						this.incomeAll += item
					})

					this.profit = this.incomeAll - this.expensesAll
					this.profitRate = (this.profit / this.incomeAll)*100
					let prate = this.profitRate   //??????
					let profit = this.profit   //??????
					this.profitRate = prate.toString().substr(0,5)
					if(profit.toString().split('.')[1]){  //是否有小数
						this.profit = `${profit.toString().split('.')[0]}.${profit.toString().split('.')[1].substr(0,2)}`
					}
					this.setXpos()
					this.setEcharts()
					//------------------------------
					//------------------------------
				}else{
					alert(`errMsg:${data.msg}`)
				}
		    },
		    setXpos(){
				let theDaysAmount = this.dataList.length
				// for ( let i= 0 ; i < theDaysAmount ; i++ ){
				// 	// this.xList.push( this.dataList.statisticsDate.split(' '[0]) )
				// 	this.xList.push( moment().subtract(i,'days').format('L') )
				// }
				this.dataList.forEach((item,index,arr) =>{
					this.xList.push(item.statisticsDate.split(' ')[0])
				})
				// this.xList.reverse()  // 排序 翻转


		    },
			searchDate(searchTime){   // 快捷搜索
				let now = moment().format().split('T')[0]+ " 23:59:59"
				this.searchTime.end = now

				this.searchTag.today = false
				this.searchTag.seven = false
				this.searchTag.thismon = false
				this.searchTag.mon = false
				this.searchTag.three = false
				this.searchTag.half = false
				this.searchTag.all = false

				switch (searchTime){
					case "1":
						this.searchTag.today = true
						this.searchTime.start = moment().subtract(0, 'days').format().split('T')[0]+ " 00:00:00"
						this.getData()
						break;
					case "7":
						this.searchTag.seven = true
						this.searchTime.start = moment().subtract(7, 'days').format().split('T')[0]+ " 00:00:00"
						this.getData()
						break;
					case "030":
						this.searchTag.thismon = true
						let date = new Date();
						let thismon = date.getMonth()+1;
						if(thismon.length<2){
							thismon = `0${thismon}`
						}
						let thisyear = date.getFullYear();
						let time = `${thisyear}-${thismon}-01`
						this.searchTime.start = time+ " 00:00:00"
						this.getData()
						break;
					case "30":
						this.searchTag.mon = true
						this.searchTime.start = moment().subtract(1, 'month').format().split('T')[0]+ " 00:00:00"
						this.getData()
						break;
					case "90":
						this.searchTag.three = true
						this.searchTime.start = moment().subtract(3, 'month').format().split('T')[0]+ " 00:00:00"
						this.getData()
						break;
					case "180":
						this.searchTag.half = true
						this.searchTime.start = moment().subtract(6, 'month').format().split('T')[0]+ " 00:00:00"
						this.getData()
						break;
					case "1000":
						this.searchTag.all = true
						this.searchTime.start = moment().subtract(100, 'year').format().split('T')[0]+ " 00:00:00"
						this.getData()
						break;
					default:
						alert('err')
						break;
				}
			},
			getRate(inAll,outAll){
				let rate = (((inAll-outAll)/outAll)*100)
				rate.toString().substr(0,5)
				return rate;
			},
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
            csv(e){
                let a = e.target,
                    title = `<tr>
                                <th>日期</th>
                                <th>收入</th>
                                <th>支出</th>
                                <th>利润</th>
                                <th>利润率</th>
                             </tr>`
                //     array = []
                //
                // this.dataList.forEach((item)=>{
                //     array.push(item)
                // })

                let HTML = (obj) => {

    		    	let {statisticsDate,incomeAmount,expensesAmount} = obj


    		    	return `<tr>
                                <td>${statisticsDate.split(' ')[0]}</td>
                                <td>${incomeAmount}</td>
                                <td>${expensesAmount}</td>
                                <td>${(incomeAmount - expensesAmount).toFixed(2)}</td>
                                <td>${((incomeAmount - expensesAmount)/(incomeAmount/100)).toFixed(2)}%</td>
    						</tr>`

    		    }

    		    let str = ""

    		    this.dataList.forEach((item)=>{
    		    	str += HTML(item)
    		    })


    		    const body = title + str

    	    	const table = `<html><head><meta charset="UTF-8"></head><body><table>${body}</table></body></html>`

    	    	const csv = new Blob([table], {
    	    		type: "application/msexcel"
    	    	})

    	    	a.href = window.URL.createObjectURL(csv)

                // let name = ['今天','最近七天','本月','最近三十天','最近三个月','最近半年','全部']

    	    	a.download = "excel.xls"
            }

		},
		ready(){
			this.searchDate("1000")  //进入页面先展示全部数据
			// this.setEcharts()
		}
	}

</script>
<style>
#echarts {
    width: 1500px;
    height: 750px;
    margin: 50px auto 0;
}
</style>
