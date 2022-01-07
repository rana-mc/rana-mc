import { Outlet, useParams } from 'remix';
import Layout, { links as layoutLinks } from '~/components/Layout';

const Server = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  return (
    <Layout pageTitle="Servers" path={['Servers']}>
      <h3>...server</h3>
      <Outlet />
    </Layout>
  );
};

export const meta = () => ({ title: 'RanaMC | Server' });

export const links = () => [...layoutLinks()];

export default Server;
