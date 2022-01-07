import React from 'react';
import cn from 'classnames';

import Icon, { IconName } from '../Icon';
import styles from './index.css';

type Props = {
  name: IconName;
  size?: 'xs' | 's' | 'l';
};

const ICON_COLORS = {
  minecraft: '#F5F5F5',
  forge: '#202C44',
  fabric: '#BADCBA',
};

const SelectIcon = ({ name, size }: Props) => (
  <div
    className={cn('selectIcon', `selectIcon_size-${size}`)}
    style={{ background: ICON_COLORS[name] || 'transparent' }}
  >
    <Icon name={name} />
  </div>
);

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default SelectIcon;
