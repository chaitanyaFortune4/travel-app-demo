import { client } from "@/db/config";
import { searchByIdDataSolr } from "@/helpers/solrHelpers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const requestBody = await req.json();
    const result = await searchByIdDataSolr(requestBody);
    return NextResponse.json(
      { success: result.status, message: result.message, data: result.data },
      { status: 200 }
    );
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(err, { status: 500 });
  }
};
