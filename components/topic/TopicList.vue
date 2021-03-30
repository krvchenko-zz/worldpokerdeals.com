<template>
<div class="topics">
	<div class="topics__label">Интересное по теме</div>
  <div class="topics__list">
    <slot/>
  </div>
</div>
</template>

<script>

export default {

  name: 'TopicList',

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
$ico-topics: url('~assets/i/ico-topics.svg?data');

.topics {
  margin-bottom: 40px;
  border-radius: 4px;
  overflow: hidden;
  background: #2E3141;
  box-shadow: 0px 2px 0px rgba(198, 199, 202, 0.5);
  &__label {
    position: relative;
    padding: 20px 24px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.2px;
    color: #FFFFFF;
    background: #2E3141;
    &:after {
      right: 20px;
      top: 12px;
      position: absolute;
      content: '';
      width: 40px;
      height: 40px;
      background: $ico-topics no-repeat center;
    }
  }
}
</style>