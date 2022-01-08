import { useState } from 'react';
import { Panel } from 'rsuite';
import ServerCoreTypeSelect, {
  links as sercerCoreTypeSelectLink,
} from '~/components/ServerCoreTypeSelect';

const $version$type = () => {
  const [serverCoreType, setServerCoreType] = useState<string>();

  const handleServerCoreTypeChange = (value: string) => {
    setServerCoreType(value);
  };

  return (
    <Panel
      style={{ backgroundColor: '#fff', marginBottom: 32 }}
      header={<h4 style={{ fontWeight: 600 }}>Server Core</h4>}
      bordered>
      <ServerCoreTypeSelect onChange={handleServerCoreTypeChange} />
      {serverCoreType}
    </Panel>
  );
};

export const links = () => [...sercerCoreTypeSelectLink()];

export default $version$type;
