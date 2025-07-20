import { json, type LoaderFunctionArgs } from "@remix-run/node";
import prisma from "../../utils/prisma.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop");
    if (!shop) {
      return json({ success: false, error: "Missing shop parameter" }, { status: 400 });
    }
    const stories = await prisma.story.findMany({
      where: { shop },
      orderBy: { createdAt: "desc" },
    });
    return json({ success: true, data: stories }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching stories:", error);
    return json({ success: false, error: error?.message || "Server Error" }, { status: 500 });
  }
};

export const GET = loader;
