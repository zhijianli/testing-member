<template>
    <div class="container-fluid">
        <div id="search" class="title">
            <button class="btn btn-success" style="margin-right:30px;"><a href="javascript:;"
                                                                          @click="changeRoute('newArticle')"
                                                                          style="color:white;">新增</a></button>
            <!-- <input type="text" placeholder="请输入文章标题或作者" v-model="searchVal" name="searchVal">
            <button type="submit" class="tip-bottom" data-original-title="搜索" @click="search()"><i class="icon-search icon-white"></i></button> -->
            <input type="text" name="searchVal" placeholder="请输入文章标题或作者" v-model="searchVal">
            <input type="submit" value="搜索" class="btn btn-success" @click="search()" style="margin-right:50px;">
            <select v-model="selId1" name="selId1" value="{{selId1}}">
                <option :value="0" :selected="selId1 === 0">按文章类型</option>
                <option v-for="item of categoryLists" value="{{ item.categoryId }}">{{ item.categoryName}}</option>
            </select>

            <select v-model="selId2" name="selId2" value="{{selId2}}">
                <option :value="0" :selected="selId2 === 0">按文章标签</option>
                <option v-for="item of tagLists" value="{{ item.tagId }}">{{ item.tagName}}</option>
            </select>

            <select v-model="selId3" name="selId3" value="{{selId3}}">
                <option :value="0" :selected="selId3 === 0">所有文章</option>
                <option :value="1">回复最高</option>
                <option :value="2">收藏最高</option>
                <option :value="3">分享最高</option>
            </select>

            <button class="btn btn-success" style="float:right;margin-top:2px;"><a href="javascript:;"
                                                                                   @click="changeRoute('articleTypeManage')"
                                                                                   style="color:white;">文章类型管理</a>
            </button>

        </div>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
            <tr>
                <th>
                    <div class="checkbox">
                        <!-- <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox" @click="changeFn">
                        <label for="title-table-th" class="checkboxLabel"></label> -->
                        选中
                    </div>
                </th>
                <th>发布时间</th>
                <th>文章类型</th>
                <th>标签</th>
                <th>文章标题</th>
                <th>作者</th>
                <!-- <th>来源</th> -->
                <th>回复数</th>
                <th>收藏数</th>
                <th>分享数</th>
                <th>阅读数</th>
                <th>虚假阅读数</th>
                <th>权重(小时)</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,item) in data">
                <td>
                    <div class="checkbox">
                        <input type="checkbox"
                               class="checkboxInp"
                               name="title-table-checkbox"
                               id="title-table-td{{item.articleId}}"
                               :checked=" item.checkState? 'checked':''"
                               @click='selectPerson2(item.articleId,item)'
                               data-typeId="{{item.articleId}}">
                        <label class="checkboxLabel" for="title-table-td{{item.articleId}}"></label>
                    </div>
                </td>
                <td>{{item.createTime}}</td>
                <td>{{item.categoryName}}</td>
                <td>{{item.typeName}}</td>
                <td>{{item.title}}</td>
                <td>{{item.author}}</td>
                <!-- <td>{{item.source}}</td> -->
                <td>{{item.commentNum}}</td>
                <td>{{item.collectionNum}}</td>
                <td>{{item.share}}</td>
                <td>{{item.hits}}</td>


                <td id="unrealHits" contenteditable="true"
                    @input="changeUnrealHits(item.articleId,item.unrealHits,index)">{{item.unrealHits}}
                </td>
                <td id="weights" contenteditable="true"
                    @input="changeWeights(item.articleId,item.weights,index)">{{item.weights}}
                </td>
                <td>
                    <!-- <a href="/newArticle/{{ item.articleId }}" class="operation editArticle" @click="editFn(item.parentCategoryId , item.typeName, item.typeId)">修改</a> -->
                    <a href="javascript:;" class="operation editArticle btn btn-info"
                       @click="editFn(item.parentCategoryId , item.articleId , item.typeName, item.typeId )">编辑</a>
                    <!-- <a href="javascript:;" >删除</a> -->
                    <a class="btn btn-danger allDelte" href="javascript:;"
                       @click="deleteFn(item.articleId, item.title)">删除</a>
                </td>
            </tr>
            </tbody>
        </table>
        <div class='bottom'>
            <div id="test">
                <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"
                          :page-handler="pageHandler" :create-url="createUrl">
                    <zpagenav>
            </div>
            <div>
                <!-- <a class="btn btn-warning" href="/newArticle" @click="addFn()">新增</a> -->
                <!-- <a class="btn btn-warning" href="javascript:;" @click="changeRoute('newArticle')">新增</a> -->
                <!-- <a class="btn btn-danger allDelte" href="javascript:;" @click="deleteFn()">删除</a> -->
                <button class="btn-success" style="font-size:14px;" @click="downloadExcel">导出Excel</button>
                <a href="javascript:;" v-el:a></a>
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
            <p>确定将“{{ articleTitle }}”删除吗？</p>
        </div>
        <div class="modal-footer"><a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a> <a
                data-dismiss="modal" class="btn btn-danger" href="#" @click="configDelete()">确定</a></div>
    </div>
