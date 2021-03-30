<template>
<div class="form-radio-group">
	<slot/>
</div>
</template>

<script>

export default {

  name: 'FormRadioGroup',

  components: {

  },

  props: {

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
.form-radio-group {
  display: flex;
  .form-radio {
    margin-right: 40px;
    &:last-child {
      margin: 0;
    }
  }
}
</style>