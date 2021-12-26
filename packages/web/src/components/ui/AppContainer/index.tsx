import React from 'react';
import cn from 'classnames';

import styles from './AppContainer.module.css';

type Props = {
  children?: React.ReactElement | React.ReactElement[];
};

const AppContainer = ({ children }: Props) => {
  return <div className={cn(styles.appContainer)}>{children}</div>;
};

export default AppContainer;
