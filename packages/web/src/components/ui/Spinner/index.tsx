import React from 'react';
import cn from 'classnames';

import styles from './Spinner.module.css';

export enum SpinnerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

type Props = {
  size?: SpinnerSize;
};

const Spinner = ({ size }: Props) => {
  return <div className={cn(styles.loader, styles[`size-${size}`])}>Loading...</div>;
};

export default Spinner;
