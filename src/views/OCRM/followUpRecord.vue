<style scoped>
    .record{
        margin-top: 25px;

    }
    .record li {
        display: flex;
    }

    .record .circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #999;
    }
    .record li .main{
        margin-left: 25px;
    }
    .record li .main .info{
        border-left: 1px solid #797979;
        margin-left: 25px;
        padding-left: 50px;
        padding-bottom: 20px;
        max-width:800px;
    }
    .followBtn{
        color: #0f87fa;
        cursor: pointer;
    }
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
    <div class="container-fliud">
        <ul class="record">
            <li v-for="item in list">
                <div class="time">{{item.createTime}}</div>
                <div class="main">
                    <div class="circle"></div>
                    <div class="info">
                        <div>跟进助理：{{item.operatorConsultAssistantName}}</div>
                        <div>跟进记录：{{item.followRecord}}</div>
                        <div>操作：{{item.operationContent}} </div>
                        <div v-if="item.crmClueRelateOrder.orderId">订单号：{{item.crmClueRelateOrder.orderId}} </div>
                        <div class="followBtn" @click="look(item.screenshotOne,item.screenshotTwo,item.screenshotThree,item.screenshotFour)">查看截图</div>
                    </div>

                </div>
            </li>

        </ul>
        <div class="modal-backdrop in" v-if="editRemark"></div>
        <div id="edtCount2" class="modal" v-if="editRemark"
             style="width: 1000px;top:20px;margin-left: 0;transform: translateX(-50%)">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
                <h3>查看</h3>
            </div>
            <div class="modal-body row-fluid" style="max-height: 800px;">
                <!--<div class="form-horizontal">-->
                    <!--<label class="control-label">订单号 :</label>-->
                    <!--<div class="controls form-horizontal">-->

                        <!--<div class="clearfix">-->
                            <!--<input type="text" style="width: 400px" v-model="orderId">-->
                        <!--</div>-->
                       <!---->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="form-horizontal">-->
                    <!--<label class="control-label">服务期限 :</label>-->
                    <!--<div class="controls form-horizontal">-->

                        <!--<div class="clearfix">-->
                            <!--<input type="text" style="width: 400px" placeholder="次数/月/整案" v-model="servicePeriod">-->
                        <!--</div>-->
                        <!---->
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
                                            <img alt="暂无截图" width="300" height="200" :src="url + id1">
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
                                            <img alt="暂无截图" width="300" height="200" :src="url + id2">
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
                                            <img alt="暂无截图" width="300" height="200" :src="url + id3">
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
                                            <img alt="暂无截图" width="300" height="200" :src="url + id4">
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
                <a data-dismiss="modal" class="btn " href="#" @click="close()">关闭</a>
                <template v-if="isUserCanEdit">
                    <a data-dismiss="modal" class="btn btn-danger" href="#" v-if="! isSendingRemarkData"
                       @click="saveEditRemarkFn()">保存</a>
                    <a data-dismiss="modal" class="btn btn-danger" href="#" v-else>发送中。。。</a>
                </template>
            </div>
        </div>
    </div>
</template>


<script type="text/javascript">
    import Vue from "vue"
    import $ from "jquery"
    import zpagenav from "vue-pagenav"
    import {
        getResponse,
        getResponses,
        getCourse
    } from "../../api"
    import {
        serialize
    } from "../../utils"

    Vue.use(zpagenav)

    export default {
        components: {},
        data: function () {
            return {
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
                isSendingRemarkData: false,
                editRemark: false,
                screenshotOneTime: '',
                screenshotTwoTime: '',
                screenshotThreeTime: '',
                screenshotFourTime: '',
//

                list: [],

            }
        },
        methods: {

            look(a,b,c,d){
                console.log(a,b,c,d)
                this.id1=a;
                this.id2=b;
                this.id3=c;
                this.id4=d;
                this.editRemark = true;
            },
            close() {
                this.editRemark = false;
            },
            serialize(hash) {
                let result = []
                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })
                return result.join("&")
            },

            // 接口名称 根据专家分类id获取该分类下的专家信息
            async search() {
                const data = await getCourse('crm/clueFollowHistory/getAllFollowHistoryByClueId', `clueId=${this.$route.query.id}`)

                if (data.code === 0) {
                    this.list = data.crmClueFollowHistoryList
                } else {
                    alert(data.msg)
                }

            },

        },


        filters: {
            sexType(tag) {
                let arr = ['未知', '男', '女']
                return arr[tag]
            }
        },

        ready() {
            // this.obtainRecommendData();
            this.search();
        },


        watch: {
            page() {
                // this.getExpertsListByTagId();
            },
        }

    }
</script>