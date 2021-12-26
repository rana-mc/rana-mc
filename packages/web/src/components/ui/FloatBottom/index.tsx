import React from 'react';
import cn from 'classnames';

import styles from './FloatBottom.module.css';
import ServerCreateForm from '@modules/servers/ServerCreateForm';

const FloatBottom = () => {
  return (
    <div className={cn(styles.floatBottom)}>
      <ServerCreateForm />
    </div>
  );
};

export default FloatBottom;
