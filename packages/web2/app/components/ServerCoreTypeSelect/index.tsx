import React from 'react';
import cn from 'classnames';

import { RadioGroup, Radio } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import SelectIcon from '../SelectIcon';

import { IconName } from '../Icon';
import styles from './index.css';

type ServerCoreTypeProps = {
  title: string;
  description: string;
  icon: IconName;
  onClick?: () => void;
  active?: boolean;
};

const ServerCoreType = ({
  title,
  description,
  icon,
  onClick,
  active,
}: ServerCoreTypeProps) => {
  const handleClick = () => onClick && onClick();

  return (
    <div
      role="presentation"
      className={cn('serverCoreType', { serverCoreType_active: active })}
      onClick={handleClick}
    >
      <SelectIcon name={icon} size="l" />
      <div className="serverCoreType__title">
        <b>{title}</b>
      </div>
      <div className="serverCoreType__description">
        <span>{description}</span>
      </div>
    </div>
  );
};

const SERVER_CORE_TYPES = [
  {
    id: 'forge',
    title: 'Forge',
    description: 'Popular choice',
    icon: 'forge',
  },
  {
    id: 'fabric',
    title: 'Fabric',
    description: 'Lightweight alternative',
    icon: 'fabric',
  },
];

type Props = {
  onChange?: (serverCoreType: string) => void;
};

const ServerCoreTypeSelect = ({ onChange }: Props) => {
  const handleChange = (value: ValueType) => {
    if (onChange) onChange(value as string);
  };

  return (
    <RadioGroup
      className="serverCoreSelect"
      inline
      name="serverCoreSelect"
      onChange={handleChange}
    >
      {SERVER_CORE_TYPES.map((serverCoreType) => (
        <Radio key={serverCoreType.id} value={serverCoreType.id}>
          <ServerCoreType
            title={serverCoreType.title}
            description={serverCoreType.description}
            icon={serverCoreType.icon as IconName}
          />
        </Radio>
      ))}
    </RadioGroup>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default ServerCoreTypeSelect;
