import React from 'react';
import cn from 'classnames';

import styles from './Label.module.css';

type Props = {
  text: string;
};

const Label = ({ text }: Props) => {
  return (
    <label className={cn(styles.label)}>
      <span className={cn(styles.text)}>{text}</span>
    </label>
  );
};

export default Label;
