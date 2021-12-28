import _ from 'lodash'

export default {
  data () {
    return {
      scrollPosition: 0
    }
  },
  watch: {
    $route () {
      // console.log('route changed: ', this.$route)
      this.lmS.update()
    }
  },
  mounted () {
    this.$nextTick(
      function () {
        // eslint-disable-next-line new-cap
        this.lmS = new this.locomotiveScroll({
          el: document.querySelector('#js-scroll'),
          smooth: true /* if false disable overflow: hidden on html, body */
        })
        // console.log('mounted')

        window.addEventListener(
          'resize',
          _.debounce(this.onLmsResize.bind(this), 100)
        )
      }.bind(this)
    )
  },
  destroyed () {
    // console.log('destroy')
    this.lmS.destroy()
    window.removeEventListener('resize', this.onLmsResize)
  },
  methods: {
    onLmsResize () {
      this.lmS.update()
    }
  }
}
