<template>
  <div data-scroll-section class="header-full-height container">
    <header class="header">
      <div class="overlay" />
      <HeaderImage />
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: {
        header_img: require('@/static/img/tanya-jain.png'),
      },
    }
  },
}
</script>

<style scoped>
.header {
  display: table;
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../static/img/bg.jpg) no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;

  /* background-color: rgb(177 152 114 / 50%); */
  background-blend-mode: overlay;
}

.overlay {
  position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(
    143,
    114,
    87,
    0.61
  ); /* Black background with opacity */

  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
}
</style>
