import { Panel } from 'rsuite';
import { Outlet } from 'remix';
import Layout, { links as layoutLinks } from '~/components/Layout';
import FloatBottom, { links as floatBottomLinks } from '~/components/FloatBottom';
import CreateServerForm, {
  links as createServerFormLinks,
} from '~/components/CreateServerForm';

const CreateRoute = () => {
  return (
    <Layout pageTitle="Create server" path={['Home', 'Servers']}>
      <Outlet />
      <FloatBottom>
        <Panel style={{ backgroundColor: '#F5F5F5' }} bordered>
          <CreateServerForm />
        </Panel>
      </FloatBottom>
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
  title: 'RanaMC | Create Server',
});

export const links = () => [
  ...layoutLinks(),
  ...floatBottomLinks(),
  ...createServerFormLinks(),
];

export default CreateRoute;
