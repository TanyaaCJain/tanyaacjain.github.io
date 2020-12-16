<template>
  <div id="js-scroll" data-scroll-section class="about atleast-full-page">
    <div class="hundred atleast-full-page">
      <!-- <div class="planet">
        &#127765;
      </div> -->
      <div class="vintage-objects">
        <div class="vintage -right in-view" data-scroll data-scroll-speed="1" data-scroll-repeat>
          <img src="../assets/img/vintage/girl_sway.png">
        </div>
        <div class="vintage -left2 -bottom in-view" data-scroll data-scroll-speed="4" data-scroll-repeat>
          <img src="../assets/img/vintage/book.png">
        </div>
        <div class="vintage -left -top in-view" data-scroll data-scroll-speed="2" data-scroll-repeat>
          <img src="../assets/img/vintage/cassette.png">
        </div>
        <div class="vintage -right2 -bottom2 in-view" data-scroll data-scroll-speed="6" data-scroll-repeat>
          <img src="../assets/img/vintage/flower1.png">
        </div>
        <div class="vintage -center in-view" data-scroll data-scroll-speed="9" data-scroll-repeat>
          <img src="../assets/img/vintage/ballet.png">
        </div>
      </div>
    </div>
    <div class="links-wrapper container" role="feed">
      <div class="links-display-picture">
        <img src="../assets/img/links/ldp.png">
      </div>
      <div class="links-handle">
        @tanzitri
      </div>
      <LinkCard
        v-for="(item, index) in links_list"
        :id="item.id"
        :key="index"
        :text="item.text"
        :link="item.link"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Links',
  data () {
    return {
      links_list: [],
      vintage_objects: []
    }
  },
  created () {
    this.fetch_links_data()
  },
  methods: {
    fetch_links_data () {
      this.links_list = this.$store.state.modules.links.links.list
    }
  }
}
</script>

<style lang="scss">
nav.navbar {
  background-color: #301e03 !important;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;

  a {
    color: #fff !important;
  }
}
.links-wrapper {
  padding: 50px 0;

  .links-display-picture {
    display: flex;
    justify-content: center;
    padding: 20px 0;

    img {
      border-radius: 50px;
      height: 100px;
      width: 100px;
    }
  }
  .links-handle {
    text-align: center;
    color: #fff;
    font-size: 1.5em;
  }
}
.hundred {
  position: absolute;
  z-index: -1;
  background-color: #301e03;

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
  .links-wrapper {
    .links-header {
      font-size: 13vw;
      line-height: 1.2em;
      padding: 0.6em;
    }
  }
}
</style>
