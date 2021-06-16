<template>
  <div class="page-disclaimer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-10">
          <nuxt-link
            v-slot="{ href, navigate }"
            prefetch
            :to="{ name: 'terms' }"
          >
            <p>Внимание! Пожалуйста, ознакомьтесь с настоящим <a :href="href" @click="navigate">пользовательским соглашением</a> до начала использования сайта ru.worldpokerdeals.com и его программных средств. Данный сайт не является площадкой для проведения азартных игр. Вся информация, размещенная на сайте, носит ознакомительный характер.</p>
          </nuxt-link>
        </div>
        <div class="col-2">
          <span
            :class="['page-disclaimer__close', 'page-disclaimer__close_gray']"
            @click="handleClose"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'PageDisclaimer',

    components: {},

    props: {},

    data: () => ({}),

    async fetch() {},

    mounted() {},

    computed: {
      ...mapGetters({
        disclaimer: 'auth/disclaimer',
      }),
    },

    watch: {},

    methods: {
      handleClose() {
        this.$store.dispatch('auth/setDisclaimer', { disclaimer: true })
      }
    },
  }
</script>

<style lang="scss">
  .page-disclaimer {
    padding: 22px 0;
    background: #fafafa;
    font-family: Proxima Nova;
    font-size: 14px;
    line-height: 17px;
    color: #555555;
    p {
      margin: 0;
    }

    &__close {
      cursor: pointer;
      position: relative;
      display: block;
      float: right;
      width: 20px;
      height: 20px;
      padding: 18px;
      top: -8px;

      &:before,
      &:after {
        content: '';
        top: 0;
        left: 0;
        position: absolute;
        width: 2px;
        height: 26px;
        display: block;
        background: #000000;
      }

      &:before {
        transform: rotate(45deg) translate(16px, -9px);
      }
      &:after {
        transform: rotate(-45deg) translate(9px, 16px);
      }

      &_gray {
        opacity: 0.5;
        &:before,
        &:after {
          background: #555555;
        }
      }
    }
  }
</style>
