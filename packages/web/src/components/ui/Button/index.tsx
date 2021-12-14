import React from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

export const enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

export const enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

type Props = {
  type?: ButtonType;
  size?: ButtonSize;
  onClick?: () => void;
  text?: string;
};

const Button = ({
  type = ButtonType.Primary,
  size = ButtonSize.Medium,
  onClick,
  text = '',
}: Props) => {
  const handleClick = () => onClick && onClick();

  return (
    <button
      className={cn(
        styles.button,
        styles[`type-${type}`],
        styles[`size-${size}`]
      )}
      onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
