<template>
    <div class="search-box">

        <input type="date" placeholder="开始时间" v-model="startTime"> -
        <input type="date" placeholder="结束时间" v-model="endTime">
        <input type="text" placeholder="订单号" v-model="no">
        <input type="text" placeholder="关键词" v-model="keyword">
        <button @click="searchFn">搜索</button> <br>

    </div>

    <table class="order-table">
        <thead>
            <!--<th>选中</th>-->
            <th>咨询时间</th>

            <th>订单号</th>
            <th>用户姓名</th>
            <th>用户手机号</th>
            <th>专家</th>
            <th>录音</th>

        </thead>

        <tbody v-el:tt>
        <tr v-for="item of list">
            <!--<td>-->
                <!--<input type="checkbox" :value="item.no" v-model="ff">-->
            <!--</td>-->
            <td v-text="item.serviceRealityBeginTime"></td>

            <td v-text="item.no"></td>
            <td v-text="item.nickname"></td>
            <td v-text="item.consumersPhone"></td>
            <td v-text="item.specialistName"></td>
            <td @click="getMusic(item.soid)" style="color: rgb(43, 141, 249); cursor: pointer; text-align: center;">查看</td>
        </tr>
        </tbody>
    </table>

    <div class="order-modal" v-if="musicState" @click="musicState = false" transition="order-modal">
        <div class="order-modal-content musicList" style="padding: 20px;height: 400px; overflow-y: scroll;" @click.stop>
            <h2>录音列表：</h2>
            <div class="musicCont">
                <div v-for="item in musicList" class="musicItem">
                    <div>
                        {{item}}
                    </div>
                    <audio :src="qiniuMp3+'/'+ item + '.wav'" controls="controls" oncontextmenu="return false">
                    </audio>
                </div>
            </div>
            <button @click="musicState =false">关闭</button>
        </div>
    </div>
    <div class="order-page" v-if="total">
        <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
        </zpagenav>
    </div>
