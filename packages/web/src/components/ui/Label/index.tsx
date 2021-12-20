import React from 'react';
import cn from 'classnames';

import styles from './Label.module.css';

type Props = {
  forId?: string;
  text: string;
};

const Label = ({ forId, text }: Props) => (
  <label className={cn(styles.label)} htmlFor={forId}>
    <span className={cn(styles.text)}>{text}</span>
  </label>
);

export default Label;
