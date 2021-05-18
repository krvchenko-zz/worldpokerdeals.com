<template>
	<div :class="['page-meta']">
		<div v-if="author" :class="['page-meta__item', 'page-meta__item_author']">
			<span :class="['page-meta__label', dark && 'page-meta__label_dark']"
				>Автор</span
			>
			<span :class="['page-meta__name', dark && 'page-meta__name_dark']">{{
				author
			}}</span>
		</div>
		<div :class="['page-meta__item', 'page-meta__item_created']">
			<span :class="['page-meta__label', dark && 'page-meta__label_dark']"
				>Дата публикации</span
			>
			<span :class="['page-meta__date', dark && 'page-meta__date_dark']">{{
				dateFormat(created)
			}}</span>
		</div>
		<div :class="['page-meta__item', 'page-meta__item_updated']">
			<span :class="['page-meta__label', dark && 'page-meta__label_dark']"
				>Последняя редакция</span
			>
			<span :class="['page-meta__date', dark && 'page-meta__date_dark']">{{
				dateFormat(updated)
			}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PageMeta',

		components: {},

		props: {
			author: {
				type: String,
			},

			created: {
				type: String,
				required: true,
			},

			updated: {
				type: String,
				required: true,
			},

			dark: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {
			dateFormat(timestamp) {
				let date = new Date(timestamp),
					d = date.getDate(),
					m = date.getMonth() + 1,
					y = date.getFullYear()

				return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
			},
		},
	}
</script>

<style lang="scss">
	$ico-user: url('~assets/i/ico-user.svg?data');
	$ico-calendar: url('~assets/i/ico-calendar.svg?data');
	$ico-updated: url('~assets/i/ico-updated.svg?data');

	.page-meta {
		margin-bottom: 32px;
		display: flex;
		&__wrap {
			margin-bottom: 32px;
			display: inline-block;
		}
		&__item {
			margin-right: 30px;
			padding-left: 20px;
			display: inline-block;
			position: relative;
			line-height: 16px;
			&:before {
				content: '';
				position: absolute;
				top: 2px;
				left: 0;
				display: block;
				width: 12px;
				height: 12px;
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
			}

			&_author {
				vertical-align: middle;
				&:before {
					opacity: 0.5;
					background-image: $ico-user;
				}
				&_dark {
				}
			}

			&_created {
				vertical-align: middle;
				&:before {
					opacity: 0.5;
					background-image: $ico-calendar;
				}
			}

			&_updated {
				vertical-align: middle;
				&:before {
					opacity: 0.5;
					background-image: $ico-updated;
				}
			}
		}

		&__name {
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 12px;
			white-space: nowrap;
			letter-spacing: -0.2px;
			color: #ffffff;
			opacity: 0.8;
			vertical-align: middle;
			&_dark {
				color: #555555;
			}
		}

		&__label {
			font-family: 'Proxima Nova';
			white-space: nowrap;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			color: #ffffff;
			opacity: 0.5;
			vertical-align: middle;
			&_dark {
				color: #555555;
			}
		}

		&__date {
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 12px;
			letter-spacing: -0.2px;
			color: #ffffff;
			opacity: 0.8;
			vertical-align: middle;
			&_dark {
				color: #555555;
			}
		}
	}

	@include mq('laptop') {
		.page-meta {
			&__label {
				display: none;
			}
		}
	}

	@include mq('tablet') {
		.page-meta {
			&__label {
				display: block;
			}
		}
	}

	@include mq('mobile') {
		.page-meta {
			&__item {
				margin-right: 16px;
			}
			&__label {
				white-space: pre-wrap;
			}
		}
	}
</style>
