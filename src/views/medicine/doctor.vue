<template>

	<div class="container-fluid">
		<div id="search">
            <input type="text" placeholder="请输入医生名称" v-model="descp" name="descp">
            <button type="submit" class="tip-bottom"  data-original-title="搜索" @click="seach()"><i class="icon-search icon-white"></i></button>
        </div>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
                <tr>
                    <th>
                        <div class="checkbox">
                    		<input type="checkbox" id="title-table-td" class="checkboxInp" name="title-table-checkbox"  :checked="checkState" @click="changeFn">
				        	<label for="title-table-td" class="checkboxLabel"></label>
                    	</div>
                    </th>
                    <th>医生姓名</th>
                    <th>医院名称</th>
                    <th>职务</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
				<tr v-for="item of list">
					<td>
						<div class="checkbox">
                    		<input type="checkbox" id="title-table-td{{item.doctId}}" class="checkboxInp" name="title-table-checkbox" :checked="checkState" data-typeid="{{ item.doctId }}">
				        	<label for="title-table-td{{item.doctId}}" class="checkboxLabel"></label>
                    	</div>
					</td>
					<td>{{item.name}}</td>
					<td>{{item.hospital}}</td>
					<td>{{item.position}}</td>
					<td v-text="item.isDelete | isEnableFliter"></td>
					<td>
                        <!-- <a href="/newDoctor/{{ item.doctId }}" class="editPopup">修改</a> -->
						<a href="javascript:;" class="editPopup" @click="changeRoute(`/newDoctor/${item.doctId }`)">修改</a>
					</td>
				</tr>
           	</tbody>
        </table>
        <div class='bottom' style="display:fix">
            <div id="test">
                <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
            </div>
            <p>
                <a class="btn btn-warning" id="addVip" @click="changeRoute('newDoctor')">新增</a>
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
</template>
<script type="text/javascript">
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import $ from "jquery"
    import {
        doctorList,
        doctorStatus
    } from "../../api"
    Vue.use(zpagenav)
    export default {
        data() {
            return {
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                list: [],
                descp: '',
                disable: '',
                start: '',
                arrayTypeId: [],
                checkState: false,
                containTitle: "请勾选操作的内容！"
            }
        },
        watch: {
            page() {
                console.log(this.page)
                this.doctorList(`pageIndex=${this.page}&pageSize=${this.maxLink}&name=${this.descp}`)
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

            async doctorList(params) {

                let data = await doctorList(params)

                if (data.code == 0) {
                    this.checkState = false

                }
                this.list = data.list
                this.total = data.count
            },

            async doctorStatus(params) {

                this.disable = false
                this.start = false

                if (!this.arrayTypeId.length > 0) {
                    alert('请勾选操作的内容！')
                    return false
                }
                let data = await doctorStatus(params)

                if (data.code == 0) {
                    this.doctorList()
                    this.arrayTypeId = []
                } else {
                    alert(data.msg)
                }


            },

            seach() {

                this.doctorList(`pageIndex=${this.page}&pageSize=${this.maxLink}&name=${this.descp}`)

            },

            changeFn(e) {
                this.checkState = e.target.checked
            },

            btnDisable() {

                this.deleteFn()
                this.containTitle = (this.arrayTypeId.length > 0 ? "您确定禁用当前问卷状态？" : this.containTitle)
                this.disable = true
            },
            btnStart() {

                this.deleteFn()
                this.containTitle = (this.arrayTypeId.length > 0 ? "您确定启用当前问卷状态？" : this.containTitle)
                this.start = true

            },

            configDisable() {

                this.doctorStatus(`isDel=1&doctIds=${JSON.stringify(this.arrayTypeId)}`)

            },

            configStart() {

                this.doctorStatus(`isDel=0&doctIds=${JSON.stringify(this.arrayTypeId)}`)

            },

            close() {

                this.disable = false
                this.start = false
            },
            deleteFn() {
                let self = this
                this.idelete = true
                $('table tbody input:checked').each(function() {
                    self.arrayTypeId.push(Number($(this).attr('data-typeid')))
                })
            }
        },
        filters: {
            isEnableFliter(tag) {
                let arr = ['启用', '禁用']
                return arr[tag]
            }
        },
        ready() {
            this.doctorList(`pageIndex=${this.page}&pageSize=${this.maxLink}&name=${this.descp}`)
        }
    }
</script>