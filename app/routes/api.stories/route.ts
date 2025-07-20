import { json, type ActionFunctionArgs } from "@remix-run/node";
import prisma from "../../../utils/prisma.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const {
      shop,
      storyTitle,
      description,
      buttonLabel,
      buttonLink,
      visibility,
      image,
      video,
      product
    } = await request.json();

    // Validate required fields
    if (!shop || !storyTitle || !description || !product) {
      return json(
        { success: false, error: "Missing required fields: shop, storyTitle, description, product" },
        { status: 400 }
      );
    }

    // Validate product object
    const { productId, productHandle, productTitle, vendor } = product || {};
    if (!productId || !productHandle || !productTitle) {
      return json(
        { success: false, error: "Missing required product fields: productId, productHandle, productTitle" },
        { status: 400 }
      );
    }

    const story = await prisma.story.create({
      data: {
        shop,
        storyTitle,
        description,
        buttonLabel,
        buttonLink,
        visibility,
        image,
        video,
        product: {
          productId,
          productHandle,
          productTitle,
          vendor: vendor || ""
        }
      },
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