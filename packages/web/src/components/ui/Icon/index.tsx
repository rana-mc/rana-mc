import React from 'react';
import { ReactSVG } from 'react-svg';

export type IconName = 'minecraft' | 'forge' | 'fabric';

type Props = {
  name: IconName;
};

const Icon = ({ name }: Props) => {
  const iconSVGSrc = require(`./assets/${name}.svg`).default;

  return <ReactSVG src={iconSVGSrc} />;
};

export default Icon;
