import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/PaginatorNavLink';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function PaginatorNavLink(props: Props): JSX.Element {
  const { permalink, title, subLabel, isNext } = props;
  return (
    <Link
      className={clsx(
        'pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
      )}
      to={permalink}>
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
      <div className='tw-inline-flex tw-gap-1 tw-place-items-center tw-text-md tw-border-solid tw-border-[1px] tw-rounded-full tw-mt-1 tw-py-1 tw-px-4'>
        { !isNext && <HiOutlineArrowNarrowLeft />}
        <div className="pagination-nav__label_modified">{title}</div>
        { isNext && <HiOutlineArrowNarrowRight />}
      </div>
    </Link>
  );
}
