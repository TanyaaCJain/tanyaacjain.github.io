import React from 'react';
import type {Props} from '@theme/Icon/Menu';
import { BsLayoutSidebarInset } from "react-icons/bs";

export default function IconMenu({
  width = 30,
  height = 30,
  className,
  ...restProps
}: Props): JSX.Element {
  return (
    <BsLayoutSidebarInset />
  );
}
