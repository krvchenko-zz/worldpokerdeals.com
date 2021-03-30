<template>
<div class="faq">
  <div class="block-title block-title_lg">{{ label }}</div>
  <slot/>
</div>
</template>

<script>

export default {

  name: 'FaqList',

  props: {
    label: {
      type: String,
      required: true
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

	}
}
</script>

<style lang="scss">
.faq {
  margin-bottom: 40px;
}
</style>