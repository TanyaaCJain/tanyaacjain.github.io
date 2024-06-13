import React from 'react';
import LinksContent from '../components/links/linkspage.json';
import '../components/links/LinksPage.css';
import GirlSwayImg from '../assets/images/vintage/girl_sway.png';
import VintageBookImg from '../assets/images/vintage/book.png';
import CassetteImg from '../assets/images/vintage/cassette.png';
import BalletImg from '../assets/images/vintage/ballet.png';
import Flower1Img from '../assets/images/vintage/flower1.png';
import { TiSocialGithub, TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";
import { IoLocation } from "react-icons/io5";
import LDP from '../assets/images/ldp.png';
import Layout from '@theme/Layout';

const LinksPage = () => {
  return (
    <Layout
            title="Tailored Links Page"
            description="A page to display the main navigation links">
    <div id='js-scroll' data-scroll-section className='hyperlink-section'>
      {/* <div className='hundred2 tw-absolute tw-h-screen tw-w-screen'>
        <div className='vintage-objects tw-absolute tw-h-screen tw-w-screen tw-overflow-hidden'>
          <div
            className='tw-absolute -tw-right-0 sm:tw-right-32 tw-top-48 in-view'
            data-scroll
            data-scroll-speed='1'
            data-scroll-repeat
          >
            <img className='tw-w-32 tw-w-60 sm:tw-w-90' src={GirlSwayImg} alt='girl-sway' />
          </div>
          <div
            className='absolute tw-left-3 -tw-bottom-16 in-view'
            data-scroll
            data-scroll-speed='1'
            data-scroll-repeat
          >
            <img className='tw-w-36 sm:tw-w-60 md:tw-w-90' src={VintageBookImg} alt='book' />
          </div>
          <div
            className='tw-absolute tw-left-4 sm:tw-left-32 tw-bottom-96 in-view'
            data-scroll
            data-scroll-speed='2'
          >
            <img className='tw-w-36 sm:tw-w-72 md:tw-w-90 tw-max-w-40' src={CassetteImg} alt='cassette' />
          </div>
          <div
            className='tw-absolute tw-bottom-16 tw-right-8 sm:tw-right-16'
            data
          >
            <img className='tw-w-36 sm:tw-w-72 md:tw-w-96' src={Flower1Img} alt='flower1' />
          </div>
          <div
            className='tw-flex tw-justify-center tw-align-center tw-mt-72 in-view'
            data-scroll
            data-scroll-speed='2'
          >
            <img className='tw-w-36 sm:tw-w-5/12' src={BalletImg} alt='ballet' />
          </div>
        </div>
      </div> */}
      <div className='links-wrapper' role='feed'>
        <div className='links-img'>
          <img className='' src={LDP} alt='LDP' />
        </div>
        <div className='links-handle'>@tanyaacjain</div>
        <div className='links-icons tw-text-xs tw-gap-1 tw-py-1'>
            <a href='https://github.com/tanyaacjain' target='_blank' rel='noreferrer'>
                <TiSocialGithub className='tw-text-xl' />
            </a>
            <a href='https://www.linkedin.com/in/tanyaacjain/' target='_blank' rel='noreferrer'>
                <TiSocialLinkedin className='tw-text-xl' />
            </a>
            <a href='https://twitter.com/tanyaacjain' target='_blank' rel='noreferrer'>
                <TiSocialTwitter className='tw-text-xl' />
            </a>
        </div>
        <div className='links-icons'>
            <div className="tw-px-1 tw-flex tw-items-center">
                <IoLocation className='tw-text-xl' />
            </div>
            <div className='tw-text-xs'>
                San Francisco | Delhi | Bangkok
            </div>
        </div>
        <div className="tw-text-xs tw-text-center tw-py-2">
            Senior Software Engineer | Full Stack & GenAI specialist | Founder | Creative Director
        </div>
        {LinksContent.hyperlink_list.map((item, index) => (
          <a href={item.link}>
            <div className='link-card'>
              <div className=''>
                {item.text}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default LinksPage;