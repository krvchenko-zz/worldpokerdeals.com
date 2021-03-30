let getProps = (el, direction) => {
  let elements = el.children,
      containerWidth = el.offsetWidth,
      itemsWidth = 0,
      visibleItemsWidth = 0,
      visibleItemsCount = 0,
      hiddenItemsCount = el.children.length

  for (var i = 0; i < elements.length; i++) {
    itemsWidth += elements[i].offsetWidth
    if (containerWidth >= visibleItemsWidth + elements[i].offsetWidth) {
      hiddenItemsCount--;
      visibleItemsCount++;
      visibleItemsWidth += elements[i].offsetWidth;
    }
  }

  return {
    containerWidth: containerWidth,
    itemsWidth: itemsWidth,
    visibleWidth: visibleItemsWidth,
    visible: visibleItemsCount,
    hidden: hiddenItemsCount
  }
}

let scrollRight = true

export default {
  name: 'scrollable',
  inserted: (el, binding) => {

    let handler = function (evt) {

      el.scrollLeft = 0

      el.classList.add('scrollable')

      const props = getProps(el),
            scrolls = document.getElementsByClassName('scrollable__item')

      let toggleBtn = document.createElement('span'),
          text = document.createTextNode(`+ ${props.hidden}`)

      toggleBtn.classList.add('scrollable__item')

      for (var i = 0; i < scrolls.length; i++) {
        scrolls[i].remove()
      }

      if (props.itemsWidth >= props.containerWidth) {
        toggleBtn.appendChild(text)
        toggleBtn.classList.add('scrollable__item_r', 'active')
        el.parentNode.appendChild(toggleBtn)
      }

      toggleBtn.addEventListener('click', scrollItemsToggle)
    }

    let scrollItems = function(evt) {
      const props = getProps(el),
            toggleBtn = document.getElementsByClassName('scrollable__item')

      if (evt.target.scrollLeft + props.containerWidth >= props.itemsWidth) {
        scrollRight = false
        toggleBtn[0].classList.remove('scrollable__item_r')
        toggleBtn[0].classList.add('scrollable__item_l')
      }

      if (evt.target.scrollLeft <= 0) {
        scrollRight = true
        toggleBtn[0].classList.remove('scrollable__item_l')
        toggleBtn[0].classList.add('scrollable__item_r')
      }
    }

    let scrollItemsToggle = function(evt) {
      const props = getProps(el),
            scroll = props.itemsWidth - props.visibleWidth

      el.scrollTo({
        left: scrollRight ? scroll : -scroll,
        behavior: 'smooth'
      })
    }

    el.addEventListener('scroll', scrollItems)
    window.addEventListener('resize', handler)
    handler()
  },

  bind: (el, binding) => {

  },

  update: (el, binding) => {

  }
}