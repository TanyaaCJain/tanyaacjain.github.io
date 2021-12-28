/* eslint-disable no-multi-str */
// import axios from "axios";
// import moment from "moment";
// import { getField, updateField, createHelpers } from 'vuex-map-fields';

const getDefaultState = () => {
  return {
    list: [
      'Hi, I am Tanya Jain. I am a computer science and engineering graduate and currently working as a Software Developer Engineer (SDE)\
       at Essentia Softserv LLP. I design, develop, test and deploy applications and maintain them over their life cycle in an agile work \
       environment.',
      'I am passionate about engineering novel solutions on autonomous intelligent machines and systems, specially those that can make lives\
       easier or do social good in the long run. I plan to pursue a graduate degree and perform research in the field to further my knowledge\
       and contributions in the field.',
      'I also engage in multi-disciplinary freelance graphic designing and deliver creative and engaging solutions across brand identity,\
       print and digital media.',
      'As a culmination to programming and designing, I enjoy exploring the realms of\
       <a href="#"> designing with Python </a>\
       inspired from the works of\
       <a href="www.google.com"> Justin van Russom </a>\
       and\
       Peter von Blokland.',
      'Apart from everything technology and design related, I cherish travelling, dancing, music, and yes of course living my life to the\
       fullest. I love to capture in my camera everything I cherish.'
    ]
  }
}
const state = () => ({
  about: getDefaultState()
})

export default {
  // namespaced: true,
  state
  // getters,
  // actions,
  // mutations,
}
