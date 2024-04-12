import { updateDataSolr } from "@/helpers/solrHelpers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const requestBody = await req.json();
    const result = await updateDataSolr(requestBody);
    return NextResponse.json(
      { success: result.status, message: result.message },
      { status: 201 }
    );
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(err, { status: 500 });
  }
};
