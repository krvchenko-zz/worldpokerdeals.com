import Vue from 'vue'
import GLightbox from 'glightbox'
Vue.use(GLightbox)

export default ({ app }, inject) => {
  inject('glightbox', (props) => {
  	return new GLightbox(props)
  } )
}