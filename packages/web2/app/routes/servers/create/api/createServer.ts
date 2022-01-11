import axios from "axios";
import { ActionFunction, redirect } from "remix";

export const loader = () => {
  return redirect('/');
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const data = Object.fromEntries(body);

  // FYI: Waiting server create
  await axios.post('http://localhost:3001/api/servers', data);

  // TODO: Handle create error?

  return redirect(`/servers/${data.id}`);
};
