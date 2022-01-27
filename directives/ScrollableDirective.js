export default {
	name: 'scrollable',

	update: (el, binding) => {

		const getItemsWidth = function(items) {
			let width = 0
			for (var i = 0; i < items.length; i++) {
				width += items[i].offsetWidth
			}
			return width
		}

		const closest = function(items, container, position) {
			for (var i = position; i >= 0; i--) {
				if (container.scrollLeft >= items[i].offsetLeft && position > 5) {
					return i
				}

				return 0
			}
		}

		const handler = function() {
			let container = el,
				parent = el.parentNode,
				items = container.children,
				containerWidth = container.offsetWidth,
				itemsWidth = getItemsWidth(items),
				toggleRight = document.querySelector('.scrollable__item_r'),
				toggleLeft = document.querySelector('.scrollable__item_l'),
				maxScrollRight = container.scrollWidth - container.clientWidth,
				position = 0,
				scrollTo = 0,
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

					position + 5 <= items.length - 1 ?
						position = position + 5 :
						position = items.length - 1

					scrollTo = items[position].offsetLeft

					container.scrollTo({
						top: 0,
						left: scrollTo - 52,
						behavior: 'smooth',
					})

				})

				toggleLeft.addEventListener('click', function() {

					position - 5 <= items.length && position >= 5 ?
						position = position - 5 :
						position = 0

					if (container.scrollLeft < items[position].offsetLeft) {
						position = closest(items, container, position)
					}

					position = closest(items, container, position)

					scrollTo = items[position].offsetLeft

					container.scrollTo({
						top: 0,
						left: scrollTo - 52,
						behavior: 'smooth',
					})
				})
			}

			container.addEventListener('scroll', (e) => {

				for (var i = 0; i < items.length; i++) {
					if (e.target.scrollLeft >= items[i].offsetLeft - 52)
						position = i
				}

				if (e.target.scrollLeft >= maxScrollRight)
					toggleRight.classList.add('scrollable__item_hidden'),
					position = items.length - 1
				else
					toggleRight.classList.remove('scrollable__item_hidden')

				e.target.scrollLeft === 0 ?
					toggleLeft.classList.add('scrollable__item_hidden') :
					toggleLeft.classList.remove('scrollable__item_hidden')

			})

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
