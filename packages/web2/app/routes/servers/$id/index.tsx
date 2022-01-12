import { LoaderFunction, useFetcher, useLoaderData } from 'remix';
import axios from 'axios';
import Layout, { links as layoutLinks } from '~/components/Layout';
import ServerCardLarge, {
  links as serverCardLargeLinks,
} from '~/components/ServerCardLarge';
import { ranaSocket, ServerActions } from '~/vendors/ranaSocketIo';

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
  const server = useLoaderData<ServerDataResponse>();
  const removeServer = useFetcher();

  if (!server?.success) {
    return (
      <Layout pageTitle="Servers" path={['Servers']}>
        <div>Oops, something went wrong...</div>
      </Layout>
    );
  }

  const handleInstall = () => {
    ranaSocket.emit(ServerActions.InstallCore, server.data);
  };

  const handleStart = () => {
    ranaSocket.emit(ServerActions.Start, server.data);
  };

  const handleStop = () => {
    ranaSocket.emit(ServerActions.Stop, server.data);
  };

  const handleRemove = () => {
    removeServer.submit(null, {
      method: 'delete',
      action: `servers/${server.data.id}/api/remove`,
    });
  };

  const handleEulaChange = (value: boolean) => {
    ranaSocket.emit(ServerActions.Eula, server.data, value);
  };

  return (
    <Layout pageTitle="Servers" path={['Servers']}>
      <ServerCardLarge
        server={server.data}
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
