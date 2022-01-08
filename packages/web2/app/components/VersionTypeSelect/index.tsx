import { Radio, RadioGroup } from 'rsuite';
import { RESTRICTED_TYPE_IDS } from '~/constants';
import { ValueType } from 'rsuite/esm/Radio';
import styles from './index.css';

type VersionType = { id: number; gameId: number; name: string; slug: string };

type Props = {
  defaultValue?: number;
  versionTypes: VersionType[];
  onChange?: (versionTypeId: number) => void;
};

const filterVersionTypes = (versionTypes: VersionType[]) => {
  return versionTypes.filter((version) => !RESTRICTED_TYPE_IDS.includes(version.id));
};

const formatVersionTypeName = (name: string) => name.replace(/Minecraft/gm, '');

const VersionTypeSelect = ({ defaultValue, versionTypes, onChange }: Props) => {
  const handleChange = (value: ValueType) => {
    if (onChange) onChange(value as number);
  };

  return (
    <RadioGroup
      defaultValue={defaultValue}
      className="versionTypeSelect"
      name="version"
      inline
      appearance="picker"
      onChange={handleChange}>
      {filterVersionTypes(versionTypes).map((version) => (
        <Radio key={version.id} value={version.id}>
          {formatVersionTypeName(version.name)}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default VersionTypeSelect;
