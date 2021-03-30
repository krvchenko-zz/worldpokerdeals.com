<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="/admin"><b>Admin</b>WPD</a>
    </div>

    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>
      <form @submit.prevent="login" @keydown="form.onKeydown($event)">
        <div class="form-group">
          <el-input
            size="medium"
            v-model="form.email"
            name="email"
            clearable
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
            clearable
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
        <div class="form-group row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
              <el-checkbox v-model="remember">{{ $t('form.remember_me') }}</el-checkbox>
            </div>
          </div>
          <div class="col-xs-4 text-right">
            <el-button
              size="medium"
              native-type="submit"
              type="primary"
              :loading="loading">{{ $t('form.signin') }}
            </el-button>
          </div>
        </div>
      </form>
      
      <router-link :to="{ name: 'password.email' }">{{ $t('form.password_reset') }}</router-link> 
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
      email: '',
      password: ''
    }),
    remember: true
  }),

  methods: {
    async login () {
      // Submit the form.
      this.loading = true
      const { data } = await this.form.post('/auth/login')
      .catch((error) => {
        let errors = this.form.errors.flatten()
        this.loading = false
        // this.$message({
        // title: 'Error',
        //   showClose: true,
        //   message: errors.join('<br/>'),
        //   type: 'error',
        //   duration: 0,
        //   dangerouslyUseHTMLString: true
        // })
      })

      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember
      })

      // Fetch the user.
      // await this.$store.dispatch('auth/fetchUser')
      // .then(() => {
      //   this.loading = false
      // })

      // Redirect home.
      // this.$router.push({ name: 'room.list' })
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