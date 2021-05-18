<template>
	<div v-if="results.length" class="search-dropdown">
		<ul class="search-dropdown__list">
			<ul
				v-for="(group, index) in results"
				:key="index"
				class="search-dropdown-group__wrap"
			>
				<li class="search-dropdown-group__title">{{ group.label }}</li>
				<li>
					<ul class="search-dropdown-group">
						<li
							v-for="(item, idx) in group.items"
							:key="idx"
							class="search-dropdown__item"
						>
							<a class="search-dropdown__item-link" :href="item.url">
								<span
									class="search-dropdown__item-icon"
									:style="iconStyles(item.background)"
								>
									<img
										class="search-dropdown__item-img"
										:src="item.icon"
										:alt="item.title"
									/>
								</span>
								<span
									class="search-dropdown__item-label"
									v-html="highlightSearch(item.title)"
								></span>
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</ul>
	</div>
</template>
<script>
	// import { mapGetters } from 'vuex'

	export default {
		components: {},

		props: {
			value: {
				type: String,
			},
		},

		data: () => ({
			data: [
				{
					label: 'Покер румы',
					items: [
						{
							title: 'GGpoker',
							url: '/',
							icon:
								'https://media.worldpokerdeals01.com/uploads/53944926f85ca26afdb1300d837cc275.png',
							background: '#000000',
						},
						{
							title: 'GGpokerOK',
							url: '/',
							icon:
								'https://media.worldpokerdeals01.com/uploads/pokerok-logo.png',
							background: '#000000',
						},
					],
				},
				{
					label: 'Покер румы',
					items: [
						{
							title: 'GGpoker',
							url: '/',
							icon:
								'https://media.worldpokerdeals01.com/uploads/53944926f85ca26afdb1300d837cc275.png',
							background: '#000000',
						},
						{
							title: 'GGpokerOK',
							url: '/',
							icon:
								'https://media.worldpokerdeals01.com/uploads/pokerok-logo.png',
							background: '#000000',
						},
					],
				},
			],
			results: [],
		}),

		computed: {},

		watch: {
			value: {
				immediate: true,
				deep: true,
				handler(value) {
					if (value !== '') {
						this.$emit('loading', true)
						setTimeout(() => {
							this.$emit('open', true)
							this.$emit('loading', false)
							this.results = this.data
						}, 1000)
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
				margin-right: 16px;
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
</style>
