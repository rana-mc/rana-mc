import { useLoaderData } from '@remix-run/react';
import axios from 'axios';
import Layout, { links as layoutLinks } from '~/components/Layout';
import { Stack } from 'rsuite';
import ServerCard, { links as serverCardLinks } from '~/components/ServerCard';

export const loader = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/servers');
    return response.data;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (axios.isAxiosError(err)) throw new Response(err.message, err.response);
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    else throw new Response('Test', { status: 500 });
  }
};

const Servers = () => {
  const servers = useLoaderData();

  return (
    <Layout pageTitle="Servers" path={['Home', 'Servers']}>
      <Stack wrap spacing={24}>
        {servers?.map((server: Server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </Stack>
    </Layout>
  );
};

export const ErrorBoundary = ({ error }: { error: Error }) => (
  <Layout pageTitle="Servers" path={['Servers']}>
    <h1>Error</h1>
    <p>{error.message}</p>
    <p>The stack trace is:</p>
    <pre>{error.stack}</pre>
  </Layout>
);

export const meta = () => ({
  title: 'RanaMC | Servers',
});

export const links = () => [...layoutLinks(), ...serverCardLinks()];

export default Servers;
