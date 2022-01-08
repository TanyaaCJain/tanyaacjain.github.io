<template>
  <div class="is-smooth-scroll-compatible is-loading">
    <!-- <Nav /> -->
    <Nuxt />
  </div>
</template>

<script>
import locomotive from '~/mixins/locomotive.js'

export default {
  mixins: [locomotive],
}
</script>

<style lang="scss">
.div {
  cursor: url(../static/img/circleGradient.png), auto;
}
</style>
