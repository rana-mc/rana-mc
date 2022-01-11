import React, { useState } from 'react';
import { Form, Stack, Button } from 'rsuite';
import { Gear } from '@rsuite/icons';
import styles from './index.css';

export type CreateServerFormData = Pick<Server, 'id' | 'name'>;

type Props = {
  onSubmit: (value: CreateServerFormData) => void;
};

const INITIAL_FORM: Record<string, any> = {
  id: '',
  name: '',
};

const CreateServerForm = ({ onSubmit }: Props) => {
  const [formValue, setFormValue] = useState(INITIAL_FORM);

  const handleSubmit = () => {
    onSubmit(formValue as CreateServerFormData);
  };

  const handleChange = (formValue: Record<string, any>) => {
    setFormValue(formValue);
  };

  return (
    <Form
      layout="inline"
      formValue={formValue}
      onChange={handleChange}
      className="createServerForm"
      onSubmit={handleSubmit}>
      <Form.Group controlId="id">
        <Form.ControlLabel>
          <Stack spacing={8}>
            <Gear />
            <span>Server Id</span>
          </Stack>
        </Form.ControlLabel>
        <Form.Control name="name" style={{ maxWidth: 196 }} />
      </Form.Group>
      <Form.Group controlId="name">
        <Form.ControlLabel>
          <Stack spacing={8}>
            <Gear />
            <span>Server Name</span>
          </Stack>
        </Form.ControlLabel>
        <Form.Control name="id" autoComplete="off" style={{ maxWidth: 196 }} />
      </Form.Group>
      <Form.Group>
        <Button type="submit" appearance="primary">
          Create Server
        </Button>
      </Form.Group>
    </Form>
  );
};

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default CreateServerForm;
