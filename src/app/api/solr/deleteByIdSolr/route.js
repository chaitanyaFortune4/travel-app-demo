import { deleteByIdSolr } from "@/helpers/solrHelpers";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  const requestBody = await req.json();
  console.log("ReqB", requestBody);

  try {
    const result = await deleteByIdSolr(requestBody);
    console.log("GG", result);
    return NextResponse.json(
      { success: result.status, message: result.message },
      { status: 200 }
    );
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(err, { status: 500 });
  }
};
