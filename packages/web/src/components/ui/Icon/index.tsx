import React from 'react';
import { ReactSVG } from 'react-svg';

type Props = {
  name: string;
};

const Icon = ({ name }: Props) => {
  const iconSVGSrc = require(`./assets/${name}.svg`).default;

  return <ReactSVG src={iconSVGSrc} />;
};

export default Icon;
