import Vue from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'

[
  Swiper,
  SwiperSlide
].forEach(Component => {
  Vue.component(Component.name, Component)
})