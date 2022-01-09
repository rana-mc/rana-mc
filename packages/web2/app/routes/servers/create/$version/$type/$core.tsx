import { useEffect, useState } from 'react';
import axios from 'axios';
import { Panel } from 'rsuite';
import CoreVersionSelect, {
  links as coreVersionSelectLinks,
} from '~/components/CoreVersionSelect';
import { useLoaderData, useParams } from 'remix';

type LoaderData = ForgeCore[];

type Loader = { params: { version: string } };
export const loader = async ({ params }: Loader) => {
  const { version } = params;
  const response = await axios.get('http://localhost:3001/api/forge-cores', {
    params: { version },
  });

  return response.data;
};

const $core = () => {
  const { type: serverCoreType } = useParams();
  const forgeCores = useLoaderData<LoaderData>();
  const [serverCore, setServerCore] = useState<ServerCore>();

  useEffect(() => {
    console.log(forgeCores);
  }, [forgeCores]);

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
