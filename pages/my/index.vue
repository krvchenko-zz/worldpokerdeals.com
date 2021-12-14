<template>
 <div class="content content_my">
	 <div class="container-fluid">
		<div class="row">
			<div class="col-3">
				<my-nav-list>
					<my-nav-item
						v-for="(item, index) in navs"
						:key="index"
						:name="item.name"
						:title="$t(item.name)"
					/>
				</my-nav-list>
			</div>
			<div class="col-6"><NuxtChild /></div>
			<div class="col-3">
				<room-top-list />
			</div>
		</div>
	 </div>
 </div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		components: {},
		layout: 'basic',
		// mixins: [pageMixin],

		middleware: 'auth',

		props: {},

		data: () => ({
			navs: [
				{
					name: 'my.info',
				},
				{
					name: 'my.connections',
				},
				{
					name: 'my.payments',
				},
				{
					name: 'my.password',
				},
			],
		}),

		async fetch() {
			await this.$axios.get('user', {
				params: {
					locale: this.locale,
					with: ['connections', 'paymentInfos.currency', 'paymentInfos.method'],
				}
			}).then(response => {
				this.$store.dispatch('auth/updateUser', response.data)
			})
		},

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	// $contact-us-bg: url('~assets/i/contact-us-bg.jpg');

	@include mq('desktop') {

	}

	@include mq('laptop') {

	}

	@include mq('tablet') {

	}

	@media (max-width: 415px) {

	}

	@media (max-width: 376px) {

	}
</style>
