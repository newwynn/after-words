import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { shopifyApp } from "@shopify/shopify-app-remix/server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ ok: true });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();

  try {
    const { productName, storyTitle, accountEmail, thumbnail } = data;
    
    if (!productName || !storyTitle || !accountEmail || !thumbnail) {
      throw new Error("Missing required fields");
    }
   // get accesstoke, shop and productId

   // add metafield to product

   // add story to database

   return json({ success: true, data });

  } catch (error) {
    return json({ success: false, error });
  }

  console.log(data);
  return json({ success: true, data });
};
 