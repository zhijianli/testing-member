import Toast from "./toast"

Toast.install = function (Vue) {
	Vue.prototype.$toast = (message, options = {}) => {
		const ToastConstructor = Vue.extend(Toast)
		const instance = new ToastConstructor({
			// data: {
			// 	message,
			// 	... options
			// }
			data: Object.assign({}, {message}, options)
		})

		const dom = instance.$mount().$el
		const toastWrap = document.querySelector(".toast-wrap")

		if (toastWrap) {
			document.body.replaceChild(dom, toastWrap)
		} else {
			document.body.appendChild(dom)
		}
	}
}

export default Toast