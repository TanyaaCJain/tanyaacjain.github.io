const getDefaultState = () => {
  return {
    list: [
      // eslint-disable-next-line no-multi-str
      'To have a look at my work, you can check out my social profiles on\
       <a href="https://github.com/tanyaacjain"> GitHub</a>,\
       <a href="https://linkedin.in/tanyaacjain"> Linked In</a>,\
       <a href="https://twitter.com/tanyaacjain"> Twitter</a> and\
       <a href="https://behance.net/tanyaacjain"> Behance</a>. \
       To stay updated with my current interests and learn about my recommendations, you shall read my occasional posts on my blog,\
       <a href="https://kensho.tanya-jain.xyz"> Kenshō</a>.',

      // eslint-disable-next-line no-multi-str
      'You can also view my\
       <a href="/doc/cv.pdf"> CV </a>\
       or contact me via\
       <a href="mailto:tanyaacjain@tanya-jain.xyz"> e-mail</a>.',
    ],
  }
}
const state = () => ({
  social: getDefaultState(),
})

export default {
  state,
}
