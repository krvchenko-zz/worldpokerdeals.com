<template>
	<article class="article">
		<h1 v-if="title" :id="titleId" class="page-title">{{ title }}</h1>

		<page-meta
			v-if="meta"
			:author="author"
			:created="created"
			:updated="updated"
			:dark="true"
		/>

		<div v-if="summary" class="article__summary" v-html="summary"></div>

		<img
			v-if="image"
			class="article__img"
			decoding="async"
			loading="lazy"
			width="742px"
			height="320px"
			:src="src"
			:alt="image.alt || title"
		/>

		<slot name="header" />

		<v-runtime-template
			ref="article"
			v-carousel
			v-table-hideable
			:template="template"
		/>

		<slot name="footer" />
	</article>
</template>

<script>
	import VRuntimeTemplate from 'v-runtime-template'
	import Soft from '~/components/cards/Soft'
	import Manager from '~/components/cards/Manager'

	export default {
		name: 'PageArticle',

		components: {
			VRuntimeTemplate,
			Soft,
			Manager,
		},

		props: {
			text: {
				type: String,
				required: true,
			},

			summary: {
				type: String,
			},

			image: {
				type: Object,
			},

			imageStyle: {
				type: String,
				default: 'article-large',
			},

			author: {
				type: String,
			},

			created: {
				type: String,
			},

			updated: {
				type: String,
			},

			meta: {
				type: Boolean,
			},

			title: {
				type: [Boolean, String],
				default: false,
			},

			titleId: {
				type: String,
				default: '',
			},
		},

		data: () => ({
			lightbox: null,
		}),

		computed: {
			template() {
				return `<div class=article-body>${this.text}</div>`
			},

			mediaUrl() {
				return process.env.mediaUrl
			},

			src() {
				return this.image
					? `${this.mediaUrl}/${this.imageStyle}/${this.image.filename}`
					: null
			},
		},

		watch: {},

		mounted() {
			const lightbox = this.$glightbox({
				touchNavigation: true,
				loop: true,
				selector: '.lightbox',
			})
		},

		updated() {
			const lightbox = this.$glightbox({
				touchNavigation: true,
				loop: true,
				selector: '.lightbox',
			})
		},

		methods: {},
	}
</script>
<style lang="scss">
	.article {
		&__summary {
			margin-bottom: 28px;
			font-family: 'Proxima Nova Sb';
			font-size: 17px;
			line-height: 21px;
			color: #555555;
		}
		&__img {
			margin-bottom: 40px;
			display: block;
			max-width: 100%;
			height: auto;
			border-radius: 4px;
		}
	}
</style>
