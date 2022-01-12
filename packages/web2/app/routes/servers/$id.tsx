import { LoaderFunction, useLoaderData } from 'remix';
import axios from 'axios';
import Layout, { links as layoutLinks } from '~/components/Layout';
import ServerCardLarge, {
  links as serverCardLargeLinks,
} from '~/components/ServerCardLarge';
import { ranaSocket } from '~/vendors/ranaSocketIo';

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

  if (!server?.success) {
    return (
      <Layout pageTitle="Servers" path={['Servers']}>
        <div>Oops, something went wrong...</div>
      </Layout>
    );
  }

  const handleStart = () => {};

  const handleStop = () => {};

  const handleRemove = () => {};

  const handleEulaChange = () => {};

  return (
    <Layout pageTitle="Servers" path={['Servers']}>
      <ServerCardLarge
        server={server.data}
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
