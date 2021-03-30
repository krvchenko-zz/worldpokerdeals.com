<template>
<div class="front-club-access">
	<img width="262px" height="433px" decoding="async" loading="lazy" src="~assets/i/club-access-banner.jpg" alt="Вестник Бамхантера" class="front-club-access__img">
  <div class="front-club-access__wrap">
    <div class="front-club-access__title">Безопасный доступ в клубы</div>
    <div class="front-club-access__info">Ать вы с инты, к любым сроку их полни дежност витекту шевклаг</div>
    <a style="font-weight: bold" class="btn btn-block btn-green" rel="nofollow" href="/contact-us">Подробнее</a>
  </div>
</div>
</template>

<script>

export default {

  name: 'FrontClubAccess',

  components: {

  },

  props: {

  },

	created() {

	},

	data: () => ({

	}),

  computed: {

  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
$contact-us-logo: url('~assets/i/contact-us-logo.svg?data');

.front-club-access {
  margin-top: 20px;
  width: 262px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  &__img {
    display: block;
    min-height: 252px;
    width: auto;
  }

  &__wrap {
    padding: 52px 28px 28px 28px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }

  &__title {
    margin-bottom: 20px;
    padding-top: 68px;
    padding-bottom: 26px;
    position: relative;
    font-family: 'Proxima Nova Th';
    font-style: normal;
    font-size: 28px;
    line-height: 30px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #FFFFFF;
    background: $contact-us-logo no-repeat center top;
    &:after {
      content: '';
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      position: absolute;
      height: 2px;
      width: 40px;
      background: #DFE4E6;
    }
  }

  &__info {
    margin-bottom: 16px;
    font-family: Proxima Nova;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #FFFFFF;
    opacity: 0.9;
  }
}
</style>