export default {
	name: 'table-hideable',

	inserted: (el, binding) => {
		;(Element.prototype.appendAfter = function(element) {
			element.parentNode.insertBefore(this, element.nextSibling)
		}),
			false
		;(Element.prototype.appendBefore = function(element) {
			element.parentNode.insertBefore(this, element)
		}),
			false

		let handler = function() {
			let tables = el.getElementsByTagName('table')

			for (var t = 0; t < tables.length; t++) {
				if (tables[t].className === 'default' || tables[t].className === '') {
					// Wrap table
					let tbody = tables[t].getElementsByTagName('tbody')[0],
						thead = tables[t].getElementsByTagName('thead')[0],
						rows = tbody.getElementsByTagName('tr'),
						wrapper = document.createElement('div')

					wrapper.setAttribute('class', 'table-wrap')
					tables[t].parentNode.insertBefore(wrapper, tables[t])
					wrapper.appendChild(tables[t])

					if ((thead && rows.length > 3) || (!thead && rows.length > 4)) {
						let toggleBtn = document.createElement('span'),
							toggleWrap = document.createElement('div'),
							text = document.createTextNode('Показать еще')

						toggleWrap.setAttribute('class', 'table-toggle')
						toggleBtn.appendChild(text)
						toggleBtn.className = 'table-toggle__btn'

						toggleWrap.appendAfter(tables[t])
						toggleWrap.appendChild(toggleBtn)

						toggleBtn.rows = []
						toggleBtn.show = true
						toggleBtn.addEventListener('click', toggleElements)

						let i = thead && rows.length > 3 ? 3 : 4

						for (i; i < rows.length; i++) {
							toggleBtn.rows.push(rows[i])
							rows[i].style = 'display:none;'
						}
					}
				}
			}
		}

		let toggleElements = evt => {
			evt.currentTarget.show = !evt.currentTarget.show
			for (var i = 0; i < evt.currentTarget.rows.length; i++) {
				if (!evt.currentTarget.show) {
					evt.currentTarget.innerHTML = 'Скрыть'
					evt.currentTarget.rows[i].style = ''
				} else {
					evt.currentTarget.innerHTML = 'Показать еще'
					evt.currentTarget.rows[i].style = 'display:none;'
				}
			}
		}
		handler()
	},

	bind: (el, binding) => {},

	update: (el, binding) => {},
}
