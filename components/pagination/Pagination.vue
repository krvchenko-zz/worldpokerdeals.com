<template>
	<div class="pagination">
		<!-- More -->
		<button
			v-if="nextUrl && showLoadMore"
			:style="{
				width: loadMoreWidth ? `${loadMoreWidth}px` : '100%'
			}"
			:class="['btn', 'btn-sm', 'btn-primary', 'btn-pagination_more']"
			@click="handleShowMore"
		>
			{{ loadMoreText }}
		</button>
		<ul v-if="showPages" class="pagination__list">
			<!-- Prev -->
			<li v-if="prevUrl" :class="['pagination__item', 'pagination__item_prev']">
				<nuxt-link
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					:to="{
						name: url && current - 1 > 1 ? 'index.paged' : 'index',
						params: {
							parent: pageable.parent ? pageable.parent.slug : pageable.slug,
							child: pageable.parent && (!url && current - 1 > 1) ? pageable.slug : null,
							page: url && current - 1 > 1 ? current - 1 : null
						},
						query: $route.query,
					}"
					custom
				>
					<a
						v-if="url"
						:class="['btn', 'btn-pagination', 'btn-pagination_prev']"
						:href="href"
						title="Previous"
						:disabled="!prevUrl"
						@click="navigate"
					>
					</a>
					<button
						v-else
						:class="['btn', 'btn-pagination', 'btn-pagination_prev']"
						aria-label="Previous"
						:disabled="!prevUrl"
						v-on="{ click: query ? navigate : handlePagePrev }"
					></button>
				</nuxt-link>
			</li>
			<!-- Pages -->
			<li
				v-for="(item, index) in pages"
				:key="index"
				:class="[
					'pagination__item',
					item.number === current && 'pagination__item_active',
				]"
			>
				<nuxt-link
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					:to="{
						name: url && item.number > 1 ? 'index.paged' : 'index',
						params: {
							parent: pageable.parent ? pageable.parent.slug : pageable.slug,
							child: pageable.parent && (!url && item.number > 1) ? pageable.slug : null,
							page: url && item.number > 1 ? item.number : null
						},
						query: $route.query,
					}"
					custom
				>
					<a
						v-if="url"
						:class="[
							'btn',
							'btn-pagination',
							item.number === current && 'btn-pagination_active',
						]"
						:href="href"
						:disabled="item.number === current"
						@click="navigate"
					>
						{{ item.number }}
					</a>
					<button
						v-else
						:class="[
							'btn',
							'btn-pagination',
							item.number === current && 'btn-pagination_active',
						]"
						:disabled="item.number === current"
						@click="handlePageChange(item.number)"
					>
						{{ item.number }}
					</button>
				</nuxt-link>
			</li>
			<!-- Next -->
			<li v-if="nextUrl" :class="['pagination__item', 'pagination__item_next']">
				<nuxt-link
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					:to="{
						name: url && current + 1 < last ? 'index.paged' : 'index',
						params: {
							parent: pageable.parent ? pageable.parent.slug : pageable.slug,
							child: pageable.parent && (!url && current + 1 < last) ? pageable.slug : null,
							page: url && current + 1 < last ? current + 1 : null
						},
						query: $route.query,
					}"
					custom
				>
					<a
						v-if="url"
						:class="['btn', 'btn-pagination', 'btn-pagination_next']"
						aria-label="Next"
						title="Next"
						:href="href"
						:disabled="!nextUrl"
						@click="navigate"
					>
					</a>
					<button
						v-else
						:class="['btn', 'btn-pagination', 'btn-pagination_next']"
						aria-label="Next"
						:disabled="!nextUrl"
						v-on="{ click: query ? navigate : handlePageNext }"
					></button>
				</nuxt-link>
			</li>
		</ul>
		<div class="pagination-info">
			{{ from }}–{{ to }} {{ $t('from') }} {{ total }} {{ totalText }}
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'Pagination',

		components: {},

		props: {

			showPages: {
				type: Boolean,
				default: true,
			},

			last: {
				type: Number,
				required: true,
			},

			current: {
				type: Number,
				required: true,
			},

			query: {
				type: Boolean,
				default: false,
			},

			url: {
				type: Boolean,
				default: false,
			},

			prevUrl: {
				type: String,
				required: false,
			},

			nextUrl: {
				type: String,
				required: false,
			},

			from: {
				type: Number,
				required: true,
			},

			to: {
				type: Number,
				required: true,
			},

			total: {
				type: Number,
				required: true,
			},

			totalText: {
				type: String,
				default: '',
			},

			showLoadMore: {
				type: Boolean,
				default: true
			},

			loadMoreText: {
				type: String,
				default: 'Показать еще',
			},

			loadMoreWidth: {
				type: [Number, String],
				default: 'auto',
			},
		},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				pageable: 'pages/page',
			}),

			pages() {
				let range = []

				for (var i = 0; i < this.last; i++) {
					range.push({
						number: i + 1,
					})
				}

				if (this.current > 3 && this.current + 3 < this.last) {
					range = range.slice(this.current - 3, this.current + 2)
				} else if (this.current + 2 >= this.last) {
					range = range.slice(Math.max(0, this.last - 5), this.last)
				} else {
					range = range.slice(0, 5)
				}

				return range
			},
		},

		watch: {},

		methods: {
			handlePageNext() {
				this.$emit('next', this.current + 1)
			},

			handlePagePrev() {
				this.$emit('prev', this.current - 1)
			},

			handlePageChange(number) {
				if (number === this.current) return false
				this.$emit('change', number)
			},

			handleShowMore() {
				if (!this.nextUrl) return false
				this.$emit('more')
			},
		},
	}
