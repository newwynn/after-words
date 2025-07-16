import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ ok: true });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();
  console.log(data);
  return json({ success: true, data });
};
 