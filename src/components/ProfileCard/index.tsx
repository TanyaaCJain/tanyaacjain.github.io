import { TiSocialGithub, TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";
import LDP from '@site/src/assets/images/ldp.png';
import { IoLocation } from "react-icons/io5";

export default function ProfileCard(): JSX.Element {
  return (
    <div className='tw-py-3 tw-px-2 tw-flex tw-flex-col tw-gap-1'>
        <div className='tw-flex tw-w-full'>
            <div className='tw-flex tw-pb-2 tw-h-[90px] tw-w-[90px]'>
                <img className='tw-rounded-full' src={LDP} alt='LDP' />
            </div>
            <div className='tw-pl-2 tw-self-center tw-flex-grow'>
                <div className='tw-text-lg'>Tanya Jain</div>
                <div className='tw-text-sm'>@tanyaacjain</div>
                <div className='tw-flex tw-text-xs tw-gap-1 tw-py-2'>
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
            </div>
        </div>
        <div className='tw-flex tw-justify-center tw-items-center'>
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
    </div>
  );
}