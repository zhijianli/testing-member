<template>
    <div class="container-fluid">

        <div id="search" class="title">
            <input type="text" name="searchVal" placeholder="请输入量表名" v-model="msg" @change="bb">
            <input type="submit" value="检索" class="btn btn-success" @click="search()" style="margin-right:50px;">
            <button class="btn btn-success" style="margin-right:30px;"><a href="javascript:;"
                                                                          @click="changeRoute('newScale')"
                                                                          style="color:white;">新建量表</a></button>
        </div>

        <table class="table table-bordered table-striped" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>名称</th>
                <th>分类</th>
                <th>人群范围</th>
                <th>量表价格</th>
                <th>题目数</th>
                <th>测试人次</th>
                <th>创建时间</th>
                <th>上次修改时间</th>
                <th>创建人</th>
                <th>操作状态</th>
                <th>置顶状态</th>
                <th>结果展示剖面图</th>
                <th class="userList_opeartion_title">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in data">
                <!-- <tr> -->
                <td>{{ item.name}}</td>
                <td><span style="margin-right: 10px" v-for="i in item.tscList">{{i.name}}</span></td>
                <td>
                    <div v-for="i in item.tsprList">
                        {{i.sex == 'man' ? '男' : '女'}} 年龄范围:{{i.lowerAgeLimit}}-{{i.upperAgeLimit}}
                    </div>
                </td>

                <td>{{ item.price}}</td>
                <td>{{ item.numberOfTitle }}</td>
                <td>{{ item.numberOfTest }}</td>
                <td>{{ item.createTime | time }}</td>
                <td>{{item.updateTime | time}}</td>
                <td>{{ item.founder}}</td>
                <td v-text="item.isEnable?'已上线':'未上线'" style="color: #41BEDD;cursor: pointer"
                    @click="enable(item.id,item.isEnable)"></td>
                <td v-text="item.isTop?'已置顶':'未置顶'" style="color: #41BEDD;cursor: pointer"
                    @click="top(item.id,item.isTop)"></td>
                <td v-text="item.isShowDimensionProfile?'未展示':'已展示'" style="color: #41BEDD;cursor: pointer"
                    @click="show(item.id,item.isShowDimensionProfile)"></td>
                <td class="userList_opeartion">
                    <span @click="jump(item.id)">修改</span>
                    <span @click="crowd(item.id)">新增/修改人群范围</span>
                    <span @click="topic(item.id)">题目</span>
                    <span @click="dimension(item.id)">维度</span>
                    <span @click="qualitative(item.id)">定性</span>
                    <span @click="delete(item.id)">删除</span>
                </td>
            </tr>
            </tbody>

        </table>
        <div class="order-page">
            <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"
                      :page-handler="pageHandler" :create-url="createUrl"></zpagenav>
        </div>
    </div>