</template>
<script type="text/javascript">
    import $ from "jquery"
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import {
        getArticleByPage,
        deleteArticle,
        getCategoryList,
        obtainTags,
        newGetArticleByPage,
        exportArticle,
        getJson

    } from "../../api"

    Vue.use(zpagenav)


    export default {
        data() {
            return {
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 10, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                data: [],
                // checkState: false,
                default: '',
                searchVal: '',
                typeName: '',
                arrayTypeId: [],
                idelete: false,
                editTypeName: '',
                articleTitle: '',
                articleId: '',
                selId1: 0,//第一个下拉框选中的值
                selId2: 0,//第二个下拉框选中的值
                selId3: 0,//第三个下拉框选中的值
                judge1: false,//以下三个判断条件用来判断并阻止下拉框恢复默认事件的重复或错误执行
                judge2: false,
                judge3: false,
                categoryLists: [],
                tagLists: [],
                selectPersonList2: []
            }
        },
        watch: {
            page() {
                if (this.selId3 !== 0 && this.selId1 !== 0 && this.selId2 !== 0) {
                    this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&categoryId=${this.selId1}&tagId=${this.selId2}&mostTag=${this.selId3}`)
                } else if (this.selId3 !== 0 && this.selId1 === 0 && this.selId2 === 0) {
                    this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&mostTag=${this.selId3}`)
                } else if (this.selId2 !== 0 && this.selId3 === 0 && this.selId1 === 0) {
                    this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&tagId=${this.selId2}`)
                } else if (this.selId1 !== 0 && this.selId2 === 0 && this.selId3 === 0) {
                    this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&categoryId=${this.selId1}`)
                } else if (this.selId1 === 0 && this.selId2 === 0 && this.selId3 === 0) {
                    this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}`)
                } else {
                    console.log("overflow")
                }

            },
            selId1() {
                if (!this.judge1) {
                    if (this.selId2 !== 0) {
                        this.judge2 = true
                        this.selId2 = 0
                    }
                    if (this.selId3 !== 0) {
                        this.judge3 = true
                        this.selId3 = 0
                    }
                    this.judge1 = false

                    if (this.selId1 !== 0) {
                        this.page = 1
                        this.maxLink = 10
                        this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&categoryId=${this.selId1}`)
                    } else {
                        this.page = 1
                        this.maxLink = 10
                        this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}`)
                    }
                }
                this.judge1 = false

            },
            selId2() {
                if (!this.judge2) {
                    if (this.selId1 !== 0) {
                        this.judge1 = true
                        this.selId1 = 0
                    }
                    if (this.selId3 !== 0) {
                        this.judge3 = true
                        this.selId3 = 0
                    }

                    this.judge2 = false
                    if (this.selId2 !== 0) {
                        this.page = 1
                        this.maxLink = 10
                        this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&tagId=${this.selId2}`)
                    } else {
                        this.page = 1
                        this.maxLink = 10
                        this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}`)
                    }

                }
                this.judge2 = false


            },
            selId3() {
                if (!this.judge3) {
                    if (this.selId1 !== 0) {
                        this.judge1 = true
                        this.selId1 = 0
                    }

                    if (this.selId2 !== 0) {
                        this.judge2 = true
                        this.selId2 = 0
                    }
                    this.judge3 = false

                    if (this.selId3 !== 0) {
                        this.page = 1
                        this.maxLink = 10
                        console.log(typeof this.selId3)
                        this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&mostTag=${this.selId3}`)
                    } else {
                        this.page = 1
                        this.maxLink = 10
                        console.log(typeof this.selId3)
                        this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}`)
                    }
                }

                this.judge3 = false

            }
        },
        methods: {


            changeUnrealHits(id, aa, index) {

                let v = document.querySelectorAll('#unrealHits')[index].innerHTML;

                if (v == aa) {

                } else {
//                    this.data[index].unrealHits=v;
                    let object = {};
                    object.articleId = id;
                    object.unrealHits = v;
                    let n = JSON.stringify([object]);
                    this.updateUnrealHits(n);

                }
            },


            changeWeights(id, aa, index) {
                let v = document.querySelectorAll('#weights')[index].innerHTML;
                if (v == aa) {

                } else {
//                    this.data[index].weights=v;
                    let object = {};
                    object.articleId = id;
                    object.weights = v;
                    let n = JSON.stringify([object]);
                    this.updateUnrealHits(n);

                }
            },


            async updateUnrealHits(object) {
                let data = await getJson("/depression-web/Article/motifyArticleByWeightsOrUnrealHits.json", object);
                if (data.code === 0) {

//                    this.newGetArticleByPage(this.default)
                } else {
                    alert(`errMsg:${data.msg}`)
                }

            },
            selectPerson2(id, item) {

                console.log("selectPerson2:", item.checkState);
                item.checkState = !item.checkState
                if (item.checkState) {
                    this.selectPersonList2.push(id)
                } else {
                    for (let i = 0; i < this.selectPersonList2.length; i++) {
                        if (this.selectPersonList2[i] == id) {
                            this.selectPersonList2.splice(i, 1)
                        }
                    }

                }
                console.log(`selectPerson2:${this.selectPersonList2}`)
            },
            changeRoute(url) {

                if (url == "newArticle") {
                    this.$dispatch('child-msg', "新增文章")
                } else if (url == "articleTypeManage") {
                    this.$dispatch('child-msg', "文章类型管理")
                }
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
                this.$dispatch('child-msg', "编辑文章")
                this.$route.router.go(`/newArticle/${articleId}`)

            },
            search() {
                // let params = `pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}`

                // this.newGetArticleByPage(params)
                this.selectPersonList2 = []
                this.page = 1
                this.maxLink = 10
                if (this.selId3 !== 0 && this.selId1 !== 0 && this.selId2 !== 0) {
                    this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&categoryId=${this.selId1}&tagId=${this.selId2}&mostTag=${this.selId3}`)
                } else if (this.selId3 !== 0 && this.selId1 === 0 && this.selId2 === 0) {
                    this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&mostTag=${this.selId3}`)
                } else if (this.selId2 !== 0 && this.selId3 === 0 && this.selId1 === 0) {
                    this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&tagId=${this.selId2}`)
                } else if (this.selId1 !== 0 && this.selId2 === 0 && this.selId3 === 0) {
                    this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&categoryId=${this.selId1}`)
                } else if (this.selId1 === 0 && this.selId2 === 0 && this.selId3 === 0) {
                    this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}`)
                } else {
                    console.log("overflow")
                }
            },


            deleteFn(articleId, title) {
                let self = this
                this.idelete = true
                // $('table tbody input:checked').each(function() {
                //     self.arrayTypeId.push($(this).attr('data-typeid'))
                // })


                // if (self.arrayTypeId.length > 0) {
                //     this.deleteCont = "您确定删除吗?"
                // }
                this.articleTitle = title
                this.articleId = articleId

            },

            configDelete() {

                let params = `articleId=${this.articleId}`
                console.log("test:", params)
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

                    // this.getArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}`)
                    this.newGetArticleByPage(`pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}`)

                } else {
                    alert("删除失败")
                }
            },

            async newGetArticleByPage(params) {
                let data = await newGetArticleByPage(params)
                console.log("data:", data)


                this.data = data.Articles


                this.total = data.totalCount
                //修改
                this.data.forEach((item) => {   //checkBox
                    Vue.set(item, "checkState", false);
                })
                //修改选中状态
                this.data.forEach((item) => {
                    //当列表中有此id时修改选中状态为选中
                    this.selectPersonList2.forEach((v) => {
                        if (item.articleId == v) {
                            Vue.set(item, "checkState", true);
                        }
                    })
                })

            },


            //导出到excel
            async downloadExcel() {
                let params = {}
                if (this.selectPersonList2.length > 0) {
                    let ids = JSON.stringify(this.selectPersonList2);
                    params.ids = ids
                }

                if (this.selId3 !== 0 && this.selId1 !== 0 && this.selId2 !== 0) {
                    params.words = this.searchVal
                    params.categoryId = this.selId1
                    params.tagId = this.selId2
                    params.mostTag = this.selId3
                } else if (this.selId3 !== 0 && this.selId1 === 0 && this.selId2 === 0) {
                    params.words = this.searchVal
                    params.mostTag = this.selId3

                } else if (this.selId2 !== 0 && this.selId3 === 0 && this.selId1 === 0) {
                    params.words = this.searchVal
                    params.tagId = this.selId2
                } else if (this.selId1 !== 0 && this.selId2 === 0 && this.selId3 === 0) {
                    params.words = this.searchVal
                    params.categoryId = this.selId1
                } else if (this.selId1 === 0 && this.selId2 === 0 && this.selId3 === 0) {
                    params.words = this.searchVal

                } else {
                    console.log("overflow")
                }

                let p = this.serialize(params)
                console.log("p:", p)
                let data = await exportArticle(p)
                console.log(data)

                let blob = new Blob([data], {
                        'type': 'application/msexcel'
                    }),
                    a = this.$els.a

                a.href = window.URL.createObjectURL(blob)
                a.download = `文章列表.xls`
                a.click()
            },
            serialize(hash) {
                let result = []

                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })

                return result.join("&")
            },

            async getArticleData() {
                let data = await getCategoryList()
                if (data.code === 0) {
                    this.categoryLists = data.Category
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async getArticleTags() {
                let data = await obtainTags()
                if (data.code === 0) {
                    this.tagLists = data.tags
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

        },

        ready() {
            this.default = `pageIndex=${this.page}&pageSize=${this.maxLink}`
            this.newGetArticleByPage(this.default)
            this.getArticleData()
            this.getArticleTags()
        }
    }
</script>
