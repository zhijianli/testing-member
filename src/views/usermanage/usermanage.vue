<template>

	<div class="container-fluid" v-if="permissions.length">
		<div class="widget-box w50">
			<div class="widget-title">
				<span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i>
				</span>
				<h5>权限设置</h5>
			</div>
			<form class="form-horizontal widget-content">
				<div class="control-group">
					<label class="control-label">账户 :</label>
					<div class="controls">
						<span>{{ mobilePhone }}</span>
					</div>
            	</div>
            	<div class="control-group">
					<label class="control-label">实名 :</label>
					<div class="controls">
						<span>{{ showName }}</span>
					</div>
            	</div>
            	<div class="control-group">
					<label class="control-label">部门 :</label>
					<div class="controls">
						
						<span>{{ depName }}</span>
					</div>
            	</div>
            	<div class="control-group">
					<label class="control-label">权限 :</label>
					<div class="controls">
						<div class="checkbox" v-for="item of permissions">
                    		<input type="checkbox" id="title-table-th{{ item.menuId }}" class="checkboxInp" checked name="title-table-checkbox" value="{{ item.menuId }}" v-if=" item.selected " >
                    		<input type="checkbox" id="title-table-th{{ item.menuId }}" class="checkboxInp" name="title-table-checkbox" value="{{ item.menuId }}"  v-else >
                        	<label for="title-table-th{{ item.menuId }}" class="checkboxLabel"></label>
                        	{{ item.menuName }}
                    	</div>
					</div>
            	</div>
            	<div class="control-group">
					<label class="control-label"></label>
					<div class="controls">
						<a href="javascript:;" class="btn btn-warning" @click="config()">保存</a>
					</div>
            	</div>

            </form>

		</div>
	</div>

</template>

<script type="text/javascript">
    import {permissionsList, updMenuList} from "../../api"

    export default {
        data() {
            return {
               userId:window.location.pathname.split('/')[2],
               permissions:[],
               jsonMenu:[],
               mobilePhone:'',
               depName:'',
               showName:''
            }
        },
        methods: {
            async permissionsList(params){

                let data =  await permissionsList(params)
               this.permissions = JSON.parse(data.jsonMenu)
               this.mobilePhone = data.mobilePhone
               this.depName = data.depName
               this.showName = data.showName


            },

            async updMenuList(params){

                let data =  await updMenuList(params)

                if(data.code == 0){
                    // location.href = "/userlist"
                    this.$route.router.go("/userlist")              
                }
            },


            config(){
            	let params = `userId=${this.userId}&jsonMenu=${JSON.stringify(this.getChecked())}`
            	
            	this.updMenuList(params)
            },
            getChecked(){
            	let array = document.getElementsByTagName('input')
            	let i = 0
            	let json = []
            	for(;i<array.length; i++){
            		json.push({'menuId':array[i].value,"selected":array[i].checked})
            	}

            	return json
            }
        },
        ready(){
            this.permissionsList(`userId=${this.userId}`)

        }
    }
</script>