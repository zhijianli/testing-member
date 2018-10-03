<template>
    <div class="container-fluid">
        <button class="btn btn-success" style="margin: 10px 0"><a href="javascript:;" style="color:white;" @click="changeRouter('newServiceInformation')">新增</a></button>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0" style="width: 800px">
            <thead>
            <tr>
                <th>序号</th>
                <th>名称</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in serviceInfomationList">
                <td style="width: 200px">{{item.id}}</td>
                <td>{{item.guideTitle}}</td>
                <td>
                    <a href="javascript:;" class="operation editArticle btn btn-info" @click="rewrite(item.id)">修改</a>
                    <a class="btn btn-danger allDelte" href="javascript:;" @click="delete(item.guideTitle,item.id)">删除</a>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="modal-backdrop in" v-if="deleteState"></div>
        <div id="delete" class="modal" v-if="deleteState">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click=" deleteState = false ">×</button>
                <h3></h3>
            </div>
            <div class="modal-body">
                <p>你确定删除{{deletename}}吗？</p>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="javascript:;" @click=" deleteState = false ">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configDeleteServiceInformation(deleteid)">确定</a>
            </div>
        </div>
    </div>

</template>
<script type="text/javascript">
    import {getSource,getSources,getResponse,getResponses} from "../../api"
    export default {
        data(){
            return{
                serviceInfomationList:[],
                deletename:"",
                deleteid:0,
                deleteState:false,
            }
        },
        methods:{
            changeRouter(url){
                this.$dispatch('child-msg', "新增服务指南")
                this.$route.router.go(url)
            },
            delete(name,id){
                this.deletename=name;
                this.deleteid=id;
                this.deleteState=true;
            },
//            获取服务指南列表
            async getServiceInformation(){
                let data = await getResponse("ServiceInfomation/selectAll.json")
                if (data.code == 0) {
                    this.serviceInfomationList = data.serviceInformationWeb;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
//            删除服务指南
            async configDeleteServiceInformation(id){
                let data=await getResponses(" ServiceInfomation/deleteInfomation.json",`id=${id}`);
                if(data.code==0){
//                    alert("删除成功！");
                    this.deleteState=false;
                    this.getServiceInformation();
                }else{
                    alert(`errMsg:${data.msg}`);
                }
            },
            rewrite(id){
                this.$dispatch('child-msg', "修改服务指南")
                this.$route.router.go(`/newServiceInformation/${id}`)
            }
        },
        ready(){
            this.getServiceInformation();
        }
    }
</script>
<style scoped>
    .rec{
        visibility: visible;
        display:inline-block;
    }
</style>