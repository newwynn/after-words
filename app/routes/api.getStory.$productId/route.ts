import { json, type LoaderFunctionArgs } from "@remix-run/node";
import prisma from "../../../utils/prisma.server";
import { formatProductId } from "../../../utils/formatProductId";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const { productId } = params;
  const shop = new URL(request.url).searchParams.get("shop");

  if (!productId || !shop) {
    return json(
      { success: false, error: "Missing productId or shop parameter" },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const story = await (prisma as any).story.findFirst({
      where: {
        productId: formatProductId(productId),
        shop,
      },
    });

    if (!story) {
      return json(
        { success: true, data: null, message: "No story found for this product" },
        { status: 200, headers: corsHeaders }
      );
    }

    return json(
      { success: true, data: story },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error fetching story:", error);
    return json(
      { success: false, error: "Failed to fetch story" },
      { status: 500, headers: corsHeaders }
    );
  }
};
