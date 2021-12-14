import React from 'react';
import cn from 'classnames';

import styles from './Input.module.css';

type Props = {
  onChange?: (value: string) => void;
};

const Input = ({ onChange }: Props) => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    onChange && onChange(event.currentTarget.value);

  return <input className={cn(styles.input)} onChange={handleChange}></input>;
};

export default Input;
