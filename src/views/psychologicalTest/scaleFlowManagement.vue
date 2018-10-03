<template>
    <div>
        <div class="search-box">
            <input type="text" placeholder="订单流水号" v-model="ordernum" :value="ordernum">
            <input type="text" placeholder="用户手机号" v-model="userpone" :value="userpone">

            <input class="input" size="50" type="text" @click.stop="open($event,'picker1')"
                   v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">

            <input class="input" size="50" type="text" @click.stop="open($event,'picker2')"
                   v-model="calendar.items.picker2.value" placeholder="结束时间" id="end" name="end">
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
            <!--<input type="date" placeholder="开始时间" v-model="startTime">-->
            <!--<input type="date" placeholder="结束时间" v-model="endTime">-->
            <button @click="search">筛选</button>
        </div>
        <div class="scalebox">
            <div class="scaletotal">
                <h1 v-text="scaleNumber+'套'"></h1>
                <h2>量表数量</h2>
            </div>
            <div class="scaletotal">
                <h1 v-text="testTotal+'次'"></h1>
                <h2>累计测试次数</h2>
            </div>
            <button class="btn-success" style="float: right" @click="downloadExcel()">导出Excel</button>
            <a href="javascript:;" v-el:a></a>
        </div>
        <table class="order-table">
            <thead>
            <th>订单流水号</th>
            <th>用户昵称</th>
            <th>性别</th>
            <th>年龄</th>
            <th>用户手机号</th>
            <th>所测量表</th>
            <th>量表价格</th>
            <th>定性名称</th>
            <th>维度：常模：分数</th>
            <th>测试时间</th>
            </thead>
            <tbody>
            <tr v-for="item in scaleflowlist" class="trbox">
                <!--<td>-->
                <!--<div class="checkbox">-->
                <!--<input type="checkbox"-->
                <!--class="checkboxInp"-->
                <!--name="title-table-checkbox"-->
                <!--id="title-table-td{{item.articleId}}"-->
                <!--:checked=" item.checkState? 'checked':''"-->
                <!--@click='selectPerson2(item.articleId,item)'-->
                <!--data-typeId="{{item.articleId}}">-->
                <!--<label class="checkboxLabel" for="title-table-td{{item.articleId}}"></label>-->
                <!--</div>-->
                <!--</td>-->
                <td class="username" @click="changeUserRouter('/scaleFlowDetail/'+item.id)">{{item.id}}</td>
                <td>{{item.userName}}</td>
                <td>{{item.sex |sexs}}</td>
                <td>{{item.birthday|birthdays}}</td>
                <td>{{item.telephone}}</td>
                <td>{{item.relateTestScaleName}}</td>
                <td>{{item.relateTestScalePrice}}</td>
                <td>{{item.relateQualitativeName}}</td>
                <td>
                    <p v-for="v in item.tsodnList">
                        <span>{{v.dimensionName}}</span>
                        <span>:</span>
                        <span>{{v.normLowScore}}</span>
                        <span>-</span>
                        <span>{{v.normHighScore}}</span>
                        <span>:</span>
                        <span>{{v.dimensionScore}}</span>
                    </p>
                </td>
                <td>{{item.createTime|time}}</td>
            </tr>
            </tbody>
        </table>
        <div class="order-page">
            <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
                </zpagenav>
        </div>
    </div>

</template>
<script type="text/javascript">
    import Vue from "vue"
    import calendar from "../../calendar.vue"
    import moment from "moment"
    import {getSource,getSources,getSourcesExcel} from "../../api"
