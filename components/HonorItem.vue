<template>
  <div v-if="id" :id="id" class="honor-card row">
    <div class="col honors-img">
      <img :src="image" />
    </div>
    <div class="col honors-text">
      <div class="honors-label">{{ type }}. ({{ year }})</div>
      <div class="honors-heading">
        {{ name }}
      </div>
      <!-- <hr> -->
      <div class="honors-desc">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    year: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  methods: {
    get_image(imageName) {
      return '../assets/img/honors/' + imageName
    },
    close() {
      this.id = false
    },
  },
}
</script>

<style lang="scss" scoped>
.honor-card {
  padding: 20px 0;

  .honors-img {
    max-width: 130px;
    padding: 0 1px;
    height: 230px;

    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
  .honors-text {
    .honors-label {
      font-size: 1.5em;
    }
    .honors-heading {
      font-size: 2.5em;
      line-height: 1.2em;
    }
    .honors-desc {
      font-size: 1.2em;
      line-height: 1.2em;
    }
  }
}
@media screen and (max-width: 400px) {
  .honor-card {
    .honors-img {
      max-width: 110px;
    }

    .honors-text {
      .honors-label {
        font-size: 1.2em;
      }
      .honors-heading {
        font-size: 1.5em;
        line-height: 1.2em;
      }
      .honors-desc {
        font-size: 0.8em;
        line-height: 1.2em;
      }
    }
  }
}
</style>
