import { deleteAllDataSolr } from "@/helpers/solrHelpers";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  try {
    const result = await deleteAllDataSolr();
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
