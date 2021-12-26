import React from 'react';
import cn from 'classnames';

import RanaLogo from './Rana-logo.svg';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div>
      <img src={RanaLogo} className={cn(styles.logo)} alt="rana mc logo" />
    </div>
  );
};

export default Logo;
