import { getAttractionsByDestIdController } from "@/controllers/apisController";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const requestBody = await req.json();
    const attractionsByDestIdRes = await getAttractionsByDestIdController(
      requestBody
    );
    if (attractionsByDestIdRes.status) {
      return NextResponse.json(attractionsByDestIdRes, { status: 200 });
    } else {
      throw attractionsByDestIdRes;
    }
  } catch (error) {
    console.error("getAttractionsByDestId Api error", error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
