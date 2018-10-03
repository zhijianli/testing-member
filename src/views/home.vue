<template>
<style type="text/css">
#content{
	background-color: #2E363F
}
</style>
<div class="login-box">
	<div class="login-item-logo">
		<!-- <img src="https://static.120xinmao.com/protocol/image/xinmao-logo.png" alt="心猫logo" class="xm-logo-box"> -->
		<p>心理测试后台管理系统</p>
	</div>


	<div class="login-item"></div>
	<div class="login-item">
		<span>
			<i></i>
		</span>
		<input type="text" placeholder="手机号" v-model="phone">
	</div>
	<div class="login-item">
		<span>
			<i></i>
		</span>
		<input type="password" placeholder="密码" v-model="password" >
	</div>
	<!-- <div class="login-item">
		<span>
			<i></i>
		</span>
		<input type="text" placeholder="验证码" v-model="code" @keyup.enter="login">
		<a href="javascript:;" @click="getCode">获取验证码</a>
	</div> -->

	<div class="login-item">
		<div class="login-item-rem">
			<input type="checkbox" id="title-table-th" class="checkboxInp" @click="inputCheckStateChangeFn">
			<label for="title-table-th" class="checkboxLabel"></label>
			7日内自动保存账号密码
		</div>

	</div>
</div>
<a href="javascript:;" class="login-btn" @click="login()" v-if="! isSending">登录</a>
	<a href="javascript:;" class="login-btn" style="cursor: not-allowed;" v-else>登录中。。。</a>

</template>




<script type="text/javascript">
	import Vue from "vue"
	import { getSmsAuthCode, Userlogin,getCourse} from "../api"
    export default {
        data() {
            return {
				phone: "",
				password: "",
				code: "",
                checkState: false,
				isSending: false,

            }
        },
        methods: {
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                console.info(cname + "=" + cvalue + "; " + expires);
                document.cookie = cname + "=" + cvalue + "; " + expires;
                console.info(document.cookie);
            },
            inputCheckStateChangeFn(e) {
                this.checkState = e.target.checked
			},
           	serialize(hash) {
	 			let result = []

				Object.keys(hash).forEach((key) => {
					result.push(`${key}=${hash[key]}`)
				})

				return result.join("&")
	 		},
	 		getCode() {

	 			let paramsObj = {
	 				mobilePhone: this.phone
	 			}

	 			let params = this.serialize(paramsObj)

	 			this.getSmsAuthCode(params)
	 		},
	 		login() {

				if (this.phone == '15167365141' && !this.code && process.env.NODE_ENV == 'test') {
                    this.code = '892836'
				}

				// if (!this.code) {
    //                 alert("请输入验证码")
				// 	return
				// }

	 			let paramsObj = {
	 				mobilePhone: this.phone,
	 				userPsw: this.password,
	 				code: this.code
	 			}


	 			let params = this.serialize(paramsObj)

	 			this.Userlogin(params)
	 		},

	 		async getSmsAuthCode(params){

                let data =  await getSmsAuthCode(params)

                if(data.code == 0){

                }else{
                	alert(data.error)
                }
            },
            async Userlogin(params){
                this.isSending = true
                let data =  await Userlogin(params)

				if (data.myErrorCode === 500) {
                    alert(data.myErrorMsg)
                    this.isSending = false
					return
				}

                if (data.code === 0) {

                    console.log(data)
                    this.setCookie('userId',data.userId)
//					window.cookie.userId=data.userId
                	window.sessionStorage.userId = data.userId
                	window.sessionStorage.username = data.username
					window.sessionStorage.userphone = this.phone
					window.sessionStorage.unreadNumber = 0

                    // 若勾选七天免登录，则存储cookie
                    if (this.checkState) {
                        let now = new Date();
                        now.setDate(now.getDate() + 7)
                        // let expires =
                        document.cookie = `mobilePhone=${this.phone}; expires=${now}`
						document.cookie = `password=${this.password}; expires=${now}`
                    }

                    this.getUserInfo(data.userId);
				}else{
					alert(data.error)
				}

				this.isSending = false
            },
            async getUserInfo(params) {
//                let data = await getCourse("curriculum/selectCurriculum.json", `pageIndex=${this.page}&pageSize=${this.pageSize}`);
                let data = await getCourse("systemPermission/userPermissionList.json", `userId=${params}`);
                if (data.code === 0) {
                    window.sessionStorage.userInfo=JSON.stringify(data)
                     location.href = "/welcome"
                } else {
                    alert(`${data.error}`)
                }

            },

        //    查找是否存的有cookie
            getCookie(key) {
                let cookieStr = document.cookie.split("; ");
                for (let i = 0; i < cookieStr.length; i++ ) {
                    let tempArr = cookieStr[i].split("=")
                    if (tempArr[0] == key) {
                        return tempArr[1]
                    }
                }
                return null

            }

        },
        ready(){
            if (/Chrome/.test(window.navigator.userAgent)) {
                sessionStorage.clear()
                if (this.getCookie("mobilePhone") && this.getCookie("password")) {
                    this.phone = this.getCookie("mobilePhone")
                    this.password = this.getCookie("password")
                } else {
                    console.log("wu")
                }
			} else {
                alert("请使用谷歌浏览器！否则部分功能可能失效")
			}



        }
    }

</script>
