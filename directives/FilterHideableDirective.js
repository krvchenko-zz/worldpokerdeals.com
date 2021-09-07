function handler(el, binding, vNode) {
    let elements = el.getElementsByClassName('filter-item')
    const t = vNode.context

    if (elements.length > 5) {
      for (let i = 5; i < elements.length; i++) {
        elements[i].style.display = 'none'
      }

      t.$nextTick(() => {
        t.shouldShowMore = true
        t.hiddenItemsLength = elements.length - 5
      })

      if (binding.value.showAll) {
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = 'flex'
        }
      }
    } else {
      t.$nextTick(() => {
        t.shouldShowMore = false
        t.hiddenItemsLength = 0
      })
    }

    return
}

export default {
  name: 'filter-hideable',

  inserted: (el, binding, vNode) => {
    handler(el, binding, vNode)
  },

  bind: (el, binding) => {},

  update: (el, binding) => {},

  componentUpdated: (el, binding, vNode) => {
    handler(el, binding, vNode)
  }
}
