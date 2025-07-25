import { json, type ActionFunctionArgs } from "@remix-run/node";
import prisma from "../../../utils/prisma.server";
import { authenticate } from "app/shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request);
    const shop = session?.shop; 
    const payload = await request.json();

    if (!shop || !payload?.storyTitle || !payload?.description || !payload?.product) {
      return json(
        { success: false, error: "Missing required fields: shop, storyTitle, description, product" },
        { status: 400 }
      );
    }

    const { productId, productHandle, productTitle, vendor } = payload?.product || {};
    if (!productId || !productHandle || !productTitle) {
      return json(
        { success: false, error: "Missing required product fields: productId, productHandle, productTitle" },
        { status: 400 }
      );
    }

    // create a product metaobject instance for the story
    const query = `
    mutation {
  metaobjectCreate(metaobject: {
    type: "test",
    fields: [
      { key: "storyTitle", value: "The Journey Begins" },
      { key: "storyDescription", value: "This product was inspired by..." },
      { key: "imageLink", value: "https://cdn.shopify.com/your-image.jpg" },
      { key: "videoLink", value: "https://youtube.com/your-video" },
      { key: "buttonLink", value: "https://your-link.com" },
      { key: "buttonText", value: "Learn More" }
    ]
  }) {
    metaobject {
      id
      type
      handle
    }
    userErrors {
      field
      message
    }
  }
}
`;

    const adminSession = await authenticate.admin(request);
    const result = await  adminSession.admin.graphql(query);
    console.log(result, "result");

    const story = await prisma.story.create({
      data: {
        shop,
        storyTitle: payload?.storyTitle || "",
        description: payload?.description || "",
        buttonLabel: payload?.buttonLabel || "",
        buttonLink: payload?.buttonLink || "",
        visibility: payload?.visibility || "",
        image: payload?.image || "",
        video: payload?.video || "",
        product: {
          productId: productId || "",
          productHandle: productHandle || "",
          productTitle: productTitle || "",
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