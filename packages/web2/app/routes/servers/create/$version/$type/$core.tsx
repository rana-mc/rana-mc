import { useState } from 'react';
import { Panel } from 'rsuite';
import CoreVersionSelect, {
  links as coreVersionSelectLinks,
} from '~/components/CoreVersionSelect';

const $core = () => {
  const serverCoreType = 'forge';
  const [serverCore, setServerCore] = useState<ServerCore>();

  const handleServerCoreChange = (value: ServerCore) => {
    setServerCore(value);
    console.log(serverCore);
  };

  return (
    <Panel
      style={{ backgroundColor: '#fff', marginBottom: 32 }}
      header={<h4 style={{ fontWeight: 600 }}>Core Version</h4>}
      bordered>
      <CoreVersionSelect coreType={serverCoreType} onChange={handleServerCoreChange} />
    </Panel>
  );
};

export const links = () => [...coreVersionSelectLinks()];

export default $core;
