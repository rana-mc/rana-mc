import { useLoaderData } from 'remix';
import axios from 'axios';
import Layout, { links as layoutLinks } from '~/components/Layout';

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
      <h3>...servers</h3>
      {JSON.stringify(servers)}
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

export const links = () => [...layoutLinks()];

export default Servers;
