<template>
  <div
    id="js-scroll"
    data-scroll-section
    class="about atleast-full-page container"
  >
    <div data-scroll class="is-inview about-header">
      <!-- <img :src="images.sample" loop=infinite/> -->
      <img class="about-header-img" :src="images.sample" />
    </div>
    <div class="row">
      <div class="col-md-9 about-text">
        <div class="section-text about-text text-bounding-box">
          <div>
            <div v-for="(point, index) in about_list" :key="index">
              {{ point }}
            </div>
          </div>
          <div class="about-detail">
            <div v-for="(paragraph, index) in about_detail" :key="index">
              <p v-html="paragraph" />
            </div>
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
        sample: require('@/static/img/about.png'),
      },
      about_list: '',
      about_detail: '',
    }
  },
  created() {
    this.fetch_about_data()
  },
  methods: {
    fetch_about_data() {
      this.about_list = this.$store.state.modules.about.about.list
      this.about_detail = this.$store.state.modules.about.about.in_detail
    },
  },
}
</script>

<style lang="scss">
.about-text {
  font-size: 1.2em;
  padding: 0 10px;
}
.about-detail {
  padding-top: 20px;
}
.about-header-img {
  width: 40vw;
}
@media screen and (max-width: 400px) {
  .about-header-img {
    width: 90vw;
  }
  .about-text {
    font-size: 1em;
  }
}
@media screen and (min-width: 400px) and (max-width: 550px) {
  .about-header-img {
    width: 60vw;
  }
}
</style>
