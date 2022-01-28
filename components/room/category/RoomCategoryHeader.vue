<template>
	<div
		:class="['rooms-header', page.is_blacklist && 'rooms-header_blacklist']"
	>
		<breadcrumb-list
			:white="true"
			:auto="false"
			class="rooms-header__breadcrumbs"
		>
			<breadcrumb-item
				v-if="page.slug !== 'best-poker-rooms-2020'"
				slug="best-poker-rooms-2020"
				:title="$t('menu.best_rooms')"
				:index="1"
				:parent="{
					slug: 'rakeback-deals'
				}"
				:last="page.slug !== 'best-poker-rooms-2020' ? false : true"
				:white="true"
			></breadcrumb-item>
			<breadcrumb-item
				:slug="page.slug"
				:title="page.title"
				:index="page.slug !== 'best-poker-rooms-2020' ? 2 : 1"
				:parent="{
					slug: 'rakeback-deals'
				}"
				:last="true"
				:white="true"
			></breadcrumb-item>
		</breadcrumb-list>

		<div class="rooms-header__about">
			<div class="rooms-meta__wrap">
				<svg-icon 
					class="rooms-header__icon"
					width="90px"
					height="68px"
					:image="true"
					:icon="page.pageable.icon"
				/>
				<h1 class="rooms__title">{{ page.title }}</h1>
				<page-meta
					class="rooms-meta__meta"
					:title="false"
					:author="page.author.full_name"
					:created="page.created_at"
					:updated="page.updated_at"
				>
				</page-meta>
			</div>
			<common-text-spoiler
				:limit="$device.isMobile || $device.isTablet ? 100 : 600"
				class="rooms__summary"
				:text="page.summary"
			>
				<template v-slot:button>
					<svg-icon icon="spoiler-sep" width="35" height="16" />
				</template>
			</common-text-spoiler>
		</div>

		<lazy-hydrate when-visible>
			<template>
				<div class="rooms-header__bonus">
					<room-top
						v-if="best && !loading"
						class="room-header__room-top"
						:id="best.id"
						:title="best.title"
						:slug="best.slug"
						:url="best.url"
						:restricted="best.restricted"
						:country="country"
						:rating="best.rating"
						:bonus="best.top_bonus"
						:review="best.review"
						:label="$t('room_best')"
					/>
					<skeleton-top-room
						v-else
						class="room-header__room-top"
						:label="$t('room_best')"
					/>
				</div>
			</template>
		</lazy-hydrate>

		<div class="rooms-header__nav">
			<nav-list>
				<nav-item
					v-for="(item, index) in categories"
					:key="index"
					:name="item.label"
					:page="item.page"
					:icon="item.icon_small"
				/>
			</nav-list>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import LazyHydrate from 'vue-lazy-hydration'

	export default {
		components: {
			LazyHydrate,
		},

		head() {
			return {
				link: [
					{rel: 'preload', href: require(`~/assets/i/rooms-bg.webp`), as: 'image'}
				],
			}
		},

		props: {
			loading: {
				type: [Boolean, Number],
				default: true,
			}
		},

		data: () => ({}),

		mounted() {},

		computed: {
			...mapGetters({
				page: 'pages/page',
				topList: 'rooms/topList',
				country: 'location/country',
				category: 'rooms/category',
				categories: 'rooms/categories',
				best: 'rooms/best',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	$rooms-bg: url('~assets/i/rooms-bg.webp');
	.rooms {
		&-header {
			max-width: 1440px;
			width: 100%;
			@include paddings('desktop');
			margin-bottom: 55px;
			background: $rooms-bg no-repeat center top;
			background-size: cover;
			display: grid;
			grid-column-gap: 28px;
			grid-row-gap: 8px;
			grid-template-columns: [first] minmax(0, 2fr) [second] minmax(0, 1fr);
			grid-template-rows: auto 1fr;
			grid-template-areas:
				'breadcrumbs bonus'
				'about bonus'
				'nav nav';
			&_blacklist {
				background: linear-gradient(0deg, #111111, #111111),
					radial-gradient(
						96.88% 66.11% at 57.43% 2.13%,
						#3a3e51 0%,
						#583e11 100%
					);
			}
			&__breadcrumbs {
				grid-area: breadcrumbs;
			}

			&__about {
				grid-area: about;
				padding-left: 60px;
			}

			&__bonus {
				grid-area: bonus;
				display: flex;
				padding-top: 32px;
				justify-content: center;
				min-height: 350px;
			}

			&__nav {
				grid-area: nav;
				max-width: 100%;
				height: 52px;
				margin-top: 24px;
				margin-bottom: -26px;
				.page-nav {
					height: 100%;
				}
			}

			&__icon {
				grid-column: icon;
				grid-row: span 2;
				margin-right: 28px;
				display: inline-block;
				vertical-align: top;
			}
		}

		&__title {
			grid-column: title;
			grid-row: 1;
			margin-bottom: 10px;
			font-family: 'Proxima Nova';
			font-weight: bold;
			font-style: normal;
			font-size: 32px;
			line-height: 36px;
			color: #ffffff;
		}

		&-meta {
			display: flex;
			&__wrap {
				display: grid;
				grid-template-columns: [icon] minmax(0, auto) [title] minmax(0, 1fr);
				grid-template-rows: auto auto;
			}
			&__meta {
				grid-column: 2;
				grid-row: 2;
			}
		}

		&__summary {
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: normal;
			font-size: 18px;
			line-height: 24px;
			color: #ffffff;
			opacity: 0.8;
		}
	}

	@include mq('desktop') {
		.rooms-header {
			grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
			&__about {
				padding-left: 0;
			}
		}
	}

	@include mq('laptop') {
		.rooms-header {
			@include paddings('tablet');
			background-size: cover;
			grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
			& &__icon {
				display: none;
			}
		}

		.rooms {
			&__summary {
				margin-bottom: 0;
			}
			&__info {
				width: 100%;
				/* TODO maybe do that for all article */
				.article__wrap {
					padding: 0;
				}
			}
		}
	}

	@include mq('tablet') {
		.rooms-header {
			@include paddings('mobile');
			grid-template-columns: 100%;
			grid-template-areas:
				'breadcrumbs'
				'about'
				'nav';
			& &__icon {
				display: inline-block;
				grid-column: icon;
				grid-row: 1;
			}
			&__bonus {
				display: none;
			}
			&__about {
				display: grid;
				grid-template-columns: 100%;
				grid-template-rows: auto auto;
			}
			&__icon {
				grid-column: 1;
				grid-row: 1;
			}
		}

		.rooms__title {
			font-size: 26px;
			line-height: 32px;
			grid-column: 2;
			grid-row: 1;
		}

		.rooms-meta {
			&__wrap {
				grid-row-gap: 16px;
				align-items: center;
				grid-column: 1;
				grid-row: 1;
			}
			&__meta {
				grid-column: span 2;
				grid-row: 2;
			}
		}

		.rooms__summary {
			grid-column: span 2;
			grid-row: 2;
			font-size: 17px;
			padding-bottom: 0;
		}
	}

	@include mq('mobile') {
		.rooms-header {
			@include paddings('mobile');
			&__about {
				grid-template-columns: 100%;
			}
		}
	}
</style>
