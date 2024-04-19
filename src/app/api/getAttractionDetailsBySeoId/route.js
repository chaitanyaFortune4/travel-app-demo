import { getAttractionsBySeoIdController } from "@/controllers/apisController";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    const params = req.nextUrl.searchParams;
    let seoId = params.get("seoId");

    let attractionDetailsRes = await getAttractionsBySeoIdController(seoId);
    if (attractionDetailsRes.status) {
      return NextResponse.json(attractionDetailsRes, { status: 200 });
    } else {
      throw attractionDetailsRes;
    }
  } catch (error) {
    console.log("getAttractionBySeoId Api error", error);
    return NextResponse.json(error, { status: 500 });
  }
};
