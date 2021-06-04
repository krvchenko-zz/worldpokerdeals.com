module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	globals: {
		$nuxt: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	extends: [
		'plugin:vue/base',
		'plugin:prettier/recommended',
		// 'eslint:recommended',
	],
	plugins: ['vue', 'prettier'],
	rules: {
		'vue/no-unused-vars': 'off',
		'vue/no-unused-components': 'off',
		'vue/no-use-v-if-with-v-for': 'off',
		'prettier/prettier': 'error',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
}
