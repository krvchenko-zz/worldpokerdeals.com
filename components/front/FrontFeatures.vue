<template>
	<div class="front-features">
		<div class="front-features__label">{{ $t('our_numbers') }}</div>
		<div class="front-features__list">
			<div v-for="(item, index) in features" :key="index" class="front-feature">
				<span class="front-feature__value">{{ item.value }}</span>
				<span class="front-feature__label" v-html="$t(item.label)"></span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'FrontFeatures',

		components: {},

		props: {},

		data: () => ({
			features: [
				{
					label: 'our_numbers_years',
					value: '7',
				},
				{
					label: 'our_numbers_rooms',
					value: '150',
				},
				{
					label: 'our_numbers_clubs',
					value: '26',
				},
				{
					label: 'our_numbers_partners',
					value: '70',
				},
				{
					label: 'our_numbers_active',
					value: '10 000',
				},
				{
					label: 'our_numbers_managers',
					value: '10',
				},
			],
		}),

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
	.front-features {
		max-width: 1440px;
		width: 100%;
		padding: 0 26px;
		&__list {
			display: flex;
			justify-content: center;
			position: relative;
			&::after {
				content: '';
				border-bottom: 1px solid #cccccc;
				position: absolute;
				width: 100%;
				top: 61px;
			}
		}
		&__label {
			margin-bottom: 24px;
			font-family: 'Proxima Nova Sb';
			font-size: 28px;
			line-height: 32px;
			text-align: center;
			letter-spacing: -0.2px;
			color: #555555;
		}
	}

	.front-feature {
		margin-right: 100px;
		position: relative;
		&:last-child {
			margin: 0;
		}
		&__value {
			padding-bottom: 12px;
			margin-bottom: 16px;
			position: relative;
			display: inline-block;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 41px;
			line-height: 50px;
			letter-spacing: -1px;
			font-feature-settings: 'salt' on;
			color: #777777;
			white-space: nowrap;
			&:after {
				content: '';
				left: 0;
				bottom: 0px;
				position: absolute;
				width: 100%;
				height: 4px;
				display: block;
				background: #cccccc;
			}
		}

		&__label {
			display: block;
			min-width: 53px;
			font-family: Proxima Nova;
			font-size: 16px;
			line-height: 20px;
			color: #90939d;
		}
	}

	@include mq('laptop') {
		.front-features {
			padding-left: 24px;
			&__list {
				overflow-x: scroll;
				scrollbar-width: none;
				justify-content: space-between;
				margin-right: -24px;
				&::after {
					display: none;
				}
			}
		}

		.front-feature {
			margin-right: 44px;
		}
	}

	@include mq('tablet') {
		.front-features {
			&__list {
				justify-content: flex-start;
			}
		}
	}

	@include mq('mobile') {
		.front-features {
			padding-left: 20px;
			&__list {
				margin-right: -20px;
				&::after {
					width: 200%;
					display: block;
				}
			}
		}
		.front-feature {
			margin-right: 56px;
		}
	}
</style>
