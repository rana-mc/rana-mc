import React from 'react';

export type IconName = 'minecraft' | 'forge' | 'fabric';

type Props = {
  name: IconName;
  height?: number;
  width?: number;
};

const Icon = ({ name, height = 32, width = 32 }: Props) => (
  <img src={`/icons/${name}.svg`} height={height} width={width} alt={name} />
);

export default Icon;
