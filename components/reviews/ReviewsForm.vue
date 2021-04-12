<template>
<div class="review-form">
  <form class="review-form__form" @submit.prevent="create" @keydown="form.onKeydown($event)">

    <div class="review-form__rate-wrap inline">
      <label class="review-form__label review-form__label_rate">Общая оценка</label>
      <div class="review-form__rate">
        <el-rate
          v-model="form.rate"
          :colors="['#70AC30', '#70AC30', '#70AC30']">
        </el-rate>
        <span class="review-form__reset" @click="form.rate = 0">Сбросить</span>
      </div>
    </div>

    <div class="review-form__textarea-wrap inline">
      <label class="review-form__label review-form__label_pros">Достоинства</label>
      <div class="review-form__pros">
        <textarea :class="['review-form__textarea', form.errors.has('pros') && 'has-error']" v-model="form.pros" name="pros"></textarea>
        <transition name="fade">
          <has-error :form="form" field="pros" />
        </transition>
      </div>
    </div>

    <div class="review-form__textarea-wrap inline">
      <label class="review-form__label review-form__label_cons">Недостатки</label>
      <div class="review-form__cons">
        <textarea :class="['review-form__textarea', form.errors.has('cons') && 'has-error']" v-model="form.cons" name="cons"></textarea>
        <transition name="fade">
          <has-error :form="form" field="cons" />
        </transition>
      </div>
    </div>

    <div class="review-form__textarea-wrap">
      <label class="review-form__label">Отзыв</label>
      <textarea :class="['review-form__textarea', form.errors.has('text') && 'has-error']" v-model="form.text" name="text"></textarea>
      <transition name="fade">
        <has-error :form="form" field="text" />
      </transition>
    </div>

    <div class="review-form__submit">
      <button class="btn btn-primary" type="submit" :loading="loading">Оставить отзыв</button>
    </div>
  </form>
</div>
</template>
<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import Form from 'vform'

import { Rate } from 'element-ui'


export default {

  name: 'ReviewsForm',

  components: {
    [Rate.name]: Rate,
  },

  props: {
    room_id: {
      type: Number,
      required: true,
    },

    show: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {

  },

	created() {

	},

  data: () => ({
    loading: false,
    form: new Form({
      text: null,
      pros: null,
      cons: null,
      rate: 0,
      room_id: null,
      user_id: 311,
      published: 1
    }),
  }),

  computed: {
    ...mapGetters({
      user: 'auth/user',
      reviews: 'reviews/reviews',
    })
  },

  watch: {
    room_id: {
      immediate: true,
      handler(val) {
        this.form.room_id = val
      }
    },

    user: {
      deep: true,
      immediate: true,
      handler(val) {
        this.form.user_id = val.id
      }
    }
  },

	methods: {
    async create () {
      this.$nuxt.$loading.start()
      this.loading = true

      // console.log('test');

      await this.form.post('/reviews')
      .then(response => {
        this.$emit('created', response.data)
        this.form.text = null
        this.$emit('created', response.data)
      })
      .catch((error) => {
        let errors = this.form.errors.flatten()
        this.loading = false
        this.$nuxt.$loading.finish()
      })

      await axios.get('reviews/list', {
        params: {
          per_page: parseInt(this.reviews.per_page),
          sort: 'created_at',
          order: 'desc',
          room_id: this.room_id
        }
      }).then((response) => {
        this.$store.commit('reviews/FETCH_REVIEWS', { reviews: response.data })
        this.$nuxt.$loading.finish()
      })
    }
	}
}
</script>

<style lang="scss">
$ico-review-pros: url('~assets/i/ico-review-pros.svg?data');
$ico-review-cons: url('~assets/i/ico-review-cons.svg?data');

.review-form {
  margin: 20px 0 0 0;
  &__textarea {
    width: 100%;
    padding: 16px;
    display: block;
    background: #FFFFFF;
    border: 1px solid #C9C9C9;
    box-sizing: border-box;
    border-radius: 4px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: #777777;
    min-height: 110px;
    &-wrap {
      margin-bottom: 20px;
      &.inline {
        display: flex;
      }
    }
    &:focus,
    &:active,
    &:hover {
      outline: none;
    }
  }

  &__pros {
    padding-left: 80px;
    flex-grow: 1;
  }

  &__cons {
    padding-left: 80px;
    flex-grow: 1;
  }

  &__label {
    position: relative;
    font-family: 'Proxima Nova Sb';
    font-size: 16px;
    line-height: 18px;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #222222;

    &_pros {
      flex: 0 0 130px;
      padding-left: 34px;
      &:before {
        content: '';
        width: 18px;
        height: 16px;
        display: block;
        position: absolute;
        left: 0;
        top:0;
        background: $ico-review-pros no-repeat center;
      }
    }

    &_cons {
      flex: 0 0 130px;
      padding-left: 34px;
      &:before {
        content: '';
        width: 18px;
        height: 16px;
        display: block;
        position: absolute;
        left: 0;
        top:0;
        background: $ico-review-cons no-repeat center;
      }
    }

    &_rate {
      flex: 0 0 130px;
    }
  }

  &__rate {
    flex-grow: 1;
    padding-left: 80px;
    &-wrap {
      display: flex;
      margin-bottom: 28px;
    }
  }

  &__reset {
    cursor: pointer;
    vertical-align: middle;
    display: inline-block;
    font-family: 'Proxima Nova';
    font-size: 14px;
    line-height: 16px;
    color: #008BE2;
    border-bottom: 1px dashed #008BE2;
  }
}

.el-rate__icon {
  font-size: 19px;
}

.el-rate {
  display: inline-block;
  vertical-align: middle;
}
</style>