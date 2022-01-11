<template>
  <div id="js-scroll" data-scroll-container>
    <HeaderSection />
    <FindAnywhere />
    <AboutSection />
    <hr data-scroll-section />
    <!-- <TestHonor /> -->
    <PressSection />
    <HonorsSection />
    <GradientSection />
    <SocialSection />
    <EndCredits />
  </div>
</template>

<script>
import HeaderSection from '~/components/HeaderSection.vue'
import AboutSection from '~/components/AboutSection.vue'
import locomotive from '~/mixins/locomotive.js'

export default {
  component: {
    HeaderSection,
    AboutSection,
  },
  mixins: [locomotive],
}
</script>
