<style scoped>
    .tagTit > .waitingForCheck {
        background-color: white;
        color: red;
    }

    .tagTit > .waitingForCheck:hover {
        background-color: rgb(79, 84, 103);
        color: white;
    }

    .tagTit > .show2 {
        background-color: rgb(79, 84, 103);
        color: white;
    }

    .tagCont {
        margin-top: 20px;
    }

    .modal_userList_Wrap_2 {
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .modal_userList_Wrap_2_text {
        width: 150px;
        height: 50px;
        line-height: 50px;
        background-color: green;
        border-radius: 10px;
        text-align: center;
        color: white;
        animation: 3s opacity2 0s 1;
        font-size: 24px;
    }

    .select2-results {
        max-height: 150px;
    }

    @keyframes opacity2 {
        0% {
            opacity: 0
        }
        50% {
            opacity: .8;
        }
        100% {
            opacity: 0;
        }
    }

    @-webkit-keyframes opacity2 {
        0% {
            opacity: 0
        }
        50% {
            opacity: .8;
        }
        100% {
            opacity: 0;
        }
    }

    @-moz-keyframes opacity2 {
        0% {
            opacity: 0
        }
        50% {
            opacity: .8;
        }
        100% {
            opacity: 0;
        }
    }

    .userList_opeartion span {
        margin: 10px;
        cursor: pointer;
    }

    .modal_userList_cover {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 6;
    }

    .modal_userList_Wrap {
        width: 400px;
        /* height: 420px; */
        background-color: white;
        position: absolute;
        top: 200px;
        left: 50%;
        transform: translate(-50%, 0);
        border: 1px solid black;

    }

    .modal_userList_Wrap_title {
        height: 60px;
        background-color: rgb(240, 240, 240);
        line-height: 60px;
        text-indent: 2em;
    }

    .modal_userList_Wrap ul {
        /* padding:0 10px 0 20px; */
    }

    .modal_userList_Wrap ul li span {
        display: inline-block;
        line-height: 40px;
    }

    .modal_userList_box_left_span {
        width: 100px;
        text-indent: 2em;
    }

    .modal_userList_Wrap_bottom {
        height: 60px;
        background-color: rgb(240, 240, 240);
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .modal_userList_Wrap_bottom span {
        cursor: pointer;
        display: inline-block;
        height: 30px;
        width: 70px;
        background-color: white;
        line-height: 30px;
        margin: 10px;
        text-align: center;
    }

    .modal_userList_Wrap_bottom_rightBtn {
        color: red;
    }

    .modal_userList_box_left_span_sel1 {
        /* width: 60px; */
        padding: 5px 6px;
        width: 55px;
        cursor: pointer;
        margin-bottom: 0;
        height: 31px;
    }

    .modal_userList_Wrap ul li .modal_userList_box_left_span_text {
        line-height: 20px;
        color: red;
    }

    .modal_userList_Wrap ul li .modal_userList_box_left_span_text2 {
        line-height: 20px;
        color: green;
    }

    .modal_userList_box_left_span_sel2 {
        padding: 4px 6px;
        width: 184px;
        cursor: pointer;
    }

    /* .modal_userList_box_right_span {
        text-indent: 6px;
    } */

    .modal_userList_Wrap_title_cancel_valet {
        line-height: 200px;
        text-align: center;
        font-size: 20px;
    }

</style>
<template>
    <div class="container-fluid">
        <div id="search" class="title">

            <input type="text" name="searchVal" placeholder="请输入姓名或手机号" v-model="searchVal">

            <select v-model="typeFilter" v-if="index === 1" v-el:type>
                <option value="">按服务类型</option>
                <option :value="0">专业咨询</option>
                <option :value="1">轻咨询</option>
            </select>

            <select v-model="licenseID" v-el:license v-if="index !== 3">
                <option value="">按职业类型</option>
                <option :value="item.ltid" :selected="$index === 0" v-text="item.licenseName"
                        v-for="item of licenseTypes"></option>
            </select>

            <select v-model="shanID" v-el:shan v-if="index !== 3">
                <option value="">按擅长领域</option>
                <option :value="item.tagId" v-text="item.tagName" v-for="item of shanTags"></option>
            </select>

            <div class="normal-div-ib" v-if="index === 1">
                <span class="normal-span-mr">微信号：</span>
                <input type="text" placeholder="" v-model="wxAccountS">
            </div>


            <input type="submit" value="确定搜索" class="btn btn-warning" @click="otherSeach()" v-if="index === 3">
            <input type="submit" value="确定搜索" class="btn btn-warning" @click="seach()" v-else>

        </div>

        <div class="tag">
            <div>
                <ul class="tagTit" style="margin-bottom: 10px;">
                    <li :class="{'show':index == 0}" @click="switchS(0)">未审核</li>
                    <li :class="{'show':index == 1}" @click="switchS(1)">已通过</li>

                    <li :class="{'show':index == 2}" @click="switchS(2)">不通过</li>
                </ul>
                <a href="/addExpertsIn" class="btn btn-success" >添加专家</a>

                <ul class="tagTit" style="float:right;" v-if="waitingForCheckNum">
                    <li :class="{'show2':index == 3}" class="waitingForCheck" @click="switchS(3)">审核<span
                            v-text="'（' + waitingForCheckNum + '）'"></span></li>
                </ul>
            </div>

            <ul class="tagCont" id="expertsInCont" v-if="psychoInfos.length || waitingForCheckList.length">
                <!-- 未审核 -->
                <li :class="{'show':index == 0}">
                    <table class="table table-bordered table-striped with-check mytable" id="DataTables_Table_0">
                        <thead>
                        <tr>
                            <!-- class="not-print" -->
                            <th @click='selectAll' class="pointer span1">

                                <div class="checkbox">
                                    <!-- <input type="checkbox" id="title-table-tha" class="checkboxInp" name="title-table-checkbox"  @click="checkedStatefn">
                                    <label for="title-table-tha" class="checkboxLabel"></label> -->
                                    <a href="javascript:;">全选</a>
                                </div>
                            </th>
                            <th>申请编号</th>
                            <th>申请时间</th>
                            <!-- <th></th> -->
                            <th>姓名</th>
                            <th>性别</th>
                            <th>手机号</th>
                            <th>微信号</th>
                            <th>执业种类</th>
                            <th>累计个案</th>
                            <th>从业年限</th>
                            <th>擅长领域</th>

                            <th class="not-print">职业照</th>

                            <th class="not-print">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item of psychoInfos " v-if="index == 0 ">
                            <td class="not-print">
                                <div class="checkbox">
                                    <input type="checkbox" id="title-table-td{{ item.piid }}" class="checkboxInp"
                                           name="title-table-checkbox" :checked=" item.checkState? 'checked':''"
                                           @click='selectPerson(item.piid, item)'>
                                    <label for="title-table-td{{ item.piid }}" class="checkboxLabel"></label>

                                    <!-- <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp" name="title-table-checkbox" @click='selectPerson(item.mid,item)' :checked=" item.checkState? 'checked':''">
                                    <label for="dataList-{{$index}}" class="checkboxLabel"></label> -->
                                </div>
                            </td>
                            <td> {{ item.piid }} </td>
                            <td>{{ item.createTime }}</td>
                            <td>{{ item.name }}</td>
                            <td v-text="item.sex | format "></td>
                            <td>{{ item.mobilePhone }}</td>
                            <td>{{ item.wxAccount }}</td>
                            <!-- <td>{{ item.workYears }}</td> -->
                            <td>{{ item.licenseName }}</td>
                            <td>{{ item.caseHours }}</td>
                            <td>{{ item.workYears }}</td>
                            <!--<td>{{ item.location }}</td>-->
                            <!-- <td :title="item.title"> <span class="not-space">{{ item.title }}</span></td> -->
                            <td>
                                <span class="not-space" v-for="tag in item.psychoTags" v-text="tag.tagName"></span>
                            </td>
                            <td class="not-print">
                                <img :src="imgPre +'/'+ item.photoCandidDealt "
                                     @click="btnViews(item.photoCandidDealt)"/> <a
                                    :href="imgPre +'/'+ item.photoCandidDealt" download="w3logo">下载</a>
                            </td>

                            <td class="not-print">
                                <!-- <a href="javascript:;" @click="BtnThrough(item.piid)">通过</a>
                                <a href="javascript:;" @click="BtnNotThrough(item.piid)">不通过</a> -->

                                <a href="javascript:;" @click="routeCheck(item.piid, item.isEap)">审核</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </li>

                <!-- 已通过 -->
                <li :class="{'show':index == 1}">
                    <table class="table table-bordered table-striped with-check mytable" id="DataTables_Table_0">
                        <thead>
                        <tr>
                            <th @click='selectAll' class="pointer span1">

                                <div class="checkbox">
                                    <!-- <input type="checkbox" id="title-table-tha" class="checkboxInp" name="title-table-checkbox"  @click="checkedStatefn">
                                    <label for="title-table-tha" class="checkboxLabel"></label> -->
                                    <a href="javascript:;">全选</a>
                                </div>
                            </th>
                            <th>申请编号</th>
                            <th>申请时间</th>
                            <th>通过时间</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>手机号</th>
                            <th>微信号</th>
                            <!--<th>所在地</th>-->
                            <!-- <th>从业年限</th> -->
                            <th>执业种类</th>
                            <th>累计个案</th>
                            <th>从业年限</th>
                            <th>擅长领域</th>
                            <th class="not-print">职业照</th>
                            <!-- <th class="not-print">资格证照片</th>
                            <th class="not-print">身份证照片</th>
                            <th class="not-print">头像</th>
                            <th class="not-print">职业照处理</th>
                            <th class="not-print">资格证隐私处理</th>
                            <th class="not-print">身份证隐私处理</th> -->
                            <!-- <th>简介</th> -->
                            <th>服务类型</th>
                            <th class="not-print">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item of psychoInfos" v-if="psychoInfos && index == 1">
                            <td class="not-print">
                                <div class="checkbox">
                                    <input type="checkbox" id="title-table-td{{ item.piid }}" class="checkboxInp"
                                           name="title-table-checkbox" :checked=" item.checkState? 'checked':''"
                                           @click='selectPerson(item.piid, item)'>
                                    <label for="title-table-td{{ item.piid }}" class="checkboxLabel"></label>

                                    <!-- <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp" name="title-table-checkbox" @click='selectPerson(item.mid,item)' :checked=" item.checkState? 'checked':''">
                                    <label for="dataList-{{$index}}" class="checkboxLabel"></label> -->
                                </div>


                                <!-- <div class="checkbox">
                                    <input type="checkbox" class="checkboxInp"  id="dataList-{{$index}}"  name="title-table-checkbox"  @click="selectPerson(item.piid,item)" :checked=" item.checkState? 'checked':''">
                                    <label for="dataList-{{$index}}" class="checkboxLabel"></label>
                                </div> -->
                            </td>
                            <td> {{ item.piid }} </td>
                            <td>{{ item.createTime }}</td>
                            <td>{{ item.auditTime }}</td>
                            <td>{{ item.name }}</td>
                            <td v-text="item.sex | format "></td>
                            <td>{{ item.mobilePhone }}</td>
                            <td>{{ item.wxAccount }}</td>
                            <!-- <td>{{ item.workYears }}</td> -->
                            <td>{{ item.licenseName }}</td>
                            <td>{{ item.caseHours }}</td>
                            <td>{{ item.workYears }}</td>
                            <!--<td>{{ item.location }}</td>-->
                            <!--  <td :title="item.title">  <span class="not-space"> {{ item.title }} </span></td> -->
                            <td><span class="not-space"> {{ item.psychoTags[0].tagName }}</span></td>
                            <td class="not-print">

                                <img :src=" imgPre +'/'+ item.photoCandid " @click="btnViews(item.photoCandid)"/> <a
                                    :href="imgPre +'/'+  item.photoCandid" :download="`${item.name}职业照`">下载</a>
                            </td>

                            <!-- <td class="not-print"><img :src=" imgPre +'/'+ item.photoCertification " @click="btnViews(item.photoCertification)" /> <a :href="imgPre +'/'+  item.photoCertification" download="img">下载</a></td>
                            <td class="not-print"> <img :src=" imgPre +'/'+ item.photoIdentityCard " @click="btnViews(item.photoIdentityCard )" /> <a :href="imgPre +'/'+  item.photoIdentityCard" download="img" >下载</a></td>


                            <td class="not-print"> <img :src=" imgPre +'/'+ item.photoAvatarPreview "  @click="btnViews(item.photoAvatarPreview )"/> <a :href="imgPre +'/'+  item.photoAvatarPreview" download="img" >下载</a> </td>
                            <td class="not-print"><img :src=" imgPre +'/'+ item.photoCandidDealtPreview "  @click="btnViews(item.photoCandidDealtPreview )" /> <a :href="imgPre +'/'+  item.photoIdentityCard" download="img" >下载</a> </td>

                            <td class="not-print"> <img :src=" imgPre +'/'+ item.photoCertificationDealtPreview " @click="btnViews(item.photoCertificationDealtPreview )" /> <a :href="imgPre +'/'+  item.photoCertificationDealtPreview" download="img" >下载</a></td>
                            <td class="not-print"> <img :src=" imgPre +'/'+ item.photoIdentityCardDealt "  @click="btnViews(item.photoIdentityCardDealt )"/> <a :href="imgPre +'/'+  item.photoIdentityCardDealt" download="img" >下载</a></td>
                            <td><span :title="item.brief" class="not-space"> {{ item.brief }} </span></td> -->

                            <td>
                                {{item.pLevel | typeFormat}}
                                <span style="cursor: pointer" @click="reverseTypes(item)">操作</span>
                            </td>
                            <td class="not-print">
                                <a href="javascript:;" @click="route(item.mid, 'edit')">编辑</a>

                                <a v-if="item.pictureAudit === 0" href="javascript:;" @click="routeImg(item.mid)"
                                   style="color: red;">待审核</a>


                            </td>

                        </tr>
                        </tbody>
                    </table>

                </li>

                <!-- 不通过 -->
                <li :class="{'show':index == 2}">
                    <table class="table table-bordered table-striped with-check mytable" id="DataTables_Table_0">
                        <thead>
                        <tr>
                            <th @click='selectAll' class="pointer span1">

                                <div class="checkbox">
                                    <!-- <input type="checkbox" id="title-table-tha" class="checkboxInp" name="title-table-checkbox"  @click="checkedStatefn">
                                    <label for="title-table-tha" class="checkboxLabel"></label> -->
                                    <a href="javascript:;">全选</a>
                                </div>
                            </th>
                            <th>申请编号</th>
                            <th>申请时间</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>手机号</th>
                            <th>微信号</th>
                            <!--<th>所在地</th>-->
                            <!-- <th>从业年限</th> -->
                            <th>执业种类</th>
                            <th>累计个案</th>
                            <th>从业年限</th>
                            <!-- <th>头衔</th> -->
                            <th>擅长领域</th>
                            <th class="not-print">职业照</th>
                            <!-- <th class="not-print">资格证照片</th>
                            <th class="not-print">身份证照片</th>
                            <th class="not-print">头像</th>
                            <th class="not-print">职业照处理</th>
                            <th class="not-print">资格证隐私处理</th>
                            <th class="not-print">身份证隐私处理</th> -->
                            <!--<th>简介</th>-->
                            <th class="not-print">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item of psychoInfos" v-if="psychoInfos && index == 2 ">
                            <td class="not-print">
                                <div class="checkbox">
                                    <input type="checkbox" id="title-table-td{{ item.piid }}" class="checkboxInp"
                                           name="title-table-checkbox" :checked=" item.checkState? 'checked':''"
                                           @click='selectPerson(item.piid, item)'>
                                    <label for="title-table-td{{ item.piid }}" class="checkboxLabel"></label>

                                    <!-- <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp" name="title-table-checkbox" @click='selectPerson(item.mid,item)' :checked=" item.checkState? 'checked':''">
                                    <label for="dataList-{{$index}}" class="checkboxLabel"></label> -->
                                </div>
                            </td>
                            <td> {{ item.piid }} </td>
                            <td>{{ item.createTime }}</td>
                            <td>{{ item.name }}</td>
                            <td v-text="item.sex | format "></td>
                            <td>{{ item.mobilePhone }}</td>
                            <td>{{ item.wxAccount }}</td>
                            <!-- <td>{{ item.workYears }}</td> -->
                            <td>{{ item.licenseName }}</td>
                            <td>{{ item.caseHours }}</td>
                            <td>{{ item.workYears }}</td>
                            <!--<td>{{ item.location }}</td>-->
                            <!-- <td :title="item.title"> <span class="not-space"> {{ item.title }} </span></td> -->
                            <td :title="item.primaryDomains"><span class="not-space"> {{ item.psychoTags[0].tagName
                                }}</span></td>
                            <td class="not-print"><img :src=" imgPre +'/'+ item.photoCandidDealt "
                                                       @click="btnViews(item.photoCandidDealt)"/> <a
                                    :href="imgPre +'/'+  item.photoCandidDealt" download="img">下载</a></td>

                            <!-- <td class="not-print"><img :src=" imgPre +'/'+ item.photoCertification " @click="btnViews(item.photoCertification)" /> <a :href="imgPre +'/'+  item.photoCertification" download="img">下载</a></td>
                            <td class="not-print"> <img :src=" imgPre +'/'+ item.photoIdentityCard " @click="btnViews(item.photoIdentityCard )" /> <a :href="imgPre +'/'+  item.photoIdentityCard" download="img" >下载</a></td>


                            <td class="not-print"> <img :src=" imgPre +'/'+ item.photoAvatarPreview "  @click="btnViews(item.photoAvatarPreview )"/> <a :href="imgPre +'/'+  item.photoAvatarPreview" download="img" >下载</a> </td>
                            <td class="not-print"><img :src=" imgPre +'/'+ item.photoCandidDealtPreview "  @click="btnViews(item.photoCandidDealtPreview )" /> <a :href="imgPre +'/'+  item.photoIdentityCard" download="img" >下载</a> </td>

                            <td class="not-print"> <img :src=" imgPre +'/'+ item.photoCertificationDealtPreview " @click="btnViews(item.photoCertificationDealtPreview )" /> <a :href="imgPre +'/'+  item.photoCertificationDealtPreview" download="img" >下载</a></td>
                            <td class="not-print"> <img :src=" imgPre +'/'+ item.photoIdentityCardDealt "  @click="btnViews(item.photoIdentityCardDealt )"/> <a :href="imgPre +'/'+  item.photoIdentityCardDealt" download="img" >下载</a></td> -->
                            <!-- <td><span :title="item.brief"  class="not-space"> {{ item.brief }} </span></td> -->
                            <td class="not-print">
                                <!-- <a href="javascript:;" @click="routeNO(item.piid)">编辑</a>
                                <a href="javascript:;" @click="BtnThrough(item.piid)">通过</a> -->
                                <a href="javascript:;" @click="butDelete(item.piid,item.name)">删除</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </li>

                <!-- 已通过列表中未审核 -->
                <li :class="{'show':index == 3}" v-if="waitingForCheckNum">
                    <table class="table table-bordered table-striped with-check mytable" id="DataTables_Table_0">
                        <thead>
                        <tr>
                            <th @click='selectAll' class="pointer span1">

                                <div class="checkbox">
                                    <!-- <input type="checkbox" id="title-table-tha" class="checkboxInp" name="title-table-checkbox"  @click="checkedStatefn">
                                    <label for="title-table-tha" class="checkboxLabel"></label> -->
                                    <a href="javascript:;">全选</a>
                                </div>
                            </th>
                            <th>申请编号</th>
                            <th>通过时间</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>手机号</th>
                            <th>微信号</th>
                            <!--<th>所在地</th>-->
                            <!-- <th>从业年限</th> -->
                            <th>执业种类</th>
                            <th>累计个案</th>
                            <th>从业年限</th>
                            <th>擅长领域</th>
                            <th class="not-print">职业照</th>
                            <!-- <th>服务类型</th> -->
                            <th class="not-print">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item of waitingForCheckList" v-if="waitingForCheckList && index == 3">
                            <td class="not-print">
                                <div class="checkbox">
                                    <input type="checkbox" id="title-table-td{{ item.piid }}" class="checkboxInp"
                                           name="title-table-checkbox" :checked=" item.checkState? 'checked':''"
                                           @click='selectPerson(item.piid, item)'>
                                    <label for="title-table-td{{ item.piid }}" class="checkboxLabel"></label>

                                    <!-- <input type="checkbox" id="dataList-{{$index}}" class="checkboxInp" name="title-table-checkbox" @click='selectPerson(item.mid,item)' :checked=" item.checkState? 'checked':''">
                                    <label for="dataList-{{$index}}" class="checkboxLabel"></label> -->
                                </div>
                            </td>
                            <td> {{ item.piid }} </td>
                            <td>{{ item.auditTime }}</td>
                            <td>{{ item.name }}</td>
                            <td v-text="item.sex | format "></td>
                            <td>{{ item.mobilePhone }}</td>
                            <td>{{ item.wxAccount }}</td>
                            <!-- <td>{{ item.workYears }}</td> -->
                            <td>{{ item.licenseName }}</td>
                            <td>{{ item.caseHours }}</td>
                            <td>{{ item.workYears }}</td>
                            <!--<td>{{ item.location }}</td>-->
                            <!--  <td :title="item.title">  <span class="not-space"> {{ item.title }} </span></td> -->
                            <td><span class="not-space"> {{ item.psychoTags[0].tagName }}</span></td>
                            <td class="not-print">

                                <img :src=" imgPre +'/'+ item.photoCandid " @click="btnViews(item.photoCandid)"/> <a
                                    :href="imgPre +'/'+  item.photoCandid" :download="`${item.name}职业照`">下载</a>
                            </td>

                            <!-- <td>
                                {{item.pLevel | typeFormat}}
                                <span style="cursor: pointer" @click="reverseTypes(item)">操作</span>
                            </td> -->
                            <td class="not-print">
                                <a href="javascript:;" @click="routeImg(item.mid)">审核</a>
                            </td>

                        </tr>
                        </tbody>
                    </table>

                </li>


            </ul>

            <div class="page" style="margin-top:20px;">

                <div id="test" v-if="index === 3">
                    <zpagenav :page="pageAnother" , :page-size="pageSizeAnother" , :total="waitingForCheckNum" ,
                              :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl">
                        <zpagenav>
                </div>

                <div id="test" v-else>
                    <zpagenav :page="page" , :page-size="pageSize" , :total="total" , :max-link="maxLink"
                              :page-handler="pageHandler" :create-url="createUrl">
                        <zpagenav>
                </div>
                <div>
                    <!--<span class="btn btn-success service-btn" v-if="index === 1" @click="addRecommendPsycho">添加到推荐（新）</span>-->
                    <span class="btn btn-success" style="margin-right: 15px" v-if="index === 1" @click="addActivity">添加到活动</span>
                    <!-- <span class="btn btn-success" style="margin-right: 15px" v-if="index === 1" @click="modifyType">修改服务类型</span> -->
                    <!-- <a :href="url" download="咨询师入驻.xls" class="btn btn-success" @click="exportHandler" v-if="index !== 3">导出excel</a> -->
                    <span class="btn btn-success" style="margin-right: 15px" v-if="index !== 3" @click="downloadExcel">导出Excel</span>
                    <a href="javascript:;" v-el:a v-if="index !== 3"></a>
                </div>


            </div>

            <div style="color:red;/* margin-top: 20px; */text-align: right;" v-if="index != 3">
                导出功能：有选中的会导出选中部分，无选中会导出当前搜索条件下（已通过状态下会过滤掉被禁用的专家）全部，全选功能只是选中当前页面
            </div>


        </div>

    </div>

    <!-- start 删除 -->
    <div class="modal-backdrop in" v-if="deleteState"></div>
    <div id="myAlert" class="modal" v-if="deleteState">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3></h3>
        </div>
        <div class="modal-body">
            <p>您确定删除{{ name }}吗？</p>
        </div>
        <div class="modal-footer">
            <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()">取消</a>
            <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configDelete()">确定</a></div>
    </div>
    <!-- end 删除 -->


    <!-- start 通过 -->
    <div class="modal-backdrop in" v-if="through"></div>
    <div id="myAlert" class="modal" v-if="through">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3></h3>
        </div>
        <div class="modal-body">
            <p>您确定审核通过吗？</p>
        </div>
        <div class="modal-footer">
            <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()">取消</a>
            <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configThrough(1)">通过</a></div>
    </div>
    <!-- end 通过 -->

    <!-- start 不通过 -->
    <div class="modal-backdrop in" v-if="NotThrough"></div>
    <div id="myAlert" class="modal" v-if="NotThrough">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>填写不通过原因</h3>
        </div>
        <div class="modal-body">
            <textarea class="NotThroughCont" v-model="NotThroughCont" name="NotThroughCont"></textarea>
        </div>
        <div class="modal-footer">
            <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()">取消</a>
            <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configNotThrough(2)">不通过</a>
        </div>
    </div>
    <!-- end 不通过 -->


    <!-- start 预览 -->
    <div class="modal-backdrop in" v-if="views"></div>
    <div id="myAlert" class="modal" v-if="views">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>预览</h3>
        </div>
        <div class="modal-body">
            <img :src="imgPre + '/' + viewsImg" width="513">
        </div>
    </div>
    <!-- end 预览 -->

    <div class="dialog-wrapper" v-if="reverseStatus">
        <div class="dialog-container">
            <h4>将{{reverseName}}修改为：<br> 『{{reverseType | reverseFormat}}』吗？</h4>
            <div class="btn-wrapper">
                <div @click="cancelReverse">取消</div>
                <div @click="confirmReverse">确定</div>
            </div>
        </div>
    </div>

    <div class="dialog-wrapper" v-if="modifyTypeStatus">
        <div class="dialog-container">
            <h4>确定将选中的 {{selectType.length}}个专家修改为：<br> 『{{modifyTypeGlobal | reverseFormat}}』吗？</h4>
            <div class="btn-wrapper">
                <div @click="cancelReverseModify">取消</div>
                <div @click="confirmReverseModify">确定</div>
            </div>
        </div>
    </div>

    <!-- start      添加到推荐（新）成功示例 -->
    <div class="modal_userList_cover" style="background-color:transparent;" v-if="addSuccessMsg">
        <div class="modal_userList_Wrap_2">
            <div class="modal_userList_Wrap_2_text">
                添加成功
            </div>
        </div>
    </div>
    <!-- end        添加到推荐（新）成功示例 -->


    <!-- 添加到推荐(新)情况示例 -->
    <div class="modal_userList_cover" v-if="errMsgAlertWindow" @click="iKnowAboutIt">
        <div class="modal_userList_Wrap" style="width:600px">
            <div class="modal_userList_Wrap_title">
                添加到推荐异常提示
            </div>
            <div class="modal_userList_Wrap_title_cancel_valet" v-text="errMsgAlertWindowMsg">

            </div>

            <div class="modal_userList_Wrap_bottom">
                <!-- <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancelCancelFn">返回</span> -->
                <span class="modal_userList_Wrap_bottom_rightBtn" @click="iKnowAboutIt">知道了</span>
            </div>
        </div>
    </div>

</template>

<script type="text/javascript">
    import Vue from "vue"
    import zpagenav from "vue-pagenav"
    import calendar from "../../calendar.vue"
    import moment from "moment"
    import $ from "jquery"
    import utils from "../../utils"
    import {serialize} from "../../utils"
    import qiniu from "../../qiniu.vue"


    import {
        getPsychoInfoList,
        searchPsychoInfoList,
        deletePsychoInfoByKey,
        auditPsychoInfo,

        getResponse,
        getResponses,
        getResponsesExcel
    } from "../../api.js"

    Vue.use(zpagenav)

    export default {

        // 	# Options
        // * :show    是否显示
        // * :type    date|datetime
        // * :value	默认值
        // * :begin  可选开始时间
        // * :end    可选结束时间
        // * :x      显示x坐标
        // * :y      显示y坐标
        // * :range  是否多选
        // * :weeks	星期标题
        // * :months	月份标题
        // * :sep		分隔符

        components: {
            calendar
        },
        // props: ['imgPre'],
        data() {
            return {
                imgPre: `http://${process.env.NODE_ENV == 'production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
                // 数据绑定
                calendar: {
                    show: false,
                    x: 0,
                    y: 0,
                    picker: "",
                    type: "date",
                    value: "",
                    begin: "",
                    end: "",
                    value: "",
                    weeks: [],
                    months: [],
                    sep: "-",
                    range: false,
                    items: {
                        // 单选模式
                        picker1: {
                            type: "date",
                            end: moment().format().split('T')[0],
                            value: "",
                            sep: "-",
                            weeks: ['日', '一', '二', '三', '四', '五', '六'],
                            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        },
                        picker2: {
                            value: this.start,
                            sep: "-",
                            begin: this.start
                        }
                    }
                },
                page: 1, //pagepageSize: 10 //pageSize,  default is 10
                pageSize: 10,
                total: 0, //total item count
                psychoInfos: [],
                maxLink: 10, //how many links to show, must not less than 5,  default is 5
                start: '',
                end: '',
                searchVal: '',
                index: 0,
                piid: '',
                name: '',
                deleteState: false,
                auditStatus: 0,
                audit: '',
                through: false,
                NotThrough: false,
                NotThroughCont: '',
                views: false,
                viewsImg: '',
                urlFun: '',
                template: '',
                checkedState: '',
                table: '',

                licenseID: "",
                licenseTypes: [],
                shanTags: [],
                shanID: "",

                wxAccountS: '',


                reverseStatus: false,
                reverseName: "",
                reverseType: 0,
                selectType: [],
                modifyTypeStatus: false,
                modifyTypeGlobal: -1,

                typeFilter: "",
                // typeFilter: '',

                // 专家修改职业照和头像后待审核数量
                waitingForCheckNum: 0,
                pageAnother: 1,
                pageSizeAnother: 10,

                waitingForCheckList: [],

                selectPersonAll: false,
                selectPersonList: [],

                // 添加成功
                addSuccessMsg: false,

                // 添加失败提示语
                errMsgAlertWindow: false,
                errMsgAlertWindowMsg: '',


            }
        },
        // 处理值的传递
        watch: {
            'calendar.value': function (value) {

                this.calendar.items[this.calendar.picker].value = value

                this.calendar.picker == 'picker1' ? this.start = value + ' 00:00:00' : this.end = value + ' 00:00:00'
            },
            page() {

                if (this.selectPersonAll) {
                    this.selectPersonAll = false
                    // this.selectPersonList
                }
                console.log("page change")
                this.getExpertList()
                //this.tableFn()
            },
            pageAnother() {
                if (this.selectPersonAll) {
                    this.selectPersonAll = false
                    // this.selectPersonList
                }
                this.auditMemberPicList()
                //this.tableFn()
            },
            licenseID(value) {
                this.page = 1
                this.emptySelectionFn()
            },
            shanID(value) {
                this.page = 1
                this.emptySelectionFn()

            },
            typeFilter(value) {
                this.emptySelectionFn()
            },
            index(value) {
                value === 1 && setTimeout(() => this.$els.type.selectedIndex = 0)
            },
            selectType(value) {
                if (this.modifyTypeGlobal !== -1) {
                    return
                }


                this.psychoInfos.forEach((item) => {
                    if (item.piid === value[0]) {
                        this.modifyTypeGlobal = item.pLevel
                    }
                })
            },
            selectPersonList(value) {
                console.log(value)
            }
        },
        filters: {
            format(value) {
                let array = ["未知", "男", "女"]

                return array[value]
            },
            typeFormat(value) {
                let array = ["专业", "轻"]

                return array[value]
            },
            reverseFormat(value) {
                let array = ["轻咨询", "专业咨询"]

                return array[value]
            }
        },
        components: {
            qiniu
        },

        events: {
            'imgParameter': function (obj) {
                this.imgPath = obj.imgPath
            }
        },
        methods: {
            modifyType() {
                console.log(this.selectType)
                if (!this.selectType.length) {
                    alert("请选择专家")

                    return
                }

                this.modifyTypeStatus = true
            },
            async addActivity() {
                if (!this.selectPersonList.length) {
                    alert("请选择专家")

                    return
                }


                const params = {
                    mids: JSON.stringify(this.selectPersonList),
                }
                const data = await getResponses("PsychoRecommend/addPsychoRecommend.json", serialize(params))

                if (data.code === 0) {
                    alert("添加成功")
                } else {
                    alert(data.msg)
                }

            },


            // start ----------------------------------------------------新增添加到推荐（新）
            async addRecommendPsycho() {
                if (!this.selectPersonList.length) {
                    alert("请选择专家")

                    return
                }

                this.addSuccessMsg = false
                this.errMsgAlertWindow = false
                this.errMsgAlertWindowMsg = ''
                const params = {
                    ids: JSON.stringify(this.selectPersonList),
                    userId: sessionStorage.userId,
                }
                const data = await getResponses("PsychoInfo/V3/addRecommendPsycho.json", serialize(params))


                if (data.code === 0) {
                    // alert("添加到推荐成功")
                    this.addSuccessMsg = true
                    this.toCloseWindow()
                    this.selectPersonList = []
                    this.emptySelectionFn()


                } else if (data.code === 2094) {

                    this.errMsgAlertWindow = true
                    this.errMsgAlertWindowMsg = "专家" + data.msg
                    // alert("专家" + data.msg)
                } else {
                    // alert(data.msg)
                    this.errMsgAlertWindow = true
                    this.errMsgAlertWindowMsg = data.msg
                }

            },

            toCloseWindow() {
                setTimeout(() => {
                    this.addSuccessMsg = false
                }, 3000)
            },

            iKnowAboutIt() {
                this.errMsgAlertWindow = false
                this.errMsgAlertWindowMsg = ''
                this.emptySelectionFn()
            },
            // end -----------------------------------------------------新增添加到推荐（新）

            emptySelectionFn() {
                console.log("empty")
                this.selectPersonAll = false
                this.selectPersonList = []
                this.getExpertList()
            },
            cancelReverse() {
                this.reverseStatus = false
            },
            cancelReverseModify() {
                this.modifyTypeStatus = false
            },
            async confirmReverseModify() {
                this.modifyTypeStatus = false

                const params = {
                    ids: JSON.stringify(this.selectType),
                    pLevel: this.modifyTypeGlobal === 0 ? 1 : 0
                }
                const data = await getResponses("Psychor/updatePsychoPLevelByIds.json", serialize(params))

            },
            async confirmReverse() {
                this.reverseStatus = false

                const params = {
                    ids: JSON.stringify([this.$id]),
                    pLevel: this.reverseType === 0 ? 1 : 0
                }
                const data = await getResponses("Psychor/updatePsychoPLevelByIds.json", serialize(params))

            },
            async reverseTypes(item) {
                this.reverseName = item.name
                this.reverseType = item.pLevel
                this.$id = item.piid

                this.reverseStatus = true
            },


            async getLicenses() {
                const data = await getResponse("PsychoInfo/getLicenseTypeList.json")

                this.licenseTypes = data.licenseTypes

                this.$nextTick(() => this.$els.license.selectedIndex = 0)
            },
            async getShanTags() {
                const data = await getResponse("Tag/obtainTags.json")

                this.shanTags = data.tags

                this.$nextTick(() => this.$els.shan.selectedIndex = 0)
            },
            async getExpertList(auditStatus) {

                const params = {
                    auditStatus: this.auditStatus,
                    pageIndex: this.page,
                    pageSize: this.maxLink,
                    words: this.searchVal.trim()
                    //ltid: this.licenseID,
                    //tagId: this.shanID
                }

                this.licenseID && (params.ltid = this.licenseID)
                this.shanID && (params.tagId = this.shanID)

                this.index === 1 && this.wxAccountS && (params.wxAccount = this.wxAccountS.trim())

                // this.typeFilter !== -1 && this.typeFilter !== "" && (params.pLevel = this.typeFilter)
                if (this.typeFilter === 0 || this.typeFilter === 1) {
                    params.pLevel = this.typeFilter
                }


                const data = await getResponses("PsychoInfo/V3/searchPsychoInfoList.json", serialize(params))

                if (data.code === 0) {
                    if (this.index != 3) {

                        this.psychoInfos = data.psychoInfoDTOs


                        this.total = data.count

                        if (data.auditCounts) {
                            this.waitingForCheckNum = data.auditCounts
                        }

                        //修改
                        this.psychoInfos.forEach((item) => {   //checkBox
                            Vue.set(item, "checkState", false);
                        })


                        //修改选中状态
                        this.psychoInfos.forEach((item) => {
                            //当列表中有此id时修改选中状态为选中
                            this.selectPersonList.forEach((v) => {
                                if (item.piid == v) {
                                    Vue.set(item, "checkState", true);
                                }
                            })
                            //Vue.set(item, "checkState", false);
                        })

                    } else {

                        this.waitingForCheckNum = data.auditCounts
                        this.waitingForCheckList = data.list

                        //修改
                        this.waitingForCheckList.forEach((item) => {   //checkBox
                            Vue.set(item, "checkState", false);
                        })


                        //修改选中状态
                        this.waitingForCheckList.forEach((item) => {
                            //当列表中有此id时修改选中状态为选中
                            this.selectPersonList.forEach((v) => {
                                if (item.piid == v) {
                                    Vue.set(item, "checkState", true);
                                }
                            })
                            //Vue.set(item, "checkState", false);
                        })


                    }
                } else {
                    alert(data.msg)
                }


            },


            pageHandler(page) {
                //here you can do custom state update
                if (this.index === 3) {
                    this.pageAnother = page
                } else {
                    this.page = page

                }

            },

            createUrl(unit) {
                if (this.index === 3) {
                    return unit.pageAnother > 1 ? '#pageAnother=' + unit.pageAnother : '#'
                } else {

                    return unit.page > 1 ? '#page=' + unit.page : '#'
                }

            },

            routeCheck(id, eap) {
                this.$route.router.go(`/check/${id}?eap=${eap}`)
            },
            route(id, isEdit, isCheck) {

                if (isCheck) {
                    this.$route.router.go(`/check/${id}`)
                } else {
                    this.$route.router.go(`/expertsIn/${id}${isEdit ? '?edit=1' : ''}`)
                }
            },
            routeNO(id) {

                this.$route.router.go(`/expertsInNO/${id}`)
            },

            routeImg(id) {

                this.$route.router.go(`/checkImg/${id}`)
            },
            checkedStatefn(e) {
                this.checkedState = e.target.checked
            },
            templateText(data) {
                let self = this
                return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">\
				<head>
				<xml>
				  <x:ExcelWorkbook>
				    <x:ExcelWorksheets>
				      <x:ExcelWorksheet>
				        <x:Name>{{worksheet}}</x:Name>
				        <x:WorksheetOptions>
				          <x:DisplayGridlines/>
				        </x:WorksheetOptions>
				      </x:ExcelWorksheet>
				    </x:ExcelWorksheets>
				  </x:ExcelWorkbook>
				</xml><![endif]-->
				</head>
				<body>
					<table>
						${data}
					</table>
				</body>
			</html>`
            },
            base64(string) {
                return window.btoa(unescape(encodeURIComponent(string)))
            },

            tableToExcel: function (tableList, name) {
                let tables = []
                let uri = 'data:application/vnd.ms-excel;base64,'

                for (var i = 0; i < tableList.length; i++) {
                    tables.push(tableList[i].innerHTML);
                }
                var data = {
                    worksheet: name || 'Worksheet',
                    tables: tables
                };


                this.table = ''
                return uri + this.base64(this.templateText(data.tables));
            },

            exportHandler(event) {
                this.tableFn()
                event.currentTarget.href = this.tableToExcel(this.table, '用户数据');


            },

            tableFn() {

                let tables = $('table:visible')
                let self = this
                tables.each(function (i) {
                    var t = $('<table><thead></thead><tbody></tobdy></table>');
                    t.find('thead').html(this.tHead.innerHTML);
                    t.find('tbody').append($(this.tBodies).children(':visible').clone());
                    t.find('tbody tr').each(function () {
                        if (!$(this).find('input:checkbox').is(':checked')) {
                            $(this).addClass('not-print')
                        }
                    })
                    t.find('.not-print').remove(); // not-print 是@media print中不会打印的部分

                    t.find('a').replaceWith(function (i) { // 表格中不再需要的超链接也移除了
                        return this.innerHTML;
                    });
                    self.table = self.table ? self.table.add(t) : t;

                });

            },

            // 打开显示选择器
            open(e, type) {
                // 设置类型
                this.calendar.picker = type
                this.calendar.type = this.calendar.items[type].type
                this.calendar.range = this.calendar.items[type].range
                this.calendar.begin = this.calendar.items[type].begin
                this.calendar.end = this.calendar.items[type].end
                this.calendar.value = this.calendar.items[type].value
                // 可不用写
                this.calendar.sep = this.calendar.items[type].sep
                this.calendar.weeks = this.calendar.items[type].weeks
                this.calendar.months = this.calendar.items[type].months

                this.calendar.show = true
                this.calendar.x = e.target.offsetLeft
                this.calendar.y = e.target.offsetTop + e.target.offsetHeight + 8


            },

            switchS(index) {
                this.selectPersonAll = false
                this.selectPersonList = []
                this.index = index


                if (this.index === 3) {
                    this.pageAnother = 1
                    this.auditMemberPicList()
                } else {
                    this.auditStatus = index
                    this.page = 1
                    this.typeFilter = ""
                    this.licenseID = ""
                    this.shanID = ""
                    this.searchVal = ""
                    this.getExpertList()
                }

                // this.checkedState = false

            },


            seach() {
                this.page = 1
                this.getExpertList()

                // let params = `auditStatus=${this.auditStatus}&pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.searchVal}&begin=${this.start}&end=${this.end}`

                // this.searchPsychoInfoList(params)
            },
            otherSeach() {
                this.pageAnother = 1
                this.auditMemberPicList()
            },

            close() {
                this.deleteState = false
                this.through = false
                this.NotThrough = false
                this.views = false
            },

            btnViews(img) {

                this.viewsImg = img

                this.views = true

            },

            BtnNotThrough(piid) {

                this.NotThrough = true
                this.piid = piid
            },

            BtnThrough(piid) {

                this.through = true
                this.piid = piid
            },

            configNotThrough(auditStatus) {

                let params = `auditStatus=${auditStatus}&piid=${this.piid}&reason=${this.NotThroughCont}`

                this.auditPsychoInfo(params)
            },

            configThrough(auditStatus) {

                let params = `auditStatus=${auditStatus}&piid=${this.piid}`
                this.auditPsychoInfo(params)
            },

            butDelete(piid, name) {

                this.piid = piid
                this.name = name

                this.deleteState = true
            },

            configDelete() {

                this.deletePsychoInfoByKey(`piid=${this.piid}`)
            },


            async deletePsychoInfoByKey(params) {

                let data = await deletePsychoInfoByKey(params)

                if (data.code == 0) {
                    this.page = 1
                    this.getExpertList()
                    // this.getPsychoInfoList()
                    this.deleteState = false
                } else {
                    alert(data.msg)
                }
            },

            async searchPsychoInfoList(params) {

                let data = await searchPsychoInfoList(params)

                this.psychoInfos = data.psychoInfoDTOs

                this.total = data.count

            },
            async getPsychoInfoList(auditStatus) {
                // this.auditStatus = (auditStatus ? auditStatus : 0)

                // let params = `auditStatus=${this.auditStatus}&pageIndex=${this.page}&pageSize=${this.maxLink}`
                // let data = await getPsychoInfoList(params)

                // this.psychoInfos = data.psychoInfos


                // this.total = data.count
                const params = {
                    auditStatus: auditStatus,
                    pageIndex: this.page,
                    pageSize: this.maxLink,
                    // words: this.

                }
                const data = await getResponses("PsychoInfo/V3/searchPsychoInfoList.json", serialize(params))

                if (data.code === 0) {
                    this.psychoInfos = data.psychoInfoDTOs


                    this.total = data.count

                    if (data.auditCounts) {
                        this.waitingForCheckNum = data.auditCounts
                    }

                    //修改
                    this.psychoInfos.forEach((item) => {   //checkBox
                        Vue.set(item, "checkState", false);
                    })


                    //修改选中状态
                    this.psychoInfos.forEach((item) => {
                        //当列表中有此id时修改选中状态为选中
                        this.selectPersonList.forEach((v) => {
                            if (item.piid == v) {
                                Vue.set(item, "checkState", true);
                            }
                        })
                        //Vue.set(item, "checkState", false);
                    })
                } else {
                    alert(data.msg)
                }


            },

            async auditPsychoInfo(params) {

                let data = await auditPsychoInfo(params)


                this.through = false

                this.NotThrough = false

                if (data.code == 0) {
                    this.getPsychoInfoList()
                } else {
                    alert(data.msg)
                }

            },

            async auditMemberPicList() {
                const params = {
                    pageIndex: this.pageAnother,
                    pageSize: this.maxLink,
                    words: this.searchVal.trim()
                }
                let data = await getResponses("PsychoInfo/V3/auditMemberPicList.json", serialize(params))
                console.log("待审核：", data)
                // waitingForCheckNum 数量
                if (data.code === 0) {
                    this.waitingForCheckNum = data.auditCounts
                    this.waitingForCheckList = data.list

                    //修改
                    this.waitingForCheckList.forEach((item) => {   //checkBox
                        Vue.set(item, "checkState", false);
                    })


                    //修改选中状态
                    this.waitingForCheckList.forEach((item) => {
                        //当列表中有此id时修改选中状态为选中
                        this.selectPersonList.forEach((v) => {
                            if (item.piid == v) {
                                Vue.set(item, "checkState", true);
                            }
                        })
                        //Vue.set(item, "checkState", false);
                    })


                } else {
                    alert(data.msg)
                }
            },

            //单击每个人物
            selectPerson(piid, item) {

                console.log(item.checkState);
                item.checkState = !item.checkState

                if (this.index != 3) {

                    if (item.checkState) {
                        this.selectPersonList.push(piid)
                    } else {
                        for (let i = 0; i < this.selectPersonList.length; i++) {
                            if (this.selectPersonList[i] == piid) {
                                this.selectPersonList.splice(i, 1)
                            }
                        }

                        // this.selectPersonList.shift(piid)
                    }

                } else {

                    if (item.checkState) {
                        this.waitingForCheckList.push(piid)
                    } else {
                        for (let i = 0; i < this.waitingForCheckList.length; i++) {
                            if (this.waitingForCheckList[i] == piid) {
                                this.waitingForCheckList.splice(i, 1)
                            }
                        }

                        // this.selectPersonList.shift(piid)
                    }

                }

                console.log(`selectPersonList:${this.selectPersonList}`)
            },

            selectAll() {
                this.selectPersonAll = !this.selectPersonAll
                this.selectPersonList = []

                if (this.index != 3) {
                    if (this.selectPersonAll) {
                        this.psychoInfos.forEach((item, index, arr) => {
                            console.log(item.checkState)
                            item.checkState = true
                            console.log(item.checkState)

                            this.selectPersonList.push(item.piid)
                        })
                    } else {
                        this.psychoInfos.forEach((item, index, arr) => {
                            item.checkState = false
                        })
                    }
                } else {
                    if (this.selectPersonAll) {
                        this.waitingForCheckList.forEach((item, index, arr) => {
                            console.log(item.checkState)
                            item.checkState = true
                            console.log(item.checkState)

                            this.selectPersonList.push(item.piid)
                        })
                    } else {
                        this.waitingForCheckList.forEach((item, index, arr) => {
                            item.checkState = false
                        })
                    }
                }

                console.log(`selectPerson:${this.selectPersonList}`)
            },


            //导出到excel
            async downloadExcel() {


                let params = {}
                params.auditStatus = this.auditStatus

                this.licenseID && (params.ltId = this.licenseID)
                this.shanID && (params.tagId = this.shanID)

                if (this.typeFilter === 0 || this.typeFilter === 1) {
                    params.pLevel = this.typeFilter
                }


                params.words = this.searchVal.trim()
                if (this.selectPersonList.length) {
                    params.ids = JSON.stringify(this.selectPersonList)
                } else {
                    // params.ids = ""
                }
                // params.ids = JSON.stringify(this.selectPersonList)
                const p = serialize(params)
                console.log("p:", p)
                const data = await getResponsesExcel("PsychoInfo/exportPsychoInfo.json", p)
                console.log(data)

                let blob = new Blob([data], {
                        'type': 'application/msexcel'
                    }),
                    a = this.$els.a

                a.href = window.URL.createObjectURL(blob)
                a.download = `咨询师.xls`
                a.click()
            },
        },
        ready() {
            this.getLicenses()
            this.getShanTags()

            this.getExpertList()
            // this.auditMemberPicList()


        }
    }
</script>
