<template>
	<div class="soft-item">
		<div
			class="soft-item__img-wrap"
			:style="{
				backgroundColor: background,
			}"
		>
			<img
				decoding="async"
				loading="lazy"
				class="soft-item__img"
				:src="src"
				:alt="title"
			/>
		</div>
		<div class="soft-item__info">
			<div class="soft-item__category">{{ category.title }}</div>
			<div class="soft-item__title">{{ title }}</div>
			<div class="soft-item__summary" v-html="summary" />
		</div>
		<div class="soft-item__actions">
			<router-link
				v-slot="{ href, route, navigate, isActive, isExactActive }"
				:to="{
					name: 'preview.soft.index',
					params: { soft_category: category.slug, soft_slug: slug },
				}"
			>
				<a
					:class="['btn btn-block btn-soft btn-soft__review']"
					:href="href"
					@click="navigate"
					>Детали</a
				>
			</router-link>
			<router-link
				v-slot="{ href, route, navigate, isActive, isExactActive }"
				:to="{ path: `/soft/${id}/download` }"
			>
				<a
					:class="['btn btn-block btn-soft btn-soft__download']"
					:href="href"
					@click="navigate"
				>
					<span class="btn-soft__download-label">Скачать</span>
					<span class="btn-soft__download-price"
						>{{ currency.symbol }}{{ price }}</span
					>
				</a>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Soft',

		components: {},

		props: {
			id: {
				type: Number,
				required: true,
			},

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
			},

			slug: {
				type: String,
				required: true,
			},

			background: {
				type: String,
			},

			price: {
				type: [String, Number],
				default: null,
			},

			url: {
				type: String,
			},

			category: {
				type: Object,
			},

			currency: {
				type: Object,
			},
		},

		data: () => ({}),

		computed: {
			src() {
				return `/images/soft-card/${this.image.filename}`
			},
		},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style scoped lang="scss">
	.soft-item {
		margin: 30px 0 40px 0;
		padding: 20px;
		display: flex;
		background: #fafafa;
		border-radius: 4px;
		&__category {
			margin-bottom: 5px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 12px;
			line-height: 16px;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			color: #555555;
			opacity: 0.8;
		}
		&__title {
			margin-bottom: 10px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-size: 18px;
			line-height: 21px;
			letter-spacing: -0.3px;
			color: #243238;
		}
		&__summary {
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 14px;
			color: #555555;
		}
		&__img {
			max-width: 80%;
			height: auto;
			display: inline;
			margin: 0;
			&-wrap {
				text-align: center;
				overflow: hidden;
				border: 2px solid #ffffff;
				width: 80px;
				height: 80px;
				min-width: 80px;
				min-height: 80px;
				border-radius: 10px;
				margin-right: 20px;
				line-height: 76px;
			}
		}
		&__info {
			margin-right: 30px;
		}
		&__actions {
			min-width: 160px;
			white-space: nowrap;
		}
	}
	.btn-soft {
		font-family: 'Proxima Nova Sb';
		border-radius: 3px;
		text-decoration: none;
		&:hover,
		&:active,
		&:visited,
		&:focus {
			text-decoration: none;
		}
		&__review {
			margin-bottom: 8px;
			padding: 10px;
			background: #ffffff;
			border: 1px solid #e9e9e9;
			color: #777777;
			font-size: 14px;
			line-height: 14px;
		}
		&__download {
			padding: 0;
			color: #ffffff;
			background: #ff5e38;
			font-size: 0;
			display: table;
			&-label {
				width: 100%;
				padding: 11px 10px;
				display: table-cell;
				font-size: 14px;
				line-height: 14px;
			}
			&-price {
				display: table-cell;
				padding: 11px 10px;
				padding-left: 10px;
				position: relative;
				font-weight: bold;
				line-height: 14px;
				font-size: 14px;
				border-left: 1px solid #fbfafa4d;
				font-family: 'Proxima Nova';
			}
		}
	}
</style>
