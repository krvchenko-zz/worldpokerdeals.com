<template>
  <div class="vip-form">
    <div class="vip-form__info">
      <div class="vip-form__label"><b>Есть вопрос?</b>Свяжись с нами для обсуждения персональных условий</div>
      <div class="vip-form__img-wrap">
        <img class="vip-form__img" :src="src" :alt="name" decoding="async" loading="lazy"/>
      </div>
      <div class="vip-form__name">{{ name }}</div>
      <div class="vip-form__position">{{ position }}</div>
      <div class="vip-form__actions">
        <button-contact block size="md" type="chat">Начать чат</button-contact>
        <div class="vip-form__messengers">
          <button-contact class="vip-form__btn" icon size="md" type="telegram" :href="telegram"></button-contact>
          <button-contact class="vip-form__btn" icon size="md" type="skype" :href="skype"></button-contact>
          <button-contact class="vip-form__btn" icon size="md" type="whatsapp" :href="whatsapp"></button-contact>
          <button-contact class="vip-form__btn" icon size="md" type="email" :href="email"></button-contact>
        </div>
      </div>
    </div>

    <div class="vip-form__footer">
      <div class="vip-form__footer-label">или оставь свои контакты</div>
      <form @submit.prevent="submit" @keydown="form.onKeydown($event)">
        <div class="vip-form-group">
          <div class="vip-form-group__wrap">
            <form-input
              v-model="form.contact"
              class="form-input_vip"
              placeholder=""
              type="text"
              name="contact"
              label-color="#636363"
              :required="true"
              :loading="form.busy"
              :error="form.errors.has('contact')"
            >
              <template v-slot:prefix>
              <el-select class="el-select_vip" v-model="form.contact_type" placeholder="Select" popper-class="el-poper-vip">
                <template slot="prefix">
                  <svg-icon :icon="form.contact_type"/>
                </template>
                <el-option v-for="(item, index) in contact_options" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              </template>
            </form-input>
            <form-submit-button
              icon
              class="btn-vip-form"
              :loading="form.busy">
            </form-submit-button>
            <transition name="fade">  
              <has-error :form="form" field="contact" />
            </transition>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<script>

import Form from 'vform'

export default {

  name: 'VipForm',

  components: {

  },

  props: {
    image: {
      type: Object,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    position: {
      type: String,
      required: true
    },

    telegram: {
      type: String,
      required: true
    },

    skype: {
      type: String,
      required: true
    },

    whatsapp: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    manager_info: {
      type: [String],
    }
  },

	created() {

	},

	data: () => ({
    contact_options: [
      {
        label: 'Skype',
        value: 'skype'
      },{
        label: 'Email',
        value: 'email'
      }
    ],
    form: new Form({
      email: null,
      contact: null,
      contact_type: 'skype'
    }),
	}),

  computed: {
    src() {
      return `${this.mediaUrl}/manager-small/${this.image.filename}`
    },

    mediaUrl() {
      return process.env.mediaUrl
    },
  },

  watch: {

  },

  methods: {
    async submit () {
      this.form.post('/contacts').then((response) => {
        this.$emit('submit')
        this.form.reset()
      })
      .catch(e => {
      })
    }
  }
}
</script>

<style lang="scss">

$contacts-vip-patern: url('~assets/i/contacts-vip-patern.svg?data');

.vip-form {
  margin-bottom: 32px;
  top: 100px;
  position: sticky;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: -10px 20px 50px rgba(0, 0, 0, 0.2);
  background: linear-gradient(0deg, #171922, #171922),
              radial-gradient(173.62% 345.07% at 75% -13.07%, #3A3E51 5.73%, #262937 100%);
  
  &__info {
    padding: 28px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    position: relative;
    text-align: center;
    &:before {
      content: '';
      top: 0;
      left: 0;
      position: absolute;
      display: block;
      width: 100%;
      height: 4px;
      background: $contacts-vip-patern repeat-x center;
    }
  }
  &__label {
    margin-bottom: 32px;
    font-family: Proxima Nova;
    font-size: 18px;
    line-height: 22px;
    color: #CCCCCC;
    b {
      display: block;
      font-family: Proxima Nova;
      font-weight: bold;
      font-size: 20px;
      line-height: 22px;
      color: #FFFFFF;
    }
  }
  &__name {
    margin-bottom: 8px;
    font-family: Proxima Nova;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
  }
  &__position {
    margin-bottom: 20px;
    font-family: Proxima Nova;
    font-size: 16px;
    line-height: 16px;
    color: #CCCCCC;
    opacity: 0.7;
  }

  &__img {
    border-radius: 50%;
    max-width: 100%;
    height: auto;
    &-wrap {
      margin-bottom: 12px;
      display: inline-block;
      text-align: center;
      width: 72px;
      height: 72px;
      border-radius: 50%;
    }
  }
  &__actions {

  }

  &__title {
    margin-bottom: 15px;
    color: #2A2D3C;
    letter-spacing: -0.2px;
    text-align: center;
    font-weight: bold;
    font-size: 21px;
    line-height: 21px;
    font-family: 'Proxima Nova';
  }

  &__messengers {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  &__btn {
    margin-right: 16px;
    &:last-child {
      margin: 0;
    }
  }

  &-group {
    &__wrap {
      position: relative;
    }
  }

  &__footer {
    padding: 20px 28px 32px 28px;
    background: linear-gradient(0deg, #262937, #262937),
                radial-gradient(173.62% 345.07% at 75% -13.07%, #3A3E51 5.73%, #262937 100%);
    &-label {
      margin-bottom: 12px;
      font-family: Proxima Nova;
      font-size: 16px;
      line-height: 22px;
      color: #CCCCCC;
    }
  }
}

.form-input {
  &_vip {
    padding-right: 42px;
    .form-input__prepend {
      width: 72px;
    }
    .form-input__value {
      color: #FFFFFF;
      width: 100%;
      background: transparent;
      border-color: #353A4B;
      &:active,
      &:focus {
        box-shadow: none;
      }
    }
  }
}

.el-select_vip {
  .el-select__caret{
    color: #353A4B!important;
  }
  &:hover {
    .el-input__inner {
      border-color: #353A4B;
    }
  }
  .el-input {
    &--prefix {
      .el-input__inner {
        padding-left: 36px;
      }
    }
    &__prefix {
      left: 13px;
      line-height: 40px;
    }
    &__inner {
      text-indent: -9999px;
      background: transparent;
      border: 1px solid #353A4B;
      &:active,
      &:focus {
        border-color: #353A4B;
      }
    }
    &.is-focus {
      .el-input__inner {
        border-color: #353A4B;
      }
    }
  }
}

.btn-vip-form {
    position: absolute;
    top: 0;
    right: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
</style>