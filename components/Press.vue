<template>
  <div id="js-scroll" data-scroll-section class="about atleast-full-page">
    <div class="press-wrapper">
      <PressHeader />
      <p class="press-header-desc">Hover for details.</p>
      <hr />
      <div
        v-for="(item, index) in press_list"
        :id="index"
        :key="index"
        :class="[
          'press-box',
          item.type === 'Talk' ? 'talk-cursor' : '',
          item.cursor ? item.cursor : '',
        ]"
        @mouseover="mouseOver(index)"
        @mouseleave="mouseLeave()"
      >
        <a :href="item.link" class="press-link">
          <p class="press-title" v-html="item.name" />
          <p v-if="hoveredState && hoveredIndex === index" class="press-desc">
            <span class="press-label">
              {{ item.type }}
            </span>
            ({{ item.year }})
            {{ item.description }}
          </p>
        </a>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoveredState: false,
      hoveredIndex: '',
    }
  },
  created() {
    this.fetch_press_data()
  },
  methods: {
    fetch_press_data() {
      this.press_list = this.$store.state.modules.press.press.list
    },
    mouseOver(index) {
      this.hoveredState = true
      this.hoveredIndex = index
    },
    mouseLeave() {
      this.hoveredState = false
      this.hoveredIndex = ''
    },
  },
}
</script>

<style lang="scss">
.press-header-desc {
  font-family: 'vnwf-cr', serif;
  color: rgb(223, 169, 20);
  font-size: 6vw;
  padding: 40px 0 0 20px;
}
.press-title {
  font-family: 'EB Garamond', serif;
  font-size: 37px;
  line-height: 1em;
  padding: 0 25px;
}
.press-desc {
  padding: 0 25px;
}
.press-label {
  background: #000;
  color: #fff;
  border-radius: 10px;
  padding: 0 5px;
  margin: 0 5px;
}
a.press-link[href] {
  color: #985d03;
  text-decoration: none;
}
a.press-link:hover[href] {
  color: #bb7a18;
  text-decoration: none;
  cursor: url(../static/img/rightArrow.png), auto;
}
@media screen and (max-width: 360px) {
  .press-title {
    font-size: 25px;
  }
  hr {
    margin: 20px;
  }
}
@media screen and (min-width: 360px) and (max-width: 450px) {
  .press-title {
    font-size: 30px;
  }
  hr {
    margin: 20px;
  }
}
@media screen and (min-width: 450px) and (max-width: 650px) {
  .press-title {
    font-size: 35px;
  }
  hr {
    margin: 20px;
  }
}
</style>
