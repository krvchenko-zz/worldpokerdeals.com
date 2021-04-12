<template>
<div :class="['review-item']">
	<div :class="['review-item__wrap']">
		<div class="review-item__userpic">
			<img decoding="async" loading="lazy" class="review-item__userpic-img" :src="avatar" :alt="review.user.username">
		</div>
		<div class="review-item__content">
			<div class="review-item__meta">
				<span class="review-item__author">{{ review.user.username }}</span>
				<span class="review-item__date">{{ dateFormat(review.created_at) }}</span>
			</div>

			<div class="review-item__pros">{{ review.pros }}</div>
			<div class="review-item__cons">{{ review.cons }}</div>

			<div class="review-item__text">{{ review.text }}</div>

			<span class="review-item__reply-link" @click="handleReplyClick(review.id)">Ответить</span>
		</div>
	</div>
</div>
</template>

<script>

import eventBus from '~/utils/event-bus'

export default {

	name: 'ReviewsItem',

	components: {

	},

	props: {

		review: {
			type: Object,
			required: true
		}

	},

	created() {

	},

	mounted() {
		eventBus.$on('reply:click', data => {
			if (this.review.id === data.parent) {
				return this.showForm = true
			}
			this.showForm = false
		})
	},

	updated() {

	},

	data: () => ({
		selectedParent: null,
		showForm: false
	}),

	computed: {

		mediaUrl() {
			return process.env.mediaUrl
		},

		avatar() {
			return `${this.mediaUrl}/user-icon/${this.review.user.image.filename}`
		},

	},

	watch: {

	},

	methods: {

		handleReplyClick(id) {
			this.selectedParent = id
			this.showForm = !this.showForm
			eventBus.$emit('reply:click', { parent: id })
		},

		dateFormat(timestamp) {
			let date = new Date(timestamp),
					d = date.getDate(),
					m = date.getMonth() + 1,
					y = date.getFullYear()

			return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y
		},
	}
}
</script>

<style lang="scss">
$ico-review-pros: url('~assets/i/ico-review-pros.svg?data');
$ico-review-cons: url('~assets/i/ico-review-cons.svg?data');


.review-item {
	margin: 20px 0;
	background: #FAFAFA;
	border: 1px solid #E9E9E9;
	border-radius: 4px;

	&__wrap {
		padding: 30px;
		display: inline-flex;
		width: 100%;
		&_reply {
			padding: 0;
		}

	}

	&__content {
		padding-left: 16px;
		flex-grow: 1;
	}

	&_reply {
		padding-top: 22px;
		margin: 0;
		background: transparent;
		border: 0;
		border-radius: 0;
	}

	&__reply-link {
		cursor: pointer;
		font-family: 'Proxima Nova';
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 16px;
		color: #008BE2;
		border-bottom: 1px dashed #008BE2;
		&:active,
		&:hover,
		&:visited {
			color: #008BE2;
			text-decoration: none;
			border-bottom: 0;
		}
	}

	&__info {
		margin-bottom: 10px;
	}

	&__meta {
		margin-bottom: 12px;
		display: flex;
		flex-flow: column;
	}

	&__userpic {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		border: 2px solid #E9E9E9;
		box-sizing: content-box;
		flex: 0 0 40px;
	}

	&__author {
		margin-bottom: 4px;
		font-family: 'Proxima Nova Sb';
		font-style: normal;
		font-size: 16px;
		line-height: 20px;
		color: #222222;
	}

	&__date {
		font-family: 'Proxima Nova';
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
		line-height: 16px;
		color: #555555;
		opacity: 0.7;
	}

	&__text {
		margin-bottom: 10px;
		font-family: 'Proxima Nova';
		font-style: normal;
		font-weight: normal;
		font-size: 15px;
		line-height: 18px;
		color: #555555;
	}

	&__replies {
		// padding-top: 24px;
	}

	&__pros {
		margin-bottom: 16px;
		position: relative;
		padding-left: 34px;
		font-family: 'Proxima Nova';
		font-size: 15px;
		line-height: 18px;
		color: #555555;
	&:before {
	  content: '';
	  width: 18px;
	  height: 16px;
	  display: block;
	  position: absolute;
	  left: 0;
	  top:0;
	  background: $ico-review-pros no-repeat center;
	}
	}

	&__cons {
		border-bottom: 1px solid #E5E5E5;
		padding-bottom: 16px;
		margin-bottom: 16px;
		position: relative;
		padding-left: 34px;
		font-family: 'Proxima Nova';
		font-size: 15px;
		line-height: 18px;
		color: #555555;
	&:before {
	  content: '';
	  width: 18px;
	  height: 16px;
	  display: block;
	  position: absolute;
	  left: 0;
	  top:0;
	  background: $ico-review-cons no-repeat center;
	}
	}
}
</style>