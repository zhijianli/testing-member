<template>
    <div>
        <!------------------------------------------------------------------- 预约服务 --------------------------------------->
        <div class="modal_userList_cover" v-if="clickToValet">
            <div class="modal_userList_Wrap" style="top: 0px; left: 20px; transform: translate(0, 0);">
                <div class="modal_userList_Wrap_title">
                    预约服务
                </div>
                <ul>
                    <li>
                        <span class="modal_userList_box_left_span">用户手机号</span>
                        <span class="modal_userList_box_right_span">{{ form2.consumerMobilePhone }}</span>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">用户姓名</span>
                        <span class="modal_userList_box_right_span">
                            <template v-if="isTelExists">
                                {{ telExistsUsername }}
                            </template>
                            <template v-else>
                                {{ form2.userName }}
                            </template>

                        </span>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">客户来源</span>
                        <span class="modal_userList_box_right_span">{{ platformChannelStr }}</span>

                    </li>
                    <li class="modal_userList_Wrap_slecte_expert">
                        <span class="modal_userList_box_left_span">服务专家</span>
                        <span class="modal_userList_box_right_span">{{ chooseExpertName }}</span>
                    </li>

                    <li v-if="wrongTel.status || expertsName.status">
                        <span class="modal_userList_box_left_span"></span>
                        <span class="modal_userList_box_left_span_text2"
                              v-text="'您选择的专家为：' + chooseExpertName"></span>

                    </li>

                    <li style="border-top: 1px solid green;">
                        <span class="modal_userList_box_left_span">服务时间</span>
                    </li>

                    <li style="border-bottom: 1px solid green;">
                        <div class="model_bes_box">
                            <input type="radio" id="one" :value="1" v-model="bespeakType"> <label for="one">选择专家已设置时间</label>
                            <!--<input type="radio" id="two" :value="0" v-model="bespeakType"> <label for="two">选择期望的时间，提醒专家设置</label>-->
                            <!--专家已设置预约时间段展示-->

                            <ul class="model_bes_tl">
                                <template v-if="arrangeDateList.length">
                                    <template v-for="(index, item) in arrangeDateList">
                                        <li v-if="arrangeDateList.length && item.dataValue.length" :key="index">
                                            <div>
                                                {{ item.arrangeDate.split(' ')[0].split('-')[1] }}-{{ item.arrangeDate.split(' ')[0].split('-')[2] }}
                                                {{ item.weekDay | weekDayStateListFilter }}
                                            </div>
                                            <div class="model_bes_tl_b">
                                                <template v-for="(indexInside, v) in item.dataValue" :key="indexInside" >

                                                    <template v-if="item.pickDateValue.indexOf(v) !== -1">
                                                        <div class="model_bes_tl_sb model_bes_tl_n">
                                                            <p>{{ v + ":00" }}</p>
                                                            <p class="model_bes_p">已约</p>
                                                        </div>
                                                    </template>


                                                    <template v-else>
                                                        <template v-if="chooseList.arrangeDate === item.arrangeDate && chooseList.v === v">
                                                            <div class="model_bes_tl_sb model_bes_tl_y model_bes_tl_choose" @click="toChooseBespeakTimeFn(item.arrangeDate, v, 1)">
                                                                <p>{{ v + ":00" }}</p>
                                                                <p class="model_bes_p">可约</p>
                                                            </div>
                                                        </template>

                                                        <template v-else>
                                                            <div class="model_bes_tl_sb model_bes_tl_y" @click="toChooseBespeakTimeFn(item.arrangeDate, v, 2)">
                                                                <p>{{ v + ":00" }}</p>
                                                                <p class="model_bes_p">可约</p>
                                                            </div>
                                                        </template>

                                                    </template>

                                                </template>



                                            </div>
                                        </li>

                                    </template>
                                </template>
                                <template v-else>
                                    <li>
                                        <div style="color: red;">
                                            该专家未设置任何预约时间，请与专家沟通，让他/她设置可预约的时间。
                                        </div>
                                    </li>
                                </template>


                            </ul>

                            <template v-if="bespeakType === 0">

                                <div class="mode_bes_send">
                                    <input type="button" value="发送申请" id="ajaxBut" class="btn btn-success" @click="expectationByUser">
                                </div>
                            </template>


                            <div class="model_em_box" v-if="bespeakType === 1">
                                <ul>
                                    <li class="model_em_box_li">
                                        <span>性别：</span>
                                        <select v-model="customerSex">
                                            <option :value="1">男</option>
                                            <option :value="2">女</option>
                                        </select>
                                    </li>

                                    <li class="model_em_box_li">
                                        <span>年龄：</span>
                                        <input type="text" data-key="customerAge" v-model="customerAge" @keyup="inputChange">
                                    </li>

                                    <li class="model_em_box_li">
                                        <span>问题描述：</span>
                                        <textarea v-model="consultContent"></textarea>
                                    </li>
                                </ul>
                            </div>



                        </div>
                    </li>

                    <li>
                        <span class="modal_userList_box_left_span">服务价格</span>
                        <span class="modal_userList_box_right_span">{{ form2.price}}元/{{ form2.duration}}分钟</span>
                    </li>
                    <li>
                        <span class="modal_userList_box_left_span">预约客服</span>
                        <span class="modal_userList_box_right_span">{{ serviceName }}</span>
                    </li>
                </ul>

                <div class="modal_userList_Wrap_bottom">
                    <span class="modal_userList_Wrap_bottom_leftBtn" @click="cancelValetFn">取消</span>
                    <template v-if="bespeakType === 1">
                        <span class="modal_userList_Wrap_bottom_rightBtn"
                              v-if="!sending"
                              @click="sureToValetFn">确认预约</span>

                        <span class="modal_userList_Wrap_bottom_rightBtn"
                              v-else
                        >预约中。。。</span>
                    </template>

                </div>
            </div>
        </div>
    </div>
</template>