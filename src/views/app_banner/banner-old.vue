<template>

    <div class="container-fluid mid">


        <div id="search">
            <input type="text" name="bannerTitle" v-model="bannerTitle" value="" placeholder="请输入标题">
            <button type="button" class="tip-bottom" @click="search()"><i class="icon-search icon-white"></i></button>
        </div>

        <div class="tab-cont">
            <ul class="tagTit">
                <li :class="{'show': switchTab == 0 }" @click="switchFn(0)">首页</li>
                <li :class="{'show': switchTab == 1 }" @click="switchFn(1)">咨询</li>
                <!--<li :class="{'show': switchTab == 2 }" @click="switchFn(2)">问专家</li>-->
                <li :class="{'show': switchTab == 3 }" @click="switchFn(2)">心友圈</li>
            </ul>
        </div>

        <table class="table table-bordered table-striped  mytable" id="DataTables_Table_0" >
            <thead>
                <tr>
                    <th>序号</th>
                    <th>标题</th>
                    <th>banner图</th>
                    <th>站内链接</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
               <tr v-for="item of list">
                   <td>{{ item.sorting }}</td>
                   <td>{{ item.bannerTitle }}</td>
                   <td><img :src=" imgPre + '/' + item.filePath"   alt=""></td>
                   <td v-if="item.linkType == 1">{{ item.outsideLink }}</td>
                   <td v-if="item.linkType == 0">{{ item.insideLinkId }}</td>
                   <td>
                       <!-- <a href="/app_banner/{{item.bannerId}}">编辑</a> -->
                       <a href="javascript:;" @click="changeRoute(`/app_banner/${item.bannerId}`)">编辑</a>
                       <a href="javascript:;" @click="deleteFun(item.bannerId)">删除</a>
                   </td>
               </tr>
            </tbody>
        </table>
        <div class='bottom' style="display:fix">
            <div id="test">
                <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl"><zpagenav>
            </div>
            <p>
                <!-- <a class="btn btn-warning" id="addVip" href="/app_banner/new_app_banner" >新增</a> -->
                <a class="btn btn-warning" id="addVip" href="javascript:;" @click="changeRoute('/app_banner/new_app_banner')">新增</a>
            </p>
        </div>
    </div>
</template>
<script>
    import Vue from "vue"
    import zpagenav from "vue-pagenav"

    import { appBanner, deleteAppBanner } from "../../api"
    Vue.use(zpagenav)

    export default {
        // props:['imgPre'],
        data() {
            return {
                imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                total: 0, //total item count
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                list:[],
                bannerTitle:"",
                switchTab:"0"
            }
        },
        methods:{

            changeRoute(url){
                this.$route.router.go(url)
            },

            pageHandler(page) {
                this.page = page
            },

            createUrl(unit) {
                return unit.page > 1?'#page=' + unit.page:'#'
            },

            deleteFun(ids) {
                this.deleteAppBanner(`ids=${ids}`)
            },

            search(){
                this.appBanner(`pageIndex=${this.page}&pageSize=${this.maxLink}&bannerTitle=${this.bannerTitle}&showLocation=${this.switchTab}`)
            },

            switchFn(id){
                this.switchTab = id
            },


            async deleteAppBanner(params) {

                let data = await deleteAppBanner(params)

                data.code === 0 && this.appBanner()
            },

            async appBanner( params = `pageIndex=${this.page}&pageSize=${this.maxLink}&showLocation=${this.switchTab}`){
                let data = await appBanner( params )

                this.list = data.list
                this.total = data.count
            }
        },
        watch:{
            page(){
                this.appBanner()
            },

            switchTab(){
                this.appBanner()
            }
        },
        ready(){
            this.appBanner()
        }
    }
</script>