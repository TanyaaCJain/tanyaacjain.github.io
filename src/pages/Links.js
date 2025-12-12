import React from 'react';
import LinksContent from '../components/links/linkspage.json';
import '../components/links/LinksPage.css';
import { TiSocialGithub, TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";
import { IoLocation } from "react-icons/io5";
import ProfileImage from '../assets/images/profile-image.jpg';
import Layout from '@theme/Layout';

const LinksPage = () => {
  return (
    <Layout
            title="Tailored Links Page"
            description="A page to display the main navigation links">
    <div id='js-scroll' data-scroll-section className='hyperlink-section'>
      <div className='links-wrapper' role='feed'>
        <div className='links-img'>
          <img className='' src={ProfileImage} alt='Profile Image' />
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