<template>
  <div id="about-header" />
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.js"></script>

<script>
import Vue from 'vue'
//import LeonSansPlugin from '@/plugins/leonsans.js'
import {LeonSans} from '@/static/js/leon.js'

export default {
  data () {
    return {
      leon: '',
      canvas: '',
      ctx: '',
      sw: '',
      sh: '',
      pixelRatio: 2,
      scale: ''
    }
  },
  mounted () {
    this.calculateScale()
    this.drawLeonSans()
  },
  methods: {
    calculateScale () {
      this.sw = 0.64 * window.innerWidth
      this.sh = 0.15 * window.innerWidth
      if (window.innerWidth < '330px') {
        this.scale = 0.08 * window.innerWidth
      } else {
        this.scale = 0.25 * window.innerWidth
      }
    },
    drawLeonSans () {
      this.elem = document.getElementById('about-header')
      this.canvas = document.createElement('canvas');
      this.elem.appendChild(this.canvas)
      //document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext("2d");

      this.canvas.width = this.sw * this.pixelRatio;
      this.canvas.height = this.sh * this.pixelRatio;
      this.canvas.style.width = this.sw + 'px';
      this.canvas.style.height = this.sh + 'px';
      this.ctx.scale(this.pixelRatio, this.pixelRatio);

      this.leon = new LeonSans({
        text: 'about',
        color: [
          ['#9e805a', '#634b27'],
          ['#886d4a', '#715633', '#5a4120', '#422e14'],
          ['#6b5d4c', '#635749', '#5a4120']
        ],
        size: this.scale,
        weight: 200
      });

      requestAnimationFrame( () => {
        this.ctx.clearRect(0, 0, this.sw, this.sh)
        const x = (this.sw - this.leon.rect.w) / 2;
        const y = (this.sh - this.leon.rect.h) / 2;
        this.leon.position(x, y);

        this.leon.draw(this.ctx);
      });
    }
  }
}
</script>
