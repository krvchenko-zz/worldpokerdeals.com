<template>
	<div class="common-text-spoiler">
		<p v-show="shouldHide">
			{{ visibleText }}
			<span @click="showAllText" class="common-text-spoiler__button">
				<slot name="button" />
			</span>
		</p>
		<div v-show="!shouldHide" ref="container"></div>
	</div>
</template>

<script>
	export default {
		name: 'CommonTextSpoiler',

		components: {},

		props: {
			text: {
				type: String,
				required: true,
			},

			limit: {
				type: Number,
				required: true,
			},
		},

		data: () => ({
			shouldHide: false,
			visibleText: '',
		}),

		computed: {},

		watch: {
			text() {
				this.makeSpoiler()
			},
		},

		mounted() {
			this.makeSpoiler()
		},

		created() {},

		methods: {
			showAllText() {
				this.shouldHide = false
				this.$refs.container.innerHTML = this.text
			},

			breakOnWord(text, limit) {

				const words = text.split(' ')

				let sum = 0
				let lastIncludedIndex = 0

				for (let i = 0; i < words.length; i++) {
					sum += words[i].length

					// limit minus number of spaces between words
					if (sum > limit - words.length + 1) {
						break
					}

					lastIncludedIndex = i
				}

				return words.slice(0, lastIncludedIndex + 1).join(' ')
			},

			makeSpoiler() {

				const parser = new DOMParser()
				const doc = parser.parseFromString(this.text, 'text/html')
				const children = doc.body.children

				let indexToWhichInclude = null
				let sum = 0
				let howManySymbolsIncludeFromLastChild = 0
				this.shouldHide = false

				// text has several p tags
				if (children.length) {
					for (let i = 0; i < children.length; i++) {
						const childContentLength = children[i].textContent.length
						sum += childContentLength
						if (sum > this.limit) {
							indexToWhichInclude = i
							howManySymbolsIncludeFromLastChild =
								childContentLength - (sum - this.limit)
							this.shouldHide = true
							break
						}
					}

					if (indexToWhichInclude !== null) {
						this.visibleText = this.breakOnWord(
							children[indexToWhichInclude].textContent,
							howManySymbolsIncludeFromLastChild
						)

						for (let i = indexToWhichInclude - 1; i >= 0; i--) {
							this.$refs.container.insertAdjacentElement(
								'afterbegin',
								children[i]
							)
						}
					} else {
						this.$refs.container.innerHTML = this.text
					}
				}
				// text hasn't p tags only textContent
				else {
					this.shouldHide = this.text.length > this.limit

					if (this.shouldHide) {
						this.visibleText = this.breakOnWord(this.text, this.limit)
					} else {
						this.$refs.container.innerHTML = this.text
					}
				}
			},
		},
	}
</script>

<style lang="scss">
	.common-text-spoiler {
		&__button {
			margin-left: 8px;
			cursor: pointer;
		}
	}
</style>
