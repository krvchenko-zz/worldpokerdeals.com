<template>
  <nuxt-link :to="to" v-slot="{ href, route, navigate }">
    <button :disabled="disabled" :class="[
      'btn',
      'btn-room-action',
      disabled && 'btn-room-action_disabled',
      `btn-room-action_${type}`,
      icon && `btn-room-action_${type}-icon`
    ]" v-on="shouldNavigate ? { click: type === 'download' ? handleDownload : navigate } : {click: handleClick}">{{ label }}</button>
  </nuxt-link>
</template>

<script>

import eventBus from '~/utils/event-bus'

export default {

  name: 'RoomActionButton',

  components: {

  },

  props: {
    type: {
      type: String,
      default: 'default'
    },

    label: {
      type: String,
      default: ''
    },

    icon: {
      type: Boolean,
      default: true
    },

    slug: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: '#FFFFFF'
    },

    disabled: {
      type: Boolean,
      default: false
    }

  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    to() {
      return this.type === 'download' ? `/rakeback-deals/${this.slug}/play` : `/rakeback-deals/${this.slug}`
    },

    shouldNavigate() {
      return this.type === 'download' || this.type === 'default' ? true : false
    }
  },

  watch: {

  },

	methods: {
    handleClick() {
      eventBus.$emit('roomAction:click', {
        type: this.type,
        title: this.title,
        slug: this.slug
      })
    },

    handleDownload() {
      window.open(this.to, '_blank')
    }
	}
}
</script>

<style lang="scss">
$ico-btn-chat: url('~assets/i/room/ico-btn-chat.svg?data');
$ico-btn-action: url('~assets/i/room/ico-btn-action.svg?data');

.btn-room-action {
  margin: 0;
  padding: 11px 24px 11px 24px;
  max-width: 280px;
  flex-grow: 1;
  font-family: 'Proxima Nova Sb';
  font-size: 18px;
  line-height: 22px;
  white-space: nowrap;
  &_download {
    padding: 13px 24px 13px 24px;
    border: 0;
    color: #fff;
    position: relative;
    overflow: hidden;
    background: #FF4151;
    &:hover,
    &:focus, {
      background: #EE3C4B;
    }
    &-icon {
      &:after {
        right: 24px;
        top: 50%;
        margin-top: -34px;
        opacity: 0.1;
        content: '';
        width: 72px;
        height: 68px;
        position: absolute;
        background-image: $ico-btn-action;
        background-repeat: no-repeat;
        background-position: right center;
      }
    }
  }

  &_contacts {
    padding: 13px 24px 13px 24px;
    border: 0;
    position: relative;
    overflow: hidden;
    background: #70AC30;
    color: #ffffff;
    &:hover,
    &:focus, {
      background: #6AA42C;
    }
    &-icon {
      &:after {
        right: 24px;
        top: 50%;
        margin-top: -44px;
        opacity: 0.1;
        content: '';
        width: 85px;
        height: 85px;
        position: absolute;
        background-image: $ico-btn-chat;
        background-repeat: no-repeat;
        background-position: right center;
      }
    }
  }

  &_review,
  &_connection,
  &_default {
    color: #FFFFFF;
    border: 2px solid rgba(229, 229, 229, 0.8);
    background: transparent;
    &:hover,
    &:focus, {
      color: #222222;
      background: #FFFFFF;
      border-color: #FFFFFF;
    }
    &:hover,
    &:active,
    &:focus {
      color: #222222;
      background: #FFFFFF;
      border-color: #FFFFFF;
    }
  }

  &_disabled {
    cursor: not-allowed;
    background: #AAAAAA;
    &:hover,
    &:active,
    &:focus {
      background: #AAAAAA;
    }
  }

  &_blacklist {
    color: #EA5535;
    border: 2px solid #EA5535;
    background: transparent;
    &:hover,
    &:active,
    &:focus {
      color: #FFFFFF;
      background: #EA5535;
    }
  }

}
</style>