</script>

<style lang="scss">
	.pagination {
		margin-bottom: 40px;
		display: flex;
		align-items: center;

		&__list {
			padding: 0;
			margin: 0 28px 0 0;
			display: flex;
			align-items: center;
		}

		&__item {
			list-style: none;
			overflow: hidden;
			border-top: 1px solid #e9e9e9;
			border-bottom: 1px solid #e9e9e9;
			&:first-child {
				border-left: 1px solid #e9e9e9;
				border-top-left-radius: 4px;
				border-bottom-left-radius: 4px;
			}
			&:last-child {
				border-right: 1px solid #e9e9e9;
				border-top-right-radius: 4px;
				border-bottom-right-radius: 4px;
			}
			&_prev {
				border-right: 1px solid #e9e9e9;
			}
			&_next {
				border-left: 1px solid #e9e9e9;
			}
			&:hover,
			&:focus,
			&:active {
				border-color: #2e87c8;
			}
			&_active {
				border-color: #c6c7ca;
				border-left: 0 !important;
				border-right: 0 !important;
				&:hover,
				&:focus,
				&:active {
					border-color: #c6c7ca;
				}
			}
		}

		&-info {
			line-height: 36px;
			font-family: 'Proxima Nova';
			font-size: 14px;
			line-height: 16px;
			color: #555555;
		}
	}

	.btn-pagination {
		border-radius: 0;
		padding: 2px;
		min-width: 36px;
		display: block;
		position: relative;
		font-family: Proxima Nova;
		font-weight: normal;
		font-size: 14px;
		line-height: 30px;
		text-align: center;
		color: #777777;
		background: #ffffff;
		&_prev {
			&:before {
				content: '';
				display: inline-block;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 4px 4px 4px 0;
				border-color: transparent #c6c7ca transparent transparent;
			}

			&:hover,
			&:focus,
			&:active {
				color: #ffffff;
				background: #2e87c8;
				&:before {
					border-color: transparent #ffffff transparent transparent;
				}
			}
		}

		&_next {
			&:before {
				content: '';
				display: inline-block;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 4px 0 4px 4px;
				border-color: transparent transparent transparent #c6c7ca;
			}

			&:hover,
			&:focus,
			&:active {
				color: #ffffff;
				background: #2e87c8;
				&:before {
					border-color: transparent transparent transparent #ffffff;
				}
			}
		}

		&:hover,
		&:focus,
		&:active {
			color: #ffffff;
			background: #2e87c8;
		}

		&_active {
			color: #ffffff;
			background: #c6c7ca;
			&:hover,
			&:focus,
			&:active {
				color: #ffffff;
				background: #c6c7ca;
			}
		}

		&_more {
			margin: 0 28px 0 0;
			width: auto;
			padding: 10px 20px;
		}
	}

	@include mq('tablet') {
		.pagination {
			margin-bottom: 0;
			padding: 0 15px;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			&__list {
				margin-right: 20px;
			}
		}
		.btn-pagination_more {
			width: 100%;
			margin-right: 0px;
			margin-bottom: 20px;
		}
	}
</style>
