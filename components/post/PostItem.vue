<template>
	<article
		:class="[
			'post-item',
			medium && 'post-item_size_m',
			asCard && 'post-item--card',
		]"
	>
		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			prefetch
			:to="{ name: 'index', params: { parent: 'blog', child: slug } }"
			class="post-item__img-wrapper"
		>
			<a :href="href" @click="navigate">
				<img
					decoding="async"
					loading="lazy"
					width="327px"
					height="185px"
					:class="[
						'post-item__img',
						medium && 'post-item__img_size_m',
						!medium && 'post-item__img_size-small',
					]"
					:src="src"
					:alt="image.alt || title"
				/>
			</a>
		</nuxt-link>
		<div v-if="medium" class="post-item__meta">
			<span class="post-item__date post-item__date_size_m">{{
				dateFormat(created)
			}}</span>
			<span
				class="post-item__category"
				:style="{
					color: categories[categories.length - 1].color,
				}"
			>
				{{ categories[categories.length - 1].title }}
			</span>
		</div>
		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			prefetch
			:to="{ name: 'index', params: { parent: 'blog', child: slug } }"
		>
			<a
				:class="['post-item__link', medium && 'post-item__link_size_m']"
				:href="href"
				@click="navigate"
				>{{ title }}</a
			>
		</nuxt-link>

		<p v-if="medium" class="post-item__summary">{{ strLimit }}</p>
		<div :class="['post-item__author', medium && 'post-item__author_size_m']">
			<span>
				<img
					v-if="avatar"
					decoding="async"
					width="24px"
					height="24px"
					class="post-item__author-pic"
					:src="avatar"
					:alt="author.full_name"
					loading="lazy"
				/>
				<svg-icon
					v-else
					class="post-item__author-pic"
					:width="24"
					:height="24"
					:image="true"
					icon="user-avatar"
				/>
				<span class="post-item__author-name">{{ author.full_name }}</span>
			</span>
			<span v-if="!medium" class="post-item__sep">·</span>
			<span v-if="!medium" class="post-item__date">{{
				dateFormat(created)
			}}</span>
		</div>
	</article>
</template>

<script>
	export default {
		name: 'PostItem',

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

			author: {
				type: Object,
				required: true,
			},

			created: {
				type: String,
				required: true,
			},

			categories: {
				type: Array,
			},

			medium: {
				type: Boolean,
				default: false,
			},

			asCard: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({
			imageStyle: 'post-square',
		}),

		computed: {
			mediaUrl() {
				return process.env.mediaUrl
			},

			avatar() {
				return this.author && this.author.image ? `${this.mediaUrl}/user-square/${this.author.image.filename}` : null
			},

			src() {
				return `${this.mediaUrl}/${this.imageStyle}/${this.image.filename}`
			},

			url() {
				return `/blog/${this.slug}`
			},

			strLimit() {
				return this.summary.length > 88
					? `${this.summary.substring(0, 88)}...`
					: this.summary
			},
		},

		watch: {
			medium: {
				immediate: true,
				handler(val) {
					this.imageStyle = val ? 'post-medium' : 'post-square'
				},
			},
		},

		created() {},

		methods: {
			dateFormat(timestamp) {
				let date = new Date(timestamp)

				if (date == 'Invalid Date') {
					return timestamp
				}

				let d = date.getDate(),
					m = date.getMonth() + 1,
					y = date.getFullYear()

				return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
			},
		},
	}
</script>

<style lang="scss">
	.post-item {
		margin-bottom: 20px;
		overflow: hidden;
		&_size_m {
			margin-bottom: 25px;
			max-width: 326px;
		}
		&:last-child {
			margin-bottom: 0;
		}
		&__img {
			max-width: 100%;
			width: 100%;
			height: auto;
			float: left;
			border-radius: 4px;
			&_size_m {
				border-radius: 4px;
				float: none;
				clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
			}
			&_size-small {
				width: 80px;
				height: 80px;
			}
		}
		&__link {
			padding-left: 100px;
			margin-bottom: 10px;
			display: block;
			font-style: normal;
			font-weight: bold;
			color: #243238;
			font-size: 16px;
			line-height: 20px;
			letter-spacing: -0.1px;
			font-family: 'Proxima Nova';
			transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;
			&:hover {
				color: #555555;
				text-decoration: none;
			}
			&_size_m {
				padding: 0;
				letter-spacing: 0;
				line-height: 24px;
				font-size: 20px;
				&:hover {
					color: #008be2;
				}
			}
		}

		&__summary {
			font-style: normal;
			font-weight: normal;
			font-size: 14px;
			line-height: 17px;
			color: #555555;
			font-family: 'Proxima Nova';
		}

		&__meta {
			margin: 5px 0;
			display: flex;
			flex-flow: wrap;
			justify-content: space-between;
		}

		&__date {
			font-style: normal;
			font-size: 12px;
			line-height: 16px;
			color: #999999;
			font-family: 'Proxima Nova';

			&_size_m {
				font-family: 'Proxima Nova Sb';
				font-size: 12px;
				line-height: 16px;
				font-feature-settings: 'tnum' on, 'lnum' on;
				color: #555555;
			}
		}

		&__category {
			text-transform: uppercase;
			font-style: normal;
			font-weight: bold;
			font-size: 12px;
			line-height: 16px;
			text-align: right;
			letter-spacing: 0.5px;
			color: #0770a5;
			font-family: 'Proxima Nova';
		}

		&__sep {
			color: #999999;
			font-weight: bold;
			line-height: 22px;
			margin: 0 12px;
			font-size: 18px;
			font-family: 'Proxima Nova';
		}

		&__author {
			padding-left: 20px;
			display: flex;
			align-items: baseline;
			&_size_m {
				padding: 0;
			}
			&-pic {
				margin-right: 6px;
				border-radius: 50%;
			}

			&-name {
				font-family: 'Proxima Nova';
				font-size: 12px;
				line-height: 16px;
				color: #999999;
			}

			span {
				white-space: nowrap;
			}
		}
	}

	@include mq('laptop') {
		.post-item {
			&__meta {
				flex-wrap: nowrap;
			}
			&__date {
				margin-right: 24px;
			}
			&__category {
				text-align: right;
			}
		}
	}

	@include mq('tablet') {
		.post-item {
			&--card {
				max-width: none;
				display: grid;
				grid-template-columns: [image] 1fr [content] 2fr;
				grid-column-gap: 16px;
				grid-row-gap: 8px;
				grid-template-rows: repeat(4, minmax(fit-content, 1fr));
			}
			&__img-wrapper {
				grid-column: image;
				grid-row: span 3;
			}
			&__meta {
				margin-top: 8px;
				margin-bottom: 12px;
			}
			&__link,
			&__summary {
				margin-bottom: 8px;
			}
			&--card &__img {
				width: 100%;
				min-width: 136px;
				height: auto;
				clip-path: none;
			}
			&--card &__meta,
			&--card &__link,
			&--card &__summary,
			&--card &__author {
				grid-column: content;
				margin: 0;
			}
		}
	}
</style>
