<template>
<div class="content content_team">
	<div class="team">
		<div class="team-top">
			<img class="team-top__img" decoding="async" loading="lazy" src="~assets/i/about-bg.jpg" alt="our team">
		</div>

		<div class="team-managers">
			<div class="container-fluid">
				<h1 class="team-managers__title">Наша команда</h1>
				<!-- <team-list> -->
					<div class="row">
						<div class="col-3" v-for="(item, index) in managers" :key="index">
							<team-item
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
					</div>
				<!-- </team-list> -->
			</div>
		</div>

		<div class="container-fluid">
			<article class="team-about">
				<div class="row">
					<div class="col-5 offset-md-1">
						<h2 class="team-about__title">Кто мы такие?</h2>
						<div class="team-about__summary">Мы — компания креативных покерных игроков и менеджеров, зарегистрированная в Великобритании под брендом "BOSSLIKE GAMING LP", расселенная и путешествующая по всему миру — Юго-Восточной Азии, Америке, Европе, Украине, России и даже Южной Америке в поисках крутых эмоций и хорошей игры.</div>
						<p>Наш проект начался в 2014 году, как авторский блог и небольшой самодельный сайт с несколькими азиатскими покер-румами.</p>
						<blockquote class="blockquote blockquote_img">
							<div class="blockquote__img">
								<img src="https://media.worldpokerdeals01.com/images/manager-small/d89efd0343de59bb68cec06e721343a0.jpg">
							</div>
							<p class="blockquote__author">Родион Лонга:</p>
							<p><b>«Отыграв в Heads Up Cash профессионально на протяжении 6 лет, я всегда понимал влияние гейм-селекта на винрейт и находился в поиске «мягких» румов с невысокой конкуренцией со стороны собратьев по Холдем Менеджеру»</b></p>
						</blockquote>
						<p>Это породило идею — создать проект, который даст возможность катать в наиболее «лояльных» составах, получая весь «пакет» по доступу и сопровождению игры: финансовые операции, необходимый софт, бесплатный майнинг, гарантии на депозиты, VPN-сервисы, а главное — <b>лучший саппорт доступный на рынке покерных аффилейтов.</b></p>
						<div class="team-about-sep">
							<span class="team-about-sep__item"></span>
							<span class="team-about-sep__item"></span>
							<span class="team-about-sep__item"></span>
						</div>
						<p>С тех пор мы прошли долгий путь: росла наша команда, добавлялись новые сети, сделки, условия. В 2017 мы <b>вышли на рынки Америки, Латинской Америки и Европы.</b>В 2019 году <b>получили две премии на церемонии iGB Awards в Лондоне</b>, как лучший покерный сайт и лучший зарубежный аффилейт.</p>
						<p>На сегодняшний день мы, без скромности, предлагаем самый широкий
						<nuxt-link prefetch :to="{name: 'index', params: {parent: 'online-poker-networks'}}" v-slot="{ href, route, navigate, isActive, isExactActive }">
							<a :href="href" @click="navigate">выбор сетей</a>,
						</nuxt-link>
						<nuxt-link prefetch :to="{name: 'index', params: {parent: 'rakeback-deals', child: 'best-poker-rooms-2020'}}" v-slot="{ href, route, navigate, isActive, isExactActive }">
							<a :href="href" @click="navigate">румов</a>,
						</nuxt-link>
						<nuxt-link prefetch :to="{name: 'vip'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
							<a :href="href" @click="navigate">VIP-сервис</a> 
						</nuxt-link>
							для фулл-тайм игроков, и самое главное — <b>единственный трастовый сервис для игры в приложениях и частных клубах.</b></p>
					</div>
					<div class="col-5">
						<div class="team-picture">
							<img class="team-picture__img" decoding="async" loading="lazy" src="~assets/i/about-img.png" alt="our team">
							<blockquote class="team-picture__blockquote" cite="http://example.com/facts">
								<p>Лонга на связи — главный и ответственный за все, что происходит на Worldpokerdeals</p>
							</blockquote>
						</div>
						<div class="team-history">
							<h2 class="team-history__label">История Worldpokerdeals</h2>
							<ul class="team-history__list">
								<li :class="[
									'team-history__item',
									item.year && 'team-history__item_year',
									item.big && 'team-history__item_big',
									item.inactive && 'team-history__item_inactive'
								]" v-for="(item, index) in history" :key="index">
									<span :class="[
										'team-history__year',
										item.big && 'team-history__year_big',
										item.inactive && 'team-history__year_inactive'
										]" v-if="item.year">{{ item.year }}</span>
									<span :class="[
										'team-history__title',
										item.big && 'team-history__title_big',
										item.inactive && 'team-history__title_inactive'
										]">{{ item.title }}</span>
									<span :class="[
										'team-history__text',
										item.big && 'team-history__text_big',
										item.inactive && 'team-history__text_inactive'
										]">{{ item.text }}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</article>
		</div>

		<div class="team-slides">
			<div class="container-fluid">
				<img class="team-slides__img" decoding="async" loading="lazy" src="~assets/i/about-slides.png" alt="our team">
			</div>
		</div>

		<div class="team-features">
			<div class="container-fluid">
				<div class="team-features__title">Наши принципы</div>
				<div class="row">
					<div class="col-3" v-for="(item, index) in features" :key="index">
						<div class="team-feature">
							<img class="team-feature__img" decoding="async" loading="lazy" :src="require(`~/assets/i/about-feature-${index + 1}.png`)" alt="our team">
							<div class="team-feature__wrap">
								<div class="team-feature__title" v-html="item.title"></div>
								<div class="team-feature__text">{{ item.text }}</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-12">
						<div class="team-numbers__title">Мы в цифрах</div>
				<div class="team-numbers">
				  <div class="team-number" v-for="(item, index) in numbers" :key="index">
					<span class="team-number__value">{{ item.value }}</span>
					<span class="team-number__label" v-html="item.label"></span>
				  </div>
				</div>
					</div>
				</div>
			</div>
		</div>

		<div class="team-contacts">
			<div class="container-fluid">
				<div class="row">
					<div class="col-10 offset-md-1">
						<div class="team-contacts__title">Остались вопросы? Напишите нам</div>
					</div>
					<div class="col-6 offset-md-1">
						<contacts-form style="margin: 0;" />
					</div>
					<div class="col-4 offset-md-1">
						<div class="team-contacts__info">Или свяжитесь с нами в социальных<br>сетях, мессенджерах или онлайн чате</div>
						<div v-if="managers && managers.length" class="team-contacts__buttons">
							<button-contact icon size="md" type="telegram" href="worldpokerdealsRU" />
							<button-contact icon size="md" type="whatsapp" :href="managers[0].whatsapp" />
			  <button-contact icon size="md" type="skype" :href="managers[0].skype" />
			  <button-contact icon size="md" type="fb" href="https://www.facebook.com/worldpokerdealsRu" />
			  <button-contact icon size="md" type="instagram" href="https://instagram.com/worldpokerdeals" />
			  <button-contact icon size="md" type="vk" href="https://vk.com/worldpokerdeals" />
						</div>
						<button-contact block size="md" type="chat" style="max-width: 208px;">Начать чат</button-contact>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {

	layout: 'basic',

	components: {

	},

	props: {

	},

	created() {

	},

	data: () => ({
		managers: [],
		history: [{
			year: '2014',
			title: 'Регистрация домена',
			text: 'Был зарегистрирован домен worldpokerdeals.com'
		},{
			year: null,
			title: 'Начало авторского блога',
			text: 'Первые посты и размещение нескольких азиатских румов'
		},{
			year: '2015',
			title: 'Первая версия сайта',
			text: 'Мно всех полят вате применить ко дейсть колять отменивнению в контекс'
		},{
			year: '2016',
			title: 'Набирается команда Worldpokerdeals',
			text: null
		},{
			year: '2017',
			big: true,
			title: 'Выход на рынки Америки, Латинской Америки и Европы',
			text: 'Мно всех полят вате применить ко дейсть колять отменивнению в контекс'
		},{
			year: null,
			title: 'Нументные вать и вывать и свода веровто',
			text: 'Мнострабойте веримень прогладется блицы можется срачновает аботы зате полько ствия'
		},{
			year: '2018',
			title: 'Запуск собственной партнерской программы',
			text: 'Мно всех полят вате применить ко дейсть колять отменивнению в контекс'
		},{
			year: '2019',
			title: 'Получение премии на iGB Awards',
			text: 'Премия в номинациях лучший покерный сайт и лучший зарубежный аффилейт'
		},{
			year: null,
			title: 'Обновление структуры и дизайна сайта',
			text: null
		},{
			year: '2020',
			title: 'Пережили пандемию COVID-19',
			text: 'Премия в номинациях лучший покерный сайт и лучший зарубежный аффилейт'
		},{
			year: '2030',
			title: 'Организация первого покерного турнира на марсе',
			text: null,
			inactive: true
		}],

		features: [{
			title: 'Давать<br>велью',
			text: 'Наша цель — обеспечивать игроков и партнёров лучшими условиями, чем они могли бы получить в любом другом месте'
		},{
			title: 'Не прятать <br>лиц',
			text: 'Надежность аффилейта во многом определяется публичностью его команды. За нашим сервисом всегда стоят реальные люди с большим покерным бэкграундом'
		},{
			title: 'Получать<br>фан',
			text: 'Мы занимаемся своей работой с удовольствием, потому что наживаем на том, что помогаем наживать другим'
		},{
			title: 'Жить <br>активно',
			text: 'Мы любим работать, но еще больше обожаем отдыхать: заниматься спортом, играть в мафию, устраивать техно-вечеринки и, конечно, путешествовать'
		}],

	numbers: [
	  {
		label: 'Лет на <br> рынке',
		value: '7'
	  },{
		label: 'Покерныx <br> румов',
		value: '150'
	  },{
		label: 'Клубов',
		value: '26'
	  },{
		label: 'Партнеров',
		value: '70'
	  },{
		label: 'Активныx <br> игроков',
		value: '10 000'
	  },{
		label: 'Аффилейт-менеджеров <br> в команде',
		value: '10'
	  },
	]
	}),

	async fetch() {
		await this.$axios.get('/managers', {
			params: {
				locale: this.locale
			}
		}).then(response => {
			this.managers = response.data.map(item => ({
				id: item.id,
				image: item.image ? {
					filename: item.image.filename
				}: null,
				name: item.name,
				position: item.position,
				telegram: item.telegram,
				skype: item.skype,
				whatsapp: item.whatsapp,
				facebook: item.facebook,
				email: item.email,
				locales: item.locales
			}))
		})
	},

	computed: {
		...mapGetters({
			locale: 'lang/locale'
		}),
	},

	watch: {

	},

	methods: {

	}
}
</script>

