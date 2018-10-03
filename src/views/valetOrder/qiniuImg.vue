<template>
    <form enctype="multipart/form-data" v-if="type" style="height: 100px; position: relative;">
        <span style="margin-right:10px">{{name}}</span>
        <input name="key" type="hidden" value="111">
        <input type="hidden" name="imgPath" v-model="info.imgPath">
        <input type="file" class="span11 dn" id="photoAvatar{{eventName}}" @change="change" style="display: none;">
        <a class="btn btn-info" style="margin: 0;" onclick="photoAvatar{{eventName}}.click()" v-if="btnState" style="position: absolute; top: 70px; left: 170px;">上传</a>
        <a class="btn btn-large forbid" style="margin: 0;" v-else style="position: absolute; top: 70px; left: 170px;">上传</a>
    </form>
    <form enctype="multipart/form-data" v-else style="height: 100px; position: relative;">
        <img :src=" curSrc " width="150" height="100" style="display: inline-block;" @click="toseeImg()"/>
        <input type="hidden" name="imgPath" v-model="info.imgPath">
        <input type="file" class="span11 dn" id="photoAvatar{{eventName}}" @change="change" style="display: none;">
        <a class="btn btn-info" onclick="photoAvatar{{eventName}}.click()" v-if="btnState" style="position: absolute; top: 70px; left: 170px;">上传</a>
        <a class="btn btn-large forbid" v-else  style="position: absolute; top: 70px; left: 170px;">上传</a>
    </form>
</template>
<script>
    export default {
        props: ['eventName', 'defaultimg', 'type', "aa", "blob", 'imgStyleObj'],

        data() {
            return {
                info: {},
                curSrc: "",
                btnState: true,
                state: false,
                name: "",
                key: "",
                //url: `http://picture.120xinmao.com`
                // url: `http://${EnvUrl =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`
                // url:`http://oml9ntix5.qnssl.com`
                // url: `http://picture.120xinmao.com`
                url: `http://${process.env.NODE_ENV =='production' ? "picture.120xinmao.com" : "oml9ntix5.qnssl.com" }`
            }
        },
        watch: {
            key: {
                handler: function(info, name) {
                    this.$dispatch('imgParameter', this.info, this.eventName)
                },
                deep: true
            },
            blob() {
                this.changeBlob()
            }
        },
        methods: {
            toseeImg(){
                window.open(this.curSrc)
            },
            changeBlob() {
                this.$file = this.blob
                this.btnState = false
                this.getToken()
                this.info[this.eventName] = {}
            },

            change(e) {
                if (this.aa === 1) {
                    this.$emit("change", e)

                    return
                }

                if (this.aa === 2) {
                    this.$emit("change2", e)

                    return
                }

                let file = e.target.files[0]
                this.$file = file
                this.btnState = false
                this.getToken()
                this.info[this.eventName] = {}

            },
            async getToken() {
                let url = `/depression-web${( !!this.type ? '/Qiniu/obtainFileUploadToken.json' : '/Qiniu/obtainPictureUploadToken.json')}`

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
                    this.$token = data.token
                    this.uploadImg()
                }
            },

            async uploadImg() {
                let formdata = new FormData()
                formdata.append("token", this.$token)
                formdata.append("file", this.$file)
                formdata.append('key', `music_${Date.parse(new Date())}.${this.$file.type.split('/').pop()}`)
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


                if (data.key) {
                    if (this.type) {
                        this.name = data.key
                    }
                    this.key = this.info[this.eventName].imgPath = data.key
                    this.info[this.eventName].filePath = `${this.url}/${this.info[this.eventName].imgPath}`
                    this.curSrc = this.info[this.eventName].filePath
                    this.btnState = true
                }
            }
        },
        ready() {
            var self = this
            if (this.defaultimg) {
                self.curSrc = `${self.url}/${self.defaultimg}`
            }
            this.$watch('defaultimg', function(newVal, oldVal) {
                self.curSrc = `${self.url}/${self.defaultimg}`
            })
            console.log(this.eventName)
        }
    }
</script>