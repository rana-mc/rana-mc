import { Radio, Stack, RadioGroup } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import SelectIcon, { links as selectIconLinks } from '../SelectIcon';
import styles from './index.css';

type GameVersion = { type: number; versions: string[] };

type Props = {
  defaultValue?: string;
  gameVersion: GameVersion;
  onChange?: (version: string) => void;
};

const filterVersions = (versions: string[]) =>
  versions.filter((version) => !version.includes('Snapshot'));

const GameVersionSelect = ({ defaultValue, gameVersion, onChange }: Props) => {
  const handleChange = (value: ValueType) => {
    if (onChange) onChange(value as string);
  };

  return (
    <RadioGroup
      defaultValue={defaultValue}
      className="gameVersionSelect"
      inline
      name="gameVersionSelect"
      onChange={handleChange}>
      {filterVersions(gameVersion.versions).map((version) => (
        <Radio key={version} value={version}>
          <Stack direction="column" spacing={8} alignItems="flex-start">
            <SelectIcon name="minecraft" />
            {version}
          </Stack>
        </Radio>
      ))}
    </RadioGroup>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }, ...selectIconLinks()];

export default GameVersionSelect;
