/* eslint-disable no-multi-str */
const getDefaultState = () => {
  return {
    list: [
      {
        id: 'h1',
        type: 'Honor',
        name:
          'Shri Baljit Shastri Award for Best in Human and Traditional Values.',
        description: 'Most coveted in Amity University Uttar Pradesh',
        year: '2020',
        img: 'BaljitShastri.png',
      },
      {
        id: 'h2',
        type: 'Award',
        name: 'Best Website Design Award',
        description: 'TRACE 2018 Conference, Amity University Uttar Pradesh',
        year: '2018',
        img: 'TRACE.png',
      },
      {
        id: 'h3',
        type: 'Award',
        name: 'Best GIS web app developed in ASET',
        description:
          'Used for detecting and analyzing irrigation and soil mineral levels in Indian Himalayan region\
          for researchers of CRC working directly under the Government of India. Advisor: Dr. Madhuri Kumari',
        year: '2017',
        img: 'gis.png',
      },
      {
        id: 'h4',
        type: 'Honor',
        name:
          'Invited to MyGov event held in presence of the Hon’ble Prime Minister of India',
        description:
          'Invited by Ministry of Electronics and Information Technology for the spirit of volunteerism and\
           participative governance. The event was graced by the Hon’ble Prime Minister of India, Shri Narendra Modi',
        year: '2014',
        img: 'myGovInvite.png',
      },
    ],
  }
}
const state = () => ({
  honors: getDefaultState(),
})

export default {
  state,
}
