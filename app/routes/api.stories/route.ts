import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import prisma from "../../db.server";



export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");
  const shop = url.searchParams.get("shop");

  if (!productId || !shop) {
    return json({ success: false, error: "Missing productId or shop" }, { status: 400 });
  }

  try {
    const story = await prisma.story.findFirst({ where: { productId, shop } });
    return json({ success: true, data: story });
  } catch (err) {
    console.error("Error fetching story", err);
    return json({ success: false, error: "Server Error" }, { status: 500 });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();

  try {
    const { productId, shop, productName, storyTitle, accountEmail, thumbnail } = data;

    if (!productId || !shop || !productName || !storyTitle || !accountEmail) {
      throw new Error("Missing required fields");
    }

    // Save story to DB
    const story = await prisma.story.create({
      data: {
        productId,
        shop,
        productName,
        storyTitle,
        accountEmail,
        thumbnail,
      },
    });

    return json({ success: true, data: story });
  } catch (error: any) {
    console.error("Error saving story", error);
    return json({ success: false, error: error.message ?? "Server Error" }, { status: 500 });
  }
};