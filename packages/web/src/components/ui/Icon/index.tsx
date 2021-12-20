import React from 'react';
import { ReactSVG } from 'react-svg';

export type IconName = 'minecraft' | 'forge' | 'fabric';

type Props = {
  name: IconName;
};

const Icon = ({ name }: Props) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const iconSVGSrc = require(`./assets/${name}.svg`);

  return <ReactSVG src={iconSVGSrc} />;
};

export default Icon;
