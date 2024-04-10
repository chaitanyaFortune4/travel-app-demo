import { deleteAllDataSolrDbController } from "@/apiController/solrApisController";
import { NextResponse } from "next/server";

export const DELETE = async () => {
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
