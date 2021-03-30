<template>
  <a
    :href="url"
    rel="nofollow noopener"
    :class="[
      'btn',
      'btn-block',
      'btn-payments',
      flat && 'btn-payments_plain',
      `btn-payments_${type}`
    ]" v-on="external ? {} : {click: handleClick}">{{ label }}</a>
</template>

<script>

export default {

  name: 'PaymentsButtonAction',

  components: {

  },

  props: {
    label: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: '#'
    },
    external: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'default'
    },
    flat: {
      type: Boolean,
      default: false
    }
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
    handleClick(e) {
      e.preventDefault()
      this.$emit('click', true)
    }
	}
}
</script>

<style lang="scss">
.btn-payments {
  padding: 16px 20px;
  font-family: 'Proxima Nova Sb';
  font-style: normal;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
  color: #FFFFFF;
  border-radius: 4px;
  &:active,
  &:hover,
  &:focus {
    color: #FFFFFF;
  }
  &_skrill {
    box-shadow: 0px 4px 0px #A21C74;
    background: linear-gradient(180deg, #C93095 0%, #B52183 100%),
                linear-gradient(0deg, #B82787, #B82787),
                radial-gradient(100% 100% at 100% 0%, #BC3590 0%, #8D276C 61.46%);
  }

  &_neteller {
    background: linear-gradient(180deg, #8BBB4E 0%, #6F9E32 100%),
                linear-gradient(0deg, #B82787, #B82787),
                radial-gradient(100% 100% at 100% 0%, #BC3590 0%, #8D276C 61.46%);
    box-shadow: 0px 4px 0px #628E28;
  }

  &_ecopayz {
    background: linear-gradient(180deg, #4F93D5 0%, #3E7EBB 100%),
                linear-gradient(0deg, #B82787, #B82787),
                radial-gradient(100% 100% at 100% 0%, #BC3590 0%, #8D276C 61.46%);
    box-shadow: 0px 4px 0px #2F6CA7;
    border-radius: 4px;
  }

  &_default {
    background: linear-gradient(180deg, #FFB82E 0%, #EC8E02 100%), #F5A200;
    box-shadow: 0px 4px 0px #D78100;
  }

  &_plain {
    box-shadow: none;
  }
}
</style>