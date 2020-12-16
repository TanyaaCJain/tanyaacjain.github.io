<template>
  <div class="container-wrapper">
    <div class="space-holder">
      <div class="sticky">
        <div class="horizontal">
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
      </div>
    </div>
  </div>
</template>

<script>
import horizontalStickyScroll from '~/mixins/horizontal_sticky_scroll.js'

export default {
  mixins: [horizontalStickyScroll],
  data () {
    return {
      honors_list: []
    }
  },
  created () {
    this.fetch_honors_data()
  },
  methods: {
    fetch_honors_data () {
      this.honors_list = this.$store.state.modules.honors.honors.list
    }
  }
}
</script>
