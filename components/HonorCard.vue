<template>
  <div v-if="id" :id="id" class="honor-card hscroll-card">
    <div class="top-row cross" @click="close()">
      +
    </div>
    <div class="honors-heading">
      {{ name }}
    </div>
    <hr>
    <div class="honors-desc">
      <p>
        <span class="honors-label">
          {{ type }}.
        </span>
        ({{ year }})
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    year: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  methods: {
    close () {
      this.id = false
    }
  }
}
</script>

<style lang="scss" scoped>
.honor-card {
  border: solid 2px #000;
  width: 22vw;
  margin: 0 10px;

  .top-row {
    font-size: 3em;
    text-align: center;
    width: 1em;
    height: 1em;
    float: right;
  }
  .cross {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .honors-heading {
    font-size: 1.5em;
    line-height: 1.5em;
    padding: 0.7em;
    min-height: 40%;
    background: #ffdc7561;
  }
  hr {
    border: solid 1px #000;
    margin: 0;
  }
  .honors-desc {
    font-size: 1em;
    padding: 1em;
  }
}
@media screen and (max-width: 530px) {
  .honor-card {
    width: 55vw;

    .top-row {
      font-size: 10vw;
    }
    .honors-heading {
      font-size: 5vw;
    }
    .honors-desc {
      font-size: 3.5vw;
    }
  }
}
@media screen and (min-width: 630px) and (max-width: 800px) {
  .honor-card {
    width: 45vw;

    .top-row {
      font-size: 8vw;
    }
    .honors-heading {
      font-size: 3.5vw;
    }
    .honors-desc {
      font-size: 3vw;
    }
  }
}
</style>
