<template>
  <div v-if="loading" class="search-loader">
    <div v-for="index in 12" :key="index"></div>
  </div>
</template>

<script>
export default {
  name: 'SearchLoader',

  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
  .search-loader {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 20px;
  }
  .search-loader div {
    transform-origin: 10px 10px;
    animation: search-loader 1.2s linear infinite;
  }
  .search-loader div:after {
    content: '';
    display: block;
    position: absolute;
    top: calc(3px / 4);
    left: calc(37px / 4);
    width: calc(6px / 4);
    height: calc(20px / 4);
    border-radius: calc(20% / 4);
    background: #1981B2;
  }
  .search-loader div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  .search-loader div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  .search-loader div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  .search-loader div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  .search-loader div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  .search-loader div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  .search-loader div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  .search-loader div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  .search-loader div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  .search-loader div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  .search-loader div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  .search-loader div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes search-loader {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>