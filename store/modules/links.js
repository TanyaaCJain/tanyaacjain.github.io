const getDefaultState = () => {
  return {
    list: [
      {
        id: 'l1',
        text: 'Website: tanya-jain.xyz',
        link: 'https://tanya-jain.xyz/',
      },
      {
        id: 'l2',
        text: 'QuaratinedDalgona',
        link: 'https://instagram.com/quarantineddalgona/',
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
