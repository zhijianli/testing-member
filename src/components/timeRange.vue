<template>
    <div class="inlineClass">
        <input class="input" size="50" type="text" @click.stop="open($event,'picker1')"
               @input="inputChangeFn"
               v-model="calendar.items.picker1.value" placeholder="开始时间" id="start" name="start">
        -
        <input class="input" size="50" type="text" @click.stop="open($event,'picker2')"
               @input="inputChangeFn2"
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
                :sep.sync="calendar.sep">
        </calendar>
    </div>
</template>
<script>
    import Vue from "vue"
    import calendar from "../calendar.vue"
    import moment from "moment"

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

        props: ['start', 'end'],
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


            }
        },
        methods: {
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

            inputChangeFn(e) {
                const target = e.target
                const value = target.value

                console.log(value)

                if (!value) {
                    this.start = ""

                    this.$emit('ddd', this.start, this.end)
                }
            },


            inputChangeFn2(e) {
                const target = e.target
                const value = target.value

                console.log(value)

                if (!value) {
                    this.end = ""

                    this.$emit('ddd', this.start, this.end)

                }
            },


            // 在对应页面书写此方法，searchStartTime和searchEndTime分别对应相应页面所需要的开始时间和结束时间
            // ddd(start, end) {
            //     if (start && start.length === 19) {
            //         this.searchStartTime = start
            //     } else {
            //         this.searchStartTime = ''
            //     }
            //
            //     if (end && end.length === 19) {
            //         this.searchEndTime = end
            //     } else {
            //         this.searchEndTime = ''
            //     }
            // },

        },

        // 处理值的传递
        watch: {
            'calendar.value': function (value) {
                this.calendar.items[this.calendar.picker].value = value
                this.calendar.picker == 'picker1' ? this.start = value + ' 00:00:00' : this.end = value + ' 23:59:59'

                this.$emit('ddd', this.start, this.end)
            },

        },


    }
</script>
<style scoped>
    .inlineClass {
        display: inline-block;
        margin-right: 10px;
    }
</style>