</template>
<script>
    import {
        qiniuMp3
    } from '../../envConfig.js'

    import {
        getOrder,
        cancelOrder,
        handleOrder,
        handleTousu,
        handleTousuW,
        handleTui,
        exportServiceOrder,
        closeServiceOrder,
        getRecordName, // 下载音乐
        getResponse,
    } from "../../api"
    import pages from "vue-pagenav"


    export default {
        data() {
            return {
                qiniuMp3: qiniuMp3,
                ff: [],
                no: "",
                keyword: "",
                type: -1,
                typeb: -1,
                startTime: "",
                endTime: "",
                show: false,

                orderSource: "",


                wei: false,
                reasonWei: "",

                weiT: false,
                weiT1: "",
                weiT2: "",
                weiTCheck: false,

                yiT: false,
                yiT1: "",
                yiT2: "",
                yiTCheck: false,


                list: [],
                status: false,
                reason: "",
                count: 0,

                pageCount: 10,
                page: 1,
                pageSize: 1,
                total: 0,
                maxLink: 0,


                tousuStatus: false,
                reasonTousu: "",
                tousuStatusW: false,
                reasonTousuW: "",

                pingjiaStatusW: false, // 评价窗口
                reasonpingjiaW: "", // 评价内容

                overState: false,

                musicState: false, // 音乐内容弹窗
                musicList: [],

                tuiStatus: false,
                tui1: "",
                tui2: "",
                tui3: "",
                tuiType: 0
            }
        },
        route: {
            data() {

            }
        },
        components: {
            pages
        },
        watch: {
            show(value) {
                if (value) {
                    this.$els.input.disabled = true
                } else {
                    this.$els.input.disabled = false
                }
            },
            type(value) {

                this.page = 1
            },
            weiT1(value) {

                this.weiT2 = ""
            },
            weiT2(value) {

                this.weiT1 = ""
            }
        },
        filters: {
            format(value) {
                let types = ["语音咨询", "语音倾述"]

                return types[value]
            },
            typeFormat(value) {
                let types = {
                    11: "未接通",
                    12: "未扣款",
                    13: "进行中",
                    14: "完成未评价",
                    15: "完成且评价",

                    // 0: "正在扣款",
                    // 1: "已支付",
                    // 3: "已完成",  // 已完成 改成 投诉
                    4: "异常未处理",
                    5: "异常已处理",
                    7: "投诉未处理",

                    8: "投诉已处理",
                    16: "过期无效订单"

                }

                return types[value]
            },
            durationFormat(value) {
                return `${~~ (value / 60)}'${value % 60}"`
            }
        },
        methods: {
            async getMusic(id) {

                let data = await getRecordName(`soid=${id}`)

                // this.musicState = true
                // this.musicList = data.recordName
                if (data.code == 0) {
                    this.musicState = true
                    this.musicList = data.recordName

                } else {
                    alert(data.msg)
                }


            },
            serialize(hash) {
                let result = []

                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })

                return result.join("&")
            },
            searchFn() {
                this.page = 1
                this.search()
            },
            async search() {
                this.list = []

                this.typeb = this.type

                let params = {}

                if (this.typeb) {
                    if (this.typeb != -1) {
                        params.status = this.typeb
                    }
                }

                if (this.startTime) {
                    params.createTime = `${this.startTime} 00:00:00`
                }

                if (this.endTime) {
                    params.endTime = `${this.endTime} 00:00:00`
                }

                if (this.page) {
                    params.pageIndex = this.page
                }

                if (this.no) {
                    params.no = this.no
                }

                if (this.pageCount) {
                    params.pageSize = this.pageCount
                }

                if (this.keyword) {
                    params.words = this.keyword.trim()
                }

                params.createTimeDirection = 1

                if (this.orderSource === 0 || this.orderSource === 1) {
                    params.orderSource = this.orderSource
                }

                let data = await getOrder(this.serialize(params))

                this.list = data.list

                this.count = data.count
                this.total = data.count % 10 === 0 ? parseInt(data.count / 10) : parseInt(data.count / 10) + 1
            },
            cancelOrder(item) {
                window.item = item

                this.status = true
            },
            async sureCancel() {
                if (!this.reason) {
                    return
                }

                this.status = false

                let params = {
                    no: item.no,
                    reason: this.reason
                }

                let data = await cancelOrder(this.serialize(params))

                this.reason = ""

                location.reload()
            },
            sureHandleOrder(item) {
                window.item = item

                this.wei = true
            },
            async sureCancelWei() {
                if (!this.reasonWei) {
                    return
                }

                this.wei = false

                let params = {
                    no: item.no,
                    reason: this.reasonWei
                }

                //let reason = this.reasonWei
                let data = await handleOrder(this.serialize(params))

                this.reasonWei = ""

                location.reload()
            },
            pingjia(item) {
                window.item = item
                this.pingjiaStatusW = true /////////////////////////////////
            },
            tousu(item) {
                window.item = item

                this.tousuStatus = true
            },
            async sureTousu() {
                if (!this.reasonTousu) {
                    return
                }

                this.tousuStatus = false

                let params = {
                    no: item.no,
                    reason: this.reasonTousu
                }

                //let reason = this.reasonWei
                let data = await handleTousu(this.serialize(params))

                this.reasonTousu = ""

                location.reload()
            },
            tousuW(item) {
                window.item = item

                this.tousuStatusW = true
            },
            async sureTousuW() {
                if (!this.reasonTousuW) {
                    return
                }

                this.tousuStatusW = false

                let params = {
                    no: item.no,
                    reason: this.reasonTousuW
                }

                //let reason = this.reasonWei
                let data = await handleTousuW(this.serialize(params))

                this.reasonTousuW = ""

                item.status = 8
                item.refundStatus = 1
                //location.reload()
            },


            async surepingjiaW() {
                if (!this.reasonpingjiaW) {
                    return
                }

                this.pingjiaStatusW = false

                let params = {
                    no: item.no,
                    reason: this.reasonpingjiaW
                }

                let data = await handleTousu(this.serialize(params))

                this.reasonpingjiaW = ""

                data.code === 0 ? item.status = 7 : alert(`errMsg:${data.msg}`) // 7 => 投诉未处理

            },

            overNo(item) {

                this.overState = true
                window.item = item
            },

            async overCanel() {

                if (!this.overState) {
                    return
                }

                this.overState = false

                let data = await closeServiceOrder(`no=${item.no}`)

                data.code === 0 && this.search()
            },




            pageHandler: function(page) {
                this.page = page


                this.search()
            },
            createUrl: function(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },







        },
        ready() {
            document.title = "订单管理"

            this.search()
        }
    }
</script>
<style scoped>
    .musicList {
        display: flex;
        flex-direction: column;
    }

    .musicCont {
        flex: 1;
    }

    .musicItem {
        padding: 20px 0 0;
        border-bottom: 2px solid #eee;
    }


    audio::-webkit-media-controls {
        overflow: hidden !important
    }
    audio::-webkit-media-controls-enclosure {
        width: calc(100% + 32px);
        margin-left: auto;
    }
</style>
