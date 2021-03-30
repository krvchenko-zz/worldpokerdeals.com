import Vue from 'vue'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

import {
  Select,
  Option
} from 'element-ui'

[
  Select,
  Option
].forEach(Component => {
  Vue.component(Component.name, Component)
})