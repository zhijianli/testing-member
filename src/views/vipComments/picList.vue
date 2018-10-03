<template>
    <div>
        <div class="wrap">
            <div class="box">
                <div>
                    <div>
                        <img alt="请上传图片" width="300" height="100" :src="url + id1">
                    </div>
                    <div class="box-bottom">
                        <span>{{ tList[0] }}</span>
                        <span class="item_title_btn" onclick="file0.click()" v-if="! sending0">上传</span>
                        <span class="item_title_btn_sending" v-else>上传中...</span>


                        <input type="file" accept="image/*" @change="readFile" data-type="0" id="file0"
                               style="display: none;">
                    </div>
                </div>

                <div>
                    <div>
                        <img alt="请上传图片" width="300" height="100" :src="url + id2">
                    </div>
                    <div class="box-bottom">
                        <span>{{ tList[1] }}</span>
                        <span class="item_title_btn" onclick="file1.click()" v-if="! sending1">上传</span>
                        <span class="item_title_btn_sending" v-else>上传中...</span>


                        <input type="file" accept="image/*" @change="readFile" data-type="1" id="file1"
                               style="display: none;">
                    </div>
                </div>
            </div>

            <div class="box">
                <div>
                    <div>
                        <img alt="请上传图片" width="300" height="100" :src="url + id3">
                    </div>
                    <div class="box-bottom">
                        <span> {{ tList[2] }} </span>
                        <span class="item_title_btn" onclick="file2.click()" v-if="! sending2">上传</span>
                        <span class="item_title_btn_sending" v-else>上传中...</span>

                        <input type="file" accept="image/*" @change="readFile" data-type="2" id="file2"
                               style="display: none;">
                    </div>
                </div>


                <div>
                    <div>
                        <img alt="请上传图片" width="300" height="100" :src="url + id4">
                    </div>
                    <div class="box-bottom">
                        <span> {{ tList[3] }} </span>
                        <span class="item_title_btn" onclick="file3.click()" v-if="! sending3">上传</span>
                        <span class="item_title_btn_sending" v-else>上传中...</span>

                        <input type="file" accept="image/*" @change="readFile" data-type="3" id="file3"
                               style="display: none;">
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    import Vue from "vue"
    import moment from "moment"

    export default {
        data() {
            return {
                pList: ['', '', '', ''],
                url: `http://${process.env.NODE_ENV == 'production' ? "picture.120xinmao.com/" : "oml9ntix5.qnssl.com/" }`,
                token: '',
                id: '',
                id1: '',
                id2: '',
                id3: '',
                id4: '',
                tList: ['', '', '', ''],
                sending0: false,
                sending1: false,
                sending2: false,
                sending3: false,


            }
        },

        methods: {
            async getToken() {
                let url = `/depression-web/Qiniu/obtainPictureUploadToken.json`

                let response = await fetch(url, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: ""
                }).catch((error) => {
                    console.log(error)
                })

                let data = await response.json().catch((error) => {
                    console.log(error)
                })

                if (data.code === 0) {
                    this.token = data.token
                }
            },

            readFile(e) {
                this.id = +e.target.dataset.type
                const file = e.target.files[0]

                // chrome bug 弹出文件选择框 点取消 依然触发 change 事件
                if (!file) {
                    return
                }

                const {type: types, name} = file

                if (!types.includes("image")) {
                    alert("请选择图片文件")
                    return
                }


                // this.pList[this.id] = window.URL.createObjectURL(file)
                // console.log(this.pList)

                this['sending' + this.id] = true

                this.upload(file, name).then((data) => {
                    Vue.set(this.tList, this.id, moment().format('YYYY-MM-DD HH:mm:ss'))
                    const whichIdStr = 'id' + (this.id + 1)
                    this[whichIdStr] = data.key

                    this['sending' + this.id] = false
                    // this.tList[this.id] = moment().format('YYYY-MM-DD HH:mm:ss')

                })


            },

            async upload(blob, name) {
                name = name.split(" ").join("")
                const formdata = new FormData()
                const nameArray = name.split(".")
                const suffix = nameArray.pop()

                formdata.append("file", blob, "image")
                formdata.append("token", this.token)

                formdata.append('key', `web/${btoa(encodeURIComponent(nameArray.join(".")) + Date.now())}.${suffix}`)

                // const data = await getResponsesFile("http://up.qiniu.com", formdata)
                // this.key = data.key
                // return data

                let response = await fetch("http://up.qiniu.com", {
                    method: "POST",
                    mode: "cors",
                    body: formdata
                }).catch((error) => {
                    console.log(error)
                })

                let data = await response.json().catch((error) => {
                    console.log(error)
                })
                return data
            },


        },

        ready() {
            this.getToken()
        }
    }
</script>

<style scoped>
    .item_title_btn {
        width: 80px;
        height: 28px;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        display: inline-block;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        user-select: none;
    }

    .item_title_btn_sending {
        width: 80px;
        height: 28px;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        display: inline-block;
        line-height: 26px;
        text-align: center;
        user-select: none;
        cursor: not-allowed;
    }

    .item_title_btn:hover {
        background-color: #006dcc;
        color: white;
    }

    .wrap {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        padding-right: 50px;
    }

    .box {


        justify-content: space-between;
        margin-bottom: 20px;

    }

    .box img {
        border: 1px solid;
    }

    .box-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
</style>