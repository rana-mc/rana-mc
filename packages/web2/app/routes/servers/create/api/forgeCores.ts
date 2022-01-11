import axios from "axios";
import { ActionFunction, redirect } from "remix";

export const loader = () => {
  return redirect('/');
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const data = Object.fromEntries(body);
  const { version } = data;

  try {
    const response = await axios.get('http://localhost:3001/api/forge-cores', { params: { version } });
    return { success: true, data: response.data }
  } catch (err) {
    return { success: false };
  }
};
