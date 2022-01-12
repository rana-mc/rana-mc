import Layout, { links as layoutLinks } from '~/components/Layout';

const RanaMCSettings = () => (
  <Layout pageTitle="RanaMC Settings" path={['Home', 'Settings']} />
);

export const meta = () => ({ title: 'RanaMC | Settings' });

export const links = () => [...layoutLinks()];

export default RanaMCSettings;
