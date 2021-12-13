import React from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

export const enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

type Props = {
  type?: ButtonType;
  onClick?: () => void;
  text?: string;
};

const Button = ({ type = ButtonType.Primary, onClick, text = '' }: Props) => {
  const handleClick = () => onClick && onClick();

  return (
    <button
      className={cn(styles.button, styles[`type-${type}`])}
      onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
