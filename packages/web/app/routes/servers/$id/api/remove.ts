import axios from 'axios';
import { ActionFunction, redirect } from 'remix';

export const loader = () => {
  return redirect('/');
};

export const action: ActionFunction = async ({ params }) => {
  const { id } = params;

  // FYI: Waiting server create
  await axios.delete(`http://localhost:3001/api/servers/${id}`);

  // TODO: Handle create error?

  return redirect(`/servers`);
};
