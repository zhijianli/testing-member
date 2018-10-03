<template>

    <div class="container-fluid">
      <div class="row-fluid" >
        <div class="widget-box">
            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i></span>
                <h5>问卷名称与选择</h5>
            </div>
            <div class="widget-content nopadding">
              <div class="form-horizontal">

                <div class="control-group">
                  <label class="control-label">
                    <span class="validateError">*</span>问卷名称:
                  </label>
                  <div class="controls">
                    <input type="text" style="width:750px;" placeholder="必填" v-model="oldInfo.title">
                  </div>
                </div>


                <div class="control-group">
                  <label class="control-label">
                    <span class="validateError">*</span>选择问卷类别:
                  </label>
                  <div class="controls">
                    <select class="selectPopup" name="eidtdptId" v-model="selectedId" >
	                    <option v-for="item of typeList" value="{{ item.typeId }}">
	                        {{ item.testingName }}
	                    </option>
	                  </select>
                  </div>
                </div>

                <div class="control-group">
                  <label class="control-label">PC文章列表图,尺寸250*250</label>
                  <div class="controls">
                    <qiniu event-name="filePathPc" :defaultimg="filePathPc"></qiniu>
                  </div>
                </div>

                <div class="control-group">
                  <label class="control-label">微信列表图,尺寸710*260</label>
                  <div class="controls">
                    <qiniu event-name="filePathMobile" :defaultimg="filePathMobile"></qiniu>
                  </div>
                </div>

                <div class="control-group">
                  <label class="control-label">微信滑动幻灯图,尺寸560*485</label>
                  <div class="controls">
                    <qiniu event-name="filePathSlide" :defaultimg="filePathSlide"></qiniu>
                  </div>
                </div>

                <!--<div class="control-group">
                  <label class="control-label">PC文章列表图</label>
                  <div class="controls">
                    尺寸为宽：高=1:1，建议尺寸250*250
                    <form enctype="multipart/form-data"  name="head">
                      <img :src="preView.filePath" style="width:230px;height:230px;" />
                      <input type="hidden" name="photoAvatarPreviewRel" v-model="photoAvatarPreviewRel">
                      <input type="hidden" name="photoAvatarRel" v-model="photoAvatarRel">
                      <input type="file"  class="span11 dn"  id="photoAvatar" @change="photoAvatarFun">
                      <a class="btn btn-info" onclick="photoAvatar.click()" >上传</a>
                    </form>
                  </div>
                </div>


                <div class="control-group">
                  <label class="control-label">微信列表图</label>
                  <div class="controls">
                   尺寸为上传尺寸710*260
                    <form  enctype="multipart/form-data" name="body">
                      <img :src="preView.filePathMobile" style="width:355px;height:130px;"/>
                      <input type="hidden" name="photoCandidDealtPreviewRel" v-model="photoCandidDealtPreviewRel">
                      <input type="hidden" name="photoCandidDealtRel" v-model="photoCandidDealtRel">
                      <input type="file"  class="span11 dn"  id="photoCandidDealt" @change="photoCandidDealtFun">
                      <a class="btn btn-info" onclick="photoCandidDealt.click()" >上传</a>
                    </form>
                  </div>
                </div>

                <div class="control-group">
                  <label class="control-label">微信滑动幻灯图</label>
                  <div class="controls">
                   尺寸为上传尺寸560*485，格式为jpg、png、jpeg，图片大小不可大于1M
                    <form  enctype="multipart/form-data" name="body">
                      <img :src="preView.filePathSlide" style="width:230px;height:112px;"/>
                      <input type="hidden" name="photoCandidDealtPreviewRelSlider" v-model="photoCandidDealtPreviewRelSlider">
                      <input type="hidden" name="photoCandidDealtRelSilder" v-model="photoCandidDealtRelSilder">
                      <input type="file"  class="span11 dn"  id="photoCandidDealtSlider" @change="photoCandidDealtSliderFun">
                      <a class="btn btn-info" onclick="photoCandidDealtSlider.click()" >上传</a>
                    </form>
                  </div>
                </div>-->


                <div class="control-group">
                  <label class="control-label">
                    <span class="validateError">*</span>副标题：
                  </label>
                  <div class="controls subtitleCont">
                    <input type="text"  placeholder="请输入副标题" style="width:750px;" v-model='oldInfo.subtitle'>
                  </div>
                </div>


                <div class="control-group">
                  <label class="control-label">
                    <span class="validateError">*</span>正文描述：
                  </label>
                  <div class="controls">
                      <!-- <vue-html5-editor :content.sync="content" :height="500"></vue-html5-editor> -->
                      <!--<textarea v-model='content' style="width:1490px;height:500px;"></textarea>-->
                      <textarea v-model='content' style="width:750px;height:200px;"></textarea>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="submit" class="btn btn-success btnMiddle" @click="btnUpload">保存并新增问卷题目</button>
                </div>

              </div>
            </div>
          </div>
      </div>
    </div>
    <div v-if='saveState'>
    <div class="container-fluid mid">
        <div class="widget-box" style="margin-top:0px;">
            <table class="table table-bordered table-striped" id="DataTables_Table_0">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>题目名称</th>
                        <th>选项</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='item in questionsList' >
                        <!-- <td>{{$index+1}}</td>                    -->
                        <td>{{item.seqNum}}</td>
                        <td>{{item.questionsTitle}}</td>
                        <td><span v-for='item in item.optList'> {{item.optionsId}} {{item.title}} {{$index+1}}  |</span></td>
                        <!--<td :class=" this.questionsId == item.questionsId ? 'textGreen':''">{{item.isDelete | statusFilter}}</td>-->
                        <td :class=" this.questionsId == item.questionsId ? 'textGreen':''">{{item.isEnable | statusFilter}}</td>
                        <td>
                            <!-- <span class="pointer" @click='clearing(item.seqNum,item.questionsId)'>修改11</span> -->
                            <span class="pointer" @click='clearing($index,item.questionsId,0)'>修改</span>
                            <span class="pointer" @click='changeState(item.questionsId,0,0)'>启用</span>
                            <span class="pointer" @click='changeState(item.questionsId,1,0)'>禁用</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="myBtn myBtnRight myBtnBot btn-warning" @click='clearingBtn(0,1)'>新增题目</div>
        </div>
    </div>
    <div class="container-fluid mid">
        <div class="widget-box" style="margin-top:0px;">
            <table class="table table-bordered table-striped" id="DataTables_Table_0">
                <thead>
                    <tr>

                        <th>标题</th>
                        <th>结论</th>
                        <th>图片</th>
                        <th>状态</th>
                        <th>操作</th>-->
                        <th class="span1">编号</th>
                        <th class="span1">标题</th>
                        <th class="span5">结论</th>
                        <th class="span1">图片</th>
                        <th class="span1">状态</th>
                        <th class="span2">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='item in sectionList'>
                        <!-- <td>{{$index+1}}</td>                    -->
                        <td>{{item.resultTag}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.detail}}</td>

                        <td><img :src="item.filePath" alt=""></td>
                        <!--<td :class=" this.sectionId == item.resId ? 'textGreen':''">{{item.isDelete | statusFilter}}</td>-->
                        <td :class=" this.sectionId == item.resId ? 'textGreen':''">{{item.isEnable | statusFilter}}</td>
                        <td>
                            <!-- <span class="pointer" @click='clearing(item.seqNum,item.sectionId)'>修改222</span> -->
                            <span class="pointer" @click='clearing($index,item.resId,2)'>修改</span>
                            <span class="pointer" @click='changeState(item.resId,0,1)'>启用</span>
                            <span class="pointer" @click='changeState(item.resId,1,1)'>禁用</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="myBtn myBtnRight myBtnBot btn-warning" @click='clearingBtn(1,3)'>新增结论</div>
        </div>
    </div>
    </div><!-- saveState -->


    <div id="myAlert" class="modal {{drop.dropState}}" style="width:1100px; left: 36%;">

      <div v-show='drop.whichWindow == 0'>
          <div class="modal-header">
              <button data-dismiss="modal" class="close" type="button" @click='closeDrop(1)'>×</button>
              <h3>修改题目</h3>
          </div>
          <div class="modal-body" >

              <div class="my-control-group">
                  <label class="my-control-label">题目名称 :</label>
                  <div class="controls form-horizontal inlineblock">
                      <input type="text" class="span11 typeName" placeholder="请输入题目名称" style="width:800px;" v-model="questionsChangeList.questionsTitle">
                  </div>
              </div>

              <div class="my-control-group">
                  <label class="my-control-label">题目编号 :</label>
                  <div class="controls form-horizontal inlineblock">
                      <input type="text" class="span11 typeName" placeholder="请输入题目编号" v-model="questionsChangeList.seqNum">
                  </div>
              </div>


              <div class="my-control-group" v-for='item in questionsChangeList.optList'> <!-- 修改已有 -->
                  <span class="span2 m-wrap"><i class="close-but pointer" @click='deleteSelect(item)'>×</i>选项：</span>
                  <input type="text" class="displaySub" v-model="item.title" placeholder="请输入选项内容">
                  <span class="span2 m-wrap">跳转题(结论):</span>
                  <select class="selectPopup" name="eidtdptId" v-model="item.optType">
                      <option value="0">跳转题号</option>
                      <option value="1">提交结论</option>
                  </select>
                  <span class="span2 m-wrap">跳转题(结论):</span>
                  <input type="text" class="displaySub" placeholder="请输入题目编号" v-model='item.jumpToQuestionNo' v-show='item.jumpToQuestionNo != null'>
                  <input type="text" class="displaySub" placeholder="请输入结果编号" v-model='item.jumpResultTag' v-show='item.jumpResultTag != null'>
              </div>


              <div class="my-control-group">  <!-- 点击新增 -->
                  <span class="span2 m-wrap"><i class="close-but pointer">×</i>选项：</span>
                  <input type="text" class="displaySub" v-model="newTodo.title" placeholder="请输入选项内容">
                  <span class="span2 m-wrap">跳转题(结论):</span>
                  <select class="selectPopup" name="eidtdptId" v-model="newTodo.optType">
                      <option value="0">跳转题号</option>
                      <option value="1">提交结论</option>
                  </select>
                  <span class="span2 m-wrap">跳转题(结论):</span>
                  <input type="text" class="displaySub" placeholder="题号(数字) or 结论(A)" v-model="newTodo.optShow">
              </div>
              <div class="my-control-group">
                  <a data-dismiss="modal" class="btn btn-warning" href="javascript:;" @click='addSelect()'>新增</a>
              </div>
          </div>

          <div class="modal-footer">
              <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click='getAdd(0)'>确定</a>
              <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click='closeDrop(1)'>取消</a>
          </div>
      </div>


      <div v-show='drop.whichWindow == 1'>
          <div class="modal-header">
              <button data-dismiss="modal" class="close" type="button" @click='closeDrop(1)'>×</button>
              <h3>新增题目</h3>
          </div>
          <div class="modal-body" >
              <div class="my-control-group">
                  <label class="my-control-label">题目名称 :</label>
                  <div class="controls form-horizontal inlineblock">
                      <input type="text" class="span11 typeName" placeholder="请输入题目名称" style="width:800px;" v-model="newtitle.questionsTitle">
                  </div>
              </div>

              <div class="my-control-group">
                  <label class="my-control-label">题目编号 :</label>
                  <div class="controls form-horizontal inlineblock">
                      <input type="text" class="span11 typeName" placeholder="请输入题目编号" v-model="newtitle.seqNum">
                  </div>
              </div>

              <div class="my-control-group" v-for='item in newQuestionsList.optList'> <!-- 已经新增 -->
                  <span class="span2 m-wrap"><i class="close-but pointer" @click='newDeleteSelect($index)'>×</i>选项：</span>
                  <input type="text" class="displaySub" v-model="item.title" placeholder="请输入选项内容">
                  <span class="span2 m-wrap">跳转题(结论):</span>
                  <select class="selectPopup" name="eidtdptId" v-model="item.optType">
                      <option value="0">跳转题号</option>
                      <option value="1">提交结论</option>
                  </select>
                  <span class="span2 m-wrap">跳转题(结论):</span>
                  <input type="text" class="displaySub" placeholder="请输入选项分数" v-model='item.optShow'>
              </div>

              <div class="my-control-group">  <!-- 点击新增 -->
                  <span class="span2 m-wrap"><i class="close-but pointer">×</i>选项：</span>
                  <input type="text" class="displaySub" v-model="newTodo.title" placeholder="请输入选项内容">
                  <span class="span2 m-wrap">跳转题(结论):</span>
                  <select class="selectPopup" name="eidtdptId" v-model="newTodo.optType">
                      <option value="0">跳转题号</option>
                      <option value="1">提交结论</option>
                  </select>
                  <span class="span2 m-wrap">跳转题(结论):</span>
                  <input type="text" class="displaySub" placeholder="题号(数字) or 结论(A)" v-model="newTodo.optShow">
              </div>

              <div class="my-control-group">
                  <a data-dismiss="modal" class="btn btn-warning" href="javascript:;" @click='newAddSelect()'>新增</a>
              </div>

          </div>
          <div class="modal-footer">
              <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click='getAdd(1)'>确定</a>
              <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click='closeDrop(1)'>取消</a>
          </div>
      </div>


      <div v-show='drop.whichWindow == 2'>
          <div class="modal-header">
              <button data-dismiss="modal" class="close" type="button" @click='closeDrop(1)'>×</button>
              <h3>修改结论</h3>
          </div>
          <div class="modal-body" >

              <div class="my-control-group">
                  <label class="my-control-label">修改标题 :</label>
                  <div class="controls form-horizontal inlineblock">
                      <input type="text" class="span11 typeName" placeholder="请输入标题" v-model="sectionChangeList.title">
                  </div>
              </div>

              <div class="my-control-group">
                  <label class="my-control-label">修改序号 :</label>
                  <div class="controls form-horizontal inlineblock">
                      <input type="text" class="span11 typeName" placeholder="请输入序号" v-model="sectionChangeList.resultTag">
                  </div>
              </div>

              <!--<div class="my-control-group">
                  <label class="my-control-label">图片 ：</label>
                  <div class="controls inlineblock">
                      <div>尺寸为640*280像素，格式为jpg、png、jpeg，图片大小不可大于1M</div>
                      <form enctype="multipart/form-data"  name="head" style="display:inline-block">
                          <img :src="preView.newPic" style="width:150px;height:65px;display:inline-block;"/>
                          <input type="hidden" name="newPicPreviewRel" v-model="newPicPreviewRel">
                          <input type="hidden" name="newPicRel" v-model="newPicRel">
                          <a href="javascript:;" class="a-upload">选择文件
                              <input type="file"  class="span11 dn btn btn-info"  id="newPic" @change="newPicFun">
                          </a>
                      </form>
                  </div>
              </div>-->

                <!--<div class="control-group">
                    <label class="control-label">图片,尺寸为640*280</label>-->
                    <div class="controls">
                        <qiniu event-name="resImg" :defaultimg="filePath.newPicRel"></qiniu>
                    </div>
                <!--</div>-->

              <div class="my-control-group">
                  <label class="my-control-label">修改内容 :</label>
                  <div class="controls form-horizontal inlineblock">
                      <textarea class="span11" style="display:block;width:560px;heigh:150px;" id="verdicCont" v-model="sectionChangeList.detail"></textarea>
                  </div>
              </div>

          </div>
          <div class="modal-footer">
              <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click='getAdd(2)'>确定</a>
              <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click='closeDrop(1)'>取消</a>
          </div>
      </div>

      <div v-show='drop.whichWindow == 3'>
          <div class="modal-header">
              <button data-dismiss="modal" class="close" type="button" @click='closeDrop(1)'>×</button>
              <h3>新增结论</h3>
          </div>
          <div class="modal-body" >
              <div class="my-control-group">
                  <label class="my-control-label">新增标题 :</label>
                  <div class="controls form-horizontal inlineblock">
                      <input type="text" class="span11 typeName" placeholder="请输入标题" v-model="newsSection.title">
                  </div>
              </div>

              <div class="my-control-group">
                  <label class="my-control-label">新增序号 :</label>
                  <div class="controls form-horizontal inlineblock">
                      <input type="text" class="span11 typeName" placeholder="请输入序号" v-model="newsSection.resultTag">
                  </div>
              </div>

              <!--<div class="my-control-group">
                  <label class="my-control-label">图片 ：</label>
                  <div class="controls inlineblock">
                      <div>尺寸为640*280像素，格式为jpg、png、jpeg，图片大小不可大于1M</div>
                      <form enctype="multipart/form-data"  name="head" style="display:inline-block">

                          <img :src="preView.newPic" style="width:150px;height:65px;display:inline-block;"/>
                          <input type="hidden" name="newPicPreviewRel" v-model="newPicPreviewRel">
                          <input type="hidden" name="newPicRel" v-model="newPicRel">
                          <a href="javascript:;" class="a-upload">选择文件
                              <input type="file"  class="span11 dn btn btn-info"  id="newPic" @change="newPicFun">
                          </a>
                      </form>
                  </div>
              </div>-->



              <!--<div class="control-group">
                  <label class="control-label">图片,尺寸为640*280</label>-->
                  <div class="controls">
                      <qiniu event-name="resImg" :defaultimg="filePath.newPicRel"></qiniu>
                  </div>
              <!--</div>-->

              <div class="my-control-group">
                  <label class="my-control-label">新增内容 :</label>
                  <div class="controls form-horizontal inlineblock">
                      <textarea class="span11" style="display:block;width:560px;heigh:150px;" id="verdicCont" v-model="newsSection.detail"></textarea>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click='getAdd(3)'>确定</a>
              <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click='closeDrop(1)'>取消</a>
          </div>
      </div>


  </div>
  <div class="modal-backdrop {{drop.dropState}}"></div>
