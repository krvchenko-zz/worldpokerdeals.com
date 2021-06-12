export default {
	name: 'scrollable',

	inserted: (el, binding) => {
		const getItemsWidth = function(items) {
			let width = 0
			for (var i = 0; i < items.length; i++) {
				width += items[i].offsetWidth
			}
			return width
		}

		const handler = function() {
			let container = el,
				parent = el.parentNode,
				items = container.children,
				containerWidth = container.offsetWidth,
				itemsWidth = getItemsWidth(items),
				toggle = document.querySelector('.scrollable__item'),
				position = 0,
				scrollTo = 0,
				back = false,
				//Touch
				isDown = false,
				startX,
				scrollLeft

			if (itemsWidth > containerWidth) {
				if (!toggle) {
					toggle = document.createElement('button')
					toggle.classList.add('scrollable__item')
					parent.appendChild(toggle)
				}

				if (scrollTo + containerWidth < itemsWidth) {
					toggle.classList.add('scrollable__item_r')
				}

				toggle.addEventListener('click', function() {
					if (position + 5 < items.length && !back) {
						position = position + 5
					} else {
						back = true
						position = position - 5
					}

					if (position - 5 < 0) {
						back = false
					}

					scrollTo = items[position].offsetLeft

					if (position + 5 >= items.length) {
						toggle.classList.remove('scrollable__item_r')
						toggle.classList.add('scrollable__item_l')
					}

					if (position - 5 < 0) {
						toggle.classList.remove('scrollable__item_l')
						toggle.classList.add('scrollable__item_r')
					}

					container.scrollTo({
						top: 0,
						left: scrollTo,
						behavior: 'smooth',
					})
				})
			}

			container.addEventListener('mousedown', e => {
				startX = e.pageX - container.offsetLeft
				scrollLeft = container.scrollLeft
			})

			container.addEventListener('mousedown', e => {
				isDown = true
				container.classList.add('active')
				startX = e.pageX - container.offsetLeft
				scrollLeft = container.scrollLeft
			})

			container.addEventListener('mouseleave', () => {
				isDown = false
				container.classList.remove('active')
			})

			container.addEventListener('mouseup', e => {
				e.stopPropagation()
				isDown = false
				container.classList.remove('active')
			})

			container.addEventListener('mousemove', e => {
				if (!isDown) return
				e.preventDefault()
				const x = e.pageX - container.offsetLeft
				const walk = x - startX
				container.scrollLeft = scrollLeft - walk
			})
		}

		handler()
		window.addEventListener('load', handler)
		window.addEventListener('resize', handler)
	},

	bind: (el, binding) => {},

	update: (el, binding) => {},
}
