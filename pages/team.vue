<template>
	<div class="content content_team">
		<div class="team">
			<div class="team-top"></div>

			<div class="team-managers">
				<h1 class="team-managers__title">Наша команда</h1>
				<!-- <team-list> -->
				<div class="team-managers__list">
					<team-item
						class="team-managers__manager"
						v-for="(item, index) in managers"
						:key="index"
						:name="item.name"
						:position="item.position"
						:email="item.email"
						:telegram="item.telegram"
						:skype="item.skype"
						:whatsapp="item.whatsapp"
						:facebook="item.facebook"
						:locales="item.locales"
						:image="item.image"
					/>
				</div>
				<!-- </team-list> -->
			</div>

			<article class="team-about">
				<div class="team-about__text">
					<h2 class="team-about__title">Кто мы такие?</h2>
					<div class="team-about__summary">
						Мы — компания креативных покерных игроков и менеджеров,
						зарегистрированная в Великобритании под брендом "BOSSLIKE GAMING
						LP", расселенная и путешествующая по всему миру — Юго-Восточной
						Азии, Америке, Европе, Украине, России и даже Южной Америке в
						поисках крутых эмоций и хорошей игры.
					</div>
					<p>
						Наш проект начался в 2014 году, как авторский блог и небольшой
						самодельный сайт с несколькими азиатскими покер-румами.
					</p>
					<blockquote class="blockquote blockquote_img">
						<div class="blockquote__img">
							<img
								src="https://media.worldpokerdeals01.com/images/manager-small/d89efd0343de59bb68cec06e721343a0.jpg"
							/>
						</div>
						<p class="blockquote__author">Родион Лонга:</p>
						<p>
							<b
								>«Отыграв в Heads Up Cash профессионально на протяжении 6 лет, я
								всегда понимал влияние гейм-селекта на винрейт и находился в
								поиске «мягких» румов с невысокой конкуренцией со стороны
								собратьев по Холдем Менеджеру»</b
							>
						</p>
					</blockquote>
					<p>
						Это породило идею — создать проект, который даст возможность катать
						в наиболее «лояльных» составах, получая весь «пакет» по доступу и
						сопровождению игры: финансовые операции, необходимый софт,
						бесплатный майнинг, гарантии на депозиты, VPN-сервисы, а главное —
						<b>лучший саппорт доступный на рынке покерных аффилейтов.</b>
					</p>
					<div class="team-about-sep">
						<span class="team-about-sep__item"></span>
						<span class="team-about-sep__item"></span>
						<span class="team-about-sep__item"></span>
					</div>
					<p>
						С тех пор мы прошли долгий путь: росла наша команда, добавлялись
						новые сети, сделки, условия. В 2017 мы
						<b>вышли на рынки Америки, Латинской Америки и Европы.</b>В 2019
						году <b>получили две премии на церемонии iGB Awards в Лондоне</b>,
						как лучший покерный сайт и лучший зарубежный аффилейт.
					</p>
					<p>
						На сегодняшний день мы, без скромности, предлагаем самый широкий
						<nuxt-link
							v-slot="{ href, route, navigate, isActive, isExactActive }"
							prefetch
							:to="{
								name: 'index',
								params: { parent: 'online-poker-networks' },
							}"
						>
							<a :href="href" @click="navigate">выбор сетей</a>,
						</nuxt-link>
						<nuxt-link
							v-slot="{ href, route, navigate, isActive, isExactActive }"
							prefetch
							:to="{
								name: 'index',
								params: {
									parent: 'rakeback-deals',
									child: 'best-poker-rooms-2020',
								},
							}"
						>
							<a :href="href" @click="navigate">румов</a>,
						</nuxt-link>
						<nuxt-link
							v-slot="{ href, route, navigate, isActive, isExactActive }"
							prefetch
							:to="{ name: 'vip' }"
						>
							<a :href="href" @click="navigate">VIP-сервис</a>
						</nuxt-link>
						для фулл-тайм игроков, и самое главное —
						<b
							>единственный трастовый сервис для игры в приложениях и частных
							клубах.</b
						>
					</p>
				</div>

				<div class="team-about__picture team-picture">
					<img
						class="team-picture__img"
						decoding="async"
						loading="lazy"
						src="~assets/i/about-img.png"
						alt="our team"
					/>
					<blockquote
						class="team-picture__blockquote"
						cite="http://example.com/facts"
					>
						<p>
							Лонга на связи — главный и ответственный за все, что происходит на
							Worldpokerdeals
						</p>
					</blockquote>
				</div>
				<div class="team-about__history team-history">
					<h2 class="team-history__label">История Worldpokerdeals</h2>
					<ul class="team-history__list">
						<li
							v-for="(item, index) in history"
							:key="index"
							:class="[
								'team-history__item',
								item.year && 'team-history__item_year',
								item.big && 'team-history__item_big',
								item.inactive && 'team-history__item_inactive',
							]"
						>
							<span
								v-if="item.year"
								:class="[
									'team-history__year',
									item.big && 'team-history__year_big',
									item.inactive && 'team-history__year_inactive',
								]"
								>{{ item.year }}</span
							>
							<span
								:class="[
									'team-history__title',
									item.big && 'team-history__title_big',
									item.inactive && 'team-history__title_inactive',
								]"
								>{{ item.title }}</span
							>
							<span
								:class="[
									'team-history__text',
									item.big && 'team-history__text_big',
									item.inactive && 'team-history__text_inactive',
								]"
								>{{ item.text }}</span
							>
						</li>
					</ul>
				</div>
			</article>

			<div class="team-slides">
				<img
					class="team-slides__img"
					decoding="async"
					loading="lazy"
					src="~assets/i/about-slides.png"
					alt="our team"
				/>
			</div>

			<div class="team-features">
				<div class="team-features__title">Наши принципы</div>
				<div class="team-feature__list">
					<div
						class="team-feature"
						v-for="(item, index) in features"
						:key="index"
					>
						<img
							class="team-feature__img"
							decoding="async"
							loading="lazy"
							:src="require(`~/assets/i/about-feature-${index + 1}.png`)"
							alt="our team"
						/>
						<div class="team-feature__wrap">
							<div class="team-feature__title" v-html="item.title"></div>
							<div class="team-feature__text">{{ item.text }}</div>
						</div>
					</div>
				</div>

				<div>
					<div class="team-numbers__title">Мы в цифрах</div>
					<div class="team-numbers">
						<div
							v-for="(item, index) in numbers"
							:key="index"
							class="team-number"
						>
							<span class="team-number__value">{{ item.value }}</span>
							<span class="team-number__label" v-html="item.label"></span>
						</div>
					</div>
				</div>
			</div>

			<div class="team-contacts">
				<div class="team-contacts__title">
					Остались вопросы? Напишите нам
				</div>

				<contacts-form class="team-contacts__contacts" style="margin: 0;" />

				<div class="team-contacts__social">
					<div class="team-contacts__info">
						Или свяжитесь с нами в социальных<br />сетях, мессенджерах или
						онлайн чате
					</div>
					<div
						v-if="managers && managers.length"
						class="team-contacts__buttons"
					>
						<button-contact
							icon
							size="md"
							type="telegram"
							href="@kapitonoff"
						/>
						<button-contact
							icon
							size="md"
							type="whatsapp"
							href="+66956396293"
						/>
						<button-contact
							icon
							size="md"
							type="skype"
							href="anton.wpd"
						/>
						<button-contact
							icon
							size="md"
							type="fb"
							href="https://www.facebook.com/worldpokerdealsRu"
						/>
						<button-contact
							icon
							size="md"
							type="instagram"
							href="https://instagram.com/worldpokerdeals"
						/>
						<button-contact
							icon
							size="md"
							type="vk"
							href="https://vk.com/worldpokerdeals"
						/>
					</div>
					<button-contact block size="md" type="chat" style="max-width: 208px; height: initial; width: initial;"
						>Начать чат</button-contact
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from 'axios'

	export default {
		components: {},
		layout: 'basic',

		async middleware({ store, redirect, params, $axios }) {
			await $axios
				.get('pages/our-team')
				.then(response => {
					store.commit('pages/FETCH_PAGE', { page: response.data })
				})
				.catch(error => {})
		},

		head() {
			return {
				title: this.page.meta_title,
				titleTemplate: '%s',
				meta: [
					{ name: 'description', content: this.page.meta_description },
					{ name: 'keywords', content: this.page.meta_keywords },
				],
			}
		},

		props: {},

		data: () => ({
			managers: [],
			history: [
				{
					year: '2014',
					title: 'Регистрация домена',
					text: 'Был зарегистрирован домен worldpokerdeals.com',
				},
				{
					year: null,
					title: 'Начало авторского блога',
					text: 'Первые посты и размещение нескольких азиатских румов',
				},
				{
					year: '2015',
					title: 'Первая версия сайта',
					text:
						'Мно всех полят вате применить ко дейсть колять отменивнению в контекс',
				},
				{
					year: '2016',
					title: 'Набирается команда Worldpokerdeals',
					text: null,
				},
				{
					year: '2017',
					big: true,
					title: 'Выход на рынки Америки, Латинской Америки и Европы',
					text:
						'Мно всех полят вате применить ко дейсть колять отменивнению в контекс',
				},
				{
					year: null,
					title: 'Нументные вать и вывать и свода веровто',
					text:
						'Мнострабойте веримень прогладется блицы можется срачновает аботы зате полько ствия',
				},
				{
					year: '2018',
					title: 'Запуск собственной партнерской программы',
					text:
						'Мно всех полят вате применить ко дейсть колять отменивнению в контекс',
				},
				{
					year: '2019',
					title: 'Получение премии на iGB Awards',
					text:
						'Премия в номинациях лучший покерный сайт и лучший зарубежный аффилейт',
				},
				{
					year: null,
					title: 'Обновление структуры и дизайна сайта',
					text: null,
				},
				{
					year: '2020',
					title: 'Пережили пандемию COVID-19',
					text:
						'Премия в номинациях лучший покерный сайт и лучший зарубежный аффилейт',
				},
				{
					year: '2030',
					title: 'Организация первого покерного турнира на марсе',
					text: null,
					inactive: true,
				},
			],

			features: [
				{
					title: 'Давать<br>велью',
					text:
						'Наша цель — обеспечивать игроков и партнёров лучшими условиями, чем они могли бы получить в любом другом месте',
				},
				{
					title: 'Не прятать<br>лиц',
					text:
						'Надежность аффилейта во многом определяется публичностью его команды. За нашим сервисом всегда стоят реальные люди с большим покерным бэкграундом',
				},
				{
					title: 'Получать<br>фан',
					text:
						'Мы занимаемся своей работой с удовольствием, потому что наживаем на том, что помогаем наживать другим',
				},
				{
					title: 'Жить<br>активно',
					text:
						'Мы любим работать, но еще больше обожаем отдыхать: заниматься спортом, играть в мафию, устраивать техно-вечеринки и, конечно, путешествовать',
				},
			],

			numbers: [
				{
					label: 'Лет на <br> рынке',
					value: '7',
				},
				{
					label: 'Покерныx <br> румов',
					value: '150',
				},
				{
					label: 'Клубов',
					value: '26',
				},
				{
					label: 'Партнеров',
					value: '70',
				},
				{
					label: 'Активныx <br> игроков',
					value: '10 000',
				},
				{
					label: 'Аффилейт-менеджеров <br> в команде',
					value: '10',
				},
			],
		}),

		async fetch() {
			await this.$axios
				.get('/managers', {
					params: {
						locale: this.locale,
					},
				})
				.then(response => {
					this.managers = response.data.map(item => ({
						id: item.id,
						image: item.image
							? {
									filename: item.image.filename,
							  }
							: null,
						name: item.name,
						position: item.position,
						telegram: item.telegram,
						skype: item.skype,
						whatsapp: item.whatsapp,
						facebook: item.facebook,
						email: item.email,
						locales: item.locales,
					}))
				})
		},

		created() {},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				page: 'pages/page',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style lang="scss">
	$team-cite-bg: url('~assets/i/team-cite-bg.svg?data');
	$ico-quote-tail: url('~assets/i/ico-quote-tail.svg?data');
	$team-cite-bg-mobile: url('~assets/i/team-cite-bg-mobile.svg?data');
	$about-map-bg: url('~/assets/i/about-map-bg.png');

	.team {
		max-width: 1440px;
		width: 100%;
	}

	.team-contacts {
		display: grid;
		grid-template-columns: 600px minmax(auto, max-content);
		grid-template-areas:
			'title .'
			'contacts social';
		justify-content: center;
		column-gap: 146px;
		row-gap: 32px;
		margin-top: 44px;
		&__title {
			grid-area: title;
			font-family: 'Proxima Nova Sb';
			font-size: 28px;
			line-height: 32px;
			letter-spacing: -0.2px;
			color: #222222;
		}
		&__social {
			grid-area: social;
		}

		&__info {
			margin-bottom: 20px;
			font-family: Proxima Nova;
			font-size: 17px;
			line-height: 21px;
			color: #555555;
		}

		&__buttons {
			display: flex;
			flex-flow: wrap;
		}
		&__contacts {
			grid-area: contacts;
			max-width: 600px;
		}

		.btn-contact {
			margin: 0 20px 20px 0;
			&:last-child {
				margin-right: 0;
			}
		}
	}

	.team-numbers {
		position: relative;
		display: flex;
		justify-content: center;
		overflow-x: scroll;
		@include hide-scroll();
		@include paddings('desktop');
		&:before {
			content: '';
			width: 100%;
			position: absolute;
			height: 1px;
			background: #464b62;
			top: 61px;
		}
		&__title {
			margin-bottom: 24px;
			font-family: 'Proxima Nova Sb';
			font-size: 28px;
			line-height: 32px;
			text-align: center;
			letter-spacing: -0.2px;
			color: #cccccc;
		}
	}

	.team-number {
		margin-right: 100px;
		position: relative;
		&:last-child {
			margin: 0;
		}
		&__value {
			padding-bottom: 12px;
			margin-bottom: 16px;
			position: relative;
			display: inline-block;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 41px;
			line-height: 50px;
			letter-spacing: -1px;
			font-feature-settings: 'salt' on;
			color: #ffffff;
			white-space: nowrap;
			&:after {
				content: '';
				left: 0;
				bottom: 0px;
				position: absolute;
				width: 100%;
				height: 4px;
				display: block;
				background: #5f6377;
			}
		}

		&__label {
			display: block;
			font-family: Proxima Nova;
			font-size: 16px;
			line-height: 20px;
			color: #90939d;
		}
	}

	.team-features {
		padding-top: 300px;
		padding-bottom: 44px;
		clip-path: polygon(0 10%, 100% 0, 100% 100%, 0% 100%);
		background: radial-gradient(
			96.88% 71.32% at 57.43% -5.58%,
			#3a3e51 0%,
			#1d1f2c 100%
		);
		&__title {
			margin-bottom: 32px;
			font-family: 'Proxima Nova Sb';
			font-size: 28px;
			line-height: 32px;
			text-align: center;
			letter-spacing: -0.2px;
			color: #cccccc;
		}
	}

	.team-top {
		position: relative;
		min-height: 573px;
		background-image: url('~assets/i/about-bg.jpg');
		background-position: center;
		background-size: cover;
	}

	.team-managers {
		position: relative;
		@include paddings('desktop');
		&:before {
			content: '';
			top: 0;
			left: 0;
			position: absolute;
			display: block;
			z-index: -1;
			width: 100%;
			height: calc(100% - 86px);
			background: linear-gradient(0deg, #262937, #262937),
				radial-gradient(96.88% 74.8% at 57.43% 2.41%, #3a3e51 0%, #1d1f2c 100%);
			transform: matrix(-1, 0, 0, 1, 0, 0);
			clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 92%);
		}
		&__list {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			column-gap: 28px;
			row-gap: 68px;
		}
		&__title {
			position: relative;
			margin-bottom: 72px;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 36px;
			line-height: 42px;
			text-align: center;
			color: #ffffff;
		}
	}

	.team-about {
		margin-top: 60px;
		display: grid;
		grid-template-columns: 144px 562px 28px 1fr 60px;
		grid-template-areas:
			'. text . picture .'
			'. text . history .';
		padding-bottom: 19px;
		position: relative;
		background: $about-map-bg no-repeat -26px bottom;
		background-size: 852px;
		&__text {
			grid-area: text;
		}
		&__picture {
			grid-area: picture;
		}
		&__history {
			grid-area: history;
		}
		&-sep {
			display: flex;
			align-items: center;
			justify-content: center;
			&__item {
				margin-right: 10px;
				border-radius: 50%;
				display: block;
				width: 5px;
				height: 5px;
				background: #cccccc;
				&:last-child {
					margin: 0;
				}
			}
		}

		&__title {
			margin: 0 0 20px 0;
			font-family: 'Proxima Nova Th';
			font-style: normal;
			font-size: 28px;
			line-height: 32px;
			letter-spacing: -0.2px;
			color: #222222;
		}
		p {
			margin: 25px 0;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: normal;
			font-size: 17px;
			line-height: 21px;
			color: #555555;
		}
		&__summary {
			margin-bottom: 25px;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: bold;
			font-size: 18px;
			line-height: 24px;
			color: #555555;
		}

		.blockquote {
			margin-left: -26px;
			position: relative;
			font-family: 'Proxima Nova Sb';
			font-style: normal;
			font-size: 16px;
			line-height: 21px;
			color: #000000;
			&:after {
				content: '';
				display: block;
				width: 22px;
				height: 22px;
				position: absolute;
				bottom: -22px;
				left: 30px;
				background: $ico-quote-tail no-repeat center;
			}
			&_img {
				margin-bottom: 44px;
				padding: 20px;
				background: linear-gradient(0deg, #fafafa, #fafafa), #ffffff;
				border: 1px solid #e9e9e9;
				box-sizing: border-box;
				border-radius: 4px;
				border-top-color: #3c9be0;
				border-top-width: 2px;
				p {
					padding: 0 0 0 65px;
					&:last-child {
						margin: 0;
					}
				}
			}
			&__img {
				margin-right: 20px;
				width: 45px;
				float: left;
				overflow: hidden;
				img {
					display: block;
					max-width: 45px;
					height: auto;
					clip-path: circle(50% at 50% 50%);
				}
			}
			&__author {
				margin: 0;
				font-family: 'Proxima Nova Sb';
				font-style: normal;
				font-size: 14px;
				line-height: 23px;
				color: #979797;
			}
		}
	}

	.team-picture {
		margin-top: -334px;
		position: relative;
		&__wrap {
		}
		&__img {
			position: relative;
			max-width: 100%;
			height: auto;
			filter: drop-shadow(-10px 20px 50px rgba(0, 0, 0, 0.2));
		}

		&__blockquote {
			position: relative;
			margin: -76px 0 28px 0;
			right: -108px;
			max-width: 531px;
			padding: 86px 56px 56px 48px;
			background: $team-cite-bg no-repeat center;
			background-size: contain;
			p {
				margin: 0;
				font-family: 'Proxima Nova Th';
				font-size: 20px;
				line-height: 24px;
				text-align: center;
				color: #222222;
			}
		}
	}

	.team-history {
		padding: 0 0 0 124px;
		&__list {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		&__item {
			padding: 0 0 20px 118px;
			position: relative;
			width: 326px;
			box-sizing: content-box;
			&:before {
				content: '';
				top: 3px;
				left: 81px;
				position: absolute;
				height: 10px;
				width: 10px;
				display: block;
				border: 2px solid #ffffff;
				border-radius: 50%;
				background: #c4c4c4;
				z-index: 2;
			}

			&_year {
				&:before {
					content: '';
					top: 3px;
					left: 79px;
					position: absolute;
					height: 14px;
					width: 14px;
					display: block;
					border: 2px solid #ffffff;
					border-radius: 50%;
					background: #3c9be0;
					z-index: 2;
				}
			}

			&:after {
				content: '';
				top: 5px;
				left: 85px;
				width: 1px;
				position: absolute;
				height: 100%;
				display: block;
				background: #e5e5e5;
				z-index: 1;
			}

			&_inactive {
				&:before {
					background: #c7c8ca;
				}
			}

			&:last-child {
				margin: 0;
				padding-bottom: 0;
				&:after {
					display: none;
				}
			}
		}

		&__year {
			position: absolute;
			left: 25px;
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 18px;
			line-height: 18px;
			color: #3c9be0;
			&_big {
				left: 10px;
				font-weight: normal;
				font-family: 'Proxima Nova Th';
				font-size: 22px;
				line-height: 18px;
			}

			&_inactive {
				font-family: 'Proxima Nova Sb';
				font-size: 14px;
				line-height: 18px;
				color: #c7c8ca;
			}
		}

		&__title {
			margin-bottom: 4px;
			display: block;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: bold;
			font-size: 16px;
			line-height: 18px;
			color: #222222;
			&_big {
				font-family: 'Proxima Nova Th';
				font-style: normal;
				font-size: 16px;
				line-height: 18px;
				color: #222222;
			}
			&_inactive {
				font-family: 'Proxima Nova Sb';
				font-size: 16px;
				line-height: 18px;
				color: #c7c8ca;
			}
		}

		&__text {
			font-family: Proxima Nova;
			font-size: 14px;
			line-height: 16px;
			color: #999999;
			&_big {
				font-family: Proxima Nova;
				font-size: 14px;
				line-height: 16px;
				color: #222222;
			}
		}

		&__label {
			margin-bottom: 28px;
			padding: 0 0 0 118px;
			font-family: Proxima Nova;
			font-style: normal;
			font-weight: bold;
			font-size: 28px;
			line-height: 32px;
			letter-spacing: -0.3px;
			color: #777777;
		}
	}

	.team-slides {
		margin-bottom: -307px;
		position: relative;
		z-index: 1;
		&__img {
			display: block;
			width: auto;
			position: relative;
			left: 50%;
			transform: translateX(-50%);
			min-width: 100%;
		}
	}

	.team-feature {
		margin-bottom: 44px;
		position: relative;
		min-height: 350px;
		&__img {
			max-width: 100%;
			height: auto;
			display: block;
		}
		&__list {
			display: flex;
			@include paddings('desktop');
			gap: 28px;
		}
		&__wrap {
			padding: 28px 60px 32px 28px;
			left: 0;
			top: 0;
			position: absolute;
			width: 100%;
			height: 100%;
		}
		&__title {
			font-family: Proxima Nova;
			font-weight: bold;
			font-size: 28px;
			line-height: 30px;
			letter-spacing: -0.3px;
			color: #fdfdfd;
		}
		&__text {
			right: 60px;
			left: 28px;
			bottom: 32px;
			position: absolute;
			font-family: Proxima Nova;
			font-size: 18px;
			line-height: 24px;
			color: #fdfdfd;
		}
	}

	@include mq('desktop') {
		.team-about {
			grid-template-columns: minmax(108px, auto) 496px 28px 1fr;
			grid-template-areas:
				'. text . picture'
				'. text . history';
		}

		.team-history {
			padding-left: 98px;
			&__item {
				padding-left: 98px;
			}
		}

		.team-slides {
			margin-bottom: -260px;
			&__img {
				max-width: 109%;
			}
		}

		.team-features {
			padding-top: 260px;
		}
	}

	@include mq('laptop') {
		.team-top {
			min-height: 400px;
		}

		.team-managers {
			@include paddings('tablet');
			padding-bottom: 240px;
			&::before {
				height: 100%;
			}
			&__title {
				margin-bottom: 32px;
			}
			&__list {
				display: grid;
				grid-template-columns: repeat(3, minmax(227px, 1fr));
				column-gap: 20px;
				row-gap: 20px;
			}
		}

		.team-about {
			grid-template-columns: 100%;
			justify-content: center;
			grid-template-areas:
				'picture'
				'text'
				'history';
			background: none;
			&__text {
				padding: 0 52px 230px;
				background: $about-map-bg no-repeat 0px bottom;
				background-size: contain;
			}
		}

		.team-history {
			margin-top: 24px;
			&__item {
				width: 473px;
				padding-left: 112px;
			}
			&__label {
				padding-left: 112px;
			}
		}

		.team-picture {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: -260px;
			&__blockquote {
				right: -60px;
				margin-top: -100px;
			}
		}

		.team-slides {
			margin-bottom: -220px;
			overflow: hidden;
			&__img {
				max-width: none;
			}
		}

		.team-feature {
			min-width: 288px;
			&__title {
				margin-bottom: 32px;
			}
			&__wrap {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 28px 20px 32px;
			}
			&__list {
				overflow-x: scroll;
				@include hide-scroll();
				@include paddings('tablet');
				gap: 20px;
			}
			&__text {
				position: static;
			}
		}

		.team-contacts {
			@include paddings('mobile');
			grid-template-columns: 2fr 1fr;
			grid-template-areas:
				'title .'
				'contacts social';
			gap: 20px;
			justify-content: normal;

			.btn-contact {
				width: 32px;
				height: 32px;
			}
		}
	}

	@include mq('tablet') {
		.team-managers {
			@include paddings('mobile');
			padding-bottom: 280px;
			&::before {
				clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 98%);
			}
			&__list {
				grid-template-columns: 1fr;
			}
		}

		.team-history {
			@include paddings('mobile');
			&__item {
				box-sizing: border-box;
				width: 100%;
				padding-left: 76px;
				&_year::before {
					left: 50px;
				}
				&::after {
					left: 55px;
				}
				&::before {
					left: 50px;
				}
			}
			&__year {
				left: 0;
				&_big {
					font-size: 18px;
					line-height: 18px;
					font-weight: bold;
				}
			}
			&__label {
				padding-left: 0;
				text-align: center;
			}
		}

		.team-contacts {
			grid-template-columns: 100%;
			grid-template-areas:
				'title'
				'contacts'
				'social';
		}

		.team-top {
			min-height: 277px;
		}

		.team-picture {
			&__blockquote {
				right: initial;
				max-width: 100%;
				background: $team-cite-bg-mobile no-repeat center;
				margin-top: -80px;
			}
		}

		.team-about {
			&__text {
				padding: 0 20px 140px;
				@include paddings('mobile');
			}

			.blockquote {
				margin-left: -20px;
				margin-right: -20px;
			}
		}

		.team-slides {
			margin-bottom: -380px;
		}
		.team-features {
			padding-top: 380px;
			clip-path: polygon(0 5%, 100% 0, 100% 100%, 0% 100%);
		}
		.team-numbers {
			overflow-x: auto;
			@include hide-scroll();
		}
	}
</style>
