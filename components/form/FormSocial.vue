<template>
	<a
		:href="host + 'auth/' + type"
		:class="['form-social', `form-social_${type}`]"
		>{{ type }}</a
	>
</template>

<script>
	export default {
		name: 'FormSocial',

		components: {},

		props: {
			type: {
				type: String,
				default: '',
			},
		},

		data: () => ({}),

		computed: {
			host() {
				return process.env.apiUrl
			},
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-fb: url('~assets/i/messengers/ico-fb.svg?data');
	$ico-vk: url('~assets/i/messengers/ico-vk.svg?data');
	.form-social {
		display: inline-block;
		position: relative;
		width: 40px;
		height: 40px;
		border-radius: 4px;
		text-indent: -99999px;
		&_vk {
			background: #6588b9 $ico-vk no-repeat center;
			// background-size: 28px;
		}
		&_fb {
			background: #4a67ad $ico-fb no-repeat center;
			// background-size: 14px;
		}
	}
</style>
