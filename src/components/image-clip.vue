<style src="../css/image-clip.css"></style>

<template>
	<div class="image-clip-wrapper" v-if="url">
		<div class="image-clip">
			<h1>裁剪你的图片</h1>
			<div class="image-clip-container" :style="{width: width + 'px', height: height + 'px', backgroundImage: 'url(' + url + ')'}">
				<div class="light-mask" :style="{clip: 'rect(' + top + 'px, ' + right + 'px, ' + bottom + 'px, ' + left + 'px)', backgroundImage: 'url(' + url + ')'}"></div>
				<div class="crop" :style="{width: cropWidth + 'px', height: cropHeight + 'px', top: cropTop + 'px', left: cropLeft + 'px'}" @mousedown="mousedown">
					<span class="crop-handler" @mousedown.stop="cropMousedownHandler($event, 1)"></span>
					<span class="crop-handler" @mousedown.stop="cropMousedownHandler($event, 2)"></span>
					<span class="crop-handler" @mousedown.stop="cropMousedownHandler($event, 3)"></span>
					<span class="crop-handler" @mousedown.stop="cropMousedownHandler($event, 4)"></span>
				</div>
			</div>
			<div class="image-clip-btn-wrapper">
				<span class="image-clip-btn" @click="cancel">取消</span>
				<span class="image-clip-btn save" @click="save">保存</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["url", "rate"],
		data() {
			return {
				width: 0,
				height: 0,

				top: 0,
				left: 0,

				cropMinWidth: 100,
				cropWidth: 200,
				cropTop: 0,
				cropLeft: 0,
			}
		},
		computed: {
			rateProps() {
				return this.rate || (16 / 9)
			},
			cropHeight() {
				return this.cropWidth / this.rateProps
			},
			right() {
				return this.left + this.cropWidth
			},
			bottom() {
				return this.top + this.cropHeight
			}
		},
		watch: {
			url(value) {
				if (! value) {
					return
				}

				this.img = new Image()

				this.img.src = this.url

				this.img.onload = (e) => {
					const width = e.target.naturalWidth
					const height = e.target.naturalHeight

					this.imgWidth = width
					this.imgheight = height

					if (width > height) {
						this.height = 400

						this.width = this.height * width / height
					} else {
						this.width = 400

						this.height = this.width * height / width
					}


					//this.maxValue = this.width * .6 > 200 ? 200 : this.width * .6

					this.top = (this.height - this.cropWidth) / 2
					this.left = (this.width - this.cropWidth) / 2

					//this.cropWidth = this.maxValue
					this.cropTop = this.top
					this.cropLeft = this.left

					this.img.onload = null
				}
			}
		},
		created() {
			document.addEventListener("mousemove", this.mousemoveDocument, false)

			document.addEventListener("mouseup", this.mouseupDocument, false)
		},
		methods: {
			cancel() {
				this.cropWidth = 200

				this.$emit("cancel")
			},
			mousedown(e) {
				this.$startX = e.clientX
				this.$startY = e.clientY

				this.$maxX = this.width - this.cropWidth
				this.$maxY = this.height - this.cropHeight
				this.$currentCropLeft = this.cropLeft
				this.$currentCropTop = this.cropTop

				this.$move = true
			},
			mousemove(e) {
				if (! this.$move) {
					return
				}

				const x = e.clientX - this.$startX
				const y = e.clientY - this.$startY

				const currentCropLeft = this.$currentCropLeft
				const currentCropTop = this.$currentCropTop

				// 向左
				if (x < 0) {
					if (currentCropLeft + x < 0) {
						this.cropLeft = 0
						this.left = 0
					} else {
						this.cropLeft = currentCropLeft + x

						this.left = this.cropLeft
					}

				} else {
					if (currentCropLeft + Math.abs(x) > this.$maxX) {
						this.cropLeft = this.$maxX
					} else {
						this.cropLeft = currentCropLeft + Math.abs(x)
					}

					this.left = this.cropLeft
				}

				// 向上
				if (y < 0) {
					if (currentCropTop + y < 0) {
						this.cropTop = 0
						this.top = 0
					} else {
						this.cropTop = currentCropTop + y

						this.top = this.cropTop
					}

				} else {
					if (currentCropTop + Math.abs(y) > this.$maxY) {
						this.cropTop = this.$maxY
					} else {
						this.cropTop = currentCropTop + Math.abs(y)
					}

					this.top = this.cropTop
				}
			},
			mouseup(e) {
				this.$move = false
			},
			cropMousedownHandler(e, index) {
				const width = this.width
				const height = this.height

				const cropWidth = this.cropWidth
				const cropHeight = this.cropHeight
				const cropLeft = this.cropLeft
				const cropTop = this.cropTop


				this.$cropX = e.clientX
				this.$cropY = e.clientY

				if (index === 1) {
					this.$cropMaxValue = Math.min(this.right, (cropHeight + cropTop) * this.rateProps)
				}

				if (index === 4) {
					this.$cropMaxValue = Math.min(this.right, (height - cropTop) * this.rateProps)
				}

				if (index === 2) {
					this.$cropMaxValue = Math.min(width - this.left, (cropHeight + this.top) * this.rateProps)
				}

				if (index === 3) {
					this.$cropMaxValue = Math.min(width - this.left, (height - this.top) * this.rateProps)
				}

				this.$cropLastLeft = cropLeft - (this.$cropMaxValue - cropWidth)
				this.$cropLastLeftMin = cropLeft + (cropWidth - this.cropMinWidth)

				this.$currentCropTop = cropTop
				this.$currentCropLeft = cropLeft
				this.$currentCropWidth = cropWidth
				this.$currentCropHeight = cropHeight

				this.$cropMove = true
				this.$cropIndex = index
			},
			cropMousemoveHandler(e) {
				if (! this.$cropMove) {
					return
				}

				const index = this.$cropIndex
				const x = e.clientX - this.$cropX
				const y = e.clientY - this.$cropY

				const currentCropTop = this.$currentCropTop
				const currentCropLeft = this.$currentCropLeft
				const currentCropWidth = this.$currentCropWidth
				const currentCropHeight = this.$currentCropHeight

				const currentCropWidthX = currentCropWidth - x
				const currentCropWidthXX = currentCropWidth + x

				const currentCropTopX = currentCropTop - (x / this.rateProps)
				const currentCropTopXX = currentCropTop + (x / this.rateProps)

				const currentCropLeftX = currentCropLeft - x
				const currentCropLeftXX = currentCropLeft + x

				if (x > 0) {
					if (index === 1 || index === 4) {
						if (currentCropWidth - x < this.cropMinWidth) {
							this.cropWidth = this.cropMinWidth
							this.cropLeft = this.$cropLastLeftMin

							this.left = this.$cropLastLeftMin
						} else {
							this.cropWidth = currentCropWidthX
							this.cropLeft =currentCropLeftXX

							this.left = currentCropLeftXX

							if (index === 1) {
								this.top = currentCropTopXX
								this.cropTop = currentCropTopXX
							}
						}
					}

					if (index === 2 || index === 3) {
						if (currentCropWidth + x > this.$cropMaxValue) {
							this.cropWidth = this.$cropMaxValue
						} else {
							this.cropWidth = currentCropWidth + x

							if (index === 2) {
								this.cropTop = currentCropTopX

								this.top = currentCropTopX
							}
						}
					}
				} else {
					if (index === 1 || index === 4) {
						if (currentCropWidth - x > this.$cropMaxValue) {
							this.cropWidth = this.$cropMaxValue
							this.cropLeft = this.$cropLastLeft

							this.left = this.$cropLastLeft
						} else {
							this.cropWidth = currentCropWidthX
							this.cropLeft = currentCropLeftXX

							this.left = currentCropLeftXX

							if (index === 1) {
								this.top = currentCropTopXX
								this.cropTop = currentCropTopXX
							}
						}
					}

					if (index === 2 || index === 3) {
						if (currentCropWidth + x < this.cropMinWidth) {
							this.cropWidth = this.cropMinWidth
						} else {
							this.cropWidth = currentCropWidthXX

							if (index === 2) {
								this.cropTop = currentCropTopX

								this.top = currentCropTopX
							}
						}
					}
				}
			},
			cropMouseupHandler(e) {
				this.$cropMove = false
			},
			mousemoveDocument(e) {
				if (this.$move) {
					this.mousemove(e)

					return
				}

				if (this.$cropMove) {
					this.cropMousemoveHandler(e)

					return
				}
			},
			mouseupDocument() {
				this.mouseup()
				this.cropMouseupHandler()
			},
			save() {
				const canvas = document.createElement("canvas")
				const ctx = canvas.getContext("2d")
				const rateProps = this.imgWidth / this.width
				const ratePropsReverse = this.width / this.imgWidth
				const width = this.cropWidth * rateProps

				canvas.width = this.cropWidth
				canvas.height = this.cropHeight


				ctx.scale(ratePropsReverse, ratePropsReverse)

				ctx.drawImage(this.img, this.cropLeft * rateProps, this.cropTop * rateProps, width, width, 0, 0, width, width)

				if (canvas.toBlob) {
					canvas.toBlob((blob) => {
						this.$emit("cropComplete", blob)
						this.$emit("ccc", blob)
					})
				} else {
					const dataURL = atob(canvas.toDataURL().split(",")[1])
					let length = dataURL.length
					let blob = null
					let buffer = null

					const arrayBuffer = new Uint8Array(length)

					while (length--) {
						arrayBuffer[length - 1] = dataURL.charCodeAt(length - 1)
					}

					buffer = arrayBuffer.buffer

					blob = new Blob([buffer], {
						type: "image/png"
					})

					this.$emit("cropComplete", blob)
					this.$emit("ccc", blob)

				}

				// const a = document.createElement("a")

				// a.href = canvas.toDataURL()

				// a.download = "美女"
				// document.body.appendChild(a)
				// a.click()

				this.cancel()
			}
		}
	}
</script>