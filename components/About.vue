<template>
  <div
    id="js-scroll"
    data-scroll-section
    class="about atleast-full-page container"
  >
    <div data-scroll class="is-inview about-header">
      <AboutHeader />
      <!--img :src="images.sample" loop=infinite /-->
    </div>
    <div class="row">
      <div class="col-md-9 about-text">
        <div class="section-text about-text text-bounding-box">
          <div v-for="(paragraph, index) in about_list" :key="index">
            <p v-html="paragraph" />
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <!-- About -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: {
        sample: require('@/static/gifs/about.gif'),
      },
      about_list: '',
    }
  },
  created() {
    this.fetch_about_data()
  },
  methods: {
    fetch_about_data() {
      this.about_list = this.$store.state.modules.about.about.list
    },
  },
}
</script>

<style lang="scss">
.about-text {
  font-size: 20px;
}
</style>
