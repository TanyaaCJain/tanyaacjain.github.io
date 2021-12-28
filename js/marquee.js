/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
/*
	Vanilla Javascript Marquee
	Version: 0.2.1
	Author: Robert Bossaert <https://github.com/robertbossaert>
	Example call:

	new Marquee('element');

	new Marquee('element', {
		direction: 'rtl',
	});
*/

const Marquee = function (element, defaults) {
  const elem = document.getElementById(element)
  const options = (defaults === undefined) ? {} : defaults
  const continuous = options.continuous || true	// once or continuous
  const direction = options.direction || 'ltr' 	// ltr or rtl
  const loops = options.loops || -1
  let speed = options.speed || 0.5
  let milestone = 0
  let marqueeElem = null
  let elemWidth = null
  const self = this
  let ltrCond = 0
  let loopCnt = 0
  let start = 0
  const textcolor = options.textcolor || '#000000' // Define the text color
  const bgcolor = options.bgcolor || '#ffffff' // Define the background color
  const opacity = options.opacity || 1.0
  let process = null
  const constructor = function (elem) {
    // Build html
    const elemHTML = elem.innerHTML
    const elemNode = elem.childNodes[1] || elem
    elemWidth = elemNode.offsetWidth
    marqueeElem = '<div>' + elemHTML + '</div>'
    elem.innerHTML = marqueeElem
    marqueeElem = elem.getElementsByTagName('div')[0]
    elem.style.overflow = 'hidden'
    marqueeElem.style.whiteSpace = 'nowrap'
    marqueeElem.style.position = 'relative'
    marqueeElem.style.color = textcolor
    marqueeElem.style.backgroundColor = bgcolor
    marqueeElem.style.opacity = opacity

    if (continuous) {
      marqueeElem.innerHTML += elemHTML
      marqueeElem.style.width = '200%'

      if (direction === 'ltr') {
        start = -elemWidth
      }
    } else {
      ltrCond = elem.offsetWidth

      if (direction === 'rtl') {
        milestone = ltrCond
      }
    }

    if (direction === 'ltr') {
      milestone = -elemWidth
    } else if (direction === 'rtl') {
      speed = -speed
    }

    self.start()

    return marqueeElem
  }

  this.start = function () {
    process = window.setInterval(function () {
      self.play()
    })
  }

  this.play = function () {
    // beginning
    marqueeElem.style.left = start + 'px'
    start = start + speed

    if (start > ltrCond || start < -elemWidth) {
      start = milestone
      loopCnt++

      if (loops !== -1 && loopCnt >= loops) {
        marqueeElem.style.left = 0
      }
    }
  }

  this.end = function () {
    window.clearInterval(process)
  }

  // Init plugin
  marqueeElem = constructor(elem)
}
