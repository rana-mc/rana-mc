import cn from 'classnames';
import { MOBILE_QUREY } from '~/constants';
import { useMediaQuery } from '~/hooks/useMediaQuery';

import styles from './index.css';

const Version = () => {
  const isMobile = useMediaQuery(MOBILE_QUREY);

  const prefix = 'Rana MC: ';
  const version = 'alpha 0.1.0';

  return (
    <div className={cn('version', { version_mobile: isMobile })}>
      {isMobile ? version : `${prefix}${version}`}
    </div>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default Version;
