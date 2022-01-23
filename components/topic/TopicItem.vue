<template>
	<div class="topic-item">
		<div class="topic-item__wrap">
			<nuxt-link
				v-slot="{ href, route, navigate, isActive, isExactActive }"
				:to="url"
			>
				<a :class="['topic-item__link']" :href="href" @click="navigate">{{
					title
				}}</a>
			</nuxt-link>
<!-- 			<div class="topic-item__meta">
				<div v-if="author" class="topic-item__author">
					<img
						decoding="async"
						width="20px"
						height="20px"
						class="topic-item__author-pic"
						:src="avatar"
						:alt="author.full_name"
						loading="lazy"
					/>
					<span class="topic-item__author-name">{{ author.full_name }}</span>
				</div>

				<span class="topic-item__date">{{ dateFormat(created) }}</span>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TopicItem',

		components: {},

		props: {
			title: {
				type: String,
			},

			url: {
				type: String,
			},

			author: {
				type: Object,
			},

			created: {
				type: String,
			},
		},

		data: () => ({}),

		computed: {
			avatar() {
				return `${this.mediaUrl}/user-square/${this.author.image.filename}`
			},
			mediaUrl() {
				return process.env.mediaUrl
			},
		},

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
	$ico-topic: url('~assets/i/ico-topic.svg?data');

	.topic-item {
		position: relative;
		background: #fafafa;
		border: 1px solid #e9e9e9;
		border-bottom: 0;
		&:first-child {
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
		}
		&:last-child {
			border-bottom: 1px solid #e9e9e9;
		}
		&:before {
			content: '';
			left: 20px;
			top: 20px;
			width: 40px;
			height: 40px;
			display: block;
			position: absolute;
			background: $ico-topic no-repeat center;
		}
		&__wrap {
			padding: 20px 20px 20px 80px;
		}
		&__link {
			margin-bottom: 8px;
			display: block;
			font-family: 'Proxima Nova Sb';
			font-size: 16px;
			line-height: 20px;
			letter-spacing: -0.1px;
			color: #222222;
			text-decoration: none;
			&:hover,
			&:active,
			&:visited,
			&:focus {
				color: #222222;
				text-decoration: none;
			}
		}
		&__meta {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-flow: wrap;
		}
		&__author {
			display: flex;
			align-items: center;
			margin-right: 10px;
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
		}
		&__date {
			font-family: 'Proxima Nova';
			font-size: 12px;
			line-height: 16px;
			color: #999999;
		}
	}
</style>
