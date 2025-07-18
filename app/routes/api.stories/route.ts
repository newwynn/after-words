import { json, type ActionFunctionArgs } from "@remix-run/node";
import prisma from "../../../utils/prisma.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { productId, shop, storyTitle, description } = await request.json();

    if (!productId || !shop || !storyTitle || !description) {
      return json(
        { success: false, error: "Missing required fields: productId, shop, storyTitle, description" },
        { status: 400 }
      );
    }

    const story = await (prisma as any).story.create({
      data: { productId, shop, storyTitle, description },
    });

    return json({ success: true, data: story }, { status: 201 });
  } catch (error: any) {
    console.error("Error saving story:", error);
    return json(
      { success: false, error: error?.message || "Server Error" },
      { status: 500 }
    );
  }
};