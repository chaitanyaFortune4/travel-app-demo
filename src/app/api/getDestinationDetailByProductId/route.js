import { getProductdetailsByID } from "@/controllers/apisController";
import { NextResponse } from "next/server";
import fs from "fs";
import { apiList } from "@/utils/constants";
import { readFile } from "@/utils/common";

export const GET = async (req) => {
    try {
        const params = req.nextUrl.searchParams;
        let id = params.get("query");
        let jsonData;

        try {
            const destinationData = fs.readFileSync(
                `${apiList.fileUpload}/getProductDetailsById.json`,
                "utf-8"
            );
            jsonData = JSON.parse(destinationData);
        } catch (error) {
            console.error("Error reading JSON file:", error);
            jsonData = [];
        }
        if (Array.isArray(jsonData)) {
            let arr = jsonData.find(v => v.productCode === id);
            if (arr) {
                let arrData = {
                    data: arr,
                    message: "product details JSON"
                }
                return NextResponse.json(arrData, { status: 200 });
            } else {
                let data = await getProductdetailsByID(req);
                jsonData.push({ ...data });
                fs.writeFile(`${apiList.fileUpload}/getProductDetailsById.json`, JSON.stringify(jsonData), (err) => {
                    if (err) {
                        console.error("Error writing file:", err);
                    } else {
                        console.log("File written successfully");
                    }
                });
                let arrData = {
                    data: data,
                    message: "Fetch product details successfully"
                }
                return NextResponse.json(arrData, { status: 200 });
            }
        } else {
            console.error("Data is not an array:", jsonData);
            return NextResponse.json({ error: "Data is not an array" }, { status: 500 });
        }
    } catch (err) {
        console.log("err", err);
        return NextResponse.json(err, { status: 500 });
    }
};
