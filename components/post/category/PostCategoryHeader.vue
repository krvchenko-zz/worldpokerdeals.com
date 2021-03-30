<template>
<div class="post-category-header">
  <div class="container-fluid">

    <div class="row">
      <div class="col-8">
        <breadcrumb-list :white="true"/>
        <h1 class="post-category__title">Новости покера</h1>
        <div class="post-category__summary">
          Инсайды индустрии без поп-корна и еще какую-то небольшую <br> подводку чтобы было в 2 строки
        </div>
      </div>
      <div class="col-4">
        <div class="blog-subscribe">
          <div class="blog-subscribe__wrap">
            <div class="blog-subscribe__title">Нравится Worldpokerdeals?</div>
            <div class="blog-subscribe__text">Подпишись на наши каналы, чтобы  не пропускать новые статьи</div>
            <div class="blog-subscribe__contacts">
              <button-contact icon type="telegram" href="https://t.me/worldpokerdealsRU" />
              <button-contact icon type="instagram" href="instagram.com/worldpokerdeals" />
              <button-contact icon type="fb" href="https://www.facebook.com/worldpokerdealsRu" />
              <button-contact icon type="vk" href="https://vk.com/worldpokerdeals" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

  name: 'PostCategoryHeader',

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
      locale: 'lang/locale',
      country: 'location/country',
      user: 'auth/user',
      pageable: 'pages/page',
      category: 'post/category'
    }),
  },

  watch: {

  },

  methods: {

  }
}
</script>

<style lang="scss">

$bg: url('~assets/i/post-category-bg.jpg');

.post-category {
  &-header {
    position: relative;
    margin-bottom: 32px;
    background: $bg no-repeat center;
    background-size: cover;
  }
  &__title {
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 36px;
    color: #FFFFFF;
  }

  &__summary {
    padding-bottom: 32px;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #FFFFFF;
    opacity: 0.8;
  }
}

.blog-subscribe {
  position: relative;
  max-width: 470px;
  min-height: 190px;
  padding: 40px 28px 28px 19%;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
    transform: rotate(-180deg);
    background: radial-gradient(163.35% 694.34% at 92.87% -12.37%, #47962C 0%, #194E06 100%);
    opacity: 0.8;
  }
  &__wrap {
    position: relative;
    z-index: 2;
  }
  &__title {
    margin-bottom: 4px;
    text-align: center;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
  }
  &__text {
    margin-bottom: 16px;
    font-family: Proxima Nova;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
  }
  &__contacts {
    display: flex;
    justify-content: center;
    .btn-contact {
      // border-bottom-left-radius: 10px!important;
      // border-top-right-radius: 10px!important;
      // border-bottom-right-radius: 4px!important;
      // border-top-left-radius: 4px!important;
      margin-right: 12px;
      padding: 16px;

      &_fb {
        &:before {
          background-size: 10px auto;
        }
      }

      &_vk {
        &:before {
          background-size: 22px auto;
        }
      }

      &_telegram {
        &:before {
          background-size: 20px auto;
        }
      }

      &_instagram {
        &:before {
          background-size: 24px auto;
        }
      }
    }
  }
}
</style>