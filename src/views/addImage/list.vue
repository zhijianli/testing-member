<template>

	<div class="container-fluid">
		<div id="search">
            <input type="text" name="descp" placeholder="请输入问卷名称" v-model="descp" >
            <button type="submit" class="tip-bottom" data-original-title="搜索" @click="seach()"><i class="icon-search icon-white"></i></button>
        </div>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
                <tr>
                    <th>
                    	<div class="checkbox">
                    		<input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox"  :checked="checkState" @click="changeFn">
                        	<label for="title-table-th" class="checkboxLabel"></label>
                    	</div>
                    </th>
                    <th>问卷id</th>
                    <th>问卷简介</th>
                    <th>图片路径</th>
                    <th>类型</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
            	<tr v-for="item in list">
				    <td>
				    	<div class="checkbox">
                    		<input type="checkbox" id="title-table-td{{item.cpid}}" class="checkboxInp" name="title-table-checkbox"  :checked="checkState"  data-typeid="{{ item.cpid }}" @click="selectPerson(item)">
				        	<label for="title-table-td{{item.cpid}}" class="checkboxLabel"></label>
                    	</div>
				    </td>
				    <td>{{ item.testingId }}</td>
				    <td>{{ item.descp}}</td>
				    <td><img :src="imgPre+'/'+item.filePath"></td>
				    <td>{{ item.type | typeFliter  }}</td>
				    <td>{{ item.isEnable | ableFilter}}</td>
				    <td>
				    	<a href="javascript:;" @click="changeRoute(`/addimage/${item.cpid}`)">编辑</a>
				    </td>
				</tr>
			</tbody>
		</table>
        <div class='bottom' style="display:fix">
            <div id="test">
                <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
            </div>
            <p>
                <!-- <a class="btn btn-warning" id="addVip" href="/addimage" >新增</a> -->
                <a class="btn btn-warning" id="addVip"  href="javascript:;" @click="changeRoute('addimage')" >新增</a>
                <a class="btn btn-danger" href="#" @click="btnDisable()">禁用</a>
                <a class="btn btn-success" href="#" @click="btnStart()">启用</a>
            </p>
        </div>
	</div>

<div class="modal-backdrop in" v-if="disable"></div>
<div id="forbid" class="modal" v-if="disable">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>禁用</h3>
    </div>
    <div class="modal-body">
        <p>{{ containTitle }}</p>
    </div>
    <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configDisable()">确定</a> </div>
</div>
<div class="modal-backdrop in" v-if="start"></div>
<div id="start" class="modal" v-if="start">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>启用</h3>
    </div>
    <div class="modal-body">
        <p>{{ containTitle }}</p>
    </div>
    <div class="modal-footer"> <a data-dismiss="modal" class="btn " href="#" @click="close()">取消</a> <a data-dismiss="modal" class="btn btn-danger" href="#" @click="configStart()">确定</a> </div>
</div>
<!--End弹窗内容-->

</template>
<script type="text/javascript">
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import $ from "jquery"
    import {
        bannerList,
        bannerStatus
    } from "../../api"
    Vue.use(zpagenav)

    import {
        serialize
    } from '../../utils.js'
    export default {
        // props: ['imgPre'],
        data() {
            return {
                imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                list: [],
                descp: '',
                disable: '',
                start: '',
                checkState: false,
                arrayTypeId: [],
                selectPersonList: [], // CheckBox选中的
                containTitle: "请勾选操作的内容！"
            }
        },
        watch: {
            page() {
                this.bannerList(`pageIndex=${this.page}&pageSize=${this.maxLink}&descp=${this.descp}`)
            }
        },
        methods: {


            selectPerson(item) {
                console.log(item.checkState)
                item.checkState = !item.checkState
                if (item.checkState) {
                    this.selectPersonList.push(item.testingId)
                } else {
                    this.selectPersonList.shift(item.testingId)
                }
                console.log(`selectPerson:${this.selectPersonList}`)
            },

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

            async bannerList() {

                let paramsObj = {
                    pageSize: 10,
                    pageIndex: this.page
                }

                if (this.descp) {
                    paramsObj.descp = this.descp
                }

                let params = serialize(paramsObj)

                let data = await bannerList(params)
                if (data.code == 0) {

                    this.checkState = false
                        // this.arrayTypeId = []
                    this.selectPersonList = []
                    this.list = data.list
                    this.total = data.count

                    this.list.forEach((item) => { //checkBox
                        Vue.set(item, "checkState", false)
                    })

                } else {

                    alert(data.msg)

                }

            },
            async bannerStatus(params) {

                let data = await bannerStatus(params)
                if (data.code == 0) {
                    this.bannerList()
                } else {
                    alert(data.msg)
                }

                this.disable = false
                this.start = false

            },
            seach() {
                this.bannerList()
            },

            changeFn(e) {
                this.checkState = e.target.checked
            },
            btnDisable() {

                // this.deleteFn()
                this.containTitle = (this.arrayTypeId.length > 0 ? "您确定禁用当前问卷状态？" : this.containTitle)
                this.disable = true

            },
            btnStart() {
                // this.deleteFn()
                this.containTitle = (this.arrayTypeId.length > 0 ? "您确定启用当前问卷状态？" : this.containTitle)
                this.start = true

            },

            configDisable() {

                // this.bannerStatus(`pageIndex=${this.page}&pageSize=${this.maxLink}&descp=${this.descp}&isDel=1&ids=${this.arrayTypeId}`)
                this.bannerStatus(`pageIndex=${this.page}&pageSize=${this.maxLink}&descp=${this.descp}&isDel=1&ids=${this.selectPersonList}`)

            },

            configStart() {

                // this.bannerStatus(`pageIndex=${this.page}&pageSize=${this.maxLink}&descp=${this.descp}&isDel=0&ids=${this.arrayTypeId}`)
                this.bannerStatus(`pageIndex=${this.page}&pageSize=${this.maxLink}&descp=${this.descp}&isDel=0&ids=${this.selectPersonList}`)

            },

            close() {

                this.disable = false
                this.start = false
            },
            // deleteFn() {
            //     let self = this
            //     this.idelete = true
            //     $('table tbody input:checked').each(function() {
            //         self.arrayTypeId.push($(self).attr('data-typeid'))
            //     })
            // }
        },
        filters: {
            ableFilter(tag) {
                return tag == 0 ? '启用' : '禁用'
            },
            typeFliter(tag) {
                // return
                let typeArr = ['专业测试', '趣味测试', '学生测试']
                return typeArr[tag]
            }
        },
        ready() {
            this.bannerList()
        }
    }
</script>