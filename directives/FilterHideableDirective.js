function handler(el, binding, vNode) {
    let elements = el.getElementsByClassName('filter-item')

    if (elements.length > 5) {
      for (let i = 5; i < elements.length; i++) {
        elements[i].style.display = 'none'
      }

      const t = vNode.context;
      t.$nextTick(() => {
        t.shouldShowMore = true
        t.hiddenItemsLength = elements.length - 5
      })

      if (binding.value.showAll) {
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = 'flex'
        }
      }
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
