import Layout, { links as layoutLinks } from '~/components/Layout';

const DownloadedMods = () => <Layout pageTitle="Downloaded" path={['Home', 'Mods']} />;

export const meta = () => ({ title: 'RanaMC | Mods' });

export const links = () => [...layoutLinks()];

export default DownloadedMods;
