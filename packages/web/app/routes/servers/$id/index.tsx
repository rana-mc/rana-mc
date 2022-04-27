import { LoaderFunction, useLoaderData, useSubmit } from '@remix-run/react';
import axios from 'axios';
import Layout, { links as layoutLinks } from '~/components/Layout';
import ServerCardLarge, {
  links as serverCardLargeLinks,
} from '~/components/ServerCardLarge';
import { ranaSocket, ServerActions, RanaSocketEvents } from '~/vendors/ranaSocketIo';
import { useEffect, useState } from 'react';

type ServerDataResponse = { data: Server; success: boolean };
export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  try {
    const response = await axios.get(`http://localhost:3001/api/servers/${id}`);
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false };
  }
};

const Server = () => {
  const submit = useSubmit();
  const initialServer = useLoaderData<ServerDataResponse>();
  const [server, setServer] = useState<Server>();

  useEffect(() => {
    setServer(initialServer.data);
  }, [initialServer.data]);

  useEffect(() => {
    ranaSocket.on(RanaSocketEvents.ServerUpdate, (server: Server) => {
      setServer(server);
    });
  }, []);

  if (!server) {
    return (
      <Layout pageTitle="Servers" path={['Servers']}>
        <div>Oops, something went wrong...</div>
      </Layout>
    );
  }

  const handleInstall = () => {
    ranaSocket.emit(ServerActions.InstallCore, server);
  };

  const handleStart = () => {
    ranaSocket.emit(ServerActions.Start, server);
  };

  const handleStop = () => {
    ranaSocket.emit(ServerActions.Stop, server);
  };

  const handleRemove = () => {
    submit(null, {
      method: 'delete',
      action: `servers/${server.id}/api/remove`,
    });
  };

  const handleEulaChange = (value: boolean) => {
    ranaSocket.emit(ServerActions.Eula, server, value);
  };

  return (
    <Layout pageTitle="Servers" path={['Servers']}>
      <ServerCardLarge
        server={server}
        onInstall={handleInstall}
        onStart={handleStart}
        onStop={handleStop}
        onRemove={handleRemove}
        onEulaChange={handleEulaChange}
      />
    </Layout>
  );
};

export const meta = () => ({ title: 'RanaMC | Server' });

export const links = () => [...layoutLinks(), ...serverCardLargeLinks()];

export default Server;
