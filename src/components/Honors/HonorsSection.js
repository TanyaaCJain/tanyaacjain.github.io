import HonorItem from './HonorItem';
import HonorsContent from './honors.json';
import './HonorsSection.css';

export default function HonorsSection() {
    return (
        <div id='js-scroll' data-scroll-section className='honors-section'>
            <div className='honors-wrapper'>
                <h1 className='honors-header'>Honors &amp; Awards &#127942;</h1>
                <h2 className='hidden'>Lists all honors received and awards won by Tanya Jain.</h2>
                <div
                    className='honors-container'
                    role='feed'
                    data-scroll
                    data-scroll-speed='2'
                    data-scroll-position='30%, 30%'
                    data-scroll-repeat
                >
                    {HonorsContent.honors_list && HonorsContent.honors_list.map((item, index) => (
                        <HonorItem
                            key={index}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}