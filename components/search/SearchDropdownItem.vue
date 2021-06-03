<template>
	<li class="search-dropdown__item">
		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			prefetch
			:to="{
				name: 'index',
				params: {
					parent: page.parent ? page.parent.slug : page.slug,
					child: page.parent ? page.slug : null,
				},
			}"
		>
			<a class="search-dropdown__item-link" :href="href" @click="navigate">
				<span class="search-dropdown__item-icon">
					<img
						v-if="image"
						class="search-dropdown__item-img"
						:src="item.image.filename"
						:alt="item.title"
					/>
				</span>
				<span
					class="search-dropdown__item-label"
					v-html="highlightSearch(title)"
				></span>
			</a>
		</nuxt-link>
	</li>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'SearchDropdownItem',

		components: {},

		props: {
			title: {
				type: String,
			},
			image: {
				type: Object,
			},
			icon: {
				type: String,
			},
			page: {
				type: Object,
			},
		},

		data: () => ({}),

		async fetch() {},

		created() {},

		computed: {
			...mapGetters({}),
		},

		watch: {},

		methods: {
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
