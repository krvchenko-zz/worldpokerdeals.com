<template>
	<a
		:class="{
			btn: true,
			'btn-block': block,
			'btn-contact': true,
			'btn-contact_loading': loading,
			'btn-contact_icon': icon,
			'btn-contact_dark': dark,
			[`btn-contact_${size}`]: true,
			[`btn-contact_${type}`]: true,
		}"
		:href="target"
		target="_blank"
		v-on="{ click: type === 'chat' ? handleChat : handleClick }"
	>
		<slot />
	</a>
</template>

<script>
	export default {
		name: 'ButtonContact',

		props: {
			type: {
				type: String,
			},

			href: {
				type: String,
			},

			size: {
				type: String,
				default: 'sm',
			},

			icon: {
				type: Boolean,
				default: false,
			},

			dark: {
				type: Boolean,
				default: false,
			},

			block: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({
			loading: false,
		}),

		computed: {
			target() {
				return (
					(this.type === 'chat' && `#`) ||
					(this.type === 'skype' && `skype:${this.href}?chat`) ||
					(this.type === 'email' && `mailto:${this.href}`) ||
					(this.type === 'telegram' && `https://telegram.me/${this.href}`) ||
					(this.type === 'fb' && `${this.href}`) ||
					(this.type === 'vk' && `${this.href}`) ||
					(this.type === 'twitter' && `${this.href}`) ||
					(this.type === 'whatsapp' && `https://api.whatsapp.com/send?phone=${this.href}`) ||
					(this.type === 'instagram' && `${this.href}`)
				)
			},
		},

		watch: {},

		created() {},

		methods: {
			handleClick() {
				return window.open(this.target, '_blank')
			},
			handleChat($event) {
				$event.preventDefault()
				this.loading = true

				const { set } = this.$meta().addApp('jivosite')

				set({
					script: [{
						type: 'text/javascript',
						async: true,
						src: `//code.jivosite.com/script/widget/${this.$t('jivosite')}`
					}],
				})

				setTimeout(() => {
					jivo_api.open()
					this.loading = false
				}, 1200)
			}
		},
	}
</script>

<style lang="scss"></style>