//    import serialize from "../../utils"
    import zpagenav from "vue-pagenav"
    Vue.use(zpagenav)
    Vue.filter('time',function (value) {
        var date = new Date(value);
        var Y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            H = date.getHours(),
            i = date.getMinutes(),
            s = date.getSeconds();

        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (i < 10) {
            i = '0' + i;
        }
        if (s < 10) {
            s = '0' + s;
        }
        var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
        return t;
    });
    Vue.filter('birthdays',function (value) {
        var date = new Date(value);
        var Y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            H = date.getHours(),
            i = date.getMinutes(),
            s = date.getSeconds();
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        var t = Y + '-' + m + '-' + d;
        var returnAge;
        var strBirthdayArr=t.split("-");
        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];

        var newdate=new Date();
        var nowYear=newdate.getFullYear();
        var nowMonth=newdate.getMonth();
        var nowDay=newdate.getDate();

        if(nowYear == birthYear) {
            returnAge = 0;//同年 则为0岁
        } else {
            var ageDiff = nowYear - birthYear ; //年之差
            if(ageDiff > 0) {
                if(nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay;//日之差
                    if(dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff ;
                    }
                } else {
                    var monthDiff = nowMonth - birthMonth;//月之差
                    if(monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff ;
                    }
                }
            } else {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge;//返回周岁年龄
    });
    Vue.filter("sexs",function (value) {
        if(value==="man"){
            return "男";
        }else if(value==="woman") {
            return "女";
        }
    })
    export default {
        data(){
            return{
                calendar: {
                    show: false,
                    x: 0,
                    y: 0,
                    picker: "",
                    type: "date",
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
                ordernum:"",
                userpone:"",

                scaleflowlist:[],
                scaleNumber:0,
                testTotal:0,

                page: 1,
                pageSize: 10,
                total: 0,
                maxLink: 0,
            }
        },
        watch:{
            'calendar.value': function (value) {
                this.calendar.items[this.calendar.picker].value = value
                this.calendar.picker == 'picker1' ? this.start = value + ' 00:00:00' : this.end = value + ' 00:00:00'
            },
        },
        components: {

            calendar
        },
        methods:{
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
            serialize(obj){
                return Object.keys(obj).map((item) => `${encodeURIComponent(item)}=${encodeURIComponent(obj[item])}`).join("&")
            },
            async search(){
                this.page=1;
                let parmasObj={
                    pageIndex:this.page,
                    pageSize:this.pageSize,
                }
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
                let parmas=this.serialize(parmasObj);
                let data = await getSources("/orderCenter/testScaleOrder/getAllMessage",parmas);
                if (data.code == 0) {
                    if(data.testScaleOrderList==""){
                        this.scaleflowlist = [];
                            alert("没有搜索到相关数据");
                    }else{
                        this.scaleflowlist = data.testScaleOrderList;
                    }
                    this.scaleNumber=data.testScaleNum;
                    this.testTotal=data.numberOfTest;
                    this.total=data.testScaleOrderNum;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async search2(){
                let parmasObj={
                    pageIndex:this.page,
                    pageSize:this.pageSize,
                }
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
                let parmas=this.serialize(parmasObj);
                let data = await getSources("/orderCenter/testScaleOrder/getAllMessage",parmas);
                if (data.code == 0) {
                    if(data.testScaleOrderList==""){
                        this.scaleflowlist = [];
                        alert("没有搜索到相关数据");
                    }else{
                        this.scaleflowlist = data.testScaleOrderList;
                    }
                    this.scaleNumber=data.testScaleNum;
                    this.testTotal=data.numberOfTest;
                    this.total=data.testScaleOrderNum;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async downloadExcel(){
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

                let parmas=this.serialize(parmasObj);
                let data = await getSourcesExcel("/orderCenter/testScaleOrder/exportOrderMessage",parmas);
                    let blob = new Blob([data], {
                            'type': 'application/msexcel'
                        }),
                        a = this.$els.a

                    a.href = window.URL.createObjectURL(blob)
                    a.download = `用户流水列表.xls`
                    a.click()
            },
            changeUserRouter(url){
                this.$dispatch('child-msg', "用户详情")
                this.$route.router.go(url)
            },
            pageHandler(page) {
                //here you can do custom state update
                this.page = page;
//                this.getScaleFlow();
                this.search2();
            },
            createUrl(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },
//            async getScaleFlow(){
//                let data = await getSources("/orderCenter/testScaleOrder/getAllMessage",`pageIndex=${this.page}&pageSize=${this.pageSize}`);
//                if (data.code == 0) {
//                    this.scaleflowlist = data.testScaleOrderList;
//                    this.scaleNumber=data.testScaleNum;
//                    this.testTotal=data.numberOfTest;
//                    this.total=data.testScaleOrderNum;
//                } else {
//                    alert(`errMsg:${data.msg}`)
//                }
//            },
        },

        ready(){
            this.search();
        }
    }
</script>
<style scoped>
    .scalebox:after{
        width: 0;
        height: 0;
        content: "";
        display: block;
        clear: both;
    }
    .scaletotal{
        float: left;
        border: 1px solid #000;
        padding: 8px 10px;
        margin: 10px;
    }
    .scaletotal h1{
        font-size: 18px;
        text-align: center;
    }
    .scaletotal h2{
        font-size: 16px;
        text-align: center;
    }
    .trbox td{
        text-align: center;
    }
    .username{
        color: #006dcc;
        cursor: pointer;
    }
    .search-box input[type=text]{
        width: 186px;
    }
</style>