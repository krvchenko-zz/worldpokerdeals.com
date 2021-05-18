<template>
	<li
		:class="[
			'toc__item',
			inline && 'toc__item_inline',
			active && 'toc__item_active',
			white && 'toc__item_white',
		]"
	>
		<a
			:href="`#${anchor}`"
			:class="[
				'toc__link',
				inline && 'toc__link_inline',
				active && 'toc__link_active',
				white && 'toc__link_white',
			]"
			@click.prevent="handleClick(index)"
			>{{ text }}</a
		>
	</li>
</template>

<script>
	export default {
		name: 'TocItem',

		props: {
			anchor: {
				type: String,
				required: true,
			},

			text: {
				type: String,
				required: true,
			},

			inline: {
				type: Boolean,
			},

			white: {
				type: Boolean,
			},

			index: {
				type: Number,
			},
		},

		data: () => ({
			active: false,
		}),

		computed: {},

		watch: {},

		created() {
			process.browser && window.addEventListener('scroll', this.handleScroll)
		},

		destroyed() {},

		methods: {
			handleScroll() {
				let el = document.getElementById(`${this.anchor}`)
				if (el) {
					let elTop = el.getBoundingClientRect().top
					let elBottom = el.getBoundingClientRect().bottom
					if (elTop - 82 <= 0) {
						this.active = true
					} else {
						this.active = false
					}
				}
			},

			scrollToElement() {
				let el = document.getElementById(this.anchor)
				if (el) {
					// el.scrollIntoView({ behavior: 'smooth', block: 'start' })
					let offset = el.getBoundingClientRect().top - 80 + window.pageYOffset
					window.scrollTo({ top: offset, behavior: 'smooth' })
				}
			},

			handleClick(index) {
				this.$emit('click', index)
				this.scrollToElement()
			},
		},
	}
</script>

<style lang="scss">
	.toc {
		&__item {
			padding: 0 0 15px 15px;
			position: relative;
			&:before {
				content: '';
				top: 3px;
				left: 0;
				position: absolute;
				height: 9px;
				width: 9px;
				display: block;
				border: 2px solid #ffffff;
				border-radius: 50%;
				background: #c4c4c4;
				z-index: 2;
			}

			&:after {
				content: '';
				top: 5px;
				left: 4px;
				width: 1px;
				position: absolute;
				height: 100%;
				display: block;
				background: #e5e5e5;
				z-index: 1;
			}

			&:last-child {
				&:after {
					display: none;
				}
			}

			&_active {
				&:before {
					background: #ffffff;
					border: 2px solid #cccccc;
				}

				&:after {
					top: 5px;
					left: 3px;
					width: 3px;
					background: #cccccc;
				}
			}

			&_inline {
				margin: 0 40px 16px 0;
				padding: 0;
				display: inline-block;
				vertical-align: top;
				&:before {
					display: none;
				}

				&:after {
					display: none;
				}
			}

			&:last-child {
				margin: 0;
			}
		}

		&__link {
			display: block;
			color: #008be2;
			font-style: normal;
			line-height: 18px;
			font-size: 14px;
			font-family: 'Proxima Nova Sb';
			text-decoration: none;
			&:hover,
			&:active,
			&:focus,
			&:visited,
			&:link {
				color: #008be2;
				text-decoration: none;
			}

			&_active {
				color: #999999;
			}

			&_inline {
				font-family: 'Proxima Nova Sb';
				font-style: normal;
				font-size: 16px;
				line-height: 22px;
				text-decoration: none;
				border-bottom: 1px solid rgba(0, 139, 226, 0.3);
				&:hover,
				&:active,
				&:focus,
				&:visited,
				&:link {
					border-bottom: 1px solid rgba(0, 139, 226, 0.3);
					text-decoration: none;
				}
			}

			&_white {
				color: #ffffff;
				border-bottom: 1px solid rgba(255, 255, 255, 0.3);
				&:hover,
				&:active,
				&:focus,
				&:visited,
				&:link {
					color: #ffffff;
					text-decoration: none;
					border-bottom: 1px solid rgba(255, 255, 255, 0.3);
				}
			}
		}
	}
</style>
