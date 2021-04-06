<template>
<section class="page-banners">
  <div class="container-fluid">
    <div class="page-banners__wrap">
      <page-banners-item
        v-for="(item, index) in items" :key="index"
        :url="item.url"
        :title="item.title"
        :text="item.text"
        :image="item.image"
        :background="item.background"
      />
    </div>
  </div>
</section>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

  name: 'PageBanners',

  components: {

  },

  props: {

  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    ...mapGetters({
      menu: 'menu/items',
    }),

    items() {
      return [{
        url: this.menu.poker[3].page.slug,
        title: 'Игры',
        text: 'Неримени продактивам та файлойна добна докумет еницы',
        image: 'img-page-banner-games.png',
        background: 'radial-gradient(83.54% 115.31% at 83.54% 0%, #F53D3D 0%, #7C0000 78.75%)'
      },{
        url: this.menu.poker[4].page.slug,
        title: 'Покер на мобильный',
        text: 'Ать вы с инты, к любым сроку их полни дежност',
        image: 'img-page-banner-mobile.png',
        background: 'radial-gradient(83.54% 115.31% at 83.54% 0%, #1BB46B 0%, #097E46 78.75%)'
      },{
        url: this.menu.poker[1].page.slug,
        title: 'Сети',
        text: 'Неримени продактивам та файлойна добна докумет еницы',
        image: 'img-page-banner-networks.png',
        background: 'radial-gradient(83.54% 115.31% at 83.54% 0%, #4C66E0 0%, #0D279D 78.75%)'
      },{
        url: this.menu.poker[2].page.slug,
        title: 'Программы для покера',
        text: 'Ать вы с инты, к любым сроку их полни дежност',
        image: 'img-page-banner-soft.png',
        background: 'radial-gradient(83.54% 115.31% at 83.54% 0%, #9260D1 0%, #4C0C9E 78.75%)'
      },{
        url: this.menu.poker[0].page.slug,
        title: 'Платёжки',
        text: 'Интному интерок умериме ненитель. Их элемы нение ствия',
        image: 'img-page-banner-payments.png',
        background: 'radial-gradient(83.54% 115.31% at 83.54% 0%, #F5D703 0%, #BD5B00 78.75%)'
      }]
    }
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
.page-banners {
  padding-bottom: 90px;
  &_front {
    padding-bottom: 40px;
  }
  &__wrap {
    display: flex;
    align-items: center;
  }
}
</style>