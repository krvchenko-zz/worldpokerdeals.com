export default {
  name: 'scrollable',

  inserted: (el, binding) => {

    let getItemsWidth = function(items) {
      let width = 0
      for (var i = 0; i < items.length; i++) {
        width += items[i].offsetWidth
      }
      return width
    }

    let handler = function() {

      let container = el,
          parent = el.parentNode,
          items = container.children,
          containerWidth = container.offsetWidth,
          itemsWidth = getItemsWidth(items),
          toggle = document.querySelector('.scrollable__item'),
          position = 0,
          scrollTo = 0,

          //Touch
          isDown = false,
          startX,
          scrollLeft

      if (itemsWidth > containerWidth) {

        if (!toggle) {
          toggle = document.createElement('button')
          toggle.className = 'scrollable__item scrollable__item_r'
          parent.appendChild(toggle)
        }

        toggle.addEventListener('click', function () {
          if (scrollTo + containerWidth < itemsWidth) {
            position = position + 5
            scrollTo = items[position].offsetLeft
          } else {
            position = 0
            scrollTo = 0
          }
          container.scrollTo({
            top: 0,
            left: scrollTo,
            behavior: 'smooth'
          })
        })
      }

      container.addEventListener('mousedown', (e) => {
        isDown = true
        container.classList.add('active')
        startX = e.pageX - container.offsetLeft
        scrollLeft = container.scrollLeft
      })
      container.addEventListener('mouseleave', () => {
        isDown = false
        container.classList.remove('active')
      })
      container.addEventListener('mouseup', (e) => {
        e.stopPropagation()
        isDown = false
        container.classList.remove('active')
      })
      container.addEventListener('mousemove', (e) => {
        if(!isDown) return
        e.preventDefault()
        const x = e.pageX - container.offsetLeft
        const walk = (x - startX)
        container.scrollLeft = scrollLeft - walk
      })

    }

    handler()
    window.addEventListener('load', handler)
    window.addEventListener('resize', handler)
  },

  bind: (el, binding) => {

  },

  update: (el, binding) => {

  },
}