</template>



<script>

import {
		getTestingType,  //下拉列表
		testingSave,     //保存并新增
		testingQuestionsjumpchangeStatus,    // 题目 启用 禁用
		testingQuestionsjumpupdate,          // 题目 修改
		testingquestionsjumpsave,            // 题目 新增

		TestingResultForJumpchangeStatus,     // 答案 启用 禁用
		TestingResultForJumpupdate,           // 答案 修改  TestingResultForJumpupdate
		TestingResultForJumpsave,             // 答案 新增

		testingQuestionsjumplistByTestingId,       // 题目 列表    testingQuestionsjumplistByTestingId
		TestingResultForJumplistByTestingId,       // 答案 列表  TestingResultForJumplistByTestingId

	} from "../../api"

import {serialize} from "../../utils"

import Vue from "vue"
import editor from "vue-html5-editor"

import qiniu from "../../qiniu.vue"

Vue.use(editor, {
      //global component name
      name: "vue-html5-editor",
      //custom icon class of built-in modules,default using font-awesome
      icons: {
          text: "icon-pencil",
          color: "icon-dashboard",
          font: "icon-font",
          align: "icon-align-center",
          list: "icon-list-ol",
          link: "icon-link",
          unlink: "icon-underline",
          image: "icon-picture"
      },
      //config image module
      image: {
          //Url of the server-side,default null and convert image to base64
          server: null,
          //the name for file field in multipart request
          fieldName: "image",
          //max file size
          sizeLimit: 512 * 1024,
          // default true,if set to true,the image will resize by localResizeIMG (https://github.com/think2011/localResizeIMG)
          compress: true,
          //follows are options of localResizeIMG
          width: 600,
          height: 80,
          quality: 80,
          //handle response data，return image url
          uploadHandler(responseText){
              //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
              var json = JSON.parse(responseText)
              if (!json.ok) {
                  alert(json.msg)
              } else {
                  return json.data
              }
          }
      },
      //default en-us, en-us and zh-cn are built-in
      language: "zh-cn",
      i18n: {
          //specify your language here
          "zh-cn": {
              "align": "对齐方式",
              "image": "图片",
              "list": "列表",
              "link": "链接",
              "unlink": "去除链接",
              "table": "表格",
              "font": "文字",
              "full screen": "全屏",
              "text": "排版",
              "eraser": "格式清除",
              "info": "关于",
              "color": "颜色",
              "please enter a url": "请输入地址",
              "create link": "创建链接",
              "bold": "加粗",
              "italic": "倾斜",
              "underline": "下划线",
              "strike through": "删除线",
              "subscript": "上标",
              "superscript": "下标",
              "heading": "标题",
              "font name": "字体",
              "font size": "文字大小",
              "left justify": "左对齐",
              "center justify": "居中",
              "right justify": "右对齐",
              "ordered list": "有序列表",
              "unordered list": "无序列表",
              "fore color": "前景色",
              "background color": "背景色",
              "row count": "行数",
              "column count": "列数",
              "save": "确定",
              "upload": "上传",
              "progress": "进度",
              "unknown": "未知",
              "please wait": "请稍等",
              "error": "错误",
              "abort": "中断",
              "reset": "重置"
          }
      },
      //the modules you don't want
      hiddenModules: [],
      //keep only the modules you want and customize the order.
      //can be used with hiddenModules together
      visibleModules: [
          "text",
          "color",
          "font",
          "align",
          "list",
          "link",
          "unlink",
          "tabulation",
          "image"
      ],
      //extended modules
      modules: {
          //omit,reference to source code of build-in modules
      }
  })

