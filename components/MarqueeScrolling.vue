<template>
  <div id="marqueeTwo" class="find-anywhere-scrolling-container">
    Find Anywhere on Web as @tanyaacjain
    <img class="polygon-rotate" :src="images.sample">
    Find Anywhere on Web as @tanyaacjain
    <img class="polygon-rotate" :src="images.sample">
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: {
        sample: require('@/static/gifs/hexagonRotate.gif')
      },
      elem: '',
      options: '',
      continuous: '',
      direction: '', // ltr or rtl
      loops: '',
      speed: '',
      milestone: 0,
      marqueeElem: null,
      elemWidth: null,
      ltrCond: 0,
      loopCnt: 0,
      start: 0,
      textcolor: '', // Define the text color
      bgcolor: '', // Define the background color
      opacity: '',
      process: null
    }
  },
  mounted () {
    this.marquee('marqueeTwo', {
      direction: 'rtl'
    })
  },
  methods: {
    buildHTML () {
      const elemHTML = this.elem.innerHTML
      const elemNode = this.elem.childNodes[1] || this.elem
      this.elemWidth = elemNode.offsetWidth
      this.marqueeElem = '<div id="marquee-scroll">' + elemHTML + '</div>'
      this.elem.innerHTML = this.marqueeElem
      // this.marqueeElem = document.getElementById('marquee-scroll');
      this.marqueeElem = this.elem.getElementsByTagName('div')[0]
      // this.elem.style.overflow = 'hidden';
      this.marqueeElem.style.whiteSpace = 'nowrap'
      this.marqueeElem.style.position = 'relative'
      this.marqueeElem.style.color = this.textcolor
      this.marqueeElem.style.backgroundColor = this.bgcolor
      this.marqueeElem.style.opacity = this.opacity

      if (this.continuous) {
        this.marqueeElem.innerHTML += this.elemHTML
        this.marqueeElem.style.width = '200%'

        if (this.direction === 'ltr') {
          this.start = -this.elemWidth
        }
      } else {
        this.ltrCond = this.elem.offsetWidth

        if (this.direction === 'rtl') {
          this.milestone = this.ltrCond
        }
      }

      if (this.direction === 'ltr') {
        this.milestone = -this.elemWidth
      } else if (this.direction === 'rtl') {
        this.speed = -this.speed
      }

      this.start_work()
    },
    start_work () {
      this.process = window.setInterval(this.play_work())
    },
    play_work () {
      // beginning
      this.marqueeElem.style.left = this.start + 'px'
      this.start = this.start + this.speed

      if (this.start > this.ltrCond || this.start < -this.elemWidth) {
        this.start = this.milestone
        this.loopCnt++

        if (this.loops !== -1 && this.loopCnt >= this.loops) {
          this.marqueeElem.style.left = 0
        }
      }
    },
    end () {
      window.clearInterval(process)
    },
    marquee (element, defaults) {
      this.elem = document.getElementById(element)
      this.options = (defaults === undefined) ? {} : defaults
      this.continuous = this.options.continuous || true // once or continuous
      this.direction = this.options.direction || 'ltr' // ltr or rtl
      this.loops = this.options.loops || -1
      this.speed = this.options.speed || 0.5
      this.extcolor = this.options.textcolor || '#000000' // Define the text color
      this.bgcolor = this.options.bgcolor || '#ffffff' // Define the background color
      this.opacity = this.options.opacity || 1.0
      // Init plugin
      this.buildHTML()
    }
  }
}
</script>

<style lang="scss">
#marquee-scroll {
  overflow: hidden;
  white-space: nowrap;
  position: relative;

}
</style>
