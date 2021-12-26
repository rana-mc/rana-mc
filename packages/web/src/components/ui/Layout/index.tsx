import React from 'react';
import cn from 'classnames';

import styles from './Layout.module.css';

type Props = {
  children?: React.ReactElement | React.ReactElement[];
};

const Layout = ({ children }: Props) => {
  return <div className={cn(styles.layout)}>{children}</div>;
};

export default Layout;
