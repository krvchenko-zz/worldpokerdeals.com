<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="/admin"><b>Admin</b>WPD</a>
    </div>

    <div class="login-box-body">
      <p class="login-box-msg">{{ $t('form.password_reset') }}</p>
      <form @submit.prevent="reset" @keydown="form.onKeydown($event)">
        <div class="form-group">
          <el-input
            size="medium"
            v-model="form.email"
            name="email"
            autocomplete="false"
            suffix-icon="el-icon-user"
            :placeholder="$t('form.email')"
            :class="{ 'is-invalid': form.errors.has('email') }"
            id="email">
          </el-input>
          <transition name="fade">
            <has-error :form="form" field="email" />
          </transition>
        </div>

        <div class="form-group">
          <el-input
            size="medium"
            v-model="form.password"
            name="password"
            show-password
            autocomplete="false"
            suffix-icon="el-icon-lock"
            :placeholder="$t('form.password')"
            :class="{ 'is-invalid': form.errors.has('password') }"
            id="password">
          </el-input>
          <transition name="fade">
            <has-error :form="form" field="password" />
          </transition>
        </div>

        <div class="form-group">
          <el-input
            size="medium"
            v-model="form.password_confirmation"
            name="password_confirmation"
            show-password
            autocomplete="false"
            suffix-icon="el-icon-lock"
            :placeholder="$t('form.password_confirmation')"
            :class="{ 'is-invalid': form.errors.has('password_confirmation') }"
            id="password_confirmation">
          </el-input>
          <has-error :form="form" field="password_confirmation" />
        </div>
        <div class="form-group">
          <el-button
            size="medium"
            native-type="submit"
            type="primary"
            :loading="loading">{{ $t('form.password_reset_btn') }}
          </el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Form from 'vform'

export default {
  middleware: 'guest',
  layout: 'basic',

  components: {

  },

  metaInfo () {
    return { title: this.$t('login') }
  },

  data: () => ({
    loading: false,
    form: new Form({
      token: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    remember: true
  }),

  created () {
    this.form.token = this.$route.params.token
  },

  methods: {
    async reset () {
      // Submit the form.
      this.loading = true
      const { data } = await this.form.post('/password/reset')
      .catch((error) => {
        let errors = this.form.errors.flatten()
        this.loading = false
        this.$message({
          title: 'Error',
          showClose: true,
          message: errors.join('<br/>'),
          type: 'error',
          dangerouslyUseHTMLString: true
        })
      })

      this.loading = false
      this.$message({
        title: 'Success',
        showClose: true,
        message: data.message,
        type: 'success'
      })
      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser')
      .then(() => {
        this.loading = false
      })

      this.form.reset()

      // Redirect home.
      this.$router.push({ name: 'room.list' })
    }
  }
}
</script>
<style lang="less">
  .invalid-feedback {
    width: 100%;
    color: #dd4b39;
  }
  .is-invalid {
    input, textarea {
      border-color: #dd4b39;
      &:focus,
      &:active,
      &:hover {
        border-color: #dd4b39;
      }
    }
    .el-input__icon {
      color: #dd4b39;
    }
  }

  .form-group {
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>