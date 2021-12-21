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

export const enum ButtonView {
  Default = 'default',
  Danger = 'danger',
}

type Props = {
  className?: string;
  type?: ButtonType;
  size?: ButtonSize;
  view?: ButtonView;
  onClick?: () => void;
  text?: string;
};

const Button = ({
  className,
  type = ButtonType.Primary,
  size = ButtonSize.Medium,
  view = ButtonView.Default,
  onClick,
  text = '',
}: Props) => {
  const handleClick = () => onClick && onClick();

  return (
    <button
      className={cn(
        className,
        styles.button,
        styles[`type-${type}`],
        styles[`size-${size}`],
        styles[`view-${view}`]
      )}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
