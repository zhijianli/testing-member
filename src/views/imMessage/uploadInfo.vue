<template>
        <div class="form-horizontal">
            <h1>account:{{account}}</h1>
            <div class="control-group">
                <label class="control-label">上传半身照</label>
                <div class="controls">
                    头像：
                    <form  enctype="multipart/form-data" name="body">
                        <img :src="info.avatar" style="width:150px;height:150px;border-radius: 50%;cursor: pointer;"/>
                        <input type="file"  class="span11 dn"  id="candidPhoto" @change="candidPhotoFun">
                        <a class="btn btn-info" onclick="candidPhoto.click()" >上传</a>
                    </form>
                </div>
            </div>


            <div class="control-group">
                <label class="control-label"> 姓名 :</label>
                <div class="controls">
                    <input type="text" class="span11" placeholder="必填" v-model.trim="info.nick">
                </div>
            </div> 

            <div class="control-group">
                <label class="control-label"> 签名 :</label>
                <div class="controls">
                    <input type="text" class="span11" placeholder="微信号" v-model.trim="info.sign">
                </div>
            </div>

            <div class="control-group">
                <label class="control-label"> 性别 :</label>
                <div class="controls">
                    <input type="text" class="span11" placeholder="性别" v-model.trim="info.gender" >
                </div>
            </div>

            <div class="control-group">
                <label class="control-label"> 生日 :</label>
                <div class="controls">
                    <input type="text" class="span11" placeholder="微信号" v-model.trim="info.birth">
                </div>
            </div>                    
            
            <div class="control-group">
                <label class="control-label"> 手机 :</label>
                <div class="controls">
                    <input type="text" class="span11" placeholder="微信号" v-model.trim="info.tel">
                </div>
            </div>

            <div class="control-group">
                <label class="control-label"> 邮箱 :</label>
                <div class="controls">
                    <input type="text" class="span11" placeholder="微信号" v-model.trim="info.email">
                </div>
            </div>    

            <div class="control-group">
                <label class="control-label"> 拓展字段 :</label>
                <div class="controls">
                    <input type="text" class="span11" placeholder="微信号" v-model.trim="info.custom">
                </div>
            </div>                    
            
            

            <div class="form-actions" style="text-align: center;">
                <div class="myBtn" @click="updateUser">保存</div>
            </div>

        </div>

</template>
<script>
      export default {
            props: ['account'],
			data(){
				return{
					info:{
       
                    }
				}
			},
			watch:{
				
			},
			methods:{  // 
				getUser(){

                    let _this = this 

                    nim.getUser({
                        account: '13221033190',
                        done: getUserDone
                    });
                    function getUserDone(error, user) {
                        console.log(error);
                        console.log(user);
                        console.log('获取用户名片' + (!error?'成功':'失败'));
                        if (!error) {
                            // alert(JSON.stringify(user))
                            console.log(JSON.stringify(user))
                            _this.info = user
                        }
                    }
				},
                updateUser(){
                    let _this = this

                    nim.updateMyInfo({
                        nick:  _this.info.nick, // 'newNick',
                        avatar:  _this.info.avatar, // 'http://newAvatar',
                        sign:  _this.info.sign, // 'newSign',
                        gender:  _this.info.gender, // 'male',
                        email:  _this.info.email, // 'new@email.com',
                        birth:  _this.info.birth, // '1900-01-01',
                        tel:  _this.info.tel, // '13523578129',
                        custom:  _this.info.custom, // '{type: "newCustom", value: "new"}',
                        done: updateMyInfoDone
                    });
                    function updateMyInfoDone(error, user) {
                        console.log('更新我的名片' + (!error?'成功':'失败'));
                        console.log(error);
                        console.log(user);
                        if (!error) {
                            onUpdateMyInfo(user);
                        }
                    }
                },
                candidPhotoFun(){
                    
                }
			},
			ready(){
				this.getUser()
			}
      }
</script>
<style scope>

</style>