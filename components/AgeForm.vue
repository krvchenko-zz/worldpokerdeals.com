<template>
  <form
    class="age-form"
  >
    <div
      :style="{
        margin: !declained ? '15px 0 30px 0' : '15px 0 0 0',
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: '28px',
        lineHeight: '32px',
        textAlign: 'center',
        color: '#222222',
      }"
    >
      <template v-if="!declained">{{ $t('age_confirm.question') }}</template>
      <template v-else>{{ $t('age_confirm.restricted') }}</template>
    </div>
    <div v-if="!declained" class="age-form-group">
      <button @click.prevent="handleClick(true)" class="btn btn-block btn-lg btn-primary btn-age-form">{{ $t('age_confirm.yes') }}</button>
      <button @click.prevent="handleClick(false)" class="btn btn-block btn-lg btn-default btn-age-form">{{ $t('age_confirm.no') }}</button>
    </div>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Form from 'vform'
  import eventBus from '~/utils/event-bus'

  export default {
    name: 'AgeForm',

    components: {},

    computed: {
      ...mapGetters({
        age: 'auth/age',
      }),
    },

    data: () => ({
      declained: false,
      form: new Form({
      }),
    }),

    watch: {},

    methods: {
      handleClick(val) {
        this.$store.dispatch('auth/setAge', { age: val })
        eventBus.$emit('ageModal:click', val)
        this.declained = !val
      },
    },
  }
</script>

<style lang="scss">
  .age-form {
    &-group {
      position: relative;
      display: flex;
      justify-content: center;
    }
  }

  .btn-age-form {
    margin-right: 20px;
    &:last-child {
      margin-left: 20px;
    }
  }

  @include mq('laptop') {
    .age-form {
      &__contacts {
        column-gap: 20px;
      }
    }
  }

  @include mq('tablet') {
    .age-form {
      &__contacts {
        grid-template-columns: 1fr;
        row-gap: 24px;
      }
    }

    .btn-age-form {
      max-width: none;
      width: 100%;
    }
  }
</style>
