<template>
	<div class="container-fluid">
        <div class="tab-cont">
            <ul class="tagTit">
                <li :class="{ show: !TabState}" @click="switchFn(false)">渠道设置</li>
                <li :class="{ show: TabState}" @click="switchFn(true)">收款设置</li>
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
	import channelSet from "./channelSet"
	import gatheringSet from "./gatheringSet"
	export default {
		components: {
			channelSet,
			gatheringSet
		},
		data () {
			return {
				TabState:false,
				currentView:"channelSet"
			}
		},
		methods: {
			switchFn(state) {
	            this.TabState = state
	            console.log(this.TabState)

	            // if(this.TabState) {
	            // 	this.currentView = "servic-price"

	            // } else {
	            // 	this.currentView = "channelSet"

	            // }
	        }
		},
		watch:{
			"TabState": function() {
				if(this.TabState) {
	            	this.currentView = "gatheringSet"

	            } else {
	            	this.currentView = "channelSet"

	            }
			} 
		}
	}
	
</script>