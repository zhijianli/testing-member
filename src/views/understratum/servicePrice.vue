<template>
    <div class="container-fluid">
        <div class="widget-box w50">
            <div class="widget-title">
                <span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i>
                </span>
                <h5>服务价格区间设置</h5>
            </div>
            <div class="form-horizontal widget-content">
                <div class="control-group">
                    <label class="control-label w150">专业咨询（元） :</label>
                    <div class="controls">
                        <input class="input wf170" size="50" name="voiceAdvisoryPriceScopeDTO.floor" type="text"
                               v-model="voiceAdvisoryPriceScopeDTO.floor" placeholder="最小金额"> 至
                        <input class="input wf170" size="50" name="voiceAdvisoryPriceScopeDTO.ceiling" type="text"
                               v-model="voiceAdvisoryPriceScopeDTO.ceiling" placeholder="最大金额">
                        <button class="btn btn-success"
                                @click="configFn('consulting', voiceAdvisoryPriceScopeDTO.sgpsId )">修改
                        </button>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label w150">轻咨询（元） :</label>
                    <div class="controls">
                        <input class="input wf170" size="50" name="voiceListenPriceScopeDTO.floor" type="text"
                               v-model="voiceListenPriceScopeDTO.floor" placeholder="最小金额"> 至
                        <input class="input wf170" size="50" name="voiceListenPriceScopeDTO.ceiling" type="text"
                               v-model="voiceListenPriceScopeDTO.ceiling" placeholder="最大金额">
                        <button class="btn btn-success" @click="configFn('pouring', voiceListenPriceScopeDTO.sgpsId)">
                            修改
                        </button>
                    </div>
                </div>
            </div>

            <div class="form-horizontal widget-content">
                专业咨询
                <div class="control-group" v-for="item in priceData0">
                    <div class="controls testClass">
                        <input type="text" :disabled="true" value="{{item.price}}">
                        <button class="btn btn-info" @click="changePriceFn($event,$index,item.sgpId)">编辑</button>

                        <button class="btn btn-danger" @click="delPriceFn(item.sgpId)">删除</button>
                    </div>
                </div>
            </div>

            <div class="form-horizontal widget-content">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" v-model="addNewPrice0">
                        <button class="btn btn-success" @click="addNewPriceFn0()">添加</button>
                    </div>
                </div>
            </div>

            <div class="form-horizontal widget-content">
                轻咨询
                <div class="control-group" v-for="item in priceData1">
                    <div class="controls lightClass">
                        <input type="text" :disabled="true" value="{{item.price}}">
                        <button class="btn btn-info" @click="changePriceFn1($event,$index,item.sgpId)">编辑</button>

                        <button class="btn btn-danger" @click="delPriceFn(item.sgpId)">删除</button>
                    </div>
                </div>
            </div>

            <div class="form-horizontal widget-content">
                <div class="control-group">
                    <div class="controls">
                        <input type="text" v-model="addNewPrice1">
                        <button class="btn btn-success" @click="addNewPriceFn1()">添加</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- start 普通佣金比例 -->
    <div class="modal-backdrop in" v-if="config"></div>
    <div id="myAlert" class="modal" v-if="config">
        <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
            <h3>提示</h3>
        </div>
        <div class="modal-body">
            <p>{{ textCont }}</p>
        </div>
        <div class="modal-footer">
            <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()">取消</a>
            <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="butClick()">确定</a>
        </div>
    </div>
    <!-- end 普通佣金比例 -->
