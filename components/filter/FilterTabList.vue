<template>
	<nav class="filter-tabs">
		<ul
			class="filter-tabs__list"
			@dragscrollstart="isDragging = true"
			@dragscrollend="isDragging = false"
			v-scrollable
			:class="{ 'disable-dragging': isDragging }"
		>
			<slot />
		</ul>
	</nav>
</template>

<script>
	export default {
		name: 'FilterTabList',

		components: {},

		props: {},

		data: () => ({ isDragging: false }),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style scoped lang="scss">

	$ico-scrollable: url('~assets/i/ico-scrollable.svg?data');

	.scrollable {
		&__item {
			width: 16px;
	    height: 20px;
	    padding: 0;
	    top: 0;
	    right: 0;
	    position: absolute;
	    text-indent: -999999px;
	    background: #fff;
	    cursor: pointer;
	    border: none;
			&:focus,
			&:active {
				outline: none;
			}
			&:after {
		    position: absolute;
		    display: block;
		    content: '';
		    width: 8px;
		    height: 14px;
			}

			&_l {
				left: 0;
				&:after {
					left: 0;
					top: 0;
					transform: rotate(180deg);
					background: $ico-scrollable no-repeat center;
				}
			}

			&_r {
				&:after {
					right: 0;
					top: 0;
					background: $ico-scrollable no-repeat center;
				}
			}

			&_hidden {
				display: none;
			}
		}
	}

	// @include mq('tablet') {
	// 	.filter-tabs {
	// 		margin-left: -24px;
	// 		margin-right: -24px;
	// 	}
	// }

	// @include mq('mobile') {
	// 	.filter-tabs {
	// 		margin-left: -20px;
	// 		margin-right: -20px;
	// 	}
	// }

	.filter-tabs {
		margin-bottom: 24px;
    position: relative;
		&__list {
			overflow-x: scroll;
			position: relative;
			// margin: 0 0 24px 0;
			margin: 0;
			padding: 0;
			display: flex;
			list-style: none;
			@include hide-scroll();
			&:before {
				content: '';
				bottom: 3px;
				position: absolute;
				height: 1px;
				width: 100%;
				display: block;
				background: #cccccc;
			}
		}
	}
</style>
