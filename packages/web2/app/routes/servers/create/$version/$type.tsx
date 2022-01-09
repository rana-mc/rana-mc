import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'remix';
import { Panel } from 'rsuite';
import ServerCoreTypeSelect, {
  links as sercerCoreTypeSelectLink,
} from '~/components/ServerCoreTypeSelect';

const $type = () => {
  const params = useParams<{ type: string }>();
  const navigate = useNavigate();

  const defaultServerCoreType = params?.type || '';
  const [serverCoreType, setServerCoreType] = useState<string>(defaultServerCoreType);

  const handleServerCoreTypeChange = (value: string) => {
    setServerCoreType(value);
    navigate(`../${value}/core`);
  };

  return (
    <React.Fragment>
      <Panel
        style={{ backgroundColor: '#fff', marginBottom: 32 }}
        header={<h4 style={{ fontWeight: 600 }}>Server Core</h4>}
        bordered>
        <ServerCoreTypeSelect
          key={params.type}
          defaultValue={defaultServerCoreType}
          onChange={handleServerCoreTypeChange}
        />
      </Panel>
      <Outlet />
    </React.Fragment>
  );
};

export const links = () => [...sercerCoreTypeSelectLink()];

export default $type;
