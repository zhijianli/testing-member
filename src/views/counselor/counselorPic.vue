<template>
    <div class="eap-identification-default">
        <div class="delete" v-if="picPath">
            <span class="pointer" @click="deletePic">X</span>
        </div>
        <!-- <img :src="EnvUrl+picPath" alt="" v-show="picPath"> -->
        <div v-show="!picPath">
            <svg class="camera">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgcamera"></use>
            </svg>
            <div class="note">
                {{note}}
            </div>
        </div>
        <div class="upload" v-if="!picPath">
            <div class="upload-btn pointer" @click="uploadPic"></div>
            <input type="file" accept="image/*" @change="imageChange" class="dn" :id="picId">
        </div>
    </div>
</template>
<script>
export default {
    props: ['picPath', 'picId', 'note'], // 传入 => 原有图片 ID note 图片介绍
    data() {
        return {
            hasPic: true, // 图片删除  上传图片  
            title: '封面',
            EnvUrl: `http://${process.env.NODE_ENV ? "picture.120xinmao.com/" : "oml9ntix5.qnssl.com/" }`
        }
    },
    components: {

    },
    methods: {
        imageChange(e) {
            let url = window.URL.createObjectURL(e.target.files[0])
            this.$emit('getFile', true, url,this.picId)
        },
        uploadPic() {
            let btn = document.querySelector(`#${this.picId}`)
            btn.click()
        },
        deletePic() {
            this.$emit('setImg', '', this.picId)
        }

    }
}
</script>
<style scoped>
@import url('../../css/expertPic.css');
</style>
