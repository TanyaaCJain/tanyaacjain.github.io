import React, { useState, useEffect } from 'react';
import './PressHeader.css';

export default function PressHeader() {
    const [isPress, setIsPress] = useState(true);

    useEffect(() => {
        const animateHeader = () => {
            setIsPress(prevIsPress => !prevIsPress);
        };
        const timeoutId = setTimeout(animateHeader, 500);

        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(timeoutId);
    }, [isPress]); // Dependency array includes isPress to trigger effect on its change

    return (
        <div className='press-section-header'>
            {isPress ? (
                <div className='press-header'>
                    <div id='p' className='press-1'>P</div>
                    <div id='r' className='press-2'>R</div>
                    <div id='e' className='press-3'>E</div>
                    <div id='s1' className='press-4'>S</div>
                    <div id='s2' className='press-5'>S</div>
                </div>
            ) : (
                <div className='talks-header'>
                    <div id='t' className='talks-1'>T</div>
                    <div id='a' className='talks-2'>A</div>
                    <div id='l' className='talks-3'>L</div>
                    <div id='k' className='talks-4'>K</div>
                    <div id='s' className='talks-5'>S</div>
                </div>
            )}
        </div>
    );
}
