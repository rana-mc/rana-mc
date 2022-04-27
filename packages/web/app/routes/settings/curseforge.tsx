import { useState } from 'react';
import { Button, ButtonToolbar, Panel, Form } from 'rsuite';
import { useLoaderData, useSubmit, useTransition } from '@remix-run/react';
import axios from 'axios';
// TODO: WTF?
// eslint-disable-next-line import/no-extraneous-dependencies
import { DataFunctionArgs } from '@remix-run/server-runtime';
import Layout, { links as layoutLinks } from '~/components/Layout';

const SETTINGS_API_URL = 'http://localhost:3001/api/settings';

export const loader = async () => {
  const response = await axios.get(SETTINGS_API_URL);
  return response.data;
};

export const action = async ({ request }: DataFunctionArgs) => {
  const body = await request.formData();
  const data = Object.fromEntries(body);

  axios.post(SETTINGS_API_URL, data);

  return null;
};

const CurseForgeSettings = () => {
  const submit = useSubmit();
  const transition = useTransition();

  const settings = useLoaderData();
  const [currentSettings, setCurrentSettings] = useState(settings);

  const handleSubmit = (status: boolean, event: React.FormEvent<HTMLFormElement>) => {
    submit(event.currentTarget, { replace: true });
  };

  const handleChange = (formValue: Record<string, string>) => {
    setCurrentSettings(formValue);
  };

  return (
    <Layout pageTitle="CurseForge Settings" path={['Home', 'Settings']}>
      <Panel style={{ backgroundColor: '#fff' }} bordered>
        <Form
          formValue={currentSettings}
          method="post"
          disabled={transition.state === 'submitting'}
          onChange={handleChange}
          onSubmit={handleSubmit}>
          <Form.Group controlId="curseApiKey">
            <Form.ControlLabel>API Key</Form.ControlLabel>
            <Form.Control name="curseApiKey" />
            <Form.HelpText>API key for requests to core.curseforge.com</Form.HelpText>
          </Form.Group>
          <Form.Group>
            <ButtonToolbar>
              <Button
                disabled={transition.state === 'submitting'}
                type="submit"
                appearance="primary">
                Save
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </Panel>
    </Layout>
  );
};

export const meta = () => ({
  title: 'RanaMC | Settings',
});

export const links = () => [...layoutLinks()];

export default CurseForgeSettings;
