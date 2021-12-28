<template>
  <div class="press-section-header">
    <div v-if="is_press" class="press-header">
      <div id="p" class="press-1">P</div>
      <div id="r" class="press-2">R</div>
      <div id="e" class="press-3">E</div>
      <div id="s1" class="press-4">S</div>
      <div id="s2" class="press-5">S</div>
    </div>
    <div v-if="!is_press" class="talks-header">
      <div id="t" class="talks-1">T</div>
      <div id="a" class="talks-2">A</div>
      <div id="l" class="talks-3">L</div>
      <div id="k" class="talks-4">K</div>
      <div id="s" class="talks-5">S</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_press: 'true',
    }
  },
  mounted() {
    this.animateHeader()
  },
  methods: {
    animateHeader() {
      if (this.is_press) {
        this.is_press = false
        setTimeout(this.animateHeader, 500)
      } else {
        this.is_press = true
        setTimeout(this.animateHeader, 500)
      }
    },
  },
}
</script>

<style lang="scss">
.press-header,
.talks-header {
  font-family: 'vnwf-et', serif;
  padding: 0;
  width: 100vw;
  font-size: 18vw;
  display: inline-flex;
  justify-content: center;

  div {
    width: 1.2em;
    height: 1.2em;
    line-height: 1.45em;
    text-align: center;
  }
}
.press-1 {
  font-family: 'vnwf-scu', serif;
  background: #000;
  color: #fff;
}
.press-2 {
  font-family: 'vnwf-cr', serif;
  background: rgb(223, 169, 20);
  color: #000;
  width: 0.8em !important;
}
.press-3 {
  font-family: 'vnwf-seb', serif;
  background: #000;
  color: rgb(223, 169, 20);
  width: 1.5em !important;
}
.press-4 {
  font-family: 'vnwf-scl', serif;
  background: rgb(223, 169, 20);
  color: #000;
  width: 0.8em !important;
}
.press-5 {
  font-family: 'vnwf-cr', serif;
  background: #000;
  color: #fff;
  width: 1em !important;
}
.talks-1 {
  font-family: 'vnwf-cr', serif;
  background: #000;
  color: rgb(223, 169, 20);
  width: 0.8em !important;
}
.talks-2 {
  font-family: 'vnwf-seb', serif;
  background: rgb(223, 169, 20);
  color: #000;
  width: 1.5em !important;
}
.talks-3 {
  font-family: 'vnwf-cr', serif;
  background: #000;
  color: #fff;
  width: 1em !important;
}
.talks-4 {
  font-family: 'vnwf-scu', serif;
  background: rgb(223, 169, 20);
  color: #000;
}
.talks-5 {
  font-family: 'vnwf-scl', serif;
  background: #000;
  color: rgb(223, 169, 20);
  width: 0.8em !important;
}
</style>
