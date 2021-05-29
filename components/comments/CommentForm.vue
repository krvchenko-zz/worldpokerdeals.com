<template>
	<div class="comment-form">
		<form
			class="comment-form__form"
			@submit.prevent="create"
			@keydown="form.onKeydown($event)"
		>
			<div class="comment-form__textarea-wrap">
				<textarea
					v-model="form.text"
					:class="[
						'comment-form__textarea',
						form.errors.has('text') && 'has-error',
					]"
					name="text"
				></textarea>
				<transition name="fade">
					<has-error :form="form" field="text" />
				</transition>
			</div>
			<div class="comment-form__submit">
				<button class="btn btn-primary" type="submit" :loading="loading">
					{{ $t('leave_comment') }}
				</button>
			</div>
		</form>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'

	import eventBus from '~/utils/event-bus'

	export default {
		name: 'CommentForm',

		components: {},

		props: {
			commentable_id: {
				type: Number,
				required: true,
			},

			commentable_type: {
				type: String,
				required: true,
			},

			parent_id: {
				type: Number,
				default: null,
			},

			show: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({
			loading: false,
			form: new Form({
				text: null,
				commentable_id: null,
				commentable_type: null,
				user_id: null,
				parent_id: null,
				status: 1,
			}),
		}),

		mounted() {},

		created() {},

		computed: {
			...mapGetters({
				user: 'auth/user',
				comments: 'comments/comments',
			}),
		},

		watch: {
			commentable_id: {
				immediate: true,
				handler(val) {
					this.form.commentable_id = val
				},
			},

			commentable_type: {
				immediate: true,
				handler(val) {
					this.form.commentable_type = val
				},
			},

			parent_id: {
				immediate: true,
				handler(val) {
					this.form.parent_id = val
				},
			},

			user: {
				deep: true,
				immediate: true,
				handler(val) {
					this.form.user_id = val.id
				},
			},
		},

		methods: {
			async create() {
				this.$nuxt.$loading.start()
				this.loading = true

				await this.form
					.post('/comments')
					.then(response => {
						this.$emit('created', response.data)
						this.form.text = null
						this.$emit('created', response.data)
					})
					.catch(error => {
						let errors = this.form.errors.flatten()

						this.loading = false
						this.$nuxt.$loading.finish()
					})

				await this.$axios
					.get('comments/list', {
						params: {
							per_page: parseInt(this.comments.per_page),
							sort: 'created_at',
							order: 'desc',
							commentable_id: this.commentable_id,
							commentable_type: this.commentable_type,
						},
					})
					.then(response => {
						this.$store.commit('comments/FETCH_COMMENTS', {
							comments: response.data,
						})
						this.$nuxt.$loading.finish()
					})
			},
		},
	}
</script>

<style lang="scss">
	.comment-form {
		margin: 20px 0 0 0;
		&__textarea {
			width: 100%;
			padding: 16px;
			display: block;
			background: #ffffff;
			border: 1px solid #c9c9c9;
			box-sizing: border-box;
			border-radius: 4px;
			font-family: 'Proxima Nova';
			font-style: normal;
			font-weight: normal;
			font-size: 15px;
			line-height: 18px;
			color: #777777;
			&-wrap {
				margin-bottom: 20px;
			}
			&:focus,
			&:active,
			&:hover {
				outline: none;
			}
		}
	}
</style>