</template>
<script type="text/javascript">

    import Vue from "vue"
    import {getSource, getSources} from "../../api"
    import zpagenav from "vue-pagenav"

    Vue.use(zpagenav);

    Vue.filter('time', function (value) {
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

    export default {
        data() {
            return {
                msg: '',
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 0, //how many links to show, must not less than 5,  default is 5
                data: [],
                pageSize: 10,
            }
        },
        methods: {
            enable(a, b) {
                if (b == 1) {
                    b = 0;
                } else {
                    b = 1;
                }
                this.isEnable(a, b);
            },
            top(a, b) {
                if (b == 1) {
                    b = 0;
                } else {
                    b = 1;
                }
                this.isTop(a, b);
            },
            show(a, b) {
                if (b == 1) {
                    b = 0;
                } else {
                    b = 1;
                }
                this.isShow(a, b);
            },
//            search() {
//                this.queryScale();
//            },
            delete(id) {
                let that = this;
                let a = confirm("删除量表时，你将会同时删除此量表下面的题目，维度，定性，人群范围，确定删除？")
                if (a === true) {
                    that.deleteScale(id)
                } else {

                }
            },

            changeC(item, i) {
                this.changeCrowd(item, i)
            },
            jump(id) {
                this.$dispatch('child-msg', "新建/修改测试详情")
                this.$route.router.go(`/newScale/${id}`)
            },
            crowd(id) {
                this.$dispatch('child-msg', "新建/修改人群范围")
                this.$route.router.go(`/newCrowd/${id}`)
            },
            topic(id) {
                this.$dispatch('child-msg', "题目管理")
                this.$route.router.go(`/topicManagement/${id}`)
            },
            dimension(id) {
                this.$dispatch('child-msg', "维度管理")
                this.$route.router.go(`/dimensionManagement/${id}`)
            },
            qualitative(id) {
                this.$dispatch('child-msg', "定性管理")
                this.$route.router.go(`/qualitativeManagement/${id}`)
            },

            changeRoute(url) {

                if (url == "newScale") {
                    this.$dispatch('child-msg', "新建/修改测试详情")
                } else if (url == "articleTypeManage") {
                    this.$dispatch('child-msg', "文章类型管理")
                }
                this.$route.router.go(url)
            },


            async getScale() {
                let data = await getSources("/testCenter/testScaleInfo/getAllMessage", `name=${this.msg}&pageIndex=${this.page}&pageSize=${this.pageSize}`);
                console.log(data);
                if (data.code == 0) {
                    this.data = data.contentList;
                    this.total = data.testScaleNum;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
//                this.total = data.count;
            },

            async isEnable(id, num) {
                let data = await getSources("/testCenter/testScaleInfo/setOnLine", `id=${id}&isEnable=${num}`);
                console.log(data);
                if (data.code == 0) {
                    this.getScale();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async isTop(id, num) {
                let data = await getSources("/testCenter/testScaleInfo/setTop", `id=${id}&isTop=${num}`);
                console.log(data);
                if (data.code == 0) {
                    this.getScale();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async isShow(id, num) {
                let data = await getSources("/testCenter/testScaleInfo/setIsShowDimensionProfile", `id=${id}&isShowDimensionProfile=${num}`);
                console.log(data);
                if (data.code == 0) {
                    this.getScale();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async deleteScale(id) {
                let data = await getSources("/testCenter/testScaleInfo/delete", `id=${id}`);
                console.log(data);
                if (data.code == 0) {
                    this.getScale();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

//            async queryScale() {
//                this.page = 1;
//                this.pageSize = 10;
//                let data = await getSources("/testCenter/testScaleInfo/getAllMessage", `name=${this.msg}&pageIndex=${this.page}&pageSize=${this.pageSize}`);
//                if (data.code == 0) {
//                    this.data = data.contentList;
//                    this.total = data.testScaleNum;
//                } else {
//                    alert(`errMsg:${data.msg}`)
//                }
//            },

            async changeCrowd(item, i) {
                let data = await getSources("/testCenter/testScalePopulationRange/update", `id=${this.id}`);
                console.log(data);
                if (data.code == 0) {
                    this.data = data.testScaleInfoMessage;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
                this.total = data.testScaleInfoMessage.length;
            },

            search() {
                this.getScale();
            },

            pageHandler: function (page) {
                this.page = page
                this.getScale();

            },
            createUrl: function (unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },


        },
        ready() {
            this.getScale(1);
        }
    }
</script>
<style scoped>
    .calendarInputClass {
        background-color: #fff;
        color: #000;
        border: none;
        padding: 4px 10px 5px;
        /* border: 1px solid ; */
        border: 1px solid rgb(169, 169, 169);
        width: 160px;
        margin-bottom: 0;

    }

    .select2-drop-active .select2-results .select2-highlighted {
        background: #446e9b;
    }

    /* .select2-results .select2-highlighted {
        background: #3875d7;
        color: #fff;
    }
     */
    .select2-drop {
        position: absolute;
        z-index: 9999;
        top: 100%;
        background: #fff;
        color: #000;
        border: 1px solid #aaa;
        border-top: 0;
        border-radius: 0 0 4px 4px;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
        box-sizing: border-box;
        /* min-width: 225px !important; */
        width: 184px;
        min-height: 50px;
    }

    .select2-results {
        max-height: 200px;
        padding: 0 0 0 4px;
        margin: 4px 4px 4px 0;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .select2-results li {
        list-style: none;
        display: list-item;
        background-image: none;
    }

    .select2-results li:hover {
        background-color: #446e9b;
        color: #fff;

    }

    .select2-results .select2-result-label {
        padding: 3px 7px 4px;
        margin: 0;
        cursor: pointer;
        min-height: 1em;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .select2-results .user-telphone {
        color: #999;
    }

    .userList_opeartion span {
        margin: 10px;
        cursor: pointer;
    }

    .modal_userList_cover {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 6;
    }

    .modal_userList_Wrap {
        width: 300px;
        /* height: 420px; */
        background-color: white;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, 0);
        border: 1px solid black;
    }

    .modal_userList_Wrap_title {
        height: 60px;
        background-color: rgb(240, 240, 240);
        line-height: 60px;
        text-indent: 2em;
    }

    .modal_userList_Wrap ul {
        /* padding:0 10px 0 20px; */
    }

    .modal_userList_Wrap ul li span {
        display: inline-block;
        line-height: 40px;
    }

    .modal_userList_box_left_span {
        width: 100px;
        text-indent: 2em;
    }

    .modal_userList_Wrap_bottom {
        height: 60px;
        background-color: rgb(240, 240, 240);
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .modal_userList_Wrap_bottom span {
        cursor: pointer;
        display: inline-block;
        height: 30px;
        width: 70px;
        background-color: white;
        line-height: 30px;
        margin: 10px;
        text-align: center;
    }

    .modal_userList_Wrap_bottom_rightBtn {
        color: red;
    }

    .modal_userList_box_left_span_sel1 {
        padding: 5px 6px;
        width: 55px;
        cursor: pointer;
        margin-bottom: 0;
        height: 31px;
    }

    .modal_userList_box_left_span_sel2 {
        width: 60px;
    }

    .telInp {
        border: 1px solid rgb(169, 169, 169);
        margin-bottom: 0;
    }

    .modal_userList_Wrap ul li .modal_userList_box_left_span_text {
        line-height: 20px;
        color: red;
    }

    .modal_userList_Wrap ul li .modal_userList_box_left_span_text2 {
        line-height: 20px;
        color: green;
    }

    .modal_userList_box_left_span_sel2 {
        padding: 4px 6px;
        width: 184px;
        cursor: pointer;
    }
</style>
