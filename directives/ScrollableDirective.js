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
				toggleRight = document.querySelector('.scrollable__item_r'),
				toggleLeft = document.querySelector('.scrollable__item_l'),
				position = 0,
				scrollTo = 0,
				back = false,
				//Touch
				isDown = false,
				startX,
				scrollLeft

			if (itemsWidth > containerWidth) {

				if (!toggleRight && !toggleLeft) {
					toggleRight = document.createElement('button')
					toggleLeft = document.createElement('button')

					toggleRight.classList.add('scrollable__item')
					toggleRight.classList.add('scrollable__item_r')
					toggleRight.classList.add('scrollable__item_hidden')

					toggleLeft.classList.add('scrollable__item')
					toggleLeft.classList.add('scrollable__item_l')
					toggleLeft.classList.add('scrollable__item_hidden')

					parent.appendChild(toggleRight)
					parent.appendChild(toggleLeft)
				}

				if (scrollTo + containerWidth < itemsWidth) {
					toggleRight.classList.remove('scrollable__item_hidden')
				}

				toggleRight.addEventListener('click', function() {

					if (position + 5 <= (items.length - 1)) {
						position = position + 5
						toggleLeft.classList.remove('scrollable__item_hidden')
					}

					if (position + 5 >= (items.length - 1)) {
						toggleRight.classList.add('scrollable__item_hidden')
					}

					scrollTo = items[position].offsetLeft

					container.scrollTo({
						top: 0,
						left: scrollTo,
						behavior: 'smooth',
					})

				})

				toggleLeft.addEventListener('click', function() {

					if (position - 5 <= (items.length - 1)) {
						position = position - 5
					}

					if (position <= 0) {
						toggleLeft.classList.add('scrollable__item_hidden')
						toggleRight.classList.remove('scrollable__item_hidden')
					}

					if (position > 0) {
						toggleRight.classList.remove('scrollable__item_hidden')
					}

					if (position + 5 >= (items.length - 1)) {
						toggleRight.classList.remove('scrollable__item_hidden')
					}

					scrollTo = items[position].offsetLeft

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

	// bind: (el, binding) => {},
	// update: (el, binding) => {},
}