export default {
    components: {
        qiniu
    },
    events:{
        'imgParameter':function(obj,eventName){
            console.log('eventName:'+eventName)
            if(eventName == 'resImg'){
                this.filePath.newPicRel = obj[eventName].imgPath
                console.log('新增答案返回：'+this.filePath.newPicRel)
            }else{
                this[eventName] = obj[eventName].imgPath
            }
        }
    },
    // props:['imgPre'],
    data(){
        return {

            imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
            filePathPc:"",
            filePathMobile:"",
            filePathSlide:"",
            resImg:"resImg",

            ID:"",  //问卷id

            typeList:[],//下拉类别列表
            selectedId:"",//下拉类别列表 选择的值  =>typeId

            oldInfo:{
                calcMethod:"",// 计算方式  number  0计分，1跳转
                contentExplain:"",//  内容详情  string
                filePath:"",//  预览图地址 string
                filePathMobile:"",//  移动端图片预览 string
                filePathSlide:"",// 滑动配图预览  string
                isDelete:"",//  0启用，1禁用 string
                subtitle:"",//  简介  string
                testingId:"",// 问卷类别值 number
                thumbnail:"",// 缩略图 string
                thumbnailMobile:"",// 移动端缩略图
                thumbnailSlide:"",//  滑动配图地址  string
                title:"",// 标题  string
                typeId:"",//  问卷类别id  number
            },

            content:"",//编辑器文字


            infoTag:[],  //checkBox check

            preView:{        //图片url 预览
                newPic:"",
                filePath:"",
                filePathMobile:"",
                filePathSlide:"",
            },

            filePath:{      //图片路径
                filePath:"",
                filePathRel:"",
                filePathPreviewRel:"",

                filePathMobile:"",
                filePathMobileRel:"",
                filePathMobilePreviewRel:"",

                filePathSlide:"",
                filePathSlideRel:"",
                filePathSlidePreviewRel:"",

                newPic:"",
                newPicRel:"",
                newPicPreviewRel:"",

            },

            questionsList:[],   //点击保存 获得题目列表
            sectionList:[],     //点击保存 获得结论列表

            questionsId:"",   //点击保存 获得题目列表  操作的
            questionNum:"",   //点击保存 获得题目列表  操作的

            sectionId:"",     //点击保存 获得结论列表  操作的
            sectionNum:"",    //点击保存 获得结论列表  操作的


            newTodo:{  //点击出现
                title:"",
                optType:"",
                optShow:"", //optType  => 显示
                jumpResultTag:"",    // optType == 1  => jumpResultTag
                jumpToQuestionNo:"", // optType == 0  => jumpToQuestionNo
            },

            newtitle:{  //新增  点击出现后保存
                title:"",
                optType:"",
                jumpResultTag:"",    // optType == 1  => jumpResultTag
                jumpToQuestionNo:"", // optType == 0  => jumpToQuestionNo
            },

            questionsChangeList:{ //点击保存 获得题目列表 修改的
                isEnable:"",
                // isDelete:"",
                optList:[],
                questionsId:"",
                questionsTitle:"",
                seqNum:"",
            },

            sectionChangeList:{ //点击保存 获得答案列表 修改的
                detail:"",
                testingId:"",
                title:"",
                seqNum:"",
                picPath:"",
                resultTag:"",

            },

            newQuestionsList:{  //点击增加 题目
                optList:[]
            },
            newsSection:{      //点击增加 答案
                detail:"",
                title:"",
                seqNum:"",
                picPath:"",
                resultTag:"",
            },


            drop:{  //弹窗
                dropState:'hide',  /*弹窗状态*/
                name:"",   //弹窗输入框
                option:"0", //弹窗下拉选择
                windowTest:"",  //禁用or启用
                whichWindow:"", //哪个弹窗
                requst:"",//点击确定后请求哪个链接  0新增   1  2 启用禁用 3修改
            },

            saveState:false,

        }
    },
    watch:{

    },
    route: {

    },
    methods:{
        async getTypeList(){  //下拉类型列表
          let data = await getTestingType()
              if( data.code == 0 ){
                  this.typeList = data.list
              }else{
                  alert(`errMsg:${data.msg}`)
              }
        },
        /*newPicFun(e){  //PC文章列表图
        newPicFun(e){  //PC文章列表图
            let newPic = e.target
            let file = newPic.files[0]

            if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

            this.preView.newPic = URL.createObjectURL(file)

            // fileImage(file,"callback","filePathSlide")
            fileImage(file,(data) => {
              let dataImg = data.files[0]
              this.filePath.newPic = dataImg.fileRelPath   //原图
              this.filePath.newPicRel = dataImg.filePreviewRelPath   //缩略图
            })

            let preViewURL = this.preView.newPic
            console.log(`URL:${preViewURL}`)

        },
        photoAvatarFun(e){  //PC文章列表图
            let photoAvatar = e.target
            let file = photoAvatar.files[0]

            if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

            this.preView.filePath = URL.createObjectURL(file)

            // fileImage(file,"callback","filePath")
            fileImage(file,(data) => {
              let dataImg = data.files[0]
              this.filePath.filePath = dataImg.fileRelPath   //原图
              this.filePath.filePathPreviewRel = dataImg.filePreviewRelPath   //缩略图
            })

            let preViewURL = this.preView.photoAvatar
            console.log(`URL:${preViewURL}`)

        },
        photoCandidDealtFun(e){  //微信列表图
            let photoCandidDealt = e.target
            let file = photoCandidDealt.files[0]

            if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

            this.preView.filePathMobile = URL.createObjectURL(file)

             // fileImage(file,"callback","filePathMobile")
            fileImage(file,(data) => {
              let dataImg = data.files[0]
              this.filePath.filePathMobile = dataImg.fileRelPath   //原图
              this.filePath.filePathMobileRel = dataImg.filePreviewRelPath   //缩略图
            })

        },
        photoCandidDealtSliderFun(e){ //微信滑动幻灯图
            let photoCandidDealtSlider = e.target
            let file = photoCandidDealtSlider.files[0]

            if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

            this.preView.filePathSlide = URL.createObjectURL(file)

            // fileImage(file,"callback","filePathSlide")
            fileImage(file,(data) => {
              let dataImg = data.files[0]
              this.filePath.filePathSlide = dataImg.fileRelPath   //原图
              this.filePath.filePathSlideRel = dataImg.filePreviewRelPath   //缩略图
            })
        },
        fileImage(file,callback,which){
            let xhr = new XMLHttpRequest()
            let data = new FormData()

            data.append("callback", callback)
            data.append("img", file)
            xhr.onload =  () => {
              if (xhr.status == 200) {
                      console.log('success')
                      let data = JSON.parse(xhr.responseText)
                      let file = data.value.files[0]
                      if(which == "filePath"){
                          this.filePath.filePath = file.fileRelPath   //原图
                          this.filePath.filePathPreviewRel = file.filePreviewRelPath   //缩略图
                      }
                      if(which == "filePathMobile"){
                          this.filePath.filePathMobile = file.fileRelPath   //原图
                          this.filePath.filePathMobileRel = file.filePreviewRelPath   //缩略图
                      }
                      if(which == "filePathSlide"){
                          this.filePath.filePathSlide = file.fileRelPath   //原图
                          this.filePath.filePathSlideRel = file.filePreviewRelPath   //缩略图
                      }
                      if(which == "newPic"){
                          this.filePath.newPic = file.fileRelPath   //原图
                          this.filePath.newPicRel = file.filePreviewRelPath   //缩略图
                      }
                  } else {
                      alert('图片上传失败')
                  }
            }
            xhr.open("post","/depression-web/file/image/upload.json ", true)
            xhr.send(data)
        },*/
        async getQuestionsList(id){  //问题和答案列表
            let data = await testingQuestionsjumplistByTestingId(`testingId=${id}`)
            if(data.code == 0){
                this.questionsList = data.list
            }else{
              alert(`errMsg:${data.msg}`)
            }

        },
        async getSectionList(id){  //问题和答案列表
            let data = await TestingResultForJumplistByTestingId(`testingId=${id}`)
            if(data.code == 0){
                this.sectionList = data.list
            }else{
              alert(`errMsg:${data.msg}`)
            }
        },
        async btnUpload(){

            let paramsObj = {
                contentExplain:this.content,   //  正文说明  string  选填
                subtitle:this.oldInfo.subtitle,   //  简介  string  选填

                thumbnail:this.filePathPc,         // 缩略图 string  选填
                thumbnailMobile:this.filePathMobile,   // 移动端缩略图  string  选填
                thumbnailSlide:this.filePathSlide,    //  滑动缩略图 string  选填

                // thumbnail:this.filePath.filePath,         // 缩略图 string  选填
                // thumbnailMobile:this.filePath.filePathMobile,   // 移动端缩略图  string  选填
                // thumbnailSlide:this.filePath.filePathSlide,    //  滑动缩略图 string  选填

                title:this.oldInfo.title,   // 标题  string  选填
                typeId:this.selectedId,   //  问卷类别id  number  选填
                calcMethod:1,
            }
            let params = serialize(paramsObj)

            let data = await testingSave(params)

            if( data.code == 0 ){
                alert(`success`)
                this.ID = data.testingId
                this.saveState = true

            }else{
                alert(`errMsg:${data.msg}`)
                this.saveState = false
            }
        },
        async changeState(id,state,num){  //  0启用 1禁用   0新增题目 1新增结论
          if(num == 0){
// isDel 0启用，1禁用 number  必填
// resId 结论id  number  必填
            this.questionsId = id
            let data = await testingQuestionsjumpchangeStatus(`questionsId=${id}&isDel=${state}`)
            if(data.code == 0){
              //修改成功
              this.getQuestionsList(this.ID)
            }else{
              alert(`errMsg:${data.msg}`)
            }
            console.log(id,state)
          }
          if (num == 1) {
            this.sectionId = id
            let data = await TestingResultForJumpchangeStatus(`resId=${id}&isDel=${state}`)
            if(data.code == 0){
              //修改成功
              this.getSectionList(this.ID)
            }else{
              alert(`errMsg:${data.msg}`)
            }
          }
        },
        deleteSelect(item){
          this.questionsChangeList.optList.$remove(item)
        },
        addSelect(){  //11111111111111111111111111111111
          let  newTitle = this.newTodo.title
          let  newoptShow = this.newTodo.optShow
          let  newType = this.newTodo.optType
          if(newType == 0){
            if (newTitle&&newoptShow&&newType){
              this.questionsChangeList.optList.push({
                title: newTitle,
                optType:newType,
                jumpToQuestionNo:newoptShow,
                // optShow:newoptShow,
              })
              console.log("0")
            }
          }
          if(newType == 1){
            if (newTitle&&newoptShow&&newType){
              this.questionsChangeList.optList.push({
                title: newTitle,
                optType:newType,
                jumpResultTag:newoptShow,
                // optShow:newoptShow,
              })
            }
            console.log("1")
          }
          this.newTodo.title = ""
          this.newTodo.score = ""
          this.newTodo.Type  = ""
          this.newTodo.jumpResultTag = ""
          this.newTodo.jumpToQuestionNo  = ""
          this.newTodo.optShow = ""
        },
        newDeleteSelect(num){
          this.newQuestionsList.optList.splice(num, 1)
        },
        newAddSelect(){  //xxxxxxxxx  optType
          let  newTitle = this.newTodo.title
          let  newoptShow = this.newTodo.optShow
          let  newType = this.newTodo.optType
          if(newType == 0){
            if (newTitle&&newoptShow&&newType){
              this.newQuestionsList.optList.push({
                title: newTitle,
                optType:newType,
                jumpToQuestionNo:newoptShow,
                optShow:newoptShow,
              })
              console.log("0")
            }
          }
          if(newType == 1){
            if (newTitle&&newoptShow&&newType){
              this.newQuestionsList.optList.push({
                title: newTitle,
                optType:newType,
                jumpResultTag:newoptShow,
                optShow:newoptShow,
              })
            }
            console.log("1")
          }
          console.log(`TagShow:${this.newQuestionsList.optList[0].TagShow}`)
          this.newTodo.title = ""
          this.newTodo.score = ""
          this.newTodo.Type  = ""
          this.newTodo.jumpResultTag = ""
          this.newTodo.jumpToQuestionNo  = ""
          this.newTodo.optShow = ""
        },
        clearing( num,id,whichWindow ){  //修改弹窗  0问题  2答案

              this.drop.whichWindow = whichWindow
              this.drop.dropState = 'in'

          if(whichWindow == 0){
              this.questionsId = id
              this.questionNum = num

            //   this.questionsChangeList.isDelete =this.questionsList[num].isDelete
              this.questionsChangeList.isEnable =this.questionsList[num].isEnable
              this.questionsChangeList.optList = this.questionsList[num].optList
              this.questionsChangeList.questionsId =this.questionsList[num].questionsId
              this.questionsChangeList.questionsTitle =this.questionsList[num].questionsTitle
              this.questionsChangeList.seqNum =this.questionsList[num].seqNum
              this.questionsChangeList.optionsId =this.questionsList[num].optionsId
          }
          if(whichWindow == 2){
              this.sectionId = id
              this.sectionNum = num
              console.log(`this.sectionId：${id}`)
              this.sectionChangeList.detail =this.sectionList[num].detail
              this.sectionChangeList.resultTag = this.sectionList[num].resultTag
              this.sectionChangeList.title =this.sectionList[num].title

            //   this.sectionChangeList.picPath =this.sectionList[num].picPath
            //   this.preView.newPic = this.sectionList[num].filePath
            //   this.preView.newPicRel = this.sectionList[num].thumbnail
            //   this.filePath.newPicRel = this.sectionList[num].thumbnail

              this.filePath.newPicRel = this.sectionList[num].thumbnail

              console.log(`修改whichWindow:${whichWindow}`)
              console.log(`this.preView.newPic:${this.preView.newPic}`)

          }


        },
        clearingBtn(num,whichWindow){  /////////////////////////1111111111111111111111111111
            this.drop.whichWindow = whichWindow
            this.drop.dropState = 'in'
            if(whichWindow == 3){
            	//newtm
              this.sectionChangeList.detail = ""
              this.sectionChangeList.resultTag = ""
              this.sectionChangeList.title = ""
              this.sectionChangeList.picPath = ""

              this.filePath.newPicRel = ""

            //   this.preView.newPic = ""
            //   this.preView.newPic = ""

            }
        },
        closeDrop(then){  //关弹框  0确定  1取消
            this.drop.dropState = "hide"
            console.log(`then:${then}`)
            this.clearDropRecord()
            if(then == 1){
                this.getQuestionsList(this.ID)
                this.getSectionList(this.ID)
            }
        },
        async gettestingQuestionsjumpupdate(params){
            let data = await testingQuestionsjumpupdate(params)
            if (data.code == 0) {
              console.log('success')
              this.getQuestionsList(this.ID)
            }else{
              alert(`errMsg:${data.msg}`)
            }
        },
        clearDropRecord(){
            this.drop.dropState = 'hide'   /*弹窗状态*/
            this.drop.name = ""    //弹窗输入框
            this.drop.option = "0"  //弹窗下拉选择
            this.drop.windowTest = ""   //禁用or启用
            this.drop.whichWindow = ""  //哪个弹窗
            this.drop.requst = "" //点击确定后请求哪个链接  0新增   1  2 启用禁用 3修改
        },
        clearChangeRecord(){
            // this.questionsChangeList.isDelete = ""
            this.questionsChangeList.isEnable = ""
            this.questionsChangeList.optList = []
            this.questionsChangeList.questionsId = ""
            this.questionsChangeList.questionsTitle = ""
            this.questionsChangeList.seqNum = ""
        },
        async getAdd(num){
          if(num == 0){   //修改1  问题
              this.drop.dropState = "hide"
              console.log(`修改${num}`)

              this.deleteParams()


              // this.questionsChangeList.optList.forEach((item,index,arr)=>{
              //     if( item.optType == 0 ){
              //         delete item.jumpResultTag
              //     }
              //     if( item.optType == 1){
              //         item.jumpResultTag = item.jumpToQuestionNo
              //         delete item.jumpToQuestionNo
              //     }
              // })

              let jsonArrForOPts = JSON.stringify(this.questionsChangeList.optList)
              let paramsObj = {
                      // contentExplain:this.oldInfo.contentExplain,
                      contentExplain:this.content,
                      questionsTitle:this.questionsChangeList.questionsTitle,
                      seqNum:this.questionsChangeList.seqNum,
                      subtitle:this.oldInfo.subtitle,
                      tesingTitle:this.oldInfo.title,
                      typeId:this.selectedId,
                      questionsId:this.questionsId,
                      jsonArrForOPts:jsonArrForOPts,
                      testingId:this.ID,
                  }
                let params = serialize(paramsObj)
                this.gettestingQuestionsjumpupdate(params)

          }
          if(num == 1){  //  新增0 问题
              this.drop.dropState = "hide"

              this.deleteParams()

              this.newQuestionsList.optList.forEach((item,index,arr)=>{
                  delete item.optShow
              })

              let jsonArrForOPts = JSON.stringify(this.newQuestionsList.optList)

              let paramsObj = {

                      // contentExplain:this.oldInfo.contentExplain,
                      contentExplain:this.content,
                      questionsTitle:this.newtitle.questionsTitle,
                      seqNum: this.newtitle.seqNum,
                      subtitle:this.oldInfo.subtitle,
                      tesingTitle:this.oldInfo.title,
                      typeId:this.selectedId,
                      jsonArrForOPts:jsonArrForOPts,
                      testingId:this.ID,
                  }

              let params = serialize(paramsObj)
              let data = await testingquestionsjumpsave(params)
              if (data.code == 0) {
	                console.log('success')
                    this.newtitle.questionsTitle = ''
                    this.newtitle.seqNum = ''
                    this.newQuestionsList.optList = []
              }else{
                  alert(`errMsg:${data.msg}`)
              }
          }
          if(num == 2){  // 修改 2  答案
              console.log(`修改答案:${num}`)

              let paramsObj = {
                  detail:this.sectionChangeList.detail,  //  详情  string  必填
                  resultTag:this.sectionChangeList.resultTag, // 结论标签  string  必填
                  title:this.sectionChangeList.title, // 标题  string  必填
                  resId:this.sectionId,  // 结论id  number  必填
                  testingId:this.ID,// 问卷id  number  必填
                  thumbnail:this.filePath.newPicRel,  // 缩略图 string  选填
              }
              console.dir(paramsObj)
              let params = serialize(paramsObj)
              let data = await TestingResultForJumpupdate(params)
              if (data.code == 0) {
                  console.log('success')
              }else{
                  alert(`errMsg:${data.msg}`)
              }

          }
          if(num == 3){  // 新增 3  答案
              console.log(`新增答案:${num}`)

              let paramsObj = {
                    testingId:this.ID,
                    detail:this.newsSection.detail,
                    resultTag:this.newsSection.resultTag,
                    title:this.newsSection.title,
                    thumbnail:this.filePath.newPicRel,
              }
              console.dir(paramsObj)
              let params = serialize(paramsObj)
              let data = await TestingResultForJumpsave(params)
              if (data.code == 0) {
                  console.log('success')
                  this.newsSection.detail = ""
                  this.newsSection.title = ""
                  this.newsSection.seqNum = ""
                  this.newsSection.picPath = ""
                  this.newsSection.resultTag = ""
                  this.newsSection.picPath = ""

              }else{
                  alert(`errMsg:${data.msg}`)
              }
          }
          this.clearDropRecord()
          this.clearChangeRecord()
          this.getQuestionsList(this.ID)
          this.getSectionList(this.ID)
        },
        deleteParams(){
            this.questionsChangeList.optList.forEach((item,index,arr)=>{
                delete item.pageSize
                delete item.pageIndex
                delete item.pageStartNum
                delete item.optionsId
                delete item.questionsId
                delete item.sequence
                delete item.score
                // delete item.isDelete
                delete item.isEnable
                delete item.optShow
                if( item.jumpToQuestionNo == null ||item.jumpToQuestionNo == "" ){
                    delete item.jumpToQuestionNo
                }
                if( item.jumpResultTag == null ||item.jumpResultTag == "" ){
                    delete item.jumpResultTag
                }
            })
            this.fixParams()
        },
        fixParams(){
            this.questionsChangeList.optList.forEach((item,index,arr)=>{
                if(item.optType == 0 && item.jumpResultTag){
                    item.jumpToQuestionNo = item.jumpResultTag
                    delete item.jumpResultTag
                }
                if(item.optType == 1 && item.jumpToQuestionNo){
                    item.jumpResultTag = item.jumpToQuestionNo
                    delete item.jumpToQuestionNo
                }
            })
        }
    },
    filters:{
      statusFilter(num){
          let chargeWayArr = ['启用','禁用']
          return chargeWayArr[num]
      }
    },
    ready(){
        this.getTypeList()
    }
}

</script>



