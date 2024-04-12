import { getProductdetailsByID } from "@/controllers/apisController";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        let data = await getProductdetailsByID(req)
        return NextResponse.json(data, { status: 200 })
    } catch (err) {
        console.log("err", err);
        return NextResponse.json(err, { status: 500 });
    }
};