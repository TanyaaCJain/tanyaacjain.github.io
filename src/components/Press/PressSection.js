import React, { useState } from 'react';
import PressHeader from './PressHeader';
// import NewsSection from '. //dashboard/News';
import PressContent from './press.json';
import './PressSection.css';
import IndianExpressLogo from './img/theIndianExpressLogo.png';
import MyGovLogo from './img/mygov.png';
import DallEPixart from './img/dalle_pixart1.png';

export default function PressSection() {
    return (
        <div id='js-scroll' data-scroll-section className='press-section'>
            <h1 className='hidden'>Press and Talks Section</h1>
            <h2 className='hidden'>Lists all publications and talks presented by Tanya Jain.</h2>
            <div className='press-wrapper'>
                <div className='tw-max-w-[50px] md:tw-max-w-[80px]'>
                    <img className='pixart' src={DallEPixart} alt='dalle-pixart' />
                </div>
                <PressHeader />
                <div className='press-logos'>
                    <div>
                        <img className='indian-express-logo' src={IndianExpressLogo} alt='Indian Express Logo' />
                        <img className='mygov-logo' src={MyGovLogo} alt='MyGov Logo' />
                    </div>
                </div>
                <div className='press-content'>
                    {PressContent.press_list.map((item, index) => {
                        return (
                            <div key={index}>
                                <div
                                    id={index}
                                    className={`press-box ${item.type === 'Talk' ? 'talk-cursor' : ''} ${item.cursor ? item.cursor : ''}`}
                                >
                                    <a href={item.link} className='press-link'>
                                        <div>
                                            <div className='press-label tangerine-bold'>
                                                {item.type} in {item.year}
                                            </div>
                                            <div className='press-title' dangerouslySetInnerHTML={{ __html: item.name }} />
                                        </div>
                                        {/* {hoveredState && hoveredIndex === index && ( */}
                                            <div className='press-desc'>
                                                <span className='press-hover-desc'>
                                                    {item.description}
                                                </span>
                                            </div>
                                        {/* )} */}
                                    </a>
                                </div>
                                {/* <hr /> */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
