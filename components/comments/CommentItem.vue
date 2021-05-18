<template>
	<div :class="['comment-item', comment.parent_id && 'comment-item_reply']">
		<div
			:class="[
				'comment-item__wrap',
				comment.parent_id && 'comment-item__wrap_reply',
			]"
		>
			<div class="comment-item__userpic">
				<img
					decoding="async"
					loading="lazy"
					class="comment-item__userpic-img"
					:src="avatar"
					:alt="comment.user.username"
				/>
			</div>
			<div class="comment-item__content">
				<div class="comment-item__meta">
					<span class="comment-item__author">{{ comment.user.username }}</span>
					<span class="comment-item__date">{{
						dateFormat(comment.created_at)
					}}</span>
				</div>
				<div class="comment-item__text">{{ comment.text }}</div>

				<span
					v-if="user"
					class="comment-item__reply-link"
					@click="handleReplyClick(comment.id)"
					>Ответить</span
				>

				<transition name="fade" leave-active-class="">
					<comment-form
						v-if="showForm && comment.id === selectedParent"
						:parent_id="comment.id"
						:commentable_id="comment.commentable_id"
						:commentable_type="comment.commentable_type"
						@created="showForm = false"
					></comment-form>
				</transition>

				<div v-if="comment.replies" class="comment-item__replies">
					<transition-group name="fade">
						<comment-item
							v-for="item in comment.replies"
							:key="item.id"
							:comment="item"
						>
						</comment-item>
					</transition-group>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import CommentList from '~/components/comments/CommentList'
	import CommentItem from '~/components/comments/CommentItem'
	import CommentForm from '~/components/comments/CommentForm'
	import eventBus from '~/utils/event-bus'

	export default {
		name: 'CommentItem',

		components: {
			CommentList,
			CommentItem,
			CommentForm,
		},

		props: {
			comment: {
				type: Object,
				required: true,
			},
		},

		data: () => ({
			selectedParent: null,
			showForm: false,
		}),

		created() {},

		mounted() {
			eventBus.$on('reply:click', data => {
				if (this.comment.id === data.parent) {
					return (this.showForm = true)
				}
				this.showForm = false
			})
		},

		updated() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
			}),

			mediaUrl() {
				return process.env.mediaUrl
			},

			avatar() {
				return `${this.mediaUrl}/user-icon/${this.comment.user.image.filename}`
			},
		},

		watch: {},

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
		},
	}
</script>

<style lang="scss">
	.comment-item {
		margin: 20px 0;
		background: #fafafa;
		border: 1px solid #e9e9e9;
		border-radius: 4px;

		&__wrap {
			padding: 20px;
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
			color: #008be2;
			border-bottom: 1px dashed #008be2;
			&:active,
			&:hover,
			&:visited {
				color: #008be2;
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
			border: 2px solid #e9e9e9;
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
	}
</style>
