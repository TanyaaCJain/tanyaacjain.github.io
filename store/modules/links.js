const getDefaultState = () => {
  return {
    list: [
      {
        id: 'l1',
        text: 'Website: tanya-jain.xyz',
        link: 'https://www.tanya-jain.xyz/',
      },
      {
        id: 'l2',
        text: 'QuaratinedDalgona',
        link: 'https://www.instagram.com/quarantineddalgona/',
      },
      // {
      //   id: 'l3',
      //   text: 'Blog: Kenshō',
      //   link: 'https://kensho.tanya-jain.xyz',
      // },
      {
        id: 'l4',
        text: '[Design] PyCon India 2021 Programme Guide - Fine Print',
        link: 'https://in.pycon.org/share/PyConIndia2021ProgramGuide.pdf',
      },
      {
        id: 'l5',
        text: '[Design] PyCon India 2020 Programme Guide - Fine Print',
        link: 'https://in.pycon.org/share/PyConIndia2020ProgramGuide.pdf',
      },
      {
        id: 'l6',
        text: 'Design Portfolios on Behance',
        link: 'https://www.behance.net/Tanya-Jain',
      },
    ],
  }
}
const state = () => ({
  links: getDefaultState(),
})

export default {
  state,
}
