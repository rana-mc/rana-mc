import React from 'react';
import {
  Form, Stack, Button
} from 'rsuite';
import {
  Gear
} from '@rsuite/icons';
import styles from './index.css';

const CreateServerForm = () => (
  <Form layout="inline" className="createServerForm">
    <Form.Group controlId="username-7">
      <Form.ControlLabel>
        <Stack spacing={8}>
          <Gear />
          <span>Server Id</span>
        </Stack>
      </Form.ControlLabel>
      <Form.Control name="username" style={{ maxWidth: 196 }} />
    </Form.Group>
    <Form.Group controlId="password-7">
      <Form.ControlLabel>
        <Stack spacing={8}>
          <Gear />
          <span>Server Name</span>
        </Stack>
      </Form.ControlLabel>
      <Form.Control
        name="password"
        autoComplete="off"
        style={{ maxWidth: 196 }}
      />
    </Form.Group>
    <Form.Group>
      <Button appearance="primary">Create Server</Button>
    </Form.Group>
  </Form>
);

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default CreateServerForm;
