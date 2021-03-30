<template>
<div class="author">
	<div class="author-avatar">
    <img class="author-avatar__img" :src="avatar" :alt="author.full_name" loading="lazy"> 
  </div>
  
  <div class="author-info">
    <div class="author-info__label">Автор обзора</div>
    <div class="author-info__name">{{ author.full_name }}</div>
    <div class="author-info__summary"></div>
  </div>

  <div class="author-contacts">
    <div class="author-contacts__label">Контакты автора</div>
    <div class="author-contacts-links">
      <button-contact type="fb" icon size="xs" :href="author.facebook"></button-contact>
      <button-contact type="vk" icon size="xs" :href="author.vk"></button-contact>
      <button-contact type="twitter" icon size="xs" :href="author.twitter"></button-contact>
      <button-contact type="instagram" icon size="xs" :href="author.instagram"></button-contact>
    </div>
  </div>

</div>
</template>

<script>

import ButtonContact from '~/components/ButtonContact'

export default {

  name: 'Author',

  components: {
    ButtonContact
  },

  props: {
    author: {
      type: Object
    }
  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    avatar() {
      return `${this.mediaUrl}/manager-small/${this.author.image.filename}`
    },
    mediaUrl() {
      return process.env.mediaUrl
    },
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">
.author {
  margin-top: 24px;
  margin-bottom: 30px;
  padding: 20px;
  border-top: 2px solid #CCCCCC;
  background: linear-gradient(360deg, #FFFFFF -1.39%, #F1EFEF 107.71%);
  display: flex;
  &-avatar {
    margin-right: 20px;
    width: 70px;
    height: 70px;
    &__img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 2px solid #FFFFFF;
    }
  }
  &-info {
    width: 100%;
    margin-right: 30px;
    &__label {
      margin-bottom: 5px;
      font-family: 'Proxima Nova Sb';
      font-size: 14px;
      line-height: 18px;
      color: #777777;
    }

    &__name {
      margin-bottom: 10px;
      font-family: 'Proxima Nova';
      font-weight: bold;
      font-size: 20px;
      line-height: 22px;
      letter-spacing: -0.2px;
      color: #243238;
    }

    &__summary {
      font-family: 'Proxima Nova';
      font-size: 14px;
      line-height: 18px;
      color: #666666;
    }
  }
  &-contacts {
    &__label {
      margin-bottom: 10px;
      font-family: Proxima Nova;
      font-size: 12px;
      line-height: 18px;
      color: #777777;
    }
    &-links {
      white-space: nowrap;
    }
  }
}
</style>