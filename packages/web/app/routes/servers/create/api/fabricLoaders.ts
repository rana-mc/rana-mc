import axios from 'axios';
import { ActionFunction, redirect } from '@remix-run/server-runtime';

export const loader = () => {
  return redirect('/');
};

export const action: ActionFunction = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/fabric-loaders');
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false };
  }
};
