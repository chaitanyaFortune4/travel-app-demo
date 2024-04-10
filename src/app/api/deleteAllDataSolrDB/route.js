import { deleteAllDataSolrDbController } from "@/apiController/solrApisController";
import { client } from "@/db/config";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const result = await deleteAllDataSolrDbController();
    if (result.status) {
      return NextResponse.json(
        { success: result.status, message: result.message },
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
