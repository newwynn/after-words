import { json, type LoaderFunctionArgs } from "@remix-run/node";
import prisma from "utils/prisma.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    try {
        const url = new URL(request.url);
        const productId = url.searchParams.get("productId");
        const shop = url.searchParams.get("shop");
        if (!productId || !shop) {
            return json({ success: false, error: "Missing required parameters: productId and shop" }, { status: 400 });
        }

        console.log(productId, shop, "productId and shop");

        const stories = await prisma.story.findMany({
            where: { shop: shop }
        });
        
        const story = stories.find(s => {
            try {
                const productData = typeof s.product === 'string' ? JSON.parse(s.product) : s.product;
                return productData?.productId === productId;
            } catch {
                return false;
            }
        });
        return json({ success: true, data: story }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching story:", error);
        return json({ success: false, error: error?.message || "Server Error" }, { status: 500 });
    }
};