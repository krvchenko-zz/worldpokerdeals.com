<template>
  <div class="soft-category-header">
    <div class="container-fluid">
      
      <breadcrumb-list v-if="pageable" :white="true" />

      <div class="soft-category-header__wrap">
        <div class="row">
          <div class="col-9">
            <i v-if="category.icon" class="soft-category-header__icon">
              <svg-icon :icon="category.icon" />
            </i>
            <div class="soft-category-meta__wrap">
              <h1 class="soft-category__title">{{ category.title }}</h1>
              <page-meta
                :author="category.author.full_name"
                :created="category.created_at"
                :updated="category.updated_at"
              >
              </page-meta>
            </div>
            <div class="soft-category__summary" v-html="category.summary"></div>
          </div>
          <div class="col-3">
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <!-- Navigation -->
      <div class="row">
        <div class="col-9">
          <nav-list>
            <nav-item v-for="(item, index) in categories" :key="index" 
              :name="item.label"
              :page="item.page"
              :icon="item.icon"
              >
            </nav-item>
          </nav-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

  name: 'SoftCategoryHeader',

  components: {

  },

  props: {
  },

	created() {

	},

	data: () => ({

	}),

  computed: {
    ...mapGetters({
      category: 'soft/category',
      pageable: 'pages/page',
      categories: 'soft/categories'
    }),
  },

  watch: {

  },

	methods: {

	}
}
</script>

<style lang="scss">

$category-bg: url('~assets/i/soft/category-bg.jpg?data');

.soft-category {

  &-header {
    margin-bottom: 60px;
    // background: radial-gradient(96.88% 66.11% at 57.43% 2.13%, #6E43A5 0%, #2B0759 100%);
    background: $category-bg no-repeat center;
    background-size: cover;

    &__wrap {
      padding: 0;
      position: relative;
    }

    &__icon {
      margin-right: 28px;
      display: inline-block;
      vertical-align: top;
    }
  }

  &__title {
    margin-bottom: 10px;
    font-family: 'Proxima Nova';
    font-weight: bold;
    font-style: normal;
    font-size: 32px;
    line-height: 36px;
    color: #FFFFFF;
  }

  &-meta {
    display: flex;
    &__wrap {
      display: inline-block;
    }
  }

  &__summary {
    padding-bottom: 40px;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 22px;
    color: #FFFFFF;
    opacity: 0.8;
  }
}
</style>