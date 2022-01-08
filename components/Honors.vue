<template>
  <div id="js-scroll" data-scroll-section class="about atleast-full-page">
    <div class="hundred atleast-full-page">
      <div class="planet">&#127765;</div>
      <div class="vintage-objects">
        <div
          class="vintage -right in-view"
          data-scroll
          data-scroll-speed="1"
          data-scroll-repeat
        >
          <img src="../assets/img/vintage/girl_sway.png" />
        </div>
        <div
          class="vintage -left2 -bottom in-view"
          data-scroll
          data-scroll-speed="4"
          data-scroll-repeat
        >
          <img src="../assets/img/vintage/book.png" />
        </div>
        <div
          class="vintage -left -top in-view"
          data-scroll
          data-scroll-speed="2"
          data-scroll-repeat
        >
          <img src="../assets/img/vintage/cassette.png" />
        </div>
        <div
          class="vintage -right2 -bottom2 in-view"
          data-scroll
          data-scroll-speed="6"
          data-scroll-repeat
        >
          <img src="../assets/img/vintage/flower1.png" />
        </div>
        <div
          class="vintage -center in-view"
          data-scroll
          data-scroll-speed="9"
          data-scroll-repeat
        >
          <img src="../assets/img/vintage/ballet.png" />
        </div>
      </div>
    </div>
    <div class="honors-wrapper">
      <div class="honors-header">Honors &amp; Awards &#127942;</div>
      <div
        class="container"
        role="feed"
        data-scroll
        data-scroll-speed="3"
        data-scroll-repeat
      >
        <HonorItem
          v-for="(item, index) in honors_list"
          :id="item.id"
          :key="index"
          :name="item.name"
          :type="item.type"
          :year="item.year"
          :description="item.description"
          :image="require(`../assets/img/honors/${item.img}`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      honors_list: [],
      vintage_objects: [],
    }
  },
  created() {
    this.fetch_honors_data()
  },
  methods: {
    fetch_honors_data() {
      this.honors_list = this.$store.state.modules.honors.honors.list
    },
  },
}
</script>

<style lang="scss" scoped>
.hundred {
  position: absolute;
  z-index: -1;
  background-image: radial-gradient(
    rgba(255, 202, 53, 0.74) 4%,
    rgb(228, 205, 39) 20%,
    white 60%
  );

  .planet {
    font-size: 32vw;
    text-align: center;
    align-items: center;
    line-height: 63vw;
  }
  .vintage-objects {
    position: absolute;
    right: 20px;
    top: 30%;
    height: calc(100vh - 2em) !important;
    width: 100vw;

    .vintage {
      position: absolute;

      img {
        max-width: 24vw;
      }
    }
  }
}
.space-holder {
  position: relative;
  width: 100%;
}
.sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  .horizotal {
    position: absolute;
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
@media screen and (max-width: 1000px) {
  .hundred {
    .planet {
      font-size: 60vw;
      line-height: 150vw;
    }
    .vintage-objects {
      height: calc(100vh - 14em) !important;

      .vintage {
        img {
          max-width: 40vw;
        }
      }
    }
  }
  .honors-wrapper {
    .honors-header {
      font-size: 13vw;
      line-height: 1.2em;
      padding: 0.6em;
    }
  }
}
</style>
