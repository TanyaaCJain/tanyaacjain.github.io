import Vue from 'vue'
import LeonSans from '@/static/js/leon.js'

const LeonSansPlugin = {
  install () {
    Vue.LeonSans = LeonSans
    Vue.prototype.$LeonSans = LeonSans
    // console.log("$$", Vue.LeonSans)
  }
}

Vue.use(LeonSansPlugin)
