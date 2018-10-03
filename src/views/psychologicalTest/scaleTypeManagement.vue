<template>
    <div class="container-fluid">
        <button class="btn btn-success" style="margin: 10px 0"><a href="javascript:;" style="color:white;" @click="changeRouter('newScaleType')">新增类型</a></button>
        <table class="table table-bordered table-striped with-check" id="DataTables_Table_0" style="width: 800px">
            <thead>
            <tr>
                <!--<th>-->
                <!--<div class="checkbox">-->
                <!--&lt;!&ndash; <input type="checkbox" id="title-table-th" class="checkboxInp" name="title-table-checkbox" @click="changeFn">-->
                <!--<label for="title-table-th" class="checkboxLabel"></label> &ndash;&gt;-->
                <!--选中-->
                <!--</div>-->
                <!--</th>-->
                <th>名称</th>
                <th>量表数量</th>
                <th>参与测试人数</th>
                <th>首页推荐</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in scaletypelist">
                <!--<td>-->
                <!--<div class="checkbox">-->
                <!--<input type="checkbox"-->
                <!--class="checkboxInp"-->
                <!--name="title-table-checkbox"-->
                <!--id="title-table-td{{item.id}}"-->
                <!--:checked=" checkState? 'checked':''"-->
                <!--@click='ckeckselect(item.id)'-->
                <!--data-typeId="{{item.id}}">-->
                <!--<label class="checkboxLabel" for="title-table-td{{item.id}}"></label>-->
                <!--</div>-->
                <!--</td>-->

                <td style="width: 200px">{{item.name}}</td>
                <td>{{item.testScaleNum}}</td>
                <td>{{item.numberOfTest}}</td>
                <td>
                    <span style="color:rgb(153, 153, 153);margin-right: 8px;" v-show="item.homeRecomm==1">是</span>
                    <span style="color:rgb(153, 153, 153);margin-right: 8px;" v-show="item.homeRecomm==0">否</span>
                    <a href="javascript:;"  style="color:red;" v-show="item.homeRecomm == 0" @click="changeS(item.id,item.name,0)">开启</a>
                    <a href="javascript:;"  style="color:red;" v-show="item.homeRecomm == 1" @click="changeS(item.id,item.name,1)">关闭</a>
                </td>
                <td>
                    <a href="javascript:;" class="operation editArticle btn btn-info" @click="rewrite(item.id)">修改</a>
                    <a class="btn btn-danger allDelte" href="javascript:;" @click="deleteScale(item.name,item.id)">删除</a>
                </td>
            </tr>
            </tbody>
        </table>

        <div class="modal-backdrop in" v-if="recState"></div>
        <div id="reset" class="modal" v-if="recState">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" @click=" recState = false ">×</button>
                <h3></h3>
            </div>
            <div class="modal-body">
                <p>你确定首页{{recomm}}------{{scaleTypeName}}吗？</p>
            </div>
            <div class="modal-footer">
                <a data-dismiss="modal" class="btn " href="javascript:;" @click=" recState = false ">取消</a>
                <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configChangeRecState(recomm)">确定</a>
            </div>
        </div>

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
                <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configDeleteScaleType(deleteid)">确定</a>
            </div>
        </div>
    </div>

</template>
<script type="text/javascript">
    import {getSource,getSources} from "../../api"
    export default {
        data(){
            return{
                scaletypelist:[],
                checkState:false,
                recState:false,
                deleteState:false,
                recomm:"推荐",
                recommid:0,
                scaleTypeName:"",
                deletename:"",
                deleteid:0,
            }
        },
        methods:{
            changeRouter(url){
                this.$dispatch('child-msg', "新增量表类型")
                this.$route.router.go(url)
            },
            deleteScale(name,id){
                this.deletename=name;
                this.deleteid=id;
                this.deleteState=true;
            },
            changeS(id,name,state){
                if(state==0){
                    this.recomm="推荐";
                }else if(state==1){
                    this.recomm="不推荐";
                }
                this.scaleTypeName=name;
                this.recState=true;
                this.recommid=id;
            },
            async configChangeRecState(rec){
                this.recState=false;
                var recSt=0;
                if(rec=="推荐"){
                    recSt=1;
                }else if(rec=="不推荐"){
                    recSt=0;
                }
                let data=await getSources("/testCenter/testScaleClass/setHomeRecomm",`homeRecomm=${recSt}&id=${this.recommid}`);
                console.log(data)
                if(data.code===0){
                    this.getScaleType();
                }else{
                    alert(`errMsg:${data.msg}`)
                }
            },
            ckeckselect(id,item){
                this.checkState=true;
            },
            async getScaleType(){
                let data = await getSource("/testCenter/testScaleClass/getAllMessage");
                if (data.code == 0) {
                    this.scaletypelist = data.contentList;
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async configDeleteScaleType(id){
                let data=await getSources("/testCenter/testScaleClass/delete",`id=${id}`);
                if(data.code==0){
                    alert("删除成功！");
                    this.deleteState=false;
                    this.getScaleType();
                }else{
                    alert(`errMsg:${data.msg}`);
                }
            },
            rewrite(id){
                this.$dispatch('child-msg', "修改量表类型")
                this.$route.router.go(`/newScaleType/${id}`)
            }
        },
        ready(){
            this.getScaleType();
        }
    }
</script>
<style scoped>
    .rec{
         visibility: visible;
        display:inline-block;
    }
</style>