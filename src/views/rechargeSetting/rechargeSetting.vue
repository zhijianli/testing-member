<template>
    <div class="container-fluid">
        <ul style="padding:50px 100px">
            <li style="margin-top: 20px" v-for="(index,item) in data">
                <span>充值金额{{item.cid}}：</span><input style="margin-bottom: 0px" type="text" v-model="item.amount" :disabled="item.disabled">
                <input
                        type="submit" value="编辑"
                        v-show="item.disShow"
                        class="btn btn-success"
                        @click="edit(item,1)"
                        style="margin-left:30px;margin-right: 88.4px;">
                <input
                        type="submit" v-show="!item.disShow" value="取消" class="btn" @click="cancel(item,1)"
                        style="margin-left:30px;">
                <input
                        type="submit" v-show="!item.disShow" value="保存" class="btn btn-success" @click="save(item,1)"
                        style="margin-left:30px;">
                <span style="margin-left: 50px">赠送金额{{item.cid}}：</span><input style="margin-bottom: 0px" type="text" v-model="item.presentAmount"
                                                                    :disabled="item.disabled2">
                <input
                        type="submit" value="编辑" v-show="item.disShow2" class="btn btn-success" @click="edit(item,2)"
                        style="margin-left:30px;margin-right: 88.4px;">
                <input type="submit" value="取消" v-show="!item.disShow2"
                       class="btn"
                       @click="cancel(item,2)"
                       style="margin-left:30px;">
                <input type="submit"
                       value="保存"
                       v-show="!item.disShow2"
                       class="btn btn-success"
                       @click="save(item,2)"
                       style="margin-left:30px;">
            </li>
        </ul>
        <div style="position: fixed;top:0;right: 0;bottom: 0;left: 0;margin: auto;background: rgba(0,0,0,.6);width: 100%;height: 100%;" v-show="mask">
            <div style="width: 400px;height: 100px;margin: 400px auto;background: #fff;display: flex;justify-content: center;align-items: center;">


                <input type="text" v-model="value">
                <input
                        type="submit"  value="取消" class="btn" @click="cancel()"
                        style="margin-left:30px;">
                <input
                        type="submit"  value="保存" class="btn btn-success" @click="save()"
                        style="margin-left:30px;">
            </div>

        </div>
    </div>


</template>
<script type="text/javascript">

    import Vue from "vue"
    import {getSource, getSources, getJson} from "../../api"

    export default {
        data() {
            return {
                msg: '',
                data: [],
                value:'',
                mask:false,
                type:'',
                master:'',
            }
        },
        methods: {
            serialize(hash) {
                let result = []

                Object.keys(hash).forEach((key) => {
                    result.push(`${key}=${hash[key]}`)
                })

                return result.join("&")
            },
            cancel(){
                this.mask=false;
            },



            edit(a,b) {
                this.mask=true;
                console.log(a,b)
                this.master=a;
                if(b===1){
                    this.value=a.amount;
                    this.type=1;
                }else{
                    this.value=a.presentAmount;
                    this.type=2;
                }
            },


            save(){
                let object={};
                object.cid=this.master.cid;
                if(this.type===1){
                    object.amount=this.value;
                }else{
                    object.presentAmount=this.value;
                }
                let params = this.serialize(object);
                this.update(params);
            },



            async get() {
                let data = await getSource("/depression-web/depression/system/listRechargeConfigurions.json");

                if (data.code == 0) {
                    this.data = data.list;
                    this.data.forEach((item) => {   //checkBox
                        Vue.set(item, "disabled", true);
                        Vue.set(item, "disabled2", true);
                        Vue.set(item, "disShow", true);
                        Vue.set(item, "disShow2", true);
                    })

                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async update(object) {
                let data = await getSources("/depression-web/depression/system/setRechargeConfigurion.json",object);

                if (data.code === 0) {
                    this.mask=false;
                    this.get();


                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

        },

        ready() {
            this.get();
        }
    }
</script>
<style scoped>
    .calendarInputClass {
        background-color: #fff;
        color: #000;
        border: none;
        padding: 4px 10px 5px;
        /* border: 1px solid ; */
        border: 1px solid rgb(169, 169, 169);
        width: 160px;
        margin-bottom: 0;

    }

    .select2-drop-active .select2-results .select2-highlighted {
        background: #446e9b;
    }

    /* .select2-results .select2-highlighted {
        background: #3875d7;
        color: #fff;
    }
     */
    .select2-drop {
        position: absolute;
        z-index: 9999;
        top: 100%;
        background: #fff;
        color: #000;
        border: 1px solid #aaa;
        border-top: 0;
        border-radius: 0 0 4px 4px;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
        box-sizing: border-box;
        /* min-width: 225px !important; */
        width: 184px;
        min-height: 50px;
    }

    .select2-results {
        max-height: 200px;
        padding: 0 0 0 4px;
        margin: 4px 4px 4px 0;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .select2-results li {
        list-style: none;
        display: list-item;
        background-image: none;
    }

    .select2-results li:hover {
        background-color: #446e9b;
        color: #fff;

    }

    .select2-results .select2-result-label {
        padding: 3px 7px 4px;
        margin: 0;
        cursor: pointer;
        min-height: 1em;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .select2-results .user-telphone {
        color: #999;
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
        width: 300px;
        /* height: 420px; */
        background-color: white;
        position: absolute;
        top: 20%;
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
        padding: 5px 6px;
        width: 55px;
        cursor: pointer;
        margin-bottom: 0;
        height: 31px;
    }

    .modal_userList_box_left_span_sel2 {
        width: 60px;
    }

    .telInp {
        border: 1px solid rgb(169, 169, 169);
        margin-bottom: 0;
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
</style>
