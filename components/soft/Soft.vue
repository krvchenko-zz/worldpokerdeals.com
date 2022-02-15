<template>
	<div
		:class="[
			'soft-item',
		]"
	>
			<div :class="['soft-item__img-wrap']">
				<img
					:class="['soft-item__img']"
					decoding="async"
					loading="lazy"
					:src="img"
					:alt="image.alt || `${title} logo`"
					width="150px"
					height="150px"
				/>
			</div>

			<div
				:class="[
					'soft-item__info',
				]"
			>
				<div :class="['soft-item__category']">{{ category }}</div>
				<div :class="['soft-item__title']">{{ title }}</div>
				<div :class="['soft-item__summary']" v-html="short_description"></div>
			</div>

			<div :class="[
				'soft-item__actions',
			]">
				<nuxt-link
					v-slot="{ href, route, navigate }"
					:to="{
						name: 'index',
						params: {
							parent: review.parent ? review.parent.slug : review.slug,
							child: review.parent ? review.slug : null,
						},
					}"
				>
					<a
						:class="[
							'btn',
							'btn-block',
							'btn-soft',
							'btn-soft__review',
						]"
						:href="href"
						@click="navigate"
						>{{ $t('details') }}</a
					>
				</nuxt-link>
				<nuxt-link v-slot="{ href, route, navigate }" :to="to">
				<button
					:disabled="!available"
					:class="[
						'btn',
						'btn-block',
						'btn-soft',
						'btn-soft__download',
						!available && 'btn-soft-action_disabled',
					]"
					v-on="{ click: handleClick }"
				>
					<span class="btn-soft__download-label">{{ $t('download') }}</span>
					<span class="btn-soft__download-price">{{ currency }}{{ price }}</span>
				</button>
				</nuxt-link>
			</div>
	</div>
</template>

<script>
	export default {
		name: 'Soft',

		components: {},

		props: {
			id: {
				type: [Number, String],
				required: true,
			},

			title: {
				type: String,
				required: true,
				default: '',
			},

			review: {
				type: Object,
			},

			url: {
				type: String,
			},

			short_description: {
				type: String,
			},

			discount: {
				type: [Boolean, Number],
				default: false,
			},

			available: {
				type: [Boolean, Number],
				default: true,
			},

			discount_value: {
				type: [String, Number],
			},

			price: {
				type: [String, Number],
				required: true,
			},

			image: {
				type: [String, Object],
				required: true,
			},

			category: {
				type: [String, Object],
				required: true,
			},

			currency: {
				type: String,
				required: true,
			},

			small: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({
			hover: false,
		}),

		computed: {
			img() {
				return `${this.mediaUrl}/soft-card/${this.image.filename}`
			},

			mediaUrl() {
				return process.env.mediaUrl
			},

			to() {
				return `/soft/${this.id}/download`
			},
		},

		watch: {},

		created() {},

		methods: {
			handleClick() {
				window.open(this.to, '_blank')
			},
		},
	}
</script>

<style lang="scss">

</style>
