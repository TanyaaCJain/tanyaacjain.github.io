<template>
  <div class="vhcenter position-div">
    <img class="header-img" :src="images.header_img" />
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
.position-div {
  position: absolute;
}

.header-img {
  max-width: 60vw;
}
</style>
