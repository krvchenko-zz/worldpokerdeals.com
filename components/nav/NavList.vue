<template>
	<nav class="page-nav">
		<ul v-scrollable class="page-nav__list">
			<slot />
		</ul>
	</nav>
</template>

<script>
	export default {
		name: 'NavList',

		components: {},

		props: {},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-scrollable: url('~assets/i/ico-scrollable.svg?data');

	.page-nav {
		position: relative;
		&__list {
			padding: 0;
			margin: 0;
			list-style: none;
			margin: 0;
			border-radius: 4px;
			display: flex;
			overflow-x: scroll;
			@include hide-scroll();
			flex-basis: 100%;
			flex-wrap: nowrap;
			-webkit-overflow-scrolling: touch;
			transition: transform 0.25s;
			@include hide-scroll();
		}
	}

	.scrollable {
		&__item {
			width: 52px;
			height: 100%;
			top: 0;
			right: 0;
			position: absolute;
			text-indent: -999999px;
			background: #f1efef;
			cursor: pointer;
			border: none;
			&:focus,
			&:active {
				outline: none;
			}
			&:after {
				top: 20px;
				left: 22px;
				position: absolute;
				display: block;
				content: '';
				width: 8px;
				height: 14px;
			}

			&_l {
				left: 0;
				border-top-left-radius: 4px;
				border-bottom-left-radius: 4px;
				background: #f1efef;
				&::before {
					right: -42px;
					top: 10px;
					content: '';
					height: 32px;
					width: 52px;
					position: absolute;
					background: linear-gradient(
						180deg,
						rgba(0, 0, 0, 0.0001) 0%,
						rgba(0, 0, 0, 0.150869) 100%
					);
					opacity: 0.5;
					transform: rotate(90deg);
				}

				&:after {
					transform: rotate(180deg);
					background: $ico-scrollable no-repeat center;
				}
			}

			&_r {
				border-top-right-radius: 4px;
				border-bottom-right-radius: 4px;
				&::before {
					left: -42px;
					top: 10px;
					content: '';
					height: 32px;
					width: 52px;
					position: absolute;
					background: linear-gradient(
						180deg,
						rgba(0, 0, 0, 0.0001) 0%,
						rgba(0, 0, 0, 0.150869) 100%
					);
					opacity: 0.5;
					transform: rotate(-90deg);
				}

				&:after {
					background: $ico-scrollable no-repeat center;
				}
			}
		}
	}

	@include mq('tablet') {
		.page-nav {
			margin: 0 -24px;
		}
	}

	@include mq('mobile') {
		.page-nav {
			margin: 0 -20px;
		}
	}
</style>
