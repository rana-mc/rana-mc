import React from 'react';
import cn from 'classnames';

import styles from './SelectIcon.module.css';
import Icon, { IconName } from '@ui/Icon';

type Props = {
  name: IconName;
};

const ICON_COLORS = {
  minecraft: '#D8D8D8',
  forge: '#202C44',
  fabric: '#BADCBA',
};

const SelectIcon = ({ name }: Props) => {
  return (
    <div
      className={cn(styles.selectIcon)}
      style={{ background: ICON_COLORS[name] || 'transparent' }}>
      <Icon name={name} />
    </div>
  );
};

export default SelectIcon;
