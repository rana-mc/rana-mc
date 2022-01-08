import React, { useState } from 'react';
import { Outlet, useNavigate } from 'remix';
import { Panel } from 'rsuite';
import ServerCoreTypeSelect, {
  links as sercerCoreTypeSelectLink,
} from '~/components/ServerCoreTypeSelect';

const $type = () => {
  const navigate = useNavigate();
  const [serverCoreType, setServerCoreType] = useState<string>();

  const handleServerCoreTypeChange = (value: string) => {
    setServerCoreType(value);
    navigate(`./${value}`);
  };

  return (
    <React.Fragment>
      <Panel
        style={{ backgroundColor: '#fff', marginBottom: 32 }}
        header={<h4 style={{ fontWeight: 600 }}>Server Core</h4>}
        bordered>
        <ServerCoreTypeSelect onChange={handleServerCoreTypeChange} />
      </Panel>
      <Outlet />
    </React.Fragment>
  );
};

export const links = () => [...sercerCoreTypeSelectLink()];

export default $type;
