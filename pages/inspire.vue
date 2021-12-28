<template>
  <div id="js-scroll" data-scroll-section class="about atleast-full-page">
    <!-- <div class="about atleast-full-page"> -->
    <div class="honors-header">Honors &amp; Awards &#127942;</div>
    <div
      class="space-holder"
      :style="`height:calc(${horizontalScrollWidth}px - 100vw + 100vh + 150)`"
    >
      <div ref="sticky" class="sticky">
        <!-- <div class="honors-wrapper"> -->
        <!-- <div class="honors-header">
          Honors &amp; Awards &#127942;
        </div> -->
        <div
          ref="horizontal"
          class="horizontal"
          :style="`transform:translateX(${stickyOffsetTop}px)`"
        >
          <div class="cards" role="feed">
            <HonorCard
              v-for="(item, index) in honors_list"
              :id="item.id"
              :key="index"
              :name="item.name"
              :type="item.type"
              :year="item.year"
              :description="item.description"
            />
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <div class="honors-header" style="height: 100vh">
      Honors &amp; Awards &#127942;
    </div>
  </div>
</template>

<script>
// import horizontalStickyScroll from '~/mixins/horizontal_sticky_scroll.js'

export default {
  // mixins: [horizontalStickyScroll],
  data() {
    return {
      honors_list: [],
      vintage_objects: [],
      horizontalScrollWidth: '',
      stickyOffsetTop: '',
    }
  },
  watch: {
    horizontalScrollWidth() {
      let scrollWidth = '0'
      if (this.$refs.horizontal) {
        scrollWidth = this.$refs.horizontal.scrollWidth
      } else {
        scrollWidth = '0'
      }
      // console.log("horizontal scrollWidth ", scrollWidth)
      return scrollWidth
    },
    stickyOffsetTop() {
      let offsetTop = '0'
      if (this.$refs.sticky) {
        offsetTop = this.$refs.sticky.offsetTop
      } else {
        offsetTop = '0'
      }
      // console.log("sticky offsetTop ", offsetTop)
      return offsetTop * -1
    },
  },
  created() {
    this.fetch_honors_data()
    // console.log("refs ", this.$refs)
  },
  // mounted  () {
  //   document.addEventListener('wheel', (e) => {
  //     document.querySelector('.cards').scrollLeft += e.deltaY;
  //   })
  // },
  methods: {
    fetch_honors_data() {
      this.honors_list = this.$store.state.modules.honors.honors.list
    },
    handleScroll() {
      // console.log('sticky offset', this.$refs)
    },
  },
  // head: {
  //   script: [
  //     {
  //       src: './js/horizontal_sticky_scrolling.js'
  //     },
  //   ]
  // }
}
</script>

<style lang="scss" scoped>
.space-holder {
  position: relative;
  width: 100%;
}
.sticky {
  position: sticky;
  top: 0;
  // height: 100vh;
  width: 100%;
  // overflow-x: hidden;
  overflow-x: scroll;
  overflow-y: hidden;

  .horizotal {
    position: absolute;
    // height: 100%;
    will-change: transform;

    .cards {
      position: relative;
      height: 100%;
      padding: 0 0 0 150px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
.honors-header {
  font-size: 6vw;
  font-family: 'vnwf-scu', serif;
  color: rgb(223, 169, 20);
  padding: 1em;
  overflow-x: scroll;
}
.honors-wrapper {
  // .honors-header {
  //   font-size: 6vw;
  //   font-family: 'vnwf-scu', serif;
  //   color:  rgb(223, 169, 20);
  //   padding: 1em;
  //   overflow-x: scroll;
  // }
  .honor-card-wrapper {
    display: inline-flex;
    min-width: 100vw;
    justify-content: center;
    bottom: 100px;
    top: auto;
    position: absolute;
  }
}
</style>
