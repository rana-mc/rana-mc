import React from 'react';
import cn from 'classnames';

import styles from './Sidebar.module.css';

type Props = {
  children?: React.ReactElement | React.ReactElement[];
};

export const Sidebar = ({ children }: Props) => {
  return <div className={cn(styles.sidebar)}>{children}sieebar</div>;
};
