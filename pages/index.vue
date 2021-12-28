<template>
  <div id="js-scroll" data-scroll-container>
    <Header />
    <FindAnywhere />
    <About />
    <hr data-scroll-section />
    <!-- <TestHonor /> -->
    <Press />
    <Honors />
    <Gradient />
    <Social />
    <EndCredits />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import About from '@/components/About.vue'
import locomotive from '~/mixins/locomotive.js'

export default {
  component: {
    Header,
    About,
  },
  mixins: [locomotive],
}
</script>
