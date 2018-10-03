<template>
    <div class="container-fluid">

        <div id="search" class="title">
            <input type="text" name="searchVal" placeholder="请输入题目关键词" v-model="searchVal">
            <input type="submit" value="搜索" class="btn btn-success" @click="search()" style="margin-right:50px;">
            <button class="btn btn-success" style="margin-right:30px;"><a href="javascript:;"
                                                                          @click="changeRoute('newTopics')"
                                                                          style="color:white;">新建题目</a></button>
        </div>
        <table class="table table-bordered table-striped" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>题目顺序</th>
                <th>题目ID</th>
                <th>测试题目</th>
                <th>选项</th>
                <th>维度</th>
                <th class="userList_opeartion_title">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in data">
                <!-- <tr> -->
                <td>{{ item.titleOrderNumber }}</td>
                <td>{{ item.id }}</td>
                <td>{{ item.problemWord }}
                    <template v-if="item.problemPicSrc">
                        <img :src=" imgPre + '/' + item.problemPicSrc" alt="">
                    </template>
                </td>
                <td>
                    <div v-for="item in item.tsoList">
                        <span>{{item.optionWord}}</span><span
                            style="margin-left: 10px">({{item.optionScore}}分)</span><br/>
                        <template v-if="item.optionPic">
                            <img :src=" imgPre + '/' + item.optionPic" alt="">
                        </template>
                    </div>
                </td>



                <td>
                    <div v-for="item in item.tsdList">{{item.name}}</div>
                </td>
                <td class="userList_opeartion">
                    <span @click="update(item.id)">修改</span>

                    <span @click="deleteTopic(item.id)">删除</span>
                </td>
            </tr>
            </tbody>
        </table>
        <div class='bottom'>
            <div id="test">
                <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"
                          :page-handler="pageHandler" :create-url="createUrl">
                </zpagenav>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Vue from "vue"
    import {getSource, getSources} from "../../api"
    import zpagenav from "vue-pagenav"

    Vue.use(zpagenav)

    export default {
        //  # Options
        // * :show    是否显示
        // * :type    date|datetime
        // * :value 默认值
        // * :begin  可选开始时间
        // * :end    可选结束时间
        // * :x      显示x坐标
        // * :y      显示y坐标
        // * :range  是否多选
        // * :weeks 星期标题
        // * :months    月份标题
        // * :sep       分隔符
        data() {
            return {
                imgPre: `http://${process.env.NODE_ENV == 'production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
                topicId: window.location.pathname.split('/')[2],
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 0, //how many links to show, must not less than 5,  default is 5
                data: [],
                pageIndex: 2,
                pageSize: 10,
                searchVal:'',
            }
        },
        computed: {},
        methods: {
            search() {
                this.queryTopic();
            },
            update(id) {
                console.log(id);
                this.$dispatch('child-msg', "新建/修改题目")
                this.$route.router.go("newTopics" + `?id=${id}&&topicId=${this.topicId}`)
            },
            deleteTopic(id){
              this.delete(id);
            },

            changeRoute(url) {
                if (url == "newTopics") {
                    this.$dispatch('child-msg', "新建/修改题目")
                    this.$route.router.go(url + `/${this.topicId}`)
                }

            },

            pageHandler(page) {
                this.page = page
            },

            createUrl(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },

            async queryTopic() {
                let data = await getSources("/testCenter/testScaleTitle/getAllMessage", `relateTestScaleId=${this.topicId}&pageIndex=${this.page}&pageSize=${this.pageSize}&problemWord=${this.searchVal}`);
                if (data.code == 0) {
                    this.data = data.contentList;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
                this.total = data.testScaleTitleNum;
            },




            async getTopic(id) {
                let data = await getSources("/testCenter/testScaleTitle/getAllMessage", `relateTestScaleId=${id}&pageIndex=${this.page}&pageSize=${this.pageSize}`);
                console.log(data);
                if (data.code == 0) {
                    this.data = data.contentList;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
                this.total = data.testScaleTitleNum;
            },
            async delete(id) {
                let data = await getSources("/testCenter/testScaleTitle/delete", `relateTestScaleId=${this.topicId}&id=${id}`);
                console.log(data);
                if (data.code == 0) {
                    this.getTopic(this.topicId)
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            pageHandler(page) {
                //here you can do custom state update
                this.page = page;
                this.getTopic(this.topicId);
            },
            createUrl(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },


        },

        ready() {
            this.getTopic(this.topicId)
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
