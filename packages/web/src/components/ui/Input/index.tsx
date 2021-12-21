import React from 'react';
import cn from 'classnames';

import styles from './Input.module.css';

type Props = {
  onChange?: (value: string) => void;
  value?: string;
};

const Input = ({ onChange, value }: Props) => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    onChange && onChange(event.currentTarget.value);

  return <input className={cn(styles.input)} value={value} onChange={handleChange} />;
};

export default Input;
