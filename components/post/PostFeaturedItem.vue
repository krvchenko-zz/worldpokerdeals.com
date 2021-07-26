<template>
	<article :class="['post-featured-item']">
		<img
			decoding="async"
			loading="lazy"
			width="474px"
			height="254px"
			:class="['post-featured-item__img']"
			:src="src"
			:alt="image.alt || title"
		/>
		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			:to="{ name: 'index', params: { parent: 'blog', child: slug } }"
		>
			<a :href="href" :class="['post-featured-item__link']">
				<span class="post-featured-item__category">{{
					categories[0].title
				}}</span>
				<span :class="['post-featured-item__title']">{{ title }}</span>
			</a>
		</nuxt-link>
	</article>
</template>

<script>
	export default {
		name: 'PostFeaturedItem',

		components: {},

		props: {
			image: {
				type: Object,
				required: true,
			},

			title: {
				type: String,
				required: true,
			},

			summary: {
				type: String,
				required: true,
			},

			slug: {
				type: String,
				required: true,
			},

			categories: {
				type: Array,
			},
		},

		data: () => ({
			imageStyle: 'post-featured',
		}),

		computed: {
			mediaUrl() {
				return process.env.mediaUrl
			},

			src() {
				return `${this.mediaUrl}/${this.imageStyle}/${this.image.filename}`
			},

			strLimit() {
				return this.summary.length > 88
					? `${this.summary.substring(0, 88)}...`
					: this.summary
			},
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	.post-featured-item {
		margin: 0 14px;
		overflow: hidden;
		position: relative;
		border-radius: 4px;
		transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
		&:before {
			z-index: 2;
			content: '';
			top: 0;
			right: 0;
			position: absolute;
			display: block;
			width: 100%;
			height: 100%;
			background: linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.9) 0%,
				rgba(0, 0, 0, 0.0001) 100%
			);
			transform: matrix(1, 0, 0, -1, 0, 0);
		}
		&:hover {
			&:before {
				background: linear-gradient(
					180deg,
					rgba(0, 0, 0, 0.8) 0%,
					rgba(0, 0, 0, 0.0001) 84.37%
				);
			}
		}
		&__img {
			z-index: 1;
			display: block;
			width: 100%;
			max-width: 100%;
			height: auto;
		}
		&__link {
			text-align: left;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			position: absolute;
			display: block;
			z-index: 3;
			&:hover,
			&:active,
			&:focus,
			&:visited {
				text-decoration: none;
			}
		}

		&__title {
			bottom: 28px;
			left: 0;
			padding: 0 28px;
			position: absolute;
			display: inline-block;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 22px;
			line-height: 26px;
			color: #ffffff;
			text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
		}

		&__category {
			padding: 3px 12px;
			top: 28px;
			left: 28px;
			position: absolute;
			display: inline-block;
			border-radius: 2px;
			border: 1px solid #f1efef;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 12px;
			line-height: 16px;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			color: #e5e5e5;
			background: rgba(36, 50, 56, 0.8);
		}
	}
</style>
