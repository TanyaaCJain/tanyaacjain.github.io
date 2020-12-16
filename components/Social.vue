<template>
  <div id="js-scroll" data-scroll-section class="atleast-full-page container">
    <div class="social-header">
      <div class="text in-view" data-scroll data-scroll-speed="3" data-scroll-repeat>
        Connect @
      </div>
      <div class="h3 backgroundstripe in-view" data-scroll data-scroll-delay="0.05" data-scroll-speed="5" data-scroll-repeat>
        Connect @
      </div>
      <!-- <div class="bgcircle300px posmodifier"></div> -->
    </div>
    <div class="row section-text social-text text-bounding-box">
      <div v-for="(paragraph, index) in this.social_list" :key="index">
        <p v-html="paragraph"> </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      social_list: ''
    }
  },
  created () {
    this.fetch_social_data()
  },
  methods: {
    fetch_social_data () {
      this.social_list = this.$store.state.modules.social.social.list
    }
  }
}
</script>

<style lang="scss">
.social-header {
  .text {
    font-family: 'vnwf-cr', serif;
    color:  rgb(223, 169, 20);
    font-size: 10vw;
    padding: 40px 0 0 20px;
    justify-content: center;
  }
  .h3.backgroundstripe {
    z-index: -1;
    padding-left: 56px;
    background-color: #e6e3ce;
    transform: translate(-50%, 0) rotate(-2deg) !important;
    color: transparent;
    border: 1px solid transparent;
    bottom: 8vw;
    position: relative;
    font-size: 8vw;
  }
  .bgcircle300px.posmodifier {
    left: 34%;
    top: 2%;
    right: auto;
    bottom: auto;
    background-color: #000;
    position: absolute;
    z-index: -1;
    width: 300px;
    height: 300px;
    border-radius: 50%;
  }
}
.social-text {
  font-size: 48px;
  border: 1px solid;
  padding: 30px;
  margin: 1.5em !important;
  box-shadow: 10px 10px 0 0 #000, 0 4px 4px 0 rgba(0,0,0,.05);
}
@media screen and (max-width: 360px) {
  .social-header {
    .text {
      font-size: 20vw;
    }
    .h3.backgroundstripe {
      font-size: 13vw;
      bottom: 13vw;
    }
  }
  .social-text {
    font-size: 18px;
    margin: 5px;
    padding: 20px;
  }
}
@media screen and (min-width: 360px) and (max-width: 450px) {
  .social-header {
    .text {
      font-size: 20vw;
    }
    .h3.backgroundstripe {
      font-size: 16vw;
      bottom: 16vw;
    }
  }
  .social-text {
    font-size: 25px;
    margin: 5px;
    padding: 20px;
  }
}
@media screen and (min-width: 450px) and (max-width: 650px) {
  .social-header {
    .text {
      font-size: 18vw;
    }
    .h3.backgroundstripe {
      font-size: 16vw;
      bottom: 16vw;
    }
  }
  .social-text {
    font-size: 30px;
    margin: 5px;
    padding: 20px;
  }
}
@media screen and (min-width: 650px) and (max-width: 1000px) {
  .social-header {
    .text {
      font-size: 15vw;
    }
    .h3.backgroundstripe {
      font-size: 13vw;
      bottom: 13vw;
    }
  }
}
</style>
