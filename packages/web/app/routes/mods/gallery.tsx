import Layout, { links as layoutLinks } from '~/components/Layout';

const ModsGallery = () => <Layout pageTitle="Gallery" path={['Home', 'Mods']} />;

export const meta = () => ({ title: 'RanaMC | Mods' });

export const links = () => [...layoutLinks()];

export default ModsGallery;
