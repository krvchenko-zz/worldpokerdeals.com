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
					items = gallery.children,
					containerWidth = gallery.offsetWidth,
					containerHeight = gallery.offsetHeight,
					itemsWidth = getItemsWidth(items),
					maxScrollRight = gallery.scrollWidth - gallery.clientWidth,
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

				let	toggleRight = wrapper.querySelector('.gallery__btn_next'),
						toggleLeft = wrapper.querySelector('.gallery__btn_prev')

				wrapper.style.height = `${containerHeight}px`

				if (itemsWidth > containerWidth) {

					if (!toggleRight && !toggleLeft) {
						toggleRight = document.createElement('button')
						toggleLeft = document.createElement('button')

						toggleRight.classList.add('gallery__btn')
						toggleRight.classList.add('gallery__btn_next')
						toggleRight.classList.add('gallery__btn_hidden')

						toggleLeft.classList.add('gallery__btn')
						toggleLeft.classList.add('gallery__btn_prev')
						toggleLeft.classList.add('gallery__btn_hidden')

						wrapper.appendChild(toggleRight)
						wrapper.appendChild(toggleLeft)
					}

					if (scrollTo + containerWidth < itemsWidth) {
						toggleRight.classList.remove('gallery__btn_hidden')
					}

					toggleRight.addEventListener('click', () => {

						position + 1 <= items.length - 1 ?
							position = position + 1 :
							position = items.length - 1

						scrollTo = items[position].offsetLeft

						gallery.scrollTo({
							top: 0,
							left: scrollTo,
							behavior: 'smooth',
						})
					})

					toggleLeft.addEventListener('click', () => {

						position - 1 <= items.length && position >= 1 ?
							position = position - 1 :
							position = 0

						scrollTo = items[position].offsetLeft

						gallery.scrollTo({
							top: 0,
							left: scrollTo,
							behavior: 'smooth',
						})
					})

					gallery.addEventListener('scroll', (e) => {

						for (var i = 0; i < items.length; i++) {
							if (e.target.scrollLeft >= items[i].offsetLeft)
								position = i
						}

						if (e.target.scrollLeft >= maxScrollRight || position + 1 >= items.length)
							toggleRight.classList.add('gallery__btn_hidden'),
							position = items.length - 1
						else
							toggleRight.classList.remove('gallery__btn_hidden')

						e.target.scrollLeft === 0 ?
							toggleLeft.classList.add('gallery__btn_hidden') :
							toggleLeft.classList.remove('gallery__btn_hidden')

					})
				}

				gallery.addEventListener('mousedown', e => {
					isDown = true
					gallery.classList.add('active')
					startX = e.pageX - gallery.offsetLeft
					scrollLeft = gallery.scrollLeft
				})

				gallery.addEventListener('mouseleave', () => {
					isDown = false
					gallery.classList.remove('active')
				})

				gallery.addEventListener('mouseup', e => {
					e.stopPropagation()
					isDown = false
					gallery.classList.remove('active')
				})

				gallery.addEventListener('mousemove', e => {
					if (!isDown) return
					e.preventDefault()
					const x = e.pageX - gallery.offsetLeft
					const walk = x - startX
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
		window.addEventListener('scroll', handler)
	},

	bind: (el, binding) => {},

	update: (el, binding) => {},
}
