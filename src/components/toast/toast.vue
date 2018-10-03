<style>
.toast-wrap {
	display: flex;
	width: 500px;
	position: fixed;
	bottom: 20%;
	z-index: 7;
	pointer-events: none;
	transition: all 0.3s;
	height: 500px;
}
.toast {
	max-width: 70%;
	padding: .2rem .2rem;
	margin: auto;
	color: #FFF;
	text-align: center;
	border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.5);
}
.toast-enter, .toast-leave-active {
	opacity: 0;
	transform: scale(1.1);
}
</style>

<template>
	<!-- <transition name="toast">
		<div class="toast-wrap" v-if="isVisible">
			<div class="toast" v-text="message"></div>
		</div>
	</transition> -->
	<!-- <div transition="toast"> -->
		<div transition="toast" class="toast-wrap" v-if="isVisible">
			<div class="toast" v-text="message"></div>
		</div>
	<!-- </div> -->
</template>

<script>
	export default {
		data() {
			return {
				isVisible: false,
				message: "",
				duration: 2000
			}
		},
		mounted() {
			this.isVisible = true
			console.log("111")
			this.startTimer()
		},
		methods: {
			startTimer() {
				setTimeout(() => {

					this.hiddenToast()
				}, this.duration)
			},
			hiddenToast() {

				this.isVisible = false
			}
		}
	}
</script>