module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  globals: {
    $nuxt: true
  },
  // required to lint *.vue files
  plugins: ["vue", "prettier"],
  // add your custom rules here
  // rules: {},
  rules: {
    // 'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": 0,
    "vue/no-unused-vars": 0
  }
};
