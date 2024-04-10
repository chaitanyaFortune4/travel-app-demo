import { addDataSolrDbController } from "@/apiController/solrApisController";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const requestBody = await req.json();
    const result = await addDataSolrDbController(requestBody);
    if (result.status) {
      return NextResponse.json(
        { success: result.status, message: result.message },
        { status: 201 }
      );
    } else {
      throw result;
    }
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(err, { status: 500 });
  }
};
