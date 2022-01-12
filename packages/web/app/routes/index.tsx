import Layout, { links as layoutLinks } from '~/components/Layout';

const Index = () => (
  <Layout path={['Home']}>
    <h3>Welcome to RanaMC!</h3>
  </Layout>
);

export const meta = () => ({
  title: 'RanaMC | Home',
});

export const links = () => [...layoutLinks()];

export default Index;
