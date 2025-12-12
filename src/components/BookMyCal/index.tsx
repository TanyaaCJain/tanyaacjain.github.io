import { CiCalendar } from "react-icons/ci";

export default function BookMyCal() {
    return (
        <div className="tw-text-base tw-bg-green-800 tw-rounded-md">
            <a 
            className="tw-flex tw-justify-center tw-items-center tw-gap-1 tw-py-1 tw-px-2 tw-text-white"
                href="/contact" 
                target="_blank" 
                rel="noreferrer"
            >
                <CiCalendar className="tw-text-xl" />
                Schedule
            </a>
        </div>
    );
}