import { searchAllDataSolr } from "@/helpers/solrHelpers";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await searchAllDataSolr();
    return NextResponse.json(
      { success: result.status, message: result.message, data: result.data },
      { status: 200 }
    );
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(err, { status: 500 });
  }
};
