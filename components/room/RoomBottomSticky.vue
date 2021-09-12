<template>
  <div class="room-bottom-sticky" :style="{
    background: room.background
  }">
    <div class="room-bottom-sticky__logo">
      <img
        class="room-bottom-sticky__logo-img"
        decoding="async"
        loading="lazy"
        :style="{}"
        :src="logo"
        :alt="room.image.alt || `${room.title} logo`"
      >
    </div>
    <div class="room-bottom-sticky__actions">
      <room-action-button
        class="btn-block"
        :style="{
          marginRight: '28px',
          fontSize: '16px',
          lineHeight: '16px',
        }"
        :slug="room.slug"
        :icon="false"
        :disabled="!room.available || room.closed || room.blacklist"
        type="download"
        :label="$t('room_download')"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'RoomBottomSticky',

    components: {},

    props: {},

    data: () => ({}),

    created() {},

    computed: {
      ...mapGetters({
        room: 'rooms/room',
      }),

      mediaUrl() {
        return process.env.mediaUrl
      },

      logo() {
        return `${this.mediaUrl}/room-logo/${this.room.image.filename}`
      },
    },

    watch: {},

    methods: {

    },
  }
</script>

<style lang="scss">
  .room-bottom-sticky {
    padding: 15px;
    width: 100%;
    left: 0;
    bottom: 0;
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 100;
    &__logo {
      margin-right: 20px;
      &-img {
        max-width: 100%;
        height: auto;
      }
    }
    &__actions {
      flex-grow: 1;
    }
  }
</style>
