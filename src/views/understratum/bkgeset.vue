<template>

	<div class="container-fluid">
		<div class="widget-box w50">
			<div class="widget-title">
				<span class="icon"> <i class="icon-align-justify" style="line-height: 20px;"></i>
				</span>
				<h5>佣金设置</h5>
			</div>
			<div class="form-horizontal widget-content">
				<div class="control-group" v-for="item in data" v-if="item.type == 1">
					<label class="control-label w150" >倾诉佣金比例 :</label>
					<div class="controls">
						<input type="text" name="Song" v-model="Song"  :disabled = "!startSong" value="{{ item.rate }}">
						<button class="btn btn-info" @click="editSong()">修改</button>
						<button class="btn btn-success" @click="confirmSong(item.rate, item.type,$index)">确定</button>
					</div>
            	</div>


            	<div class="control-group" v-for="item in data" v-if="item.type == 0" >
					<label class="control-label w150">普通佣金比例 :</label>
					<div class="controls">
						<input type="text" name="common" v-model="common"  value="{{ item.rate }}" :disabled = "!startCommon">
			<!-- 			<input type="text" name="common" v-model="common"  value="{{ item.rate }}" disabled v-else> -->
						<button class="btn btn-info" @click="editCommon()">修改</button>
						<button class="btn btn-success" @click="confirmCommon(item.rate, item.type,$index)" >确定</button>
					</div>
            	</div>




            	<div class="control-group">
					<label class="control-label w150">提现申请时间 :</label>
					<div class="controls">
						<input class="input wf170" size="50" name="beginDate" type="text" v-model="beginDate"  value="{{ beginDate }}" placeholder="开始时间" id="beginDate" >
						-
						<input class="input wf170" size="50" name="endDate" type="text" v-model="endDate" value="{{ endDate }}" placeholder="结束时间" id="endDate" >
						<button class="btn btn-success" @click="confirmTime()">确定</button>
					</div>
            	</div>

            </div>
		</div>
	</div>

<!-- start 倾颂佣金比例 -->
<div class="modal-backdrop in" v-if="reset"></div>
<div id="myAlert" class="modal" v-if="reset">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>佣金比例</h3>
    </div>
    <div class="modal-body">
        <p>您确定要修改倾颂佣金比例？</p>
    </div>
    <div class="modal-footer">
	    <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a>
	    <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="butClick(1)">确定</a>
	</div>
</div>
<!-- end 倾颂佣金比例 -->



<!-- start 普通佣金比例 -->
<div class="modal-backdrop in" v-if="ptReset"></div>
<div id="myAlert" class="modal" v-if="ptReset">
    <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button" @click="close()">×</button>
        <h3>佣金比例</h3>
    </div>
    <div class="modal-body">
        <p>您确定要修改普通佣金比例？</p>
    </div>
    <div class="modal-footer">
	    <a data-dismiss="modal" class="btn " href="javascript:;" @click="close()" >取消</a>
	    <a data-dismiss="modal" class="btn btn-danger" href="javascript:;" @click="butClick(0)">确定</a>
	</div>
</div>
<!-- end 普通佣金比例 -->


</template>






<script type="text/javascript">

	import serialize from "../../utils"
	import { getCapitalCommissionRate, editCapitalCommissionRate, getWithdrawDate,editWithdrawDate} from "../../api"
	export default {
        data() {
            return {
	            reset:false,
	            ptReset:false,
                startSong:false,
                startCommon:false,
                Song:'',
                common:'',
                data:[],
                type:'',
                wrdid:'',
                beginDate:'',
                endDate:'',
                list:[]
            }
        },
        watch:{
        	
	    },  
        methods: {
           editSong(){
           		this.startSong =  true
           },
           editCommon(){
           		this.startCommon =  true
           },
           confirmSong(rate, type, index){
           		if(this.Song<=-1 || this.Song >=101){
	        		alert('佣金比例为0-100区间')
	        		return false
	        	}
           		this.reset = true
           },
           confirmCommon(){
           		if(this.common<=-1 || this.common >=101){
	        		alert('佣金比例为0-100区间')
	        		return false
	        	}

           		this.startCommon =  false
           		this.ptReset = true
           },

           confirmTime(){
           		this.editWithdrawDate()
           },

           butClick(type){
           		this.type = type
           		this.editCapitalCommissionRate()
           },

           close(){
           		this.reset = false
           		this.ptReset = false
           },
	        async getDate(){
	        	let data = await getCapitalCommissionRate()
	     		this.data = data.list
	        },

	        async getWithdrawDate(){
	        	let data = await getWithdrawDate()
	        	if(data.list.length > 0){
	        		this.list = data.list
	        		this.wrdid = data.list[0].wrdid
		     		this.beginDate = data.list[0].beginDate
		     		this.endDate = data.list[0].endDate
	        	}
	     		

	        },

	        async editCapitalCommissionRate() {

	        	let params = ( this.type == 1 ? `rate=${this.Song}&type=${this.type}` : `rate=${this.common}&type=${this.type}`)

				let data = await editCapitalCommissionRate(params)
				this.reset = false
				this.ptReset = false
				this.startCommon =  false
				this.startSong =  false
				this.getDate()
	        },
	        async editWithdrawDate(){
	        	if( this.beginDate < 1 || this.beginDate >= this.endDate || this.endDate > 31){
	        		alert('提现申请时间填写不正确')
	        		return false
	        	}
	        	let params =  `beginDate=${this.beginDate}&endDate=${this.endDate}&wrdid=${this.wrdid}`

	        	let data = await editWithdrawDate(params)

	        	this.getDate()
	        }

        },
        ready() {

        	this.getDate()
        	this.getWithdrawDate()
        }

    }

</script>