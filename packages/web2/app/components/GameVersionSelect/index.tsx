import { useState } from 'react';
import { Radio, RadioGroup } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import styles from './index.css';

type GameVersion = { type: number; versions: string[] };
type VersionType = { id: number; gameId: number; name: string; slug: string };

type Props = {
  gameVersions: GameVersion[];
  versionTypes: VersionType[];
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

const GameVersionSelect = ({ gameVersions, versionTypes }: Props) => {
  const [gameVersion, setGameVersion] = useState<GameVersion>();

  const handleChange = (value: ValueType) => {
    const currentGameVersion = gameVersions.find((version) => version.type === value);

    setGameVersion(currentGameVersion);
  };

  return (
    <>
      <RadioGroup
        className="gameVersionSelect"
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
      {JSON.stringify(gameVersion)}
    </>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default GameVersionSelect;
