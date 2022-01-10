import { json, redirect } from "remix";

export const loader = () => {
  return redirect('/');
};


export async function action({ request }: any) {
  console.log('test');
  const email = (await request.formData()).get("email");
  try {

    return json({ ok: true });
  } catch (error) {
    return json({ error: 'error?.message ' });
  }
}