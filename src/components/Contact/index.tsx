import { CiCalendar } from "react-icons/ci";

export default function Contact() {
    return (
        <div className="tw-text-base tw-rounded-md" style={{ backgroundColor: 'rgb(20 24 108)' }}>
            <a 
            className="tw-flex tw-justify-center tw-items-center tw-gap-1 tw-py-1 tw-px-2 tw-text-white"
                href="mailto:tanyaacjain@gmail.com"
                target="_blank" 
                rel="noreferrer"
            >
                <CiCalendar className="tw-text-xl sm:tw-text-4xl" />
                Contact
            </a>
        </div>
    );
}
