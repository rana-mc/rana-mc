import React, { useState } from 'react';
import cn from 'classnames';

import styles from './Switch.module.css';

type SwitchSize = 's' | 'm';

type Props = {
  forId?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  size?: SwitchSize;
};

const Switch = ({ forId, value, onChange, size }: Props) => {
  const [checked, setChecked] = useState(value || false);

  const handleChange = () => {
    setChecked(!checked);
    if (onChange) onChange(!checked);
  };

  return (
    <label htmlFor={forId} className={cn(styles.label)}>
      <input
        type="checkbox"
        checked={checked}
        className={cn(styles.switch, styles[`switch-size-${size}`])}
        onChange={handleChange}
      />
      <span className={cn(styles.toggle, styles[`toggle-size-${size}`])}>
        <span className={cn(styles.circle, styles[`circle-size-${size}`])} />
      </span>
    </label>
  );
};

export default Switch;
