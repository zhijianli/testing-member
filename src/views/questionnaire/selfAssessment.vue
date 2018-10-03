<template>
    <div class="container-fluid">
        <a href="javascript:;" @click="butAdd()">
          <div class="newlyAdded">新增</div>
        </a>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
            <tr>
                <th style="width: 120px;">序号</th>
                <th>标题</th>
                <th>正文</th>
                <th>上线状态</th>
                <th>排序权重</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="(index,item) in data"> -->
            <tr>
                <!-- <td>{{item.createTime}}</td> -->
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>

            </tr>
            </tbody>
        </table>
    </div>
    <!-- 弹窗 -->
    <div class="modal-backdrop in" v-if="add"></div>
    <div id="myAlert" class="modal" v-if="add">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>新增用户</h3>
        </div>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0">
            <thead>
            <tr>
                <th style="width: 120px;"></th>
                <th>标题</th>
                <th>上线状态</th>
            </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="(index,item) in data"> -->
            <tr>
                <!-- <td>{{item.createTime}}</td> -->
                <td>
                  <input type="checkbox" name="w">
                </td>
                <td>1</td>
                <td>1</td>
            </tr>
            </tbody>
        </table>
        <div class="modal-footer"> <a data-dismiss="modal" class="newlyAdded" href="javascript:;" @click="ButaddUser()">添加</a> <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a> </div>
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
              add:false,
            }
        },
        watch: {

        },
        methods: {
          butAdd(){
              this.add = true
          },
          close(){
              this.reset = false
              this.edit = false
              this.enableState = false
              this.disableStage = false
              this.add = false

          //    删除用户功能
              this.isDeleteState = false
          },
        },
    }
</script>
<style>
  .newlyAdded {
    background-color: rgba(22, 155, 213, 1);
    color: white;
    border: none;
    width: 80px;
    height: 30px;
    border-radius: 5px;
    margin-top: 60px;
    margin-bottom: 20px;
    text-align: center;
    line-height: 30px;
  }
  .container-fluid {
    padding-right: 20px;
    padding-left: 40px;
  }
</style>
