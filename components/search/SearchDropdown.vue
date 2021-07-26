<template>
	<div v-if="results.length" class="search-dropdown">
		<ul class="search-dropdown__list">
			<ul
				v-for="(group, index) in results"
				:key="index"
				class="search-dropdown-group__wrap"
			>
				<li class="search-dropdown-group__title">{{ $t(group.label) }}</li>
				<li>
					<ul class="search-dropdown-group">
						<li
							v-for="(item, idx) in group.items"
							:key="idx"
							class="search-dropdown__item"
						>
							<nuxt-link
								v-slot="{ href, route, navigate, isActive, isExactActive }"
								prefetch
								:to="{
									name: 'index',
									params: {
										parent: item.page.parent
											? item.page.parent.slug
											: item.page.slug,
										child: item.page.parent ? item.page.slug : null,
									},
								}"
							>
								<a
									class="search-dropdown__item-link"
									:href="href"
									@click="navigate"
								>
									<span class="search-dropdown__item-img">
										<img
											v-if="item.image"
											class="search-dropdown__item-img"
											:src="`${mediaUrl}/search-small/${item.image.filename}`"
											:alt="item.title"
										/>
										<svg-icon
											class="search-dropdown__item-icon"
											v-else
											:icon="item.icon"
											:width="28"
											:height="28"
											viewBox="0 0 200 200"
										/>
									</span>
									<span
										class="search-dropdown__item-label"
										v-html="highlightSearch(item.title)"
									></span>
								</a>
							</nuxt-link>
						</li>
					</ul>
				</li>
			</ul>
		</ul>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'

	export default {
		components: {},

		props: {
			value: {
				type: String,
			},
		},

		data: () => ({
			results: [],
		}),

		computed: {
			...mapGetters({
				locale: 'lang/locale',
			}),

			mediaUrl() {
				return process.env.mediaUrl
			},
		},

		watch: {
			value: {
				immediate: true,
				deep: true,
				async handler(value) {
					if (value !== '') {
						this.$emit('loading', true)
						const { data } = await this.$axios.get('/search', {
							params: {
								locale: this.locale,
								q: value,
							},
						})
						this.results = data
						this.$emit('loading', false)
					} else {
						this.results = []
					}
				},
			},
		},

		created() {
			this.$emit('created', true)
		},

		destroyed() {
			this.$emit('open', false)
			this.$emit('destroyed', true)
		},

		methods: {
			iconStyles(background) {
				return {
					background: background,
				}
			},

			highlightSearch(text) {
				const regexp = new RegExp(this.value, 'gi')

				return text.replace(regexp, str => {
					return `<b class="search-dropdown__item-highlight">${str}</b>`
				})
			},
		},
	}
</script>
<style lang="scss">
	.search-dropdown {
		position: absolute;
		top: 39px;
		left: 0;
		width: 100%;
		border: 1px solid rgba(204, 204, 204, 0.1);
		border-radius: 0 0 4px 4px;
		box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.3);
		background: #2f323f;
		z-index: 2;
		// List
		&__list {
			padding: 4px 0 16px 0;
			margin: 0;
			list-style: none;
		}
		// Group
		&-group {
			padding: 0;
			margin: 0;
			list-style: none;
			&__title {
				padding: 0 20px 8px 20px;
				color: #999999;
				letter-spacing: 1px;
				text-transform: uppercase;
				font-style: normal;
				font-weight: bold;
				line-height: 20px;
				font-size: 12px;
				font-family: 'Proxima Nova';
			}
			&__wrap {
				padding: 16px 0 0 0;
				margin: 0;
				list-style: none;
			}
		}
		// Item
		&__item {
			&-link {
				padding: 8px 20px;
				text-decoration: none;
				align-items: center;
				display: flex;
				&:active,
				&:focus,
				&:hover {
					text-decoration: none;
					background: linear-gradient(0deg, #353847, #353847);
				}
			}
			&-icon {
				margin-right: 4px;
				border-radius: 50%;
				overflow: hidden;
				width: 28px;
				height: 28px;
				align-items: center;
				justify-content: center;
				display: flex;
				padding: 1.75px;
			}
			&-img {
				border-radius: 4px;
				margin-right: 4px;
				max-width: 100%;
				height: auto;
			}
			&-label {
				font-family: Proxima Nova;
				font-size: 16px;
				line-height: 20px;
				color: #e5e5e5;
			}
			&-highlight {
				font-family: 'Proxima Nova Sb';
				font-style: normal;
				font-size: 16px;
				line-height: 20px;
				color: #e5e5e5;
			}
		}
	}

	@include mq('tablet') {
		.search-dropdown {
			position: relative;
			top: auto;
		}
	}
</style>
