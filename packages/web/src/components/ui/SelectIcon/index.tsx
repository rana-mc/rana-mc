import React from 'react';
import cn from 'classnames';

import styles from './SelectIcon.module.css';
import Icon, { IconName } from '@ui/Icon';

type Props = {
  name: IconName;
  size?: 's' | 'l';
};

const ICON_COLORS = {
  minecraft: '#D8D8D8',
  forge: '#202C44',
  fabric: '#BADCBA',
};

const SelectIcon = ({ name, size }: Props) => {
  return (
    <div
      className={cn(styles.selectIcon, { [styles.sizeL]: size === 'l' })}
      style={{ background: ICON_COLORS[name] || 'transparent' }}>
      <Icon name={name} />
    </div>
  );
};

export default SelectIcon;
