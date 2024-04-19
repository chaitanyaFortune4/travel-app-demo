import { getProductByCodeController } from "@/controllers/apisController";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    const params = req.nextUrl.searchParams;
    let productCode = params.get("query");
    let productDetailsRes = await getProductByCodeController(productCode);
    if (productDetailsRes.status) {
      return NextResponse.json(productDetailsRes, { status: 200 });
    } else {
      throw productDetailsRes;
    }
  } catch (error) {
    console.log("getProductDetailsByProductCode Api error", error);
    return NextResponse.json(error, { status: 500 });
  }
};
