<template>
	<div class="container-fluid">
        <div class="tab-cont">
            <ul class="tagTit">
                <li :class="{ show: !TabState}" @click="switchFn(false)">佣金设置</li>
                <li :class="{ show: TabState}" @click="switchFn(true)">服务价格设置</li>
            </ul>

            <!-- <keep-alive>
            	<div :is="currentView"></div>
            </keep-alive> -->
        </div>
        <div class="widget-box">
	    	<keep-alive>
	        	<div :is="currentView"></div>
	        </keep-alive>
	    </div>
     </div>
</template>
<script type="text/javascript">
	import Vue from "vue"
	import bkgeset from "./bkgeset"
	import servicePrice from "./servicePrice"
	export default {
		components: {
			bkgeset,
			servicePrice
		},
		data () {
			return {
				TabState:false,
				currentView:"bkgeset"
			}
		},
		methods: {
			switchFn(state) {
	            this.TabState = state
	            console.log(this.TabState)

	            // if(this.TabState) {
	            // 	this.currentView = "servic-price"

	            // } else {
	            // 	this.currentView = "bkgeset"

	            // }
	        }
		},
		watch:{
			"TabState": function() {
				if(this.TabState) {
	            	this.currentView = "service-price"

	            } else {
	            	this.currentView = "bkgeset"

	            }
			} 
		}
	}
	
</script>