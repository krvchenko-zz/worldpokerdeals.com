<template>
<div class="comments">

  <div v-if="comments" class="block-title block-title_lg">
    Комментарии <span class="comments__count">{{ comments.total }}</span>
  </div>

  <comment-list v-if="comments">
    <transition-group name="fade">
      <comment-item
        v-for="item in comments.data"
        :key="item.id"
        :comment="item"
      />
    </transition-group>
  </comment-list>

  <div v-if="comments && comments.next_page_url" class="comments-more">
    <button class="btn btn-border comments__more" @click.prevent="handleLoadMore">
      Показать еще <span>{{ remain }}</span>
    </button>
  </div>

  <comment-form
    v-if="showForm && user"
    :commentable_id="commentable_id"
    :commentable_type="commentable_type"
  ></comment-form>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import CommentForm from '~/components/comments/CommentForm'
import CommentList from '~/components/comments/CommentList'
import CommentItem from '~/components/comments/CommentItem'

export default {

  name: 'Comments',

  components: {
    CommentForm,
    CommentList,
    CommentItem
  },

  props: {

    commentable_id: {
      type: Number,
      required: true,
    },

    commentable_type: {
      type: String,
      required: true,
    }
  },

  data: () => ({
    showForm: true,
    loading: false,
    per_page: 5
  }),

  computed: {
    ...mapGetters({
      user: 'auth/user',
      comments: 'comments/comments'
    }),
    remain() {
      let remain = (this.comments.per_page - this.comments.per_page) + 5
      return remain + this.comments.to > this.comments.total ? this.comments.total - this.comments.to : remain
    },
  },

  async fetch() {
    await axios.get('comments/list', {
      params: {
        per_page: this.per_page,
        sort: 'created_at',
        order: 'desc',
        commentable_id: this.commentable_id,
        commentable_type: this.commentable_type,
      }
    })
    .then(response => {
      this.$store.commit('comments/FETCH_COMMENTS', { comments: {
        to: response.data.to,
        total: response.data.total,
        per_page: response.data.per_page,
        next_page_url: response.data.next_page_url,
        prev_page_url: response.data.prev_page_url,
        page: response.data.page,
        data: response.data.data.map(this.mapComments)
      } })
    })
    .catch(e => {
    })
  },

  methods: {

    handleLoadMore() {
      this.per_page = this.per_page + 5
      // this.$nuxt.$loading.start()
      this.$fetch()
    },

    mapComments(item) {
      return ({
        id: item.id,
        parent_id: item.parent_id,
        created_at: item.created_at,
        commentable_id: item.commentable_id,
        commentable_type: item.commentable_type,
        user: {
          username: item.user.username,
          image: item.user.image ? {
            filename: item.user.image.filename
          } : null,
        },
        replies: item.replies.map(this.mapComments),
        text: item.text
      })
    },
  }
}
</script>

<style lang="scss">
.comments {
  &__count {
    margin-left: 15px;
    padding: 2px 10px;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 1px;
    color: #555555;
    border: 1px solid #AAAAAA;
    border-radius: 50px;
  }

  &__more {
    padding: 5px 15px;
    font-family: 'Proxima Nova Sb';
    font-style: normal;
    font-size: 14px;
    line-height: 14px;
    margin-left: 5px;
    span {
      margin-left: 5px;
      text-align: center;
      padding: 0 7px;
      min-width: 22px;
      height: 22px;
      border: 1px solid rgba(204, 204, 204, 0.6);
      border-radius: 50px;
      display: inline-block;
      font-family: 'Proxima Nova Sb';
      font-style: normal;
      font-size: 13px;
      line-height: 20px;
      text-align: center;
      color: #AAAAAA;
    }
  }
}
</style>