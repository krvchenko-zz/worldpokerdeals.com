function recursivelyRemoveAttr(el, attr) {
	if (!el) {
		return
	}
	el.removeAttribute(attr)
	;[].forEach.call(el.children, child => {
		recursivelyRemoveAttr(child, attr)
	})
}

function uniqueId(el) {
	if (!el) {
		return
	}

	let childrens = el.getElementsByTagName('*'),
		ids = [],
		pairs = []

	for (let i = 0; i < childrens.length; i++) {
		if (childrens[i].hasAttribute('id')) {
			ids.push(childrens[i].getAttribute('id'))
		}
	}

	for (let i = 0; i < ids.length; i++) {
		let id = `[id="${ids[i]}"]`,
			fill = `[fill="url(#${ids[i]})"]`,
			clipPath = `[clip-path="url(#${ids[i]})"]`,
			target1 =
				el.querySelectorAll(fill)[0] || el.querySelectorAll(clipPath)[0],
			target2 = el.querySelectorAll(id)[0]

		if (target1 && target2) {
			pairs[i] = [
				{
					target1: target1,
				},
				{
					target2: target2,
				},
			]
		}
	}

	for (let i = 0; i < pairs.length; i++) {
		if (pairs[i]) {
			let newId = Math.random()
					.toString(36)
					.substr(2, 9),
				target1 = pairs[i][0]['target1'],
				target2 = pairs[i][1]['target2'],
				checkFill = target1.hasAttribute('fill'),
				checkClip = target1.hasAttribute('clip-path')

			if (checkFill && checkClip) {
				target1.setAttribute('clip-path', `url(#${newId})`)
			}

			if (checkFill && !checkClip) {
				target1.setAttribute('fill', `url(#${newId})`)
			}

			target2.setAttribute('id', newId)
		}
	}
}

export default {
	name: 'svg',

	inserted: (el, binding) => {

		if (binding.value.fill) {
			recursivelyRemoveAttr(el, 'fill')
			el.setAttribute('fill', binding.value.fill)
		}

		if (binding.value.opacity) {
			recursivelyRemoveAttr(el, 'opacity')
			el.setAttribute('opacity', binding.value.opacity)
		}

		if (binding.value.width || binding.value.height) {
			el.setAttribute('width', `${binding.value.width}px`)
			el.setAttribute('height', `${binding.value.height}px`)
		}
		
		if (binding.value.removeClipPath) {
			recursivelyRemoveAttr(el, 'clip-path')
		}
		
		if (binding.value.viewBox) {
			el.setAttribute('viewBox', binding.value.viewBox)
		}

		uniqueId(el)
	},

	bind: (el, binding) => {},

	update: (el, binding) => {},
}
