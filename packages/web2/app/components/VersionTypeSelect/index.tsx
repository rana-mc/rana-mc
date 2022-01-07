import { Radio, RadioGroup } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import styles from './index.css';

type VersionType = { id: number; gameId: number; name: string; slug: string };

type Props = {
  versionTypes: VersionType[];
  onChange?: (versionTypeId: number) => void;
};

const filterVersionTypes = (versionTypes: VersionType[]) => {
  const RESTRICTED_TYPES: string[] = [
    'Java',
    'Fabric',
    'Forge',
    'Addons',
    'Bukkit',
    'Modloader',
    'Minecraft Beta',
  ];
  return versionTypes.filter((version) => !RESTRICTED_TYPES.includes(version.name));
};

const formatVersionTypeName = (name: string) => name.replace(/Minecraft/gm, '');

const VersionTypeSelect = ({ versionTypes, onChange }: Props) => {
  const handleChange = (value: ValueType) => {
    if (onChange) onChange(value as number);
  };

  return (
    <RadioGroup
      className="versionTypeSelect"
      name="version"
      inline
      appearance="picker"
      onChange={handleChange}
    >
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
