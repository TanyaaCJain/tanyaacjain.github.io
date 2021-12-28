export default {
  data () {
    return {
      spaceHolder: {},
      horizontal: {},
      vw: '',
      vh: '',
      objectWidth: '',
      sticky: {}
    }
  },
  // computed: {
  //     spaceHolder: {},
  //     horizontal: {},
  //     vw () {
  //       return window.innerWidth
  //     },
  //     vh () {
  //       return window.innerWidth
  //     },
  //     objectWidth: '',
  //     sticky: {}
  // },
  // watch: {
  //   stickyOffset: {

  //   }
  // }
  mounted () {
    // console.log('calling mounts')
    this.assignValues()
    //   this.scrollHorizontally()
    // console.log('ht', this.horizontal.style.transform)
    // console.log('sh', this.spaceHolder.style.height)
    // console.log('spaceholder', this.spaceHolder)
    // console.log('horizontal', this.horizontal)
    // console.log('vw', this.vw)
    // console.log('vh', this.vh)
    // console.log('objectwidth', this.objectWidth)
    // console.log('sticky', this.sticky)
  },
  methods: {
    assignValues () {
      this.spaceHolder = document.querySelector('.space-holder')
      this.sticky = document.querySelector('.sticky')
      this.horizontal = document.querySelector('.horizontal')
    },
    calcDynamicHeight (ref) {
      this.vw = window.innerWidth
      this.vh = window.innerHeight
      this.objectWidth = ref.scrollWidth
      return this.objectWidth - this.vw + this.vh + 150 // 150 is the padding (in pixels) desired on the right side of the .cards container. This can be set to whatever your styles dictate
    },
    handleScroll () {
      // console.log('sticky offset', this.sticky.offsetTop)
      this.horizontal.style.transform = `translateX(-${this.sticky.offsetTop}px)`
      // console.log('ht', this.horizontal.style.transform)
    },
    handleResize () {
      this.spaceHolder.style.height = `${this.calcDynamicHeight(this.horizontal)}px`
    },
    scrollHorizontally () {
      // console.log('hori',this.horizontal)
      // this.spaceHolder.style.height = `${this.calcDynamicHeight(this.horizontal)}px`
      this.handleScroll()

      // console.log('calling scroll listener')
      window.addEventListener('scroll', this.handleScroll())
      // console.log('calling resize listener')

      window.addEventListener('resize', this.handleResize())
    }
  }
}
