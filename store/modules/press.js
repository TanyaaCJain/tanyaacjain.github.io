const getDefaultState = () => {
  return {
    list: [
      {
        type: 'Talk',
        name: 'Writing &#128395; tests in Vue.js with Vue Test Utils',
        description: 'Presented at Essentia Softserv LLP',
        year: '2020'
      },
      {
        type: 'Talk',
        name: 'Writing clean &#128686; code and following agile practices',
        description: 'Presented at Essentia Softserv LLP',
        year: '2020'
      },
      {
        type: 'Publication',
        name: '&#128373; Analysis of Vehicle &#128664; Collision Prediction Algorithms Using CNN',
        // eslint-disable-next-line no-multi-str
        description: 'Undergraduate thesis advisor: Dr. Garima Aggarwal. Presented in ICDAM\
                      2020. Published in Springer Lecture Notes on Data Engineering\
                      Communications Techologies.',
        year: '2020',
        link: '/doc/Analysis of Vehicle Collision Prediction Algorithms Using CNN.pdf'
      },
      {
        type: 'Talk',
        name: 'Understanding systemd.service &#128736; files',
        description: 'Presented at LinuxChix India meetup.',
        year: '2018'
      },
      {
        type: 'Talk',
        name: 'Exploring NumPy &#128290; using Fractals',
        description: 'Presented at PyDelhi meetup.',
        year: '2017'
      },
      {
        type: 'Talk',
        name: 'Women &#128105; in Python &#128013; Panel Discussion',
        description: 'Presented at PyDelhi conference.',
        year: '2017'
      },
      {
        type: 'Newspaper Publication',
        name: 'In Indian Express: &#128240; What works better?',
        description: 'Article published in the renowned newspaper, Indiann Express on "What works better: Gandhigiri or Dadagiri?"',
        year: '2009',
        cursor: 'newspaper-cursor'
      }
    ]
  }
}
const state = () => ({
  press: getDefaultState()
})

export default {
  state
}
