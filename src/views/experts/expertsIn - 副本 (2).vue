<style scoped>
	.tagTit>.waitingForCheck {
		background-color: white;
		color: red;
	}
	.tagTit>.waitingForCheck:hover {
		background-color: rgb(79, 84, 103);
		color: white;
	}
	.tagTit>.show2 {
		background-color: rgb(79, 84, 103);
		color: white;
	}
	.tagCont {
		margin-top: 20px;
	}
</style>
<template>


	<div class="container-fluid">
		<div id="search" class="title">

			<input type="text" name="seachVal" placeholder="请输入姓名或手机号" v-model="seachVal">

			<select v-model="typeFilter" v-if="index === 1" v-el:type>
				<option value="">按服务类型</option>
				<option :value="0">专业咨询</option>
				<option :value="1">轻咨询</option>
			</select>

			<select v-model="licenseID" v-el:license>
				<option value="">按职业类型</option>
				<option :value="item.ltid" :selected="$index === 0" v-text="item.licenseName" v-for="item of licenseTypes"></option>
			</select>

			<select v-model="shanID" v-el:shan>
				<option value="">按擅长领域</option>
				<option :value="item.tagId" v-text="item.tagName" v-for="item of shanTags"></option>
			</select>

			<input type="submit" value="确定搜索" class="btn btn-warning" @click="seach()">
	    </div>

	    <div class="tag">
	    	<div>
	    		<ul class="tagTit">
					<li :class="{'show':index == 0}" @click="switchS(0)">未审核</li>
					<li :class="{'show':index == 1}" @click="switchS(1)">已通过</li>

					<li :class="{'show':index == 2}" @click="switchS(2)">不通过</li>
				</ul>
				<a href="/addExpertsIn" class="btn btn-success">添加专家</a>

				<ul class="tagTit" style="float:right;" v-if="waitingForCheckNum">
					<li :class="{'show2':index == 3}" class="waitingForCheck" @click="switchS(3)">待审核<span v-text="'（' + waitingForCheckNum + '）'"></span></li>
				</ul>
	    	</div>

			<ul class="tagCont" id="expertsInCont" v-if="psychoInfos.length">
				<!-- 未审核 -->
				<li :class="{'show':index == 0}">
					<table class="table table-bordered table-striped with-check mytable" id="DataTables_Table_0">
			            <thead>
			                <tr>
			                	<th class="not-print">
			                    	<div class="checkbox">
			                    		<input type="checkbox" id="title-table-tha" class="checkboxInp" name="title-table-checkbox"  @click="checkedStatefn">
			                        	<label for="title-table-tha" class="checkboxLabel"></label>
			                    	</div>
			                    </th>
			                    <th>申请编号</th>
			                    <th>申请时间</th>
			                    <!-- <th></th> -->
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
			                    <th class="not-print">生活照</th>
			                    <!-- <th class="not-print">资格证照片</th>
			                    <th class="not-print">身份证照片</th>
			                    <th class="not-print">头像</th>
			                    <th class="not-print">生活照处理</th>
			                    <th class="not-print">资格证隐私处理</th>
			                    <th class="not-print">身份证隐私处理</th> -->
			                    <!--<th>简介</th>-->
			                    <th class="not-print">操作</th>
			                </tr>
			            </thead>
			            <tbody>
			            	<tr v-for="item of psychoInfos "  v-if="index == 0 ">
			            		<td class="not-print">
							    	<div class="checkbox">
			                    		<input type="checkbox" id="title-table-td{{ item.piid }}" class="checkboxInp" name="title-table-checkbox" :checked="checkedState">
							        	<label for="title-table-td{{ item.piid }}" class="checkboxLabel"></label>
			                    	</div>
							    </td>
							    <td> {{ item.piid }} </td>
							 	<td>{{ item.createTime }}</td>
			                    <td>{{ item.name }}</td>
			                    <td v-text = "item.sex | format " ></td>
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
			                    	<img :src="imgPre +'/'+ item.photoCandidRel " @click="btnViews(item.photoCandidRel)" /> <a :href="imgPre +'/'+ item.photoCandidRel"  download="w3logo"  >下载</a>
			                    </td>
			                   <!--  <td class="not-print">
			                    	<img :src=" imgPre +'/'+ item.photoCertification " @click="btnViews(item.photoCertification)" />
			                    	<a :href="imgPre +'/'+  item.photoCertification" download="img">下载</a>
			                    </td>
			                    <td class="not-print"> <img :src=" imgPre +'/'+ item.photoIdentityCardDealt " @click="btnViews(item.photoIdentityCardDealt )" /> <a :href="imgPre +'/'+  item.photoIdentityCardDealt" download="img" >下载</a></td>
			                    <td class="not-print"> <img :src=" imgPre +'/'+ item.photoAvatarRel "  @click="btnViews(item.photoAvatarRel )"/> <a :href="imgPre +'/'+  item.photoAvatarRel" download="img" >下载</a> </td>
			                    <td class="not-print">
			                    	<img :src=" imgPre +'/'+ item.photoCandidDealtRel "  @click="btnViews(item.photoCandidDealtRel )" />
			                    	<a :href="imgPre +'/'+  item.photoIdentityCardDealt" download="img" >下载</a>
			                    </td>

			                    <td class="not-print"> <img :src=" imgPre +'/'+ item.photoCertificationDealtPreview " @click="btnViews(item.photoCertificationDealtPreview )" /> <a :href="imgPre +'/'+  item.photoCertificationDealtPreview" download="img" >下载</a></td>
			                    <td class="not-print"> <img :src=" imgPre +'/'+ item.photoIdentityCardDealt "  @click="btnViews(item.photoIdentityCardDealt )"/> <a :href="imgPre +'/'+  item.photoIdentityCardDealt" download="img" >下载</a></td> -->
			                    <!--<td><span :title="item.brief" class="not-space">  {{ item.brief }} </span></td>-->
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
			                	<th class="not-print">
			                    	<div class="checkbox">
			                    		<input type="checkbox"  id="title-table-thb" class="checkboxInp" name="title-table-checkbox" @click="checkedStatefn">
			                        	<label for="title-table-thb" class="checkboxLabel"></label>
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
			                    <th class="not-print">生活照</th>
			                    <!-- <th class="not-print">资格证照片</th>
			                    <th class="not-print">身份证照片</th>
			                    <th class="not-print">头像</th>
			                    <th class="not-print">生活照处理</th>
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
			                    		<input type="checkbox" v-model="selectType" :value="item.piid" id="title-table-td{{ item.piid }}" class="checkboxInp" name="title-table-checkbox">
							        	<label for="title-table-td{{ item.piid }}" class="checkboxLabel"></label>
			                    	</div>


			                    	<!-- <div class="checkbox">
		                                <input type="checkbox" class="checkboxInp"  id="dataList-{{$index}}"  name="title-table-checkbox"  @click="selectPerson(item.piid,item)" :checked=" item.checkState? 'checked':''">
		                                <label for="dataList-{{$index}}" class="checkboxLabel"></label>
		                            </div> -->
							    </td>
							    <td> {{ item.piid }} </td>
							 	<td>{{ item.auditTime }}</td>
			                    <td>{{ item.name }}</td>
			                    <td v-text = "item.sex | format " ></td>
			                    <td>{{ item.mobilePhone }}</td>
			                    <td>{{ item.wxAccount }}</td>
								<!-- <td>{{ item.workYears }}</td> -->
			                    <td>{{ item.licenseName }}</td>
								<td>{{ item.caseHours }}</td>
								<td>{{ item.workYears }}</td>
			                    <!--<td>{{ item.location }}</td>-->
			                   <!--  <td :title="item.title">  <span class="not-space"> {{ item.title }} </span></td> -->
			                    <td> <span class="not-space"> {{ item.psychoTags[0].tagName }}</span></td>
			                   <td class="not-print">

			                   		<img :src=" imgPre +'/'+ item.photoCandid " @click="btnViews(item.photoCandid)" /> <a :href="imgPre +'/'+  item.photoCandid" :download="`${item.name}生活照`">下载</a>
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

			                    	<a v-if="item.pictureAudit === 0"  href="javascript:;" @click="routeImg(item.mid)" style="color: red;">待审核</a>


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
			                	<th class="not-print">
			                    	<div class="checkbox">
			                    		<input type="checkbox" id="title-table-thc" class="checkboxInp" name="title-table-checkbox" @click="checkedStatefn">
			                        	<label for="title-table-thc" class="checkboxLabel"></label>
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
			                    <th class="not-print">生活照</th>
			                    <!-- <th class="not-print">资格证照片</th>
			                    <th class="not-print">身份证照片</th>
			                    <th class="not-print">头像</th>
			                    <th class="not-print">生活照处理</th>
			                    <th class="not-print">资格证隐私处理</th>
			                    <th class="not-print">身份证隐私处理</th> -->
			                    <!--<th>简介</th>-->
			                    <th class="not-print">操作</th>
			                </tr>
			            </thead>
			            <tbody>
			            	<tr v-for="item of psychoInfos" v-if="psychoInfos && index == 2 " >
			            		<td class="not-print">
							    	<div class="checkbox">
			                    		<input type="checkbox"  id="title-table-td{{ item.piid }}" class="checkboxInp" name="title-table-checkbox" :checked="checkedState">
							        	<label for="title-table-td{{ item.piid }}" class="checkboxLabel" ></label>
			                    	</div>
							    </td>
							    <td> {{ item.piid }} </td>
							 	<td>{{ item.createTime }}</td>
			                    <td>{{ item.name }}</td>
			                    <td v-text = "item.sex | format " ></td>
			                    <td>{{ item.mobilePhone }}</td>
			                    <td>{{ item.wxAccount }}</td>
								<!-- <td>{{ item.workYears }}</td> -->
			                    <td>{{ item.licenseName }}</td>
								<td>{{ item.caseHours }}</td>
								<td>{{ item.workYears }}</td>
			                    <!--<td>{{ item.location }}</td>-->
			                    <!-- <td :title="item.title"> <span class="not-space"> {{ item.title }} </span></td> -->
			                    <td :title="item.primaryDomains"> <span class="not-space"> {{ item.psychoTags[0].tagName }}</span></td>
			                    <td class="not-print"> <img :src=" imgPre +'/'+ item.photoCandidPreview " @click="btnViews(item.photoCandidPreview)" /> <a :href="imgPre +'/'+  item.photoCandidPreview" download="img">下载</a> </td>

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
			                	<th class="not-print">
			                    	<div class="checkbox">
			                    		<input type="checkbox"  id="title-table-thb" class="checkboxInp" name="title-table-checkbox" @click="checkedStatefn">
			                        	<label for="title-table-thb" class="checkboxLabel"></label>
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
			                    <th class="not-print">生活照</th>
			                    <!-- <th>服务类型</th> -->
			                    <th class="not-print">操作</th>
			                </tr>
			            </thead>
			            <tbody>
			            	<tr v-for="item of waitingForCheckList" v-if="waitingForCheckList && index == 3">
			            		<td class="not-print">
							    	<div class="checkbox">
			                    		<input type="checkbox" v-model="selectType" :value="item.piid" id="title-table-td{{ item.piid }}" class="checkboxInp" name="title-table-checkbox">
							        	<label for="title-table-td{{ item.piid }}" class="checkboxLabel"></label>
			                    	</div>
							    </td>
							    <td> {{ item.piid }} </td>
							 	<td>{{ item.auditTime }}</td>
			                    <td>{{ item.name }}</td>
			                    <td v-text = "item.sex | format " ></td>
			                    <td>{{ item.mobilePhone }}</td>
			                    <td>{{ item.wxAccount }}</td>
								<!-- <td>{{ item.workYears }}</td> -->
			                    <td>{{ item.licenseName }}</td>
								<td>{{ item.caseHours }}</td>
								<td>{{ item.workYears }}</td>
			                    <!--<td>{{ item.location }}</td>-->
			                   <!--  <td :title="item.title">  <span class="not-space"> {{ item.title }} </span></td> -->
			                    <td  > <span class="not-space"> {{ item.psychoTags[0].tagName }}</span></td>
			                   <td class="not-print">

			                   		<img :src=" imgPre +'/'+ item.photoCandid " @click="btnViews(item.photoCandid)" /> <a :href="imgPre +'/'+  item.photoCandid" :download="`${item.name}生活照`">下载</a>
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
	                <zpagenav  :page="pageAnother", :page-size="pageSizeAnother", :total="waitingForCheckNum", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl" ><zpagenav>
	            </div>

	            <div id="test" v-else>
	                <zpagenav  :page="page", :page-size="pageSize", :total="total", :max-link="maxLink" :page-handler="pageHandler" :create-url="createUrl" ><zpagenav>
	            </div>

	            <span class="btn btn-success service-btn" v-if="index === 1" @click="addActivity">添加到活动</span>
	            <span class="btn btn-success" style="margin-right: 15px" v-if="index === 1" @click="modifyType">修改服务类型</span>
	            <a :href="url" download="咨询师入驻.xls" class="btn btn-success" @click="exportHandler">导出excel</a>
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
        <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configDelete()">确定</a> </div>
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
        <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configThrough(1)">通过</a> </div>
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
        <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a>
        <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="configNotThrough(2)">不通过</a> </div>
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
            	imgPre:`http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`,
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
                seachVal: '',
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


                reverseStatus: false,
                reverseName: "",
                reverseType: 0,
                selectType: [],
                modifyTypeStatus: false,
                modifyTypeGlobal: -1,

                typeFilter: "",
                // typeFilter: '',

                // 专家修改生活照和头像后待审核数量
                waitingForCheckNum: 0,
                pageAnother: 0,
                pageSizeAnother:10,

                waitingForCheckList: [],

                selectPersonAll:false,
            	selectPersonList:[],






            }
        },
        // 处理值的传递
        watch: {
            'calendar.value': function(value) {

                this.calendar.items[this.calendar.picker].value = value

                this.calendar.picker == 'picker1' ? this.start = value + ' 00:00:00' : this.end = value + ' 00:00:00'
            },
            page() {
                this.getPsychoInfoList(this.auditStatus)
                    //this.tableFn()
            },
            pageAnother() {
                this.auditMemberPicList()
                    //this.tableFn()
            },
            licenseID(value) {
            	console.log(value)
            	this.getExpertList()
            },
            shanID(value) {
            	this.getExpertList()

            },
            typeFilter(value) {
            	this.getExpertList()
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
            'imgParameter': function(obj) {
                this.imgPath = obj.imgPath
            }
        },
        methods: {
        	modifyType() {
        		console.log(this.selectType)
        		if (! this.selectType.length) {
        			alert("请选择专家")

        			return
        		}

        		this.modifyTypeStatus  = true
        	},
        	async addActivity() {
        		if (! this.selectType.length) {
        			alert("请选择专家")

        			return
        		}


        		const params = {
        			mids: JSON.stringify(this.selectType),
        		}
        		const data = await getResponses("PsychoRecommend/addPsychoRecommend.json", serialize(params))

        		if (data.code === 0) {
        			alert("添加成功")
        		} else {
        			alert(data.msg)
        		}

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
                	//ltid: this.licenseID,
                	//tagId: this.shanID
                }

                this.licenseID && (params.ltid = this.licenseID)
                this.shanID && (params.tagId = this.shanID)

                // this.typeFilter !== -1 && this.typeFilter !== "" && (params.pLevel = this.typeFilter)
                if (this.typeFilter === 0 || this.typeFilter === 1) {
                	params.pLevel = this.typeFilter
                }


                const data = await getResponses("PsychoInfo/V3/searchPsychoInfoList.json", serialize(params))

                this.psychoInfos = data.psychoInfoDTOs



                this.total = data.count

                if (data.auditCounts) {
                	this.waitingForCheckNum = data.auditCounts
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

            tableToExcel: function(tableList, name) {
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
                tables.each(function(i) {
                    var t = $('<table><thead></thead><tbody></tobdy></table>');
                    t.find('thead').html(this.tHead.innerHTML);
                    t.find('tbody').append($(this.tBodies).children(':visible').clone());
                    t.find('tbody tr').each(function() {
                        if (!$(this).find('input:checkbox').is(':checked')) {
                            $(this).addClass('not-print')
                        }
                    })
                    t.find('.not-print').remove(); // not-print 是@media print中不会打印的部分

                    t.find('a').replaceWith(function(i) { // 表格中不再需要的超链接也移除了
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
                this.index = index


                this.auditStatus = index

                this.page = 1

               	this.typeFilter = ""
               	this.licenseID = ""
               	this.shanID = ""
               	this.seachVal = ""

                if (this.index === 3) {
                	this.auditMemberPicList()
                } else {
                	this.getPsychoInfoList(this.index)
                }

                this.checkedState = false

            },



            seach() {

                let params = `auditStatus=${this.auditStatus}&pageIndex=${this.page}&pageSize=${this.maxLink}&words=${this.seachVal}&begin=${this.start}&end=${this.end}`

                this.searchPsychoInfoList(params)
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
                    this.getPsychoInfoList()
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
                	pageSize: this.maxLink
                }
                const data = await getResponses("PsychoInfo/V3/searchPsychoInfoList.json", serialize(params))


                this.psychoInfos = data.psychoInfoDTOs


                this.total = data.count

                if (data.auditCounts) {
                	this.waitingForCheckNum = data.auditCounts
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
                	pageSize: this.maxLink
                }
            	let data = await getResponses("PsychoInfo/V3/auditMemberPicList.json", serialize(params))
            	console.log("待审核：",data)
            	// waitingForCheckNum 数量
            	if (data.code === 0) {
            		this.waitingForCheckNum = data.auditCounts
            		this.waitingForCheckList = data.list

            	} else {
            		alert(data.msg)
            	}
            },

            //单击每个人物
	        selectPerson(piid, item) {

	            console.log(item.checkState);
	            item.checkState = !item.checkState
	            if (item.checkState) {
	                this.selectPersonList.push(piid)
	            } else {
	                this.selectPersonList.shift(piid)
	            }
	            console.log(`selectPerson:${this.selectPersonList}`)
	        },
        },
        ready() {
        	this.getLicenses()
        	this.getShanTags()

            this.getPsychoInfoList(0)
            // this.auditMemberPicList()




        }
    }
</script>