<style lang="scss">
$team-cite-bg: url('~assets/i/team-cite-bg.svg?data');
$ico-quote-tail: url('~assets/i/ico-quote-tail.svg?data');
$about-map-bg: url('~/assets/i/about-map-bg.png');

.content_team {

}

.team-contacts {
	&__title {
		margin: 44px 0 32px 0;
		font-family: 'Proxima Nova Sb';
		font-size: 28px;
		line-height: 32px;
		letter-spacing: -0.2px;
		color: #222222;
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
  &:before {
		content: '';
	width: 100%;
	position: absolute;
	height: 1px;
	background: #464B62;
	top: 61px;
  }
	&__title {
		margin-bottom: 24px;
		font-family: 'Proxima Nova Sb';
		font-size: 28px;
		line-height: 32px;
		text-align: center;
		letter-spacing: -0.2px;
		color: #CCCCCC;
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
	color: #FFFFFF;
	&:after {
	  content: '';
	  left: 0;
	  bottom: 0px;
	  position: absolute;
	  width: 100%;
	  height: 4px;
	  display: block;
	  background: #5F6377;
	}
  }

  &__label {
	display: block;
	font-family: Proxima Nova;
	font-size: 16px;
	line-height: 20px;
	color: #90939D;
  }
}

.team-features {
	padding-top: 250px;
	padding-bottom: 44px;
	clip-path: polygon(0 10%, 100% 0, 100% 100%, 0% 100%);
	background: radial-gradient(96.88% 71.32% at 57.43% -5.58%, #3A3E51 0%, #1D1F2C 100%);
	&__title {
		margin-bottom: 32px;
		font-family: 'Proxima Nova Sb';
		font-size: 28px;
		line-height: 32px;
		text-align: center;
		letter-spacing: -0.2px;
		color: #CCCCCC;
	}
}

.team-top {
	position: relative;
	min-height: 573px;
	&__img {
		display: block;
		width: auto;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		min-height: 573px;
		min-width: 100%;
	}
}

.team-managers {
	position: relative;
	&:before {
		content: '';
		top: 0;
		left: 0;
		position: absolute;
		display: block;
		width: 100%;
		// height: 100%;
		height: calc(100% - 86px);
		background: linear-gradient(0deg, #262937, #262937), radial-gradient(96.88% 74.8% at 57.43% 2.41%, #3A3E51 0%, #1D1F2C 100%);
		transform: matrix(-1, 0, 0, 1, 0, 0);
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 92%);
	}
	&__title {
		position: relative;
		margin-bottom: 72px;
		font-family: Proxima Nova;
		font-weight: bold;
		font-size: 36px;
		line-height: 42px;
		text-align: center;
		color: #FFFFFF;
	}
}

.team-about {
	padding-bottom: 19px;
	position: relative;
	background: $about-map-bg no-repeat -26px bottom;
	background-size: 852px;
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
			background: #CCCCCC;
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
		font-family: "Proxima Nova Sb";
		font-style: normal;
		font-size: 16px;
		line-height: 21px;
		color: #000000;
		&:after {
			content: "";
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
			font-family: "Proxima Nova Sb";
			font-style: normal;
			font-size: 14px;
			line-height: 23px;
			color: #979797;
		}
	}
}

.team-picture {
	margin-top: -254px;
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
		right: -70px;
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
	padding: 0 0 0 90px;
	&__list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	&__item {
		padding: 0 0 20px 118px;
		position: relative;
		&:before {
			content: '';
			top: 3px;
			left: 81px;
			position: absolute;
			height: 10px;
			width: 10px;
			display: block;
			border: 2px solid #FFFFFF;
			border-radius: 50%;
			background: #C4C4C4;
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
				border: 2px solid #FFFFFF;
				border-radius: 50%;
				background: #3C9BE0;
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
			background: #E5E5E5;
			z-index: 1;
		}

		&_inactive {
			&:before {
				background: #C7C8CA;
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
		color: #3C9BE0;
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
			color: #C7C8CA;
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
			color: #C7C8CA;
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
	margin-bottom: -280px;
	position: relative;
  z-index: 1;
	&__img {
		display: block;
		width: auto;
		position: relative;
		left: 50%;
		top: -35px;
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
		color: #FDFDFD;
	}
	&__text {
		right: 60px;
		left: 28px;
		bottom: 32px;
		position: absolute;
		font-family: Proxima Nova;
		font-size: 18px;
		line-height: 24px;
		color: #FDFDFD;
	}
}
</style>