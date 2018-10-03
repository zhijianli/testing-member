<template>
    <div class="container-fluid">
        <div id="search">
            <input type="text" placeholder="请输入类型名称..." v-model="searchVal" name="searchVal">
            <button type="submit" class="tip-bottom" data-original-title="搜索" @click="search()"><i class="icon-search icon-white"></i></button>
        </div>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
                <tr>
                    <th>
                        <div class="checkbox">
                            <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox" @click="changeFn">
                            <label for="title-table-th" class="checkboxLabel"></label>
                        </div>
                    </th>
                    <th>类型名称</th>
                    <th>类别名称</th>
                    <th>文章名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of data">
                    <td>
                        <div class="checkbox">
                            <input type="checkbox" class="checkboxInp" name="title-table-checkbox" id="title-table-td{{item.articleId}}" :checked="checkState" data-typeId="{{item.articleId}}">
                            <label class="checkboxLabel" for="title-table-td{{item.articleId}}"></label>
                        </div>
                    </td>
                    <td>{{ item.typeName}}</td>
                    <td>{{ item.categoryName}}</td>
                    <td>{{ item.title }}</td>
                    <td>
                        <!-- <a href="/newArticle/{{ item.articleId }}" class="operation editArticle" @click="editFn(item.parentCategoryId , item.typeName, item.typeId)">修改</a> -->
                        <a href="javascript:;" class="operation editArticle" @click="editFn(item.parentCategoryId , item.articleId , item.typeName, item.typeId )">修改</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class='bottom'>
            <div id="test">
                <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
                    <zpagenav>
            </div>
            <div>
                <!-- <a class="btn btn-warning" href="/newArticle" @click="addFn()">新增</a> -->
                <a class="btn btn-warning" href="javascript:;" @click="changeRoute('newArticle')">新增</a>
                <a class="btn btn-danger allDelte" href="javascript:;" @click="deleteFn()">删除</a>
            </div>
        </div>
    </div>
    <!-- 删除 -->
    <div class="modal-backdrop in" v-if="idelete"></div>
    <div id="myAlert" class="modal" v-if="idelete">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>删除</h3>
        </div>
        <div class="modal-body">
            <p>{{ deleteCont }}</p>
        </div>
        <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDelete()">确定</a> </div>
    </div>
</template>
<script type="text/javascript">
import $ from "jquery"
import Vue from "vue"
import zpagenav from "vue-pagenav"
import {
    getArticleByPage,
    deleteArticle
} from "../../api"

Vue.use(zpagenav)

export default {
    data() {
            return {
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 10, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                data: [],
                checkState: false,
                default: '',
                searchVal: '',
                typeName: '',
                arrayTypeId: [],
                idelete: false,
                editTypeName: ''

            }
        },
        methods: {
            changeRoute(url) {
                this.$route.router.go(url)
            },
            pageHandler(page) {
                //here you can do custom state update
                this.page = page
            },
            createUrl(unit) {
                return unit.page > 1 ? '#page=' + unit.page : '#'
            },
            changeFn(e) {
                this.checkState = e.target.checked
            },
            editFn(parentCategoryId, articleId) {
                !!parentCategoryId && (sessionStorage.parentCategoryId = parentCategoryId) //解决2级类别传不到编辑的方案

                this.$route.router.go(`/newArticle/${articleId}`)
            },
            search() {
                let params = `pageIndex=${this.page}&pageSize=${this.maxLink}&title=${this.searchVal}`

                this.getArticleByPage(params)
            },


            deleteFn() {
                let self = this
                this.idelete = true
                $('table tbody input:checked').each(function() {
                    self.arrayTypeId.push($(this).attr('data-typeid'))
                })


                if (self.arrayTypeId.length > 0) {
                    this.deleteCont = "您确定删除吗?"
                }
            },

            configDelete() {

                let params = `articleId=${this.arrayTypeId}`

                this.deleteArticle(params)
            },
            close() {
                this.idelete = false
            },
            async deleteArticle(params) {

                let data = await deleteArticle(params)
                this.idelete = false
                this.arrayTypeId = []
                if (data.code == 0) {

                    this.getArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}`)
                } else {
                    alert("删除失败")
                }
            },

            async getArticleByPage(params) {
                let data = await getArticleByPage(params)
                this.data = data.Articles
                this.total = data.totalCount
            },
        },
        watch: {
            page() {
                this.default = `pageIndex=${this.page}&pageSize=${this.maxLink}`
                this.getArticleByPage(this.default)
            }
        },
        ready() {
            this.default = `pageIndex=${this.page}&pageSize=${this.maxLink}`
            this.getArticleByPage(this.default)
        }
}
</script>
