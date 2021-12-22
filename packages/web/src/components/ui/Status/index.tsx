import React from 'react';
import cn from 'classnames';

import styles from './Status.module.css';

export enum StatusSize {
  Small = 'small',
  Medium = 'medium',
}

type Props = {
  size?: StatusSize;
  available?: boolean;
  availableText?: string;
  unavailableText?: string;
};

const Status = ({
  size,
  available,
  availableText = 'available',
  unavailableText = 'unavailable',
}: Props) => {
  return (
    <div
      className={cn(styles.status, styles[`size-${size}`], {
        [styles.available]: available,
      })}>
      <span className={cn(styles.text)}>
        {available ? availableText : unavailableText}
      </span>
      <span className={cn(styles.circle)}></span>
    </div>
  );
};

export default Status;
