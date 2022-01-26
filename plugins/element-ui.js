import Vue from 'vue'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

import { Select, Option, Skeleton, SkeletonItem } from 'element-ui'
[Select, Option, Skeleton, SkeletonItem].forEach(Component => {
	Vue.component(Component.name, Component)
})
