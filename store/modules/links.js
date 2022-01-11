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
      {
        id: 'l3',
        text: 'Blog: Kenshō',
        link: 'https://kensho.tanya-jain.xyz',
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
