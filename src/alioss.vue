<template>
  <div class="upload">
    <div class="oss_file">
      <input type="file" :id="id" @change="doUpload" />
      <img :src="url" alt="">
    </div>
  </div>
</template>

<script>

// import VueResource from 'vue-resource';
// import editor from "vue-html5-editor"
import {getSource, getSources, getJson} from "./api"
  export default {
    name: 'upload',
    props: ['defaultimg'],
    data () {
      return {
        region: 'oss-cn-hangzhou',
        bucket: 'image-testscale',
        id: 'upload',
        percentage: 0,
        aliOssUrl:'https://image-testscale.oss-cn-hangzhou.aliyuncs.com/',
        url:'',
        urls:[],
        getToken:{
           sign:'',
        }
      }
    },
    methods:{
    async  doUpload () {
        console.log("开始调用了++++++++++++++++++++++");
        const _this = this;
        const urls = [];

        // let response = await fetch('http://localhost:9000/testCenter/aliOssToken/getOssToken', {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     body: ""
        // }).catch((error) => {
        //     console.log(error)
        // })
        // console.log(response+"************************");
        // console.log(response.json());
        // let result = await response.json().catch((error) => {
        //     console.log(error)
        // })
        // console.log(result);


        let result = await getSources("/testCenter/aliOssToken/getOssToken", `id=1`);

        const client = new OSS.Wrapper({
            region: _this.region,
            accessKeyId: result.AccessKeyId,
            accessKeySecret:result.AccessKeySecret,
            stsToken: result.SecurityToken,
            bucket: _this.bucket
          })
         _this.percentage = 0;
          const files = document.getElementById(_this.id)
          if (files.files) {
            const fileLen = document.getElementById(_this.id).files
            let resultUpload = ''
            for (let i = 0; i < fileLen.length; i++) {
                  const file = fileLen[i]
                  // 随机命名
                  let random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()

                  // 上传
                  client.multipartUpload(random_name, file, {
                    progress: function* (percentage, cpt) {
                      // 上传进度
                      _this.percentage = percentage
                    }
                  }).then((results) => {
                      // 上传完成
                      const url = _this.aliOssUrl+ results.name;

                      // _this.$store.dispatch("changeUrl", _this.url);
                      _this.url = url;
                      console.log(_this.url+"^^^^^^^^^^^^^^^^^^^^^^^^");
                      _this.$dispatch('changeRelatePicSrc', results.name);
                   }).catch((err) => {
                     console.log("========================"+err+"===========================")
                   })
               }
            }

        // _this.$post('http://127.0.0.1:9000/testCenter/aliOssToken/getOssToken',_this.getToken).then((result) => {
        //
        //
        //
        //   })




        },

  // 随机生成文件名
  random_string(len)
  { 　　len = len || 32; 　　
   var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 　　
   var maxPos = chars.length; 　　
   var pwd = ''; 　　
   for (let i = 0; i < len; i++) { 　　
     pwd += chars.charAt(Math.floor(Math.random() * maxPos));
   }
   return pwd;
  }
  },
  // watch:{
  // url(val){
  //   if(val){ this.urls.push(val);
  //    }
  //   }
  //  }
  ready() {
      var self = this
      if (this.defaultimg) {
          self.url = `${self.aliOssUrl}${self.defaultimg}`
          console.log(self.url+"++++++++++++++++++");
      }
      this.$watch('defaultimg', function(newVal, oldVal) {
          self.url = `${self.aliOssUrl}${self.defaultimg}`
          console.log(self.url+"------------------");
      })
  }
  }



</script>

<style scope>
  .oss_file {
    height: 120px;
    width: 180px;
    /* border-radius: 50%; */
    /* background: red; */

}
.oss_file img{

  height: 90px;
  width:160px;
   /* margin-top: -20px; */
   /* width:100%; */
   display: inline-block;
   /* float: right; */
}
.oss_file input {
   right: 0;
   top: 0;
   opacity: 1;
   filter: alpha(opacity=1);
   cursor: pointer;
   width: 100%;
   /* height: 100%; */
}
</style>
