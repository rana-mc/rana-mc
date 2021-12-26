import Input from '@ui/Input';
import Label from '@ui/Label';
import React, { useState } from 'react';

type Props = {
  onChange: () => {};
}

const ServerCreateForm = () => {
  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>();

  return (
    <div>
      <Label text="Server Id" />
      <Input onChange={setId} value={id} />
      <Label text="Server Name" />
      <Input onChange={setName} value={name} />
    </div>
  );
};

export default ServerCreateForm;
