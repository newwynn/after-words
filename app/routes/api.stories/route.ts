import { json, type ActionFunctionArgs } from "@remix-run/node";
import prisma from "../../../utils/prisma.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();

  try {
    const { productId, shop, storyTitle, description } = data;

    if (!productId || !shop || !storyTitle || !description) {
      throw new Error("Missing required fields");
    }

    // Save story to DB
    const story = await (prisma as any).story.create({ data: { productId, shop, storyTitle, description } });

    return json({ success: true, data: story });
  } catch (error: any) {
    console.error("Error saving story", error);
    return json({ success: false, error: error.message ?? "Server Error" }, { status: 500 });
  }
};