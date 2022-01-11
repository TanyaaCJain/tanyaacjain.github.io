<template>
  <div v-if="id_retrieved" :id="id_retrieved">
    <a :href="link">
      <div class="link-card">
        <div class="link-text">
          {{ text }}
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      id_retrieved: this.id,
    }
  },
  methods: {
    close() {
      this.id_retrieved = false
    },
  },
}
</script>

<style lang="scss" scoped>
.link-card {
  border: solid 2px #fff;
  border-radius: 20px;
  width: 90%;
  min-width: 300px;
  padding: 15px;
  margin: 20px auto;
  background-color: #fff;
  color: #301e03;

  &:hover {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff !important;
  }

  .link-text {
    font-size: 1.3em;
    text-align: center;
  }
}
@media screen and (max-width: 530px) {
  .link-card {
    width: 55vw;

    .link-text {
      font-size: 3.5vw;
    }
  }
}
@media screen and (min-width: 630px) and (max-width: 800px) {
  .link-card {
    width: 45vw;

    .link-text {
      font-size: 3vw;
    }
  }
}
</style>
