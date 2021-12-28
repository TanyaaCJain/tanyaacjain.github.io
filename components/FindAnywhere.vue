<template>
  <div data-scroll-section class="find-anywhere-scrolling-container">
    <hr class="marquee-binding-hr">
    <span id="marqueeZZ" class="find-anywhere-scrolling">
      Find Anywhere on Web as @tanyaacjain
      <img class="polygon-rotate" :src="images.sample">
    </span>
    <hr class="marquee-binding-hr">
  </div>
</template>

<script>

export default {
  data () {
    return {
      images: {
        sample: require('@/static/gifs/hexagonRotate.gif')
      },
      marquee_scrolling: '',
      elem: '',
      elemHTML: ''
    }
  },
  mounted () {
    this.scroll()
  },
  methods: {
    scroll () {
      for (let i = 0; i < 10; i++) {
        this.elem = document.getElementById('marqueeZZ')
        this.elemHTML = this.elem.innerHTML
        this.elem.innerHTML += this.elemHTML
      }
    }
  }
}
</script>

<style lang="scss">
#marquee-scroller {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}
.find-anywhere-scrolling-container {
  overflow: hidden;
  white-space: nowrap;
}
.find-anywhere-scrolling {
  font-size: 30px;
  text-transform: uppercase;
  letter-spacing: 3px;
  animation: marquee 4800s linear infinite;
  display: inline-block;

  img {
    height: 120px;
  }
}
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
.find-anywhere-scrolling-2 {
  font-size: 30px;
  text-transform: uppercase;
  letter-spacing: 3px;
  animation: marquee 21s linear infinite;
  display: inline-block;
  animation-delay:1.5s;

  img {
    height: 120px;
  }
}
@keyframes marquee {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
.delay-5 {
  animation-delay: 5s;
}
@media screen and (max-width: 400px) {
  .find-anywhere-scrolling,
  .find-anywhere-scrolling-2 {
    font-size: 15px;

    img {
      height: 60px;
    }
  }
  .marquee-binding-hr {
    margin: 0;
  }
}
@media screen and (min-width: 400px) and (max-width: 550px) {
  .find-anywhere-scrolling,
  .find-anywhere-scrolling-2 {
    font-size: 25px;

    img {
      height: 70px;
    }
  }
  .marquee-binding-hr {
    margin: 0;
  }
}
</style>
