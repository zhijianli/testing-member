<template>
    <div id="breadcrumb">
        <a href="javascript:;" class="tip-bottom">
            <i class="icon-home"></i>
              运营管理 > 消息管理 > 新增消息
        </a>
    </div>
    <div class="container-fluid" style="width:60%; display:inline-block;margin-right:20px;">
      <div class="row-fluid" >
        <div class="widget-box">
            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                <h5>新增消息</h5>
            </div>
            <div class="widget-content nopadding">
              <div class="form-horizontal">

                <div class="control-group">
                  <label class="control-label"> 标题 :</label>
                  <div class="controls">
                    <input type="text" style="width:95%" placeholder="请输入标题" v-model="info.title">
                  </div>
                </div>                 


                <div class="control-group">
                  <label class="control-label"> 送达用户 :</label>
                  <div class="controls">
                    <label><input type="radio" name="whichUser" v-model="whichUser" value="0">全部用户</label>
                    <label><input type="radio" name="whichUser" v-model="whichUser" value="1">部分用户</label>
                  </div>
                </div> 


                <div class="control-group">
                  <label class="control-label">上传图片 :</label>
                  <div class="controls">
                    请上传尺寸为：452*200px的jpg、png、jpeg格式的图片
                    <form enctype="multipart/form-data"  name="head">
                      <img :src="preView.photoAvatar" style="width:452px;height:200px;" />
                      <input type="hidden" name="photoAvatarPreviewRel" v-model="photoAvatarPreviewRel">
                      <input type="hidden" name="photoAvatarRel" v-model="photoAvatarRel">
                      <input type="file"  class="span11 dn"  id="photoAvatar" @change="photoAvatarFun">
                      <a class="btn btn-info" onclick="photoAvatar.click()" >上传</a>
                    </form>
                  </div>
                </div>   
                

                <div class="control-group">
                  <label class="control-label">推送内容 :</label>
                  <div class="controls">
                    <textarea  v-model="info.brief" name="brief" style="margin: 0px; width:95%; height: 150px;">{{ info.brief }}</textarea>
                  </div>
                </div>


                <div class="control-group">
                  <label class="control-label">推送链接 :</label>
                  <div class="controls">
                    <input type="text" style="width:30%;" placeholder="请输入链接文字" v-model="info.link">
                    <input type="text" style="width:30%;" placeholder="请输入链接地址" v-model="info.path">
                    <a class="btn btn-info">其他连接</a>
                  </div>
                </div>


                <div class="control-group">
                  <label class="control-label">推送时间 :</label>
                  <div class="controls">
                      <input type="datetime-local" name="bdaytime" @change="showTime" v-model="info.time">
                  </div>
                </div>

  
                <div class="control-group">
                  <label class="control-label">操作 :</label>
                  <div class="controls">
                      <div type="submit" class="btn btn-success" @click="btnUpload">保存</div>
                      <div type="submit" class="btn btn-warning" @click="btnChancel">取消</div>
                  </div>
                </div>

                

              </div>
            </div>
          </div>
      </div>
    </div>  


    <div class="container-fluid" style="width:30%; display:inline-block; vertical-align: top;">
      <div class="row-fluid" >
        <div class="widget-box">
            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span> 
              <h5>部分用户</h5>
            </div>
            <div class="widget-content nopadding">

              <div class="control-group">

                
                
                
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-success" @click="btnUpload">确定</button>
              </div>

            </div>
        </div>
      </div>

      <div class="row-fluid" >
        <div class="widget-box">
            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span> 
              <h5>其他连接</h5>
            </div>
            <div class="widget-content nopadding">

              <div class="control-group">

                <input  type="text" 
                        placeholder="输入专家名字、文章标题、测试标题精确搜索"
                        style="width:95%"
                        v-model="info.name">

                <ul class="tagTit">
                  <li  @click="whichLink = '0'">专家</li>
                  <li  @click="whichLink = '1'">文章</li>
                  <li  @click="whichLink = '2'">测试</li>
                </ul>
                
                
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-success" @click="btnUpload">取消</button>
              </div>

            </div>
        </div>
      </div>
  </div>

</template>



<script>

import {myaddMember , obtainPsychoTagList} from "../../api"    
import {serialize} from "../../utils"

import Vue from "vue"


export default {
    components:{

    },
    data(){
        return {
            time:"",

            tagList:[],//checkBox

            whichUser:"0",//全部 部分
            whichLink:"0",//专家，文章，测试

            info:{
                title:"",
                brief:"",
                link:"",
                path:"",
                time:""
            },




            preView:{        //图片url 预览
                photoAvatar:""
            },

            filePath:{      //图片路径   
                photoAvatar:"",  //头像  
                photoAvatarRel:"",
                photoAvatarPreviewRel:"",

            },
        }
    },
    watch:{
        
    }, 
    route: {

    },
    methods:{
        async getTagList(){
        let data = await obtainPsychoTagList(`pageSize=10&pageIndex=0`)
            if( data.code == 0 ){
                this.tagList = data.psychoTags
            }else{
                alert(`errMsg:${data.msg}`)
            }
        },
        photoAvatarFun(e){  //头像
            let photoAvatar = e.target 
            let file = photoAvatar.files[0]

            if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;
      
            this.preView.photoAvatar = URL.createObjectURL(file)

            fileImage(file,(data) => {
              let dataImg = data.files[0]
              this.filePath.photoAvatar = dataImg.fileRelPath   //原图    
              this.filePath.photoAvatarRel = dataImg.filePreviewRelPath   //缩略图
            })
      
        },
        async btnUpload(){

            let paramsObj = {


            }
            let params = serialize(paramsObj)
            let data = await myaddMember(params)

            if( data.code == 0 ){
                this.$route.router.go("/consultant")              
            }else{
                alert(`errMsg:${data.msg}`)
            }
        },
        btnChancel(){
          this.$route.router.go("/consultant")      
        },
        showTime(){
          console.log(this.time)
        }
    },
    ready(){
        this.getTagList()
      
    }
}

</script>