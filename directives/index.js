import Vue from 'vue'

const requireContext = require.context('./', false, /^(?!.*index).*\.(js)$/)

requireContext.keys().forEach((file) => {
  const Directive = requireContext(file).default

  if (Directive.name) {
    Vue.directive(Directive.name, Directive)
  }
})