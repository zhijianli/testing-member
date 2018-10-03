<template>
    <div class="container-fluid">

        <div id="search" class="title">

            <button class="btn btn-success" style="margin:0 0 10px;"><a href="javascript:;"
                                                                        @click="changeRoute('newCourse')"
                                                                        style="color:white;">新建</a></button>
        </div>
        <table class="table table-bordered table-striped" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>课程ID</th>
                <th>课程名称</th>
                <th>创建时间</th>
                <th>主讲人</th>
                <th>课节数</th>
                <th>学习人数（播放数）</th>
                <th>价格（元）</th>
                <th>购买数</th>
                <th>累计收入（元）</th>
                <th>当前状态</th>
                <th class="userList_opeartion_title">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in curriculum">
                <!-- <tr> -->
                <td>{{ item.id}}</td>
                <td>{{item.curriculumTitle}}</td>
                <td>
                    {{item.createTime}}
                </td>


                <td>{{ item.speaker}}</td>
                <td>{{ item.uploaded }}/{{ item.totalHours }}节</td>
                <td>{{ item.studyNums }}</td>
                <td>{{ item.price }}</td>
                <td>{{item.buyNums}}</td>
                <td>{{ item.sumPrice}}</td>


                <td v-text="item.status==='1'?'下架':'上架'"></td>
                <td class="userList_opeartion">
                    <span @click="jump(item.id)">编辑</span>
                    <span @click="crowd(item.id)">章节管理</span>
                    <span @click="enshelves(item.id,item.status)" v-text="item.status==='1'?'上架':'下架'"></span>
                    <span @click="deleteC(item.id)">删除</span>
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
    import {getCourse} from "../../api"
    import zpagenav from "vue-pagenav"

    Vue.use(zpagenav);


    export default {
        data() {
            return {
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 0, //how many links to show, must not less than 5,  default is 5
                curriculum: [],
                pageSize: 10,
            }
        },
        methods: {
            enshelves(a, b) {
                console.log(b);
                if (b == 1) {
                    b = 0;
                } else {
                    b = 1;
                }
                this.isShelves(a, b);
            },
            deleteC(id) {
                let that = this;
                let a = confirm("确认删除吗？")
                if (a === true) {
                    that.deleteScale(id)
                } else {

                }
            },
            jump(id) {
                this.$dispatch('child-msg', "新建/修改课程管理")
                this.$route.router.go(`/newCourse/${id}`)
            },
            crowd(id) {
                this.$dispatch('child-msg', "章节管理")
                this.$route.router.go(`/chapterManage/${id}`)
            },
            changeRoute(url) {

                if (url === "newCourse") {
                    this.$dispatch('child-msg', "新建/修改课程管理")
                }
                this.$route.router.go(url)
            },

            pageHandler: function (page) {
                this.page = page
                this.getScale();

            },
            createUrl: function (unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },

            async getScale() {
                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);

                if (data.code === 0) {
                    this.curriculum = data.curriculum;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
                this.total = data.count;
            },
            async isShelves(id, num) {
                let data = await getCourse("curriculum/updateCurriculumStatus.json", `id=${id}&status=${num}`);

                if (data.code === 0) {
                    this.getScale();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async deleteScale(id) {
                let data = await getCourse("curriculum/deleteCurriculum.json", `id=${id}`);
                console.log(data);
                if (data.code == 0) {
                    this.getScale();
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },


        },
        ready() {
            this.getScale();
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