</template>
<script type="text/javascript">
    import $  from "jquery"
    import Vue from "vue"
    import {
        obtainPriceScope,
        modifyPriceScope,
        getResponse,
        getResponses,
    } from "../../api"
    export default {
        data() {
            return {
                minConsulting: "",
                maxConsulting: "",
                minPouring: "",
                maxPouring: "",
                textCont: "",
                config: false,
                voiceAdvisoryPriceScopeDTO: {
                    floor: 0,
                    ceiling: 0
                },
                voiceListenPriceScopeDTO: {
                    floor: 0,
                    ceiling: 0
                },
                sgpsId: "",
                data: [],
                checkState: false,
                default: '',
                searchVal: '',
                add: '',
                edit: '',
                idelete: '',
                typeName: '',
                editTypeName: '',
                typeId: '',
                arrayTypeId: [],
                articleData: [],
                addNewPrice0: "",
                addNewPrice1: "",
                editTag: false,
                newArticleType: "",
                priceData0: [],// start
                priceData1: [],// start
                sgpId: "",
                price: "",
                pLevel: ""
            }
        },

        methods: {

            configFn(type, sgpsId) {
                this.textCont = type === "consulting" ? "你确定修改专业咨询价格？" : "你确定修改轻咨询价格？"
                this.sgpsId = sgpsId
                if (this.sgpsId === 1) {
                    if (this.voiceListenPriceScopeDTO['ceiling'] <= this.voiceListenPriceScopeDTO['floor']) {
                        alert("轻咨询的最高金额不能小于或等于最低金额")
                        return false
                    }
                } else {

                    if (this.voiceAdvisoryPriceScopeDTO['ceiling'] <= this.voiceAdvisoryPriceScopeDTO['floor']) {
                        alert("专业咨询的最高金额不能小于或等于最低金额")
                        return false
                    }
                }
                this.config = true
            },

            close() {
                this.config = false
            },

            butClick() {

                this.config = false


                let params = ''

                if (!this.sgpsId) return

                if (this.sgpsId === 1) {

                    params = `ceiling=${this.voiceListenPriceScopeDTO['ceiling']}&floor=${this.voiceListenPriceScopeDTO['floor']}&sgpsId=${this.sgpsId}`
                } else {

                    params = `ceiling=${this.voiceAdvisoryPriceScopeDTO['ceiling']}&floor=${this.voiceAdvisoryPriceScopeDTO['floor']}&sgpsId=${this.sgpsId}`
                }

                this.modifyPriceScope(params)
            },

            async obtainPriceScope() {
                let data = await obtainPriceScope()
                if (data.code === 0) {
                    this.voiceAdvisoryPriceScopeDTO = data.voiceAdvisoryPriceScopeDTO
                    this.voiceListenPriceScopeDTO = data.voiceListenPriceScopeDTO
                }
            },

            async modifyPriceScope(params) {
                let data = await modifyPriceScope(params)
                if (data.code === 0) {
                    alert('修改成功')
                    this.config = false
                }
            },

            async obtainPrice(params) {
                let data = await getResponses("ServiceGoods/obtainServiceGoodsPrice.json", `pLevel=${params}`)
                console.log(data)
                if (data.code === 0) {
                    if (params == 0) {
                        this.priceData0 = data.list
                    } else if (params === 1) {
                        this.priceData1 = data.list
                    }
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async addNewPriceFn0(){
                console.log(this.addNewPrice0)
                if(this.addNewPrice0 == ""){
                    alert('价格不能为空');
                    return
                }
                //添加新类型到数据库
                let data = await getResponses("ServiceGoods/addServiceGoodsPrice.json", `price=${this.addNewPrice0}&pLevel=0`)
                console.log(data);
                if (data.code == 0) {
                    this.obtainPrice(0);
                    this.addNewPrice0 = ""
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async addNewPriceFn1(){
                console.log(this.addNewPrice1);
                if(this.addNewPrice1 == ""){
                    alert('价格不能为空');
                    return
                }
                //添加新类型到数据库
                let data = await getResponses("ServiceGoods/addServiceGoodsPrice.json", `price=${this.addNewPrice1}&pLevel=1`)
                if (data.code === 0) {
                    this.obtainPrice(1);
                    this.addNewPrice1 = ""
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async delPriceFn(id){
                this.sgpId = id
                console.log("将要删除的id为：", id)
                //删除此项
                let data = await getResponses("ServiceGoods/deleteServiceGoodsPrice.json", `sgpId=${this.sgpId}`)
                if (data.code == 0) {
                    this.obtainPrice(0)
                    this.obtainPrice(1)

                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async changePriceFn(e, index, sgpId) {
                console.log(e.target.innerHTML)
                if (e.target.innerHTML == "编辑") {
                    e.target.innerHTML = "保存"
                    $(e.target).removeClass("btn-info")
                    $(e.target).addClass("btn-success")
                    $($(".testClass")[index]).find("input").attr("disabled", false)
                    this.price = $($(".testClass")[index]).find("input")[0].value
                } else {
                    //点击保存
                    this.price = $($(".testClass")[index]).find("input")[0].value
                    //调用后台接口添加数据
                    this.sgpId = sgpId
                    let data = await getResponses("ServiceGoods/updateServiceGoodsPrice.json", `sgpId=${this.sgpId}&price=${this.price}&pLevel=0`)
                    if (data.code == 0) {
                        this.obtainPrice(0)
//                        this.obtainPrice(1)
                    } else {
                        alert(`errMsg:${data.msg}`)
                    }
                    e.target.innerHTML = "编辑"
                    $(e.target).removeClass("btn-success")
                    $(e.target).addClass("btn-info")
                    $($(".testClass")[index]).find("input").attr("disabled", true)
                }
            },

            async changePriceFn1(e, index, sgpId) {
                console.log(e.target.innerHTML)
                if (e.target.innerHTML == "编辑") {
                    e.target.innerHTML = "保存"
                    $(e.target).removeClass("btn-info")
                    $(e.target).addClass("btn-success")
                    $($(".lightClass")[index]).find("input").attr("disabled", false)
                    this.price = $($(".lightClass")[index]).find("input")[0].value
                } else {
                    //点击保存
                    this.price = $($(".lightClass")[index]).find("input")[0].value
                    //调用后台接口添加数据
                    this.sgpId = sgpId
                    let data = await getResponses("ServiceGoods/updateServiceGoodsPrice.json", `sgpId=${this.sgpId}&price=${this.price}&pLevel=1`)
                    if (data.code == 0) {
//                        this.obtainPrice(0)
                        this.obtainPrice(1)
                    } else {
                        alert(`errMsg:${data.msg}`)
                    }
                    e.target.innerHTML = "编辑"
                    $(e.target).removeClass("btn-success")
                    $(e.target).addClass("btn-info")
                    $($(".lightClass")[index]).find("input").attr("disabled", true)
                }
            }

        },

        ready() {
            this.obtainPriceScope();
            this.obtainPrice(0);
            this.obtainPrice(1);
        }
    }
</script>
