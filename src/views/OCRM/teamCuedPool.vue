<style scoped>
    .allot {
        width: 140px;
        height: 40px;
        border-radius: 4px;
        background: #169BD5;
        color: #fff;
        font-size: 14px;
        padding: 4px 20px;
        text-align: center;
        margin: 50px 0;
        cursor: pointer;
    }

    .floor2 {
        display: flex;
    }

    .allotResult {
        margin-right: 50px;
    }

    .allotResult ul {
        margin-bottom: 20px;
        margin-top: 45px;
    }

    .allotResult ul li {
        display: flex;
        margin-bottom: 15px;

    }

    .allotResult ul span {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #666;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .allotResult ul li i {
        width: 110px;

    }

    .allotResult ul li div {
        width: 100px;
        text-align: center;
    }

    .sure {
        width: 140px;
        height: 40px;
        border-radius: 4px;
        background: #169BD5;
        color: #fff;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        cursor: pointer;

    }
</style>
<template>
    <div class="container-fluid">
        <div class="allot" v-if="n12" @click="allot">按销售目标比例分配到助理</div>
        <div class="floor2">
            <div class="allotResult">
                分配结果：
                <ul>
                    <li v-for="(index,item) in list">
                        <i>{{item.nickname}}</i>
                        <span v-if="n24"
                            @click="reduce(item.crmClueNum,index)">-</span>
                        <div>{{item.crmClueNum}}</div>
                        <span v-if="n23" @click="add(item.crmClueNum,index)">+</span>
                    </li>
                </ul>
                剩余{{surplus}}条线索
                <div class="sure" v-if="n18" @click="sure">确认分配</div>

            </div>
            <div class="yesterdayAchievement">
                昨日业绩：
                <table class="table table-bordered table-striped" id="DataTables_Table_0">
                    <thead>
                    <tr>
                        <th>本月目标（万元）</th>
                        <th>目标占比</th>
                        <th>累计至昨日销售总额(元)</th>
                        <th>目标完成率</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in list">
                        <td>{{item.targetData}}</td>
                        <td>{{ item.targetOccupationRatio }}%</td>
                        <td>{{ item.salesVolume }}</td>
                        <td>{{ item.targetCompletionRate }}%</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>
<script type="text/javascript">

    import Vue from "vue"
    import {getSource, getSources, getJson, getCourse} from "../../api"

    export default {
        data() {
            return {
                msg: '',
                data: [],
                value: '',
                mask: false,
                type: '',
                master: '',
                list: [],
                surplus: 0,

                n12:false,

                n18:false,

                n23:false,

                n24:false,
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
            cancel() {
                this.mask = false;
            },
            allot() {
                this.get()
                this.surplus=0
            },
            sure() {
                let object = `{"userId":${sessionStorage.userId},`;

                this.list.forEach((v, i) => {
                    object = `${object}"${v.caid}":${v.crmClueNum},`

//                    object.a=v.crmClueNum
                })
                object = object.substr(0, object.length - 1);
                object = `${object}}`

                console.log(object)

                if(this.surplus==0){
                    this.distributionClueToTeam(object)
                }else{
                    alert('请您分配完所有线索')
                }
//                let n = JSON.stringify(object)

            },
            add(n, i) {
//                console.log(this.surplus)

                if (this.surplus > 0) {
                    this.list[i].crmClueNum = n + 1;
                    this.surplus--;
                }
            },
            reduce(n, i) {
                if (this.surplus >= 0 && n > 0) {
                    this.list[i].crmClueNum = n - 1;
                    this.surplus++;
                }
            },
            edit(a, b) {
                this.mask = true;
                console.log(a, b)
                this.master = a;
                if (b === 1) {
                    this.value = a.amount;
                    this.type = 1;
                } else {
                    this.value = a.presentAmount;
                    this.type = 2;
                }
            },


            save() {
                let object = {};
                object.cid = this.master.cid;
                if (this.type === 1) {
                    object.amount = this.value;
                } else {
                    object.presentAmount = this.value;
                }
                let params = this.serialize(object);
                this.update(params);
            },

            async distributionClueToTeam(params) {
                let data = await getJson("/depression-web/crm/clue/distributionClueToCa", params);
                if (data.code == 0) {
                    alert('分配成功')
                    this.get();
//                    this.list = data.ccatList;
//                    this.data.forEach((item) => {   //checkBox
//                        Vue.set(item, "disabled", true);
//                        Vue.set(item, "disabled2", true);
//                        Vue.set(item, "disShow", true);
//                        Vue.set(item, "disShow2", true);
//                    })
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },

            async get() {
                let data = await getCourse("crm/consultAssistantTeam/getCaTargetAndSalesVolumeList", `userId=${sessionStorage.userId}`);

                if (data.code == 0) {
                    this.list = data.caList;
//                    this.data.forEach((item) => {   //checkBox
//                        Vue.set(item, "disabled", true);
//                        Vue.set(item, "disabled2", true);
//                        Vue.set(item, "disShow", true);
//                        Vue.set(item, "disShow2", true);
//                    })
                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async update(object) {
                let data = await getSources("/depression-web/depression/system/setRechargeConfigurion.json", object);

                if (data.code === 0) {
                    this.mask = false;
                    this.get();


                } else {
                    alert(`errMsg:${data.msg}`)
                }
            },
            async getPower(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("systemPermission/getOperationPermission.json", `menuId=${this.$route.path.split('?')[1]}&userId=${sessionStorage.userId}`);
                if (data.code === 0) {
                    data.permissionIdList.forEach(v=>{
                        if(v==12){
                            this.n12=true;
                        }else if(v==18){
                            this.n18=true;
                        }else if(v==23){
                            this.n23=true;
                        }else if(v==24){
                            this.n24=true;
                        }

                    })
                    this.get();
                } else {
                    alert(`${data.error}`)
                }

            },

        },

        ready() {
            document.title = "线索管理-线索池";
//            this.get();
            this.getPower();
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
