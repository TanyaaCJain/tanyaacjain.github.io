/* eslint-disable no-multi-str */
const getDefaultState = () => {
  return {
    honors: [
      {
        type: 'Honor',
        name:
          'Shri Baljit Shastri Award for Best in Human and Traditional Values.',
        description: 'Most coveted in Amity University Uttar Pradesh',
        year: '2020',
      },
    ],
    awards: [
      {
        type: 'Award',
        name: 'Best Website Design Award',
        description: 'TRACE 2018 Conference, Amity University Uttar Pradesh',
        year: '2018',
      },
      {
        type: 'Award',
        name: 'Best GIS web app developed in ASET',
        description:
          'Used for detecting and analyzing irrigation and soil mineral levels in Indian Himalayan region\
                      for researchers of CRC working directly under the Government of India. Advisor: Dr. Madhuri Kumari',
        year: '2017',
      },
    ],
    office: [
      {
        society: 'Amity Linux Assistance Sapience',
        positions: [
          'President (2018)',
          'Vice President (2017)',
          'Repository Maintainer / Core Contributor (Open Source)',
          'Founding member',
        ],
      },
      {
        society: 'Strokes Fine Arts Society',
        positions: ['Vice President (2019)'],
      },
    ],
    publications: [
      {
        title: 'Analysis of Vehicle Collision Prediction Algorithms Using CNN',
        journal:
          'Springer Lecture Notes on Data Engineering and Communications Technologies',
        conference: 'ICDAM 2020',
        status: 'in press',
        other: 'Thesis advised by Dr. Garima Aggarwal',
      },
    ],
    books: [
      {
        title: 'Computer Networks',
        author: 'Tannenbaum',
      },
    ],
  }
}
const state = () => ({
  about: getDefaultState(),
})

export default {
  state,
}
