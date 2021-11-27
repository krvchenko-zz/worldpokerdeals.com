<template>
	<div
		class="rule-item"
		:style="{
			background: background,
		}"
	>
		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			prefetch
			:to="{ name: 'index', params: { parent: page.parent, child: page.slug } }"
		>
			<a :class="['rule-item__wrap']" :href="href" @click="navigate">
				<img
					decoding="async"
					loading="lazy"
					class="rule-item__img"
					:src="img"
					:alt="title"
				/>
				<div class="rule-item__icon-wrap">
					<svg-icon
						class="rule-item__icon"
						:icon="icon"
						:width="88"
						:height="88"
						:image="true"
						view-box="0 0 200 200"
					/>
				</div>
				<div class="rule-item__title">{{ title }}</div>
				<div class="rule-item__rooms">{{ rooms }} покер-румов</div>
			</a>
		</nuxt-link>
	</div>
</template>

<script>
	export default {
		name: 'PlatformItem',

		components: {},

		props: {
			title: {
				type: String,
			},
			background: {
				type: String,
			},
			image: {
				type: Object,
			},
			icon: {
				type: String,
			},
			page: {
				type: [Object, Number],
			},
			rooms: {
				type: [Number, String],
			},
		},

		data: () => ({}),

		computed: {
			img() {
				return `${this.mediaUrl}/medium/${this.image.filename}`
			},

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-network-more: url('~assets/i/ico-network-more.svg?data');
	.rule-item {
		margin: 20px 0;
		border-radius: 4px;
		&__wrap {
			position: relative;
			display: block;
			padding: 24px 20px 24px 24px;
			min-height: 168px;
			&:hover,
			&:active,
			&:visited {
				text-decoration: none;
			}
		}
		&__title {
			padding-right: 100px;
			min-height: 48px;
			margin-bottom: 12px;
			font-family: Proxima Nova;
			font-weight: 800;
			font-size: 24px;
			line-height: 28px;
			color: #ffffff;
		}
		&__img {
			display: block;
			position: absolute;
			right: 0;
			bottom: 0;
		}
		&__icon {
			&-wrap {
				box-shadow: 0px 4px 12px rgba(34, 34, 34, 0.25);
				border-radius: 50%;
				overflow: hidden;
				margin-top: -24px;
				right: 20px;
				top: 0;
				position: absolute;
			}
		}
		&__rooms {
			left: 20px;
			bottom: 24px;
			position: absolute;
			font-family: 'Proxima Nova Sb';
			font-size: 14px;
			line-height: 16px;
			color: #ffffff;
			opacity: 0.7;
			max-width: 50%;
			&:after {
				content: '';
				width: 28px;
				height: 12px;
				margin-left: 16px;
				vertical-align: middle;
				display: inline-block;
				background: $ico-network-more no-repeat center;
			}
		}
	}
</style>
