import { searchAllDataSolrDbController } from "@/apiController/solrApisController";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await searchAllDataSolrDbController();
    if (result.status) {
      return NextResponse.json(
        { success: result.status, message: result.message, data: result.data },
        { status: 200 }
      );
    } else {
      throw result;
    }
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(err, { status: 500 });
  }
};
