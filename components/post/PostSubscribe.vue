<template>
	<div class="post-subscribe">
		<div class="block-title post-subscribe__title">
			{{ $t('post_subscribe.title') }}
		</div>
		<div class="post-subscribe__text">
			{{ $t('post_subscribe.text') }}
		</div>
		<button-contact
			class="post-subscribe__btn"
			size="md"
			type="telegram"
			href="worldpokerdealsRU"
			rel="nofollow noopener"
			>{{ $t('post_subscribe.btn') }}</button-contact
		>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'PostSubscribe',

		components: {},

		props: {},

		data: () => ({}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	.post-subscribe {
		&__title {
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 16px;
			line-height: 20px;
			color: #555555;
		}

		&__text {
			margin-bottom: 16px;
			font-family: Proxima Nova;
			font-size: 14px;
			line-height: 17px;
			color: #555555;
		}

		&__btn {
			padding-left: 45px;
			background-color: #4b9fdb;
			border-color: #4b9fdb;
			font-size: 12px;
			line-height: 30px;
			color: #ffffff;
			&:before {
				background-size: 24px;
				left: 8px;
				height: 32px;
				width: 32px;
			}
		}
	}
</style>
