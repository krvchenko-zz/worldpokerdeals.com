export default {
  name: 'carousel',

  inserted: (el, binding) => {

    let getItemsWidth = function(items) {
      let width = 0
      for (var i = 0; i < items.length; i++) {
        let margin = parseInt(getComputedStyle(items[i], null).marginRight)
        width += items[i].offsetWidth + margin
      }
      return width
    }

    let handler = function() {

      // Carousel
      let elements = el.getElementsByClassName('gallery')

      for (var i = 0; i < elements.length; i++) {
        let gallery = elements[i],
            wrapper = gallery.parentNode,
            slides = gallery.children,
            galleryWidth = gallery.offsetWidth,
            galleryHeight = gallery.offsetHeight,
            itemsWidth = getItemsWidth(slides),
            position = 0,
            scrollTo = 0,
            //Touch
            isDown = false,
            startX,
            scrollLeft

        if (wrapper.className !== 'gallery-wrap') {
          wrapper = document.createElement('div')
          wrapper.className = 'gallery-wrap'
          gallery.parentNode.insertBefore(wrapper, gallery)
          wrapper.appendChild(gallery)
        }

        wrapper.style.height = `${galleryHeight}px`

        if (itemsWidth > galleryWidth) {

          let toggleBtn = wrapper.querySelector('.gallery__btn')

          if (!toggleBtn) {
            toggleBtn = document.createElement('span')
            toggleBtn.className = 'gallery__btn gallery__btn_next'
            wrapper.appendChild(toggleBtn)
          }

          toggleBtn.addEventListener('click', function () {
            if (scrollTo + galleryWidth < itemsWidth) {
              let nextSlide = slides[position]
              scrollTo += nextSlide.offsetWidth + parseInt(getComputedStyle(nextSlide, null).marginRight)
              position++
            } else {
              position = 0
              scrollTo = 0
            }
            gallery.scrollTo({
              top: 0,
              left: scrollTo,
              behavior: 'smooth'
            })
          })
        }

        gallery.addEventListener('mousedown', (e) => {
          isDown = true
          gallery.classList.add('active')
          startX = e.pageX - gallery.offsetLeft
          scrollLeft = gallery.scrollLeft
        })
        gallery.addEventListener('mouseleave', () => {
          isDown = false
          gallery.classList.remove('active')
        })
        gallery.addEventListener('mouseup', (e) => {
          e.stopPropagation()
          isDown = false
          gallery.classList.remove('active')
        })
        gallery.addEventListener('mousemove', (e) => {
          if(!isDown) return
          e.preventDefault()
          const x = e.pageX - gallery.offsetLeft
          const walk = (x - startX)
          gallery.scrollLeft = scrollLeft - walk
        })
      }
    }

    let images = el.getElementsByClassName('gallery__item-img')

    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener('load', handler)
    }

    window.addEventListener('load', handler)
    window.addEventListener('resize', handler)
  },

  bind: (el, binding) => {

  },

  update: (el, binding) => {

  },
}