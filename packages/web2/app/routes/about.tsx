import Layout, { links as layoutLinks } from '~/components/Layout';

const About = () => <Layout pageTitle="About" path={['Home', 'About']} />;

export const meta = () => ({ title: 'RanaMC | About' });

export const links = () => [...layoutLinks()];

export default About;
