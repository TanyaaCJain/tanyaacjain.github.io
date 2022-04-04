/* eslint-disable no-multi-str */
// import axios from "axios";
// import moment from "moment";
// import { getField, updateField, createHelpers } from 'vuex-map-fields';

const getDefaultState = () => {
  return {
    list: [
      'Hi there 👋 I am Tanya Jain',

      '💻 Computer Science and Engineering graduate',
      '🔬 Researching on detecting and analyzing text on documents. 🧪',
      '👩‍💻 Senior Software Engineer @ Prismberry Technologies',
      '🚖 Autonomous Intelligent Vehicles enthusiast 🏎',
      '🐧 Founding member @ ASET ALiAS',
      '🐍 Design Team @ PyCon India, PyDelhi Conf',
      '📊 Open Source Contributor @ Pandas',
      '⚡ Designing with Python/JS programming is fun.',
      '🌱 Concerned about technology, feminism, environment, equality. 👩‍👩‍👧‍👧👨‍👩‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧',
      '🥰 I cherish 🚴‍♀️ ✈️ 🏖 💃 📻 ✨ 🍦 📸',
    ],
    in_detail: [
      // 'Hi, I am Tanya Jain. I am a computer science and engineering graduate and currently working as a Software Developer Engineer (SDE)\
      //  at Essentia Softserv LLP. I design, develop, test and deploy applications and maintain them over their life cycle in an agile work \
      //  environment.',
      'I am passionate about engineering novel solutions on autonomous intelligent machines and systems that can alleviate lives and do social\
       good. I plan to pursue a graduate degree to further my knowledge and contributions in the field through research work.',
      '🔭👯 I’m currently working on various full stack web development and design projects that encourage automation. You can contact me for\
       apprenticeship if you can spare some time to contribute to one of my projects. I can help with consultation if you wish to better your\
       skills and are willing to become a curious and learned computer scientist.',
      // 'Professionally, I also engage in brand identity projects for luxury product and experience based companies.',
      // 'As a culmination to programming and designing, I enjoy exploring the realms of\
      //  <a href="#"> designing with Python </a>\
      //  inspired from the works of\
      //  <a href="www.google.com"> Justin van Russom </a>\
      //  and\
      //  Peter von Blokland.',
      // 'Apart from everything technology and design related, I cherish travelling, dancing, music, and yes of course living my life to the\
      //  fullest. I love to capture in my camera everything I cherish.',
    ],
  }
}
const state = () => ({
  about: getDefaultState(),
})

export default {
  // namespaced: true,
  state,
  // getters,
  // actions,
  // mutations,
}
