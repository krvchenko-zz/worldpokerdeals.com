<template>
  <a :class="{
      'btn': true,
      'btn-block': block,
      'btn-contact': true,
      'btn-contact_icon': icon,
      [`btn-contact_${size}`]: true,
      [`btn-contact_${type}`]: true
    }"
    :href="target"
  >
    <slot />
  </a>
</template>

<script>

export default {

  name: 'ButtonContact',

  props: {
    type: {
      type: String
    },

    href: {
      type: String
    },

    size: {
      type: String,
      default: 'sm'
    },

    icon: {
      type: Boolean,
      default: false
    },

    block: {
      type: Boolean,
      default: false
    }

  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    target() {
      return (
        this.type === 'chat'     && `#` ||
        this.type === 'skype'    && `skype:${this.href}?chat` ||
        this.type === 'email'    && `mailto:${this.href}` ||
        this.type === 'telegram' && `https://telegram.me/${this.href}` ||
        this.type === 'fb'       && `${this.href}` ||
        this.type === 'vk'       && `${this.href}` ||
        this.type === 'whatsapp' && `whatsapp://tel:${this.href}` ||
        this.type === 'instagram'&& `${this.href}`
      )
    }
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
// $ico-telegram: url('~assets/i/messengers/ico-telegram.svg?data');
// $ico-skype: url('~assets/i/messengers/ico-skype.svg?data');
// $ico-whatsapp: url('~assets/i/messengers/ico-whatsapp.svg?data');
// $ico-email: url('~assets/i/messengers/ico-email.svg?data');
// $ico-chat: url('~assets/i/messengers/ico-chat.svg?data');
// $ico-fb: url('~assets/i/messengers/ico-fb.svg?data');
// $ico-vk: url('~assets/i/messengers/ico-vk.svg?data');
// $ico-twitter: url('~assets/i/messengers/ico-twitter.svg?data');
// $ico-instagram: url('~assets/i/messengers/ico-instagram.svg?data');

// .btn-contact {
//   position: relative;
//   border-radius: 4px;
//   border: 1px solid #E9E9E9;
//   color: #777777!important;
//   text-decoration: none!important;
//   font-family: 'Proxima Nova Sb';
//   background: transparent;
//   transition: all .2s ease-out;
//   &:hover,
//   &:active,
//   &:focus,
//   &:visited {
//     color: #FFFFFF!important;
//     text-decoration: none;
//   }

//   &:before {
//     content: '';
//     left: -1px;
//     top: -1px;
//     position: absolute;
//     display: block;
//     border-top-left-radius: 4px;
//     border-bottom-left-radius: 4px;
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: 60%;
//   }

//   &_xs {
//     padding: 0 10px 0 42px;
//     font-size: 11px;
//     line-height: 30px;
//     &:before {
//       width: 24px;
//       height: 24px;
//     }
//   }

//   &_sm {
//     padding: 0 10px 0 42px;
//     font-size: 11px;
//     line-height: 30px;
//     &:before {
//       width: 32px;
//       height: 32px;
//     }
//   }

//   &_md {
//     padding: 0 15px 0 55px;
//     font-size: 16px;
//     line-height: 38px;
//     &:before {
//       width: 40px;
//       height: 40px;
//     }
//   }

//   &_telegram {
//     &:before {
//       background-color: #4B9FDB;
//       background-image: $ico-telegram;
//     }
//     &:hover {
//       border-color: #4B9FDB;
//       background-color: #4B9FDB;
//     }
//   }

//   &_skype {
//     &:before {
//       background-color: #00AFF0;
//       background-image: $ico-skype;
//     }
//     &:hover {
//       border-color: #00AFF0;
//       background-color: #00AFF0;
//     }
//   }

//   &_whatsapp {
//     &:before {
//       background-color: #3ACE01;
//       background-image: $ico-whatsapp;
//     }
//     &:hover {
//       border-color: #3ACE01;
//       background-color: #3ACE01;
//     }
//   }

//   &_email {
//     &:before {
//       background-color: #FF5E38;
//       background-image: $ico-email;
//     }
//     &:hover {
//       border-color: #FF5E38;
//       background-color: #FF5E38;
//     }
//   }

//   &_fb {
//     &:before {
//       background-color: #4969AD;
//       background-image: $ico-fb;
//       background-size: auto;
//     }
//     &:hover {
//       border-color: #4969AD;
//       background-color: #4969AD;
//     }
//   }

//   &_vk {
//     &:before {
//       background-color: #5376A4;
//       background-image: $ico-vk;
//       background-size: auto;
//     }
//     &:hover {
//       border-color: #5376A4;
//       background-color: #5376A4;
//     }
//   }

//   &_twitter {
//     &:before {
//       background-color: #5AB5F8;
//       background-image: $ico-twitter;
//       background-size: auto;
//     }
//     &:hover {
//       border-color: #5AB5F8;
//       background-color: #5AB5F8;
//     }
//   }

//   &_instagram {
//     background: linear-gradient(49.12deg, #FFDD55 6.62%, #FF543E 50.06%, #C837AB 93.5%);
//     &:before {
//       background-image: $ico-instagram;
//       background-size: auto;
//     }
//     &:hover {
//       background-color: linear-gradient(49.12deg, #FFDD55 6.62%, #FF543E 50.06%, #C837AB 93.5%);
//     }
//   }

//   &_chat {
//     padding-left: 10px;
//     padding-right: 10px;
//     color: #FFFFFF!important;
//     background-color: #70AC30;
//     border-color: #70AC30;
//     font-weight: bold;
//     font-family: 'Proxima Nova';
//     &:before {
//       margin-right: 10px;
//       width: 16px;
//       height: 14px;
//       top: 0;
//       left: 0;
//       display: inline-block;
//       position: relative;
//       vertical-align: middle;
//       background-size: 16px;
//       background-image: $ico-chat;
//     }
//     &:hover {
//       color: #FFFFFF!important;
//       border-color: #70AC30;
//       background-color: #70AC30;
//     }
//   }
  
//   &_icon {
//     border: none;
//     &:before {
//       left: 0;
//       top: 0;
//       border-radius: 4px;
//     }
//     &.btn-contact_xs {
//       padding: 12px;
//     }

//     &.btn-contact_sm {
//       padding: 15px;
//     }

//     &.btn-contact_md {
//       padding: 20px;
//     }
//   }

// }
</style>