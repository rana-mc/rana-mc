import React from 'react';
import cn from 'classnames';

import Icon, { IconName } from '@ui/Icon';
import styles from './SelectIcon.module.css';

type Props = {
  name: IconName;
  size?: 'xs' | 's' | 'l';
};

const ICON_COLORS = {
  minecraft: '#D8D8D8',
  forge: '#202C44',
  fabric: '#BADCBA',
};

const SelectIcon = ({ name, size }: Props) => (
  <div
    className={cn(styles.selectIcon, styles[`size-${size}`])}
    style={{ background: ICON_COLORS[name] || 'transparent' }}>
    <Icon name={name} />
  </div>
);

export default SelectIcon;
